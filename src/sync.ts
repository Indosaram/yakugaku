import { useSyncExternalStore } from "react";
import { allKeys, applyRemote, itemsFor, onBeforeReset, onLocalChange, snapshotAll, type SyncItem } from "./progress";

// 별도 백엔드(Cloudflare Worker + D1)와의 동기화. 로컬이 1차 저장소이고, 서버는 백업·기기 간 동기화만 한다.
// 동기화 코드가 없으면 아무것도 보내지 않는다.
export const SYNC_URL = (import.meta.env.VITE_SYNC_URL as string | undefined) ?? "https://yakugaku-sync.naidis.dev";

const CODE = "yk-sync-code";
const CURSOR = "yk-sync-cursor";
const PENDING = "yk-sync-pending"; // 아직 서버에 못 올린 키 (오프라인 등)
const LAST = "yk-sync-last";

export type SyncState = { code: string | null; status: "off" | "idle" | "syncing" | "offline" | "error"; last: number | null; message?: string };

let state: SyncState = { code: localStorage.getItem(CODE), status: localStorage.getItem(CODE) ? "idle" : "off", last: Number(localStorage.getItem(LAST)) || null };
const listeners = new Set<() => void>();
function set(p: Partial<SyncState>) {
  state = { ...state, ...p };
  listeners.forEach((l) => l());
}

function pending(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(PENDING) ?? "[]") as string[]); } catch { return new Set(); }
}
function savePending(s: Set<string>) {
  localStorage.setItem(PENDING, JSON.stringify([...s]));
}

export const formatCode = (c: string) => c.replace(/(.{4})(?=.)/g, "$1-");
export const normalizeCode = (raw: string) => raw.toUpperCase().replace(/[\s-]/g, "").replace(/O/g, "0").replace(/[IL]/g, "1");

async function api<T>(path: string, init: RequestInit = {}, code = state.code): Promise<T> {
  const r = await fetch(SYNC_URL + path, {
    ...init,
    headers: { "Content-Type": "application/json", ...(code ? { Authorization: "Bearer " + code } : {}), ...(init.headers ?? {}) },
  });
  if (r.status === 401) throw Object.assign(new Error("동기화 코드가 맞지 않아요."), { auth: true });
  if (!r.ok) throw new Error(`서버 오류 ${r.status}`);
  return r.json() as Promise<T>;
}

const device = () => `${navigator.platform || "web"} · ${navigator.userAgent.match(/(iPhone|iPad|Android|Mac|Windows)/)?.[0] ?? ""}`.slice(0, 80);

async function uploadSnapshot(reason: string) {
  await api("/v1/snapshots", { method: "POST", body: JSON.stringify({ reason, device: device(), data: snapshotAll() }) });
}

let running: Promise<void> | null = null;
let again = false;

// 한 번 동기화: 대기 중인 로컬 변경을 올리고, 그 사이 다른 기기의 변경을 받아 항목별로 병합한다.
export function syncNow(): Promise<void> {
  if (!state.code) return Promise.resolve();
  if (running) { again = true; return running; }
  running = (async () => {
    do {
      again = false;
      set({ status: "syncing" });
      try {
        const keys = pending();
        const all = itemsFor(keys);
        let cursor = Number(localStorage.getItem(CURSOR) ?? 0);
        // 한 번에 1000개까지만 받으므로 나눠서 올린다
        for (let i = 0; i < Math.max(all.length, 1); i += 500) {
          const chunk = all.slice(i, i + 500);
          const res = await api<{ items: SyncItem[]; cursor: number }>("/v1/sync", { method: "POST", body: JSON.stringify({ since: cursor, items: chunk }) });
          applyRemote(res.items);
          cursor = res.cursor;
          localStorage.setItem(CURSOR, String(cursor));
          const left = pending();
          const won = new Map(res.items.map((x) => [x.k, x.t]));
          // 보낸 값이나 서버가 돌려준 더 새 값과 지금 로컬이 같으면 끝. 올리는 동안 다시 바뀐 키는 남겨 둔다.
          for (const it of chunk) {
            const now = itemsFor([it.k])[0]?.t;
            if (now === it.t || now === won.get(it.k)) left.delete(it.k);
          }
          savePending(left);
        }
        const now = Date.now();
        localStorage.setItem(LAST, String(now));
        set({ status: "idle", last: now, message: undefined });
      } catch (e) {
        const err = e as Error & { auth?: boolean };
        set({ status: err.auth ? "error" : navigator.onLine === false || err instanceof TypeError ? "offline" : "error", message: err.message });
        break;
      }
    } while (again);
  })().finally(() => { running = null; });
  return running;
}

let timer: ReturnType<typeof setTimeout> | undefined;
function schedule(ms = 1500) {
  clearTimeout(timer);
  timer = setTimeout(() => void syncNow(), ms);
}

// 처음 연결: 현재 로컬 전체(이관된 기록 포함)를 서버로 올리고, 전체 사본도 스냅샷으로 남긴다.
async function attach(code: string, reason: string) {
  localStorage.setItem(CODE, code);
  localStorage.setItem(CURSOR, "0");
  const p = pending();
  allKeys().forEach((k) => p.add(k));
  savePending(p);
  set({ code, status: "idle" });
  await uploadSnapshot(reason);
  await syncNow();
  if (state.status !== "idle") throw new Error(state.message ?? "동기화하지 못했어요.");
}

export async function createCode() {
  const { code } = await api<{ code: string }>("/v1/vault", { method: "POST" }, null);
  await attach(code, "first-connect");
  return code;
}

export async function joinCode(raw: string) {
  const code = normalizeCode(raw);
  if (code.length !== 32) throw new Error("동기화 코드는 32자예요. 다시 확인해 주세요.");
  await api("/v1/ping", {}, code); // 틀린 코드면 여기서 멈추고 아무것도 저장하지 않는다
  await attach(code, "join");
}

// 연결만 끊는다. 이 기기의 학습 기록은 그대로 남는다.
export function disconnect() {
  localStorage.removeItem(CODE);
  localStorage.removeItem(CURSOR);
  set({ code: null, status: "off", message: undefined });
}

export function backupToServer() {
  return uploadSnapshot("manual");
}

export function startSync() {
  // 전체 초기화 직전 상태를 서버에도 스냅샷으로 남긴다 (실수로 지워도 되살릴 수 있게)
  onBeforeReset(() => { if (state.code) void uploadSnapshot("before-reset").catch((e: Error) => console.warn("초기화 전 서버 백업 실패", e)); });
  onLocalChange((keys) => {
    if (!state.code) return;
    const p = pending();
    keys.forEach((k) => p.add(k));
    savePending(p);
    schedule();
  });
  window.addEventListener("online", () => schedule(200));
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") schedule(200);
    else if (pending().size) void syncNow();
  });
  setInterval(() => document.visibilityState === "visible" && schedule(0), 60_000);
  if (state.code) schedule(300);
}

export function useSync() {
  return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => state);
}

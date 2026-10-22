import { useCallback, useSyncExternalStore } from "react";

// 학습 진도는 이 브라우저 localStorage 가 1차 저장소다. 서버(sync.ts)는 백업·기기 간 동기화만 한다.
// KEY 는 이전 hoshi-eigo 사이트와 같은 키라 기존 기록을 그대로 이어받는다. 형식은 절대 바꾸지 않는다.
const KEY = "hoshi-eigo-progress-v1";
// 항목별 마지막 변경 시각(ms). 지운 항목은 값 없이 시각만 남겨(tombstone) 다른 기기에도 지워졌다고 알린다.
const META = "yk-progress-meta-v1";
// 전체 초기화나 복원 직전에 통째로 떠 두는 로컬 백업 (최근 5개)
const BACKUPS = "yk-progress-backups-v1";

export type Value = number | boolean | string;
type Store = Record<string, Value>;
type Meta = Record<string, number>; // key -> updatedAt, 음수면 삭제 시각

function readJSON<T>(k: string, d: T): T {
  try {
    const v = localStorage.getItem(k);
    return v == null ? d : (JSON.parse(v) as T);
  } catch {
    return d;
  }
}
function writeJSON(k: string, v: unknown) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {
    /* 저장 공간 부족·사생활 보호 모드: 메모리에서만 유지 */
  }
}

let cache: Store = readJSON<Store>(KEY, {});
let meta: Meta = readJSON<Meta>(META, {});
const listeners = new Set<() => void>();
const changeListeners = new Set<(keys: string[]) => void>();

// 시각 정보가 없던 기존 값은 시각 0 으로 둔다(어느 기기에서든 실제로 바꾼 값이 이긴다).
for (const k of Object.keys(cache)) if (meta[k] === undefined) meta[k] = 0;
migrate();

// ---------- 기존 기록 이관 (멱등, 원본 키는 읽기만 한다) ----------
// 1) 옛 합격화학 사이트(hapgyeok-yuki, 같은 origin)의 hy.* → chem:* (없는 키만 채움 = 합집합)
// 2) yakugaku 초기 화학 카드 최고점 yk-best-<id> → chem:best:<id> (큰 값)
// 3) 체크표에 직접 추가한 항목 목록 yk-custom-courses → custom:courses (동기화되도록 복사)
export function migrate() {
  const add: Store = {};
  const put = (k: string, v: Value) => {
    if (cache[k] === undefined && add[k] === undefined && !(meta[k] < 0)) add[k] = v;
  };
  for (const [name, prefix] of [["done", "chem:done:"], ["star", "chem:star:"], ["ino", "chem:ino:"]] as const) {
    const arr = readJSON<unknown>("hy." + name, []);
    if (Array.isArray(arr)) arr.forEach((x) => typeof x === "string" && x && put(prefix + x, true));
  }
  const cover = readJSON<unknown>("hy.cover", null);
  if (typeof cover === "boolean") put("chem:cover", cover);
  const best = readJSON<unknown>("hy.best", null);
  const bump = (id: string, n: number) => {
    const k = `chem:best:${id}`;
    const cur = typeof cache[k] === "number" ? (cache[k] as number) : typeof add[k] === "number" ? (add[k] as number) : -1;
    if (Number.isFinite(n) && n > cur) add[k] = n;
  };
  if (best && typeof best === "object") for (const [id, n] of Object.entries(best as Record<string, unknown>)) bump(id, Number(n));
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith("yk-best-")) bump(k.slice(8), Number(localStorage.getItem(k)));
  }
  const courses = localStorage.getItem("yk-custom-courses");
  if (courses && courses !== "[]") put("custom:courses", courses);
  const keys = Object.keys(add);
  if (!keys.length) return 0;
  // 이관한 값은 시각 0: 다른 기기에서 실제로 바꾼 값이 있으면 그쪽이 이긴다.
  cache = { ...cache, ...add };
  keys.forEach((k) => (meta[k] = meta[k] ?? 0));
  persist();
  return keys.length;
}

function persist() {
  writeJSON(KEY, cache);
  writeJSON(META, meta);
}

function emit(keys: string[]) {
  persist();
  listeners.forEach((l) => l());
  if (keys.length) changeListeners.forEach((l) => l(keys));
}

export function setProgress(key: string, value: Value) {
  setMany({ [key]: value });
}

export function setMany(entries: Record<string, Value | undefined>) {
  const now = Date.now();
  const next = { ...cache };
  const keys: string[] = [];
  for (const [k, v] of Object.entries(entries)) {
    if (v === undefined) {
      if (!(k in next)) continue;
      delete next[k];
      meta[k] = -now;
    } else {
      if (next[k] === v) continue;
      next[k] = v;
      meta[k] = now;
    }
    keys.push(k);
  }
  if (!keys.length) return;
  cache = next;
  emit(keys);
}

export function clearProgress(key: string) {
  setMany({ [key]: undefined });
}

// 렌더 밖(이벤트 처리 중)에서 최신 값을 읽을 때
export function peekProgress(key: string): Value | undefined {
  return cache[key];
}

// ---------- 백업 ----------
export type Backup = { at: number; reason: string; data: Store };
export function localBackups(): Backup[] {
  return readJSON<Backup[]>(BACKUPS, []);
}
export function backupNow(reason: string) {
  const list = [{ at: Date.now(), reason, data: cache }, ...localBackups()].slice(0, 5);
  writeJSON(BACKUPS, list);
}

// 백업 되살리기: 지금 값이 없는 항목만 채운다(지금 표시는 덮지 않음).
export function restoreBackup(data: Record<string, Value>) {
  const add: Record<string, Value> = {};
  for (const [k, v] of Object.entries(data)) if (!(k in cache)) add[k] = v;
  setMany(add);
  return Object.keys(add).length;
}

// 전체 초기화. 화면에서는 반드시 확인을 받고, 지우기 직전 상태를 로컬 백업(연결돼 있으면 서버 스냅샷도)에 떠 둔다.
const beforeReset = new Set<() => void>();
export function onBeforeReset(l: () => void) {
  beforeReset.add(l);
}
export function resetProgress(ask: (msg: string) => boolean = (m) => window.confirm(m)) {
  if (!Object.keys(cache).length) return false;
  if (!ask("정말 모든 학습 기록을 지울까요? 지우기 전 상태는 백업으로 남겨 둡니다.")) return false;
  backupNow("reset");
  beforeReset.forEach((l) => l());
  setMany(Object.fromEntries(Object.keys(cache).map((k) => [k, undefined])));
  return true;
}

// ---------- 동기화용 (sync.ts) ----------
export type SyncItem = { k: string; v: string | null; t: number };

export function onLocalChange(l: (keys: string[]) => void) {
  changeListeners.add(l);
  return () => changeListeners.delete(l);
}

export function itemsFor(keys: Iterable<string>): SyncItem[] {
  const out: SyncItem[] = [];
  for (const k of keys) {
    const t = meta[k];
    if (k in cache) out.push({ k, v: JSON.stringify(cache[k]), t: Math.abs(t ?? 0) });
    else if (t !== undefined && t < 0) out.push({ k, v: null, t: -t });
  }
  return out;
}

export function allKeys(): string[] {
  return [...new Set([...Object.keys(cache), ...Object.keys(meta).filter((k) => meta[k] < 0)])];
}

// 서버에서 받은 항목 병합: 항목마다 더 늦게 바뀐 쪽이 이긴다. 같은 시각이면 로컬 유지.
// 서버 응답에 없는 키는 건드리지 않으므로 응답이 로컬을 통째로 지우는 일은 없다.
export function applyRemote(items: SyncItem[]): number {
  const next = { ...cache };
  let n = 0;
  for (const it of items) {
    const local = it.k in meta ? Math.abs(meta[it.k]) : -1;
    if (it.t <= local) continue;
    if (it.v === null) {
      if (it.k in next) { delete next[it.k]; n++; }
      meta[it.k] = -it.t;
    } else {
      let v: Value;
      try { v = JSON.parse(it.v) as Value; } catch { continue; }
      if (next[it.k] !== v) n++;
      next[it.k] = v;
      meta[it.k] = it.t;
    }
  }
  cache = next;
  persist();
  if (n) listeners.forEach((l) => l());
  return n;
}

export function snapshotAll(): Record<string, string> {
  const out: Record<string, string> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k !== BACKUPS && !k.startsWith("yk-sync")) out[k] = localStorage.getItem(k) ?? "";
  }
  return out;
}

// ---------- React ----------
function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useProgress() {
  const store = useSyncExternalStore(subscribe, () => cache);
  const get = useCallback((k: string) => store[k], [store]);
  return { store, get };
}

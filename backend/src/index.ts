// yakugaku 학습 기록 동기화 Worker (Cloudflare Workers + D1)
// 계정 대신 "동기화 코드"(160비트 랜덤) 하나로 금고를 연다. 코드 없이는 읽기·쓰기 불가.
// 로컬(localStorage)이 1차 저장소이고, 여기는 백업과 기기 간 동기화만 맡는다.

interface D1Result<T> { results: T[] }
interface D1Stmt {
  bind(...v: unknown[]): D1Stmt;
  first<T>(): Promise<T | null>;
  all<T>(): Promise<D1Result<T>>;
  run(): Promise<unknown>;
}
interface D1 {
  prepare(sql: string): D1Stmt;
  batch(s: D1Stmt[]): Promise<D1Result<unknown>[]>;
}
interface AiRun {
  response?: string;
}
interface Ai {
  run(model: string, input: Record<string, unknown>): Promise<AiRun>;
}
interface Env { DB: D1; AI: Ai }

const ORIGINS = new Set([
  "https://indosaram.github.io",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
]);
const MAX_BODY = 4_000_000;
const MAX_ITEMS = 1000;
const MAX_KEY = 400;
const MAX_VAL = 20_000;
const KEEP_SNAPSHOTS = 30;
const MAX_NOTE_INPUT = 12_000;
const NOTE_MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // Crockford base32

type Item = { k: string; v: string | null; t: number };

function cors(origin: string | null): Record<string, string> {
  if (!origin || !ORIGINS.has(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body: unknown, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...cors(origin) },
  });
}

function newCode(): string {
  const b = crypto.getRandomValues(new Uint8Array(20));
  let bits = 0, acc = 0, out = "";
  for (const x of b) {
    acc = (acc << 8) | x; bits += 8;
    while (bits >= 5) { out += ALPHABET[(acc >>> (bits - 5)) & 31]; bits -= 5; }
  }
  return out; // 32자
}

export function normalizeCode(raw: string): string {
  return raw.toUpperCase().replace(/[\s-]/g, "").replace(/O/g, "0").replace(/[IL]/g, "1");
}

async function vaultId(code: string): Promise<string> {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("yakugaku-sync:" + code));
  return [...new Uint8Array(d)].map((x) => x.toString(16).padStart(2, "0")).join("");
}

async function auth(req: Request, env: Env): Promise<string | null> {
  const h = req.headers.get("Authorization") ?? "";
  const m = /^Bearer\s+(.+)$/i.exec(h);
  if (!m) return null;
  const code = normalizeCode(m[1]);
  if (code.length !== 32 || [...code].some((c) => !ALPHABET.includes(c))) return null;
  const id = await vaultId(code);
  const row = await env.DB.prepare("SELECT id FROM vaults WHERE id = ?").bind(id).first<{ id: string }>();
  return row ? id : null;
}

async function body<T>(req: Request): Promise<T | null> {
  const len = Number(req.headers.get("Content-Length") ?? 0);
  if (len > MAX_BODY) return null;
  const text = await req.text();
  if (text.length > MAX_BODY) return null;
  try { return JSON.parse(text) as T; } catch { return null; }
}

function validItems(x: unknown): x is Item[] {
  return Array.isArray(x) && x.length <= MAX_ITEMS && x.every((it) =>
    it && typeof it === "object" &&
    typeof it.k === "string" && it.k.length > 0 && it.k.length <= MAX_KEY &&
    (it.v === null || (typeof it.v === "string" && it.v.length <= MAX_VAL)) &&
    Number.isSafeInteger(it.t) && it.t >= 0);
}

async function structureNote(env: Env, material: string, title: string) {
  const system = [
    "너는 일본 약대 입시(EJU 화학) 학습 노트를 정리하는 조교다.",
    "사용자가 강의 필기나 교재 원문을 붙여넣으면, 그 내용만으로 한국어 개념 노트를 Markdown 으로 만든다.",
    "규칙:",
    "- 입력에 없는 내용을 지어내지 않는다. 확실하지 않으면 쓰지 않는다.",
    "- 맨 위에 blockquote 한 줄로 이 노트가 무엇을 다루는지 요약한다.",
    "- '## 핵심 공식' 절에 표를 둔다. 열은 | 한국어 | 일본 시험 용어 | 식·정의 | 세 개다.",
    "- 일본 시험 용어 열에는 그 용어의 일본어 한자 표기만 적는다. 예: 理想気体状態方程式",
    "- 히라가나 독음은 적지 않는다. 괄호로 읽기를 붙이면 틀린 독음을 지어내기 때문이다. 읽기가 꼭 필요한 용어는 원문에 있는 것만 옮긴다.",
    "- 일본어 열에 한글을 쓰지 않는다. 한자 표기가 확실하지 않은 용어는 그 행을 빼는 편이 낫다.",
    "- '## 풀이 순서' 절은 번호 목록으로 쓴다. 각 항목은 한 문장으로 끝낸다.",
    "- 시각 버튼(<button class=\"ts\" data-t=\"...\">)은 넣지 않는다. 원문에 시각 정보가 없기 때문이다.",
    "- 이모지를 쓰지 않는다. 제목은 ## 와 ### 만 쓴다.",
    "- 출력은 Markdown 본문만. 설명, 인사말, 코드펜스로 감싼 전체 블록은 넣지 않는다.",
    "- 중국어 간체자를 쓰지 않는다. 한국어는 한국어대로, 일본어는 일본어 한자로 적는다.",
  ].join("\n");
  const user = (title ? `주제: ${title}\n\n` : "") + `원문:\n${material}`;
  const r = await env.AI.run(NOTE_MODEL, {
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    max_tokens: 2048,
  });
  const note = cleanNote(r?.response ?? "");
  if (!note) return { error: "empty" };
  return { note };
}

export function cleanNote(raw: string): string {
  let s = raw.trim();
  const fence = /^```(?:markdown|md)?\s*\n([\s\S]*?)\n```$/.exec(s);
  if (fence) s = fence[1].trim();
  return s.replace(/^```(?:markdown|md)?\s*$/gm, "").trim();
}

async function sync(env: Env, vault: string, since: number, items: Item[]) {
  const stmts: D1Stmt[] = [];
  if (items.length) {
    const payload = JSON.stringify(items);
    stmts.push(env.DB.prepare("UPDATE vaults SET seq = seq + 1 WHERE id = ?1").bind(vault));
    // 더 새로운 t 만 반영. 같은 t 나 더 오래된 값은 무시 → 서버가 최신 값을 잃지 않는다.
    stmts.push(env.DB.prepare(
      `INSERT INTO items (vault, k, v, t, seq)
       SELECT ?1, j.value ->> '$.k', j.value ->> '$.v', j.value ->> '$.t', (SELECT seq FROM vaults WHERE id = ?1)
       FROM json_each(?2) AS j WHERE true
       ON CONFLICT (vault, k) DO UPDATE SET v = excluded.v, t = excluded.t, seq = excluded.seq
       WHERE excluded.t > items.t`).bind(vault, payload));
  }
  // 그 뒤 바뀐 항목 + 이번에 보낸 키의 현재 서버 값(보낸 값이 졌을 때 최신 값을 돌려주기 위해)
  stmts.push(env.DB.prepare(
    `SELECT k, v, t FROM items WHERE vault = ?1 AND (seq > ?2 OR k IN (SELECT j.value ->> '$.k' FROM json_each(?3) AS j))`,
  ).bind(vault, since, JSON.stringify(items.map((i) => ({ k: i.k })))));
  stmts.push(env.DB.prepare("SELECT seq FROM vaults WHERE id = ?1").bind(vault));
  const res = await env.DB.batch(stmts);
  const rows = res[res.length - 2].results as Item[];
  const cursor = (res[res.length - 1].results[0] as { seq: number }).seq;
  return { items: rows.map((r) => ({ k: r.k, v: r.v, t: Number(r.t) })), cursor };
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const origin = req.headers.get("Origin");
    const url = new URL(req.url);
    if (req.method === "OPTIONS") return new Response(null, { status: ORIGINS.has(origin ?? "") ? 204 : 403, headers: cors(origin) });
    // 브라우저 요청은 허용된 출처에서만 (Origin 이 없는 요청은 curl 등 — 어차피 코드가 있어야 함)
    if (origin && !ORIGINS.has(origin)) return json({ error: "origin" }, 403, null);

    try {
      if (url.pathname === "/" || url.pathname === "/health") return json({ ok: true, service: "yakugaku-sync" }, 200, origin);

      if (url.pathname === "/v1/vault" && req.method === "POST") {
        const code = newCode();
        await env.DB.prepare("INSERT INTO vaults (id, created_at, seq) VALUES (?, ?, 0)").bind(await vaultId(code), Date.now()).run();
        return json({ code }, 201, origin);
      }

      const vault = await auth(req, env);
      if (!vault) return json({ error: "unauthorized" }, 401, origin);

      if (url.pathname === "/v1/ping" && req.method === "GET") {
        const r = await env.DB.prepare("SELECT seq, (SELECT COUNT(*) FROM items WHERE vault = ?1) AS n FROM vaults WHERE id = ?1").bind(vault).first<{ seq: number; n: number }>();
        return json({ ok: true, seq: r?.seq ?? 0, items: r?.n ?? 0 }, 200, origin);
      }

      if (url.pathname === "/v1/sync" && req.method === "POST") {
        const b = await body<{ since?: number; items?: unknown }>(req);
        const since = Number(b?.since ?? 0);
        const items = b?.items ?? [];
        if (!b || !Number.isSafeInteger(since) || !validItems(items)) return json({ error: "bad request" }, 400, origin);
        return json(await sync(env, vault, since, items), 200, origin);
      }

      if (url.pathname === "/v1/note" && req.method === "POST") {
        const b = await body<{ material?: unknown; title?: unknown }>(req);
        const material = typeof b?.material === "string" ? b.material.trim() : "";
        const title = typeof b?.title === "string" ? b.title.trim().slice(0, 120) : "";
        if (!b || !material) return json({ error: "bad request" }, 400, origin);
        if (material.length > MAX_NOTE_INPUT) return json({ error: "too long", limit: MAX_NOTE_INPUT }, 413, origin);
        return json(await structureNote(env, material, title), 200, origin);
      }

      if (url.pathname === "/v1/snapshots" && req.method === "POST") {
        const b = await body<{ reason?: string; device?: string; data?: Record<string, string> }>(req);
        if (!b || typeof b.data !== "object" || !b.data) return json({ error: "bad request" }, 400, origin);
        const reason = String(b.reason ?? "manual").slice(0, 40);
        const device = String(b.device ?? "").slice(0, 80);
        await env.DB.batch([
          env.DB.prepare("INSERT INTO snapshots (vault, created_at, reason, device, body) VALUES (?, ?, ?, ?, ?)").bind(vault, Date.now(), reason, device, JSON.stringify(b.data)),
          env.DB.prepare("DELETE FROM snapshots WHERE vault = ?1 AND id NOT IN (SELECT id FROM snapshots WHERE vault = ?1 ORDER BY id DESC LIMIT ?2)").bind(vault, KEEP_SNAPSHOTS),
        ]);
        return json({ ok: true }, 201, origin);
      }

      if (url.pathname === "/v1/snapshots" && req.method === "GET") {
        const r = await env.DB.prepare("SELECT id, created_at, reason, device, length(body) AS size FROM snapshots WHERE vault = ? ORDER BY id DESC").bind(vault).all();
        return json({ snapshots: r.results }, 200, origin);
      }

      const m = /^\/v1\/snapshots\/(\d+)$/.exec(url.pathname);
      if (m && req.method === "GET") {
        const r = await env.DB.prepare("SELECT id, created_at, reason, device, body FROM snapshots WHERE vault = ? AND id = ?").bind(vault, Number(m[1])).first<{ body: string }>();
        if (!r) return json({ error: "not found" }, 404, origin);
        return json({ ...r, body: JSON.parse(r.body) }, 200, origin);
      }

      return json({ error: "not found" }, 404, origin);
    } catch (e) {
      console.error(e);
      return json({ error: "server" }, 500, origin);
    }
  },
};

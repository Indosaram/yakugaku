import { allKeys, clearProgress, itemsFor, peekProgress, setProgress, setMany } from "./progress";

export const AI_INDEX_KEY = "note:ai:index";
export const aiNoteKey = (id: string) => `note:ai:${id}`;

export type AiNoteMeta = { id: string; title: string; created: string; ja?: string; by?: string };

// backend/src/index.ts 의 MAX_VAL(20,000자) 아래로 유지한다. 넘기면 동기화가 값을 거부한다.
export const AI_NOTE_MAX = 18_000;

export function listAiNotes(read: (key: string) => unknown = peekProgress): AiNoteMeta[] {
  const raw = read(AI_INDEX_KEY);
  if (typeof raw !== "string") return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is AiNoteMeta =>
      Boolean(x) && typeof (x as AiNoteMeta).id === "string" && typeof (x as AiNoteMeta).title === "string");
  } catch {
    return [];
  }
}

export function readAiNote(id: string): string | null {
  const body = peekProgress(aiNoteKey(id));
  return typeof body === "string" ? body : null;
}

function writeIndex(notes: AiNoteMeta[]) {
  setProgress(AI_INDEX_KEY, JSON.stringify(notes));
}

export function saveAiNote(meta: AiNoteMeta, body: string): void {
  const text = body.slice(0, AI_NOTE_MAX);
  const rest = listAiNotes().filter((n) => n.id !== meta.id);
  setMany({
    [aiNoteKey(meta.id)]: text,
    [AI_INDEX_KEY]: JSON.stringify([...rest, meta].sort((a, b) => (a.created < b.created ? 1 : -1))),
  });
}

export function deleteAiNote(id: string): void {
  clearProgress(aiNoteKey(id));
  writeIndex(listAiNotes().filter((n) => n.id !== id));
}

export function newAiNoteId(today: string): string {
  const used = new Set(allKeys().map((k) => k.replace(/^note:ai:/, "")));
  for (let i = 1; ; i++) {
    const id = `ai-${today}-${i}`;
    if (!used.has(id) && !listAiNotes().some((n) => n.id === id)) return id;
  }
}

export function aiNoteItems(read: (key: string) => unknown = peekProgress) {
  return listAiNotes(read).map((n) => ({ id: n.id, title: n.title, href: `/chem/n/${n.id}`, key: `note:review:${n.id}` }));
}

export function aiNoteBytes(): number {
  return itemsFor(allKeys().filter((k) => k.startsWith("note:ai:"))).reduce((n, it) => n + (it.v?.length ?? 0), 0);
}

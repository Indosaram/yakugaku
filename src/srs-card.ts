import { itemsFor, peekProgress, setMany } from "./progress";
import { markKey } from "./marks";
import { init, review } from "./srs";
import { resolveDrift } from "./srs-seed";
import type { Grade, SrsState } from "./srs";
import type { Mark } from "./marks";

export type { Grade, SrsState } from "./srs";
export type { Mark } from "./marks";
export { markKey } from "./marks";

export function cardId(set: string, deckId: string, question: string): string {
  return "card:" + set + ":" + deckId + ":" + question;
}

export function srsKey(id: string): string {
  return "srs:" + id;
}

export function dayKey(date: string): string {
  return "srs:log:" + date;
}

export function newKey(date: string): string {
  return "srs:meta:new:" + date;
}

export function gradeToMark(g: Grade): Mark {
  return g === "e" ? "o" : g;
}

function isMark(v: unknown): v is Mark {
  return v === "o" || v === "t" || v === "x";
}

export function readSrs(id: string): SrsState | null {
  const raw = peekProgress(srsKey(id));
  if (typeof raw !== "string") return null;
  let v: unknown;
  try {
    v = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!v || typeof v !== "object" || Array.isArray(v)) return null;
  const o = v as Record<string, unknown>;
  if (typeof o.due !== "string") return null;
  if (typeof o.ivl !== "number") return null;
  if (typeof o.ease !== "number") return null;
  if (typeof o.reps !== "number") return null;
  if (typeof o.lapses !== "number") return null;
  if (typeof o.last !== "string") return null;
  if (!isMark(o.m)) return null;
  return { due: o.due, ivl: o.ivl, ease: o.ease, reps: o.reps, lapses: o.lapses, last: o.last, m: o.m };
}

export function writeSrs(id: string, state: SrsState): void {
  setMany({ [srsKey(id)]: JSON.stringify(state) });
}

export function applyGrade(id: string, g: Grade, today: string): void {
  const current = readSrs(id);
  const markRaw = peekProgress(markKey(id));
  const mark = isMark(markRaw) ? markRaw : undefined;
  const markTimestamp = itemsFor([markKey(id)])[0]?.t;
  const decision = resolveDrift(current, mark, markTimestamp, today);
  const next = review(decision.seed ? decision.state : current ?? init(today), g, today);
  const trulyNew = current === null && mark === undefined;
  const entries: Record<string, string | number> = {
    [srsKey(id)]: JSON.stringify(next),
    [markKey(id)]: gradeToMark(g),
    [dayKey(today)]: Number(peekProgress(dayKey(today)) ?? 0) + 1,
  };
  if (trulyNew) entries[newKey(today)] = Number(peekProgress(newKey(today)) ?? 0) + 1;
  setMany(entries);
}

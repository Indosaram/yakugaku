import { peekProgress, setMany } from "./progress";
import { applyGrade, dayKey, markKey, newKey, srsKey, type Grade } from "./srs-card";

export type SessionCard = { id: string; front: string; back: string; deck: string; fresh: boolean };
export type Tally = { x: number; t: number; o: number; e: number };
export type Snapshot = { key: string; value: string | null };
export type SessionState = {
  today: string;
  cards: SessionCard[];
  idx: number;
  shown: boolean;
  tally: Tally;
  undoStack: { cardId: string; snapshot: Snapshot[]; g: Grade }[];
  finished: boolean;
};

export const SESSION_KEY = "yk-review-session";

export function start(cards: SessionCard[], today: string): SessionState {
  return {
    today,
    cards,
    idx: 0,
    shown: false,
    tally: { x: 0, t: 0, o: 0, e: 0 },
    undoStack: [],
    finished: cards.length === 0,
  };
}

export function reveal(s: SessionState): SessionState {
  return { ...s, shown: true };
}

export function grade(s: SessionState, g: Grade, today: string): SessionState {
  if (!s.shown) throw new Error("reveal before grading");
  const id = s.cards[s.idx].id;
  const snapshot = [srsKey(id), markKey(id), dayKey(today), newKey(today)].map((key) => {
    const value = peekProgress(key);
    // applyGrade stores its daily counters as numbers; retain them in the string snapshot.
    return { key, value: typeof value === "number" ? String(value) : typeof value === "string" ? value : null };
  });
  applyGrade(id, g, today);
  const idx = s.idx + 1;
  return {
    ...s,
    idx,
    shown: false,
    tally: { ...s.tally, [g]: s.tally[g] + 1 },
    undoStack: [...s.undoStack, { cardId: id, snapshot, g }],
    finished: idx >= s.cards.length,
  };
}

export function undo(s: SessionState): SessionState {
  const last = s.undoStack.at(-1);
  if (!last) return s;
  setMany(Object.fromEntries(last.snapshot.map(({ key, value }) => [
    key,
    value === null ? undefined : key.startsWith("srs:log:") || key.startsWith("srs:meta:new:") ? Number(value) : value,
  ])));
  return {
    ...s,
    idx: s.idx - 1,
    shown: true,
    tally: { ...s.tally, [last.g]: s.tally[last.g] - 1 },
    undoStack: s.undoStack.slice(0, -1),
    finished: false,
  };
}

export function capReached(s: SessionState, softCap = 120): boolean {
  return s.tally.x + s.tally.t + s.tally.o + s.tally.e >= softCap;
}

export function summary(s: SessionState): { total: number; graded: number; tally: Tally; nextDue: string[] } {
  return {
    total: s.cards.length,
    graded: s.tally.x + s.tally.t + s.tally.o + s.tally.e,
    tally: s.tally,
    nextDue: s.cards.slice(s.idx, s.idx + 3).map((card) => card.id),
  };
}

export function save(s: SessionState): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(s));
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isSession(value: unknown): value is SessionState {
  if (!isObject(value) || typeof value.today !== "string" || !Array.isArray(value.cards)) return false;
  if (!value.cards.every((card: unknown) => isObject(card)
    && typeof card.id === "string" && typeof card.front === "string" && typeof card.back === "string"
    && typeof card.deck === "string" && typeof card.fresh === "boolean")) return false;
  if (typeof value.idx !== "number" || !Number.isInteger(value.idx) || value.idx < 0 || value.idx > value.cards.length) return false;
  if (typeof value.shown !== "boolean" || typeof value.finished !== "boolean") return false;
  const tally = value.tally;
  if (!isObject(tally) || ![tally.x, tally.t, tally.o, tally.e].every((n) => typeof n === "number" && Number.isInteger(n) && n >= 0)) return false;
  return Array.isArray(value.undoStack) && value.undoStack.every((entry: unknown) => isObject(entry)
    && typeof entry.cardId === "string" && ["x", "t", "o", "e"].includes(entry.g as string)
    && Array.isArray(entry.snapshot) && entry.snapshot.every((snapshot: unknown) => isObject(snapshot)
      && typeof snapshot.key === "string" && (snapshot.value === null || typeof snapshot.value === "string")));
}

export function resume(today: string): SessionState | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw === null) return null;
    const state: unknown = JSON.parse(raw);
    if (isSession(state) && state.today === today) return state;
  } catch {
    // Invalid saved JSON is discarded below, just like an invalid shape or stale day.
  }
  clear();
  return null;
}

export function clear(): void {
  localStorage.removeItem(SESSION_KEY);
}

import { init } from "./srs";
import type { Mark, SrsState } from "./srs";
import { cardId, markKey, newKey, srsKey } from "./srs-card";
import { resolveDrift } from "./srs-seed";

export const SRS_SOURCES = ["jitan/decks.json", "yoten/decks.json", "chem/decks.json"] as const;
export type DeckData = Record<string, { title: string; cards: { q: string; a: string; s?: string }[] }>;
export type QueueItem = {
  id: string;
  kind: "card" | "lecture";
  set: string;
  deck: string;
  front: string;
  back: string;
  sub?: string;
  fresh: boolean;
  due: string;
  overdue: number;
};
export type LectureItem = { id: string; title: string; href: string };
export type BuildArgs = {
  today: string;
  decks: Record<string, DeckData>;
  read: (key: string) => unknown;
  lectures?: LectureItem[];
  newPerDay?: number;
  softCap?: number;
  deckFilter?: string;
};
export type BuildResult = {
  due: QueueItem[];
  fresh: QueueItem[];
  lectures: QueueItem[];
  backlogByDeck: { key: string; title: string; count: number }[];
  counts: { due: number; fresh: number; lectures: number; capped: boolean; remaining: number; total: number; newLeft: number };
};

function isMark(value: unknown): value is Mark {
  return value === "o" || value === "t" || value === "x";
}

function parseSrs(raw: unknown): SrsState | null {
  if (typeof raw !== "string") return null;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const state = value as Record<string, unknown>;
  if (typeof state.due !== "string") return null;
  if (typeof state.ivl !== "number") return null;
  if (typeof state.ease !== "number") return null;
  if (typeof state.reps !== "number") return null;
  if (typeof state.lapses !== "number") return null;
  if (typeof state.last !== "string") return null;
  if (!isMark(state.m)) return null;
  return { due: state.due, ivl: state.ivl, ease: state.ease, reps: state.reps, lapses: state.lapses, last: state.last, m: state.m };
}

function compare(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function byDeck(a: QueueItem, b: QueueItem): number {
  return compare(`${a.set}:${a.deck}`, `${b.set}:${b.deck}`) || compare(a.id, b.id);
}

export function buildQueue({ today, decks, read, lectures: lectureItems = [], newPerDay = 15, softCap = 120, deckFilter }: BuildArgs): BuildResult {
  const due: QueueItem[] = [];
  let fresh: QueueItem[] = [];
  const titles = new Map<string, string>();
  const todayUTC = Date.parse(`${today}T00:00:00Z`);

  for (const src of SRS_SOURCES) {
    const set = src.split("/")[0];
    const source = decks[src] ?? {};
    for (const deckId of Object.keys(source)) {
      const key = `${set}:${deckId}`;
      if (deckFilter !== undefined && deckFilter !== key) continue;
      const deck = source[deckId];
      titles.set(key, deck.title);
      for (const card of deck.cards) {
        const id = cardId(set, deckId, card.q);
        const current = parseSrs(read(srsKey(id)));
        const markRaw = read(markKey(id));
        const mark = isMark(markRaw) ? markRaw : undefined;
        const decision = resolveDrift(current, mark, undefined, today);
        const isFresh = !decision.seed && current === null && mark === undefined;
        const state = decision.seed ? decision.state : current ?? init(today);
        if (!isFresh && state.due > today) continue;
        const item: QueueItem = {
          id, kind: "card", set, deck: deckId,
          front: card.q, back: card.a, sub: card.s,
          fresh: isFresh, due: state.due,
          overdue: Math.floor((todayUTC - Date.parse(`${state.due}T00:00:00Z`)) / 86_400_000),
        };
        if (isFresh) fresh.push(item);
        else due.push(item);
      }
    }
  }

  due.sort((a, b) => compare(a.due, b.due) || byDeck(a, b));
  fresh.sort(byDeck);
  const savedNew = Number(read(newKey(today)) ?? 0);
  const already = Number.isFinite(savedNew) ? Math.max(0, savedNew) : 0;
  const newLeft = deckFilter === undefined || titles.has(deckFilter) ? Math.max(0, newPerDay - already) : 0;
  fresh = fresh.slice(0, newLeft);

  // Reserve new cards first; only due cards beyond the remaining budget become backlog.
  const remainingDue = Math.max(0, softCap - fresh.length);
  const queuedDue = due.slice(0, remainingDue);
  const backlog = new Map<string, { key: string; title: string; count: number }>();
  for (const item of due.slice(remainingDue)) {
    const key = `${item.set}:${item.deck}`;
    const row = backlog.get(key);
    if (row) row.count++;
    else backlog.set(key, { key, title: titles.get(key)!, count: 1 });
  }
  const backlogByDeck = [...backlog.values()].sort((a, b) => b.count - a.count || compare(a.key, b.key));
  const lectures: QueueItem[] = deckFilter === undefined ? lectureItems.map((lecture) => ({
    id: lecture.id, kind: "lecture", set: "lecture", deck: "lecture",
    front: lecture.title, back: "", fresh: false, due: today, overdue: 0,
  })) : [];

  return {
    due: queuedDue,
    fresh,
    lectures,
    backlogByDeck,
    counts: {
      due: queuedDue.length, fresh: fresh.length, lectures: lectures.length,
      capped: due.length > remainingDue,
      remaining: due.length - queuedDue.length,
      total: due.length + fresh.length,
      newLeft,
    },
  };
}

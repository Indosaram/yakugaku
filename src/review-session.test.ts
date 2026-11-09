import { afterEach, beforeEach, expect, test } from "bun:test";
import { allKeys, onLocalChange, peekProgress, setMany } from "./progress";
import { cardId, dayKey, markKey, newKey, srsKey, writeSrs, type Grade } from "./srs-card";
import {
  SESSION_KEY, capReached, clear, grade, resume, reveal, save, start, summary, undo,
  type SessionCard, type SessionState,
} from "./review-session";

const TODAY = "2026-11-09";
const cards: SessionCard[] = Array.from({ length: 5 }, (_, i) => ({
  id: cardId("review-session", "test", String(i)),
  front: `front ${i}`,
  back: `back ${i}`,
  deck: "test",
  fresh: true,
}));
const touchedKeys = [...cards.flatMap((card) => [srsKey(card.id), markKey(card.id)]), dayKey(TODAY), newKey(TODAY)];
const storageState = () => Object.fromEntries(touchedKeys.map((key) => [key, peekProgress(key)]));
const persistedState = () => JSON.parse(localStorage.getItem("hoshi-eigo-progress-v1") ?? "{}");
const reset = () => {
  setMany(Object.fromEntries(touchedKeys.map((key) => [key, undefined])));
  clear();
};

beforeEach(reset);
afterEach(reset);

test("start initializes a hidden session, or finishes immediately with no cards", () => {
  expect(start(cards, TODAY)).toEqual({
    today: TODAY,
    cards,
    idx: 0,
    shown: false,
    tally: { x: 0, t: 0, o: 0, e: 0 },
    undoStack: [],
    finished: false,
  });
  expect(start([], TODAY).finished).toBe(true);
});

test("reveal is idempotent and leaves its input unchanged", () => {
  const state = start(cards, TODAY);
  const revealed = reveal(state);
  expect(revealed.shown).toBe(true);
  expect(reveal(revealed)).toEqual(revealed);
  expect(state.shown).toBe(false);
});

test("grade before reveal throws without touching progress", () => {
  const state = start(cards, TODAY);
  const before = storageState();
  expect(() => grade(state, "o", TODAY)).toThrow(new Error("reveal before grading"));
  expect(storageState()).toEqual(before);
});

test("five grades o,o,x,t,e then two undos leave the first three grades", () => {
  let state = start(cards, TODAY);
  for (const g of ["o", "o", "x", "t", "e"] as Grade[]) state = grade(reveal(state), g, TODAY);
  expect(state.finished).toBe(true);
  expect(state.tally).toEqual({ x: 1, t: 1, o: 2, e: 1 });
  state = undo(undo(state));
  expect(state.tally).toEqual({ x: 1, t: 0, o: 2, e: 0 });
  expect(state.idx).toBe(3);
  expect(state.shown).toBe(true);
  expect(state.finished).toBe(false);
  expect(state.undoStack).toHaveLength(3);
});

test("undo-all restores every touched key and nonzero numeric counters exactly", () => {
  writeSrs(cards[0].id, { due: TODAY, ivl: 1, ease: 2, reps: 1, lapses: 0, last: TODAY, m: "t" });
  setMany({ [markKey(cards[0].id)]: "t", [markKey(cards[1].id)]: "x", [dayKey(TODAY)]: 7, [newKey(TODAY)]: 2 });
  const before = storageState();
  const persistedBefore = persistedState();
  expect(peekProgress(srsKey(cards[2].id))).toBeUndefined();
  expect(peekProgress(markKey(cards[2].id))).toBeUndefined();

  let state = start(cards, TODAY);
  for (const g of ["o", "t", "x", "e", "o"] as Grade[]) state = grade(reveal(state), g, TODAY);
  expect(peekProgress(dayKey(TODAY))).toBe(12);
  expect(peekProgress(newKey(TODAY))).toBe(5);
  for (let i = 0; i < cards.length; i++) state = undo(state);

  expect(storageState()).toEqual(before);
  expect(persistedState()).toEqual(persistedBefore);
  expect(peekProgress(newKey(TODAY))).toBe(2);
  expect(state.idx).toBe(0);
  expect(state.tally).toEqual({ x: 0, t: 0, o: 0, e: 0 });
});

test("undo deletes all four previously absent keys in one progress change", () => {
  const before = storageState();
  const persistedBefore = persistedState();
  const state = grade(reveal(start([cards[0]], TODAY)), "e", TODAY);
  const snapshotKeys = [srsKey(cards[0].id), markKey(cards[0].id), dayKey(TODAY), newKey(TODAY)];
  expect(state.undoStack[0]).toEqual({
    cardId: cards[0].id,
    g: "e",
    snapshot: snapshotKeys.map((key) => ({ key, value: null })),
  });
  expect(peekProgress(newKey(TODAY))).toBe(1);
  const changes: string[][] = [];
  const unsubscribe = onLocalChange((keys) => changes.push(keys));
  try {
    undo(state);
  } finally {
    unsubscribe();
  }
  expect(changes).toEqual([snapshotKeys]);
  expect(storageState()).toEqual(before);
  expect(persistedState()).toEqual(persistedBefore);
  expect(peekProgress(newKey(TODAY))).toBeUndefined();
});

test("undo restores present values and deletes absent values in one progress change", () => {
  setMany({ [markKey(cards[0].id)]: "x", [dayKey(TODAY)]: 4 });
  const before = storageState();
  const state = grade(reveal(start([cards[0]], TODAY)), "t", TODAY);
  expect(state.undoStack[0].snapshot).toEqual([
    { key: srsKey(cards[0].id), value: null },
    { key: markKey(cards[0].id), value: "x" },
    { key: dayKey(TODAY), value: "4" },
    { key: newKey(TODAY), value: null },
  ]);
  const changes: string[][] = [];
  const unsubscribe = onLocalChange((keys) => changes.push(keys));
  try {
    undo(state);
  } finally {
    unsubscribe();
  }
  expect(changes).toEqual([[srsKey(cards[0].id), markKey(cards[0].id), dayKey(TODAY)]]);
  expect(storageState()).toEqual(before);
});

test("undo decreases the numeric daily log and new-card quota by one", () => {
  let state = start(cards, TODAY);
  state = grade(reveal(state), "o", TODAY);
  state = grade(reveal(state), "x", TODAY);
  expect(peekProgress(dayKey(TODAY))).toBe(2);
  expect(peekProgress(newKey(TODAY))).toBe(2);
  undo(state);
  expect(peekProgress(dayKey(TODAY))).toBe(1);
  expect(peekProgress(newKey(TODAY))).toBe(1);
});

test("undo with an empty stack returns the exact input", () => {
  const state = start(cards, TODAY);
  expect(undo(state)).toBe(state);
});

test("grade does not mutate its input or its nested tally and stack", () => {
  const state = reveal(start(cards, TODAY));
  const before = structuredClone(state);
  const graded = grade(state, "t", TODAY);
  expect(state).toEqual(before);
  expect(graded).not.toBe(state);
  expect(graded.idx).toBe(1);
  expect(graded.shown).toBe(false);
});

test("undo does not mutate its input or its nested tally, snapshots and stack", () => {
  const state = grade(reveal(start(cards, TODAY)), "e", TODAY);
  const before = structuredClone(state);
  const undone = undo(state);
  expect(state).toEqual(before);
  expect(undone).not.toBe(state);
  expect(undone.idx).toBe(0);
  expect(undone.shown).toBe(true);
  expect(undone.tally).toEqual({ x: 0, t: 0, o: 0, e: 0 });
});

test("save and resume preserve the current card and revealed state locally", () => {
  const state = reveal(grade(reveal(start(cards, TODAY)), "o", TODAY));
  const progressBefore = persistedState();
  const changes: string[][] = [];
  const unsubscribe = onLocalChange((keys) => changes.push(keys));
  let resumed: SessionState | null;
  try {
    save(state);
    resumed = resume(TODAY);
    clear();
  } finally {
    unsubscribe();
  }
  expect(resumed).toEqual(state);
  expect(resumed!.idx).toBe(state.idx);
  expect(resumed!.cards[resumed!.idx].id).toBe(state.cards[state.idx].id);
  expect(resumed!.shown).toBe(true);
  expect(changes).toEqual([]);
  expect(persistedState()).toEqual(progressBefore);
  expect(allKeys()).not.toContain(SESSION_KEY);
  expect(localStorage.getItem(SESSION_KEY)).toBeNull();
});

test("save and resume retain numeric snapshots so undo still restores counters", () => {
  setMany({ [dayKey(TODAY)]: 4, [newKey(TODAY)]: 2 });
  const before = storageState();
  save(grade(reveal(start([cards[0]], TODAY)), "o", TODAY));
  const state = resume(TODAY);
  expect(state).not.toBeNull();
  undo(state!);
  expect(storageState()).toEqual(before);
});

test("resume clears a saved session on day rollover", () => {
  save(start(cards, TODAY));
  expect(localStorage.getItem(SESSION_KEY)).not.toBeNull();
  expect(resume("2026-11-10")).toBeNull();
  expect(localStorage.getItem(SESSION_KEY)).toBeNull();
});

test("resume discards corrupt JSON without throwing", () => {
  localStorage.setItem(SESSION_KEY, "{");
  let state: SessionState | null | undefined;
  expect(() => { state = resume(TODAY); }).not.toThrow();
  expect(state).toBeNull();
  expect(localStorage.getItem(SESSION_KEY)).toBeNull();
});

test("resume rejects malformed fields and clears the local key", () => {
  const valid = start(cards, TODAY);
  const malformed: unknown[] = [
    null,
    [],
    4,
    { ...valid, today: 9 },
    { ...valid, cards: {} },
    { ...valid, cards: [null] },
    { ...valid, cards: [{ ...cards[0], fresh: "yes" }] },
    { ...valid, idx: "0" },
    { ...valid, idx: -1 },
    { ...valid, idx: 0.5 },
    { ...valid, idx: cards.length + 1 },
    { ...valid, shown: 1 },
    { ...valid, finished: "false" },
    { ...valid, tally: null },
    { ...valid, tally: { x: 0, t: 0, o: 0 } },
    { ...valid, tally: { ...valid.tally, e: "0" } },
    { ...valid, tally: { ...valid.tally, x: -1 } },
    { ...valid, undoStack: null },
    { ...valid, undoStack: [{ cardId: cards[0].id, g: "bad", snapshot: [] }] },
    { ...valid, undoStack: [{ cardId: cards[0].id, g: "o", snapshot: [{ key: srsKey(cards[0].id), value: 4 }] }] },
  ];
  for (const value of malformed) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(value));
    expect(resume(TODAY)).toBeNull();
    expect(localStorage.getItem(SESSION_KEY)).toBeNull();
  }
});

test("resume returns null when absent and accepts empty and finished sessions", () => {
  expect(resume(TODAY)).toBeNull();
  const empty = start([], TODAY);
  save(empty);
  expect(resume(TODAY)).toEqual(empty);
  const finished = grade(reveal(start([cards[0]], TODAY)), "x", TODAY);
  save(finished);
  expect(resume(TODAY)).toEqual(finished);
});

test("capReached uses all tally buckets at the default boundary and accepts a custom cap", () => {
  const state = start(cards, TODAY);
  expect(capReached(state)).toBe(false);
  expect(capReached({ ...state, tally: { x: 30, t: 30, o: 30, e: 29 } })).toBe(false);
  expect(capReached({ ...state, tally: { x: 30, t: 30, o: 30, e: 30 } })).toBe(true);
  expect(capReached({ ...state, tally: { x: 30, t: 30, o: 30, e: 31 } })).toBe(true);
  expect(capReached({ ...state, tally: { x: 1, t: 1, o: 1, e: 1 } }, 4)).toBe(true);
});

test("summary reports tally totals and up to three pending cards in order", () => {
  let state = start(cards, TODAY);
  state = grade(reveal(state), "t", TODAY);
  state = grade(reveal(state), "e", TODAY);
  const result = summary(state);
  expect(result).toEqual({
    total: 5,
    graded: 2,
    tally: { x: 0, t: 1, o: 0, e: 1 },
    nextDue: [cards[2].id, cards[3].id, cards[4].id],
  });
  expect(result.graded).toBe(result.tally.x + result.tally.t + result.tally.o + result.tally.e);
  expect(summary(start(cards, TODAY)).nextDue).toEqual([cards[0].id, cards[1].id, cards[2].id]);
  for (const g of ["x", "o", "o"] as Grade[]) state = grade(reveal(state), g, TODAY);
  expect(summary(state).nextDue).toEqual([]);
  expect(summary(state).graded).toBe(5);
});

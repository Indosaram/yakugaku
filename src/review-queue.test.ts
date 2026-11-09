import { expect, spyOn, test } from "bun:test";
import { init } from "./srs";
import { cardId, markKey, newKey, srsKey } from "./srs-card";
import { buildQueue, SRS_SOURCES } from "./review-queue";
import type { BuildArgs, DeckData, LectureItem } from "./review-queue";

const TODAY = "2026-11-09";
const decks: Record<string, DeckData> = Object.fromEntries(await Promise.all(SRS_SOURCES.map(async (src) => [
  src, await Bun.file(`public/data/${src}`).json() as DeckData,
])));
const allCards = SRS_SOURCES.flatMap((src) => {
  const set = src.split("/")[0];
  return Object.entries(decks[src]).flatMap(([deck, data]) => data.cards.map((card) => ({
    ...card, set, deck, id: cardId(set, deck, card.q),
  })));
});
const jt1 = allCards.filter((card) => card.set === "jitan" && card.deck === "jt1");
const allDue = Object.freeze(Object.fromEntries(allCards.map((card) => [markKey(card.id), "x"])));
const lectures: LectureItem[] = [{ id: "lecture:1", title: "Lecture 1", href: "/lecture/1" }];
const reader = (values: Record<string, unknown> = {}) => (key: string) => values[key];

function scheduled(id: string, due: string): Record<string, unknown> {
  return { [srsKey(id)]: JSON.stringify(init(due)), [markKey(id)]: "x" };
}

test("enumerates all 959 real cards and ignores yogo and trig sources", () => {
  expect(SRS_SOURCES).toEqual(["jitan/decks.json", "yoten/decks.json", "chem/decks.json"]);
  expect(SRS_SOURCES.map((src) => Object.values(decks[src]).reduce((sum, deck) => sum + deck.cards.length, 0))).toEqual([461, 415, 83]);
  expect(allCards).toHaveLength(959);
  const extra = { excluded: { title: "Excluded", cards: [{ q: "Out of scope", a: "Not queued" }] } };
  const result = buildQueue({
    today: TODAY,
    decks: { ...decks, "yoten/yogo.json": extra, "trig/decks.json": extra },
    read: reader(allDue),
    softCap: 959,
  });
  expect(result.counts.total).toBe(959);
  expect(result.due).toHaveLength(959);
  expect(new Set(result.due.map((card) => card.id))).toEqual(new Set(allCards.map((card) => card.id)));
  expect(result.due.some((card) => card.set === "trig" || card.deck === "excluded")).toBe(false);
});

test("reads cards in source, deck insertion, and card array order", () => {
  const keys: string[] = [];
  buildQueue({ today: TODAY, decks, read: (key) => { keys.push(key); return undefined; } });
  expect(keys).toEqual([
    ...allCards.flatMap((card) => [srsKey(card.id), markKey(card.id)]),
    newKey(TODAY),
  ]);
});

test("all-due cards are capped at 120 with an 839-card backlog", () => {
  const result = buildQueue({ today: TODAY, decks, read: reader(allDue) });
  expect(result.due).toHaveLength(120);
  expect(result.fresh).toEqual([]);
  expect(result.due.every((card) => !card.fresh && card.due === TODAY && card.overdue === 0)).toBe(true);
  expect(result.counts).toEqual({ due: 120, fresh: 0, lectures: 0, capped: true, remaining: 839, total: 959, newLeft: 15 });
});

test("empty storage supplies fifteen fresh cards without negative backlog", () => {
  const result = buildQueue({ today: TODAY, decks, read: reader() });
  expect(result.due).toEqual([]);
  expect(result.fresh).toHaveLength(15);
  expect(result.fresh.every((card) => card.fresh && card.due === TODAY && card.overdue === 0)).toBe(true);
  expect(result.backlogByDeck).toEqual([]);
  expect(result.counts).toEqual({ due: 0, fresh: 15, lectures: 0, capped: false, remaining: 0, total: 15, newLeft: 15 });
});

test("eighty already-saved new cards never produce a negative quota or extra cards", () => {
  const result = buildQueue({ today: TODAY, decks, read: reader({ [newKey(TODAY)]: 80 }) });
  expect(result.counts.newLeft).toBe(0);
  expect(result.counts.newLeft).toBeGreaterThanOrEqual(0);
  expect(result.fresh).toEqual([]);
  expect(result.counts.total).toBe(0);
  expect(buildQueue({ today: TODAY, decks, read: reader({ [newKey(TODAY)]: 15 }) }).fresh).toEqual([]);
});

test("five new cards already saved leave room for exactly ten more", () => {
  for (const saved of [5, "5"]) {
    const result = buildQueue({ today: TODAY, decks, read: reader({ [newKey(TODAY)]: saved }) });
    expect(result.counts.newLeft).toBe(10);
    expect(result.fresh).toHaveLength(10);
    expect(result.counts.fresh).toBe(10);
    expect(result.counts.total).toBe(10);
  }
});

test("negative and non-finite saved quotas fall back to zero", () => {
  for (const saved of [-5, "-5", NaN, Infinity, -Infinity, "not a number"]) {
    const result = buildQueue({ today: TODAY, decks, read: reader({ [newKey(TODAY)]: saved }) });
    expect(result.counts.newLeft).toBe(15);
    expect(result.fresh).toHaveLength(15);
  }
});

test("identical inputs produce deep-equal queues without mutating decks or storage", () => {
  const values: Record<string, unknown> = { ...allDue, ...scheduled(jt1[0].id, "2026-10-30") };
  delete values[markKey(jt1[1].id)];
  const before = structuredClone({ decks, values, lectures });
  const args: BuildArgs = { today: TODAY, decks, read: reader(values), lectures };
  expect(buildQueue(args)).toEqual(buildQueue(args));
  expect({ decks, values, lectures }).toEqual(before);
});

test("due cards sort oldest first and retain exact whole-day overdue counts", () => {
  const dates = [TODAY, "2026-10-30", "2026-11-06"];
  const values = Object.assign({}, ...dates.map((due, i) => scheduled(jt1[i].id, due)));
  const result = buildQueue({ today: TODAY, decks, read: reader(values), newPerDay: 0 });
  expect(result.due.map((card) => card.id)).toEqual([jt1[1].id, jt1[2].id, jt1[0].id]);
  expect(result.due.map((card) => card.due)).toEqual(["2026-10-30", "2026-11-06", TODAY]);
  expect(result.due.map((card) => card.overdue)).toEqual([10, 3, 0]);
  expect(result.counts.remaining).toBe(0);
});

test("o mark timestamps preserve overdue dates while missing timestamps fall back to today", () => {
  const markTimes = Object.freeze({ [markKey(jt1[0].id)]: new Date(2026, 9, 10, 12).getTime() });
  const result = buildQueue({
    today: TODAY, decks, newPerDay: 0, markTimes,
    read: reader({ [markKey(jt1[0].id)]: "o", [markKey(jt1[1].id)]: "o" }),
  });
  expect(result.due.map((card) => [card.id, card.due, card.overdue])).toEqual([
    [jt1[0].id, "2026-10-17", 23],
    [jt1[1].id, TODAY, 0],
  ]);
  expect(result.backlogByDeck).toEqual([]);
});

test("recent o marks stay out of the queue until seven local calendar days have passed", () => {
  const id = jt1[0].id;
  const markTimes = { [markKey(id)]: new Date(2026, 10, 6, 12).getTime() };
  const args = { decks, read: reader({ [markKey(id)]: "o" }), markTimes, newPerDay: 0 };
  expect(buildQueue({ ...args, today: TODAY }).due).toEqual([]);
  expect(buildQueue({ ...args, today: "2026-11-13" }).due.map((card) => [card.id, card.due])).toEqual([
    [id, "2026-11-13"],
  ]);
});

test("mark timestamps reseed drift without overriding a matching stored schedule", () => {
  const markTimes = Object.fromEntries(jt1.slice(0, 2).map((card) => [markKey(card.id), new Date(2026, 9, 10, 12).getTime()]));
  const values = {
    [srsKey(jt1[0].id)]: JSON.stringify({ ...init("2026-11-20"), m: "o" }),
    [srsKey(jt1[1].id)]: JSON.stringify({ ...init("2026-11-20"), m: "t" }),
    [markKey(jt1[0].id)]: "o",
    [markKey(jt1[1].id)]: "o",
  };
  const result = buildQueue({ today: TODAY, decks, read: reader(values), markTimes, newPerDay: 0 });
  expect(result.due.map((card) => [card.id, card.due, card.overdue])).toEqual([
    [jt1[1].id, "2026-10-17", 23],
  ]);
});

test("equal due dates and fresh cards sort by qualified deck key then card id", () => {
  const fixture: Record<string, DeckData> = {
    "yoten/decks.json": { a: { title: "Yoten", cards: [{ q: "a", a: "answer" }] } },
    "jitan/decks.json": {
      jt10: { title: "Ten", cards: [{ q: "a", a: "answer" }] },
      jt1: { title: "One", cards: [{ q: "z", a: "answer" }, { q: "a", a: "answer" }] },
    },
    "chem/decks.json": { a: { title: "Chem", cards: [{ q: "a", a: "answer" }] } },
  };
  const expected = ["card:chem:a:a", "card:jitan:jt1:a", "card:jitan:jt1:z", "card:jitan:jt10:a", "card:yoten:a:a"];
  const values = Object.fromEntries(expected.map((id) => [markKey(id), "x"]));
  expect(buildQueue({ today: TODAY, decks: fixture, read: reader(values) }).due.map((card) => card.id)).toEqual(expected);
  expect(buildQueue({ today: TODAY, decks: fixture, read: reader() }).fresh.map((card) => card.id)).toEqual(expected);
});

test("UTC midnight overdue arithmetic does not lose a day across DST", () => {
  for (const [today, due] of [["2026-03-09", "2026-03-07"], ["2026-11-02", "2026-10-31"], ["2028-03-01", "2028-02-28"]]) {
    const result = buildQueue({ today, decks, read: reader(scheduled(jt1[0].id, due)), newPerDay: 0 });
    expect(result.due).toHaveLength(1);
    expect(result.due[0].overdue).toBe(2);
  }
});

test("jitan:jt1 filters before counting and contains exactly its twenty real cards", () => {
  const result = buildQueue({ today: TODAY, decks, read: reader(allDue), deckFilter: "jitan:jt1" });
  expect(jt1).toHaveLength(20);
  expect(result.due).toHaveLength(20);
  expect(result.due.every((card) => card.set === "jitan" && card.deck === "jt1")).toBe(true);
  expect(new Set(result.due.map((card) => card.id))).toEqual(new Set(jt1.map((card) => card.id)));
  expect(result.counts.total).toBe(20);
  expect(result.counts.due).toBe(20);
  expect(result.counts.remaining).toBe(0);
  expect(result.counts.capped).toBe(false);
  expect(result.backlogByDeck).toEqual([]);
});

test("an unknown deck filter returns empty arrays and entirely zero counts", () => {
  const result = buildQueue({ today: TODAY, decks, read: reader(allDue), deckFilter: "jitan:missing", lectures });
  expect(result).toEqual({
    due: [], fresh: [], lectures: [], dueByDeck: new Map(), backlogByDeck: [],
    counts: { due: 0, fresh: 0, lectures: 0, capped: false, remaining: 0, total: 0, newLeft: 0 },
  });
});

test("corrupt SRS JSON is absent and leaves the card fresh", () => {
  const result = buildQueue({
    today: TODAY, decks, deckFilter: "jitan:jt1", newPerDay: 20,
    read: reader({ [srsKey(jt1[0].id)]: "{" }),
  });
  expect(result.fresh).toHaveLength(20);
  expect(result.fresh.find((card) => card.id === jt1[0].id)?.fresh).toBe(true);
  expect(result.due).toEqual([]);
});

test("non-string and wrong-shaped SRS values are validated like readSrs", () => {
  const state = init(TODAY);
  const invalid: unknown[] = [
    undefined, null, 5, true, state, "null", "[]", '"state"', "{}",
    ...["due", "ivl", "ease", "reps", "lapses", "last", "m"].map((key) => {
      const missing: Record<string, unknown> = { ...state };
      delete missing[key];
      return JSON.stringify(missing);
    }),
    ...Object.entries({ due: 5, ivl: "0", ease: "2", reps: "0", lapses: "0", last: 5, m: "e" }).map(([key, value]) => JSON.stringify({ ...state, [key]: value })),
  ];
  for (const raw of invalid) {
    const result = buildQueue({
      today: TODAY, decks, deckFilter: "jitan:jt1", newPerDay: 20,
      read: reader({ [srsKey(jt1[0].id)]: raw }),
    });
    expect(result.fresh.find((card) => card.id === jt1[0].id)?.fresh).toBe(true);
    expect(result.due).toEqual([]);
  }
});

test("matching future states stay out, drift resets due today, and invalid marks are fresh", () => {
  const values: Record<string, unknown> = {
    [srsKey(jt1[0].id)]: JSON.stringify({ ...init("2026-11-20"), m: "o" }),
    [markKey(jt1[0].id)]: "o",
    [srsKey(jt1[1].id)]: JSON.stringify({ ...init("2026-11-20"), m: "o" }),
    [markKey(jt1[1].id)]: "x",
    [srsKey(jt1[2].id)]: JSON.stringify(init("2026-11-20")),
    [markKey(jt1[3].id)]: "o",
    [markKey(jt1[4].id)]: "t",
    [markKey(jt1[5].id)]: "invalid",
    [markKey(jt1[6].id)]: true,
  };
  const result = buildQueue({ today: TODAY, decks, deckFilter: "jitan:jt1", read: reader(values), newPerDay: 20 });
  expect(new Set(result.due.map((card) => card.id))).toEqual(new Set(jt1.slice(1, 5).map((card) => card.id)));
  expect(result.due.every((card) => card.due === TODAY && !card.fresh)).toBe(true);
  expect(result.fresh.some((card) => card.id === jt1[5].id)).toBe(true);
  expect(result.fresh.some((card) => card.id === jt1[6].id)).toBe(true);
  expect([...result.due, ...result.fresh].some((card) => card.id === jt1[0].id)).toBe(false);
});

test("quoted CJK questions round-trip through card ids, stored state, and queue content", () => {
  const q = '"Fe²⁺"와 漢字의 의미는?';
  const card = { q, a: '정답 "回答"', s: "補足 설명" };
  const id = cardId("jitan", "unicode", q);
  expect(id).toBe('card:jitan:unicode:"Fe²⁺"와 漢字의 의미는?');
  const result = buildQueue({
    today: TODAY,
    decks: { "jitan/decks.json": { unicode: { title: "Unicode", cards: [card] } } },
    read: reader(scheduled(id, TODAY)),
  });
  expect(result.due).toEqual([{
    id, kind: "card", set: "jitan", deck: "unicode", front: q, back: card.a, sub: card.s,
    fresh: false, due: TODAY, overdue: 0,
  }]);
});

test("lectures survive a full or zero soft cap and are absent when not supplied", () => {
  for (const softCap of [0, 1, 120]) {
    const result = buildQueue({ today: TODAY, decks, read: reader(allDue), softCap, lectures });
    expect(result.counts.lectures).toBe(1);
    expect(result.lectures).toEqual([{
      id: "lecture:1", kind: "lecture", set: "lecture", deck: "lecture", front: "Lecture 1", back: "",
      fresh: false, due: TODAY, overdue: 0,
    }]);
    expect(result.due).toHaveLength(softCap);
    expect(result.counts.total).toBe(959);
  }
  const without = buildQueue({ today: TODAY, decks, read: reader(allDue) });
  expect(without.counts.lectures).toBe(0);
  expect(without.lectures).toEqual([]);
  expect(buildQueue({ today: TODAY, decks, read: reader(allDue), deckFilter: "jitan:jt1", lectures }).lectures).toEqual([]);
});

test("backlog rows exactly count uncapped cards and sum to remaining", () => {
  const result = buildQueue({ today: TODAY, decks, read: reader(allDue) });
  const full = buildQueue({ today: TODAY, decks, read: reader(allDue), softCap: 959 });
  const expected = new Map<string, number>();
  for (const card of full.due.slice(120)) {
    const key = `${card.set}:${card.deck}`;
    expected.set(key, (expected.get(key) ?? 0) + 1);
  }
  expect(result.backlogByDeck).toHaveLength(expected.size);
  expect(result.backlogByDeck.reduce((sum, row) => sum + row.count, 0)).toBe(result.counts.remaining);
  expect(result.counts.remaining).toBe(839);
  expect(result.backlogByDeck.map((row) => row.key)).toEqual([...expected.keys()]);
  for (const row of result.backlogByDeck) {
    expect(row.count).toBeGreaterThan(0);
    expect(expected.get(row.key)).toBe(row.count);
    const [set, deck] = row.key.split(":");
    expect(row.title).toBe(decks[`${set}/decks.json`][deck].title);
  }
});

test("one hundred due cards across three decks remain visible below the soft cap", () => {
  const fixture: Record<string, DeckData> = {
    "jitan/decks.json": {
      jt1: { title: "One", cards: Array.from({ length: 40 }, (_, i) => ({ q: String(i), a: "answer" })) },
      jt2: { title: "Two", cards: Array.from({ length: 35 }, (_, i) => ({ q: String(i), a: "answer" })) },
      jt3: { title: "Three", cards: Array.from({ length: 25 }, (_, i) => ({ q: String(i), a: "answer" })) },
    },
  };
  const values = Object.fromEntries(Object.entries(fixture["jitan/decks.json"]).flatMap(([deck, data]) => (
    data.cards.map((card) => [markKey(cardId("jitan", deck, card.q)), "x"])
  )));
  const result = buildQueue({ today: TODAY, decks: fixture, read: reader(values), softCap: 120 });
  expect(result.dueByDeck.size).toBe(3);
  expect([...result.dueByDeck.values()]).toEqual([
    { key: "jitan:jt1", title: "One", count: 40 },
    { key: "jitan:jt2", title: "Two", count: 35 },
    { key: "jitan:jt3", title: "Three", count: 25 },
  ]);
  expect([...result.dueByDeck.values()].reduce((sum, row) => sum + row.count, 0)).toBe(100);
  expect(result.due).toHaveLength(100);
  expect(result.backlogByDeck).toEqual([]);
});

test("two hundred due cards retain all per-deck counts above the soft cap", () => {
  const fixture: Record<string, DeckData> = {
    "jitan/decks.json": {
      jt1: { title: "One", cards: Array.from({ length: 80 }, (_, i) => ({ q: String(i), a: "answer" })) },
      jt2: { title: "Two", cards: Array.from({ length: 70 }, (_, i) => ({ q: String(i), a: "answer" })) },
      jt3: { title: "Three", cards: Array.from({ length: 50 }, (_, i) => ({ q: String(i), a: "answer" })) },
    },
  };
  const values = Object.fromEntries(Object.entries(fixture["jitan/decks.json"]).flatMap(([deck, data]) => (
    data.cards.map((card) => [markKey(cardId("jitan", deck, card.q)), "x"])
  )));
  const result = buildQueue({ today: TODAY, decks: fixture, read: reader(values), softCap: 120 });
  expect(result.dueByDeck.size).toBe(3);
  expect([...result.dueByDeck.values()].reduce((sum, row) => sum + row.count, 0)).toBe(200);
  expect(result.due).toHaveLength(120);
  expect(result.backlogByDeck.reduce((sum, row) => sum + row.count, 0)).toBe(80);
  expect(result.backlogByDeck).toEqual([
    { key: "jitan:jt2", title: "Two", count: 30 },
    { key: "jitan:jt3", title: "Three", count: 50 },
  ]);
});

test("all-due and overflow deck rows sort by oldest due day then qualified deck key", () => {
  const fixture: Record<string, DeckData> = {
    "jitan/decks.json": {
      a: { title: "A", cards: [{ q: "a", a: "answer" }] },
      b: { title: "B", cards: [{ q: "b", a: "answer" }, { q: "c", a: "answer" }] },
      c: { title: "C", cards: [{ q: "a", a: "answer" }] },
    },
  };
  const values = {
    ...scheduled(cardId("jitan", "a", "a"), "2026-11-08"),
    ...scheduled(cardId("jitan", "b", "b"), "2026-11-01"),
    ...scheduled(cardId("jitan", "b", "c"), "2026-11-08"),
    ...scheduled(cardId("jitan", "c", "a"), "2026-11-01"),
  };
  const args = { today: TODAY, decks: fixture, read: reader(values) };
  const result = buildQueue({ ...args, softCap: 0 });
  expect([...result.dueByDeck.keys()]).toEqual(["jitan:b", "jitan:c", "jitan:a"]);
  expect(result.backlogByDeck.map((row) => row.key)).toEqual(["jitan:b", "jitan:c", "jitan:a"]);
  expect(buildQueue({ ...args, softCap: 2 }).backlogByDeck.map((row) => row.key)).toEqual(["jitan:a", "jitan:b"]);
});

test("fresh quota is reserved first so backlog cannot starve fifteen new cards", () => {
  const values: Record<string, unknown> = { ...allDue };
  for (const card of jt1) delete values[markKey(card.id)];
  const result = buildQueue({ today: TODAY, decks, read: reader(values) });
  expect(result.fresh).toHaveLength(15);
  expect(result.due).toHaveLength(105);
  expect(result.counts.total).toBe(954);
  expect(result.counts.remaining).toBe(834);
  expect(result.counts.capped).toBe(true);
  expect(result.backlogByDeck.reduce((sum, row) => sum + row.count, 0)).toBe(834);
});

test("a soft cap below the fresh quota never truncates fresh cards", () => {
  const values: Record<string, unknown> = { ...allDue };
  for (const card of jt1) delete values[markKey(card.id)];
  const result = buildQueue({ today: TODAY, decks, read: reader(values), softCap: 10 });
  expect(result.fresh).toHaveLength(15);
  expect(result.due).toEqual([]);
  expect(result.counts.remaining).toBe(939);
  expect(result.counts.total).toBe(954);
});

test("building the queue uses only injected storage reads and never touches browser storage", () => {
  const getItem = spyOn(localStorage, "getItem");
  const setItem = spyOn(localStorage, "setItem");
  const removeItem = spyOn(localStorage, "removeItem");
  const clear = spyOn(localStorage, "clear");
  try {
    buildQueue({ today: TODAY, decks, read: reader(allDue) });
    expect(getItem).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
    expect(removeItem).not.toHaveBeenCalled();
    expect(clear).not.toHaveBeenCalled();
  } finally {
    getItem.mockRestore();
    setItem.mockRestore();
    removeItem.mockRestore();
    clear.mockRestore();
  }
});

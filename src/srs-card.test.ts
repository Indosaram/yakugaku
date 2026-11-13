import { expect, test } from "bun:test";
import { itemsFor, peekProgress, setMany } from "./progress";
import { markKey } from "./marks";
import { applyGrade, cardId, dayKey, gradeToMark, newKey, readSrs, srsKey, writeSrs } from "./srs-card";

const raw = (k: string) => {
  const v = peekProgress(k);
  return typeof v === "string" ? v : "";
};

const num = (k: string) => Number(peekProgress(k) ?? 0);

test("cardId matches Chem.tsx's template byte-for-byte", () => {
  // Hand-written fixtures: `card:${set}:${deckId}:${question}`
  const fixtures: [string, string, string, string][] = [
    ["chem", "colors", "Fe²⁺", "card:chem:colors:Fe²⁺"],
    ["jitan", "halogen", "Cl₂의 상온 상태는?", "card:jitan:halogen:Cl₂의 상온 상태는?"],
    ["yoten", "inorganic-1", "양쪽성 원소 네 가지", "card:yoten:inorganic-1:양쪽성 원소 네 가지"],
  ];
  for (const [set, deck, q, want] of fixtures) expect(cardId(set, deck, q)).toBe(want);
});

test("key builders keep the documented prefixes", () => {
  expect(srsKey("card:chem:x:y")).toBe("srs:card:chem:x:y");
  expect(dayKey("2026-11-09")).toBe("srs:log:2026-11-09");
  expect(newKey("2026-11-09")).toBe("srs:meta:new:2026-11-09");
  expect(markKey("card:chem:x:y")).toBe("mark:card:chem:x:y");
});

test("gradeToMark maps e to o and leaves x/t alone", () => {
  expect(gradeToMark("e")).toBe("o");
  expect(gradeToMark("o")).toBe("o");
  expect(gradeToMark("t")).toBe("t");
  expect(gradeToMark("x")).toBe("x");
});

test("readSrs returns null for invalid JSON and for valid-JSON-wrong-shape", () => {
  const id = "card:chem:probe:shape";
  setMany({ [srsKey(id)]: "{not json" });
  expect(readSrs(id)).toBeNull();

  for (const bad of ['"5"', "{}", JSON.stringify({ ivl: 1, ease: 2, reps: 0, lapses: 0, last: "2026-11-09", m: "x" })]) {
    setMany({ [srsKey(id)]: bad });
    expect(readSrs(id)).toBeNull();
  }

  setMany({
    [srsKey(id)]: JSON.stringify({ due: "2026-11-09", ivl: 1, ease: 2, reps: 0, lapses: 0, last: "2026-11-09", m: "nope" }),
  });
  expect(readSrs(id)).toBeNull();
});

test("readSrs and writeSrs round-trip a valid state", () => {
  const id = "card:chem:probe:roundtrip";
  const state = { due: "2026-11-12", ivl: 3, ease: 2.15, reps: 2, lapses: 1, last: "2026-11-09", m: "t" as const };
  writeSrs(id, state);
  expect(readSrs(id)).toEqual(state);
});

test("one applyGrade writes srs:, mark: and srs:log: together", () => {
  const id = "card:chem:probe:together";
  const today = "2031-01-01";
  const before = { due: "2030-12-01", ivl: 1, ease: 2, reps: 1, lapses: 0, last: "2030-12-01", m: "x" as const };
  writeSrs(id, before);
  setMany({ [markKey(id)]: "x", [dayKey(today)]: 4 });
  const srsBefore = raw(srsKey(id));
  const logBefore = num(dayKey(today));

  applyGrade(id, "o", today);

  const after = readSrs(id);
  expect(after).not.toBeNull();
  expect(after!.m).toBe("o");
  expect(after!.reps).toBe(2);
  expect(raw(srsKey(id))).not.toBe(srsBefore);
  // The mark actually changed from "x" to "o", so setMany cannot skip it.
  expect(peekProgress(markKey(id))).toBe("o");
  expect(num(dayKey(today))).toBe(logBefore + 1);
  // One setMany call stamps every affected key with the same updatedAt.
  const stampOf = (k: string) => itemsFor([k])[0]?.t;
  const stamps = [srsKey(id), markKey(id), dayKey(today)].map(stampOf);
  expect(stamps.every((t) => t !== undefined)).toBe(true);
  expect(new Set(stamps).size).toBe(1);
});

test("a truly new card increments srs:meta:new: by exactly 1", () => {
  const id = "card:jitan:probe:brandnew";
  const today = "2031-02-02";
  const before = num(newKey(today));

  applyGrade(id, "o", today);

  expect(num(newKey(today))).toBe(before + 1);
  expect(readSrs(id)!.m).toBe("o");
  expect(peekProgress(markKey(id))).toBe("o");
  expect(num(dayKey(today))).toBeGreaterThanOrEqual(1);
});

test("a card with mark:x but no srs: is not counted as new", () => {
  const id = "card:jitan:probe:markedonly";
  const today = "2031-03-03";
  setMany({ [markKey(id)]: "x" });
  const before = num(newKey(today));

  applyGrade(id, "t", today);

  expect(num(newKey(today))).toBe(before);
  expect(readSrs(id)).not.toBeNull();
  expect(peekProgress(markKey(id))).toBe("t");
});

test("the first o grade advances from a lazy o seed at seven days to thirty days", () => {
  const id = "card:jitan:probe:seeded-o";
  const today = "2031-04-04";
  setMany({ [markKey(id)]: "o" });
  const before = num(newKey(today));
  expect(readSrs(id)).toBeNull();

  applyGrade(id, "o", today);

  expect(readSrs(id)).toEqual({
    due: "2031-05-04", ivl: 30, ease: 2, reps: 1, lapses: 0, last: today, m: "o",
  });
  expect(num(newKey(today))).toBe(before);
});

test("grading o after a deck mark changes from o to x reseeds a sixty-day schedule", () => {
  const id = "card:jitan:probe:drifted-x";
  const today = "2031-05-05";
  writeSrs(id, { due: "2031-07-04", ivl: 60, ease: 2.8, reps: 8, lapses: 2, last: today, m: "o" });
  setMany({ [markKey(id)]: "x" });
  const before = num(newKey(today));

  applyGrade(id, "o", today);

  const after = readSrs(id)!;
  expect(after.ivl).toBeLessThanOrEqual(7);
  expect(after).toEqual({
    due: "2031-05-08", ivl: 3, ease: 2, reps: 1, lapses: 0, last: today, m: "o",
  });
  expect(num(newKey(today))).toBe(before);
});

test("a cleared mark resets the schedule without consuming a new-card quota", () => {
  const id = "card:jitan:probe:cleared-mark";
  const today = "2031-06-06";
  writeSrs(id, { due: "2031-08-05", ivl: 60, ease: 2, reps: 8, lapses: 0, last: today, m: "o" });
  expect(peekProgress(markKey(id))).toBeUndefined();
  const before = num(newKey(today));

  applyGrade(id, "o", today);

  expect(readSrs(id)!.ivl).toBe(3);
  expect(readSrs(id)!.reps).toBe(1);
  expect(num(newKey(today))).toBe(before);
});

test("the first o grade advances from a lazy t seed without consuming a new-card quota", () => {
  const id = "card:jitan:probe:seeded-t";
  const today = "2031-07-07";
  setMany({ [markKey(id)]: "t" });
  const before = num(newKey(today));

  applyGrade(id, "o", today);

  expect(readSrs(id)!.ivl).toBe(7);
  expect(num(newKey(today))).toBe(before);
});

test("all 1329 card keys across the three decks fit in 400 chars", async () => {
  let total = 0;
  const tooLong: string[] = [];
  for (const name of ["jitan", "yoten", "chem"]) {
    const file = Bun.file(`public/data/${name}/decks.json`);
    const decks = (await file.json()) as Record<string, { cards: { q: string }[] }>;
    for (const [deckId, deck] of Object.entries(decks)) {
      for (const card of deck.cards) {
        const id = cardId(name, deckId, card.q);
        total++;
        if (id.length > 400) tooLong.push(`${id.length}: ${id.slice(0, 60)}`);
      }
    }
  }
  expect(total).toBe(1329);
  expect(tooLong).toEqual([]);
});

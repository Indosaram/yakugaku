import { expect, spyOn, test } from "bun:test";
import { init, todayISO } from "./srs";
import type { Mark, SrsState } from "./srs";
import { cardId } from "./srs-card";
import { dueTodayCount, resolveDrift, seedFromMark } from "./srs-seed";

const today = "2026-11-09";
const threeDaysAgo = new Date(2026, 10, 6, 12).getTime();
const thirtyDaysAgo = new Date(2026, 9, 10, 12).getTime();

function inTimezone(zone: string, run: () => void) {
  const previous = process.env.TZ;
  process.env.TZ = zone;
  try {
    run();
  } finally {
    if (previous === undefined) delete process.env.TZ;
    else process.env.TZ = previous;
  }
}

test("an unmarked card has no seeded state", () => {
  for (const timestamp of [undefined, 0, NaN, threeDaysAgo]) {
    expect(seedFromMark(undefined, timestamp, today)).toBeNull();
  }
});

test("x starts at zero days and is due today", () => {
  expect(seedFromMark("x", threeDaysAgo, today)).toEqual({
    due: today, ivl: 0, ease: 2.0, reps: 0, lapses: 0, last: today, m: "x",
  });
});

test("t starts at one day and is due today with its mark intact", () => {
  expect(seedFromMark("t", threeDaysAgo, today)).toEqual({
    due: today, ivl: 1, ease: 2.0, reps: 0, lapses: 0, last: today, m: "t",
  });
  expect(dueTodayCount([seedFromMark("t", undefined, today)!], today)).toBe(1);
});

test("o marked three days ago is due four days from today", () => {
  expect(seedFromMark("o", threeDaysAgo, today)).toEqual({
    due: "2026-11-13", ivl: 7, ease: 2.0, reps: 0, lapses: 0, last: "2026-11-06", m: "o",
  });
});

test("o with a zero or missing timestamp is immediately due", () => {
  for (const timestamp of [0, undefined]) {
    expect(seedFromMark("o", timestamp, today)).toEqual({
      due: today, ivl: 7, ease: 2.0, reps: 0, lapses: 0, last: today, m: "o",
    });
  }
});

test("every seeded state carries its input mark and does not drift again", () => {
  for (const mark of ["x", "t", "o"] as const) {
    const state = seedFromMark(mark, threeDaysAgo, today);
    expect(state).not.toBeNull();
    expect(state!.m).toBe(mark);
    expect(resolveDrift(state, mark, threeDaysAgo, today)).toEqual({ seed: false });
  }
});

test("resolveDrift distinguishes fresh, cleared, matching, and changed marks", () => {
  expect(resolveDrift(null, undefined, threeDaysAgo, today)).toEqual({ seed: false });
  for (const mark of ["x", "t", "o"] as const) {
    expect(resolveDrift(null, mark, threeDaysAgo, today)).toEqual({
      seed: true, state: seedFromMark(mark, threeDaysAgo, today)!,
    });
    const current = Object.freeze({
      ...init("2026-11-01"), due: "2027-01-01", ivl: 60, ease: 2.4, reps: 8, lapses: 2, m: mark,
    });
    expect(resolveDrift(current, mark, thirtyDaysAgo, today)).toEqual({ seed: false });
    expect(resolveDrift(current, undefined, threeDaysAgo, today)).toEqual({ seed: true, state: init(today) });
    for (const changedMark of ["x", "t", "o"] as const) {
      if (changedMark === mark) continue;
      const decision = resolveDrift(current, changedMark, threeDaysAgo, today);
      expect(decision).toEqual({ seed: true, state: seedFromMark(changedMark, threeDaysAgo, today)! });
      if (decision.seed) expect(decision.state.m).toBe(changedMark);
    }
    expect(current).toEqual({
      due: "2027-01-01", ivl: 60, ease: 2.4, reps: 8, lapses: 2, last: "2026-11-01", m: mark,
    });
  }
});

test("today's count equals x plus due t plus o whose mark day plus seven is due", () => {
  // These t cards were seeded yesterday, so their one-day intervals end today.
  const fixture: { mark: Mark | undefined; timestamp?: number; seededOn: string; oDue?: string }[] = [
    { mark: "x", seededOn: today },
    { mark: "x", seededOn: "2026-11-08" },
    { mark: "t", seededOn: today },
    { mark: "t", seededOn: today },
    { mark: "o", timestamp: thirtyDaysAgo, seededOn: today, oDue: "2026-10-17" },
    { mark: "o", timestamp: new Date(2026, 10, 2, 12).getTime(), seededOn: today, oDue: today },
    { mark: "o", timestamp: threeDaysAgo, seededOn: today, oDue: "2026-11-13" },
    { mark: undefined, seededOn: today },
  ];
  const states = fixture.map(({ mark, timestamp, seededOn }) => seedFromMark(mark, timestamp, seededOn));
  const expected = fixture.filter(({ mark }) => mark === "x").length
    + fixture.filter(({ mark }) => mark === "t").length
    + fixture.filter(({ mark, oDue }) => mark === "o" && oDue! <= today).length;
  expect(expected).toBe(6);
  expect(dueTodayCount(states, today)).toBe(expected);
});

test("a thirty-day-old o remains twenty-three days overdue instead of being clamped", () => {
  const state = seedFromMark("o", thirtyDaysAgo, today);
  expect(state).toEqual({
    due: "2026-10-17", ivl: 7, ease: 2.0, reps: 0, lapses: 0, last: "2026-10-10", m: "o",
  });
  expect(state!.due < today).toBe(true);
});

test("all 1329 real cards seed all three marks with valid due days", async () => {
  let total = 0;
  for (const name of ["jitan", "yoten", "chem"]) {
    const decks = (await Bun.file(`public/data/${name}/decks.json`).json()) as Record<string, { cards: { q: string }[] }>;
    for (const [deckId, deck] of Object.entries(decks)) {
      for (const card of deck.cards) {
        const id = cardId(name, deckId, card.q);
        expect(id).toBe(`card:${name}:${deckId}:${card.q}`);
        total++;
        for (const mark of ["x", "t", "o"] as const) {
          const state = seedFromMark(mark, threeDaysAgo, today);
          expect(state).not.toBeNull();
          expect(state!.m).toBe(mark);
          expect(state!.due).toMatch(/^\d{4}-\d{2}-\d{2}$/);
          expect(todayISO(new Date(`${state!.due}T12:00:00`))).toBe(state!.due);
        }
      }
    }
  }
  expect(total).toBe(1329);
});

test("o with NaN, infinite, or negative timestamps falls back to today", () => {
  for (const timestamp of [NaN, Infinity, -Infinity, -1]) {
    expect(seedFromMark("o", timestamp, today)).toEqual({
      due: today, ivl: 7, ease: 2.0, reps: 0, lapses: 0, last: today, m: "o",
    });
  }
});

test("x and t ignore missing, old, and invalid timestamps", () => {
  for (const mark of ["x", "t"] as const) {
    const expected = seedFromMark(mark, undefined, today);
    for (const timestamp of [0, NaN, Infinity, -Infinity, -1, threeDaysAgo, thirtyDaysAgo]) {
      expect(seedFromMark(mark, timestamp, today)).toEqual(expected);
    }
  }
});

test("o uses Seoul's local date on both sides of a UTC day boundary", () => {
  inTimezone("Asia/Seoul", () => {
    for (const timestamp of [Date.UTC(2026, 10, 5, 23, 59), Date.UTC(2026, 10, 6, 0, 1)]) {
      const state = seedFromMark("o", timestamp, today);
      expect(state!.last).toBe("2026-11-06");
      expect(state!.due).toBe("2026-11-13");
    }
    expect(seedFromMark("o", Date.UTC(2026, 10, 5, 14, 59), today)!.last).toBe("2026-11-05");
    expect(seedFromMark("o", Date.UTC(2026, 10, 5, 15, 1), today)!.last).toBe("2026-11-06");
  });
});

test("o uses the local date in a negative UTC offset", () => {
  inTimezone("America/New_York", () => {
    const state = seedFromMark("o", Date.UTC(2026, 10, 7, 2), today);
    expect(state!.last).toBe("2026-11-06");
    expect(state!.due).toBe("2026-11-13");
  });
});

test("seeded intervals cross month, year, and leap-day boundaries", () => {
  for (const day of ["2026-01-31", "2026-12-31", "2028-02-28", "2028-02-29"]) {
    expect(seedFromMark("t", undefined, day)!.due).toBe(day);
  }
  expect(seedFromMark("o", new Date(2026, 11, 28, 12).getTime(), "2027-01-01")!.due).toBe("2027-01-04");
});

test("calendar intervals survive daylight-saving changes", () => {
  inTimezone("America/New_York", () => {
    expect(seedFromMark("t", undefined, "2026-03-08")!.due).toBe("2026-03-08");
    expect(seedFromMark("t", undefined, "2026-11-01")!.due).toBe("2026-11-01");
    expect(seedFromMark("o", new Date(2026, 2, 1, 12).getTime(), "2026-03-01")!.due).toBe("2026-03-08");
    expect(seedFromMark("o", new Date(2026, 9, 25, 12).getTime(), "2026-10-25")!.due).toBe("2026-11-01");
  });
});

test("dueTodayCount excludes null and future states and accepts a read-only iterable", () => {
  const overdue = Object.freeze(seedFromMark("o", thirtyDaysAgo, today)!);
  const due = Object.freeze(seedFromMark("x", undefined, today)!);
  const dueT = Object.freeze(seedFromMark("t", undefined, today)!);
  const futureO = Object.freeze(seedFromMark("o", threeDaysAgo, today)!);
  const states = Object.freeze([null, overdue, due, dueT, futureO]);
  const original = states.map((state) => state && { ...state });
  function* entries(): Iterable<SrsState | null> {
    yield* states;
  }
  expect(dueTodayCount(entries(), today)).toBe(3);
  expect(dueTodayCount(entries(), today)).toBe(3);
  expect(dueTodayCount([], today)).toBe(0);
  expect(dueTodayCount([null, null], today)).toBe(0);
  expect(states).toEqual(original);
});

test("seeding is deterministic and returns independent new states", () => {
  for (const mark of ["x", "t", "o"] as const) {
    const state = seedFromMark(mark, threeDaysAgo, today);
    const repeated = seedFromMark(mark, threeDaysAgo, today);
    expect(state).toEqual(repeated);
    expect(state).not.toBe(repeated);
  }
});

test("the seeding helpers never write to storage", () => {
  const setItem = spyOn(localStorage, "setItem");
  const removeItem = spyOn(localStorage, "removeItem");
  const clear = spyOn(localStorage, "clear");
  try {
    for (const mark of [undefined, "x", "t", "o"] as const) {
      const state = seedFromMark(mark, threeDaysAgo, today);
      resolveDrift(null, mark, threeDaysAgo, today);
      resolveDrift(init(today), mark, threeDaysAgo, today);
      dueTodayCount([state], today);
    }
    expect(setItem).not.toHaveBeenCalled();
    expect(removeItem).not.toHaveBeenCalled();
    expect(clear).not.toHaveBeenCalled();
  } finally {
    setItem.mockRestore();
    removeItem.mockRestore();
    clear.mockRestore();
  }
});

import { expect, test } from "bun:test";
import { init, LADDER, review, todayISO } from "./srs";

const today = "2026-11-09";

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

test("the first o review advances two rungs to three days", () => {
  const state = review(init(today), "o", today);
  expect(state.ivl).toBe(3);
  expect(state.ease).toBe(2);
  expect(state.reps).toBe(1);
  expect(state.due).toBe("2026-11-12");
});

test("three consecutive x reviews reset repetitions and count every lapse", () => {
  let state = init(today);
  for (let i = 0; i < 3; i++) state = review(state, "x", today);
  expect(state.ivl).toBe(0);
  expect(state.lapses).toBe(3);
  expect(state.reps).toBe(0);
  expect(state.due).toBe(today);
});

test("x at 120 days with ease 2.0 followed by same-day o restarts within three days", () => {
  const state = { ...init(today), ease: 2.0, ivl: 120, reps: 8 };
  const reset = review(state, "x", today);
  const restarted = review(reset, "o", today);
  expect(reset.ivl).toBe(0);
  expect(restarted.ivl).toBeLessThanOrEqual(3);
  expect(restarted.reps).toBe(1);
  expect(restarted.lapses).toBe(1);
});

test("six o reviews reach at least sixty days", () => {
  let state = init(today);
  for (let i = 0; i < 6; i++) state = review(state, "o", today);
  expect(state.ivl).toBeGreaterThanOrEqual(60);
  expect(state.reps).toBe(6);
});

test("ease clamps at 1.3 for x and 2.8 for e", () => {
  let failed = init(today);
  let easy = init(today);
  for (let i = 0; i < 30; i++) {
    failed = review(failed, "x", today);
    easy = review(easy, "e", today);
    expect(failed.ease).toBeGreaterThanOrEqual(1.3);
    expect(easy.ease).toBeLessThanOrEqual(2.8);
  }
  expect(failed.ease).toBe(1.3);
  expect(easy.ease).toBe(2.8);
});

test("rounded ease 1.50 uses base steps and ease 2.30 uses bonus steps", () => {
  let state = { ...init(today), ease: 2.5 };
  for (let i = 0; i < 5; i++) state = review(state, "x", today);
  expect(state.ease).toBe(1.5);
  expect(review(state, "o", today).ivl).toBe(3);

  const easy = review({ ...init(today), ease: 2.15 }, "e", today);
  expect(easy.ease).toBe(2.3);
  expect(easy.ivl).toBe(14);
  expect(review({ ...init(today), ease: easy.ease }, "o", today).ivl).toBe(7);
  expect(review({ ...init(today), ease: 1.55 }, "t", today).ease).toBe(1.5);
  expect(review({ ...init(today), ease: 2.35 }, "t", today).ease).toBe(2.3);
});

test("identical review inputs return deeply equal new states without mutation", () => {
  const state = Object.freeze({ ...init(today), ivl: 7, ease: 2.3, reps: 3, lapses: 1 });
  const original = { ...state };
  for (const grade of ["x", "t", "o", "e"] as const) {
    const first = review(state, grade, today);
    expect(first).toEqual(review(state, grade, today));
    expect(first).not.toBe(state);
    expect(state).toEqual(original);
  }
});

test("one-day intervals cross month-end and year-end", () => {
  expect(review(init("2026-01-31"), "t", "2026-01-31").due).toBe("2026-02-01");
  expect(review(init("2026-12-31"), "t", "2026-12-31").due).toBe("2027-01-01");
});

test("repeated e reviews stay at the 120-day top rung", () => {
  let state = { ...init(today), ivl: 120 };
  for (let i = 0; i < 20; i++) {
    state = review(state, "e", today);
    expect(state.ivl).toBe(120);
    expect(state.due).toBe("2027-03-09");
  }
});

test("invalid date strings throw in init and every review branch", () => {
  const state = init(today);
  for (const invalid of ["2026-13-40", "nope", "2026-02-29", "2026-04-31", "2026-00-10", "2026-01-00", "2026-1-01"]) {
    expect(() => init(invalid)).toThrow(Error);
    for (const grade of ["x", "t", "o", "e"] as const) {
      expect(() => review(state, grade, invalid)).toThrow(Error);
    }
  }
});

test("Seoul 08:59 and 09:01 share a local day even when their UTC dates differ", () => {
  inTimezone("Asia/Seoul", () => {
    const before = new Date(2026, 10, 9, 8, 59);
    const after = new Date(2026, 10, 9, 9, 1);
    expect(before.getTimezoneOffset()).toBe(-540);
    expect(todayISO(before)).toBe("2026-11-09");
    expect(todayISO(after)).toBe("2026-11-09");
    expect(before.toISOString().slice(0, 10)).toBe("2026-11-08");
    expect(after.toISOString().slice(0, 10)).toBe("2026-11-09");
  });
});

test("local 23:59 and 00:01 belong to different days", () => {
  inTimezone("Asia/Seoul", () => {
    const before = new Date(2026, 10, 9, 23, 59);
    const after = new Date(2026, 10, 10, 0, 1);
    expect(todayISO(before)).toBe("2026-11-09");
    expect(todayISO(after)).toBe("2026-11-10");
  });
});

test("o step counts differ on either side of both ease thresholds", () => {
  expect(review({ ...init(today), ease: 2.29 }, "o", today).ivl).toBe(3);
  expect(review({ ...init(today), ease: 2.31 }, "o", today).ivl).toBe(7);
  expect(review({ ...init(today), ease: 1.49 }, "o", today).ivl).toBe(1);
  expect(review({ ...init(today), ease: 1.51 }, "o", today).ivl).toBe(3);
});

test("a corrupt five-day interval normalizes to the three-day rung before advancing", () => {
  const state = { ...init(today), ivl: 5 };
  expect(review(state, "t", today).ivl).toBe(7);
  expect(review(state, "o", today).ivl).toBe(14);
  expect(state.ivl).toBe(5);
});

test("init returns the exact initial state and the ladder contains the prescribed rungs", () => {
  expect(init(today)).toEqual({ due: today, ivl: 0, ease: 2, reps: 0, lapses: 0, last: today, m: "x" });
  expect(LADDER).toEqual([0, 1, 3, 7, 14, 30, 60, 120]);
});

test("t advances one rung, lowers ease, and schedules from the supplied review day", () => {
  const state = { ...init("2026-11-01"), ivl: 3, reps: 2, lapses: 3 };
  expect(review(state, "t", today)).toEqual({
    due: "2026-11-16", ivl: 7, ease: 1.95, reps: 3, lapses: 3, last: today, m: "t",
  });
});

test("e uses its new ease when crossing either bonus threshold", () => {
  const high = review({ ...init(today), ease: 2.2 }, "e", today);
  expect(high.ease).toBe(2.35);
  expect(high.ivl).toBe(14);
  const recovered = review({ ...init(today), ease: 1.4 }, "e", today);
  expect(recovered.ease).toBe(1.55);
  expect(recovered.ivl).toBe(7);
  const low = review({ ...init(today), ease: 1.3 }, "e", today);
  expect(low.ease).toBe(1.45);
  expect(low.ivl).toBe(3);
});

test("x resets scheduling and repetitions while preserving and incrementing lapses", () => {
  const state = { ...init("2026-11-01"), ivl: 30, reps: 8, lapses: 2 };
  expect(review(state, "x", today)).toEqual({
    due: today, ivl: 0, ease: 1.8, reps: 0, lapses: 3, last: today, m: "x",
  });
});

test("all grades update last and e maps to the o mark", () => {
  const state = init("2026-11-01");
  for (const grade of ["x", "t", "o", "e"] as const) {
    const next = review(state, grade, today);
    expect(next.last).toBe(today);
    expect(next.m).toBe(grade === "e" ? "o" : grade);
  }
});

test("day arithmetic honors leap years without coercing invalid dates", () => {
  expect(review(init("2028-02-28"), "t", "2028-02-28").due).toBe("2028-02-29");
  expect(review(init("2028-02-29"), "t", "2028-02-29").due).toBe("2028-03-01");
  expect(review(init("2026-02-28"), "t", "2026-02-28").due).toBe("2026-03-01");
  expect(review(init("2000-02-28"), "t", "2000-02-28").due).toBe("2000-02-29");
  expect(review(init("2100-02-28"), "t", "2100-02-28").due).toBe("2100-03-01");
});

test("day arithmetic is unchanged by daylight-saving transitions", () => {
  inTimezone("America/New_York", () => {
    expect(review(init("2026-03-08"), "t", "2026-03-08").due).toBe("2026-03-09");
    expect(review(init("2026-11-01"), "t", "2026-11-01").due).toBe("2026-11-02");
  });
});

test("todayISO zero-pads local month and day and rejects an invalid injected clock", () => {
  inTimezone("Asia/Seoul", () => {
    expect(todayISO(new Date(2026, 0, 5, 0, 1))).toBe("2026-01-05");
  });
  expect(() => todayISO(new Date(NaN))).toThrow(Error);
});

test("intervals outside the ladder normalize to the closest lower available rung", () => {
  expect(review({ ...init(today), ivl: -3 }, "t", today).ivl).toBe(1);
  expect(review({ ...init(today), ivl: 121 }, "t", today).ivl).toBe(120);
});

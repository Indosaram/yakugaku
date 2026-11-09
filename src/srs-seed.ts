import { init, todayISO } from "./srs";
import type { Mark, SrsState } from "./srs";

export type DriftDecision = { seed: true; state: SrsState } | { seed: false };

function addDays(day: string, days: number): string {
  const date = new Date(`${day}T12:00:00`);
  date.setDate(date.getDate() + days);
  return todayISO(date);
}

export function seedFromMark(mark: Mark | undefined, markTimestamp: number | undefined, today: string): SrsState | null {
  if (mark === undefined) return null;
  const hasTimestamp = markTimestamp !== undefined && Number.isFinite(markTimestamp) && markTimestamp > 0;
  const last = mark === "o" && hasTimestamp ? todayISO(new Date(markTimestamp)) : today;
  const ivl = mark === "x" ? 0 : mark === "t" ? 1 : 7;
  const due = mark === "o" && hasTimestamp ? addDays(last, 7) : today;
  return { due, ivl, ease: 2.0, reps: 0, lapses: 0, last, m: mark };
}

export function resolveDrift(current: SrsState | null, mark: Mark | undefined, markTimestamp: number | undefined, today: string): DriftDecision {
  if (mark === undefined) return current === null ? { seed: false } : { seed: true, state: init(today) };
  if (current !== null && current.m === mark) return { seed: false };
  return { seed: true, state: seedFromMark(mark, markTimestamp, today)! };
}

export function dueTodayCount(states: Iterable<SrsState | null>, today: string): number {
  let count = 0;
  for (const state of states) if (state !== null && state.due <= today) count++;
  return count;
}

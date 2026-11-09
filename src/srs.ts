export type Grade = "x" | "t" | "o" | "e";
export type Mark = "o" | "t" | "x";
export type SrsState = { due: string; ivl: number; ease: number; reps: number; lapses: number; last: string; m: Mark };

export const LADDER = [0, 1, 3, 7, 14, 30, 60, 120];
const EASE_DELTA: Record<Grade, number> = { x: -0.2, t: -0.05, o: 0, e: 0.15 };

export function todayISO(now = new Date()): string {
  const year = now.getFullYear();
  if (Number.isNaN(year)) throw new Error("Invalid date");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${String(year).padStart(4, "0")}-${month}-${day}`;
}

function addDays(today: string, days: number): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(today)) throw new Error(`Invalid date: ${today}`);
  const [year, month, day] = today.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.toISOString().slice(0, 10) !== today) throw new Error(`Invalid date: ${today}`);
  return new Date(date.getTime() + days * 86_400_000).toISOString().slice(0, 10);
}

export function init(today: string): SrsState {
  return { due: addDays(today, 0), ivl: 0, ease: 2.0, reps: 0, lapses: 0, last: today, m: "x" };
}

export function review(state: SrsState, g: Grade, today: string): SrsState {
  const ease = Math.round(Math.max(1.3, Math.min(2.8, state.ease + EASE_DELTA[g])) * 100) / 100;
  const m = g === "e" ? "o" : g;
  if (g === "x") {
    return { due: addDays(today, 0), ivl: 0, ease, reps: 0, lapses: state.lapses + 1, last: today, m };
  }

  let i = LADDER.indexOf(state.ivl);
  if (i === -1) {
    i = 0;
    for (let j = 1; j < LADDER.length; j++) if (LADDER[j] <= state.ivl) i = j;
  }
  let steps = g === "t" ? 1 : g === "o" ? 2 : 3;
  if (g === "o" || g === "e") {
    if (ease >= 2.3) steps++;
    else if (ease < 1.5) steps--;
  }
  const ivl = LADDER[Math.max(0, Math.min(LADDER.length - 1, i + steps))];
  return { due: addDays(today, ivl), ivl, ease, reps: state.reps + 1, lapses: state.lapses, last: today, m };
}

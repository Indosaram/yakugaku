import { expect, test } from "bun:test";
import { deckDue } from "./pages/Chem";
import type { Deck } from "./data/remote";
import { buildQueue, SRS_SOURCES } from "./review-queue";
import type { DeckData } from "./review-queue";
import { cardId, markKey } from "./srs-card";

const decks: Record<string, DeckData> = Object.fromEntries(await Promise.all(SRS_SOURCES.map(async (src) => [
  src, await Bun.file(`public/data/${src}`).json() as DeckData,
])));

const chem = decks["chem/decks.json"] as unknown as Record<string, Deck>;
const deckId = Object.keys(chem)[0];
const card = chem[deckId].cards[0];
const mark = markKey(cardId("chem", deckId, card.q));

// 시딩 규칙: ○ 는 다음 만기가 markAt + 7일, ✕ 는 markAt 당일. 그래서 7일선을 기준으로 due 가 갈린다.
function daysBefore(today: string, days: number): number {
  const [y, m, d] = today.split("-").map(Number);
  return Date.UTC(y, m - 1, d, 3, 0, 0) - days * 86_400_000;
}

function badgeAndSession(today: string, markValue: string, daysBack: number) {
  const read = (k: string) => (k === mark ? markValue : undefined);
  const times = { [mark]: daysBefore(today, daysBack) };
  const badge = deckDue("chem/decks.json", deckId, chem, read, times, today);
  const session = buildQueue({
    today,
    decks: { "chem/decks.json": chem },
    read,
    markTimes: times,
    deckFilter: `chem:${deckId}`,
  });
  return { badge, session: session.counts.due };
}

const cases = [
  { label: "○ 어제 표시", markValue: "o", daysBack: 1, expected: 0 },
  { label: "○ 8일 전 표시", markValue: "o", daysBack: 8, expected: 1 },
  { label: "✕ 어제 표시", markValue: "x", daysBack: 1, expected: 1 },
];

for (const today of ["2026-11-09", "2026-11-16", "2027-03-01", "2030-01-01"]) {
  for (const c of cases) {
    test(`badge matches session due: ${c.label} (${today})`, () => {
      const { badge, session } = badgeAndSession(today, c.markValue, c.daysBack);
      expect(badge).toBe(session);
      expect(badge).toBe(c.expected);
    });
  }
}

test("without mark times every o card looks due today", () => {
  const read = (k: string) => (k === mark ? "o" : undefined);
  const times = { [mark]: daysBefore("2026-11-09", 1) };
  expect(deckDue("chem/decks.json", deckId, chem, read, times, "2026-11-09")).toBe(0);
  expect(deckDue("chem/decks.json", deckId, chem, read, {}, "2026-11-09")).toBe(1);
});

test("deckDue returns 0 for sources outside the 959-card SRS scope", () => {
  expect(deckDue("yoten/yogo.json", "any", chem, () => undefined, {}, "2026-11-09")).toBe(0);
  expect(deckDue("trig/decks.json", "any", chem, () => undefined, {}, "2026-11-09")).toBe(0);
  expect(deckDue("chem/decks.json", undefined, chem, () => undefined, {}, "2026-11-09")).toBe(0);
  expect(deckDue("chem/decks.json", "missing", undefined, () => undefined, {}, "2026-11-09")).toBe(0);
});

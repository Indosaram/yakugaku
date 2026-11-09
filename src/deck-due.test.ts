import { expect, test } from "bun:test";
import { deckDue } from "./pages/Chem";
import type { Deck } from "./data/remote";
import { buildQueue, SRS_SOURCES } from "./review-queue";
import type { DeckData } from "./review-queue";
import { cardId, markKey } from "./srs-card";

const TODAY = "2026-11-09";
const yesterday = Date.UTC(2026, 10, 8, 3, 0, 0);

const decks: Record<string, DeckData> = Object.fromEntries(await Promise.all(SRS_SOURCES.map(async (src) => [
  src, await Bun.file(`public/data/${src}`).json() as DeckData,
])));

const chem = decks["chem/decks.json"] as unknown as Record<string, Deck>;
const chemDeckId = Object.keys(chem)[0];
const card = chem[chemDeckId].cards[0];
const id = cardId("chem", chemDeckId, card.q);
const mark = markKey(id);

// 시딩: 어제 ○ 는 ivl 7 이라 오늘 만기가 아니고, 어제 ✕ 는 ivl 0 이라 오늘 만기다.
const oYesterday = { [mark]: "o" } as Record<string, unknown>;
const xYesterday = { [mark]: "x" } as Record<string, unknown>;
const times = { [mark]: yesterday };

test("deck badge counts the same cards the deck session opens", () => {
  const badge = deckDue("chem/decks.json", chemDeckId, chem, (k) => oYesterday[k], times);
  const session = buildQueue({
    today: TODAY,
    decks: { "chem/decks.json": chem },
    read: (k) => oYesterday[k],
    markTimes: times,
    deckFilter: `chem:${chemDeckId}`,
  });
  expect(badge).toBe(session.counts.due);
  expect(badge).toBe(0);
});

test("without mark times every o card looks due today", () => {
  expect(deckDue("chem/decks.json", chemDeckId, chem, (k) => oYesterday[k], {})).toBe(1);
});

test("badge still counts a card that is genuinely due today", () => {
  const badge = deckDue("chem/decks.json", chemDeckId, chem, (k) => xYesterday[k], times);
  const session = buildQueue({
    today: TODAY,
    decks: { "chem/decks.json": chem },
    read: (k) => xYesterday[k],
    markTimes: times,
    deckFilter: `chem:${chemDeckId}`,
  });
  expect(badge).toBe(1);
  expect(badge).toBe(session.counts.due);
});

test("deckDue returns 0 for sources outside the 959-card SRS scope", () => {
  expect(deckDue("yoten/yogo.json", "any", chem, () => undefined, {})).toBe(0);
  expect(deckDue("trig/decks.json", "any", chem, () => undefined, {})).toBe(0);
  expect(deckDue("chem/decks.json", undefined, chem, () => undefined, {})).toBe(0);
  expect(deckDue("chem/decks.json", "missing", undefined, () => undefined, {})).toBe(0);
});

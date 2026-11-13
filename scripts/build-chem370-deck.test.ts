import { expect, test } from "bun:test";
import { buildChem370Deck, mergeChem370Deck, type Chem370Data, type DeckFile } from "./build-chem370-deck";

const terms: Chem370Data = {
  title: "필수 화학용어 370선",
  categories: [
    { name: "물질의 구성", terms: [{ no: 1, ja: "純物質", kana: "じゅんぶっしつ", ko: "순물질", note: "" }] },
    { name: "화학 결합", terms: [{ no: 2, ja: "イオン結合", kana: "いおんけつごう", ko: "이온 결합", note: "참고" }] },
  ],
};

test("one deck holds every term in category order with kana on the back and Korean as the sub line", () => {
  const deck = buildChem370Deck(terms);
  expect(Object.keys(deck)).toEqual(["y370"]);
  expect(deck.y370.title).toBe("필수 화학용어 370선");
  expect(deck.y370.cards).toEqual([
    { q: "純物質", a: "じゅんぶっしつ", s: "순물질" },
    { q: "イオン結合", a: "いおんけつごう", s: "이온 결합" },
  ]);
});

test("a term listed under two categories becomes one card, and conflicting readings fail loudly", () => {
  const repeated: Chem370Data = {
    ...terms,
    categories: [...terms.categories, { name: "실험 및 분석", terms: [{ ...terms.categories[0].terms[0], ko: "순물질(재수록)" }] }],
  };
  expect(buildChem370Deck(repeated).y370.cards).toEqual([
    { q: "純物質", a: "じゅんぶっしつ", s: "순물질" },
    { q: "イオン結合", a: "いおんけつごう", s: "이온 결합" },
  ]);
  const conflict = { ...terms, categories: [...terms.categories, { name: "x", terms: [{ ...terms.categories[0].terms[0], kana: "じゅんぶつしつ" }] }] };
  expect(() => buildChem370Deck(conflict)).toThrow("같은 표기에 다른 읽기");
});

test("a missing Japanese or Korean spelling fails loudly instead of dropping a card", () => {
  const empty = { ...terms, categories: [{ name: "x", terms: [{ no: 1, ja: "純物質", kana: "", ko: "순물질", note: "" }] }] };
  expect(() => buildChem370Deck(empty)).toThrow("빈 용어");
});

test("merging keeps the original decks, replaces the 370 deck, and drops the split vocabulary decks", () => {
  const existing: DeckFile = {
    color: { title: "이온·침전의 색", hint: "무슨 색일까요?", cards: [{ q: "Fe²⁺", a: "연녹색" }] },
    "y01-busshitsu": { title: "물질의 구성 · 필수 화학용어", hint: "일본어 → 읽기·한국어", cards: [{ q: "純物質", a: "じゅんぶっしつ" }] },
    y370: { title: "옛 370 덱", hint: "옛", cards: [{ q: "옛", a: "옛" }] },
  };
  const merged = mergeChem370Deck(existing, buildChem370Deck(terms));
  expect(Object.keys(merged)).toEqual(["color", "y370"]);
  expect(merged.color.cards).toHaveLength(1);
  expect(merged.y370.cards).toHaveLength(2);
});

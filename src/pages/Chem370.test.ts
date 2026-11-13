import { expect, test } from "bun:test";
import { filterTerms, groupTerms, uniqueTerms } from "./Chem370";

type Term = { no: number; ja: string; kana: string; ko: string; note: string };

const terms: Term[] = [
  { no: 1, ja: "純物質", kana: "じゅんぶっしつ", ko: "순물질", note: "" },
  { no: 13, ja: "炎色反応", kana: "えんしょくはんのう", ko: "불꽃반응", note: "「실험 및 분석」에도 수록" },
  { no: 41, ja: "アルカリ金属", kana: "あるかりきんぞく", ko: "알칼리 금속", note: "" },
];
const categories = [
  { name: "물질의 구성", terms },
  { name: "화학 결합", terms: [] },
];

test("an empty query returns every term unchanged", () => {
  expect(filterTerms(terms, "")).toEqual(terms);
  expect(filterTerms(terms, "   ")).toEqual(terms);
});

test("search matches the Japanese front, the kana reading, and the Korean meaning", () => {
  expect(filterTerms(terms, "アルカリ").map((term) => term.no)).toEqual([41]);
  expect(filterTerms(terms, "えんしょく").map((term) => term.no)).toEqual([13]);
  expect(filterTerms(terms, "순물질").map((term) => term.no)).toEqual([1]);
  expect(filterTerms(terms, "없는말")).toEqual([]);
});

test("space-separated words must all match, and the note is searchable", () => {
  expect(filterTerms(terms, "불꽃 실험").map((term) => term.no)).toEqual([13]);
  expect(filterTerms(terms, "불꽃 순물질")).toEqual([]);
});

test("grouping drops empty categories but keeps the original order", () => {
  expect(groupTerms(categories, "").map((group) => group.name)).toEqual(["물질의 구성"]);
  expect(groupTerms(categories, "순물질").map((group) => group.terms.map((term) => term.no))).toEqual([[1]]);
  expect(groupTerms(categories, "없는말")).toEqual([]);
});

test("a term listed under two categories renders once, in the first category", () => {
  const split = [
    { name: "물질의 구성", terms: [terms[1]] },
    { name: "실험 및 분석", terms: [terms[1]] },
  ];
  expect(groupTerms(split, "").map((group) => [group.name, group.terms.length])).toEqual([["물질의 구성", 1]]);
  // 검색으로 그 용어만 남을 때도 한 번만 나온다.
  expect(groupTerms(split, "불꽃").flatMap((group) => group.terms)).toHaveLength(1);
});

test("the chip count and the rendered row count use the same de-duplicated total", () => {
  const split = [
    { name: "물질의 구성", terms },
    { name: "실험 및 분석", terms: [terms[1]] },
  ];
  const unique = uniqueTerms(split);
  expect(unique.reduce((sum, group) => sum + group.terms.length, 0)).toBe(3);
  expect(groupTerms(split, "").reduce((sum, group) => sum + group.terms.length, 0)).toBe(3);
});

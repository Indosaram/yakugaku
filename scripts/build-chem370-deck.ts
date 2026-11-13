import { resolve } from "node:path";

// 필수 화학용어 370선(public/data/chem370/terms.json)을 기존 암기 카드 덱(public/data/chem/decks.json)으로 옮긴다.
// 카드 앞면은 일본어 표기, 뒷면은 요미가나, 보조 표시는 한국어다. note 는 카드에 넣지 않고 /chem370 목록에서만 보여 준다.
export type Chem370Term = { no: number; ja: string; kana: string; ko: string; note: string };
export type Chem370Data = { title: string; categories: { name: string; terms: Chem370Term[] }[] };
export type DeckCard = { q: string; a: string; s?: string };
export type DeckFile = Record<string, { title: string; hint: string; cards: DeckCard[] }>;

export const CHEM370_DECK = "y370";
export const CHEM370_SOURCE = "chem370/terms.json";
export const CHEM370_TARGET = "chem/decks.json";

// 예전에 분류별로 나눠 넣던 y01-busshitsu 같은 덱. 같은 용어가 두 덱에 들어가 카드 id 가 겹쳤으므로 한 덱으로 합친다.
const LEGACY_VOCAB_DECK = /^y\d{2}-[a-z]/;

export function buildChem370Deck(terms: Chem370Data): DeckFile {
  const seen = new Map<string, Chem370Term>();
  const cards: DeckCard[] = [];
  for (const category of terms.categories) {
    for (const term of category.terms) {
      if (!term.ja || !term.kana || !term.ko) throw new Error(`빈 용어: ${term.no}`);
      const duplicate = seen.get(term.ja);
      // 같은 용어가 두 분류에 실린 경우(원본 메모가 "…에도 수록")는 카드 id 가 겹치므로 한 장만 만든다.
      if (duplicate) {
        if (duplicate.kana !== term.kana) throw new Error(`같은 표기에 다른 읽기: ${term.ja}`);
        continue;
      }
      seen.set(term.ja, term);
      cards.push({ q: term.ja, a: term.kana, s: term.ko });
    }
  }
  return { [CHEM370_DECK]: { title: terms.title, hint: "일본어 → 요미가나·한국어", cards } };
}

// 기존 덱은 그대로 두고 370선 덱만 갈아 끼운다. 분류별 옛 덱은 지운다(용어가 370선 덱으로 옮겨졌으므로).
export function mergeChem370Deck(existing: DeckFile, generated: DeckFile): DeckFile {
  const merged: DeckFile = {};
  for (const [id, deck] of Object.entries(existing)) {
    if (LEGACY_VOCAB_DECK.test(id) || id === CHEM370_DECK) continue;
    merged[id] = deck;
  }
  return { ...merged, ...generated };
}

if (import.meta.main) {
  const root = resolve(process.env.CHEM370_ROOT ?? new URL("../public/data", import.meta.url).pathname);
  const terms = (await Bun.file(resolve(root, CHEM370_SOURCE)).json()) as Chem370Data;
  const target = resolve(root, CHEM370_TARGET);
  const existing = (await Bun.file(target).json()) as DeckFile;
  const merged = mergeChem370Deck(existing, buildChem370Deck(terms));
  await Bun.write(target, JSON.stringify(merged, null, 2) + "\n");
  for (const [id, deck] of Object.entries(merged)) console.log(`${id}: ${deck.cards.length} cards · ${deck.title}`);
}

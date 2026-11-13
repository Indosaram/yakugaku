import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Layers, Search } from "lucide-react";
import { useData, type Deck } from "../data/remote";
import { useProgress } from "../progress";
import { PageTitle, btn } from "../components/ui";
import { deckDue } from "./Chem";

type Term = { no: number; ja: string; kana: string; ko: string; note: string };
type Terms = { title: string; categories: { name: string; terms: Term[] }[] };

function Loading({ error }: { error?: Error }) {
  if (error) return <div className="py-20 text-center text-slate-600">용어를 불러오지 못했어요. 인터넷 연결을 확인한 뒤 새로고침해 주세요.</div>;
  return <div className="py-20 text-center text-slate-400" role="status">불러오는 중…</div>;
}

const ALL = "all";

// 검색은 일본어·요미가나·한국어를 모두 훑는다. 공백으로 나눈 말이 전부 들어 있어야 남긴다.
export function filterTerms(terms: Term[], query: string): Term[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return terms;
  return terms.filter((term) => {
    const haystack = `${term.ja} ${term.kana} ${term.ko} ${term.note}`.toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
}

// 카테고리별로 묶어서 돌려준다. 검색 결과가 없는 카테고리는 빼고, 원래 순서는 유지한다.
// 같은 용어가 두 분류에 실린 경우(원본 메모가 "…에도 수록")는 첫 분류에만 보여 준다. 카드도 한 장이라 숫자가 맞는다.
export function groupTerms(categories: Terms["categories"], query: string): Terms["categories"] {
  const kept = uniqueTerms(categories);
  return kept
    .map((category) => ({ name: category.name, terms: filterTerms(category.terms, query) }))
    .filter((category) => category.terms.length > 0);
}

/** 같은 일본어 표기는 첫 분류에만 남긴다. 칩 숫자와 목록 행 수가 같아진다. */
export function uniqueTerms(categories: Terms["categories"]): Terms["categories"] {
  const seen = new Set<string>();
  return categories
    .map((category) => ({
      name: category.name,
      terms: category.terms.filter((term) => {
        if (seen.has(term.ja)) return false;
        seen.add(term.ja);
        return true;
      }),
    }))
    .filter((category) => category.terms.length > 0);
}

export default function Chem370() {
  const { data, error } = useData<Terms>("chem370/terms.json");
  const decks = useData<Record<string, Deck>>("chem/decks.json");
  const { get } = useProgress();
  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState("");

  // 같은 용어를 한 번만 남긴 목록. 칩·전체 숫자·목록이 모두 이걸 쓴다.
  const unique = useMemo(() => (data ? uniqueTerms(data.categories) : []), [data]);
  const total = useMemo(() => unique.reduce((sum, c) => sum + c.terms.length, 0), [unique]);

  // 분류 칩에서 고른 분류만 남긴 뒤 검색어로 거른다. 결과가 없는 분류는 groupTerms 가 뺀다.
  const shown = useMemo(() => {
    const pool = category === ALL ? unique : unique.filter((c) => c.name === category);
    return groupTerms(pool, query);
  }, [unique, category, query]);

  const due = deckDue("chem/decks.json", "y370", decks.data, get);
  const hits = shown.reduce((sum, c) => sum + c.terms.length, 0);

  if (!data) return <Loading error={error} />;

  return (
    <div className="min-w-0">
      <PageTitle kicker="화학" title={data.title}>
        일본어 표기로 요미가나와 한국어 뜻을 확인하는 {total}개 용어입니다. 분류로 좁히거나 일본어·가나·한국어로 검색하세요. 두 분류에 함께 실린 용어는 첫 분류에만 두고, 다른 분류는 메모에 적었어요.
      </PageTitle>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Link to="/chem/d/y370" className={btn.primary}>카드로 외우기</Link>
        {due > 0 && <Link to="/review/session?deck=chem:y370" className={btn.secondary}>오늘 복습 {due}장</Link>}
        <p className="text-sm text-slate-500 tnum">{hits}개 표시</p>
      </div>

      <div className="sticky top-16 z-10 -mx-4 mb-5 space-y-3 border-b border-slate-200 bg-stone-50/95 px-4 py-3 backdrop-blur">
        <label className="relative block">
          <span className="sr-only">용어 검색</span>
          <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="일본어·요미가나·한국어로 검색"
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm"
          />
        </label>
        <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
          {[{ name: ALL, label: `전체 ${total}` }, ...unique.map((c) => ({ name: c.name, label: `${c.name} ${c.terms.length}` }))].map((item) => (
            <button
              key={item.name}
              aria-pressed={category === item.name}
              onClick={() => setCategory(item.name)}
              className={"shrink-0 rounded-full border px-3 py-1.5 text-xs transition " + (category === item.name ? "border-indigo-700 bg-indigo-700 font-semibold text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-stone-100")}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">검색어와 맞는 용어가 없어요.</p>
      ) : (
        <div className="min-w-0 space-y-8">
          {shown.map((group) => (
            <section key={group.name} aria-labelledby={`cat-${group.name}`}>
              <h2 id={`cat-${group.name}`} className="mb-3 flex items-baseline gap-2 text-lg font-bold text-slate-900">
                {group.name}
                <span className="text-xs font-medium text-slate-500 tnum">{group.terms.length}</span>
              </h2>
              <ul className="min-w-0 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {group.terms.map((term) => (
                  <li key={`${term.no}-${term.ja}`} className="grid min-w-0 grid-cols-[2.25rem_minmax(0,1fr)] gap-x-2 px-3 py-3 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1fr)] sm:items-baseline sm:gap-x-4 sm:px-4">
                    <span className="text-xs text-slate-400 tnum sm:text-sm">{term.no}</span>
                    <span className="min-w-0 break-words">
                      <span className="block font-semibold text-slate-900" lang="ja">{term.ja}</span>
                      <span className="mt-0.5 block text-sm text-indigo-800" lang="ja">{term.kana}</span>
                    </span>
                    <span className="col-start-2 min-w-0 break-words text-sm text-slate-700 sm:col-start-auto">
                      {term.ko}
                      {term.note && <span className="mt-1 block text-xs text-slate-500">{term.note}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="flex items-center gap-2 font-bold text-slate-900"><Layers aria-hidden className="size-4 text-indigo-700" />이 용어로 복습하기</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">370선 용어는 <Link to="/chem" className="text-indigo-700 underline underline-offset-4">화학 암기 카드</Link>의 「{data.title}」 덱에 들어 있어요. 카드로 외우면 다른 암기 카드와 함께 오늘의 복습에 섞여 나옵니다.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to="/chem/d/y370" className={btn.secondary}>카드 학습</Link>
          <Link to="/review" className={btn.secondary}>복습 일정</Link>
        </div>
      </div>
    </div>
  );
}

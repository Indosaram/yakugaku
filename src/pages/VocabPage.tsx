import { ArrowLeft, ArrowRight, Check, Layers, List, RefreshCw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { vocab } from "../data";
import { Bar, PageTitle, Segmented, btn } from "../components/ui";
import { setProgress, useProgress } from "../progress";

export default function VocabPage() {
  const tags = useMemo(() => ["전체", ...Array.from(new Set(vocab.map((v) => v.tag)))], []);
  const [tag, setTag] = useState("전체");
  const [q, setQ] = useState("");
  const [mode, setMode] = useState<"list" | "card">("list");
  const [hideKo, setHideKo] = useState(false);
  const [onlyUnknown, setOnlyUnknown] = useState(false);
  const { get } = useProgress();
  const list = vocab.filter(
    (v) =>
      (tag === "전체" || v.tag === tag) &&
      (!onlyUnknown || get(`vocab:${v.word}`) !== true) &&
      (q === "" || (v.word + v.ko + (v.ja ?? "")).toLowerCase().includes(q.toLowerCase())),
  );
  const known = vocab.filter((v) => get(`vocab:${v.word}`) === true).length;
  const [ci, setCi] = useState(0);
  const [flip, setFlip] = useState(false);
  const card = list[Math.min(ci, Math.max(list.length - 1, 0))];

  return (
    <div>
      <PageTitle kicker="어휘·숙어" title={`星薬 필수 어휘 ${vocab.length}개`}>
        기출에서 실제로 나온 단어·숙어와 의약 장문에 자주 나오는 전문 용어를 모았습니다. 아는 단어는 <b>외웠어요</b>를 눌러 지워 나가세요.
      </PageTitle>
      <div className="mb-6 max-w-md rounded-2xl border border-slate-200 bg-white p-4">
        <Bar value={known} total={vocab.length} label="외운 단어" />
      </div>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 mb-3">
        {tags.map((t) => (
          <button
            key={t}
            aria-pressed={tag === t}
            onClick={() => { setTag(t); setCi(0); }}
            className={"shrink-0 rounded-full px-3.5 py-1.5 text-sm transition " + (tag === t ? "bg-slate-900 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-stone-100")}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-3 items-center mb-5 text-sm">
        <label className="relative w-full sm:w-64">
          <span className="sr-only">단어 검색</span>
          <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => { setQ(e.target.value); setCi(0); }} placeholder="영어·한국어·일본어로 검색" className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3" />
        </label>
        <Segmented
          value={mode}
          onChange={(m) => { setMode(m); setFlip(false); }}
          items={[
            { value: "list", label: <><List aria-hidden className="size-4" />목록</> },
            { value: "card", label: <><Layers aria-hidden className="size-4" />플래시카드</> },
          ]}
        />
        {mode === "list" && <label className="flex items-center gap-2"><input type="checkbox" className="size-4 accent-indigo-700" checked={hideKo} onChange={(e) => setHideKo(e.target.checked)} /> 뜻 가리기</label>}
        <label className="flex items-center gap-2"><input type="checkbox" className="size-4 accent-indigo-700" checked={onlyUnknown} onChange={(e) => { setOnlyUnknown(e.target.checked); setCi(0); }} /> 못 외운 것만</label>
        <span className="text-slate-500 tnum">{list.length}개</span>
      </div>
      {mode === "card" ? (
        card ? (
          <div className="mx-auto max-w-lg">
            <button
              onClick={() => setFlip((f) => !f)}
              aria-label={flip ? "카드 앞면 보기" : "뜻 보기"}
              className="flex w-full min-h-72 flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg transition active:scale-[0.99]"
            >
              <p className="text-xs text-slate-500 tnum">{card.tag} · {Math.min(ci, list.length - 1) + 1} / {list.length}</p>
              <p className="en text-4xl font-bold text-slate-900 mt-5">{card.word}</p>
              <p className="text-sm text-slate-500 mt-1">{card.pos}</p>
              {flip ? (
                <div key={card.word} className="reveal mt-6 w-full space-y-1 border-t border-slate-200 pt-5">
                  <p className="text-xl font-bold text-indigo-800">{card.ko}</p>
                  {card.ja && <p className="text-slate-600" lang="ja">{card.ja}</p>}
                  <p className="en mt-4 text-slate-800">{card.example}</p>
                  <p className="text-sm text-slate-500">{card.exampleKo}</p>
                </div>
              ) : (
                <p className="mt-10 inline-flex items-center gap-1.5 text-sm text-slate-500"><RefreshCw aria-hidden className="size-4" />탭해서 뜻 보기</p>
              )}
            </button>
            <div className="mt-4 grid grid-cols-[auto_1fr_auto] gap-2">
              <button aria-label="이전 단어" className={btn.secondary} onClick={() => { setCi((i) => Math.max(0, i - 1)); setFlip(false); }}><ArrowLeft aria-hidden className="size-4" /></button>
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 active:translate-y-px" onClick={() => { setProgress(`vocab:${card.word}`, true); setFlip(false); if (!onlyUnknown) setCi((i) => Math.min(list.length - 1, i + 1)); }}><Check aria-hidden className="size-4" />외웠어요</button>
              <button aria-label="다음 단어" className={btn.secondary} onClick={() => { setCi((i) => Math.min(list.length - 1, i + 1)); setFlip(false); }}><ArrowRight aria-hidden className="size-4" /></button>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><Check aria-hidden className="mx-auto size-8 text-emerald-600" /><p className="mt-3 font-semibold text-slate-900">이 조건의 단어를 모두 외웠어요</p><p className="mt-1 text-sm text-slate-500">다른 분류를 고르거나 검색어를 바꿔 보세요.</p></div>
        )
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {list.map((v) => {
            const k = get(`vocab:${v.word}`) === true;
            return (
              <div key={v.word + v.tag} className={"rounded-2xl border border-slate-200 bg-white p-4 transition " + (k ? "bg-stone-50 opacity-60" : "shadow-sm")}>
                <div className="flex items-baseline gap-2">
                  <span className="en text-lg font-bold text-slate-900">{v.word}</span>
                  <span className="text-xs text-slate-500">{v.pos}</span>
                  <button aria-pressed={k} onClick={() => setProgress(`vocab:${v.word}`, !k)} className={"ml-auto inline-flex shrink-0 items-center gap-1 text-xs rounded-full px-2.5 py-1 transition " + (k ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-slate-600 hover:bg-stone-200")}>
                    {k && <Check aria-hidden className="size-3.5" />}{k ? "외움" : "외웠어요"}
                  </button>
                </div>
                <p tabIndex={hideKo ? 0 : undefined} className={"mt-0.5 font-semibold text-indigo-800 transition " + (hideKo ? "blur-sm hover:blur-none focus:blur-none" : "")}>
                  {v.ko} {v.ja && <span className="font-normal text-slate-500 text-sm" lang="ja">／{v.ja}</span>}
                </p>
                <p className="en text-[15px] mt-2 text-slate-800">{v.example}</p>
                <p className={"text-xs text-slate-500 mt-0.5 transition " + (hideKo ? "blur-sm hover:blur-none" : "")}>{v.exampleKo}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

import { Layers, List, RefreshCw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { vocab } from "../data";
import { Bar, PageTitle, Segmented } from "../components/ui";
import { useProgress } from "../progress";
import { MarkButtons, MarkStudy, countMarks, readMark, writeMark, type Legacy } from "../marks";

// 단어 표시: mark:vocab:<단어>. 예전 "외웠어요"(vocab:<단어> = true)는 ○ 로 보인다.
const vLegacy = (w: string): Legacy => ({ key: `vocab:${w}`, kind: "known" });

export default function VocabPage() {
  const tags = useMemo(() => ["전체", ...Array.from(new Set(vocab.map((v) => v.tag)))], []);
  const [tag, setTag] = useState("전체");
  const [q, setQ] = useState("");
  const [mode, setMode] = useState<"list" | "card">("list");
  const [hideKo, setHideKo] = useState(false);
  const [onlyUnknown, setOnlyUnknown] = useState(false);
  const { get } = useProgress();
  const mk = (w: string) => readMark(get, "vocab:" + w, vLegacy(w));
  const list = vocab.filter(
    (v) =>
      (tag === "전체" || v.tag === tag) &&
      (!onlyUnknown || mk(v.word) !== "o") &&
      (q === "" || (v.word + v.ko + (v.ja ?? "")).toLowerCase().includes(q.toLowerCase())),
  );
  const cnt = countMarks(vocab.map((v) => v.word), mk);
  const deckWords = [...new Map(vocab.filter((v) => tag === "전체" || v.tag === tag).map((v) => [v.word, v])).values()];
  const byW = new Map(deckWords.map((v) => ["vocab:" + v.word, v]));

  return (
    <div>
      <PageTitle kicker="어휘·숙어" title={`星薬 필수 어휘 ${vocab.length}개`}>
        기출에서 실제로 나온 단어·숙어와 의약 장문에 자주 나오는 전문 용어를 모았습니다. 단어마다 <b>○ 확실히 앎 · △ 애매함 · × 모름</b>으로 표시하고, 플래시카드에서 ×·△ 만 회차를 나눠 다시 돌릴 수 있어요.
      </PageTitle>
      <div className="mb-6 max-w-md rounded-2xl border border-slate-200 bg-white p-4">
        <Bar value={cnt.o} total={vocab.length} label="○ 확실히 앎" />
        <p className="mt-1 flex gap-3 text-xs tnum"><span className="text-amber-700">△ 애매함 {cnt.t}</span><span className="text-rose-700">× 모름 {cnt.x}</span><span className="text-slate-500">표시 없음 {cnt.none}</span></p>
      </div>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 mb-3">
        {tags.map((t) => (
          <button
            key={t}
            aria-pressed={tag === t}
            onClick={() => setTag(t)}
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
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="영어·한국어·일본어로 검색" className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3" />
        </label>
        <Segmented
          value={mode}
          onChange={setMode}
          items={[
            { value: "list", label: <><List aria-hidden className="size-4" />목록</> },
            { value: "card", label: <><Layers aria-hidden className="size-4" />플래시카드</> },
          ]}
        />
        {mode === "list" && <label className="flex items-center gap-2"><input type="checkbox" className="size-4 accent-indigo-700" checked={hideKo} onChange={(e) => setHideKo(e.target.checked)} /> 뜻 가리기</label>}
        {mode === "list" && <label className="flex items-center gap-2"><input type="checkbox" className="size-4 accent-indigo-700" checked={onlyUnknown} onChange={(e) => setOnlyUnknown(e.target.checked)} /> ○ 아닌 것만</label>}
        <span className="text-slate-500 tnum">{mode === "list" ? list.length : deckWords.length}개</span>
      </div>
      {mode === "card" ? (
        <MarkStudy
          deck={"vocab:" + tag}
          items={deckWords.map((v) => ({ id: "vocab:" + v.word, legacy: vLegacy(v.word) }))}
          renderLine={(k) => { const v = byW.get(k)!; return <span><b className="en">{v.word}</b> — {v.ko}</span>; }}
          renderCard={(k, flip) => {
            const card = byW.get(k)!;
            return (
              <div className="flex w-full min-h-72 cursor-pointer flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg">
                <p className="text-xs text-slate-500">{card.tag}</p>
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
              </div>
            );
          }}
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {list.map((v) => {
            const m = mk(v.word);
            return (
              <div key={v.word + v.tag} className={"rounded-2xl border bg-white p-4 transition " + (m === "o" ? "border-slate-200 bg-stone-50 opacity-60" : m === "t" ? "border-amber-300 shadow-sm" : m === "x" ? "border-rose-300 shadow-sm" : "border-slate-200 shadow-sm")}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="en text-lg font-bold text-slate-900">{v.word}</span>
                  <span className="text-xs text-slate-500">{v.pos}</span>
                  <span className="ml-auto"><MarkButtons size="sm" value={m} onChange={(x) => writeMark("vocab:" + v.word, x, vLegacy(v.word))} /></span>
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

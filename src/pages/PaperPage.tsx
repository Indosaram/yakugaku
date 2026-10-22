import { useEffect, useState } from "react";
import { ArrowLeft, FileText, Lightbulb, RotateCcw, Timer as TimerIcon, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { papers } from "../data";
import { Md } from "../components/Md";
import { QuizCard } from "../components/Quiz";
import { Bar, Segmented, btn } from "../components/ui";
import { setProgress, useProgress } from "../progress";
import type { Section } from "../data/types";

const KIND: Record<Section["kind"], string> = {
  grammar: "빈칸 문법·어휘",
  paraphrase: "의미가 가까운 표현",
  error: "틀린 곳 찾기",
  relation: "단어 관계",
  ordering: "정렬(並べ替え)",
  dialogue: "회화문",
  reading: "장문독해",
};

function Timer() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    if (left === null || left <= 0) return;
    const t = setTimeout(() => setLeft((l) => (l ?? 1) - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  if (left === null)
    return (
      <button onClick={() => setLeft(70 * 60)} className={btn.dark}>
        <TimerIcon aria-hidden className="size-4" />
        70분 타이머 시작
      </button>
    );
  const m = Math.floor(left / 60);
  const s = left % 60;
  return (
    <span role="timer" className={"inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold tnum " + (left < 600 ? "bg-rose-50 text-rose-700" : "bg-white border border-slate-200 text-slate-900")}>
      <TimerIcon aria-hidden className="size-4" />
      {left > 0 ? `남은 시간 ${m}:${String(s).padStart(2, "0")}` : "시간 종료"}
      <button onClick={() => setLeft(null)} aria-label="타이머 끄기" className="ml-1 rounded-md p-0.5 font-normal text-slate-500 hover:bg-stone-100 hover:text-slate-900">
        <X aria-hidden className="size-4" />
      </button>
    </span>
  );
}

function SectionView({ year, s }: { year: number; s: Section }) {
  const [ko, setKo] = useState(false);
  return (
    <section id={`sec-${s.roman}`} data-sec={s.roman} className="scroll-mt-32 lg:scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-2.5">
        <h2 className="font-serif text-2xl font-bold text-slate-900">{s.roman}</h2>
        <span className="rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1">{KIND[s.kind]}</span>
        <span className="text-xs text-slate-500 tnum">{s.questions.length}문항</span>
      </div>
      <p className="mt-3 text-[15px] text-slate-900" lang="ja">{s.instructionJa}</p>
      <p className="mt-1 text-sm text-slate-500">{s.instructionKo}</p>
      <details className="group mt-4 rounded-xl bg-indigo-50 px-4 py-3">
        <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-indigo-900">
          <Lightbulb aria-hidden className="size-4" />
          이 유형 푸는 요령 (초보자용)
          <span className="ml-auto text-xs font-normal text-indigo-700 group-open:hidden">펼치기</span>
          <span className="ml-auto hidden text-xs font-normal text-indigo-700 group-open:inline">접기</span>
        </summary>
        <Md text={s.strategy} className="mt-2 text-sm" />
      </details>
      {s.passage && (
        <div className="mt-5">
          {s.passageKo && (
            <div className="mb-2">
              <Segmented value={ko ? "ko" : "en"} onChange={(v) => setKo(v === "ko")} items={[{ value: "en", label: "영어 원문" }, { value: "ko", label: "한국어 번역" }]} />
            </div>
          )}
          <div className="rounded-xl border border-slate-200 bg-stone-50 p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
            {ko && s.passageKo ? <Md text={s.passageKo} /> : <Md text={s.passage} className="en text-[16.5px]" />}
            {!ko && s.notes && <Md text={s.notes} className="mt-3 text-sm text-slate-600 border-t pt-2" />}
          </div>
        </div>
      )}
      <div className="mt-4 space-y-4">
        {s.questions.map((q, i) => (
          <QuizCard key={i} q={{ ...q, label: String(q.number) }} storeKey={`paper:${year}:${s.roman}:${i}`} />
        ))}
      </div>
    </section>
  );
}

export default function PaperPage() {
  const { year } = useParams();
  const p = papers.find((x) => String(x.year) === year);
  const { get } = useProgress();
  const [active, setActive] = useState<string>("I");
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-sec]"));
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.getAttribute("data-sec") ?? "I");
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [year]);
  function jump(roman: string) {
    setActive(roman);
    document.getElementById(`sec-${roman}`)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
  if (!p) return <p>해당 연도를 찾을 수 없어요.</p>;
  let answered = 0;
  let correct = 0;
  let total = 0;
  p.sections.forEach((s) =>
    s.questions.forEach((q, i) => {
      total++;
      const v = get(`paper:${p.year}:${s.roman}:${i}`);
      if (typeof v === "number") {
        answered++;
        if (v === q.answer) correct++;
      }
    }),
  );
  const rate = answered ? Math.round((correct / answered) * 100) : 0;
  function resetPaper() {
    if (!p || !confirm(`${p.year}년도 기출의 내 답 ${answered}개를 지우고 처음부터 풀까요?`)) return;
    p.sections.forEach((s) => s.questions.forEach((_, i) => setProgress(`paper:${p.year}:${s.roman}:${i}`, false)));
  }
  return (
    <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-8">
      <aside className="hidden lg:block">
        <nav aria-label="대문 이동" className="sticky top-24 space-y-0.5 text-sm">
          <Link to="/en/papers" className={btn.link + " mb-3"}><ArrowLeft aria-hidden className="size-4" />기출 목록</Link>
          {p.sections.map((s) => (
            <a
              key={s.roman}
              href={`#sec-${s.roman}`}
              aria-current={active === s.roman ? "location" : undefined}
              onClick={(e) => { e.preventDefault(); jump(s.roman); }}
              className={"flex gap-2 rounded-lg px-3 py-1.5 transition " + (active === s.roman ? "bg-indigo-50 font-semibold text-indigo-800" : "text-slate-600 hover:bg-stone-100 hover:text-slate-900")}
            >
              <span className="w-7 font-serif">{s.roman}</span>
              <span>{KIND[s.kind]}</span>
            </a>
          ))}
        </nav>
      </aside>
      <div className="min-w-0">
        <Link to="/en/papers" className={btn.link + " lg:hidden"}><ArrowLeft aria-hidden className="size-4" />기출 목록</Link>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-2" lang="ja">{p.year}年度 一般選抜（B方式）英語</h1>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Timer />
          <a href={p.pdfUrl} target="_blank" rel="noreferrer" className={btn.secondary}>
            <FileText aria-hidden className="size-4" />
            원본 PDF
          </a>
          <button onClick={resetPaper} disabled={answered === 0} className="inline-flex items-center gap-1 px-2 py-2 text-sm text-slate-500 hover:text-slate-900 disabled:opacity-40 disabled:hover:text-slate-500">
            <RotateCcw aria-hidden className="size-3.5" />
            기록 초기화
          </button>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 max-w-lg rounded-2xl border border-slate-200 bg-white p-4 text-center">
          <div><p className="text-xs text-slate-500">맞힌 문제</p><p className="text-xl font-bold text-slate-900 tnum">{correct}</p></div>
          <div><p className="text-xs text-slate-500">푼 문제</p><p className="text-xl font-bold text-slate-900 tnum">{answered}<span className="text-sm font-normal text-slate-500">/{total}</span></p></div>
          <div><p className="text-xs text-slate-500">정답률</p><p className={"text-xl font-bold tnum " + (answered === 0 ? "text-slate-300" : rate >= 65 ? "text-emerald-700" : "text-rose-700")}>{answered ? rate + "%" : "–"}</p></div>
          <div className="col-span-3 -mt-2 text-left"><Bar value={answered} total={total} /><p className="text-xs text-slate-500">합격 목표선: 정답률 약 65%</p></div>
        </div>
        <div className="sticky top-16 z-20 -mx-4 mt-5 border-b border-slate-200 bg-stone-50/90 px-4 py-2 backdrop-blur lg:hidden">
          <nav aria-label="대문 이동" className="no-scrollbar flex gap-1.5 overflow-x-auto">
            {p.sections.map((s) => (
              <a
                key={s.roman}
                href={`#sec-${s.roman}`}
                aria-current={active === s.roman ? "location" : undefined}
                onClick={(e) => { e.preventDefault(); jump(s.roman); }}
                className={"shrink-0 rounded-full px-3 py-1.5 font-serif text-sm transition " + (active === s.roman ? "bg-slate-900 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200")}
              >
                {s.roman}
              </a>
            ))}
          </nav>
        </div>
        <details className="group mt-5 rounded-2xl bg-white border border-slate-200 p-5">
          <summary className="flex cursor-pointer list-none items-center gap-2 font-bold text-slate-900">
            {p.year}년도 총평과 대문 구성
            <span className="ml-auto text-xs font-normal text-indigo-700 group-open:hidden">펼치기</span>
            <span className="ml-auto hidden text-xs font-normal text-indigo-700 group-open:inline">접기</span>
          </summary>
          <Md text={p.overview} className="mt-3" />
        </details>
        <div className="mt-6 space-y-6">
          {p.sections.map((s) => (
            <SectionView key={s.roman} year={p.year} s={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

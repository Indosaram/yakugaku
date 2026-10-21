import { ArrowLeft, BookOpen, Microscope, PencilLine, Sparkles } from "lucide-react";
import { Segmented, btn } from "../components/ui";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readings } from "../data";
import { Md } from "../components/Md";
import { QuizCard } from "../components/Quiz";
import { SlashPlayer } from "../components/VisualBlocks";

export default function ReadingPage() {
  const { id } = useParams();
  const r = readings.find((x) => x.id === id);
  const [tab, setTab] = useState<"read" | "break">("read");
  const [openAll, setOpenAll] = useState(false);
  if (!r) return <p>지문을 찾을 수 없어요.</p>;
  return (
    <article className="mx-auto max-w-3xl">
      <Link to="/en/reading" className={btn.link}><ArrowLeft aria-hidden className="size-4" />장문 목록</Link>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-3 en">{r.title}</h1>
      <p className="text-slate-600 mt-1">{r.topic}</p>
      <ol className="mt-5 grid gap-2 rounded-2xl bg-indigo-50 p-4 text-sm leading-relaxed text-indigo-950 sm:grid-cols-3">
        {["사전 없이 원문을 한 번 읽고 아래 문제를 푼다", "\"문장별 해부\"에서 모르는 문장을 확인한다", "원문을 소리 내어 3번 다시 읽는다"].map((t, i) => (
          <li key={i} className="flex gap-2"><span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-indigo-800 tnum">{i + 1}</span>{t}</li>
        ))}
      </ol>
      <div className="mt-5">
        <Segmented
          value={tab}
          onChange={setTab}
          items={[
            { value: "read", label: <><BookOpen aria-hidden className="size-4" />원문 읽기</> },
            { value: "break", label: <><Microscope aria-hidden className="size-4" />문장별 해부 <span className="tnum">({r.breakdown.length})</span></> },
          ]}
        />
      </div>
      {tab === "read" ? (
        <div className="mt-3 rounded-2xl bg-white border border-slate-200 p-5 sm:p-8 shadow-sm">
          <Md text={r.text} className="en text-[17px]" />
          {r.notes && <Md text={r.notes} className="mt-4 border-t pt-3 text-sm text-slate-600" />}
        </div>
      ) : (
        <div className="mt-3 space-y-3">
          <button onClick={() => setOpenAll((o) => !o)} className={btn.link}>{openAll ? "해설 모두 접기" : "해설 모두 펼치기"}</button>
          {r.breakdown.map((b, i) => (
            <details key={i + String(openAll)} open={openAll} className="group rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <summary className="flex cursor-pointer list-none gap-3 en text-[16px]"><span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-stone-100 font-sans text-xs font-bold text-slate-500 tnum group-open:bg-slate-900 group-open:text-white">{i + 1}</span><span className="flex-1">{b.en}</span></summary>
              <div className="reveal mt-3 space-y-3 border-t border-slate-200 pt-3 text-sm sm:pl-9">
                <SlashPlayer slash={b.slash} ko={b.ko} />
                <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-3.5">
                  <p className="flex items-center gap-1.5 text-xs font-bold text-indigo-800 mb-1">
                    <Sparkles aria-hidden className="size-3.5" />
                    문법 구조 한눈에 보기
                  </p>
                  <Md text={b.grammar} />
                </div>
              </div>
            </details>
          ))}
        </div>
      )}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-3"><PencilLine aria-hidden className="size-5 text-indigo-700" />확인 문제</h2>
        <div className="space-y-4">
          {r.quiz.map((q, i) => (
            <QuizCard key={i} q={q} index={i} storeKey={`reading:${r.id}:${i}`} />
          ))}
        </div>
      </section>
    </article>
  );
}

import { ArrowLeft, ArrowRight, PencilLine } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { lessons, levelNames } from "../data";
import { GrammarLab } from "../components/GrammarLab";
import { Md } from "../components/Md";
import { QuizCard, useScore } from "../components/Quiz";
import { Bar, btn } from "../components/ui";

export default function LessonPage() {
  const { id } = useParams();
  const idx = lessons.findIndex((l) => l.id === id);
  const l = lessons[idx];
  const score = useScore(`lesson:${id}:`, l?.quiz ?? []);
  if (!l) return <p>강의를 찾을 수 없어요.</p>;
  const prev = lessons[idx - 1];
  const next = lessons[idx + 1];
  return (
    <article className="mx-auto max-w-3xl">
      <Link to="/en/grammar" className={btn.link}><ArrowLeft aria-hidden className="size-4" />문법 목록</Link>
      <p className="mt-4 text-sm font-semibold text-indigo-700">{levelNames[l.level]} · 제{idx + 1}강</p>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">{l.title}</h1>
      <p className="mt-2 text-slate-600 leading-relaxed">{l.summary}</p>
      <GrammarLab id={l.id} />
      <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-5 sm:p-8 shadow-sm">
        <Md text={l.body} />
      </div>
      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-1"><PencilLine aria-hidden className="size-5 text-indigo-700" />확인 퀴즈</h2>
        <p className="text-sm text-slate-500 mb-3">먼저 스스로 풀고, 선택하면 바로 정답과 해설이 나옵니다.</p>
        <Bar value={score.correct} total={score.total} label="맞힌 문제" />
        <div className="mt-4 space-y-4">
          {l.quiz.map((q, i) => (
            <QuizCard key={i} q={q} index={i} storeKey={`lesson:${l.id}:${i}`} />
          ))}
        </div>
      </section>
      <nav aria-label="강의 이동" className="mt-12 grid grid-cols-2 gap-3 text-sm">
        {prev ? (
          <Link className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md" to={`/en/grammar/${prev.id}`}>
            <span className="flex items-center gap-1 text-xs text-slate-500"><ArrowLeft aria-hidden className="size-3.5" />이전 강의</span>
            <span className="mt-1 block font-semibold text-slate-900">{prev.title}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link className="group rounded-2xl border border-slate-200 bg-white p-4 text-right shadow-sm transition hover:shadow-md" to={`/en/grammar/${next.id}`}>
            <span className="flex items-center justify-end gap-1 text-xs text-slate-500">다음 강의<ArrowRight aria-hidden className="size-3.5" /></span>
            <span className="mt-1 block font-semibold text-slate-900">{next.title}</span>
          </Link>
        ) : <span />}
      </nav>
    </article>
  );
}

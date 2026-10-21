import { Link } from "react-router-dom";
import { ArrowRight, BookMarked, ClipboardList, FlaskConical, Library, Target, Timer, Trophy, FileCheck2 } from "lucide-react";
import { lessons, papers, readings, vocab } from "../data";
import { useProgress } from "../progress";
import { Bar, btn } from "../components/ui";

const STEPS = [
  { to: "/en/guide", icon: Target, t: "시험부터 알자", d: "70분·100점·마크시트, 대문 9개. 어떤 문제가 몇 개 나오는지 먼저 파악합니다." },
  { to: "/en/grammar", icon: BookMarked, t: `왕기초 문법 ${lessons.length}강`, d: "품사·문장 구조부터 관계사·가정법까지. 모든 용어를 쉬운 말로 풀었습니다." },
  { to: "/en/vocab", icon: Library, t: "어휘·숙어", d: `기출 단어·숙어·의약 용어 ${vocab.length}개를 플래시카드로 매일 외웁니다.` },
  { to: "/en/reading", icon: FlaskConical, t: "의약 장문 연습", d: "약·의학·생명과학 지문을 문장 하나하나 해부합니다." },
  { to: "/en/papers", icon: ClipboardList, t: `기출 ${papers.length}개년 실전`, d: "2024~2026 공식 기출 전 문항 해설. 70분 타이머로 실전처럼." },
];

const FACTS = [
  { icon: Timer, k: "시험 시간", v: "70분" },
  { icon: FileCheck2, k: "형식", v: "마크시트 · 대문 9개" },
  { icon: Trophy, k: "합격 목표", v: "약 65% 전후" },
];

export default function EnglishHome() {
  const { store, get } = useProgress();
  const allQs =
    lessons.reduce((a, l) => a + l.quiz.length, 0) +
    papers.reduce((a, p) => a + p.sections.reduce((b, s) => b + s.questions.length, 0), 0) +
    readings.reduce((a, r) => a + r.quiz.length, 0);
  const solved = Object.entries(store).filter(([k, v]) => !k.startsWith("vocab:") && typeof v === "number").length;
  const known = vocab.filter((v) => get(`vocab:${v.word}`) === true).length;
  const nextLesson = lessons.find((l) => l.quiz.some((_, i) => typeof get(`lesson:${l.id}:${i}`) !== "number")) ?? lessons[0];
  const nextIdx = lessons.indexOf(nextLesson) + 1;
  const started = solved > 0;

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white px-6 py-10 sm:px-12 sm:py-14 shadow-xl">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-indigo-500/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/3 size-80 rounded-full bg-amber-400/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute right-8 top-8 hidden md:block select-none font-serif text-[9rem] leading-none text-white/5" lang="ja">星</div>
        <div className="relative">
          <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs sm:text-sm text-slate-200" lang="ja">星薬科大学 薬学科（6年制）· 一般選抜 B方式</p>
          <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
            영문법 <span className="text-amber-300">0</span>에서 시작하는
            <br />
            호시약대 B방식 영어 독학
          </h1>
          <p className="mt-5 max-w-2xl text-slate-300 leading-relaxed">
            "주어가 뭐예요?"부터 시작해도 됩니다. 시험 분석 → 문법 → 어휘 → 장문 → 기출 실전까지 순서대로 따라가세요. 설명은 모두 한국어, 문제와 지문은 실제 시험처럼 영어·일본어 그대로입니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={`/en/grammar/${nextLesson.id}`} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-900 transition hover:bg-amber-50 active:translate-y-px">
              {started ? `제${nextIdx}강 이어서 공부하기` : "제1강부터 시작하기"}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link to="/en/papers" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/15 active:translate-y-px">
              기출문제 바로 풀기
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {FACTS.map((f) => (
          <div key={f.k} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-slate-700">
              <f.icon aria-hidden className="size-5" />
            </span>
            <div>
              <p className="text-xs text-slate-500">{f.k}</p>
              <p className="text-lg font-bold text-slate-900">{f.v}</p>
            </div>
          </div>
        ))}
      </section>

      <section>
        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">학습 순서</h2>
            <p className="text-sm text-slate-500 mt-1">위에서부터 차례로. 막히면 언제든 앞 단계로 돌아가세요.</p>
          </div>
          <Link to="/en/plan" className={btn.link + " shrink-0"}>6개월 로드맵 <ArrowRight aria-hidden className="size-3.5" /></Link>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <li key={s.to}>
              <Link
                to={s.to}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                    <s.icon aria-hidden className="size-5" />
                  </span>
                  <span className="font-serif text-2xl text-slate-300 tnum">{i + 1}</span>
                </div>
                <p className="mt-4 font-semibold text-slate-900">{s.t}</p>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{s.d}</p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-slate-900">내 학습 현황</h2>
          <p className="text-sm text-slate-500">이 브라우저에만 저장됩니다.</p>
          <Bar value={solved} total={allQs} label="푼 문제" />
          <Bar value={known} total={vocab.length} label="외운 단어" />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-slate-900">수록 콘텐츠</h2>
          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {[
              ["문법 강의", `${lessons.length}강`],
              ["기출", `${papers.length}개년`],
              ["의약 장문", `${readings.length}편`],
              ["단어·숙어", `${vocab.length}개`],
              ["전체 문제", `${allQs}문항`],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-slate-500">{k}</dt>
                <dd className="font-bold text-slate-900 tnum">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}

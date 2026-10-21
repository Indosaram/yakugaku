import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookMarked, CalendarCheck, ClipboardList, FlaskConical, Library, PencilLine, RotateCcw } from "lucide-react";
import { PageTitle } from "../components/ui";
import { lessons } from "../data";
import { useProgress } from "../progress";

const ROUTINE = [
  { icon: Library, t: "단어 카드 20개", min: 20, d: "어제 단어 복습 → 새 단어", to: "/en/vocab" },
  { icon: BookMarked, t: "문법 강의 1개", min: 40, d: "모션 실험실을 직접 눌러 보고 예문 소리 내어 읽기", to: "/en/grammar" },
  { icon: PencilLine, t: "확인 퀴즈", min: 20, d: "틀린 문제는 해설 그림을 다시 보기", to: "/en/grammar" },
  { icon: FlaskConical, t: "장문 5문장", min: 20, d: "3개월차부터: 끊어 읽기 재생", to: "/en/reading" },
];

const MONTHS = [
  { m: 1, t: "문장 모양 알기", lessons: [1, 5], vocab: "필수동사 60개", goal: "영어 문장에서 주어와 동사를 표시할 수 있다", color: "bg-sky-500" },
  { m: 2, t: "동사 모양 바꾸기", lessons: [6, 12], vocab: "필수 명사·형용사 60개", goal: "I번 빈칸 문법 쉬운 문제를 이유를 대며 푼다", color: "bg-indigo-500" },
  { m: 3, t: "시험 핵심 문법 ①", lessons: [13, 17], vocab: "숙어 1~35", goal: "의약 장문 1~2편을 문장별로 해부한다", color: "bg-violet-500" },
  { m: 4, t: "시험 핵심 문법 ②", lessons: [18, 22], vocab: "숙어 36~끝", goal: "의약 장문 3~4편", color: "bg-fuchsia-500" },
  { m: 5, t: "유형별 전략", lessons: [23, 27], vocab: "의약·과학 단어 60개", goal: "장문 1편을 8분 안에 푼다", color: "bg-amber-500" },
  { m: 6, t: "기출 실전", lessons: null, vocab: "틀린 단어만", goal: "2024 → 2025 → 2026 기출을 70분 타이머로", color: "bg-emerald-600" },
];

const REVIEW = [
  { t: "왜 틀렸나 한 줄", d: "단어 몰랐다 / 문법 몰랐다 / 근거 안 찾았다 / 시간 부족" },
  { t: "관련 강의 다시 보기", d: "해설 아래 '관련 문법 강의' 버튼" },
  { t: "오답 보기도 설명", d: "맞힌 문제도 나머지 보기가 왜 틀렸는지 말해 보기" },
  { t: "이틀 뒤 다시 풀기", d: "같은 문제를 다시 풀어 확인" },
];

function Roadmap() {
  const { get } = useProgress();
  const [sel, setSel] = useState(0);
  const lessonDone = (n: number) => {
    const l = lessons[n - 1];
    return l ? l.quiz.every((_, i) => typeof get(`lesson:${l.id}:${i}`) === "number") : false;
  };
  const cur = MONTHS[sel];
  const range = cur.lessons ? lessons.slice(cur.lessons[0] - 1, cur.lessons[1]) : [];
  return (
    <div>
      <div className="relative">
        <div className="absolute left-0 right-0 top-5 h-1 rounded-full bg-stone-200" aria-hidden />
        <ol className="relative grid grid-cols-6 gap-1">
          {MONTHS.map((m, i) => {
            const done = m.lessons ? Array.from({ length: m.lessons[1] - m.lessons[0] + 1 }, (_, k) => lessonDone(m.lessons![0] + k)).every(Boolean) : false;
            return (
              <li key={m.m} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setSel(i)}
                  aria-pressed={sel === i}
                  aria-label={`${m.m}개월차 ${m.t}`}
                  className={"inline-flex size-10 items-center justify-center rounded-full text-sm font-bold text-white ring-4 ring-white transition duration-200 ease-spring tnum " + m.color + (sel === i ? " scale-110 shadow-lg" : " opacity-70 hover:opacity-100")}
                >
                  {done ? "✓" : m.m}
                </button>
                <span className={"mt-1.5 text-center text-[11px] leading-tight " + (sel === i ? "font-bold text-slate-900" : "text-slate-500")}>{m.m}개월</span>
              </li>
            );
          })}
        </ol>
      </div>
      <div key={sel} className="spring-pop mt-5 rounded-2xl border border-slate-200 bg-stone-50 p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <span className={"rounded-md px-2 py-0.5 text-xs font-bold text-white " + cur.color}>{cur.m}개월차</span>
          <h3 className="text-lg font-bold text-slate-900">{cur.t}</h3>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3 text-sm">
          <div className="rounded-xl bg-white p-3 border border-slate-200">
            <p className="text-xs font-bold text-slate-500">문법</p>
            <p className="font-semibold text-slate-900">{cur.lessons ? `제${cur.lessons[0]}~${cur.lessons[1]}강` : "기출 3개년"}</p>
          </div>
          <div className="rounded-xl bg-white p-3 border border-slate-200">
            <p className="text-xs font-bold text-slate-500">어휘</p>
            <p className="font-semibold text-slate-900">{cur.vocab}</p>
          </div>
          <div className="rounded-xl bg-white p-3 border border-indigo-200">
            <p className="text-xs font-bold text-indigo-700">이번 달 목표</p>
            <p className="font-semibold text-slate-900">{cur.goal}</p>
          </div>
        </div>
        {range.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {range.map((l) => {
              const n = lessons.indexOf(l) + 1;
              const d = lessonDone(n);
              return (
                <Link key={l.id} to={`/en/grammar/${l.id}`} className={"inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition " + (d ? "bg-emerald-100 text-emerald-900" : "bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-indigo-50")}>
                  <span className="tnum">{n}</span>{l.title}{d && " ✓"}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
            {["1주 2024", "2주 2025", "3주 2026", "4주 오답만"].map((w, k) => (
              <Link key={w} to={k < 3 ? `/en/papers/${2024 + k}` : "/en/papers"} className="rounded-xl bg-white p-2.5 text-center font-bold text-slate-800 ring-1 ring-slate-200 hover:bg-emerald-50">
                <ClipboardList aria-hidden className="mx-auto mb-1 size-4 text-emerald-700" />{w}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Plan() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageTitle kicker="학습 로드맵" title="문법 0 → 합격권까지 6개월 지도">
        하루 1.5~2시간 기준입니다. 목표는 B방식 기출을 70분 안에 65% 이상 맞히는 것. 동그라미를 눌러 달마다 할 일을 보세요. 퀴즈를 다 푼 강의는 초록색으로 바뀝니다.
      </PageTitle>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900"><CalendarCheck aria-hidden className="size-5 text-indigo-700" />6개월 여정</h2>
        <div className="mt-5"><Roadmap /></div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">매일 하는 100분 루틴</h2>
        <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full">
          {ROUTINE.map((r, i) => <div key={r.t} className={["bg-sky-500", "bg-indigo-600", "bg-amber-500", "bg-emerald-600"][i]} style={{ width: `${r.min}%` }} />)}
        </div>
        <ol className="mt-4 grid gap-3 sm:grid-cols-4">
          {ROUTINE.map((r, i) => (
            <li key={r.t} className="relative">
              <Link to={r.to} className="flex h-full flex-col rounded-xl border border-slate-200 bg-stone-50 p-3.5 transition hover:bg-white hover:shadow-md">
                <div className="flex items-center justify-between">
                  <r.icon aria-hidden className="size-5 text-indigo-700" />
                  <span className="text-xs font-bold text-slate-500 tnum">{r.min}분</span>
                </div>
                <p className="mt-2 font-bold text-slate-900"><span className="tnum">{i + 1}.</span> {r.t}</p>
                <p className="mt-1 text-xs text-slate-600">{r.d}</p>
              </Link>
              {i < ROUTINE.length - 1 && <ArrowRight aria-hidden className="absolute -right-2.5 top-1/2 hidden size-4 -translate-y-1/2 text-slate-300 sm:block" />}
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900"><RotateCcw aria-hidden className="size-5 text-indigo-700" />기출 복습 4단계 순환</h2>
        <p className="mt-1 text-sm text-slate-600">가장 중요한 부분입니다. 틀린 문제는 이 고리를 한 바퀴 돌립니다.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {REVIEW.map((r, i) => (
            <div key={r.t} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-stone-50 p-3.5">
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-indigo-700 font-bold text-white tnum">{i + 1}</span>
              <div>
                <p className="font-bold text-slate-900">{r.t}</p>
                <p className="text-sm text-slate-600">{r.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">한국어와 영어, 어순이 다르다</h2>
        <p className="mt-1 text-sm text-slate-600">한국어는 조사(은/는/을/를)로 역할을 정하지만, 영어는 자리(순서)로 정합니다. 첫 1개월은 이 차이에 익숙해지는 기간입니다.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-stone-50 p-3.5 border border-slate-200">
            <p className="text-xs font-bold text-slate-500 mb-2">한국어: 동사가 맨 끝</p>
            <div className="flex flex-wrap gap-1.5 text-sm font-bold">
              <span className="rounded-lg bg-sky-100 px-2.5 py-1 text-sky-900">환자는</span>
              <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-emerald-900">약을</span>
              <span className="rounded-lg bg-indigo-600 px-2.5 py-1 text-white">먹는다</span>
            </div>
          </div>
          <div className="rounded-xl bg-stone-50 p-3.5 border border-slate-200">
            <p className="text-xs font-bold text-slate-500 mb-2">영어: 동사가 두 번째</p>
            <div className="en flex flex-wrap gap-1.5 text-sm font-bold">
              <span className="rounded-lg bg-sky-100 px-2.5 py-1 text-sky-900">The patient</span>
              <span className="rounded-lg bg-indigo-600 px-2.5 py-1 text-white">takes</span>
              <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-emerald-900">medicine.</span>
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3 text-sm">
          {[["最も適切なもの", "가장 적절한 것"], ["誤っているもの", "틀린 것"], ["本文の内容と一致するもの", "본문 내용과 일치하는 것"]].map(([ja, ko]) => (
            <div key={ja} className="rounded-xl border border-slate-200 p-3">
              <p className="font-semibold text-slate-900" lang="ja">{ja}</p>
              <p className="text-xs text-slate-600">{ko}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

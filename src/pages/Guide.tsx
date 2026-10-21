import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, FileCheck2, Target, Trophy, Users } from "lucide-react";
import { papers } from "../data";
import { PageTitle } from "../components/ui";

const KIND: Record<string, string> = { grammar: "빈칸 문법·어휘", paraphrase: "의미가 가까운 표현", error: "틀린 곳 찾기", relation: "단어 관계", ordering: "정렬", dialogue: "회화문", reading: "장문독해" };
const KIND_COLOR: Record<string, string> = {
  grammar: "bg-indigo-600",
  paraphrase: "bg-sky-500",
  error: "bg-rose-500",
  relation: "bg-violet-500",
  ordering: "bg-amber-500",
  dialogue: "bg-teal-500",
  reading: "bg-emerald-600",
};

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

function Section({ n, title, lead, children }: { n: number; title: string; lead?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex size-7 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white tnum">{n}</span>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">{title}</h2>
      </div>
      {lead && <p className="mt-1.5 text-sm text-slate-600">{lead}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

const FACTS = [
  { icon: Clock, k: "시험 시간", v: "70분", s: "영어만 따로" },
  { icon: FileCheck2, k: "답안", v: "전부 마크시트", s: "번호만 고르면 끝" },
  { icon: Target, k: "배점", v: "100점", s: "영어·수학·화학 같은 비중" },
  { icon: Trophy, k: "목표선", v: "약 65%", s: "학원 분석 기준" },
];

const RESULTS = [
  { y: 2026, apply: 1337, take: 1296, pass: 437, rate: "3.0" },
  { y: 2025, apply: 1361, take: 1308, pass: 371, rate: "3.5" },
  { y: 2024, apply: 1287, take: 1246, pass: 413, rate: "3.0" },
];

function CompetitionChart() {
  const { ref, seen } = useInView<HTMLDivElement>();
  const max = 1400;
  return (
    <div ref={ref} className="space-y-4">
      {RESULTS.map((r) => (
        <div key={r.y}>
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-bold text-slate-900 tnum">{r.y}년</span>
            <span className="text-slate-600">경쟁률 <b className="text-lg text-indigo-700 tnum">{r.rate}배</b></span>
          </div>
          <div className="mt-1.5 space-y-1">
            <div className="relative h-6 rounded-md bg-stone-100 overflow-hidden">
              <div className="h-full rounded-md bg-slate-300 transition-[width] duration-700 ease-spring" style={{ width: seen ? `${(r.take / max) * 100}%` : "0%" }} />
              <span className="absolute inset-y-0 left-2 flex items-center text-xs font-semibold text-slate-800 tnum">응시 {r.take.toLocaleString()}명</span>
            </div>
            <div className="relative h-6 rounded-md bg-stone-100 overflow-hidden">
              <div className="h-full rounded-md bg-emerald-300 transition-[width] duration-700 delay-150 ease-spring" style={{ width: seen ? `${(r.pass / max) * 100}%` : "0%" }} />
              <span className="absolute inset-y-0 left-2 flex items-center text-xs font-semibold text-emerald-950 tnum">합격 {r.pass}명</span>
            </div>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3 rounded-xl bg-indigo-50 p-3.5">
        <div className="flex shrink-0 gap-1" aria-hidden>
          <Users className="size-6 text-emerald-600" />
          <Users className="size-6 text-slate-300" />
          <Users className="size-6 text-slate-300" />
        </div>
        <p className="text-sm text-indigo-950">정원은 120명이지만 합격자는 약 400명입니다. <b>시험 본 사람 3명 중 1명</b>이 붙는다고 보면 됩니다.</p>
      </div>
    </div>
  );
}

function Blueprint() {
  const [year, setYear] = useState(papers[0].year);
  const p = papers.find((x) => x.year === year) ?? papers[0];
  const total = p.sections.reduce((a, s) => a + s.questions.length, 0);
  const [hover, setHover] = useState<string | null>(null);
  const cur = p.sections.find((s) => s.roman === hover);
  return (
    <div>
      <div className="inline-flex rounded-xl bg-stone-100 p-1 text-xs mb-4" role="group" aria-label="연도 선택">
        {papers.map((x) => (
          <button key={x.year} type="button" aria-pressed={year === x.year} onClick={() => setYear(x.year)} className={"rounded-lg px-3 py-1.5 font-bold tnum " + (year === x.year ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600")}>
            {x.year}
          </button>
        ))}
      </div>
      <div key={year} className="spring-pop flex h-16 w-full overflow-hidden rounded-xl">
        {p.sections.map((s) => (
          <button
            key={s.roman}
            type="button"
            onMouseEnter={() => setHover(s.roman)}
            onFocus={() => setHover(s.roman)}
            onClick={() => setHover(s.roman)}
            style={{ width: `${(s.questions.length / total) * 100}%` }}
            className={"flex flex-col items-center justify-center border-r-2 border-white text-white transition " + KIND_COLOR[s.kind] + (hover && hover !== s.roman ? " opacity-50" : "")}
          >
            <span className="font-serif text-sm font-bold">{s.roman}</span>
            <span className="text-[10px] tnum">{s.questions.length}</span>
          </button>
        ))}
      </div>
      <p className="mt-3 min-h-10 rounded-lg bg-stone-50 px-3 py-2 text-sm text-slate-700">
        {cur ? (
          <><b className="font-serif">{cur.roman}</b> · {KIND[cur.kind]} · <span className="tnum">{cur.questions.length}문항</span> — {cur.instructionKo}</>
        ) : (
          <>막대 칸 하나가 대문 하나입니다. 칸 너비는 문항 수에 비례합니다. 칸을 눌러 보세요. (총 <span className="tnum">{total}</span>문항)</>
        )}
      </p>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-600">
        {Object.entries(KIND).map(([k, v]) => (
          <span key={k} className="inline-flex items-center gap-1.5"><span className={"size-2.5 rounded-sm " + KIND_COLOR[k]} />{v}</span>
        ))}
      </div>
      <Link to={`/en/papers/${year}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-700 hover:underline">{year}년 기출 풀러 가기 <ArrowRight aria-hidden className="size-3.5" /></Link>
    </div>
  );
}

const TIME = [
  { label: "I~III 문법·어휘·오류", min: 15, color: "bg-indigo-600", tip: "1문제 1분. 모르면 찍고 넘어가기" },
  { label: "IV 짧은 글 빈칸", min: 12, color: "bg-sky-500", tip: "빈칸 앞뒤 + 역접·인과 확인" },
  { label: "V 정렬", min: 6, color: "bg-amber-500", tip: "동사 먼저, 덩어리로 묶기" },
  { label: "VI~IX 장문", min: 32, color: "bg-emerald-600", tip: "설문 먼저 보고 본문 읽기" },
  { label: "검토", min: 5, color: "bg-slate-400", tip: "마킹 누락·밀림 확인" },
];

function TimeBar() {
  const { ref, seen } = useInView<HTMLDivElement>();
  const [i, setI] = useState(3);
  let acc = 0;
  return (
    <div ref={ref}>
      <div className="flex h-12 w-full overflow-hidden rounded-xl bg-stone-100">
        {TIME.map((t, k) => (
          <button
            key={t.label}
            type="button"
            onClick={() => setI(k)}
            aria-pressed={i === k}
            className={"flex items-center justify-center border-r-2 border-white text-xs font-bold text-white transition-[width,opacity] duration-700 ease-spring " + t.color + (i !== k ? " opacity-60" : "")}
            style={{ width: seen ? `${(t.min / 70) * 100}%` : "0%", transitionDelay: `${k * 90}ms` }}
          >
            <span className="tnum">{t.min}분</span>
          </button>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-slate-500 tnum">
        {[0, ...TIME.map((t) => (acc += t.min))].map((m) => <span key={m}>{m}</span>)}
      </div>
      <div key={i} className="spring-pop mt-3 flex items-start gap-3 rounded-xl border border-slate-200 bg-stone-50 p-3.5">
        <span className={"mt-1 size-3 shrink-0 rounded-full " + TIME[i].color} />
        <div>
          <p className="font-bold text-slate-900">{TIME[i].label} <span className="tnum text-indigo-700">{TIME[i].min}분</span></p>
          <p className="text-sm text-slate-600">{TIME[i].tip}</p>
        </div>
      </div>
    </div>
  );
}

const TRENDS = [
  { t: "문법은 기본 수준", d: "고교 문법 문제집 수준의 전형 문제가 나옵니다.", to: "/en/grammar" },
  { t: "숙어가 자주 나온다", d: "turn in, see eye to eye처럼 통째로 외워야 하는 표현이 나옵니다.", to: "/en/vocab" },
  { t: "장문은 짧고 많다", d: "150~300단어 의학·생명과학 글이 여러 편. 전문 용어에는 주석이 붙습니다.", to: "/en/reading" },
  { t: "내용일치가 늘고 있다", d: "본문 근거 문장과 선택지를 1:1로 대조해야 합니다.", to: "/en/grammar/g27-reading-strategy" },
  { t: "시간 배분이 승부", d: "대문이 9개라 앞에서 시간을 쓰면 뒤 장문을 못 풉니다.", to: "/en/papers" },
];

export default function Guide() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageTitle kicker="시험 분석" title="星薬科大学 一般選抜B方式 英語, 그림으로 한눈에">
        薬学科(6년제) B방식은 대학이 직접 만든 시험으로 뽑습니다. 영어 문제는 6년제·4년제 공통입니다.
      </PageTitle>

      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {FACTS.map((f, i) => (
          <div key={f.k} className="spring-pop rounded-2xl border border-slate-200 bg-white p-4" style={{ animationDelay: `${i * 60}ms` }}>
            <f.icon aria-hidden className="size-5 text-indigo-700" />
            <p className="mt-2 text-xs text-slate-500">{f.k}</p>
            <p className="text-xl font-bold text-slate-900">{f.v}</p>
            <p className="text-xs text-slate-500">{f.s}</p>
          </div>
        ))}
      </div>

      <Section n={1} title="몇 명 중 몇 명이 붙나?" lead="대학 공식 「最近3ヵ年の入試結果」 薬学科 B방식">
        <CompetitionChart />
      </Section>

      <Section n={2} title="시험지는 이렇게 생겼다" lead="실제 기출을 그대로 집계한 대문 구성 지도입니다.">
        <Blueprint />
      </Section>

      <Section n={3} title="70분, 이렇게 나눠 쓰자" lead="칸을 눌러 구간별 요령을 보세요.">
        <TimeBar />
      </Section>

      <Section n={4} title="출제 경향 5가지">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TRENDS.map((t, i) => (
            <Link key={t.t} to={t.to} className="group rounded-xl border border-slate-200 bg-stone-50 p-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md motion-reduce:hover:translate-y-0">
              <span className="font-serif text-2xl text-slate-300 tnum">{i + 1}</span>
              <p className="mt-1 font-bold text-slate-900">{t.t}</p>
              <p className="mt-1 text-sm text-slate-600">{t.d}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-indigo-700">공부하러 가기 <ArrowRight aria-hidden className="size-3 transition group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
        </div>
      </Section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 text-sm">
        <h2 className="font-bold text-slate-900 mb-2">출처</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><a className="text-indigo-700 underline" href="https://www.hoshi.ac.jp/admission/nyushi/exam/" target="_blank" rel="noreferrer">星薬科大学 入学試験過去問題</a> (공식 기출 PDF)</li>
          <li><a className="text-indigo-700 underline" href="https://www.hoshi.ac.jp/admission/nyushi/" target="_blank" rel="noreferrer">星薬科大学 入学試験概要</a></li>
          <li><a className="text-indigo-700 underline" href="https://www.hoshi.ac.jp/admission/nyushi/3yearly/" target="_blank" rel="noreferrer">星薬科大学 最近3ヵ年の入試結果</a> (경쟁률)</li>
          <li><a className="text-indigo-700 underline" href="https://www.topedu.jp/high-school_list/hoshi/" target="_blank" rel="noreferrer">Topedu 星薬科大学対策</a> / <a className="text-indigo-700 underline" href="https://pharmassist-edu.com/post/mitehosii/hosiyakkakaisetsu26/" target="_blank" rel="noreferrer">PharmAssist 星薬科大学徹底解説</a></li>
          <li><a className="text-indigo-700 underline" href="https://jyuke-labo.com/daigakujyukentaisaku/hoshiyakkadaigaku/kamokubetsu/" target="_blank" rel="noreferrer">じゅけラボ 星薬科大学 科目別対策</a></li>
          <li><a className="text-indigo-700 underline" href="https://logicalteacher.com/post-3744/3744/" target="_blank" rel="noreferrer">ロジティー 星薬科大学 英語 過去問分析</a> (65% 전후 합격)</li>
        </ul>
      </section>
    </div>
  );
}

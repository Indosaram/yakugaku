import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const studyGroups = [
  { label: "영어", paths: [
    { to: "/en", label: "영어 홈", desc: "기출문제 · 기초 문법 · 어휘 · 독해" },
    { to: "/books", label: "영어 교재", desc: "영문법·어법 1000제와 영숙어" },
  ] },
  { label: "화학", paths: [
    { to: "/chem", label: "화학 교재", desc: "유기·무기화학 문제와 해설" },
    { to: "/chem370", label: "필수 화학용어 370선", desc: "일본어·요미가나·한국어 용어 목록" },
    { to: "/textbook", label: "화학 교재 번역", desc: "문영당 화학·화학기초 한국어 번역" },
    { to: "/eju", label: "EJU 화학 강의", desc: "강의 요약 · 노트 · 확인 문제" },
    { to: "/jitan", label: "화학 암기 카드", desc: "무기 · 유기 · 고분자 · 반응식" },
    { to: "/yoten", label: "요점·용어", desc: "요점 문제집과 이과용어" },
    { to: "/kyotsu", label: "공통테스트 화학", desc: "2025 시험지와 문항별 해설" },
    { to: "/handai2015", label: "오사카대학 2015", desc: "전기 화학 4문항 한국어 해설" },
  ] },
  { label: "수학", paths: [
    { to: "/math", label: "1분 수학", desc: "문제별 신호와 풀이 순서" },
    { to: "/vec", label: "수학 C 벡터", desc: "내적부터 공간벡터까지" },
    { to: "/nankan", label: "난관대 전 패턴", desc: "수학 패턴 · 무기화학도 포함" },
    { to: "/trig", label: "삼각함수", desc: "공식 확인과 카드 퀴즈" },
  ] },
  { label: "학습 관리", paths: [
    { to: "/review", label: "복습", desc: "오늘의 카드와 복습 일정" },
    { to: "/check", label: "체크표", desc: "과목별 학습 진도" },
    { to: "/exam", label: "기출 분석", desc: "출제 경향과 학습 우선순위" },
    { to: "/sync", label: "기록 동기화", desc: "기기 간 학습 기록 연결" },
  ] },
];

export function PageTitle({ kicker, title, children }: { kicker?: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-8">
      {kicker && <p className="text-sm font-semibold text-indigo-700">{kicker}</p>}
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">{title}</h1>
      {children && <div className="mt-3 max-w-3xl text-slate-600 leading-relaxed">{children}</div>}
    </div>
  );
}

export function Card({ to, title, desc, badge, extra }: { to: string; title: string; desc?: string; badge?: string; extra?: ReactNode }) {
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0"
    >
      {badge && <span className="self-start rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-0.5 mb-2">{badge}</span>}
      <h3 className="font-semibold text-slate-900 flex items-start gap-1">
        <span className="flex-1">{title}</span>
        <ArrowRight aria-hidden className="size-4 mt-1 shrink-0 text-slate-300 transition group-hover:text-indigo-700 group-hover:translate-x-0.5" />
      </h3>
      {desc && <p className="mt-1 text-sm text-slate-600 leading-relaxed">{desc}</p>}
      {extra && <div className="mt-auto pt-3">{extra}</div>}
    </Link>
  );
}

export function Bar({ value, total, label }: { value: number; total: number; label?: string }) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  return (
    <div className="mt-3">
      <div className="h-2 rounded-full bg-stone-200 overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label ?? "진도"}>
        <div className="h-full rounded-full bg-emerald-500 transition-[width] duration-300" style={{ width: pct + "%" }} />
      </div>
      <p className="mt-1 text-xs text-slate-500 tnum">{label ? `${label} ` : ""}{value} / {total} ({pct}%)</p>
    </div>
  );
}

export function Segmented<T extends string>({ value, onChange, items }: { value: T; onChange: (v: T) => void; items: { value: T; label: ReactNode }[] }) {
  return (
    <div className="inline-flex rounded-xl bg-stone-200/70 p-1 text-sm" role="group">
      {items.map((it) => (
        <button
          key={it.value}
          aria-pressed={value === it.value}
          onClick={() => onChange(it.value)}
          className={
            "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition " +
            (value === it.value ? "bg-white text-slate-900 shadow-sm font-semibold" : "text-slate-600 hover:text-slate-900")
          }
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

export const btn = {
  primary: "inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-800 active:translate-y-px",
  secondary: "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 transition hover:bg-stone-100 active:translate-y-px",
  dark: "inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 active:translate-y-px",
  link: "inline-flex items-center gap-1 text-sm text-indigo-700 underline-offset-4 hover:underline",
};

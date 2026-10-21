import { Link } from "react-router-dom";
import { ArrowRight, BookOpenText, ClipboardCheck, FlaskConical, Languages, ListChecks, PlayCircle, Target } from "lucide-react";
import { useData, type EjuLecture, type Tiers } from "../data/remote";
import { useProgress } from "../progress";
import { lessons, papers, vocab } from "../data";
import { watchedKey } from "./Eju";

const SUBJECTS = [
  {
    to: "/en",
    icon: Languages,
    name: "영어",
    ja: "英語",
    color: "bg-indigo-50 text-indigo-700",
    desc: `B방식 영어 기출 3개년 해설, 왕기초 문법 ${lessons.length}강, 어휘 ${vocab.length}개, 의약 장문`,
  },
  {
    to: "/books",
    icon: BookOpenText,
    name: "영어 교재",
    ja: "文法・熟語",
    color: "bg-sky-50 text-sky-700",
    desc: "빈출 영문법·어법 1000제와 영숙어장을 한국어로. 정답과 해설은 따로 접어 두었어요",
  },
  {
    to: "/chem",
    icon: FlaskConical,
    name: "화학",
    ja: "化学",
    color: "bg-rose-50 text-rose-700",
    desc: "합격화학 유기편 350문항 해설, 무기화학 교재, 색·기체 암기 카드",
  },
  {
    to: "/eju",
    icon: PlayCircle,
    name: "EJU 화학 강의",
    ja: "講義ノート",
    color: "bg-amber-50 text-amber-800",
    desc: "유튜브 EJU화학 75강을 대단원별 한국어 교재로. 강의마다 요약·암기·확인 문제",
  },
];

export default function Home() {
  const { get, store } = useProgress();
  const { data: eju } = useData<EjuLecture[]>("eju/index.json");
  const { data: tiers } = useData<Tiers>("tiers.json");
  const watched = eju?.filter((l) => get(watchedKey(l.idx)) === true).length ?? 0;
  const nextLecture = eju?.find((l) => l.tier !== "패스" && get(watchedKey(l.idx)) !== true);
  const chemDone = Object.keys(store).filter((k) => k.startsWith("chem:done:") && store[k] === true).length;
  const enSolved = Object.entries(store).filter(([k, v]) => /^(lesson|paper|reading):/.test(k) && typeof v === "number").length;
  const bookSolved = Object.keys(store).filter((k) => k.startsWith("g1000:")).length;

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-10 text-white shadow-xl sm:px-12 sm:py-14">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-rose-500/25 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/4 size-80 rounded-full bg-indigo-500/25 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute right-6 top-4 hidden select-none font-serif text-[10rem] leading-none text-white/5 md:block" lang="ja">薬</div>
        <div className="relative">
          <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200 sm:text-sm" lang="ja">星薬科大学 薬学部 · 一般選抜 B方式 · 英語 / 化学</p>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            호시약대 합격까지,
            <br />
            <span className="text-amber-300">영어와 화학</span>을 한곳에서.
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-slate-300">
            기출 3개년 해설, 문법·숙어 교재, 합격화학 해설, EJU 강의 교재를 모두 모았습니다. 모든 단원에는 호시 기출 기준으로 <b className="text-white">필수 · 권장 · 패스</b>를 붙였으니, 너무 어려운 건 건너뛰고 나오는 것부터 하세요.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {nextLecture ? (
              <Link to={`/eju/${nextLecture.idx}`} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-900 transition hover:bg-amber-50 active:translate-y-px">
                다음 강의: #{nextLecture.no} 이어서 <ArrowRight aria-hidden className="size-4" />
              </Link>
            ) : (
              <Link to="/eju" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-900">EJU 강의 교재 <ArrowRight className="size-4" /></Link>
            )}
            <Link to="/exam" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/15">
              <Target className="size-4" />기출 분석 보기
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-slate-900">과목별 교재</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {SUBJECTS.map((s) => (
            <Link key={s.to} to={s.to} className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0">
              <span className={"inline-flex size-12 shrink-0 items-center justify-center rounded-xl " + s.color}><s.icon className="size-6" /></span>
              <span className="min-w-0">
                <span className="flex items-baseline gap-2">
                  <b className="text-lg text-slate-900">{s.name}</b>
                  <span className="text-xs text-slate-400" lang="ja">{s.ja}</span>
                  <ArrowRight className="ml-auto size-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-700" />
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-slate-600">{s.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-2">
            <ListChecks className="size-5 text-emerald-600" />
            <h2 className="font-bold text-slate-900">내 학습 현황</h2>
            <Link to="/check" className="ml-auto text-sm text-indigo-700 hover:underline">체크표</Link>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["본 강의", `${watched}/${eju?.length ?? 75}`],
              ["화학 문항", `${chemDone}/350`],
              ["영어 문제", `${enSolved}`],
              ["문법 1000제", `${bookSolved}`],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs text-slate-500">{k}</dt>
                <dd className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900 tnum">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-slate-500">기록은 이 브라우저에만 저장돼요. 폰과 노트북 기록은 따로 쌓입니다.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="size-5 text-rose-600" />
            <h2 className="font-bold text-slate-900">호시 화학, 이렇게 나와요</h2>
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            {(tiers?.topics ?? []).slice(0, 5).map((t) => (
              <li key={t.topic} className="flex items-baseline gap-2">
                <span className="w-8 shrink-0 text-right font-bold text-rose-700 tnum">{t.count}회</span>
                <span className="text-slate-800">{t.topic}</span>
              </li>
            ))}
          </ul>
          <Link to="/exam" className="mt-4 inline-flex items-center gap-1 text-sm text-indigo-700 hover:underline">3개년 출제 분석 전체 <ArrowRight className="size-3.5" /></Link>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-bold text-slate-900">공식 기출 원본</h2>
        <p className="mt-1 text-sm text-slate-600">대학이 공개한 최근 3개년 문제(영어 · 수학 · 화학)는 <a className="text-indigo-700 underline" href="https://www.hoshi.ac.jp/admission/nyushi/exam/" target="_blank" rel="noreferrer">星薬科大学 入学試験過去問題</a>에서 PDF로 볼 수 있어요. 영어 B방식 {papers.length}개년은 이 사이트에 전 문항 해설이 있습니다.</p>
      </section>
    </div>
  );
}

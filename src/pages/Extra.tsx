import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Calculator, FileText, FlaskConical, Layers, Sigma } from "lucide-react";
import { useData, type Deck, type Tier } from "../data/remote";
import { useProgress } from "../progress";
import { Md } from "../components/Md";
import { TierBadge, TierLegend } from "../components/Tier";
import { PageTitle, btn } from "../components/ui";
import { ChemDeck } from "./Chem";

const BASE = import.meta.env.BASE_URL;

function Loading({ error }: { error?: Error }) {
  if (error) return <div className="py-20 text-center text-slate-600">내용을 불러오지 못했어요. 새로고침해 주세요.</div>;
  return <div className="py-20 text-center text-slate-400" role="status">불러오는 중…</div>;
}

function Crumb({ to, label, here }: { to: string; label: string; here: string }) {
  return (
    <nav aria-label="위치" className="mb-3 flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
      <Link to={to} className="hover:text-slate-900 hover:underline">{label}</Link>
      <span aria-hidden className="text-slate-300">/</span>
      <span className="text-slate-700">{here}</span>
    </nav>
  );
}

// ---------- 공통테스트 2025 화학 ----------
type KyotsuQ = { q: number; title: string; points: number; range: string };
type KyotsuIndex = { title: string; video: string; pdf: string; key: string; questions: KyotsuQ[] };

export function KyotsuHome() {
  const { data, error } = useData<KyotsuIndex>("kyotsu/chem2025/index.json");
  if (!data) return <Loading error={error} />;
  return (
    <div>
      <PageTitle kicker="공통테스트 기출" title={data.title}>
        2025년(令和7年度) 대학입학공통테스트 본시험 「化学」 전 문항을 한국어로 해설했습니다. 정답은 대학입시센터 공식 정답표와 맞췄고, 소문항마다 호시 기출 기준 <b>필수 · 권장 · 패스</b>를 붙였어요.
      </PageTitle>
      <div className="mb-6 flex flex-wrap gap-2">
        <a className={btn.primary} href={BASE + data.pdf} target="_blank" rel="noreferrer"><FileText className="size-4" />시험지 PDF (43쪽)</a>
        <a className={btn.secondary} href={BASE + data.key} target="_blank" rel="noreferrer">공식 정답표 PDF</a>
        <a className={btn.link} href={`https://www.youtube.com/watch?v=${data.video}`} target="_blank" rel="noreferrer">해설 영상 (マサの高校化学)</a>
      </div>
      <TierLegend />
      <ol className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {data.questions.map((q) => (
          <li key={q.q}>
            <Link to={`/kyotsu/${q.q}`} className="group flex items-center gap-4 px-4 py-4 hover:bg-stone-50">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 font-bold text-rose-700">{q.q}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-slate-900 group-hover:text-indigo-700">제{q.q}문 {q.title}</span>
                <span className="block text-xs text-slate-500">{q.points}점 · 해답번호 {q.range}{q.q === 6 ? " · 구과정 선택 문제(신과정은 풀지 않음)" : ""}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

// 본문의 `[필수]` 같은 표기를 배지로 바꾼다
function tierize(md: string) {
  return md.replace(/`\[(필수|권장|패스)\]`|\[(필수|권장|패스)\]/g, (_, a, b) => `<span class="tier-${a ?? b}">${a ?? b}</span>`);
}

export function KyotsuQuestion() {
  const { q } = useParams();
  const { data } = useData<KyotsuIndex>("kyotsu/chem2025/index.json");
  const { data: md, error } = useData<string>(q ? `kyotsu/chem2025/q${q}.md` : null, "text");
  const n = Number(q);
  const prev = data?.questions.find((x) => x.q === n - 1), next = data?.questions.find((x) => x.q === n + 1);
  return (
    <div className="mx-auto max-w-3xl">
      <Crumb to="/kyotsu" label="공통테스트 2025 화학" here={`제${q}문`} />
      <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
        {md ? <Md text={tierize(md)} /> : <Loading error={error} />}
      </article>
      <nav className="mt-8 grid grid-cols-2 gap-3" aria-label="이전·다음 문제">
        {prev ? <Link to={`/kyotsu/${prev.q}`} className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-400"><span className="text-xs text-slate-500">이전</span><span className="block font-semibold">제{prev.q}문 {prev.title}</span></Link> : <span />}
        {next ? <Link to={`/kyotsu/${next.q}`} className="rounded-2xl border border-slate-200 bg-white p-4 text-right hover:border-slate-400"><span className="text-xs text-slate-500">다음</span><span className="block font-semibold">제{next.q}문 {next.title}</span></Link> : <span />}
      </nav>
    </div>
  );
}

// ---------- 超！時短演習 플래시카드 ----------
type JitanDeck = Deck & { no: string; yt: string; tier?: Tier; why?: string; summary?: string; group: string };

export function JitanHome() {
  const { data, error } = useData<Record<string, JitanDeck>>("jitan/decks.json");
  const { get } = useProgress();
  if (!data) return <Loading error={error} />;
  const groups = [...new Set(Object.values(data).map((d) => d.group))];
  const total = Object.values(data).reduce((a, d) => a + d.cards.length, 0);
  return (
    <div className="chem">
      <PageTitle kicker="플래시카드" title={`超！時短演習 ${Object.keys(data).length}편, 한국어 카드 ${total}장`}>
        유튜브 「超わかる！授業動画」의 <span lang="ja">超！時短演習</span> 시리즈에 나온 문제를 한 장씩 카드로 옮겼어요. 앞면을 보고 답을 떠올린 뒤 눌러서 확인하고, 맞힘/틀림을 고르면 틀린 카드만 다시 돌릴 수 있습니다.
      </PageTitle>
      <TierLegend />
      {groups.map((g) => (
        <section key={g} className="mt-8">
          <h2 className="mb-3 text-xl font-bold text-slate-900">{g}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(data).filter(([, d]) => d.group === g).map(([id, d]) => {
              const best = get(`chem:best:${id}`);
              return (
                <Link key={id} to={`/jitan/${id}`} className={"flex flex-col gap-1.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md " + (d.tier === "패스" ? "opacity-70" : "")}>
                  <span className="flex items-center gap-2 font-bold text-slate-900"><Layers className="size-4 shrink-0 text-indigo-700" /><span className="text-slate-400 tnum">#{d.no}</span><span lang="ja">{d.title}</span><TierBadge tier={d.tier} title={d.why} /></span>
                  <span className="text-sm text-slate-500">{d.cards.length}장{typeof best === "number" ? ` · 최고 ${best}%` : ""}</span>
                  {d.summary && <span className="text-xs leading-relaxed text-slate-500">{d.summary}</span>}
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export function JitanDeckPage() {
  const { id } = useParams();
  const { data } = useData<Record<string, JitanDeck>>("jitan/decks.json");
  const d = id ? data?.[id] : undefined;
  return (
    <div>
      <ChemDeck src="jitan/decks.json" back={["時短演習 카드", "/jitan"]} />
      {d && (
        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-slate-500">
          원본 영상: <a className="text-indigo-700 underline" href={`https://www.youtube.com/watch?v=${d.yt}`} target="_blank" rel="noreferrer">#{d.no} {d.title}</a>
        </p>
      )}
    </div>
  );
}

// ---------- 1분 수학 ----------
type MathItem = { no: number; title: string; ja: string; yt: string; tier?: Tier };

export function MathHome() {
  const { data, error } = useData<MathItem[]>("math1min/index.json");
  if (!data) return <Loading error={error} />;
  return (
    <div>
      <PageTitle kicker="수학" title={`1분으로 공략하는 입시 수학 ${data.length}편`}>
        유튜브 「サボテン浪」의 <span lang="ja">1分で攻略！大学入試数学</span> 쇼츠를 한국어로 정리했어요. 문제 → 알아보는 신호 → 핵심 아이디어 → 풀이 순서입니다. 영상이 건너뛴 계산도 채워 두었어요.
      </PageTitle>
      <ol className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {data.map((m) => (
          <li key={m.no}>
            <Link to={`/math/${m.no}`} className="group flex items-center gap-4 px-4 py-4 hover:bg-stone-50">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700"><Calculator className="size-5" /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-slate-900 group-hover:text-indigo-700"><span className="text-slate-400 tnum">#{String(m.no).padStart(3, "0")}</span> {m.title}</span>
                <span className="block truncate text-xs text-slate-500" lang="ja">{m.ja}</span>
              </span>
              <TierBadge tier={m.tier} />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function MathPage() {
  const { no } = useParams();
  const { data } = useData<MathItem[]>("math1min/index.json");
  const { data: md, error } = useData<string>(no ? `math1min/${no.padStart(3, "0")}.md` : null, "text");
  const m = data?.find((x) => String(x.no) === no);
  const prev = data?.find((x) => x.no === Number(no) - 1), next = data?.find((x) => x.no === Number(no) + 1);
  return (
    <div className="mx-auto max-w-3xl">
      <Crumb to="/math" label="1분 수학" here={`#${(no ?? "").padStart(3, "0")}`} />
      {m && (
        <div className="mb-4 aspect-[9/16] max-h-[70vh] mx-auto overflow-hidden rounded-2xl bg-black sm:w-80">
          <iframe className="size-full" src={`https://www.youtube-nocookie.com/embed/${m.yt}`} title={m.title} allow="encrypted-media; picture-in-picture" allowFullScreen />
        </div>
      )}
      <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
        {md ? <Md text={tierize(md)} /> : <Loading error={error} />}
      </article>
      <nav className="mt-8 grid grid-cols-2 gap-3" aria-label="이전·다음">
        {prev ? <Link to={`/math/${prev.no}`} className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-400"><span className="text-xs text-slate-500">이전</span><span className="block truncate font-semibold">{prev.title}</span></Link> : <span />}
        {next ? <Link to={`/math/${next.no}`} className="rounded-2xl border border-slate-200 bg-white p-4 text-right hover:border-slate-400"><span className="text-xs text-slate-500">다음</span><span className="block truncate font-semibold">{next.title}</span></Link> : <span />}
      </nav>
    </div>
  );
}

// ---------- 난관대 전 패턴 (サボテン浪) ----------
type NkItem = { no: number; title: string; ja: string; t: number; tier?: Tier; n?: number };
type NkSet = { id: string; title: string; ja: string; yt: string; pdf: string; lead: string; unit: string; items: NkItem[] };
type NkIndex = NkSet[];
const hms = (s: number) => `${Math.floor(s / 3600)}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export function NankanHome() {
  const { data, error } = useData<NkIndex>("nankan/index.json");
  if (!data) return <Loading error={error} />;
  return (
    <div>
      <PageTitle kicker="난관대 전 패턴" title="난관대 화학·수학 전 패턴 한국어 정리">
        유튜브 「サボテン浪」의 旧帝大 과거문제 분석 강의 두 편을 한국어로 정리했어요. 강의 제작자가 공개한 정리 PDF를 그대로 옮겼고, 단원마다 호시 기준 <b>필수 · 권장 · 패스</b>를 붙였어요.
      </PageTitle>
      <TierLegend />
      {data.map((s) => (
        <section key={s.id} className="mt-8">
          <h2 className="mb-1 flex items-center gap-2 text-xl font-bold text-slate-900">{s.id === "inorg" ? <FlaskConical className="size-5 text-rose-700" /> : <Sigma className="size-5 text-sky-700" />}{s.title}</h2>
          <p className="mb-3 text-sm text-slate-500">{s.lead} · <a className="underline" href={`https://www.youtube.com/watch?v=${s.yt}`} target="_blank" rel="noreferrer">원본 영상</a> · <a className="underline" href={s.pdf} target="_blank" rel="noreferrer">원본 정리 PDF</a></p>
          <ol className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {s.items.map((m) => (
              <li key={m.no}>
                <Link to={`/nankan/${s.id}/${m.no}`} className="group flex items-center gap-4 px-4 py-3 hover:bg-stone-50">
                  <span className="w-8 shrink-0 text-right text-sm text-slate-400 tnum">{m.no}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-slate-900 group-hover:text-indigo-700">{m.title}</span>
                    <span className="block truncate text-xs text-slate-500" lang="ja">{m.ja}{m.n ? ` · ${m.n}${s.unit}` : ""}</span>
                  </span>
                  <TierBadge tier={m.tier} />
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

export function NankanPage() {
  const { set, no } = useParams();
  const { data } = useData<NkIndex>("nankan/index.json");
  const { data: md, error } = useData<string>(set && no ? `nankan/${set}/${no.padStart(2, "0")}.md` : null, "text");
  const s = data?.find((x) => x.id === set);
  const i = s ? s.items.findIndex((x) => String(x.no) === no) : -1;
  const m = s?.items[i], prev = s?.items[i - 1], next = s?.items[i + 1];
  return (
    <div className="mx-auto max-w-3xl">
      <Crumb to="/nankan" label={s?.title ?? "난관대 전 패턴"} here={m ? `${m.no}. ${m.title}` : ""} />
      {m && s && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{m.no}. {m.title}</h1>
          <TierBadge tier={m.tier} />
          <a className="ml-auto text-sm text-indigo-700 underline" href={`https://www.youtube.com/watch?v=${s.yt}&t=${m.t}s`} target="_blank" rel="noreferrer">영상 {hms(m.t)}부터 보기</a>
        </div>
      )}
      <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
        {md ? <Md text={tierize(md)} /> : <Loading error={error} />}
      </article>
      <nav className="mt-8 grid grid-cols-2 gap-3" aria-label="이전·다음">
        {prev ? <Link to={`/nankan/${set}/${prev.no}`} className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-400"><span className="text-xs text-slate-500">이전</span><span className="block truncate font-semibold">{prev.title}</span></Link> : <span />}
        {next ? <Link to={`/nankan/${set}/${next.no}`} className="rounded-2xl border border-slate-200 bg-white p-4 text-right hover:border-slate-400"><span className="text-xs text-slate-500">다음</span><span className="block truncate font-semibold">{next.title}</span></Link> : <span />}
      </nav>
    </div>
  );
}

// ---------- 삼각함수 공식 확인 테스트 ----------
type TrigIndex = { title: string; ja: string; pdf: string; sections: { no: number; title: string; ja: string; points: number; note: string }[]; items: { n: number; sec: number; q: string; a: string; s?: string }[] };

export function TrigHome() {
  const { data, error } = useData<TrigIndex>("trig/index.json");
  const { data: decks } = useData<Record<string, Deck>>("trig/decks.json");
  const [open, setOpen] = useState(false);
  if (!data) return <Loading error={error} />;
  return (
    <div>
      <PageTitle kicker="수학 II" title={`${data.title} 50문 · 답지와 퀴즈`}>
        <span lang="ja">{data.ja}</span> 시험지의 정답을 정리하고, 같은 50문항을 플래시카드 퀴즈로 만들었어요. 시험지를 먼저 풀고 답지로 채점하거나, 카드로 바로 외워도 돼요.
      </PageTitle>
      <div className="mb-6 flex flex-wrap gap-2">
        <a className={btn.primary} href={BASE + data.pdf} target="_blank" rel="noreferrer"><FileText className="size-4" />시험지 PDF (3쪽)</a>
        <Link className={btn.secondary} to="/trig/d/trig"><Layers className="size-4" />50문 전체 퀴즈</Link>
      </div>
      {decks && (
        <div className="mb-8 flex flex-wrap gap-2">
          {data.sections.map((s) => (
            <Link key={s.no} to={`/trig/d/trig${s.no}`} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:border-slate-400">{s.no}. {s.title} <span className="text-slate-400">{decks[`trig${s.no}`]?.cards.length}장</span></Link>
          ))}
        </div>
      )}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">답지</h2>
        <button className={btn.secondary} aria-pressed={open} onClick={() => setOpen(!open)}>{open ? "답 가리기" : "답 모두 보기"}</button>
      </div>
      {data.sections.map((s) => (
        <section key={s.no} className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <h3 className="flex items-baseline gap-2 border-b border-slate-200 bg-stone-50 px-4 py-2.5 font-bold text-slate-900">{s.no}. {s.title}<span className="text-xs font-normal text-slate-500" lang="ja">{s.ja}</span><span className="ml-auto text-xs font-normal text-slate-500">{s.points}점</span></h3>
          {s.note && <p className="px-4 pt-2 text-sm text-slate-500">{s.note}</p>}
          <ul className="divide-y divide-slate-100">
            {data.items.filter((i) => i.sec === s.no).map((i) => <TrigRow key={i.n} i={i} open={open} />)}
          </ul>
        </section>
      ))}
    </div>
  );
}

function TrigRow({ i, open }: { i: TrigIndex["items"][number]; open: boolean }) {
  const [shown, setShown] = useState(false);
  const vis = open || shown;
  return (
    <li className="grid min-w-0 gap-1 px-4 py-2.5 sm:grid-cols-[1fr_1fr] sm:items-center">
      <span className="text-slate-800"><span className="mr-1.5 text-slate-400 tnum">({i.n})</span>{i.q}</span>
      <button onClick={() => setShown(!shown)} className={"min-w-0 break-words rounded-lg px-3 py-1.5 text-left font-semibold " + (vis ? "bg-indigo-50 text-indigo-900" : "bg-rose-700 text-rose-700")} aria-label={vis ? undefined : `${i.n}번 답 보기`}>
        {i.a}{vis && i.s ? <span className="block text-xs font-normal text-slate-500">{i.s}</span> : null}
      </button>
    </li>
  );
}

export function TrigDeckPage() {
  return <ChemDeck src="trig/decks.json" back={["삼각함수 공식", "/trig"]} />;
}

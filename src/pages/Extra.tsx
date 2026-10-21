import { Link, useParams } from "react-router-dom";
import { Calculator, FileText, Layers } from "lucide-react";
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

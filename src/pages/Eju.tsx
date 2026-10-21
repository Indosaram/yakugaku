import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, PlayCircle } from "lucide-react";
import { useData, type EjuLecture, type Tier } from "../data/remote";
import { setProgress, useProgress } from "../progress";
import { Md } from "../components/Md";
import { TierBadge, TierFilter, TierLegend } from "../components/Tier";
import { Bar, PageTitle, btn } from "../components/ui";

export const UNITS: { id: string; name: string; ja: string }[] = [
  { id: "basic", name: "기초화학", ja: "基礎化学" },
  { id: "theory", name: "이론화학", ja: "理論化学" },
  { id: "inorganic", name: "무기화학", ja: "無機化学" },
  { id: "organic", name: "유기화학", ja: "有機化学" },
  { id: "polymer", name: "고분자화학", ja: "高分子化学" },
];

function Loading({ error }: { error?: Error }) {
  if (error) return <div className="py-20 text-center text-slate-600">내용을 불러오지 못했어요. 새로고침해 주세요.</div>;
  return <div className="py-20 text-center text-slate-400" role="status">불러오는 중…</div>;
}

export const watchedKey = (idx: number) => `eju:watched:${idx}`;
export const readKey = (idx: number) => `eju:read:${idx}`;

export function EjuList() {
  const { data, error } = useData<EjuLecture[]>("eju/index.json");
  const { get } = useProgress();
  const [tier, setTier] = useState<Tier | "전체">("전체");
  if (!data) return <Loading error={error} />;
  const watched = data.filter((l) => get(watchedKey(l.idx)) === true).length;
  const must = data.filter((l) => l.tier === "필수");
  const mustDone = must.filter((l) => get(watchedKey(l.idx)) === true).length;
  return (
    <div>
      <PageTitle kicker="EJU 화학 강의 교재" title={`EJU화학 전범위 ${data.length}강, 대단원별 한국어 교재`}>
        유튜브 「EJU화학/전범위」 재생목록 {data.length}강을 강의마다 한 챕터씩 교재로 정리했습니다. 강의를 보기 전에 <b>한눈에 보기</b>를 읽고, 보고 나서 <b>확인 문제</b>로 점검하세요. 다 본 강의는 체크해 두면 <Link className="text-indigo-700 underline" to="/check">학습 체크표</Link>에 모입니다.
      </PageTitle>
      <div className="grid gap-3 sm:grid-cols-2 mb-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><Bar value={watched} total={data.length} label="본 강의" /></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><Bar value={mustDone} total={must.length} label="필수 강의" /></div>
      </div>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <TierFilter value={tier} onChange={setTier} />
        <TierLegend />
      </div>
      <div className="space-y-10">
        {UNITS.map((u) => {
          const ls = data.filter((l) => l.unit === u.id && (tier === "전체" || l.tier === tier));
          if (!ls.length) return null;
          const all = data.filter((l) => l.unit === u.id);
          const d = all.filter((l) => get(watchedKey(l.idx)) === true).length;
          return (
            <section key={u.id}>
              <div className="mb-3 flex items-baseline gap-3">
                <h2 className="text-xl font-bold text-slate-900">{u.name}</h2>
                <span className="text-sm text-slate-500" lang="ja">{u.ja}</span>
                <span className="ml-auto text-sm text-slate-500 tnum">{d} / {all.length}강</span>
              </div>
              <ol className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {ls.map((l) => {
                  const w = get(watchedKey(l.idx)) === true;
                  return (
                    <li key={l.idx} className={"flex items-center gap-3 px-4 py-3 " + (l.tier === "패스" ? "bg-stone-50/70" : "")}>
                      <button
                        aria-label={w ? "본 강의 표시 해제" : "본 강의로 표시"}
                        aria-pressed={w}
                        onClick={() => setProgress(watchedKey(l.idx), !w)}
                        className={"inline-flex size-7 shrink-0 items-center justify-center rounded-lg border transition " + (w ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 bg-white text-transparent hover:border-slate-500")}
                      >
                        <Check className="size-4" />
                      </button>
                      <Link to={`/eju/${l.idx}`} className="group min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-400 tnum w-6 shrink-0">#{l.no}</span>
                          <span className={"truncate font-medium group-hover:text-indigo-700 " + (w ? "text-slate-500" : "text-slate-900")}>{l.title}</span>
                        </span>
                        {l.why && <span className="mt-0.5 block truncate pl-8 text-xs text-slate-500">{l.why}</span>}
                      </Link>
                      <TierBadge tier={l.tier} title={l.why} />
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export function EjuLecturePage() {
  const { idx } = useParams();
  const { data, error } = useData<EjuLecture[]>("eju/index.json");
  const { data: note, error: e2 } = useData<string>(idx ? `eju/notes/${idx.padStart(2, "0")}.md` : null, "text");
  const { get } = useProgress();
  const [video, setVideo] = useState(false);
  const l = useMemo(() => data?.find((x) => String(x.idx) === idx), [data, idx]);
  if (!data) return <Loading error={error} />;
  if (!l) return <Loading error={new Error("404")} />;
  const i = data.indexOf(l), prev = data[i - 1], next = data[i + 1];
  const unit = UNITS.find((u) => u.id === l.unit);
  const w = get(watchedKey(l.idx)) === true;
  return (
    <div className="mx-auto max-w-3xl">
      <nav aria-label="위치" className="mb-3 flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        <Link to="/eju" className="hover:text-slate-900 hover:underline">EJU 강의</Link>
        <span aria-hidden className="text-slate-300">/</span>
        <span>{unit?.name} #{l.no}</span>
      </nav>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">{l.title}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <TierBadge tier={l.tier} />
        {l.why && <span className="text-sm text-slate-500">{l.why}</span>}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <button className={w ? btn.secondary + " !border-emerald-600 !text-emerald-700" : btn.primary} onClick={() => setProgress(watchedKey(l.idx), !w)}>
          <Check className="size-4" />{w ? "다 본 강의" : "다 봤어요"}
        </button>
        <button className={btn.secondary} onClick={() => setVideo((v) => !v)}><PlayCircle className="size-4" />{video ? "영상 닫기" : "여기서 영상 보기"}</button>
        <a className={btn.link} href={`https://www.youtube.com/watch?v=${l.yt}`} target="_blank" rel="noreferrer">유튜브에서 열기</a>
      </div>
      {video && (
        <div className="mt-4 aspect-video overflow-hidden rounded-2xl bg-black">
          <iframe className="size-full" src={`https://www.youtube-nocookie.com/embed/${l.yt}`} title={l.title} allow="encrypted-media; picture-in-picture" allowFullScreen />
        </div>
      )}
      <article className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
        {note ? <Md text={note} /> : <Loading error={e2} />}
      </article>
      <nav className="mt-8 grid grid-cols-2 gap-3" aria-label="이전·다음 강의">
        {prev ? (
          <Link to={`/eju/${prev.idx}`} className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-400">
            <span className="flex items-center gap-1 text-xs text-slate-500"><ArrowLeft className="size-3" />이전 강의</span>
            <span className="mt-1 block truncate font-semibold text-slate-900">{prev.title}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`/eju/${next.idx}`} className="rounded-2xl border border-slate-200 bg-white p-4 text-right hover:border-slate-400">
            <span className="flex items-center justify-end gap-1 text-xs text-slate-500">다음 강의<ArrowRight className="size-3" /></span>
            <span className="mt-1 block truncate font-semibold text-slate-900">{next.title}</span>
          </Link>
        ) : <span />}
      </nav>
    </div>
  );
}

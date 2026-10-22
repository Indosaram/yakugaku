import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Flag, Plus, Trash2 } from "lucide-react";
import { useData, type EjuLecture } from "../data/remote";
import { clearProgress, peekProgress, setProgress, useProgress, type Value } from "../progress";
import { TierBadge } from "../components/Tier";
import { PageTitle, Segmented, btn } from "../components/ui";
import { UNITS, watchedKey } from "./Eju";

// 학습 체크표: EJU 강의(대단원별) + 직접 추가하는 인강/교재 항목
// 목록은 진도 저장소(custom:courses, 동기화됨)에 두고, 예전 키 yk-custom-courses 에도 계속 같이 써 둔다.
type Custom = { id: string; title: string; total: number };
const CUSTOM_KEY = "yk-custom-courses";
const SYNC_KEY = "custom:courses";
function parse(v: unknown): Custom[] | null {
  if (typeof v !== "string") return null;
  try {
    const x = JSON.parse(v);
    return Array.isArray(x) ? x : null;
  } catch {
    return null;
  }
}
function loadCustom(): Custom[] {
  return parse(peekProgress(SYNC_KEY)) ?? parse(localStorage.getItem(CUSTOM_KEY)) ?? [];
}

export default function Checklist() {
  const { data } = useData<EjuLecture[]>("eju/index.json");
  const { get } = useProgress();
  const custom = parse(get(SYNC_KEY)) ?? loadCustom();
  const [title, setTitle] = useState("");
  const [total, setTotal] = useState(10);
  const saveCustom = (c: Custom[]) => {
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(c));
    setProgress(SYNC_KEY, JSON.stringify(c));
  };
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <PageTitle kicker="학습 체크표" title="인강·교재 체크표">
        EJU화학 75강을 기초화학·이론화학·무기화학·유기화학·고분자화학으로 나눠 강의마다 수강완료·복습필요 체크와 복습 메모를 남길 수 있어요. 분야별·전체 진도율과 들은 시간은 자동으로 계산됩니다. 다른 인강이나 교재는 아래에서 직접 추가하세요. 기록은 이 브라우저에 저장되고, 동기화를 켜 두면 서버에도 백업돼요.
      </PageTitle>

      <div className="flex items-center justify-between gap-3 mb-3">
        <h2 className="text-xl font-bold text-slate-900">EJU화학 전범위</h2>
        <Link to="/eju" className={btn.link}>강의 교재 보기</Link>
      </div>
      {!data ? <p className="text-slate-400">불러오는 중…</p> : <EjuTable data={data} />}

      <h2 className="mt-12 mb-3 text-xl font-bold text-slate-900">내가 추가한 인강·교재</h2>
      <form
        className="flex flex-wrap items-end gap-2 rounded-2xl border border-slate-200 bg-white p-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim()) return;
          saveCustom([...custom, { id: String(Date.now()), title: title.trim(), total: Math.max(1, Math.min(200, total)) }]);
          setTitle("");
        }}
      >
        <label className="flex-1 min-w-48 text-sm">
          <span className="text-slate-600">이름</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="예: 스크램블 영문법 5판, 메가 화학 인강" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" />
        </label>
        <label className="w-28 text-sm">
          <span className="text-slate-600">강 / 챕터 수</span>
          <input type="number" min={1} max={200} value={total} onChange={(e) => setTotal(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 tnum" />
        </label>
        <button className={btn.dark}><Plus className="size-4" />추가</button>
      </form>
      <div className="mt-4 space-y-4">
        {custom.map((c) => {
          const d = Array.from({ length: c.total }, (_, i) => get(`custom:${c.id}:${i}`)).filter(Boolean).length;
          return (
            <section key={c.id} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900">{c.title}</h3>
                <span className="ml-auto text-sm font-semibold tnum text-slate-700">{d} / {c.total}</span>
                <button aria-label={`${c.title} 삭제`} className="rounded-lg p-1.5 text-slate-400 hover:bg-stone-100 hover:text-rose-600" onClick={() => confirm(`「${c.title}」을 체크표에서 지울까요?`) && saveCustom(custom.filter((x) => x.id !== c.id))}>
                  <Trash2 className="size-4" />
                </button>
              </div>
              <ul className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(3.25rem,1fr))] gap-1.5">
                {Array.from({ length: c.total }, (_, i) => {
                  const v = get(`custom:${c.id}:${i}`);
                  return (
                    <li key={i}>
                      <button
                        onClick={() => setProgress(`custom:${c.id}:${i}`, v ? false : true)}
                        aria-pressed={Boolean(v)}
                        className={"flex h-12 w-full items-center justify-center rounded-lg border text-sm font-semibold tnum transition " + (v ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-slate-500")}
                      >
                        {v ? <Check className="size-4" /> : i + 1}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
        {!custom.length && <p className="text-sm text-slate-500">아직 추가한 항목이 없어요. 오늘({today}) 듣는 인강부터 넣어 보세요.</p>}
      </div>
    </div>
  );
}

// ---------- EJU화학 75강 체크표 ----------
// 저장 키: 수강완료 eju:watched:<idx>(기존 키 그대로), 복습필요 eju:review:<idx>, 복습 메모 eju:memo:<idx>
const reviewKey = (idx: number) => `eju:review:${idx}`;
const memoKey = (idx: number) => `eju:memo:${idx}`;
type Get = (k: string) => Value | undefined;

// "주기율표/주기율표의 원리/전자배치" -> 제목 "주기율표", 세부 주제 "주기율표의 원리 / 전자배치"
function splitTitle(t: string) {
  const i = t.indexOf("/");
  return i < 0 ? { head: t, sub: "" } : { head: t.slice(0, i), sub: t.slice(i + 1).split("/").join(" / ") };
}
const clock = (s = 0) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
function hm(s: number) {
  const m = Math.round(s / 60);
  const h = Math.floor(m / 60);
  return h ? `${h}시간 ${m % 60}분` : `${m}분`;
}
function tally(ls: EjuLecture[], get: Get) {
  const done = ls.filter((l) => get(watchedKey(l.idx)) === true);
  const sum = (xs: EjuLecture[]) => xs.reduce((a, l) => a + (l.dur ?? 0), 0);
  return {
    n: ls.length,
    d: done.length,
    pct: ls.length ? Math.round((done.length / ls.length) * 100) : 0,
    total: sum(ls),
    doneT: sum(done),
    review: ls.filter((l) => get(reviewKey(l.idx)) === true).length,
  };
}

type Show = "all" | "todo" | "review";

function EjuTable({ data }: { data: EjuLecture[] }) {
  const { get } = useProgress();
  const [show, setShow] = useState<Show>("all");
  const [unit, setUnit] = useState("all");
  const all = tally(data, get);
  const pass = (l: EjuLecture) =>
    (unit === "all" || l.unit === unit) &&
    (show === "all" || (show === "todo" && get(watchedKey(l.idx)) !== true) || (show === "review" && get(reviewKey(l.idx)) === true));
  const units = UNITS.filter((u) => unit === "all" || u.id === unit);
  const shown = data.filter(pass).length;
  return (
    <div data-eju-check>
      <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-4 sm:p-5" data-total>
        <div className="col-span-2">
          <p className="text-sm text-slate-500">전체 진도율</p>
          <p className="mt-0.5 text-3xl font-bold tnum text-slate-900">{all.pct}%<span className="ml-2 text-base font-semibold text-slate-500">{all.d} / {all.n}강</span></p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone-200" role="progressbar" aria-label="전체 진도율" aria-valuemin={0} aria-valuemax={100} aria-valuenow={all.pct}>
            <div className="h-full rounded-full bg-emerald-500 transition-[width]" style={{ width: all.pct + "%" }} />
          </div>
        </div>
        <div>
          <p className="text-sm text-slate-500">완료 시간 / 전체 시간</p>
          <p className="mt-0.5 font-bold tnum text-slate-900"><span data-done-time>{hm(all.doneT)}</span> <span className="font-medium text-slate-500">/ <span data-total-time>{hm(all.total)}</span></span></p>
        </div>
        <div>
          <p className="text-sm text-slate-500">복습 필요</p>
          <p className="mt-0.5 font-bold tnum text-amber-800">{all.review}강</p>
        </div>
      </div>

      <div className="mt-4 mb-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <Segmented<Show> value={show} onChange={setShow} items={[{ value: "all", label: "전체" }, { value: "todo", label: "미수강" }, { value: "review", label: <><Flag aria-hidden className="size-3.5" />복습필요</> }]} />
        <div className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0 [&>div]:w-max">
          <Segmented<string> value={unit} onChange={setUnit} items={[{ value: "all", label: <span className="whitespace-nowrap">모든 분야</span> }, ...UNITS.map((u) => ({ value: u.id, label: <span className="whitespace-nowrap">{u.name}</span> }))]} />
        </div>
      </div>

      <div className="space-y-4">
        {units.map((u) => {
          const ls = data.filter((l) => l.unit === u.id);
          const t = tally(ls, get);
          const rows = ls.filter(pass);
          if (!rows.length && show !== "all") return null;
          return (
            <section key={u.id} className="rounded-2xl border border-slate-200 bg-white" data-unit={u.id}>
              <div className="p-4 pb-3 sm:px-5">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <h3 className="font-bold text-slate-900">{u.name}</h3>
                  <span className="text-xs text-slate-500" lang="ja">{u.ja}</span>
                  <span className="ml-auto text-sm font-semibold tnum text-slate-700" data-unit-count>{t.d} / {t.n}강 · {t.pct}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-stone-200">
                  <div className="h-full rounded-full bg-emerald-500 transition-[width]" style={{ width: t.pct + "%" }} />
                </div>
                <p className="mt-1.5 text-xs text-slate-500 tnum">들은 시간 {hm(t.doneT)} / {hm(t.total)}{t.review ? ` · 복습 필요 ${t.review}강` : ""}</p>
              </div>
              <ol className="divide-y divide-slate-100 border-t border-slate-200">
                {rows.map((l) => <EjuRow key={l.idx} l={l} get={get} />)}
              </ol>
            </section>
          );
        })}
        {!shown && <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">{show === "review" ? "복습 필요로 표시한 강의가 없어요." : "이 분야는 모두 들었어요."}</p>}
        <p className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5"><TierBadge tier="필수" />호시 기출 기준 꼭 들을 강의</span>
          <span className="inline-flex items-center gap-1.5"><TierBadge tier="패스" />건너뛰어도 되는 강의</span>
        </p>
      </div>
    </div>
  );
}

function EjuRow({ l, get }: { l: EjuLecture; get: Get }) {
  const w = get(watchedKey(l.idx)) === true;
  const r = get(reviewKey(l.idx)) === true;
  const { head, sub } = splitTitle(l.title);
  return (
    <li className={"grid grid-cols-[auto_1fr_auto] gap-x-3 gap-y-2 px-4 py-3 sm:px-5 lg:grid-cols-[auto_minmax(0,1fr)_3.5rem_auto_16rem] lg:items-center " + (l.tier === "패스" ? "bg-stone-50/60" : "")} data-lecture={l.idx}>
      <button
        onClick={() => setProgress(watchedKey(l.idx), !w)}
        aria-pressed={w}
        aria-label={`#${l.no} ${head} 수강완료`}
        title="수강완료"
        className={"mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg border transition lg:mt-0 " + (w ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 bg-white text-transparent hover:border-slate-500")}
        data-watched
      >
        <Check className="size-4" />
      </button>
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="text-xs font-semibold text-slate-400 tnum">#{l.no}</span>
          <Link to={`/eju/${l.idx}`} className={"font-semibold hover:text-indigo-700 hover:underline " + (w ? "text-slate-500" : "text-slate-900")}>{head}</Link>
          <TierBadge tier={l.tier} title={l.why} />
        </p>
        {sub && <p className="mt-0.5 text-sm leading-snug text-slate-600" data-sub>{sub}</p>}
      </div>
      <span className="text-right text-sm tnum text-slate-500" data-dur title="영상 길이">{clock(l.dur)}</span>
      <div className="col-span-2 col-start-2 flex gap-2 lg:contents">
      <button
        onClick={() => setProgress(reviewKey(l.idx), !r)}
        aria-pressed={r}
        className={"inline-flex h-9 shrink-0 items-center gap-1.5 justify-self-start whitespace-nowrap rounded-lg border px-2.5 text-sm font-semibold transition " + (r ? "border-amber-400 bg-amber-100 text-amber-900" : "border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-slate-700")}
        data-review
      >
        <Flag aria-hidden className={"size-3.5 " + (r ? "fill-amber-500 text-amber-700" : "")} />복습필요
      </button>
      <Memo idx={l.idx} label={`#${l.no} ${head} 복습 메모`} saved={typeof get(memoKey(l.idx)) === "string" ? (get(memoKey(l.idx)) as string) : ""} />
      </div>
    </li>
  );
}

// 복습 메모: 입력을 멈추면(0.7초) 또는 칸을 벗어나면 저장. 비우면 키를 지운다.
function Memo({ idx, label, saved }: { idx: number; label: string; saved: string }) {
  const [v, setV] = useState(saved);
  const ref = useRef<HTMLInputElement>(null);
  // 다른 탭·기기에서 바뀐 메모는 입력 중이 아닐 때만 반영
  useEffect(() => {
    if (document.activeElement !== ref.current) setV(saved);
  }, [saved]);
  const commit = (text: string) => {
    const t = text.trim();
    if (t === saved) return;
    if (t) setProgress(memoKey(idx), t);
    else clearProgress(memoKey(idx));
  };
  useEffect(() => {
    if (v.trim() === saved) return;
    const id = setTimeout(() => commit(v), 700);
    return () => clearTimeout(id);
  }); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <input
      ref={ref}
      value={v}
      onChange={(e) => setV(e.target.value)}
      onBlur={() => commit(v)}
      onKeyDown={(e) => e.key === "Enter" && (e.currentTarget as HTMLInputElement).blur()}
      placeholder="복습 메모"
      aria-label={label}
      maxLength={300}
      className="h-9 w-full min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400"
      data-memo
    />
  );
}

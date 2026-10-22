import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";
import { peekProgress, setMany, useProgress, type Value } from "./progress";

// ---------- 3단계 표시: ○ 확실히 앎 / △ 애매함 / × 모름 ----------
// 저장 키: mark:<항목 id> = "o" | "t" | "x". 예전 키(chem:done, idiom:, vocab:)는 지우지 않고 함께 맞춰 둔다.
export type Mark = "o" | "t" | "x";
export const MARKS: { m: Mark; sym: string; label: string; short: string }[] = [
  { m: "o", sym: "○", label: "확실히 앎", short: "앎" },
  { m: "t", sym: "△", label: "애매함", short: "애매" },
  { m: "x", sym: "×", label: "모름", short: "모름" },
];
export const SYM: Record<Mark, string> = { o: "○", t: "△", x: "×" };

// legacy: 예전 표시 키. "solved" = 푼 문항(chem:done), "known" = 외움(idiom:, vocab:)
export type Legacy = { key: string; kind: "solved" | "known" };
type Get = (k: string) => Value | undefined;

export const markKey = (id: string) => "mark:" + id;

export function readMark(get: Get, id: string, legacy?: Legacy): Mark | undefined {
  const v = get(markKey(id));
  if (v === "o" || v === "t" || v === "x") return v;
  // 예전 "풀었음"·"외웠어요" 표시는 ○ 로 보여 준다 (값은 바꾸지 않음)
  if (legacy && get(legacy.key) === true) return "o";
  return undefined;
}

export function writeMark(id: string, m: Mark | undefined, legacy?: Legacy) {
  const e: Record<string, Value | undefined> = { [markKey(id)]: m };
  // 예전 키도 같은 뜻으로 맞춰 둔다(홈 화면 진도 숫자 등이 그 키를 읽는다). 지우지 않고 false 로 둔다.
  if (legacy) e[legacy.key] = legacy.kind === "solved" ? !!m : m === "o";
  setMany(e);
}

export function useMarks() {
  const { get } = useProgress();
  const mark = useCallback((id: string, legacy?: Legacy) => readMark(get, id, legacy), [get]);
  return { get, mark };
}

const ON: Record<Mark, string> = {
  o: "bg-emerald-600 text-white border-emerald-600",
  t: "bg-amber-400 text-amber-950 border-amber-400",
  x: "bg-rose-600 text-white border-rose-600",
};
const OFF: Record<Mark, string> = {
  o: "text-emerald-700 hover:bg-emerald-50",
  t: "text-amber-700 hover:bg-amber-50",
  x: "text-rose-700 hover:bg-rose-50",
};

// 공통 표시 버튼. 같은 표시를 한 번 더 누르면 표시가 풀린다.
export function MarkButtons({ value, onChange, size = "md", labels = true, keys = false }: { value?: Mark; onChange: (m: Mark | undefined) => void; size?: "sm" | "md" | "lg"; labels?: boolean; keys?: boolean }) {
  const sz = size === "sm" ? "h-8 px-2 text-xs gap-1" : size === "lg" ? "h-12 px-3 text-base gap-1.5" : "h-10 px-3 text-sm gap-1.5";
  return (
    <div role="group" aria-label="이해 정도 표시" className="inline-flex shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white" data-marks>
      {MARKS.map((x, i) => {
        const on = value === x.m;
        return (
          <button
            key={x.m}
            type="button"
            aria-pressed={on}
            aria-label={x.label}
            title={x.label}
            data-mark={x.m}
            onClick={(e) => { e.stopPropagation(); onChange(on ? undefined : x.m); }}
            className={"inline-flex flex-1 items-center justify-center whitespace-nowrap border-0 font-semibold transition " + sz + " " + (i ? "border-l border-slate-200 " : "") + (on ? ON[x.m] : OFF[x.m])}
          >
            <span aria-hidden className="text-[1.15em] leading-none">{x.sym}</span>
            {labels && <span>{size === "sm" ? x.short : x.label}</span>}
            {keys && <kbd className="ml-0.5 rounded border border-current/30 px-1 text-[10px] font-medium opacity-70">{i + 1}</kbd>}
          </button>
        );
      })}
    </div>
  );
}

// 목록에 붙이는 작은 표시
export function MarkGlyph({ m, className = "" }: { m?: Mark; className?: string }) {
  if (!m) return null;
  const c = m === "o" ? "text-emerald-700" : m === "t" ? "text-amber-600" : "text-rose-600";
  return <span aria-label={MARKS.find((x) => x.m === m)!.label} className={"font-bold leading-none " + c + " " + className}>{SYM[m]}</span>;
}

export function countMarks(ids: string[], mark: (id: string) => Mark | undefined) {
  const c = { o: 0, t: 0, x: 0, none: 0 };
  ids.forEach((id) => { const m = mark(id); if (m) c[m]++; else c.none++; });
  return c;
}

// ---------- 틀린 것만 회차 복습 ----------
// review:<덱> = {"r":회차,"pool":[남은 항목],"seen":[이번 회차에 본 항목],"t":△ 포함 여부}
// ○ 로 표시하면 풀에서 빠지고, 남은 것으로 다음 회차를 돈다. 상태는 진도와 같이 동기화된다.
export type Review = { r: number; pool: string[]; seen: string[]; t: boolean };

function parseReview(raw: Value | undefined): Review | null {
  if (typeof raw !== "string") return null;
  try {
    const p = JSON.parse(raw) as Review;
    if (Array.isArray(p.pool) && p.pool.length) return { r: p.r || 1, pool: p.pool, seen: Array.isArray(p.seen) ? p.seen : [], t: !!p.t };
  } catch { /* 깨진 값은 무시 */ }
  return null;
}

export function useReview(deck: string) {
  const { get } = useProgress();
  const key = "review:" + deck;
  const state = parseReview(get(key));
  const fresh = () => parseReview(peekProgress(key));
  const save = (s: Review | null) => setMany({ [key]: s && s.pool.length ? JSON.stringify(s) : undefined });
  return {
    state,
    fresh,
    // 풀 만들기: × (선택하면 △ 도)
    start(ids: string[], withT: boolean) {
      save({ r: 1, pool: ids, seen: [], t: withT });
    },
    // 이번 회차에서 한 항목을 표시했을 때: ○ 면 풀에서 빠짐
    result(id: string, m: Mark | undefined) {
      const s = fresh();
      if (!s || !s.pool.includes(id)) return;
      const pool = m === "o" ? s.pool.filter((x) => x !== id) : s.pool;
      const seen = (s.seen.includes(id) ? s.seen : [...s.seen, id]).filter((x) => pool.includes(x));
      if (pool.length) save({ ...s, pool, seen });
      else save({ ...s, pool: [], seen: [] });
    },
    // 다음 회차로 (남은 것만)
    next() {
      const s = fresh();
      if (s) save({ ...s, r: s.r + 1, seen: [] });
    },
    stop() {
      save(null);
    },
  };
}

function shuffled<T>(a: T[]): T[] {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

export type StudyItem = { id: string; legacy?: Legacy };

// 카드 학습 공통 화면: 처음부터 전체 / 틀린 것만 1·2·3회차 복습
export function MarkStudy({ deck, items, renderCard, renderLine, onFullDone, emptyText = "카드가 없어요." }: {
  deck: string;
  items: StudyItem[];
  renderCard: (id: string, shown: boolean) => ReactNode;
  renderLine: (id: string) => ReactNode;
  onFullDone?: (okPct: number, n: number) => void;
  emptyText?: string;
}) {
  const { mark } = useMarks();
  const review = useReview(deck);
  const byId = useMemo(() => new Map(items.map((x) => [x.id, x])), [items]);
  const ids = useMemo(() => items.map((x) => x.id), [items]);
  const idsKey = ids.join("\n");
  const [phase, setPhase] = useState<"choose" | "full" | "review">("full");
  const [order, setOrder] = useState<string[]>([]);
  const [at, setAt] = useState(0);
  const [shown, setShown] = useState(false);
  const [tally, setTally] = useState({ o: 0, t: 0, x: 0 });
  const [withT, setWithT] = useState(false);

  const begin = (p: "full" | "review", o: string[]) => {
    setPhase(p); setOrder(o); setAt(0); setShown(false); setTally({ o: 0, t: 0, x: 0 });
  };
  const startFull = () => begin("full", shuffled(ids));
  const startReview = (t: boolean) => {
    const pool = ids.filter((id) => mark(id, byId.get(id)?.legacy) === "x" || (t && mark(id, byId.get(id)?.legacy) === "t"));
    if (!pool.length) return;
    review.start(pool, t);
    begin("review", shuffled(pool));
  };
  const resume = () => {
    const s = review.fresh();
    if (!s) return startFull();
    const left = s.pool.filter((id) => byId.has(id) && !s.seen.includes(id));
    if (!left.length) return nextRound();
    begin("review", shuffled(left));
  };
  const nextRound = () => {
    const s = review.fresh();
    review.next();
    if (s) begin("review", shuffled(s.pool.filter((id) => byId.has(id))));
  };
  useEffect(() => {
    if (!ids.length) return;
    if (review.fresh()) { setPhase("choose"); setOrder([]); setAt(0); }
    else startFull();
  }, [deck, idsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const cur = order[at];
  const done = phase !== "choose" && order.length > 0 && at >= order.length;
  const grade = (m: Mark) => {
    if (!cur) return;
    writeMark(cur, m, byId.get(cur)?.legacy);
    if (phase === "review") review.result(cur, m);
    setTally((x) => ({ ...x, [m]: x[m] + 1 }));
    setAt((a) => a + 1);
    setShown(false);
  };
  useEffect(() => {
    if (done && phase === "full" && order.length === ids.length) onFullDone?.(Math.round((tally.o / order.length) * 100), order.length);
  }, [done]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (/input|textarea|select/i.test((e.target as HTMLElement).tagName) || !cur || done) return;
      if (e.key === " " && !shown) { e.preventDefault(); setShown(true); }
      else if (shown && (e.key === "1" || e.key === "2" || e.key === "3")) grade((["o", "t", "x"] as const)[Number(e.key) - 1]);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  if (!ids.length) return <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">{emptyText}</p>;
  const c = countMarks(ids, (id) => mark(id, byId.get(id)?.legacy));
  const rs = review.state;
  const pill = "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition active:translate-y-px";
  const primary = pill + " bg-slate-900 text-white hover:bg-slate-800";
  const secondary = pill + " border border-slate-300 bg-white text-slate-800 hover:bg-stone-100";
  const Summary = () => (
    <p className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm tnum" data-summary>
      <span className="text-emerald-700">○ {c.o}</span><span className="text-amber-700">△ {c.t}</span><span className="text-rose-700">× {c.x}</span><span className="text-slate-500">표시 없음 {c.none}</span>
    </p>
  );
  const ReviewButtons = () => (
    <div className="mt-5 flex flex-col items-center gap-2">
      <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="size-4 accent-slate-900" checked={withT} onChange={(e) => setWithT(e.target.checked)} />△ 애매한 것도 포함</label>
      <div className="flex flex-wrap justify-center gap-2">
        <button className={primary} disabled={!(c.x + (withT ? c.t : 0))} onClick={() => startReview(withT)} data-action="start-review">
          <RotateCcw aria-hidden className="size-4" />틀린 것만 1회차 시작 ({c.x + (withT ? c.t : 0)}장)
        </button>
        <button className={secondary} onClick={startFull} data-action="full">처음부터 전체 ({ids.length}장)</button>
      </div>
    </div>
  );

  let body: ReactNode;
  if (phase === "choose" && rs) {
    const left = rs.pool.filter((id) => byId.has(id) && !rs.seen.includes(id)).length;
    body = (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm" data-screen="choose">
        <p className="text-sm font-semibold text-indigo-700">틀린 것만 복습 중</p>
        <p className="mt-1 text-3xl font-bold text-slate-900 tnum">{rs.r}회차 · 남은 {rs.pool.length}장</p>
        <p className="mt-1 text-sm text-slate-500">이번 회차에서 아직 안 본 카드 {left}장. ○ 로 표시한 카드만 빠져요.</p>
        <Summary />
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <button className={primary} onClick={resume} data-action="resume">이어서 하기</button>
          <button className={secondary} onClick={startFull} data-action="full">처음부터 전체 ({ids.length}장)</button>
          <button className={secondary} onClick={() => { review.stop(); startFull(); }}>복습 그만하기</button>
        </div>
      </div>
    );
  } else if (done && phase === "review") {
    const s = rs;
    body = (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm" data-screen="round-end">
        {s ? (
          <>
            <p className="text-sm font-semibold text-indigo-700">{s.r}회차 끝</p>
            <p className="mt-1 text-3xl font-bold text-slate-900 tnum">남은 {s.pool.length}장</p>
            <p className="mt-1 text-sm text-slate-500">이번 회차 ○ {tally.o} · △ {tally.t} · × {tally.x}. ○ 가 아닌 카드로 {s.r + 1}회차를 돌아요.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <button className={primary} onClick={nextRound} data-action="next-round"><RotateCcw aria-hidden className="size-4" />{s.r + 1}회차 시작</button>
              <button className={secondary} onClick={startFull}>처음부터 전체</button>
            </div>
            <ul className="mt-5 space-y-1 text-left text-sm text-slate-700">{s.pool.filter((id) => byId.has(id)).map((id) => <li key={id} className="flex gap-2"><MarkGlyph m={mark(id, byId.get(id)?.legacy)} className="w-4 shrink-0" />{renderLine(id)}</li>)}</ul>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-emerald-700">복습 끝</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">틀린 카드를 모두 ○ 로 바꿨어요</p>
            <Summary />
            <ReviewButtons />
          </>
        )}
      </div>
    );
  } else if (done) {
    const miss = order.filter((id) => mark(id, byId.get(id)?.legacy) !== "o");
    body = (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm" data-screen="full-end">
        <p className="text-4xl font-bold text-slate-900 tnum">○ {tally.o} / {order.length}</p>
        <p className="mt-1 text-sm text-slate-500">이번에 △ {tally.t} · × {tally.x}</p>
        <Summary />
        <ReviewButtons />
        {miss.length > 0 && <ul className="mt-5 space-y-1 text-left text-sm text-slate-700">{miss.map((id) => <li key={id} className="flex gap-2"><MarkGlyph m={mark(id, byId.get(id)?.legacy)} className="w-4 shrink-0" />{renderLine(id)}</li>)}</ul>}
      </div>
    );
  } else if (cur) {
    const prev = mark(cur, byId.get(cur)?.legacy);
    body = (
      <div data-screen="card">
        <div className="mb-3 flex items-center gap-3 text-sm text-slate-600">
          <span className={"rounded-full px-2.5 py-0.5 text-xs font-semibold " + (phase === "review" ? "bg-indigo-50 text-indigo-800" : "bg-stone-100 text-slate-700")}>{phase === "review" ? `${rs?.r ?? 1}회차 복습` : "전체"}</span>
          <span className="tnum">{at + 1} / {order.length}</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-200"><div className="h-full bg-emerald-500" style={{ width: `${(at / order.length) * 100}%` }} /></div>
          {prev && <span className="text-xs text-slate-500">지난 표시 <MarkGlyph m={prev} /></span>}
        </div>
        <div role="button" tabIndex={0} onClick={() => setShown(true)} onKeyDown={(e) => e.key === "Enter" && setShown(true)} data-card>
          {renderCard(cur, shown)}
        </div>
        <div className="mt-3">
          {shown ? (
            <div className="grid grid-cols-3 gap-2" data-grade>
              {MARKS.map((x, i) => (
                <button key={x.m} data-mark={x.m} onClick={() => grade(x.m)} className={"inline-flex min-h-12 flex-col items-center justify-center rounded-xl border-2 px-2 py-1.5 text-sm font-semibold transition active:translate-y-px " + (x.m === "o" ? "border-emerald-600 text-emerald-800 hover:bg-emerald-50" : x.m === "t" ? "border-amber-500 text-amber-800 hover:bg-amber-50" : "border-rose-600 text-rose-800 hover:bg-rose-50")}>
                  <span className="text-xl leading-none" aria-hidden>{x.sym}</span>
                  <span>{x.label} <kbd className="hidden text-[10px] font-normal opacity-60 sm:inline">{i + 1}</kbd></span>
                </button>
              ))}
            </div>
          ) : (
            <button className={primary + " w-full min-h-12"} onClick={() => setShown(true)} data-action="reveal">답 보기 <kbd className="hidden text-xs font-normal opacity-70 sm:inline">Space</kbd></button>
          )}
        </div>
      </div>
    );
  } else {
    body = <p className="text-center text-slate-500">불러오는 중…</p>;
  }
  return <div className="mx-auto max-w-xl" data-study={deck}>{body}</div>;
}

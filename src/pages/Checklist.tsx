import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Plus, Trash2 } from "lucide-react";
import { useData, type EjuLecture } from "../data/remote";
import { peekProgress, setProgress, useProgress } from "../progress";
import { TierBadge } from "../components/Tier";
import { PageTitle, btn } from "../components/ui";
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
        본 강의를 칸에 체크하세요. EJU화학 75강은 대단원별로 미리 넣어 두었고, 다른 인강이나 교재는 아래에서 직접 추가할 수 있어요. 기록은 이 브라우저에만 저장됩니다.
      </PageTitle>

      <div className="flex items-center justify-between gap-3 mb-3">
        <h2 className="text-xl font-bold text-slate-900">EJU화학 전범위</h2>
        <Link to="/eju" className={btn.link}>강의 교재 보기</Link>
      </div>
      {!data ? (
        <p className="text-slate-400">불러오는 중…</p>
      ) : (
        <div className="space-y-4">
          {UNITS.map((u) => {
            const ls = data.filter((l) => l.unit === u.id);
            const d = ls.filter((l) => get(watchedKey(l.idx)) === true).length;
            return (
              <section key={u.id} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-bold text-slate-900">{u.name}</h3>
                  <span className="text-xs text-slate-500" lang="ja">{u.ja}</span>
                  <span className="ml-auto text-sm font-semibold tnum text-slate-700">{d} / {ls.length}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-stone-200">
                  <div className="h-full rounded-full bg-emerald-500 transition-[width]" style={{ width: `${(d / ls.length) * 100}%` }} />
                </div>
                <ul className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(3.25rem,1fr))] gap-1.5">
                  {ls.map((l) => {
                    const w = get(watchedKey(l.idx)) === true;
                    return (
                      <li key={l.idx}>
                        <button
                          onClick={() => setProgress(watchedKey(l.idx), !w)}
                          aria-pressed={w}
                          title={`#${l.no} ${l.title}${l.tier ? ` (${l.tier})` : ""}`}
                          className={
                            "relative flex h-12 w-full flex-col items-center justify-center rounded-lg border text-sm font-semibold tnum transition " +
                            (w ? "border-emerald-600 bg-emerald-600 text-white" : l.tier === "패스" ? "border-dashed border-slate-300 bg-stone-50 text-slate-400" : "border-slate-300 bg-white text-slate-700 hover:border-slate-500")
                          }
                        >
                          {w ? <Check className="size-4" /> : l.no}
                          {!w && l.tier === "필수" && <span aria-hidden className="absolute right-1 top-1 size-1.5 rounded-full bg-rose-500" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
          <p className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-rose-500" />빨간 점 = 필수 강의</span>
            <span className="inline-flex items-center gap-1.5"><TierBadge tier="패스" />점선 칸 = 건너뛰어도 되는 강의</span>
          </p>
        </div>
      )}

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

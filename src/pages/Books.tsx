import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, ChevronDown, Eye, EyeOff, Search, X } from "lucide-react";
import { useData } from "../data/remote";
import { clearProgress, setProgress, useProgress } from "../progress";
import { Md } from "../components/Md";
import { Bar, PageTitle, Segmented } from "../components/ui";

// ---------- 데이터 형식 ----------
export interface GQ {
  n: number; // 문항 번호 (책 번호)
  prompt: string; // 영어 문제 (빈칸 "(　　)")
  choices: string[];
  answer: number; // 1-based
  ko: string; // 문장 해석
  expl: string; // 한국어 해설 md
  src?: string; // 출제 대학
}
export interface GUnit {
  id: string; // "01"
  chapter: string; // 장 이름(한국어)
  title: string; // 단원 이름(한국어)
  ja: string; // 원서 단원명
  intro: string; // 단원 핵심 정리 md
  questions: GQ[];
}
export interface Idiom {
  p: string; // phrase
  ko: string; // 한국어 뜻
  ex: string; // 예문
  exKo: string; // 예문 해석
  note?: string; // 보충
  lv?: number;
}
export interface IGroup {
  id: string;
  title: string; // 그룹 주제 (한국어)
  intro?: string;
  items: Idiom[];
}

function Loading({ error }: { error?: Error }) {
  if (error) return <div className="py-20 text-center text-slate-600">내용을 불러오지 못했어요. 새로고침해 주세요.</div>;
  return <div className="py-20 text-center text-slate-400" role="status">불러오는 중…</div>;
}

const CIRCLED = ["①", "②", "③", "④", "⑤"];

// ---------- 교재 홈 ----------
export function BooksHome() {
  const { data: g, error } = useData<GUnit[]>("books/grammar.json");
  const { data: id } = useData<IGroup[]>("books/idioms.json");
  const { store } = useProgress();
  const gTotal = g?.reduce((a, u) => a + u.questions.length, 0) ?? 0;
  const gDone = Object.keys(store).filter((k) => k.startsWith("g1000:")).length;
  const iTotal = id?.reduce((a, x) => a + x.items.length, 0) ?? 0;
  const iDone = Object.keys(store).filter((k) => k.startsWith("idiom:") && store[k] === true).length;
  return (
    <div>
      <PageTitle kicker="영어 교재" title="영문법·어법 1000제 & 영숙어장">
        보내 준 교재 두 권을 한국어로 공부할 수 있게 옮겼습니다. 문제와 예문은 영어 그대로 두고, 설명·뜻·해석은 한국어로 바꿨어요. <b>정답과 해설은 따로 접어 두었으니</b> 먼저 풀고 펼쳐 보세요.
      </PageTitle>
      {!g ? <Loading error={error} /> : (
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-baseline gap-2">
              <h2 className="text-xl font-bold text-slate-900">빈출 영문법·어법 문제</h2>
              <span className="text-sm text-slate-500 tnum">{gTotal}문항</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">시제부터 강조·생략까지 {g.length}개 단원. 단원마다 핵심 정리 → 4지선다 → 정답·해설 순서예요. 지금은 일부 문항만 옮겨져 있고, 나머지는 계속 추가돼요.</p>
            <Bar value={gDone} total={gTotal} label="푼 문제" />
            <ol className="mt-4 divide-y divide-slate-100">
              {g.map((u) => {
                const d = u.questions.filter((q) => store[`g1000:${q.n}`] !== undefined).length;
                return (
                  <li key={u.id}>
                    <Link to={`/books/g/${u.id}`} className="flex items-center gap-3 py-2.5 hover:text-indigo-700">
                      <span className="w-7 shrink-0 text-sm font-bold text-slate-400 tnum">{Number(u.id)}</span>
                      <span className="min-w-0 flex-1">
                        <span className="font-medium">{u.title}</span>
                        <span className="ml-2 text-xs text-slate-400" lang="ja">{u.ja}</span>
                      </span>
                      <span className="text-xs text-slate-500 tnum">{u.questions.length ? `${d}/${u.questions.length}` : "준비 중"}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-baseline gap-2">
              <h2 className="text-xl font-bold text-slate-900">영숙어장</h2>
              <span className="text-sm text-slate-500 tnum">{iTotal}개</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">비슷한 숙어끼리 묶은 그룹별로 뜻·예문·해석을 한국어로. 뜻 가리기로 암기 점검을 할 수 있어요. 지금은 앞부분만 옮겨져 있고, 나머지는 계속 추가돼요.</p>
            <Bar value={iDone} total={iTotal} label="외운 숙어" />
            <Link to="/books/idioms" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800">숙어장 열기</Link>
            {id && (
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {id.slice(0, 40).map((x) => (
                  <li key={x.id}><Link to={`/books/idioms?g=${x.id}`} className="inline-block rounded-full bg-stone-100 px-2.5 py-1 text-xs text-slate-600 hover:bg-stone-200">{x.title}</Link></li>
                ))}
                {id.length > 40 && <li className="px-2 py-1 text-xs text-slate-400">외 {id.length - 40}개 그룹</li>}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

// ---------- 문법 단원 ----------
function GQuestion({ q }: { q: GQ }) {
  const { get } = useProgress();
  const picked = get(`g1000:${q.n}`) as number | undefined;
  const [open, setOpen] = useState(false);
  const answered = typeof picked === "number";
  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex gap-3">
        <span className="shrink-0 text-sm font-bold text-slate-400 tnum">{q.n}</span>
        <div className="min-w-0 flex-1">
          <p className="en text-[16.5px] leading-relaxed text-slate-900">{q.prompt}</p>
          <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {q.choices.map((c, i) => {
              const n = i + 1;
              const isAns = n === q.answer, isPick = n === picked;
              const st = !answered
                ? "border-slate-200 hover:border-slate-400 hover:bg-stone-50"
                : isAns
                  ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                  : isPick
                    ? "border-rose-300 bg-rose-50 text-rose-900"
                    : "border-slate-200 opacity-60";
              return (
                <button key={i} disabled={answered} onClick={() => { setProgress(`g1000:${q.n}`, n); setOpen(true); }} className={"flex items-center gap-2 rounded-xl border px-3 py-2 text-left transition " + st}>
                  <span className="text-slate-500">{CIRCLED[i]}</span>
                  <span className="en flex-1">{c}</span>
                  {answered && isAns && <Check className="size-4 text-emerald-600" />}
                  {answered && isPick && !isAns && <X className="size-4 text-rose-600" />}
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            {q.src && <span lang="ja">({q.src})</span>}
            <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="ml-auto inline-flex items-center gap-1 rounded-lg px-2 py-1 font-semibold text-indigo-700 hover:bg-indigo-50">
              {open ? "정답·해설 접기" : "정답·해설 보기"}<ChevronDown className={"size-3.5 transition " + (open ? "rotate-180" : "")} />
            </button>
            {answered && (
              <button onClick={() => { clearProgress(`g1000:${q.n}`); setOpen(false); }} className="rounded-lg px-2 py-1 hover:bg-stone-100">다시 풀기</button>
            )}
          </div>
          {open && (
            <div className="reveal mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="font-bold text-amber-900">정답 {CIRCLED[q.answer - 1]} <span className="en font-semibold">{q.choices[q.answer - 1]}</span></p>
              <p className="mt-1 text-sm text-slate-700">해석: {q.ko}</p>
              <Md text={q.expl} className="mt-2 !text-[15px]" />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export function GrammarUnit() {
  const { id } = useParams();
  const { data, error } = useData<GUnit[]>("books/grammar.json");
  const { get } = useProgress();
  const [mode, setMode] = useState<"all" | "todo" | "wrong">("all");
  if (!data) return <Loading error={error} />;
  const i = data.findIndex((u) => u.id === id);
  const u = data[i];
  if (!u) return <Loading error={new Error("404")} />;
  const list = u.questions.filter((q) => {
    const p = get(`g1000:${q.n}`);
    return mode === "all" || (mode === "todo" && typeof p !== "number") || (mode === "wrong" && typeof p === "number" && p !== q.answer);
  });
  const done = u.questions.filter((q) => typeof get(`g1000:${q.n}`) === "number");
  const right = done.filter((q) => get(`g1000:${q.n}`) === q.answer).length;
  const prev = data[i - 1], next = data[i + 1];
  return (
    <div className="mx-auto max-w-4xl">
      <nav aria-label="위치" className="mb-3 flex items-center gap-1.5 text-sm text-slate-500">
        <Link to="/books" className="hover:text-slate-900 hover:underline">영어 교재</Link><span className="text-slate-300">/</span><span>{u.chapter}</span>
      </nav>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{Number(u.id)}. {u.title} <span className="text-base font-medium text-slate-400" lang="ja">{u.ja}</span></h1>
      <p className="mt-2 text-sm text-slate-600 tnum">{u.questions.length}문항 · 푼 문제 {done.length} · 맞힌 문제 {right}</p>
      <details className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5" open>
        <summary className="cursor-pointer font-bold text-indigo-900">먼저 읽는 핵심 정리</summary>
        <Md text={u.intro} className="mt-3" />
      </details>
      <div className="mt-6 mb-4 flex flex-wrap items-center gap-3">
        <Segmented value={mode} onChange={setMode} items={[{ value: "all", label: "전체" }, { value: "todo", label: "안 푼 것" }, { value: "wrong", label: "틀린 것" }]} />
        <span className="text-sm text-slate-500 tnum">{list.length}문항</span>
      </div>
      <ol className="space-y-3">{list.map((q) => <GQuestion key={q.n} q={q} />)}</ol>
      {!list.length && <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">{mode === "wrong" ? "틀린 문제가 없어요." : "이 단원은 다 풀었어요."}</p>}
      <nav className="mt-8 grid grid-cols-2 gap-3">
        {prev ? <Link to={`/books/g/${prev.id}`} className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-400"><span className="text-xs text-slate-500">이전 단원</span><b className="block truncate">{prev.title}</b></Link> : <span />}
        {next ? <Link to={`/books/g/${next.id}`} className="rounded-2xl border border-slate-200 bg-white p-4 text-right hover:border-slate-400"><span className="text-xs text-slate-500">다음 단원</span><b className="block truncate">{next.title}</b></Link> : <span />}
      </nav>
    </div>
  );
}

// ---------- 숙어장 ----------
export function IdiomsPage() {
  const { data, error } = useData<IGroup[]>("books/idioms.json");
  const { get } = useProgress();
  const params = new URLSearchParams(location.hash.split("?")[1] ?? "");
  const [group, setGroup] = useState(params.get("g") ?? "all");
  const [q, setQ] = useState("");
  const [hide, setHide] = useState(false);
  const [onlyTodo, setOnlyTodo] = useState(false);
  const groups = data ?? [];
  const shown = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return groups
      .filter((g) => group === "all" || g.id === group)
      .map((g) => ({ ...g, items: g.items.filter((it) => (!ql || (it.p + it.ko).toLowerCase().includes(ql)) && (!onlyTodo || get(`idiom:${it.p}`) !== true)) }))
      .filter((g) => g.items.length);
  }, [groups, group, q, onlyTodo, get]);
  if (!data) return <Loading error={error} />;
  const total = data.reduce((a, g) => a + g.items.length, 0);
  const known = data.reduce((a, g) => a + g.items.filter((it) => get(`idiom:${it.p}`) === true).length, 0);
  return (
    <div>
      <nav aria-label="위치" className="mb-3 flex items-center gap-1.5 text-sm text-slate-500">
        <Link to="/books" className="hover:text-slate-900 hover:underline">영어 교재</Link><span className="text-slate-300">/</span><span>영숙어장</span>
      </nav>
      <PageTitle title={`영숙어장 ${total}개`}>비슷한 형태끼리 묶은 그룹 순서 그대로예요. 외운 숙어는 체크해서 지워 나가세요.</PageTitle>
      <div className="mb-5 max-w-md rounded-2xl border border-slate-200 bg-white p-4"><Bar value={known} total={total} label="외운 숙어" /></div>
      <div className="sticky top-16 z-10 -mx-4 mb-5 flex flex-wrap items-center gap-3 border-b border-slate-200 bg-stone-50/95 px-4 py-3 backdrop-blur">
        <label className="relative w-full sm:w-64">
          <span className="sr-only">숙어 검색</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="영어·한국어로 검색" className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm" />
        </label>
        <select value={group} onChange={(e) => setGroup(e.target.value)} className="max-w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm sm:max-w-72" aria-label="그룹 선택">
          <option value="all">모든 그룹 ({data.length})</option>
          {data.map((g) => <option key={g.id} value={g.id}>{g.title} ({g.items.length})</option>)}
        </select>
        <button onClick={() => setHide((h) => !h)} aria-pressed={hide} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
          {hide ? <EyeOff className="size-4" /> : <Eye className="size-4" />}뜻 가리기
        </button>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="size-4 accent-indigo-700" checked={onlyTodo} onChange={(e) => setOnlyTodo(e.target.checked)} />못 외운 것만</label>
      </div>
      <div className="space-y-8">
        {shown.slice(0, group === "all" && !q ? 30 : 400).map((g) => (
          <section key={g.id} id={`g-${g.id}`}>
            <h2 className="text-lg font-bold text-slate-900">{g.title}</h2>
            {g.intro && <p className="mt-1 text-sm text-slate-600">{g.intro}</p>}
            <ul className="mt-3 grid gap-2.5 md:grid-cols-2">
              {g.items.map((it) => {
                const k = get(`idiom:${it.p}`) === true;
                return (
                  <li key={it.p} className={"rounded-2xl border border-slate-200 bg-white p-4 transition " + (k ? "opacity-55" : "shadow-sm")}>
                    <div className="flex items-start gap-2">
                      <p className="en flex-1 text-[17px] font-bold text-slate-900">{it.p}</p>
                      {it.lv && <span className="mt-1 shrink-0 rounded bg-stone-100 px-1.5 text-[10px] font-semibold text-slate-500">Lv{it.lv}</span>}
                      <button aria-pressed={k} onClick={() => setProgress(`idiom:${it.p}`, !k)} className={"shrink-0 rounded-full px-2.5 py-1 text-xs transition " + (k ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-slate-600 hover:bg-stone-200")}>{k ? "외움" : "외웠어요"}</button>
                    </div>
                    <p tabIndex={hide ? 0 : undefined} className={"mt-0.5 font-semibold text-indigo-800 transition " + (hide ? "blur-sm hover:blur-none focus:blur-none" : "")}>{it.ko}</p>
                    <p className="en mt-2 text-[15px] text-slate-800">{it.ex}</p>
                    <p className={"text-sm text-slate-500 transition " + (hide ? "blur-sm hover:blur-none" : "")}>{it.exKo}</p>
                    {it.note && <p className="mt-2 rounded-lg bg-stone-50 px-2.5 py-1.5 text-xs text-slate-600">▶ {it.note}</p>}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
        {group === "all" && !q && shown.length > 30 && (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">처음 30개 그룹만 보여 줘요. 위에서 그룹을 고르거나 검색하면 나머지 {shown.length - 30}개 그룹도 볼 수 있어요.</p>
        )}
        {!shown.length && <p className="text-center text-slate-500">조건에 맞는 숙어가 없어요.</p>}
      </div>
    </div>
  );
}

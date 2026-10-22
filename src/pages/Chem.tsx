import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Layers, Star } from "lucide-react";
import "../chem.css";
import { useData, type ChemIndex, type Deck, type Tiers } from "../data/remote";
import { peekProgress, setProgress, useProgress } from "../progress";
import { MarkButtons, MarkGlyph, MarkStudy, countMarks, readMark, writeMark, type Legacy, type Mark } from "../marks";
import { TierBadge, TierLegend } from "../components/Tier";
import { PageTitle } from "../components/ui";
import { JuyoSection } from "./Juyo";

function Loading({ error }: { error?: Error }) {
  if (error) return <div className="py-20 text-center text-slate-600">내용을 불러오지 못했어요. 인터넷 연결을 확인한 뒤 새로고침해 주세요.</div>;
  return <div className="py-20 text-center text-slate-400" role="status">불러오는 중…</div>;
}

function useChem() {
  return useData<ChemIndex>("chem/index.json");
}
function useTiers() {
  return useData<Tiers>("tiers.json");
}
const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);
// 화학 문항 표시: mark:chem:<장>/<번호>, 예전 "풀었음"(chem:done)은 ○ 로 보인다
const probId = (k: string) => "chem:" + k;
const probLegacy = (k: string): Legacy => ({ key: `chem:done:${k}`, kind: "solved" });
const MARK_CLS: Record<Mark, string> = { o: " done", t: " m-t", x: " m-x" };
function MiniBar({ a, b }: { a: number; b: number }) {
  return (
    <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={b} aria-valuenow={a}>
      <i style={{ width: pct(a, b) + "%" }} />
    </div>
  );
}

function Crumb({ items }: { items: [string, string?][] }) {
  return (
    <nav aria-label="위치" className="mb-3 flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
      {items.map(([label, to], i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          {i > 0 && <span aria-hidden className="text-slate-300">/</span>}
          {to ? <Link to={to} className="hover:text-slate-900 hover:underline">{label}</Link> : <span className="text-slate-700">{label}</span>}
        </span>
      ))}
    </nav>
  );
}

// ---------- 화학 홈 ----------
export function ChemHome() {
  const { data: idx, error } = useChem();
  const { data: tiers } = useTiers();
  const { get } = useProgress();
  if (!idx) return <Loading error={error} />;
  const tierOf = (no: number) => tiers?.organic.find((t) => t.no === no);
  const itierOf = (id: string) => tiers?.inorganic.find((t) => t.id === id);
  return (
    <div className="chem">
      <PageTitle kicker="화학" title="화학 교재 · 합격화학 해설">
        『합격화학 연습문제 유기편』 350문항 해설, 「화학 중요문제집」 영상 해설, 무기화학 정리 교재, 암기 카드를 모았습니다. 단원마다 붙은 <b>필수 · 권장 · 패스</b>는 호시약대 3개년 화학 기출을 기준으로 정했어요.
      </PageTitle>
      <TierLegend />
      <h2 className="mt-8 mb-3 text-xl font-bold text-slate-900">유기편 해설 <span className="text-sm font-medium text-slate-500">제31–37장</span></h2>
      <ul className="chap-list">
        {idx.organic.map((c) => {
          const d = c.problems.filter((p) => get(`chem:done:${c.no}/${p.n}`) === true).length;
          const t = tierOf(c.no);
          return (
            <li key={c.no}>
              <Link to={`/chem/o/${c.no}`} style={{ ["--b" as string]: c.band }}>
                <span className="chap-no">{c.no}</span>
                <span>
                  <span className="t inline-flex items-center gap-2">{c.title}<TierBadge tier={t?.tier} title={t?.why} /></span>
                  <br />
                  <span className="s">{c.problems.length}문항{t?.why ? ` · ${t.why}` : ""}</span>
                </span>
                <span className="p">{d}/{c.problems.length}<MiniBar a={d} b={c.problems.length} /></span>
              </Link>
            </li>
          );
        })}
      </ul>
      {idx.bridge && (
        <>
          <h2 className="mt-10 mb-3 text-xl font-bold text-slate-900">본고사 브리지 해설 <span className="text-sm font-medium text-slate-500">합격화학 본고사 브리지</span></h2>
          <ul className="chap-list">
            {idx.bridge.map((c) => {
              const d = c.problems.filter((p) => get(`chem:done:b${c.id}/${p.n}`) === true).length;
              return (
                <li key={c.id}>
                  <Link to={`/chem/b/${c.id}`} style={{ ["--b" as string]: c.band }}>
                    <span className="chap-no">{c.no}</span>
                    <span>
                      <span className="t inline-flex items-center gap-2">{c.label} · {c.title}</span>
                      <br />
                      <span className="s">{c.problems.length}문항 · 정답과 문항별 상세 해설</span>
                    </span>
                    <span className="p">{d}/{c.problems.length}<MiniBar a={d} b={c.problems.length} /></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
      <JuyoSection />
      <h2 className="mt-10 mb-3 text-xl font-bold text-slate-900">무기화학 정리 교재 <span className="text-sm font-medium text-slate-500">{idx.inorganic.length}단원</span></h2>
      <div className="ino-grid">
        {idx.inorganic.map((s) => {
          const t = itierOf(s.id);
          return (
            <Link key={s.id} to={`/chem/i/${s.id}`} className={get(`chem:ino:${s.id}`) === true ? "done" : ""}>
              <span className="n">{s.no}</span>
              <b className="inline-flex items-center gap-2">{s.title}<TierBadge tier={t?.tier} title={t?.why} /></b>
              <span>{s.lead}</span>
            </Link>
          );
        })}
      </div>
      <h2 className="mt-10 mb-3 text-xl font-bold text-slate-900">암기 카드</h2>
      <DeckList />
    </div>
  );
}

// ---------- 장 찾기 (유기편 o / 본고사 브리지 b) ----------
type Book = "o" | "b";
type Chap = { key: string; short: string; label: string; title: string; band: string; problems: { n: string; a: string; g: string }[]; base: string; data: string };
function findChap(idx: ChemIndex, book: Book, no?: string): Chap | undefined {
  if (book === "b") {
    const b = idx.bridge?.find((x) => x.id === no);
    return b && { key: "b" + b.id, short: "B" + b.no, label: b.label, title: b.title, band: b.band, problems: b.problems, base: `/chem/b/${b.id}`, data: `chem/b${b.id}.json` };
  }
  const c = idx.organic.find((x) => String(x.no) === no);
  return c && { key: String(c.no), short: String(c.no), label: `제${c.no}장`, title: c.title, band: c.band, problems: c.problems, base: `/chem/o/${c.no}`, data: `chem/o${c.no}.json` };
}

// ---------- 유기 장 ----------
export function ChemChapter({ book = "o" }: { book?: Book } = {}) {
  const { no } = useParams();
  const { data: idx, error } = useChem();
  const { get } = useProgress();
  const [filter, setFilter] = useState<"all" | "todo" | "star" | "weak">("all");
  const [covered, setCovered] = useState(() => get("chem:cover") === true);
  if (!idx) return <Loading error={error} />;
  const c = findChap(idx, book, no);
  if (!c) return <Loading error={new Error("404")} />;
  const mk = (n: string) => readMark(get, probId(`${c.key}/${n}`), probLegacy(`${c.key}/${n}`));
  const list = c.problems.filter((p) => {
    const k = `${c.key}/${p.n}`;
    const m = mk(p.n);
    return filter === "all" || (filter === "todo" && !m) || (filter === "star" && get(`chem:star:${k}`) === true) || (filter === "weak" && (m === "t" || m === "x"));
  });
  const cnt = countMarks(c.problems.map((p) => p.n), mk);
  const d = c.problems.length - cnt.none;
  return (
    <div className="chem">
      <Crumb items={[["화학", "/chem"], [c.label]]} />
      <div className="chap-head" style={{ ["--b" as string]: c.band }}>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight"><span className="chap-band" aria-hidden />{c.label} {c.title}</h1>
          <p className="text-slate-600">{c.problems.length}문항 중 {d}문항 표시 · <span className="text-emerald-700">○ {cnt.o}</span> <span className="text-amber-700">△ {cnt.t}</span> <span className="text-rose-700">× {cnt.x}</span>{book === "b" && <> · <a className="underline" href={`${import.meta.env.BASE_URL}data/chem/bridge${no}.pdf`} target="_blank" rel="noreferrer">문제지 PDF</a></>}</p>
        </div>
        <div className="toolbar">
          <div className="seg" role="group" aria-label="보기 필터">
            {(["all", "todo", "weak", "star"] as const).map((f) => (
              <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>{{ all: "전체", todo: "표시 안 한 것", weak: "△·×", star: "별표" }[f]}</button>
            ))}
          </div>
          <button className="sheet-toggle" aria-pressed={covered} onClick={() => { setCovered(!covered); setProgress("chem:cover", !covered); }}>
            <i />赤シート
          </button>
        </div>
      </div>
      {list.length ? (
        <div className={"wall" + (covered ? " covered" : "")} style={{ ["--b" as string]: c.band }}>
          {list.map((p) => {
            const k = `${c.key}/${p.n}`;
            const m = mk(p.n), star = get(`chem:star:${k}`) === true;
            return (
              <Link key={p.n} className={"cell" + (m ? MARK_CLS[m] : "") + (star ? " star" : "")} to={`${c.base}/${p.n}`} data-mark-state={m ?? ""}
                onPointerOver={(e) => e.currentTarget.classList.add("peek")} onPointerOut={(e) => e.currentTarget.classList.remove("peek")}>
                <span className="z">{p.n}<span className="inline-flex items-center gap-1">{star && <Star className="size-3.5 fill-amber-300 text-amber-600" />}<MarkGlyph m={m} className="text-base" /></span></span>
                <span className={"ans" + (p.a.length > 4 ? " long" : "")}>{p.a}</span>
                <span className="g">{p.g}</span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="empty">{filter === "star" ? "아직 별표한 문항이 없어요." : filter === "weak" ? "△·× 로 표시한 문항이 없어요." : "이 장의 문항을 모두 표시했어요."}</div>
      )}
    </div>
  );
}

// ---------- 유기 문항 ----------
export function ChemProblem({ book = "o" }: { book?: Book } = {}) {
  const { no, n } = useParams();
  const nav = useNavigate();
  const { data: idx, error } = useChem();
  const c = idx ? findChap(idx, book, no) : undefined;
  const { data: bodies, error: e2 } = useData<Record<string, string>>(c ? c.data : null);
  const { get } = useProgress();
  const [shown, setShown] = useState(false);
  const covered = get("chem:cover") === true;
  useEffect(() => setShown(false), [no, n]);
  const i = c ? c.problems.findIndex((p) => p.n === n) : -1;
  const prev = c && i > 0 ? `${c.base}/${c.problems[i - 1].n}` : "";
  const next = c && i >= 0 && i < c.problems.length - 1 ? `${c.base}/${c.problems[i + 1].n}` : "";
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (/input|textarea/i.test((e.target as HTMLElement).tagName)) return;
      if (e.key === "ArrowLeft" && prev) nav(prev);
      if (e.key === "ArrowRight" && next) nav(next);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [prev, next, nav]);
  if (!idx || !bodies) return <Loading error={error ?? e2} />;
  if (!c || i < 0) return <Loading error={new Error("404")} />;
  const p = c.problems[i];
  const k = `${c.key}/${p.n}`;
  const m = readMark(get, probId(k), probLegacy(k)), star = get(`chem:star:${k}`) === true;
  return (
    <div className="chem">
      <Crumb items={[["화학", "/chem"], [`${c.label} ${c.title}`, c.base], [`${p.n}번`]]} />
      <div className="prob" style={{ ["--b" as string]: c.band }}>
        <article>
          <div className="prob-head">
            <div className={"big-cell" + (p.a.length > 4 ? " long" : "") + (covered && !shown ? " covered" : "")}>
              <span className="z">{c.short}–{p.n}</span>
              <span className="ans" role={covered ? "button" : undefined} tabIndex={covered ? 0 : undefined} onClick={() => setShown(true)}>{p.a}</span>
              <span className="cap">정답</span>
            </div>
            <div className="meta"><h1>{/^\d+$/.test(p.n) ? `${Number(p.n)}번 문제` : `${p.n[0] === "K" ? "개념확인" : "연습"} ${Number(p.n.slice(1))}번`}</h1><span className="chap">{c.label} {c.title}</span></div>
          </div>
          <div className="actions">
            <MarkButtons value={m} onChange={(v) => writeMark(probId(k), v, probLegacy(k))} />
            <button className="chip star" aria-pressed={star} onClick={() => setProgress(`chem:star:${k}`, !star)}><Star /><span>{star ? "별표됨" : "별표"}</span></button>
          </div>
          <div className="prose" dangerouslySetInnerHTML={{ __html: bodies[p.n] ?? "" }} />
          <nav className="pager" aria-label="이전·다음 문항">
            {prev ? <Link to={prev}><small>이전 문항</small><b>{c.problems[i - 1].n}번</b></Link> : <span className="spacer" />}
            {next ? <Link className="next" to={next}><small>다음 문항</small><b>{c.problems[i + 1].n}번</b></Link> : <span className="spacer" />}
          </nav>
        </article>
        <aside className="aside" aria-label="이 장의 문항">
          <h4>{c.label} 문항</h4>
          <div className="mini">
            {c.problems.map((q) => {
              const qm = readMark(get, probId(`${c.key}/${q.n}`), probLegacy(`${c.key}/${q.n}`));
              return <Link key={q.n} to={`${c.base}/${q.n}`} className={qm ? MARK_CLS[qm].trim() : ""} aria-current={q.n === p.n ? "page" : undefined} aria-label={qm ? `${q.n}번 ${{ o: "○", t: "△", x: "×" }[qm]}` : undefined}>{q.n}</Link>;
            })}
          </div>
          <p className="keys"><kbd>←</kbd> <kbd>→</kbd> 이전·다음 문항</p>
        </aside>
      </div>
    </div>
  );
}

// ---------- 무기 단원 ----------
export function ChemInorganic() {
  const { id } = useParams();
  const { data: idx, error } = useChem();
  const { data: bodies, error: e2 } = useData<Record<string, string>>("chem/inorg.json");
  const { data: tiers } = useTiers();
  useEffect(() => {
    if (id) setProgress(`chem:ino:${id}`, true);
  }, [id]);
  if (!idx || !bodies) return <Loading error={error ?? e2} />;
  const s = idx.inorganic.find((x) => x.id === id);
  if (!s) return <Loading error={new Error("404")} />;
  const i = idx.inorganic.indexOf(s), prev = idx.inorganic[i - 1], next = idx.inorganic[i + 1];
  const t = tiers?.inorganic.find((x) => x.id === id);
  return (
    <div className="chem">
      <Crumb items={[["화학", "/chem"], ["무기 교재"], [`${s.no}. ${s.title}`]]} />
      <div className="ino-page">
        <nav className="toc" aria-label="단원 목차">
          <h4>단원</h4>
          <ol>
            {idx.inorganic.map((x) => (
              <li key={x.id}><Link to={`/chem/i/${x.id}`} aria-current={x.id === id ? "page" : undefined}><i>{x.no}</i>{x.title}</Link></li>
            ))}
          </ol>
        </nav>
        <article>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex flex-wrap items-center gap-2">{s.no}. {s.title}<TierBadge tier={t?.tier} title={t?.why} /></h1>
          {t?.why && <p className="mt-1 text-sm text-slate-500">{t.why}</p>}
          <div className="prose mt-6" dangerouslySetInnerHTML={{ __html: bodies[s.id] ?? "" }} />
          <nav className="pager" aria-label="이전·다음 단원">
            {prev ? <Link to={`/chem/i/${prev.id}`}><small>이전 단원</small><b>{prev.no}. {prev.title}</b></Link> : <span className="spacer" />}
            {next ? <Link className="next" to={`/chem/i/${next.id}`}><small>다음 단원</small><b>{next.no}. {next.title}</b></Link> : <span className="spacer" />}
          </nav>
        </article>
      </div>
    </div>
  );
}

// ---------- 암기 카드 ----------
function DeckList() {
  const { data: D, error } = useData<Record<string, Deck>>("chem/decks.json");
  const { get } = useProgress();
  if (!D) return <Loading error={error} />;
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(D).map(([id, d]) => {
        const best = get(`chem:best:${id}`);
        return (
          <Link key={id} to={`/chem/d/${id}`} className="flex flex-col gap-1.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <span className="flex items-center gap-2 font-bold text-slate-900"><Layers className="size-4 text-indigo-700" />{d.title}</span>
            <span className="text-sm text-slate-500">{d.cards.length}장{typeof best === "number" ? ` · 최고 ${best}%` : ""}</span>
            {d.cards[0]?.sw && (
              <span className="mt-1 flex gap-1" aria-hidden>
                {[...new Set(d.cards.map((x) => x.sw))].slice(0, 10).map((c) => <i key={c} className="size-4 rounded-sm border border-black/20" style={{ background: c }} />)}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

// 카드 표시 키: mark:card:<덱 묶음>:<덱>:<앞면>. 최고 기록은 예전처럼 chem:best:<덱> 에 둔다.
export function ChemDeck({ src = "chem/decks.json", back = ["화학", "/chem"] }: { src?: string; back?: [string, string] } = {}) {
  const { id } = useParams();
  const { data: D, error } = useData<Record<string, Deck>>(src);
  const d = D && id ? D[id] : undefined;
  const set = src.split("/")[0];
  const cid = (q: string) => `card:${set}:${id}:${q}`;
  const items = (d?.cards ?? []).map((c) => ({ id: cid(c.q) }));
  const byId = new Map((d?.cards ?? []).map((c) => [cid(c.q), c]));
  if (!D) return <Loading error={error} />;
  if (!d) return <Loading error={new Error("404")} />;
  return (
    <div className="chem mx-auto max-w-xl">
      <Crumb items={[back, [d.title]]} />
      <MarkStudy
        deck={`${set}:${id}`}
        items={items}
        onFullDone={(score) => {
          const prev = peekProgress(`chem:best:${id}`);
          if (typeof prev !== "number" || score > prev) setProgress(`chem:best:${id}`, score);
        }}
        renderLine={(k) => { const c = byId.get(k)!; return <span><b>{c.q}</b> → {c.a}{c.s ? ` (${c.s})` : ""}</span>; }}
        renderCard={(k, shown) => {
          const c = byId.get(k)!;
          return (
            <div className={"flash" + (shown ? " revealed" : "")}>
              <span className="hint">{d.hint}</span>
              <div className={"q" + (c.q.length > 14 ? " long" : "")}>{c.q}</div>
              <div className="a" aria-live="polite">
                {shown ? (
                  <>
                    <span className="val" style={{ whiteSpace: "pre-line" }}>{c.sw && <i style={{ background: c.sw }} />}{c.a}</span>
                    {c.s && <span className="sub">{c.s}</span>}
                    {c.n && <span className="note">반응원리: {c.n}</span>}
                  </>
                ) : <span className="cover">赤シート · 눌러서 확인</span>}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}

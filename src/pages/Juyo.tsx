import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PlayCircle, Star } from "lucide-react";
import "../chem.css";
import { useData, type JuyoIndex } from "../data/remote";
import { setProgress, useProgress } from "../progress";
import { MarkButtons, MarkGlyph, countMarks, readMark, writeMark, type Mark } from "../marks";

// 「화학 중요문제집」(化学 重要問題集 2026) 영상 해설.
// 저장 키: 표시 mark:juyo:<번호>, 별표 juyo:star:<번호>. 赤シート 는 화학 장과 같은 chem:cover 를 쓴다.
const markId = (n: string) => "juyo:" + n;
const starKey = (n: string) => "juyo:star:" + n;
const MARK_CLS: Record<Mark, string> = { o: " done", t: " m-t", x: " m-x" };

function Loading({ error }: { error?: Error }) {
  if (error) return <div className="py-20 text-center text-slate-600">내용을 불러오지 못했어요. 인터넷 연결을 확인한 뒤 새로고침해 주세요.</div>;
  return <div className="py-20 text-center text-slate-400" role="status">불러오는 중…</div>;
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

export const useJuyo = () => useData<JuyoIndex>("juyo/index.json");
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const groupOf = (idx: JuyoIndex, n: string) => idx.groups.find((g) => Number(n) >= g.from && Number(n) <= g.to) ?? idx.groups[0];

// 화학 홈에 붙는 목록 (단원 묶음별)
export function JuyoSection() {
  const { data: idx } = useJuyo();
  const { get } = useProgress();
  if (!idx) return null;
  return (
    <>
      <h2 className="mt-10 mb-3 text-xl font-bold text-slate-900">화학 중요문제집 영상 해설 <span className="text-sm font-medium text-slate-500" lang="ja">化学 重要問題集 2026</span></h2>
      <ul className="chap-list">
        {idx.groups.map((g, i) => {
          const ps = idx.problems.filter((p) => Number(p.n) >= g.from && Number(p.n) <= g.to);
          const d = ps.filter((p) => readMark(get, markId(p.n))).length;
          return (
            <li key={g.id}>
              <Link to={`/chem/j/${g.id}`} style={{ ["--b" as string]: g.band }}>
                <span className="chap-no">{i + 1}</span>
                <span>
                  <span className="t">{g.title} <span className="font-medium text-slate-500" lang="ja">{g.ja}</span></span>
                  <br />
                  <span className="s">{g.from}–{g.to}번 · {ps.length}문항 · 문항마다 영상 해당 장면부터 재생</span>
                </span>
                <span className="p">{d}/{ps.length}<span className="bar"><i style={{ width: (ps.length ? Math.round((d / ps.length) * 100) : 0) + "%" }} /></span></span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

// ---------- 묶음 그리드 ----------
export function JuyoGroup() {
  const { g: gid } = useParams();
  const { data: idx, error } = useJuyo();
  const { get } = useProgress();
  const [filter, setFilter] = useState<"all" | "todo" | "star" | "weak">("all");
  const [covered, setCovered] = useState(() => get("chem:cover") === true);
  if (!idx) return <Loading error={error} />;
  const g = idx.groups.find((x) => x.id === gid);
  if (!g) return <Loading error={new Error("404")} />;
  const ps = idx.problems.filter((p) => Number(p.n) >= g.from && Number(p.n) <= g.to);
  const mk = (n: string) => readMark(get, markId(n));
  const list = ps.filter((p) => {
    const m = mk(p.n);
    return filter === "all" || (filter === "todo" && !m) || (filter === "star" && get(starKey(p.n)) === true) || (filter === "weak" && (m === "t" || m === "x"));
  });
  const cnt = countMarks(ps.map((p) => p.n), mk);
  return (
    <div className="chem">
      <Crumb items={[["화학", "/chem"], ["중요문제집"], [g.title]]} />
      <div className="chap-head" style={{ ["--b" as string]: g.band }}>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight"><span className="chap-band" aria-hidden />중요문제집 {g.title} <span className="text-lg font-medium text-slate-500" lang="ja">{g.ja}</span></h1>
          <p className="text-slate-600">{g.from}–{g.to}번 {ps.length}문항 중 {ps.length - cnt.none}문항 표시 · <span className="text-emerald-700">○ {cnt.o}</span> <span className="text-amber-700">△ {cnt.t}</span> <span className="text-rose-700">× {cnt.x}</span> · <a className="underline" href={`https://www.youtube.com/playlist?list=${idx.list}`} target="_blank" rel="noreferrer">재생목록</a></p>
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
      <p className="mb-3 text-sm text-slate-500">칸의 정답은 영상에서 말로 확인한 것만 적었어요. <b>※</b> 표시는 일부 소문항의 정답을 자막만으로 확정하지 못했다는 뜻이고, 「영상 확인」은 정답을 판서에만 썼다는 뜻이에요.</p>
      {list.length ? (
        <div className={"wall" + (covered ? " covered" : "")} style={{ ["--b" as string]: g.band }}>
          {list.map((p) => {
            const m = mk(p.n), star = get(starKey(p.n)) === true;
            return (
              <Link key={p.n} className={"cell" + (m ? MARK_CLS[m] : "") + (star ? " star" : "")} to={`/chem/j/${g.id}/${p.n}`} data-mark-state={m ?? ""}
                onPointerOver={(e) => e.currentTarget.classList.add("peek")} onPointerOut={(e) => e.currentTarget.classList.remove("peek")}>
                <span className="z">{p.n}<span className="inline-flex items-center gap-1">{star && <Star className="size-3.5 fill-amber-300 text-amber-600" />}<MarkGlyph m={m} className="text-base" /></span></span>
                <span className="ans long">{p.a || "영상 확인"}</span>
                <span className="g"><b>{p.s}</b> {p.g}</span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="empty">{filter === "star" ? "아직 별표한 문항이 없어요." : filter === "weak" ? "△·× 로 표시한 문항이 없어요." : "이 묶음의 문항을 모두 표시했어요."}</div>
      )}
    </div>
  );
}

// ---------- 문항 ----------
export function JuyoProblem() {
  const { g: gid, n } = useParams();
  const nav = useNavigate();
  const { data: idx, error } = useJuyo();
  const g = idx?.groups.find((x) => x.id === gid);
  const { data: bodies, error: e2 } = useData<Record<string, string>>(g ? `juyo/${g.id}.json` : null);
  const { get } = useProgress();
  const [shown, setShown] = useState(false);
  const [at, setAt] = useState<number | null>(null);
  const covered = get("chem:cover") === true;
  useEffect(() => { setShown(false); setAt(null); }, [gid, n]);
  const all = idx?.problems ?? [];
  const i = all.findIndex((p) => p.n === n);
  const link = (k: number) => idx && all[k] ? `/chem/j/${groupOf(idx, all[k].n).id}/${all[k].n}` : "";
  const prev = i > 0 ? link(i - 1) : "";
  const next = i >= 0 && i < all.length - 1 ? link(i + 1) : "";
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (/input|textarea/i.test((e.target as HTMLElement).tagName)) return;
      if (e.key === "ArrowLeft" && prev) nav(prev);
      if (e.key === "ArrowRight" && next) nav(next);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [prev, next, nav]);
  // 본문의 시각 버튼(data-t)을 누르면 위 영상을 그 시각부터 다시 튼다
  useEffect(() => {
    const h = (e: MouseEvent) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>("[data-t]");
      if (!b) return;
      e.preventDefault();
      setAt(Number(b.dataset.t));
      document.getElementById("juyo-video")?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    const el = document.getElementById("juyo-body");
    el?.addEventListener("click", h);
    return () => el?.removeEventListener("click", h);
  });
  if (!idx || !bodies) return <Loading error={error ?? e2} />;
  if (!g || i < 0) return <Loading error={new Error("404")} />;
  const p = all[i];
  const m = readMark(get, markId(p.n)), star = get(starKey(p.n)) === true;
  const start = at ?? p.t;
  const ps = all.filter((q) => Number(q.n) >= g.from && Number(q.n) <= g.to);
  return (
    <div className="chem">
      <Crumb items={[["화학", "/chem"], [`중요문제집 ${g.title}`, `/chem/j/${g.id}`], [`${p.n}번`]]} />
      <div className="prob" style={{ ["--b" as string]: g.band }}>
        <article className="min-w-0">
          <div className="prob-head">
            <div className={"big-cell long" + (covered && !shown ? " covered" : "")}>
              <span className="z">중요 {p.n}</span>
              <span className="ans" role={covered ? "button" : undefined} tabIndex={covered ? 0 : undefined} onClick={() => setShown(true)}>{p.a || "영상 확인"}</span>
              <span className="cap">정답 요약</span>
            </div>
            <div className="meta"><h1>{p.n}번 문제</h1><span className="chap">{p.s}</span></div>
          </div>
          <div className="actions">
            <MarkButtons value={m} onChange={(v) => writeMark(markId(p.n), v)} />
            <button className="chip star" aria-pressed={star} onClick={() => setProgress(starKey(p.n), !star)}><Star /><span>{star ? "별표됨" : "별표"}</span></button>
          </div>
          <figure id="juyo-video" className="mt-5 mb-6">
            <div className="aspect-video overflow-hidden rounded bg-black">
              <iframe key={p.yt + start} className="size-full" src={`https://www.youtube-nocookie.com/embed/${p.yt}?start=${start}&rel=0${at != null ? "&autoplay=1" : ""}`} title={`중요문제집 ${p.n}번 해설 영상`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" data-start={start} />
            </div>
            <figcaption className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
              <PlayCircle aria-hidden className="size-4" />풀이 시작 {fmt(p.t)}부터 재생 · 판서·그림은 영상에서 확인하세요
              <a className="underline" href={`https://www.youtube.com/watch?v=${p.yt}&t=${start}s`} target="_blank" rel="noreferrer">유튜브에서 열기</a>
            </figcaption>
          </figure>
          <div id="juyo-body" className="prose" dangerouslySetInnerHTML={{ __html: bodies[p.n] ?? "" }} />
          <nav className="pager" aria-label="이전·다음 문항">
            {prev ? <Link to={prev}><small>이전 문항</small><b>{all[i - 1].n}번 {all[i - 1].s}</b></Link> : <span className="spacer" />}
            {next ? <Link className="next" to={next}><small>다음 문항</small><b>{all[i + 1].n}번 {all[i + 1].s}</b></Link> : <span className="spacer" />}
          </nav>
        </article>
        <aside className="aside" aria-label="이 묶음의 문항">
          <h4>{g.title} 문항</h4>
          <div className="mini">
            {ps.map((q) => {
              const qm = readMark(get, markId(q.n));
              return <Link key={q.n} to={`/chem/j/${g.id}/${q.n}`} className={qm ? MARK_CLS[qm].trim() : ""} aria-current={q.n === p.n ? "page" : undefined} aria-label={qm ? `${q.n}번 ${{ o: "○", t: "△", x: "×" }[qm]}` : undefined}>{q.n}</Link>;
            })}
          </div>
          <p className="keys"><kbd>←</kbd> <kbd>→</kbd> 이전·다음 문항</p>
        </aside>
      </div>
    </div>
  );
}

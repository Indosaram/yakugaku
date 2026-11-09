import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { todayISO } from "../srs";
import { clear, grade, resume, reveal, save, start, summary, undo, type SessionCard, type SessionState } from "../review-session";
import { buildQueue, SRS_SOURCES, type BuildResult, type DeckData } from "../review-queue";
import { peekProgress } from "../progress";
import { loadData } from "../data/remote";
import { PageTitle, btn } from "../components/ui";

const GRADES = [
  { g: "x" as const, label: "모름", key: "1" },
  { g: "t" as const, label: "어려움", key: "2" },
  { g: "o" as const, label: "알맞음", key: "3" },
  { g: "e" as const, label: "쉬움", key: "4" },
];

const GRADE_KEY: Record<string, "x" | "t" | "o" | "e"> = { "1": "x", "2": "t", "3": "o", "4": "e" };

function Loading({ error }: { error?: Error }) {
  if (error) return <div className="py-20 text-center text-slate-600">카드를 불러오지 못했어요. 인터넷 연결을 확인한 뒤 새로고침해 주세요.</div>;
  return <div className="py-20 text-center text-slate-400" role="status">불러오는 중…</div>;
}

function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}

export default function Review() {
  const [searchParams] = useSearchParams();
  const deckFilter = searchParams.get("deck") ?? undefined;
  const today = useMemo(() => todayISO(), []);

  const [session, setSession] = useState<SessionState | null>(null);
  const [subs, setSubs] = useState<Record<string, string>>({});
  const [nextDue, setNextDue] = useState<string | null>(null);
  const [error, setError] = useState<Error | undefined>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const saved = resume(today);
      if (saved) {
        if (alive) {
          setSession(saved);
          setReady(true);
        }
        return;
      }
      try {
        const decks: Record<string, DeckData> = {};
        for (const src of SRS_SOURCES) {
          decks[src] = await loadData<DeckData>(src);
        }
        const full: BuildResult = buildQueue({ today, decks, read: peekProgress });
        const queue = deckFilter === undefined
          ? full
          : buildQueue({ today, decks, read: peekProgress, deckFilter });
        const cards: SessionCard[] = [...queue.due, ...queue.fresh].map((item) => ({
          id: item.id,
          front: item.front,
          back: item.back,
          deck: item.set + ":" + item.deck,
          fresh: item.fresh,
        }));
        const subMap: Record<string, string> = {};
        for (const item of [...queue.due, ...queue.fresh]) {
          if (item.sub) subMap[item.id] = item.sub;
        }
        const upcoming = full.due[0]?.due ?? null;
        if (!alive) return;
        setSubs(subMap);
        setNextDue(upcoming);
        setSession(start(cards, today));
        setReady(true);
      } catch (e) {
        if (!alive) return;
        setError(e instanceof Error ? e : new Error(String(e)));
        setReady(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, [today, deckFilter]);

  const sessionRef = useRef<SessionState | null>(null);
  sessionRef.current = session;

  const applyGrade = useCallback((g: "x" | "t" | "o" | "e") => {
    const current = sessionRef.current;
    if (!current || current.finished || !current.shown) return;
    const next = grade(current, g, today);
    sessionRef.current = next;
    setSession(next);
    save(next);
    if (next.finished) clear();
  }, [today]);

  const applyUndo = useCallback(() => {
    const current = sessionRef.current;
    if (!current || current.undoStack.length === 0) return;
    const next = undo(current);
    sessionRef.current = next;
    setSession(next);
    save(next);
  }, []);

  const applyReveal = useCallback(() => {
    const current = sessionRef.current;
    if (!current || current.shown || current.finished) return;
    const next = reveal(current);
    sessionRef.current = next;
    setSession(next);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTyping(event.target)) return;
      const shown = !!sessionRef.current?.shown;
      const g = GRADE_KEY[event.key];
      if (g) {
        if (shown) {
          event.preventDefault();
          applyGrade(g);
        }
        return;
      }
      if (event.key === " ") {
        if (!shown) {
          event.preventDefault();
          applyReveal();
        }
        return;
      }
      if (event.key === "u" || event.key === "U" || event.key === "Backspace") {
        event.preventDefault();
        applyUndo();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [applyGrade, applyUndo, applyReveal]);

  if (!ready) {
    return (
      <>
        <PageTitle kicker="복습" title="오늘의 복습" />
        <Loading error={error} />
      </>
    );
  }
  if (error) {
    return (
      <>
        <PageTitle kicker="복습" title="오늘의 복습" />
        <Loading error={error} />
      </>
    );
  }
  if (!session) {
    return (
      <>
        <PageTitle kicker="복습" title="오늘의 복습" />
        <Loading />
      </>
    );
  }

  if (session.cards.length === 0) {
    return (
      <>
        <PageTitle kicker="복습" title="오늘의 복습" />
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <p className="text-slate-700">오늘 복습할 카드가 없어요</p>
          {nextDue ? (
            <p className="mt-2 text-sm text-slate-500">가장 가까운 복습 예정일: {nextDue}</p>
          ) : (
            <Link to="/review" className={btn.link + " mt-3"}>복습 화면 다시 열기</Link>
          )}
          {nextDue && deckFilter && (
            <Link to="/review" className={btn.link + " mt-3"}>전체 덱 복습하기</Link>
          )}
        </div>
      </>
    );
  }

  if (session.finished) {
    const s = summary(session);
    return (
      <>
        <PageTitle kicker="복습" title="오늘의 복습" />
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-lg font-semibold text-slate-900">복습을 마쳤어요</p>
          <p className="mt-1 text-sm text-slate-600">{s.total}장 중 {s.graded}장을 채점했어요.</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-700 sm:grid-cols-4">
            <li className="rounded-xl bg-stone-100 px-3 py-2">모름 <span className="font-semibold tnum">{s.tally.x}</span></li>
            <li className="rounded-xl bg-stone-100 px-3 py-2">어려움 <span className="font-semibold tnum">{s.tally.t}</span></li>
            <li className="rounded-xl bg-stone-100 px-3 py-2">알맞음 <span className="font-semibold tnum">{s.tally.o}</span></li>
            <li className="rounded-xl bg-stone-100 px-3 py-2">쉬움 <span className="font-semibold tnum">{s.tally.e}</span></li>
          </ul>
          {s.nextDue.length > 0 && (
            <div className="mt-4 text-sm text-slate-600">
              <p className="font-medium text-slate-700">다음에 볼 카드</p>
              <ul className="mt-1 list-disc pl-5">
                {s.nextDue.slice(0, 3).map((id) => <li key={id} className="break-all">{id}</li>)}
              </ul>
            </div>
          )}
          <Link to="/" className={btn.secondary + " mt-5"}>홈으로</Link>
        </div>
      </>
    );
  }

  const card = session.cards[session.idx];
  const remaining = session.cards.length - session.idx;
  const gradedToday = session.tally.x + session.tally.t + session.tally.o + session.tally.e;
  const sub = subs[card.id];

  return (
    <>
      <PageTitle kicker="복습" title="오늘의 복습" />
      <p aria-live="polite" className="text-sm text-slate-600 tnum">남은 {remaining}장 · 오늘 {gradedToday}장</p>
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-xs font-medium text-slate-500">{card.deck}{card.fresh ? " · 새 카드" : ""}</p>
        <p className="mt-2 text-lg font-semibold text-slate-900 whitespace-pre-wrap">{card.front}</p>
        {session.shown ? (
          <>
            <div className="mt-4 border-t border-slate-200 pt-4">
              <p className="text-base text-slate-800 whitespace-pre-wrap">{card.back}</p>
              {sub && <p className="mt-2 text-sm text-slate-600 whitespace-pre-wrap">{sub}</p>}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {GRADES.map((item) => (
                <button key={item.g} type="button" onClick={() => applyGrade(item.g)} className={btn.secondary}>
                  {item.label} <span className="text-slate-400 tnum">{item.key}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <button type="button" onClick={applyReveal} className={btn.primary + " mt-5 w-full sm:w-auto"}>보기</button>
        )}
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={applyUndo}
            disabled={session.undoStack.length === 0}
            className={btn.secondary + (session.undoStack.length === 0 ? " cursor-not-allowed opacity-40" : "")}
          >
            되돌리기
          </button>
          <span className="text-xs text-slate-400">Space 보기 · 1-4 채점 · U 되돌리기</span>
        </div>
      </div>
    </>
  );
}

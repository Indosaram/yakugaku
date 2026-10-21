import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Check, Lightbulb, MessageSquareQuote, RotateCcw, Sparkles, X } from "lucide-react";
import { Md } from "./Md";
import { roleStyle } from "./VisualBlocks";
import { lessonById } from "../data";
import { setProgress, useProgress } from "../progress";

export interface QuizQ {
  prompt: string;
  choices: string[];
  answer: number;
  explanation: string;
  lessonIds?: string[];
  label?: string;
}

interface ParsedExp {
  translation: string;
  answerHead: string;
  answerBody: string;
  skeleton: { text: string; role: string }[];
  wrongs: { head: string; body: string }[];
  keyPoint: string;
}

function parseExplanation(raw: string): ParsedExp | null {
  const secRe = /^\*\*([^*]+)\*\*\s*$/gm;
  const matches = [...raw.matchAll(secRe)];
  if (matches.length < 2) return null;

  const map: { title: string; content: string }[] = [];
  for (let i = 0; i < matches.length; i++) {
    const start = (matches[i].index ?? 0) + matches[i][0].length;
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? raw.length) : raw.length;
    map.push({ title: matches[i][1].trim(), content: raw.slice(start, end).trim() });
  }

  let translation = "";
  let answerHead = "왜 정답일까?";
  let answerBody = "";
  let wrongRaw = "";
  let keyPoint = "";

  for (const s of map) {
    if (s.title === "해석") translation = s.content;
    else if (s.title.startsWith("정답")) {
      answerHead = s.title;
      answerBody = s.content;
    } else if (s.title.includes("오답")) wrongRaw = s.content;
    else if (s.title.includes("핵심")) keyPoint = s.content;
  }

  if (!translation && !answerBody) return null;

  const skeleton: { text: string; role: string }[] = [];
  const skelMatch = answerBody.match(/문장 뼈대는\s+`?([^`\n.]+?\([^`\n.]+?\/[^`\n.]+?)`?(?:이다|입니다)/);
  if (skelMatch) {
    const parts = skelMatch[1].split(/\s*\/\s*/);
    for (const p of parts) {
      const m = p.match(/^(.+?)\(([^()]+)\)$/);
      if (m) skeleton.push({ text: m[1].trim(), role: m[2].trim() });
      else if (p.trim()) skeleton.push({ text: p.trim(), role: "덩어리" });
    }
  }

  const wrongs: { head: string; body: string }[] = [];
  for (const line of wrongRaw.split("\n")) {
    const clean = line.replace(/^[-•*]\s*/, "").trim();
    if (!clean) continue;
    const colonIdx = clean.indexOf(":");
    if (colonIdx > 0 && colonIdx < 42) {
      wrongs.push({ head: clean.slice(0, colonIdx).trim(), body: clean.slice(colonIdx + 1).trim() });
    } else {
      const m = clean.match(/^(\d+번\s+\S+)\s+(.+)$/);
      if (m) wrongs.push({ head: m[1], body: m[2] });
      else wrongs.push({ head: "", body: clean });
    }
  }

  return { translation, answerHead, answerBody, skeleton, wrongs, keyPoint };
}

function BlankSlotBanner({ prompt, choice }: { prompt: string; choice?: string }) {
  if (!choice || choice.length > 48) return null;
  const blankRe = /\(\s*　+\s*\)|\(\s*\)/;
  if (!blankRe.test(prompt)) return null;
  const [before, after] = prompt.split(blankRe);
  return (
    <div className="mb-3 rounded-xl border border-emerald-200 bg-white p-3.5 shadow-2xs">
      <span className="inline-block rounded bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-900">빈칸에 정답을 넣은 완성 문장</span>
      <p className="en mt-1.5 text-[16px] leading-relaxed text-slate-900">
        <span>{before.replace(/<[^>]+>/g, "")}</span>
        <span className="slot-fill mx-1 inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-0.5 font-bold text-white shadow-2xs">
          <Check aria-hidden className="size-3.5" />
          {choice}
        </span>
        <span>{(after ?? "").replace(/<[^>]+>/g, "")}</span>
      </p>
    </div>
  );
}

function ExplanationView({ q }: { q: QuizQ }) {
  const parsed = useMemo(() => parseExplanation(q.explanation), [q.explanation]);
  const winChoice = q.choices[q.answer - 1];

  if (!parsed) {
    return <Md text={q.explanation} />;
  }

  return (
    <div className="space-y-3">
      <BlankSlotBanner prompt={q.prompt} choice={winChoice} />

      {parsed.skeleton.length > 0 && (
        <div className="rounded-xl border border-indigo-200 bg-white p-3.5">
          <span className="inline-block rounded bg-indigo-100 px-2 py-0.5 text-[11px] font-bold text-indigo-900 mb-2">문장 뼈대 블록</span>
          <div className="flex flex-wrap items-center gap-1.5">
            {parsed.skeleton.map((sk, i) => {
              const st = roleStyle(sk.role);
              return (
                <span key={i} className="inline-flex items-center gap-1.5">
                  <span className={"rounded-xl border px-2.5 py-1.5 text-left " + st.car}>
                    <span className={"block rounded px-1.5 py-0.5 text-[10px] font-bold w-fit " + st.badge}>{sk.role}</span>
                    <span className="en mt-0.5 block text-sm font-bold">{sk.text}</span>
                  </span>
                  {i < parsed.skeleton.length - 1 && <ArrowRight aria-hidden className="size-3.5 text-slate-400 shrink-0" />}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {parsed.translation && (
        <div className="rounded-xl border border-amber-200/90 bg-white/90 p-3.5">
          <p className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1">
            <MessageSquareQuote aria-hidden className="size-3.5 text-indigo-700" />
            우리말 해석
          </p>
          <Md text={parsed.translation} className="text-[15px] text-slate-900 font-medium" />
        </div>
      )}

      {parsed.answerBody && (
        <div className="rounded-xl border border-emerald-200 bg-white p-3.5">
          <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-1.5">
            <Check aria-hidden className="size-3.5" />
            {parsed.answerHead}
          </p>
          <Md text={parsed.answerBody} className="text-sm text-slate-800" />
        </div>
      )}

      {parsed.wrongs.length > 0 && (
        <div className="rounded-xl border border-rose-200/80 bg-white p-3.5">
          <p className="flex items-center gap-1.5 text-xs font-bold text-rose-800 mb-2">
            <X aria-hidden className="size-3.5" />
            나머지 선택지가 탈락한 이유
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {parsed.wrongs.map((w, i) => (
              <div key={i} className="rounded-lg border border-slate-200 bg-stone-50/80 p-2.5 text-xs leading-relaxed">
                {w.head && (
                  <p className="font-bold text-rose-900 mb-1 flex items-center gap-1">
                    <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700 text-[10px]">✕</span>
                    <span>{w.head}</span>
                  </p>
                )}
                <Md text={w.body} className="text-xs text-slate-700" />
              </div>
            ))}
          </div>
        </div>
      )}

      {parsed.keyPoint && (
        <div className="rounded-xl bg-indigo-950 text-white p-3.5">
          <p className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
            <Sparkles aria-hidden className="size-3.5" />
            머리에 남길 1줄 공식
          </p>
          <Md text={parsed.keyPoint} className="text-sm text-white [&_code]:bg-white/15 [&_code]:text-amber-200 [&_code]:border-0 [&_strong]:text-amber-200" />
        </div>
      )}
    </div>
  );
}

export function QuizCard({ q, storeKey, index }: { q: QuizQ; storeKey: string; index?: number }) {
  const { get } = useProgress();
  const saved = get(storeKey);
  const [picked, setPicked] = useState<number | null>(typeof saved === "number" ? saved : null);
  const [showExp, setShowExp] = useState(typeof saved === "number");
  const done = picked !== null;
  const correct = picked === q.answer;

  function choose(i: number) {
    if (done) return;
    setPicked(i);
    setShowExp(true);
    setProgress(storeKey, i);
  }
  function retry() {
    setPicked(null);
    setShowExp(false);
    setProgress(storeKey, false);
  }

  return (
    <div data-testid="quiz-card" className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="shrink-0 mt-0.5 inline-flex h-7 min-w-7 px-2 items-center justify-center rounded-lg bg-slate-900 text-white text-sm font-bold tnum">
          {q.label ?? (index !== undefined ? index + 1 : "Q")}
        </span>
        <Md text={q.prompt} className="en flex-1 text-[16.5px]" />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {q.choices.map((c, i) => {
          const n = i + 1;
          const isAnswer = done && n === q.answer;
          const isWrongPick = done && n === picked && !correct;
          let cls = "bg-white hover:bg-stone-50 active:translate-y-px";
          if (isAnswer) cls = "bg-emerald-50 text-emerald-900";
          else if (isWrongPick) cls = "bg-rose-50 text-rose-900";
          else if (done) cls = "bg-white opacity-55";
          return (
            <button
              key={i}
              data-testid="choice"
              onClick={() => choose(n)}
              disabled={done}
              aria-label={isAnswer ? `${n}번 정답` : isWrongPick ? `${n}번 내가 고른 오답` : undefined}
              className={"en flex items-start gap-2.5 text-left rounded-xl border border-slate-200 px-3.5 py-3 min-h-11 transition " + cls}
            >
              <span className={"font-sans text-sm font-bold mt-0.5 tnum " + (isAnswer ? "text-emerald-700" : isWrongPick ? "text-rose-700" : "text-slate-400")}>{n}</span>
              <span className="flex-1">{c}</span>
              {isAnswer && <Check aria-hidden className="size-5 shrink-0 text-emerald-700" />}
              {isWrongPick && <X aria-hidden className="size-5 shrink-0 text-rose-700" />}
            </button>
          );
        })}
      </div>
      <div aria-live="polite">
        {done && (
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span
              data-testid="verdict"
              className={"inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-bold " + (correct ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700")}
            >
              {correct ? <Check aria-hidden className="size-4" /> : <X aria-hidden className="size-4" />}
              {correct ? "정답입니다" : `오답입니다. 정답은 ${q.answer}번`}
            </span>
            <button onClick={() => setShowExp((s) => !s)} aria-expanded={showExp} className="inline-flex items-center gap-1 text-sm text-indigo-700 underline-offset-4 hover:underline">
              <BookOpen aria-hidden className="size-4" />
              {showExp ? "해설 접기" : "해설 보기"}
            </button>
            <button onClick={retry} className="inline-flex items-center gap-1 text-sm text-slate-500 underline-offset-4 hover:underline hover:text-slate-800">
              <RotateCcw aria-hidden className="size-3.5" />
              다시 풀기
            </button>
          </div>
        )}
      </div>
      {!done && (
        <button onClick={() => setShowExp((s) => !s)} aria-expanded={showExp} className="mt-4 inline-flex items-center gap-1 text-sm text-slate-500 underline-offset-4 hover:underline hover:text-slate-800">
          <Lightbulb aria-hidden className="size-4" />
          {showExp ? "해설 숨기기" : "모르겠어요, 해설 먼저 보기"}
        </button>
      )}
      {showExp && (
        <div data-testid="explanation" className="reveal mt-4 rounded-xl bg-amber-50 border border-amber-200 p-4 sm:p-5">
          <p className="mb-3 flex items-center gap-1.5 text-sm font-bold text-amber-900">
            <Lightbulb aria-hidden className="size-4" />
            해설{!done && <span className="ml-1 rounded-md bg-amber-100 px-2 py-0.5">정답 {q.answer}번</span>}
          </p>
          <ExplanationView q={q} />
          {q.lessonIds && q.lessonIds.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-amber-200 pt-3 text-sm">
              <span className="text-amber-900">관련 문법 강의</span>
              {q.lessonIds.map((id) => {
                const l = lessonById(id);
                return l ? (
                  <Link key={id} to={`/en/grammar/${id}`} className="rounded-full bg-white px-3 py-1 text-indigo-800 shadow-sm transition hover:bg-indigo-50">
                    {l.title}
                  </Link>
                ) : null;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function useScore(prefix: string, qs: { answer: number }[]) {
  const { get } = useProgress();
  let answered = 0;
  let correct = 0;
  qs.forEach((q, i) => {
    const v = get(`${prefix}${i}`);
    if (typeof v === "number") {
      answered++;
      if (v === q.answer) correct++;
    }
  });
  return { answered, correct, total: qs.length };
}

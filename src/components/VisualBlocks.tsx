import { useEffect, useState } from "react";
import { ArrowRight, Check, Lightbulb, Pause, Play, RefreshCw, Sparkles, X } from "lucide-react";

export interface RoleColor {
  car: string;
  badge: string;
  dot: string;
  label: string;
}

export function roleStyle(role: string): RoleColor {
  const r = role.trim();
  if (/주어|명사|^S$/i.test(r)) {
    return {
      car: "bg-sky-50 border-sky-200 text-sky-950",
      badge: "bg-sky-700 text-white",
      dot: "bg-sky-500",
      label: r,
    };
  }
  if (/동사|조동사|수동|시제|완료|^V$/i.test(r)) {
    return {
      car: "bg-indigo-50 border-indigo-200 text-indigo-950",
      badge: "bg-indigo-700 text-white",
      dot: "bg-indigo-600",
      label: r,
    };
  }
  if (/목적어|^O$|간접목적어|직접목적어/i.test(r)) {
    return {
      car: "bg-emerald-50 border-emerald-200 text-emerald-950",
      badge: "bg-emerald-700 text-white",
      dot: "bg-emerald-500",
      label: r,
    };
  }
  if (/보어|형용사|^C$/i.test(r)) {
    return {
      car: "bg-amber-50 border-amber-200 text-amber-950",
      badge: "bg-amber-700 text-white",
      dot: "bg-amber-500",
      label: r,
    };
  }
  if (/접속|관계|의문|연결/i.test(r)) {
    return {
      car: "bg-rose-50 border-rose-200 text-rose-950",
      badge: "bg-rose-700 text-white",
      dot: "bg-rose-500",
      label: r,
    };
  }
  return {
    car: "bg-stone-100 border-slate-300 text-slate-900",
    badge: "bg-slate-700 text-white",
    dot: "bg-slate-500",
    label: r || "수식어",
  };
}

interface TrainPart {
  en: string;
  role: string;
  ko: string;
}

interface TrainRow {
  parts: TrainPart[];
  fullKo: string;
}

function parseTrainLine(line: string): TrainRow | null {
  const trimmed = line.trim();
  if (!trimmed) return null;
  const [left, fullKo = ""] = trimmed.split(/\s*=>\s*/);
  const parts: TrainPart[] = left
    .split(/\s*\|\s*/)
    .map((seg) => {
      const m = seg.match(/^(.+?)\(([^():]+)(?::([^()]+))?\)$/);
      if (m) {
        return { en: m[1].trim(), role: m[2].trim(), ko: (m[3] ?? "").trim() };
      }
      return { en: seg.trim(), role: "덩어리", ko: "" };
    })
    .filter((p) => p.en.length > 0);
  if (parts.length === 0) return null;
  return { parts, fullKo: fullKo.trim() };
}

export function TrainBlock({ title, body }: { title?: string; body: string }) {
  const rows = body
    .split("\n")
    .map(parseTrainLine)
    .filter((r): r is TrainRow => r !== null);
  const [activeRow, setActiveRow] = useState(0);
  const [step, setStep] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);

  const current = rows[activeRow] ?? rows[0];

  useEffect(() => {
    if (!playing || !current) return;
    const t = setTimeout(() => {
      setStep((s) => {
        const next = s === null ? 0 : s + 1;
        if (next >= current.parts.length) {
          setPlaying(false);
          return null;
        }
        return next;
      });
    }, 950);
    return () => clearTimeout(t);
  }, [playing, step, current]);

  if (!current) return null;

  function startPlay(idx: number) {
    setActiveRow(idx);
    if (playing && activeRow === idx) {
      setPlaying(false);
      setStep(null);
    } else {
      setStep(0);
      setPlaying(true);
    }
  }

  return (
    <div className="my-5 rounded-2xl border border-slate-200 bg-stone-50/80 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-7 items-center justify-center rounded-lg bg-indigo-700 text-white">
            <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth={2}>
              <rect x="2" y="7" width="7" height="9" rx="1.5" />
              <rect x="13" y="7" width="9" height="9" rx="1.5" />
              <path d="M9 12h4M5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM18 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
            </svg>
          </span>
          <p className="text-sm font-bold text-slate-900">{title || "문장 블록 기차"}</p>
        </div>
        <span className="text-xs text-slate-500">칸을 누르거나 재생해 어순을 눈으로 따라가 보세요</span>
      </div>

      <div className="space-y-4">
        {rows.map((row, rIdx) => {
          const isThisRow = activeRow === rIdx && step !== null;
          return (
            <div key={rIdx} className="rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {row.parts.map((p, pIdx) => {
                  const st = roleStyle(p.role);
                  const highlighted = isThisRow && step === pIdx;
                  const dimmed = isThisRow && step !== null && pIdx > step;
                  return (
                    <div key={pIdx} className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setPlaying(false);
                          setActiveRow(rIdx);
                          setStep(activeRow === rIdx && step === pIdx ? null : pIdx);
                        }}
                        className={
                          "group text-left rounded-xl border px-3 py-2 transition duration-200 ease-spring " +
                          st.car +
                          (highlighted ? " train-active ring-2 ring-indigo-600" : "") +
                          (dimmed ? " opacity-45" : "")
                        }
                      >
                        <div className="flex items-center gap-1.5">
                          <span className={"rounded-md px-1.5 py-0.5 text-[11px] font-bold " + st.badge}>{st.label}</span>
                          <span className="text-[11px] text-slate-500 tnum">#{pIdx + 1}</span>
                        </div>
                        <p className="en mt-1 text-[16px] font-bold leading-snug">{p.en}</p>
                        {p.ko && <p className="mt-0.5 text-xs font-medium opacity-85">{p.ko}</p>}
                      </button>
                      {pIdx < row.parts.length - 1 && (
                        <ArrowRight aria-hidden className={"size-4 shrink-0 transition " + (highlighted ? "text-indigo-700 translate-x-0.5" : "text-slate-300")} />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2.5 text-sm">
                <p className="text-slate-700">
                  <span className="mr-1.5 rounded bg-stone-100 px-1.5 py-0.5 text-xs font-semibold text-slate-600">전체 뜻</span>
                  {isThisRow && step !== null
                    ? row.parts
                        .slice(0, step + 1)
                        .map((x) => x.ko || x.en)
                        .join(" → ")
                    : row.fullKo}
                </p>
                <button
                  type="button"
                  onClick={() => startPlay(rIdx)}
                  aria-pressed={playing && activeRow === rIdx}
                  className="inline-flex items-center gap-1 rounded-lg bg-stone-100 px-2.5 py-1 text-xs font-semibold text-slate-800 transition hover:bg-indigo-50 hover:text-indigo-700"
                >
                  {playing && activeRow === rIdx ? <Pause aria-hidden className="size-3.5" /> : <Play aria-hidden className="size-3.5" />}
                  {playing && activeRow === rIdx ? "멈춤" : "한 칸씩 재생"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AnalogyBlock({ title, body }: { title?: string; body: string }) {
  const lines = body
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return (
    <div className="my-5 rounded-2xl border border-indigo-200 bg-indigo-50/65 p-4 sm:p-5">
      <div className="flex items-start gap-3.5">
        <div className="shrink-0 rounded-2xl bg-white p-2.5 text-indigo-700 shadow-xs border border-indigo-100">
          <svg viewBox="0 0 40 40" className="size-9" fill="none">
            <circle cx="20" cy="20" r="16" className="fill-indigo-50 stroke-indigo-600" strokeWidth="2" />
            <path d="M14 22c2-5 10-5 12 0" className="stroke-indigo-700" strokeWidth="2" strokeLinecap="round" />
            <circle cx="15.5" cy="16" r="1.8" className="fill-indigo-700" />
            <circle cx="24.5" cy="16" r="1.8" className="fill-indigo-700" />
            <path d="M20 6v4M9 11l2.5 2.5M31 11l-2.5 2.5" className="stroke-amber-500" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-indigo-700 px-2.5 py-0.5 text-[11px] font-bold text-white">그림 비유</span>
            <h4 className="font-bold text-slate-900 text-[15.5px]">{title || "한눈에 잡히는 비유"}</h4>
          </div>
          <div className="mt-2 space-y-1.5 text-[15px] leading-relaxed text-slate-800">
            {lines.map((l, i) => (
              <p key={i} className="my-0">{renderInlineTokens(l)}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderInlineTokens(text: string) {
  const parts = text.split(/(\[[^\]]+\]|\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((p, i) => {
    if (p.startsWith("[") && p.endsWith("]")) {
      return (
        <span key={i} className="mx-0.5 inline-flex items-center rounded-md bg-white px-2 py-0.5 text-xs font-bold text-indigo-800 border border-indigo-200 shadow-2xs">
          {p.slice(1, -1)}
        </span>
      );
    }
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={i} className="font-bold text-slate-900">{p.slice(2, -2)}</strong>;
    }
    if (p.startsWith("`") && p.endsWith("`")) {
      return <code key={i} className="en rounded bg-white/90 px-1.5 py-0.5 text-[0.92em] font-semibold text-indigo-900 border border-slate-200">{p.slice(1, -1)}</code>;
    }
    return <span key={i}>{p}</span>;
  });
}

export function FormulaBlock({ title, body }: { title?: string; body: string }) {
  const rows = body
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const [picked, setPicked] = useState(0);
  return (
    <div className="my-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex size-6 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
          <Sparkles aria-hidden className="size-3.5" />
        </span>
        <p className="text-sm font-bold text-slate-900">{title || "핵심 블록 공식"}</p>
      </div>
      <div className="space-y-2.5">
        {rows.map((row, idx) => {
          const [lhs, rhs = ""] = row.split(/\s*=>\s*/);
          const pieces = lhs.split(/\s*\+\s*/);
          const active = picked === idx;
          return (
            <button
              type="button"
              key={idx}
              onClick={() => setPicked(idx)}
              className={
                "w-full text-left rounded-xl border p-3 transition " +
                (active ? "border-indigo-300 bg-indigo-50/50" : "border-slate-200 bg-stone-50/60 hover:bg-stone-100/70")
              }
            >
              <div className="flex flex-wrap items-center gap-1.5">
                {pieces.map((pc, pIdx) => (
                  <span key={pIdx} className="inline-flex items-center gap-1.5">
                    <span className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-sm font-bold text-slate-900 shadow-2xs">
                      {pc.trim()}
                    </span>
                    {pIdx < pieces.length - 1 && <span className="font-bold text-indigo-600">+</span>}
                  </span>
                ))}
                {rhs && (
                  <>
                    <ArrowRight aria-hidden className="size-4 text-indigo-700 mx-1 shrink-0" />
                    <span className="rounded-lg bg-amber-100/90 px-2.5 py-1 text-sm font-semibold text-amber-950">
                      {rhs.trim()}
                    </span>
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TransformBlock({ title, body }: { title?: string; body: string }) {
  const items = body
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [before = "", after = "", note = ""] = l.split(/\s*\|\|\s*/);
      return { before, after, note };
    })
    .filter((x) => x.before && x.after);

  const [mode, setMode] = useState<"both" | "before" | "after">("both");

  if (items.length === 0) return null;

  return (
    <div className="my-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
            <RefreshCw aria-hidden className="size-4" />
          </span>
          <p className="text-sm font-bold text-slate-900">{title || "변신 모션 비교"}</p>
        </div>
        <div className="inline-flex rounded-xl bg-stone-100 p-1 text-xs" role="group" aria-label="변신 단계 보기">
          {([
            ["before", "변신 전"],
            ["after", "변신 후"],
            ["both", "한눈에 비교"],
          ] as const).map(([v, label]) => (
            <button
              key={v}
              type="button"
              aria-pressed={mode === v}
              onClick={() => setMode(v)}
              className={
                "rounded-lg px-2.5 py-1 font-semibold transition " +
                (mode === v ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900")
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {items.map((it, idx) => (
          <div key={idx} className="rounded-xl border border-slate-200 bg-stone-50 p-3.5">
            <div className="grid gap-2.5 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              {(mode === "both" || mode === "before") && (
                <div key={"b-" + mode} className="spring-pop rounded-xl border border-slate-200 bg-white p-3">
                  <span className="inline-block rounded bg-stone-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">변신 전</span>
                  <p className="en mt-1.5 text-[15.5px] font-semibold text-slate-900">{renderInlineTokens(it.before)}</p>
                </div>
              )}
              {mode === "both" && (
                <div className="flex justify-center">
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-indigo-700 text-white shadow-xs">
                    <ArrowRight aria-hidden className="size-4 rotate-90 sm:rotate-0" />
                  </span>
                </div>
              )}
              {(mode === "both" || mode === "after") && (
                <div key={"a-" + mode} className="spring-pop rounded-xl border border-indigo-200 bg-indigo-50/70 p-3">
                  <span className="inline-block rounded bg-indigo-700 px-2 py-0.5 text-[11px] font-bold text-white">변신 후</span>
                  <p className="en mt-1.5 text-[15.5px] font-bold text-indigo-950">{renderInlineTokens(it.after)}</p>
                </div>
              )}
            </div>
            {it.note && (
              <p className="mt-2.5 flex items-center gap-1.5 text-xs sm:text-sm text-slate-700">
                <Lightbulb aria-hidden className="size-4 shrink-0 text-amber-600" />
                <span>{renderInlineTokens(it.note)}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function VsBlock({ title, body }: { title?: string; body: string }) {
  const rows = body
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [wrong = "", right = "", why = ""] = l.split(/\s*\|\|\s*/);
      return { wrong, right, why };
    })
    .filter((r) => r.wrong && r.right);

  if (rows.length === 0) return null;

  return (
    <div className="my-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex size-6 items-center justify-center rounded-lg bg-rose-50 text-rose-700 font-bold text-xs">OX</span>
        <p className="text-sm font-bold text-slate-900">{title || "자주 헷갈리는 함정 O / X 비교"}</p>
      </div>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-stone-50/70 p-3.5">
            <div className="grid gap-2.5 sm:grid-cols-2">
              <div className="flex items-start gap-2.5 rounded-xl bg-rose-50/80 border border-rose-200/80 p-3 text-rose-950">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white">
                  <X aria-hidden className="size-3.5" />
                </span>
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-rose-700">틀린 표현</span>
                  <p className="en text-[15px] font-semibold leading-snug">{renderInlineTokens(r.wrong)}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 p-3 text-emerald-950">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <Check aria-hidden className="size-3.5" />
                </span>
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-emerald-700">맞는 표현</span>
                  <p className="en text-[15px] font-bold leading-snug">{renderInlineTokens(r.right)}</p>
                </div>
              </div>
            </div>
            {r.why && (
              <p className="mt-2.5 text-xs sm:text-sm text-slate-700 pl-1">
                <strong className="text-slate-900 mr-1.5">왜 그럴까?</strong>
                {renderInlineTokens(r.why)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function StepsBlock({ title, body }: { title?: string; body: string }) {
  const steps = body
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [head = "", desc = "", ex = ""] = l.split(/\s*\|\s*/);
      return { head: head.replace(/^\d+\.\s*/, ""), desc, ex };
    });
  const [active, setActive] = useState(0);

  if (steps.length === 0) return null;

  return (
    <div className="my-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
      {title && <p className="text-sm font-bold text-slate-900 mb-3">{title}</p>}
      <div className="grid gap-2.5 sm:grid-cols-3">
        {steps.map((s, i) => {
          const isCur = active === i;
          return (
            <button
              type="button"
              key={i}
              onClick={() => setActive(i)}
              className={
                "text-left rounded-xl border p-3.5 transition duration-200 ease-spring " +
                (isCur ? "border-indigo-300 bg-indigo-50/70 train-active" : "border-slate-200 bg-stone-50/70 hover:bg-stone-100")
              }
            >
              <div className="flex items-center justify-between">
                <span className={"inline-flex size-6 items-center justify-center rounded-full text-xs font-bold tnum " + (isCur ? "bg-indigo-700 text-white" : "bg-slate-800 text-white")}>
                  {i + 1}
                </span>
                {i < steps.length - 1 && <ArrowRight aria-hidden className="hidden sm:block size-4 text-slate-400" />}
              </div>
              <p className="mt-2 font-bold text-slate-900 text-sm">{s.head}</p>
              {s.desc && <p className="mt-1 text-xs sm:text-[13.5px] text-slate-700 leading-relaxed">{renderInlineTokens(s.desc)}</p>}
              {s.ex && <p className="en mt-2 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold text-indigo-900 border border-slate-200">{renderInlineTokens(s.ex)}</p>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SlashPlayer({ slash, ko }: { slash: string; ko: string }) {
  const chunks = slash
    .split(/\s*\/\s*/)
    .map((c) => c.trim())
    .filter(Boolean);
  const [idx, setIdx] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      setIdx((cur) => {
        const next = cur === null ? 0 : cur + 1;
        if (next >= chunks.length) {
          setPlaying(false);
          return null;
        }
        return next;
      });
    }, 900);
    return () => clearTimeout(t);
  }, [playing, idx, chunks.length]);

  return (
    <div className="rounded-xl border border-slate-200 bg-stone-50 p-3.5">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="text-xs font-bold text-indigo-800">끊어 읽기 블록 기차</span>
        <button
          type="button"
          onClick={() => {
            if (playing) {
              setPlaying(false);
              setIdx(null);
            } else {
              setIdx(0);
              setPlaying(true);
            }
          }}
          className="inline-flex items-center gap-1 rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700"
        >
          {playing ? <Pause aria-hidden className="size-3.5" /> : <Play aria-hidden className="size-3.5" />}
          {playing ? "멈춤" : "순서대로 재생"}
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {chunks.map((c, i) => {
          const active = idx === i;
          const passed = idx !== null && i < idx;
          return (
            <span key={i} className="inline-flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  setIdx(idx === i ? null : i);
                }}
                className={
                  "en rounded-lg border px-2.5 py-1.5 text-[15px] transition duration-200 ease-spring text-left " +
                  (active
                    ? "bg-indigo-700 text-white border-indigo-700 train-active font-bold"
                    : passed
                      ? "bg-indigo-50 text-indigo-950 border-indigo-200"
                      : "bg-white text-slate-900 border-slate-200 hover:bg-stone-100")
                }
              >
                <span className={"mr-1.5 font-sans text-[11px] font-bold tnum " + (active ? "text-amber-300" : "text-slate-400")}>{i + 1}</span>
                {c}
              </button>
              {i < chunks.length - 1 && <ArrowRight aria-hidden className="size-3.5 text-slate-300 shrink-0" />}
            </span>
          );
        })}
      </div>
      <p className="mt-2.5 border-t border-slate-200/80 pt-2 text-sm text-slate-800">
        <span className="mr-1.5 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-bold text-amber-900">우리말 뜻</span>
        {ko}
      </p>
    </div>
  );
}

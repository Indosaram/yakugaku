import type { Tier } from "../data/remote";

const STYLE: Record<Tier, string> = {
  필수: "bg-rose-50 text-rose-700 ring-rose-200",
  권장: "bg-amber-50 text-amber-800 ring-amber-200",
  패스: "bg-stone-100 text-slate-500 ring-slate-200",
};

export function TierBadge({ tier, title }: { tier?: Tier; title?: string }) {
  if (!tier) return null;
  return (
    <span title={title} className={"inline-flex shrink-0 items-center rounded-md px-1.5 py-0.5 text-[11px] font-bold ring-1 " + STYLE[tier]}>
      {tier}
    </span>
  );
}

export function TierFilter({ value, onChange }: { value: Tier | "전체"; onChange: (v: Tier | "전체") => void }) {
  const items: (Tier | "전체")[] = ["전체", "필수", "권장", "패스"];
  return (
    <div className="inline-flex rounded-xl bg-stone-200/70 p-1 text-sm" role="group" aria-label="난이도 필터">
      {items.map((t) => (
        <button
          key={t}
          aria-pressed={value === t}
          onClick={() => onChange(t)}
          className={"rounded-lg px-3 py-1.5 transition " + (value === t ? "bg-white font-semibold text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900")}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export function TierLegend() {
  return (
    <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
      <span className="inline-flex items-center gap-1.5"><TierBadge tier="필수" />호시 기출에 반복 출제</span>
      <span className="inline-flex items-center gap-1.5"><TierBadge tier="권장" />가끔 출제·기초 이해용</span>
      <span className="inline-flex items-center gap-1.5"><TierBadge tier="패스" />출제 범위 밖·과하게 어려움</span>
    </p>
  );
}

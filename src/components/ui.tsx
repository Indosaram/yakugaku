import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function PageTitle({ kicker, title, children }: { kicker?: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-8">
      {kicker && <p className="text-sm font-semibold text-indigo-700">{kicker}</p>}
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">{title}</h1>
      {children && <div className="mt-3 max-w-3xl text-slate-600 leading-relaxed">{children}</div>}
    </div>
  );
}

export function Card({ to, title, desc, badge, extra }: { to: string; title: string; desc?: string; badge?: string; extra?: ReactNode }) {
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0"
    >
      {badge && <span className="self-start rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-0.5 mb-2">{badge}</span>}
      <h3 className="font-semibold text-slate-900 flex items-start gap-1">
        <span className="flex-1">{title}</span>
        <ArrowRight aria-hidden className="size-4 mt-1 shrink-0 text-slate-300 transition group-hover:text-indigo-700 group-hover:translate-x-0.5" />
      </h3>
      {desc && <p className="mt-1 text-sm text-slate-600 leading-relaxed">{desc}</p>}
      {extra && <div className="mt-auto pt-3">{extra}</div>}
    </Link>
  );
}

export function Bar({ value, total, label }: { value: number; total: number; label?: string }) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  return (
    <div className="mt-3">
      <div className="h-2 rounded-full bg-stone-200 overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label ?? "진도"}>
        <div className="h-full rounded-full bg-emerald-500 transition-[width] duration-300" style={{ width: pct + "%" }} />
      </div>
      <p className="mt-1 text-xs text-slate-500 tnum">{label ? `${label} ` : ""}{value} / {total} ({pct}%)</p>
    </div>
  );
}

export function Segmented<T extends string>({ value, onChange, items }: { value: T; onChange: (v: T) => void; items: { value: T; label: ReactNode }[] }) {
  return (
    <div className="inline-flex rounded-xl bg-stone-200/70 p-1 text-sm" role="group">
      {items.map((it) => (
        <button
          key={it.value}
          aria-pressed={value === it.value}
          onClick={() => onChange(it.value)}
          className={
            "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition " +
            (value === it.value ? "bg-white text-slate-900 shadow-sm font-semibold" : "text-slate-600 hover:text-slate-900")
          }
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

export const btn = {
  primary: "inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-800 active:translate-y-px",
  secondary: "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 transition hover:bg-stone-100 active:translate-y-px",
  dark: "inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 active:translate-y-px",
  link: "inline-flex items-center gap-1 text-sm text-indigo-700 underline-offset-4 hover:underline",
};

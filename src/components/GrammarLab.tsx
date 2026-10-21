import { useState } from "react";
import { ArrowRight, Check, Eye, EyeOff, Play, RefreshCw, Sparkles, X } from "lucide-react";
import { roleStyle } from "./VisualBlocks";

interface LabSpec {
  badge: string;
  title: string;
  subtitle: string;
  render: () => React.ReactNode;
}

function WordRoleScanner() {
  const words = [
    { w: "The", role: "관사", ko: "그 (명사 앞 모자)", why: "뒤에 오는 명사(nurse)를 가리킵니다." },
    { w: "careful", role: "형용사", ko: "조심스러운", why: "명사 nurse가 어떤 사람인지 꾸며 줍니다." },
    { w: "nurse", role: "명사", ko: "간호사는", why: "사람의 이름표입니다. 문장의 주인공(주어)이 됩니다." },
    { w: "checks", role: "동사", ko: "확인한다", why: "주인공이 하는 행동입니다." },
    { w: "the", role: "관사", ko: "그", why: "뒤의 명사(dose)와 한 덩어리를 만듭니다." },
    { w: "dose", role: "명사", ko: "복용량을", why: "행동(checks)의 대상이 되는 이름표입니다." },
    { w: "slowly", role: "부사", ko: "천천히", why: "어떻게 확인하는지 동사(checks)를 꾸며 줍니다." },
    { w: "in", role: "전치사", ko: "~안에서", why: "뒤 명사(the ward)와 합쳐 장소를 나타냅니다." },
    { w: "the ward.", role: "명사", ko: "병동", why: "전치사 in 뒤에 붙는 장소 이름입니다." },
  ];
  const [idx, setIdx] = useState(2);
  const cur = words[idx];
  const st = roleStyle(cur.role);
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-xl bg-stone-50 p-3.5 border border-slate-200">
        {words.map((it, i) => {
          const active = idx === i;
          const s = roleStyle(it.role);
          return (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              className={
                "rounded-xl border px-3 py-2 text-left transition duration-200 ease-spring " +
                (active ? s.car + " train-active ring-2 ring-indigo-600" : "bg-white border-slate-200 hover:bg-stone-100")
              }
            >
              <span className={"block rounded px-1.5 py-0.5 text-[10px] font-bold w-fit " + s.badge}>{it.role}</span>
              <span className="en mt-1 block text-base font-bold text-slate-900">{it.w}</span>
            </button>
          );
        })}
      </div>
      <div key={idx} className={"spring-pop mt-3 rounded-xl border p-4 " + st.car}>
        <div className="flex flex-wrap items-center gap-2">
          <span className={"rounded-md px-2 py-0.5 text-xs font-bold " + st.badge}>{cur.role}</span>
          <span className="en font-bold text-lg">{cur.w}</span>
          <span className="text-sm font-semibold opacity-85">= {cur.ko}</span>
        </div>
        <p className="mt-1.5 text-sm">{cur.why}</p>
      </div>
    </div>
  );
}

function SkeletonPeeler() {
  const [hideMod, setHideMod] = useState(false);
  const parts = [
    { en: "Every morning,", role: "수식어", ko: "매일 아침 (시간)", mod: true },
    { en: "the patient", role: "주어", ko: "환자는 (주인공)", mod: false },
    { en: "in room 3", role: "수식어", ko: "3호실에 있는 (장소)", mod: true },
    { en: "takes", role: "동사", ko: "복용한다 (행동)", mod: false },
    { en: "two tablets", role: "목적어", ko: "정제 두 알을 (대상)", mod: false },
    { en: "after meals.", role: "수식어", ko: "식사 후에 (시간)", mod: true },
  ];
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <p className="text-xs text-slate-600">거품(수식어)을 걷어 내면 문장의 진짜 뼈대 3조각만 남습니다.</p>
        <button
          type="button"
          onClick={() => setHideMod((v) => !v)}
          aria-pressed={hideMod}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-700 px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-indigo-800"
        >
          {hideMod ? <Eye aria-hidden className="size-3.5" /> : <EyeOff aria-hidden className="size-3.5" />}
          {hideMod ? "수식어 다시 붙이기" : "수식어 거품 걷어 내기"}
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2 rounded-xl bg-stone-50 p-3.5 border border-slate-200">
        {parts.map((p, i) => {
          const st = roleStyle(p.role);
          const faded = hideMod && p.mod;
          return (
            <div
              key={i}
              className={
                "rounded-xl border px-3 py-2 transition duration-300 ease-spring " +
                st.car +
                (faded ? " opacity-20 scale-95 line-through" : " shadow-2xs")
              }
            >
              <span className={"inline-block rounded px-1.5 py-0.5 text-[10px] font-bold " + st.badge}>{p.role}</span>
              <p className="en mt-1 text-[15px] font-bold">{p.en}</p>
              <p className="text-xs opacity-80">{p.ko}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FivePatternSwitcher() {
  const patterns = [
    {
      name: "1형식 (S + V)",
      rule: "주어 혼자 움직여도 말이 끝남",
      rel: "주어 → 동사 (뒤에 대상을 안 붙임)",
      cars: [
        { en: "The pain", role: "주어", ko: "통증이" },
        { en: "disappeared", role: "동사", ko: "사라졌다" },
        { en: "quickly.", role: "수식어", ko: "빠르게 (덤)" },
      ],
    },
    {
      name: "2형식 (S + V + C)",
      rule: "주어 = 보어 (주어가 어떤 상태인지 설명)",
      rel: "주어(The drug) = 보어(safe)",
      cars: [
        { en: "The drug", role: "주어", ko: "그 약은" },
        { en: "is", role: "동사", ko: "~이다" },
        { en: "safe.", role: "보어", ko: "안전한 (주어 상태)" },
      ],
    },
    {
      name: "3형식 (S + V + O)",
      rule: "동사의 행동이 목적어(대상)를 향함",
      rel: "주어(The tablet) ≠ 목적어(pain)",
      cars: [
        { en: "The tablet", role: "주어", ko: "그 정제는" },
        { en: "reduces", role: "동사", ko: "줄인다" },
        { en: "pain.", role: "목적어", ko: "통증을 (대상)" },
      ],
    },
    {
      name: "4형식 (S + V + IO + DO)",
      rule: "누구에게(IO) + 무엇을(DO) 주다",
      rel: "사람(the patient) + 물건(a pill) 연달아 두 개",
      cars: [
        { en: "The nurse", role: "주어", ko: "간호사는" },
        { en: "gave", role: "동사", ko: "주었다" },
        { en: "the patient", role: "목적어", ko: "환자에게 (누구에게)" },
        { en: "a pill.", role: "목적어", ko: "알약 하나를 (무엇을)" },
      ],
    },
    {
      name: "5형식 (S + V + O + C)",
      rule: "목적어 = 목적격보어 (목적어가 어떤 상태가 됨)",
      rel: "목적어(the patient) = 보어(drowsy)",
      cars: [
        { en: "This medicine", role: "주어", ko: "이 약은" },
        { en: "makes", role: "동사", ko: "만든다" },
        { en: "the patient", role: "목적어", ko: "환자를" },
        { en: "drowsy.", role: "보어", ko: "졸리게 (환자 상태)" },
      ],
    },
  ];
  const [idx, setIdx] = useState(1);
  const p = patterns[idx];
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {patterns.map((it, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={idx === i}
            onClick={() => setIdx(i)}
            className={
              "rounded-xl px-3 py-1.5 text-xs font-bold transition " +
              (idx === i ? "bg-indigo-700 text-white shadow-xs" : "bg-stone-100 text-slate-700 hover:bg-stone-200")
            }
          >
            {it.name}
          </button>
        ))}
      </div>
      <div key={idx} className="spring-pop rounded-xl border border-slate-200 bg-stone-50 p-4">
        <div className="flex flex-wrap items-center gap-2">
          {p.cars.map((c, i) => {
            const st = roleStyle(c.role);
            return (
              <div key={i} className="flex items-center gap-2">
                <div className={"rounded-xl border px-3.5 py-2.5 " + st.car}>
                  <span className={"rounded px-1.5 py-0.5 text-[10px] font-bold " + st.badge}>{c.role}</span>
                  <p className="en mt-1 text-base font-bold">{c.en}</p>
                  <p className="text-xs opacity-85">{c.ko}</p>
                </div>
                {i < p.cars.length - 1 && <ArrowRight aria-hidden className="size-4 text-slate-400" />}
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-2.5 text-xs sm:text-sm">
          <span className="font-bold text-indigo-900">{p.rule}</span>
          <span className="rounded-lg bg-amber-100 px-2.5 py-1 font-semibold text-amber-950">{p.rel}</span>
        </div>
      </div>
    </div>
  );
}

function BeVsVerbTransformer() {
  const [kind, setKind] = useState<"be" | "do">("be");
  const [form, setForm] = useState<"aff" | "neg" | "q">("aff");
  const data = {
    be: {
      aff: { blocks: ["The pill", "is", "safe."], note: "be동사(is)가 주어 뒤에 그대로 서 있습니다." },
      neg: { blocks: ["The pill", "is", "not", "safe."], note: "be동사 바로 뒤에 not만 붙이면 끝납니다." },
      q: { blocks: ["Is", "the pill", "safe?"], note: "be동사(Is)가 직접 주어 앞으로 뛰어 나갑니다!" },
    },
    do: {
      aff: { blocks: ["She", "takes", "medicine."], note: "일반동사(takes)는 움직이지 않는 무거운 엔진입니다." },
      neg: { blocks: ["She", "does not", "take", "medicine."], note: "도우미 does not이 오고, takes의 -s가 빠져 원형(take)이 됩니다!" },
      q: { blocks: ["Does", "she", "take", "medicine?"], note: "도우미 Does가 맨 앞으로 나가고, 뒤 동사는 원형(take)이 됩니다!" },
    },
  }[kind][form];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <div className="inline-flex rounded-xl bg-stone-100 p-1 text-xs">
          <button type="button" onClick={() => setKind("be")} aria-pressed={kind === "be"} className={"rounded-lg px-3 py-1 font-bold " + (kind === "be" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600")}>be동사 (직접 이동)</button>
          <button type="button" onClick={() => setKind("do")} aria-pressed={kind === "do"} className={"rounded-lg px-3 py-1 font-bold " + (kind === "do" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600")}>일반동사 (도우미 do 출동)</button>
        </div>
        <div className="inline-flex rounded-xl bg-stone-100 p-1 text-xs">
          {([
            ["aff", "평서문"],
            ["neg", "부정문 (아니다)"],
            ["q", "의문문 (질문)"],
          ] as const).map(([k, lb]) => (
            <button key={k} type="button" onClick={() => setForm(k)} aria-pressed={form === k} className={"rounded-lg px-2.5 py-1 font-bold " + (form === k ? "bg-indigo-700 text-white" : "text-slate-600")}>{lb}</button>
          ))}
        </div>
      </div>
      <div key={kind + form} className="spring-pop rounded-xl border border-slate-200 bg-stone-50 p-4">
        <div className="flex flex-wrap items-center gap-2">
          {data.blocks.map((b, i) => {
            const highlight = /is|Is|does|Does|take|takes|not/.test(b);
            return (
              <span
                key={i}
                className={
                  "en rounded-xl border px-3.5 py-2 text-lg font-bold " +
                  (highlight ? "bg-indigo-700 text-white border-indigo-700" : "bg-white text-slate-900 border-slate-200")
                }
              >
                {b}
              </span>
            );
          })}
        </div>
        <p className="mt-3 text-sm font-medium text-slate-800">{data.note}</p>
      </div>
    </div>
  );
}

function CountableLab() {
  const [tab, setTab] = useState<"count" | "uncount">("count");
  return (
    <div>
      <div className="inline-flex rounded-xl bg-stone-100 p-1 text-xs mb-3">
        <button type="button" onClick={() => setTab("count")} aria-pressed={tab === "count"} className={"rounded-lg px-3 py-1.5 font-bold " + (tab === "count" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600")}>셀 수 있는 명사 (알약 1개, 2개)</button>
        <button type="button" onClick={() => setTab("uncount")} aria-pressed={tab === "uncount"} className={"rounded-lg px-3 py-1.5 font-bold " + (tab === "uncount" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600")}>셀 수 없는 명사 (물·정보·조언)</button>
      </div>
      {tab === "count" ? (
        <div key="c" className="spring-pop grid gap-3 sm:grid-cols-[120px_1fr] items-center rounded-xl border border-sky-200 bg-sky-50/70 p-4">
          <svg viewBox="0 0 100 70" className="w-28 h-20 mx-auto">
            <rect x="10" y="20" width="22" height="32" rx="11" className="fill-white stroke-sky-700" strokeWidth="2.5" />
            <line x1="10" y1="36" x2="32" y2="36" className="stroke-sky-700" strokeWidth="2" />
            <rect x="40" y="20" width="22" height="32" rx="11" className="fill-sky-200 stroke-sky-700" strokeWidth="2.5" />
            <line x1="40" y1="36" x2="62" y2="36" className="stroke-sky-700" strokeWidth="2" />
            <rect x="70" y="20" width="22" height="32" rx="11" className="fill-white stroke-sky-700" strokeWidth="2.5" />
            <line x1="70" y1="36" x2="92" y2="36" className="stroke-sky-700" strokeWidth="2" />
          </svg>
          <div className="text-sm space-y-1.5">
            <p className="font-bold text-sky-950">경계가 뚜렷해 하나씩 손가락으로 셀 수 있는 것</p>
            <p className="en font-semibold text-sky-900">a tablet / two tablets / many patients / a few side effects</p>
            <p className="text-xs text-slate-700">하나일 땐 <strong>a / an</strong>을 붙이고, 여럿일 땐 뒤에 <strong>-s</strong>를 붙입니다. 짝꿍 수량어는 <strong>many, few, a few</strong>입니다.</p>
          </div>
        </div>
      ) : (
        <div key="u" className="spring-pop grid gap-3 sm:grid-cols-[120px_1fr] items-center rounded-xl border border-amber-200 bg-amber-50/70 p-4">
          <svg viewBox="0 0 100 70" className="w-28 h-20 mx-auto">
            <path d="M25 12h50l-6 46a6 6 0 0 1-6 5H37a6 6 0 0 1-6-5L25 12Z" className="fill-white stroke-amber-700" strokeWidth="2.5" />
            <path d="M28 34c10-4 15 4 24 0s12-4 20 0l-3 24H31l-3-24Z" className="fill-amber-300/80" />
          </svg>
          <div className="text-sm space-y-1.5">
            <p className="font-bold text-amber-950">액체·가루·머릿속 개념이라 1개, 2개로 쪼갤 수 없는 것</p>
            <p className="en font-semibold text-amber-900">water / information / advice / equipment / research</p>
            <p className="text-xs text-slate-700">앞에 <strong>a / an 금지</strong>, 뒤에 <strong>-s 금지</strong>! 항상 단수 취급(<strong>is</strong>)하며 짝꿍은 <strong>much, little, a piece of</strong>입니다.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function TimelineSlider({ mode }: { mode: "tense" | "perfect" }) {
  const items =
    mode === "tense"
      ? [
          { label: "과거 (Yesterday)", x: 20, span: false, en: "She took the pill yesterday.", ko: "어제 끝난 점 하나 → 과거형 took" },
          { label: "평소·규칙 (Every day)", x: 50, span: true, en: "She takes the pill every day.", ko: "어제도·오늘도·내일도 반복 → 현재형 takes" },
          { label: "지금 진행 (Right now)", x: 50, span: false, en: "She is taking the pill now.", ko: "지금 이 순간 하는 중 → be + -ing" },
          { label: "미래 (Tomorrow)", x: 82, span: false, en: "She will take the pill tomorrow.", ko: "앞으로 일어날 일 → will + 동사원형" },
        ]
      : [
          { label: "과거시제 (단절된 점)", x: 22, span: false, en: "He lost his prescription yesterday.", ko: "어제 잃어버렸다는 과거 사실만 말함 (지금 찾았는지는 모름)" },
          { label: "현재완료 have + p.p.", x: 52, span: true, en: "He has lived in Tokyo for 5 years.", ko: "과거(5년 전)부터 지금(현재)까지 선으로 쭉 이어짐!" },
          { label: "과거완료 had + p.p.", x: 35, span: true, en: "The pain had stopped before the doctor arrived.", ko: "과거(의사 도착)보다 한 칸 더 먼저(대과거) 일어난 일!" },
        ];
  const [idx, setIdx] = useState(mode === "perfect" ? 1 : 0);
  const cur = items[idx];

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {items.map((it, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(i)}
            aria-pressed={idx === i}
            className={"rounded-xl px-3 py-1.5 text-xs font-bold transition " + (idx === i ? "bg-indigo-700 text-white" : "bg-stone-100 text-slate-700 hover:bg-stone-200")}
          >
            {it.label}
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-slate-200 bg-stone-50 p-4">
        <svg viewBox="0 0 320 68" className="w-full h-16">
          <line x1="20" y1="36" x2="300" y2="36" className="stroke-slate-300" strokeWidth="3" strokeLinecap="round" />
          <circle cx="70" cy="36" r="4" className="fill-slate-400" />
          <text x="70" y="58" textAnchor="middle" className="fill-slate-500 text-[10px] font-bold">과거</text>
          <circle cx="165" cy="36" r="4" className="fill-slate-400" />
          <text x="165" y="58" textAnchor="middle" className="fill-slate-500 text-[10px] font-bold">현재(Now)</text>
          <circle cx="265" cy="36" r="4" className="fill-slate-400" />
          <text x="265" y="58" textAnchor="middle" className="fill-slate-500 text-[10px] font-bold">미래</text>
          {cur.span && mode === "perfect" && (
            <rect x={idx === 1 ? 70 : 30} y="31" width={idx === 1 ? 95 : 40} height="10" rx="5" className="fill-indigo-500/40" />
          )}
          {cur.span && mode === "tense" && (
            <line x1="45" y1="36" x2="280" y2="36" className="stroke-indigo-500" strokeWidth="4" strokeDasharray="6 6" />
          )}
          <circle cx={cur.x * 3} cy="36" r="9" className="fill-indigo-700 transition-all duration-300" />
          <circle cx={cur.x * 3} cy="36" r="4" className="fill-amber-300 transition-all duration-300" />
        </svg>
        <div key={idx} className="spring-pop mt-2 rounded-lg bg-white p-3 border border-slate-200">
          <p className="en font-bold text-slate-900 text-base">{cur.en}</p>
          <p className="mt-1 text-xs sm:text-sm text-indigo-900 font-medium">{cur.ko}</p>
        </div>
      </div>
    </div>
  );
}

function AuxGaugeLab() {
  const [past, setPast] = useState(false);
  const levels = [
    { aux: "must", pct: 95, ko: "틀림없이 ~임에 틀림없다", pastKo: "틀림없이 ~였음에 틀림없다" },
    { aux: "should", pct: 75, ko: "마땅히 ~해야 한다", pastKo: "~했어야 했는데 (안 해서 후회!)" },
    { aux: "may", pct: 50, ko: "~일지도 모른다 (반반)", pastKo: "~였을지도 모른다" },
    { aux: "cannot", pct: 5, ko: "절대 ~일 리가 없다", pastKo: "절대 ~였을 리가 없다" },
  ];
  const [idx, setIdx] = useState(0);
  const cur = levels[idx];
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap gap-1.5">
          {levels.map((l, i) => (
            <button key={l.aux} type="button" onClick={() => setIdx(i)} aria-pressed={idx === i} className={"en rounded-xl px-3 py-1.5 text-xs font-bold " + (idx === i ? "bg-indigo-700 text-white" : "bg-stone-100 text-slate-800")}>{l.aux}</button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setPast((p) => !p)}
          aria-pressed={past}
          className={"rounded-xl px-3 py-1.5 text-xs font-bold transition " + (past ? "bg-amber-600 text-white" : "bg-stone-200 text-slate-800")}
        >
          {past ? "과거 이야기 (조동사 + have p.p.)" : "현재 이야기 (조동사 + 동사원형)"}
        </button>
      </div>
      <div className="rounded-xl border border-slate-200 bg-stone-50 p-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1">
          <span>확신도 계기판</span>
          <span className="tnum text-indigo-700">{cur.pct}%</span>
        </div>
        <div className="h-3 rounded-full bg-stone-200 overflow-hidden">
          <div className="h-full rounded-full bg-indigo-600 transition-all duration-300" style={{ width: `${cur.pct}%` }} />
        </div>
        <div key={cur.aux + String(past)} className="spring-pop mt-3 rounded-lg bg-white border border-slate-200 p-3">
          <p className="en text-base font-bold text-slate-900">
            The patient <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-indigo-900">{past ? `${cur.aux} have taken` : `${cur.aux} take`}</span> the medicine.
          </p>
          <p className="mt-1 text-sm font-semibold text-amber-900">{past ? cur.pastKo : cur.ko}</p>
        </div>
      </div>
    </div>
  );
}

function PassiveSwapLab() {
  const [passive, setPassive] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs text-slate-600">버튼을 눌러 주어와 목적어가 X자로 자리를 바꾸는 모습을 보세요.</span>
        <button
          type="button"
          onClick={() => setPassive((p) => !p)}
          aria-pressed={passive}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-700 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-indigo-800"
        >
          <RefreshCw aria-hidden className="size-3.5" />
          {passive ? "능동태(원래 문장)로 되돌리기" : "수동태(당하는 문장)로 바꾸기"}
        </button>
      </div>
      <div key={String(passive)} className="spring-pop rounded-xl border border-slate-200 bg-stone-50 p-4">
        <div className="flex flex-wrap items-center gap-2">
          {!passive ? (
            <>
              <div className="rounded-xl border border-sky-200 bg-sky-50 px-3.5 py-2.5">
                <span className="rounded bg-sky-700 px-1.5 py-0.5 text-[10px] font-bold text-white">주어 (한 사람)</span>
                <p className="en mt-1 font-bold text-base">Scientists</p>
                <p className="text-xs text-sky-900">과학자들이</p>
              </div>
              <ArrowRight aria-hidden className="size-4 text-slate-400" />
              <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-2.5">
                <span className="rounded bg-indigo-700 px-1.5 py-0.5 text-[10px] font-bold text-white">능동 동사</span>
                <p className="en mt-1 font-bold text-base">developed</p>
                <p className="text-xs text-indigo-900">개발했다</p>
              </div>
              <ArrowRight aria-hidden className="size-4 text-slate-400" />
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5">
                <span className="rounded bg-emerald-700 px-1.5 py-0.5 text-[10px] font-bold text-white">목적어 (대상)</span>
                <p className="en mt-1 font-bold text-base">this vaccine.</p>
                <p className="text-xs text-emerald-900">이 백신을</p>
              </div>
            </>
          ) : (
            <>
              <div className="rounded-xl border-2 border-emerald-400 bg-emerald-50 px-3.5 py-2.5">
                <span className="rounded bg-emerald-700 px-1.5 py-0.5 text-[10px] font-bold text-white">새 주어 (앞으로 이동!)</span>
                <p className="en mt-1 font-bold text-base">This vaccine</p>
                <p className="text-xs text-emerald-900">이 백신은</p>
              </div>
              <ArrowRight aria-hidden className="size-4 text-indigo-600" />
              <div className="rounded-xl border-2 border-indigo-400 bg-indigo-50 px-3.5 py-2.5">
                <span className="rounded bg-indigo-700 px-1.5 py-0.5 text-[10px] font-bold text-white">be + p.p. (수동태)</span>
                <p className="en mt-1 font-bold text-base">was developed</p>
                <p className="text-xs text-indigo-900">개발되었다</p>
              </div>
              <ArrowRight aria-hidden className="size-4 text-indigo-600" />
              <div className="rounded-xl border border-sky-200 bg-sky-50 px-3.5 py-2.5">
                <span className="rounded bg-sky-700 px-1.5 py-0.5 text-[10px] font-bold text-white">by + 행위자 (뒤로 이동!)</span>
                <p className="en mt-1 font-bold text-base">by scientists.</p>
                <p className="text-xs text-sky-900">과학자들에 의해</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PrepositionMapLab() {
  const spots = [
    { prep: "in", ko: "상자 안에 둘러싸여", cx: 70, cy: 52 },
    { prep: "on", ko: "표면 위에 딱 붙어", cx: 70, cy: 22 },
    { prep: "at", ko: "한 지점을 콕 찍어", cx: 120, cy: 52 },
    { prep: "through", ko: "통로를 관통하여 통과", cx: 185, cy: 52 },
    { prep: "between", ko: "두 대상(A와 B) 사이에", cx: 260, cy: 52 },
  ];
  const [idx, setIdx] = useState(0);
  const cur = spots[idx];
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {spots.map((s, i) => (
          <button key={s.prep} type="button" onClick={() => setIdx(i)} aria-pressed={idx === i} className={"en rounded-xl px-3 py-1.5 text-xs font-bold " + (idx === i ? "bg-indigo-700 text-white" : "bg-stone-100 text-slate-800")}>{s.prep}</button>
        ))}
      </div>
      <div className="rounded-xl border border-slate-200 bg-stone-50 p-4">
        <svg viewBox="0 0 320 90" className="w-full h-24">
          <rect x="45" y="28" width="50" height="44" rx="6" className="fill-white stroke-slate-400" strokeWidth="2" />
          <circle cx="120" cy="52" r="3" className="fill-slate-400" />
          <rect x="160" y="36" width="50" height="30" rx="14" className="fill-white stroke-slate-400" strokeWidth="2" strokeDasharray="4 3" />
          <rect x="235" y="34" width="16" height="34" rx="4" className="fill-slate-200 stroke-slate-400" strokeWidth="1.5" />
          <rect x="270" y="34" width="16" height="34" rx="4" className="fill-slate-200 stroke-slate-400" strokeWidth="1.5" />
          <circle cx={cur.cx} cy={cur.cy} r="9" className="fill-indigo-700 transition-all duration-300" />
          <circle cx={cur.cx} cy={cur.cy} r="4" className="fill-amber-300 transition-all duration-300" />
        </svg>
        <p className="mt-1 text-center text-sm font-bold text-slate-900">
          <span className="en text-indigo-700 mr-2">{cur.prep}</span>
          {cur.ko}
        </p>
      </div>
    </div>
  );
}

function RelativeMergerLab() {
  const [merged, setMerged] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs text-slate-600">두 문장에서 겹치는 단어가 관계대명사(who/which)로 변신해 앞 명사 뒤에 착 달라붙습니다.</span>
        <button
          type="button"
          onClick={() => setMerged((m) => !m)}
          aria-pressed={merged}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-700 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-indigo-800"
        >
          <Sparkles aria-hidden className="size-3.5" />
          {merged ? "합체 전 두 문장으로 분리" : "관계대명사 who로 두 문장 합체!"}
        </button>
      </div>
      <div key={String(merged)} className="spring-pop rounded-xl border border-slate-200 bg-stone-50 p-4">
        {!merged ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="en rounded-xl bg-sky-50 border border-sky-200 px-3 py-2 font-bold">① <u className="decoration-rose-500">The patient</u> recovered.</span>
            <span className="font-bold text-slate-400">+</span>
            <span className="en rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 font-bold">② <u className="decoration-rose-500">He</u> took the new drug.</span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="en rounded-xl bg-sky-50 border border-sky-200 px-3 py-2 font-bold">The patient</span>
            <span className="en rounded-xl bg-indigo-700 text-white px-3 py-2 font-bold shadow-xs">[who took the new drug]</span>
            <span className="en rounded-xl bg-sky-50 border border-sky-200 px-3 py-2 font-bold">recovered.</span>
          </div>
        )}
        <p className="mt-2.5 text-xs sm:text-sm text-slate-700">
          {!merged
            ? "두 문장에 똑같은 사람(The patient = He)이 들어 있습니다."
            : "He가 who로 변신해 [who took the new drug] 덩어리가 되어 The patient 바로 뒤에 끼어든 모습입니다!"}
        </p>
      </div>
    </div>
  );
}

function ComparisonBarLab() {
  const [mode, setMode] = useState<"eq" | "comp" | "sup">("comp");
  const cfg = {
    eq: { a: 60, b: 60, c: 45, en: "Pill A is as effective as Pill B.", ko: "원급 비교: as + 원급 + as (A와 B의 높이가 똑같음)" },
    comp: { a: 82, b: 50, c: 40, en: "Pill A is more effective than Pill B.", ko: "비교급: 비교급 + than (둘 중 A가 더 높음)" },
    sup: { a: 96, b: 55, c: 38, en: "Pill A is the most effective of the three.", ko: "최상급: the + 최상급 + of/in (셋 이상 중 1등)" },
  }[mode];
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {([
          ["eq", "원급 (A = B)"],
          ["comp", "비교급 (A > B)"],
          ["sup", "최상급 (A가 1등)"],
        ] as const).map(([k, lb]) => (
          <button key={k} type="button" onClick={() => setMode(k)} aria-pressed={mode === k} className={"rounded-xl px-3 py-1.5 text-xs font-bold " + (mode === k ? "bg-indigo-700 text-white" : "bg-stone-100 text-slate-700")}>{lb}</button>
        ))}
      </div>
      <div className="rounded-xl border border-slate-200 bg-stone-50 p-4">
        <div className="flex items-end justify-center gap-6 h-24 pt-2">
          {[
            { name: "Pill A", h: cfg.a, hi: true },
            { name: "Pill B", h: cfg.b, hi: mode === "eq" },
            { name: "Pill C", h: cfg.c, hi: false },
          ].map((bar) => (
            <div key={bar.name} className="flex flex-col items-center gap-1 w-16">
              <div className="w-full rounded-t-lg transition-all duration-300 " style={{ height: `${bar.h * 0.7}px`, backgroundColor: bar.hi ? "#4338ca" : "#cbd5e1" }} />
              <span className="en text-xs font-bold text-slate-700">{bar.name}</span>
            </div>
          ))}
        </div>
        <div key={mode} className="spring-pop mt-3 rounded-lg bg-white border border-slate-200 p-3 text-center">
          <p className="en font-bold text-slate-900">{cfg.en}</p>
          <p className="mt-1 text-xs text-indigo-800 font-semibold">{cfg.ko}</p>
        </div>
      </div>
    </div>
  );
}

function WordLegoLab() {
  const prefixes = [
    { p: "pre-", m: "미리·앞에" },
    { p: "anti-", m: "반대·대항" },
    { p: "over-", m: "지나치게" },
    { p: "re-", m: "다시" },
  ];
  const roots = [
    { r: "vent / dict", m: "오다 / 말하다" },
    { r: "bio / body", m: "생명 / 몸" },
    { r: "dose", m: "복용량" },
    { r: "absorb", m: "흡수하다" },
  ];
  const combos = [
    { word: "prevent", parts: ["pre- (미리)", "vent (오다)"], pos: "동사", ko: "미리 막다 · 예방하다" },
    { word: "antibiotic", parts: ["anti- (대항)", "bio (균·생명)", "-tic (형용사/명사)"], pos: "명사", ko: "항생제" },
    { word: "overdose", parts: ["over- (지나치게)", "dose (복용량)"], pos: "명사/동사", ko: "과다 복용(하다)" },
    { word: "reabsorb", parts: ["re- (다시)", "absorb (흡수하다)"], pos: "동사", ko: "재흡수하다" },
  ];
  const [idx, setIdx] = useState(0);
  const c = combos[idx];
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {combos.map((it, i) => (
          <button key={it.word} type="button" onClick={() => setIdx(i)} aria-pressed={idx === i} className={"en rounded-xl px-3 py-1.5 text-xs font-bold " + (idx === i ? "bg-indigo-700 text-white" : "bg-stone-100 text-slate-800")}>
            {it.word} ({ prefixes[i].p } )
          </button>
        ))}
      </div>
      <div key={idx} className="spring-pop rounded-xl border border-slate-200 bg-stone-50 p-4">
        <div className="flex flex-wrap items-center gap-2">
          {c.parts.map((pt, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              <span className="rounded-xl border border-indigo-200 bg-white px-3 py-2 text-sm font-bold text-indigo-950 shadow-2xs">{pt}</span>
              {i < c.parts.length - 1 && <span className="font-bold text-indigo-600">+</span>}
            </span>
          ))}
          <ArrowRight aria-hidden className="size-4 text-indigo-700" />
          <span className="rounded-xl bg-indigo-700 px-3.5 py-2 text-white font-bold">
            <span className="en mr-2">{c.word}</span>
            <span className="text-xs text-amber-200">({c.pos}: {c.ko})</span>
          </span>
        </div>
        <p className="mt-2.5 text-xs text-slate-500">어근({roots[idx].m})에 앞조각({prefixes[idx].m})이 붙어 뜻이 결정됩니다.</p>
      </div>
    </div>
  );
}

function StepSwitchLab({
  tabs,
}: {
  tabs: { label: string; en: string; badge: string; ko: string; tip: string }[];
}) {
  const [idx, setIdx] = useState(0);
  const cur = tabs[idx] ?? tabs[0];
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {tabs.map((t, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(i)}
            aria-pressed={idx === i}
            className={"rounded-xl px-3 py-1.5 text-xs font-bold transition " + (idx === i ? "bg-indigo-700 text-white" : "bg-stone-100 text-slate-700 hover:bg-stone-200")}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div key={idx} className="spring-pop rounded-xl border border-slate-200 bg-stone-50 p-4">
        <span className="inline-block rounded-md bg-indigo-700 px-2 py-0.5 text-[11px] font-bold text-white">{cur.badge}</span>
        <p className="en mt-2 text-lg font-bold text-slate-900">{cur.en}</p>
        <p className="mt-1 text-sm font-semibold text-indigo-950">{cur.ko}</p>
        <p className="mt-2 border-t border-slate-200 pt-2 text-xs sm:text-sm text-slate-700">{cur.tip}</p>
      </div>
    </div>
  );
}

const LABS: Record<string, LabSpec> = {
  "g01-parts-of-speech": {
    badge: "모션 실험실 · 제1강",
    title: "단어 직업 스캐너 — 단어를 눌러 문장 속 역할을 확인하세요",
    subtitle: "영어 단어는 자리에 따라 명사(이름표), 동사(행동), 형용사(명사 꾸미기), 부사(동사 꾸미기) 역할을 맡습니다.",
    render: () => <WordRoleScanner />,
  },
  "g02-sentence-elements": {
    badge: "모션 실험실 · 제2강",
    title: "수식어 거품 걷어 내기 — 문장의 진짜 뼈대만 남겨 보세요",
    subtitle: "긴 의약 문장도 시간·장소 수식어를 잠깐 가리면 [주어 + 동사 + 목적어] 3조각만 남습니다.",
    render: () => <SkeletonPeeler />,
  },
  "g03-five-patterns": {
    badge: "모션 실험실 · 제3강",
    title: "5형식 기차 조립기 — 동사 뒤에 어떤 칸이 붙는지 눌러 보세요",
    subtitle: "1형식부터 5형식까지 버튼을 눌러 기차 칸의 구성이 어떻게 달라지는지 비교해 보세요.",
    render: () => <FivePatternSwitcher />,
  },
  "g04-be-and-verbs": {
    badge: "모션 실험실 · 제4강",
    title: "be동사 vs 일반동사 변신 스위치",
    subtitle: "be동사는 직접 앞으로 나가고, 일반동사는 도우미(do/does/did)를 앞세우고 원형으로 돌아갑니다.",
    render: () => <BeVsVerbTransformer />,
  },
  "g05-nouns-articles-pronouns": {
    badge: "모션 실험실 · 제5강",
    title: "알약(셀 수 있음) vs 물약(셀 수 없음) 구별기",
    subtitle: "셀 수 있는지 없는지에 따라 앞에 붙는 관사(a/the)와 수량 표현(many/much)이 달라집니다.",
    render: () => <CountableLab />,
  },
  "g06-tenses": {
    badge: "모션 실험실 · 제6강",
    title: "시간 수직선 타임머신 — 시점을 눌러 동사 모양을 비교하세요",
    subtitle: "과거의 한 점인지, 평소의 반복인지, 지금 진행 중인지에 따라 동사 모양이 바뀝니다.",
    render: () => <TimelineSlider mode="tense" />,
  },
  "g07-perfect": {
    badge: "모션 실험실 · 제7강",
    title: "점(과거시제) vs 선(완료형) 타임라인",
    subtitle: "과거시제는 이미 끝난 점 하나이고, 완료형(have/had + p.p.)은 두 시점을 잇는 선입니다.",
    render: () => <TimelineSlider mode="perfect" />,
  },
  "g08-auxiliaries": {
    badge: "모션 실험실 · 제8강",
    title: "조동사 확신도 계기판 & 과거 타임머신 (have p.p.)",
    subtitle: "조동사를 누르면 확신도(5%~95%)가 바뀌고, 오른쪽 버튼으로 과거 추측·후회 표현을 확인할 수 있습니다.",
    render: () => <AuxGaugeLab />,
  },
  "g09-passive": {
    badge: "모션 실험실 · 제9강",
    title: "능동태 ↔ 수동태 자리 바꾸기 모션",
    subtitle: "목적어가 주어 자리로 나가면서 동사가 [be동사 + p.p.]로 변신하는 과정을 확인하세요.",
    render: () => <PassiveSwapLab />,
  },
  "g10-adjectives-adverbs": {
    badge: "모션 실험실 · 제10강",
    title: "형용사 vs 부사 — 화살표가 누구를 가리키나요?",
    subtitle: "명사를 꾸미면 형용사, 동사·형용사·문장 전체를 꾸미면 부사(-ly)입니다.",
    render: () => (
      <StepSwitchLab
        tabs={[
          { label: "형용사 → 명사 꾸미기", badge: "형용사 (safe / effective)", en: "a [safe] drug  /  The drug is [safe].", ko: "안전한 약 / 그 약은 안전하다.", tip: "명사(drug) 앞이나 be동사 뒤에서 명사의 상태를 설명할 때는 형용사를 씁니다." },
          { label: "부사 → 동사 꾸미기", badge: "부사 (safely / quickly)", en: "The drug works [quickly] and [safely].", ko: "그 약은 빠르고 안전하게 작용한다.", tip: "동사(works)가 어떻게 작동하는지 꾸밀 때는 -ly가 붙은 부사를 씁니다." },
          { label: "감각동사 뒤 함정!", badge: "feel / look / taste + 형용사", en: "The patient felt [drowsy] (X drowsily).", ko: "환자는 졸린 상태가 되었다.", tip: "해석은 '~하게'여도 주어(환자)의 상태를 설명하므로 형용사(drowsy)가 정답입니다." },
        ]}
      />
    ),
  },
  "g11-prepositions": {
    badge: "모션 실험실 · 제11강",
    title: "전치사 공간 그림 지도",
    subtitle: "전치사를 눌러 파란 점이 상자 안(in), 표면 위(on), 지점(at), 통로(through), 사이(between) 어디에 놓이는지 보세요.",
    render: () => <PrepositionMapLab />,
  },
  "g12-conjunctions": {
    badge: "모션 실험실 · 제12강",
    title: "논리 다리 교체기 — 두 문장을 어떤 관계로 이을까요?",
    subtitle: "원인(because), 양보·반대(although), 조건(if/unless), 전치사(because of/despite)의 차이를 비교하세요.",
    render: () => (
      <StepSwitchLab
        tabs={[
          { label: "원인 → 결과 (because)", badge: "접속사 + 주어 + 동사", en: "[Because] the dose was low, side effects were rare.", ko: "복용량이 적었기 때문에 부작용이 드물었다.", tip: "뒤에 주어(the dose) + 동사(was)가 모두 있으면 접속사 because를 씁니다." },
          { label: "반대인데도 (although)", badge: "양보 접속사 + 주어 + 동사", en: "[Although] the drug is strong, it is safe.", ko: "그 약은 강하지만 안전하다.", tip: "앞뒤 내용이 서로 반대 방향일 때 although / though를 씁니다." },
          { label: "명사만 올 때 (because of / despite)", badge: "전치사 + 명사 덩어리", en: "[Because of] the low dose, side effects were rare.", ko: "적은 복용량 때문에 부작용이 드물었다.", tip: "뒤에 동사가 없이 명사 덩어리(the low dose)만 오면 전치사 because of나 despite를 씁니다." },
        ]}
      />
    ),
  },
  "g13-infinitives": {
    badge: "모션 실험실 · 제13강",
    title: "to부정사 3가지 변신 — 같은 모양이 자리에 따라 뜻이 바뀝니다",
    subtitle: "[to + 동사원형]이 명사 자리, 명사 뒤, 동사 옆에 놓일 때 뜻이 어떻게 바뀌는지 눌러 보세요.",
    render: () => (
      <StepSwitchLab
        tabs={[
          { label: "① 명사 변신 (~하는 것)", badge: "주어·목적어·보어 자리", en: "The doctor decided [to change the dose].", ko: "의사는 [복용량을 바꾸기로] 결정했다.", tip: "decide, want, plan, hope 뒤에서 '~하는 것을' 역할을 합니다." },
          { label: "② 형용사 변신 (~할)", badge: "명사 바로 뒤에서 꾸미기", en: "She has a tablet [to take after dinner].", ko: "그녀는 [저녁 식사 후에 먹을] 정제가 있다.", tip: "앞의 명사(a tablet)를 뒤에서 꾸며 '~할 명사'로 해석합니다." },
          { label: "③ 부사 변신 (~하기 위해)", badge: "목적·이유 덧붙이기", en: "He went to the clinic [to get a vaccine].", ko: "그는 [백신을 맞기 위해] 의원에 갔다.", tip: "완전한 문장 앞이나 뒤에서 왜 그 행동을 했는지 목적(~하기 위해)을 알려 줍니다." },
        ]}
      />
    ),
  },
  "g14-gerunds": {
    badge: "모션 실험실 · 제14강",
    title: "동명사(-ing) vs to부정사 방향 나침반",
    subtitle: "이미 해 본 일·하던 일은 -ing, 앞으로 할 미래의 일은 to부정사와 짝을 이룹니다.",
    render: () => (
      <StepSwitchLab
        tabs={[
          { label: "-ing만 짝꿍 (avoid / enjoy / finish)", badge: "동명사 목적어", en: "Patients should avoid [drinking] alcohol.", ko: "환자는 술 마시는 것을 피해야 한다.", tip: "enjoy, avoid, finish, mind, give up, suggest 뒤에는 항상 -ing가 옵니다." },
          { label: "to만 짝꿍 (want / decide / plan)", badge: "to부정사 목적어", en: "She decided [to rest] at home.", ko: "그녀는 집에서 쉬기로 결정했다.", tip: "미래의 계획·희망을 나타내는 want, decide, plan, expect 뒤에는 to + 동사원형이 옵니다." },
          { label: "전치사 뒤의 to 함정!", badge: "look forward to + -ing", en: "We look forward to [hearing] from you.", ko: "당신에게서 연락받기를 고대합니다.", tip: "여기서 to는 전치사(~을 향해)이므로 뒤에 동사원형이 아니라 명사/동명사(-ing)가 옵니다!" },
        ]}
      />
    ),
  },
  "g15-participles": {
    badge: "모션 실험실 · 제15강",
    title: "현재분사(-ing) vs 과거분사(p.p.) 화살표 판별기",
    subtitle: "꾸밈을 받는 명사가 직접 행동하면 -ing(능동), 행동을 당하거나 감정을 느끼면 p.p.(수동)입니다.",
    render: () => (
      <StepSwitchLab
        tabs={[
          { label: "명사가 직접 함 → -ing", badge: "능동·진행 (-ing)", en: "[boiling] water  /  an [exciting] result", ko: "팔팔 끓고 있는 물 / 흥미를 주는 결과", tip: "물이 스스로 끓고, 결과가 남에게 흥미를 주므로 -ing를 씁니다." },
          { label: "명사가 당함·느낌 ← p.p.", badge: "수동·완료 (p.p.)", en: "[boiled] water  /  The patient was [relieved].", ko: "끓여진(식힌) 물 / 환자는 안도감을 느꼈다.", tip: "사람이 감정을 느끼게 된 상태(surprised, tired, satisfied, relieved)는 모두 p.p.입니다!" },
          { label: "분사구문 (접속사 줄이기)", badge: "When S + V → V-ing", en: "[Taking] the pill, she felt much better.", ko: "그 알약을 복용했을 때, 그녀는 한결 나아졌다.", tip: "앞뒤 주어가 같을 때 접속사와 주어를 빼고 동사를 -ing로 줄인 표현입니다." },
        ]}
      />
    ),
  },
  "g16-relatives": {
    badge: "모션 실험실 · 제16강",
    title: "관계대명사 두 문장 합체 조립기",
    subtitle: "버튼을 눌러 두 문장이 하나로 합쳐지면서 명사 뒤 설명 덩어리가 되는 모습을 보세요.",
    render: () => <RelativeMergerLab />,
  },
  "g17-relative-adverbs-what": {
    badge: "모션 실험실 · 제17강",
    title: "which(빈칸 있음) vs where(빈칸 없음) & what 상자",
    subtitle: "뒤 문장에 명사 빈자리가 비어 있으면 관계대명사, 빈자리 없이 완전하면 관계부사입니다.",
    render: () => (
      <StepSwitchLab
        tabs={[
          { label: "which (뒤에 빈자리 있음)", badge: "관계대명사 + 불완전한 문장", en: "the clinic [which] she visited [ 목적어 비어 있음 ]", ko: "그녀가 방문했던 의원", tip: "visited 뒤에 '어디를'에 해당하는 목적어가 비어 있으므로 관계대명사 which를 씁니다." },
          { label: "where (뒤가 꽉 참)", badge: "관계부사 + 완전한 문장", en: "the clinic [where] she works (주어+동사 완전!)", ko: "그녀가 일하는 의원", tip: "she works는 목적어가 필요 없는 완전한 문장이므로 관계부사 where(= in which)를 씁니다." },
          { label: "what (= the thing which)", badge: "선행사 포함 (~하는 것)", en: "[What] the body needs is rest.", ko: "[몸이 필요로 하는 것]은 휴식이다.", tip: "앞에 꾸밀 명사가 없고, 뒤 문장에 빈자리가 있을 때 what을 씁니다." },
        ]}
      />
    ),
  },
  "g18-comparison": {
    badge: "모션 실험실 · 제18강",
    title: "원급·비교급·최상급 막대 그래프 비교기",
    subtitle: "버튼을 눌러 세 가지 알약(Pill A, B, C)의 효과 높이와 영어 표현을 함께 비교하세요.",
    render: () => <ComparisonBarLab />,
  },
  "g19-subjunctive": {
    badge: "모션 실험실 · 제19강",
    title: "가정법 시계 되감기 — 현실 반대 상상은 시제를 한 칸 과거로!",
    subtitle: "지금 사실과 반대를 상상할 땐 과거형, 과거 사실과 반대를 상상할 땐 had + p.p.로 한 칸 더 물러납니다.",
    render: () => (
      <StepSwitchLab
        tabs={[
          { label: "현재 사실 반대 (가정법 과거)", badge: "If + 과거동사, would + 동사원형", en: "If I [knew] the cause, I [would tell] you.", ko: "내가 지금 원인을 안다면 말할 텐데. (실제로는 지금 모름)", tip: "현재 이야기지만 사실이 아니라는 표시로 동사를 과거형(knew / were)으로 한 칸 물립니다." },
          { label: "과거 사실 반대 (가정법 과거완료)", badge: "If + had p.p., would have p.p.", en: "If she [had taken] the pill, she [would have recovered].", ko: "그녀가 그때 약을 먹었더라면 회복했을 텐데. (실제로는 안 먹음)", tip: "이미 지나간 과거를 반대로 상상할 때는 had p.p.와 would have p.p.가 짝을 이룹니다." },
        ]}
      />
    ),
  },
  "g20-agreement": {
    badge: "모션 실험실 · 제20강",
    title: "진짜 주어 레이저 조준기 — 수식어에 속지 마세요",
    subtitle: "주어와 동사 사이에 끼어든 전치사구(of ~, in ~)를 건너뛰어 맨 앞 진짜 주어의 단수·복수를 맞춥니다.",
    render: () => (
      <StepSwitchLab
        tabs={[
          { label: "수식어 거품 건너뛰기", badge: "단수 주어 → 단수 동사(is)", en: "[The effect] of these new sleeping pills [is] strong.", ko: "이 새 수면제들의 [효과는] 강하다.", tip: "pills(복수)는 of에 딸린 거품입니다. 진짜 주어는 단수인 The effect이므로 is가 정답입니다." },
          { label: "the number of vs a number of", badge: "~의 숫자(단수) vs 많은(복수)", en: "[The number] of patients [is] rising. / [A number] of patients [are] waiting.", ko: "환자의 수는 늘고 있다(단수). / 많은 환자들이 기다리고 있다(복수).", tip: "The number는 '숫자' 하나라 is, A number of는 '많은(many)' 뜻이라 are를 씁니다." },
        ]}
      />
    ),
  },
  "g21-noun-clauses": {
    badge: "모션 실험실 · 제21강",
    title: "간접의문문 어순 되돌리기 — 문장 속으로 들어가면 [의문사 + 주어 + 동사]",
    subtitle: "독립된 질문(Where is it?)이 다른 문장 안으로 들어가면 동사와 주어가 원래 자리(where it is)로 돌아옵니다.",
    render: () => (
      <StepSwitchLab
        tabs={[
          { label: "간접의문문 어순 (의+주+동)", badge: "질문이 문장 속 목적어가 될 때", en: "Do you know [where the pharmacy is]? (X where is the pharmacy)", ko: "[약국이 어디에 있는지] 아시나요?", tip: "문장 중간에 들어간 의문문은 반드시 [의문사 + 주어 + 동사] 순서로 씁니다." },
          { label: "확실한 사실 (that) vs 불확실한 질문 (whether/if)", badge: "~라는 것 vs ~인지 아닌지", en: "We know [that] it works. / We asked [whether] it is safe.", ko: "그것이 듣는다는 것을 안다. / 그것이 안전한지 아닌지 물었다.", tip: "확실한 내용은 that, 아직 몰라서 따져 보는 내용(~인지 아닌지)은 whether나 if를 씁니다." },
        ]}
      />
    ),
  },
  "g22-special-structures": {
    badge: "모션 실험실 · 제22강",
    title: "부정어 경보 도치 & It ~ that 스포트라이트 강조",
    subtitle: "부정어(Never, Seldom, Little)가 맨 앞으로 나가면 의문문처럼 조동사가 주어 앞으로 튀어나옵니다.",
    render: () => (
      <StepSwitchLab
        tabs={[
          { label: "부정어 도치 (부정어 + 조동사 + 주어 + 본동사)", badge: "Never / Seldom / Little 맨 앞", en: "[Never] [have] I seen such a fast recovery.", ko: "이렇게 빠른 회복은 한 번도 본 적이 없다.", tip: "I have never seen에서 Never가 맨 앞으로 나가면서 have가 주어 I 앞으로 자리를 바꿨습니다." },
          { label: "It is ~ that 강조 스포트라이트", badge: "강조하고 싶은 말을 It is와 that 사이에!", en: "It was [this vitamin] that helped the patient.", ko: "환자에게 도움이 된 것은 바로 [이 비타민]이었다.", tip: "It is와 that을 지워도 나머지 문장(This vitamin helped the patient)이 완벽하게 성립합니다." },
        ]}
      />
    ),
  },
  "g23-phrasal-verbs-idioms": {
    badge: "모션 실험실 · 제23강",
    title: "구동사 입자(up / off / out / into) 그림 사전",
    subtitle: "동사 뒤에 붙는 짧은 단어(up, off, out, into)의 기본 그림을 알면 처음 보는 숙어도 뜻을 추측할 수 있습니다.",
    render: () => (
      <StepSwitchLab
        tabs={[
          { label: "up (위로·가득·끝까지)", badge: "use up / give up / turn up", en: "The body [used up] all its energy.", ko: "몸이 에너지를 [남김없이 다 써 버렸다].", tip: "up은 위로 올라가는 것뿐 아니라 컵에 물이 끝까지 차서 '완전히·다'라는 그림을 만듭니다." },
          { label: "off (떨어져 분리·취소·차단)", badge: "put off / call off / cut off", en: "Never [put off] your treatment.", ko: "치료를 절대 [뒤로 미루지(연기하지)] 마세요.", tip: "off는 원래 자리에서 떼어 놓는 그림이라 미루다(put off), 취소하다(call off)에 쓰입니다." },
          { label: "out (밖으로·바닥남·해결)", badge: "run out of / figure out / break out", en: "The hospital [ran out of] the vaccine.", ko: "병원에 백신이 [바닥났다(다 떨어졌다)].", tip: "상자 안의 물건이 밖(out)으로 다 빠져나가 텅 빈 그림입니다." },
        ]}
      />
    ),
  },
  "g24-word-formation": {
    badge: "모션 실험실 · 제24강",
    title: "단어 레고 조립기 — [앞조각 뜻] + [어근] + [꼬리 품사]",
    subtitle: "단어 버튼을 눌러 긴 의약 영단어가 어떤 레고 조각들로 합쳐진 것인지 분해해 보세요.",
    render: () => <WordLegoLab />,
  },
  "g25-ordering-strategy": {
    badge: "모션 실험실 · 제25강",
    title: "정렬(並べ替え) 자석 조립 3단계",
    subtitle: "흩어진 단어를 하나씩 끼워 맞추지 말고, [동사 찾기 → 짝꿍 묶기 → 연결] 3단계로 조립하세요.",
    render: () => (
      <StepSwitchLab
        tabs={[
          { label: "1단계: 흩어진 조각 보기", badge: "일본어 뜻 먼저 확인", en: "조각: [ to / the doctor / take / advised / me / a rest ]", ko: "목표 뜻: 의사는 나에게 휴식을 취하라고 권했다.", tip: "먼저 누가(의사는) 무엇을 했는지(권했다)에 해당하는 주어·동사를 찾습니다." },
          { label: "2단계: 짝꿍 블록 묶기", badge: "advise + A + to V / take a rest", en: "묶음 ① [The doctor advised me]  +  묶음 ② [to take a rest]", ko: "advise 사람 to 동사원형 공식과 take a rest 숙어로 덩어리를 만듭니다.", tip: "단어 6개가 단 2개의 덩어리로 줄어들어 실수가 사라집니다." },
          { label: "3단계: 완성 문장 확인", badge: "남은 단어 0개 확인", en: "The doctor advised me to take a rest.", ko: "의사는 나에게 휴식을 취하라고 권했다.", tip: "안 쓴 조각이 없는지, 동사 뒤 어순이 맞는지 마지막으로 검산합니다." },
        ]}
      />
    ),
  },
  "g26-error-spotting-strategy": {
    badge: "모션 실험실 · 제26강",
    title: "오류 찾기 4단계 엑스레이 검사기",
    subtitle: "해석으로 읽으면 안 보입니다! 밑줄 친 4곳을 ①수일치 → ②시제·수동태 → ③분사 → ④품사 순서로 스캔하세요.",
    render: () => (
      <StepSwitchLab
        tabs={[
          { label: "스캔 ① 동사 수일치·태", badge: "가장 많이 나오는 함정", en: "The side effects of the drug [is → are] mild.", ko: "그 약의 부작용들은 가볍다.", tip: "동사에 밑줄이 있으면 무조건 맨 앞 진짜 주어(effects = 복수)를 찾아 단수·복수를 맞춥니다." },
          { label: "스캔 ② 형용사 vs 부사", badge: "동사 꾸미기인지 보어인지", en: "The patient reacted [serious → seriously] to the drug.", ko: "환자는 그 약에 심각하게 반응했다.", tip: "동사(reacted)의 방식을 꾸미는 자리이므로 형용사 serious가 아니라 부사 seriously여야 합니다." },
          { label: "스캔 ③ 전치사 vs 접속사", badge: "뒤에 동사가 있는가?", en: "[Despite → Although] the pain was severe, he walked.", ko: "통증이 심했지만 그는 걸었다.", tip: "뒤에 주어(the pain) + 동사(was)가 있으므로 전치사 Despite가 아니라 접속사 Although 자리입니다." },
        ]}
      />
    ),
  },
  "g27-reading-strategy": {
    badge: "모션 실험실 · 제27강",
    title: "의약 장문 신호등 지도 — 연결어가 글의 방향을 알려 줍니다",
    subtitle: "However(방향 전환·주장), For example(예시), Therefore(결론) 신호등을 따라가면 답의 위치가 바로 보입니다.",
    render: () => (
      <StepSwitchLab
        tabs={[
          { label: "신호등 ① However (진짜 주장!)", badge: "역접 뒤가 핵심 문장", en: "Many people think X. [However], recent studies show Y.", ko: "많은 사람이 X라고 생각하지만, 최근 연구는 Y임을 보여 준다.", tip: "과학·의약 지문에서 통념(X) 뒤에 나오는 However 바로 다음 문장(Y)이 필자의 진짜 핵심입니다." },
          { label: "신호등 ② Therefore / Thus (결론)", badge: "원인 → 결과 요약", en: "Cells lose water. [Therefore], patients must drink fluids.", ko: "세포가 수분을 잃는다. 따라서 환자는 수분을 섭취해야 한다.", tip: "빈칸 앞에 원인이 나오고 뒤에 해결책·결론이 나오면 Therefore / As a result가 들어갑니다." },
          { label: "신호등 ③ 내용일치 1:1 대조", badge: "상식 추측 금지!", en: "본문: may reduce pain  =  선택지: can help ease pain", ko: "본문의 단어를 같은 뜻의 다른 말(재진술)로 바꾼 선택지가 정답입니다.", tip: "always, never, all, only처럼 본문보다 과장된 단어가 들어간 선택지는 오답일 확률이 높습니다." },
        ]}
      />
    ),
  },
};

export function GrammarLab({ id }: { id: string }) {
  const spec = LABS[id];
  if (!spec) return null;
  return (
    <section aria-label={spec.title} className="mt-6 rounded-2xl border-2 border-indigo-200 bg-white p-4 sm:p-6 shadow-xs">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-700 px-2.5 py-0.5 text-xs font-bold text-white">
          <Play aria-hidden className="size-3" />
          {spec.badge}
        </span>
        <span className="text-xs font-semibold text-indigo-700">직접 눌러 보며 원리 익히기</span>
      </div>
      <h2 className="mt-2 text-lg sm:text-xl font-bold text-slate-900">{spec.title}</h2>
      <p className="mt-1 text-xs sm:text-sm text-slate-600 mb-4">{spec.subtitle}</p>
      {spec.render()}
    </section>
  );
}

export { Check, X };

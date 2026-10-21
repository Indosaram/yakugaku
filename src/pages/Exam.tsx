import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useData, type EjuLecture, type Tiers } from "../data/remote";
import { Md } from "../components/Md";
import { TierBadge, TierLegend } from "../components/Tier";
import { PageTitle } from "../components/ui";

const PDFS: [string, [string, string][]][] = [
  ["2026년도", [["학교추천 화학", "2026/04/suisen_kagaku_2026.pdf"], ["B방식 화학", "2026/04/B_kagaku_V2.pdf"], ["S방식 화학", "2026/04/S_kagaku_V2.pdf"], ["B방식 영어", "2026/04/B_eigo_2026.pdf"]]],
  ["2025년도", [["학교추천 화학", "2025/04/2025suisen_kagaku.pdf"], ["B방식 화학", "2025/04/2025_B_kagaku.pdf"], ["S방식 화학", "2025/04/2025_S_kagaku.pdf"], ["B방식 영어", "2025/04/2025_B_eigo.pdf"]]],
  ["2024년도", [["학교추천 화학", "2024/03/suisen_kagaku.pdf"], ["B방식 화학", "2024/03/ippannB_kagaku.pdf"], ["S방식 화학", "2024/03/ippannS_kagaku.pdf"], ["B방식 영어", "2024/03/ippannB_eigo.pdf"]]],
];
const BASE = "https://www.hoshi.ac.jp/admission/wp-content/uploads/sites/7/";

export default function Exam() {
  const { data: t, error } = useData<Tiers>("tiers.json");
  const { data: eju } = useData<EjuLecture[]>("eju/index.json");
  const count = (tier: string) => eju?.filter((l) => l.tier === tier).length ?? 0;
  return (
    <div>
      <PageTitle kicker="기출 분석" title="호시약대 화학 3개년 출제 분석">
        대학이 공개한 2024~2026년도 화학 9회분(학교추천 · 일반 B방식 · 일반 S방식)을 모두 읽고 단원별로 셌습니다. 이 결과로 사이트의 모든 강의와 단원에 난이도 태그를 붙였어요.
      </PageTitle>
      {!t ? (
        <p className="text-slate-400">{error ? "출제 분석은 준비 중이에요. 아래 공식 기출 PDF는 바로 볼 수 있어요." : "불러오는 중…"}</p>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
            <Md text={t.summary} />
          </article>
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="font-bold text-slate-900">자주 나온 주제</h2>
              <ol className="mt-3 space-y-2.5">
                {t.topics.map((x) => (
                  <li key={x.topic} className="text-sm">
                    <div className="flex items-baseline gap-2">
                      <span className="w-9 shrink-0 text-right font-bold text-rose-700 tnum">{x.count}회</span>
                      <span className="font-medium text-slate-900">{x.topic}</span>
                    </div>
                    <p className="ml-11 text-xs text-slate-500">{x.years} · {x.example}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="font-bold text-slate-900">EJU 강의 75강 분류</h2>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {(["필수", "권장", "패스"] as const).map((k) => (
                  <Link key={k} to="/eju" className="rounded-xl bg-stone-50 p-3 hover:bg-stone-100">
                    <TierBadge tier={k} />
                    <p className="mt-1 text-2xl font-bold tnum text-slate-900">{count(k)}</p>
                  </Link>
                ))}
              </div>
              <div className="mt-3"><TierLegend /></div>
            </div>
          </aside>
        </div>
      )}
      <section className="mt-12">
        <h2 className="mb-3 text-xl font-bold text-slate-900">공식 기출 PDF</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {PDFS.map(([y, list]) => (
            <div key={y} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">{y}</h3>
              <ul className="mt-2 space-y-1.5 text-sm">
                {list.map(([name, path]) => (
                  <li key={path}>
                    <a href={BASE + path} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-indigo-700 hover:underline">{name}<ExternalLink className="size-3" /></a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">대학은 정답을 공개하지 않습니다. 기출 저작권은 星薬科大学에 있습니다.</p>
      </section>
    </div>
  );
}

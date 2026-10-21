import { ExternalLink } from "lucide-react";
import { resourceGroups } from "../data/resources";
import { PageTitle } from "../components/ui";

export default function Resources() {
  return (
    <div>
      <PageTitle kicker="자료 모음" title="웹에서 찾은 기출·공부 자료 총정리">
        星薬 B방식 영어 독학에 쓸 수 있는 공식 기출, 분석 글, 무료 문법·어휘·독해 자료를 모았습니다. 외부 사이트이므로 내용·가입 조건은 바뀔 수 있습니다.
      </PageTitle>
      <div className="space-y-10">
        {resourceGroups.map((g) => (
          <section key={g.title}>
            <h2 className="text-lg font-bold text-slate-900">{g.title}</h2>
            <p className="text-sm text-slate-600 mt-1 mb-3">{g.intro}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {g.items.map((r) => (
                <a key={r.url} href={r.url} target="_blank" rel="noreferrer" className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0">
                  <p className="flex items-start gap-1.5 font-semibold text-slate-900"><span className="flex-1">{r.name}</span><ExternalLink aria-hidden className="mt-0.5 size-4 shrink-0 text-slate-400 group-hover:text-indigo-700" /></p>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{r.desc}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {r.tags.map((t) => <span key={t} className="rounded-full bg-stone-100 text-slate-600 text-xs px-2 py-0.5">{t}</span>)}
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

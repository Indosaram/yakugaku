import { FileText } from "lucide-react";
import { papers } from "../data";
import { Bar, Card, PageTitle } from "../components/ui";
import { useProgress } from "../progress";

export default function PaperList() {
  const { get } = useProgress();
  return (
    <div>
      <PageTitle kicker="기출문제" title="一般選抜B方式 英語 기출 (대학 공식 공개분)">
        星薬科大学이 공식 사이트에 공개한 최근 3개년 B방식 영어 문제를 그대로 옮기고, <b>모든 문항에 한국어 해석·정답 근거·오답 분석</b>을 붙였습니다. 대학은 정답을 공개하지 않으므로 정답은 본 사이트의 자체 풀이입니다.
      </PageTitle>
      <div className="grid gap-4 sm:grid-cols-3">
        {papers.map((p) => {
          const qs = p.sections.flatMap((s) => s.questions);
          const solved = p.sections.reduce((acc, s) => acc + s.questions.filter((_, i) => typeof get(`paper:${p.year}:${s.roman}:${i}`) === "number").length, 0);
          return (
            <Card
              key={p.year}
              to={`/en/papers/${p.year}`}
              badge={`${p.year}년도`}
              title={`${p.year}年度 一般選抜（B方式）英語`}
              desc={`대문 ${p.sections.length}개 · ${qs.length}문항 · 70분`}
              extra={<Bar value={solved} total={qs.length} label="풀이" />}
            />
          );
        })}
      </div>
      <div className="mt-10 rounded-2xl bg-white border border-slate-200 p-6 text-sm leading-relaxed">
        <h2 className="flex items-center gap-2 font-bold text-slate-900 mb-2"><FileText aria-hidden className="size-5 text-indigo-700" />원본 PDF로 실전 연습하기</h2>
        <p>실제 시험처럼 풀어 보려면 원본 PDF를 인쇄해서 <b>70분 타이머</b>를 켜고 푼 뒤, 이 사이트에서 채점·해설을 확인하세요.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          {papers.map((p) => (
            <li key={p.year}>
              <a className="text-indigo-700 underline" href={p.pdfUrl} target="_blank" rel="noreferrer">{p.year}年度 B方式 英語 (공식 PDF)</a>
            </li>
          ))}
          <li><a className="text-indigo-700 underline" href="https://www.hoshi.ac.jp/admission/nyushi/exam/" target="_blank" rel="noreferrer">星薬科大学 入学試験過去問題 페이지</a> (최근 3개년만 게시, 매년 교체됨)</li>
        </ul>
      </div>
    </div>
  );
}

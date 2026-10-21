import { lessons, levelNames } from "../data";
import { Bar, Card, PageTitle } from "../components/ui";
import { useProgress } from "../progress";

export default function GrammarList() {
  const { get } = useProgress();
  const levels = [1, 2, 3, 4] as const;
  return (
    <div>
      <PageTitle kicker="문법 코스" title="영문법, 0부터 星薬 실전까지">
        영어 문법을 전혀 몰라도 괜찮아요. <b>1단계부터 순서대로</b> 읽고, 각 강의 끝의 확인 퀴즈를 풀어 보세요. 퀴즈는 실제 星薬 B방식 문제 형식(4지선다 빈칸·오류 찾기 등)을 본떴습니다.
      </PageTitle>
      {levels.map((lv) => (
        <section key={lv} className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 mb-3">{levelNames[lv]}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {lessons
              .filter((l) => l.level === lv)
              .map((l) => {
                const n = lessons.indexOf(l) + 1;
                const solved = l.quiz.filter((_, i) => typeof get(`lesson:${l.id}:${i}`) === "number").length;
                return (
                  <Card
                    key={l.id}
                    to={`/en/grammar/${l.id}`}
                    badge={`제${n}강`}
                    title={l.title}
                    desc={l.summary}
                    extra={<Bar value={solved} total={l.quiz.length} label="퀴즈" />}
                  />
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}

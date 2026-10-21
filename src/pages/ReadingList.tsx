import { readings } from "../data";
import { Card, PageTitle } from "../components/ui";

export default function ReadingList() {
  return (
    <div>
      <PageTitle kicker="의약 장문 연습" title="星薬 스타일 이과·의약 장문 (자체 제작)">
        星薬 B방식 후반(대문 VI~IX)은 약·식품·의학·생명과학을 다룬 짧은 장문이 나옵니다. 아래 지문은 같은 스타일로 새로 만든 연습용 글이며, <b>모든 문장을 끊어 읽기 + 직역 + 문법 구조</b>로 풀어 놓았습니다.
      </PageTitle>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {readings.map((r, i) => (
          <Card key={r.id} to={`/en/reading/${r.id}`} badge={`연습 ${i + 1}`} title={r.title} desc={r.topic} />
        ))}
      </div>
    </div>
  );
}

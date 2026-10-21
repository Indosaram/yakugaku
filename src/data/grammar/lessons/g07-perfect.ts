import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g07-perfect",
  level: 2,
  title: "현재완료·과거완료·미래완료",
  summary: "완료형은 어떤 일이 끝났다는 사실보다 그 일이 기준 시점과 어떻게 이어지는지를 보여 준다.",
  body: `:::analogy 과거시제는 '점', 완료형은 두 시점을 잇는 '선'입니다
"어제 열이 났다(과거시제)"는 어제 일만 말하므로 지금 열이 나는지는 알 수 없습니다.
하지만 **"어제부터 지금까지 계속 열이 난다(현재완료 \`have + p.p.\`)"**는 과거의 점과 지금(현재)을 하나의 선으로 쭉 이어서 보여 줍니다.
:::

:::formula 완료형 3종류 공식
현재완료: [have / has + p.p.] => 과거에 시작된 일이 지금(현재)까지 이어짐 (since, for, already, ever)
과거완료: [had + p.p.] => 과거의 기준 시점보다 한 칸 더 먼저(대과거) 일어난 일
미래완료: [will have + p.p.] => 미래의 어느 시점이 되면 완료될 일 (by next year)
:::

## 과거시제 vs 현재완료 vs 과거완료 구분표

| 시제 | 모양 | 함께 쓰는 짝꿍 단서 | 절대 같이 못 쓰는 말 |
|---|---|---|---|
| **과거시제** | \`V-ed\` (\`took\`) | \`yesterday\`, \`~ ago\`, \`last night\`, \`in 2020\`, \`when\` | — |
| **현재완료** | \`have/has + p.p.\` | \`since + 시작점\`, \`for + 기간\`, \`recently\`, \`so far\`, \`already\`, \`yet\` | **과거 점 단서(\`yesterday\`, \`ago\`, \`in 2020\`, \`when\`)와 결합 금지!** |
| **과거완료** | \`had + p.p.\` | \`before + 과거동사\`, \`by the time + 과거동사\` | — |

:::train 문장 블록 기차로 완료형 선 연결 읽기
She(주어:그녀는) | has worked(현재완료:쭉 일해 왔다) | at this pharmacy(장소:이 약국에서) | since 2021(시작점:2021년부터 지금까지) => 그녀는 2021년부터 지금까지 이 약국에서 일해 왔다.
The swelling(주어:부기가) | had already gone down(과거완료:이미 가라앉아 있었다) | when the doctor arrived(과거 기준점:의사가 도착했을 때) => 의사가 도착했을 때 부기는 (그보다 먼저) 이미 가라앉아 있었다.
Researchers(주어:연구자들은) | have developed(현재완료:개발해 왔다) | new treatments(목적어:새 치료법들을) | over the past decade(기간:지난 10년 동안) => 연구자들은 지난 10년 동안 새 치료법들을 개발해 왔다.
:::

:::transform since(시작점) vs for(기간의 길이) 구별
시작 시점: has lived here [since] 2022 (2022년이라는 시작점 이래로) || 기간 길이: has lived here [for] four years (4년이라는 시간 길이 동안) || 숫자로 된 기간(for three days)에는 [for], 출발 시점(since yesterday / since he was young)에는 [since]를 씁니다.
과거의 점: He [entered] the hospital two days ago. || 대과거(과거보다 더 전): He said he [had lost] the pill before he came. || 과거(came)보다 더 먼저 일어난 일은 [had + p.p.]로 표시합니다.
:::

:::vs 완료형 단골 함정 O / X
She [has taken] the medicine three hours ago. || She [took] the medicine three hours ago. || ago, yesterday, last night, in 2020처럼 이미 끝난 과거 시점 단어는 현재완료(have p.p.)와 함께 쓸 수 없습니다!
When [have you started] taking this pill? || When [did you start] taking this pill? || 의문사 When은 특정 과거 시점을 묻는 말이므로 현재완료 대신 과거시제(did)를 씁니다.
The train [left] before we arrived at the station. || The train [had left] before we arrived at the station. || 도착한 과거(arrived)보다 기차가 떠난 것이 더 먼저이므로 had left가 정확합니다.
:::

:::steps 완료형 문제 3초 풀이법
1. ago / yesterday 찾기 | 문장에 ago, yesterday, last ~, in + 과거연도가 있으면 have p.p.를 지우고 과거형을 고릅니다. | two days ago → took
2. since / for / so far 찾기 | 과거부터 지금까지의 기간 단서가 있으면 have/has + p.p.를 고릅니다. | since last month → has improved
3. 과거 동사와 순서 비교 | 기준이 되는 과거 동사(arrived, found)보다 더 먼저 일어난 일이면 had + p.p.를 고릅니다. | before he arrived → had finished
:::`,
  quiz: [
    {
      prompt: "The patient (　　) the medicine since Monday.",
      choices: ["takes", "has taken", "took", "will take"],
      answer: 2,
      explanation: `**해석**\n그 환자는 월요일부터 그 약을 복용해 왔다.\n\n**정답 근거**\nsince Monday는 월요일이라는 시작점부터 지금까지 이어지는 기간을 나타낸다. 따라서 현재완료 **has taken**이 알맞다. patient는 3인칭 단수라 has를 쓴다.\n\n**오답 분석**\n• 1번 takes는 현재의 반복 습관일 뿐, since가 보여 주는 과거부터의 연결을 나타내지 못한다.\n• 3번 took는 과거의 한 시점에 끝난 일을 말해 지금까지의 계속을 표현하지 못한다.\n• 4번 will take는 미래 행동이라 이미 월요일부터 이어진 사실과 맞지 않는다.\n\n**핵심 포인트**\nsince + 시작 시점이면 have/has p.p.를 우선 확인한다.`
    },
    {
      prompt: "By the time the doctor arrived, the nurse (　　) the dose.",
      choices: ["records", "has recorded", "had recorded", "will record"],
      answer: 3,
      explanation: `**해석**\n의사가 도착했을 때까지 간호사는 그 용량을 기록해 두었다.\n\n**정답 근거**\narrived는 과거의 기준점이다. 기록은 의사의 도착보다 먼저 끝났으므로 과거완료 **had recorded**를 쓴다.\n\n**오답 분석**\n• 1번 records는 현재의 반복 행동이어서 과거의 두 사건 순서를 나타내지 못한다.\n• 2번 has recorded는 현재와 연결하는 현재완료라서 과거 기준점인 arrived와 맞지 않는다.\n• 4번 will record는 미래 행동이므로 이미 도착한 상황과 맞지 않는다.\n\n**핵심 포인트**\n과거 사건보다 더 먼저 끝난 일은 had + p.p.이다.`
    },
    {
      prompt: "By next year, the researchers (　　) the clinical trial.",
      choices: ["complete", "completed", "have completed", "will have completed"],
      answer: 4,
      explanation: `**해석**\n내년까지 연구자들은 임상시험을 끝냈을 것이다.\n\n**정답 근거**\nBy next year는 미래의 기준 시점까지를 뜻한다. 미래완료 형태인 **will have completed**가 맞다. will 뒤에는 주어가 복수여도 have 원형을 쓴다.\n\n**오답 분석**\n• 1번 complete는 현재형이라 미래의 완료를 표시하지 못한다.\n• 2번 completed는 단순과거라 미래 기준점과 어울리지 않는다.\n• 3번 have completed는 현재완료로, 미래의 마감 시점을 직접 나타내지 못한다.\n\n**핵심 포인트**\n미래의 by + 시점은 will have p.p.와 연결한다.`
    },
    {
      prompt: "Choose the incorrect part. The pharmacist <u>has gave</u> the patient clear instructions.",
      choices: ["has", "gave", "the patient", "clear instructions"],
      answer: 2,
      explanation: `**해석**\n약사는 환자에게 명확한 지시를 해 주었다.\n\n**정답 근거**\nhas 뒤에는 과거분사가 와야 한다. give의 과거형은 gave지만 과거분사는 **given**이므로 has gave가 아니라 has given으로 고쳐야 한다.\n\n**오답 분석**\n• 1번 has는 주어 pharmacist가 3인칭 단수이므로 현재완료에 맞다.\n• 3번 the patient는 give의 간접목적어로 자연스럽다.\n• 4번 clear instructions는 give의 직접목적어로 문장 구조가 맞다.\n\n**핵심 포인트**\n불규칙 동사는 과거형과 과거분사를 구분한다. give, gave, given을 묶어 기억하자.`
    },
    {
      prompt: "I (　　) the report yesterday.",
      choices: ["have read", "had read", "read", "will have read"],
      answer: 3,
      explanation: `**해석**\n나는 어제 그 보고서를 읽었다.\n\n**정답 근거**\nyesterday는 끝난 과거의 정확한 시점을 가리킨다. 따라서 단순과거 **read**를 쓴다. read의 과거형 철자는 현재형과 같지만 발음은 /red/이다.\n\n**오답 분석**\n• 1번 have read는 현재완료인데, 현재완료는 yesterday 같은 정확한 과거 시점과 함께 쓰지 않는다.\n• 2번 had read는 또 다른 과거 사건보다 더 먼저 일어난 일을 보여 줄 때 필요하지만 그런 기준점이 없다.\n• 4번 will have read는 미래의 완료라 어제와 맞지 않는다.\n\n**핵심 포인트**\n정확한 과거 시점이 보이면 현재완료가 아니라 단순과거를 고른다.`
    },
    {
      prompt: "The scientists have (　　) the new compound in several tests.",
      choices: ["examined", "examine", "examining", "examines"],
      answer: 1,
      explanation: `**해석**\n과학자들은 여러 시험에서 그 새 화합물을 검사해 왔다.\n\n**정답 근거**\nhave 뒤에는 과거분사가 필요하다. examine은 규칙동사이므로 examined가 과거분사이며, have examined가 완전한 현재완료가 된다.\n\n**오답 분석**\n• 2번 examine은 동사 원형이라 have 뒤의 완료형 자리에 올 수 없다.\n• 3번 examining은 현재분사 또는 동명사라 have examining 구조가 되지 않는다.\n• 4번 examines는 3인칭 단수 현재형이고 주어 scientists와도 맞지 않는다.\n\n**핵심 포인트**\n규칙동사의 과거분사는 동사 원형에 ed를 붙이며, have 뒤에 배치한다.`
    }
  ]
};

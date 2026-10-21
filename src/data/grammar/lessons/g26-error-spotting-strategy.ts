import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g26-error-spotting-strategy",
  level: 4,
  title: "오류 찾기 푸는 법",
  summary: "문장을 주어, 동사, 수식어 순서로 검사해 밑줄 친 오류를 빠르게 찾는다.",
  body: `:::analogy 오류 찾기는 '엑스레이 검사'입니다: 해석하지 말고 정해진 순서로 뼈를 스캔하세요
문장을 해석하면 뜻이 대충 통해서 오류가 안 보입니다.
밑줄 4곳을 **① 수일치 → ② 시제·태 → ③ 품사 → ④ 연결어** 순서로 기계처럼 점검하면 대부분 잡힙니다.
:::

:::formula 오류 스캔 4단계 공식
스캔 1 [동사 수일치]: 진짜 주어의 단수/복수 ↔ 동사 (is/are, -s)
스캔 2 [시제·능동/수동]: 시간 단서(ago, since)와 동사 모양, be + p.p.가 맞는지
스캔 3 [품사 자리]: 명사 꾸밈=형용사, 동사 꾸밈=부사, 보어=형용사
스캔 4 [연결어]: 뒤에 주어+동사 있으면 접속사, 명사만 있으면 전치사 / 관계사 which·where
:::

## 자주 나오는 오류 유형

| 유형 | 틀린 예 | 바른 예 |
|---|---|---|
| 수일치 | \`The effects of the drug is\` | \`are\` |
| 수동태 | \`must store in a cool place\` | \`must be stored\` |
| 품사 | \`reacted serious\` | \`seriously\` |
| 시제 | \`has started two days ago\` | \`started\` |
| 연결어 | \`Despite the pain was severe\` | \`Although\` |
| 관계사 | \`the clinic where she visited\` | \`which\` |

:::train 스캔 예시
The side effects(주어:부작용들은) | of the drug(거품:그 약의) | is(동사:이다 → are로 고쳐야 함) | mild(보어:가벼운) => 스캔 1에서 걸림: 주어가 복수이므로 is → are
The medicine(주어:그 약은) | must store(동사:보관해야 한다 → must be stored) | in a cool place(장소:서늘한 곳에) => 스캔 2에서 걸림: 약은 보관되는 대상이므로 수동태
:::

:::transform 오류 → 수정
The patient reacted [serious] to the drug. || The patient reacted [seriously] to the drug. || 동사를 꾸미므로 부사
[Despite] the pain was severe, he walked. || [Although] the pain was severe, he walked. || 뒤에 주어 + 동사가 있으므로 접속사
:::

:::vs 오류 찾기에서 '맞는데 틀려 보이는' 함정
The number of patients [is] rising. (맞음) || A number of patients [are] waiting. (맞음) || 둘 다 맞는 문장입니다. 수일치 규칙을 정확히 알아야 함정에 안 빠집니다.
Water [boils] at 100°C, he said. (맞음) || 과학 사실은 현재형 유지 || 주절이 과거여도 틀린 게 아닙니다.
:::

:::steps 실전 오류 찾기 3단계
1. 밑줄 종류 분류 | 밑줄이 동사인지, 형용사/부사인지, 연결어인지 표시합니다. | ① 동사 ② 부사 ...
2. 동사부터 스캔 | 동사 밑줄이 있으면 수일치·시제·태를 먼저 검사합니다. | is → are?
3. 나머지 스캔 | 품사 자리와 연결어(접속사/전치사, which/where)를 검사합니다. | serious → seriously
:::`,
  quiz: [
    {
      prompt: "The number of patients (　　) rapidly after the new clinic opened.",
      choices: ["increase", "increases", "increasing", "have increased"],
      answer: 2,
      explanation: "**해석**\n\n새 병원이 문을 연 뒤 환자 수가 빠르게 증가합니다.\n\n**정답 근거**\n\n주어는 *patients*가 아니라 단수인 *The number*입니다. 현재 시제 3인칭 단수이므로 *increases*가 맞습니다.\n\n**오답 분석**\n\n• ① 복수 주어용 기본형입니다.\n• ③ 동사가 될 수 없는 -ing형입니다.\n• ④ 복수 주어와 어울리는 현재완료입니다.\n\n**핵심 포인트**\n\n\`A of B\`의 수는 A에 맞춥니다."
    },
    {
      prompt: "The medicine must be (　　) in a cool place.",
      choices: ["store", "stored", "storing", "stores"],
      answer: 2,
      explanation: "**해석**\n\n그 약은 서늘한 곳에 보관되어야 합니다.\n\n**정답 근거**\n\n\`must be + 과거분사\`가 수동태입니다. 따라서 *store*의 과거분사 *stored*가 필요합니다.\n\n**오답 분석**\n\n• ① 동사원형이라 수동태가 완성되지 않습니다.\n• ③ -ing형은 이 구조에 맞지 않습니다.\n• ④ 3인칭 단수 현재형입니다.\n\n**핵심 포인트**\n\n조동사와 be동사 뒤의 과거분사를 한 덩어리로 봅니다."
    },
    {
      prompt: "The tablets, which (　　) quickly in water, are easy to take.",
      choices: ["dissolve", "dissolves", "dissolving", "is dissolved"],
      answer: 1,
      explanation: "**해석**\n\n물에서 빨리 녹는 그 정제들은 복용하기 쉽습니다.\n\n**정답 근거**\n\n*which*는 복수 명사 *tablets*를 가리키므로 복수 동사 *dissolve*를 씁니다.\n\n**오답 분석**\n\n• ② 단수 주어용 -s형입니다.\n• ③ 완전한 동사가 아닌 -ing형입니다.\n• ④ 단수 수동태라서 복수 정제와 맞지 않습니다.\n\n**핵심 포인트**\n\n관계대명사절의 동사도 앞 명사의 수를 따릅니다."
    },
    {
      prompt: "The pharmacist explained that the patient (　　) the dose incorrectly.",
      choices: ["take", "takes", "had taken", "taking"],
      answer: 3,
      explanation: "**해석**\n\n약사는 환자가 복용량을 잘못 복용했었다고 설명했습니다.\n\n**정답 근거**\n\n*explained*라는 과거 기준점보다 더 먼저 일어난 일은 과거완료 \`had + 과거분사\`로 나타냅니다. *take*의 과거분사는 *taken*입니다.\n\n**오답 분석**\n\n• ① 현재 기본형이라 시제가 맞지 않습니다.\n• ② 현재형입니다.\n• ④ 동사로 쓸 수 없는 -ing형입니다.\n\n**핵심 포인트**\n\n과거보다 더 이전이면 \`had taken\`을 찾습니다."
    },
    {
      prompt: "다음 중 문법적으로 틀린 문장을 고르세요.",
      choices: ["The researcher recorded the results carefully.", "The researchers records the results carefully.", "The sample was labeled before testing.", "A nurse checked the patient's pulse."],
      answer: 2,
      explanation: "**해석**\n\n연구자나 간호사가 결과, 시료, 맥박을 기록하거나 확인하는 문장입니다.\n\n**정답 근거**\n\n②의 주어 *The researchers*는 복수이므로 동사는 *record*여야 합니다. *records*는 단수 주어에 쓰입니다.\n\n**오답 분석**\n\n• ① 단수 주어와 과거형이 맞습니다.\n• ③ 단수 주어의 수동태가 맞습니다.\n• ④ 단수 주어와 과거형이 맞습니다.\n\n**핵심 포인트**\n\n동사 가까이에 있는 명사가 아니라 문장의 진짜 주어를 확인합니다."
    },
    {
      prompt: "The doctor prescribed a drug (　　) reduces blood pressure.",
      choices: ["who", "what", "that", "where"],
      answer: 3,
      explanation: "**해석**\n\n의사는 혈압을 낮추는 약을 처방했습니다.\n\n**정답 근거**\n\n앞의 명사 *a drug*는 사물이므로 *that*이 이끄는 관계대명사절이 알맞습니다.\n\n**오답 분석**\n\n• ① 사람을 설명하는 *who*입니다.\n• ② 앞 선행사 없이 쓰는 명사절 표현입니다.\n• ④ 장소를 설명하는 관계부사입니다.\n\n**핵심 포인트**\n\n사람은 *who*, 사물은 *which/that*, 장소는 *where*로 구분합니다."
    }
  ]
};

import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g06-tenses",
  level: 2,
  title: "시제: 현재, 과거, 미래, 진행형",
  summary: "동사의 모양으로 일이 언제 일어났고 지금 진행 중인지 판단한다.",
  body: `:::analogy 시제는 동사에 붙이는 시간 도장입니다
사건이 **어제 끝난 일(과거)**인지, **원래 늘 그런 사실(현재)**인지, **지금 눈앞에서 벌어지는 중(진행형)**인지, **내일 일어날 일(미래)**인지에 따라 동사 모양이 달라집니다.
문장 속 시간 단서(\`yesterday\`, \`every day\`, \`right now\`, \`when ~\`)가 정답을 알려 주는 힌트입니다.
:::

:::formula 시제 기본 공식 4가지
과거 단서 (yesterday, in 2020, ago) => 과거형 동사 (took, started, was)
평소·과학 사실 (every day, usually) => 현재형 동사 (takes, boils, is)
진행 중 (now, at the moment) => [be동사 + V-ing] (is taking, was resting)
시간·조건 부사절 (when, if, before, after, until + 주어 + 현재형) => 미래 일이어도 will 대신 현재형!
:::

## 시제별 모양과 시간 단서 표

| 시제 | 동사 모양 | 함께 나오는 시간 단서 | 핵심 의미 |
|---|---|---|---|
| **현재** | \`V\` / \`V-s\` | \`every day\`, \`usually\`, \`often\` | 반복 습관, 변하지 않는 과학·의학 사실 |
| **과거** | \`V-ed\` / 불규칙 | \`yesterday\`, \`last week\`, \`~ ago\`, \`in 2024\` | 과거 특정 시점에 이미 끝난 일 |
| **미래** | \`will + V\` | \`tomorrow\`, \`next month\`, \`soon\` | 앞으로 일어날 일이나 예측 |
| **진행형** | \`be + V-ing\` | \`now\`, \`right now\`, \`at that time\` | 그 시점에 한창 하고 있는 중 |

:::train 문장 블록 기차로 시제 단서 읽기
Water(주어:물은) | freezes(현재동사:언다) | at zero degrees Celsius(수식어:섭씨 0도에서) => 물은 섭씨 0도에서 언다 (과학적 사실은 언제나 현재시제!).
The patient(주어:환자는) | was sleeping(과거진행:자고 있는 중이었다) | when the nurse entered(시간절:간호사가 들어왔을 때) => 간호사가 들어왔을 때 환자는 자고 있었다.
Please take(명령문:복용하세요) | this pill(목적어:이 알약을) | before you go to bed(시간절:잠자리에 들기 전에) => 잠자리에 들기 전에 이 알약을 복용하세요 (시간절 현재형 go!).
:::

:::transform 시험 1순위 규칙: 때·조건의 부사절에서는 미래에도 현재형!
주절(미래): You [will feel] better || 조건절(현재형!): if you [take] this medicine tomorrow. || [if / when / before / after / as soon as / until]이 이끄는 절 안에서는 내일 일이어도 will을 빼고 현재형(take)을 씁니다!
상태동사: I [know] the answer now. || 진행형 불가: I [am knowing] (X) || know, have(소유), like, belong, consist는 이미 지속되는 상태라 -ing 진행형을 쓰지 않습니다.
:::

:::vs 시제 함정 O / X
If the fever [will continue] tomorrow, see a doctor. || If the fever [continues] tomorrow, see a doctor. || 조건을 나타내는 if절 안에서는 미래 일이어도 현재형(continues)을 씁니다.
Please wait here until the doctor [will call] you. || Please wait here until the doctor [calls] you. || 시간을 나타내는 until절 안에서도 will 대신 현재형(calls)을 씁니다.
This tablet [is containing] 500mg of vitamin C. || This tablet [contains] 500mg of vitamin C. || 포함하다(contain), 구성되다(consist of) 같은 상태동사는 진행형(be + -ing)으로 쓰지 않습니다.
:::

:::steps 시제 문제 3초 풀이법
1. 시간 단서 밑줄 | 문장에서 yesterday, ago, since, when, if 같은 시간 단서를 먼저 찾습니다. | ~ two days ago
2. 때·조건 절 확인 | 빈칸이 when/if/until/before 절 안에 있으면 will을 지우고 현재형을 고릅니다. | when he arrives (O)
3. 상태동사 확인 | know, contain, belong, resemble는 진행형(-ing) 보기를 지웁니다. | contains (O)
:::`,
  quiz: [
    {
      prompt: "The patient (　　) the medicine yesterday.",
      choices: ["takes", "took", "will take", "is taking"],
      answer: 2,
      explanation: `**해석**\n\n환자는 어제 그 약을 복용했다.\n\n**정답 근거**\n\n*yesterday*는 이미 끝난 과거를 가리키므로 *take*의 과거형 *took*이 정답입니다.\n\n**오답 분석**\n\n* takes는 현재의 습관입니다.\n* *will take*는 미래입니다.\n* *is taking*은 지금 진행 중인 일입니다.\n\n**핵심 포인트**\n\n시간 표현 *yesterday*를 먼저 찾고 과거형을 고릅니다.`,
    },
    {
      prompt: "The new treatment (　　) available next month.",
      choices: ["become", "became", "will become", "is becoming"],
      answer: 3,
      explanation: `**해석**\n\n새 치료법은 다음 달에 이용 가능해질 것이다.\n\n**정답 근거**\n\n*next month*는 미래이므로 *will become*이 맞습니다. *will* 뒤에는 동사원형 *become*을 둡니다.\n\n**오답 분석**\n\n* *become*은 주어와 시제 표시가 없는 원형입니다.\n* *became*는 과거형입니다.\n* *is becoming*은 현재 진행 중이라는 뜻으로 다음 달과 맞지 않습니다.\n\n**핵심 포인트**\n\n미래는 *will + 동사원형*으로 만듭니다.`,
    },
    {
      prompt: "Look! The surgeon (　　) the patient's wound.",
      choices: ["examines", "examined", "will examine", "is examining"],
      answer: 4,
      explanation: `**해석**\n\n보세요. 외과 의사가 환자의 상처를 검사하고 있습니다.\n\n**정답 근거**\n\n*Look!*은 바로 지금 진행 중인 장면을 알립니다. 따라서 *is + examining*인 현재진행형을 선택합니다.\n\n**오답 분석**\n\n* *examines*는 습관이나 일반 사실입니다.\n* *examined*는 끝난 과거입니다.\n* *will examine*은 미래의 검사입니다.\n\n**핵심 포인트**\n\n현재 진행은 주어가 하나일 때 *is + 동사-ing*입니다.`,
    },
    {
      prompt: "When the report (　　), the doctor will call the patient.",
      choices: ["arrives", "will arrive", "arrived", "is arriving"],
      answer: 1,
      explanation: `**해석**\n\n보고서가 도착하면 의사가 환자에게 전화할 것이다.\n\n**정답 근거**\n\n*when*이 이끄는 시간절에서는 미래를 말해도 현재형을 씁니다. 따라서 *the report arrives*가 맞고, 주절의 *will call*이 미래를 표시합니다.\n\n**오답 분석**\n\n* *will arrive*는 시간절에 미래 조동사를 중복해 쓴 것입니다.\n* *arrived*는 과거입니다.\n* *is arriving*은 지금 도착 중이라는 뜻으로 일반적인 조건과 다릅니다.\n\n**핵심 포인트**\n\n*when + 현재형*, 주절은 *will + 원형*으로 기억합니다.`,
    },
    {
      prompt: "다음 밑줄 친 부분 중 문법적으로 틀린 것을 고르시오. The pharmacist <u>check</u> the label <u>every morning</u> before the store opens.",
      choices: ["check", "the label", "every morning", "opens"],
      answer: 1,
      explanation: `**해석**\n\n약사는 가게가 열리기 전에 매일 아침 라벨을 확인한다.\n\n**정답 근거**\n\n주어 *The pharmacist*는 한 명이므로 현재형 동사에 *-s*를 붙여 *checks*라고 해야 합니다.\n\n**오답 분석**\n\n* *check*가 틀린 부분이며 *checks*로 고칩니다.\n* *the label*은 확인하는 대상인 목적어입니다.\n* *every morning*은 반복을 나타내는 시간 표현입니다.\n* *opens*는 하나의 가게에 맞는 현재형입니다.\n\n**핵심 포인트**\n\n현재형에서 3인칭 단수 주어와 동사의 *-s*를 확인합니다.`,
    },
    {
      prompt: "At 10 a.m. yesterday, the scientists (　　) the drug's effect.",
      choices: ["observe", "observed", "were observing", "will observe"],
      answer: 3,
      explanation: `**해석**\n\n어제 오전 10시에 과학자들은 그 약의 효과를 관찰하고 있었다.\n\n**정답 근거**\n\n과거의 특정 시점 *At 10 a.m. yesterday*에 진행 중이던 행동이므로 과거진행형 *were observing*을 씁니다. 주어 *scientists*가 복수라서 *were*입니다.\n\n**오답 분석**\n\n* *observe*는 현재형입니다.\n* *observed*는 관찰이 끝났다는 단순 과거입니다.\n* *will observe*는 미래입니다.\n\n**핵심 포인트**\n\n과거 특정 시점에 한창 진행 중이면 *was/were + 동사-ing*입니다.`,
    }
  ]
};

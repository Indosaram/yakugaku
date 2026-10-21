import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g14-gerunds",
  level: 3,
  title: "동명사와 to부정사 비교",
  summary: "동사에 ing를 붙인 동명사가 명사처럼 쓰이는 자리와 to부정사와의 차이를 익힌다.",
  body: `:::analogy 동사에 -ing를 붙이면 '명사 모자'를 쓴 동명사가 됩니다
**동명사(\`V-ing\`)**와 **to부정사(\`to V\`)**는 둘 다 동사를 **"~하는 것(명사)"**으로 바꾼 말입니다.
하지만 앞의 동사가 **과거·현재 지향 동사(\`enjoy\`, \`avoid\`, \`finish\`)**이면 \`-ing\`만 좋아하고, **미래 지향 동사(\`want\`, \`decide\`, \`plan\`)**이면 \`to V\`만 좋아합니다.
:::

:::formula 동명사 핵심 공식 3가지
[-ing만 목적어로 취하는 동사]: enjoy / avoid / finish / mind / give up / put off / suggest / consider + [V-ing]
[전치사 (in / on / of / for / without / by / instead of)] + [V-ing] => 전치사 뒤 동사는 무조건 -ing!
[전치사 to 함정!]: look forward to / be used to / lead to / contribute to / object to + [V-ing]
:::

## 동명사(-ing) vs to부정사 짝꿍 동사 표

| 구분 | 대표 동사·표현 | 왜 그럴까요? |
|---|---|---|
| **\`-ing\`만 쓰는 동사** | \`enjoy\`, \`finish\`, \`avoid(피하다)\`, \`mind(꺼리다)\`, \`stop\`, \`keep\`, \`consider\`, \`suggest\` | 이미 하고 있거나 경험한 행동을 떠올리는 동사들 |
| **\`to V\`만 쓰는 동사** | \`want\`, \`hope\`, \`wish\`, \`decide\`, \`plan\`, \`expect\`, \`promise\`, \`refuse\` | 앞으로 할 미래의 행동을 가리키는 동사들 |
| **뜻이 달라지는 동사** | \`remember / forget / regret / try / stop\` | **\`-ing\` = 이미 한 일(과거)** vs **\`to V\` = 앞으로 할 일(미래)** |

:::train 문장 블록 기차로 동명사 구문 읽기
Patients(주어:환자들은) | should avoid(동사:피해야 한다) | taking this drug(동명사 목적어:이 약을 복용하는 것을) | with alcohol(수식어:술과 함께) => 환자들은 술과 함께 이 약을 복용하는 것을 피해야 한다.
Regular exercise(주어:규칙적인 운동은) | contributes to(동사+전치사 to:~에 기여한다) | reducing stress(동명사:스트레스를 줄이는 것에) => 규칙적인 운동은 스트레스를 줄이는 데 기여한다.
By washing your hands(by+-ing:손을 씻음으로써) | you can prevent(주어+동사:예방할 수 있다) | infection(목적어:감염을) => 손을 씻음으로써 감염을 예방할 수 있다.
:::

:::transform 뒤에 -ing가 오는가, to V가 오는가에 따라 뜻이 바뀌는 동사들
He stopped [smoking]. (담배 피우던 행동을 멈췄다 = 금연!) || He stopped [to smoke]. (담배를 피우기 위해 걸음을 멈췄다!) || [stop -ing]는 하던 일을 그만두다, [stop to V]는 ~하기 위해 멈춰 서다입니다.
I remember [taking] the pill this morning. (아침에 이미 먹은 것이 기억난다!) || Remember [to take] the pill tonight. (오늘 밤 앞으로 약 먹을 것을 잊지 마라!) || [-ing]는 과거에 한 일, [to V]는 미래에 할 일입니다!
:::

:::vs 동명사 단골 함정 O / X
The doctor suggested [to change] the diet. || The doctor suggested [changing] the diet. || suggest, avoid, finish, mind, enjoy 뒤에는 to부정사가 올 수 없고 동명사(-ing)만 옵니다.
This habit may lead to [develop] diabetes. || This habit may lead to [developing] diabetes. || lead to, contribute to, look forward to, be used to의 to는 전치사이므로 뒤에 동명사(-ing)가 옵니다!
He left the hospital without [pay] the bill. || He left the hospital without [paying] the bill. || 전치사(without) 뒤에는 동명사(paying)를 씁니다.
:::

:::steps -ing vs to V 빈칸 3초 풀이법
1. 앞 단어 확인 | 빈칸 바로 앞이 전치사(of, for, without, by)이면 고민 없이 -ing를 고릅니다. | without thinking
2. 전치사 to 5총사 체크 | look forward to, be used to(익숙하다), lead to, contribute to, object to 뒤는 -ing입니다. | lead to causing
3. 본동사 짝꿍 확인 | avoid/enjoy/finish/mind/suggest → -ing, want/decide/plan/expect → to V를 고릅니다. | avoid eating
:::`,
  quiz: [
    {
      prompt: "The pharmacist recommended (　　) the label carefully.",
      choices: ["read", "to read", "reading", "reads"],
      answer: 3,
      explanation: `**해석**\n\n약사는 라벨을 주의 깊게 읽는 것을 권했다.\n\n**정답 근거**\n\n*recommend*는 뒤에 행동을 목적어로 받을 때 동명사를 씁니다. 따라서 *recommended reading*이 맞습니다.\n\n**오답 분석**\n\n*read*는 동사원형이라 목적어 자리에 바로 올 수 없습니다. *to read*는 이 문장의 *recommend*와 맞지 않습니다. *reads*는 3인칭 단수 동사 형태라 목적어가 될 수 없습니다.\n\n**핵심 포인트**\n\nrecommend, suggest, avoid처럼 동명사를 요구하는 동사를 먼저 확인합니다.`,
      lessonIds: ["g14-gerunds"]
    },
    {
      prompt: "Wash your hands before (　　) the patient.",
      choices: ["examining", "examine", "to examine", "examined"],
      answer: 1,
      explanation: `**해석**\n\n환자를 진찰하기 전에 손을 씻어라.\n\n**정답 근거**\n\n*before*는 여기서 전치사입니다. 전치사 뒤에는 명사나 동명사가 오므로 *before examining*이 맞습니다.\n\n**오답 분석**\n\n*examine*은 동사원형이라 전치사 뒤에 올 수 없습니다. *to examine*은 to부정사 형태라 전치사 뒤 규칙에 맞지 않습니다. *examined*는 과거형 또는 과거분사라 “진찰하기 전에”라는 능동 행동을 나타내지 못합니다.\n\n**핵심 포인트**\n\n전치사 뒤 동사에는 ing를 붙입니다.`,
      lessonIds: ["g14-gerunds"]
    },
    {
      prompt: "The researcher decided (　　) the sample again.",
      choices: ["testing", "test", "to test", "tested"],
      answer: 3,
      explanation: `**해석**\n\n그 연구자는 검체를 다시 검사하기로 결정했다.\n\n**정답 근거**\n\n*decide*는 앞으로 할 일을 정할 때 *decide to + 동사원형*을 씁니다. 그러므로 *decided to test*가 정답입니다.\n\n**오답 분석**\n\n*testing*은 동명사지만 *decide*의 일반적인 목적어 형태가 아닙니다. *test*는 동사원형만 남아 문법적으로 연결되지 않습니다. *tested*는 과거형 또는 과거분사라 *decided* 뒤 목적어가 될 수 없습니다.\n\n**핵심 포인트**\n\nwant, decide, hope, plan, need 뒤에서는 to부정사를 우선 확인합니다.`,
      lessonIds: ["g14-gerunds"]
    },
    {
      prompt: "The patient stopped <u>to take</u> the medicine because it caused nausea. Which underlined part is incorrect?",
      choices: ["stopped", "to take", "because", "caused"],
      answer: 2,
      explanation: `**해석**\n\n그 환자는 그 약이 메스꺼움을 일으켰기 때문에 약 복용을 중단했다.\n\n**정답 근거**\n\n“복용을 중단하다”는 *stop + 동명사*인 *stopped taking*으로 씁니다. 따라서 밑줄 친 *to take*가 틀렸고 *taking*으로 고쳐야 합니다.\n\n**오답 분석**\n\n*stopped*는 주어 *The patient*와 맞는 과거형입니다. *because*는 이유를 연결하는 접속사로 알맞습니다. *caused*는 과거의 원인을 나타내므로 맞습니다.\n\n**핵심 포인트**\n\nstop + ing는 행동 중단, stop + to부정사는 다른 행동을 하려고 멈춤입니다.`,
      lessonIds: ["g14-gerunds"]
    },
    {
      prompt: "Choose the best word order.\n\n(A) taking\n(B) should avoid\n(C) patients\n(D) this drug\n(E) without food",
      choices: ["C B A D E", "C A B D E", "B C A E D", "C B D A E"],
      answer: 1,
      explanation: `**해석**\n\n환자들은 음식 없이 이 약을 복용하는 것을 피해야 한다.\n\n**정답 근거**\n\n주어 *patients* 뒤에 조동사와 동사인 *should avoid*가 오고, *avoid*의 목적어로 동명사구 *taking this drug*가 옵니다. 마지막에 방법과 조건을 나타내는 *without food*를 붙여 C B A D E가 됩니다.\n\n**오답 분석**\n\nC A B는 주어 뒤에 동명사가 먼저 와서 본동사 연결이 끊깁니다. B로 시작하면 주어가 없어 문장이 되지 않습니다. C B D A는 *avoid this drug taking*이 되어 동명사구의 순서가 깨집니다.\n\n**핵심 포인트**\n\n동명사와 그 목적어를 한 덩어리로 묶어 *taking this drug*로 읽습니다.`,
      lessonIds: ["g14-gerunds"]
    },
    {
      prompt: "I look forward to (　　) from you about the clinical trial.",
      choices: ["hear", "hearing", "to hear", "heard"],
      answer: 2,
      explanation: `**해석**\n\n나는 임상시험에 관해 당신에게서 소식을 듣기를 기대한다.\n\n**정답 근거**\n\n*look forward to*에서 *to*는 전치사입니다. 따라서 뒤에는 동명사 *hearing*이 와야 합니다. *look forward to hearing from you*는 시험과 실제 편지에서 모두 자주 보이는 표현입니다.\n\n**오답 분석**\n\n*hear*는 동사원형이라 전치사 뒤에 바로 올 수 없습니다. *to hear*는 to가 연속되어 이 표현의 구조와 맞지 않습니다. *heard*는 과거형 또는 과거분사라 뒤 행동을 나타내는 목적어가 될 수 없습니다.\n\n**핵심 포인트**\n\n모든 to가 to부정사를 만드는 것은 아닙니다. 전치사 to 뒤에는 동명사를 씁니다.`,
      lessonIds: ["g14-gerunds"]
    }
  ]
};

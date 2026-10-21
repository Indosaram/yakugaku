import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g09-passive",
  level: 2,
  title: "수동태",
  summary: "누가 했는지보다 무엇이 되었는지를 앞세울 때 be동사와 과거분사를 쓴다.",
  body: `:::analogy 카메라 주인공을 '한 사람'에서 '당한 대상'으로 바꾸는 것입니다
"과학자들이 백신을 개발했다(능동태)"에서 카메라를 **백신** 쪽으로 돌리면 **"백신이 과학자들에 의해 개발되었다(수동태)"**가 됩니다.
의학·약학 글에서는 누가 했는지보다 **약이 어떻게 흡수되고 치료가 어떻게 이루어지는지**가 중요해서 수동태(\`be동사 + p.p.\`)가 아주 자주 나옵니다.
:::

:::formula 수동태 핵심 공식
기본 수동태: [주어(대상)] + [be동사 (am/are/is/was/were)] + [p.p. (과거분사)] + [(by 행위자)]
조동사 수동태: [조동사 (can/must/should)] + [be + p.p.] => 예: should be stored (보관되어야 한다)
진행형 수동태: [be동사 + being + p.p.] => 예: is being tested (시험되는 중이다)
완료형 수동태: [have/has/had + been + p.p.] => 예: has been used (사용되어 왔다)
:::

## 자주 나오는 by 이외의 전치사 수동태 표

| 표현 | 뜻 | 왜 \`by\`를 안 쓸까요? |
|---|---|---|
| \`be known to / for / as\` | ~에게 알려지다 / ~로 유명하다 / ~로서 알려지다 | 대상·이유·자격에 따라 전치사가 달라짐 |
| \`be interested in\` | ~에 관심이 있다 | 마음속 방향(\`in\`)을 나타냄 |
| \`be satisfied with\` | ~에 만족하다 | 함께하는 대상(\`with\`) |
| \`be covered with\` / \`be filled with\` | ~로 덮여 있다 / ~로 가득 차다 | 재료·내용물(\`with\`) |
| \`be composed of\` / \`be made of\` | ~로 구성되다 / ~로 만들어지다 | 구성 성분(\`of\`) |

:::train 문장 블록 기차로 수동태 구조 읽기
The medicine(주어:그 약은) | is absorbed(수동태 동사:흡수된다) | into the bloodstream(수식어:혈류 속으로) | quickly(부사:빠르게) => 그 약은 혈류 속으로 빠르게 흡수된다.
This tablet(주어:이 정제는) | should be stored(조동사 수동태:보관되어야 한다) | in a cool place(장소:서늘한 곳에) => 이 정제는 서늘한 곳에 보관되어야 한다.
The patient(주어:환자는) | was advised(수동태:권고를 받았다) | to drink more water(보어:물을 더 마시라고) => 환자는 물을 더 마시라는 권고를 받았다.
:::

:::transform 능동태 ↔ 수동태 변신과 수동태 불가 동사
능동: Doctors [prescribe] this drug. (뒤에 목적어 있음!) || 수동: This drug [is prescribed] by doctors. (뒤에 목적어 없음!) || 타동사 뒤에 목적어가 없으면 수동태(be + p.p.) 자리입니다!
자동사(수동태 절대 불가!): The side effect [appeared / occurred / happened]. || [was appeared / was occurred] (절대 불가 X) || appear, disappear, happen, occur, consist of, belong to는 원래 목적어가 없는 1형식 자동사라 수동태로 쓸 수 없습니다!
:::

:::vs 수동태 단골 함정 O / X
An accident [was happened] near the hospital. || An accident [happened] near the hospital. || happen, occur, take place, appear, disappear는 자동사라 be + p.p. 수동태를 절대 만들 수 없습니다.
This medicine [must store] in a dark bottle. || This medicine [must be stored] in a dark bottle. || 약(This medicine)은 스스로 보관하는 것이 아니라 보관되는 대상이므로 must be stored가 맞습니다.
The body [is consisted of] trillions of cells. || The body [consists of] / [is composed of] trillions of cells. || consist of는 자동사라 수동태가 안 되고, 수동태로 쓰려면 be composed of를 씁니다.
:::

:::steps 능동 vs 수동 3초 판별법
1. 주어 확인 | 주어가 직접 행동을 하는 주체(의사·연구자)인지, 행동을 받는 대상(약·질병·결과)인지 봅니다. | The drug = 대상
2. 빈칸 뒤 목적어 유무 확인 | 타동사 바로 뒤에 목적어(명사)가 없으면 수동태(be + p.p.), 있으면 능동태를 고릅니다. | (　　) in a cool place → 목적어 없음 → is stored!
3. 자동사 함정 제거 | happen, occur, appear, belong to, consist of는 be + p.p. 보기를 즉시 지웁니다. | occurred (O)
:::`,
  quiz: [
    {
      prompt: "The new drug (　　) by the hospital last year.",
      choices: ["tests", "was tested", "is testing", "has test"],
      answer: 2,
      explanation: `**해석**\n\n그 새 약은 작년에 병원에서 시험되었다.\n\n**정답 근거**\n\n주어 The new drug는 시험하는 사람이 아니라 시험을 받는 대상입니다. last year가 과거를 가리키므로 과거 수동태 **was + 과거분사**가 필요합니다. test의 과거분사는 tested이므로 was tested가 정답입니다.\n\n**오답 분석**\n\n* 1번 tests는 현재 능동형이라 약이 스스로 시험한다는 뜻이 됩니다.\n* 3번 is testing은 현재진행 능동형이며 was와 과거분사 구조가 아닙니다.\n* 4번 has test는 현재완료 형태도 아니고 test가 과거분사 자리에도 맞지 않습니다.\n\n**핵심 포인트**\n\n과거를 나타내는 말과 행동을 받는 주어를 함께 보면 was tested를 고릅니다.`,
    },
    {
      prompt: "These capsules must (　　) in a dry place.",
      choices: ["store", "stored", "be stored", "be storing"],
      answer: 3,
      explanation: `**해석**\n\n이 캡슐들은 건조한 곳에 보관되어야 한다.\n\n**정답 근거**\n\n캡슐은 보관하는 주체가 아니라 보관되는 대상입니다. must는 조동사이므로 그 뒤에 동사원형 be를 두고, 수동태의 과거분사 stored를 이어서 **must be stored**를 만듭니다.\n\n**오답 분석**\n\n* 1번 store는 must 뒤에 올 수 있지만 능동태라 캡슐이 보관한다는 이상한 뜻입니다.\n* 2번 stored는 must 바로 뒤에 과거분사를 둔 형태라 수동태가 완성되지 않습니다.\n* 4번 be storing은 능동 진행을 뜻하므로 캡슐이 무언가를 보관한다는 구조입니다.\n\n**핵심 포인트**\n\n조동사 뒤 수동태는 항상 **조동사 + be + 과거분사**입니다.`,
    },
    {
      prompt: "The blood samples were <u>analyze</u> by the researcher.",
      choices: ["analyze", "analyzes", "analyzed", "analyzing"],
      answer: 3,
      explanation: `**해석**\n\n혈액 시료들은 연구자에 의해 분석되었다.\n\n**정답 근거**\n\nwere analyzed는 복수 주어 samples의 과거 수동태입니다. were가 이미 과거 시제를 나타내고, 그 뒤에는 analyze의 과거분사 analyzed가 와야 합니다. 밑줄 부분의 오류를 고치는 문제이므로 3번을 선택합니다.\n\n**오답 분석**\n\n* 1번 analyze는 동사원형이라 were 뒤 과거분사 자리에 맞지 않습니다.\n* 2번 analyzes는 현재형이고 주어가 복수여서 수일치도 맞지 않습니다.\n* 4번 analyzing은 진행형의 일부일 뿐, were와 함께 수동태를 만들지 못합니다.\n\n**핵심 포인트**\n\n수동태는 be동사 뒤에 과거분사를 둡니다. analyze의 과거분사는 analyzed입니다.`,
    },
    {
      prompt: "The patient (　　) examined by the doctor now.",
      choices: ["is being", "is been", "was being", "being"],
      answer: 1,
      explanation: `**해석**\n\n그 환자는 지금 의사에게 검사받고 있는 중이다.\n\n**정답 근거**\n\nnow가 현재 진행 중임을 보여 줍니다. 환자는 검사하는 사람이 아니라 검사받는 대상이므로 현재 진행 수동태 **is being examined**가 필요합니다. 빈칸 뒤에 examined가 있으므로 빈칸에는 is being이 들어갑니다.\n\n**오답 분석**\n\n* 2번 is been은 be동사 뒤에 been을 둔 잘못된 진행 수동 형태입니다.\n* 3번 was being은 과거 진행이라 now와 맞지 않습니다.\n* 4번 being만으로는 현재 be동사 is가 없어 문장이 완성되지 않습니다.\n\n**핵심 포인트**\n\n현재 진행 수동은 **is/are being + 과거분사**로 기억합니다.`,
    },
    {
      prompt: "Researchers have completed the clinical trial.\n다음 중 수동태 문장으로 옳은 것은?",
      choices: ["The clinical trial has completed by researchers.", "The clinical trial has been completed by researchers.", "The clinical trial was been completed by researchers.", "The clinical trial has be completed by researchers."],
      answer: 2,
      explanation: `**해석**\n\n연구자들은 임상시험을 완료했다. 이를 수동태로 바꾸면 임상시험은 연구자들에 의해 완료되었다가 됩니다.\n\n**정답 근거**\n\n능동태의 목적어 the clinical trial을 수동태 주어로 옮깁니다. 현재완료 수동태는 **has/have been + 과거분사**이므로 has been completed가 정답입니다.\n\n**오답 분석**\n\n* 1번 has completed는 been이 빠져 현재완료 능동처럼 보이며 trial이 완료 행동을 하는 구조입니다.\n* 3번 was been은 과거 be동사와 완료형 been을 겹친 잘못된 조합입니다.\n* 4번 has be는 완료 수동에 필요한 been이 아니라 동사원형 be를 쓴 형태입니다.\n\n**핵심 포인트**\n\n현재완료 수동은 **has/have been + p.p.**이며, completed를 반드시 과거분사로 둡니다.`,
    },
    {
      prompt: "The medicine is safe for children.\n다음 문장과 의미가 가장 가까운 것은?",
      choices: ["Children can safely take the medicine.", "The medicine safely takes children.", "Children are taking the medicine safe.", "The medicine is taken children safely."],
      answer: 1,
      explanation: `**해석**\n\n그 약은 어린이에게 안전하다. 문맥상 어린이가 그 약을 안전하게 복용할 수 있다는 뜻입니다.\n\n**정답 근거**\n\n원문의 주어 medicine은 안전한 대상이고, 자연스러운 바꾸어 말하기는 Children can safely take the medicine입니다. can은 가능을 나타내고, children이 복용하는 주체가 되어 의미가 유지됩니다.\n\n**오답 분석**\n\n* 2번은 약이 어린이를 복용한다는 뜻처럼 되어 주어와 목적어 관계가 뒤집혔습니다.\n* 3번은 safe가 부사 자리에 쓰였고 문장 의미도 원문과 다릅니다.\n* 4번은 take 뒤에 사람 목적어를 바로 붙여 전치사나 수동 구조가 빠졌습니다.\n\n**핵심 포인트**\n\n수동태를 능동태로 바꿀 때는 행동을 받은 대상과 행동 주체의 자리를 바꾸되 원래 의미를 보존합니다.`,
    },
  ],
};

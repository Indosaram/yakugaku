import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g20-agreement",
  level: 3,
  title: "수일치·시제일치",
  summary: "주어의 수에 맞춰 동사를 고르고, 주절의 시계에 맞춰 종속절의 시제를 읽는다.",
  body: `:::analogy 동사는 '진짜 주어'의 단수·복수에 맞춰 옷을 갈아입습니다
주어와 동사 사이에 \`of these pills\` 같은 수식어가 끼어 있으면, 동사 바로 앞 명사에 속기 쉽습니다.
**수식어를 손으로 가리고 맨 앞 진짜 주어만 보세요.** 단수면 \`is / -s\`, 복수면 \`are / 원형\`입니다.
:::

:::formula 수일치 핵심 공식
[단수 주어] + (수식어 거품) + [is / was / 동사-s] => 예: The effect of the drugs is strong.
[복수 주어] + (수식어 거품) + [are / were / 동사원형] => 예: The effects of the drug are strong.
[The number of + 복수명사] + [단수동사] vs [A number of + 복수명사] + [복수동사]
[동명사 / to부정사 / 명사절 주어] + [단수동사] => 예: Taking vitamins is helpful.
:::

## 헷갈리는 주어 정리

| 주어 모양 | 동사 | 예 |
|---|---|---|
| \`Each / Every + 명사\` | 단수 | \`Every patient has a chart.\` |
| \`The number of ~\` | 단수 | \`The number of cases is rising.\` |
| \`A number of ~\` (많은) | 복수 | \`A number of cases are reported.\` |
| \`Most / Some / Half of + 명사\` | **of 뒤 명사에 맞춤** | \`Most of the water is clean.\` / \`Most of the pills are white.\` |
| \`-ing / to V / that절\` 주어 | 단수 | \`Sleeping well is important.\` |

:::train 문장 블록 기차로 진짜 주어 찾기
The side effects(진짜 주어:부작용들은) | of this new drug(수식어 거품:이 신약의) | are(복수 동사:이다) | mild(보어:가벼운) => 이 신약의 부작용들은 가볍다.
One of the patients(진짜 주어:환자들 중 한 명이) | has(단수 동사:가지고 있다) | a high fever(목적어:고열을) => 환자 중 한 명이 고열이 있다.
Eating vegetables(동명사 주어:채소를 먹는 것은) | is(단수 동사:이다) | good for health(보어:건강에 좋은) => 채소를 먹는 것은 건강에 좋다.
:::

:::transform 시제 일치: 주절이 과거면 that절도 한 칸 과거로
He says that the drug [is] safe. || He said that the drug [was] safe. || 주절이 said(과거)로 바뀌면 that절도 was로 맞춥니다.
예외: The teacher said that water [boils] at 100°C. || 과학 사실·진리는 언제나 현재형 || 변하지 않는 사실은 주절이 과거여도 현재형을 유지합니다.
:::

:::vs 수일치 단골 함정 O / X
The quality of these tablets [are] high. || The quality of these tablets [is] high. || 진짜 주어는 The quality(단수)입니다.
One of my friends [are] a nurse. || One of my friends [is] a nurse. || One(한 명)이 주어라 단수 동사를 씁니다.
The number of patients [are] increasing. || The number of patients [is] increasing. || The number(숫자) 하나가 주어입니다.
:::

:::steps 수일치 3초 풀이법
1. 거품 가리기 | of ~, in ~, with ~, 관계절을 괄호로 묶습니다. | The level (of sugar)
2. 진짜 주어 확인 | 괄호 밖 맨 앞 명사가 단수인지 복수인지 봅니다. | level = 단수
3. 동사 맞추기 | 단수면 is/was/-s, 복수면 are/were/원형을 고릅니다. | rises (O)
:::`,
  quiz: [
    {
      prompt: "The number of patients with asthma (　　) increasing every year.",
      choices: ["are", "is", "were", "have"],
      answer: 2,
      explanation: `**해석**\n천식이 있는 환자의 수는 매년 증가하고 있다.\n\n**정답 근거**\n주어는 patients가 아니라 ‘환자의 수’라는 하나의 개념인 **The number**입니다. 따라서 단수 동사 is가 필요하고, 뒤의 increasing과 함께 현재진행형 **is increasing**을 만듭니다.\n\n**오답 분석**\n1. are는 복수 주어에 씁니다.\n3. were는 과거형이라 every year와 맞지 않습니다.\n4. have는 복수 주어용이며 increasing 앞에 올 수 없습니다.\n\n**핵심 포인트**\n**the number of + 복수명사**는 단수 동사를 취합니다.`,
    },
    {
      prompt: "Each of the tablets (　　) a different color.",
      choices: ["have", "are having", "has", "contain"],
      answer: 3,
      explanation: `**해석**\n그 정제들은 각각 다른 색을 가지고 있다.\n\n**정답 근거**\n주어의 중심은 tablets가 아니라 각각을 뜻하는 **Each**입니다. Each는 단수 취급하므로 현재형 동사 have에 s를 붙인 **has**가 정답입니다. a different color는 has의 목적어입니다.\n\n**오답 분석**\n1. have는 복수 주어에 쓰므로 Each와 맞지 않습니다.\n2. are having은 진행형이며 색처럼 상태를 말하는 문장에도 맞지 않습니다.\n4. contain은 복수 동사이고 뜻도 ‘포함하다’라서 문맥에 맞지 않습니다.\n\n**핵심 포인트**\n**each of + 복수명사**의 동사는 each에 맞춥니다.`,
    },
    {
      prompt: "The pharmacist explained that the medicine (　　) safe at the recommended dose.",
      choices: ["is", "was", "has", "will"],
      answer: 2,
      explanation: `**해석**\n약사는 그 약이 권장 용량에서 안전했다고 설명했다.\n\n**정답 근거**\n주절의 explained가 과거입니다. that절은 약사가 설명한 당시의 상태를 나타내므로 현재형 is가 과거형 **was**로 한 칸 물러납니다. safe는 형용사라서 be동사가 필요합니다.\n\n**오답 분석**\n1. is는 지금도 변하지 않는 사실이라는 문맥이 있을 때 가능하지만, 이 문장은 당시 설명을 묻습니다.\n3. has 뒤에 safe만 올 수 없고 완료형도 되지 않습니다.\n4. will은 미래 의미라 과거 보고와 맞지 않습니다.\n\n**핵심 포인트**\n과거 주절 뒤의 당시 상태는 보통 과거형으로 씁니다.`,
    },
    {
      prompt: "다음 밑줄 친 부분 중 어법상 틀린 것을 고르시오.\nThe results of the clinical trial <u>shows</u> that the treatment <u>reduces</u> pain and <u>improves</u> sleep.",
      choices: ["shows", "reduces", "improves", "틀린 부분 없음"],
      answer: 1,
      explanation: `**해석**\n임상시험 결과는 그 치료가 통증을 줄이고 수면을 개선한다는 것을 보여 준다.\n\n**정답 근거**\n주어는 results로 복수입니다. of the clinical trial은 results를 설명하는 전치사구이므로 동사의 수를 바꾸지 않습니다. 따라서 show가 맞고 shows는 틀립니다. reduces와 improves는 that절의 주어 treatment가 단수라서 올바릅니다.\n\n**오답 분석**\n2. treatment가 단수이므로 reduces가 맞습니다.\n3. treatment가 단수이고 and로 연결된 동사이므로 improves가 맞습니다.\n4. shows에 분명한 수일치 오류가 있어 해당하지 않습니다.\n\n**핵심 포인트**\n**of + 명사**에 시선을 빼앗기지 말고 주어의 중심 명사를 찾습니다.`,
    },
    {
      prompt: "The scientist said that the samples (　　) before the machine was repaired.",
      choices: ["freeze", "have frozen", "had frozen", "will freeze"],
      answer: 3,
      explanation: `**해석**\n과학자는 기계가 수리되기 전에 샘플들이 얼었다고 말했다.\n\n**정답 근거**\nsaid가 과거이고, 샘플이 언 것은 기계가 수리된 것보다도 먼저입니다. 과거 기준점보다 앞선 일을 나타내는 과거완료 **had frozen**이 알맞습니다. samples가 복수여도 had는 모든 주어에 같은 형태입니다.\n\n**오답 분석**\n1. freeze는 현재형이라 과거 보고와 시간 관계를 나타내지 못합니다.\n2. have frozen은 현재완료라 said의 과거 기준과 어울리지 않습니다.\n4. will freeze는 미래 의미로 before절의 과거 사건과 맞지 않습니다.\n\n**핵심 포인트**\n과거 사건 두 개 중 더 먼저 일어난 사건에는 **had + 과거분사**를 씁니다.`,
    },
    {
      prompt: "A number of volunteers (　　) nausea after taking the new capsule.",
      choices: ["reports", "report", "is reporting", "has reported"],
      answer: 2,
      explanation: `**해석**\n많은 지원자가 새 캡슐을 복용한 뒤 메스꺼움을 보고한다.\n\n**정답 근거**\n**a number of + 복수명사**는 여러 명 또는 여러 개라는 뜻입니다. 실제 주어는 volunteers이므로 복수 동사 **report**를 씁니다. after taking은 복용한 뒤라는 시간 표현이고, 동사의 수를 결정하지 않습니다.\n\n**오답 분석**\n1. reports는 단수 주어용입니다.\n3. is reporting은 단수 be동사라 volunteers와 맞지 않습니다.\n4. has reported도 단수 주어용이며 이 문장의 일반적 보고와 시제도 다릅니다.\n\n**핵심 포인트**\n**a number of**는 복수, **the number of**는 단수라는 짝을 기억합니다.`,
    },
  ],
};

import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g27-reading-strategy",
  level: 4,
  title: "이과·의약 장문 읽기 전략",
  summary: "문장의 뼈대와 연결어를 먼저 잡아 의약 장문의 주장, 근거, 빈칸을 정확히 찾는다.",
  body: `:::analogy 장문은 '신호등이 있는 도로'입니다: 연결어 신호를 보면 글이 어디로 가는지 보입니다
\`However\`는 빨간불(방향 전환), \`For example\`은 초록불(같은 방향 예시), \`Therefore\`는 도착 표지(결론)입니다.
모든 단어를 해석하려 하지 말고 **신호등과 각 문단 첫 문장**만 이어도 글의 뼈대가 보입니다.
:::

:::formula 장문 읽기 공식
[설문 먼저 훑기] => 무엇을 찾아야 하는지 알고 읽기
[However / But / Yet] 뒤 => 필자의 진짜 주장 (밑줄·빈칸 정답 위치!)
[For example / For instance] 뒤 => 앞 문장의 구체적 예 (앞 문장이 핵심)
[Therefore / Thus / As a result] 뒤 => 결론·결과
[내용일치] => 본문 근거 문장 ↔ 선택지 1:1 대조 (상식으로 고르기 금지!)
:::

## 신호등 연결어 표

| 신호 | 연결어 | 다음에 오는 내용 |
|---|---|---|
| 방향 전환 | \`However\`, \`But\`, \`Nevertheless\`, \`On the other hand\` | 반대 내용, 진짜 주장 |
| 예시 | \`For example\`, \`For instance\`, \`such as\` | 앞 내용의 구체적 예 |
| 추가 | \`In addition\`, \`Moreover\`, \`Also\` | 같은 방향 정보 더하기 |
| 결과 | \`Therefore\`, \`Thus\`, \`As a result\`, \`Consequently\` | 원인에 따른 결론 |
| 원인 | \`because\`, \`due to\`, \`since\` | 이유 |

:::train 신호등 따라 읽기
Many people believe(통념:많은 사람이 믿는다) | vitamins prevent colds(내용:비타민이 감기를 예방한다고) => 일반적인 생각 (필자 주장 아님)
However(빨간불:하지만) | recent studies(주어:최근 연구들은) | show little effect(동사+목적어:효과가 거의 없음을 보여 준다) => 진짜 주장: 비타민의 감기 예방 효과는 거의 없다
Therefore(도착:따라서) | rest and sleep(주어:휴식과 수면이) | matter more(동사:더 중요하다) => 결론: 휴식과 수면이 더 중요하다
:::

:::transform 본문 표현 → 선택지 표현 (재진술)
본문: The drug [may reduce] pain. || 정답 선택지: The drug [can help ease] pain. || 같은 뜻을 다른 단어로 바꾼 선택지가 정답입니다.
본문: [Some] patients felt dizzy. || 오답 선택지: [All] patients felt dizzy. || some → all처럼 범위를 넓힌 선택지는 오답입니다.
:::

:::vs 내용일치 함정 O / X
본문에 없는 상식 내용을 고른다 || 본문 근거 문장과 1:1로 대조해서 고른다 || 맞는 상식이어도 본문에 없으면 오답입니다.
always / never / only / all이 들어간 선택지를 고른다 || 본문의 정도 표현(may, some, often)과 같은 선택지를 고른다 || 과장된 단어는 오답 신호입니다.
:::

:::steps 장문 실전 3단계
1. 설문 먼저 | 빈칸·밑줄·내용일치 설문을 먼저 훑어 찾을 것을 정합니다. | 빈칸 (A) 연결어
2. 신호등 표시 | However, Therefore, For example에 동그라미를 칩니다. | However 뒤 = 주장
3. 근거 대조 | 선택지마다 본문 근거 문장을 찾아 같은 뜻인지 확인합니다. | may reduce = can help ease
:::`,
  quiz: [
    {
      prompt: "The new drug lowered the fever; (　　), it caused a skin rash.",
      choices: ["therefore", "however", "for example", "because"],
      answer: 2,
      explanation: `**해석**\n새 약은 열을 낮췄지만, 피부 발진을 일으켰다.\n\n**정답 근거**\n앞의 긍정적 효과와 뒤의 부작용은 반대 관계이므로 **however**가 맞다.\n\n**오답 분석**\n- therefore는 결과라서 뒤가 앞의 결과일 때 쓴다.\n- for example은 구체적 사례를 시작할 때 쓴다.\n- because는 이유를 이끌며 이 자리에 문맥상 맞지 않는다.\n\n**핵심 포인트**\n연결어는 단어 뜻보다 앞뒤 관계를 먼저 확인한다.`
    },
    {
      prompt: "The effect of the treatment on patients (　　) significant.",
      choices: ["were", "are", "was", "be"],
      answer: 3,
      explanation: `**해석**\n그 치료가 환자에게 미친 효과는 중요했다.\n\n**정답 근거**\n주어의 핵심은 단수 명사 **effect**이고, 과거의 상태를 나타내므로 **was**가 정답이다. of the treatment와 on patients는 주어를 꾸미는 말이다.\n\n**오답 분석**\n- were는 복수 주어 또는 과거 be동사의 복수형이다.\n- are는 현재형이며 effect와 수가 맞지 않는다.\n- be는 원형이라 완전한 과거 서술문에 올 수 없다.\n\n**핵심 포인트**\n긴 명사구에서는 of 뒤 명사가 아니라 가장 앞의 핵심 명사로 수를 판단한다.`
    },
    {
      prompt: "The trial produced an unexpected result. (　　) result requires further study.",
      choices: ["This", "These", "Those", "They"],
      answer: 1,
      explanation: `**해석**\n그 시험은 예상 밖의 결과를 냈다. 이 결과는 추가 연구를 필요로 한다.\n\n**정답 근거**\n바로 앞의 단수 명사 result를 다시 가리키므로 단수 지시어 **This**가 맞다.\n\n**오답 분석**\n- These는 가까운 복수 대상을 가리킨다.\n- Those는 먼 복수 대상을 가리킨다.\n- They는 복수 대명사라 단수 result와 수가 맞지 않는다.\n\n**핵심 포인트**\nthis가 나오면 앞 문장의 어떤 내용이나 결과를 가리키는지 찾아 연결한다.`
    },
    {
      prompt: "Because the bacteria became resistant, the treatment no longer (　　).",
      choices: ["work", "worked", "working", "to work"],
      answer: 2,
      explanation: `**해석**\n세균이 내성을 갖게 되었기 때문에 치료는 더 이상 효과가 없었다.\n\n**정답 근거**\n주어 the treatment 뒤의 본동사가 필요하고, 문장 전체가 과거 사건이므로 과거형 **worked**가 알맞다. no longer는 ‘더 이상 ...하지 않다’라는 부사다.\n\n**오답 분석**\n- work는 현재형 원형이라 과거 문장과 맞지 않는다.\n- working은 be동사 없이 본동사가 될 수 없다.\n- to work는 to부정사라 주절의 서술동사 자리에 올 수 없다.\n\n**핵심 포인트**\nbecause절이 앞에 와도 주절의 주어와 동사를 따로 확인한다.`
    },
    {
      prompt: "다음 밑줄 친 부분 중 어법상 틀린 것을 고르시오.\nThe researchers <u>(A) examined</u> a vaccine <u>(B) who</u> protects older adults and <u>(C) reported</u> the result <u>(D) clearly</u>.",
      choices: ["(A)", "(B)", "(C)", "(D)"],
      answer: 2,
      explanation: `**해석**\n연구자들은 고령자를 보호하는 백신을 조사하고 그 결과를 명확하게 보고했다.\n\n**정답 근거**\n선행사(뒤에서 설명을 받는 앞의 명사)가 사람 아닌 vaccine이므로 관계대명사는 **which** 또는 **that**이어야 한다. 따라서 (B)의 who가 틀렸다.\n\n**오답 분석**\n- (A) examined는 연구자들이 백신을 조사했다는 과거 동사로 맞다.\n- (C) reported는 and 뒤에 이어지는 과거 동사로 맞다.\n- (D) clearly는 reported를 꾸미는 부사로 맞다.\n\n**핵심 포인트**\n관계절을 만났을 때 that 뒤의 명사가 사람인지 사물인지 확인한다.`
    },
    {
      prompt: "Although the medicine was effective, it was too expensive for many patients. Which is closest in meaning to **Although**?",
      choices: ["Because", "Even though", "Therefore", "For example"],
      answer: 2,
      explanation: `**해석**\n그 약은 효과가 있었지만, 많은 환자에게 너무 비쌌다.\n\n**정답 근거**\n**Although**는 ‘비록 ...이지만’이라는 양보를 나타내며 **Even though**와 같은 뜻이다. 효과와 비싸다는 한계를 함께 제시한다.\n\n**오답 분석**\n- Because는 이유를 나타내므로 관계가 달라진다.\n- Therefore는 결과를 나타내는 연결어다.\n- For example은 사례를 시작하는 표현이다.\n\n**핵심 포인트**\n동의어 문제도 단어만 바꾸지 말고 문장 안의 논리 관계가 같은지 확인한다.`
    }
  ]
};

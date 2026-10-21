import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g01-parts-of-speech",
  level: 1,
  title: "품사 8가지",
  summary: "영어 단어가 문장 안에서 맡는 역할을 찾아 빈칸과 오류를 해결한다.",
  body: `:::analogy 단어마다 맡은 직업(이름표)이 있습니다
교실에 선생님, 반장, 급식 당번이 있듯 영어 단어도 문장 안에서 맡는 직업이 정해져 있습니다.
이 직업 이름표를 **품사**라고 부릅니다. 빈칸 문제는 뜻보다 **무슨 직업이 필요한 자리인지** 먼저 봐야 풀립니다.
:::

:::formula 품사 핵심 짝꿍 공식
[관사 a/the] + [형용사] + [명사] => 명사 덩어리 (예: the safe drug)
[동사] + [부사 -ly] => 행동 방식 설명 (예: works quickly)
[전치사 in/on/for] + [명사] => 장소·시간·이유 조각 (예: in the hospital)
[접속사 because/although] + [주어 + 동사] => 두 문장 연결
:::

## 8가지 품사 한눈에 보기

| 품사 | 쉬운 뜻 | 대표 단어 | 문장 속 자리 |
|---|---|---|---|
| **명사** | 사람·물건·생각의 이름표 | \`patient\`, \`drug\`, \`safety\` | 주어, 목적어, 전치사 뒤 |
| **대명사** | 명사 대신 부르는 말 | \`it\`, \`they\`, \`this\` | 주어, 목적어 |
| **동사** | 움직임이나 상태 (~다) | \`take\`, \`reduce\`, \`is\` | 주어 바로 뒤 |
| **형용사** | 명사가 어떤지 꾸미는 말 | \`safe\`, \`effective\`, \`new\` | 명사 앞, \`be동사\` 뒤 |
| **부사** | 어떻게·얼마나 (동사·형용사 꾸밈) | \`quickly\`, \`carefully\`, \`very\` | 동사 앞뒤, 형용사 앞 |
| **전치사** | 명사 앞 위치·시간 꼬리표 | \`in\`, \`on\`, \`after\`, \`with\` | 명사(또는 \`-ing\`) 바로 앞 |
| **접속사** | 문장과 문장을 잇는 접착제 | \`and\`, \`but\`, \`because\` | 절과 절 사이 |
| **감탄사** | 놀람·부름 소리 | \`Oh!\`, \`Well,\` | 문장 맨 앞 독립 |

:::train 문장 블록 기차로 품사 확인하기
The patient(명사:환자는) | takes(동사:복용한다) | medicine(명사:약을) => 환자는 약을 복용한다.
The new tablet(형용사+명사:새 정제는) | is(동사:이다) | effective(형용사:효과적인) => 새 정제는 효과가 있다.
She(대명사:그녀는) | checks(동사:확인한다) | the label(명사:라벨을) | carefully(부사:주의 깊게) => 그녀는 라벨을 주의 깊게 확인한다.
Because(접속사:~이기 때문에) | the dose(명사:복용량이) | is small(동사+형용사:적다) | the risk is low(주절:위험이 낮다) => 복용량이 적기 때문에 위험이 낮다.
:::

:::transform 꼬리 모양을 보면 품사가 바뀝니다
safe (형용사: 안전한) || safely (부사: 안전하게) || 형용사에 [-ly]를 붙이면 동사를 꾸미는 부사가 됩니다.
safe (형용사: 안전한) || safety (명사: 안전성) || [-ty / -tion / -ness]가 붙으면 이름표(명사)가 됩니다.
absorb (동사: 흡수하다) || was quickly absorbed (부사 + 분사) || 동사·분사를 꾸밀 때는 부사 [quickly]가 들어갑니다.
:::

:::vs 시험에 꼭 나오는 품사 함정 O / X
The drug is [safety]. || The drug is [safe]. || be동사 뒤에서 약의 상태를 설명할 때는 명사(safety)가 아니라 형용사(safe)를 씁니다.
The nurse works [careful]. || The nurse works [carefully]. || 일하는 행동(works)을 꾸미므로 부사(carefully)가 맞습니다.
after [take] the pill || after [taking] the pill || 전치사(after) 뒤에는 동사원형이 올 수 없고 명사나 동명사(-ing)가 옵니다.
[Because] the high fever || [Because of] the high fever || 뒤에 동사가 없이 명사 덩어리만 오면 전치사(Because of)를 씁니다.
:::

:::steps 星薬 기출 품사 문제 3초 풀이법
1. 빈칸 앞뒤 확인 | 빈칸 바로 뒤에 명사가 있는지, 앞에 동사가 있는지 먼저 봅니다. | a (　　) result → 뒤에 명사 result!
2. 필요한 직업 고르기 | 명사를 꾸미면 형용사, 동사·분사를 꾸미면 부사(-ly)를 고릅니다. | result를 꾸밀 형용사 필요!
3. 보기 꼬리 비교 | 보기의 끝 모양(-ive, -ly, -tion)을 보고 알맞은 품사를 찍습니다. | promising(형용사) 정답!
:::`,
  quiz: [
    {
      prompt: "The clinical trial showed a (　　) result.",
      choices: ["promising", "promise", "promisingly", "promised"],
      answer: 1,
      explanation: `**해석**\n\n임상 시험은 유망한 결과를 보여 주었다.\n\n**정답 근거**\n\nresult는 명사이고, 그 앞에서 결과의 성질을 설명해야 하므로 형용사 promising이 맞다.\n\n**오답 분석**\n\n• 2번 promise는 약속 또는 약속하다라는 명사나 동사다.\n• 3번 promisingly는 유망하게라는 부사다.\n• 4번 promised는 약속된이라는 과거분사로 이 자리의 자연스러운 형용사가 아니다.\n\n**핵심 포인트**\n\n명사 앞에서 성질을 설명하는 말은 형용사다.`,
    },
    {
      prompt: "The nurse explained the procedure (　　).",
      choices: ["clear", "clearly", "clarity", "clearness"],
      answer: 2,
      explanation: `**해석**\n\n간호사는 절차를 명확하게 설명했다.\n\n**정답 근거**\n\nexplained라는 동작이 어떻게 이루어졌는지를 설명하므로 부사 clearly가 필요하다.\n\n**오답 분석**\n\n• 1번 clear는 형용사로 명사나 상태를 설명한다.\n• 3번 clarity는 명확성이라는 명사다.\n• 4번 clearness도 명사이지만 이 문장에서는 동작의 방식을 나타내지 못한다.\n\n**핵심 포인트**\n\n동사를 꾸미는 품사는 보통 부사이며, 형용사에 ly가 붙어 부사가 되기도 한다.`,
    },
    {
      prompt: "The tablets are stored (　　) a cool place.",
      choices: ["at", "in", "and", "because"],
      answer: 2,
      explanation: `**해석**\n\n정제들은 서늘한 장소에 보관된다.\n\n**정답 근거**\n\n장소인 a cool place 앞에서 안에 있다는 관계를 나타내는 전치사 in이 필요하다.\n\n**오답 분석**\n\n• 1번 at은 특정 지점에 쓰여 in a place와 뜻이 다르다.\n• 3번 and는 두 요소를 잇는 접속사라 장소 관계를 만들 수 없다.\n• 4번 because는 이유를 이끄는 접속사라 문장 구조가 맞지 않는다.\n\n**핵심 포인트**\n\n전치사 뒤에는 명사 덩어리가 오며 장소 관계를 표시한다.`,
    },
    {
      prompt: "Choose the part that is grammatically incorrect. The doctor <u>spoke calm</u> to the patient.",
      choices: ["The doctor", "spoke calm", "to the patient", "No error"],
      answer: 2,
      explanation: `**해석**\n\n의사는 환자에게 침착하게 말했다.\n\n**정답 근거**\n\nspoke라는 동사의 방식을 설명하므로 형용사 calm이 아니라 부사 calmly가 필요하다. 밑줄 부분은 spoke calmly가 되어야 한다.\n\n**오답 분석**\n\n• 1번 The doctor는 행동 주체인 명사 주어로 올바르다.\n• 3번 to the patient는 말의 상대를 나타내는 전치사구다.\n• 4번 No error는 calm의 품사 오류가 있으므로 틀리다.\n\n**핵심 포인트**\n\n동작을 수식할 때 형용사와 부사를 구별한다.`,
    },
    {
      prompt: "The pharmacist checked the label (　　) the patient took the medicine.",
      choices: ["before", "careful", "safe", "tablet"],
      answer: 1,
      explanation: `**해석**\n\n환자가 약을 복용하기 전에 약사는 라벨을 확인했다.\n\n**정답 근거**\n\nbefore는 시간의 앞뒤를 연결하는 접속사로, 뒤에 주어 the patient와 동사 took가 있는 절을 이끈다.\n\n**오답 분석**\n\n• 2번 careful은 형용사라 두 절을 연결할 수 없다.\n• 3번 safe는 안전한이라는 형용사다.\n• 4번 tablet은 정제라는 명사라 시간 관계를 나타내지 못한다.\n\n**핵심 포인트**\n\n뒤에 주어와 동사가 모두 있으면 절을 이끄는 접속사를 의심한다.`,
    },
    {
      prompt: "The new drug (　　) reduces inflammation.",
      choices: ["effect", "effective", "effectively", "effectiveness"],
      answer: 3,
      explanation: `**해석**\n\n새 약은 염증을 효과적으로 줄인다.\n\n**정답 근거**\n\nreduces라는 동작을 어떻게 하는지 설명하므로 부사 effectively가 알맞다. The new drug는 주어이고 reduces가 동사다.\n\n**오답 분석**\n\n• 1번 effect는 효과라는 명사다.\n• 2번 effective는 효과적인이라는 형용사로 동사 reduces를 직접 꾸밀 수 없다.\n• 4번 effectiveness는 효과라는 명사다.\n\n**핵심 포인트**\n\n주어와 동사를 찾은 뒤 동작을 수식하는 빈칸이면 부사를 고른다.`,
    },
  ],
};

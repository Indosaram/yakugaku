import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g24-word-formation",
  level: 4,
  title: "접두사·접미사·어근으로 단어 추측",
  summary: "낯선 단어도 어근의 뜻과 접두사, 접미사의 품사를 나누어 보면 문장 속 의미와 정답을 추측할 수 있다.",
  body: `:::analogy 긴 영단어는 레고 블록 3개(앞조각 + 몸통 + 꼬리)로 만들어져 있습니다
\`unpredictable\` = \`un\`(아님) + \`predict\`(예측하다) + \`able\`(~할 수 있는). 그래서 "예측할 수 없는"입니다.
**앞조각은 뜻**을, **꼬리는 품사**를 알려 줍니다. 모르는 단어도 조각만 알면 뜻을 추측할 수 있습니다.
:::

:::formula 단어 레고 공식
[앞조각 (뜻 바꾸기)] + [몸통 (어근)] + [꼬리 (품사 결정)] => 새 단어
꼬리 → 명사: [-tion / -ment / -ness / -ity / -ance]
꼬리 → 형용사: [-ive / -ous / -able / -al / -ful / -less]
꼬리 → 동사: [-ize / -ify / -en] / 꼬리 → 부사: [-ly]
:::

## 의약 지문 필수 앞조각·몸통

| 조각 | 뜻 | 예 |
|---|---|---|
| \`anti-\` | 반대·대항 | \`antibiotic\` 항생제, \`antibody\` 항체 |
| \`pre-\` | 미리 | \`prevent\` 예방하다, \`prescribe\` 처방하다 |
| \`re-\` | 다시 | \`recover\` 회복하다, \`relapse\` 재발 |
| \`over- / under-\` | 지나치게 / 부족하게 | \`overdose\` 과다 복용, \`underweight\` 저체중 |
| \`un- / in- / dis-\` | 아님·반대 | \`unknown\`, \`insufficient\`, \`disorder\` |
| \`bio\` / \`cardi\` / \`neur\` | 생명 / 심장 / 신경 | \`biology\`, \`cardiac\`, \`neuron\` |

:::train 단어 레고 분해하기
anti(앞조각:대항) | bio(몸통:생명·균) | tic(꼬리:명사/형용사) => antibiotic = 항생제 (균에 대항하는 것)
in(앞조각:아님) | effect(몸통:효과) | ive(꼬리:형용사) => ineffective = 효과 없는
over(앞조각:지나치게) | dose(몸통:복용량) => overdose = 과다 복용
:::

:::transform 꼬리만 바꾸면 품사가 바뀝니다
effect (명사: 효과) || effective (형용사: 효과적인) → effectively (부사: 효과적으로) || 빈칸 자리에 맞는 꼬리를 고르면 됩니다.
sufficient (충분한) || insufficient (불충분한) || 앞조각 in-이 붙으면 뜻이 반대가 됩니다.
:::

:::vs 꼬리 함정 O / X
The treatment was very [effect]. || The treatment was very [effective]. || be동사 뒤 보어는 형용사 꼬리(-ive)입니다.
The [prevent] of disease is important. || The [prevention] of disease is important. || The 뒤 주어 자리는 명사 꼬리(-tion)입니다.
:::

:::steps 모르는 단어 3초 추측법
1. 꼬리 보고 품사 | -tion이면 명사, -ive면 형용사, -ly면 부사 | -ous → 형용사
2. 앞조각 보고 방향 | un/in/dis면 반대 뜻, re면 다시, pre면 미리 | dis- → 반대
3. 몸통 + 문맥 | 아는 몸통과 앞뒤 문장으로 뜻을 정합니다. | disorder = 질서가 깨진 것 = 질환
:::`,
  quiz: [
    {
      prompt: "The new treatment was highly (　　) in reducing pain.",
      choices: ["effect", "effective", "effectively", "effectiveness"],
      answer: 2,
      explanation: `**해석**

새 치료는 통증을 줄이는 데 매우 효과적이었다.

**정답 근거**

be동사 *was* 뒤에서 주어의 상태를 설명하고, *highly*가 꾸미는 말은 형용사입니다. 따라서 효과적인이라는 뜻의 **effective**가 맞습니다.

**오답 분석**

• *effect*: 효과라는 명사라서 보어 자리에 맞지 않습니다.
• *effectively*: 효과적으로라는 부사라서 *was* 뒤 상태 설명에 맞지 않습니다.
• *effectiveness*: 효과성이라는 명사라서 문장 구조와 다릅니다.

**핵심 포인트**

어근 *effect*를 발견한 뒤 빈칸의 품사를 먼저 결정합니다.`,
    },
    {
      prompt: "The nurse recorded the patient's pulse (　　).",
      choices: ["accurate", "accuracy", "accurately", "inaccuracy"],
      answer: 3,
      explanation: `**해석**

간호사는 환자의 맥박을 정확하게 기록했다.

**정답 근거**

빈칸은 동사 *recorded*가 어떻게 이루어졌는지 설명합니다. 동사를 꾸미는 부사가 필요하므로 **accurately**가 정답입니다. *-ly*는 대개 형용사를 부사로 바꿉니다.

**오답 분석**

• *accurate*: 정확한이라는 형용사라서 동사를 직접 꾸밀 수 없습니다.
• *accuracy*: 정확성이라는 명사입니다.
• *inaccuracy*: 부정 접두사 *in-*이 붙은 부정적 명사라서 뜻과 품사가 모두 맞지 않습니다.

**핵심 포인트**

명사 뒤가 아니라 동사 뒤의 빈칸이면 “어떻게”를 묻는 부사를 의심합니다.`,
    },
    {
      prompt: "The hospital decided to (　　) the blood test after a machine error.",
      choices: ["test", "retest", "testing", "tested"],
      answer: 2,
      explanation: `**해석**

병원은 기계 오류 후 혈액 검사를 다시 하기로 결정했다.

**정답 근거**

*decided to* 뒤에는 동사원형이 오고, 기계 오류 뒤에 검사를 다시 한다는 뜻이 필요합니다. “다시”를 뜻하는 접두사 *re-*와 *test*가 결합한 **retest**가 알맞습니다.

**오답 분석**

• *test*: 검사하다라는 기본 뜻은 되지만 “다시”라는 문맥을 놓칩니다.
• *testing*: 동명사 또는 현재분사 형태라 *to* 뒤에 올 수 없습니다.
• *tested*: 과거형 또는 과거분사라 *to* 뒤 동사원형 자리에 맞지 않습니다.

**핵심 포인트**

접두사 뜻뿐 아니라 앞의 *to*가 요구하는 동사 형태도 함께 확인합니다.`,
    },
    {
      prompt: "Which word is closest in meaning to <u>harmless</u>?",
      choices: ["safe", "dangerous", "powerful", "infectious"],
      answer: 1,
      explanation: `**해석**

밑줄 친 *harmless*와 가장 가까운 뜻을 고르는 문제입니다. *harmless*는 해가 없는이라는 뜻입니다.

**정답 근거**

접미사 *-less*는 “어근이 없는”이라는 뜻을 더합니다. *harm*은 해이므로 *harmless*는 해가 없는, 즉 **safe**와 가깝습니다.

**오답 분석**

• *dangerous*: 위험한이라는 반대 뜻입니다.
• *powerful*: 강력한이라는 뜻으로 안전 여부와 다릅니다.
• *infectious*: 전염성 있는이라는 의학적 성질을 말합니다.

**핵심 포인트**

*-less*를 보면 어근의 뜻이 없다는 방향으로 읽어 반대 의미를 잡습니다.`,
    },
    {
      prompt: "Choose the incorrect underlined part. The medicine was <u>safety</u> for children.",
      choices: ["The medicine", "was", "safety", "for children"],
      answer: 3,
      explanation: `**해석**

그 약은 어린이에게 안전했다라는 뜻을 만들려는 문장입니다.

**정답 근거**

be동사 *was* 뒤에서 약의 상태를 설명해야 하므로 형용사 **safe**가 필요합니다. *safety*는 안전성이라는 명사이므로 밑줄 친 세 번째 부분이 틀렸습니다. 올바른 문장은 The medicine was safe for children. 입니다.

**오답 분석**

• *The medicine*: 약을 가리키는 주어로 자연스럽습니다.
• *was*: 과거의 상태를 나타내는 be동사로 알맞습니다.
• *for children*: 누구에게 안전한지 대상을 나타내므로 자연스럽습니다.

**핵심 포인트**

*-ty*가 붙은 명사와 기본 형용사를 구별하고, be동사 뒤 품사를 확인합니다.`,
    },
    {
      prompt: "The doctor explained the procedure (　　) to the patient.",
      choices: ["clear", "clearly", "clearness", "unclear"],
      answer: 2,
      explanation: `**해석**

의사는 환자에게 그 절차를 명확하게 설명했다.

**정답 근거**

빈칸은 동사 *explained*의 방식을 설명하므로 부사가 필요합니다. 형용사 *clear*에 *-ly*를 붙인 **clearly**가 정답입니다. 환자에게 이해하기 쉽게 설명했다는 문맥에도 맞습니다.

**오답 분석**

• *clear*: 명확한이라는 형용사라 동사의 방식을 직접 설명하지 못합니다.
• *clearness*: 명확함이라는 명사입니다.
• *unclear*: 명확하지 않은이라는 형용사라 품사와 문맥 모두 맞지 않습니다.

**핵심 포인트**

동작을 꾸미는 자리에는 *-ly* 부사를 넣고, *un-*은 문맥상 부정이 필요한지 따로 판단합니다.`,
    }
  ]
};

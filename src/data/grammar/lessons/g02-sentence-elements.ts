import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g02-sentence-elements",
  level: 1,
  title: "문장의 요소",
  summary: "영어 문장에서 주어, 동사, 목적어, 보어, 수식어의 자리를 찾습니다.",
  body: `:::analogy 문장은 기차 칸과 같습니다
기차가 달리려면 맨 앞 **기관차(주어)**와 동력을 내는 **엔진(동사)**이 꼭 있어야 합니다.
그 뒤에 실리는 화물이 **목적어·보어**이고, 기차 옆에 붙은 깃발 장식이 **수식어(시간·장소)**입니다. 장식을 떼어 내도 기차는 달립니다.
:::

:::formula 문장의 5가지 자리(성분) 공식
[주어 S] + [동사 V] => 누가 + 무엇을 하다/어떤 상태다 (모든 문장의 필수 뼈대)
[동사 V] + [목적어 O] => 행동을 받는 대상 (~을/를)
[be동사 V] + [보어 C] => 주어의 상태를 보충 설명 (주어 = 보어)
[전치사 + 명사] / [부사] => 수식어 M (괄호로 묶어 덜어 내면 뼈대가 보임!)
:::

## 문장 성분 5가지 비교

| 기호 | 이름 | 쉬운 질문 | 자리에 올 수 있는 품사 |
|---|---|---|---|
| **S** | **주어** | 누가? 무엇이? (주인공) | 명사, 대명사, 동명사(\`-ing\`), \`to부정사\` |
| **V** | **동사** | 무엇을 하나? 어떤 상태인가? | 동사 (\`takes\`, \`is\`, \`was absorbed\`) |
| **O** | **목적어** | 누구를? 무엇을? (행동 대상) | 명사, 대명사, 동명사, \`to부정사\` |
| **C** | **보어** | 주어(또는 목적어)가 어떤 상태인가? | 형용사, 명사 (**부사는 보어 불가!**) |
| **M** | **수식어** | 언제? 어디서? 어떻게? (덧붙임) | 부사, 전치사+명사 (\`in the body\`) |

:::train 문장 블록 기차로 뼈대와 수식어 구분하기
The pharmacist(주어:약사는) | checked(동사:확인했다) | the prescription(목적어:처방전을) | carefully(수식어:주의 깊게) => 약사는 처방전을 주의 깊게 확인했다.
The side effects(주어:부작용들은) | of this drug(수식어:이 약의) | are(동사:이다) | mild(보어:가벼운) => 이 약의 부작용들은 가볍다.
Every morning(수식어:매일 아침) | the patient(주어:환자는) | drinks(동사:마신다) | warm water(목적어:따뜻한 물을) => 매일 아침 환자는 따뜻한 물을 마신다.
This ointment(주어:이 연고는) | keeps(동사:유지한다) | the skin(목적어:피부를) | moist(보어:촉촉한 상태로) => 이 연고는 피부를 촉촉하게 유지한다.
:::

:::transform 수식어 거품을 걷어 내면 뼈대가 보입니다
The doctor [in the emergency room] examined the patient [last night]. || The doctor | examined | the patient. || 전치사구(in ~, last night)를 지우면 [주어 + 동사 + 목적어] 3조각만 남습니다.
The level [of blood sugar] rises [after meals]. || The level | rises. || of blood sugar를 걷어 내면 단수 주어(The level)와 단수 동사(rises)가 바로 보입니다.
:::

:::vs 문장 성분 단골 함정 O / X
The medicine kept the patient [comfortably]. || The medicine kept the patient [comfortable]. || 환자(목적어)의 상태를 설명하는 보어 자리이므로 부사(-ly)가 아니라 형용사(comfortable)를 씁니다.
The results of the clinical trial [shows] hope. || The results of the clinical trial [show] hope. || of the clinical trial은 수식어이고 진짜 주어는 복수인 The results이므로 show가 맞습니다.
[In the clinic] is busy today. || [The clinic] is busy today. || 전치사구(In the clinic)는 수식어라 주어가 될 수 없습니다. 명사(The clinic)만 주어가 됩니다.
:::

:::steps 긴 문장 뼈대 찾기 3단계
1. 전치사구 괄호 치기 | in, on, of, for, after로 시작하는 명사 덩어리를 ( )로 묶어 둡니다. | The dose (of the drug) is low.
2. 동사 먼저 찾기 | 시제가 있는 동사(is, takes, reduced)를 찾습니다. | 동사 = is
3. 동사 앞 주어 확인 | 괄호를 뺀 동사 앞 명사가 진짜 주어입니다. | 주어 = The dose
:::`,
  quiz: [
    {
      prompt: "The pharmacist (　　) the dosage to the patient.",
      choices: ["careful", "explains", "safe", "in the clinic"],
      answer: 2,
      explanation: `**해석**

약사는 환자에게 복용량을 설명한다는 뜻입니다. 문장에는 주어 The pharmacist와 목적어 the dosage가 있으므로 가운데 행동이 필요합니다.

**정답 근거**

정답은 **explains**입니다. 약사가 복용량을 설명한다는 동사가 주어와 목적어를 연결합니다. 현재형 3인칭 단수 주어이므로 explain이 아니라 explains를 씁니다.

**오답 분석**

- **careful**: 형용사라서 행동을 나타내지 못합니다.
- **safe**: 상태를 설명하는 보어이지 동사가 아닙니다.
- **in the clinic**: 장소 수식어라서 문장 중심의 동사가 되지 못합니다.

**핵심 포인트**

주어와 목적어 사이의 빈칸은 먼저 동사 자리인지 확인하고, 주어가 3인칭 단수인지 살핍니다.`,
    },
    {
      prompt: "The new vaccine became (　　) after testing.",
      choices: ["safely", "safety", "safe", "saves"],
      answer: 3,
      explanation: `**해석**

새 백신은 시험 후 안전해졌다라는 뜻입니다. became는 주어의 상태 변화를 이어 주므로 뒤에서 백신의 상태를 설명해야 합니다.

**정답 근거**

정답은 **safe**입니다. safe는 형용사로서 주어 The new vaccine의 상태를 설명하는 주격보어입니다. become 뒤에는 보통 명사나 형용사 보어가 옵니다.

**오답 분석**

- **safely**: 방법을 나타내는 부사라서 백신의 상태를 설명하는 자리에 맞지 않습니다.
- **safety**: 안전이라는 명사이므로 여기서 필요한 형용사 보어가 아닙니다.
- **saves**: 동사이므로 became 뒤에 또 중심 동사를 놓을 수 없습니다.

**핵심 포인트**

be, become, seem 뒤에서는 주어를 설명하는 보어를 찾고, 상태를 나타내는 형용사를 우선 확인합니다.`,
    },
    {
      prompt: "In ‘The nurse checked the patient carefully,’ what is the object?",
      choices: ["The nurse", "checked", "the patient", "carefully"],
      answer: 3,
      explanation: `**해석**

문장은 간호사가 환자를 주의 깊게 확인했다는 뜻입니다. 누가 확인했는지는 The nurse이고, 어떻게 확인했는지는 carefully입니다.

**정답 근거**

정답은 **the patient**입니다. checked라는 행동을 받은 대상이 환자이므로 목적어입니다. 목적어는 동사 뒤에서 무엇을 확인했는지 답해 줍니다.

**오답 분석**

- **The nurse**: 확인하는 주체이므로 주어입니다.
- **checked**: 확인한다는 행동을 나타내는 동사입니다.
- **carefully**: 어떻게 확인했는지 알려 주는 방법 수식어입니다.

**핵심 포인트**

동사에 ‘무엇을, 누구를?’라고 질문하고 답이 되는 명사나 명사구를 목적어로 찾습니다.`,
    },
    {
      prompt: "The results made the safety problem (　　).",
      choices: ["clear", "clearly", "clarity", "clears"],
      answer: 1,
      explanation: `**해석**

그 결과는 안전성 문제를 분명하게 만들었다, 즉 분명하게 드러냈다는 뜻입니다. made 뒤에는 목적어와 그 목적어의 상태를 설명하는 말이 이어집니다.

**정답 근거**

정답은 **clear**입니다. the safety problem이 목적어이고, clear는 그 문제가 어떤 상태가 되었는지 설명하는 목적격보어입니다. 목적격보어 자리에는 형용사가 올 수 있습니다.

**오답 분석**

- **clearly**: 부사라서 문제의 상태를 나타내는 보어 자리에 맞지 않습니다.
- **clarity**: 명사이지만 이 문장에서는 ‘분명한’이라는 형용사가 필요합니다.
- **clears**: 동사 형태라서 made 뒤에 새로운 동사를 놓게 됩니다.

**핵심 포인트**

make, find, keep 뒤에 목적어가 있으면 그 뒤에서 목적어를 설명하는 형용사 보어가 필요한지 확인합니다.`,
    },
    {
      prompt: "다음 밑줄 친 부분 중 문장의 요소 구성이 잘못된 것은? The doctor <u>gave</u> the patient <u>advice</u> <u>careful</u>.",
      choices: ["gave", "the patient", "advice", "careful"],
      answer: 4,
      explanation: `**해석**

의사는 환자에게 조언을 주의 깊게 주었다가 아니라, 문장 끝의 말이 조언을 꾸미려는 뜻으로 보입니다. advice는 셀 수 없는 명사이며, 이를 꾸미는 말은 형용사 careful이 아니라 부사 carefully입니다.

**정답 근거**

정답은 **careful**입니다. careful은 형용사로 명사를 꾸미거나 보어가 될 수 있지만, 여기서는 gave라는 행동의 방법을 설명하는 수식어 자리입니다. 따라서 **carefully**가 맞습니다.

**오답 분석**

- **gave**: 주어가 환자에게 무엇을 주는지 연결하는 올바른 동사입니다.
- **the patient**: 주는 사람을 나타내는 간접목적어입니다.
- **advice**: 주어진 내용을 나타내는 직접목적어로 자연스럽습니다.

**핵심 포인트**

동작을 꾸미면 부사, 명사를 꾸미면 형용사입니다. 문장 끝이라고 무조건 보어라고 판단하지 마세요.`,
    },
    {
      prompt: "단어를 바르게 배열하시오: in the laboratory / the researcher / measured / the drug level",
      choices: ["In the laboratory measured the researcher the drug level.", "The researcher measured the drug level in the laboratory.", "The drug level in the laboratory the researcher measured.", "Measured the researcher in the laboratory the drug level."],
      answer: 2,
      explanation: `**해석**

연구자는 실험실에서 약물 수치를 측정했다는 뜻의 문장을 만들어야 합니다. 먼저 누가 행동하는지와 행동이 무엇인지 묶으면 순서를 쉽게 정할 수 있습니다.

**정답 근거**

정답은 **The researcher measured the drug level in the laboratory.**입니다. 주어 The researcher 뒤에 동사 measured, 목적어 the drug level이 오고, 장소 수식어 in the laboratory가 뒤에 붙습니다.

**오답 분석**

- **In the laboratory measured the researcher the drug level.**: 장소 수식어 뒤의 어순이 부자연스럽고 주어와 동사의 배열이 흐트러졌습니다.
- **The drug level in the laboratory the researcher measured.**: 목적어를 문장 앞에 둔 형태로 기본 어순이 아닙니다.
- **Measured the researcher in the laboratory the drug level.**: 동사가 주어보다 먼저 와서 평서문 뼈대가 깨집니다.

**핵심 포인트**

정렬은 주어 + 동사 + 목적어를 먼저 만들고 시간, 장소, 방법 수식어를 붙이는 순서로 풉니다.`,
    },
  ],
};

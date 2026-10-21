import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g12-conjunctions",
  level: 2,
  title: "접속사: 등위·종속",
  summary: "접속사는 단어와 절을 이어 주며, 등위 접속사는 같은 자격을, 종속 접속사는 이유와 조건 같은 관계를 보여 줍니다.",
  body: `:::analogy 접속사는 두 문장을 이어 주는 '논리 다리'입니다
문장 두 개를 그냥 나란히 놓으면 왜 이어지는지 알 수 없습니다.
사이에 **\`because\`(원인 다리)**, **\`although\`(반대 다리)**, **\`if\`(조건 다리)**를 놓으면 앞 문장과 뒤 문장이 어떤 관계인지 즉시 드러납니다.
:::

:::formula 접속사 vs 전치사 1초 판별 공식 (시험 출제 1순위!)
[접속사 (because / although / while)] + [주어 + 동사] => 뒤에 동사가 있으면 무조건 접속사!
[전치사 (because of / despite / during)] + [명사 덩어리] => 뒤에 동사가 없으면 무조건 전치사!
[명령문, and ~ (그러면)] vs [명령문, or ~ (그렇지 않으면)]
[unless (= if ~ not)] => ~하지 않으면 (이미 not이 들어 있어 뒤에 또 not을 쓰지 않음!)
:::

## 시험 최빈출 접속사 vs 전치사 짝꿍 표

| 논리 의미 | **접속사** (+ 주어 + 동사) | **전치사** (+ 명사 / \`-ing\`) |
|---|---|---|
| **이유 (~ 때문에)** | \`because\`, \`since\`, \`as\`, \`now that\` | \`because of\`, \`due to\`, \`owing to\`, \`thanks to\` |
| **양보 (비록 ~이지만)** | \`although\`, \`though\`, \`even though\` | \`despite\`, \`in spite of\` |
| **시간 (~하는 동안)** | \`while\` (+ 주어 + 동사) | \`during\` (+ 기간 명사) |
| **조건 (~한다면 / ~않으면)** | \`if\`, \`unless\`(~하지 않으면), \`as long as\` | \`without\` (~ 없이는) |

:::train 문장 블록 기차로 논리 다리 건너기
Although(양보 접속사:비록 ~이지만) | the medicine tastes bitter(주어+동사:약이 쓴맛이 나지만) | it works quickly(주절:그것은 빠르게 듣는다) => 비록 약이 쓰지만 빠르게 효과가 나타난다.
Despite(전치사:~에도 불구하고) | the bitter taste(명사 덩어리:쓴맛에도 불구하고) | the medicine works quickly(주절:약은 빠르게 듣는다) => 쓴맛에도 불구하고 약은 빠르게 효과가 나타난다.
Take this pill now(명령문:지금 이 알약을 드세요) | or(등위접속사:그렇지 않으면) | the pain will get worse(결과:통증이 더 심해질 것입니다) => 지금 이 알약을 드세요, 그렇지 않으면 통증이 심해질 것입니다.
:::

:::transform 상관접속사 짝꿍과 수일치
[both A and B] (A와 B 둘 다) => 항상 복수 동사! || Both the doctor and the nurse [are] kind.
[not only A but also B] / [either A or B] / [neither A nor B] => 동사에서 가까운 [B]에 수일치! || Either the doctor or the nurses [are] coming.
[so + 형용사 + that 주어 + 동사] => 너무 ~해서 …하다 || The fever was [so] high [that] he could not sleep.
:::

:::vs 접속사 vs 전치사 단골 함정 O / X
[Although] the heavy rain, the clinic opened on time. || [Despite] the heavy rain, the clinic opened on time. || the heavy rain에는 동사가 없으므로 접속사(Although)가 아니라 전치사(Despite)를 씁니다.
The trial was delayed [because] a lack of patients. || The trial was delayed [because of / due to] a lack of patients. || a lack of patients는 명사 덩어리이므로 전치사 because of나 due to가 맞습니다.
Unless you [don't take] the medicine, you won't get better. || Unless you [take] the medicine, you won't get better. || unless 안에 이미 부정의 뜻(if ~ not)이 들어 있으므로 뒤에 don't를 중복해서 쓰지 않습니다.
:::

:::steps 접속사 빈칸 3초 풀이법
1. 뒤의 동사 유무 스캔 | 빈칸 뒤(쉼표 전까지)에 시제가 있는 동사가 있으면 접속사, 명사만 있으면 전치사를 남깁니다. | 동사 있음 = 접속사
2. 앞뒤 분위기 화살표 비교 | 앞뒤가 순방향(원인→결과)이면 because, 역방향(칭찬↔단점)이면 although/despite를 고릅니다. | 강하다 ↔ 안전하다 = although
3. 짝꿍 단어 찾기 | both ~ and, either ~ or, neither ~ nor, not A but B 짝을 확인합니다. | neither A nor B
:::`,
  quiz: [
    {
      prompt: "The patient felt dizzy, (　　) the nurse helped him sit down.",
      choices: ["but", "so", "although", "unless"],
      answer: 2,
      explanation: `**해석**\n\n환자는 어지러움을 느꼈고, 그래서 간호사는 그가 앉도록 도왔다.\n\n**정답 근거**\n\n앞 절의 어지러움이 뒤 절의 도움을 낳은 결과 관계입니다. 따라서 결과를 잇는 **so**가 맞습니다.\n\n**오답 분석**\n\n* **but**은 대조라서 원인과 결과를 나타내지 못합니다.\n* **although**는 양보를 이끌며 이 자리의 등위 연결과 맞지 않습니다.\n* **unless**는 조건인 “~하지 않는 한”이므로 의미가 달라집니다.\n\n**핵심 포인트**\n\n앞뒤 사건을 “그래서”로 연결할 수 있으면 **so**를 고릅니다.`,
    },
    {
      prompt: "(　　) the medicine is bitter, many patients take it regularly.",
      choices: ["Because", "Although", "So", "And"],
      answer: 2,
      explanation: `**해석**\n\n그 약은 쓰지만 많은 환자가 정기적으로 복용한다.\n\n**정답 근거**\n\n쓴맛이라는 예상과 정기 복용이라는 사실이 반대 방향입니다. 이 양보 관계에는 **Although**가 필요합니다.\n\n**오답 분석**\n\n* **Because**는 이유라서 “쓰기 때문에 복용한다”가 되어 원문 의도와 다릅니다.\n* **So**는 결과를 나타내며 문장 앞에서 이 구조를 만들 수 없습니다.\n* **And**는 단순 추가라서 대조를 보여 주지 못합니다.\n\n**핵심 포인트**\n\n“비록 A이지만 B”는 **Although A, B** 형태입니다.`,
    },
    {
      prompt: "Choose the sentence with the correct conjunction.",
      choices: ["Because of the patient was ill, he stayed home.", "Because the patient was ill, he stayed home.", "Because the patient ill, he stayed home.", "Because was the patient ill, he stayed home."],
      answer: 2,
      explanation: `**해석**\n\n환자가 아팠기 때문에 그는 집에 머물렀다.\n\n**정답 근거**\n\n이유 접속사 **because** 뒤에는 주어 **the patient**와 동사 **was**를 갖춘 완전한 절이 와야 합니다. 그래서 2번이 맞습니다.\n\n**오답 분석**\n\n* 1번 **because of** 뒤에는 명사가 와야 하는데 절이 왔습니다.\n* 3번은 **patient** 뒤에 동사 **was**가 빠졌습니다.\n* 4번은 평서문 어순이 아니라 의문문 어순입니다.\n\n**핵심 포인트**\n\n**because + 주어 + 동사**, **because of + 명사**를 구별하세요.`,
    },
    {
      prompt: "Find the underlined error. Although the capsule is large, <u>but</u> it is easy to open.",
      choices: ["Although", "capsule", "but", "easy"],
      answer: 3,
      explanation: `**해석**\n\n그 캡슐은 크지만 열기 쉽다.\n\n**정답 근거**\n\n**Although**가 이미 양보 관계를 만들었으므로 뒤에 **but**을 다시 쓸 수 없습니다. 3번을 삭제해야 합니다. 올바른 문장은 **Although the capsule is large, it is easy to open.**입니다.\n\n**오답 분석**\n\n* 1번 **Although**는 “비록”이라는 뜻으로 문장에 필요합니다.\n* 2번 **capsule**은 양보절의 주어라서 맞습니다.\n* 4번 **easy**는 보어로 쓰여 “쉽다”를 나타냅니다.\n\n**핵심 포인트**\n\n**Although A, B**와 **A, but B** 중 하나만 선택합니다.`,
    },
    {
      prompt: "The pharmacist will explain the dose (　　) the patient asks a question.",
      choices: ["if", "but", "so", "and"],
      answer: 1,
      explanation: `**해석**\n\n환자가 질문하면 약사는 용량을 설명할 것이다.\n\n**정답 근거**\n\n환자의 질문이라는 조건이 충족될 때 설명한다는 뜻입니다. 조건 접속사 **if**가 알맞습니다.\n\n**오답 분석**\n\n* **but**은 대조이므로 질문과 설명의 조건 관계를 만들지 못합니다.\n* **so**는 결과인데, 빈칸 뒤는 결과가 아니라 조건입니다.\n* **and**는 단순히 잇기만 하여 “질문하면”이라는 뜻을 표현하지 못합니다.\n\n**핵심 포인트**\n\n“~하면”이라는 조건은 **if + 주어 + 동사**로 시작합니다.`,
    },
    {
      prompt: "The sample must be stored at a low temperature (　　) it remains stable.",
      choices: ["unless", "so that", "although", "or"],
      answer: 2,
      explanation: `**해석**\n\n검체가 안정적으로 유지되도록 낮은 온도에서 보관해야 한다.\n\n**정답 근거**\n\n앞의 보관 행동에는 “~하도록”이라는 목적이 있습니다. 목적을 나타내는 **so that** 뒤에 **it remains stable**이라는 절이 이어져 자연스럽습니다.\n\n**오답 분석**\n\n* **unless**는 조건의 예외라서 목적 의미가 없습니다.\n* **although**는 양보라서 “안정적이지만”이라는 대조가 됩니다.\n* **or**는 선택이나 경고를 나타내어 문장 관계가 맞지 않습니다.\n\n**핵심 포인트**\n\n“~하도록”은 **so that + 주어 + 동사**로 표현합니다.\n\n`,
    }
  ]
};

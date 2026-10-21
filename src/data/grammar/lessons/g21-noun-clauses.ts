import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g21-noun-clauses",
  level: 3,
  title: "명사절·간접의문문·that/whether/if",
  summary: "문장 안에서 명사처럼 쓰이는 절을 찾고, that과 whether/if 뒤의 어순을 바로 읽는다.",
  body: `:::analogy 명사절은 '문장 하나를 통째로 상자에 넣어 명사처럼 쓰는 것'입니다
"그 약이 효과가 있다"라는 문장을 상자에 담아 \`[that the drug works]\`로 만들면, 이 상자 전체가 주어·목적어 자리에 들어갑니다.
상자 앞 라벨은 **확실하면 \`that\`**, **~인지 아닌지면 \`whether / if\`**, **누가·어디·왜면 의문사**입니다.
:::

:::formula 명사절 상자 공식
[that + 주어 + 동사 (완전한 문장)] => ~라는 것 (확실한 내용)
[whether / if + 주어 + 동사] => ~인지 아닌지 (불확실한 내용)
[의문사 (who / what / where / why / how) + 주어 + 동사] => 간접의문문: 의문문이 상자에 들어가면 평서문 어순!
:::

## that vs whether vs 의문사 비교

| 상자 라벨 | 뜻 | 뒤 문장 | 예 |
|---|---|---|---|
| \`that\` | ~라는 것 | 완전 | \`We know that the drug works.\` |
| \`whether / if\` | ~인지 아닌지 | 완전 | \`We asked whether it is safe.\` |
| \`what\` | ~하는 것 | 불완전 | \`I don't know what he wants.\` |
| \`where / why / how\` | 어디서 / 왜 / 어떻게 ~하는지 | 완전 | \`Tell me where the pharmacy is.\` |

:::train 문장 블록 기차로 명사절 상자 읽기
Studies show(주어+동사:연구들은 보여 준다) | that sleep improves memory(that 명사절:수면이 기억력을 높인다는 것을) => 연구들은 수면이 기억력을 높인다는 것을 보여 준다.
The doctor asked(주어+동사:의사는 물었다) | whether I had allergies(whether 명사절:내가 알레르기가 있는지) => 의사는 내가 알레르기가 있는지 물었다.
Do you know(질문:아시나요?) | where the pharmacy is(간접의문문:약국이 어디 있는지) => 약국이 어디 있는지 아시나요?
:::

:::transform 의문문이 상자에 들어가면 어순이 돌아옵니다
직접 질문: [Where is] the pharmacy? || 간접의문문: Do you know where [the pharmacy is]? || 상자 안에서는 [의문사 + 주어 + 동사] 순서입니다.
직접 질문: [Why did] he stop the medicine? || 간접의문문: I wonder why [he stopped] the medicine. || 도우미 did가 사라지고 동사가 과거형으로 돌아옵니다.
:::

:::vs 명사절 단골 함정 O / X
Can you tell me where [is the clinic]? || Can you tell me where [the clinic is]? || 문장 속 질문은 주어 + 동사 순서입니다.
I don't know [that] she will come or not. || I don't know [whether] she will come or not. || '~인지 아닌지'는 whether입니다.
[If] the drug is safe is unclear. || [Whether] the drug is safe is unclear. || 문장 맨 앞 주어 자리 상자에는 if를 쓰지 않고 whether를 씁니다.
:::

:::steps 명사절 3초 풀이법
1. 상자 경계 찾기 | 동사 know, ask, show, wonder 뒤에서 상자가 시작됩니다. | know [ ? ]
2. 확실 vs 불확실 | 확실한 사실이면 that, 아직 모르면 whether/if입니다. | asked → whether
3. 어순 확인 | 상자 안이 의문사 + 주어 + 동사 순서인지 확인합니다. | where it is (O)
:::`,
  quiz: [
    {
      prompt: "The doctor confirmed that the patient (　　) the correct dose.",
      choices: ["takes", "take", "had taken", "taking"],
      answer: 3,
      explanation: `**해석**\n의사는 환자가 정확한 용량을 복용했다는 것을 확인했다.\n\n**정답 근거**\nconfirmed가 과거이고, 환자의 복용은 확인하기 전에 끝난 일로 읽힙니다. 따라서 that절에서 과거보다 더 앞선 일을 나타내는 과거완료 **had taken**이 맞습니다. that 뒤의 어순은 the patient + had taken인 평서문입니다.\n\n**오답 분석**\n1. takes는 현재형이라 과거의 선행 사건을 나타내지 못합니다.\n2. take는 복수 주어용 원형입니다.\n4. taking은 주어 뒤의 완전한 동사가 아닙니다.\n\n**핵심 포인트**\n명사절도 시간 관계를 따지며, 먼저 일어난 과거에는 had + 과거분사를 씁니다.`,
    },
    {
      prompt: "I wonder (　　) the new drug causes this side effect.",
      choices: ["does", "whether", "what does", "that if"],
      answer: 2,
      explanation: `**해석**\n나는 새 약이 이 부작용을 일으키는지 궁금하다.\n\n**정답 근거**\nwonder 뒤에는 ‘...인지’라는 명사절이 필요합니다. **whether**는 불확실한 예, 아니오 내용을 연결하고, 뒤에는 the new drug causes라는 평서문 어순이 옵니다.\n\n**오답 분석**\n1. does만으로는 명사절을 시작할 수 없고 의문문 어순도 만들지 않습니다.\n3. what does는 직접 질문 조각이라 뒤 구조가 맞지 않습니다.\n4. that if는 두 연결어를 겹쳐 쓴 형태입니다.\n\n**핵심 포인트**\nwonder + whether/if + 주어 + 동사 구조를 통째로 익히세요.`,
    },
    {
      prompt: "The nurse asked the patient what (　　) before the examination.",
      choices: ["did he eat", "he had eaten", "had he eaten", "he eats"],
      answer: 2,
      explanation: `**해석**\n간호사는 검사 전에 환자가 무엇을 먹었는지 물었다.\n\n**정답 근거**\nasked 뒤의 what절은 간접의문문이므로 의문문 어순이 아니라 **he had eaten** 순서입니다. 검사 전에 먹은 일이므로 과거의 기준 시점보다 앞선 과거완료 had eaten이 자연스럽습니다.\n\n**오답 분석**\n1. did he eat은 직접 질문 어순입니다.\n3. had he eaten도 의문문 어순이라 명사절에 맞지 않습니다.\n4. eats는 현재형이고 과거의 검사 전 상황과 맞지 않습니다.\n\n**핵심 포인트**\n간접의문문에서는 의문사 다음에 주어를 먼저 놓습니다.`,
    },
    {
      prompt: "다음 밑줄 친 부분 중 어법상 틀린 것을 고르시오.\nThe report explains <u>why does the treatment work</u> and <u>how it affects</u> damaged tissue.",
      choices: ["why does the treatment work", "how it affects", "damaged tissue", "틀린 부분 없음"],
      answer: 1,
      explanation: `**해석**\n그 보고서는 그 치료가 왜 효과가 있는지와 손상된 조직에 어떻게 영향을 주는지 설명한다.\n\n**정답 근거**\nexplains 뒤의 why절은 명사절입니다. 명사절에서는 직접 질문인 why does the treatment work가 아니라 **why the treatment works**라고 해야 합니다. 주어 the treatment 뒤에 works를 놓습니다.\n\n**오답 분석**\n2. how it affects는 how 뒤에 주어와 동사가 온 올바른 어순입니다.\n3. damaged tissue는 affects의 목적어로 자연스럽습니다.\n4. 첫 번째 밑줄에 어순 오류가 있으므로 해당하지 않습니다.\n\n**핵심 포인트**\n의문사가 있어도 문장 안에 들어간 질문은 주어 + 동사 어순입니다.`,
    },
    {
      prompt: "(　　) the pharmacist recommended was unavailable at the hospital.",
      choices: ["That", "What", "Which", "If"],
      answer: 2,
      explanation: `**해석**\n약사가 추천한 것은 병원에서 구할 수 없었다.\n\n**정답 근거**\n빈칸부터 recommended까지가 주어 명사절이며, ‘추천한 것’이라는 뜻이 필요합니다. **What the pharmacist recommended**는 what 자체가 ‘...한 것’을 포함하므로 완전한 주어가 됩니다.\n\n**오답 분석**\n1. That은 뒤에 완전한 내용절을 이끌 수 있지만 ‘추천한 것’이라는 명사 역할을 혼자 만들지 못합니다.\n3. Which는 보통 선택 대상이나 선행사가 필요합니다.\n4. If는 조건이나 예, 아니오 명사절에 쓰여 what의 뜻이 없습니다.\n\n**핵심 포인트**\nwhat은 선행사 없이 ‘the thing that’의 역할을 합니다.`,
    },
    {
      prompt: "The team must decide (　　) to continue the clinical trial.",
      choices: ["if", "whether", "that", "what"],
      answer: 2,
      explanation: `**해석**\n그 팀은 임상시험을 계속할지 결정해야 한다.\n\n**정답 근거**\nwhether는 whether + to부정사 형태로 ‘...할지’를 나타낼 수 있습니다. 따라서 **whether to continue**가 맞습니다. if는 to부정사 앞에 쓸 수 없으며, decide 뒤에는 선택을 나타내는 명사절이 필요합니다.\n\n**오답 분석**\n1. if to continue는 문법적으로 쓰지 않습니다.\n3. that은 사실 내용을 연결하므로 ‘할지’라는 선택 의미가 없습니다.\n4. what은 사물이나 내용을 묻는 말이라 뒤의 to continue와 맞지 않습니다.\n\n**핵심 포인트**\nwhether to + 동사원형은 시험에 자주 나오는 고정 구조입니다.`,
    },
  ],
};

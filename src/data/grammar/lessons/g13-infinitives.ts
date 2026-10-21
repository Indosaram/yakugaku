import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g13-infinitives",
  level: 3,
  title: "to부정사",
  summary: "to + 동사원형이 명사, 형용사, 부사처럼 쓰이는 세 가지 역할을 구별한다.",
  body: `:::analogy 동사 앞에 to를 붙이면 3가지 직업으로 변신하는 만능 블록이 됩니다
동사(\`take\` 복용하다)는 원래 동사 자리에만 쓸 수 있습니다.
하지만 앞에 **\`to\`**를 붙여 **\`to take\`**로 만들면 문장 안에서 **명사(~하는 것)**, **형용사(~할)**, **부사(~하기 위해)** 세 가지 역할로 자유롭게 변신합니다!
:::

:::formula to부정사 핵심 공식 4가지
명사 변신: [want / decide / plan / hope / expect] + [to + 동사원형] => ~하는 것을 (목적어)
가주어·진주어: [It (가짜 주어)] + is + 형용사 + [(for 사람) + to + 동사원형 (진짜 주어)] => ~하는 것은 …하다
형용사 변신: [명사] + [to + 동사원형 (+ 전치사)] => 뒤에서 앞 명사를 꾸밈 (~할 명사)
너무 ~해서 못 하다: [too + 형용사/부사 + to + 동사원형] => 너무 ~해서 …할 수 없다!
:::

## to부정사의 3가지 변신 비교표

| 역할 | 놓이는 자리 | 해석 공식 | 대표 예문 |
|---|---|---|---|
| **① 명사 역할** | 주어(\`It ~ to V\`), 목적어, 보어 | **~하는 것(은/을/이다)** | \`She decided to rest.\` (쉬기로 결정했다) |
| **② 형용사 역할** | **명사 바로 뒤** | **~할 / ~하는 (명사)** | \`water to drink\` (마실 물), \`time to take\` (복용할 시간) |
| **③ 부사 역할** | 문장 맨 앞·뒤, 형용사 뒤 | **~하기 위해(목적)** / ~해서(이유) | \`went to the hospital to see a doctor\` (진찰받기 위해) |

:::train 문장 블록 기차로 to부정사 읽기
It(가주어:빈자리) | is important(동사+보어:중요하다) | for patients(의미상 주어:환자들이) | to drink enough water(진주어:충분한 물을 마시는 것은) => 환자들이 충분한 물을 마시는 것은 중요하다.
Researchers(주어:연구자들은) | are working hard(동사:열심히 연구 중이다) | to find a cure(부사적 목적:치료법을 찾기 위해) => 연구자들은 치료법을 찾기 위해 열심히 연구하고 있다.
The child(주어:그 아이는) | is too young(too+형용사:너무 어려서) | to swallow this large tablet(to부정사:이 큰 정제를 삼킬 수 없다) => 그 아이는 너무 어려서 이 큰 정제를 삼킬 수 없다.
:::

:::transform 가주어 It 이동과 의미상 주어(for vs of)
긴 주어: [To follow the correct dose] is important. || 가주어 It: [It] is important [to follow the correct dose]. || 주어가 너무 길면 자리에 가짜 주어 [It]을 세우고 진짜 주어 [to V]를 맨 뒤로 보냅니다!
일반 형용사(important, easy, safe): It is safe [for] children to take it. || 사람 성격 형용사(kind, wise, careless): It is kind [of] you to help me. || to부정사의 행동을 누가 하는지 밝힐 때 보통은 [for + 목적격], 사람 성격을 칭찬·비판할 때만 [of + 목적격]을 씁니다!
:::

:::vs to부정사 단골 함정 O / X
The doctor told me [not take] the pill on an empty stomach. || The doctor told me [not to take] the pill on an empty stomach. || to부정사를 부정할 때 not이나 never는 항상 to 바로 앞(not to V)에 붙입니다!
This pill is too bitter for the child [to swallow it]. || This pill is too bitter for the child [to swallow]. || 앞의 주어(This pill)가 이미 swallow의 대상이므로 끝에 it을 또 쓰지 않습니다.
She needs a chair [to sit]. || She needs a chair [to sit on]. || 의자 '위에(on)' 앉는 것이므로 sit 뒤에 전치사 on까지 있어야 맞습니다.
:::

:::steps to부정사 문제 3초 풀이법
1. 앞 동사 확인 | want, decide, expect, allow + O, advise + O가 앞에 있으면 to + 동사원형을 고릅니다. | advised him to rest
2. 부정 위치 확인 | to부정사의 부정은 to not V가 아니라 무조건 not to V입니다. | not to forget (O)
3. too ~ to / enough to 구별 | '너무 ~해서 못 하다'는 too 형용사 to V, '~할 만큼 충분히'는 형용사 enough to V입니다. | old enough to understand
:::`,
  quiz: [
    {
      prompt: "The clinic bought a machine (　　) blood pressure.",
      choices: ["measure", "measuring", "to measure", "measured"],
      answer: 3,
      explanation: `**해석**\n\n그 병원은 혈압을 측정할 기계를 샀다.\n\n**정답 근거**\n\n빈칸은 앞의 명사 a machine을 설명하며 기계의 용도를 나타냅니다. 명사 뒤에서 “측정할”이라는 뜻을 만들려면 to + 동사원형인 to measure가 알맞습니다.\n\n**오답 분석**\n\n• 1번 measure는 to 없이 명사를 바로 설명할 수 없습니다.\n• 2번 measuring은 진행이나 동명사 형태라 이 자리의 목적을 나타내지 못합니다.\n• 4번 measured는 과거분사로, 기계가 측정된다는 수동 의미가 됩니다.\n\n**핵심 포인트**\n\n명사 + to부정사는 그 명사의 용도나 내용을 설명합니다.`
    },
    {
      prompt: "The pharmacist decided (　　) the label again.",
      choices: ["check", "checking", "to check", "checked"],
      answer: 3,
      explanation: `**해석**\n\n약사는 라벨을 다시 확인하기로 결정했다.\n\n**정답 근거**\n\ndecide는 뒤에 to부정사를 취하는 동사입니다. 따라서 decide + to check로 “확인하기로 결정하다”를 만듭니다. to 뒤에는 시제가 없는 동사원형 check가 옵니다.\n\n**오답 분석**\n\n• 1번 check는 decide 뒤에 바로 올 수 없습니다.\n• 2번 checking은 decide와 함께 쓰는 이 문형의 목적어가 아닙니다.\n• 4번 checked는 과거형 또는 과거분사라 to 뒤 형태가 될 수 없습니다.\n\n**핵심 포인트**\n\ndecide, want, hope 같은 동사 뒤에서는 to + 동사원형을 확인하세요.`
    },
    {
      prompt: "It is important for patients (　　) the full course of medicine.",
      choices: ["complete", "to complete", "completed", "completing"],
      answer: 2,
      explanation: `**해석**\n\n환자들이 약 복용 과정을 끝까지 완료하는 것이 중요하다.\n\n**정답 근거**\n\nIt은 형식상 주어이고, 실제 내용은 for patients to complete the full course입니다. patients가 complete하는 행동의 주체이므로 for + 사람 + to부정사 구조를 씁니다.\n\n**오답 분석**\n\n• 1번 complete는 for patients 뒤의 정해진 to부정사 형태가 아닙니다.\n• 3번 completed는 완료된 상태를 나타내어 행동 내용이 되지 않습니다.\n• 4번 completing은 전치사 for 뒤에 올 수도 있지만, 여기서 for는 의미상 주어를 표시합니다.\n\n**핵심 포인트**\n\nIt is 형용사 for 사람 to부정사에서 사람은 to부정사의 행동 주체입니다.`
    },
    {
      prompt: "The doctor told the patient (　　) the tablet with water.",
      choices: ["take", "taking", "to take", "taken"],
      answer: 3,
      explanation: `**해석**\n\n의사는 환자에게 물과 함께 정제를 복용하라고 말했다.\n\n**정답 근거**\n\ntell은 tell + 사람 + to부정사 구조를 씁니다. the patient가 to take의 행동 주체이므로 told the patient to take가 정확합니다.\n\n**오답 분석**\n\n• 1번 take는 tell 뒤에 사람 목적어가 있을 때 바로 올 수 없습니다.\n• 2번 taking은 이 지시 문형에 필요한 to부정사가 아닙니다.\n• 4번 taken은 환자가 정제를 복용하는 능동 행동과 맞지 않는 과거분사입니다.\n\n**핵심 포인트**\n\ntell, ask, allow + 사람 + to부정사는 “사람에게 무엇을 하라고 말하거나 허락하다”입니다.`
    },
    {
      prompt: "The researchers returned to the lab (　　) the data.",
      choices: ["analyze", "analyzing", "to analyze", "analyzed"],
      answer: 3,
      explanation: `**해석**\n\n연구자들은 자료를 분석하기 위해 실험실로 돌아왔다.\n\n**정답 근거**\n\nreturned라는 행동의 목적을 설명하는 자리입니다. “무엇을 하기 위해 돌아왔는가”에 답하므로 목적의 to부정사 to analyze가 정답입니다.\n\n**오답 분석**\n\n• 1번 analyze는 목적을 나타내는 연결 표시 to가 없어 문장 구조가 끊깁니다.\n• 2번 analyzing은 동시 행동처럼 읽히며 이 기본 목적 표현의 답이 아닙니다.\n• 4번 analyzed는 연구자들이 분석된다는 수동 의미가 되어 맞지 않습니다.\n\n**핵심 포인트**\n\n주절의 행동 목적은 to + 동사원형으로 “하기 위해”라고 해석합니다.`
    },
    {
      prompt: "다음 밑줄 친 부분 중 어법상 틀린 것을 고르시오. The nurse advised the patient <u>to not skip</u> the dose.",
      choices: ["The nurse", "advised", "the patient", "to not skip"],
      answer: 4,
      explanation: `**해석**\n\n간호사는 환자에게 복용량을 거르지 말라고 조언했다.\n\n**정답 근거**\n\n부정 목적격보어는 보통 not to + 동사원형으로 씁니다. 따라서 advised the patient not to skip the dose가 자연스럽고, 밑줄 친 to not skip은 이 시험의 표준 배열에서 틀린 부분입니다.\n\n**오답 분석**\n\n• 1번 The nurse는 조언하는 주어로 맞습니다.\n• 2번 advised는 advise + 사람 + to부정사 구조를 만드는 동사입니다.\n• 3번 the patient는 skip 행동의 주체인 목적어입니다.\n\n**핵심 포인트**\n\n부정 to부정사는 not to + 동사원형으로 정리하고, 동사와 행동 주체를 함께 확인하세요.`
    }
  ]
};

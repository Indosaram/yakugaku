import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g03-five-patterns",
  level: 1,
  title: "문장의 5형식",
  summary: "동사의 뒤에 무엇이 필요한지 보고 영어 문장의 뼈대를 읽는다.",
  body: `:::analogy 동사마다 뒤에 데리고 다니는 기차 칸 수가 다릅니다
어떤 동사는 혼자서도 말이 끝나고(1형식), 어떤 동사는 뒤에 대상을 꼭 붙여야 하며(3형식), 어떤 동사는 대상과 그 대상의 상태까지 두 칸을 붙여야 합니다(5형식).
즉 **동사가 문장의 설계도**를 결정합니다.
:::

:::formula 5형식 기차 설계도
1형식: [주어 S] + [동사 V] => 주어 혼자 움직임 (예: Pain disappeared.)
2형식: [주어 S] + [동사 V] + [보어 C] => 주어 = 보어 상태 (예: The pill tastes bitter.)
3형식: [주어 S] + [동사 V] + [목적어 O] => 주어 ≠ 목적어 대상 (예: She took the pill.)
4형식: [주어 S] + [동사 V] + [누구에게 IO] + [무엇을 DO] => 주는 동사 (예: He gave me a chart.)
5형식: [주어 S] + [동사 V] + [목적어 O] + [목적격보어 C] => 목적어 = 보어 상태 (예: It makes me sleepy.)
:::

## 1형식~5형식 핵심 동사 표

| 형식 | 어순 구조 | 구별 비법 | 星薬 시험 단골 동사 |
|---|---|---|---|
| **1형식** | \`S + V\` (+ 수식어) | 뒤에 명사 목적어가 없음 | \`appear\`, \`disappear\`, \`happen\`, \`occur\`, \`work(효과가 있다)\` |
| **2형식** | \`S + V + C(형용사)\` | **주어 = 보어** (\`-ly\` 부사 금지!) | \`be\`, \`become\`, \`remain\`, \`stay\`, \`feel\`, \`look\`, \`sound\` |
| **3형식** | \`S + V + O\` | 전치사 없이 바로 목적어! | \`discuss(~을 논의하다)\`, \`enter\`, \`reach\`, \`mention\` |
| **4형식** | \`S + V + 사람 + 물건\` | 누구에게 + 무엇을 연달아 두 개 | \`give\`, \`offer\`, \`show\`, \`tell\`, \`teach\`, \`prescribe\` |
| **5형식** | \`S + V + O + C\` | **목적어 = 보어** (상태·행동) | \`make/keep/find + O + 형용사\`, \`allow/advise/cause + O + to V\` |

:::train 5형식 문장 블록 기차로 비교하기
The symptom(주어:증상이) | disappeared(1형식 동사:사라졌다) | within an hour(수식어:1시간 안에) => 증상이 1시간 안에 사라졌다.
The patient(주어:환자는) | remained(2형식 동사:유지되었다) | calm(보어:차분한 상태로) => 환자는 차분한 상태를 유지했다.
The doctor(주어:의사는) | gave(4형식 동사:주었다) | the child(간접목적어:아이에게) | warm water(직접목적어:따뜻한 물을) => 의사는 아이에게 따뜻한 물을 주었다.
The doctor(주어:의사는) | advised(5형식 동사:권했다) | the patient(목적어:환자에게) | to rest(목적격보어:쉬라고) => 의사는 환자에게 쉬라고 권했다.
:::

:::transform 시험에 잘 나오는 형식 변신
4형식: The nurse gave [the patient] [a mask]. || 3형식: The nurse gave [a mask] [to the patient]. || 물건(a mask)을 먼저 쓰면 사람 앞에 전치사(to/for)가 생깁니다.
사역동사: The medicine made the pain [disappear]. || 일반 5형식: The medicine caused the pain [to disappear]. || make/let/have 뒤에는 동사원형, cause/allow/advise 뒤에는 [to + 동사원형]을 씁니다.
:::

:::vs 5형식 단골 함정 O / X
The medicine tastes [bitterly]. || The medicine tastes [bitter]. || 감각동사(taste, feel, look, sound) 뒤에는 주어 상태를 설명하는 형용사(bitter)가 옵니다.
We discussed [about] the treatment. || We discussed the treatment. || discuss, enter, reach, marry는 3형식 동사라 전치사(about, into, to, with)를 붙이지 않습니다.
Caffeine keeps people [awaken / awakefully]. || Caffeine keeps people [awake]. || keep + 목적어 + 형용사(보어) 구조이므로 형용사 awake가 맞습니다.
The doctor let the patient [to go] home. || The doctor let the patient [go] home. || 사역동사 make, have, let 뒤 목적격보어는 to 없는 동사원형입니다.
:::

:::steps 동사 뒤 빈칸 3초 판별법
1. 동사 종류 확인 | 빈칸 앞 동사가 감각동사(feel), 유지동사(keep), 권유동사(advise), 사역동사(make)인지 봅니다. | advised the patient (　　)
2. 주어·목적어 관계 확인 | 빈칸이 주어/목적어의 상태 설명이면 형용사, 행동 지시이면 to V / 동사원형을 고릅니다. | advise + 목적어 + to V
3. 전치사 함정 체크 | discuss, reach, enter 뒤에 불필요한 전치사가 붙어 있으면 오답으로 지웁니다. | discussed about (X)
:::`,
  quiz: [
    {
      prompt: "The medicine (　　) the patient's pain.",
      choices: ["reduced", "was reduced", "sleepy", "to the patient"],
      answer: 1,
      explanation: `**해석**\n\n그 약은 환자의 통증을 줄였다.\n\n**정답 근거**\n\n문장의 주어는 The medicine, 목적어는 the patient's pain이다. 동작의 대상이 있으므로 3형식이며, 빈칸에는 동사 reduced가 필요하다.\n\n**오답 분석**\n\n• 2번 was reduced는 수동태라 뒤의 pain을 주어처럼 만들며 문장 뜻이 어색하다.\n• 3번 sleepy는 형용사라 동사 자리에 올 수 없다.\n• 4번 to the patient는 전치사구라 통증을 줄이는 동사가 되지 못한다.\n\n**핵심 포인트**\n\nS+V+O에서 V 뒤에 동작의 대상을 찾는다.`,
      lessonIds: ["g03-five-patterns"]
    },
    {
      prompt: "The sample remained (　　) after storage.",
      choices: ["stable", "the technician", "the sample", "stabilize"],
      answer: 1,
      explanation: `**해석**\n\n그 시료는 보관 후에도 안정된 상태로 남았다.\n\n**정답 근거**\n\nremain은 주어의 상태를 이어 주는 2형식 동사이다. 따라서 주어 The sample을 설명하는 주격보어 stable이 필요하다. after storage는 시간 수식어이다.\n\n**오답 분석**\n\n• 2번 the technician은 사람 명사라 시료의 상태를 설명하지 않는다.\n• 3번 the sample은 주어를 반복할 뿐 보어가 아니다.\n• 4번 stabilize는 동사 원형이라 remain 뒤의 보어 자리에 맞지 않는다.\n\n**핵심 포인트**\n\nbe, become, remain처럼 상태를 잇는 동사 뒤에는 주어를 설명하는 말이 온다.`,
      lessonIds: ["g03-five-patterns"]
    },
    {
      prompt: "The pharmacist gave the patient (　　).",
      choices: ["a dosage chart", "carefully", "healthy", "to recover"],
      answer: 1,
      explanation: `**해석**\n\n약사는 환자에게 복용량 표를 주었다.\n\n**정답 근거**\n\ngave는 사람에게 물건을 주는 4형식으로 쓸 수 있다. the patient는 간접목적어, 빈칸의 a dosage chart는 직접목적어가 된다.\n\n**오답 분석**\n\n• 2번 carefully는 방법을 나타내는 부사라 전달되는 물건이 아니다.\n• 3번 healthy는 형용사라 gave 뒤의 물건 자리에 맞지 않는다.\n• 4번 to recover는 목적을 나타내는 to부정사로 영수증이나 표가 아니다.\n\n**핵심 포인트**\n\nS+V+사람+물건은 누구에게 무엇을 주는지 나타내는 4형식이다.`,
      lessonIds: ["g03-five-patterns"]
    },
    {
      prompt: "The treatment made the patient (　　).",
      choices: ["comfortable", "a nurse", "to the clinic", "comfort"],
      answer: 1,
      explanation: `**해석**\n\n그 치료는 환자를 편안하게 했다.\n\n**정답 근거**\n\nmade 뒤의 the patient는 목적어이고, 그 뒤에는 환자의 상태를 설명하는 목적격보어가 필요하다. comfortable은 형용사로 patient의 상태를 설명하므로 5형식이 완성된다.\n\n**오답 분석**\n\n• 2번 a nurse는 환자를 간호사로 만들었다는 뜻이 되어 문맥상 맞지 않다.\n• 3번 to the clinic은 장소 전치사구라 환자의 상태를 설명하지 않는다.\n• 4번 comfort는 동사 또는 명사라 이 자리의 상태 설명에 적절하지 않다.\n\n**핵심 포인트**\n\nmake+목적어+형용사는 목적어를 어떤 상태로 만든다는 5형식이다.`,
      lessonIds: ["g03-five-patterns"]
    },
    {
      prompt: "다음 밑줄 친 부분 중 문법적으로 틀린 것을 고르시오. The report <u>gave</u> <u>the doctor</u> <u>useful information</u> <u>yesterdayly</u>.",
      choices: ["gave", "the doctor", "useful information", "yesterday"],
      answer: 4,
      explanation: `**해석**\n\n그 보고서는 어제 의사에게 유용한 정보를 주었다.\n\n**정답 근거**\n\n문장은 The report가 주어, gave가 동사, the doctor가 받는 사람, useful information이 전달물인 4형식이다. 시간을 나타내는 부사는 yesterday라고 써야 하므로 yesterdayly가 틀렸다.\n\n**오답 분석**\n\n• 1번 gave는 과거 동사로 문장에 맞다.\n• 2번 the doctor는 간접목적어로 자연스럽다.\n• 3번 useful information은 직접목적어이며 information은 셀 수 없는 명사이다.\n• 4번 yesterdayly는 영어에서 쓰지 않는 부사 형태이다. yesterday가 올바른 표현이다.\n\n**핵심 포인트**\n\n4형식의 뼈대가 맞아도 수식어의 단어 형태를 확인한다. yesterday는 자체로 시간 부사이다.`,
      lessonIds: ["g03-five-patterns"]
    },
    {
      prompt: "The researchers found the new compound (　　) in water.",
      choices: ["soluble", "a bottle", "to the laboratory", "solubility"],
      answer: 1,
      explanation: `**해석**\n\n연구자들은 새로운 화합물이 물에 녹는다고 판단했다.\n\n**정답 근거**\n\nfound는 여기서 발견했다가 아니라 목적어를 어떤 상태라고 판단했다는 뜻이다. the new compound가 목적어이므로 그 상태를 설명하는 형용사 soluble이 목적격보어로 온다. in water는 용해되는 조건을 덧붙인다.\n\n**오답 분석**\n\n• 2번 a bottle은 화합물을 설명하는 상태가 아니라 용기 명사이다.\n• 3번 to the laboratory는 장소 이동을 나타내며 목적어의 상태를 설명하지 않는다.\n• 4번 solubility는 용해도라는 명사라 found 뒤의 목적격보어로 의미가 맞지 않는다.\n\n**핵심 포인트**\n\nfind+목적어+형용사는 목적어를 어떤 상태라고 판단하는 5형식 표현이다.`,
      lessonIds: ["g03-five-patterns"]
    }
  ]
};

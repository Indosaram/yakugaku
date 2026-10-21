import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g23-phrasal-verbs-idioms",
  level: 4,
  title: "구동사와 숙어",
  summary: "동사와 전치사 또는 부사가 붙어 새 뜻이 되는 구동사와 숙어를 문맥으로 판별한다.",
  body: `:::analogy 구동사는 '동사 + 방향 화살표'가 합쳐져 새 뜻이 된 단어입니다
\`give\`(주다) + \`up\`(끝까지) = \`give up\`(포기하다). 두 단어 뜻을 더한 것과 다른 새 뜻이 생깁니다.
그래서 구동사는 **화살표(up, off, out)의 기본 그림**을 알고, 나머지는 **통째로 외우는 것**이 가장 빠릅니다.
:::

:::formula 화살표(입자) 기본 그림
[up] => 위로 · 끝까지 · 완전히 (use up 다 써 버리다, give up 포기하다)
[off] => 떨어져 나감 · 멈춤 · 미룸 (put off 미루다, call off 취소하다)
[out] => 밖으로 · 바닥남 · 알아냄 (run out of 다 떨어지다, figure out 알아내다)
[down] => 아래로 · 줄어듦 · 기록 (calm down 진정하다, turn down 거절하다)
:::

## 星薬 기출·빈출 구동사와 숙어

| 표현 | 뜻 | 바꿔 쓰기 |
|---|---|---|
| \`turn in\` | 자러 가다 / 제출하다 | \`go to bed\` / \`submit\` |
| \`put off\` | 미루다 | \`postpone\` |
| \`look into\` | 조사하다 | \`investigate\` |
| \`carry out\` | 실행하다 | \`conduct\`, \`perform\` |
| \`come up with\` | 생각해 내다 | \`think of\` |
| \`see eye to eye\` | 의견이 일치하다 | \`agree\` |
| \`more often than not\` | 대개 | \`usually\`, \`most of the time\` |
| \`drive ~ up the wall\` | ~를 몹시 짜증 나게 하다 | \`annoy\` |

:::train 문장 블록 기차로 구동사 읽기
Researchers(주어:연구자들은) | carried out(구동사:실시했다) | a clinical trial(목적어:임상 시험을) => 연구자들은 임상 시험을 실시했다.
The hospital(주어:병원은) | ran out of(구동사:다 떨어졌다) | masks(목적어:마스크가) => 병원에 마스크가 다 떨어졌다.
Don't put off(구동사 부정:미루지 마세요) | seeing a doctor(동명사 목적어:진찰받는 것을) => 진찰받는 것을 미루지 마세요.
:::

:::transform 구동사 ↔ 한 단어 동사 바꿔 쓰기 (II번 유형 대비)
The meeting was [put off] until Friday. || The meeting was [postponed] until Friday. || II번 '의미가 가까운 것' 문제는 이렇게 한 단어로 바꾸는 형태로 나옵니다.
Police are [looking into] the case. || Police are [investigating] the case. || look into = investigate
:::

:::vs 구동사 단골 함정 O / X
Please turn [off it]. || Please turn [it off]. || 목적어가 대명사(it, them)이면 동사와 입자 사이에 넣습니다.
I look forward to [see] you. || I look forward to [seeing] you. || look forward to의 to는 전치사라 -ing가 옵니다.
:::

:::steps 처음 보는 구동사 3초 추측법
1. 입자 그림 떠올리기 | up=끝까지, off=떨어짐, out=밖으로/바닥 | run out
2. 문맥에 넣기 | 앞뒤 상황(병원에 물건이 없다)에 맞는 뜻을 고릅니다. | 다 떨어지다
3. 보기와 바꿔 넣기 | 보기 단어를 넣어 문장 뜻이 그대로인지 확인합니다. | exhausted the supply
:::`,
  quiz: [
    {
      prompt: "The hospital (　　) a study on drug interactions last year.",
      choices: ["carried out", "looked after", "gave up", "resulted from"],
      answer: 1,
      explanation: `**해석**

병원은 작년에 약물 상호작용에 관한 연구를 실시했다.

**정답 근거**

study는 연구라는 목적어이므로 ‘연구를 실시하다’라는 뜻의 carry out이 알맞다. last year가 있으므로 과거형 carried out이 문장에 들어간다.

**오답 분석**

• looked after는 사람이나 동물을 돌본다는 뜻이라 study와 맞지 않는다.
• gave up은 포기했다는 뜻이라 연구를 실시했다는 의미가 되지 않는다.
• resulted from은 ...에서 생겼다는 뜻이며 주어와 목적어의 방향도 맞지 않는다.

**핵심 포인트**

carry out a study, experiment, trial처럼 실행 대상과 함께 외운다.`,
    },
    {
      prompt: "The pharmacist asked the patient to turn (　　) the alarm before taking the medicine.",
      choices: ["off it", "it off", "off", "it"],
      answer: 2,
      explanation: `**해석**

약사는 환자에게 약을 먹기 전에 그 알람을 끄라고 부탁했다.

**정답 근거**

turn off는 분리 가능한 구동사이고, 목적어가 대명사 it이다. 대명사는 반드시 동사와 particle 사이에 와야 하므로 turn it off가 정답이다.

**오답 분석**

• off it은 대명사를 뒤에 둔 형태라 분리 규칙에 어긋난다.
• off만 쓰면 무엇을 끄는지 목적어가 빠진다.
• it만 쓰면 ‘끄다’의 particle off가 빠져 뜻이 완성되지 않는다.

**핵심 포인트**

명사라면 turn off the alarm도 가능하지만, it이면 turn it off로 고정한다.`,
    },
    {
      prompt: "The new treatment may (　　) a rapid recovery.",
      choices: ["bring about", "look into", "look after", "put off"],
      answer: 1,
      explanation: `**해석**

새 치료법은 빠른 회복을 초래할지도 모른다.

**정답 근거**

a rapid recovery는 치료의 결과로 생기는 변화이다. bring about은 어떤 결과나 변화를 초래하다라는 뜻이므로 문맥에 맞는다. may 뒤이므로 동사 원형 bring을 쓴다.

**오답 분석**

• look into는 원인이나 문제를 조사하다라는 뜻이다.
• look after는 환자 등을 돌보다라는 뜻이라 recovery와 연결되지 않는다.
• put off는 어떤 일이나 치료를 미루다라는 뜻으로 빠른 회복과 반대 방향이다.

**핵심 포인트**

bring about 뒤에는 change, improvement, recovery처럼 결과를 나타내는 명사가 잘 온다.`,
    },
    {
      prompt: "Choose the incorrect underlined part. The symptoms <u>resulted in</u> the infection.",
      choices: ["The symptoms", "resulted in", "the infection", "No error"],
      answer: 2,
      explanation: `**해석**

그 증상들은 감염에서 생겼다라는 뜻을 말하려는 문장이다. 현재 문장은 증상들이 감염을 초래했다는 뜻이 된다.

**정답 근거**

원인이 infection이고 결과가 symptoms이면 result from을 써야 한다. 따라서 resulted in이 잘못된 부분이며 resulted from으로 고친다.

**오답 분석**

• The symptoms는 결과를 나타내는 주어로 문맥상 바꿀 필요가 없다.
• the infection은 증상의 원인을 나타내므로 그대로 둔다.
• No error는 in과 from의 방향 차이를 놓친 선택지다.

**핵심 포인트**

result in은 ‘A가 B를 초래하다’, result from은 ‘A가 B에서 생기다’이다. 주어와 뒤 명사의 원인, 결과를 표시해 본다.`,
    },
    {
      prompt: "The safety guideline is (　　) evidence from several hospitals.",
      choices: ["based on", "based at", "based from", "based by"],
      answer: 1,
      explanation: `**해석**

그 안전 지침은 여러 병원의 근거 자료에 기반한다.

**정답 근거**

be based on은 ...에 근거하다라는 고정 표현이다. evidence는 지침의 근거이므로 on evidence가 정확하다.

**오답 분석**

• based at은 특정 장소에 본부를 두다라는 표현과 관련되며 근거 자료에는 쓰지 않는다.
• based from은 이 문장의 고정 결합이 아니다.
• based by도 수동태의 행위자처럼 보이지만 evidence와 결합하지 않는다.

**핵심 포인트**

숙어와 구동사는 뒤에 붙는 전치사까지 외워야 한다. based on evidence를 한 덩어리로 기억한다.`,
    },
    {
      prompt: "The expression ‘under the weather’ is closest in meaning to (　　).",
      choices: ["feeling ill", "working outdoors", "studying weather", "recovering quickly"],
      answer: 1,
      explanation: `**해석**

숙어 under the weather와 의미가 가장 가까운 표현을 고르는 문제이다.

**정답 근거**

under the weather는 날씨 아래라는 직역이 아니라 몸이 좋지 않다, 아프다라는 뜻이다. 따라서 feeling ill이 정답이다. 숙어는 단어별 뜻이 아니라 전체 뜻을 기억한다.

**오답 분석**

• working outdoors는 야외에서 일한다는 뜻으로 숙어의 의미가 아니다.
• studying weather는 날씨를 연구한다는 직역에 가까우나 실제 뜻이 아니다.
• recovering quickly는 빨리 회복한다는 뜻으로 아픈 상태와 반대이다.

**핵심 포인트**

동의어 문제에서 숙어가 나오면 직역하지 말고 문맥상 상태, 행동, 결과 중 무엇인지 먼저 판단한다.`,
    }
  ]
};

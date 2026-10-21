import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g11-prepositions",
  level: 2,
  title: "전치사",
  summary: "전치사는 장소, 시간, 방향과 관계를 짧은 말로 연결한다.",
  body: `:::analogy 전치사는 명사 앞에 붙이는 '위치·시간·방향 꼬리표'입니다
\`the hospital(병원)\`이라는 명사만 있으면 병원에서 일하는지, 병원으로 가는지 알 수 없습니다.
앞에 **\`in\`(안에서)**, **\`to\`(~로)**, **\`near\`(근처에)** 같은 짧은 꼬리표를 붙여야 비로소 시간·장소·방향 관계가 생깁니다.
:::

:::formula 전치사 절대 규칙 3가지
[전치사 (in / on / at / for / by / without)] + [명사 / 대명사 / 동명사(-ing)] => 전치사 뒤에 동사원형이나 주어+동사(절)는 절대 못 옴!
시간 삼각형: [at + 콕 찍은 시각 (at 9:00)] < [on + 특정 날·요일 (on Monday)] < [in + 달·연도·계절 (in May, in 2026)]
기간 비교: [for + 숫자 기간 (for 3 days)] vs [during + 사건 이름 (during the exam)]
:::

## 시간·장소·이유 핵심 전치사 표

| 구분 | 전치사 | 쉬운 그림 의미 | 대표 예문 조각 |
|---|---|---|---|
| **시각·지점** | **\`at\`** | 바늘로 콕 찍은 한 점 | \`at 8:00\`, \`at night\`, \`at the desk\` |
| **날짜·표면** | **\`on\`** | 달력의 하루 / 표면에 딱 붙음 | \`on Friday\`, \`on May 5\`, \`on the skin\` |
| **긴 범위·공간 안** | **\`in\`** | 상자 안 / 달·연도·계절 | \`in 2026\`, \`in winter\`, \`in the blood\` |
| **숫자 기간 vs 사건** | **\`for\`** vs **\`during\`** | 숫자 길이 vs 사건 기간 동안 | \`for two weeks\` vs \`during the surgery\` |
| **완료 기한 vs 계속** | **\`by\`** vs **\`until\`** | ~까지(한 번 끝) vs ~까지(계속) | \`finish by Friday\` vs \`wait until Friday\` |
| **둘 사이 vs 셋 이상** | **\`between\`** vs **\`among\`** | A와 B 둘 사이 vs 여럿 한가운데 | \`between the two pills\` vs \`among elderly patients\` |

:::train 문장 블록 기차로 전치사구 묶어 읽기
Take this medicine(명령문:이 약을 드세요) | with a glass of water(전치사구:물 한 컵과 함께) | after meals(전치사구:식사 후에) => 식사 후에 물 한 컵과 함께 이 약을 드세요.
The clinic is open(주어+동사:의원은 문을 연다) | from 9 a.m.(출발점:오전 9시부터) | to 5 p.m.(도착점:오후 5시까지) | on weekdays(요일:평일에) => 의원은 평일 오전 9시부터 오후 5시까지 문을 연다.
Wash your hands(명령문:손을 씻으세요) | before touching(전치사+동명사:만지기 전에) | your eyes(목적어:눈을) => 눈을 만지기 전에 손을 씻으세요.
:::

:::transform 헷갈리는 짝꿍 전치사 비교
숫자 기간: He stayed in bed [for] three days. || 사건 기간: He felt pain [during] the night. || 숫자가 나오면 [for], 사건·기간 명사(the night, the vacation)가 나오면 [during]을 씁니다.
기한(한 번 동작): Submit the form [by] tomorrow. (내일까지 제출 끝!) || 지속(계속 상태): Stay in bed [until] tomorrow. (내일까지 쭉 누워 있기!) || 한 번에 끝나는 마감은 [by], 쭉 이어지는 동작은 [until]입니다.
:::

:::vs 전치사 단골 함정 O / X
Thank you for [help] the patient. || Thank you for [helping] the patient. || 전치사(for, without, before, after, by) 바로 뒤에는 동사원형이 올 수 없고 동명사(-ing)가 옵니다.
She slept [for] the lecture. || She slept [during] the lecture. || the lecture(강의)는 숫자가 아니라 사건 기간이므로 during을 씁니다.
Please return the book [until] Monday. || Please return the book [by] Monday. || 반납(return)은 월요일까지 한 번 완료하면 되는 행동이므로 마감 전치사 by가 맞습니다.
:::

:::steps 전치사 문제 3초 풀이법
1. 뒤 단어 확인 | 빈칸 뒤에 명사(-ing)만 있는지, 주어+동사가 있는지 먼저 봅니다. | 명사만 = 전치사 자리!
2. 시간·장소 크기 비교 | 점(at) < 날·표면(on) < 달·연도·상자 안(in) 순서로 크기를 맞춥니다. | on Monday / in July
3. 짝꿍 동사·형용사 확인 | depend on, result in, prevent A from -ing처럼 앞 단어와 세트로 외운 전치사를 고릅니다. | prevent A from -ing
:::`,
  quiz: [
    {
      prompt: "The capsules are stored (　　) a cool, dry place.",
      choices: ["at", "in", "on", "by"],
      answer: 2,
      explanation: `**해석**\n\n캡슐은 서늘하고 건조한 장소에 보관된다.\n\n**정답 근거**\n\nin a place는 장소라는 공간 안을 나타내므로 2번 in이 맞다.\n\n**오답 분석**\n\n* 1번 at은 한 지점이나 정확한 시각에 쓴다.\n* 3번 on은 표면 접촉이나 날짜에 쓴다.\n* 4번 by는 행위자나 수단을 나타낸다.\n\n**핵심 포인트**\n\n장소가 넓은 공간 안이면 in을 우선 선택한다.`,
      lessonIds: ["g11-prepositions"]
    },
    {
      prompt: "The patient visits the clinic (　　) Friday.",
      choices: ["in", "at", "on", "from"],
      answer: 3,
      explanation: `**해석**\n\n환자는 금요일에 병원을 방문한다.\n\n**정답 근거**\n\n요일과 날짜 앞에는 on을 쓰므로 3번이 정답이다.\n\n**오답 분석**\n\n* 1번 in은 달, 연도처럼 비교적 긴 기간에 쓴다.\n* 2번 at은 정확한 시각이나 한 지점에 쓴다.\n* 4번 from은 출발점을 나타내므로 문맥에 맞지 않는다.\n\n**핵심 포인트**\n\n시간의 크기를 나누면 된다. 달은 in, 날짜는 on, 시각은 at이다.`,
      lessonIds: ["g11-prepositions"]
    },
    {
      prompt: "The new treatment was developed (　　) researchers at the university.",
      choices: ["by", "for", "to", "on"],
      answer: 1,
      explanation: `**해석**\n\n새 치료법은 그 대학의 연구자들에 의해 개발되었다.\n\n**정답 근거**\n\n수동태 was developed에서 실제 행동을 한 주체는 by 뒤에 오므로 1번 by가 맞다.\n\n**오답 분석**\n\n* 2번 for는 목적이나 이익을 나타낸다.\n* 3번 to는 방향이나 도착점을 나타낸다.\n* 4번 on은 표면이나 주제를 나타낸다.\n\n**핵심 포인트**\n\n수동태에서 행위자 앞에는 by가 온다.`,
      lessonIds: ["g11-prepositions"]
    },
    {
      prompt: "Choose the incorrect underlined part. The nurse gave the report <u>to he</u> before the operation.",
      choices: ["gave", "the report", "to he", "before the operation"],
      answer: 3,
      explanation: `**해석**\n\n간호사는 수술 전에 그에게 보고서를 주었다.\n\n**정답 근거**\n\nto는 전치사이므로 뒤에는 목적격 대명사 him이 와야 한다. 따라서 3번 to he가 틀렸고 to him으로 고친다.\n\n**오답 분석**\n\n* 1번 gave는 과거형 동사로 문맥에 맞다.\n* 2번 the report는 gave의 목적어다.\n* 4번 before the operation은 시간을 나타내는 올바른 전치사구다.\n\n**핵심 포인트**\n\n전치사 뒤의 인칭대명사는 me, him, her, us처럼 목적격을 쓴다.`,
      lessonIds: ["g11-prepositions"]
    },
    {
      prompt: "The doctor explained the risk (　　) the patient.",
      choices: ["to", "at", "in", "by"],
      answer: 1,
      explanation: `**해석**\n\n의사는 환자에게 위험을 설명했다.\n\n**정답 근거**\n\nexplain something to a person은 무엇을 누구에게 설명하다라는 결합이다. 그러므로 1번 to가 정답이다.\n\n**오답 분석**\n\n* 2번 at은 지점이나 시각에 쓰며 explain과 이 뜻으로 결합하지 않는다.\n* 3번 in은 안쪽 공간이나 기간을 나타낸다.\n* 4번 by는 행위자나 수단을 나타낸다.\n\n**핵심 포인트**\n\n전치사는 뜻만 보지 말고 explain A to B처럼 동사와 덩어리로 기억한다.`,
      lessonIds: ["g11-prepositions"]
    },
    {
      prompt: "The tablet should be taken (　　) meals, not on an empty stomach.",
      choices: ["between", "under", "toward", "among"],
      answer: 1,
      explanation: `**해석**\n\n그 정제는 식사 사이에 복용해야 하며, 빈속에는 복용하면 안 된다.\n\n**정답 근거**\n\nbetween meals는 두 식사 사이를 뜻하는 의약 문맥의 표현이므로 1번이다.\n\n**오답 분석**\n\n* 2번 under는 아래나 기준 이하를 나타낸다.\n* 3번 toward는 방향을 나타내므로 시간 관계가 없다.\n* 4번 among은 셋 이상의 대상 사이를 뜻한다.\n\n**핵심 포인트**\n\nbetween은 두 시점이나 두 대상 사이를 나타내며, 복약 지시에서 자주 나온다.`,
      lessonIds: ["g11-prepositions"]
    }
  ]
};

import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g04-be-and-verbs",
  level: 1,
  title: "be동사와 일반동사, 부정문과 의문문",
  summary: "be동사는 상태와 존재를, 일반동사는 행동을 나타내며 부정문과 의문문에서 만드는 방식이 다릅니다.",
  body: `:::analogy be동사는 직접 뛰는 선수, 일반동사는 도우미를 부르는 감독입니다
영어 동사는 딱 두 팀으로 나뉩니다.
**be동사(am, are, is, was, were)**는 몸이 가벼워 의문문에서 직접 주어 앞으로 뛰어 나가고, 뒤에 \`not\`만 붙이면 부정문이 됩니다.
반면 **일반동사(take, work, have 등)**는 자리를 비우지 않고 **도우미(do, does, did)**를 앞으로 내보낸 뒤 자기 자신은 **동사원형**으로 돌아갑니다.
:::

:::formula 부정문·의문문 조립 공식
be동사 부정문: [주어] + [am/are/is/was/were] + [not] => 바로 뒤에 not 부착
be동사 의문문: [Am/Are/Is/Was/Were] + [주어] + ~ ? => be동사가 맨 앞으로 이동
일반동사 부정문: [주어] + [do/does/did not] + [동사원형] => 도우미 출동 + 동사원형!
일반동사 의문문: [Do/Does/Did] + [주어] + [동사원형] ~ ? => 도우미가 맨 앞으로 + 동사원형!
:::

## be동사 vs 일반동사 한눈에 비교

| 구분 | be동사 (\`am / are / is / was / were\`) | 일반동사 (\`take / work / study ...\`) |
|---|---|---|
| **뜻** | ~이다, ~에 있다, (어떠)하다 | 먹다, 일하다, 줄이다 등 구체적 동작 |
| **3인칭 단수 현재** | \`is\` (과거는 \`was\`) | 동사 끝에 \`-s / -es\` (\`takes\`, \`goes\`) |
| **부정문 만들기** | \`is not\`, \`were not\` | \`does not + 원형\`, \`did not + 원형\` |
| **의문문 만들기** | \`Is + 주어 ~ ?\` | \`Does/Did + 주어 + 원형 ~ ?\` |

:::train 문장 블록 기차로 어순 비교하기
The clinic(주어:의원은) | is not(be동사+부정:아니다) | open(보어:문 연 상태가) | on Sundays(수식어:일요일에) => 의원은 일요일에 문을 열지 않는다.
The patient(주어:환자는) | does not(도우미+부정:~하지 않는다) | have(동사원형:가지고 있다) | a fever(목적어:열을) => 환자는 열이 없다.
Did(과거 도우미:~했나요?) | the medicine(주어:그 약이) | reduce(동사원형:줄이다) | the pain(목적어:통증을) => 그 약이 통증을 줄였나요?
:::

:::transform 평서문이 부정문·의문문으로 변신할 때
She [takes] the pill. || She [does not take] the pill. || 3인칭 단수 -s를 도우미(does)가 가져가므로 뒤 동사는 원형(take)이 됩니다!
The symptom [started] yesterday. || [Did] the symptom [start] yesterday? || 과거 표시(-ed)를 도우미(Did)가 가져가므로 뒤 동사는 원형(start)이 됩니다!
:::

:::vs be동사·일반동사 흔한 실수 O / X
She does not [takes] the medicine. || She does not [take] the medicine. || does에 이미 3인칭 단수가 표시되었으므로 뒤에는 동사원형(take)만 옵니다.
Did the pain [stopped] last night? || Did the pain [stop] last night? || Did에 과거가 표시되었으므로 뒤에는 동사원형(stop)을 씁니다.
The patient [is not know] the dose. || The patient [does not know] the dose. || be동사(is)와 일반동사 원형(know)은 나란히 쓸 수 없습니다.
:::

:::steps 동사 자리 오류 3초 점검법
1. 동사 종류 구별 | 문장의 본동사가 상태(be동사)인지 동작(일반동사)인지 먼저 봅니다. | know = 일반동사
2. 도우미 뒤 원형 확인 | do / does / did 뒤에는 반드시 -s나 -ed가 없는 동사원형인지 확인합니다. | did not stop (O)
3. 주어 수 확인 | 현재시제에서 주어가 he/she/it/단수명사이면 is 또는 동사+s인지 확인합니다. | The drug works (O)
:::`,
  quiz: [
    {
      prompt: "The new vaccine (　　) safe for most adults.",
      choices: ["are", "is", "do", "does"],
      answer: 2,
      explanation: `**해석**\n\n새 백신은 대부분의 성인에게 안전하다.\n\n**정답 근거**\n\n주어 *The new vaccine*은 하나의 사물이므로 단수입니다. 안전한 상태를 나타내는 be동사가 필요하므로 현재 단수형 **is**가 정답입니다.\n\n**오답 분석**\n\n*are*는 복수 주어와 함께 씁니다. *do*와 *does*는 행동을 나타내는 일반동사의 부정문이나 의문문을 만들 때 쓰는 말이라 이 긍정 상태 문장에는 맞지 않습니다.\n\n**핵심 포인트**\n\n단수 사물의 현재 상태는 is로 연결합니다.`,
      lessonIds: ["g04-be-and-verbs"]
    },
    {
      prompt: "The nurse (　　) the patient's temperature every morning.",
      choices: ["check", "checks", "is check", "does checks"],
      answer: 2,
      explanation: `**해석**\n\n간호사는 매일 아침 환자의 체온을 확인한다.\n\n**정답 근거**\n\n*nurse*는 한 사람인 단수 주어이고, 문장은 반복 행동을 나타내는 현재 긍정문입니다. 따라서 일반동사 check에 s를 붙인 **checks**가 맞습니다.\n\n**오답 분석**\n\n*check*는 I, you, we, they 같은 주어에 쓰는 기본형입니다. *is check*는 be동사와 일반동사를 잘못 겹친 형태입니다. *does checks*는 does 뒤에 s형을 쓴 오류이며, 쓴다면 does check가 되어야 합니다.\n\n**핵심 포인트**\n\n현재형 단수 주어의 일반동사는 보통 s형입니다.`,
      lessonIds: ["g04-be-and-verbs"]
    },
    {
      prompt: "This medicine (　　) not cause drowsiness.",
      choices: ["do", "does", "is", "are"],
      answer: 2,
      explanation: `**해석**\n\n이 약은 졸림을 유발하지 않는다.\n\n**정답 근거**\n\n*cause*는 유발한다는 행동을 나타내는 일반동사입니다. 주어 *This medicine*은 단수이므로 현재 부정문은 **does not + 기본형**입니다. 따라서 does가 정답이고 cause는 그대로 둡니다.\n\n**오답 분석**\n\n*do*는 복수 주어나 I, you에 맞습니다. *is*와 *are*는 be동사이므로 cause라는 행동의 부정문을 만들 수 없습니다.\n\n**핵심 포인트**\n\n단수 주어의 일반동사 부정은 does not이며, 뒤 동사에는 s를 붙이지 않습니다.`,
      lessonIds: ["g04-be-and-verbs"]
    },
    {
      prompt: "(　　) the test results reliable?",
      choices: ["Do", "Does", "Are", "Is"],
      answer: 3,
      explanation: `**해석**\n\n검사 결과는 신뢰할 만한가?\n\n**정답 근거**\n\n*reliable*은 결과의 상태를 설명하는 보어이고, 행동 동사가 없습니다. 따라서 be동사 의문문으로 만들어야 합니다. 주어 *the test results*는 복수이므로 **Are**를 앞으로 보냅니다.\n\n**오답 분석**\n\n*Do*와 *Does*는 일반동사의 의문문에 필요하지만 이 문장에는 일반동사가 없습니다. *Is*는 단수 주어용 be동사라 복수인 results와 맞지 않습니다.\n\n**핵심 포인트**\n\nbe동사 뒤에 상태를 설명하는 말이 있으면 be동사를 주어 앞으로 옮깁니다.`,
      lessonIds: ["g04-be-and-verbs"]
    },
    {
      prompt: "다음 문장에서 밑줄 친 부분 중 어법상 틀린 것을 고르시오.\n\nThe clinical trial <u>did not showed</u> a significant difference.",
      choices: ["The clinical trial", "did not showed", "a significant", "difference"],
      answer: 2,
      explanation: `**해석**\n\n그 임상시험은 유의미한 차이를 보여 주지 않았다.\n\n**정답 근거**\n\n과거 일반동사 부정문은 **did not + 동사 기본형**입니다. did가 이미 과거를 표시하므로 showed가 아니라 **show**여야 합니다. 밑줄 친 두 단어가 오류입니다.\n\n**오답 분석**\n\n*The clinical trial*은 단수 주어로 문법적으로 맞습니다. *a significant*는 뒤의 단수 명사 difference를 꾸미는 올바른 표현입니다. *difference*도 관사 a 뒤의 단수 명사로 맞습니다.\n\n**핵심 포인트**\n\ndid not 뒤에는 주어 수와 관계없이 항상 동사 기본형을 둡니다.`,
      lessonIds: ["g04-be-and-verbs"]
    },
    {
      prompt: "다음 단어를 올바른 순서로 배열한 것을 고르시오.\n\n[ the / does / reduce / drug / pain ]",
      choices: ["The drug does reduce pain.", "Does the drug reduce pain?", "Does reduce the drug pain?", "The drug reduce does pain?"],
      answer: 2,
      explanation: `**해석**\n\n그 약은 통증을 줄이는가?\n\n**정답 근거**\n\n일반동사의 현재 의문문은 **Does + 단수 주어 + 동사 기본형 + 목적어?** 순서입니다. 따라서 *Does the drug reduce pain?*이 맞습니다. drug는 단수지만 does 뒤의 reduce에는 s를 붙이지 않습니다.\n\n**오답 분석**\n\n*The drug does reduce pain.*은 강조하는 긍정문으로 읽을 수 있지만 제시된 물음 구조와 맞지 않습니다. *Does reduce the drug pain?*은 주어 위치가 틀렸습니다. 마지막 선택지는 does와 주어, 동사의 순서가 모두 어긋납니다.\n\n**핵심 포인트**\n\n일반동사 의문문은 does를 맨 앞에 두고 주어 다음에 기본형 동사를 둡니다.`,
      lessonIds: ["g04-be-and-verbs"]
    }
  ]
};

import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g08-auxiliaries",
  level: 2,
  title: "조동사: can, must, should, may와 have p.p.",
  summary: "조동사 뒤 동사원형과 조동사 + have p.p.를 읽어 가능성, 의무, 조언, 과거 추측을 구별한다.",
  body: `:::analogy 조동사는 동사 앞에 붙는 '확신도·의무 스티커'입니다
일반 동사(\`take\`) 앞에 \`must\`, \`should\`, \`may\`, \`can\` 같은 스티커를 붙이면 "꼭 해야 한다", "틀림없다", "일지도 모른다"처럼 말하는 사람의 판단이 더해집니다.
그리고 시간을 과거로 돌리고 싶을 때는 조동사 뒤에 **\`have + p.p.\`** 타임머신을 붙입니다!
:::

:::formula 조동사 2대 핵심 공식
현재·미래: [조동사 (can/must/should/may)] + [동사원형] => 조동사 바로 뒤는 언제나 동사원형!
과거 추측·후회: [조동사] + [have + p.p.] => 과거에 ~였음에 틀림없다(must) / ~했어야 했는데(should)!
당위·요구절: [insist / suggest / recommend / demand] + that + 주어 + [(should) 동사원형] => 주어가 3인칭 단수여도 동사원형!
:::

## 조동사 + 동사원형 vs 조동사 + have p.p. 비교표

| 조동사 | \`+ 동사원형\` (현재·미래) | \`+ have p.p.\` (과거의 일!) | 시험 출제 포인트 |
|---|---|---|---|
| **must** | ① 꼭 ~해야 한다 ② ~임에 틀림없다 | **\`must have p.p.\`** (~였음에 틀림없다) | 과거의 강한 긍정 추측 |
| **cannot** | ① ~할 수 없다 ② ~일 리가 없다 | **\`cannot have p.p.\`** (~였을 리가 없다) | \`must\` 추측의 반대말! |
| **should** | 마땅히 ~해야 한다 | **\`should have p.p.\`** (~했어야 했는데 안 했다) | **과거의 후회·아쉬움 (출제 1순위!)** |
| **may / might** | ~일지도 모른다 (약한 추측) | **\`may/might have p.p.\`** (~였을지도 모른다) | 과거의 약한 추측 |

:::train 문장 블록 기차로 조동사 표현 읽기
Patients(주어:환자들은) | must follow(조동사+원형:반드시 따라야 한다) | the instructions(목적어:지시 사항을) => 환자들은 반드시 지시 사항을 따라야 한다.
You(주어:당신은) | should have checked(조동사+have p.p.:확인했어야 했는데) | the label(목적어:라벨을) | before taking it(수식어:복용하기 전에) => 복용하기 전에 라벨을 확인했어야 했다 (확인 안 해서 후회).
The doctor(주어:의사는) | suggested(제안동사:제안했다) | that he take(should 생략+원형:그가 취해야 한다고) | a rest(목적어:휴식을) => 의사는 그가 휴식을 취해야 한다고 제안했다.
:::

:::transform used to 동사원형 vs be used to -ing 3총사 구별
[used to + 동사원형]: He used to smoke. || 예전에는 담배를 피우곤 했다 (지금은 안 함!) || 과거의 습관·상태
[be used to + 명사/-ing]: He is used to getting up early. || 일찍 일어나는 것에 익숙하다! || to가 전치사라 뒤에 [-ing]가 옴
[be used to + 동사원형]: This herb is used to treat colds. || 이 약초는 감기를 치료하는 데 사용된다! || 수동태(be used) + 목적(to부정사)
:::

:::vs 조동사 단골 함정 O / X
She must [takes] the medicine now. || She must [take] the medicine now. || 조동사 바로 뒤에는 -s나 -ed가 없는 동사원형이 옵니다.
I have a stomachache. I [must not] have eaten so much last night. || I have a stomachache. I [should not] have eaten so much last night. || '어젯밤 그렇게 많이 먹지 말았어야 했는데'라는 과거 후회는 should not have p.p.를 씁니다.
The doctor recommended that the patient [takes] two pills. || The doctor recommended that the patient [take] two pills. || recommend, suggest, insist, demand 뒤의 that절(해야 한다)에는 (should) + 동사원형(take)을 씁니다.
He is used to [work] at night. || He is used to [working] at night. || '~에 익숙하다'는 be used to + -ing(동명사)입니다.
:::

:::steps 조동사 문제 3초 풀이법
1. 현재인지 과거인지 확인 | 문장에 어제·과거 상황이 있으면 조동사 + have p.p. 보기를 먼저 봅니다. | last night → should have p.p.
2. 추측(must) vs 후회(should) | '틀림없다(증거 있음)'는 must have p.p., '했어야 했는데(안 함)'는 should have p.p.입니다. | 후회 = should have p.p.
3. 제안·요구 동사 체크 | suggest, recommend, insist, demand + that 뒤 빈칸이면 동사원형을 고릅니다. | that he take (O)
:::`,
  quiz: [
    {
      prompt: "Patients (　　) follow the instructions on the label.",
      choices: ["must", "must to", "must follows", "must followed"],
      answer: 1,
      explanation: `**해석**\n\n환자들은 라벨의 지시를 반드시 따라야 한다.\n\n**정답 근거**\n\n의무를 나타내는 *must* 뒤에는 동사원형 *follow*가 옵니다. 따라서 1번이 맞습니다.\n\n**오답 분석**\n\n* 2번 *must to*는 조동사 뒤에 *to*를 넣어 틀렸습니다.\n* 3번 *must follows*는 3인칭 단수 어미를 붙여 틀렸습니다.\n* 4번 *must followed*는 과거분사를 바로 붙여 틀렸습니다.\n\n**핵심 포인트**\n\n조동사 + 동사원형을 한 덩어리로 기억하세요.`,
    },
    {
      prompt: "The patient (　　) have taken the medicine twice.",
      choices: ["may", "may has", "may to", "may taking"],
      answer: 1,
      explanation: `**해석**\n\n그 환자는 그 약을 두 번 복용했을지도 모른다.\n\n**정답 근거**\n\n과거의 가능성은 *may have + p.p.*로 표현합니다. *taken*이 과거분사이므로 앞에는 원형 *have*를 두어야 하며, 1번 *may*가 완전한 구조를 만듭니다.\n\n**오답 분석**\n\n* 2번 *may has*는 조동사 뒤에 *has*를 써서 틀렸습니다.\n* 3번 *may to*는 조동사 뒤의 불필요한 *to*입니다.\n* 4번 *may taking*은 *have* 없이 현재분사를 연결했습니다.\n\n**핵심 포인트**\n\n조동사 뒤의 *have*는 주어가 단수여도 *has*로 바뀌지 않습니다.`,
    },
    {
      prompt: "You (　　) have reported the side effect earlier.",
      choices: ["should", "should to", "should reports", "should reporting"],
      answer: 1,
      explanation: `**해석**\n\n당신은 그 부작용을 더 일찍 보고했어야 했다.\n\n**정답 근거**\n\n지나간 행동에 대한 조언이나 아쉬움은 *should have + p.p.*입니다. *reported*가 과거분사이므로 1번 *should*가 맞습니다.\n\n**오답 분석**\n\n* 2번 *should to*는 조동사 뒤에 *to*를 넣었습니다.\n* 3번 *should reports*는 *should* 뒤에 3인칭 어미를 붙였습니다.\n* 4번 *should reporting*은 *have*와 과거분사가 없는 구조입니다.\n\n**핵심 포인트**\n\n*should have p.p.*는 “했어야 했다”라는 과거 평가입니다.`,
    },
    {
      prompt: "The new drug may cause dizziness. Which meaning is closest to the underlined idea?",
      choices: ["It is possible that the drug causes dizziness.", "The drug certainly causes dizziness.", "The drug must not cause dizziness.", "The drug caused dizziness yesterday."],
      answer: 1,
      explanation: `**해석**\n\n새 약은 어지럼증을 일으킬 수도 있다.\n\n**정답 근거**\n\n*may*는 가능성을 나타냅니다. 따라서 “그 약이 어지럼증을 일으킬 가능성이 있다”인 1번이 가장 가깝습니다.\n\n**오답 분석**\n\n* 2번 *certainly*는 확정이라서 *may*보다 강합니다.\n* 3번 *must not*은 금지 또는 강한 부정 추측으로 뜻이 다릅니다.\n* 4번은 어제 일어난 과거 사건으로 원문의 현재 가능성과 다릅니다.\n\n**핵심 포인트**\n\n*may*를 “반드시”가 아니라 “일지도 모른다”로 읽으세요.`,
    },
    {
      prompt: "Find the incorrect underlined part. The pharmacist <u>must checks</u> the prescription before dispensing it.",
      choices: ["must checks", "the prescription", "before", "dispensing it"],
      answer: 1,
      explanation: `**해석**\n\n약사는 그것을 조제하기 전에 처방전을 반드시 확인한다.\n\n**정답 근거**\n\n*must* 뒤에는 동사원형이 와야 하므로 *must checks*가 아니라 *must check*입니다. 오류는 1번입니다.\n\n**오답 분석**\n\n* 2번 *the prescription*은 *check*의 목적어로 자연스럽습니다.\n* 3번 *before*는 “전에”라는 시간 연결어로 맞습니다.\n* 4번 *dispensing it*은 전치사 *before* 뒤의 동명사 구조로 맞습니다.\n\n**핵심 포인트**\n\n조동사 뒤에서 주어가 3인칭 단수여도 동사에 *-s*를 붙이지 않습니다.`,
    },
    {
      prompt: "Choose the correct order: (A) have (B) the nurse (C) should (D) contacted (E) the doctor",
      choices: ["B-C-A-D-E", "B-A-C-D-E", "C-B-A-E-D", "B-C-D-A-E"],
      answer: 1,
      explanation: `**해석**\n\n간호사는 의사에게 연락했어야 했다.\n\n**정답 근거**\n\n영어 문장은 주어 *the nurse*로 시작하고, 그 뒤에 조동사 *should*, 완료를 만드는 *have*, 과거분사 *contacted*, 목적어 *the doctor*가 옵니다. 따라서 B-C-A-D-E인 1번이 맞습니다.\n\n**오답 분석**\n\n* 2번은 *have*가 조동사보다 앞에 와서 구조가 깨집니다.\n* 3번은 조동사 *should*가 주어보다 앞에 와 평서문 어순이 아닙니다.\n* 4번은 과거분사 *contacted*가 *have*보다 앞에 왔습니다.\n\n**핵심 포인트**\n\n어순에서는 **주어 + should + have + p.p.**를 먼저 묶으세요.`,
    }
  ]
};

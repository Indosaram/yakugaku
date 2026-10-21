import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g19-subjunctive",
  level: 3,
  title: "가정법",
  summary: "현실과 다른 조건을 말하는 가정법의 시제와 would have p.p.를 구별한다.",
  body: `:::analogy 가정법은 '현실과 반대로 상상할 때 시계를 한 칸 뒤로 돌리는 것'입니다
"내가 지금 의사라면..." 실제로는 의사가 아니죠. 영어는 이렇게 **현실과 반대**인 상상을 할 때 동사를 **한 칸 과거**로 물립니다.
지금 반대 → 과거형, 과거 반대 → \`had p.p.\`. 이 한 줄이 가정법의 전부입니다.
:::

:::formula 가정법 3대 공식
가정법 과거 (지금 반대): [If + 주어 + 과거동사/were] + [주어 + would/could + 동사원형] => ~라면 …할 텐데
가정법 과거완료 (과거 반대): [If + 주어 + had p.p.] + [주어 + would/could + have p.p.] => ~였다면 …했을 텐데
혼합 가정법 (과거 원인 → 지금 결과): [If + had p.p.] + [would + 동사원형 + now] => 그때 ~했다면 지금 …할 텐데
:::

## 가정법 한눈에 비교

| 종류 | 실제 상황 | If절 | 주절 |
|---|---|---|---|
| **가정법 과거** | 지금 사실이 아님 | \`If I were / knew\` | \`would + 동사원형\` |
| **가정법 과거완료** | 과거에 사실이 아니었음 | \`If I had known\` | \`would have p.p.\` |
| **I wish** | 이루기 어려운 소망 | \`I wish + 과거 / had p.p.\` | — |
| **as if** | 마치 ~인 것처럼 | \`as if + 과거 / had p.p.\` | — |

:::train 문장 블록 기차로 가정법 읽기
If I were a doctor(If절:내가 의사라면) | I would help(주절:나는 도울 텐데) | more patients(목적어:더 많은 환자를) => 내가 의사라면 더 많은 환자를 도울 텐데. (실제로는 의사가 아님)
If she had taken the medicine(If절:그녀가 그 약을 먹었더라면) | she would have recovered(주절:회복했을 텐데) | sooner(수식어:더 빨리) => 그녀가 약을 먹었더라면 더 빨리 회복했을 텐데. (실제로는 안 먹음)
Without this vaccine(조건:이 백신이 없다면) | many people would die(주절:많은 사람이 죽을 것이다) => 이 백신이 없다면 많은 사람이 죽을 것이다.
:::

:::transform If를 빼고 동사를 앞으로 보내는 도치
If I [were] you, I would rest. || [Were] I you, I would rest. || If를 지우면 were가 주어 앞으로 나옵니다.
If he [had known], he would have come. || [Had] he known, he would have come. || If를 지우면 Had가 주어 앞으로 나옵니다. 시험에 자주 나오는 모양입니다!
:::

:::vs 가정법 단골 함정 O / X
If I [know] the answer, I would tell you. || If I [knew] the answer, I would tell you. || 주절이 would + 원형이면 If절은 과거형(knew)입니다.
If she had studied, she [would pass]. || If she had studied, she [would have passed]. || If절이 had p.p.이면 주절은 would have p.p.입니다.
I wish I [can] speak Japanese. || I wish I [could] speak Japanese. || I wish 뒤 지금의 소망은 과거형(could)으로 씁니다.
:::

:::steps 가정법 빈칸 3초 풀이법
1. 짝꿍 찾기 | If절과 주절 중 이미 보이는 쪽의 동사 모양을 봅니다. | would have p.p. 보임
2. 시간 맞추기 | would + 원형이면 If절 과거형, would have p.p.이면 If절 had p.p. | → had p.p.
3. now 단서 확인 | 주절에 now가 있으면 혼합 가정법(If had p.p. → would + 원형)입니다. | would be fine now
:::`,
  quiz: [
    {
      prompt: "If I (　　) a pharmacist, I would explain the dosage carefully.",
      choices: ["am", "were", "had been", "will be"],
      answer: 2,
      explanation: `**해석**\n내가 약사라면 복용량을 주의 깊게 설명할 텐데.\n\n**정답 근거**\n현재 사실과 다른 상상이므로 If절은 가정법 과거입니다. be동사는 주어가 I여도 were를 쓰므로 ②가 정답입니다.\n\n**오답 분석**\n* ① am은 현재 직설법이라 가정의 거리감이 없습니다.\n* ③ had been은 과거 사실 반대에 쓰는 형태입니다.\n* ④ will be는 미래 조건에서 쓰며 would와 맞지 않습니다.\n\n**핵심 포인트**\nIf + 주어 + were, 주어 + would + 동사원형을 한 덩어리로 기억하세요.`
    },
    {
      prompt: "If the doctor (　　) the allergy history, she would have avoided the drug.",
      choices: ["checks", "checked", "had checked", "would check"],
      answer: 3,
      explanation: `**해석**\n의사가 알레르기 병력을 확인했더라면 그 약을 피했을 텐데.\n\n**정답 근거**\nwould have avoided는 과거에 일어나지 않은 결과를 나타냅니다. 그 조건인 if절에는 had + 과거분사인 had checked가 와야 하므로 ③입니다.\n\n**오답 분석**\n* ① checks는 현재 반복 사실입니다.\n* ② checked만으로는 과거완료 가정법이 되지 않습니다.\n* ④ would check를 if절에 넣지 않는 일반 가정법 규칙에 어긋납니다.\n\n**핵심 포인트**\nwould have p.p.를 보면 if절의 had p.p.를 먼저 찾으세요.`
    },
    {
      prompt: "If the patient had followed the advice, he (　　) healthier now.",
      choices: ["is", "would be", "would have been", "was"],
      answer: 2,
      explanation: `**해석**\n환자가 그 조언을 따랐더라면 지금 더 건강할 텐데.\n\n**정답 근거**\nhad followed는 과거의 조건이고 now는 현재 결과를 가리킵니다. 따라서 주절은 would + 동사원형인 would be가 되어야 하므로 ②입니다.\n\n**오답 분석**\n* ① is는 현재 사실을 단정합니다.\n* ③ would have been은 결과도 과거일 때 쓰는 형태입니다.\n* ④ was는 가정 결과의 would와 짝을 이루지 못합니다.\n\n**핵심 포인트**\n과거 조건과 현재 결과의 조합을 혼합 가정법이라고 하며 now가 단서입니다.`
    },
    {
      prompt: "Which sentence is correct?",
      choices: ["If the dose was lower, the risk would decrease.", "If the dose were lower, the risk would decrease.", "If the dose is lower, the risk would decreased.", "If the dose had lower, the risk would decrease."],
      answer: 2,
      explanation: `**해석**\n용량이 더 낮다면 위험이 줄어들 것이라는 문장을 고르는 문제입니다.\n\n**정답 근거**\n현재와 반대인 가정은 If + 과거형, would + 동사원형입니다. be동사의 가정법 형태는 were이므로 ② If the dose were lower, the risk would decrease가 맞습니다.\n\n**오답 분석**\n* ① 가정법 be동사에 was를 썼습니다.\n* ③ would 뒤에 과거분사 decreased를 써서 형태가 틀렸습니다.\n* ④ had 뒤에는 과거분사가 필요하고 lower는 형용사라 맞지 않습니다.\n\n**핵심 포인트**\n현재 반대 가정은 were와 would + 원형을 동시에 확인하세요.`
    },
    {
      prompt: "다음 밑줄 친 부분 중 틀린 것을 고르시오. If the trial <u>had included</u> more patients, its result <u>would have been</u> clearer, and the researchers <u>could have drawn</u> a firmer conclusion <u>today</u>.",
      choices: ["had included", "would have been", "could have drawn", "today"],
      answer: 4,
      explanation: `**해석**\n시험에 더 많은 환자가 포함되었더라면 결과가 더 명확했을 것이고 연구자들은 더 확실한 결론을 내릴 수 있었을 텐데라는 뜻입니다.\n\n**정답 근거**\n앞의 두 결과가 모두 과거 반대이므로 today는 문맥상 어색합니다. 과거의 결과를 말하려면 then 또는 삭제가 알맞아 ④를 고릅니다.\n\n**오답 분석**\n* ① had included는 과거 반대 조건의 올바른 had p.p.입니다.\n* ② would have been은 과거 반대 결과의 올바른 형태입니다.\n* ③ could have drawn도 could have + p.p.로 과거의 가능성을 나타냅니다.\n\n**핵심 포인트**\n가정법은 동사 형태뿐 아니라 시간 부사와 결과 시점도 서로 맞아야 합니다.`
    },
    {
      prompt: "(　　) the nurse recorded the batch number, the recall would have been easier.",
      choices: ["Had", "Were", "Would", "Have"],
      answer: 1,
      explanation: `**해석**\n간호사가 제조번호를 기록했더라면 회수 조치가 더 쉬웠을 텐데.\n\n**정답 근거**\nwould have been은 과거 반대 결과입니다. if를 생략한 도치 가정법에서는 If the nurse had recorded가 Had the nurse recorded로 바뀌므로 빈칸에는 ① Had가 옵니다.\n\n**오답 분석**\n* ② Were는 현재 반대 가정의 be동사 도치에 쓰입니다.\n* ③ Would는 주절의 결과를 이끌 뿐 if절 도치의 첫 단어가 아닙니다.\n* ④ Have만으로는 주어 뒤 과거분사 recorded와 연결되는 가정법 형태가 되지 않습니다.\n\n**핵심 포인트**\nHad + 주어 + p.p.는 If + 주어 + had + p.p.를 줄인 과거 가정법입니다.`
    }
  ]
};

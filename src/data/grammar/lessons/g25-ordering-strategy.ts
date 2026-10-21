import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g25-ordering-strategy",
  level: 4,
  title: "정렬 문제 푸는 법",
  summary: "동사와 덩어리를 먼저 찾아 영어 문장의 뼈대를 세운 뒤, 남은 말을 알맞은 자리에 넣는다.",
  body: `:::analogy 정렬 문제는 '퍼즐 맞추기'입니다: 모서리(동사)부터 끼우고, 붙어 다니는 조각을 먼저 묶습니다
단어 6~8개를 처음부터 한 개씩 끼우면 반드시 꼬입니다.
**① 동사 찾기 → ② 짝꿍 덩어리 묶기 → ③ 덩어리 순서 맞추기** 순서로 하면 조각이 2~3개로 줄어듭니다.
:::

:::formula 정렬 3단계 공식
1단계: [일본어 뜻에서 주어 + 동사] 먼저 확정 => 문장의 뼈대
2단계: [짝꿍 덩어리] 묶기 => 관사+명사, 전치사+명사, to+동사원형, 숙어(take care of)
3단계: [주어 → 동사 → 목적어/보어 → 수식어] 순서로 배치 => 남은 조각 0개 확인
:::

## 자주 묶이는 짝꿍 덩어리

| 덩어리 종류 | 예 |
|---|---|
| 관사 + (형용사) + 명사 | \`a new drug\`, \`the side effects\` |
| 전치사 + 명사 | \`in the morning\`, \`for patients\` |
| 동사 + 목적어 + to V | \`advise A to V\`, \`allow A to V\` |
| 비교 | \`as ~ as\`, \`more ~ than\` |
| 숙어 | \`take care of\`, \`be likely to\`, \`it takes 시간 to V\` |

:::train 정렬 예시: "의사는 나에게 휴식을 취하라고 권했다"
The doctor(주어:의사는) | advised(동사:권했다) | me(목적어:나에게) | to take a rest(덩어리:휴식을 취하라고) => The doctor advised me to take a rest.
It takes(숙어 시작:시간이 걸린다) | two weeks(시간:2주가) | for the wound(의미상 주어:상처가) | to heal(to V:낫는 데) => It takes two weeks for the wound to heal.
:::

:::transform 흩어진 조각 → 덩어리 → 완성
[ to / the doctor / take / advised / me / a rest ] || [The doctor advised me] + [to take a rest] || 6조각이 2덩어리로 줄었습니다.
[ is / what / important / most / health / is ] || [What is most important] + [is health] || what절 덩어리가 주어가 됩니다.
:::

:::vs 정렬 단골 실수 O / X
I don't know [where is he]. || I don't know [where he is]. || 문장 속 의문사절은 주어 + 동사 순서입니다.
He is [enough old] to drive. || He is [old enough] to drive. || enough는 형용사 뒤에 옵니다.
:::

:::steps 정렬 실전 3단계
1. 동사 찾기 | 조각 중 시제가 있는 동사를 찾고 주어를 앞에 둡니다. | advised
2. 짝꿍 묶기 | to+원형, 전치사+명사, 숙어를 먼저 묶습니다. | to take a rest
3. 검산 | 남은 조각이 없는지, 물어본 번호 위치 단어가 무엇인지 확인합니다. | 3번째 = me
:::`,
  quiz: [
    {
      prompt: "Choose the correct order. The medicine (　　) before breakfast.\n(A) should (B) taken (C) be (D) by the patient",
      choices: ["A-B-C-D", "A-C-B-D", "D-A-C-B", "D-C-A-B"],
      answer: 2,
      explanation: `**해석**\n그 약은 환자에 의해 아침 식사 전에 복용되어야 한다.\n\n**정답 근거**\n정답은 2번, A-C-B-D이다. 조동사 should 뒤에는 be, 그 뒤에는 과거분사 taken이 와서 수동태 should be taken을 만든다. 행위자를 나타내는 by the patient가 마지막에 온다.\n\n**오답 분석**\n- 1번 A-B-C-D: should taken be가 되어 be와 과거분사 순서가 바뀐다.\n- 3번 D-A-C-B: by the patient가 조동사보다 먼저 와서 뼈대가 끊긴다.\n- 4번 D-C-A-B: 행위자 덩어리가 문장 첫머리에 와서 수동태 순서가 무너진다.\n\n**핵심 포인트**\n수동태 조동사 문형은 주어 + should + be + 과거분사이며, by 덩어리는 뒤에 붙인다.`,
      lessonIds: ["g25-ordering-strategy"]
    },
    {
      prompt: "Choose the correct order. The nurse (　　) the patient.\n(A) carefully (B) examined (C) yesterday (D) the",
      choices: ["B-D-A-C", "D-B-A-C", "B-A-D-C", "A-B-C-D"],
      answer: 1,
      explanation: `**해석**\n간호사는 어제 그 환자를 주의 깊게 진찰했다.\n\n**정답 근거**\n정답은 1번 B-D-A-C이다. examined가 동사이고 the patient가 목적어이므로 동사 뒤에 목적어를 둔다. carefully는 동작을 꾸미는 부사라 examined 뒤 또는 문장 끝에 올 수 있지만, 제시 배열에서는 examined the patient carefully yesterday가 자연스럽다.\n\n**오답 분석**\n- 2번 D-B-A-C: the가 문장 첫머리에 와서 목적어 덩어리가 깨진다.\n- 3번 B-A-D-C: carefully the가 되어 관사와 명사가 떨어진다.\n- 4번 A-B-C-D: 부사로 시작하고 the가 홀로 남는다.\n\n**핵심 포인트**\n관사 the는 뒤의 명사 patient와 붙이고, 동사 examined 뒤에 목적어를 놓는다.`,
      lessonIds: ["g25-ordering-strategy"]
    },
    {
      prompt: "Choose the correct order. The tablet (　　) in a dry place.\n(A) stored (B) is (C) safely (D) kept",
      choices: ["B-A-C", "B-C-A", "A-B-C", "C-B-A"],
      answer: 2,
      explanation: `**해석**\n그 정제는 건조한 곳에 안전하게 보관된다.\n\n**정답 근거**\n정답은 2번 B-C-A이다. is stored가 수동태의 뼈대이고, safely는 그 동작을 꾸미는 부사이므로 *is safely stored*가 된다.\n\n**오답 분석**\n- 1번 B-A-C: is stored safely는 문법상 가능하지만, 제시한 시험형 배열에서 정답 문장으로 설정한 위치와 다르다.\n- 3번 A-B-C: stored is가 되어 be동사와 과거분사 순서가 뒤집힌다.\n- 4번 C-B-A: safely is stored가 되어 주어 뒤의 수동태 뼈대가 부자연스럽게 시작한다.\n\n**핵심 포인트**\n수동태 is stored를 먼저 묶고, 빈도나 방법을 나타내는 부사는 그 사이에 넣을 수 있다.`,
      lessonIds: ["g25-ordering-strategy"]
    },
    {
      prompt: "Choose the correct order. The pharmacist advised (　　) after meals.\n(A) to take (B) the patient (C) the medicine",
      choices: ["B-A-C", "A-B-C", "C-B-A", "B-C-A"],
      answer: 1,
      explanation: `**해석**\n약사는 환자에게 식후에 그 약을 복용하라고 조언했다.\n\n**정답 근거**\n정답은 1번 B-A-C이다. advise 뒤에 조언을 받는 사람 the patient를 놓고, to take라는 to부정사 뒤에 목적어 the medicine을 둔다. 따라서 *advised the patient to take the medicine after meals*가 된다.\n\n**오답 분석**\n- 2번 A-B-C: to take 뒤에 사람이 와서 advise + 사람 + to동사 구조가 끊긴다.\n- 3번 C-B-A: the medicine이 사람 목적어보다 먼저 와서 문형이 흐트러진다.\n- 4번 B-C-A: to take의 목적어 뒤에 to부정사가 와 의미 연결이 어색하다.\n\n**핵심 포인트**\nadvise + 사람 + to동사원형을 먼저 만들고, to동사 뒤에 행동의 대상을 붙인다.`,
      lessonIds: ["g25-ordering-strategy"]
    },
    {
      prompt: "Find the underlined error. Patients <u>with diabetes</u> should <u>takes</u> this drug <u>after meals</u>.",
      choices: ["Patients", "with diabetes", "takes", "after meals"],
      answer: 3,
      explanation: `**해석**\n당뇨병이 있는 환자들은 식후에 이 약을 복용해야 한다.\n\n**정답 근거**\n정답은 3번 takes다. 조동사 should 뒤에는 동사원형 take가 와야 하므로 *should take*로 고친다. with diabetes는 patients를 설명하는 전치사구이고, after meals는 복용 시간을 나타내므로 올바르다.\n\n**오답 분석**\n- 1번 Patients: 문장의 주어로 올바른 복수 명사다.\n- 2번 with diabetes: 어떤 환자인지 설명하는 자연스러운 덩어리다.\n- 4번 after meals: 식후라는 시간 표현으로 적절하다.\n\n**핵심 포인트**\n조동사는 뒤 동사의 모양을 바꾼다. should 뒤에는 주어가 단수여도 takes가 아니라 take를 쓴다.`,
      lessonIds: ["g25-ordering-strategy"]
    },
    {
      prompt: "Choose the correct order. The study found (　　) pain.\n(A) that (B) reduced (C) the new drug (D)",
      choices: ["A-B-C", "C-A-B", "A-C-B", "B-C-A"],
      answer: 3,
      explanation: `**해석**\n그 연구는 새 약이 통증을 줄였다는 것을 발견했다.\n\n**정답 근거**\n정답은 3번 A-C-B이다. found 뒤에는 that이 이끄는 명사절이 목적어로 온다. that 뒤에는 주어 the new drug가 오고, 그 뒤에 동사 reduced가 온다. 따라서 *found that the new drug reduced pain*이 된다.\n\n**오답 분석**\n- 1번 A-B-C: that reduced가 먼저 와서 주어가 뒤로 밀린다.\n- 2번 C-A-B: the new drug가 found 바로 뒤에 와서 that절의 시작이 흐려진다.\n- 4번 B-C-A: reduced가 found 뒤에 바로 와서 주어가 없다.\n\n**핵심 포인트**\nthat절은 that + 주어 + 동사 순서다. 절 전체가 found의 목적어가 된다.`,
      lessonIds: ["g25-ordering-strategy"]
    }
  ]
};

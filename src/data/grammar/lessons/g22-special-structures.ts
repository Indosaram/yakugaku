import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g22-special-structures",
  level: 3,
  title: "도치, 강조, 생략, 부정",
  summary: "어순이 바뀌거나 일부가 생략된 특수 구문을 원래 문장으로 되돌려 읽는다.",
  body: `:::analogy 특수구문은 '중요한 말에 스포트라이트를 비추려고 순서를 바꾼 문장'입니다
부정어(\`Never\`, \`Rarely\`)나 강조하고 싶은 말을 맨 앞으로 끌어오면 영어는 뒤의 어순까지 바뀝니다.
해석할 때는 **원래 순서로 되돌려 놓기**만 하면 됩니다.
:::

:::formula 특수구문 4대 공식
부정어 도치: [Never / Rarely / Little / Not only / No sooner] + [조동사/be동사/do] + [주어] + [동사] => 의문문 어순!
강조 구문: [It is / was] + [강조할 말] + [that] + [나머지] => 바로 ~가 …이다
동사 강조: [do / does / did] + [동사원형] => 정말로 ~하다 (예: He did take the pill.)
부분 부정: [not + all / always / every] => 모두 ~인 것은 아니다
:::

## 특수구문 한눈에 정리

| 구문 | 모양 | 해석 |
|---|---|---|
| **부정어 도치** | \`Never have I seen ~\` | 나는 한 번도 ~본 적 없다 |
| **Only 도치** | \`Only then did he realize ~\` | 그때서야 비로소 그는 깨달았다 |
| **It ~ that 강조** | \`It was the vitamin that helped.\` | 도움이 된 것은 바로 그 비타민이었다 |
| **부분 부정** | \`Not all drugs are safe.\` | 모든 약이 안전한 것은 아니다 |
| **생략** | \`When (it is) heated, ice melts.\` | 가열되면 얼음은 녹는다 |

:::train 문장 블록 기차로 도치 되돌리기
Rarely(부정어 맨 앞:거의 ~않다) | does this drug(도우미+주어:이 약은) | cause(동사원형:일으킨다) | side effects(목적어:부작용을) => 이 약은 부작용을 거의 일으키지 않는다.
It was the new vaccine(강조:바로 그 새 백신이었다) | that saved(that+동사:구한 것은) | many lives(목적어:많은 생명을) => 많은 생명을 구한 것은 바로 그 새 백신이었다.
Not all patients(부분 부정 주어:모든 환자가 ~인 것은 아니다) | respond(동사:반응한다) | to this treatment(수식어:이 치료에) => 모든 환자가 이 치료에 반응하는 것은 아니다.
:::

:::transform 원래 문장 → 도치 문장
I have [never] seen such a case. || [Never have I] seen such a case. || Never가 앞으로 가면 have가 주어 I 앞으로 튀어나옵니다.
He [rarely takes] medicine. || [Rarely does he take] medicine. || 일반동사는 도우미 does를 앞세우고 동사는 원형(take)이 됩니다.
:::

:::vs 특수구문 단골 함정 O / X
Never [I have] seen such a fast recovery. || Never [have I] seen such a fast recovery. || 부정어가 맨 앞이면 조동사가 주어 앞으로 갑니다.
Little [he knew] about the risk. || Little [did he know] about the risk. || 일반동사 knew는 did + 주어 + know로 바뀝니다.
It was yesterday [which] I met the doctor. || It was yesterday [that] I met the doctor. || 강조 구문은 It was ~ that입니다.
:::

:::steps 특수구문 3초 풀이법
1. 부정어 맨 앞 확인 | Never, Rarely, Seldom, Little, Not only, Only가 문장 맨 앞인지 봅니다. | Seldom ~
2. 의문문 어순 고르기 | 그 뒤가 조동사/do + 주어 + 동사 순서인 보기를 고릅니다. | does it occur (O)
3. It ~ that 지워 보기 | It is와 that을 지워도 문장이 성립하면 강조 구문입니다. | The vaccine saved lives (O)
:::`,
  quiz: [
    {
      prompt: "Only after the safety data were checked (　　) the researchers increase the dose.",
      choices: ["did", "do", "have", "were"],
      answer: 1,
      explanation: `**해석**

안전성 자료를 확인한 후에야 연구자들은 용량을 늘렸다.

**정답 근거**

정답은 ① did입니다. Only after가 앞에 온 도치이고, 원래 문장의 과거동사 increased를 did + increase로 바꿉니다.

**오답 분석**

- ② do는 현재형이라 과거 상황과 맞지 않습니다.
- ③ have는 increase와 현재완료 구조를 만들지 못합니다.
- ④ were는 be동사라 주어 앞 조동사 자리에 맞지 않습니다.

**핵심 포인트**

Only after가 앞에 오면 did + 주어 + 동사원형을 찾습니다.`,
    },
    {
      prompt: "Never (　　) the nurse failed to record the patient's temperature.",
      choices: ["has", "have", "did", "is"],
      answer: 1,
      explanation: `**해석**

그 간호사는 환자의 체온 기록을 빠뜨린 적이 결코 없다.

**정답 근거**

정답은 ① has입니다. 주어 the nurse가 단수이고 failed는 과거분사이므로 has failed가 필요합니다. Never가 앞에 와 has와 주어가 도치됩니다.

**오답 분석**

- ② have는 복수 주어와 어울립니다.
- ③ did 뒤에는 failed가 아니라 fail 원형이 와야 합니다.
- ④ is는 failed와 현재완료를 만들 수 없습니다.

**핵심 포인트**

Never 뒤에서는 이미 있는 조동사를 주어 앞으로 보냅니다.`,
    },
    {
      prompt: "It was the pharmacist (　　) explained the interaction between the two drugs.",
      choices: ["who", "what", "where", "when"],
      answer: 1,
      explanation: `**해석**

두 약물의 상호작용을 설명한 사람은 약사였다.

**정답 근거**

정답은 ① who입니다. It was the pharmacist who explained는 사람 pharmacist를 강조하는 it-cleft 구조입니다. 원래 문장은 The pharmacist explained입니다.

**오답 분석**

- ② what은 사람을 받는 강조 연결어가 아닙니다.
- ③ where는 장소를 나타냅니다.
- ④ when은 시간을 나타냅니다.

**핵심 포인트**

It is 또는 was 뒤에 사람을 강조하면 who, 사물이나 내용을 강조하면 that을 우선 확인합니다.`,
    },
    {
      prompt: "The doctor <u>did recommended</u> that the patient <u>rest</u> after taking the medicine.",
      choices: ["did recommended", "that", "rest", "after taking"],
      answer: 1,
      explanation: `**해석**

의사는 환자가 약을 먹은 뒤 쉬라고 분명히 권했다.

**정답 근거**

정답은 ①입니다. 강조 조동사 did가 이미 과거를 나타내므로 뒤에는 과거형 recommended가 아니라 원형 recommend가 와야 합니다.

**오답 분석**

- ② that은 recommend 뒤 내용을 연결하는 접속사입니다.
- ③ rest는 제안이나 권고의 that절에서 원형으로 쓸 수 있습니다.
- ④ after taking은 약을 먹은 뒤라는 시간 표현입니다.

**핵심 포인트**

do, does, did로 강조하면 뒤 일반동사는 반드시 원형입니다.`,
    },
    {
      prompt: "Neither the tablet nor the capsules (　　) available in the clinic.",
      choices: ["was", "were", "is", "has"],
      answer: 2,
      explanation: `**해석**

그 진료소에는 정제도 캡슐도 준비되어 있지 않았다.

**정답 근거**

정답은 ② were입니다. neither A nor B에서는 보통 동사와 가까운 nor 뒤 주어에 맞춥니다. capsules가 복수이므로 were available입니다.

**오답 분석**

- ① was는 가까운 주어 capsules와 수가 맞지 않습니다.
- ③ is는 단수 현재형이라 capsules와 맞지 않습니다.
- ④ has는 available과 연결되는 be동사가 아닙니다.

**핵심 포인트**

neither A nor B를 보면 nor 뒤 명사의 단복수를 먼저 확인합니다.`,
    },
    {
      prompt: "When (　　) correctly, the specimen remains stable for a week.",
      choices: ["store", "stored", "storing", "stores"],
      answer: 2,
      explanation: `**해석**

올바르게 보관되면 그 검체는 일주일 동안 안정적으로 유지된다.

**정답 근거**

정답은 ② stored입니다. When it is stored correctly에서 it과 is가 생략된 형태입니다. 검체는 보관하는 주체가 아니라 보관되는 대상이므로 과거분사 stored를 씁니다.

**오답 분석**

- ① store는 검체가 보관한다는 능동 뜻이 됩니다.
- ③ storing도 검체가 보관하는 능동 진행 의미입니다.
- ④ stores는 생략 구조와 맞지 않는 현재형입니다.

**핵심 포인트**

생략된 주어가 주절 주어와 같고 그 주어가 동작을 받으면 When + p.p.를 사용합니다.`,
    },
  ],
};

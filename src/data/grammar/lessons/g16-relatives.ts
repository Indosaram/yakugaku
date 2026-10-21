import type { Lesson } from "../../types";

const explanations = [
  "**해석**\n\n새 화합물을 발견한 과학자는 상을 받았다.\n\n**정답 근거**\n\n정답은 1번 who입니다. scientist는 사람이고, who 뒤의 discovered에서 발견한 주체이므로 사람 주격이 필요합니다.\n\n**오답 분석**\n\n* 2번 whom은 목적격이라 주체가 될 수 없습니다.\n* 3번 whose는 뒤에 소유되는 명사가 필요합니다.\n* 4번 what은 앞에 선행사를 두지 않습니다.\n\n**핵심 포인트**\n\n사람 선행사가 관계절의 주어이면 who를 씁니다.",
  "**해석**\n\n의사가 처방한 약은 환자의 열을 낮췄다.\n\n**정답 근거**\n\n정답은 2번 which입니다. medicine은 사물이고 the doctor가 이미 주어이므로 prescribed의 목적어인 medicine을 대신합니다.\n\n**오답 분석**\n\n* 1번 who는 사람용입니다.\n* 3번 whose는 소유 표현입니다.\n* 4번 where는 장소용입니다.\n\n**핵심 포인트**\n\n사물 목적격 관계대명사는 which이며 that 또는 생략도 가능합니다.",
  "**해석**\n\n환자의 혈압을 확인한 간호사는 결과를 차트에 기록했다.\n\n**정답 근거**\n\n정답은 1번 which입니다. nurse는 사람이고 checked의 주어이므로 who가 맞습니다.\n\n**오답 분석**\n\n* 2번 recorded는 nurse에 맞는 동사입니다.\n* 3번 in은 차트 안이라는 장소입니다.\n* 4번 carefully는 recorded를 꾸밉니다.\n\n**핵심 포인트**\n\n선행사의 사람·사물과 관계절의 역할을 함께 봅니다.",
  "**해석**\n\n치료 후 증상이 호전된 환자는 집으로 돌아갔다.\n\n**정답 근거**\n\n정답은 3번 whose입니다. patient와 symptoms는 ‘환자의 증상’이라는 소유 관계이고, whose 뒤에 symptoms가 옵니다.\n\n**오답 분석**\n\n* 1번 who는 소유를 만들 수 없습니다.\n* 2번 which는 whose symptoms의 의미가 아닙니다.\n* 4번 whom은 목적격입니다.\n\n**핵심 포인트**\n\n‘누구의 무엇’은 whose + 명사입니다.",
  "**해석**\n\n200명의 환자를 포함한 그 임상시험은 유용한 자료를 냈다.\n\n**정답 근거**\n\n정답은 3번 which입니다. trial은 사물이고 쉼표 사이에서 included의 주어가 됩니다. 쉼표 뒤에는 that을 쓰지 않습니다.\n\n**오답 분석**\n\n* 1번 that은 쉼표 뒤 계속적 용법에 쓸 수 없습니다.\n* 2번 who는 사람용입니다.\n* 4번 whose 뒤에는 소유 명사가 필요합니다.\n\n**핵심 포인트**\n\n쉼표가 있는 사물의 추가 설명은 which입니다.",
  "**해석**\n\n우리가 어제 수집한 샘플들은 낮은 온도에서 보관되었다.\n\n**정답 근거**\n\n정답은 2번 that입니다. samples는 사물이고 we가 관계절의 주어이므로 collected의 목적어를 대신합니다.\n\n**오답 분석**\n\n* 1번 who는 사람용입니다.\n* 3번 whose는 뒤에 명사가 필요합니다.\n* 4번 where는 장소용입니다.\n\n**핵심 포인트**\n\n사물 뒤에 주어가 이미 있으면 목적격 that을 찾습니다."
];

export const lesson: Lesson = {
  id: "g16-relatives",
  level: 3,
  title: "관계대명사 who, which, that, whose",
  summary: "앞의 명사를 뒤에서 설명하는 절을 붙여 긴 의약 문장의 뼈대를 찾는다.",
  body: `:::analogy 관계대명사는 '접착제 + 대명사'가 합쳐진 블록입니다
짧은 두 문장에 똑같은 사람이나 사물이 겹칠 때, 뒤에 나오는 대명사(\`he\`, \`it\`, \`his\`)를 **\`who\`, \`which\`, \`that\`, \`whose\`**로 바꾸어 앞 명사(선행사) 바로 뒤에 착 붙이는 장치입니다.
그래서 관계대명사절은 항상 **앞의 명사를 뒤에서 꾸미는 긴 형용사**처럼 해석합니다 ("~하는 명사").
:::

:::formula 관계대명사 선택 공식 (표만 기억하면 끝!)
[사람 선행사] + [who (주격: 뒤에 동사)] / [who(m) (목적격: 뒤에 주어+동사)]
[사물·동물 선행사] + [which (주격/목적격)]
[사람·사물 만능] + [that (주격/목적격)] => 단, 쉼표(,) 뒤나 전치사 바로 뒤에는 that 사용 금지!
[소유 관계 (~의)] + [whose + 명사] => 사람·사물 모두 가능! (예: a patient whose fever is high)
:::

## 관계대명사 자리별 선택 표

| 앞 명사(선행사) | **주격** (바로 뒤에 동사 옴) | **목적격** (뒤에 주어+동사, 목적어 비어 있음) | **소유격** (뒤에 \`명사\`가 바로 붙음) |
|---|---|---|---|
| **사람** (\`the doctor\`) | **\`who\`** / \`that\` | \`who(m)\` / \`that\` / **(생략 가능)** | **\`whose\`** + 명사 |
| **사물·동물** (\`the drug\`) | **\`which\`** / \`that\` | \`which\` / \`that\` / **(생략 가능)** | **\`whose\`** + 명사 |

:::train 문장 블록 기차로 관계대명사절 묶어 읽기
The scientist(주어:과학자는) | who discovered the drug(주격 관계절:그 약을 발견한) | won(본동사:받았다) | a prize(목적어:상을) => 그 약을 발견한 과학자는 상을 받았다.
The medicine(주어:그 약은) | which the doctor prescribed(목적격 관계절:의사가 처방한) | worked(본동사:효과가 있었다) | quickly(부사:빠르게) => 의사가 처방한 그 약은 빠르게 효과가 나타났다.
Patients(주어:환자들은) | whose symptoms worsen(소유격 관계절:증상이 악화되는) | should visit(본동사:방문해야 한다) | the hospital(목적어:병원을) => 증상이 악화되는 환자들은 병원을 방문해야 한다.
:::

:::transform 두 문장이 관계대명사로 합쳐지는 과정
주격 합체: I know a nurse. + [She] speaks Japanese. || I know a nurse [who] speaks Japanese. || 주어 [She]가 [who]로 변신했으므로 who 바로 뒤에는 동사(speaks)가 옵니다!
목적격 합체: This is the pill. + I took [it] this morning. || This is the pill [(which/that)] I took this morning. || 목적어 [it]이 [which]로 변신해 앞으로 나갔으므로 took 뒤 목적어 자리가 비어 있습니다!
전치사 + 관계대명사: the house + He lives [in it]. || the house [in which] he lives (= [where] he lives) || 전치사가 관계대명사 앞으로 오면 [전치사 + which/whom]이 되고 뒤 문장은 완전해집니다!
:::

:::vs 관계대명사 단골 함정 O / X
The tablet [who] reduces fever is on the table. || The tablet [which / that] reduces fever is on the table. || 선행사(The tablet)가 사물이므로 who가 아니라 which나 that을 씁니다.
The drug, [that] was approved last year, is safe. || The drug, [which] was approved last year, is safe. || 쉼표(,) 뒤나 전치사(in, of, with) 바로 뒤에는 that을 쓸 수 없습니다!
This is the pill which I took [it] yesterday. || This is the pill which I took yesterday. || which가 이미 목적어(it)를 대신하고 있으므로 뒤에 it을 또 쓰면 틀립니다!
:::

:::steps 관계대명사 빈칸 3초 풀이법
1. 앞 명사(선행사) 확인 | 빈칸 앞 명사가 사람인지 사물인지 먼저 봅니다. | the patient (사람) / the drug (사물)
2. 빈칸 뒤 구조 확인 | 바로 뒤에 동사가 오면 주격(who/which), 주어+동사(목적어 없음)가 오면 목적격, 무관사 명사가 오면 whose입니다. | (　　) symptoms were mild → whose!
3. 쉼표·전치사 체크 | 빈칸 앞에 쉼표(,)나 전치사가 있으면 that을 보기에서 지웁니다. | , which (O) / in which (O)
:::`,
  quiz: [
    { prompt: "The scientist (　　) discovered the new compound received an award.", choices: ["who", "whom", "whose", "what"], answer: 1, explanation: explanations[0], lessonIds: ["g16-relatives"] },
    { prompt: "The medicine (　　) the doctor prescribed reduced the patient's fever.", choices: ["who", "which", "whose", "where"], answer: 2, explanation: explanations[1], lessonIds: ["g16-relatives"] },
    { prompt: "The nurse <u>which</u> checked the patient's blood pressure recorded the result.", choices: ["which", "checked", "recorded", "result"], answer: 1, explanation: explanations[2], lessonIds: ["g16-relatives"] },
    { prompt: "The patient (　　) symptoms improved after treatment returned home.", choices: ["who", "which", "whose", "whom"], answer: 3, explanation: explanations[3], lessonIds: ["g16-relatives"] },
    { prompt: "The trial, (　　) included 200 patients, produced useful data.", choices: ["that", "who", "which", "whose"], answer: 3, explanation: explanations[4], lessonIds: ["g16-relatives"] },
    { prompt: "The samples (　　) we collected yesterday were stored at low temperature.", choices: ["who", "that", "whose", "where"], answer: 2, explanation: explanations[5], lessonIds: ["g16-relatives"] }
  ]
};

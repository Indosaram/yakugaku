import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g05-nouns-articles-pronouns",
  level: 1,
  title: "명사·관사·대명사, 셀 수 있는/없는",
  summary: "명사에 a, the, 대명사를 알맞게 붙이고 셀 수 있는지 구별한다.",
  body: `:::analogy 알약은 하나씩 셀 수 있지만, 물약은 1개·2개로 셀 수 없습니다
영어 명사는 **알약처럼 경계가 뚜렷해 하나, 둘 셀 수 있는 명사(가산명사)**와 **물·공기·정보처럼 덩어리여서 개수로 셀 수 없는 명사(불가산명사)**로 나뉩니다.
이 구분이 중요한 이유는 앞에 붙는 모자(\`a/an\`)와 수량 단어(\`many\` vs \`much\`, \`few\` vs \`little\`)가 완전히 달라지기 때문입니다.
:::

:::formula 셀 수 있는 명사 vs 셀 수 없는 명사 짝꿍 공식
[셀 수 있는 명사 (pill, patient)] + [many / a few / few] => 복수형(-s) + 복수동사(are)
[셀 수 없는 명사 (water, information, advice)] + [much / a little / little] => -s 금지! + 단수동사(is)
[a few / a little (조금 있는 +)] vs [few / little (거의 없는 -)] => a가 있으면 긍정, 없으면 부정!
:::

## 시험에 꼭 나오는 명사·관사·대명사 표

| 구분 | 셀 수 있는 명사 (알약형) | 셀 수 없는 명사 (물약·개념형) |
|---|---|---|
| **대표 단어** | \`pill\`, \`tablet\`, \`patient\`, \`symptom\`, \`effect\` | \`information\`, \`advice\`, \`equipment\`, \`research\`, \`water\` |
| **관사 / 복수** | 단수 앞 \`a/an\`, 복수는 \`-s\` | \`a/an\` **절대 불가**, 복수 \`-s\` **절대 불가** |
| **많은** | \`many\` (\`a lot of\` 공통) | \`much\` (\`a lot of\` 공통) |
| **조금 있는 (+)** | \`a few\` + 복수명사 | \`a little\` + 단수명사 |
| **거의 없는 (-)** | \`few\` + 복수명사 | \`little\` + 단수명사 |

:::train 문장 블록 기차로 관사·대명사 익히기
The doctor(주어:의사는) | gave(동사:주었다) | me(간접목적어:나에게) | useful advice(직접목적어:유용한 조언을) => 의사는 나에게 유용한 조언을 주었다 (advice 앞 a 없음!).
Few patients(주어:거의 없는 환자들이) | experienced(동사:겪었다) | severe side effects(목적어:심한 부작용을) => 심한 부작용을 겪은 환자는 거의 없었다.
The side effect(주어:부작용은) | of this drug(수식어:이 약의) | is weaker than(동사+비교:~보다 약하다) | that of the old one(대명사:예전 약의 그것[부작용]) => 이 약의 부작용은 예전 약의 부작용보다 약하다.
:::

:::transform 대명사가 가리키는 명사의 단수·복수 맞추기
단수 비교: [The effect] of Pill A is stronger than [that] of Pill B. || 복수 비교: [The effects] of Pill A are stronger than [those] of Pill B. || 앞에서 비교한 명사가 단수면 [that], 복수면 [those]로 대신 받습니다!
막연한 하나: She took [a] painkiller. (진통제 하나) || 서로 아는 그것: [The] painkiller worked fast. (방금 먹은 바로 그 진통제) || 처음 말할 땐 [a], 다시 가리킬 땐 [the]를 씁니다.
:::

:::vs 명사·대명사 단골 함정 O / X
We need more [informations / equipments]. || We need more [information / equipment]. || information, advice, equipment, research, furniture는 셀 수 없어 -s를 붙이지 않습니다.
There are [much] patients in the waiting room. || There are [many] patients in the waiting room. || patients는 셀 수 있는 복수명사이므로 many를 씁니다.
The symptoms of cold are similar to [that] of flu. || The symptoms of cold are similar to [those] of flu. || 복수명사(The symptoms)를 대신 받으므로 that이 아니라 those여야 합니다.
:::

:::steps 명사·대명사 문제 3초 판별법
1. 불가산 5대장 체크 | information, advice, equipment, research, evidence가 보이면 a와 -s를 즉시 지웁니다. | an advice (X)
2. 수량어 짝 맞추기 | 뒤 명사에 -s가 있으면 many/few, 없으면 much/little을 고릅니다. | few tablets / little water
3. 대명사 화살표 연결 | it/they, that/those가 앞 문장의 단수 명사를 가리키는지 복수 명사를 가리키는지 연결합니다. | symptoms → those
:::`,
  quiz: [
    { prompt: "The nurse gave the patient (　　) useful information about the medicine.", choices: ["a", "an", "some", "many"], answer: 3, explanation: "**해석**\n\n간호사는 환자에게 약에 관한 유용한 정보를 주었다. useful은 정보의 성질을 설명할 뿐, information을 셀 수 있게 만들지는 않는다.\n\n**정답 근거**\n\nsome은 셀 수 없는 information 앞에서 정해지지 않은 양을 나타낸다.\n\n**오답 분석**\n\n• 1번 a, 2번 an: 하나를 세는 관사라 불가산명사에 바로 붙지 않는다.\n• 4번 many: 셀 수 있는 복수명사 앞에 쓴다.\n\n**핵심 포인트**\n\ninformation은 *a piece of information*처럼 단위를 붙여야 셀 수 있다.", lessonIds: ["g05-nouns-articles-pronouns"] },
    { prompt: "The doctor prescribed (　　) antibiotic for the infection.", choices: ["a", "an", "the", "no article"], answer: 2, explanation: "**해석**\n\n의사는 감염에 항생제 하나를 처방했다. 문장 앞에 특정 항생제가 언급되지 않아 처음 소개하는 대상을 말한다.\n\n**정답 근거**\n\nantibiotic은 단수 가산명사이고 첫소리가 모음 /애/이므로 an antibiotic이다.\n\n**오답 분석**\n\n• 1번 a: 자음 소리 앞에서만 쓴다.\n• 3번 the: 이미 특정된 항생제라는 단서가 없다.\n• 4번 무관사: 단수 가산명사는 홀로 올 수 없다.\n\n**핵심 포인트**\n\na/an은 철자가 아니라 실제 첫소리로 고른다.", lessonIds: ["g05-nouns-articles-pronouns"] },
    { prompt: "The researcher tested three samples, and (　　) were stable.", choices: ["it", "they", "them", "this"], answer: 2, explanation: "**해석**\n\n연구자는 세 시료를 검사했고 그것들은 안정적이었다. 앞 절의 three samples가 뒤 절에서 다시 가리키는 대상이다.\n\n**정답 근거**\n\nthree samples는 복수이며 빈칸은 were 앞 주어 자리이므로 주격 they다.\n\n**오답 분석**\n\n• 1번 it, 4번 this: 하나를 가리키는 단수 대명사다.\n• 3번 them: 목적어 자리의 목적격이라 were 앞에 올 수 없다.\n\n**핵심 포인트**\n\n복수 선행사는 주어 they, 목적어 them으로 받는다. 동사를 보고 자리도 확인한다.", lessonIds: ["g05-nouns-articles-pronouns"] },
    { prompt: "(　　) tablets on the shelf are for children.", choices: ["A", "An", "The", "No article"], answer: 3, explanation: "**해석**\n\n선반 위의 그 정제들은 어린이용이다. on the shelf가 정제의 위치를 알려 주어 범위를 좁힌다.\n\n**정답 근거**\n\n어느 정제인지 정해져 있으므로 특정 복수인 the tablets가 맞다. 복수명사에는 a나 an을 붙일 수 없다.\n\n**오답 분석**\n\n• 1번 A, 2번 An: 단수 앞에만 쓴다.\n• 4번 무관사: 일반적인 정제라면 가능하지만 여기서는 특정되어 있다.\n\n**핵심 포인트**\n\nthe는 특정한 복수와 특정한 불가산명사에도 붙는다.", lessonIds: ["g05-nouns-articles-pronouns"] },
    { prompt: "The patients took <u>it</u> after the nurse explained the dosage. 다음 중 문맥상 여러 정제를 가리키도록 고칠 말은?", choices: ["it", "they", "them", "this"], answer: 3, explanation: "**해석**\n\n환자들은 간호사가 용량을 설명한 뒤 그것들을 복용했다. 여기서는 복용한 대상이 여러 정제라고 가정한다.\n\n**정답 근거**\n\n여러 정제는 복수이며 took 뒤 목적어 자리이므로 them이다.\n\n**오답 분석**\n\n• 1번 it: 단수 사물을 가리킨다.\n• 2번 they: 복수 주어 자리의 말이라 took 뒤에 맞지 않는다.\n• 4번 this: 가까운 하나를 가리킨다.\n\n**핵심 포인트**\n\n대명사는 선행사의 수와 주어·목적어 자리를 모두 맞춘다.", lessonIds: ["g05-nouns-articles-pronouns"] },
    { prompt: "gave / the pharmacist / me / a bottle of water", choices: ["The pharmacist gave me a bottle of water.", "The pharmacist me gave a bottle of water.", "Me gave the pharmacist a bottle of water.", "A bottle of water gave me the pharmacist."], answer: 1, explanation: "**해석**\n\n약사는 나에게 물 한 병을 주었다.\n\n**정답 근거**\n\n주어 the pharmacist, 동사 gave, 간접목적어 me, 직접목적어 a bottle of water 순서다.\n\n**오답 분석**\n\n• 2번: me를 동사 앞에 둘 수 없다.\n• 3번: me는 목적격이라 주어가 될 수 없다.\n• 4번: 주는 대상과 받는 대상을 뒤집었다.\n\n**핵심 포인트**\n\n관사와 명사를 묶고 누가 무엇을 누구에게 주는지 먼저 찾는다.", lessonIds: ["g05-nouns-articles-pronouns"] }
  ]
};

import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g15-participles",
  level: 3,
  title: "분사·분사구문",
  summary: "동사의 -ing와 p.p.가 명사를 꾸미거나 문장을 짧게 연결하는 법을 익힌다.",
  body: `:::analogy 분사는 동사가 '형용사 변신 벨트'를 찬 것입니다 (-ing 능동 vs p.p. 수동)
동사에 **\`-ing\`(현재분사)**를 붙이면 **"직접 ~하고 있는 / 감정을 주는(능동)"** 형용사가 되고, **\`p.p.\`(과거분사)**를 쓰면 **"~당한 / 감정을 느끼는(수동)"** 형용사가 됩니다.
명사와 분사 사이에 **누가 누구에게 하느냐** 화살표를 그어 보면 1초 만에 구별됩니다!
:::

:::formula 분사 & 분사구문 핵심 공식
능동 화살표 (명사가 직접 함): [명사] → [V-ing] => 예: sleeping baby (자고 있는 아기), exciting news (흥미를 주는 소식)
수동 화살표 (명사가 당함·느낌): [명사] ← [p.p.] => 예: injured patient (다친 환자), surprised doctor (놀란 의사)
분사구문 만들기: [접속사 + 주어 + 동사], [주어 + 동사] => 접속사·주어를 지우고 동사를 [V-ing] (수동이면 [(Being) p.p.])로!
with 부대상황: [with + 목적어 + -ing(능동) / p.p.(수동)] => ~한 채로 (예: with his eyes closed 눈을 감은 채로)
:::

## 현재분사(-ing) vs 과거분사(p.p.) 핵심 비교표

| 구분 | **현재분사 (\`V-ing\`)** | **과거분사 (\`p.p.\`)** |
|---|---|---|
| **기본 의미** | **능동** (~하는) · **진행** (~하고 있는) | **수동** (~된, ~당한) · **완료** (이미 ~한) |
| **감정 분사** | 남에게 감정을 **일으키는** (\`interesting\`, \`tiring\`, \`surprising\`) | 사람이 감정을 **느끼는** (\`interested\`, \`tired\`, \`surprised\`) |
| **명사 수식 위치** | 1단어는 명사 앞, **길어지면 명사 뒤!** | 1단어는 명사 앞, **길어지면 명사 뒤!** (\`pills prescribed by ~\`) |

:::train 문장 블록 기차로 뒤에서 꾸미는 분사 읽기
Patients(주어:환자들은) | taking this medicine(현재분사구:이 약을 복용하는) | should avoid(동사:피해야 한다) | driving(목적어:운전을) => 이 약을 복용하는 환자들은 운전을 피해야 한다.
The medicine(주어:그 약은) | prescribed by the doctor(과거분사구:의사에 의해 처방된) | reduced(동사:줄였다) | the fever(목적어:열을) => 의사가 처방한 그 약은 열을 낮췄다.
Compared with Pill A(과거분사구문:알약 A와 비교될 때) | Pill B(주어:알약 B는) | has fewer side effects(동사+목적어:부작용이 더 적다) => 알약 A와 비교하면 알약 B는 부작용이 더 적다.
:::

:::transform 긴 부사절이 짧은 분사구문으로 줄어드는 모션
능동 분사구문: [When she took] the tablet, she drank water. || [Taking] the tablet, she drank water. || 주절 주어(she)가 직접 약을 복용(능동)했으므로 [-ing]로 줄어듭니다!
수동 분사구문: [Because it is stored] in a cool place, the drug lasts long. || [(Being) Stored] in a cool place, the drug lasts long. || 주절 주어(the drug)가 보관되는 대상(수동)이므로 [p.p.]로 시작합니다!
:::

:::vs 분사 단골 함정 O / X
The patients were [confusing] by the instructions. || The patients were [confused] by the instructions. || 사람(환자들)이 설명서 때문에 혼란을 '느낀' 것이므로 과거분사 confused가 맞습니다.
The results of the study were very [encouraged]. || The results of the study were very [encouraging]. || 연구 결과가 사람들에게 희망을 '주는' 것이므로 현재분사 encouraging을 씁니다.
She sat on the bed with her legs [crossing]. || She sat on the bed with her legs [crossed]. || 다리(her legs)는 사람에 의해 꼬아지는(교차되는) 대상이므로 수동인 crossed를 씁니다.
:::

:::steps -ing vs p.p. 3초 판별법
1. 주인공(명사) 찾기 | 분사가 꾸미는 명사(또는 분사구문의 주절 주어)에 동그라미를 칩니다. | The medicine (　　) by doctors
2. 능동·수동 화살표 확인 | 명사가 직접 하면 -ing(뒤에 목적어 있음), 당하면 p.p.(뒤에 목적어 없음·전치사구만 있음)입니다. | 약은 처방됨 + 뒤에 목적어 없음 = prescribed!
3. 감정 단어 체크 | 사람이 주체면 p.p.(interested, satisfied, relieved), 사물·사건이 주체면 -ing(interesting, satisfying)입니다. | He was relieved (O)
:::`,
  quiz: [
    {
      prompt: "The tablets (　　) by the pharmacist are safe for most adults.",
      choices: ["recommending", "recommended", "recommend", "were recommended"],
      answer: 2,
      explanation: `**해석**\n약사가 추천한 정제는 대부분의 성인에게 안전하다.\n\n**정답 근거**\n빈칸은 tablets를 뒤에서 설명한다. 정제가 추천하는 것이 아니라 추천을 받으므로 수동 과거분사 **recommended**가 맞다.\n\n**오답 분석**\n* **recommending**은 정제가 누군가를 추천한다는 능동 의미가 되어 주체가 맞지 않는다.\n* **recommend**는 본동사 형태라 명사 뒤 설명 자리에 맞지 않는다.\n* **were recommended**는 주어와 동사를 갖춘 절이므로 앞에 이미 있는 are safe와 동사가 충돌한다.\n\n**핵심 포인트**\n명사가 행동을 당하면 p.p.를 고른다.`
    },
    {
      prompt: "The researchers found a substance (　　) the growth of cancer cells.",
      choices: ["inhibiting", "inhibited", "inhibit", "was inhibited"],
      answer: 1,
      explanation: `**해석**\n연구자들은 암세포의 성장을 억제하는 물질을 발견했다.\n\n**정답 근거**\nsubstance가 growth를 억제하는 주체이므로 능동 현재분사 **inhibiting**이 substance를 꾸민다.\n\n**오답 분석**\n* **inhibited**는 물질이 억제당했다는 뜻이어서 의미가 뒤집힌다.\n* **inhibit**는 동사 원형으로 명사를 바로 꾸밀 수 없다.\n* **was inhibited**는 완전한 절이며 a substance 뒤에 이어질 구조가 아니다.\n\n**핵심 포인트**\n분사의 주체가 명사 자체인지 먼저 묻고 -ing와 p.p.를 구별한다.`
    },
    {
      prompt: "(　　) the instructions carefully, the patient took the medicine.",
      choices: ["Read", "Reading", "Reads", "To reading"],
      answer: 2,
      explanation: `**해석**\n설명서를 주의 깊게 읽은 뒤 환자는 약을 복용했다.\n\n**정답 근거**\n앞부분은 주절의 patient가 한 행동을 줄인 분사구문이다. 환자가 직접 읽으므로 능동형 **Reading**이 알맞다. 문맥상 “읽으면서” 또는 “읽은 뒤”로 해석한다.\n\n**오답 분석**\n* **Read**는 명령문처럼 보이며 분사구문 표시가 되지 않는다.\n* **Reads**는 3인칭 단수 본동사라 앞에 접속사와 주어가 필요하다.\n* **To reading**은 to부정사와 동명사를 잘못 결합한 형태다.\n\n**핵심 포인트**\n분사구문 앞에서 주절 주어가 행동의 주체인지 확인한다.`
    },
    {
      prompt: "<u>Having finish</u> the experiment, the scientist wrote a report.",
      choices: ["Having finish", "Having finished", "Have finished", "Finished having"],
      answer: 2,
      explanation: `**해석**\n실험을 끝낸 뒤 과학자는 보고서를 썼다.\n\n**정답 근거**\n보고서 쓰기보다 실험 끝내기가 먼저다. 완료 분사구문은 **Having + 과거분사**이므로 finish의 p.p. finished를 써서 Having finished가 된다.\n\n**오답 분석**\n* **Having finish**는 have 뒤에 동사 원형을 둔 형태라 완료형이 아니다.\n* **Have finished**는 주어 없는 현재완료 절이며 Having이 필요하다.\n* **Finished having**은 완료 분사구문의 어순과 형태가 모두 틀렸다.\n\n**핵심 포인트**\n분사구문에서 주절보다 먼저 끝난 능동 행동은 having + p.p.다.`
    },
    {
      prompt: "(　　) in a cool, dry place, the capsules remain effective for two years.",
      choices: ["Storing", "Stored", "Store", "Having store"],
      answer: 2,
      explanation: `**해석**\n서늘하고 건조한 곳에 보관되면 캡슐은 2년 동안 효과가 유지된다.\n\n**정답 근거**\n캡슐은 누군가에 의해 보관되는 대상이다. 따라서 수동 분사구문 **Stored**가 맞다.\n\n**오답 분석**\n* **Storing**은 캡슐이 스스로 보관한다는 능동 의미가 된다.\n* **Store**는 명령문 또는 원형 동사라 주절과 연결되지 않는다.\n* **Having store**는 having 뒤에 p.p.가 오지 않아 형태가 틀렸다.\n\n**핵심 포인트**\n분사구문의 주어가 행동을 당하면 p.p.로 시작한다.`
    },
    {
      prompt: "Which sentence is grammatically correct?",
      choices: ["The patient taking prescribed the drug felt better.", "The patient prescribed the drug felt better.", "Prescribed the drug, the patient felt better.", "The patient was prescribed the drug felt better."],
      answer: 2,
      explanation: `**해석**\n문제는 문법적으로 맞는 문장을 고르는 것이다. 정답은 “그 약을 처방받은 환자는 상태가 좋아졌다”이다.\n\n**정답 근거**\n**The patient prescribed the drug felt better**에서 prescribed the drug가 patient를 꾸민다. 환자가 약을 처방받았다는 수동 의미로, 관계대명사절 the patient who was prescribed the drug를 줄인 구조다.\n\n**오답 분석**\n* **taking prescribed**는 현재분사 뒤에 과거분사를 어색하게 연속시켜 구조가 없다.\n* **Prescribed the drug**는 환자가 약을 처방했다는 능동 의미가 된다.\n* **was prescribed ... felt**는 동사가 두 개라 접속사나 관계대명사가 필요하다.\n\n**핵심 포인트**\n명사 뒤 p.p.는 수동 관계대명사절을 줄인 것인지 확인한다.`
    }
  ]
};

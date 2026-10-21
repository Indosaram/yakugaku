import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g10-adjectives-adverbs",
  level: 2,
  title: "형용사와 부사",
  summary: "명사를 설명하는 형용사와 동사·형용사·부사를 설명하는 부사의 자리와 형태를 구별한다.",
  body: `:::analogy 형용사는 '명사 전용 옷'이고, 부사는 '동사·형용사 전용 양념'입니다
**형용사(\`safe\`, \`effective\`)**는 오직 **명사**만 꾸미거나 설명합니다 ("안전한 약", "그 약은 안전하다").
반면 **부사(\`safely\`, \`quickly\`, \`very\`)**는 명사 빼고 다 꾸밉니다. 주로 **동사**("안전하게 작용한다")나 **형용사**("매우 안전한")에 맛을 더합니다.
:::

:::formula 형용사 vs 부사 자리 공식
[관사 a/the] + [형용사] + [명사] => 명사 앞은 형용사 자리 (예: a rapid recovery)
[be / become / remain / feel] + [형용사] => 2형식 동사 뒤 보어는 형용사! (부사 -ly 금지)
[부사 -ly] + [형용사 / 분사(p.p.)] => 형용사·분사를 꾸밀 땐 부사! (예: rapidly absorbed)
[완전한 문장] + [부사 -ly] => 동사(행동 방식)를 꾸밀 땐 부사! (예: reacted seriously)
:::

## 헷갈리기 쉬운 형용사·부사 쌍 비교표

| 기본 단어 | 뜻이 같은 \`-ly\` 부사 | **뜻이 완전히 달라지는 \`-ly\` 부사 (시험 1순위!)** |
|---|---|---|
| **hard** (단단한 / 열심히) | \`hard\` (형용사·부사 모양 같음!) | **\`hardly\`** = 거의 ~않다 (부정어!) |
| **late** (늦은 / 늦게) | \`late\` (모양 같음) | **\`lately\`** = 최근에 (\`recently\`) |
| **near** (가까운 / 가까이) | \`near\` (모양 같음) | **\`nearly\`** = 거의 (\`almost\`) |
| **high** (높은 / 높이) | \`high\` (물리적 높이) | **\`highly\`** = 매우, 대단히 (\`very\`) |

:::train 문장 블록 기차로 수식 화살표 따라가기
The new drug(주어:새 약은) | was rapidly absorbed(부사+수동동사:빠르게 흡수되었다) | into the body(수식어:몸속으로) => 새 약은 몸속으로 빠르게 흡수되었다 (rapidly가 absorbed를 꾸밈!).
The patient(주어:환자는) | felt(감각동사:느꼈다) | dizzy(형용사 보어:어지러운 상태를) | after standing up(수식어:일어선 뒤에) => 환자는 일어선 뒤 어지러움을 느꼈다.
She(주어:그녀는) | could hardly swallow(빈도부사+동사:거의 삼킬 수 없었다) | solid food(목적어:고형 음식을) => 그녀는 고형 음식을 거의 삼킬 수 없었다.
:::

:::transform so + 형용사 vs such + a + 형용사 + 명사
[so + 형용사/부사 + that]: The pain was [so severe] that he cried. || 뒤에 명사가 없이 형용사만 있으면 [so]를 씁니다!
[such + (a/an) + 형용사 + 명사 + that]: It was [such a severe pain] that he cried. || 뒤에 핵심 명사(pain)까지 한 덩어리로 있으면 [such]를 씁니다!
[형용사 + enough to V]: He is [strong enough] to walk. || enough는 형용사·부사 **뒤**에 붙습니다 (enough strong X)!
:::

:::vs 형용사·부사 단골 함정 O / X
The patient looked [healthily] after the surgery. || The patient looked [healthy] after the surgery. || look, feel, remain 뒤는 주어(환자)의 상태를 설명하는 보어 자리이므로 형용사(healthy)가 맞습니다.
The medicine was [quick] absorbed. || The medicine was [quickly] absorbed. || 과거분사(absorbed)를 꾸며 '빠르게 흡수된'을 만들려면 부사(quickly)가 필요합니다.
He worked [hardly] to pass the exam. || He worked [hard] to pass the exam. || '열심히'는 hard이고, hardly는 '거의 ~않다'라는 뜻입니다.
It is [enough warm] to go outside. || It is [warm enough] to go outside. || enough가 형용사(warm)를 꾸밀 때는 항상 형용사 뒤에 옵니다.
:::

:::steps 형용사 vs 부사 빈칸 3초 판별법
1. 수식 대상 화살표 긋기 | 빈칸이 명사를 꾸미는지, 동사·분사·형용사를 꾸미는지 화살표를 긋습니다. | (　　) absorbed → 분사 수식 = 부사!
2. 앞 동사 확인 | 빈칸 앞 동사가 be, become, remain, feel, look, keep(5형식)이면 형용사 보어를 고릅니다. | felt (　　) → 형용사!
3. 모양 함정 확인 | hard/hardly, late/lately, so/such, enough의 위치를 마지막으로 확인합니다. | strong enough (O)
:::`,
  quiz: [
    {
      prompt: "The new drug is (　　) for most adult patients.",
      choices: ["safe", "safely", "safety", "safest"],
      answer: 1,
      explanation: `**해석**

새 약은 대부분의 성인 환자에게 안전하다.

**정답 근거**

빈칸은 be동사 *is* 뒤에서 약의 상태를 설명하는 보어 자리입니다. 따라서 형용사 **safe**가 알맞습니다. *for most adult patients*는 누구에게 안전한지 덧붙입니다.

**오답 분석**

- ② *safely*는 동작의 방법을 설명하는 부사라서 상태 보어 자리에 맞지 않습니다.
- ③ *safety*는 “안전, 안전성”이라는 명사입니다.
- ④ *safest*는 “가장 안전한”이라는 최상급으로, 문맥에 비교 대상이 없습니다.

**핵심 포인트**

be동사 뒤에서 주어의 상태를 말하면 형용사를 고릅니다.`,
    },
    {
      prompt: "The pharmacist checked the patient's name (　　) before giving the medicine.",
      choices: ["careful", "carefully", "carefulness", "more careful"],
      answer: 2,
      explanation: `**해석**

약사는 약을 주기 전에 환자의 이름을 주의 깊게 확인했다.

**정답 근거**

빈칸은 일반동사 *checked*가 어떻게 이루어졌는지 설명합니다. “어떻게 확인했는가?”에 답하는 부사 **carefully**가 정답입니다. *careful*에 *-ly*를 붙여 만든 형태입니다.

**오답 분석**

- ① *careful*은 명사를 꾸미는 형용사이므로 동사 *checked*를 직접 설명할 수 없습니다.
- ③ *carefulness*는 “주의 깊음”이라는 명사입니다.
- ④ *more careful*은 비교급 형용사구라서 동작의 방법을 나타내지 않습니다.

**핵심 포인트**

일반동사의 방법을 설명하는 빈칸에는 부사를 넣습니다.`,
    },
    {
      prompt: "The patient felt (　　) after taking the medicine.",
      choices: ["well", "goodly", "betterly", "nicely"],
      answer: 1,
      explanation: `**해석**

그 환자는 약을 복용한 뒤 상태가 좋아졌다.

**정답 근거**

*felt*는 여기서 “느꼈다”가 아니라 주어의 상태를 나타내는 상태동사입니다. 따라서 뒤에는 형용사가 와야 합니다. **well**은 “건강한, 상태가 좋은”이라는 형용사로도 쓰입니다.

**오답 분석**

- ② *goodly*는 이 뜻의 표준적인 부사가 아니며 형용사 자리에도 맞지 않습니다.
- ③ *betterly*라는 일반적인 단어는 없습니다. *better*를 써야 할 경우에도 비교 대상이나 변화가 필요합니다.
- ④ *nicely*는 동작이 잘 이루어진 방법을 말하는 부사입니다.

**핵심 포인트**

feel, look, seem 뒤에서 주어 상태를 말할 때 형용사를 사용합니다.`,
    },
    {
      prompt: "The tablets dissolved (　　) in warm water.",
      choices: ["quick", "quickly", "quickness", "quicker"],
      answer: 2,
      explanation: `**해석**

그 정제들은 따뜻한 물에 빠르게 녹았다.

**정답 근거**

빈칸은 일반동사 *dissolved*의 속도와 방법을 설명합니다. 그러므로 부사 **quickly**가 필요합니다. *warm water*는 녹은 장소와 조건을 나타냅니다.

**오답 분석**

- ① *quick*은 보통 명사를 꾸미는 형용사입니다. 부사 자리에는 *quickly*가 적절합니다.
- ③ *quickness*는 “빠름”이라는 명사입니다.
- ④ *quicker*는 비교급이므로 무엇보다 빠른지 비교 대상이 있어야 합니다.

**핵심 포인트**

동작의 속도나 방법을 말하는 빈칸은 부사 자리인지 먼저 확인합니다.`,
    },
    {
      prompt: "Choose the incorrect underlined part. The nurse <u>explained clear</u> how to take the antibiotic.",
      choices: ["explained clear", "how to take", "the antibiotic", "No error"],
      answer: 1,
      explanation: `**해석**

간호사는 그 항생제를 어떻게 복용하는지 명확하게 설명했다.

**정답 근거**

*explained*는 일반동사이고 “어떻게 설명했는가?”를 말해야 하므로 부사 **clearly**가 필요합니다. 따라서 밑줄 친 *explained clear*가 오류입니다. 올바른 문장은 *The nurse explained clearly how to take the antibiotic.*입니다.

**오답 분석**

- ② *how to take*는 “복용하는 방법”을 이끄는 올바른 의문사 to부정사 구조입니다.
- ③ *the antibiotic*은 *take*의 목적어로 자연스럽습니다.
- ④ 오류가 없다는 선택지는 *clear*를 그대로 둘 수 없으므로 틀립니다.

**핵심 포인트**

일반동사의 방법은 형용사가 아니라 부사로 설명합니다.`,
    },
    {
      prompt: "The researchers developed an (　　) method for detecting the virus.",
      choices: ["effective", "effectively", "effectiveness", "effect"],
      answer: 1,
      explanation: `**해석**

연구자들은 바이러스를 검출하는 효과적인 방법을 개발했다.

**정답 근거**

빈칸 뒤에 명사 *method*가 바로 옵니다. 명사를 꾸미는 형용사가 필요하므로 **effective**가 정답입니다. *for detecting the virus*는 어떤 방법인지 구체적으로 설명합니다.

**오답 분석**

- ② *effectively*는 동사나 형용사를 꾸미는 부사라서 명사 앞에 바로 올 수 없습니다.
- ③ *effectiveness*는 “효과성”이라는 명사입니다.
- ④ *effect*는 “효과”라는 명사이므로 *an effect method*가 되지 않습니다.

**핵심 포인트**

관사 뒤 빈칸 다음에 명사가 있으면 그 명사를 꾸밀 형용사를 우선 찾습니다.`,
    },
  ],
};

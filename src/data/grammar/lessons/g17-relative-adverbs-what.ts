import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g17-relative-adverbs-what",
  level: 3,
  title: "관계부사, what, 복합관계사",
  summary: "장소, 시간, 이유, 방법을 잇는 관계부사와 선행사 없이 쓰는 what의 구조를 구별한다.",
  body: `:::analogy 빈방이 있으면 관계대명사(which), 방이 꽉 찼으면 관계부사(where/when), 앞 명사까지 삼킨 상자는 what입니다
학생들이 가장 많이 헷갈리는 **\`which\` vs \`where\`**는 앞 단어("병원")만 보면 절대 못 풉니다!
"병원" 뒤 문장에 **명사 빈칸(\`visited [ ]\`)이 비어 있으면 \`which\`**, 빈칸 없이 **완전한 문장(\`works\`)이면 \`where\`**입니다.
그리고 **\`what\`**은 앞 명사까지 자기 배 속에 삼킨 **\`the thing which(~하는 것)\`**입니다!
:::

:::formula which vs where/when & what 1초 구별 공식
[선행사 명사] + [which / who] + [불완전한 문장 (주어나 목적어 빠짐!)]
[선행사 명사] + [where / when / why / how] + [완전한 문장 (빠진 명사 없음!)]
[선행사 없음!] + [what] + [불완전한 문장] => 해석: ~하는 것 (= the thing that)
[the way] vs [how] => 둘 중 하나만 써야 함! (the way how 나란히 쓰기 절대 금지!)
:::

## 관계대명사 vs 관계부사 vs what 한눈에 비교표

| 구분 | **앞에 명사(선행사)** | **뒤 문장 상태** | 대표 단어 |
|---|---|---|---|
| **관계대명사** | **있음** (\`the clinic\`) | **불완전** (주어·목적어 중 하나 비어 있음) | \`who\`, \`which\`, \`that\` |
| **관계부사** | **있음** (\`the clinic\`, \`the day\`) | **완전** (주어·동사·목적어 모두 꽉 참) | \`where\`(= in/at which), \`when\`, \`why\`, \`how\` |
| **관계대명사 \`what\`** | **없음!** (동사·전치사 뒤) | **불완전** (주어·목적어 중 하나 비어 있음) | **\`what\`** (= \`the thing which\`) |
| **접속사 \`that\`** | **없음!** (동사 뒤 명사절) | **완전** (빠진 성분 없음) | **\`that\`** (~라는 것) |

:::train 문장 블록 기차로 which / where / what 비교하기
This is the hospital(주절:이곳이 병원이다) | which she visited(관계대명사절:그녀가 방문했던 [목적어 비어 있음]) => 이곳이 그녀가 방문했던 병원이다.
This is the hospital(주절:이곳이 병원이다) | where she works(관계부사절:그녀가 일하는 [완전한 문장]) => 이곳이 그녀가 일하는 병원이다.
What the patient needs(what 명사절:환자가 필요로 하는 것은) | is(동사:이다) | plenty of rest(보어:충분한 휴식) => 환자가 필요로 하는 것은 충분한 휴식이다.
:::

:::transform 전치사 + which가 합쳐지면 관계부사가 됩니다
장소: the lab [which] he works [in] || the lab [in which] he works = the lab [where] he works || 끝에 있던 전치사 [in]이 which 앞으로 오면 합쳐져서 [where]가 됩니다!
방법: This is [the way] the drug works. || This is [how] the drug works. || [the way]와 [how]는 둘 다 쓰면 틀리고 반드시 둘 중 하나만 씁니다!
:::

:::vs 관계부사·what 단골 함정 O / X
The pharmacy [where] I bought the medicine was closed. (O) vs The pharmacy [where] I visited was closed. (X) ||The pharmacy [which] I visited was closed. || visited는 '~을 방문하다'라는 타동사라 뒤에 목적어가 비어 있습니다. 따라서 where가 아니라 which를 씁니다!
Tell me the thing [what] you saw. || Tell me [what] you saw. / Tell me the thing [that] you saw. || what 안에는 이미 the thing이 들어 있으므로 앞에 명사(선행사)가 있으면 쓸 수 없습니다.
Can you explain [the way how] this vaccine works? || Can you explain [the way] / [how] this vaccine works? || the way와 how는 절대 나란히 함께 쓰지 않습니다.
:::

:::steps which / where / what / that 3초 판별법
1. 빈칸 앞 명사 유무 확인 | 앞에 꾸밈을 받는 명사가 있으면 which/where 후보, 앞에 동사만 있으면 what/that 후보입니다. | 앞에 명사 없음 → what vs that
2. 빈칸 뒤 완전성 검사 | 뒤 문장에 주어나 목적어가 빠져 있으면 불완전(which / what), 다 갖춰져 있으면 완전(where / 접속사 that)입니다. | needs [ ? ] → 목적어 빠짐 = what!
3. the way how 체크 | the way 뒤에 how가 있으면 틀린 문장으로 바로 찾습니다. | the way how (X)
:::`,
  quiz: [
    {
      prompt: "The hospital (　　) my sister works has a new pharmacy.",
      choices: ["what", "where", "why", "when"],
      answer: 2,
      explanation: `**해석**\n\n내 여동생이 일하는 병원에는 새 약국이 있다.\n\n**정답 근거**\n\n선행사 hospital은 장소이고, 뒤의 my sister works는 주어와 동사가 갖춰진 완전한 절이다. 장소를 잇는 관계부사 where가 맞다.\n\n**오답 분석**\n\n• 1번 what은 선행사 없이 “것”을 뜻한다.\n• 3번 why는 reason과 짝을 이룬다.\n• 4번 when은 시간 명사와 쓴다.\n\n**핵심 포인트**\n\n장소 명사 뒤의 완전한 절이면 where를 먼저 검토한다.`
    },
    {
      prompt: "The reason (　　) the patient felt weak was anemia.",
      choices: ["where", "when", "why", "what"],
      answer: 3,
      explanation: `**해석**\n\n환자가 기운이 없었던 이유는 빈혈이었다.\n\n**정답 근거**\n\n선행사 reason은 이유를 나타내므로 관계부사 why와 짝을 이룬다. why 뒤에는 the patient felt weak라는 완전한 절이 있다.\n\n**오답 분석**\n\n• 1번 where는 장소를 나타내므로 reason과 맞지 않는다.\n• 2번 when은 시간을 나타낸다.\n• 4번 what은 선행사를 가질 수 없다.\n\n**핵심 포인트**\n\nreason why를 하나의 짝으로 기억하되, 뒤 절이 완전한지도 확인한다.`
    },
    {
      prompt: "(　　) the scan revealed changed the treatment plan.",
      choices: ["What", "Where", "When", "Why"],
      answer: 1,
      explanation: `**해석**\n\n스캔이 밝혀낸 것이 치료 계획을 바꾸었다.\n\n**정답 근거**\n\n빈칸부터 revealed까지가 문장의 주어여야 한다. What the scan revealed는 “스캔이 밝혀낸 것”이라는 명사절이므로 주어가 될 수 있다.\n\n**오답 분석**\n\n• 2번 Where는 장소를 묻거나 나타내는 말이라 주어 뜻이 되지 않는다.\n• 3번 When은 시간을 나타낸다.\n• 4번 Why는 이유를 나타내며 “이유가 치료를 바꾸었다”가 되어 문맥이 어색하다.\n\n**핵심 포인트**\n\nwhat 뒤에 선행사를 붙이지 않고 what절 전체를 명사처럼 읽는다.`
    },
    {
      prompt: "This is the way how the medicine is prepared.",
      choices: ["This", "the way", "how", "prepared"],
      answer: 3,
      explanation: `**해석**\n\n이것은 약이 조제되는 방법이다.\n\n**정답 근거**\n\nthe way와 how는 모두 “방법”을 나타내므로 함께 쓸 수 없다. 표시된 how를 없애 “This is the way the medicine is prepared.”로 고치거나, the way를 없애 “This is how the medicine is prepared.”로 고친다.\n\n**오답 분석**\n\n• 1번 This는 방법을 가리키는 주어로 가능하다.\n• 2번 the way는 how 없이 가능하다.\n• 4번 prepared는 medicine을 설명하는 수동태의 일부다.\n\n**핵심 포인트**\n\nthe way와 how 중 하나만 선택한다.`
    },
    {
      prompt: "<u>Whenever</u> the fever returns, the patient should call the clinic.",
      choices: ["Whenever", "returns", "should call", "No error"],
      answer: 4,
      explanation: `**해석**\n\n열이 돌아올 때마다 환자는 병원에 전화해야 한다.\n\n**정답 근거**\n\n문장 자체는 문법적으로 맞다. 따라서 오류가 없다는 뜻의 선택지를 골라야 한다. 그런데 제시된 네 부분 중 시험식 오류 찾기에서는 표시된 부분을 고르는 대신, 이 문항은 복합관계부사의 쓰임을 묻는 형태로 해석한다. Whenever는 “할 때마다”라는 시간 부사절을 이끌고 주어 the fever와 동사 returns를 갖는다.\n\n**오답 분석**\n\n• 2번 returns는 fever가 3인칭 단수라 맞다.\n• 3번 should call은 “전화해야 한다”라는 조동사 구조다.\n• 4번 clinic은 call의 목적지로 자연스럽다.\n\n**핵심 포인트**\n\nwhenever는 의문문이 아니라 반복되는 시점을 나타내는 복합관계부사다.`
    },
    {
      prompt: "Choose the best word: The storage room (　　) vaccines are kept must be cold.",
      choices: ["where", "what", "why", "whenever"],
      answer: 1,
      explanation: `**해석**\n\n백신을 보관하는 저장실은 차가워야 한다.\n\n**정답 근거**\n\n선행사 storage room은 장소이고, vaccines are kept는 주어와 동사가 있는 완전한 절이다. 따라서 장소 관계부사 where가 정답이다.\n\n**오답 분석**\n\n• 2번 what은 선행사 없이 “것”을 뜻하므로 storage room 뒤에 올 수 없다.\n• 3번 why는 이유의 선행사 reason과 쓴다.\n• 4번 whenever는 “언제든지”라서 장소 명사와 맞지 않는다.\n\n**핵심 포인트**\n\n장소 선행사와 완전한 절의 조합은 where로 연결한다.`
    }
  ]
};

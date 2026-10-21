import type { Lesson } from "../../types";

export const lesson: Lesson = {
  id: "g18-comparison",
  level: 3,
  title: "비교급·최상급·원급 구문",
  summary: "두 대상의 차이는 비교급, 셋 이상 중 하나는 최상급, 같은 정도는 as 원급 as로 나타낸다.",
  body: `:::analogy 키 재기 막대 그래프입니다: 같으면 원급(as~as), 둘이 겨루면 비교급(-er than), 셋 이상 중 1등은 최상급(the -est)
두 대상을 나란히 세웠을 때 **높이가 같으면 \`as + 원급 + as\`**, **한쪽이 더 높으면 \`비교급 + than\`**, **셋 이상 중에서 제일 높으면 \`the + 최상급\`**을 씁니다.
비교급 앞을 꾸밀 때는 \`very\`를 못 쓰고 **\`much / even / still / far / a lot\`**을 쓴다는 점이 시험 1순위입니다!
:::

:::formula 비교 구문 4대 공식
원급 (A = B): [as + 형용사/부사 원급 + as] => ~만큼 …한 (부정은 not as/so 원급 as)
비교급 (A > B): [비교급 (-er / more ~) + than] => ~보다 더 …한
비교급 강조 ("훨씬 더"): [much / even / still / far / a lot] + [비교급] => **very + 비교급은 절대 불가!**
비례 구문: [The + 비교급 ~, the + 비교급 …] => ~할수록 더 …하다!
:::

## 원급·비교급·최상급 & 핵심 관용표현 표

| 구분 | 형태 공식 | 시험 빈출 응용 표현 | 뜻 |
|---|---|---|---|
| **원급** | \`as + 원급 + as\` | \`as 원급 as possible\` (= \`as ~ as 주어 can\`) | 가능한 한 ~하게 |
| **배수사** | \`배수 + as 원급 as\` | \`twice / three times as large as\` | ~보다 2배 / 3배 더 큰 (**배수사가 맨 앞!**) |
| **비교급** | \`-er / more + than\` | **\`The 비교급 ~, the 비교급 …\`** | ~할수록 더욱 …하다 |
| **라틴계 비교** | \`to\`를 쓰는 비교! | \`prefer A to B\`, \`superior to\`, \`prior to\` | \`than\` 대신 전치사 **\`to\`**를 씀! |
| **최상급** | \`the + -est / most\` | \`one of the + 최상급 + 복수명사\` | 가장 ~한 것들 중 하나 (**끝에 복수명사!**) |

:::train 문장 블록 기차로 비교 구문 읽기
Prevention(주어:예방은) | is much better(비교급 강조:훨씬 더 낫다) | than cure(비교 대상:치료보다) => 예방이 치료보다 훨씬 더 낫다.
The earlier(The+비교급:더 일찍 발견할수록) | we detect the disease(주어+동사:우리가 병을 발견할수록) | the easier(the+비교급:더 쉬워진다) | the treatment becomes(주어+동사:치료가) => 병을 일찍 발견할수록 치료는 더 쉬워진다.
This is one of(주어+동사:이것은 ~중 하나이다) | the most common side effects(최상급+복수명사:가장 흔한 부작용들) => 이것은 가장 흔한 부작용들 중 하나이다.
:::

:::transform 최상급 뜻을 원급·비교급으로 똑같이 표현하기
최상급: Health is [the most important] thing. || 부정어 + 비교급: [Nothing] is [more important than] health. || "그 무엇도 건강보다 더 중요하지 않다" = 건강이 제일 중요하다!
배수 표현: Pill A is [twice as expensive as] Pill B. || 비교급 배수: Pill A is [twice more expensive than] Pill B. || 배수사(twice, three times)는 항상 [as ~ as] 바로 앞에 놓습니다!
:::

:::vs 비교 구문 단골 함정 O / X
The new tablet works [very faster] than the old one. || The new tablet works [much / far / even faster] than the old one. || 비교급(faster)을 강조해 '훨씬'이라고 할 때는 very를 쓸 수 없고 much, even, still, far, a lot을 씁니다.
This is one of the most effective [drug]. || This is one of the most effective [drugs]. || '가장 ~한 것들 중 하나(one of the 최상급)' 뒤에는 반드시 복수명사(drugs)가 와야 합니다!
Many patients prefer tablets [than] liquid medicine. || Many patients prefer tablets [to] liquid medicine. || prefer A to B, superior to, inferior to, prior to는 비교 대상 앞에 than이 아니라 to를 씁니다.
The climate of Tokyo is milder than [Sapporo]. || The climate of Tokyo is milder than [that of Sapporo]. || 비교 대상은 급이 같아야 합니다. 도쿄의 '기후(The climate)'와 비교하므로 삿포로의 기후(that of Sapporo)라고 써야 합니다.
:::

:::steps 비교 문제 3초 풀이법
1. 짝꿍 신호 찾기 | 문장에 as가 있으면 원급, than이 있으면 비교급, the + of/in이 있으면 최상급을 고릅니다. | ~ than → 비교급!
2. 비교급 앞 빈칸 확인 | 비교급 바로 앞 빈칸이면 very를 지우고 much / far / even / still을 고릅니다. | much better (O)
3. one of 뒤 복수 체크 | one of the 최상급 뒤 명사에 -s(복수)가 붙어 있는지 확인합니다. | one of the best ways (O)
:::`,
  quiz: [
    {
      prompt: "The new capsule is (　　) effective than the old one.",
      choices: ["most", "more", "as", "many"],
      answer: 2,
      explanation: String.raw`**해석**

새 캡슐은 기존 캡슐보다 더 효과적이다.

**정답 근거**

than이 두 대상을 비교한다는 신호다. effective는 긴 형용사이므로 비교급은 more effective이다. 따라서 빈칸에는 more가 들어간다.

**오답 분석**

1. most는 셋 이상 중 가장 큰 정도인 최상급에 쓴다.
2. more는 긴 형용사의 비교급을 만드는 정답이다.
3. as는 같은 정도를 나타낼 때 as effective as로 두 번 쓴다.
4. many는 수를 세는 명사를 꾸미며 effective의 비교급이 아니다.

**핵심 포인트**

than이 보이면 비교급을 찾고, 긴 형용사 앞에는 more를 둔다.`
    },
    {
      prompt: "This is the (　　) common symptom among the three groups.",
      choices: ["more", "most", "as", "commoner"],
      answer: 2,
      explanation: String.raw`**해석**

이것은 세 집단에서 가장 흔한 증상이다.

**정답 근거**

the와 among the three groups가 셋 이상 중 하나를 고르는 상황을 만든다. common은 긴 형용사이므로 최상급은 the most common이다. 따라서 most가 정답이다.

**오답 분석**

1. more는 둘을 비교하는 비교급에 쓰며 보통 than이 따른다.
2. most는 the와 결합해 긴 형용사의 최상급을 만든다.
3. as는 as common as 형태의 동등 비교에 필요하다.
4. commoner는 이 문장에서 최상급이 아니며 세 집단 중 가장 흔하다는 뜻을 만들지 못한다.

**핵심 포인트**

셋 이상과 the가 보이면 최상급, 긴 형용사면 the most를 선택한다.`
    },
    {
      prompt: "The cream is (　　) useful as the gel for dry skin.",
      choices: ["more", "most", "as", "than"],
      answer: 3,
      explanation: String.raw`**해석**

그 크림은 건조한 피부에 그 젤만큼 유용하다.

**정답 근거**

문장 뒤에 as가 이미 있으므로 같은 정도를 나타내는 as useful as가 되어야 한다. 빈칸에는 첫 번째 as가 들어간다. 이때 useful은 원급 그대로 유지한다.

**오답 분석**

1. more는 more useful than처럼 정도가 더 큰 비교에 쓴다.
2. most는 셋 이상 중 최고를 고르는 최상급이며 뒤의 as와 맞지 않는다.
3. as가 정답이며 앞뒤 as가 한 쌍을 이룬다.
4. than은 비교급 뒤에 오지만 이 문장은 동등 비교 구조다.

**핵심 포인트**

as가 두 번 보이는 틀에서는 사이에 형용사 원급을 넣는다.`
    },
    {
      prompt: "다음 밑줄 친 부분 중 어법상 틀린 것을 고르시오. The second dose was <u>more lower</u> than the first dose.",
      choices: ["The second dose", "was", "more lower", "than the first dose"],
      answer: 3,
      explanation: String.raw`**해석**

두 번째 용량은 첫 번째 용량보다 더 낮았다.

**정답 근거**

lower 자체가 low의 비교급이다. 따라서 비교급을 만드는 more를 다시 붙일 수 없다. 문장은 The second dose was lower than the first dose가 되어야 한다.

**오답 분석**

1. The second dose는 비교되는 주어로 문법상 문제없다.
2. was는 과거 상태를 나타내는 be동사로 알맞다.
3. more lower는 비교 표시를 겹친 오류다. lower로 고친다.
4. than the first dose는 비교 대상을 소개하므로 필요하다.

**핵심 포인트**

er형 비교급 앞에 more를 겹쳐 쓰지 않는다.`
    },
    {
      prompt: "Of the three treatments, which is the (　　) safe?",
      choices: ["safer", "safest", "more safe", "as safe"],
      answer: 2,
      explanation: String.raw`**해석**

세 치료법 중 어느 것이 가장 안전한가?

**정답 근거**

Of the three treatments가 세 가지 중 하나를 고르는 범위를 보여 준다. safe의 최상급은 safest이고, 앞에 the가 이미 있으므로 the safest가 완성된다.

**오답 분석**

1. safer는 두 대상을 비교하는 비교급이다.
2. safest가 정답이며 세 가지 중 가장 안전하다는 뜻이다.
3. more safe는 비교급으로 쓸 수 있어도 최상급이 아니다.
4. as safe는 뒤에 as가 더 있어야 하는 동등 비교의 앞부분이다.

**핵심 포인트**

of the three는 최상급 신호이며, 짧은 형용사 safe에는 est를 붙인다.`
    },
    {
      prompt: "Arrange the words to complete the sentence. (A) faster (B) than (C) the standard method (D) This method (　　)",
      choices: ["D A B C", "C D A B", "D B A C", "C A D B"],
      answer: 1,
      explanation: String.raw`**해석**

이 방법은 표준 방법보다 더 빠르다는 문장을 만들라는 문제다.

**정답 근거**

주어는 this method, 동사는 is, 비교급은 faster, 비교 대상은 than the standard method가 되어야 한다. 제시된 배열 D A B C, 즉 This method is faster than the standard method가 자연스럽다.

**오답 분석**

1. D A B C가 주어, 동사, 비교급, than 덩어리를 올바르게 만든다.
2. C D로 시작하면 동사 뒤에 주어가 와서 기본 문장 순서가 무너진다.
3. D A로 시작하면 than이 동사보다 먼저 와서 비교 덩어리가 깨진다.
4. C A D B도 주어와 동사의 위치가 뒤바뀌고 than의 대상도 분리된다.

**핵심 포인트**

단어 배열에서는 먼저 주어와 be동사를 세우고, 비교급 than 대상을 한 덩어리로 붙인다.`
    }
  ]
};

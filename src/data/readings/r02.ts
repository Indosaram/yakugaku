import type { ReadingPassage } from "../types";

export const reading: ReadingPassage = {
  id: "r02",
  title: "The Quiet Spread of Drug Resistant Bacteria",
  topic: "항생제 내성 (슈퍼박테리아)",
  text: `Antibiotics have saved millions of lives since doctors began using them widely in the twentieth century. These medicines kill bacteria or stop them from multiplying, allowing the body's immune system to remove the remaining microbes. However, bacteria can change when they reproduce, and some changes make them less sensitive to a drug. This ability, called antibiotic resistance, is now spreading through hospitals, farms, and communities around the world.

The problem is not that one person becomes resistant to an antibiotic; rather, the bacteria living in that person's body become resistant. When a patient takes an antibiotic unnecessarily, sensitive bacteria may die while resistant ones survive and multiply. The surviving bacteria can then pass resistance genes to other bacteria, including different species. (　　) can therefore make future infections harder to treat.

Researchers are testing new medicines, vaccines, and rapid diagnostic tools that can identify an infection before treatment begins. Some hospitals also use antibiotic stewardship programs, which guide doctors to choose the right drug for the right patient and for the shortest effective time. These measures are valuable, but they cannot solve the problem alone. Patients can help by taking antibiotics only when prescribed and by completing the course exactly as directed. Slowing resistance requires cooperation among medical workers, patients, farmers, and drug developers, because bacteria do not respect the boundaries between these groups.`,
  notes: `*microbe*: 微生物 / 미생물
*antibiotic resistance*: 抗菌薬耐性 / 항생제 내성
*resistance gene*: 耐性遺伝子 / 내성 유전자
*antibiotic stewardship*: 抗菌薬適正使用 / 항생제 적정 사용`,
  breakdown: [
    {
      en: "Antibiotics have saved millions of lives since doctors began using them widely in the twentieth century.",
      slash: "Antibiotics(항생제는) / have saved(구해 왔다) / millions of lives(수백만 명의 생명을) / since doctors began using them widely(의사들이 그것들을 널리 사용하기 시작한 이래로) / in the twentieth century(20세기에)",
      ko: "의사들이 20세기에 항생제를 널리 사용하기 시작한 이래 항생제는 수백만 명의 생명을 구해 왔다.",
      grammar: "주어는 Antibiotics이고 동사는 현재완료 have saved입니다. since 뒤에는 doctors가 주어이고 began이 동사인 과거절이 와서, 과거의 시작부터 지금까지 이어진 일을 나타냅니다. using은 begin의 목적어인 동명사로, 항생제를 사용하기 시작했다는 뜻입니다."
    },
    {
      en: "These medicines kill bacteria or stop them from multiplying, allowing the body's immune system to remove the remaining microbes.",
      slash: "These medicines(이 약들은) / kill bacteria(세균을 죽이거나) / or stop them from multiplying(세균이 증식하는 것을 막고) / allowing the body's immune system(몸의 면역 체계가) / to remove the remaining microbes(남은 미생물을 제거하도록 한다)",
      ko: "이 약들은 세균을 죽이거나 세균의 증식을 막아, 몸의 면역 체계가 남은 미생물을 제거하게 한다.",
      grammar: "주어는 These medicines이고 kill과 stop이 or로 연결된 동사입니다. stop A from -ing는 ‘A가 무엇하는 것을 막다’라는 표현이므로 them은 bacteria를 가리킵니다. allowing은 앞의 결과를 덧붙이는 분사구문이고, to remove는 면역 체계가 할 일을 나타내는 to부정사입니다."
    },
    {
      en: "However, bacteria can change when they reproduce, and some changes make them less sensitive to a drug.",
      slash: "However(그러나) / bacteria can change(세균은 변할 수 있고) / when they reproduce(그들이 번식할 때) / and some changes(일부 변화는) / make them less sensitive to a drug(세균을 약에 덜 민감하게 만든다)",
      ko: "그러나 세균은 번식할 때 변할 수 있으며, 일부 변화는 세균이 약에 덜 민감하게 만든다.",
      grammar: "첫 절의 주어는 bacteria, 동사는 can change이고 when they reproduce가 때를 설명하는 부사절입니다. and 뒤에는 some changes가 주어이고 make가 동사입니다. make A 형용사는 ‘A를 형용사한 상태로 만들다’이며, them은 bacteria를 뜻합니다."
    },
    {
      en: "This ability, called antibiotic resistance, is now spreading through hospitals, farms, and communities around the world.",
      slash: "This ability(이 능력은) / called antibiotic resistance(항생제 내성이라고 불리는) / is now spreading(지금 퍼지고 있다) / through hospitals, farms, and communities(병원, 농장, 지역 사회를 통해) / around the world(전 세계에)",
      ko: "항생제 내성이라고 불리는 이 능력은 이제 전 세계의 병원, 농장, 지역 사회를 통해 퍼지고 있다.",
      grammar: "주어는 This ability이고 동사는 현재진행형 is spreading입니다. called antibiotic resistance는 주어를 꾸미는 과거분사구로, ‘항생제 내성이라고 불리는’이라는 뜻입니다. through는 퍼지는 경로를 나타내며, around the world는 범위를 설명합니다."
    },
    {
      en: "The problem is not that one person becomes resistant to an antibiotic; rather, the bacteria living in that person's body become resistant.",
      slash: "The problem(문제는) / is not that one person becomes resistant(한 사람이 내성을 갖게 된다는 것이 아니라) / to an antibiotic(항생제에 대해) / rather(오히려) / the bacteria living in that person's body(그 사람의 몸에 사는 세균이) / become resistant(내성을 갖게 된다는 것이다)",
      ko: "문제는 한 사람이 항생제에 내성을 갖게 되는 것이 아니라, 오히려 그 사람의 몸에 사는 세균이 내성을 갖게 되는 것이다.",
      grammar: "is not 뒤의 that절은 문제의 내용을 설명하는 명사절입니다. 세미콜론 뒤 rather는 앞의 내용을 바로잡으며, 두 번째 절의 주어는 the bacteria입니다. living in that person's body는 bacteria를 꾸미는 현재분사구입니다."
    },
    {
      en: "When a patient takes an antibiotic unnecessarily, sensitive bacteria may die while resistant ones survive and multiply.",
      slash: "When a patient takes an antibiotic unnecessarily(환자가 불필요하게 항생제를 복용할 때) / sensitive bacteria may die(민감한 세균은 죽을 수 있지만) / while resistant ones survive and multiply(내성 세균은 살아남아 증식한다)",
      ko: "환자가 불필요하게 항생제를 복용하면, 민감한 세균은 죽을 수 있는 반면 내성 세균은 살아남아 증식한다.",
      grammar: "When절은 조건과 시간을 함께 나타내며 주어 a patient와 동사 takes를 가집니다. 주절의 may die는 ‘죽을 수도 있다’라는 가능성입니다. while 뒤에서는 resistant ones가 주어이고 survive와 multiply가 나란히 동사로 쓰였습니다."
    },
    {
      en: "The surviving bacteria can then pass resistance genes to other bacteria, including different species.",
      slash: "The surviving bacteria(살아남은 세균은) / can then pass(그때 전달할 수 있다) / resistance genes(내성 유전자를) / to other bacteria(다른 세균에게) / including different species(다른 종을 포함하여)",
      ko: "그러면 살아남은 세균은 다른 종을 포함한 다른 세균에게 내성 유전자를 전달할 수 있다.",
      grammar: "주어는 The surviving bacteria이고 can pass가 조동사를 포함한 동사입니다. surviving은 bacteria를 꾸미는 현재분사로 ‘살아남은’이라는 뜻입니다. pass A to B는 ‘A를 B에게 전달하다’이며, including different species는 전달받는 세균의 범위를 덧붙입니다."
    },
    {
      en: "(　　) can therefore make future infections harder to treat.",
      slash: "(　　)(따라서 이것은) / can make(만들 수 있다) / future infections(앞으로의 감염을) / harder to treat(치료하기 더 어렵게)",
      ko: "따라서 이것은 앞으로의 감염을 치료하기 더 어렵게 만들 수 있다.",
      grammar: "빈칸은 앞 문장의 내성 유전자 전달을 가리키는 This process가 들어갈 자리입니다. can make는 가능성을 나타내고, make A harder to treat는 ‘A를 치료하기 더 어렵게 만들다’라는 구조입니다. to treat는 infections를 치료하는 일을 나타내는 to부정사입니다."
    },
    {
      en: "Researchers are testing new medicines, vaccines, and rapid diagnostic tools that can identify an infection before treatment begins.",
      slash: "Researchers are testing(연구자들은 시험하고 있다) / new medicines, vaccines, and rapid diagnostic tools(새 약, 백신, 신속 진단 도구를) / that can identify an infection(감염을 확인할 수 있는) / before treatment begins(치료가 시작되기 전에)",
      ko: "연구자들은 치료가 시작되기 전에 감염을 확인할 수 있는 새 약, 백신, 신속 진단 도구를 시험하고 있다.",
      grammar: "주어 Researchers와 현재진행형 동사 are testing이 문장의 중심입니다. that can identify an infection은 tools를 꾸미는 관계절이며 that은 도구를 가리킵니다. before treatment begins는 감염을 확인하는 시점을 나타내는 부사절입니다."
    },
    {
      en: "Some hospitals also use antibiotic stewardship programs, which guide doctors to choose the right drug for the right patient and for the shortest effective time.",
      slash: "Some hospitals also use(일부 병원도 사용한다) / antibiotic stewardship programs(항생제 적정 사용 프로그램을) / which guide doctors(그것은 의사들을 이끈다) / to choose the right drug(적절한 약을 선택하도록) / for the right patient(적절한 환자에게) / and for the shortest effective time(가장 짧은 효과적인 기간 동안)",
      ko: "일부 병원은 또한 의사들이 적절한 환자에게 적절한 약을 가장 짧은 효과적인 기간 동안 선택하도록 안내하는 항생제 적정 사용 프로그램을 사용한다.",
      grammar: "주어는 Some hospitals이고 use가 동사입니다. which는 앞의 programs를 받는 계속적 용법의 관계대명사입니다. guide doctors to choose는 ‘의사들이 선택하도록 안내하다’라는 동사 guide와 to부정사 구조입니다."
    },
    {
      en: "These measures are valuable, but they cannot solve the problem alone.",
      slash: "These measures(이 조치들은) / are valuable(가치가 있지만) / but they cannot solve(그것들만으로는 해결할 수 없다) / the problem alone(문제를)",
      ko: "이 조치들은 가치가 있지만, 그것들만으로는 문제를 해결할 수 없다.",
      grammar: "첫 절의 주어 These measures와 be동사 are 뒤에 형용사 valuable이 옵니다. but은 반대되는 두 절을 연결합니다. 두 번째 절의 cannot solve는 해결할 수 없다는 뜻이고 alone은 ‘혼자서, 그것만으로’라는 부사입니다."
    },
    {
      en: "Patients can help by taking antibiotics only when prescribed and by completing the course exactly as directed.",
      slash: "Patients can help(환자들은 도울 수 있다) / by taking antibiotics(항생제를 복용함으로써) / only when prescribed(처방되었을 때만) / and by completing the course(치료 과정을 끝냄으로써) / exactly as directed(지시받은 대로 정확히)",
      ko: "환자들은 처방되었을 때만 항생제를 복용하고 지시받은 대로 치료 과정을 정확히 끝냄으로써 도움을 줄 수 있다.",
      grammar: "주어는 Patients이고 can help가 중심 동사입니다. by 뒤의 taking과 completing은 방법을 나타내는 동명사입니다. when prescribed는 antibiotics가 처방될 때라는 수동 의미를 간단히 줄인 표현이며, as directed도 ‘지시된 대로’라는 수동 표현입니다."
    },
    {
      en: "Slowing resistance requires cooperation among medical workers, patients, farmers, and drug developers, because bacteria do not respect the boundaries between these groups.",
      slash: "Slowing resistance(내성의 확산을 늦추는 것은) / requires cooperation(협력을 필요로 한다) / among medical workers, patients, farmers, and drug developers(의료 종사자, 환자, 농부, 약물 개발자 사이의) / because bacteria do not respect(세균은 존중하지 않기 때문에) / the boundaries between these groups(이 집단들 사이의 경계를)",
      ko: "내성의 확산을 늦추려면 의료 종사자, 환자, 농부, 약물 개발자 사이의 협력이 필요하다. 세균은 이 집단들 사이의 경계를 존중하지 않기 때문이다.",
      grammar: "문장의 주어는 동명사구 Slowing resistance이고 requires가 동사입니다. among은 여러 집단 사이의 관계를 나타내며 cooperation의 대상을 설명합니다. because절은 이유를 나타내고, do not respect가 세균의 행동을 부정합니다."
    }
  ],
  quiz: [
    {
      prompt: "Choose the best word or phrase for (　　).",
      choices: ["This process", "These patients", "That medicine", "Those hospitals"],
      answer: 1,
      explanation: `**해석**

내성 유전자가 다른 세균에게 전달되는 과정은 앞으로의 감염을 치료하기 더 어렵게 만들 수 있다.

**정답 근거**

앞 문장은 "The surviving bacteria can then pass resistance genes to other bacteria"라고 하여 내성 유전자의 전달을 설명한다. 따라서 이를 가리키는 말은 This process이다.

**오답 분석**

- These patients는 환자들이 복수라는 뜻이지만, 앞 문장의 중심 대상이 아니다.
- That medicine은 단수 약을 뜻하며 유전자 전달을 가리킬 수 없다.
- Those hospitals는 병원들을 뜻하고 문맥에 맞지 않는다.

**핵심 포인트**

지시어의 답은 바로 앞 문장에서 가리키는 내용을 찾아 결정한다.`
    },
    {
      prompt: "In the passage, what does antibiotic stewardship mean?",
      choices: ["A program for developing stronger bacteria", "A program for choosing antibiotics carefully", "A rule requiring every patient to take antibiotics", "A method for replacing vaccines with medicines"],
      answer: 2,
      explanation: `**해석**

항생제 적정 사용은 항생제를 신중하게 선택하는 프로그램을 뜻한다.

**정답 근거**

지문은 "which guide doctors to choose the right drug for the right patient and for the shortest effective time"이라고 설명한다. 즉 환자에게 맞는 약을 필요한 짧은 기간에 선택하도록 돕는 프로그램이다.

**오답 분석**

- 강한 세균을 개발하는 프로그램이라는 내용은 없다.
- 모든 환자에게 항생제를 먹게 한다는 것도 지문의 주장과 반대다.
- 백신을 약으로 바꾼다는 설명도 나오지 않는다.

**핵심 포인트**

전문 용어는 바로 뒤의 관계절이 제공하는 구체적 설명으로 뜻을 추론한다.`
    },
    {
      prompt: "Which of the following is true according to the passage?",
      choices: ["Resistant bacteria may survive while sensitive bacteria die.", "Antibiotics always make bacteria multiply faster.", "Only hospitals can spread antibiotic resistance.", "Patients should stop treatment when they feel better."],
      answer: 1,
      explanation: `**해석**

내성 세균은 살아남을 수 있지만 민감한 세균은 죽을 수 있다.

**정답 근거**

지문은 "sensitive bacteria may die while resistant ones survive and multiply"라고 말한다. 이는 항생제 사용 뒤 내성 세균이 살아남고 증식할 수 있음을 뜻한다.

**오답 분석**

- 항생제가 세균의 증식을 항상 빠르게 한다는 내용은 없다.
- 내성은 병원뿐 아니라 농장과 지역 사회에도 퍼진다.
- 환자는 처방받은 과정을 정확히 끝내야 한다.

**핵심 포인트**

사실 확인 문제는 선택지의 주어와 범위가 지문의 내용과 같은지 확인한다.`
    },
    {
      prompt: "Which of the following is NOT true according to the passage?",
      choices: ["Researchers are testing rapid diagnostic tools.", "Resistance genes can move between different species of bacteria.", "New medicines alone have already solved the problem.", "Patients should use antibiotics only when prescribed."],
      answer: 3,
      explanation: `**해석**

연구자들은 새 도구를 시험하고 있으며 환자는 처방된 경우에만 항생제를 사용해야 한다. 그러나 새 약만으로 문제가 이미 해결되었다는 것은 사실이 아니다.

**정답 근거**

지문은 "These measures are valuable, but they cannot solve the problem alone"이라고 분명히 말한다. 따라서 새 약을 포함한 조치만으로 문제가 해결되었다는 선택지가 사실이 아니다.

**오답 분석**

- 연구자들이 신속 진단 도구를 시험한다는 내용이 있다.
- 내성 유전자는 다른 종의 세균에도 전달될 수 있다.
- 환자는 처방되었을 때만 항생제를 복용해야 한다.

**핵심 포인트**

NOT 문제에서는 먼저 지문과 일치하는 세 선택지를 지운 뒤 반대되는 문장을 고른다.`
    },
    {
      prompt: "What is the main idea of the passage?",
      choices: ["Antibiotic resistance needs cooperation and careful antibiotic use.", "Hospitals should stop using all antibiotics immediately.", "Vaccines are more dangerous than antibiotics.", "Farmers are the only cause of resistant bacteria."],
      answer: 1,
      explanation: `**해석**

항생제 내성을 늦추려면 항생제를 신중하게 사용하고 여러 집단이 협력해야 한다.

**정답 근거**

지문은 내성의 발생과 확산을 설명한 뒤, "Slowing resistance requires cooperation among medical workers, patients, farmers, and drug developers"라고 결론을 내린다. 또한 환자에게 처방된 경우에만 복용하고 과정을 끝내라고 한다.

**오답 분석**

- 병원에서 모든 항생제 사용을 즉시 중단하라는 주장은 없다.
- 백신이 항생제보다 위험하다는 비교도 없다.
- 농부만이 원인이라고 하지 않고 여러 장소와 집단을 언급한다.

**핵심 포인트**

주제 문제는 도입부의 문제 제기와 결론의 해결 방향을 함께 묶어 판단한다.`
    }
  ]
};

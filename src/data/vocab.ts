import type { VocabItem } from "./types";
import extraExamples from "./vocab-examples.json";

const extra: Record<string, string[]> = extraExamples;

type Row = [string, string, string, string];
type Example = [string, string];

const examples: Record<string, Example> = {
  achieve: ["The clinic achieved a lower infection rate after revising its hygiene rules.", "그 병원은 위생 규정을 고친 뒤 감염률을 낮추는 성과를 냈다."],
  inquire: ["The pharmacist inquired about the patient's allergies before filling the prescription.", "약사는 처방전을 조제하기 전에 환자의 알레르기를 물었다."],
  resolve: ["The committee resolved the dispute after both researchers compared their evidence.", "두 연구자가 증거를 대조한 뒤 위원회는 분쟁을 해결했다."],
  reluctant: ["The reluctant volunteer eventually agreed to join the demanding clinical study.", "내키지 않던 자원자는 결국 힘든 임상 연구에 참여하기로 했다."],
  obligation: ["Doctors have an ethical obligation to explain uncertain risks honestly.", "의사는 불확실한 위험을 정직하게 설명할 윤리적 의무가 있다."],
  crucial: ["Accurate timing is crucial when emergency staff administer the first dose.", "응급 요원이 첫 복용량을 투여할 때 정확한 시간 조절이 결정적으로 중요하다."],
  potential: ["The new compound has potential as a safer treatment for chronic pain.", "그 신물질은 만성 통증의 더 안전한 치료제가 될 가능성이 있다."],
  "in favor of": ["Several physicians spoke in favor of expanding the vaccination program.", "몇몇 의사는 예방 접종 프로그램 확대에 찬성하는 발언을 했다."],
  "let alone": ["The exhausted patient could barely sit up, let alone walk across the ward.", "지친 환자는 병동을 걸어 다니기는커녕 겨우 몸을 일으킬 수 있었다."],
  "in time for": ["The ambulance arrived in time for the surgeon to begin treatment.", "구급차는 외과 의사가 치료를 시작할 시간에 맞춰 도착했다."],
  "on end": ["The researcher watched the cells on end while the incubator remained stable.", "연구자는 배양기가 안정된 동안 계속 세포를 관찰했다."],
  "more often than not": ["More often than not, mild symptoms disappear without additional medication.", "가벼운 증상은 대체로 추가 약물 없이 사라진다."],
  "get on one's nerves": ["The monitor's constant alarm began to get on the exhausted nurse's nerves.", "모니터의 계속되는 경보음이 지친 간호사의 신경을 거슬리기 시작했다."],
  "see eye to eye": ["The two specialists rarely see eye to eye about screening guidelines.", "두 전문가는 검진 지침에 관해 좀처럼 의견이 일치하지 않는다."],
  "at the cost of": ["The drug reduced fever at the cost of causing severe drowsiness.", "그 약은 심한 졸림을 유발하는 대가로 열을 낮췄다."],
  "turn in": ["Please turn in the completed consent form before your appointment tomorrow.", "내일 진료 전에 작성한 동의서를 제출해 주세요."],
  dose: ["The label warns patients not to exceed the recommended dose.", "라벨에는 환자에게 권장 복용량을 넘기지 말라고 경고되어 있다."],
  "side effect": ["Nausea is a common side effect of this otherwise effective medicine.", "메스꺼움은 이 효과적인 약에서 흔히 나타나는 부작용이다."],
  symptom: ["A persistent cough can be an early symptom of respiratory infection.", "지속되는 기침은 호흡기 감염의 초기 증상일 수 있다."],
  chronic: ["The program teaches people with chronic asthma how to recognize triggers.", "그 프로그램은 만성 천식 환자에게 유발 요인을 알아보는 법을 가르친다."],
  immune: ["Regular sleep supports the immune system during the winter months.", "규칙적인 수면은 겨울철에 면역 체계를 돕는다."],
  antibody: ["The blood test detected an antibody produced after vaccination.", "혈액 검사에서 예방 접종 후 생성된 항체가 검출되었다."],
  "clinical trial": ["Participants received detailed information before entering the clinical trial.", "참가자들은 임상시험에 들어가기 전에 자세한 정보를 받았다."],
  prescription: ["The pharmacist checked the prescription for a dangerous drug interaction.", "약사는 처방전에 위험한 약물 상호 작용이 있는지 확인했다."],
};

const frames = [
  (w: string) => `The laboratory team recorded how ${w} affected the sample during testing.`,
  (w: string) => `A careful nurse explained why ${w} mattered before the procedure began.`,
  (w: string) => `The report uses ${w} to describe a change observed in older patients.`,
  (w: string) => `Students discussed whether ${w} would alter the outcome of the experiment.`,
  (w: string) => `The hospital adopted a policy that addressed ${w} after several complaints.`,
  (w: string) => `Researchers compared two groups to measure the effect of ${w}.`,
  (w: string) => `The lecturer connected ${w} with a practical problem in public health.`,
  (w: string) => `A detailed chart shows how ${w} varies between the two treatments.`,
  (w: string) => `The patient asked whether ${w} could explain the unusual test result.`,
  (w: string) => `The review points to ${w} as one reason the campaign succeeded.`,
];

const make = (tag: string, rows: Row[], offset = 0): VocabItem[] => rows.map(([word, pos, ko, ja], i) => {
  const known = examples[word] ?? (extra[word] as Example | undefined);
  const example = known?.[0] ?? frames[(i + offset) % frames.length](word);
  const exampleKo = known?.[1] ?? (pos === "동사"
    ? `그 사례는 ${ko}라는 행동이 결과에 어떤 영향을 주는지 보여 준다.`
    : `그 사례는 ${ko}이(가) 결과에 어떤 영향을 주는지 보여 준다.`);
  return { word, pos, ko, ja, example, exampleKo, tag };
});

const paperWords = new Set([
  "inquire", "in favor of", "let alone", "in time for", "on end", "more often than not",
  "get on one's nerves", "see eye to eye", "at the cost of", "turn in", "reluctant", "obligation",
  "crucial", "potential", "resolve", "demonstrate", "exert", "preliminary", "concerning", "account",
  "maintain", "won", "relative", "unlock", "transfer", "eligible", "goal", "collaborate", "individual",
  "reduced", "environment", "aware of", "symptom", "chronic", "immune", "antibody", "clinical trial",
  "prescription", "preventive", "measure", "gene", "mutation"
]);

const tagged = (base: string, rows: Row[], offset = 0): VocabItem[] => make(base, rows, offset).map((item) => ({
  ...item,
  tag: paperWords.has(item.word) ? "기출" : base,
}));

const verbs: Row[] = [
  ["achieve","동사","달성하다","達成する"],["adapt","동사","적응하다, 조정하다","適応する"],["analyze","동사","분석하다","分析する"],["apply","동사","적용하다, 신청하다","適用する"],["assume","동사","추정하다","仮定する"],["avoid","동사","피하다","避ける"],["confirm","동사","확인하다","確認する"],["consider","동사","고려하다","考慮する"],["contain","동사","포함하다","含む"],["contribute","동사","기여하다","貢献する"],["convert","동사","전환하다","変換する"],["create","동사","창조하다","作り出す"],["decline","동사","감소하다, 거절하다","減少する"],["define","동사","정의하다","定義する"],["demonstrate","동사","입증하다","実証する"],["detect","동사","발견하다","検出する"],["determine","동사","결정하다","決定する"],["develop","동사","개발하다","開発する"],["differ","동사","다르다","異なる"],["eliminate","동사","제거하다","除去する"],["emerge","동사","나타나다","現れる"],["enable","동사","가능하게 하다","可能にする"],["encounter","동사","마주치다","遭遇する"],["estimate","동사","추정하다","見積もる"],["evaluate","동사","평가하다","評価する"],["examine","동사","조사하다","調べる"],["expand","동사","확장하다","拡大する"],["expose","동사","노출시키다","さらす"],["generate","동사","생성하다","生み出す"],["identify","동사","식별하다","特定する"],["illustrate","동사","설명하다, 예시하다","説明する"],["imply","동사","암시하다","暗示する"],["improve","동사","개선하다","改善する"],["indicate","동사","나타내다","示す"],["infer","동사","추론하다","推測する"],["inhibit","동사","억제하다","抑制する"],["involve","동사","관련시키다","関与させる"],["maintain","동사","유지하다","維持する"],["measure","동사","측정하다","測定する"],["obtain","동사","얻다","得る"],["occur","동사","발생하다","起こる"],["participate","동사","참여하다","参加する"],["perceive","동사","인식하다","認識する"],["prevent","동사","예방하다, 막다","防ぐ"],["propose","동사","제안하다","提案する"],["react","동사","반응하다","反応する"],["reduce","동사","줄이다","減らす"],["regulate","동사","조절하다, 규제하다","調節する"],["rely","동사","의존하다","頼る"],["require","동사","요구하다","必要とする"],["respond","동사","응답하다","応答する"],["reveal","동사","드러내다","明らかにする"],["select","동사","선택하다","選ぶ"],["signify","동사","의미하다","意味する"],["stimulate","동사","자극하다","刺激する"],["suppress","동사","억누르다","抑える"],["transfer","동사","옮기다","移す"],["vary","동사","달라지다","異なる"],["verify","동사","검증하다","検証する"],["withstand","동사","견디다","耐える"],["yield","동사","산출하다","生み出す"]
];
const nouns: Row[] = [
  ["access","명사","접근, 이용","接近, 利用"],["approach","명사","접근법","方法"],["benefit","명사","이익, 혜택","利益"],["capacity","명사","능력, 용량","能力, 容量"],["challenge","명사","도전, 난제","課題"],["cause","명사","원인","原因"],["consequence","명사","결과","結果"],["constant","명사","상수, 불변의 것","定数"],["context","명사","맥락","文脈"],["criterion","명사","기준","基準"],["data","명사","자료","データ"],["debate","명사","논쟁","議論"],["device","명사","장치","装置"],["disorder","명사","장애, 질환","障害"],["effect","명사","효과, 영향","効果"],["evidence","명사","증거","証拠"],["factor","명사","요인","要因"],["feature","명사","특징","特徴"],["function","명사","기능","機能"],["impact","명사","영향","影響"],["issue","명사","문제","問題"],["method","명사","방법","方法"],["notion","명사","개념","概念"],["outcome","명사","결과","結果"],["pattern","명사","양상, 패턴","パターン"],["period","명사","기간","期間"],["principle","명사","원리","原理"],["process","명사","과정","過程"],["proportion","명사","비율","割合"],["purpose","명사","목적","目的"],["range","명사","범위","範囲"],["resource","명사","자원","資源"],["response","명사","반응, 응답","反応"],["role","명사","역할","役割"],["sample","명사","표본","標本"],["source","명사","원천, 출처","源, 出典"],["structure","명사","구조","構造"],["substance","명사","물질","物質"],["survey","명사","조사","調査"],["theory","명사","이론","理論"],["trend","명사","경향","傾向"],["variable","명사","변수","変数"],["accurate","형용사","정확한","正確な"],["adequate","형용사","충분한","十分な"],["apparent","형용사","명백한","明らかな"],["complex","형용사","복잡한","複雑な"],["crucial","형용사","결정적인","重要な"],["efficient","형용사","효율적인","効率的な"],["essential","형용사","필수적인","不可欠な"],["flexible","형용사","유연한","柔軟な"],["fundamental","형용사","기본적인","基本的な"],["internal","형용사","내부의","内部の"],["minor","형용사","사소한","小さな"],["obvious","형용사","명백한","明白な"],["potential","형용사","잠재적인","潜在的な"],["precise","형용사","정밀한","正確な"],["relevant","형용사","관련된","関連する"],["significant","형용사","중요한, 상당한","重要な"],["sufficient","형용사","충분한","十分な"],["unique","형용사","독특한","独特な"],["valid","형용사","타당한","妥当な"]
];
const idioms: Row[] = [
  ["turn in","숙어","제출하다, 잠자리에 들다","提出する, 寝る"],["turn out","숙어","~로 판명되다","判明する"],["turn down","숙어","거절하다, 낮추다","断る, 下げる"],["turn into","숙어","~로 변하다","変わる"],["carry out","숙어","실행하다","実行する"],["put off","숙어","미루다","延期する"],["put on","숙어","입다, 켜다","着る, つける"],["put up with","숙어","참다","我慢する"],["give up","숙어","포기하다","諦める"],["give rise to","숙어","~을 일으키다","引き起こす"],["take part in","숙어","참여하다","参加する"],["take into account","숙어","고려하다","考慮する"],["take place","숙어","일어나다","起こる"],["take over","숙어","인계받다","引き継ぐ"],["make up for","숙어","보상하다","埋め合わせる"],["make sense","숙어","말이 되다","意味をなす"],["come across","숙어","우연히 발견하다","偶然出会う"],["come up with","숙어","생각해 내다","思いつく"],["deal with","숙어","다루다","扱う"],["depend on","숙어","~에 의존하다","依存する"],["consist of","숙어","~로 구성되다","から成る"],["result in","숙어","결과적으로 ~이 되다","結果として~になる"],["result from","숙어","~에서 비롯되다","~に由来する"],["account for","숙어","설명하다, 차지하다","説明する, 占める"],["be likely to","숙어","~할 것 같다","~しそうだ"],["be subject to","숙어","~을 받기 쉽다","さらされる"],["be based on","숙어","~에 근거하다","基づく"],["be concerned with","숙어","~와 관련 있다","関係する"],["be associated with","숙어","~와 연관되다","関連する"],["in addition to","숙어","~에 더하여","に加えて"],["in contrast to","숙어","~와 대조적으로","と対照的に"],["in terms of","숙어","~의 관점에서","の観点で"],["as a result","숙어","그 결과","その結果"],["as well as","숙어","~뿐만 아니라","だけでなく"],["rather than","숙어","~라기보다","よりもむしろ"],["more often than not","숙어","대개","たいてい"],["see eye to eye","숙어","의견이 일치하다","意見が一致する"],["on end","숙어","계속해서","連続して"],["at first","숙어","처음에는","最初は"],["at least","숙어","적어도","少なくとも"],["by means of","숙어","~에 의해","によって"],["for the sake of","숙어","~을 위해","のために"],["in spite of","숙어","~에도 불구하고","にもかかわらず"],["on behalf of","숙어","~을 대신하여","を代表して"],["with regard to","숙어","~에 관하여","に関して"],["according to","숙어","~에 따르면","によれば"],["all at once","숙어","갑자기, 한꺼번에","突然, 一度に"],["by accident","숙어","우연히","偶然に"],["for instance","숙어","예를 들어","例えば"],["in general","숙어","일반적으로","一般に"],["once in a while","숙어","가끔","時々"],["so far","숙어","지금까지","今まで"],["up to date","숙어","최신의","最新の"],["in advance","숙어","미리","前もって"],["keep in mind","숙어","명심하다","覚えておく"],["make sure","숙어","확실히 하다","確かめる"],["pay attention to","숙어","주의를 기울이다","注意を払う"],["point out","숙어","지적하다","指摘する"],["break down","숙어","분해되다, 고장 나다","分解する, 故障する"],["break out","숙어","발생하다","発生する"],["bring about","숙어","초래하다","もたらす"],["call for","숙어","요구하다","要求する"],["cut down on","숙어","줄이다","減らす"],["find out","숙어","알아내다","見つけ出す"],["look into","숙어","조사하다","調べる"],["look forward to","숙어","기대하다","楽しみにする"],["rule out","숙어","배제하다","除外する"],["set up","숙어","설립하다, 설정하다","設立する"],["stand for","숙어","의미하다","意味する"],["work out","숙어","해결하다, 운동하다","解決する, 運動する"],["write down","숙어","적어 두다","書き留める"]
];
const pharma: Row[] = [
  ["dose","명사","복용량","投与量"],["side effect","명사","부작용","副作用"],["symptom","명사","증상","症状"],["immune","형용사","면역의","免疫の"],["chronic","형용사","만성의","慢性の"],["acute","형용사","급성의","急性の"],["antibiotic","명사","항생제","抗生物質"],["antibody","명사","항체","抗体"],["antigen","명사","항원","抗原"],["bacteria","명사","세균","細菌"],["virus","명사","바이러스","ウイルス"],["vaccine","명사","백신","ワクチン"],["cell","명사","세포","細胞"],["tissue","명사","조직","組織"],["organ","명사","장기","器官"],["gene","명사","유전자","遺伝子"],["protein","명사","단백질","タンパク質"],["enzyme","명사","효소","酵素"],["molecule","명사","분자","分子"],["compound","명사","화합물","化合物"],["receptor","명사","수용체","受容体"],["hormone","명사","호르몬","ホルモン"],["metabolism","명사","신진대사","代謝"],["inflammation","명사","염증","炎症"],["infection","명사","감염","感染"],["disease","명사","질병","病気"],["diagnosis","명사","진단","診断"],["therapy","명사","치료법","治療法"],["treatment","명사","치료","治療"],["clinical trial","명사","임상시험","臨床試験"],["placebo","명사","위약","プラセボ"],["patient","명사","환자","患者"],["physician","명사","의사","医師"],["pharmacist","명사","약사","薬剤師"],["prescription","명사","처방전","処方箋"],["diagnose","동사","진단하다","診断する"],["administer","동사","투여하다","投与する"],["prescribe","동사","처방하다","処方する"],["metabolize","동사","대사하다","代謝する"],["absorb","동사","흡수하다","吸収する"],["excrete","동사","배설하다","排泄する"],["activate","동사","활성화하다","活性化する"],["mutate","동사","돌연변이하다","変異する"],["resistant","형용사","내성이 있는","耐性のある"],["toxic","형용사","독성의","毒性の"],["viral","형용사","바이러스성의","ウイルス性の"],["hereditary","형용사","유전성의","遺伝性の"],["incurable","형용사","치유할 수 없는","不治の"],["malignant","형용사","악성의","悪性の"],["benign","형용사","양성의","良性の"],["surgical","형용사","수술의","外科の"],["therapeutic","형용사","치료의","治療の"],["preventive","형용사","예방의","予防の"],["nutrient","명사","영양소","栄養素"],["fiber","명사","식이섬유","食物繊維"],["calorie","명사","칼로리","カロリー"],["obesity","명사","비만","肥満"],["allergy","명사","알레르기","アレルギー"],["bloodstream","명사","혈류","血流"]
];

const examTerms: Row[] = [
  ["inquire","동사","문의하다","問い合わせる"],["in favor of","전치사구","~에 찬성하여","に賛成して"],["let alone","숙어","~은커녕","はおろか"],["in time for","전치사구","~에 맞춰","に間に合って"],["get on one's nerves","숙어","신경을 거슬리게 하다","神経にさわる"],["at the cost of","전치사구","~을 대가로","を犠牲にして"],["reluctant","형용사","꺼리는","気が進まない"],["obligation","명사","의무","義務"],["exert","동사","발휘하다","発揮する"],["preliminary","형용사","예비의","予備の"],["concerning","전치사구","~에 관하여","について"],["eligible","형용사","자격이 있는","資格のある"],["collaborate","동사","협력하다","協力する"],["individual","명사","개인","個人"],["environment","명사","환경","環境"],["aware of","형용사","~을 알고 있는","を知っている"],["mutation","명사","돌연변이","突然変異"],["specimen","명사","검체","標本"],["saliva","명사","침","唾液"],["urine","명사","소변","尿"],["consent","명사","동의","同意"],["genetic counseling","명사","유전 상담","遺伝カウンセリング"],["nausea","명사","메스꺼움","吐き気"],["vomiting","명사","구토","嘔吐"],["drowsiness","명사","졸림","眠気"],["electrolyte","명사","전해질","電解質"],["sodium","명사","나트륨","ナトリウム"],["tendon","명사","힘줄","腱"],["blurred vision","명사","흐릿한 시야","かすみ目"],["sensitivity","명사","민감성","感受性"],["cortisol","명사","코르티솔","コルチゾール"],["adrenaline","명사","아드레날린","アドレナリン"]
];

export const vocab: VocabItem[] = [
  ...tagged("필수동사", verbs, 0),
  ...tagged("필수명사·형용사", nouns, 2),
  ...tagged("숙어", idioms, 4),
  ...tagged("의약·과학", pharma, 6),
  ...tagged("기출", examTerms, 8),
];

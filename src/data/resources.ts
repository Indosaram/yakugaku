// 자료 모음 페이지 데이터. 모든 링크는 2026-10-18 기준 확인.
export interface Resource { name: string; url: string; desc: string; tags: string[] }
export interface ResourceGroup { title: string; intro: string; items: Resource[] }

export const resourceGroups: ResourceGroup[] = [
  {
    title: "기출문제 (원본)",
    intro: "가장 중요한 자료입니다. 대학 공식 사이트는 최근 3개년만 무료 공개하므로, 더 오래된 연도는 아래 서비스나 赤本을 이용하세요.",
    items: [
      { name: "星薬科大学 入学試験過去問題 (공식)", url: "https://www.hoshi.ac.jp/admission/nyushi/exam/", desc: "2024~2026년도 학교추천·B방식·S방식 문제 PDF. 정답은 미공개. 이 사이트의 기출 3개년은 여기서 가져왔습니다.", tags: ["무료", "공식"] },
      { name: "2026年度 B方式 英語 PDF", url: "https://www.hoshi.ac.jp/admission/wp-content/uploads/sites/7/2026/04/B_eigo_2026.pdf", desc: "13쪽, 대문 I~IX", tags: ["무료", "공식"] },
      { name: "2025年度 B方式 英語 PDF", url: "https://www.hoshi.ac.jp/admission/wp-content/uploads/sites/7/2025/04/2025_B_eigo.pdf", desc: "14쪽, 대문 I~IX", tags: ["무료", "공식"] },
      { name: "2024年度 B方式 英語 PDF", url: "https://www.hoshi.ac.jp/admission/wp-content/uploads/sites/7/2024/03/ippannB_eigo.pdf", desc: "11쪽, 대문 I~IX", tags: ["무료", "공식"] },
      { name: "東進 大学入試問題過去問データベース", url: "https://www.toshin.com/daigaku/hoshi-yakka/kakomon", desc: "회원가입(무료) 후 최대 수십 년치 문제·해답 열람 가능. 오래된 연도 연습에 유용.", tags: ["무료가입"] },
      { name: "スタディサプリ進路 過去問", url: "https://shingakunet.com/gakko/SC000334/kakomon/", desc: "B방식 영어 등 최근 연도 문제 열람.", tags: ["무료"] },
      { name: "大学受験パスナビ(旺文社) 過去問", url: "https://passnavi.obunsha.co.jp/univ/3060/kakomon/", desc: "해답·해설 포함 과거문 (무료 회원).", tags: ["무료가입", "해설"] },
      { name: "教学社 赤本 『星薬科大学』", url: "https://akahon.net/", desc: "서점·아마존에서 구입. 여러 해 분량의 문제 + 정답 + 해설. 독학 시 1권 있으면 든든합니다.", tags: ["유료", "해설"] },
    ],
  },
  {
    title: "입시 정보 · 출제 경향 분석",
    intro: "이 사이트의 시험 분석 페이지는 아래 자료를 참고했습니다.",
    items: [
      { name: "星薬科大学 入学試験概要 (공식)", url: "https://www.hoshi.ac.jp/admission/nyushi/", desc: "일정·과목·배점·출원 방법. 반드시 최신 학생모집요항(募集要項)으로 확인.", tags: ["공식"] },
      { name: "星薬科大学 学生募集要項 (공식)", url: "https://www.hoshi.ac.jp/admission/nyushi/boshu/", desc: "출원 자격, 시험일, 장학금 등 공식 요강 PDF.", tags: ["공식"] },
      { name: "ロジティー: 星薬科大学 英語 過去問分析", url: "https://logicalteacher.com/post-3744/3744/", desc: "대문 9~10개 구성, 대문별 경향, 65% 전후 합격 등.", tags: ["분석"] },
      { name: "じゅけラボ: 星薬科大学 科目別対策", url: "https://jyuke-labo.com/daigakujyukentaisaku/hoshiyakkadaigaku/kamokubetsu/", desc: "영어 70분·100점·마크시트, 출제 범위와 유형별 공부법.", tags: ["분석"] },
      { name: "星薬科大学 最近3ヵ年の入試結果 (공식)", url: "https://www.hoshi.ac.jp/admission/nyushi/3yearly/", desc: "방식·학과별 지원자·합격자·경쟁률. B방식 薬学科는 약 3~3.5배.", tags: ["공식"] },
      { name: "PharmAssist: 星薬科大学 徹底解説", url: "https://pharmassist-edu.com/post/mitehosii/hosiyakkakaisetsu26/", desc: "편차치·배율·합격최저점·학비·국시 합격률 정리.", tags: ["분석"] },
      { name: "PharmAssist: 薬学部英語 参考書おすすめ", url: "https://pharmassist-edu.com/post/taisakuhou/eng-sankosyo-26/", desc: "薬学部 영어 참고서 7권과 편차치별 공부 루트.", tags: ["교재"] },
      { name: "Topedu: 星薬科大学対策コース", url: "https://www.topedu.jp/high-school_list/hoshi/", desc: "합격자 득점 경향(영어 6할 이상 안정 확보 등).", tags: ["분석"] },
      { name: "PLAN B: 星薬科大学 入試傾向と対策", url: "https://tsurumi-planb.com/?p=4127", desc: "배점·합격최저점·편차치 정리.", tags: ["분석"] },
      { name: "パスナビ: 入試科目・配点", url: "https://passnavi.obunsha.co.jp/univ/3060/subject/", desc: "방식별 과목·배점, 합격최저점·배율.", tags: ["분석"] },
      { name: "ベネッセ マナビジョン: 一般選抜", url: "https://manabi.benesse.ne.jp/daigaku/school/3312/nyushi/hoshiki/ippan/", desc: "모집인원·과목·일정 요약.", tags: ["분석"] },
      { name: "原田英語: 今日の大学入試英語問題 (星薬 2024 수록)", url: "https://www.haradaeigo.com/todays-exam18/", desc: "星薬 기출 문법·숙어 문제의 해설 예시.", tags: ["해설"] },
    ],
  },
  {
    title: "왕기초 문법 (무료 온라인)",
    intro: "이 사이트의 문법 코스와 함께 보면 좋은 무료 자료입니다. 한국어 설명 위주.",
    items: [
      { name: "EBSi (한국교육방송 고교 강의)", url: "https://www.ebsi.co.kr/", desc: "고교 영문법 기초 무료 강의 다수. '기초 영문법' 검색.", tags: ["무료", "한국어", "동영상"] },
      { name: "EBS English", url: "https://www.ebse.co.kr/", desc: "왕초보·기초 문법 강좌.", tags: ["무료", "한국어"] },
      { name: "Cambridge Dictionary – Grammar", url: "https://dictionary.cambridge.org/grammar/british-grammar/", desc: "영어로 된 문법 레퍼런스(중급 이상). 예문이 정확합니다.", tags: ["무료", "영어"] },
      { name: "British Council LearnEnglish – Grammar", url: "https://learnenglish.britishcouncil.org/grammar", desc: "레벨별 문법 설명 + 연습문제.", tags: ["무료", "영어"] },
      { name: "とある男が授業をしてみた (YouTube)", url: "https://www.youtube.com/@toaruotokogajyugyouwoshitemita", desc: "일본 중·고 영문법 무료 강의 동영상. 일본어 지시문에 익숙해지는 데도 도움.", tags: ["무료", "일본어", "동영상"] },
    ],
  },
  {
    title: "어휘 · 사전",
    intro: "星薬 영어의 어휘는 '표준 수준 + 숙어'가 중심입니다. 의약 전문 용어는 시험지에 주석이 달립니다.",
    items: [
      { name: "네이버 영어사전", url: "https://en.dict.naver.com/", desc: "한국어 뜻 + 발음 + 예문. 숙어 검색도 강력.", tags: ["무료", "한국어"] },
      { name: "weblio 英和辞典", url: "https://ejje.weblio.jp/", desc: "일본어 뜻 확인용 (시험 지시문·주석이 일본어).", tags: ["무료", "일본어"] },
      { name: "Cambridge Dictionary", url: "https://dictionary.cambridge.org/", desc: "영영 정의 + 예문.", tags: ["무료", "영어"] },
      { name: "システム英単語 (駿台文庫)", url: "https://www.sundaibunko.jp/", desc: "일본 수험생 표준 단어장. 薬学部 대비로 많이 쓰임.", tags: ["유료", "일본어"] },
      { name: "英単語ターゲット1900 (旺文社)", url: "https://www.obunsha.co.jp/", desc: "일본 수험생 표준 단어장.", tags: ["유료", "일본어"] },
      { name: "Anki (플래시카드 앱)", url: "https://apps.ankiweb.net/", desc: "틀린 단어를 반복 학습. 이 사이트 어휘 페이지와 병행.", tags: ["무료"] },
    ],
  },
  {
    title: "의약 · 과학 영어 읽기 연습",
    intro: "星薬 장문은 의학·약학·생명과학 뉴스 기사와 비슷한 글이 많습니다. 쉬운 것부터 매일 1편.",
    items: [
      { name: "VOA Learning English – Health & Lifestyle", url: "https://learningenglish.voanews.com/z/955", desc: "쉬운 영어로 쓴 건강·의학 뉴스. 음성·스크립트 제공. 입문 최적.", tags: ["무료", "쉬움"] },
      { name: "ScienceDaily – Pharmacology", url: "https://www.sciencedaily.com/news/health_medicine/pharmacology/", desc: "신약·약리 연구 뉴스. 星薬 장문 주제와 가장 가깝습니다.", tags: ["무료", "실전"] },
      { name: "ScienceDaily – Health & Medicine", url: "https://www.sciencedaily.com/news/health_medicine/", desc: "실제 시험 지문과 가장 비슷한 스타일의 연구 뉴스(중급~).", tags: ["무료", "실전"] },
      { name: "NIH News in Health", url: "https://newsinhealth.nih.gov/", desc: "미국 국립보건원의 일반인용 건강 기사. 문장이 평이.", tags: ["무료", "중급"] },
      { name: "MedlinePlus", url: "https://medlineplus.gov/", desc: "질병·약 설명. 의약 단어 익히기에 좋음.", tags: ["무료"] },
    ],
  },
];

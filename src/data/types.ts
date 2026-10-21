// 공통 데이터 스키마. 모든 콘텐츠 파일은 이 타입을 따른다.
// 마크다운 문자열(md)은 marked로 렌더링된다. 영어/일본어 원문은 그대로, 설명은 한국어로.

/** 4지선다 등 선택형 문제 하나 */
export interface Question {
  /** 해답번호(マーク番号) 또는 문항 번호 */
  number: number;
  /** 문제 본문 (영어 원문, md). 빈칸은 "(　　)" 로 표기 */
  prompt: string;
  /** 선택지 (원문 그대로, 번호 없이) */
  choices: string[];
  /** 정답 (1부터 시작하는 선택지 번호) */
  answer: number;
  /** 한국어 해설 (md). 문법을 전혀 모르는 사람 기준으로: 문장 해석 → 왜 정답인지 → 오답이 왜 틀린지 → 핵심 포인트 */
  explanation: string;
  /** 연결되는 문법 강의 id (src/data/grammar 의 Lesson.id) */
  lessonIds?: string[];
}

export type SectionKind =
  | "grammar" // 빈칸 문법/어휘 4지선다
  | "paraphrase" // 밑줄 의미가 가까운 것
  | "error" // 틀린 곳 찾기
  | "relation" // 단어 관계(유의어/반의어 등)
  | "ordering" // 정렬(並べ替え)
  | "dialogue" // 회화문
  | "reading"; // 장문독해

export interface Section {
  /** 로마 숫자 (I, II, ...) */
  roman: string;
  kind: SectionKind;
  /** 시험지의 일본어 지시문 원문 */
  instructionJa: string;
  /** 지시문 한국어 번역 */
  instructionKo: string;
  /** 이 유형을 푸는 요령 (한국어 md) */
  strategy: string;
  /** 장문/회화 지문 (영어 원문 md). 문단은 빈 줄로 구분. 밑줄은 <u>..</u>, 빈칸 번호는 ( A ) 처럼 원문 표기 */
  passage?: string;
  /** 지문 각주(원문의 注) */
  notes?: string;
  /** 지문 전체 한국어 번역 (md) */
  passageKo?: string;
  questions: Question[];
}

export interface Paper {
  year: number;
  /** 공식 PDF URL */
  pdfUrl: string;
  /** 연도별 총평 (한국어 md) */
  overview: string;
  sections: Section[];
}

export interface QuizItem {
  prompt: string;
  choices: string[];
  answer: number; // 1-based
  explanation: string; // 한국어 md
  /** 연결되는 문법 강의 id (선택) */
  lessonIds?: string[];
}

export interface Lesson {
  /** url-safe id, 예: "g01-parts-of-speech" */
  id: string;
  /** 단계: 1 = 왕기초, 2 = 기본, 3 = 시험 핵심, 4 = 실전 */
  level: 1 | 2 | 3 | 4;
  title: string;
  /** 한 줄 요약 */
  summary: string;
  /** 본문 (한국어 md, 영어 예문 포함). 표/굵게/인용 자유롭게 */
  body: string;
  /** 확인 퀴즈 (최소 4문항, 星薬 출제 형식과 비슷하게) */
  quiz: QuizItem[];
}

export interface VocabItem {
  word: string;
  pos: string; // 품사 (한국어: 명사/동사/...)
  ko: string; // 한국어 뜻
  ja?: string; // 일본어 뜻
  example: string; // 영어 예문
  exampleKo: string; // 예문 해석
  tag: string; // 분류: "기출" | "의약" | "숙어" | "필수동사" 등
}

export interface ReadingPassage {
  id: string;
  title: string;
  topic: string; // 한국어 주제
  /** 영어 지문 (md) */
  text: string;
  notes?: string;
  /** 문장 단위 끊어읽기 해설: 원문 문장 + 직독직해 + 구조 설명 */
  breakdown: { en: string; slash: string; ko: string; grammar: string }[];
  quiz: QuizItem[];
}

import type { Lesson, Paper, ReadingPassage } from "./types";
import { paper2024 } from "./papers/2024";
import { paper2025 } from "./papers/2025";
import { paper2026 } from "./papers/2026";

// 문법 강의: lessons/*.ts 각 파일이 lesson 하나를 export 한다 (파일명 순 = 강의 순서)
const lessonMods = import.meta.glob<{ lesson: Lesson }>("./grammar/lessons/*.ts", { eager: true });
export const lessons: Lesson[] = Object.keys(lessonMods).sort().map((k) => lessonMods[k].lesson);

const readingMods = import.meta.glob<{ reading: ReadingPassage }>("./readings/*.ts", { eager: true });
export const readings: ReadingPassage[] = Object.keys(readingMods).sort().map((k) => readingMods[k].reading);

// 해설 덮어쓰기: explanations/<year>-<roman>.json = { "<문항번호>": "<한국어 md 해설>" }
const explMods = import.meta.glob<{ default: Record<string, string> }>("./papers/explanations/*.json", { eager: true });
function withExplanations(p: Paper): Paper {
  return {
    ...p,
    sections: p.sections.map((s) => {
      const o = explMods[`./papers/explanations/${p.year}-${s.roman}.json`]?.default ?? {};
      return { ...s, questions: s.questions.map((q) => (o[String(q.number)] ? { ...q, explanation: o[String(q.number)] } : q)) };
    }),
  };
}
export const papers: Paper[] = [paper2026, paper2025, paper2024].map(withExplanations);
export const lessonById = (id: string) => lessons.find((l) => l.id === id);
export const levelNames: Record<number, string> = { 1: "1단계 · 왕기초", 2: "2단계 · 기본", 3: "3단계 · 시험 핵심", 4: "4단계 · 실전 전략" };
export { vocab } from "./vocab";

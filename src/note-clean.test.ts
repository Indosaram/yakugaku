import { expect, test } from "bun:test";
import { cleanNote } from "../backend/src/index";

test("cleanNote unwraps a fenced markdown block the model likes to add", () => {
  expect(cleanNote("```markdown\n## 핵심 공식\n| a | b | c |\n```")).toBe("## 핵심 공식\n| a | b | c |");
  expect(cleanNote("```md\n## 풀이 순서\n1. 먼저 쓴다.\n```")).toBe("## 풀이 순서\n1. 먼저 쓴다.");
  expect(cleanNote("```\n## 예제\n```")).toBe("## 예제");
});

test("cleanNote leaves an unfenced note untouched", () => {
  const note = "> 요약 한 줄\n\n## 핵심 공식\n\n- 항목";
  expect(cleanNote(note)).toBe(note);
});

test("cleanNote strips a leading fence even when the closing fence is missing", () => {
  expect(cleanNote("```markdown\n## 핵심 공식")).toBe("## 핵심 공식");
});

test("cleanNote returns an empty string for empty or whitespace-only output", () => {
  expect(cleanNote("")).toBe("");
  expect(cleanNote("   \n\n ")).toBe("");
});

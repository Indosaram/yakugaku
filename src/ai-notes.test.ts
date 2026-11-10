import { beforeEach, expect, test } from "bun:test";
import { AI_INDEX_KEY, AI_NOTE_MAX, aiNoteBytes, aiNoteItems, aiNoteKey, deleteAiNote, listAiNotes, newAiNoteId, readAiNote, saveAiNote } from "./ai-notes";
import { resetProgress, setProgress } from "./progress";

beforeEach(() => {
  resetProgress(() => true);
});

const meta = (id: string, title: string, created = "2026-11-09") => ({ id, title, created });

test("listAiNotes returns an empty list before anything is saved", () => {
  expect(listAiNotes()).toEqual([]);
});

test("saveAiNote stores the body and one index entry", () => {
  saveAiNote(meta("ai-2026-11-09-1", "퍼센트 농도"), "## 핵심 공식\n\n- 항목");
  expect(readAiNote("ai-2026-11-09-1")).toBe("## 핵심 공식\n\n- 항목");
  expect(listAiNotes().map((n) => n.id)).toEqual(["ai-2026-11-09-1"]);
});

test("saveAiNote overwrites instead of duplicating the index entry", () => {
  saveAiNote(meta("ai-2026-11-09-1", "퍼센트 농도"), "v1");
  saveAiNote(meta("ai-2026-11-09-1", "퍼센트 농도"), "v2");
  expect(readAiNote("ai-2026-11-09-1")).toBe("v2");
  expect(listAiNotes()).toHaveLength(1);
});

test("saveAiNote sorts newest first", () => {
  saveAiNote(meta("ai-2026-11-01-1", "오래된", "2026-11-01"), "a");
  saveAiNote(meta("ai-2026-11-09-1", "최근", "2026-11-09"), "b");
  expect(listAiNotes().map((n) => n.title)).toEqual(["최근", "오래된"]);
});

test("deleteAiNote removes both the body and the index entry", () => {
  saveAiNote(meta("ai-2026-11-09-1", "퍼센트 농도"), "본문");
  deleteAiNote("ai-2026-11-09-1");
  expect(readAiNote("ai-2026-11-09-1")).toBeNull();
  expect(listAiNotes()).toEqual([]);
});

test("listAiNotes survives a corrupted index value", () => {
  setProgress(AI_INDEX_KEY, "{not json");
  expect(listAiNotes()).toEqual([]);
  setProgress(AI_INDEX_KEY, JSON.stringify({ not: "an array" }));
  expect(listAiNotes()).toEqual([]);
});

test("listAiNotes drops entries without an id or title", () => {
  setProgress(AI_INDEX_KEY, JSON.stringify([{ id: "ok", title: "제목", created: "2026-11-09" }, { id: "no-title" }, null]));
  expect(listAiNotes().map((n) => n.id)).toEqual(["ok"]);
});

test("saveAiNote truncates the body at AI_NOTE_MAX so sync keeps accepting it", () => {
  saveAiNote(meta("ai-2026-11-09-1", "긴 노트"), "가".repeat(AI_NOTE_MAX + 500));
  expect(readAiNote("ai-2026-11-09-1")!.length).toBe(AI_NOTE_MAX);
  expect(AI_NOTE_MAX).toBeLessThan(20_000);
});

test("newAiNoteId never collides with an existing note id", () => {
  saveAiNote(meta("ai-2026-11-09-1", "첫째"), "a");
  expect(newAiNoteId("2026-11-09")).toBe("ai-2026-11-09-2");
  saveAiNote(meta("ai-2026-11-09-2", "둘째"), "b");
  expect(newAiNoteId("2026-11-09")).toBe("ai-2026-11-09-3");
});

test("aiNoteItems links each note to its review key", () => {
  saveAiNote(meta("ai-2026-11-09-1", "퍼센트 농도"), "본문");
  expect(aiNoteItems()).toEqual([
    { id: "ai-2026-11-09-1", title: "퍼센트 농도", href: "/chem/n/ai-2026-11-09-1", key: "note:review:ai-2026-11-09-1" },
  ]);
});

test("aiNoteBytes counts only the note keys", () => {
  setProgress("mark:card:jitan:jt2:test", "o");
  saveAiNote(meta("ai-2026-11-09-1", "노트"), "12345");
  expect(aiNoteBytes()).toBeGreaterThanOrEqual("12345".length);
  expect(aiNoteBytes()).toBeLessThan("12345".length + 200);
  expect(aiNoteKey("ai-2026-11-09-1")).toBe("note:ai:ai-2026-11-09-1");
});

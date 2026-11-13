import { describe, expect, test } from "bun:test";
import { bodyState, findSection, fixInwordBold, mediaBase, prepareBody, stripTitle, type HandaiIndex } from "./Handai2015";

const index: HandaiIndex = {
  title: "오사카대학 2015 전기 화학",
  ja: "大阪大学 2015年度 前期 化学",
  video: "p98nUjz1axs",
  lead: "",
  sections: [{ id: "03", no: 3, title: "제3문", ja: "第3問", topic: "유기 · 입체", start: 1000, url: "https://youtu.be/p98nUjz1axs?t=1000", lead: "" }],
};

describe("mediaBase", () => {
  test("prefixes repo-relative figure paths so they resolve from the deployed base", () => {
    const out = mediaBase("![a](data/handai2015/fig/03-problem.webp)");
    // 배포 기준 경로(BASE_URL)는 vite 설정에 달려 있으므로, 저장소 상대 경로가 아닌 것만 확인한다.
    expect(out).not.toContain("(data/handai2015");
    expect(out).toMatch(/\/data\/handai2015\/fig\/03-problem\.webp\)$/);
  });

  test("leaves absolute, protocol-relative, anchor and in-page links untouched", () => {
    const md = "[y](https://youtu.be/x?t=10) [p](//cdn/x.png) [h](#sec) [r](/chem)";
    expect(mediaBase(md)).toBe(md);
  });
});

describe("bodyState", () => {
  test("a loaded body is ready", () => {
    expect(bodyState("# 제3문", undefined)).toEqual({ state: "ready", md: "# 제3문" });
  });

  test("an empty file is treated as not written yet, not as an error", () => {
    expect(bodyState("  \n", undefined).state).toBe("empty");
  });

  test("a missing markdown file shows the pending screen while the fetch is in flight", () => {
    expect(bodyState(undefined, undefined).state).toBe("loading");
    expect(bodyState(undefined, new Error("handai2015/01.md 404")).state).toBe("empty");
  });

  test("a network failure is reported separately from a missing file", () => {
    expect(bodyState(undefined, new Error("handai2015/03.md 500")).state).toBe("error");
  });
});

test("an unknown id has no section so the page can show its own 404", () => {
  expect(findSection(index, "03")?.no).toBe(3);
  expect(findSection(index, "05")).toBeUndefined();
  expect(findSection(undefined, "03")).toBeUndefined();
});

describe("fixInwordBold", () => {
  test("a bold run closed right before a letter renders bold instead of leaking its asterisks", () => {
    expect(fixInwordBold("- 황이 **S²⁻(황화 이온)**가 된다.")).toBe("- 황이 <strong>S²⁻(황화 이온)</strong>가 된다.");
  });

  test("one broken run does not strand the other bolds on the same line", () => {
    expect(fixInwordBold("받아 **Cr³⁺**, 잃어 **Fe³⁺**가 된다.")).toBe("받아 <strong>Cr³⁺</strong>, 잃어 <strong>Fe³⁺</strong>가 된다.");
  });

  test("a line with an unmatched run is left for the parser instead of mangling it", () => {
    expect(fixInwordBold("표 안의 **7.75 |")).toBe("표 안의 **7.75 |");
  });
});

test("the document title line is dropped because the page heading already shows it", () => {
  expect(stripTitle("# 大阪大学 2015년 전기 第3問 — 의약품 합성\n\n## 한눈에 보기\n- x")).toBe("## 한눈에 보기\n- x");
  expect(stripTitle("## 한눈에 보기")).toBe("## 한눈에 보기");
});

test("prepareBody drops the front title, fixes bolds, rewrites figure paths and opens video links in a new tab", () => {
  const md = [
    "# 大阪大学 2015년 전기 第3問 — 의약품 합성",
    "",
    '## 문제 요약 <a href="https://youtu.be/p98nUjz1axs?t=1000">▸ 16:40</a>',
    "",
    "![그림](data/handai2015/fig/03-problem.webp)",
    "",
    "황이 **S²⁻(황화 이온)**가 된다.",
  ].join("\n");

  const out = prepareBody(md);

  expect(out.startsWith("## 문제 요약")).toBe(true);
  expect(out).not.toContain("大阪大学");
  expect(out).toContain('<a href="https://youtu.be/p98nUjz1axs?t=1000" target="_blank" rel="noreferrer">▸ 16:40</a>');
  expect(out).toMatch(/!\[그림\]\(\/data\/handai2015\/fig\/03-problem\.webp\)/);
  expect(out).toContain("<strong>S²⁻(황화 이온)</strong>가");
});

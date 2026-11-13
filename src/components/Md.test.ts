import { describe, expect, test } from "bun:test";
import { marked } from "marked";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MdInline, Md, mathify, renderInlineMd, renderMd } from "./Md";

describe("mathify", () => {
  test("formats vector marks in prose without altering image attributes", () => {
    const html = marked.parse('AB⃗ and ![a⃗ vector](vector.webp)', { async: false }) as string;

    const formatted = mathify(html);

    expect(formatted).toContain('<span class="vec">AB</span>');
    expect(formatted).toContain('alt="a⃗ vector"');
    expect(formatted).not.toContain('<span class="vec">a⃗ vector</span>');
  });

  test("keeps tilde ranges as text instead of strikethrough", () => {
    const html = marked.parse("(1)~(6) and 3~5%", { async: false }) as string;

    expect(html).not.toContain("<del>");
    expect(html).toContain("(1)~(6)");
  });

  test("formats bars and plain-text superscript and subscript", () => {
    const html = marked.parse('Q̄ x_{n+1} y^{2}', { async: false }) as string;
    const formatted = mathify(html);

    expect(formatted).toContain('<span class="mbar">Q</span>');
    expect(formatted).toContain("x<sub>n+1</sub>");
    expect(formatted).toContain("y<sup>2</sup>");
  });

  test("puts the arrow over every base letter of a multi-letter vector", () => {
    const formatted = mathify(marked.parse("AB⃗ PQ⃗ OA⃗ a⃗", { async: false }) as string);

    expect(formatted).toContain('<span class="vec">AB</span>');
    expect(formatted).toContain('<span class="vec">PQ</span>');
    expect(formatted).toContain('<span class="vec">OA</span>');
    expect(formatted).toContain('<span class="vec">a</span>');
    // No base letter may be left outside the span and no combining arrow may survive.
    expect(formatted).not.toContain("A<span");
    expect(formatted).not.toMatch(/\u20d7/);
  });

  test("wraps only the letter, not a leading scalar, when a coefficient precedes the vector", () => {
    const formatted = mathify(marked.parse("2a⃗ + ½b⃗", { async: false }) as string);

    expect(formatted).toContain('2<span class="vec">a</span>');
    expect(formatted).toContain('½<span class="vec">b</span>');
  });

  test("moves a prime written on either side of the arrow outside the arrowed span", () => {
    const before = mathify(marked.parse("OA'⃗", { async: false }) as string);
    const after = mathify(marked.parse("OA⃗′", { async: false }) as string);

    for (const html of [before, after]) {
      expect(html).toContain('<span class="vec">OA</span>′');
      expect(html).not.toMatch(/\u20d7/);
    }
  });

  test("keeps an attribute value containing '>' intact while formatting the text node", () => {
    const formatted = mathify('<span title="a>a⃗">AB⃗</span>');

    expect(formatted).toContain('<span title="a>a⃗">');
    expect(formatted).toContain('<span class="vec">AB</span>');
  });

  test("formats a one-character brace script such as C^{1} and x_{1}", () => {
    const formatted = mathify(marked.parse("C^{1} and x_{1}", { async: false }) as string);

    expect(formatted).toContain("C<sup>1</sup>");
    expect(formatted).toContain("x<sub>1</sub>");
  });
});

describe("renderInlineMd and MdInline", () => {
  test("renders bold and math without the wrapping <p> of a block", () => {
    const html = renderInlineMd("**굵게** AB⃗ 요약");

    expect(html).not.toContain("<p>");
    expect(html).toContain("<strong>굵게</strong>");
    expect(html).toContain('<span class="vec">AB</span>');
  });

  test("repairs bold that ends on punctuation before a particle, as JSON fields do", () => {
    const html = renderInlineMd("**약산의 유리(弱酸の遊離)**라고");

    expect(html).toContain("<strong>약산의 유리(弱酸の遊離)</strong>라고");
    expect(html).not.toContain("**");
  });

  test("MdInline renders a span, not a block element", () => {
    const html = renderToStaticMarkup(createElement(MdInline, { text: "**AB⃗**", className: "s" }));

    expect(html).toBe('<span class="s"><strong><span class="vec">AB</span></strong></span>');
  });
});

describe("Md block chrome", () => {
  test("draws a Zap instead of printing a pictograph in a block title", () => {
    const html = renderToStaticMarkup(
      createElement(Md, { text: ":::concept \u26A1 이 단원에서 계속 쓰는 꼼수 6개\n본문\n:::" }),
    );

    expect(html).toContain("이 단원에서 계속 쓰는 꼼수 6개");
    expect(html).not.toMatch(/\p{Extended_Pictographic}/u);
    expect(html).toContain("lucide");
  });

  // vecc writes vector symbols into :::fast titles ("|a⃗ + tb⃗|의 최솟값"). Rendering the title as
  // plain text left 19 raw U+20D7 marks in the DOM on /#/vec/*.
  test("renders a combining vector arrow inside a :::fast title as a .vec span", () => {
    const html = renderToStaticMarkup(createElement(Md, { text: ":::fast |a⃗ + tb⃗|의 최솟값\n본문\n:::" }));

    expect(html).toContain('<span class="vec">a</span>');
    expect(html).toContain('<span class="vec">b</span>');
    expect(html).not.toContain("\u20D7");
    expect(html).toContain("최솟값");
  });

  test("renders a combining vector arrow inside a :::concept title as a .vec span", () => {
    const html = renderToStaticMarkup(createElement(Md, { text: ":::concept AB⃗의 성질\n본문\n:::" }));

    expect(html).toContain('<span class="vec">AB</span>');
    expect(html).not.toContain("\u20D7");
  });

  // The :::fast summary already draws its own Zap, so a U+26A1 in the title must not add a second one.
  test("draws exactly one Zap for a :::fast title that also carries a pictograph", () => {
    const html = renderToStaticMarkup(createElement(Md, { text: ":::fast \u26A1 빠른 풀이\n본문\n:::" }));

    expect((html.match(/lucide-zap/g) ?? []).length).toBe(1);
    expect(html).not.toMatch(/\p{Extended_Pictographic}/u);
  });
});

describe("renderMd bold spans before Korean josa and Japanese particles", () => {
  const countAsterisks = (html: string) => (html.match(/\*\*/g) ?? []).length;

  test("closes bold whose last character before ** is punctuation and is followed by a particle", () => {
    const html = renderMd("**약산의 유리(弱酸の遊離)**라고 한다.");

    expect(html).toContain("<strong>약산의 유리(弱酸の遊離)</strong>라고");
    expect(countAsterisks(html)).toBe(0);
  });

  test("keeps inline HTML such as <sup> inside the repaired bold span", () => {
    const html = renderMd("**수산화 이온(水酸化物イオン) OH<sup>−</sup>**이 원인이다.");

    expect(html).toContain("<strong>수산화 이온(水酸化物イオン) OH<sup>−</sup></strong>이");
    expect(html).toContain("<sup>−</sup>");
    expect(countAsterisks(html)).toBe(0);
  });

  test("repairs every bold span on a line, including one followed by a superscript digit", () => {
    const html = renderMd("**S²⁻(황화 이온)**가 침전하고 **수소 이온 H<sup>+</sup>**²이");

    expect(html).toContain("<strong>S²⁻(황화 이온)</strong>가");
    expect(html).toContain("<strong>수소 이온 H<sup>+</sup></strong>²이");
    expect(countAsterisks(html)).toBe(0);
  });

  test("leaves bold inside inline code and fenced code blocks untouched", () => {
    const inline = renderMd("`**foo(bar)**가` 그리고 일반 텍스트");
    expect(inline).toContain("<code>**foo(bar)**가</code>");
    expect(countAsterisks(inline)).toBe(2);

    const fenced = renderMd("```\n**foo(bar)**가\n```");
    expect(fenced).toContain("<pre><code>**foo(bar)**가\n</code></pre>");
    expect(fenced).not.toContain("<strong>");
  });

  test("leaves a raw HTML <code> text node verbatim", () => {
    const html = renderMd("foo <code>**a)**b</code> bar");

    expect(html).toContain("<code>**a)**b</code>");
    expect(html).not.toContain("<strong>");
  });

  test("never rewrites attributes inside HTML tags, including image alt text", () => {
    const html = renderMd('![수산화 이온 OH<sup>−</sup>](ion.webp) 그리고 <span title="**x)**가">ok</span>');

    expect(html).toContain('alt="수산화 이온 OH&lt;sup&gt;−&lt;/sup&gt;"');
    expect(html).toContain('title="**x)**가"');
  });

  test("does not disturb ordinary emphasis, strong and strikethrough handling", () => {
    expect(renderMd("**a** and **b**")).toContain("<strong>a</strong> and <strong>b</strong>");
    expect(renderMd("***bi***")).toContain("<em><strong>bi</strong></em>");
    expect(renderMd("a**b**c")).toContain("a<strong>b</strong>c");
    expect(renderMd("~~gone~~")).not.toContain("<del>");
    expect(renderMd("2n**+1**이다.")).not.toContain("<strong>");
  });
});

describe("renderMd over public/data", () => {
  const dataDir = "public/data";
  const walk = (dir: string, out: string[] = []): string[] => {
    for (const entry of readdirSync(dir)) {
      const path = join(dir, entry);
      if (statSync(path).isDirectory()) walk(path, out);
      else if (path.endsWith(".md")) out.push(path);
    }
    return out;
  };
  // Bold spans this bug used to leave unparsed: closing ** after punctuation, then a word character.
  const LEFTOVER_BOLD = /\*\*[^*\n]*[\p{P}\p{S}]\*\*(?=[^\s\p{P}\p{S}])/u;
  const stripCode = (html: string) =>
    html.replace(/<pre>[\s\S]*?<\/pre>/g, "").replace(/<code>[\s\S]*?<\/code>/g, "");

  test("leaves no unparsed bold span and no literal asterisk outside code", () => {
    const files = walk(dataDir);
    expect(files.length).toBeGreaterThan(600);

    const leftoverBold: string[] = [];
    const literalAsterisks: [string, number][] = [];

    for (const file of files) {
      const html = renderMd(readFileSync(file, "utf8"));
      const text = stripCode(html);
      if (LEFTOVER_BOLD.test(text)) leftoverBold.push(relative(dataDir, file));

      const count = (text.match(/\*\*/g) ?? []).length;
      if (count) literalAsterisks.push([relative(dataDir, file), count]);
    }

    expect(leftoverBold).toEqual([]);
    // Footnote marks are full-width ＊ so markdown never reads them as emphasis.
    expect(literalAsterisks).toEqual([]);
  });

  test("renders the previously broken chem pages with real <strong> markup", () => {
    const cases: [string, string[]][] = [
      ["textbook/chem-basic/pages/0099.md", ["<strong>약산의 유리(弱酸の遊離)</strong>라고"]],
      [
        "textbook/chem-basic/pages/0089.md",
        ["<strong>수산화 이온(水酸化物イオン) OH<sup>−</sup></strong>이"],
      ],
      ["textbook/chem-basic/pages/0088.md", ["<strong>산성(酸性)</strong>이라", "<strong>산(酸)</strong>이라고"]],
    ];

    for (const [file, expected] of cases) {
      const html = renderMd(readFileSync(join(dataDir, file), "utf8"));
      for (const snippet of expected) expect(html).toContain(snippet);
    }
  });
});

// JSON-backed pages render their prose fields inline, so the same leftover-bold check must hold for
// the values those pages actually print (notes lead, juyo answers, grammar intro/explanation).
describe("JSON fields rendered through MdInline", () => {
  const read = (file: string) => JSON.parse(readFileSync(join("public/data", file), "utf8"));
  const fields = (value: unknown, out: string[] = []): string[] => {
    if (Array.isArray(value)) for (const v of value) fields(v, out);
    else if (value && typeof value === "object") for (const v of Object.values(value)) fields(v, out);
    else if (typeof value === "string") out.push(value);
    return out;
  };
  const leftovers = (values: string[]) =>
    values
      .map((v) => renderInlineMd(v))
      .map((h) => h.replace(/<pre>[\s\S]*?<\/pre>/g, "").replace(/<code>[\s\S]*?<\/code>/g, ""))
      .filter((h) => h.includes("**"));

  test("books/grammar.json renders every bold span with no raw ** left", () => {
    const data = read("books/grammar.json");
    const prose = fields(data).filter((v) => v.includes("**"));
    expect(prose.length).toBeGreaterThan(400);
    expect(leftovers(prose)).toEqual([]);

    const intro = renderInlineMd(data[0].intro);
    // marked escapes the apostrophe, so the bold span closes around `I&#39;m having`.
    expect(intro).toContain("<strong>I&#39;m having</strong> dinner");
    expect(intro).not.toContain("I**");
  });

  test("notes/index.json leads render without raw markdown", () => {
    const notes = read("notes/index.json") as { lead: string }[];
    expect(notes.length).toBeGreaterThan(0);
    for (const n of notes) expect(renderInlineMd(n.lead)).not.toContain("**");
  });

  test("juyo/*.json answers and problem summaries render without raw markdown", () => {
    const dir = join("public/data", "juyo");
    const groups = readdirSync(dir).filter((f) => f.endsWith(".json"));
    expect(groups.length).toBeGreaterThan(15);
    for (const file of groups) {
      expect(leftovers(fields(read(join("juyo", file))))).toEqual([]);
    }
  });

  // Every JSON-backed page prints some field through MdInline, so no file may leak raw ** — not just
  // the three groups above.
  test("every JSON file under public/data renders with no unparsed ** left", () => {
    const walkJson = (dir: string, out: string[] = []): string[] => {
      for (const entry of readdirSync(dir)) {
        const path = join(dir, entry);
        if (statSync(path).isDirectory()) walkJson(path, out);
        else if (path.endsWith(".json")) out.push(path);
      }
      return out;
    };
    const files = walkJson("public/data");
    expect(files.length).toBeGreaterThan(40);

    const offenders: [string, number][] = [];
    for (const file of files) {
      const found = leftovers(fields(JSON.parse(readFileSync(file, "utf8"))));
      if (found.length) offenders.push([relative("public/data", file), found.length]);
    }

    expect(offenders).toEqual([]);
  });
});

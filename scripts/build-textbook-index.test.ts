import { expect, test } from "bun:test";
import { mkdtemp, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildTextbookIndex } from "./build-textbook-index";

test("indexes sparse pages, section links, chapter ranges and figures without requiring either book", async () => {
  const root = await mkdtemp(join(tmpdir(), "textbook-index-"));
  try {
    await mkdir(join(root, "chem/pages"), { recursive: true });
    await mkdir(join(root, "chem/fig"), { recursive: true });
    await Bun.write(join(root, "chem/pages/0001.md"), "<!-- page 1 -->\nPreface\n");
    await Bun.write(join(root, "chem/pages/0003.md"), "<!-- page 3 -->\n# A\n## B\n### C\n```\n# ignored\n```\n");
    await Bun.write(join(root, "chem/pages/0008.md"), "<!-- page 8 -->\n# D\n## E\n");
    await Bun.write(join(root, "chem/fig/a.webp"), "fixture");
    const { books } = await buildTextbookIndex(root);
    expect(books.map(({ id, pages, figures }) => ({ id, pages, figures }))).toEqual([
      { id: "chem", pages: 350, figures: 1 }, { id: "chem-basic", pages: 146, figures: 0 },
    ]);
    expect(books[0].chapters.map(({ from, to, sections }) => ({ from, to, sectionPages: sections.map(({ page }) => page) }))).toEqual([
      { from: 1, to: 2, sectionPages: [] }, { from: 3, to: 7, sectionPages: [3] }, { from: 8, to: 350, sectionPages: [8] },
    ]);
    expect(books[0].missing).toHaveLength(347);
    expect(books[0].missing).toContain(2);
    expect(books[0].missing).not.toContain(3);
    expect(books[1].missing).toHaveLength(146);
    expect(books[1].chapters).toEqual([]);
  } finally { await rm(root, { recursive: true, force: true }); }
});

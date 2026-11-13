import { mkdir, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

export type Chapter = { id: string; title: string; from: number; to: number; sections: { title: string; page: number }[] };
const definitions = [
  { id: "chem", title: "화학", ja: "文英堂『化学』", pages: 350 },
  { id: "chem-basic", title: "화학기초", ja: "文英堂『化学基礎』", pages: 146 },
];

async function entries(path: string): Promise<string[]> {
  try { return await readdir(path); }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export async function buildTextbookIndex(root: string) {
  const books = await Promise.all(definitions.map(async (definition) => {
    const directory = join(root, definition.id);
    const files = new Set(await entries(join(directory, "pages")));
    const missing: number[] = [];
    const chapters: Chapter[] = [];
    let chapter: Chapter | undefined;
    for (let page = 1; page <= definition.pages; page++) {
      const filename = `${String(page).padStart(4, "0")}.md`;
      if (!files.has(filename)) { missing.push(page); continue; }
      const text = await Bun.file(join(directory, "pages", filename)).text();
      let fenced = false;
      for (const line of text.split(/\r?\n/)) {
        if (/^\s*(`{3,}|~{3,})/.test(line)) { fenced = !fenced; continue; }
        if (fenced || !line.trim() || /^\s*<!--.*-->\s*$/.test(line)) continue;
        const heading = /^(#{1,2})\s+(.+?)\s*#*\s*$/.exec(line);
        if (!chapter || heading?.[1] === "#") {
          if (!chapter && heading?.[1] === "#" && page > 1) {
            chapters.push({ id: "chapter-1", title: "앞부분", from: 1, to: page - 1, sections: [] });
          }
          if (chapter) chapter.to = Math.max(chapter.from, page - 1);
          chapter = { id: `chapter-${chapters.length + 1}`, title: heading?.[1] === "#" ? heading[2] : "앞부분", from: chapters.length === 0 ? 1 : page, to: definition.pages, sections: [] };
          chapters.push(chapter);
        }
        if (heading?.[1] === "##") chapter.sections.push({ title: heading[2], page });
      }
    }
    const figures = (await entries(join(directory, "fig"))).filter((name) => /\.webp$/i.test(name)).length;
    return { ...definition, figures, missing, chapters };
  }));
  return { books };
}

if (import.meta.main) {
  const root = resolve(process.env.TEXTBOOK_ROOT ?? new URL("../public/data/textbook", import.meta.url).pathname);
  const output = resolve(process.env.TEXTBOOK_INDEX_OUTPUT ?? join(root, "index.json"));
  const index = await buildTextbookIndex(root);
  await mkdir(dirname(output), { recursive: true });
  await Bun.write(output, JSON.stringify(index, null, 2) + "\n");
  for (const book of index.books) console.log(`${book.id}: ${book.pages - book.missing.length}/${book.pages} pages, ${book.figures} figures, ${book.missing.length} missing`);
}

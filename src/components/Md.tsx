import { marked } from "marked";
import { useMemo } from "react";
import { AnalogyBlock, FormulaBlock, StepsBlock, TrainBlock, TransformBlock, VsBlock } from "./VisualBlocks";

marked.setOptions({ gfm: true, breaks: true });

interface Segment {
  kind: "md" | "analogy" | "train" | "transform" | "vs" | "steps" | "formula";
  title?: string;
  body: string;
}

const BLOCK_RE = /^:::(analogy|train|transform|vs|steps|formula)(?:[ \t]+([^\n]*))?\n([\s\S]*?)^:::\s*$/gm;

function splitSegments(text: string): Segment[] {
  const out: Segment[] = [];
  let last = 0;
  for (const m of text.matchAll(BLOCK_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) {
      const before = text.slice(last, idx).trim();
      if (before) out.push({ kind: "md", body: before });
    }
    out.push({
      kind: m[1] as Segment["kind"],
      title: m[2]?.trim(),
      body: m[3].trim(),
    });
    last = idx + m[0].length;
  }
  const rest = text.slice(last).trim();
  if (rest) out.push({ kind: "md", body: rest });
  return out;
}

function RawMd({ text, className = "" }: { text: string; className?: string }) {
  const html = useMemo(() => marked.parse(text, { async: false }) as string, [text]);
  return <div className={"md " + className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function Md({ text, className = "" }: { text: string; className?: string }) {
  const segments = useMemo(() => splitSegments(text), [text]);
  if (segments.length === 1 && segments[0].kind === "md") {
    return <RawMd text={text} className={className} />;
  }
  return (
    <div className={className}>
      {segments.map((s, i) => {
        switch (s.kind) {
          case "analogy":
            return <AnalogyBlock key={i} title={s.title} body={s.body} />;
          case "train":
            return <TrainBlock key={i} title={s.title} body={s.body} />;
          case "transform":
            return <TransformBlock key={i} title={s.title} body={s.body} />;
          case "vs":
            return <VsBlock key={i} title={s.title} body={s.body} />;
          case "steps":
            return <StepsBlock key={i} title={s.title} body={s.body} />;
          case "formula":
            return <FormulaBlock key={i} title={s.title} body={s.body} />;
          default:
            return <RawMd key={i} text={s.body} />;
        }
      })}
    </div>
  );
}

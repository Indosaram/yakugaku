import { marked, type TokenizerThis, type Tokens } from "marked";
import { useMemo } from "react";
import { Zap } from "lucide-react";
import { AnalogyBlock, FormulaBlock, StepsBlock, TrainBlock, TransformBlock, VsBlock } from "./VisualBlocks";

marked.setOptions({ gfm: true, breaks: true });
// Ranges such as (1)~(6) and 3~5% are common in the content; GFM would strike them through.
marked.use({ tokenizer: { del: () => undefined } });

// CommonMark's right-flanking rule rejects a closing "**" whose preceding character is punctuation
// when a letter/digit follows it. Korean josa and Japanese particles attach directly to the word
// ("**약산의 유리(弱酸の遊離)**라고"), so marked leaves such spans as literal asterisks. Accept that
// shape explicitly: closing "**" after punctuation, followed by a non-space, non-punctuation
// character. Fenced blocks, inline code spans and HTML tags never reach this tokenizer.
const LENIENT_STRONG_RE = /^\*\*(?!\s)((?:(?!\*\*)[\s\S])*?[\p{P}\p{S}])\*\*(?=[^\s\p{P}\p{S}])/u;

marked.use({
  extensions: [
    {
      name: "lenientStrong",
      level: "inline",
      start(src: string) {
        const i = src.indexOf("**");
        return i < 0 ? undefined : i;
      },
      tokenizer(this: TokenizerThis, src: string): Tokens.Generic | undefined {
        // Raw HTML text nodes (e.g. a literal <code> or <pre> in the markdown) are verbatim.
        if (this.lexer.state.inRawBlock) return undefined;
        const m = LENIENT_STRONG_RE.exec(src);
        if (!m) return undefined;
        return { type: "strong", raw: m[0], text: m[1], tokens: this.lexer.inlineTokens(m[1]) };
      },
    },
  ],
});

interface Segment {
  kind: "md" | "analogy" | "train" | "transform" | "vs" | "steps" | "formula" | "concept" | "fast";
  title?: string;
  body: string;
}

const BLOCK_RE = /^:::(analogy|train|transform|vs|steps|formula|concept|fast)(?:[ \t]+([^\n]*))?\n([\s\S]*?)^:::\s*$/gm;

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

// An HTML tag whose attribute values may contain ">" (e.g. title="a>a⃗"): quote-aware, so the tag
// ends at the first ">" that is outside a quoted value.
const TAG_RE = /<\/?[A-Za-z!][^>"']*(?:"[^"]*"|'[^']*'|[^>"'])*>/g;

// Combining marks (U+20D7 arrow, U+0304 bar) sit on the last letter only and render misplaced in
// Pretendard, so AB⃗ shows an arrow over B alone. Wrap the whole symbol and draw the mark in CSS.
// A multi-letter vector is 2-3 capitals (AB⃗, OP⃗); everything else is one letter or digit, so 2a⃗
// keeps only the "a" under the arrow. The prime may sit before or after the arrow (OA'⃗ / OA⃗′) and
// marked escapes an ASCII apostrophe to &#39;, so all shapes collapse to one canonical form.
const PRIME = "(?:′|&#39;|'|’)";
// Subscript digits/letters may ride on the base letter (OG₁⃗, eᵢ⃗) and belong under the arrow.
const VEC_BASE = "(?:[A-Z]{2,3}|[A-Za-z]|[0-9])[\u2080-\u2089\u2090-\u209C]*";
const VEC_RE = new RegExp(`(${VEC_BASE})(${PRIME})?\\u20D7(${PRIME})?`, "g");
const BAR_RE = /([A-Za-z0-9\u03B1-\u03C9])\u0304/g;
// Plain-text LaTeX-style limits such as Σ_{k=1}^{n}, lim_{n→∞} or C^{1}.
const SUB_RE = /_\{([^{}<>]{1,24})\}/g;
const SUP_RE = /\^\{([^{}<>]{1,24})\}/g;

export function mathify(html: string): string {
  // Only touch text nodes; markup and attributes (image alt, title with ">" inside) stay intact.
  let out = "";
  let last = 0;
  for (const m of html.matchAll(TAG_RE)) {
    const at = m.index ?? 0;
    if (at > last) out += mathText(html.slice(last, at));
    out += m[0];
    last = at + m[0].length;
  }
  return last < html.length ? out + mathText(html.slice(last)) : out;
}

function mathText(text: string): string {
  return text
    .replace(VEC_RE, (_m, base: string, pre: string | undefined, post: string | undefined) =>
      `<span class="vec">${base}</span>${pre || post ? "′" : ""}`)
    .replace(BAR_RE, '<span class="mbar">$1</span>')
    .replace(SUB_RE, "<sub>$1</sub>")
    .replace(SUP_RE, "<sup>$1</sup>");
}

export function renderMd(text: string): string {
  return mathify(marked.parse(text, { async: false }) as string);
}

// One-line JSON fields (note lead, answer summary, …): bold/math without the wrapping <p>.
export function renderInlineMd(text: string): string {
  return mathify(marked.parseInline(text, { async: false }) as string);
}

export function MdInline({ text, className = "" }: { text: string; className?: string }) {
  const html = useMemo(() => renderInlineMd(text), [text]);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function RawMd({ text, className = "" }: { text: string; className?: string }) {
  const html = useMemo(() => renderMd(text), [text]);
  return <div className={"md " + className} dangerouslySetInnerHTML={{ __html: html }} />;
}

// Block titles in the data sometimes carry a pictograph (vecc/01.md has a Zap emoji before its concept
// title). UI chrome uses lucide icons rather than emoji, so drop it and draw a Zap in its place.
const PICTO_RE = /\p{Extended_Pictographic}\uFE0F?/gu;

// A title is markdown like any other prose: vecc puts |a⃗ + tb⃗| in a :::fast title, so it must go
// through MdInline or the combining arrow (U+20D7) reaches the DOM as a bare mark. Callers that
// already draw their own Zap (the :::fast summary) pass allowZapIcon={false}.
function SegmentTitle({
  title,
  fallback,
  allowZapIcon = true,
}: {
  title?: string;
  fallback: string;
  allowZapIcon?: boolean;
}) {
  const zap = allowZapIcon && !!title?.includes("\u26A1");
  const text = (title ?? "").replace(PICTO_RE, "").replace(/\s+/g, " ").trim();
  return (
    <>
      {zap && <Zap aria-hidden="true" className="mr-1 inline size-4 align-[-2px]" />}
      <MdInline text={text || fallback} />
    </>
  );
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
          case "concept":
            return (
              <div key={i} className="my-5 rounded-2xl border border-amber-200 bg-amber-50/60 p-4 sm:p-5">
                <p className="mb-2 text-sm font-bold text-amber-900">
                  <SegmentTitle title={s.title} fallback="개념 정리" />
                </p>
                <RawMd text={s.body} />
              </div>
            );
          case "fast":
            return (
              <details key={i} className="my-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 px-4 py-3 open:pb-4">
                <summary className="cursor-pointer text-sm font-bold text-emerald-900">
                  <Zap aria-hidden="true" className="mr-1 inline size-4 align-[-2px]" />
                  <SegmentTitle title={s.title} fallback="빠른 풀이" allowZapIcon={false} />
                </summary>
                <RawMd text={s.body} className="mt-2" />
              </details>
            );
          default:
            return <RawMd key={i} text={s.body} />;
        }
      })}
    </div>
  );
}

# 호시약대 영어 독학 Design System

Extracted from the shipped v1 UI (Tailwind 4, slate + indigo) and tightened in the v1.1 polish pass.
Layer A: `redesign-skill` (audit-first). No Layer B brand: this is a study tool, so the reference is
"a well-made 참고서 (study book)" rather than a SaaS landing page.

## 1. Atmosphere & Identity

A calm, well-printed study book. Warm paper background, deep ink-navy type, one blue accent used
only for "the next thing to do". English exam text is set in a serif so it reads like the printed
test paper; Korean explanations are set in Pretendard so they read like a teacher's notes.
**Signature:** the *highlighter* — explanations sit on a soft amber "marker" surface, and underlined
exam segments carry a rose underline, exactly like a student's annotated past paper.

## 2. Color

All colors are Tailwind 4 palette tokens (no raw hex in components).

| Role | Token (Tailwind) | Usage |
|---|---|---|
| Surface/page | `stone-50` (#fafaf9) | page background (warm paper) |
| Surface/card | `white` | cards, quiz cards, article body |
| Surface/sunken | `stone-100` | passage box, inline code, chips at rest |
| Ink/primary | `slate-900` | headings |
| Ink/body | `slate-800` | body text |
| Ink/secondary | `slate-600` | descriptions |
| Ink/tertiary | `slate-500` | meta, captions (min for text on white: AA) |
| Line/default | `slate-200` | dividers, card borders |
| Accent | `indigo-700` / hover `indigo-800` | primary CTA background, links, active nav |
| Accent/wash | `indigo-50`, `indigo-100` | active nav pill, badges, selected filter |
| Hero/ink | `slate-900` -> `indigo-950` | hero band only |
| Marker | `amber-50` bg + `amber-200` line, title `amber-900` | explanation panel (signature) |
| Success | `emerald-50` wash, `emerald-700` ink | correct choice / verdict |
| Error | `rose-50` wash, `rose-700` ink | wrong choice / verdict; exam underline `rose-500` |

Rules: accent marks at most two actions per screen. State (correct / wrong / selected / active) is a
**wash + glyph** (Check / X icon), never a coloured border. Focus-visible ring (`indigo-500`) is the only
coloured edge.

## 3. Typography

- Sans (UI, Korean): `Pretendard Variable` (self-hosted dynamic subset via the `pretendard` package), fallback Apple SD Gothic Neo, Noto Sans KR, system-ui.
- Serif (English/Japanese exam text, class `.en`): Georgia, "Times New Roman", "Noto Serif JP".
- Numbers in scores / timers: `tabular-nums`.

| Level | Tailwind | Usage |
|---|---|---|
| Display | `text-3xl sm:text-5xl font-bold tracking-tight` | hero title |
| H1 | `text-2xl sm:text-3xl font-bold tracking-tight` | page titles |
| H2 | `text-xl font-bold` | section titles |
| H3 | `text-base font-semibold` | card titles |
| Body | `text-[15.5px] leading-relaxed` (`.md`) | explanations |
| Exam | `.en text-[16.5px]` | prompts, passages |
| Small | `text-sm` | descriptions, controls |
| Caption | `text-xs` | meta |

`word-break: keep-all` for Korean everywhere prose renders; `text-wrap: balance` on headings.

## 4. Spacing & Layout

Tailwind 4px scale. Container `max-w-6xl px-4`; article pages `max-w-3xl` (reading width ~65ch).
Card padding `p-5 sm:p-6`; stack gaps `gap-3` (dense lists) / `space-y-6` (sections).
Breakpoints: Tailwind defaults; nav collapses below `lg`. Every screen must reflow to one column at
390px with no horizontal page scroll (tables scroll inside their own box).

## 5. Components (src/components)

### Icon
lucide-react, `size-4`/`size-5`, `strokeWidth 2`, `aria-hidden`. Replaces all emoji in UI chrome.

### PageTitle
kicker (accent, text-sm semibold) + H1 + lead paragraph (slate-600, max-w-3xl).

### Card (link card)
`rounded-2xl bg-white border border-slate-200 p-5 shadow-sm`; hover: `shadow-md -translate-y-0.5`
(transform only); focus-visible ring. Optional badge (indigo wash pill) and progress meter.

### Button
- primary: `bg-indigo-700 text-white hover:bg-indigo-800 active:translate-y-px`
- secondary: `bg-white border border-slate-200 hover:bg-stone-100`
- ghost/link: `text-indigo-700 underline-offset-4 hover:underline`
- segmented (tabs/toggles): container `bg-stone-100 p-1 rounded-xl`, selected item `bg-white shadow-sm text-slate-900`, rest `text-slate-600`.
All: `rounded-xl`, min height 40px (touch), `transition`, focus-visible ring.

### QuizCard
Number chip (`bg-slate-900 text-white`), serif prompt, 1-2 column choices.
Choice states: rest `border-slate-200 bg-white hover:bg-stone-50`; correct `bg-emerald-50 text-emerald-900` + Check icon;
picked-wrong `bg-rose-50 text-rose-900` + X icon; others `opacity-55`. Border stays `slate-200` in every state.
Verdict row: icon + text (no emoji). Explanation = Marker panel.

### Marker panel (signature)
`rounded-xl bg-amber-50 border border-amber-200 p-4 sm:p-5`, header row with Lightbulb icon "해설".

### Meter
`h-2 rounded-full bg-stone-200` with `bg-emerald-500` fill; label `text-xs tabular-nums`.

### SectionNav (paper page)
Desktop: sticky left rail, active section = indigo wash pill (IntersectionObserver). Mobile: sticky
horizontal chip strip under the header (scrolls horizontally inside itself).

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
|---|---|---|---|
| Micro | 150ms | ease-out | button press, hover wash |
| Standard | 200ms | ease-out | card lift, explanation reveal (opacity + translateY 4px) |
| Spring morph | 320ms | `cubic-bezier(0.22, 1, 0.36, 1)` | sentence train step-play, active/passive swap, blank slot fill, timeline glide |

Only `transform` and `opacity` animate. `prefers-reduced-motion: reduce` collapses all positional/scale transitions to instant or opacity-only crossfades while keeping active state highlights intact.

### Visual Explanation Primitives (`VisualBlocks`, `GrammarLab`, `ExplanationView`)
- **GrammarLab**: Per-lesson interactive SVG/motion simulator at the top of each lesson (`g01`–`g27`) with step-play and state toggles (`aria-pressed`).
- **Sentence Train (`:::train`)**: Role-colored cars (`주어` sky, `동사` indigo, `목적어` emerald, `보어` amber, `수식어` stone) with coupler arrows and a step-by-step play mode.
- **Transform Motion (`:::transform`)**: Interactive Before ↔ After state switcher highlighting moved/morphed tokens.
- **O / X Comparison (`:::vs`)**: Side-by-side wrong (`rose-50` + X) vs right (`emerald-50` + Check) visual cards.
- **ExplanationView**: Parses quiz/paper explanations into an animated blank-fill prompt bar, sentence-skeleton chips, translation card, wrong-choice elimination grid, and formula stamp.

## 7. Depth & Surface

Strategy: **borders + one soft shadow**. Cards: `border-slate-200 shadow-sm`; hover `shadow-md`.
Sticky header: `bg-white/85 backdrop-blur` + bottom border.
Radius: chips `rounded-full`, controls `rounded-xl`, cards `rounded-2xl`, hero `rounded-3xl`.

## 8. Accessibility Constraints & Accepted Debt

- WCAG 2.2 AA: body text >= 4.5:1 (slate-500 is the lightest text on white/stone-50), focus-visible on
  every interactive element, `lang="ja"`/English serif marked, `aria-pressed` on toggles, `aria-current`
  on active nav, skip link to main.
- Quiz choices are real `<button>`s; verdict region is `aria-live="polite"`.

| Debt | Location | Why accepted | Exit |
|---|---|---|---|
| No dark mode | global | study content tested only in light; low value for v1.1 | add when a user asks |
| Single 1.1 MB JS bundle | build | all content is bundled data | route-level code splitting of `data/` |

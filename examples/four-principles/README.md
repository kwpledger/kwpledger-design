# Four Principles for Responsible AI Use

Built against [`docs/infographic-design-system.md`](../../docs/infographic-design-system.md).
A handout for Kevin's session at The Learning Guild's *AI & Learning Design Online
Conference*, 27 August 2026 — "Use AI Effectively & Safely in High-Risk Environments."

| | |
| :-- | :-- |
| Layout | **A — stack**, 4 rows (§6A) |
| Register | **Light** (§4.2). Same register as `policy-to-practice`; the series stays in it. |
| Slots | `--data-1` … `--data-4`, in order (§4.3) |
| Card mode | Neutral (§4.4) — chip carries the tint |
| Word count | **132** (§7.4 budget 120–180) |
| Exports | `four-principles.jpg` 1080×1350 q92 · `four-principles-letter.pdf` US Letter |

## Rendering it

`index.html` is the source. Open it in a browser and screenshot the `.canvas`
element at a 1× device pixel ratio, or drive headless Chromium to do the same.
No renderer ships in this repo on purpose — `tools/` holds the verifier and the
math it needs, and stays that size.

Both exports came from that one file, via the Chrome DevTools Protocol:
`Page.captureScreenshot` with `clip {0,0,1080,1350}` at scale 1 for the JPG, and
`Page.printToPDF` at `scale 0.66` on 8.5×11in paper with 0.53in side and 0.84in
top/bottom margins for the handout. Chrome's `--screenshot` flag is **not** usable
here: its viewport comes out 87px shorter than `--window-size`, which silently
crops the footer mark.

The two `@font-face` rules point at `../../fonts/`, and the footer mark at
`../../logos/logo_long.svg`. Both are relative, so the file only renders
correctly from inside this directory.

## Preflight (§9)

Measured in the render, not estimated:

- Canvas 1080×1350, `scrollHeight − height = 0`. Nothing overflows.
- No text read as a sentence below 23px. `ASK`, the chips, the eyebrow and the
  footer line are the only step--1 elements.
- Slots 1–4, in order, no gaps, no repeats. No status colors anywhere.
- Grayscale: every module still identified by its `PRINCIPLE n` chip.
- Squint at 400px wide: headline and the count of four both survive.
- Module rows all 191px, detail columns all 128px — nothing wraps unevenly.
- Letter PDF is one page, content bbox 7.45×9.34in, margins 0.53/0.52/0.83/0.83in.
  Both faces are vector: Lora as subset TrueType (Type0), Hanken Grotesk as Type3
  glyph procedures — Chrome converts variable-font instances that way. The Type3
  procs are pure path operators (`m`/`l`/`c`/`h`/`f`), no bitmap glyphs, so they
  print at printer resolution. **There are no rasters on the page at all** — the
  signature mark used to be a 525×300 PNG placed at 1.33×0.76in (396 dpi) and is
  now `logo_long.svg`. The PDF carries zero image XObjects, down from two.
- **Printed and confirmed** on an HP Color LaserJet MFP M477fdw, 2026-08-21. The
  pastel slot tints hold and the Type3 body type renders clean, so that question
  is settled empirically, not just structurally.

## Declared deviations

**Horizontal internals at 4 modules.** §5.2 prescribes the 300px chip-and-title
column at 6–7 modules. Used here at 4. Stacked internals cannot hold this module
shape: chip, title, two body lines, and a ruled question line come to ~167px
against the 153px interior of a 193px card. Horizontal internals fit the same
content in 128px. The alternative was cutting the key question, which is the one
element on the canvas a reader is meant to leave with.

**The `ask` row is a new module internal.** A hairline `--border` rule, an `ASK`
label at step--1 in `--data-n-fg`, and the question at step-0 in `--fg` 600.
Additive, uses only shipped tokens, and does not redefine anything in §5.2. It
exists because each principle's payload *is* a question — the précis is built that
way, and burying it in a bullet throws away the structure.

**A second export at a size the spec does not cover.** §0 fixes the canvas at
1080×1350 and scopes the format to LinkedIn and YouTube. This graphic is also a
printed handout, so it ships a US Letter PDF alongside the feed JPG. It is the
same canvas at the same proportions, scaled to fit and centered — not a second
layout. The only change it required in `index.html` is one `@media print` rule
whitening the `#555` viewing backdrop, which was never part of the graphic.

**The footer places the long mark alone, with no typeset `kwp` beside it.**
Following `policy-to-practice`, which declared the same thing: the long mark *is*
the full signature and reads `kwpledger`, so setting `kwp` next to it says the
name twice. Still worth resolving in §5.8 itself rather than per-graphic.

## Content sourcing

The four criteria — human-owned, source-grounded, verifiable, traceable — are
Kevin's, from the governance process in the talk. The long-form précis was drafted
in ChatGPT; everything on the canvas is a condensation of it, cut to the §7.4
budget. The graphic claims the four as his working model, not as an industry
standard, and names no framework it is not entitled to name.

Each module is a fixed shape: a statement of what the human does, a one-line
corrective, and the key question. The correctives are the half that does the real
work — "grounding cuts fabrication, not risk" and "sounding reasonable is not
checking" are both in the source précis and are both the point.

The eyebrow names the tension rather than the audience (§5.1). "When being wrong
is expensive" is the plain-English form of "high-risk environments," and §7.5
prefers the concrete one.

No event name or date appears on the canvas. That is deliberate — dating it would
retire the graphic the day after the talk, and it is reusable as a feed post as is.

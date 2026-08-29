# Self-quote card — template

Built against [`docs/quote-post-design-system.md`](../../docs/quote-post-design-system.md).
This is the **reference implementation and the working template**: copy the directory, swap the
two `REPLACE ME` blocks, set the tier class, re-render.

| | |
| :-- | :-- |
| Canvas | **1400×1000**, 7:5 (§0.1) |
| Register | **Dark** (§3) |
| Tier | `t-xl` — 20 words (§2.2) |
| Badge | `kwp_logo_short_inverted_teal.png`, 104px tall, bottom right (§4) |
| Exports | `self-quote.jpg` 1400×1000 q92 |

## Using it

Two things to change, both marked `REPLACE ME` in `index.html`:

1. **The quote.** Count the words, then set the tier class on the `blockquote` to match:

   | Words | Class |
   | :-- | :-- |
   | ≤ 20 | `t-xl` |
   | 21 – 35 | `t-l` |
   | 36 – 55 | `t-m` |
   | 56 – 70 | `t-s` |

   Nothing auto-fits. That is deliberate — an auto-fitter would silently take a 90-word quote
   down to unreadable rather than telling you the quote is too long.

2. **The context line** under the name — the talk or piece the line came from. Not a date (§2.3).

Leave everything else alone. The margins, the 598px quote zone and the 104px attribution band
are a budget, not preferences (§1).

## Rendering it

`index.html` is the source. Open it in a browser and screenshot the `.canvas` element at a 1×
device pixel ratio, or drive headless Chromium to do the same. No renderer ships in this repo on
purpose — `tools/` holds the verifier and the math it needs, and stays that size.

`self-quote.jpg` came from that one file via Playwright's element screenshot at
`deviceScaleFactor: 1`, `type: 'jpeg'`, `quality: 92`.

The two `@font-face` rules point at `../../fonts/` and the badge at `../../logos/`. Both are
relative, so **the file only renders correctly from inside this directory.** Rendered from a
copy elsewhere, the badge silently becomes alt text on a dark background — which is exactly why
preflight item 5 checks `naturalWidth > 0` rather than trusting the eye.

## Preflight (§6)

Measured in the render, not estimated:

- Canvas 1400×1000, `scrollHeight − height = 0`. Nothing overflows.
- Quote at `t-xl`/20 words: 5 lines, 419px of text in the 598px zone, 89px clear above the mark
  and 127px clear below to the rule.
- All four tiers checked at their upper word bound — 20/35/55/70 — none clash. The tightest is
  `t-m` at 55 words: 7 lines, 446px, 76px clear above and 113px below. 81 words at `t-s` still
  clears with 76px and 114px, which is where the "editorial, not geometric" claim in §2.2
  comes from.
- Both faces report `loaded`. Badge `naturalWidth` 248, placed at 104px tall / 86.3px wide,
  flush to the 70px right and bottom margins.
- Badge ring is `--accent`, measured 8.31:1 against the canvas and 0.091 chroma — legible, and
  at the ceiling rather than over it (§4.2).
- Nothing read as a sentence below 30px (§2.1). The two attribution lines are 36px and 30px.
- No categorical or status colors anywhere. `--accent` used in exactly two places — the
  opening mark and the badge ring — and nowhere else.
- No element computes to a non-normal `font-style` — nothing is italic, synthesized or otherwise.
- Grayscale: nothing lost — no distinction on this canvas is carried by color.

## Declared deviations

**The type ladder is not the infographic's.** Sizes are scaled by 1400/1080 so they land at the
same on-screen size in a feed. Reasoning and the arithmetic are in §2.1. This is not a new scale
— it is the same scale read at the right canvas width, which is what the infographic's own §3.2
implies but does not generalize.

**A 2px rule where other formats use 1px.** Same reason: 1px at 1400 canvas width is 0.40 screen
px. The infographic's §2.1 sets the principle; this applies it (§3.1).

**The badge is placed by height with `width: auto`.** `logos/PROVENANCE.md` forbids depending on
the marks' current geometry while Kevin reworks them. Height-only sizing is how this layout
survives that.

**The canvas uses `--surface`, not `--surface-card`.** The infographic's move #1 is "a frame,
not a bleed," and this card bleeds. A quote card is one object already; framing an object that
has no internal modules just insets it for no reason. The 2px rule above the attribution is the
only division on the canvas.

## The ring is not the format's default, and that is deliberate

The infographic format's §5.8 sends a dark canvas to the **navy** ring. This card does not, and
the reason is measured rather than aesthetic: navy is 1.30:1 against `#0a1420` and renders as a
~1.6px stroke at badge size, so it is not a subtle ring, it is an absent one. On a light canvas
the same default is correct.

Every other shipped ring is either invisible too (deep blue, 1.24:1) or 1.3×–2.6× over the 0.091
chroma ceiling, and three of those borrow a status hue — red sits exactly on danger at h27. The
brand accent is the only ring that is legible here *and* inside the system, at 8.31:1 and 0.091.

`logos/kwp_logo_short_inverted_teal.png` is a **ring-only recolor** of the navy file: same
dimensions, alpha channel byte-identical, zero glyph pixels changed, 3,075 ring pixels remapped.
Full note and the open question it raises — whether teal may stand for the parent identity — are
in [`logos/PROVENANCE.md`](../../logos/PROVENANCE.md) under *Derived variants*.

## Content sourcing

The quote is Kevin's, from his first presentation — *Use AI Effectively & Safely in High-Risk
Environments*, The Learning Guild, 27 August 2026. Supplied by him directly, verbatim:

> ‘Regulations’ describe the constraints and what you must do. ‘Risk’ describes the consequences
> and tells you why the regulations matter.

**The single quotation marks around the two terms are his and are kept.** They read as nested
inside the card's own quotation, which is exactly what they are — the large opening mark is the
outer level. Promoting them to double quotes would put two visible sets of double marks on one
card and look like an error.

The talk name in the context line is inferred from the date in
[`examples/four-principles/README.md`](../four-principles/README.md), not separately confirmed.
It is the one thing on this canvas nobody has verified.

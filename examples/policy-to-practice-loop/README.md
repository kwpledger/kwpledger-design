# From AI Policy to AI Practice — with the feedback loop

Version 2 of [`../policy-to-practice/`](../policy-to-practice/). Same seven layers,
same claim, plus the thing v1 left out: **evidence feeds back and refines the
principle.** Built to Kevin's marked-up print of v1.

`../policy-to-practice/` stays as it is. It is merged, printed, and still correct
as a graphic — it just makes a smaller claim. This is an addition, not a
replacement, and which one ships is Kevin's call.

| | |
| :-- | :-- |
| Layout | **A.2 — stack with a return path**, 7 rows (§6A.2) |
| Register | **Light** (§4.2), same as the rest of the series |
| Slots | `--data-1` … `--data-7`, in order (§4.3) |
| Card mode | Neutral (§4.4) — chip carries the tint |
| Reading direction | **Top-down** (§6A.2): layer 1 at top, arc runs bottom → top, arrowhead into layer 1 |
| Word count | **131** (§7.4 budget 120–180) |
| Exports | `policy-to-practice-loop.jpg` 1080×1350 q92 · `policy-to-practice-loop-letter.pdf` US Letter |

## What changed from v1

**The return path.** A 150px right-hand channel carrying one labelled arc from
layer 7 back into layer 1 (§5.6). The stack narrows from 980px to 810px; row
heights are unchanged, exactly as §5.6 says they should be.

Direction is **top-down**, the §6A.2 default: layer 1 stays at the top and the arc
climbs. This is the inverse of the ladder of inference, which is canonically drawn
bottom-up with its loop running back down — a different claim, and worth not
confusing with this one. Governance runs the other way: the artefact at the bottom
is what revises the abstraction at the top.

**Notes now run two lines.** v1 gave each layer one line and came in at 109 words,
under the §7.4 floor of 120 — declared there as a deviation. The second line
retires that deviation rather than restating it: 131 words, inside the budget.

**The footer mark is `logo_long.svg`,** the true vector from the 2026-08-30 rework,
per the current §5.8 table. v1 predates it and still points at the superseded
`kwp_logo_long.png`. One consequence worth knowing: **this PDF contains zero raster
images.** v1's letter PDF carries the signature as a 525×300 PNG at 396 dpi — fine
in practice, but this one has nothing to be fine about.

**Layer 7's note carries the loop's meaning** — "and what it should change." §5.6
requires the arc's explanation to live in the subhead or in the body line of the
module it leaves from, because the channel is too narrow for a sentence.

## Rendering it

`index.html` is the source. Open it in a browser and screenshot the `.canvas`
element at a 1× device pixel ratio, or drive headless Chromium to do the same.
No renderer ships in this repo on purpose.

Both exports come from that one file over the DevTools Protocol:
`Page.captureScreenshot` with `clip {0,0,1080,1350}` at scale 1 for the JPG, and
`Page.printToPDF` at `scale 0.66` on 8.5×11in paper with 0.53in side and 0.84in
top/bottom margins — matching `../four-principles/` and `../policy-to-practice/`
so the three print as a set. Chrome's `--screenshot` flag is **not** usable: its
viewport comes out 87px shorter than `--window-size`, silently cropping the footer.

## Preflight (§9)

Measured in the render, not estimated:

- Canvas 1080×1350, `scrollHeight − height = 0`. Nothing overflows.
- Stack measures **810px**, channel **150px** — §5.6 geometry exactly.
- All seven notes wrap to **exactly two lines**. Parallel, no ragged row.
- No text read as a sentence below 23px.
- Slots 1–7 in order, no gaps or repeats. No status colors anywhere.
- Grayscale: every layer still identified by its `LAYER n` chip, and the arc plus
  its label both survive.
- 400px squint: headline, the count of seven, and the loop all still read.
- Letter PDF one page, content bbox 7.45×9.34in, margins 0.53/0.52/0.83/0.83in,
  **zero raster images**. Lora embeds as subset TrueType; Hanken Grotesk becomes
  Type3 glyph procedures (Chrome does this to variable-font instances) whose
  CharProcs are pure path operators. Both vector.

## Arc geometry, as built

§5.6 gives the path for a 150×833 channel. The real body zone here measures **823**,
so the numbers are re-derived from the render rather than copied:

```
viewBox 0 0 150 823
arc    M 0 773 C 112 773, 112 50, 10 50     layer 7 centre → layer 1 centre
head   M 18 41 L 0 50 L 18 59 Z             solid, --data-1-border
```

Layer centres measured at y = 50, 171, 291, 411, 532, 652, 773.

## Declared deviations

**The arrowhead is 18px, not the 14px in the §5.6 example.** At 14px in
`--data-1-border` — a pale pink by design — it did not survive the 400px squint,
and the arc is one of the things this graphic is claiming. Colour is unchanged and
still follows §5.5. The §5.6 snippet reads as illustrative geometry rather than a
fixed size; if that is wrong, this is the line to change.

**The footer places the long mark alone**, no typeset `kwp` beside it — following
the precedent `../policy-to-practice/` set. Still worth resolving in §5.8 itself.

## One note for the spec, not fixed here

§5.6 says the 810px module splits into "a 280px chip-and-title column, 20px gap,
a 510px body column." Those sum to 810, which is the module's **outer** width —
it leaves nothing for the card's own `20px` padding either side or its `2px`
borders. The real body column measures **466px**. The layout is fine and the 280px
figure is right; only the 510 is. Flagging rather than editing: §5.6 is not a
guest's to change.

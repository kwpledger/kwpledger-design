# From AI Policy to AI Practice

The first graphic built against [`docs/infographic-design-system.md`](../../docs/infographic-design-system.md).

| | |
| :-- | :-- |
| Layout | **A — stack**, 7 rows (§6A) |
| Register | **Light** (§4.2). The series stays in this register. |
| Slots | `--data-1` … `--data-7`, in order (§4.3) |
| Card mode | Neutral (§4.4) — chip carries the tint |
| Word count | **109** |
| Exports | `policy-to-practice.jpg` 1080×1350 q92 · `policy-to-practice-letter.pdf` US Letter |

## Rendering it

`index.html` is the source. Open it in a browser and screenshot the `.canvas`
element at a 1×device pixel ratio, or drive headless Chromium to do the same.
No renderer ships in this repo on purpose — `tools/` holds the verifier and the
math it needs, and stays that size.

The two `@font-face` rules point at `../../fonts/`, and the footer mark at
`../../logos/logo_long.svg`. Both are relative, so the file only renders
correctly from inside this directory.

## The letter PDF

Added later, for use as a printed handout alongside the feed export. Same canvas at
the same proportions, scaled to fit and centered on 8.5×11in — not a second layout,
and the JPG is unchanged. Produced from this same `index.html` via Chrome's
`Page.printToPDF` at `scale 0.66` with 0.53in side and 0.84in top/bottom margins,
matching `../four-principles/`.

It required one additive line in `index.html`: an `@media print` rule whitening the
`#555` viewing backdrop, which was never part of the graphic. Nothing else changed.

**Printed and confirmed** on an HP Color LaserJet MFP M477fdw, 2026-08-21. All seven
slot tints hold on paper — this is the denser of the two graphics and the harder test.

§0 of the spec fixes the canvas at 1080×1350 and scopes the format to LinkedIn and
YouTube, so a letter-size export is outside what it covers. Declared here rather
than assumed.

## Declared deviations

**Word count is 109, against the §7.4 budget of 120–180.** Not an oversight.
Seven rows leave 96px of interior height per card, which fits a chip, a title,
and exactly one body line. There is no room for a second, and padding the copy
to reach a floor would be writing to fill space. The §7.4 hard cap of 200 is the
end that protects the design; the floor is guidance about doing too little, and
seven layers at one line each is not doing too little. Approved before the build.

**The footer places the long mark alone, with no typeset `kwp` beside it.**
The §5.8 diagram shows `[mark]  kwp`, but `logos/PROVENANCE.md` records that the
long mark *is* the full signature and reads `kwpledger`. Setting `kwp` next to it
says the name twice. Worth resolving in §5.8 itself rather than per-graphic.

## Content sourcing

The layer names are the model, not a citable standard. Principle → Policy →
Standard is the conventional governance document hierarchy; Workflow → Tool
behavior → User action → Evidence is Kevin's extension of it, and the graphic
claims it as such rather than dressing it as an industry framework.

The subhead is deliberately first person. "Most organizations stop at layer
three" would be a stronger line and is not a claim the evidence supports.

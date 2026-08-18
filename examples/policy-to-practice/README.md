# From AI Policy to AI Practice

The first graphic built against [`docs/infographic-design-system.md`](../../docs/infographic-design-system.md).

| | |
| :-- | :-- |
| Layout | **A — stack**, 7 rows (§6A) |
| Register | **Light** (§4.2). The series stays in this register. |
| Slots | `--data-1` … `--data-7`, in order (§4.3) |
| Card mode | Neutral (§4.4) — chip carries the tint |
| Word count | **109** |
| Export | `policy-to-practice.jpg`, 1080×1350, quality 92 |

## Rendering it

`index.html` is the source. Open it in a browser and screenshot the `.canvas`
element at a 1×device pixel ratio, or drive headless Chromium to do the same.
No renderer ships in this repo on purpose — `tools/` holds the verifier and the
math it needs, and stays that size.

The two `@font-face` rules point at `../../fonts/`, and the footer mark at
`../../logos/kwp_logo_long.png`. Both are relative, so the file only renders
correctly from inside this directory.

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

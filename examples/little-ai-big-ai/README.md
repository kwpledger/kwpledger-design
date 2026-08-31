# Little AI vs. Big AI

Built against [`docs/infographic-design-system.md`](../../docs/infographic-design-system.md).
Replaces a PowerPoint slide screenshot Kevin had been reusing — same distinction,
rebuilt in the kwp system so it stops looking like a screenshot of something else.

| | |
| :-- | :-- |
| Layout | **Two-column peer comparison** — not one of the three in §6. Declared below. |
| Register | **Light** (§4.2). Same register as `policy-to-practice` and `four-principles`; the series stays in it. |
| Slots | `--data-1`, `--data-2`, in order (§4.3) |
| Card mode | Neutral (§4.4) — chip carries the tint |
| Word count | **139** (§7.4 budget 120–180) |
| Exports | `little-ai-big-ai.jpg` 1080×1350 q92 · `little-ai-big-ai-letter.pdf` US Letter |

## Rendering it

`index.html` is the source. Open it in a browser and screenshot the `.canvas`
element at a 1× device pixel ratio, or drive headless Chromium to do the same.
No renderer ships in this repo on purpose — `tools/` holds the verifier and the
math it needs, and stays that size.

Both exports came from that one file: a 1080×1350 clipped screenshot at scale 1
for the JPG, and a print-to-PDF at `scale 0.66` on 8.5×11in paper with 0.53in
side and 0.84in top/bottom margins, matching `../four-principles/`.

The two `@font-face` rules point at `../../fonts/`, and the footer mark at
`../../logos/logo_long.svg`. Both are relative, so the file only renders
correctly from inside this directory.

## Preflight (§9)

Measured in the render, not estimated:

- Canvas 1080×1350, `scrollHeight − height = 0` and `scrollWidth − width = 0`.
  Nothing overflows. Exported JPG confirmed at exactly 1080×1350.
- Word count 139, counted from the markup with tags stripped.
- No text read as a sentence below 23px. The chips, the eyebrow, the three
  section labels and the footer line are the only step--1 elements.
- Slots 1–2, in order, no gaps, no repeats. No status colors anywhere — see below.
- Grayscale: both modules still identified by their `TYPE A` / `TYPE B` chip and their title,
  and the two `SAME INPUT` answers differ in words, not only in tint.
- Squint at 400px wide: the headline and the two-column shape both survive.
- Both cards render at exactly 630.8px, and all eight bullets wrap to exactly two
  lines — the columns align row-for-row, which is the whole point of the format.
- Letter PDF is one page, `/MediaBox [0 0 612 792]`, **zero image XObjects** —
  the signature mark is `logo_long.svg` and stays vector.
- `npm run verify` passes. No token was touched.

## Declared deviations

**Two modules, against the §2.4 practical minimum of four.** The largest
deviation here and the one that needs the argument. §2.4's floor exists because
a stack of three modules is doing less work than a well-set text post. That
reasoning is about a *stack* — a list of peers where the reader's job is to
absorb items. This graphic is not a list. Its job is to hold two things in
visual parallel so the reader compares them row for row, which is the one thing
a text post cannot do. The countable spine is **two**, and the count is in the
headline, so §7.2's requirement is met even though the number is below the
range §2.4 contemplates. The binding ceiling — eight, set by the categorical
scale — is untouched.

**Layout is a two-column peer comparison, not §6 A, B, or C.** A stack would
put Little AI above Big AI, and vertical order on a stack reads as sequence or
rank. Neither is true here. §5.4 already describes a two-column comparison block,
but scopes it to `--success`/`--danger` for do/don't and right/wrong. That is
exactly wrong for this content: these are peer categories, not outcomes, and
§4.6 forbids spending status hues on module identity. So the columns take
categorical slots 1 and 2 and the comparison-block geometry, which is the
combination §6 does not currently name. Additive; no shipped token redefined.

**Chips read `TYPE A` / `TYPE B`, not the `STEP n` form §5.2 shows.** Within
the letter of the rule — an ordinal, one word plus a letter, well under the
three-word cap — but worth recording how it got here, because two other
pairings were tried and rejected and the reasons generalize.

`KIND 1` / `KIND 2` was first. Correct and inert, and it reads as Thing 1 and
Thing 2 to anyone who has been near a Dr. Seuss book.

`TRADITIONAL` / `MODERN` was second, and it is the instructive failure. It made
the chip carry meaning, which felt like an upgrade, but the meaning it carried
was chronology, and chronology reads as progress: *traditional* becomes the one
you should be moving off. That is not the claim. Part of the argument this
graphic supports is that lower-tech is sometimes the better tech — a
deterministic system you can audit beats a probabilistic one you cannot, for
plenty of real tasks — and a chip implying otherwise argues against its own
canvas.

`TYPE 1` / `TYPE 2` was considered and rejected outright. "Type 1 and Type 2
processing" are the terms of art in dual-process theory, and they map backwards
onto this content: Type 1 processing is fast, associative and non-symbolic,
which is Big AI, while Type 2 is slow and rule-following, which is Little AI.
A reader who knows that literature reads the chips inverted. Type I / Type II
error is separately live vocabulary for a risk-and-safety audience. Letters
carry no such freight.

The conclusion worth keeping: **a neutral chip is correct in this layout, not a
missed opportunity.** The chip sits directly above the module name, and the
kicker one line below it — "Rules-based and deterministic" — already carries the
meaning. A chip that also carries meaning competes with the line beneath it.
This is what §5.2's ordinal rule is protecting, and it holds even where the
ordinal is a letter rather than a number.

**The `tell` row is a new module internal.** A hairline `--border` rule, a
`SAME INPUT` label at step--1 in `--data-n-fg`, and the answer at step-0 600 in
`--fg`. It exists because the sharpest form of this distinction is one question
asked identically of both columns and answered differently — "same output, every
time" against "potentially a different output." Structurally the same move as
`../four-principles/`'s `ask` row, and declared on the same grounds.

**A closing `note` band below the two columns.** A full-width normal card with a
`WHY IT MATTERS` label in `--accent`. §4.6 explicitly sanctions this shape —
"neutral informational callouts are `--accent` on a normal card" — but §2.3's
vertical budget has no zone for it, so it is declared. Its body sits at step-1
rather than step-0 to keep the measure near the §3.3 subhead guidance of ~70
characters; at step-0 across 920px it would run to ~85 and violate the body
measure.

**No `--accent` phrase in the headline.** §3.4 offers colored emphasis on a word
or short phrase as a focal point, and both prior graphics in this series use it.
Skipped deliberately: accenting either "Little AI" or "Big AI" would say one
side of a peer comparison matters more, which is the opposite of the claim. The
headline is one line at step-5 and does not need the help.

**The footer places the long mark alone, with no typeset `kwp` beside it.**
Following both prior examples, which declared the same thing: the long mark *is*
the full signature and reads `kwpledger`, so setting `kwp` next to it says the
name twice. Still worth resolving in §5.8 itself rather than per-graphic.

**A second export at a size the spec does not cover.** §0 fixes the canvas at
1080×1350 and scopes the format to LinkedIn and YouTube. The Letter PDF follows
the convention of the other two examples in this directory. Same canvas at the
same proportions, scaled to fit and centered — not a second layout. It needs the
one `@media print` rule whitening the `#555` viewing backdrop, which was never
part of the graphic.

## Content sourcing

The two-kinds distinction and all four examples are Kevin's, from the "AI Gap
Analysis for Improved Workflow" talk at the EFCOG TWG Annual Conference. The
source slide carried nine bullets across the two columns at three levels of
nesting; this is cut to the §7.4 budget, which meant two claims and two examples
per side and dropping the third and fourth examples on each.

Parallel structure is enforced harder than the source slide did (§7.3): both
columns run chip, title, kicker, two claims, the `SAME INPUT` answer, two
examples — and every one of the eight bullets is written to wrap to exactly two
lines. The source slide's Little AI column had four examples to Big AI's four
but at uneven lengths, which is what made it read as a wall.

The kickers are the source slide's own subheadings, tightened: "Rule-based
automated responses" became "Rules-based and deterministic" and "Neural networks
& large language models" became "Generative and probabilistic." The original
pair named the *implementation*; the replacement names the *behavior*, which is
the thing that decides how you have to govern it and the thing the closing band
is about.

`Claude` and `Power Automate` appear as named products because §7.5 prefers the
concrete. `ChatGPT or Claude` was cut to `Claude` alone for the word budget; the
choice between them is arbitrary and either could be swapped without touching
the layout.

The eyebrow names the tension rather than the topic (§5.1). "Know which one
you're using" is the practical stake — the closing band is what happens if you
don't.

No event name, date, or conference appears on the canvas. Same reasoning as
`../four-principles/`: dating it would retire the graphic the day after the talk.

## Note on aspect ratio

The graphic being replaced was a 16:9 PowerPoint slide. This is 1080×1350 (4:5),
because that is what §0 fixes the format at and what the rest of the series is.
It works as a feed post and as the Letter handout. Dropped into a 16:9 deck it
will letterbox with wide bars either side. A 16:9 slide variant would be a new
format outside §0, not a resize of this one — the vertical budget in §2.3 is the
whole design — so it is not assumed here.

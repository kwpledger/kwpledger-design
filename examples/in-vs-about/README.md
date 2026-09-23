# Information in vs. about the material

Built against [`docs/infographic-design-system.md`](../../docs/infographic-design-system.md).
The figure for the course-review case study on kwpledger.com (KWP-1b there): the
distinction the whole project turned on, drawn as the three lanes the work
actually ran in. Kevin approved the copy on 2026-09-23.

| | |
| :-- | :-- |
| Layout | **Stack of three, plus a closing note** — declared below |
| Register | **Light** (§4.2), same as the rest of the series |
| Slots | `--data-1`, `--data-2`, `--data-3`, in order (§4.3) |
| Card mode | Neutral (§4.4) — chip carries the tint |
| Word count | **132** (§7.4 budget 120–180) |
| Mark | `logo_long_ring_teal.svg` — the §5.8 default. The older examples still carry the bare `logo_long.svg`, which §5.8 calls stale |
| Exports | `in-vs-about.jpg` 1080×1350 q92 |

## Declared deviation: three modules

§2.4 calls four the practical minimum. This has three because the work ran in
three lanes and no more; a fourth would be invented to fill the count. The
closing note carries the weight a fourth module would, the same way
`little-ai-big-ai` pairs two cards with a *Why it matters* panel.

The module internals reuse `four-principles` exactly: chip and title on the
left, a line, a muted qualifier, and a labeled takeaway row. `ASK` becomes
`GOES TO`, because each lane's takeaway is a destination, not a question.

**The model is named generically on purpose.** Lane 2 says "a frontier model",
not a product. Kevin's call: the distinction generalizes past any one tool.

## Preflight (§9)

Measured in the render, not estimated:

- Canvas 1080×1350, overflow 0 on both axes. Export confirmed at 1080×1350.
- Word count 132, counted from the markup with tags stripped.
- Smallest reading text 23px. Chips, eyebrow, `GOES TO` tags, the note's tag
  and the footer line are the only step--1 elements.
- Slots 1–3 in order. No status colors.
- Grayscale: every lane still identified by its `LANE n` chip and title.
- Titles are parallel noun phrases. One accent phrase in the headline.
- Lora and Hanken Grotesk both loaded from `../../fonts/`.

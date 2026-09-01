# Read this before every banner.

The kwp LinkedIn banner format — a **1584×396 (4:1)** profile header carrying one message and
nothing else.

This is a **layer-3 consumer** of [the kwp design system](SPEC.md), and a sibling of
[the infographic format](infographic-design-system.md) and
[the quote-post format](quote-post-design-system.md). It defines nothing new about color, type,
or spacing; it decides how those settled values sit on a canvas whose defining problem is that
**part of it is covered up.** Where this document and [SPEC.md](SPEC.md) disagree, SPEC.md wins.

Hex is copied from [PALETTE.md](PALETTE.md) so this file can be pasted into a tool that cannot
take a dependency. Values are correct as of the tokens at this commit.

Reference implementation: [`examples/linkedin-banner/`](../examples/linkedin-banner/).

---

## 0. Scope

**One message, on a profile header that is partly occluded and gets cropped.** No modules, no
bullets, no count, no photograph. If the content has a spine you could number, it is an
infographic. If it is a sentence someone said, it is a quote card.

### 0.1 Why 1584×396

1584×396 is LinkedIn's recommended profile background size and is exactly 4:1. Unlike the quote
card's 7:5 — chosen for internal math because resampling was unavoidable anyway — **this size is
native.** Upload at exactly 1584×396 and no resampling happens at all. There is no reason to
pick anything else, and every reason not to.

396px of height is the real constraint. It is less than half the quote card's working area and
about a quarter of the infographic's, which is why the type ladder below is short and why the
copy budgets are severe.

**Square corners.** Do not round the canvas. LinkedIn applies its own treatment.

---

## 1. The horizontal budget

The quote card's binding axis is vertical. **This format's is horizontal**, because the left of
the canvas is not yours.

| Zone | Width | Contents |
| :-- | :-- | :-- |
| **Reserve** | **528** | Nothing. See §1.1. |
| Text block | 793 | Eyebrow, title, subtitle, meta |
| Gap | 48 | |
| Mark | 167 | `logo_long_inv.svg` at 96px tall |
| Right margin | 48 | |

Vertically: 48px top and bottom margins leave a **300px content budget**, and everything derives
from `--b-pad: 48px` and `--b-reserve: 528px`. Change those two and the format moves coherently.

### 1.1 The reserved left third — the rule that defines this format

**The left 528px carries no content. Ever.** Two things eat it:

- **The profile photo** sits over the lower left on desktop.
- **The mobile crop** trims the sides, and trims this edge first.

528 is one exact third of 1584. **It is deliberately more conservative than LinkedIn's current
chrome requires, and that is the point** — this is a survivability margin, not a measurement.
LinkedIn has changed its profile layout repeatedly and will again; a banner designed flush to
today's avatar position is a banner that breaks silently on their next redesign. Nobody gets a
notification when a header starts clipping.

**The empty third is not wasted space. The avatar is the left-third composition.** Judge the
banner with a profile photo overlaid, never on its own — `class="guides"` on the canvas paints
the reserve so you can see what you are protecting. Never export with guides on.

---

## 2. Type

Same two families, same rules as everywhere else. Lora **SemiBold 600 only**. **No italics.**
Never justify, never hyphenate, never letterspace Lora.

| Element | Size | Face | Notes |
| :-- | :-- | :-- | :-- |
| Eyebrow | 24px | Hanken 600 | Uppercase, `0.08em` tracking. The only accent element. |
| Title | 50px | Lora 600 | `text-wrap: balance` — a 2-line title breaks evenly |
| Subtitle | 30px | Hanken 400 | |
| Meta | 25px | Hanken 500 | `--fg-muted`, above a 2px `--border` rule |

Tracking on the eyebrow is the one place letterspacing is allowed in this system, and only
because it is uppercase Hanken at small size, where it is a legibility fix rather than a
styling choice. **It is never applied to Lora.**

### 2.1 The line budget, measured

The content budget is 300px. Measured in a render:

| Mode | Content height | Headroom |
| :-- | :-- | :-- |
| A — event, 2-line title + 1-line subtitle + meta | **273** | 27 |
| B — standing, 2-line title + 2-line subtitle | **196** | 104 |

**So in Mode A: the title may run to two lines, and the subtitle must be exactly one.** A second
subtitle line comes to roughly 312 and overflows the canvas. This is a hard limit, not a
guideline — the overflow is silently clipped, and clipped at the bottom where the meta row lives.

---

## 3. Color

Dark register, pinned. `--surface` `#0a1420`, `--fg` `#e6ecf2`, `--fg-muted` `#9aabbb`,
`--accent` `#5fbdb4`, `--border` `#1e3245`.

**One register per canvas — never mix**, same rule as the other two formats. Dark is chosen here
rather than inherited: a profile photo is usually a light-bordered circle, and it separates from
a dark header without needing a stroke around it.

**One accent element: the eyebrow.** The rule above the meta row is `--border`, not `--accent`,
specifically so the teal appears exactly once. In Mode B, which has no eyebrow, the canvas
carries no accent at all and that is correct — a standing banner is not announcing anything.

**No gradients, no shadows, no glow**, per the infographic format §4.8.

---

## 4. The two modes

### 4.1 Mode A — event

Four slots, all marked `REPLACE ME` in the template: eyebrow, title, subtitle, meta. Swap the
four and re-render. Nothing else changes.

### 4.2 Mode B — standing

`class="canvas standing"`. **This is what sits there between events**, and it is the mode that
matters most, because a banner advertising a conference that already happened is worse than a
banner advertising nothing.

The eyebrow and meta row are hidden, the title drops to 44px, and the subtitle goes
`--fg-muted`. It carries the settled positioning line from
`kwpledger-site` — do not rewrite that line casually; it is on record in SITE-POSITIONING.

**Switching back to Mode B is part of finishing an event, not a separate task.** If the talk is
over, the banner is stale that day.

---

## 5. The mark

`logo_long_inv.svg` — the **inverted** long mark, because the canvas is dark. Measured at 167×96
in the reference.

**Sized by height, width auto.** The long and short marks have different aspects, so pinning
width breaks a series that switches between them. **Never redraw it, and never recolor the
glyph** — it is white with a black outline in this register, and that is the file, not a
treatment you apply. [`logos/PROVENANCE.md`](../logos/PROVENANCE.md) is the authority.

No ring on this canvas. The ring is the quote card's badge treatment; repeating it here would
make two formats look like the same artifact.

---

## 6. Copy rules

| Element | Budget |
| :-- | :-- |
| Eyebrow | ≤ 3 words |
| Title | ≤ 9 words, ≤ 2 lines |
| Subtitle | ≤ 12 words, exactly 1 line |
| Meta | date · venue |

**The banner is read at a glance, by someone who is scrolling.** It gets perhaps a second, at
maybe half this pixel size, often beside a notification badge. Write for that, not for this
document.

**Name the event, not the achievement.** "Speaking at X" is information; "Thrilled to announce"
is not, and it dates badly the moment the event passes.

**No employer.** Same rule as everywhere: work produced on work time is not Kevin's to publish,
and a profile header is the most public surface there is.

---

## 7. Preflight

Measured in a render, not estimated:

1. Canvas exactly 1584×396, `scrollHeight − clientHeight = 0`.
2. **`guides` class removed.** The dev overlay is teal and obvious in a browser and easy to
   forget in an export.
3. Nothing but background in the left 528px.
4. Mode A: subtitle is exactly one line. Two lines overflow — check the render, not the source.
5. Both faces report `loaded`. A synthesized Lora is the failure that looks almost right.
6. Mark actually loaded (`naturalWidth > 0`) — a broken relative path renders as alt text and is
   easy to miss on a dark canvas.
7. Inverted mark, and no ring.
8. `kwp` is lowercase everywhere it appears, including alt text.
9. Typographic apostrophes (`’`), not straight quotes.
10. Overlay a circle at the lower left at profile-photo size. The composition must still read.
11. Squint at 400px wide: the title's first line survives. Nothing else has to.
12. Grayscale test: nothing is lost, because nothing here is carried by color.

---

## 8. Out of scope

- **A light register.** Authored dark, for the reason in §3. A light variant is six token swaps
  and the non-inverted mark, but it is a different series.
- **Photography or texture behind the type.** The reserve rule assumes a flat ground; a busy
  left third fights the avatar instead of receding behind it.
- **Company page banners.** Different dimensions, different occlusion, different format.
- **A rendering tool.** `tools/` holds the verifier and the math it needs, and stays that size.
  Render the HTML with a browser, as the examples do.

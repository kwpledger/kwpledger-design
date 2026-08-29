# Read this before every quote card.

The kwp quote-post format — a **1400×1000 (7:5)** card carrying one quotation and nothing else.

This is a **layer-3 consumer** of [the kwp design system](SPEC.md), and a sibling of
[the infographic format](infographic-design-system.md). It defines nothing new about color,
type, or spacing; it decides how those settled values sit on a different canvas. Where this
document and [SPEC.md](SPEC.md) disagree, SPEC.md wins. Where it and the infographic document
disagree, they are simply different formats — neither governs the other.

Hex is copied from [PALETTE.md](PALETTE.md) so this file can be pasted into a tool that cannot
take a dependency. Values are correct as of the tokens at this commit.

Reference implementation: [`examples/self-quote/`](../examples/self-quote/).

---

## 0. Scope

**One quotation, attributed, on a fixed 1400×1000 canvas.** No headline, no modules, no bullets,
no count. If the content has a spine you could number, it is an infographic and belongs in the
other format.

The format was built for **self-quotation** — pulling a line from a talk Kevin actually gave —
and works unchanged for quoting someone else. The only thing that changes is the name.

### 0.1 Why 7:5, and why 1400×1000

7:5 is not native anywhere. LinkedIn accepts 1200×627 landscape, 1200×1200 square and 1080×1350
portrait without resampling; a 7:5 card gets soft-scaled on upload whatever pixel size you pick.
**Since resampling is unavoidable, the pixel size is chosen for internal math rather than to
dodge it** — which is the opposite of the reasoning in the infographic format §0, and the
difference is the whole justification.

1400×1000 gives 70px margins, a 1260px content width and a 1080px measure, all whole numbers,
and enough resolution that the downscale is a downscale rather than a stretch. Treat it as
fixed. Deriving everything from `--q-pad: 70px` is what keeps a series consistent.

**Square corners.** Do not round the canvas. Rounded corners bake the backdrop color into the
export; the feed applies its own rounding at display time.

---

## 1. The vertical budget

1000px, allocated. Blow this and it lands on the attribution, same as every other format.

| Zone | Height | Contents |
| :-- | :-- | :-- |
| Top margin | 70 | |
| Opening mark | 90 | Lora `&ldquo;` at 150px, `--accent` |
| **Quote** | **598** | The working area. Centred in it, so short quotes do not hang. |
| Gap · rule · gap | 68 | 36 · 2px `--border` · 30 |
| Attribution | 104 | Name + context on the left, badge on the right |
| Bottom margin | 70 | |

The attribution band is 104px because **the badge sets it**, not the type — name (43) plus
context (40) plus their gap comes to 91. If the badge changes size, this row changes with it.

---

## 2. Type

Same two families, same rules as everywhere else. Lora **SemiBold 600 only**. **No italics** —
neither shipped face has a true italic, and a quotation is exactly where a designer's hand
reaches for one. Never justify, never hyphenate, never letterspace Lora.

### 2.1 Why the type is bigger than the infographic's

The infographic sets its floor at 23px because a 1080px canvas displays about 555px in a desktop
LinkedIn feed, making a 23px canvas pixel ~11.8px on screen (that format's §3.2).

**The floor is a property of the display size, not of the token table.** This canvas is 1400px
wide and displays at about the same 555px, so the scale is 0.396 rather than 0.514 and every
size has to grow by 1400/1080 to land in the same place on a reader's screen:

| | Infographic (1080) | This format (1400) | On screen |
| :-- | :-- | :-- | :-- |
| Sentence floor | 23px | **30px** | ~11.9px |
| Label floor | 19px | **25px** | ~9.9px |

Copying 23px onto this canvas would put body text at 9.1px on screen. That is the mistake this
section exists to prevent, and it is invisible until someone reads the card on a phone.

### 2.2 Quote size tiers

Pick the tier by word count. One class, set on the `blockquote`.

| Tier | Words | Size / leading | Measure |
| :-- | :-- | :-- | :-- |
| `t-xl` | ≤ 20 | 68px / 1.22 | ~35 ch |
| `t-l` | 21 – 35 | 58px / 1.26 | ~37 ch |
| `t-m` | 36 – 55 | 50px / 1.30 | ~45 ch |
| `t-s` | 56 – 70 | 43px / 1.32 | ~53 ch |

Short tiers use `text-wrap: balance`; long ones use `text-wrap: pretty`, because Chrome stops
balancing past six lines and the result is a hard orphan.

**The 70-word cap is editorial, not geometric.** Measured, 81 words at `t-s` still clears the
zone with 76px above and 114px below. The cap is there because a quote card that needs eighty
words is a carousel — nobody reads a wall of Lora in a feed. If you genuinely need more room,
you have picked the wrong format, not the wrong tier.

### 2.3 Attribution

| Element | Size | Face | Color |
| :-- | :-- | :-- | :-- |
| Name | 36px | Hanken Grotesk 600 | `--fg` |
| Context | 30px | Hanken Grotesk 400 | `--fg-muted` |

Context is the source — the talk, the episode, the piece. **Not a date.** Dating the card
retires it the day after; the four-principles graphic made the same call for the same reason.

---

## 3. Color

**Dark register, and pick one register for a series** (SPEC §4.5, infographic §4.1). The values:

| Role | Hex | On `--surface` |
| :-- | :-- | :-- |
| `--surface` (canvas) | `#0a1420` | — |
| `--fg` (quote, name) | `#e6ecf2` | 15.56:1 |
| `--fg-muted` (context) | `#9aabbb` | 7.86:1 |
| `--accent` (opening mark) | `#5fbdb4` | 8.31:1 |
| `--border` (rule) | `#1e3245` | 1.41:1 |

All text pairs clear WCAG AA comfortably. The rule is not a contrast claim — SPEC §7.2 declines
to make edges 3:1, and this is an edge.

**No categorical slots and no status colors on this canvas.** There is nothing here to
categorize and no outcome to report. A quote is not a category.

**`--accent` is the only chromatic color on the card, and it appears in exactly two places:**
the opening mark and the badge ring (§4). Everything else is the neutral family. That pairing is
what makes the card read as brand rather than as a default dark theme — one accent, stated twice,
top-left and bottom-right, which also weights the diagonal the eye already travels.

Do not tint the quote text, and do not introduce a third accent element.

### 3.1 The 2px rule

The rule above the attribution is **2px, not the 1px used elsewhere**. At 1400px canvas width a
1px hairline resolves to 0.40 screen px in a feed and disappears. This is the infographic's own
§2.1 reasoning applied at a different canvas width, not a new rule.

---

## 4. The corner badge

Kevin's short signature mark, small, bottom right.

| | |
| :-- | :-- |
| File (dark canvas) | `logos/kwp_logo_short_inverted_teal.png` |
| Size | **104px tall, width left to the file** |
| Position | Flush to the right and bottom margins, vertically centred in the attribution band |

This is the **short mark / corner badge** cell of the infographic format's §5.8 table, used as a
badge rather than a footer lockup. Nothing new is being invented here, which matters: SPEC §12
puts a shared header/footer lockup out of scope and says not to invent one in the meantime.

**Size it by height only.** `logos/PROVENANCE.md` says the marks are being reworked in Inkscape
and that no spec or layout may depend on their current geometry. `width: auto` is how this
format complies — when the file changes proportion, the card still works.

### 4.1 Never redraw it, never recolor the glyph

Supply the file. A generator asked for a signature will invent one, and an invented signature is
worse than none. And the glyph itself is not recolorable — **the signature is always black, or
white with a black border in the inverted register; only the ring color varies.**
`logos/PROVENANCE.md` is the authority.

### 4.2 Why the ring is the brand accent

The ring is **`--accent` `#5fbdb4`** — the same teal as the opening mark.

The infographic format's §5.8 defaults a dark canvas to the navy ring, and that default does not
survive contact with this canvas. Measured, navy `#202a44` sits at **1.30:1** against `#0a1420` —
the same register as `--border` at 1.41:1 — and the ring renders as a **~1.6px stroke** at badge
size. A 1.6px stroke at 1.30:1 is not a quiet ring; it is an absent one. On a light canvas navy
works, which is why the default exists.

Every other shipped ring is worse, and the table is the argument:

| Ring | Hex | vs canvas | Chroma vs 0.091 ceiling | Hue collision |
| :-- | :-- | :-- | :-- | :-- |
| navy | `#202a44` | 1.30:1 | 0.050 — under | — |
| blue (deep) | `#06038d` | 1.24:1 | 0.198 — 2.2× over | — |
| green (dark) | `#046a38` | 2.76:1 | 0.116 — 1.3× over | success, h154 |
| red | `#ed1d24` | 4.24:1 | 0.234 — 2.6× over | **danger, h27 exactly** |
| orange | `#ff8200` | 7.45:1 | 0.185 — 2.0× over | warm caution register |
| green (bright) | `#39be15` | 7.54:1 | 0.223 — 2.4× over | success, h141 |
| **accent teal** | **`#5fbdb4`** | **8.31:1** | **0.091 — at the ceiling** | — |

Every visible ring in the shipped set breaks the chroma ceiling by 1.3× to 2.6×, and three of
them borrow a status hue — red sits *on* danger. **The accent is the only ring that is both
legible on this canvas and inside the system.** It is also the most legible of all of them.

And unlike the alternatives, it does not claim an identity this card has not been given.
`logos/PROVENANCE.md` says the ring is intended to carry channel or section identity and that
**which color means what is undecided** — so a green, orange or red ring would assert a channel
the system has not handed out.

#### The teal ring is a composition, not an identity claim

An earlier draft of this section argued the ring should read as *teal = the parent identity*.
**Kevin's decision, 2026-08-29: that question stays open, and this is not an answer to it.**

The ring is teal here because it pairs with the opening mark — the card then carries one
chromatic color, stated twice, at the two ends of the diagonal. That is a compositional reason,
not a semantic one, and it is the whole of the argument.

It follows that the ring color is **provisional and deliberately retconnable.** Nothing in this
format may depend on it. When the wider decision about how color maps to topic is made, this card
is a *consumer* of that decision, never a precedent for it: swap the badge file, re-render, done.
**Do not cite this format as evidence that teal means anything.**

What the choice actually rests on is the table above, and any replacement ring has to clear the
same three bars: legible on this canvas, at or under the 0.091 chroma ceiling, and not borrowing
a status hue.

The asset is a **ring-only recolor** of `kwp_logo_short_inverted_navy.png` — glyph pixels and the
alpha channel are byte-identical, verified pixel by pixel. See `logos/PROVENANCE.md`.

### 4.3 The badge is not the attribution

The name is typeset because **color and imagery are never the sole carrier of meaning**
(SPEC §8). The short mark reads `kwp` — initials, not a name — so it reinforces the attribution
without replacing it.

This is also why there is no duplication problem here, where the infographic's footer had one:
the long mark reads `kwpledger` and setting `kwp` beside it says the name twice, but the short
mark beside `Kevin Pledger` says two different things.

---

## 5. Copy rules

| Element | Budget |
| :-- | :-- |
| Quote | ≤ 70 words — see §2.2 |
| Name | as written |
| Context | ≤ 8 words |

**Quote what was actually said.** Tightening a spoken sentence for print is normal; putting a
better sentence in your own mouth is not. If the line needs a rewrite to work on a card, it is a
written line and the card should not claim it was spoken.

**No *enclosing* quotation marks.** The opening mark stands in for them; adding both sets them
twice.

**Quotation marks *inside* the quote stay, and stay single.** A speaker naming a term — ‘Risk’,
‘Regulations’ — is doing real work and the marks carry it. They sit one level in from the card's
own quotation, which is what the large opening mark is, so single is correct; double would put
two visible sets of double marks on one canvas and read as a mistake.

**The card must work with the caption removed.** It gets screenshotted and reposted.

---

## 6. Preflight

Measured in a render, not estimated:

1. Canvas exactly 1400×1000, `scrollHeight − height = 0`.
2. Quote text clears the mark above and the rule below — no clash at the chosen tier.
3. Tier class matches the actual word count.
4. Both faces report `loaded`. A synthesized Lora is the failure that looks almost right.
5. Badge image actually loaded (`naturalWidth > 0`) — a broken relative path renders as alt text
   and is easy to miss on a dark card.
6. Inverted mark on the dark canvas. Never `kwp_logo_short_blue.png` (no alpha — it carries a
   baked white rectangle).
7. `kwp` is lowercase everywhere it appears, including alt text.
8. No italics. No enclosing quotation marks — marks around quoted *terms* are fine, and single.
   No third accent element beyond the opening mark and the ring.
9. Grayscale test: nothing is lost, because nothing on this canvas is carried by color.
10. Squint at 400px wide: the quote's first line and the name both survive.

---

## 7. Out of scope

- **A light register.** The format is authored dark. A light variant is six token swaps and the
  non-inverted badge, but it is a different series — do not alternate within one (§3).
- **Multiple quotes per card.** That is a carousel.
- **A rendering tool.** `tools/` holds the verifier and the math it needs, and stays that size.
  Render the HTML with a browser, as the examples do.

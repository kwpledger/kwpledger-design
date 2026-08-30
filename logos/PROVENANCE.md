# The kwp signature marks

**Never redraw these.** Do not vectorize, retrace, auto-trace, "clean up," or regenerate the glyph.

**And the glyph is not yours to recolor either.** Kevin, 2026-08-28: *the signature itself is always black, or white with a black border in the inverted register.* **Only the ring color varies.** Pick the file that matches the register you need; do not tint the initials to an accent, a channel hue, or anything else. Scaling, cropping, and opacity are fine — those do not change the color.

## The rework has landed (2026-08-30)

This directory used to warn that the marks were provisional and that no spec or layout could depend on their geometry. **That is over.** Kevin finished the Inkscape/potrace rework and the result is the eight `logo_*.svg` files below.

Everything about them is now stable and specifiable: canvas, path counts, ring center and radius, ink bounding boxes. **KWP-16 (a shared header/footer lockup) was sequenced behind this and is no longer blocked on it.**

The no-redraw rule is unaffected and still absolute. *Kevin* reworking his own signature is not the same act as a session auto-tracing it.

## Where they came from

Kevin's short-form signature, **written in 2013** in Sharpie on a 3×5 index card and scanned. (The date came across from `kwpledger-site/CLAUDE.md`, which carried it until this file did.)

The eight SVGs are **vendored byte-identically** from `kwpledger/logos-and-wordmarks` at commit `531fe12` (2026-08-27). That repo is the source of truth for the marks themselves; this directory is a consumer of it, exactly as `fonts/` is a consumer of upstream type. **Do not edit a `logo_*.svg` here.** A change to the artwork happens upstream and is re-vendored; the only file in this directory that may diverge is a derived recolor, and those are listed and justified at the bottom.

Checksums, so a future session can prove nothing drifted:

```
c12632cff57e29d195cfcfa4bab38863505dc849e1ae0b6debaf27a57d21df11  logo_long.svg
7ba3a05c2e8b7bb6d6ce99285342f6f1a5e877a55811f2dc6b75835af19ae89b  logo_long_inv.svg
937aa07af757e6ee7c5647977b720748407cd79d0010626a09cc55b0ccab822e  logo_long_ring.svg
d45e090473b039c2d09a63c72d7499ccdde82ff434e121b059d450e5d7085a11  logo_long_ring_inv.svg
ddcb5d77255cd663dcb20929ae177035b387907f2fadebc5f175905236386cc5  logo_short.svg
83e9208cb121635653b7408d9c9797e266379c817271432927f27c39d2a4314b  logo_short_inv.svg
1107e98d1df087eff0317468c0f35e973235934e3e1659a7e65cdee8095334cb  logo_short_ring.svg
1729aad4d9b3b2f7b9b4c1aa8e107e95dc5764a65d0b357897e37ff128a78780  logo_short_ring_inv.svg
```

There is no third-party license to carry. Every file here is Kevin's own work — unlike `fonts/`, nothing needs to travel alongside these.

The reason the no-redraw rule exists: the mark's authority comes from being an actual signature. A regenerated version is a drawing *of* a signature, which is a different and much weaker thing, and the difference is visible to people who cannot say why.

## The eight files

Naming runs **broad to narrow**: `logo_{long|short}[_ring][_inv].svg`. It is upstream's convention and it is kept verbatim so the vendored file can be checksummed against its source.

| File | Canvas | Glyph | Ring | Paths |
| :-- | :-- | :-- | :-- | :-- |
| `logo_long.svg` | 1038×598 | full `kwpledger`, black | — | 4 |
| `logo_long_ring.svg` | 1038×598 | full `kwpledger`, black | yes | 4 + circle |
| `logo_long_inv.svg` | 1038×598 | white, black outline | — | 4 |
| `logo_long_ring_inv.svg` | 1038×598 | white, black outline | yes | 4 + circle |
| `logo_short.svg` | 496×598 | `kwp` only, black | — | 1 |
| `logo_short_ring.svg` | 496×598 | `kwp` only, black | yes | 1 + circle |
| `logo_short_inv.svg` | 496×598 | white, black outline | — | 1 |
| `logo_short_ring_inv.svg` | 496×598 | white, black outline | yes | 1 + circle |

The `_inv` suffix marks the **register**, not the ring — `logo_short_inv.svg` has no ring. The two axes are independent, which is the point: light/dark is user preference, channel identity is not, and they are never wired to the same switch.

Every file shares one origin, so the `kwp` geometry is identical everywhere it appears and the ring element is literally the same line of XML in all four circled files. **No file carries a background rectangle**, so all eight are transparent and none of them can drop a white box on a dark surface. That was the single worst trap in the superseded raster set.

### The two things in the trace that look like mistakes and are not

There is a small isolated stroke below the `g` and a 4×7px speck beside it. They are artifacts of Kevin lifting the Sharpie in 2013 and they are **deliberate keeps** — "I made this myself." They each pick up their own outline in the inverted variants; that is correct. Never clean them up.

Same for the `p`-descender ring gap in the circled black-ink files, which comes out in two pieces with ~2° of ring showing between them. Kevin's call: keep it, it reads as a real artifact rather than something manufactured to be perfect.

## Structure — what you may change, and how

Both variable properties are a single attribute, which is the whole point of the rework.

**Ring color** — the `stroke` on the `<circle>`:

```xml
<circle cx="244.52" cy="286.04" r="195.41" fill="none" stroke="#0026FF" stroke-width="15.45"/>
```

**Glyph color** — `fill` on the `<g>`. But see the rule at the top of this file: **you may not exercise this one.** It is documented so you recognize it, not so you use it.

### The default ring hex is the worst color in the system

Upstream ships every circled file with `stroke="#0026FF"`. That is bright blue at **chroma 0.300 — 3.3× the system's 0.091 ceiling**, the single most saturated value anywhere near this design system.

It is arbitrary upstream — a placeholder meant to be swapped per channel — but on a surface governed by SPEC §10 it is not a neutral default, it is the loudest possible choice. **Any design-system consumer must set the ring deliberately. Never ship `logo_*_ring*.svg` with the hex it arrives with.**

### `currentColor` — considered, and still not allowed

The `<g>` uses a literal `fill="#000000"`, so the mark cannot inherit a CSS color as-is.

**An earlier version of this file recommended swapping that for `currentColor` so one file could serve every register. That advice was withdrawn on 2026-08-28 and the rework does not revive it.** `currentColor` on the `<g>` tints *the initials*, which is the thing that is not allowed. It does not get you the inverted register either — inverted is a white glyph **with a black border**, a different mark rather than this one recolored. Use the file that matches the register.

Left on the record rather than deleted, because the reasoning was plausible and a future session will otherwise re-derive it. The no-redraw rule was never the only constraint on this mark; the color rule is the other half, and it is easy to miss because "recolor is the permitted modification" sounds like permission until you ask *recolor what*.

`currentColor` on the `<circle>` stroke is a different question and would be legal, since ring color *is* variable. It is not done here because these are placed as `<img>`, which cannot inherit anything. If a consumer ever inlines the SVG, that is the mechanism to reach for.

## Choose by register — the rule, with the numbers

**Dark mark on light backgrounds, inverted mark on dark backgrounds.** Two assets, chosen by register, and the choice is not optional.

Measured as the share of the mark's ink bounding box reaching ≥3:1 against the background — the honest measure of how much of the stroke survives. Rendered in Chromium at footer size (110px tall), because `paint-order` is involved and **cairosvg silently ignores it** (see below).

| Mark | on `#fbfaf8` (light page) | on `#0a1420` (dark page) |
| :-- | :-- | :-- |
| `logo_long.svg` (black) | **17.7%** | 0.0% |
| `logo_long_inv.svg` | 6.1% | **17.9%** |

Peak contrast is misleading here and always has been: `logo_long_inv.svg` touches 18.8:1 even on the light page, but only across the hairline outline, so the mark reads as a ghost.

**Two things changed from the superseded rasters, and both are worth knowing:**

- The black mark on a dark canvas now measures **0.0% and peaks at 1.1:1** — it disappears completely. The old PNG peaked at 8.8:1 because it carried light antialiasing fringe. The vector is cleaner and therefore fails *harder* in the wrong register.
- The inverted mark on a light canvas measures **6.1%, not the old 0.8%**, because the reworked outline is 15% of ink stroke weight instead of a hairline. It is still 2.9× worse than the correct pairing and it still should not be used there — but "invisible" is no longer the accurate word. It reads as a smudge.

## Geometry — now safe to build on

Measured from renders, not estimated. This is the section that used to say "do not depend on any of this."

| | `logo_long*` | `logo_short*` |
| :-- | :-- | :-- |
| Canvas | 1038×598 | 496×598 |
| Ink box, no ring, as a fraction of canvas height | 0.800 | 0.750 |
| Ink box, with ring | 0.818 | 0.788 |
| Ink aspect at footer/badge size, no ring | 168×88 @110px tall | 59×78 @104px tall |
| Ink aspect at footer/badge size, with ring | 174×90 @110px tall | 71×82 @104px tall |

**Size these by height and leave width to the file** (`width: auto`). Not because the geometry might move any more — it will not — but because the long and short marks have different aspects and a series that pins width will break when it switches which one it uses.

### Ring geometry, scale-independent

Center `(244.52, 286.04)`, centerline radius `195.41`, stroke `15.45` — in the 496×598 (and 1038×598) coordinate space, identical in all four circled files.

At a 104px-tall badge that renders as a **70px outer diameter with a 2.7px stroke**, measured. For comparison, the superseded navy PNG rendered its ring at ~1.6px in the same slot. The reworked ring is 1.7× heavier and survives at badge size where the old one did not.

The signature deliberately **overflows the circle** — it does not fit inside and is not meant to. The ring center sits slightly up and right of the ink center, which is what makes the overflow read as intentional rather than as misalignment. Do not "fix" it by recentering.

## Superseded — the raster set

Everything below predates the rework. **It is kept so that pinned consumers do not break and so the measurements stay on the record. Do not reach for any of it in new work.** Every one of these has a strictly better `logo_*.svg` equivalent.

Deleting them is a **major bump** under this repo's pinning model, so it is a separate decision and Kevin's to make.

| Superseded file | Use instead |
| :-- | :-- |
| `kwp_logo_long.png`, `kwp_logo_long_green.png` | `logo_long.svg`, `logo_long_ring.svg` |
| `kwp_logo_long_inverted.png`, `kwp_logo_long_inverted_green.png` | `logo_long_inv.svg`, `logo_long_ring_inv.svg` |
| `kwp_logo_short.svg` | `logo_short.svg` |
| `kwp_logo_short_blue.png`, `kwp_logo_short_green.png` | `logo_short_ring.svg` |
| `kwp_logo_short_inverted_*.png` (6 files) | `logo_short_ring_inv.svg` |
| `kwp_logo_short_green.svg` | `logo_short_ring.svg` |
| `kwp_logo_short_inverted_teal.png` | `logo_short_ring_inv_teal.svg` |

Two of them were live footguns, which is the strongest single argument for the rework:

- **`kwp_logo_short_blue.png` has no alpha channel** and carries a baked white rectangle. On any surface that is not white it shows as a white box.
- **`kwp_logo_short_green.svg` is not a vector.** It is two 496×598 PNGs base64-embedded in an SVG wrapper. The extension lies and it scales exactly as badly as a 496px raster.

Neither failure is possible in the new set: all eight are true paths and all eight are transparent.

Also on the record: there was **no true vector of the long signature at all** before the rework — the largest long-mark asset was 525×300, which meant the long mark could never be a hero element. `logo_long.svg` removes that constraint entirely.

<details>
<summary>The superseded files, with their measured dimensions and ring hexes</summary>

### Long mark

| File | Size | Alpha | Ring |
| :-- | :-- | :-- | :-- |
| `kwp_logo_long.png` | 525×300 | yes | none |
| `kwp_logo_long_green.png` | 525×300 | yes | `#39be15` |
| `kwp_logo_long_inverted.png` | 525×300 | yes | none |
| `kwp_logo_long_inverted_green.png` | 525×300 | yes | `#39be15` |

### Short mark

| File | Size | Alpha | Ring |
| :-- | :-- | :-- | :-- |
| `kwp_logo_short.svg` | 300×300, 79.375 viewBox | vector | none |
| `kwp_logo_short_blue.png` | 496×598 | **no** | `#0026ff` |
| `kwp_logo_short_green.png` | 248×299 | yes | `#39be15` |
| `kwp_logo_short_green.svg` | 496×598 embedded raster | — | `#39be15` |
| `kwp_logo_short_inverted_blue.png` | 248×299 | yes | `#06038d` |
| `kwp_logo_short_inverted_green_dark.png` | 248×299 | yes | `#046a38` |
| `kwp_logo_short_inverted_green_light.png` | 248×299 | yes | `#39be15` |
| `kwp_logo_short_inverted_navy.png` | 248×299 | yes | `#202a44` |
| `kwp_logo_short_inverted_orange.png` | 248×299 | yes | `#ff8200` |
| `kwp_logo_short_inverted_red.png` | 248×299 | yes | `#ed1d24` |
| `kwp_logo_short_inverted_teal.png` | 248×299 | yes | `#5fbdb4` |

Six of the twelve PNGs are Adam7-interlaced. Harmless in a browser, but some tooling handles it poorly.

The old register measurement, for comparison with the table above: `kwp_logo_long.png` read 17.7% / 0.2%, `kwp_logo_long_inverted.png` 0.1% / 18.3%.

</details>

## Ring colors against the system's chroma ceiling

The system caps chroma at **0.091** (`--teal-300`, the most saturated brand color). Measured in OKLCH. Every hex that has ever been on a kwp ring:

| Ring | Hex | L | C | vs ceiling |
| :-- | :-- | :-- | :-- | :-- |
| navy | `#202a44` | 29% | 0.050 | under |
| **accent teal** | **`#5fbdb4`** | **74%** | **0.091** | **at the ceiling** |
| green (dark) | `#046a38` | 46% | 0.116 | 1.3× over |
| orange | `#ff8200` | 73% | 0.185 | 2.0× over |
| blue (deep) | `#06038d` | 30% | 0.198 | 2.2× over |
| green (bright) | `#39be15` | 70% | 0.223 | 2.4× over |
| red | `#ed1d24` | 60% | 0.234 | 2.6× over |
| **blue (bright) — upstream default** | `#0026ff` | 47% | 0.300 | **3.3× over** |

For comparison, the brand's own teals sit at 0.070–0.091, and the two channel accents already recorded in `tokens/base.css` — KPLS `#4aa3ac` (0.085) and MPSAS `#2f8079` (0.078) — are both under it.

**This is not automatically a violation.** SPEC §10 permits deviation justified by function, and a logo is identity rather than data. But it is a real tension and it should be decided rather than inherited: on a surface governed by the ceiling, a `#ff8200` ring is the loudest thing on the page by a factor of two and will out-shout the content beside it.

Only **navy** and **accent teal** are usable without that conversation, and navy is invisible on a dark canvas (1.30:1 against `#0a1420`).

## Ring semantics are still undecided

The ring is intended to carry **channel or section identity** — a different color per aspect of the brand — and it is the only part of the mark whose color varies.

**Which color means what is not decided.** Treat every ring hex in this file as unassigned.

---

## Derived variants

Files produced from a vendored original by **recoloring the ring only**. The rule at the top of this file is what permits them: the ring is the one part of the mark whose color varies. None of them touches the glyph — if a future variant does, it does not belong in this section or this directory.

| File | Derived from | Ring | Why it exists |
| :-- | :-- | :-- | :-- |
| `logo_short_ring_inv_teal.svg` | `logo_short_ring_inv.svg` | `#5fbdb4` — `--accent` | The quote-post badge. See `docs/quote-post-design-system.md` §4.2. |

**How it was made, and how to make the next one:** change the `stroke` hex on the `<circle>`, and nothing else. The whole diff is one attribute on line 7 — the two files are the same byte count and differ nowhere else. That is the entire recipe; it needs no tool and no session.

```
sed 's/stroke="#0026FF"/stroke="#<your hex>"/' logo_short_ring_inv.svg > logo_short_ring_<name>.svg
```

**Do not build a recolor pipeline for this.** `tools/` holds the verifier and the math it needs, and stays that size. One `sed` is not a pipeline.

The predecessor of this file, `kwp_logo_short_inverted_teal.png`, was a pixel remap of a raster that had to be verified byte by byte to prove the glyph was untouched. That verification is now structural: the glyph is a different XML element from the ring, so a ring recolor *cannot* reach it.

### The teal ring is a composition, not an identity claim

An earlier draft argued the ring should read as *teal = the parent identity*. **Kevin's decision, 2026-08-29: that question stays open, and this is not an answer to it.**

The ring is teal on the quote card because it pairs with the accent-colored opening mark on the same card — the card then carries one chromatic color, stated twice, at the two ends of the diagonal. That is a compositional reason, not a semantic one, and it is the whole of the argument. He has said the color there is **retconnable** once color-topic distribution is settled.

So, plainly: **this file existing is not evidence that teal means anything.** When the assignment is finally made, the thing to revisit is whatever is using a ringed mark at that point — today that is `examples/self-quote/` and nothing else.

Teal is also the only ring color on record that sits **at or under the 0.091 chroma ceiling while still being legible on a dark canvas** — it measures exactly 0.091, the chroma of `--teal-300`. Navy is under the ceiling but invisible there; everything else is visible but 1.3× to 3.3× over it.

## Tooling note: verify inverted marks in a browser, never in cairosvg

The inverted files rely on `paint-order="stroke fill"`, which renders the outline *beneath* the fill so it sits outside the letterform instead of eating inward. That is what keeps the white signature at full weight.

**cairosvg silently ignores `paint-order`** and falls back to fill-then-stroke, so the stroke straddles the outline and eats inward — exactly the failure mode the attribute exists to prevent. It does not error; it just gives you a thinner mark and a wrong decision. Upstream measured the same file at 18,933 white px in cairosvg against **27,023 in Chromium**.

Measured here at badge size in Chromium, white fill beats the outline **5.2 : 1** in all three inverted files. If a check ever reports that ratio near 1, the renderer is wrong, not the file.

cairosvg is fine for the four non-inverted files, which use no `paint-order`.

Also: **never set `vector-effect="non-scaling-stroke"`** on these. The outline weight is 15% of ink stroke by design and is meant to scale with the drawing.

# The kwp signature marks

**Never redraw these.** Do not vectorize, retrace, auto-trace, "clean up," or regenerate the glyph. Recolor if you need to — that is the only permitted modification.

## Where they came from

Kevin's short-form signature, written in Sharpie on a 3×5 index card and scanned. The raster variants were produced in Paint.NET; `kwp_logo_short.svg` was traced from that scan in Inkscape.

There is no third-party license to carry. Every file here is Kevin's own work — unlike `fonts/`, nothing needs to travel alongside these.

The reason the no-redraw rule exists: the mark's authority comes from being an actual signature. A regenerated version is a drawing *of* a signature, which is a different and much weaker thing, and the difference is visible to people who cannot say why.

## The two marks

| | What it is |
| :-- | :-- |
| **long** | The full short-form signature — reads as `kwpledger` |
| **short** | The initials alone — the long mark with the `ledger` portion removed. `kwp`, **always lowercase** |

Some variants add a **ring** around the initials. The ring is intended to carry channel or section identity — a different color per aspect of the brand. **Which color means what is not decided yet**, so treat every ring color below as unassigned.

## These files are pending rework — do not build on their geometry

**Kevin is redoing the marks in Inkscape** (noted 2026-08-19). Only one file here was ever a true vector — `kwp_logo_short.svg`, the one he traced from the scan himself — and the table below is why.

So treat everything in this directory as **provisional**. Recolor and place them, yes. Do not write a spec, a lockup, or a layout that depends on their exact dimensions, path counts, or which extensions happen to be honest, because those are the things about to change.

The no-redraw rule above is unaffected and still absolute: *Kevin* reworking his own signature in Inkscape is not the same act as a session auto-tracing it.

## Vector status — read this before scaling anything

| File | Actually a vector? |
| :-- | :-- |
| `kwp_logo_short.svg` | **Yes.** True paths, 4 circles + 3 paths, 300×300 at a 79.375 viewBox. Black, no ring. |
| `kwp_logo_short_green.svg` | **No.** Two 496×598 PNGs base64-embedded inside an SVG wrapper. The extension is misleading; it scales exactly as badly as a 496px raster. |
| every `.png` | No, obviously — listed below with real dimensions |

**There is no true vector of the long signature.** The largest long-mark asset is 525×300. That is ample for a footer lockup and will soften if pushed much past ~500px wide.

`kwp_logo_short.svg` uses literal `fill:#000000` / `stroke:#000000` rather than `currentColor`, so it cannot inherit a CSS color as-is. Swapping those two declarations for `currentColor` would let one file serve every register and ring color — worth doing, and it is an edit to the *color declarations only*, not to the path data, so it does not violate the no-redraw rule.

## The files

Dimensions and alpha measured from the files themselves.

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
| `kwp_logo_short_blue.png` | 496×598 | **no** | `#0026ff` |
| `kwp_logo_short_green.png` | 248×299 | yes | `#39be15` |
| `kwp_logo_short_inverted_blue.png` | 248×299 | yes | `#06038d` |
| `kwp_logo_short_inverted_green_dark.png` | 248×299 | yes | `#046a38` |
| `kwp_logo_short_inverted_green_light.png` | 248×299 | yes | `#39be15` |
| `kwp_logo_short_inverted_navy.png` | 248×299 | yes | `#202a44` |
| `kwp_logo_short_inverted_orange.png` | 248×299 | yes | `#ff8200` |
| `kwp_logo_short_inverted_red.png` | 248×299 | yes | `#ed1d24` |

**`kwp_logo_short_blue.png` has no alpha channel** and therefore carries a baked white rectangle. On any surface that is not white it shows as a white box. Do not place it on a dark background; prefer `kwp_logo_short_inverted_blue.png` or the SVG.

Six of the twelve PNGs are Adam7-interlaced. Harmless in a browser, but some tooling handles it poorly.

## "Inverted" means "for dark backgrounds," not "for any background"

The inverted marks are white strokes with a thin dark outline. The outline reads against a mid-tone photograph. It does **not** carry the mark on a near-white page.

Measured as the share of the mark's bounding box reaching ≥3:1 against the background — the honest measure of how much of the stroke survives:

| Mark | on `#fbfaf8` (light page) | on `#0a1420` (dark page) |
| :-- | :-- | :-- |
| `kwp_logo_long.png` (dark) | **12.1%** | 1.5% |
| `kwp_logo_long_inverted.png` | 0.8% | **12.3%** |

A factor of about 15 in both directions. Peak contrast is misleading here: the inverted mark's outline touches 17.9:1 even on the light page, but only across a hairline, so the mark reads as a ghost.

**So: dark mark on light backgrounds, inverted mark on dark backgrounds.** Two assets, chosen by register.

The one partial exception is `kwp_logo_short_inverted_navy.png` on a light page (4.5%) — the dark navy ring survives, the white initials inside it do not, so it reads as an empty circle. That is worse than either correct pairing, not better.

## Ring colors against the system's chroma ceiling

The system caps chroma at **0.091** (`--teal-300`, the most saturated brand color). Measured in OKLCH:

| Ring | Hex | L | C | vs ceiling |
| :-- | :-- | :-- | :-- | :-- |
| navy | `#202a44` | 29% | 0.050 | under |
| green (dark) | `#046a38` | 46% | 0.116 | 1.3× over |
| green (bright) | `#39be15` | 70% | 0.223 | 2.4× over |
| orange | `#ff8200` | 73% | 0.185 | 2.0× over |
| blue (deep) | `#06038d` | 30% | 0.198 | 2.2× over |
| blue (bright) | `#0026ff` | 47% | 0.300 | **3.3× over** |
| red | `#ed1d24` | 60% | 0.234 | 2.6× over |

For comparison, the brand's own teals sit at 0.070–0.091, and the two channel accents already recorded in `tokens/base.css` — KPLS `#4aa3ac` (0.085) and MPSAS `#2f8079` (0.078) — are both under it.

**This is not automatically a violation.** SPEC §10 permits deviation justified by function, and a logo is identity rather than data. But it is a real tension and it should be decided rather than inherited: on a surface governed by the ceiling, a `#ff8200` ring is the loudest thing on the page by a factor of two, and it will out-shout the content it sits beside.

Only `navy` is currently usable without that conversation.

# Signature motion — exploration

The short ringed mark, written in the order Kevin writes it: the glyph first, then the ring
drawn clockwise from the upper left, where the signature starts. About four seconds, played
once, with a Replay button.

**Status: exploration.** No surface uses this yet. Putting it in the site header would change
the shared chrome rule ([`header-footer-design-system.md`](../../docs/header-footer-design-system.md),
KWP-16), and that decision gets made on its own.

| | |
| :-- | :-- |
| Mark | `logo_short.svg` / `logo_short_ring_teal.svg` (light), `_inv` / `_ring_inv_teal` (dark) |
| Glyph | ~2.6s, uncovered in first-arrival order (`timemap.png`) |
| Ring | ~1.1s after a 0.18s pause, clockwise from −132°, the angle of the glyph's first stroke |
| Reduced motion | Shows the finished mark and says why; nothing animates |

## Why this is not a redraw

[`logos/PROVENANCE.md`](../../logos/PROVENANCE.md) forbids redrawing the glyph. The usual
way to animate handwriting is to trace the letters as a new stroked path and draw that path,
which is a redraw. This page does something else:

- **All ink on screen comes from the vendored files, unmodified.** The page loads
  `../../logos/*.svg` by path, the same as every other example.
- **The glyph is uncovered, not drawn.** `timemap.png` records, for each pixel of ink, when
  the pen first reaches it. The page uncovers pixels in that order on a canvas, compositing
  the real glyph file through the growing mask.
- **The ring is uncovered by a masked brush** following the circle's own geometry, since a
  circle cannot leak into anything.
- **At the end the canvas is removed and the ringed file shows by itself**, so the resting
  state is the file exactly.

Kevin reviewed this reasoning and accepted it on 2026-09-27.

## Why a time map and not a brush

The first version used a round brush, a stroked path inside an SVG mask. It had to be wider
than the thickest part of the stroke (~50px in the 496×598 space), so its front edge reached
ahead of the pen at forks. Kevin caught it on his phone: going up the short stem, it uncovered
the start of the **second downstroke** early. A thinner brush would leave the thick parts
uncovered. Assigning each pixel its own arrival time fixes the problem at any stroke width.

## The stroke order is Kevin's

[`stroke-order/`](stroke-order/) holds his nine marked-up frames, 01–09. The order is:

1. First downstroke, top to bottom.
2. Up to the top of the short stem.
3. Back down it (the second downstroke) into the valley.
4. Up to the second peak, and back down it, heading right.
5. Down the **right** side of the descender loop, and back up the left.
6. Up the stem, over the bowl, ending on the bowl's tail.

The first build got step 5 backwards. The frames are the reference, not a guess from the
skeleton. `ROUTE` in `timemap.py` is this list written as coordinates.

## Viewing it

Serve the repo root over http and open this directory:

```bash
python3 -m http.server 8000     # from the repo root
# then http://localhost:8000/examples/signature-motion/
```

It **will not animate from `file://`**. A canvas cannot read pixels from a local file, so the
page cannot read the time map; it shows the finished mark and a message saying so. The paths
are relative, so like the other examples it only works from inside this directory.

## Rebuilding the time map

You only need this if the vendored glyph changes upstream.

1. Render `logos/logo_short.svg` at 496×598 on white in Chromium, saved as `glyph.png` here.
   (Chromium, because PROVENANCE records cairosvg mishandling these files.)
2. `python3 timemap.py` (numpy, scipy, scikit-image, pillow). It prints the path length and
   pixel count.
3. Check a frame at the short stem: its top should be complete with nothing to its right yet.

`timemap.py` lives here, not in `tools/`, because it is one example's build step and not repo
tooling. `tools/` stays the verifier.

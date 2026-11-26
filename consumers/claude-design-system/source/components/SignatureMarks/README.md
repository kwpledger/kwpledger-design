# SignatureMarks

How to choose, size and color the kwp signature marks. Use it whenever a surface carries the mark.

- The consumer supplies the file from `assets/Logos/` that matches the ground: black-ink on light, `_inv` on dark. Size by height (`height: Npx; width: auto`).
- Default to the ringed short mark with the teal ring; the ring color names the brand aspect the surface belongs to.
- Do not tint the glyph, redraw it, or recenter the ring; the overflow past the ring is intentional.
- Do not ship a `_ring` file at its `#0026FF` placeholder.

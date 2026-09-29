# Ring loader — exploration

A loading indicator built from the ringed short mark. The initials stay still, and only the ring
moves: it draws clockwise all the way round, pauses briefly, then erases clockwise from its tail,
and repeats. Kevin's idea (2026-09-29): something unobtrusive in the bottom-right corner of a
game while the next screen loads.

**Status: exploration.** No surface uses this yet. It's a sibling of
[`../signature-motion/`](../signature-motion/). That one writes the mark once, and this one loops
while something is loading.

| | |
| :-- | :-- |
| Mark | `logo_short.svg` (light) / `logo_short_inv.svg` (dark), still, never animated |
| Ring | Teal, `--teal-700` on light, `--teal-300` on dark, the default ring colors (`docs/logo-usage.md`) |
| Cycle | 2.6s: draw 42%, beat 8%, erase 42%, beat 8% |
| Start and stop | −144.2°, where the centerline of the k's tall stroke crosses the ring |
| Accessibility | `role="status"`, `aria-label="Loading"`. Reduced motion shows the complete mark, still |

## Why this is within the rules

- **The glyph is the vendored file, unmodified**, loaded by relative path and shown still. Nothing
  about it is animated, traced, or recolored ([`logos/PROVENANCE.md`](../../logos/PROVENANCE.md)).
- **The ring is the ring's own geometry**: center (244.52, 286.04), radius 195.41, stroke 15.45,
  the same values as the circled files. Ring color is the one thing PROVENANCE lets vary.
- **The ring sits under the glyph**, the same layering as `logo_short_ring*.svg`, so the fully drawn
  frame is the ringed mark.

## Why −144.2°

The seam where the ring starts and stops has to sit under ink, or it shows as a notch. The first
prototype used −132°, the angle from the ring's center to the **tip** of the k. The ring doesn't
pass through the tip. It crosses the stroke lower down. Kevin spotted the seam sitting a few
degrees to the right of the stroke.

Measured from a Chromium render of `logo_short.svg` at 496×598: the k's centerline crosses the
ring's centerline at **−144.2°**, and the ink covers the ring from −148.7° to −139.7°. Starting
at −144.2° centers the seam in that 9° band. `../signature-motion/` had the same −132° mistake
and was corrected in the same commit.

## Open

- **Size.** On the stand-in game screen the whole mark is 52px tall, where the strokes are thin.
  `logo-usage.md` measures the badge at 104px tall. Check it on a real screen before using it.
- **Timing.** 2.6s is a first guess. A loader usually feels better steady than fast.

## Viewing it

Serve the repo root over http and open this directory, the same as the other examples:

```bash
python3 -m http.server 8000     # from the repo root
# then http://localhost:8000/examples/ring-loader/
```

Unlike `signature-motion`, this one also works from `file://`. It reads no pixels, so the browser
has nothing to block.

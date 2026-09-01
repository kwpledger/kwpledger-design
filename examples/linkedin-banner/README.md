# LinkedIn banner — template

Built against [`docs/linkedin-banner-design-system.md`](../../docs/linkedin-banner-design-system.md).
This is the **reference implementation and the working template**: open `index.html`, swap the
four `REPLACE ME` blocks in Mode A, re-render.

| | |
| :-- | :-- |
| Canvas | **1584×396**, 4:1 (§0.1). LinkedIn's native size — no resampling on upload. |
| Register | **Dark** (§3) |
| Reserve | **Left 528px carries no content** (§1.1). The avatar sits there. |
| Modes | **A — event** (four slots) · **B — standing** (between events) |
| Mark | `logo_long_inv.svg`, 96px tall, right side. No ring. |
| Exports | `linkedin-banner-event.jpg` · `linkedin-banner-standing.jpg`, both 1584×396 q92 |

## The two modes are both in this one file

Scroll down in `index.html`. Mode A is the first `.canvas`; Mode B is the second, which adds
`class="standing"`. They share every rule — the second only hides the eyebrow and meta row,
drops the title to 44px, and mutes the subtitle.

**Mode B is not a fallback, it is the resting state.** A banner still advertising a conference
that already happened is worse than one advertising nothing, so switching back is part of
finishing an event rather than a separate task.

## Rendering it

`index.html` is the source. Open it in a browser and screenshot the `.canvas` element at a 1×
device pixel ratio, or drive headless Chromium to do the same. No renderer ships in this repo on
purpose — `tools/` holds the verifier and the math it needs, and stays that size.

Both exports came from that one file: a 1584×396 element screenshot at scale 1, JPEG quality 92.

The two `@font-face` rules point at `../../fonts/`, and the mark at `../../logos/logo_long_inv.svg`.
Both are relative, so the file only renders correctly from inside this directory.

## Seeing what you are protecting

Add `class="guides"` to a `.canvas` to paint the 528px reserve with a dashed edge and a label:

```html
<div class="canvas guides">
```

It is a dev overlay. **Never export with it on** — it is preflight item 2 for a reason.

Better still, drop a circle at the lower left at profile-photo size and judge the composition
with it there. The empty third is not wasted space; the avatar *is* the left-third composition,
and the banner reads wrong without it precisely because it is designed to be covered.

## Changing the copy

Budgets are in §6 and they are tight because the banner is read while scrolling, at maybe half
this pixel size. The one that bites: **the subtitle must be exactly one line in Mode A.** Two
lines total roughly 312px against a 300px budget and the overflow is clipped silently, from the
bottom, where the date lives.

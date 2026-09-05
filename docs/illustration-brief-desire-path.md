# Desire-path illustration — brief for a generator

A single editorial illustration: an official paved walkway takes a long route to a
destination while a worn footpath cuts straight across the grass. Workers with laptops
use the unofficial path. The official path stays open and usable.

This is a **layer-3 consumer** of [the kwp design system](SPEC.md). It defines nothing new
about color; it decides which settled values get spent on which shape. Where this file and
[SPEC.md](SPEC.md) disagree, SPEC.md wins.

Hex is copied from [PALETTE.md](PALETTE.md) because the tool that renders this — ChatGPT,
Midjourney, whatever — cannot take a dependency on this repo. That is the normal case.

**Part 1 is for Kevin: the decisions and why.** **Part 2 is the block to paste.**

---

# Part 1 — The decisions

## 1.1 The idea is a right triangle

The whole illustration is one geometric fact: **the paved route is two legs of a right
triangle; the desire path is the hypotenuse.** Everything else is staging.

That shape does the arguing without a caption. It also makes the "still usable" requirement
free — nobody looks at two legs of a triangle and thinks *blocked*, they think *longer*.
No barricade, no crack, no cone, no obstacle is needed, and adding one would change the
claim from "the route doesn't match the work" to "the route is broken."

## 1.2 Value, not hue, carries the story

Three fills at three clearly separated lightnesses, so the illustration survives grayscale:

| Element | Hex | OKLCH L |
| :-- | :-- | :-- |
| Paved walkway | `#fbfaf8` | 0.985 |
| Lawn | `#9ccca4` | 0.800 |
| Desire path | `#0d5c58` | 0.430 |

The desire path is the darkest thing on the canvas and therefore the first thing seen. That
is the correct emphasis: the worn path is the *evidence*, the thing the illustration is
about. The paved route is quiet but plainly present — which is the editorial point stated in
value terms rather than in a caption.

## 1.3 The trap this brief exists to prevent

The obvious assignment is **sand paving on pale-green grass**: `--sand-200` `#e3e0da` on
`--data-4` surface `#c9e7ce`. Measured, that pair is **1.01:1** — the two fields are within
0.008 of each other in OKLCH lightness. The paved path would be functionally invisible, and
a generator would "fix" it by saturating the green until it clears the chroma ceiling.

Hence `#9ccca4` for the lawn, which is `--data-4`'s *border* value in light mode. Used here
as a field, not as a category — the illustration encodes nothing categorical, so no slot is
being spent. It is the only green in the light register at a lightness that lets a pale
paved path *and* a deep teal path both separate from it. Chroma 0.0754, under the 0.091
ceiling (SPEC §4.6), in gamut.

## 1.4 No status colors. This is the one rule most likely to get broken.

Every instinct says: paved path in `--warning` amber, or `--danger` red for the detour.
**Wrong, and it inverts the brief.** Status hues are outcomes (SPEC §5). Putting one on the
paved route says the route *failed*, when the entire point is that it works fine and is
simply pointed somewhere the work isn't. The grass is likewise not `--success` green.

Same rule in the other direction: the desire path is not "correct," it is *revealing*. It
gets the brand accent because accent means **where attention goes**, not because it means
good.

## 1.5 The text-label rule, and why "no text" is still compliant

SPEC §8: color is reinforcement, never the sole carrier of meaning; every color-coded axis
carries a text label. This illustration has **no color-coded axis** — the two routes are
told apart by geometry (straight diagonal vs. right-angle dogleg; narrow and irregular vs.
wide and segmented), and color only reinforces that. So a wordless illustration does not
break the rule.

The operational test, which replaces the label: **desaturate the output. Both routes must
still be distinguishable and the story must still read.** If it fails that, the color was
carrying the meaning and the illustration is wrong regardless of how it looks in color.

## 1.6 Measured contrasts

Every pair used, computed with `tools/color.mjs`:

| Pair | Ratio |
| :-- | :-- |
| Desire path `#0d5c58` on lawn `#9ccca4` | **4.31** |
| Paved `#fbfaf8` on lawn `#9ccca4` | **1.74** |
| Worker `#1a1917` on lawn `#9ccca4` | **9.69** |
| Worker `#1a1917` on desire path `#0d5c58` | **2.25** — too low, see below |
| Keyline / laptop `#fbfaf8` on desire path `#0d5c58` | **7.49** |
| Laptop `#e3e0da` on worker `#1a1917` | **13.34** |
| Doorway `#0d5c58` on destination slab `#e3e0da` | **5.93** |

**The 2.25 is the one to design around.** Where a worker silhouette overlaps the desire
path, hold a 4px `#fbfaf8` gap between figure and path. Standard flat-illustration keyline;
without it the figures dissolve into the band they are supposed to be walking on.

**One acknowledged grayscale collision:** `--ink-500` `#5c5a57` (L 0.468) and `--teal-700`
`#0d5c58` (L 0.430) are near-identical desaturated. They are only ever used on different
shapes — a 3px outline vs. a filled band — so it holds. Do not introduce a third `#5c5a57`
element without re-checking this.

## 1.7 One register per canvas

A fixed-size export cannot respond to `prefers-color-scheme`, so it commits to one register.
**Light**, matching `examples/` and the infographic series. The dark swap is in §2.4 if this
ever needs to sit on a dark deck — it is a separate render, never a filter applied to the
light one.

---

# Part 2 — The block to paste

Everything below the rule is written for the generator. Paste it whole. If a size is needed,
say which: **1080×1350 (4:5)** to sit with the LinkedIn series, or **1400×1000 (7:5)** for a
blog header.

---

## PROMPT — paste from here

Create a flat geometric editorial illustration. Follow the color values and rules below
exactly. **Do not adjust, brighten, saturate, or substitute any color.** This palette is
deliberately low-saturation; if your output looks more vivid than these values, you have
substituted your own palette and it is wrong.

### Scene

A near-plan view (looking down at a shallow angle, no sky, no horizon) of a lawn between two
points.

- A rectangular **lawn** occupies the middle of the frame.
- An **official paved walkway** runs from a starting point at one corner, along two sides of
  the lawn, turning at a right angle, and arrives at a **destination** at the opposite
  corner. It is clean, intact, continuous, and completely unobstructed. Nothing blocks it.
  No barricade, no cone, no crack, no puddle, no fence, no closed gate.
- A **worn footpath** cuts diagonally straight across the lawn, from the same starting point
  to the same destination. It is the hypotenuse of the right triangle the paved route makes.
  It is narrower than the paved walkway and its edges are slightly irregular — worn by
  repeated feet, not designed.
- **Both routes end at the same doorway.** This is essential. The paved route is not a dead
  end and not a detour around damage; it simply takes longer.
- **One or two workers** walk on the diagonal footpath, each carrying a laptop as a small
  flat slab under one arm. Simple flat silhouettes, no facial features.

### Exact colors

| Element | Fill | Notes |
| :-- | :-- | :-- |
| Background / negative space | `#fbfaf8` | Warm off-white |
| Lawn | `#9ccca4` | Muted sage green. Flat, no texture, no blades of grass |
| Official paved walkway | `#fbfaf8` | With `#e3e0da` joint lines across it every so often, reading as paving slabs, and a thin `#e3e0da` kerb along both edges |
| Worn footpath | `#0d5c58` | Deep teal. Solid flat fill, slightly irregular edges |
| Destination block | `#e3e0da` | With a 3px `#5c5a57` outline |
| Doorway on the destination | `#0d5c58` | A simple notch or rectangle |
| Starting block | `#e3e0da` | With a 3px `#5c5a57` outline. Smaller than the destination |
| Worker silhouettes | `#1a1917` | Near-black, warm |
| Laptops | `#e3e0da` | Small flat rectangles |

Use no other colors. There is no fourth hue in this image.

Where a worker silhouette crosses the teal footpath, leave a 4px `#fbfaf8` gap between the
figure and the path so the figure stays readable against it.

Keep the paved walkway running along the edge of the green lawn for its whole visible
length, so it is always seen against green rather than against the background.

### Style

- **Flat vector.** Solid fills only. No gradients, no drop shadows, no glows, no ambient
  occlusion, no paper or noise texture, no watercolor, no sketch lines, no 3D rendering, no
  isometric extrusion.
- **Geometric.** Straight edges, right angles, one clean diagonal. The footpath's edge
  irregularity is the only organic line in the image and it should be subtle.
- **Generous negative space.** At least 15% clear margin on all four sides. The lawn and the
  two routes should occupy roughly the middle two-thirds. Do not fill the corners with
  scenery.
- Minimal scenery. At most two or three simple flat shapes for trees or benches, in
  `#9ccca4` or `#e3e0da`, and only if the composition feels empty without them. Zero is an
  acceptable answer.
- Workers should be small in the frame. This is a picture of a route, not a portrait.

### Do not include

- **No text of any kind.** No labels, no captions, no signage, no lettering on the buildings,
  no watermark, no signature.
- **No logos or wordmarks.**
- **No robots, androids, circuit-board motifs, glowing nodes, neural-network graphics, or any
  "AI" visual shorthand.**
- **No warning signs, hazard tape, keep-off-the-grass signs, cones, or barriers.**
- **No arrows.** The paths themselves show the routes; an arrow would be decoration.
- **No red, amber, or traffic-light green anywhere.** In this system those three hues mean
  success, warning, and error. Nothing in this illustration is an error. The paved walkway is
  not a failure and must not be colored as one.
- No speech bubbles, no emoji, no icons, no stock-illustration mascots.

### Check before returning the image

1. Both paths visibly end at the same door.
2. The paved walkway is unobstructed along its entire length.
3. Only the six hex values listed above appear. Nothing has been brightened.
4. **Desaturate the image mentally: the two routes are still clearly different from each
   other, and it is still obvious which one is worn and which one is paved.** If that fails,
   the colors are doing work the shapes should be doing — fix the shapes.
5. No text anywhere in the image.

## PROMPT — paste to here

---

## 2.4 If it has to be dark

A separate render, not a filter. Same geometry, these values:

| Element | Light | Dark |
| :-- | :-- | :-- |
| Background | `#fbfaf8` | `#0a1420` |
| Lawn | `#9ccca4` | `#376040` |
| Paved walkway | `#fbfaf8` | `#10202f`, joints `#1e3245` |
| Worn footpath | `#0d5c58` | `#5fbdb4` |
| Destination / start blocks | `#e3e0da` | `#10202f`, 3px `#9aabbb` outline |
| Doorway | `#0d5c58` | `#5fbdb4` |
| Workers | `#1a1917` | `#e6ecf2` |
| Laptops | `#e3e0da` | `#1e3245` |

Note the inversion: in dark the footpath becomes the **lightest** element and the workers go
pale. The value *ordering* flips with the register; the value *separation* does not — paved
L 0.237, lawn L 0.449, footpath L 0.738, three clean bands the same as light.

Measured, same as §1.6:

| Pair | Ratio |
| :-- | :-- |
| Footpath `#5fbdb4` on lawn `#376040` | 3.24 |
| Paved `#10202f` on lawn `#376040` | 2.29 |
| Worker `#e6ecf2` on lawn `#376040` | 6.06 |
| Worker `#e6ecf2` on footpath `#5fbdb4` | **1.87** — keyline needed |
| Doorway `#5fbdb4` on block `#10202f` | 7.42 |

The keyline problem mirrors light and is slightly worse: where a pale worker overlaps the
pale footpath, hold the 4px gap in `#0a1420` rather than `#fbfaf8`. Re-run the grayscale
check on the dark render separately — it is not implied by the light one passing.

---

## 2.5 What this file does not do

It does not add, change, or rename a token, and it does not bump a version. It spends
existing values on one illustration and records the arithmetic so the next person does not
re-derive it. If the illustration turns out to want a green this system does not have, that
is a conversation with Kevin, not an edit here (SPEC §11).

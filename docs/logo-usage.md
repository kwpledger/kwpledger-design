# Read this before placing the mark.

Which signature mark goes on a surface, and what color its ring is.

This sits **beside** [SPEC.md](SPEC.md) rather than inside it: the spec governs color, type and
spacing tokens, and the mark is none of those. It is the repo-wide authority for the question
every consumer format kept re-deciding on its own — [the infographic
format](infographic-design-system.md), [the quote-post format](quote-post-design-system.md) and
[the LinkedIn banner format](linkedin-banner-design-system.md) each answered it differently, and
those answers are now downstream of this file.

[`logos/PROVENANCE.md`](../logos/PROVENANCE.md) remains the authority on **the assets** — where
they came from, what may not be touched, what is superseded. This file is the authority on
**placement**. Where they disagree about an asset, PROVENANCE wins.

---

## 0. What this settles

**Kevin's decision, 2026-09-06.** Four things, and the fourth is the one that ends the argument:

1. **The ringed short mark is the default.** Not a badge treatment belonging to one format.
2. **The long mark takes a ring too**, under the same color rules.
3. **Ring color encodes which aspect of the brand the surface belongs to** — the axis
   PROVENANCE always said the ring was *intended* to carry.
4. **There is a default ring color for surfaces with no aspect of their own: teal.** The absence
   of an assignment is no longer a reason to drop the ring.

Point 4 is the load-bearing one. Every format that reached for a ringless mark did it for the
same honest reason — "which color means what is undecided," so a colored ring would assert an
identity nobody had handed out. That reasoning was correct and it is now spent: the unassigned
case has a color.

**What is still open:** which color belongs to which aspect. The default is settled and
shippable today. **The two channel rings are not** — measured, they are not distinguishable from
the default ring or from each other (§4.2), which is a defect this file introduced by assigning
each channel's ring to be that channel's accent. The channel *palettes* are fine; the assignment
was wrong. Nothing else in this document waits on the fix.

---

## 1. The default is short, with a ring

| Mark | Share of use | When |
| :-- | :-- | :-- |
| **Short, ringed** | **75–80%** | The default. Badges, corners, footers, headers, avatars, anywhere the mark is an attribution rather than a title. |
| **Long, ringed** | **15–20%** | When the surface should read the full `kwpledger`, not initials — a footer lockup on a long document, a hero placement, anywhere `kwp` alone would be too thin a signature. |
| **Ringless, either length** | The remainder | The exception. Needs a stated reason. |

Those percentages are **an expectation, not a quota.** They describe what the body of work
should look like from a distance. Nobody counts them, and no single surface is wrong for being
in the 20%.

### 1.1 Ringless is the exception, and it needs a reason

Two reasons are known good:

- **The ring cannot survive the size.** The stroke renders at 2.7px on a 104px-tall badge
  (measured — PROVENANCE, *Ring geometry*). Scale that down far enough and the ring becomes a
  gray smudge that reads as a rendering fault. Below roughly 48px tall, check it in a render
  before assuming it holds.
- **The composition already has that circle.** A mark sitting inside or beside a circular
  profile photo, avatar crop, or badge chrome gets two concentric circles and reads as a
  mistake. The LinkedIn banner's preflight already overlays a circle at profile-photo size for
  exactly this reason.

**"The ring color isn't decided" is no longer one of the reasons.** That is what §0.4 removes.

---

## 2. Ring color is aspect identity

The ring is the only part of the mark whose color varies — the glyph is always black, or white
with a black border in the inverted register (PROVENANCE, and it is absolute).

What the ring color says is: **which part of Kevin's work this surface belongs to.** MPSAS,
KPLS, the portal, and whatever comes next each get a ring, and a viewer who sees two artifacts
from the same aspect should see the same ring on both.

That makes the ring a **third axis**, independent of the two the system already has:

| Axis | Encoded by | Set by |
| :-- | :-- | :-- |
| Light / dark register | `_inv` or not | The viewer's preference, or the canvas |
| Long / short | the file | The composition |
| **Aspect identity** | **ring color** | **What the surface is for** |

**Never wire aspect to the register switch.** This is SPEC §9's rule, and it is why there are
four ringed short files rather than two: a dark-canvas MPSAS surface takes the *inverted* mark
with the *MPSAS* ring — not "the dark-mode version of the green one."

---

## 3. A ring slot is two hexes, one per register

This is the rule the earlier arguments were missing, and it is the same rule the tokens already
follow: **author light and dark together, because neither is derivable from the other.**

A single hex cannot serve both canvases. Measured against the two reference grounds, with
`tools/color.mjs`:

| Candidate | Hex | L | C | on `#fbfaf8` (light) | on `#0a1420` (dark) |
| :-- | :-- | :-- | :-- | :-- | :-- |
| `--teal-300` / `--accent` | `#5fbdb4` | 0.738 | 0.091 | 2.14:1 ✗ | **8.31:1** ✓ |
| `--teal-700` | `#0d5c58` | 0.430 | 0.070 | **7.49:1** ✓ | 2.37:1 ✗ |
| KPLS accent | `#4aa3ac` | 0.665 | 0.085 | 2.83:1 ✗ | **6.28:1** ✓ |
| MPSAS accent | `#2f8079` | 0.549 | 0.078 | **4.49:1** ✓ | **3.96:1** ✓ |
| navy | `#202a44` | 0.289 | 0.050 | **13.64:1** ✓ | 1.30:1 ✗ |

The pattern is a lightness band, not a hue problem. A ring lands in **both** registers only if
it sits near L 0.52–0.55; anything lighter fails on paper, anything darker vanishes on a dark
canvas. MPSAS's accent happens to sit in that band. Most colors will not.

**So a ring color is specified as a pair, and the pair carries one name.** The teal ring is
`#0d5c58` on light and `#5fbdb4` on dark, and both are "the teal ring" — the same way
`--accent` is one token with two values.

The 3:1 floor is the bar because the ring is a thin stroke and a graphical object, not text.
Meet it in the register you are actually shipping; do not average the two.

---

## 4. The assignment register

**Settled:**

| Aspect | Ring | Light hex | Dark hex |
| :-- | :-- | :-- | :-- |
| **Default / miscellaneous** — the portal, and anything without an aspect of its own | **teal** | `#0d5c58` (`--teal-700`) | `#5fbdb4` (`--teal-300`) |

Teal is the default for the reason it was always the least-bad ring: it is the only color on
record that is **at or under the 0.091 chroma ceiling and legible**, it collides with no status
hue, and it is the brand's own thread — `tokens/base.css` describes teal as the family both
channels sit inside without either dominating. A default ring should read as the parent, and
this one does.

**The channels — do not ship these yet.** Kevin called the scheme *semi-permanent* on
2026-09-06, and an earlier revision of this file recorded them as shippable on that basis. **That
was wrong, and §4.2 is why:** measured, these two rings are not distinguishable from the default
ring, so they cannot carry the identity §2 asks them to carry.

| Aspect | Ring | Light hex | Dark hex | Status |
| :-- | :-- | :-- | :-- | :-- |
| MPSAS | dark green | `#2f8079` | `#2f8079` | **Blocked — §4.2** |
| KPLS | dark blue | none yet | `#4aa3ac` | **Blocked — §4.2** |

Both are the channel accents already on record in `tokens/base.css`. The default teal ring is
unaffected and remains shippable; this blocks channel-ringed marks only.

### 4.1 Why these two behave differently, and why that is not an accident

MPSAS's accent clears the §3 floor on both canvases. KPLS's clears it only on dark. That looked
like an oversight when this file was first written. It is not, and the reason is the order these
things were made in.

**Kevin, 2026-09-06: MPSAS is the explicit basis for the light form of the design, and KPLS is
the explicit basis for the dark form.** Both channel schemes were built in Claude Design *before*
the website was a thought — at the time the only things that were going to exist in this scheme
were the two YouTube channels and the site, with the apps and games walled off on their own
subdomains and no crossover intended. The design system grew outward from those two palettes
later, when the site started linking to the apps.

So KPLS's accent has no light-register partner because **KPLS was never authored for a light
canvas.** It is a dark-form palette doing exactly what it was made to do. The gap is inherited
from the origin, not a mistake in the value.

Two consequences:

- **A KPLS mark cannot go on a light canvas yet.** `#4aa3ac` measures 2.83:1 there and fails the
  §3 floor. When one is needed, it is a darker partner at the same hue (h204) and one `sed` —
  but the value is Kevin's to set, and he has deferred it (§4.4).
- **"Dark blue" and `#4aa3ac` still do not obviously describe the same color.** `#4aa3ac` is a
  mid-lightness blue-teal. Recorded as the shipping value; flagged as a thing to confirm rather
  than resolved here.

### 4.2 Measured: all three assigned rings are the same color

This is the defect, and it was introduced by this file rather than found in Kevin's palettes.

`tokens/base.css` says teal is *"the thread — both channels accent in teal… the portal sits in
the same family without copying either."* **That is deliberate and it is good brand work.** The
channels are supposed to look related.

§4 then assigned each channel's ring to be that channel's accent, which seemed tidy. It is not:
it points the identity carrier at a family built to be similar. Measured in OKLab —

| Pair | ΔOKLab | Hue+chroma only | Δhue |
| :-- | :-- | :-- | :-- |
| default teal (light) vs MPSAS | 0.119 | **0.0086** | **2°** |
| default teal (dark) vs MPSAS | 0.190 | **0.0122** | **0°** |
| default teal (dark) vs KPLS | 0.078 | 0.0267 | 17° |
| MPSAS vs KPLS | 0.119 | 0.0253 | 17° |

**MPSAS sits at h187 — the same hue as the default teal**, at effectively the same chroma. The
system's own adjacent-tint gate is ΔOKLab ≥ 0.02 (SPEC §7); on hue and chroma these clear
0.0086. The pairs differ almost entirely in **lightness**.

That is the fatal part, and it is worse than a near-miss on a gate:

**Lightness is already spoken for.** §3 says a ring is two hexes that differ in lightness,
because that is how it clears 3:1 in both registers. So "MPSAS vs the default" and "light canvas
vs dark canvas" would be encoded on *the same visual channel* — and read off a 2.7px stroke at
badge size. A viewer meeting `#2f8079` cannot tell whether it means *MPSAS* or *the default ring,
light-register variant*. The ring stops being identity and becomes noise.

KPLS at 17° is better but not clear, and it inherits the missing-light-hex problem in §4.1.

**The fix is not to change the channel palettes.** Their reasoning is sound and settled: warm
paper and daylight for MPSAS, navy and polish for KPLS. The fix is to drop the assumption that
**a channel's ring must be that channel's accent.** The ring is signage, not a palette echo —
and precisely *because* the palettes are all deliberately inside the teal family, the rings that
distinguish them have to come from outside it.

Kevin's decision to make. §5.1 records what the bars leave available.

### 4.3 The origin is not permission to wire aspect to register

This is the misreading to guard against, and it is an easy one to fall into: *"MPSAS is the
light basis and KPLS is the dark basis"* is a fact about **where the palettes came from.** It is
not a mapping, and it must never become one.

> Light/dark is user preference; channel or section identity is not. Never wire them to the same
> switch. — SPEC §9

A dark-register MPSAS graphic is still MPSAS. A light-register KPLS page is still KPLS — that is
precisely the case that needs the missing hex, and the answer is to author the hex, never to let
the surface become MPSAS because it is light. **Four combinations, not two**, exactly as §2 says.

### 4.4 Reconsidering the channel palettes is a live thread, and it is Kevin's

Kevin has raised revisiting the MPSAS and KPLS schemes now that the system has grown past the
two channels it started as, and now that the feedback-loop thinking has somewhere to land. He
has put that behind some thought on his part; the original pair took a couple of weeks in Claude
Design, and he expects a redo to go faster.

**Nothing in this file waits on it.** That is what "semi-permanent" buys: the rings above are
shippable today, and when the palettes move, what changes is a `stroke` attribute in two files
and the two rows in §4 — the placement rules, the register pairing in §3, and the bars in §5 all
survive unchanged. **Do not pre-emptively redesign the channel colors to get ahead of this.**

**Open.** Every other aspect. Red, orange, and the rest of the raster set's hexes are
**unassigned** — a file existing in `logos/` at some hex has never been evidence of a meaning,
and still is not.

---

## 5. Bars a new ring color must clear

Before an aspect gets a ring, its color clears four:

1. **Legible in the register it ships in** — ≥ 3:1 against that canvas (§3).
2. **At or under the 0.091 chroma ceiling** — SPEC §4.6. Every ring in the superseded raster set
   except navy and teal runs 1.3× to 3.3× over; the upstream default `#0026FF` is 3.3× over and
   the loudest value that has ever touched this system.
3. **No status-hue collision.** Red `#ed1d24` sits on `--danger` at h27 exactly, and both greens
   land on `--success`. A ring that borrows a status hue makes an identity mark look like an
   error state.
4. **Distinguishable from the rings already assigned** — the whole point is that two artifacts
   from the same aspect match and two from different aspects do not.

Bar 2 is the one with give in it. SPEC §10 permits deviation justified by function, and a logo
is identity rather than data — but that is a **conversation with Kevin**, not something a
consuming format decides on its own. Nothing so far has needed it.

### 5.1 What the four bars actually leave available

Swept in 5° steps: chroma capped at 0.091, ≥3:1 in **both** registers, ≥20° from any status hue,
≥25° from the default teal. **41 of 72 hues survive**, so the constraint is real but not tight.

Two bands are worth knowing about before choosing anything:

- **h215–h245 — one hex serves both registers.** `#047689` (h215) measures 5.09:1 light and
  3.49:1 dark; `#006f87` (h220) is 5.56:1 and 3.20:1. A ring here needs no register pair at all,
  which quietly solves §4.1's missing-hex problem. It is also nearer Kevin's own words —
  *"dark blue for KPLS"* — than the recorded `#4aa3ac` is.
- **h95–h130 — the olive-green band**, e.g. `#3f4c02` / `#5a6827` at h120. Reads as "dark green"
  and is 25–35° clear of both the default teal and `--success`.

Recorded as measurements, **not as a proposal.** Which hue means which channel is Kevin's, and
these two bands are where the arithmetic says the room is — not an argument that he should want
either one.

**Never ship a `_ring` file at the hex it arrives with.** Upstream ships all four circled files
`stroke="#0026FF"` as a placeholder meant to be swapped. It is not a neutral default; it is the
worst color in the system.

---

## 6. The files

Naming runs **broad to narrow**: `logo_{long|short}_ring[_inv][_<color>].svg`. No `_<color>`
suffix means the file is still at the upstream placeholder and is **not shippable as-is**.

| | Light canvas | Dark canvas |
| :-- | :-- | :-- |
| **Short, default ring** | `logo_short_ring_teal.svg` | `logo_short_ring_inv_teal.svg` |
| **Long, default ring** | `logo_long_ring_teal.svg` | `logo_long_ring_inv_teal.svg` |
| Short, ringless (§1.1) | `logo_short.svg` | `logo_short_inv.svg` |
| Long, ringless (§1.1) | `logo_long.svg` | `logo_long_inv.svg` |

**Register is not optional.** The black mark on a dark canvas measures 0.0% of its ink box above
3:1 and peaks at 1.1:1 — it disappears. Full measurements in PROVENANCE.

**Size by height, `width: auto`.** The long and short marks have different aspects, so a series
that pins width breaks the day it switches which one it uses.

**A new ring color is one `sed`,** and PROVENANCE carries the recipe and the record. The glyph is
a different XML element from the `<circle>`, so a ring recolor structurally cannot reach it.
**Do not build a recolor pipeline** — `tools/` holds the verifier and the math it needs, and
stays that size.

---

## 7. What this changes downstream

Each consumer format is a **consumer** of this decision, never a precedent for it.

| Format | Was | Now |
| :-- | :-- | :-- |
| [Quote post](quote-post-design-system.md) §4 | `logo_short_ring_inv_teal.svg`, teal justified compositionally | Unchanged file. The justification is now §4 of this doc: teal is the default ring, and this card has no aspect of its own. |
| [LinkedIn banner](linkedin-banner-design-system.md) §5 | `logo_long_inv.svg`, ring explicitly forbidden | The ringed short mark, `logo_short_ring_inv_teal.svg`. |
| [Infographic](infographic-design-system.md) §5.8 | "ships without ring semantics," navy on light | The default teal ring, both registers. Navy is retired as a default. |
| `examples/` | Bare `logo_long.svg` in five footers | Stale, not wrong. Re-marked when each example is next touched — this is not a re-render campaign. |

The quote card is the interesting row: **it does not change.** Its file was right for a
compositional reason and is right again for a semantic one. That is a coincidence, and §4.2 of
that document is kept on the record rather than rewritten, because the reasoning it contains was
sound when it was written.

---

## 8. Out of scope

- **A shared header/footer lockup.** Still KWP-16, still out of scope per SPEC §12. This file
  says which mark and which ring; it does not say how a header is built. **Do not invent one.**
- **The remaining aspect assignments.** §4 leaves them open deliberately. Adding one is a
  conversation with Kevin plus a row in that table, not a file dropped in `logos/`.
- **Recoloring the glyph.** Not now, not ever, not for any aspect. PROVENANCE is the authority
  and it is absolute.
- **Retiring the superseded rasters.** Deleting them is a major bump under the pinning model and
  Kevin's decision to make.

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

**What is still open:** which color belongs to which aspect beyond the default. **Everything
sits on the teal ring until that is settled** (§4), including MPSAS and KPLS surfaces — Kevin's
call on 2026-09-07, and not urgent. Dedicated ring colors do exist in the channels' own
`brand-tokens.css`, but all three break the chroma ceiling or land on a status hue, and they are
recorded in §4.2 as history rather than as shipping values.

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

**The channels — everything sits on teal until the separation is settled.**

**Kevin's decision, 2026-09-07:** the channel rings each need to be *"something that doesn't
break the system."* No exemption is being spent on them. **Until replacements are authored,
MPSAS and KPLS surfaces take the default teal ring** — the same two hexes as everything else.

| Aspect | Ring today | When settled |
| :-- | :-- | :-- |
| MPSAS | **the default teal ring** | A hue under the ceiling, off `--success`, and clear of teal |
| KPLS | **the default teal ring** | Same bars, plus a light/dark pair — its original hex is invisible on dark |
| spare / third aspect | *unassigned; no surface uses one* | Same bars, off `--danger` |

This is not a blocker on shipping anything. A channel mark placed today is correct with the
teal ring; when the separation lands it is a `stroke` swap and these rows.

**Do not use the channel accents as rings** — that was this file's original error and §4.2
measures why. **Do not use the original ring hexes either** — they exist, they are recorded in
§4.2, and all three break the system.

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

That is a fact about the **accents**, and it is worth keeping because it explains the shape of
both palettes. It is **not** a fact about the rings — the rings were always separate values, and
§4.2 has them.

### 4.2 The rings already existed, and this file had the wrong values

**Correction, 2026-09-07.** Everything below about the *accents* is measured and stands. The
framing around it was wrong in a way worth recording, because getting it wrong is what this
document exists to prevent.

`brand-tokens.css` — in the Claude Design archive at
`kwpledger-site/.addedbykevin/Claude Design Project - YouTube Channel Brand Design - KPLS and MPSAS/`
— has carried dedicated ring tokens from the beginning:

```css
--ring-kpls:  #1a1f8f;   /* dark blue  */
--ring-mpsas: #1c7a3f;   /* dark green */
--ring-spare: #c0392b;   /* red        */
```

**The rings were never the channel accents.** The original design already separated them, which
is precisely the fix the rest of this section argues toward. This file recorded `#2f8079` and
`#4aa3ac` — the accents — because that archive was not in version control when §4 was written.
It is now.

Those three separate cleanly from each other and from the default teal (ΔOKLab 0.24–0.45 against
a 0.02 gate). **They fail on the other bars:**

| Ring | Hex | Chroma vs 0.091 | on light | on dark | Nearest status hue |
| :-- | :-- | :-- | :-- | :-- | :-- |
| `--ring-kpls` | `#1a1f8f` | 0.177 — **1.9× over** | 12.30 ✓ | **1.44 ✗** | clear |
| `--ring-mpsas` | `#1c7a3f` | 0.125 — **1.4× over** | 5.16 ✓ | 3.44 ✓ | **`--success`, 1°** |
| `--ring-spare` | `#c0392b` | 0.174 — **1.9× over** | 5.21 ✓ | 3.41 ✓ | **`--danger`, 3°** |

All three break the chroma ceiling; MPSAS sits essentially *on* `--success` and the spare
essentially *on* `--danger`; and KPLS vanishes on a dark canvas at 1.44:1, so it would need the
§3 register pair regardless.

SPEC §10 would permit an identity exemption. **Kevin declined it on 2026-09-07** — the rings come
under the system rather than the system bending around them. So these three hexes are **recorded
history, not shipping values.** Everything sits on teal until replacements are authored.

The rest of this section is why the *accents* were never a candidate either.

---

`tokens/base.css` says teal is *"the thread — both channels accent in teal… the portal sits in
the same family without copying either."* **That is deliberate and it is good brand work.** The
channels are supposed to look related.

`tokens/base.css` says teal is *"the thread — both channels accent in teal… the portal sits in
the same family without copying either."* **That is deliberate and it is good brand work.** The
channels are supposed to look related.

Pointing the ring at that family makes the identity carrier unable to carry identity. Measured
in OKLab —

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

KPLS at 17° is better but not clear.

**The channel palettes are not the problem** — warm paper and daylight for MPSAS, navy and polish
for KPLS, and that reasoning is settled. The rule this lands on:

> **A ring is never a palette echo.** Precisely *because* the channel palettes deliberately sit
> inside the teal family, the rings that distinguish them must come from outside it.

That rule is what the original `brand-tokens.css` already followed. The replacements have to
follow it too, while also clearing the four bars in §5. §5.1 records what that leaves.

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

**Nothing in this file waits on it, and nothing is urgent.** Kevin, 2026-09-07: *"It's not a
pressing issue. I would like to get it settled, but it's not urgent."* Teal holds the whole
system in the meantime.

When the ring colors do land, what changes is a `stroke` attribute and the rows in §4. The
placement rules, the register pairing in §3, and the bars in §5 survive untouched — none of the
structure is load-bearing on which hues win. **Do not pre-emptively redesign the channel colors
to get ahead of this.**

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

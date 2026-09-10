# Read this before building a header or a footer.

The shared chrome rule for every kwp surface — which elements appear, in what order, and how the
signature mark is treated.

This is **KWP-16**, and it retires two standing prohibitions: SPEC §12's "headers and footers are
deliberately unspecified… do not invent one" and [`logo-usage.md`](logo-usage.md) §8's "this file
says which mark and which ring; it does not say how a header is built." Both were correct while
this document did not exist. It does now.

Authored 2026-09-08 on Kevin's explicit instruction, from a `runbox-mcp` session with all three
repos connected. That is worth recording because it is a departure from the normal rule in
[AGENTS.md](../AGENTS.md) that guests add and do not change — he authorized the SPEC edits
directly.

This is a **layer-3 consumer** of [the kwp design system](SPEC.md). It defines nothing new about
color, type, or spacing. Where this document and SPEC.md disagree, SPEC.md wins; where it and
[PROVENANCE.md](../logos/PROVENANCE.md) disagree about the marks, PROVENANCE wins.

---

## 0. What this settles

| Question | Answer | §
| :-- | :-- | :-- |
| Is the header in scope for the design system? | **Yes.** It is the entry surface's entry surface. | §1 |
| Which mark goes in a header? | Short, ringed, teal, register-correct. | §3 |
| How big? | Canvas height **2.5rem** default, **never below 2.4rem**. | §3.2 |
| Mark or wordmark first? | Mark, then wordmark, left to right. | §2 |
| One link or two? | **One.** The image is decorative; the text carries the name. | §3.1 |
| How does light/dark work? | Both files ship; CSS hides one. | §4.1 |
| What if a reader force-darkens the page? | It breaks, and that is accepted. Declare `color-scheme` and stop. | §4.2 |
| Does the rule span the page or the column? | **The page.** Full-bleed, every time. | §2.2 |
| What if the consumer can't do any of this? | Tiered. Do what the surface allows, in order. | §5 |

**What this does not do:** ship component CSS. The surfaces cannot share markup — different repos,
different generators, and no markup access at all on two of them — so this names the parts and each
surface implements them. That constraint is the whole reason the rule reads this way, and it has
not changed since it was diagnosed.

---

## 1. Why this is a rule at all

SPEC §10.1 already required it:

> **The entry surface conforms.** A property's first screen — the title screen, the landing page,
> whatever a visitor sees before they have done anything — should read as belonging to the family.

The header *is* that first screen's first element. A requirement existed; no rule sat underneath
it. That gap is what produced the failure this document was written from.

**The trigger, 2026-09-08.** `runbox-mcp.kwpledger.com` was built by emulating a screenshot of
`kwpledger.com` rather than by consuming this system. The token values came out identical — every
hex, every step, every space — and the headers still did not match, because the two pages disagreed
about what `<header>` *means*. On the site it is chrome holding only the wordmark, with the page in
`<main>`. On the MCP page it is an article header holding the `<h1>` and the lede, with the wordmark
in a separate `.masthead` above it. Measured deltas: wordmark 119.61×19.52 vs 100.66×19.3, space
above 26px vs 49px, and the rule running edge to edge vs starting and stopping at the content
column.

**Identical tokens did not produce an identical header, and the header is what a visitor sees
first.** Kevin's framing, which governs: brand identity at the entry surface is the one
non-negotiable in a system that otherwise permits deviation.

---

## 2. The parts, in order

Document order, top to bottom. Anything marked optional may be omitted; nothing may be reordered.

1. **Skip link** — first focusable element on the page, targeting `#main`. The header is the thing
   a keyboard user is skipping over, which is why it lives in this document and not only in a
   consumer's stylesheet.
2. **The lockup** — mark then wordmark, as one link home. §3.
3. **Nav** *(optional)* — after the lockup, same row, opposite end.
4. **The rule** — a full-bleed border closing the header. §2.2.
5. `<main id="main">` — the skip link's target.
6. **The footer.** §6.

### 2.1 The header element is chrome, not an article header

`<header>` at page level holds the lockup and nav and **nothing else**. Page content — the `<h1>`,
any lede, any body copy — belongs in `<main>`. A per-article header is a different element inside
`<main>` and is not what this document governs.

This is the finding the whole ticket turned on. Two reasonable people can read `<header>` two ways;
a shared rule has to pick one, and the box model follows from the pick rather than from the CSS.

### 2.2 The rule is full-bleed. Always.

The closing border belongs to the **full-width element**, with the content column nested inside it:

```html
<header class="site-header">        <!-- border-bottom lives here -->
  <div class="wrap site-header__inner">   <!-- max-width: var(--page) -->
```

Never on the inner column, and never as a separate `<hr>`. A rule that starts and stops at the
content column reads as a divider between two pieces of content; a rule that spans the viewport
reads as the edge of the chrome. They are different statements and only one of them is correct
here.

The same applies to the footer's opening border.

---

## 3. The lockup

**Mark left, wordmark right, vertically centered on each other, `--space-2xs` between them.** The
pair is one unit and one link, pointing at `https://kwpledger.com` (or `/` when the surface *is*
kwpledger.com).

Centered, not baseline-aligned: the mark stands ~2× the wordmark's height (§3.2), and sitting that
on the text baseline throws it upward off the optical center of the row. Baseline alignment is the
right instinct for two runs of type and the wrong one for a badge beside a word.

### 3.1 One link, and the image is decorative

```html
<a class="lockup" href="https://kwpledger.com">
  <img class="lockup__mark lockup__mark--light" src="/logos/logo_short_ring_teal.svg"     alt="" width="496" height="598">
  <img class="lockup__mark lockup__mark--dark"  src="/logos/logo_short_ring_inv_teal.svg" alt="" width="496" height="598">
  <span>Kevin Pledger</span>
</a>
```

Both marks ship and CSS hides one — §4.1 is the mechanism.

**`alt=""` is required, not a shortcut.** The adjacent text already names the link. Giving the image
alt text as well produces an accessible name of "Kevin Pledger Kevin Pledger," which is exactly the
kind of thing four consumers each get wrong in a different way. The mark is decoration *of* a link
that is already named.

Two adjacent links — one on the mark, one on the wordmark — is also wrong: it puts two identical
destinations in the tab order back to back.

**The wordmark text is "Kevin Pledger."** Never `kwp` as text. The initials are the *mark*; setting
them as type is a second, weaker version of the thing the signature already does. (And when they do
appear in prose or filenames they are lowercase — `kwp`, never `KWP`.)

### 3.2 Size by height, and mind the two numbers that are not the same

**Set a height, leave `width: auto`.** The long and short marks have different aspects, so a rule
that pins width breaks the day a surface switches which mark it uses.

But the height you set is the **canvas**, and the canvas carries transparent margin:

| | short (`496×598`) | long (`1038×598`) |
| :-- | :-- | :-- |
| Ink box with ring, as a fraction of canvas height | **0.788** | 0.818 |

So a mark set to `height: 2.5rem` reads optically at **1.97rem**, not 2.5. A consumer sizing to
match a wordmark by eye will land somewhere different from one sizing by the number, and both will
believe they followed the rule. Size the canvas; expect ~79% of it to be ink.

**The floor is 2.4rem, and it comes from the ring.** The ring stroke is `15.45` in a 598-unit
coordinate space — 2.58% of canvas height. Below a 38.7px canvas the stroke renders under 1px and
goes soft, which is the failure that killed the superseded raster set (its ring rendered ~1.6px at
badge size and did not survive).

| Canvas | Ring stroke | Ink height |
| :-- | :-- | :-- |
| 2.0rem (32px) | 0.83px ✗ | 1.58rem |
| 2.25rem (36px) | 0.93px ✗ | 1.77rem |
| **2.5rem (40px)** | **1.03px ✓** | **1.97rem** |
| 3.0rem (48px) | 1.24px ✓ | 2.36rem |

**Default: `height: 2.5rem`.** Derived against PROVENANCE's measured 2.7px stroke at a 104px badge,
which this model reproduces exactly. If a surface needs a smaller mark than 2.4rem, it needs the
**ringless** mark (`logo_short.svg` / `logo_short_inv.svg`) and a reason under
[`logo-usage.md`](logo-usage.md) §1.1 — not a thinner ring.

### 3.3 The wordmark

| Property | Value |
| :-- | :-- |
| Family | `var(--font-display)` |
| Weight | `var(--fw-display)` — explicit; Lora ships at 600 only and inheriting 400 synthesizes |
| Size | `var(--step-0)` |
| Letter-spacing | `0.01em` |
| Color | `var(--fg)`, `var(--accent)` on hover |
| Decoration | none |

`--step--1` at `0.02em` is what the `runbox-mcp` page shipped and it is one type step too small.
That is the measured 119.61 vs 100.66 width delta, and it is a one-line fix.

---

## 4. Register is two files

**Dark mark on light backgrounds, inverted mark on dark backgrounds.** From
[PROVENANCE](../logos/PROVENANCE.md): the black mark on `#0a1420` measures **0.0%** of its ink box
above 3:1 and peaks at 1.1:1. It does not degrade — it disappears.

| | Light canvas | Dark canvas |
| :-- | :-- | :-- |
| Header/footer default | `logo_short_ring_teal.svg` | `logo_short_ring_inv_teal.svg` |

### 4.1 The mechanism: ship both, let CSS choose

**One mechanism, for every surface that can run CSS** — whether it follows system preference or has
its own toggle:

```html
<img class="lockup__mark lockup__mark--light" src="…/logo_short_ring_teal.svg"     alt="" width="496" height="598">
<img class="lockup__mark lockup__mark--dark"  src="…/logo_short_ring_inv_teal.svg" alt="" width="496" height="598">
```

```css
.lockup__mark--dark { display: none; }

@media (prefers-color-scheme: dark) {
  .lockup__mark--light { display: none; }
  .lockup__mark--dark  { display: block; }
}
```

A surface with an explicit theme toggle swaps the media query for whatever selector drives the rest
of its theme (`:root[data-theme="dark"]`, a `.dark` class). Nothing else changes — which is the
whole argument for this shape over the alternative.

**`<picture>` with a `prefers-color-scheme` source is not wrong**, and it fetches only the file it
uses. It is simply narrower: its `media` cannot see a `[data-theme]` attribute or a `.dark` class,
so a surface with its own toggle needs the two-image form anyway. One mechanism documented once
beats two mechanisms chosen per surface. Use `<picture>` if a surface only ever follows system
preference and the extra fetch matters there.

*(An earlier revision of this section claimed `<picture>` was outright broken in WebKit. It is not
— see §4.2.1.)*

**Cost: the unused file is fetched anyway**, about 8KB. It is a rounding error next to the two woff2
faces on the same page.

**Do not put `display` on the shared class.** `.lockup__mark { display: block }` sits at the same
specificity as the register rules and, if it comes later in the file, silently beats their
`display: none` and puts **both** marks on screen at once. Flex items are blockified anyway, so the
declaration buys nothing. This is not hypothetical — it happened in the reference implementation
within an hour of the rule being written.

### 4.2 A force-dark extension defeats this rule, and nothing in CSS can stop it

**The register mechanism only works when the browser tells the truth about the register.** A
force-dark browser extension — Noir, Dark Reader, and the several like them — darkens the *rendered
page* without touching `prefers-color-scheme`. The page is still in light mode as far as every media
query, `<picture>` source, and script can tell. So the light-register mark is correctly served, and
lands on a background the extension has made dark.

That is the 0.0%-of-ink-box case, reached without anything being wrong in the page.

**How to recognize it, because it looks exactly like a broken register swap.** Sample any two
colours and convert to OKLCH. Under force-darkening, **hue is preserved and lightness is inverted**,
because that is how these extensions work. Under a real dark mode, the values are simply the dark
tokens, which in this system are a different hue family entirely.

Measured on Kevin's phone, 2026-09-08, on the reference implementation with Noir set to "always
darken":

| | light token | measured | this system's dark token |
| :-- | :-- | :-- | :-- |
| Surface | H 85 | **H 86** | `--navy-900`, H 255 |
| Body text | H 85 | **H 74** | `--navy-50`, H 248 |
| Accent | H 189 | **H 191** | `--teal-300`, H 187 |
| The ring | H 189, L 32% | **H 189, L 32%** | — |

Every value is a light token with its lightness flipped. Nothing is in the navy family. And the ring
is *bit-identical* to `--teal-700`, because these extensions recolor CSS but not the contents of an
image — which is the tell, and also the reason the mark is the thing that looks wrong when this
happens.

**What a consumer should do:**

- **Declare the page's support explicitly:** `<meta name="color-scheme" content="light dark">` in
  the head, in addition to the `color-scheme` property the tokens already set. It is the standard
  signal that the page handles both registers, it applies before CSS parses, and it is what a
  well-behaved extension checks before deciding to intervene.
- **Nothing else.** There is no reliable detection and no workaround worth building. A reader who
  has installed a force-dark extension has asked for its behavior over the site's.

**This is a limit of the rule, stated so nobody re-debugs it.** A page can be perfectly conformant
and still show a black signature on a dark ground in this configuration.

### 4.2.1 What this cost, and the testing lesson

The first version of this section asserted that WebKit does not re-run `<picture>` source selection
when the OS theme changes under an open page, and presented the phone screenshots as proof. **That
was wrong.** The screenshots showed Noir, the OS was never in dark mode, and no `<picture>` bug was
involved. The claim was reasoning backwards from a symptom to a plausible cause and then writing it
down as fact.

Two things survive from it, both real:

- **Assert on which element is visible, not on the `src` of an element that may be hidden.** A check
  written the second way passes while both marks are on screen at once — which is a bug that did
  happen here (§4.1).
- **Sample the pixels before naming a cause,** and convert to OKLCH rather than eyeballing a phone
  screenshot. A colour cast, a force-dark extension, and a genuinely broken swap all look alike at a
  glance and are trivially separable by hue.

### 4.3 Three more mechanisms that do not work

- **`filter: invert()`** — inverts the ring too, and the inverted mark is a white glyph *with a
  black border*, which is a different drawing rather than this one recolored.
- **`currentColor`** — withdrawn 2026-08-28. On the `<g>` it tints the *initials*, which is
  forbidden absolutely. Legal on the `<circle>` stroke only, and only if a consumer inlines the SVG
  rather than placing it as `<img>`.
- **One file for both registers** — see the 0.0% above.

---

## 5. Conformance is tiered

Not every surface can do all of this. Take the rows in order and stop where the surface stops —
each tier is a strict subset of the one above, so nothing is ever *replaced* by a lesser version.

| Tier | Surfaces | Required |
| :-- | :-- | :-- |
| **Full control** | kwpledger.com, the `*.kwpledger.com` project pages | Everything in §2–§4. No latitude. |
| **Image + text, no markup control** | Base44 | The lockup as one image where possible, the wordmark text, chrome before content. Register pinned to whatever the platform's theme actually is. |
| **Theme settings only** | Substack | One logo upload + the accent. Pin the publication's theme, then pick the file matching that register (§4). |
| **Fixed canvas** | Infographic, quote post, LinkedIn banner | Governed by that format's own footer spec. This document defers to them; they defer to `logo-usage.md` for which mark. |

**The single-asset consumers have no safe hedge.** The black mark reads 0.0% on dark and the
inverted mark reads 6.1% on light — a smudge rather than a mark. There is no file that survives
both, so a one-file surface must *decide* its register rather than pick the one that fails less
badly.

---

## 6. The footer

Same shape, inverted — a full-bleed opening rule, then **two blocks on one row**.

1. **Full-bleed opening rule** (§2.2).
2. **The identity block, right-aligned.** The contact address, then
   `© {year} Kevin Pledger` beneath it. Current year, not the year the page was written.
3. **A context block, left-aligned** *(optional)* — a short note about what the surface is,
   and a return link to the parent. Subdomains carry it; kwpledger.com leaves that side empty.
4. **The mark** *(optional)* — §3's rules apply unchanged if present.

Type at `var(--step--1)`, color `var(--fg-muted)`.

### 6.1 Why the identity block is on the right, and why both surfaces moved

**Changed 2026-09-10 on Kevin's instruction.** It was `©` on the left and the contact address
on the right, and kwpledger.com's footer is now right-aligned to match this.

The trigger is worth recording because it is the reference implementation doing its job. A
CSS bug on `runbox-mcp` — `flex-basis: 100%` on the footer's note, silently clamped by a
`max-width` on the same line — let the copyright slide to the right edge at one particular
window width. Kevin saw it, preferred it, and asked for it deliberately on every surface
rather than keeping the accident on one.

**Which is the point.** The arrangement was a bug; adopting it on a single surface would have
been the exact divergence §1 was written from. Adopting it on all of them, in this document,
is a design decision. The difference between those two is only ever whether the rule moves
with the change.

**The left side of kwpledger.com's footer is now empty, and that is intended.** A subdomain
has something to say there — what this page is, and the way back — and the parent does not.

### 6.2 Encode the address where it is free to do so — and do not treat it as protection

Where a surface controls its own markup, emit the contact address as HTML character
references, in the `href` as well as the text. The parser decodes them in attribute values
and text alike, so the browser sees an ordinary link and assistive technology reads the
ordinary address, with no JavaScript — which matters, because these surfaces ship none.
kwpledger.com's `src/lib/contact.ts` is the reference implementation.

**This is a convention, not a requirement, and the distinction is deliberate.** It stops the
bulk regex sweep and nothing else; a determined harvester decodes entities in one line. A
surface that cannot do it — no markup access, a hosted editor — should ship the address
plainly rather than drop it or contort around this.

**Do not build anything on top of it.** The address is *disposable*, and that is the actual
answer to the problem entities only nibble at: `kwpledger.com` is a Runbox catch-all, so every
`*@kwpledger.com` exists the moment mail arrives for it and none of them need provisioning. If
`hello@` ever drowns, block it and move to a new one — a constant here, a filter there, no
setup anywhere.

*(Recorded 2026-09-10. An earlier draft of this section made the encoding a hard requirement
on all four surfaces, on the reasoning that putting the address on more of them raised the
harvesting risk. Kevin's correction, and it is the right one: with a catch-all the address was
never worth defending, so a rule that constrains every surface to defend it is priced wrong.
Kept as a convention because it is free where markup is available, not because it is load-
bearing.)*

**At most one mark per page of chrome.** If the header carries it, the footer does not. Two
signatures on one screen is the mark asking for attention it has already been given, and on a short
page they can both be visible at once.

---

## 7. What this changes downstream

| Surface | Was | Now |
| :-- | :-- | :-- |
| **kwpledger.com** | Conforming except the mark — correct `<header>` semantics, full-bleed rule, correct wordmark | The **reference implementation**. Adds the lockup mark. |
| **runbox-mcp** | Non-conforming: article-header semantics, inset rule, wordmark one step small, no mark, no skip link, no `<main>` | Rebuilt to §2–§4. Requires the pinned dependency first — see that repo's `docs/DESIGN-CONSUMER.md`. |
| **Infographic** §5.1 | Own header and footer spec | Unchanged. §5 defers to it. |
| **Quote post**, **LinkedIn banner** | Own lockup placement | Unchanged. Both already take the ringed short teal mark from `logo-usage.md` §7. |
| **Substack** | Accent + fonts from PALETTE | Adds the logo slot at the pinned register. |

Each consumer is a **consumer** of this decision, never a precedent for it.

---

## 8. Out of scope

- **Nav structure.** Which links a header carries, and how they collapse on small screens, is each
  surface's business. This document says nav goes after the lockup and nothing else about it.
- **Component CSS.** Named parts, not a stylesheet. See §0.
- **Recoloring the glyph.** Not now, not ever. PROVENANCE is absolute and this document does not
  soften it.
- **The remaining ring-aspect assignments.** `logo-usage.md` §4 leaves them open; every surface here
  uses the default teal until that changes.
- **A `kwp` favicon rule.** Related and not the same question — a favicon is 32px, far under §3.2's
  floor, and needs its own treatment. Unwritten.

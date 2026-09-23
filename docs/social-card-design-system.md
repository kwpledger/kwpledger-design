# Read this before every social card.

The kwp social card — the **1200×630** image a link preview shows when someone shares a kwpledger
page on LinkedIn, in Slack, in iMessage. It is served as `og:image`, so it is read in a feed, at
feed scale, next to someone else's post.

This is a **layer-3 consumer** of [the kwp design system](SPEC.md), and a sibling of
[the banner](linkedin-banner-design-system.md), [the quote post](quote-post-design-system.md) and
[the infographic](infographic-design-system.md). It defines nothing new about color, type, or
spacing. Where this document and [SPEC.md](SPEC.md) disagree, SPEC.md wins.

Reference implementation: [`examples/social-card/`](../examples/social-card/).

---

## 0. Scope

**One sentence, one name, one mark.** A preview is glanced at for about a second, usually at
roughly 500px wide. If it needs reading rather than recognizing, it is a quote card or an
infographic, not this.

### 0.1 Why 1200×630

1.91:1 is what LinkedIn, Slack, Facebook and iMessage all render as the large preview, and
1200×630 is its common size. Anything else gets letterboxed or cropped differently per platform.

**The card assumes the large preview.** The site emits `twitter:card = summary_large_image` so
the platforms that choose between a thumbnail and a large image choose the large one. A platform
that crops to a square will lose the headline's left edge; that is accepted rather than designed
around, because designing for the square wastes the wide canvas everywhere else.

---

## 1. Register — navy, pinned

Dark register, the same values as the banner: `--surface` `#0a1420`, `--fg` `#e6ecf2`,
`--fg-muted` `#9aabbb`, `--accent` `#5fbdb4`, `--border` `#1e3245`.

**Kevin's call, 2026-09-23, and the reason:** the feeds this card appears in are white or near
white, so a paper card dissolves into the page while a navy one reads as an object. Navy also
matches the banner, so a shared link and the profile it came from look like the same person.
The infographics stay on paper; they are content, not the frame around a link.

The pairings are the banner's, measured there: `--fg` and `--accent` both clear AA by a wide
margin on `#0a1420` (the ring alone measures 8.31:1).

## 2. Layout

| | |
| :-- | :-- |
| Padding | 80px top/bottom, 96px left/right |
| Headline | Lora 600, 64px, line-height 1.12, max 17ch, one phrase in `--accent` |
| Rule | 1px `--border`, 32px above the footer row |
| Footer left | Name in Hanken Grotesk 600 over the domain in `--fg-muted`, both 26px |
| Footer right | `logo_long_ring_inv_teal.svg`, 96px tall, width auto |

**Nothing else.** No eyebrow, no tagline, no photograph. The card identifies the site; the post it
is attached to carries the message.

## 3. Copy

The headline is the **first sentence of the homepage line**, unaltered: *Most systems don't fit
the people who have to use them.* A fragment, not a rewrite — the line is settled and is not to
be reworded for a format. The full line is about 22 words and does not survive preview scale.

A per-page card (a case study's own title, say) uses this same layout with the page's title in
place of the line. None exists yet.

## 4. The mark

The **inverted, ringed long** mark, ring `#5fbdb4`. Never redrawn, never recolored beyond the
ring; [`logos/PROVENANCE.md`](../logos/PROVENANCE.md) is the authority. The long mark rather than
the banner's short one because the footer row is wide and short — the same reason the infographic
footers use it.

## 5. Preflight

1. Exactly 1200×630, overflow 0.
2. Lora and Hanken Grotesk loaded — a fallback serif changes the headline's wrap.
3. Headline is the unaltered first sentence of the line, one accent phrase.
4. Inverted ringed mark, ring `#5fbdb4`, never the `#0026FF` the upstream file ships with.
5. Squint at it at 500px wide: headline and name still read.
6. Exported as PNG — flat color and type compress cleanly and stay sharp; JPEG smears the edges.

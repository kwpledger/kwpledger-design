# kwpledger.com social card

Built against [`docs/social-card-design-system.md`](../../docs/social-card-design-system.md) — this
is its reference implementation. Served by kwpledger.com as `og:image` (KWP-14 there).

| | |
| :-- | :-- |
| Size | 1200×630 (1.91:1) |
| Register | **Dark, pinned** — Kevin chose navy over paper on 2026-09-23 so the card reads as an object in white feeds and matches the banner |
| Headline | The first sentence of the homepage line, unaltered, with *have to use them* in `--accent` |
| Mark | `logo_long_ring_inv_teal.svg`, 96px tall, ring `#5fbdb4` |
| Export | `social-card.png`, 54 KB |

## Rendering it

Open `index.html` from inside this directory — the fonts and the mark are relative — and
screenshot the `.card` element at 1× device pixel ratio, clipped to 1200×630. PNG, not JPEG.

## Preflight

- 1200×630, overflow 0 on both axes.
- Lora and Hanken Grotesk loaded from `../../fonts/`.
- Headline wraps to three lines at 17ch; the accent phrase is the last line and a half.
- Inverted ringed mark at the dark-register ring hex.
- Read at 500px wide: headline and name hold.

## Copying it into a consumer

kwpledger.com carries a copy at `public/og/kwpledger.png`. When this file changes, re-export and
replace that copy in the same sitting; nothing propagates it automatically.

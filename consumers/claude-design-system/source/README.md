# kwpledger design

The shared identity for kwpledger.com, the `*.kwpledger.com` subdomains, and the apps, games and fixed-canvas graphics around them. It is deliberately the *parent*: both YouTube channels (KPLS, MPSAS) sit inside it without either dominating. Stately, not neon.

## Use the semantic layer, and only that

The colors come in three layers, and each layer reaches exactly one layer down.

1. **Palette:** `paper-*`, `sand-200`, `ink-*`, `teal-*`, `navy-*`. Raw values, named for what they are. **Never reference these from a component.**
2. **Semantic:** `surface`, `surface-card`, `fg`, `fg-muted`, `accent`, `accent-hover`, `border`. Named for their job. **This is the layer you consume.**
3. **Domain:** `--meal-breakfast`, `--macro-carbs` and the like. These live in the consuming app, never here, and map onto a semantic, categorical or status token, never onto a palette value.

- Set the page on `surface` and raised panels on `surface-card`; body text in `fg`, secondary text in `fg-muted`; edges in `border`.
- `accent` means *interactive*. Links, buttons, and one eyebrow per canvas. Hover is `accent-hover`.
- Theme a section by remapping the semantic layer on one wrapper. Never rename a token's meaning while keeping its name.
- **Light/dark is user preference; channel or section identity is not.** Never wire the two to the same switch. Dark mode must never make the portal wear a channel's colors.
- Light and dark are authored together, never derived. The dark register is deep navy-slate (`navy-900`), not black.
- Theme switching: the packaged CSS follows `prefers-color-scheme`, and `data-theme="light"` or `"dark"` on the root overrides it. A page that never sets `data-theme` is unaffected.

## Categories: `data-1` … `data-8`

- Eight slots for equal-weight categories, three tokens each: `data-N-surface` (the fill), `data-N-fg` (text on that fill, only), `data-N-border` (the edge). Build categorized UI as pale filled cards with dark text, never as text colors.
- Slots are **numbered, never named for their hue.** `data-1` is the first slot, not "the red one". Use them **in order**; never skip to get a hue you like.
- Within a theme every slot shares one OKLCH lightness and chroma; only hue changes, so the eight read as peers. Hues avoid 178–202 (brand teal) and 238–262 (navy).
- The count is eight and is not meant to grow.

## Status: `success`, `warning`, `danger`

- Same three roles: `success-surface`, `success-fg`, `success-border`, and the same for `warning` and `danger`. Named for meaning, never numbered.
- **Never map a status onto a `data-N` slot, or the reverse.** Numbered slots are reassignable; meanings are not.
- Status is authored at higher chroma than the categorical slot of the same hue, so it out-shouts a category.
- **There is no `--info`.** Informational messages use `accent` on `surface-card`.
- `success` and `danger` differ by hue, not lightness. **Every status carries its word, and usually an icon.**

## Color is reinforcement, never the only signal

Every color-coded axis (category, status, ring) carries a text label beside it. That is an accessibility requirement, and it is what makes these values safe to change later.

## Chroma ceiling: 0.091

`teal-300` is the most saturated color in the system, and nothing goes past it. The categorical scale peaks at 0.075, status at 0.085. A value outside sRGB is silently no longer at its authored lightness, so every value stays in gamut.

## Type

- **Lora** (`--font-display`): headings, pull quotes, signature moments. Variable 400–700, upright and italic. Headings use `var(--fw-display)` (600) unless there is a reason to differ. Italic Lora in a title is discouraged, not forbidden.
- **Hanken Grotesk** (`--font-body`): everything else. Variable 100–900, upright and italic; italic is fine in subtitles and body text.
- **IBM Plex Mono** (`--font-mono`): timers, figures, code. Regular 400 only, so never set mono bold.
- **kwp Handwriting** (`--font-hand`): Kevin's own handwriting, 400 and 700. Only where hand-drawn is the point (arrows, annotations), never running text. The family name is lowercase `kwp`.
- Sizes come from six fluid steps, `--step--1` … `--step-4` (in `components/bundle.css`; note the double hyphen in `--step--1`). The `step-N` text styles name each step at its floor. Display steps 2–4 are Lora; 1, 0 and −1 are Hanken.
- Body copy sits at `measure` (34rem); full-width layout at `page` (68rem), exactly double.
- Fonts are self-hosted latin subsets. No Google Fonts request. The OFL notice travels with the files (`fonts/OFL-NOTICE.txt`).

## Spacing

`space-2xs` (0.5rem) through `space-2xl` (6rem), seven steps from a 4px base, in rem. Pick a step; never type a pixel value. Related things share the smaller step; a boundary between ideas takes the larger one. Proximity groups, so no box or rule is needed.

## The mark

- The mark is Kevin's actual signature (Sharpie, 2013). **Never redraw, retrace, vectorize, clean up or regenerate it.** The stray stroke and speck near the `g` are deliberate.
- **The ringed short mark is the default** (about 75–80% of use); the ringed long mark is next (15–20%). Ringless needs a stated reason.
- **Choose by register:** black-ink files on light grounds, `_inv` files on dark grounds. The black mark on a dark ground disappears.
- **The glyph is always black, or white with a black outline. Only the ring's color varies**, and it marks which aspect of the brand a surface belongs to: teal (`teal-700` on light, `teal-300` on dark) by default; olive builds, copper writing, dusty rose speaking, plum MPSAS, muted violet KPLS, slate blue fiction, ocean blue voice acting. The full register is in the logo-usage section.
- A `_ring` file with no color suffix is still at the `#0026FF` placeholder: never ship it.
- **Size by height; leave width auto.** The long and short marks have different aspects.
- Kevin's initials are lowercase: `kwp`, never `KWP`.

## Fixed canvases

An exported image cannot respond to `prefers-color-scheme`, so each fixed canvas pins one register for its whole series: the 1080×1350 infographic is light; the 1400×1000 quote post and the 1584×396 LinkedIn banner are dark. Never mix registers within one canvas. Their examples hardcode their values on purpose. The Formats previews and the sections below hold each spec.

## Files

- `tokens.json` / `tokens.css`: every color, face, space and width above.
- `components/bundle.css`: the fluid `--step-*` scale and color-scheme pins (its `:root` block), plus the chrome the previews use.
- `tokens/*.css`: the package's own stylesheets as they ship in {{version}}, for consumers that import CSS. They expect the fonts at `/fonts/`.
- `assets/Logos/`, `assets/Wordmarks/`: the vendored marks. `assets/Examples/`: rendered references for each format.
- `assets/Office/`: the Microsoft Office theme colors and fonts (`theme-colors/kwp-design.xml`, `theme-fonts/kwp-design.xml`) and the Swiss deck PowerPoint templates. Start a `.pptx` from the Swiss deck template (`swiss-deck/Swiss-Deck-Template.potx.zip`: unzip it for the `.potx`); give a Word or Excel file the two theme files. Install and slot mapping: the office-theme and swiss-deck sections.

---

**Not synced** (from kwpledger/kwpledger-design {{version}}): the `--step-*` clamp() values cannot be tokens, so they live in `components/bundle.css` and each `step-N` text style shows its floor. The ring colors are documented hexes in the logo-usage section, not tokens. The example templates (`examples/*/index.html` and their READMEs), the Swiss deck's build (`office/swiss-deck/` package, `build.js`, `post.py`), `tools/`, `test/`, `consumers/`, the repository README and AGENTS.md, and the process docs (BACKLOG, BACKLOG-FORMAT, CHANGELOG-TEMPLATE, HANDOFF-FILE, OWNERSHIP, docs/README, illustration-brief-desire-path, infographic-prompt-decision) were not brought in. Relative links inside the doc sections still point at the repository's layout. No component library exists in the repository; the six previews are its specimen cards, remade.

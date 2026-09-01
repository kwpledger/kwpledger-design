# design-system/ — the Claude Design card bundle

Preview cards that teach [Claude Design](https://claude.ai/design) this system. Nine HTML files,
grouped into five sections in the Design System pane.

**This directory adds nothing to the design system and decides nothing.** It is a *view* of
`tokens/`, `logos/` and `docs/`. If a card and a token disagree, the token is right and the card is
a bug.

## What Claude Design actually consumes

A Claude Design "design system" is not a stylesheet and not a repo. It is a project on claude.ai
with an immutable type (`PROJECT_TYPE_DESIGN_SYSTEM` — a regular project cannot be converted into
one later), holding **rendered preview HTML**. The pane builds its card index from the first line of
each file:

```html
<!-- @dsCard group="Colors" name="Semantic color" subtitle="…" -->
```

Attaching this repo as a *codebase* is a different and weaker thing: it gives one session file
access, nothing appears in the Design System pane, and it does not carry to the next project.

## Layout

```
design-system/
  _lib/card.css              # gallery chrome + the token imports. Defines no design values.
  foundations/
    color-semantic.html      # Colors  — the seven roles
    color-categorical.html   # Colors  — --data-1 … --data-8
    color-status.html        # Colors  — success / warning / danger
    type-scale.html          # Type    — the two faces, six fluid steps, measure
    spacing-scale.html       # Spacing — seven steps, two width limits
  brand/
    logo-marks.html          # Brand   — register pairing, sizing, the ring rule
    system-rules.html        # Brand   — layering, chroma ceiling, naming
  formats/
    infographic.html         # Formats — 1080×1350
    quote-post.html          # Formats — 1400×1000
```

## The one rule this bundle follows

**Foundation cards import the live tokens. Format cards do not.**

`_lib/card.css` imports `base.css`, `categorical.css` and `status.css` directly, so every swatch,
step and size on a foundation card *is* the current token value. There are no hardcoded hex codes to
drift.

The format cards are the exception, and deliberately: `examples/` pins its hex values because a
fixed-size export canvas cannot respond to `prefers-color-scheme`. Those cards reference the
rendered JPGs and describe the spec; they never restate the values. See `system-rules.html`,
"One register per fixed canvas".

`card.css` imports the three token files rather than `tokens/index.css` because `index.css` pulls
`fonts.css`, whose `@font-face` paths are absolute (`/fonts/`). Nothing serves a design-system
project from a domain root, so those would 404. `fonts.css` documents this exact escape hatch.

## Syncing it

Requires design-system authorization, which is **per-machine, not per-account**: run
`/design-login` once in an interactive Claude Code session on the machine that will push. Cloud
sessions (claude.ai/code) cannot authorize and cannot sync.

Then, from the repo root:

```
/design-sync
```

**`localDir` must be the repo root, not this directory.** The cards reach `../../tokens/`,
`../../fonts/`, `../../logos/` and `../../examples/`, so the sync has to carry those too and
preserve the layout. The plan should cover:

```
design-system/**   tokens/**   fonts/**   logos/**   examples/*/*.jpg
```

Upload the token CSS even though the cards render only the viewer's active register — the files
carry *both* registers as authored, which is what makes the project complete rather than a snapshot
of whichever theme the machine was in.

## Keeping it honest

Cards are consumers, so they break loudly rather than drifting silently: change a token and the
swatch moves with it. Two things still need a human:

- **Adding a token** does not add a card. New tokens are invisible here until someone adds them.
- **Renaming or removing a token** breaks a card's `var()` — which is a major bump anyway under this
  repo's pinning model.

Re-sync after any token change. The project holds a copy, not a live link.

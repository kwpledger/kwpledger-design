# design-sync notes — kwpledger-design

## Shape: off-script (no converter)

This repo is a **design-tokens system with no build** ("There is no build." — AGENTS.md).
No `dist/`, no JS/React components, no Storybook, zero dependencies. The
design-sync converter (`package-build.mjs`) has nothing to bundle here and is
not run.

Instead the repo **hand-authors and version-controls the Claude Design card
bundle** in `design-system/` — 9 preview HTML cards with `@dsCard` first-line
markers, grouped into 4 sections (Colors, Type, Spacing, Brand, Formats). The
authoritative sync instructions live in `design-system/README.md`.

## Sync plan

Target project: `5fa6664f-49fc-44e1-8c19-9a5a2bb0712f` ("kwpledger design"),
created 2026-08-31 for this first import.

`localDir` is the **repo root**, not `design-system/`. Cards reach
`../../tokens/`, `../../fonts/`, `../../logos/` and `../../examples/`, so the
upload carries those too, preserving layout:

- `design-system/**`  — the cards + `_lib/card.css`
- `tokens/**`         — base / categorical / status / fonts / index CSS (both registers as authored)
- `fonts/**`          — the two woff2 + OFL-NOTICE.txt
- `logos/**`          — marks + PROVENANCE.md (referenced by brand/logo-marks.html)
- `examples/*/*.jpg`  — rendered format references (referenced by formats/*.html)

No `_ds_bundle.js` / `styles.css` / `_ds_sync.json` — there is no compiled
component surface to anchor. Cards import the live token CSS directly
(`design-system/_lib/card.css` → `../../tokens/*.css`), so they cannot drift by
construction. Re-sync = re-upload after any token change; the project holds a
copy, not a live link.

## Conventions header

The skill's "author the conventions header" step (`.design-sync/conventions.md`
+ `readmeHeader`) does not apply here — it feeds a converter-generated README,
and there is no converter and no generated README on this path. This system's
conventions are already authored and uploaded: every card carries its
load-bearing `.rule` blocks, `design-system/brand/system-rules.html` states the
layering / chroma-ceiling / naming rules, and `design-system/README.md` +
`docs/` travel with the bundle.

## Verification

The cards are static token-swatch / spec galleries authored by the repo owners
for exactly this purpose and gated by `npm run verify` (contrast/gamut/chroma).
There is no component compilation to verify fidelity against.

# kwpledger-design

> **Note:** `CLAUDE.md` is a symlink to this file (`AGENTS.md`). One file, two names — edit either path, you are editing this file. Don't replace the symlink with a second copy.

Design tokens shared by kwpledger.com, the `*.kwpledger.com` subdomains, and the Base44 apps and games.

**Read [docs/SPEC.md](docs/SPEC.md) before changing any value.** It is the settled contract — naming, the layering rules, the categorical scale, the contrast gates, and the reasoning behind each. This file is orientation; the spec is the authority.

Origin and rationale for the repo existing at all: `kwpledger-site/docs/DESIGN-SYSTEM-HANDOFF.md`.

## What this is

A source of truth, not a stylesheet host. Consumers take a **pinned git dependency** — never a runtime `<link>`. One bad deploy must not be able to strip styling from every property at once, and the system is not only CSS (channel themes, banner lockups, and eventually a Unity project all need the same values).

There is **no build**. The CSS in `tokens/` is what ships.

## Run it

```bash
npm run verify   # contrast, gamut, chroma ceiling, hue bands, parity. Exits non-zero on failure.
```

Zero dependencies. Node `>=22.12.0`. Run it before tagging anything.

## Layout

```
tokens/
  index.css        # everything — the default import
  fonts.css        # @font-face only; absolute /fonts/ paths, by convention not bundler
  base.css         # palette + semantic, type, spacing. Ported unchanged from the site.
  categorical.css  # --data-1 … --data-8 × {surface, fg, border} × both themes
  status.css       # --success / --warning / --danger × same roles × both themes
fonts/             # woff2 + OFL-NOTICE.txt — the license travels with the files
logos/             # the signature marks + PROVENANCE.md. Recolor only, never redraw.
tools/
  color.mjs             # sRGB <-> OKLab/OKLCH, WCAG contrast. No dependencies.
  verify-contrast.mjs   # parses the CSS and checks it. Does not generate it.
docs/SPEC.md       # the contract
docs/PALETTE.md    # every value as hex, for consumers that can't take a dependency
docs/infographic-design-system.md   # the 1080x1350 infographic format — a layer-3 consumer
docs/quote-post-design-system.md    # the 1400x1000 (7:5) quote-card format — a layer-3 consumer
```

## Rules

- **Three layers; each may reach exactly one layer down.** Palette → semantic → domain. Domain tokens (`--meal-breakfast`) live in the consuming repo, **never here**. This repo must never learn what a "meal type" is.
- **Consumers reference semantic tokens only**, never raw palette values.
- **Categorical slots are numbered, never named for their hue.** `--data-1` is the first slot, not "the red one".
- **Status tokens are named for their meaning, never numbered** — the inverse rule, same reason. Never map a status onto `--data-n` or vice versa: slots are reassignable, meanings are not.
- **Status is authored louder than categorical** (higher chroma per role, still under the ceiling). That is what stops an error reading as an ordinary category at the same hue. Gated.
- **Color is always reinforcement, never the sole carrier of meaning.** Every color-coded axis carries a text label. Accessibility requirement, and it is what makes these values safe to change later.
- **Author light and dark together.** Neither register is derivable from the other — the lightness that keeps eight hues in sRGB differs between themes.
- **Never exceed the chroma ceiling of 0.091** (`--teal-300`, the most saturated brand color). Stately, not neon, expressed as a number a script can check.
- **Never let a value clip out of sRGB.** A clipped color is silently no longer at its authored lightness, which breaks parity with no warning.
- **Light/dark is user preference; channel or section identity is not.** Never wire them to the same switch.
- Notation is deliberately mixed — `base.css` hex, `categorical.css` `oklch()`. See SPEC §6. Do not "tidy" this.
- **Do not build an authoring UI or tooling.** `tools/` holds a verifier and the math it needs, and stays that size.

## Who owns this repo

**The `kwpledger-site` line of sessions is the source of truth here** (Kevin, 2026-08-19). If you are working in this repo from some other task, that is you being a guest, and the rule is simple:

- **Add freely.** New docs, new assets, new consumer specs. `docs/infographic-design-system.md` and `logos/` both arrived this way and are welcome.
- **Do not change or subtract.** Tokens, the rules above, `docs/SPEC.md`, and the contrast gates are not yours to edit. If your task seems to need a token changed, that is a conversation with Kevin, not a commit.
- **Do not bump the version or cut a tag.** Version bumps originate from the site line. Pinning only means something if one line of succession decides when a version exists — two sessions bumping independently produce two different claims about what `v0.3.0` contains.

This file is a handoff to the **next** session and to whatever **parallel** session is in here right now. Write it for both.

## Changing something

Edit → `npm run verify` passes → update SPEC.md and regenerate the PALETTE.md tables in the same commit if values or rules moved → tag.

**Removing or renaming a token is a major bump**, even if nothing appears to use it. The delivery model assumes pinning; a silent rename is exactly what pinning exists to prevent.

**Not unilateral** — the categorical count, hue placement, the layering contract, the chroma ceiling, and the text-label rule need a spec change and a conversation with Kevin.

## Guardrails

- No credentials, tokens, or `.env` contents in tracked files.
- No day-job specifics. This repo is public.
- **Never redraw the signature marks** in `logos/`. They are traced from Kevin's handwritten signature. Recolor if needed; do not vectorize, retrace, or regenerate the glyph. `logos/PROVENANCE.md` is the authority — which file is a real vector, which register each mark belongs on, and why.
- **Kevin's initials are lowercase — `kwp`, never `KWP`.** The signature monogram is the reason.
- Font licenses travel with the font files. If you move `fonts/`, move `OFL-NOTICE.txt` with it.

## Working with Kevin

- **He brings the goal; you bring the numbered list.** He executes an ordered list well and stalls at generating one. Producing the sequence is your job.
- **Surface one item at a time.** A long list of open work causes paralysis.
- **Narrate your reasoning back, including routine results.** Going quiet to spare him noise removes the *why*, which is the part he wants.
- **Spar, don't flatter.** Concrete over abstract.

Full context: `kwpledger-site/docs/WORKING-STYLE.md`.

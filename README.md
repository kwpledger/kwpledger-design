# kwpledger-design

Design tokens shared by **kwpledger.com**, the **`*.kwpledger.com`** subdomains, and the apps and games that live outside them.

One source of truth. Change a color here, bump the pin in a consumer, and it propagates — without any consumer needing to know what changed.

- **[docs/SPEC.md](docs/SPEC.md)** — the contract. Naming, the layering rules, the categorical scale, the contrast gates. Read this before changing a value.
- **[docs/PALETTE.md](docs/PALETTE.md)** — every value as plain hex, for tools you can only *tell* the colors to (Base44, Unity, slide templates).
- **[docs/infographic-design-system.md](docs/infographic-design-system.md)** — the 1080×1350 LinkedIn/YouTube infographic format. A layer-3 consumer, written to be pasted into ChatGPT.

---

## What is in here

```
tokens/
  index.css        # everything — the default import
  fonts.css        # @font-face only; expects the woff2 files at /fonts/
  base.css         # palette + semantic layers, type scale, spacing scale
  categorical.css  # --data-1 … --data-8, three values each, both themes
  status.css       # --success / --warning / --danger, same triple
fonts/             # Lora + Hanken Grotesk, latin subset, ~56KB, and the OFL notice
logos/             # the kwp signature marks, and PROVENANCE.md — recolor only, never redraw
tools/             # contrast + parity verifier. No build, no toolchain.
docs/
```

There is no build step. The CSS in `tokens/` is what ships.

---

## Using it

Install pinned to a tag — **never to a branch.** The whole delivery model assumes explicit updates:

```bash
npm i github:kwpledger/kwpledger-design#v0.1.0
```

Then in your root stylesheet:

```css
@import '@kwpledger/design';
```

**Copy `fonts/` into whatever your host serves as `/fonts/`**, license notice included. The `@font-face` paths are absolute by convention, not resolved by a bundler — that is what lets a plain-CSS consumer and a Tailwind consumer use the same file. If you serve the faces yourself, import the pieces and skip `fonts.css`:

```css
@import '@kwpledger/design/base.css';
@import '@kwpledger/design/categorical.css';
@import '@kwpledger/design/status.css';
```

### Plain CSS (kwpledger.com, project pages)

Import and use the semantic tokens directly. Nothing else to do.

```css
.card {
  background: var(--surface-card);
  color: var(--fg);
  border: 1px solid var(--border);
  padding: var(--space-m);
}
```

### Tailwind v4

Import the tokens, then bridge the ones you want as utilities. Use `@theme inline` for anything that changes between light and dark — it puts the `var()` reference into the generated utility, so the utility follows the theme switch instead of freezing whatever the value was at build time.

```css
@import 'tailwindcss';
@import '@kwpledger/design';

@theme inline {
  --color-surface: var(--surface);
  --color-surface-card: var(--surface-card);
  --color-fg: var(--fg);
  --color-fg-muted: var(--fg-muted);
  --color-accent: var(--accent);
  --color-border: var(--border);
  --font-display: var(--font-display);
  --font-body: var(--font-body);
}
```

Confirm the exact `@theme` behavior against the Tailwind version you are on when you migrate — this is the intent, and the reasoning above tells you what to adjust if the mechanism differs.

### Base44 apps, and anything else that cannot take a dependency

These consume the system **by convention, not by dependency** — the platform generates the app, so there is nothing to install into. Use [docs/PALETTE.md](docs/PALETTE.md); it is written to be pasted into a prompt.

---

## The one rule

**Three layers, and each may reach exactly one layer down.**

| Layer | Example | Lives |
| :-- | :-- | :-- |
| Palette | `--teal-700` | here |
| Semantic | `--surface`, `--accent`, `--data-3-fg` | here |
| Domain | `--meal-breakfast`, `--macro-carbs` | **your repo** |

Your components use **semantic tokens only.** Your domain tokens map onto semantic tokens:

```css
/* in the meal planner, not here */
:root {
  --meal-breakfast: var(--data-1-surface);
  --meal-breakfast-fg: var(--data-1-fg);
  --meal-breakfast-border: var(--data-1-border);
}
```

The moment a consumer writes `--meal-breakfast: var(--amber-300)`, the abstraction is dead and re-theming means editing every consumer. **This repo must never learn what a "meal type" is.**

If changing a font or a hex value here breaks a downstream property, the problem is that the property reached past the semantic layer.

---

## Categorized data

`--data-1` through `--data-8`. Eight slots, no meaning, three values each — `-surface` (the fill), `-fg` (text on that fill), `-border` (its edge). Both themes.

Take them **in order.** If you need three, use 1, 2, 3 — not your three favorites. Consistent ordering is what makes two different apps look related.

**Color is always reinforcement, never the sole carrier of meaning.** Every color-coded axis carries a text label beside it. That is an accessibility requirement, and it is also what makes these values safe to change later.

---

## Status

`--success`, `--warning`, `--danger` — same three roles each. For **outcomes**: something saved, something needs attention, something failed.

```css
.alert-error {
  background: var(--danger-surface);
  color: var(--danger-fg);
  border: 1px solid var(--danger-border);
}
```

**These are not categorical slots and the two must never be mapped onto each other.** A category is a neutral label your app assigns meaning to; a status *is* the meaning. `--data-1` could be reassigned to a different hue in a future version without breaking anything — "error" could not.

They share hues with the categorical scale (danger 27 beside `--data-1` at 25, success exactly on `--data-4`) and are separated from it by **chroma**: every status role is authored louder than the categorical role of the same name, and `npm run verify` fails if that stops being true. A warning should out-shout a category — that is its job.

**There is no `--info`.** Neutral informational messaging is `--accent` on `--surface-card`.

The text-label rule matters most here: an error shown only as a red border is invisible to a colorblind user and to anyone who hasn't learned the convention.

---

## Verifying

```bash
npm run verify
```

Checks every token against the gates in [docs/SPEC.md](docs/SPEC.md) §7 — WCAG contrast in both themes, sRGB gamut, the chroma ceiling, hue-band exclusions, and the parity spread that keeps the eight categorical slots reading as equals. Exits non-zero on any failure.

It **parses** the CSS rather than generating it. The stylesheets are the source of truth; the verifier is an independent check on them. A generator that emitted both would only ever prove it agreed with itself.

Run it before tagging a release. Zero dependencies — nothing to install.

---

## Changing something

1. Edit the token file.
2. `npm run verify` — it must pass.
3. If a categorical value, register, or rule changed, update [docs/SPEC.md](docs/SPEC.md) and regenerate the tables in [docs/PALETTE.md](docs/PALETTE.md) in the same commit.
4. Tag. Consumers pick it up when they bump their pin, one at a time, so breakage shows up in isolation.

**Removing or renaming a token is a major version bump** even if you believe nothing uses it.

Some changes are not unilateral — the categorical count, hue placement, the layering contract, the chroma ceiling, and the text-label rule all need a spec change and a conversation. See [SPEC.md §11](docs/SPEC.md).

Releases are cut by CI: merge a version bump to `main` and `.github/workflows/release.yml` tags it and publishes the release. Nothing is hand-tagged.

---

## How much do you have to match?

**Not everything.** Uniformity across surfaces doing different jobs is flattening, not cohesion.

Added color is fine where it makes sense for what the thing actually is — a game's mode and difficulty colors may be louder than this system's ceiling, because reading them at speed is a different problem than categorizing data at rest. What holds: **your entry surface should fit**, deviation is justified by function rather than preference, and it lives in your repo as additive tokens, never as an edit here.

Full rule, with a worked example: [SPEC.md §10](docs/SPEC.md).

# kwp palette — the human-readable copy

**Every value in this system, as plain hex.** For consumers that cannot take a dependency on this repo — Base44 apps, a Unity project, a slide template, anything where you have to *tell* a tool the colors rather than import them.

This is a real deliverable, not a convenience. Base44 generates the app; there is no `package.json` to add a dependency to. The only way these apps stay on-brand is if the values are written down somewhere a person can read them out.

> **This file is generated from the token files and must be regenerated when they change.** Values here are correct as of the tokens at the same commit. If they disagree, `tokens/` wins — it is what `npm run verify` checks.

---

## How to use this with Base44

Paste the relevant table into the prompt and say the colors are fixed. Something like:

> Use exactly these colors and do not substitute or adjust them. Background `#fbfaf8`, cards `#ffffff`, body text `#1a1917`, secondary text `#5c5a57`, links and buttons `#0d5c58` with `#0a4a47` on hover, borders `#e3e0da`. In dark mode: background `#0a1420`, cards `#10202f`, body text `#e6ecf2`, secondary text `#9aabbb`, links and buttons `#5fbdb4` with `#8ad8d0` on hover, borders `#1e3245`.
>
> Fonts: headings in Lora SemiBold, body in Hanken Grotesk.

**Two things that go wrong if you do not say them out loud:**

1. **Lora is only available at SemiBold (600).** Ask for Lora Bold or Lora Regular and the browser fakes the weight — it looks subtly wrong and nobody can say why. Say "Lora SemiBold" every time.
2. **Generators love to saturate.** If the output comes back brighter than these values, it has substituted its own palette. Say "do not adjust these colors" explicitly.

---

## Brand palette — the raw values

Do not use these directly in a component. They exist so the semantic roles below have something to point at.

| Token | Hex | What it is |
| :-- | :-- | :-- |
| `--paper-0` | `#ffffff` | White |
| `--paper-50` | `#fbfaf8` | Warm off-white — the light page |
| `--sand-200` | `#e3e0da` | Warm gray — light borders |
| `--ink-500` | `#5c5a57` | Warm mid gray — secondary text |
| `--ink-900` | `#1a1917` | Near-black, warm — body text |
| `--teal-200` | `#8ad8d0` | Pale teal |
| `--teal-300` | `#5fbdb4` | Light teal — the dark-mode accent |
| `--teal-700` | `#0d5c58` | Deep teal — **the brand accent** |
| `--teal-800` | `#0a4a47` | Deepest teal — accent hover |
| `--navy-50` | `#e6ecf2` | Pale slate — dark-mode text |
| `--navy-200` | `#9aabbb` | Mid slate — dark-mode secondary text |
| `--navy-600` | `#1e3245` | Slate — dark-mode borders |
| `--navy-800` | `#10202f` | Deep navy — dark-mode cards |
| `--navy-900` | `#0a1420` | Deepest navy — the dark page |

**The teal is the thread.** Both YouTube channels accent in teal (KPLS `#4aa3ac`, MPSAS `#2f8079`); the portal sits in the same family without copying either, which is what makes it read as the parent rather than a third sibling.

---

## Semantic roles — what things actually use

| Role | Light | Dark | Use for |
| :-- | :-- | :-- | :-- |
| `--surface` | `#fbfaf8` | `#0a1420` | Page background |
| `--surface-card` | `#ffffff` | `#10202f` | Cards, panels, raised areas |
| `--fg` | `#1a1917` | `#e6ecf2` | Body text |
| `--fg-muted` | `#5c5a57` | `#9aabbb` | Secondary text, captions |
| `--accent` | `#0d5c58` | `#5fbdb4` | Links, buttons, interactive |
| `--accent-hover` | `#0a4a47` | `#8ad8d0` | Hover and active states |
| `--border` | `#e3e0da` | `#1e3245` | Dividers, card edges |

All text pairs meet WCAG AA. The weakest is `--fg-muted` on `--surface` at 6.59:1 in light — comfortably clear.

---

## Categorical scale — eight slots for categorized data

**Use these when you need several colors that read as equals** — meal types, macros, chart series, tags. Not for anything meaning "primary", "success", or "danger"; these slots carry no meaning by design.

**Take them in order.** If you need three, use slots 1, 2, 3 — not your three favorites. Consistent ordering is what makes two different apps look related.

Each slot is a set of three: the **surface** is the fill, the **text** goes on that fill, the **border** is its edge.

### Light mode

| Slot | Surface (fill) | Text | Border |
| :-- | :-- | :-- | :-- |
| 1 | `#fbd3cf` | `#5f3531` | `#eaaba5` |
| 2 | `#f6d8c0` | `#5a3a1e` | `#e2b38d` |
| 3 | `#e2e0be` | `#474419` | `#c4c188` |
| 4 | `#c9e7ce` | `#284c30` | `#9ccca4` |
| 5 | `#bde6f2` | `#0d4a57` | `#84cadd` |
| 6 | `#d4ddfd` | `#384063` | `#aebbef` |
| 7 | `#e7d6f5` | `#4c395b` | `#cdb1e2` |
| 8 | `#f6d2e5` | `#5a344a` | `#e2abc9` |

### Dark mode

| Slot | Surface (fill) | Text | Border |
| :-- | :-- | :-- | :-- |
| 1 | `#4a2825` | `#f8c6c1` | `#784541` |
| 2 | `#462c16` | `#f2ccaf` | `#724b2b` |
| 3 | `#373412` | `#d9d7ab` | `#5b5726` |
| 4 | `#1e3a24` | `#bae0c0` | `#376040` |
| 5 | `#083944` | `#a9deed` | `#1a5f6e` |
| 6 | `#2b314d` | `#c8d2fb` | `#49527c` |
| 7 | `#3b2b47` | `#e0caf1` | `#614a72` |
| 8 | `#462839` | `#f1c6dd` | `#71455e` |

**Do not pair these across rows.** Slot 3's text on slot 5's fill is not a tested combination and may fail contrast. Every slot's text is validated against its own surface only.

**Do not use light-mode values in dark mode or vice versa.** The two sets are authored separately, not derived from each other.

---

## The rule that outranks all of the above

**Color is always reinforcement, never the sole carrier of meaning. Every color-coded thing carries a text label beside it.**

A color-coded legend with no text is not acceptable output, however good it looks. This is an accessibility requirement, and it is also what makes every value on this page safe to change later without breaking anyone's understanding of the interface.

---

## Type

| | Family | Weight | Use |
| :-- | :-- | :-- | :-- |
| Display | **Lora** | SemiBold 600 **only** | Headings |
| Body | **Hanken Grotesk** | Variable 100–900 | Everything else |

Fallbacks, in order:

- Lora → Georgia, Iowan Old Style, Palatino Linotype, Palatino, serif
- Hanken Grotesk → system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif

Both are open licensed (SIL OFL). The license notice is in `fonts/OFL-NOTICE.txt` and **travels with the font files** — if you copy the woff2s, copy the notice.

### Type scale

Fluid, clamping between a small-screen and large-screen size.

| Step | Small | Large |
| :-- | :-- | :-- |
| `--step--1` | 0.83rem | 0.94rem |
| `--step-0` | 1rem | 1.13rem |
| `--step-1` | 1.2rem | 1.42rem |
| `--step-2` | 1.44rem | 1.8rem |
| `--step-3` | 1.73rem | 2.27rem |
| `--step-4` | 2.07rem | 2.86rem |

---

## Spacing

| Token | Value |
| :-- | :-- |
| `--space-2xs` | 0.5rem |
| `--space-xs` | 0.75rem |
| `--space-s` | 1rem |
| `--space-m` | 1.5rem |
| `--space-l` | 2.5rem |
| `--space-xl` | 4rem |
| `--space-2xl` | 6rem |

Plus two layout limits: `--measure` 34rem (the comfortable reading width for a column of prose) and `--page` 68rem (the maximum content width).

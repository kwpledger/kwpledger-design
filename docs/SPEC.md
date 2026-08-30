# kwp design system — specification

Settled 2026-08-14. This is the contract. Values live in `tokens/`; the reasoning lives here.

Written from the brief in `kwpledger-site/docs/DESIGN-SYSTEM-HANDOFF.md`, which remains the record of *why this repo exists*. This document supersedes it on *what the system is*.

---

## 1. Scope

One design system shared by every front-end surface under `*.kwpledger.com`, plus the apps that live outside it.

The governing principle, in Kevin's framing: **if changing a font or a hex value breaks a downstream property, the problem is that the property reached past the semantic layer.** Consumers are built knowing tokens can change. That is the whole point of the abstraction, and it is the standard any consumer is held to.

---

## 2. The layering contract

Three layers. **Each may reach exactly one layer down.**

| Layer | What it is | Example | Lives |
| :-- | :-- | :-- | :-- |
| 1. Palette | Raw values, named for what they are | `--teal-700` | `tokens/base.css` |
| 2. Semantic | Roles components consume | `--surface`, `--accent`, `--data-3-fg`, `--danger-fg` | `tokens/base.css`, `tokens/categorical.css`, `tokens/status.css` |
| 3. Domain | App-specific meanings | `--meal-breakfast`, `--macro-carbs` | **The consuming repo. Never here.** |

**The rule that makes it worth having:** domain tokens map onto semantic tokens, never past them to raw palette values. The moment an app writes `--meal-breakfast: var(--amber-300)`, the abstraction is dead and re-theming means editing every consumer.

**The design system must never learn what a "meal type" or a "macro" is.**

Components in any consumer reference layer 2 only. A component that reaches for `--teal-700` will silently keep the portal's colors when a section remaps the semantic layer around it — the exact failure the layering prevents.

---

## 3. Naming

- Palette: `--<family>-<weight>`, weights on the familiar 0–900 ramp. `--teal-700`, `--navy-900`.
- Semantic: role words, no hue words. `--surface`, `--surface-card`, `--fg`, `--fg-muted`, `--accent`, `--accent-hover`, `--border`.
- Categorical: `--data-<n>-<role>` where `<role>` is `surface`, `fg`, or `border`. **Numbered, never named for the hue.** `--data-1` is not "the red one", it is the first slot. Naming it `--data-red` would smuggle meaning into a scale whose entire purpose is to carry none, and would make the value impossible to change.
- Status: `--<success|warning|danger>-<role>`, same three roles. **Named for the meaning, never numbered** — the exact inverse of the categorical rule, and for the same reason: a status's meaning is fixed, so its name must be too.
- Type: `--font-display`, `--font-body`, `--fw-display`, `--step--1` … `--step-4`.
- Spacing: `--space-2xs` … `--space-2xl`, plus `--measure` and `--page`.

No prefix (`--kwp-*`). These files are the base layer of every consumer; a prefix would be noise on every line and buys collision-safety this system does not need.

---

## 4. The categorical scale

### 4.1 Count: eight. Fixed.

Known demand is seven — the meal planner's four meal types and three macros. Eight covers that with one spare.

**The count is picked once.** Adding a ninth later means re-authoring hue placement across both themes, which breaks the equal-weight property the same way retrofitting dark mode does. A consumer needing a ninth slot starts a conversation about the scale, not a patch to it.

### 4.2 Structure: three values per slot, not one

Categorized UI is built from **pale filled cards with dark text on them** — fills, not text colors, not strokes. So each slot ships:

- `surface` — the fill. Light enough in light mode for dark text; dark enough in dark mode for light text.
- `fg` — legible on that fill, and also usable as a bare label on the page background.
- `border` — the visible edge of the filled element.

Ship one value per slot and the consumer derives its own tint on day one, which is the same drift by a slower route.

### 4.3 Authored in OKLCH, and that is load-bearing

Within a theme, **every slot shares one lightness and one chroma per role; only hue changes.**

Equal lightness in OKLCH means equal *perceived* lightness. In HSL or HSB it does not — the same numbers produce swatches that read as louder or more washed-out than their neighbors. **Categorical colors must read as equals or the scale implies a ranking that is not there.**

Parity is enforced structurally: `tools/verify-contrast.mjs` fails if any slot's L/C differs from its peers.

### 4.4 Hue placement

Eight hues: **25, 60, 105, 150, 216, 274, 310, 345.**

Spacing is uneven on purpose. OKLCH hue is not perceptually uniform in discriminability — the yellow–orange region separates clearly at small steps, while blue–purple needs larger ones to look as different. Even 45° spacing would produce a scale with a crowded half.

**Two bands are excluded**, and the verifier enforces it:

| Band | Why |
| :-- | :-- |
| 178–202 | The brand teal, where `--accent` lives. A category that looks like the accent reads as *interactive*. |
| 238–262 | The navy surface family. A category that looks like navy reads as *chrome*. |

Both are meaning collisions. The scale is therefore cohesive with the brand through **shared chroma and lightness discipline, not by borrowing brand hues** — which is the stronger form of cohesion anyway, since it survives a palette change.

### 4.5 Lightness and chroma registers

| Role | Light | Dark |
| :-- | :-- | :-- |
| `surface` | L 90% · C 0.046 | L 32% · C 0.052 |
| `fg` | L 38% · C 0.062 | L 87% · C 0.058 |
| `border` | L 80% · C 0.075 | L 45% · C 0.070 |

**Both themes are authored together.** Retrofitting dark onto a categorical scale reliably breaks equal weight in one theme or the other, because the lightness that keeps eight hues inside sRGB differs between them: in light the binding hues are 25 and 274, in dark it is 216. Neither register is derivable from the other.

Dark tints sit above `--surface-card` in lightness so a filled card reads as raised rather than as a hole punched in the page.

### 4.6 Stately, not neon

**Peak chroma is 0.075.** The ceiling is **0.091** — the chroma of `--teal-300`, the most saturated color in the brand palette.

The scale is not permitted to be louder than the brand it belongs to. This turns a matter of taste into a gate a script can check.

### 4.7 Gamut

Every value sits inside sRGB with margin, and the verifier fails on any that does not.

This is not pedantry. **A clipped color is silently no longer at its authored lightness** — the browser clamps the out-of-range channel and the swatch shifts, breaking parity with no warning anywhere. Low chroma is what keeps eight hues in gamut at these lightnesses, so §4.6 and this section are the same constraint seen twice.

---

## 5. The status layer

`--success`, `--warning`, `--danger`. Each with `-surface`, `-fg`, `-border`, both themes — the same triple as the categorical scale.

### 5.1 Why it is not the categorical scale

**These carry meaning, and the meaning is the point.** The categorical slots are defined by carrying none.

Pointing `--danger` at `--data-1` would make "error" re-themeable to whatever hue slot 1 becomes — an error state that quietly stops looking like one. **Numbered slots are reassignable by design; meanings are not.** A consumer must never map a status onto `--data-n`, in either direction.

### 5.2 Why it did not ship in v0.1.0

The categorical scale was sized against apps that **display data** — the meal planner's meal types and macros. Apps that have **outcomes** need something different, and nothing in the portal had one: no forms, no states, nothing to succeed or fail.

The gap surfaced when Kevin inventoried tapdodge and three of its seven accents turned out to be reward, success, and error rather than categories. Recorded because it is a sizing lesson, not a one-off: *count the outcomes, not only the categories.*

### 5.3 Hues are conventional and not up for redesign

**danger 27 · warning 75 · success 150.**

Red/amber/green is too deeply learned to renumber for internal tidiness. A "danger" that is not red is worse than any collision avoiding it would buy.

### 5.4 They collide with categorical hues, and chroma is what separates them

Danger at 27 sits beside `--data-1` at 25; success at 150 sits exactly on `--data-4`. That is accepted, and resolved by authoring **every status role at strictly higher chroma than the categorical role of the same name.** The verifier fails if that stops being true.

This is the correct relationship rather than a workaround. **A warning should out-shout a category** — grabbing attention is its entire job, where a categorical slot's job is to sit quietly and be equal to its peers. Same hue family, different urgency, and the difference is visible rather than something a reader has to be told.

| Role | Categorical chroma | Status chroma |
| :-- | :-- | :-- |
| `surface` | 0.046 light / 0.052 dark | **0.058 / 0.062** |
| `fg` | 0.062 / 0.058 | **0.072 / 0.068** |
| `border` | 0.075 / 0.070 | **0.085 / 0.082** |

Peak status chroma is 0.085 — still under the 0.091 ceiling in §4.6. Louder than the categorical scale, quieter than the brand's loudest color.

### 5.5 One register for all three

They share lightness and chroma and differ only in hue, so parity is checked exactly as for the categorical scale.

Danger reads more urgent than success because red does, not because it was given extra weight. Encoding urgency in lightness as well as hue would make a warning banner and an error banner different sizes of loud for no reason a user could name.

### 5.6 There is no `--info`

Informational messaging is the brand accent: use `--accent` with `--surface-card`. A fourth status meaning "nothing has gone wrong" invites consumers to reach for it as a second accent, which is how a status layer turns into a palette.

### 5.7 The text-label rule applies hardest here

An error indicated only by a red border is invisible to a colorblind user and to anyone who has not learned the convention. **Every status carries text**, and usually an icon. See §8.

---

## 6. Notation is mixed, on purpose

- `tokens/base.css` is **hex.**
- `tokens/categorical.css` is **`oklch()`.**

The brand palette was authored and contrast-validated as hex. Converting it would carry rounding risk for no benefit — the brief's instruction was not to convert unless rendered output is verified unchanged, and there is nothing to gain by trying.

The categorical scale is `oklch()` because the authored intent *is* the parity, and hex would hide it. A reader can see that eight tokens share `90% 0.046` and differ only in hue; the same eight as hex look arbitrary.

Hex equivalents for every categorical value are in [PALETTE.md](PALETTE.md), for consumers that cannot take a dependency.

---

## 7. Contrast gates

Enforced by `npm run verify`. Failing any gate exits non-zero.

| Gate | Threshold | Why |
| :-- | :-- | :-- |
| Semantic text pairs (`--fg`, `--fg-muted`, `--accent` on both surfaces, both themes) | ≥ 4.5:1 | WCAG AA, normal text |
| Categorical `fg` on its own `surface` | ≥ 4.5:1 | The label on the card |
| Categorical `fg` on the page surface | ≥ 4.5:1 | The same token used as a bare legend label — consumers will do this |
| Categorical `surface` on the page surface | ≥ 1.2:1 | The fill must be perceptible at all |
| Categorical `border` on its own `surface` | ≥ 1.3:1 | The edge must be visible against what it edges |
| **Parity** — spread of WCAG contrast across the eight tints | ≤ 0.25 | The measured form of "these read as peers" |
| Adjacent tint separation | ΔOKLab ≥ 0.02 | Neighboring slots must be tellable apart |
| Chroma ceiling | ≤ 0.091 | §4.6 |
| sRGB gamut | all values | §4.7 |
| Status `fg` / `surface` / `border` | same four thresholds as categorical | A status banner is the same shape of thing as a category card |
| **Status louder than categorical** | chroma strictly greater, per role, per theme | §5.4 — the only thing separating a status from a category at the same hue |
| Status register consistency | one L/C per role across all three | §5.5 |
| Status parity | ≤ 0.25 | Same measured form as the categorical scale |

**Measured, as of the values in `tokens/`:**

| | light | dark |
| :-- | :-- | :-- |
| `fg` on own tint | 7.34 – 7.54 | 8.56 – 8.58 |
| `fg` on page surface | 9.33 – 9.92 | 12.20 – 12.77 |
| tint on page surface | 1.27 – 1.32 | 1.42 – 1.49 |
| border on own tint | 1.37 – 1.41 | 1.68 – 1.73 |
| **parity spread** | **0.045** | **0.067** |

Status layer, same measurements:

| | light | dark |
| :-- | :-- | :-- |
| `fg` on own surface | 6.89 – 7.07 | 7.37 – 7.41 |
| `fg` on page surface | 9.29 – 9.93 | 11.81 – 12.41 |
| surface on page surface | 1.35 – 1.40 | 1.59 – 1.68 |
| border on own surface | 1.48 – 1.52 | 1.86 – 1.91 |
| **parity spread** | **0.057** | **0.090** |

Note the status surfaces sit *more* present against the page than the categorical tints do — 1.35–1.40 against 1.27–1.32 in light. That is §5.4 showing up in the measurements rather than only in the prose.

### 7.1 Why parity has to be measured, not assumed

Equal OKLCH lightness gives equal *perceived* lightness. It does **not** give equal WCAG contrast — WCAG relative luminance is hue-weighted, so a green and a blue at identical OKLCH lightness produce measurably different contrast ratios. The spread is small here (0.045 light, 0.067 dark) but it is a fact about the values, not a property guaranteed by the authoring method. It is checked.

### 7.2 What is deliberately not claimed

**The `border` tokens are not a WCAG 1.4.11 non-text contrast claim.** At 1.37–1.73:1 they are below the 3:1 that standard requires for a UI component boundary that *identifies* the component.

That is a considered decision, not an oversight. Under §8 every color-coded axis carries a text label, so a categorical element is never identified by its edge — the border is reinforcement on an element already identified by its label. Raising these to 3:1 would put a heavy outline on every card and lose the register the brand actually has: the existing `--border` against `--surface` is 1.19:1.

If a consumer builds something where the boundary *is* the only identifier, that component needs its own stronger stroke and this scale is the wrong tool for it.

---

## 8. Color is reinforcement, never the sole carrier of meaning

**Every color-coded axis carries a text label beside it.** Non-negotiable, and it is a documented rule of this system rather than an implementation detail of any one consumer.

It is an accessibility requirement first. It also has a practical payoff that is easy to miss: because nothing depends on color alone, **the palette can change later without breaking comprehension.** That is what makes the values in this repo safe to revise.

---

## 9. What consumers may and may not do

**May:**

- Define layer-3 domain tokens mapping onto layer-2 tokens
- Remap the semantic layer on a wrapper element to theme a section
- Import `base.css` without `fonts.css` and serve the faces themselves
- Skip `categorical.css` entirely if they display no categorized data

**May not:**

- Reference palette tokens (`--teal-700`, `--navy-800`) from a component
- Map a domain token onto a raw palette value
- Redefine a token's meaning while keeping its name
- Wire light/dark to the same switch as section or channel identity — see *Three layers* in `kwpledger-site/docs/SITE-POSITIONING.md`

**Light/dark is user preference. Channel and section identity is not.** Dark mode must never make the portal silently wear KPLS's uniform.

---

## 10. How much must a consumer conform?

**Not everything has to match.** Uniformity across surfaces that do different jobs is not cohesion, it is flattening, and it produces worse design rather than more of it.

Kevin's framing, which governs: **added color is fine where it makes sense for what the thing actually is.** A color axis that encodes a game mechanic may deviate from this system. A status color an app genuinely needs may be defined before this system ships one.

Three things keep that from becoming a free-for-all:

1. **The entry surface conforms.** A property's first screen — the title screen, the landing page, whatever a visitor sees before they have done anything — should read as belonging to the family. Interiors earn more latitude the further they get from that first impression, because by then the visitor is inside a specific thing rather than working out whose it is.
2. **Deviation is justified by function, not preference.** "This hue reads faster in peripheral vision while the player is dodging" is a reason. "I like it better" is a conversation about the system, not a license to fork it locally.
3. **Deviation is additive and lives in the consumer.** Define domain tokens, or remap the semantic layer on a wrapper (§9). Never edit this repo to suit one consumer, and never map a domain token onto a raw palette value to reach a hue the system lacks — define the value in your own repo, and say why in a comment.

**Worked example — tapdodge.** Its four game-state colors run chroma 0.134–0.175, roughly twice the ceiling in §4.6. They stay. Reading "Hard mode" in peripheral vision mid-dodge is a legibility-under-motion problem, and a 0.075-chroma tint fails at it: the register differs because the function differs. The game still takes the type scale, the spacing scale, and the neutral family — enough to read as the same person's work — and its title screen should fit.

Three of tapdodge's seven accents (reward, success, error) are **not** categorical and must never be mapped onto `--data-n`. Those slots are defined by carrying no meaning; pointing "error" at slot 7 would make error re-themeable to whatever hue slot 7 becomes. They belong to the status layer in §5, which shipped in v0.2.0 precisely because that inventory found the gap.

**Worked example — Substack.** The opposite case from tapdodge, and the more common one. The newsletter cannot import anything and exposes five settings, so conformance is *everything it is able to do* rather than a question of how far to deviate: background, accent, three font slots. It takes those from [PALETTE.md](PALETTE.md) and the rest is Substack's.

The lesson worth carrying: **a platform's defaults are not neutral.** Its accent was failing WCAG AA at 2.39:1 against the white text it pairs on its own subscribe button, so adopting the brand accent fixed an accessibility defect rather than only matching a hue. And the token that *looked* like the tidier swap on paper — `--teal-300`, matching the default's lightness exactly — would have been just as bad, because what governs is the text color the platform pairs with the accent, not the lightness. Check the rendered component; do not reason from the numbers alone.

---

## 11. Changing the system

**Safe:** adding a new semantic token; adjusting a palette hex within its role; adding a spacing or type step at the ends.

**Requires re-verification (`npm run verify` must pass):** any color value; any lightness or chroma register.

**Requires a spec change and a conversation:** the categorical count; hue placement; the layering contract; the chroma ceiling; the text-label rule in §8.

Versioning is semver against consumer-visible behavior. **Removing or renaming a token is a major bump** even if no consumer uses it — the whole distribution model assumes pinning, and a silent rename is exactly the breakage pinning exists to prevent.

---

## 12. Out of scope

- **No authoring UI or tooling.** `tools/` holds a verifier and the color math it needs, and stays that size.
- **Restyling the Base44 apps.** [PALETTE.md](PALETTE.md) ships the values; applying them is separate work.
- **The YouTube channel themes.** `brandtokens_youtube.css` becomes a layer *on top of* these semantics later, once the base is stable. Not now.
- **Converting the brand palette to OKLCH.** §6.
- **Headers and footers.** Deliberately unspecified. Consumers vary from total control (kwpledger.com) to five theme settings (Substack) to fully generated (Base44) to a fixed canvas (the infographic format, which has its own footer spec), so a single rule cannot be about CSS. A shared lockup is wanted eventually — tracked as **KWP-16** in `kwpledger-site/docs/BACKLOG.md`. It was sequenced after the `logos/` rework because it depends on the marks' geometry; **that rework landed on 2026-08-30 and the geometry is now fixed and documented** in `logos/PROVENANCE.md`, so the dependency is cleared and KWP-16 is schedulable. It is still out of scope for this spec until it is done. **Do not invent one in the meantime.**

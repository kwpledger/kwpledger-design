# The theme-toggle capability

**Status: DECIDED 2026-09-21 — Option A, shipped in `v0.6.0`.** Kevin chose the
companion selector. Both halves are now in: the verifier gate and the selectors
themselves. SPEC §9.1 is the contract; this file is the reasoning and the
rejected alternatives.

The `v0.5.2` patch described below was never tagged — it and the selector work
merged together as `v0.6.0`, which is the better shape anyway, since the gate is
what makes the duplication safe.

Raised from a consumer (meal-planner) that wanted a light/dark toggle and found
it could not build one cleanly against `v0.5.1`.

---

## 1. The gap, stated precisely

It is **not a contradiction in the rules.** It is a capability one document
assumes and the token files do not provide.

All three token files theme through one mechanism:

```css
@media (prefers-color-scheme: dark) { :root { … } }
```

A media query answers to the operating system. **A button cannot override it**
— there is no selector for a toggle to drive. So the system as shipped supports
exactly one theming model: follow system preference.

Meanwhile [header-footer-design-system.md](header-footer-design-system.md) §4.1
tells a consumer what to do when it has a toggle:

> A surface with an explicit theme toggle swaps the media query for whatever
> selector drives **the rest of its theme** (`:root[data-theme="dark"]`, a
> `.dark` class).

"The rest of its theme" is the assumption. No consumer has one, because this
repo ships none, and SPEC §9 offers only "remap the semantic layer on a wrapper
element" — which covers a themed *section*, not a document-level toggle over
all three files.

**So the instruction is well-formed and unreachable.** A consumer following
§4.1 literally gets a lockup that swaps register against a page that does not.

## 2. Why a consumer cannot just fix it locally

The only local route is redefining the dark register under a selector of its
own. That is **40 tokens**: 7 semantic (`base.css`), 24 categorical
(`categorical.css`, 8 slots x 3 roles), 9 status (`status.css`, 3 names x 3
roles).

Those 40 values are then a copy of this repo's dark register living in a
consumer, pinned to a tag, **diverging silently on the next bump.** Pinning
exists to make version skew visible; a hand-copied register is the one shape
that makes it invisible again. Correctly refused.

## 3. What v0.5.2 already changed

The duplicated-block shape had a second problem nobody had looked for, and it
was here rather than in any consumer.

The verifier builds `token -> value` by sweeping each register with a regex, so
**a token declared twice in one register resolves to whichever copy is authored
last.** The other copy is read by no gate at all. Measured: `--data-1-surface`
at chroma `0.45` — five times the §4.6 ceiling, outside sRGB — placed in the
media-query block while the attribute block held the correct value, reported
`All gates pass` and exited `0`.

`v0.5.2` gates **disagreement** between duplicate declarations, not duplication
itself. Identical copies pass; diverging copies fail and name the token and both
values. SPEC §7.4.

This matters for the decision below: the main objection to Option A — two copies
of one register drifting apart — is now a build failure rather than a silent
defect. It does not make Option A free. It makes it *checkable*.

## 4. The options

### Option A — companion selector on each dark block ✅ **chosen**

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { /* 40 tokens */ }
}
:root[data-theme="dark"]          { /* the same 40 tokens */ }
```

Three selectors, as §4.1 describes. A consumer that never sets `data-theme` is
**completely unaffected** — the media query still governs, and the `:not()`
guard only matters once an explicit light override exists.

- **Cost:** each dark register is authored twice in this repo. Gated for drift
  since v0.5.2, so the cost is authoring noise, not risk.
- **Compatibility:** universal. No new CSS features.
- **Bump:** minor. New consumer-visible capability, nothing removed or renamed.

### Option B — `light-dark()` — *revisit ~Nov 2026*

```css
:root { color-scheme: light dark; }
:root[data-theme="light"] { color-scheme: light; }
:root[data-theme="dark"]  { color-scheme: dark; }

:root { --surface: light-dark(#fdfcfa, var(--navy-900)); }
```

One declaration per token, **no duplication at all**, no media query. The toggle
works by setting `color-scheme`, which also fixes form controls and scrollbars
for free.

- **Cost:** rewrites the notation of all three token files and the verifier's
  parsers with them. Directly touches SPEC §6, which says the mixed notation is
  deliberate and not to be tidied.
- **Compatibility:** Baseline **newly** available since May 2024 (Chrome 123,
  Firefox 120, Safari 17.5); reaches Baseline **widely** available around
  November 2026 — roughly two months out. Unsupported browsers drop the whole
  declaration, so it needs a fallback layer or a floor on support.
- **Bump:** minor at least; arguably a spec conversation, since §6 moves.

Worth noting it satisfies §4.5's "author light and dark together" more literally
than the current shape does — both registers on one line.

### Option C — do nothing; consumers follow system preference only — *rejected*

Legitimate, and it is the status quo. But then **§4.1's conditional clause
should be struck or qualified**, because as written it directs consumers toward
a capability that does not exist. Leaving both as they are is the only option
that is actually inconsistent.

## 5. What is and is not the site line's to decide

- **Was not ours, and Kevin has now called it:** the selector work is a minor
  bump under [OWNERSHIP](OWNERSHIP.md) — "those claim the system changed, and
  that is his call." He chose A on 2026-09-21, which is what authorized
  `v0.6.0`.
- **Was ours:** the verifier defect. A fix that left every token value alone,
  which is exactly the carve-out the ownership rule names.
- **Still not ours:** Option B. It moves SPEC §6, so it needs its own
  conversation rather than arriving as a tidy-up.

## 6. The layout note is a separate question

Kevin's original framing was a layout note calling for a toggle control at the
top right of the header, near the About link, as a standard feature. That is a
change to header-footer-design-system.md, which SPEC §10.1 calls "the hard edge
of this rule, and it is not negotiable" — so making a control **required**
binds every property that conforms, including the ones that cannot implement it
(Substack's five settings, a fixed-canvas infographic).

The two travel together and should be decided together: **a required control
and the selector that makes the control possible.** Shipping the note without
the selector produces a rule no consumer can satisfy, which is the situation
§4.1 is already in.

A plausible shape, if it helps: the control is **required where the platform can
run its own CSS and JS**, and the tier language §10.1 already uses for
conformance ("a strict subset chain rather than alternatives") carries it for
the platforms that cannot.

## 7. This does not block a consumer's header

**A consumer building chrome for the first time should not wait for §4 to be
decided,** and reading §2 as a reason to wait gets it backwards. The two halves
have opposite costs.

The expensive half is the **40-token redefinition**, and that is the half a
consumer should not build at all — §2. The half that actually changes when a
selector lands is the lockup's register swap, which is one media query around
two rules:

```css
.lockup__mark--dark { display: none; }

@media (prefers-color-scheme: dark) {
  .lockup__mark--light { display: none; }
  .lockup__mark--dark  { display: block; }
}
```

Whichever option wins, converting that is **a one-line change to the `@media`
line** in a single file. Build the header now under the media query: it is the
correct shape today, it is what §4.1 already specifies, and it is close to the
cheapest thing in the system to revise later.

`kwpledger-site/src/layouts/BaseLayout.astro` is the reference implementation
and the thing to copy — **including its comments**, which record three traps
already paid for once each:

- `display` on the shared `.lockup__mark` class sits at the same specificity as
  the register rules and puts **both** marks on screen at once;
- a force-dark browser extension looks exactly like a broken register swap, and
  no CSS can detect it (§4.2 of the header/footer doc has the OKLCH test that
  tells them apart);
- the Astro compiler follows a tag name out of an HTML comment and silently
  drops the markup after it.

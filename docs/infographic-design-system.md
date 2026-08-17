# Read this before every infographic.

The kwp infographic system — a 1080×1350 portrait format for LinkedIn and YouTube.

This is a **layer-3 consumer** of [the kwp design system](SPEC.md). It defines nothing new about color, type, or spacing; it decides how those settled values get arranged on one fixed canvas. Where this document and [SPEC.md](SPEC.md) disagree, SPEC.md wins.

Values here are correct as of the tokens at this commit. Hex is copied from [PALETTE.md](PALETTE.md) so this file can be pasted into a tool that cannot take a dependency — which is the normal case, since these get built in ChatGPT.

---

## 0. Two decisions to make before you read further

**Canvas is 1080×1350, not 1070×1350.** You asked for 1070. 1080×1350 is the native 4:5 that LinkedIn and Instagram both target and YouTube community posts accept without resampling; 1070 is 10px narrower than any platform target, so every upload gets soft-scaled for no gain. Everything below derives from `--ig-w: 1080`. If 1070 is deliberate, change that one constant and the two derived column widths in §2.2 — nothing else moves.

**This format is not a YouTube thumbnail.** A thumbnail is 1280×720, carries three to five words, and is read at 210px wide. Nothing in this document applies to one. Use this for LinkedIn feed posts, LinkedIn document-post covers, YouTube community posts, and the end-of-video card. A separate spec covers thumbnails when you get to them.

---

## Part 1 — The methodology, reverse-engineered

Three reference infographics were analyzed: a dark five-step process graphic, a light seven-row framework graphic, and a light bento-grid "starter pack." They differ in palette, layout, and density. Underneath, they run the same nine moves.

### 1.1 The nine moves

| # | Move | How the references do it |
| :-- | :-- | :-- |
| 1 | **A frame, not a bleed** | All three inset the content inside a visible border or a contrasting frame. The graphic reads as an object, not a screenshot. |
| 2 | **Eyebrow → headline → promise** | Small caps tension line ("STOP DESIGNING IN CANVA"), then the headline, then one sentence naming the payoff with a number in it ("under 5 minutes"). |
| 3 | **An enumerable spine** | 5 steps / 7 layers / a fixed pack. The count is in the headline. The reader knows the shape before reading a word of body. |
| 4 | **Parallel modules** | Every module is the same internal shape: label chip → title → 2–3 short lines. Deviating once breaks the scan. |
| 5 | **Color as wayfinding** | Each module gets a distinct hue from a small ordered set. The hue says "new module," never "important" or "bad." |
| 6 | **Every module is also labeled in text** | "LAYER 3", "STEP 2". The color is never the only thing distinguishing the module. |
| 7 | **A receipt beside every claim** | Terminal windows with real filenames, mini screenshots, icon triads. Each abstract claim sits next to a concrete artifact. This is the single biggest driver of credibility and the one most often skipped. |
| 8 | **Directed flow, only when there is one** | The process graphic uses dashed arrows between steps. The framework and pack graphics do not — their modules are peers. Arrows are claims about sequence; do not draw them decoratively. |
| 9 | **Attribution bar** | Footer rule, name on one side, what-you-help-with on the other. Same position every time, so a series accumulates recognition. |

### 1.2 What the references get wrong for our purposes

- **The traffic-light window chrome.** Red/amber/green dots as decoration. Our system reserves those three hues for actual outcomes (SPEC §5). Reused as chrome, they stop meaning anything. Our receipt panels use neutral dots — see §5.3.
- **Icon soup.** Two of the three lean hard on stock icon sets. Generated icons come back inconsistent in stroke weight, optical size, and metaphor, and there is no kwp icon system to hold them to. **We ship no icons in v1** — see §5.6.
- **Density creep.** The bento reference runs ~250 words. That works in a tighter sans at high chroma. It does not work in Lora at our chroma ceiling. Our budget is §7.4.
- **Saturation.** All three sit well above chroma 0.091. We do not follow them there. Our differentiation comes from lightness discipline and type, not volume.

---

## Part 2 — The canvas

### 2.1 Constants

| Constant | Value | Note |
| :-- | :-- | :-- |
| `--ig-w` | `1080px` | §0 |
| `--ig-h` | `1350px` | 4:5 |
| Root font size | `20px` | Makes the SPEC rem scale land on whole pixels. Everything below is derived, not invented. |
| Page gutter | `50px` | `--space-l` |
| Content width | `980px` | `1080 − 2×50` |
| Column gap | `20px` | `--space-s` |
| Card radius | `14px` | Domain-layer decision, §10 |
| Chip radius | `8px` | |
| Hairline rule | `1px` `--border` | |
| Module card edge | `2px` `--data-n-border` | 2px, not 1px — see §4.4 |

### 2.2 Derived column widths

| Grid | Column width |
| :-- | :-- |
| 2 equal | `480px` |
| 3 equal | `313.33px` |
| Claim + receipt (60/40) | `576px` / `384px` |

Express these as `fr` units in CSS; the pixel values are here so you can sanity-check a render.

### 2.3 The vertical budget

1350px, allocated. Blow this and the graphic gets cramped at the footer, which is where every overrun lands.

| Zone | Height | Contents |
| :-- | :-- | :-- |
| Top margin | 50 | |
| Header | **276** | Eyebrow 24 · gap 10 · headline 151 (2 lines @ 72px/1.05) · gap 15 · subhead 76 (2 lines @ 28px/1.35) |
| Divider | 61 | 30 · 1px rule · 30 |
| **Body** | **833** | The modules. This is your whole working area. |
| Footer | 80 | 30 · 1px rule · 20 · one 19px line |
| Bottom margin | 50 | |

If the headline is one line, the header drops to 200 and the body grows to 909. That is the only legitimate way to buy vertical space. Do not shrink the gutters.

### 2.4 Module heights, by count

Body zone 833px, 20px gaps:

| Modules | Height each | Viable? |
| :-- | :-- | :-- |
| 4 | 193px | Roomy — title + 3 bullets, stacked internals |
| 5 | 150px | Comfortable — title + 2 bullets, or horizontal internals |
| 6 | 122px | Horizontal internals required |
| 7 | 101px | Horizontal internals, one line of body each |
| 8 | 86px | Ceiling. Chip + title + one clause. |

**Eight is the hard maximum** and it is not an aesthetic limit — it is the number of categorical slots the system has (SPEC §4.1). A ninth module has no color to be. If you need nine, you need two graphics.

**Four is the practical minimum.** Below four, this format is doing less than a well-set text post.

---

## Part 3 — Type

Two families. No third. Lora **SemiBold 600 only** — asking for any other Lora weight makes the renderer synthesize it, and synthesized Lora looks subtly broken in a way nobody can name.

### 3.1 The ladder

The SPEC type scale (§3), taken at its large-screen end with a 20px root, plus one step extended at the top. Extending a scale at the ends is explicitly safe under SPEC §11.

| Step | px | Family / weight | Used for |
| :-- | :-- | :-- | :-- |
| `--ig-step-5` | **72** | Lora 600 | Headline, ≤6 words |
| `--ig-step-4` | **57** | Lora 600 | Headline, 7–10 words |
| `--ig-step-3` | **45** | Lora 600 | Rare. A single pull-quote or a 4-module title. |
| `--ig-step-2` | **36** | Lora 600 | Module titles |
| `--ig-step-1` | **28** | Hanken Grotesk 400 | Subhead |
| `--ig-step-0` | **23** | Hanken Grotesk 400/600 | Body, bullets — **the floor for anything read as a sentence** |
| `--ig-step--1` | **19** | Hanken Grotesk 600, caps, `0.10em` tracking | Chips, receipt captions, footer only |

### 3.2 Why 23px is the floor

At 1080px wide the image displays about 555px in a desktop LinkedIn feed. A 23px canvas pixel becomes ~11.8px on screen. A 19px one becomes ~9.8px — legible as a short uppercase letterspaced label, not as a sentence. That is the entire reason for the split: **step--1 is for labels, step-0 is the smallest thing anyone reads left-to-right.**

### 3.3 Leading and measure

| Context | Line height | Max measure |
| :-- | :-- | :-- |
| Headline (step-4/5) | 1.05 | ~35 chars/line |
| Subhead (step-1) | 1.35 | ~70 chars/line |
| Module title (step-2) | 1.15 | ~28 chars/line |
| Body / bullets (step-0) | 1.40 | ~52 chars/line |
| Chips (step--1) | 1.00 | ~18 chars |

Never justify. Never hyphenate. Never letterspace Lora.

### 3.4 Emphasis

Bold within a body line uses Hanken Grotesk 600, and never more than one phrase per module. Colored emphasis inside the headline uses `--accent` on a **word or short phrase**, never a whole clause — the reference graphics all do this and it is the cheapest way to give a headline a focal point.

**No italics anywhere.** Neither shipped face carries a true italic; both would be synthesized.

---

## Part 4 — Color

### 4.1 Pick one register per graphic, and per series

Light and dark are authored separately and are not derivable from each other (SPEC §4.5). One canvas is one register. **Never mix a light-mode value into a dark canvas.**

Pick one register for a whole series and stay in it. Alternating light and dark across a run of posts reads as inconsistency, not variety.

### 4.2 The two registers

| Role | Light | Dark |
| :-- | :-- | :-- |
| Canvas | `#fbfaf8` | `#0a1420` |
| Card | `#ffffff` | `#10202f` |
| Text | `#1a1917` | `#e6ecf2` |
| Secondary text | `#5c5a57` | `#9aabbb` |
| Accent | `#0d5c58` | `#5fbdb4` |
| Rules and edges | `#e3e0da` | `#1e3245` |

### 4.3 Module colors — the categorical scale, in order

Take slots **in order**: three modules use 1, 2, 3. Not your three favorites. Consistent ordering is what makes two different graphics read as the same person's work.

**Light mode**

| Slot | Fill | Text | Edge |
| :-- | :-- | :-- | :-- |
| 1 | `#fbd3cf` | `#5f3531` | `#eaaba5` |
| 2 | `#f6d8c0` | `#5a3a1e` | `#e2b38d` |
| 3 | `#e2e0be` | `#474419` | `#c4c188` |
| 4 | `#c9e7ce` | `#284c30` | `#9ccca4` |
| 5 | `#bde6f2` | `#0d4a57` | `#84cadd` |
| 6 | `#d4ddfd` | `#384063` | `#aebbef` |
| 7 | `#e7d6f5` | `#4c395b` | `#cdb1e2` |
| 8 | `#f6d2e5` | `#5a344a` | `#e2abc9` |

**Dark mode**

| Slot | Fill | Text | Edge |
| :-- | :-- | :-- | :-- |
| 1 | `#4a2825` | `#f8c6c1` | `#784541` |
| 2 | `#462c16` | `#f2ccaf` | `#724b2b` |
| 3 | `#373412` | `#d9d7ab` | `#5b5726` |
| 4 | `#1e3a24` | `#bae0c0` | `#376040` |
| 5 | `#083944` | `#a9deed` | `#1a5f6e` |
| 6 | `#2b314d` | `#c8d2fb` | `#49527c` |
| 7 | `#3b2b47` | `#e0caf1` | `#614a72` |
| 8 | `#462839` | `#f1c6dd` | `#71455e` |

These slots carry **no meaning**. Slot 1 is not "the urgent one." It is the first slot.

### 4.4 The two card modes

**Neutral card — the default.** Card fill is `--surface-card`, edge is a **2px** `--data-n-border`, module title is `--data-n-fg`, body is `--fg`, secondary is `--fg-muted`. The chip carries the tint. This keeps the full three-level text hierarchy and keeps five pastel rectangles from turning the page into a swatch book.

**Tinted card.** Card fill is `--data-n-surface`, edge is `--data-n-border`, title is `--data-n-fg`, body is `--fg`. Use for bento layouts where the card *is* the module, or for one highlighted module among neutrals. Never more than three tinted cards on one canvas.

Edges are 2px rather than 1px because at feed scale a 1px hairline on a 1080px canvas resolves to half a screen pixel and disappears. This does not change what the border tokens claim: they are reinforcement on an element already identified by its label, not a WCAG 1.4.11 boundary (SPEC §7.2).

### 4.5 Measured contrast for the pairings this format introduces

The gated pairs in SPEC §7 cover `--data-n-fg` on its own surface and on the page. Neutral cards and tinted cards introduce four pairings outside that set. Measured with `tools/color.mjs` against the tokens at this commit:

| Pairing | Light | Dark |
| :-- | :-- | :-- |
| `--data-n-fg` on `--surface-card` | 9.69 – 10.37 | 10.90 – 11.43 |
| `--fg` on `--data-n-surface` | 12.77 – 13.22 | 10.47 – 10.88 |
| `--fg-muted` on `--data-n-surface` | 5.00 – 5.17 | 5.29 – 5.50 |
| `--accent` / `--fg-muted` on `--surface-card` | 7.81 / 6.87 | 7.42 / 7.02 |

All clear WCAG AA. **`--fg-muted` on a tinted card is the thin one at 5.00:1** — fine at step-0 and above, but do not put step--1 text in it. Prefer `--data-n-fg` for the smallest type on a tinted card.

These are not gated by `npm run verify`. **If any categorical value changes, remeasure this table.**

### 4.6 Status colors — outcomes only

For do/don't columns, before/after, right/wrong. Never for module identity, and never mapped onto a numbered slot in either direction (SPEC §5.1).

| | Light fill / text / edge | Dark fill / text / edge |
| :-- | :-- | :-- |
| Danger | `#fccac3` `#63322d` `#e29c94` | `#572d29` `#fbc1b9` `#8c5049` |
| Warning | `#eed3ae` `#583c0d` `#d1aa73` | `#4d3510` `#eccba0` `#7e5c28` |
| Success | `#bde3c4` `#224d2d` `#8ac195` | `#204329` `#b2deba` `#3e704a` |

There is no info color. Neutral informational callouts are `--accent` on a normal card.

### 4.7 The rule that outranks everything above

**Color is reinforcement, never the sole carrier of meaning.** Every color-coded module carries a text label. A green check with no word beside it is not acceptable output, however good it looks.

Practical consequence for this format: if you converted the graphic to grayscale, every distinction it makes must survive. Test it — it takes five seconds and catches the failure every time.

### 4.8 No gradients, no shadows, no glow

Flat fills, flat edges. A gradient has no token, cannot be verified, and drifts a color off its authored lightness — the same failure mode as gamut clipping (SPEC §4.7). Depth comes from the card fill sitting above the canvas fill, which is what the two surface tokens are for.

---

## Part 5 — Components

### 5.1 Header

```
EYEBROW              step--1, caps, 0.10em tracking, --accent
Headline             step-5 or step-4, Lora 600, --fg, one phrase in --accent
Subhead              step-1, Hanken Grotesk 400, --fg-muted, one sentence
──────────────────   1px --border, full content width
```

The eyebrow names the tension. The headline names the thing. The subhead names the payoff and contains a number.

### 5.2 Module card

```
┌─ 2px --data-n-border, radius 14, fill --surface-card ────┐
│  padding 20px                                            │
│  [CHIP]                     step--1 caps on data-n tint  │
│  Module title               step-2, Lora 600, data-n-fg  │
│  • bullet                   step-0, --fg                 │
│  • bullet                                                │
└──────────────────────────────────────────────────────────┘
```

**Chip:** fill `--data-n-surface`, text `--data-n-fg`, 1px `--data-n-border`, radius 8, padding `6px 14px`. Contains the ordinal and nothing else: `STEP 3`, `LAYER 5`, `PILLAR 2`. Three words maximum.

**Bullets:** a 6px round dot in `--data-n-border`, 14px from the text. Never a hyphen, never an emoji, never a checkmark unless the semantics are genuinely success/failure — in which case use the status tokens and a word.

At 6 or 7 modules, switch to **horizontal internals**: chip and title in a 300px left column, bullets in the remaining 660px. This is what makes the tighter counts survive; the seven-row reference does exactly this.

### 5.3 Receipt panel

The credibility move from §1.1 #7. A card showing the concrete artifact behind the claim: a file, a snippet, a number, a real screenshot.

```
┌─ 1px --border, radius 14, fill --surface-card ───────────┐
│  ● ● ●   filename.md          title bar, --surface tint  │
├──────────────────────────────────────────────────────────┤
│  content — mono, step-0 or step--1, --fg                 │
└──────────────────────────────────────────────────────────┘
```

**The three dots are neutral** — all three in `--border`, or omitted. Not red/amber/green. Those hues mean "failed / needs attention / succeeded" in this system, and spending them on window decoration is how a status layer quietly turns into a palette (SPEC §5.6).

**Every receipt is real.** A screenshot of a thing that exists, a number you can source, a filename you actually use. Invented receipts are the fastest way to lose the credibility the panel exists to buy.

Caption below the panel: step--1, `--fg-muted`, one line, describing what the reader is looking at.

### 5.4 Comparison block

Two columns, `--success` left and `--danger` right, each with a heading word — "Track this" / "Ignore this". The heading word is mandatory. The color is the reinforcement.

### 5.5 Connectors

Dashed 2px lines in `--border`, with a solid arrowhead in the `--data-n-border` of the module being pointed *at*. **Only when there is a real sequence.** Peers get no arrows.

### 5.6 No icons in v1

There is no kwp icon system. A generated icon set comes back inconsistent in stroke weight and optical size, and inconsistency in a repeated element is more visible than the absence of the element. The numbered chip and the type hierarchy do the wayfinding.

If a future version adds icons, they arrive as a fixed drawn set with a stated stroke weight, not as per-graphic generation.

**Never an emoji.** Not as a bullet, not as an icon, not in the headline.

### 5.7 Footer

```
──────────────────   1px --border, full content width
kwp                  step--1, --fg           |  what you help with, step--1, --fg-muted
```

`kwp` is **lowercase, always.** The monogram is traced from a handwritten signature and that is why.

**Never let a generator draw the signature mark.** If you want the mark rather than the wordmark, supply the existing SVG as a file. A model asked to "make a signature logo" will invent one, and an invented signature is worse than no signature.

---

## Part 6 — The three layouts

Pick one per graphic. Do not blend two.

### A. Stack — for frameworks and enumerated lists

4–7 full-width rows, one categorical slot each. The seven-layer reference is this layout.

Use when the modules are **peers**. No arrows. At 6–7 rows use horizontal internals (§5.2).

Body zone 833px: 4 rows at 193 · 5 at 150 · 6 at 122 · 7 at 101.

### B. Ladder — for processes and sequences

4–5 pairs, alternating sides. Each pair is a **claim card (576px)** and a **receipt panel (384px)**. Step 1's claim goes left, step 2's goes right, and so on. Dashed connectors between steps.

Use when order matters. The five-step reference is this layout, and its alternation is what keeps a vertical list of five near-identical cards from reading as wallpaper.

Four pairs at 193px is the comfortable version. Five at 150px works with two bullets per claim.

### C. Bento — for toolkits and starter packs

3-column grid, cards spanning 1 or 2 columns, mixed heights. Tinted cards, categorical slots in reading order — left to right, top to bottom, no skipping.

Use when the modules are peers of **unequal weight** and the graphic is a reference rather than an argument. Hardest of the three to get right, and the least forgiving of overwriting — it is the one that turns into a wall of text.

Body zone 833px: three rows of 264, or two rows of 406, or 406 + 407 split unevenly.

---

## Part 7 — The content plan

The layout is the easy half. This is the half that decides whether anyone stops.

### 7.1 One graphic, one claim

Write the claim as a sentence before you open anything. If it takes two sentences, it is two graphics.

The headline states the **payoff**, not the topic. "7 Layers of Agentic AI Governance" is a topic and it works because the number promises completeness. "Design tokens" is a topic and does not. "One file that stops your AI from inventing colors" is a payoff.

### 7.2 The spine must be countable

4 to 8, and the number goes in the headline. The count sets the reader's expectation of effort before they commit to reading, which is the whole transaction. A graphic without a count reads as unbounded and gets scrolled past.

The ceiling of 8 is set by the categorical scale (§2.4).

### 7.3 Parallel structure, enforced

Every module has the same internal shape: chip, title, then the same number of body lines as every other module. If module 3 needs three bullets and the rest need two, either find a third for all of them or cut module 3's to two.

Titles are grammatically parallel too — all imperative verbs, or all noun phrases. Not a mix. The reference process graphic is all imperatives ("Steal a style you love," "Lock in the system"), and that consistency is doing more work than any color choice on the canvas.

### 7.4 Word budget

| Element | Budget |
| :-- | :-- |
| Eyebrow | ≤ 5 words |
| Headline | ≤ 10 words, 2 lines max |
| Subhead | one sentence, ≤ 16 words, contains a number |
| Module title | ≤ 5 words |
| Body line | ≤ 9 words |
| Footer | ≤ 8 words total |
| **Whole canvas** | **120–180 words. Hard cap 200.** |

The bento reference runs ~250. It gets away with it in a condensed sans at high chroma. Lora at our chroma ceiling does not — the same word count reads as dense rather than generous, and the stately register is the thing we are actually selling.

**Count the words before you build.** Cutting copy after the layout exists is how a graphic ends up with 19px body text.

### 7.5 Concrete beats abstract, every time

Real filenames over "your config file." Real numbers over "significantly." A screenshot of the actual thing over an illustration of the idea. Every receipt panel (§5.3) is an instance of this rule; the rule applies to body copy too.

### 7.6 The graphic must work with the caption removed

It gets reposted, screenshotted, and embedded. Nothing essential lives in the post text.

---

## Part 8 — Building one

### 8.1 The pipeline

Author a **standalone HTML file** at exactly 1080×1350, render it, export JPG at quality 92 (or PNG if it contains a screenshot with text in it). HTML because the values above are CSS values, the type is real type, and the whole thing is diffable and re-renderable when a token changes. A design tool would make each graphic a hand-placed one-off.

### 8.2 Fonts, in ChatGPT

The two woff2 files live in `fonts/` in this repo. Options, best first:

1. **Upload `lora-latin.woff2` and `hanken-grotesk-latin.woff2` alongside the HTML** and reference them relatively. Correct type, no network.
2. **Base64-embed them** into the HTML as data URIs. Self-contained, larger file.
3. **Accept the fallbacks** — Georgia for Lora, system-ui for Hanken Grotesk. The graphic will be structurally correct and typographically wrong. Fine for a layout check, not for publishing.

If you copy the font files anywhere, `OFL-NOTICE.txt` goes with them.

### 8.3 Skeleton

```html
<meta charset="utf-8">
<style>
  @font-face { font-family:'Lora'; src:url('lora-latin.woff2') format('woff2');
               font-weight:600; font-style:normal; }
  @font-face { font-family:'Hanken Grotesk'; src:url('hanken-grotesk-latin.woff2') format('woff2');
               font-weight:100 900; font-style:normal; }

  :root{
    /* ---- LIGHT REGISTER. Swap this block for dark; never mix. ---- */
    --surface:#fbfaf8; --surface-card:#ffffff;
    --fg:#1a1917; --fg-muted:#5c5a57;
    --accent:#0d5c58; --border:#e3e0da;

    --data-1-surface:#fbd3cf; --data-1-fg:#5f3531; --data-1-border:#eaaba5;
    --data-2-surface:#f6d8c0; --data-2-fg:#5a3a1e; --data-2-border:#e2b38d;
    --data-3-surface:#e2e0be; --data-3-fg:#474419; --data-3-border:#c4c188;
    --data-4-surface:#c9e7ce; --data-4-fg:#284c30; --data-4-border:#9ccca4;
    --data-5-surface:#bde6f2; --data-5-fg:#0d4a57; --data-5-border:#84cadd;
    --data-6-surface:#d4ddfd; --data-6-fg:#384063; --data-6-border:#aebbef;
    --data-7-surface:#e7d6f5; --data-7-fg:#4c395b; --data-7-border:#cdb1e2;
    --data-8-surface:#f6d2e5; --data-8-fg:#5a344a; --data-8-border:#e2abc9;

    --font-display:'Lora',Georgia,'Iowan Old Style',Palatino,serif;
    --font-body:'Hanken Grotesk',system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    --font-mono:ui-monospace,SFMono-Regular,Menlo,Consolas,'Liberation Mono',monospace;

    --step--1:19px; --step-0:23px; --step-1:28px;
    --step-2:36px;  --step-3:45px; --step-4:57px; --step-5:72px;

    --space-2xs:10px; --space-xs:15px; --space-s:20px;
    --space-m:30px;   --space-l:50px; --space-xl:80px;

    --radius-card:14px; --radius-chip:8px;
  }

  *{box-sizing:border-box; margin:0;}
  body{margin:0; background:#555;}

  .canvas{
    width:1080px; height:1350px;
    padding:var(--space-l);
    background:var(--surface); color:var(--fg);
    font-family:var(--font-body); font-size:var(--step-0);
    display:flex; flex-direction:column;
    overflow:hidden;                      /* nothing may spill — see §9 */
  }

  .eyebrow{font-size:var(--step--1); font-weight:600; letter-spacing:.10em;
           text-transform:uppercase; color:var(--accent);}
  h1{font-family:var(--font-display); font-weight:600;
     font-size:var(--step-5); line-height:1.05; margin-top:var(--space-2xs);}
  h1 em{font-style:normal; color:var(--accent);}   /* no italics, ever */
  .subhead{font-size:var(--step-1); line-height:1.35;
           color:var(--fg-muted); margin-top:var(--space-xs);}
  hr{border:0; border-top:1px solid var(--border); margin:var(--space-m) 0;}

  .body{flex:1; display:grid; gap:var(--space-s); align-content:start;}

  .module{background:var(--surface-card); border:2px solid var(--edge);
          border-radius:var(--radius-card); padding:var(--space-s);}
  .chip{display:inline-block; background:var(--tint); color:var(--ink);
        border:1px solid var(--edge); border-radius:var(--radius-chip);
        padding:6px 14px; font-size:var(--step--1); font-weight:600;
        letter-spacing:.10em; text-transform:uppercase; line-height:1;}
  .module h2{font-family:var(--font-display); font-weight:600;
             font-size:var(--step-2); line-height:1.15; color:var(--ink);
             margin-top:var(--space-2xs);}
  .module ul{list-style:none; margin-top:var(--space-2xs);}
  .module li{line-height:1.40; padding-left:20px; position:relative;}
  .module li::before{content:''; position:absolute; left:0; top:.55em;
                     width:6px; height:6px; border-radius:50%; background:var(--edge);}

  /* One slot per module. Slots taken in order — see §4.3. */
  .s1{--tint:var(--data-1-surface); --ink:var(--data-1-fg); --edge:var(--data-1-border);}
  .s2{--tint:var(--data-2-surface); --ink:var(--data-2-fg); --edge:var(--data-2-border);}
  .s3{--tint:var(--data-3-surface); --ink:var(--data-3-fg); --edge:var(--data-3-border);}
  .s4{--tint:var(--data-4-surface); --ink:var(--data-4-fg); --edge:var(--data-4-border);}
  .s5{--tint:var(--data-5-surface); --ink:var(--data-5-fg); --edge:var(--data-5-border);}

  .receipt{background:var(--surface-card); border:1px solid var(--border);
           border-radius:var(--radius-card); overflow:hidden;}
  .receipt .bar{background:var(--surface); border-bottom:1px solid var(--border);
                padding:var(--space-2xs) var(--space-xs);
                font-family:var(--font-mono); font-size:var(--step--1);
                color:var(--fg-muted);}
  .receipt .dot{display:inline-block; width:9px; height:9px; border-radius:50%;
                background:var(--border); margin-right:5px;}  /* neutral — §5.3 */
  .receipt .content{padding:var(--space-xs); font-family:var(--font-mono);
                    font-size:var(--step--1); line-height:1.5;}

  footer{border-top:1px solid var(--border); margin-top:var(--space-m);
         padding-top:var(--space-s); display:flex; justify-content:space-between;
         font-size:var(--step--1);}
  footer .who{color:var(--fg-muted);}
</style>

<div class="canvas">
  <div class="eyebrow">Eyebrow, five words max</div>
  <h1>Headline with <em>one phrase</em> in accent</h1>
  <div class="subhead">One sentence naming the payoff, containing a number.</div>
  <hr>

  <div class="body">
    <article class="module s1">
      <span class="chip">Step 1</span>
      <h2>Imperative verb phrase</h2>
      <ul><li>Nine words or fewer.</li><li>Nine words or fewer.</li></ul>
    </article>
    <!-- modules 2..n, slots s2..sn, in order -->
  </div>

  <footer><span>kwp</span><span class="who">What you help with</span></footer>
</div>
```

For the dark register, swap the `:root` color block for the dark column of §4.2 and the dark table of §4.3. Change nothing else.

### 8.4 Handing this to ChatGPT

Paste this file, then say roughly:

> Build a 1080×1350 infographic following the attached spec exactly. Topic: **[topic]**. Layout: **[A stack / B ladder / C bento]**. **[N]** modules. Light register.
>
> Use exactly the hex values in the spec and do not substitute, adjust, or "improve" them. Headings in **Lora SemiBold 600 only** — no other Lora weight. Body in Hanken Grotesk. No icons, no emoji, no gradients, no shadows, no italics. Output one standalone HTML file, then render it to JPG at exactly 1080×1350.
>
> Before you build, show me the copy as plain text with a word count, and stop for my approval.

Three things go wrong if you do not say them out loud — the first two are the same failures documented in [PALETTE.md](PALETTE.md):

1. **Generators saturate.** If the output comes back brighter than the tables in §4, it substituted its own palette. Say "do not adjust these colors."
2. **Lora exists at 600 only.** Ask for Lora Bold or Regular and it gets faked.
3. **Generators add icons and emoji unprompted.** Say no icons and no emoji explicitly, every time.

The "show me the copy first" step is the highest-value line in that prompt. It catches the word-budget overrun while it is still cheap to fix.

---

## Part 9 — Preflight

Run this before every export. It is ordered by how often each one actually fails.

1. **Word count is 120–180.** Count it. Do not estimate.
2. **Nothing overflows the canvas.** `overflow:hidden` hides the failure rather than fixing it — check the render, not the DOM.
3. **No reading text below 23px.** Chips and captions at 19px are the only exceptions.
4. **Categorical slots are in order** from 1, with no gaps and no repeats.
5. **Grayscale test.** Desaturate the render. Every distinction still readable? Every module still identifiable by its label?
6. **Every module has a text label**, not only a color.
7. **Status colors appear only on outcomes**, never as module identity, and never as window chrome.
8. **Module titles are grammatically parallel.**
9. **Every receipt is real.** No invented numbers, filenames, or screenshots.
10. **`kwp` is lowercase.** No generated signature mark.
11. **One register.** No light values on a dark canvas.
12. **Squint at it at 400px wide.** The headline and the module count should survive. If they don't, nothing else on the canvas matters.
13. Exported at exactly **1080×1350**.

---

## Part 10 — Deviations from the design system, declared

SPEC §10 permits a consumer to add what it needs, provided the deviation is justified by function, additive, and lives outside `tokens/`. Three apply here. All are additive; none redefines a shipped token.

| Deviation | Why | Status |
| :-- | :-- | :-- |
| `--ig-step-5` at 72px | The scale tops out at 57px, which is a web headline, not a 1080px-canvas headline. Continues the existing ~1.26 ratio. | Extending a scale at the ends is safe under SPEC §11. |
| `--font-mono` | Receipt panels show real file content, and proportional type makes a filename look like prose. The system ships no mono. | System stack only — no new font file, no new dependency. If a brand mono is ever chosen, this points at it and nothing else changes. |
| Fixed px instead of `clamp()` | The canvas is one fixed size. Fluid type has nothing to be fluid against. | The px values are the large end of the shipped scale at a 20px root, not a new scale. |

Also declared, though not deviations: card radius and the 2px module edge are layout decisions with no token behind them, which is correct — they are this consumer's business, not the system's.

**Nothing here belongs in `tokens/`.** The design system must never learn what an "infographic" is, for the same reason it must never learn what a "meal type" is.

---

## Part 11 — Never

- Never use a hue outside the categorical scale for a module.
- Never map a status onto a numbered slot, or a slot onto a status.
- Never exceed 8 modules.
- Never let color be the only difference between two things.
- Never mix light and dark values on one canvas.
- Never synthesize a Lora weight. Never use italics.
- Never use an emoji.
- Never invent a receipt.
- Never write `KWP`.
- Never let a model draw the signature mark.

---

## Changing this document

Edit → rebuild one graphic in each of the three layouts → confirm nothing overflows and preflight passes → commit.

If a change touches a **value** rather than an arrangement, it belongs in `tokens/` and [SPEC.md](SPEC.md) first, and this file follows. If a categorical or semantic value moves, **remeasure §4.5** in the same commit.

The module ceiling of 8, the 23px reading floor, the word budget, and the no-icons rule are the load-bearing constraints. Changing any of them is a conversation, not an edit.

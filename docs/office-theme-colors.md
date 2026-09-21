# kwp design in Microsoft Office

**A theme-colors file for Word, PowerPoint and Excel on the desktop.** Install it once and the twelve swatches at the top of every color menu in Office become the design system instead of Office's default blues.

The file is [`office/kwp-design.xml`](../office/kwp-design.xml). It is a **layer-3 consumer**: it reads the system and maps it onto Office's fixed slots. It does not add a value, and nothing else in the repo depends on it.

> Every value in the file is copied from `tokens/`. **If the two ever disagree, `tokens/` wins** — regenerate this mapping, do not edit around it.

---

## Install

**Windows.** Drop the file in:

```
%AppData%\Microsoft\Templates\Document Themes\Theme Colors\
```

**Mac.** The same folder inside the Office group container:

```
~/Library/Group Containers/UBF8T346G9.Office/User Content*/Themes/Theme Colors/
```

Some Mac installs suffix those folders with `.localized`. If you cannot find it, use the fallback below — it always works.

Restart Word. **Design > Colors** now lists **kwp-design** under *Custom*, above the Office sets.

**Fallback, and it is not a lesser option:** **Design > Colors > Customize Colors…** and type the twelve values from the table below into the dialog. Name it `kwp-design`, Save. That is the same file, written by Word instead of by you.

**This is desktop only.** Word on the web cannot load custom theme colors — it will render a document made with them correctly, but it cannot offer you the palette.

---

## The mapping

Office gives **twelve slots and no more**, which forces three decisions. They are recorded here so nobody has to re-derive them.

| Office slot | Token | Hex | Contrast on white |
| :-- | :-- | :-- | --: |
| Text/Background — Dark 1 | `--fg` (light) / `--ink-900` | `#1A1917` | 17.57:1 |
| Text/Background — Light 1 | `--surface-card` / `--paper-0` | `#FFFFFF` | — |
| Text/Background — Dark 2 | `--surface` (dark) / `--navy-900` | `#0A1420` | 18.52:1 |
| Text/Background — Light 2 | `--border` (light) / `--sand-200` | `#E3E0DA` | 1.32:1 |
| Accent 1 | `--accent` (light) / `--teal-700` | `#0D5C58` | 7.81:1 |
| Accent 2 | `--data-1-fg` | `#5F3531` | 10.29:1 |
| Accent 3 | `--data-2-fg` | `#5A3A1E` | 10.20:1 |
| Accent 4 | `--data-3-fg` | `#474419` | 9.96:1 |
| Accent 5 | `--data-4-fg` | `#284C30` | 9.69:1 |
| Accent 6 | `--data-5-fg` | `#0D4A57` | 9.84:1 |
| Hyperlink | `--accent` / `--teal-700` | `#0D5C58` | 7.81:1 |
| Followed Hyperlink | `--accent-hover` / `--teal-800` | `#0A4A47` | 10.08:1 |

### Why Accent 1 is the brand and Accents 2–6 are categories

Accent 1 is not just the first swatch. Word's heading styles, the default shape fill, the first chart series and every table style's header row all reach for it. If Accent 1 were a categorical slot, every default object in every document would be a pale category color. So **Accent 1 is `--accent`** — and it is *not* a category. A chart with four equal series uses **Accents 2, 3, 4, 5**, in that order, the same as taking `--data-1` through `--data-4` in order anywhere else.

Slots 6, 7 and 8 have nowhere to go. Office has six accents; the system has eight categorical slots. If you need a seventh category in a Word document, reach for the hex in [PALETTE.md](PALETTE.md) as a custom color — and ask whether seven categories on one page is the real problem.

### Why the accents are the `fg` value and not the `surface`

Each categorical slot ships three values — surface, fg, border. Office takes **one** per accent and derives everything else itself.

The `fg` value (OKLCH L38) is the only one that survives all of Office's uses: it reads as text on white at ~10:1, it takes white text on top at the same ratio, and Word's table styles — which put white text on the full-strength accent in the header row — work correctly. Hand Office the pale `surface` value instead and that header row becomes white text on a pale pink fill.

The cost: **Word's color menu will not offer you the system's authored surfaces.** See the next section.

### Why Dark 2 is `--navy-900` and there is no dark set

`--navy-900` is the dark page on kwpledger.com, so a dark band in a Word document is literally the same color as the dark register of the site.

**There is deliberately no `kwp-design-dark.xml`.** Office's twelve slots are not a light register and a dark register — Dark 1 is *text on a light page*, not "the page in dark mode". An inverted set makes Word's "Automatic" text color light on a white page, which is invisible text. The dark register's values are in [PALETTE.md](PALETTE.md); apply them by hand on a dark slide, not by swapping the palette.

`--surface` in its **light** register (`--paper-50`, `#FBFAF8`) has no slot either. Light 1 has to stay pure white or Word's white table cells will patch mismatched against the page. For a warm page: **Design > Page Color > More Colors > Custom**, `#FBFAF8`.

---

## The one trap: Word's Lighter variants leave the system

Hover any theme swatch in Word and you get five derived variants — *Lighter 80/60/40%*, *Darker 25/50%*. Office computes these itself, in HSL, and **the lighter ones raise chroma past the system's ceiling of 0.091**:

| Accent | Base | Lighter 60% | Lighter 40% | Darker 25% |
| :-- | :-- | :-- | :-- | :-- |
| 1 — teal-700 | C 0.070 | `#71EBE5` C **0.110** | `#2AE1D8` C **0.136** | `#0A4542` C 0.057 |
| 4 — data-3 | C 0.062 | `#D4CF85` C **0.095** | `#BEB747` C **0.133** | `#353313` C 0.049 |
| 6 — data-5 | C 0.062 | `#70D4EA` C **0.098** | `#29BFDF` C **0.125** | `#0A3841` C 0.050 |

`--teal-300`, the most saturated color in the brand, is 0.091. Word's *Lighter 40%* of the brand teal is **half again as saturated as anything the system permits** — that is the neon the chroma ceiling exists to prevent.

**So: the base swatch and the Darker variants are in-system. The Lighter variants are not.** For a pale fill — a callout box, a category chip, a table band — take the authored `--data-n-surface` hex from [PALETTE.md](PALETTE.md) via *More Colors > Custom* instead. It is three more clicks and it is the actual value.

The Darker variants are safe and one of them is free: Word's **Heading 1** style is *Accent 1, Darker 25%*, which lands on `#0A4542` — within sight of `--teal-800`, at 10.81:1 on white. Headings come out brand teal with no work.

---

## What does not come from the palette

**Body text stays black until you tell it otherwise.** Word's Normal style uses *Automatic* (pure black), not Text 1. To pick up `--ink-900`: select the Normal style, **Modify > Font color > Text 1**. Do it in a template once rather than per document.

**Fonts are a separate file, not shipped here.** Design > Fonts is its own custom set. Lora and Hanken Grotesk have to be installed as desktop fonts first — the `.woff2` files in `fonts/` are for the web and Windows will not install them. Get the TTFs from Google Fonts. Lora is **SemiBold 600 only** in this system; if a Word style shows Lora Bold, Word is faking the weight.

---

## The rule that outranks all of the above

**Color is always reinforcement, never the sole carrier of meaning.** A chart whose categories are distinguished only by Accents 2–6 is not acceptable output, however good it looks — label every series.

This matters more in Office than on the web, because the accents are intentionally close together. Measured in OKLab, adjacent categorical slots sit 0.036–0.069 apart, and Accent 1 sits 0.060 from Accent 6 — inside that same band. They are peers by construction, not shouting for attention, and they are not trying to be told apart at a glance. The label does that work.

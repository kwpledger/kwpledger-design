# Swiss deck: the PowerPoint format

**A slide system in one typeface.** Hanken Grotesk on a 12-column grid, IBM Plex Mono for labels, and nothing decorative. It is for decks where *ultramodern* is the goal. It is not the default for every presentation.

| File | What it is |
| :-- | :-- |
| [`office/swiss-deck/Swiss-Deck-Template.potx`](../office/swiss-deck/Swiss-Deck-Template.potx) | The template for presenting. Double-click it to start an untitled deck. |
| [`office/swiss-deck/Swiss-Deck-Video-Template.potx`](../office/swiss-deck/Swiss-Deck-Video-Template.potx) | The variant for 1080p video. See [Video variant](#video-variant). |
| [`office/swiss-deck/build.js`](../office/swiss-deck/build.js) | Layout geometry and the sample deck's copy (pptxgenjs). |
| [`office/swiss-deck/post.py`](../office/swiss-deck/post.py) | Applies what pptxgenjs can't write: the theme slots, master band, guides, placeholder fixes and colour map. Standard library only. |

It is a **layer-3 consumer**. It reads the system and adds no value of its own. Every colour is read from `tokens/base.css` at build time, and the theme's twelve slots are [`office/theme-colors/kwp-design.xml`](../office/theme-colors/kwp-design.xml), copied in unchanged. So a chart in a Swiss deck gets the categorical accents exactly as [office-theme.md](office-theme.md) maps them.

## Rebuild

After a token release, or after changing a layout:

```bash
cd office/swiss-deck && npm install && npm run build
```

This writes both templates (committed) and a sample deck for each, `Swiss-Deck-Sample.pptx` and `Swiss-Deck-Video-Sample.pptx`, which show every layout filled in, with speaker notes. The samples are not committed. The generator has its own `package.json` so that the root package stays dependency-free.

## The system

**Grid.** The slide is 13.333 × 7.5 in. All geometry is written in 1080p pixels at 144 px per inch: 96 px (0.667 in) side margins, 12 columns of 122 px and 24 px gutters, giving a 1728 px (12 in) live width. The grid is set as locked **Slide Master guides**: every column edge, plus the top margin, band rule, body top and bottom margin.

**Type.** Five sizes, two weights. In points (pixels ÷ 2):

| Role | pt | Weight | Tracking | Leading |
| :-- | --: | --: | --: | --: |
| Display | 120 | Bold | −5 pt | 0.90 |
| Title | 48 | Bold | −1.5 pt | 0.95 |
| Subhead | 24 | Bold | −0.25 pt | 1.10 |
| Body | 16 | Regular | 0 | 1.30 |
| Label (Plex Mono, uppercase) | 12 | Regular | +0.5 pt | 1.20 |

The big-number layout is the one exception, at 200 pt, because a single numeral there works as a graphic. The theme's heading and body fonts are **both** Hanken Grotesk, on purpose. That is the format, not a departure from the Lora/Hanken pairing.

**The band.** Deck name, session label, a live slide number and a 1 pt rule sit on the Slide Master, so you set them once in *View → Slide Master*. The number is a slide-number field, so it appears without *Insert → Slide Number*. It shows the current slide only. PowerPoint has no field for the total, so "1 / 18" would have to be typed by hand and would go stale the first time a slide is added.

**A new deck opens on 01 Cover.** Cover is marked as the title layout, and the blank layout sits last in the list.

**Line heights are measured, not assumed.** Office's "single" line is the font's own line height: 1.3 em for both Hanken Grotesk and Plex Mono. Line spacing multiplies that. So a box sized as size × spacing comes out about 30% short. `build.js` sizes every box as size × 1.3 × spacing × lines.

**Registers.** Light is `--paper-50` with ink text. Dark is `--navy-900`: dark layouts override the colour map (`tx1 → lt1`), so the band and any `Text 1` content turn light on their own. Accent is `--teal-700`, used once, for the close. Muted text is `--ink-500` on light, `--navy-200` on dark and `--teal-200` on teal (4.7:1). Highlight is `--teal-700` on light and `--teal-300` on dark.

## The layouts

| # | Layout | Register | Notes |
| :-- | :-- | :-- | :-- |
| 01 | Cover | dark | Display headline anchored low-left |
| 02 | Section divider | light | Display-size number in the accent |
| 03 | Statement | light | One sentence, ten columns, bottom-anchored |
| 04 | Numbered list | dark | Muted lead-in, items at title size, numbers typed in the text |
| 05 | Process columns | light | Four columns: number, rule, heading, two lines |
| 06 | Three-up images | light | Each image four columns wide |
| 07 | Full-bleed image | dark | **No band**, see below |
| 08 | Diagram, whole slide | light | Content placeholder over the full live area |
| 09 | Diagram with numbered title | dark | Number in columns 1–2, title from column 3 |
| 10 | Aspect-ratio row | light | 16:9, 1:1, 4:5, 9:16 at one height |
| 11 | Before-after grid | light | Two 2×2 groups, 8 px inside, 24 px between |
| 12 | Mosaic with notes | light | Mosaic in columns 1–7, notes in 9–12 |
| 13 | Big number | dark | 200 pt numeral. Real figures only |
| 14 | Quote | light | Title size, mono attribution |
| 15 | Split | light | Text in columns 1–5, image in 7–12 |
| 16 | Table | light | Horizontal rules only, numbers right-aligned |
| 17 | Close | accent | Carries its own band copy, see below |
| 18 | Title only | light | For composed slides |

Picture placeholders are tinted (`--sand-200` / `--navy-800`), so empty slots are visible while you edit. Empty placeholders don't render in a slideshow. The two diagram slots are general content placeholders, so they take a picture, chart, SmartArt or table.

## Decisions, so nobody re-derives them

**The full-bleed layout has no band.** PowerPoint always draws slide content above layout and master content, so a full-frame photo covers any band defined on the layout. Rather than fake it, the photo owns the frame. If a particular slide needs the band over the photo, add text boxes on that slide.

**The close layout duplicates the band.** Its teal background needs lighter text than either register's colour map gives. Renaming a deck means changing the name on the master and on this layout.

**The band is full-strength, not muted.** A muted band would need `--ink-500` and `--navy-200` in theme slots, and the settled Office mapping holds neither. The band is set in `Text 1`, which the dark override turns light. The web specimen's muted band, and the two colours it used that are not tokens, were not carried over.

**No bullets at level 1.** The master's body style has no bullet and no hanging indent. Lists in this format are numbered in the text ("01 …"), so a bullet would only add noise. Turn one on per paragraph if a deck needs it.

## Video variant

`Swiss-Deck-Video-Template.potx` has the same 18 layouts on the same grid, set for 1080p export (*File → Export → Create a Video*, 1080p) and watching on a phone:

| | Deck | Video |
| :-- | --: | --: |
| Live area ends at | y 984 | **y 950**, the bottom 12% stays clear of the player's controls, progress bar and captions |
| Label (Plex Mono) | 12 pt | **20 pt** (40 px), the floor for text read on a phone |
| Body | 16 pt | **22 pt** |
| Subhead | 24 pt | **28 pt** |
| Slide number in the band | yes | **no**, because a viewer can't jump to "slide 7" |
| Mosaic notes | three | **two**, because three two-line notes at 22 pt need more height than the mosaic has |

Display, title and the big number are unchanged. They were already large enough. Use no transitions, or cuts only: the format's motion is the cut.

## Sharing a deck

Install the static Hanken Grotesk and IBM Plex Mono TTFs. The `.woff2` files in `fonts/` won't install, see [office-theme.md](office-theme.md). Then turn on **File → Options → Save → Embed fonts in the file** before a deck leaves your machine. Both fonts are SIL OFL. **Color is never the sole carrier**: the before/after labels, ratio labels and chart series labels do that work.

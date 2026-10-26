# kwp Handwriting (`--font-hand`)

Kevin's own handwriting, made into a font (delivered 2026-10-26). It is in the system for the **very rare** case where a hand-drawn mark is the point — his first named use is the arrows on the infographic format. It is not a fourth voice alongside Lora, Hanken Grotesk and IBM Plex Mono; it is a drawing tool that happens to be typeset.

## Use it for

- Arrows and short annotations that should read as marked up by a person.
- Occasional marginalia on a graphic: a circled word, a "this →", a one-line aside.

## Do not use it for

- Headings, body, labels, chips, buttons, navigation, or anything read as a sentence. Those are Lora and Hanken Grotesk.
- Anything carrying meaning that has no text alternative. Handwriting is reinforcement like color is: **the label carries the claim, the hand-drawn mark decorates it.**
- Text at small sizes. It was drawn to be seen large.

## Files and token

| | |
| :-- | :-- |
| `fonts/kwp-handwriting-regular.woff2` | 400, ~153KB, v001.008 |
| `fonts/kwp-handwriting-bold.woff2` | 700, ~77KB, v001.002 |
| `--font-hand` | `'kwp Handwriting', 'Segoe Print', 'Bradley Hand', cursive` |

Static, two weights, upright only. Anything else the browser fakes, so set it at 400 or 700. The files are fetched only when text is set in `--font-hand`; a page that never uses it pays nothing.

The family is declared as `kwp Handwriting` in lowercase because the initials always are. The name inside the files is `Kwp_handwriting`; the CSS name is what consumers write.

**Not latin-subset, on purpose.** The other faces are. This one is shipped as delivered because the Regular carries contextual alternates (1,031 glyphs for 488 characters) that make repeated letters differ, and a subset could flatten them. Coverage includes Latin-1, Latin Extended-A and the arrows U+2190–2195, U+21A8, U+21D2 and U+21D4. If size ever matters, subset in a test that confirms the alternates survive.

## Open

- **Infographic arrows.** `infographic-design-system.md` §5.5 and §5.6 still specify SVG arrows. Permitting the font there does not respecify them; setting `→` as a glyph versus drawing paths is a decision for when the first graphic uses it. The §5.6 arc geometry is untouched.
- **Arrow size.** At body-text size the arrow glyphs render small and short (checked in Chromium, 2026-10-26). Set them well larger than the text beside them, or draw the arrow as a path.
- **Contrast.** No pairing is gated. Hand-drawn strokes are thin; check any use against the surface it sits on, and prefer `--fg` or `--fg-muted`.
- **Reuse by others.** Licence terms are unstated. See `fonts/OFL-NOTICE.txt`.

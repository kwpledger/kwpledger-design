# Infographic generator prompt: Lora weight and italics

Decision record, 2026-10-25. Closes the TickTick item *"Decide how the infographic generator prompt handles Lora weight and italics."* Reference, not handoff: no length limit applies.

## The question

[infographic-design-system.md](infographic-design-system.md) §8.4 is the copy-paste prompt Kevin gives a generator. After v0.11.0 (PR 65) it still says *"Headings in Lora SemiBold 600"* and *"no italics in headings"*, while the rules in §3 now allow:

- Lora at any weight in 400–700, with 600 the default.
- Italic Lora titles, discouraged, allowed with a reason.
- Italic Hanken Grotesk in subtitles and body text.

Should the prompt state only the default, or name the exceptions (e.g. "italic Hanken allowed in the subhead")?

## Decision

**The prompt states the default and nothing else. It does not list the exceptions.** An exception is a deliberate edit to the prompt for that one graphic, and it brings its font file with it.

## Why

1. **The permissions are Kevin's, not the generator's.** §3 says what a human may choose. §8.4 exists to stop a generator choosing for itself. It already lists the failures: saturating colors, picking its own weight, adding icons, redrawing the signature. A sentence saying "italics are allowed in the subhead" is read as an invitation. Italic Hanken would show up in graphics where nobody asked for it.
2. **The default is the right output nearly every time.** "Lora 600, no italics" produces a correct graphic without any judgement. An exception needs a reason (§3.4), and a reason lives with the one graphic that has it.
3. **An unrequested italic currently renders wrong.** The §8.3 skeleton declares both families with `font-style: normal` only, and §8.2 tells Kevin to upload only the two upright files. A generator that uses `<em>` or `font-style: italic` gets a synthesized oblique, which is the failure §3 warns about ("subtly broken in a way nobody can name"). Allowing italics in the base prompt, without the files and `@font-face` rules to back them, would produce that failure on purpose.
4. **"No italics in headings" is too narrow, not wrong.** It leaves italic Hanken in body text unstated, and a generator may add it. The default should be "no italics" unless the graphic opts in.

## What to change in infographic-design-system.md

Applied in v0.12.1. Three edits, all wording and an example, with no token or gate affected:

**§8.4 prompt**, replace *"Headings in **Lora SemiBold 600**. Body in Hanken Grotesk. … no italics in headings."* with:

> Headings in **Lora SemiBold 600**, no other weight. Body in Hanken Grotesk 400, with 600 for bold. **No italics anywhere.** No topic icons, no emoji, no gradients, no shadows.

**§8.4 failure list**, item 2, extend to cover italics:

> **Name the Lora weight, and say no italics.** Leave the weight unsaid and the generator picks its own, usually the browser's bold. Say 600. Leave italics unsaid and it adds them, and without the italic file loaded they are synthesized.

**§8.4, new short paragraph: "When a graphic needs an exception."**

> Edit the prompt for that graphic only. For italic Hanken in the subhead, or an italic Lora title with a reason, also upload `hanken-grotesk-latin-italic.woff2` or `lora-latin-italic.woff2`, add the matching `@font-face` with `font-style: italic`, and record the departure in the graphic's README per *Departing from this document in one graphic*. The prompt grants the exception; the skeleton does not.

§8.2 and §8.3 should gain the italic files and `@font-face` lines as an *optional* set, labelled "exceptions only".

## What this does not change

No token, gate, or rule in SPEC.md moved. §3.4 and Part 11 stay as written: Lora weights 400–700, italic Lora discouraged, italic Hanken in subtitles and body allowed. The decision is only about what the generator is told.

# Backlog format — one standard for every repo

Agreed with Kevin 2026-09-23. Applies to `kwpledger-site`, `kwpledger-design`,
`meal-planner`, `runbox-mcp`, and every project started after them.

**Where it lives, and why here** (Kevin, 2026-09-23). It started in
`kwpledger-site` and moved here the same day, because this repo is the hub for
standards that span repos (the header and footer rule is here too). Two things
follow. A session with only this repo attached still has it. And because the
package ships `docs/`, every npm consumer carries the exact copy it is pinned to,
at `node_modules/@kwpledger/design/docs/BACKLOG-FORMAT.md`, with nothing copied
by hand and nothing to drift. A repo that doesn't install the package links
here. Changing this file is the site line's call, like the rest of this repo's
contract (AGENTS.md, *Who owns this repo*).

**Why it exists.** By September 2026 the four backlogs said "finished" four
different ways: struck through plus **DONE**, struck through plus **SHIPPED**, a
heading ending "— SHIPPED", and a separate `# Shipped` section. Strikethrough
also meant "decided against", so the one mark a reader scans for was ambiguous.
No file said which version its work belonged to, so there was no answer to
"where does v0.9 sit?" `meal-planner`'s had reached 1,073 lines, most of it the
story of finished work.

The format is Kevin's own, from the sprint backlogs he keeps for his work
projects. It was already proven on him, which is worth more than any
format designed fresh.

## The two files

| File | Holds | Grows |
| :-- | :-- | :-- |
| `docs/BACKLOG.md` | Work toward the **next** version: open items, and what has finished since the last release | Shrinks at every release |
| `docs/CHANGELOG.md` | What each released version contains, newest first | Only ever appends |

A long write-up of finished work belongs in neither. It goes in the PR
description, and anything a future session must know goes in the repo's
`GOTCHAS.md` or `DECISIONS.md`. The backlog records *that* something finished
and links the PR; the PR records *how*.

## BACKLOG.md

### The title names the version being worked toward

```markdown
# These things need to be done in Meal Planner v1.0 #
```

That line is what answers "where does this sit". Directly under it, one line
gives the current released version and links here:

```markdown
Current release: **v0.9.0** (2026-09-23). Format: [BACKLOG-FORMAT](https://github.com/kwpledger/kwpledger-design/blob/main/docs/BACKLOG-FORMAT.md).
```

### Sections are areas of work, each closing with its own completed list

```markdown
## To Do (sync) ##

Architecture note: one short paragraph, only where it changes how the items
below are done. Anything longer is a DECISIONS.md entry.

- [ ] **1.** An open item.
    - [ ] **a.** A sub-item.
        - [ ] **i.** A third level, if it earns one. Rarely.
- [ ] **2.** The next one.

**Completed Items**

- [x] What finished, in one line. 2026-09-23, PR #39.
- [x] ~~What was decided against.~~ (Why, in a sentence.)
```

A section with nothing in a list says so, rather than dropping the heading:

```markdown
**Completed Items**

(none)
```

- **Order within a section is the order to do the work.** Item **1.** is next.
- **`**0.x**` numbers a prerequisite** — something that has to land before
  item **1.** can start. Borrowed from the work backlogs, where it marks the
  setup every scene inherits.
- **Areas are the repo's own, one word each.** Pick names a reader would use to
  find something (sync, matching, chrome, retention), not a status (urgent,
  later). One word, because the name is also the ID prefix below. The one
  status heading allowed is a last section for work that is deliberately
  outside the running order: `## To Do (polish — lower priority, non-blocking) ##`,
  whose prefix is `POLISH`.
- **Numbers are current priority, so completing an item removes its number.**
  It moves to **Completed Items** unnumbered, and every open item below it in
  that section moves up one: what was **3.** becomes **2.** A decided-against
  item moves the same way, because the decision is complete. Work gets done out
  of order for all sorts of reasons, so a finished item's old number means
  nothing and is not kept.

### Item IDs: section plus number

An item is named by its section in capitals, a hyphen, and its number:
**`SYNC-1`**, **`MATCHING-2`**, sub-items **`RIGGING-3a`**, prerequisites
**`INTRO-0.1`**, a run of sub-items **`RIGGING-3a` to `-3c`**. This came from
Kevin's work backlogs, where "intro video's #2" was ambiguous and `INTRO-2`
is not.

**An ID names a position, not an item, so it is spoken, never written.** When
`MATCHING-2` completes, yesterday's `MATCHING-3` becomes `MATCHING-2`. That is
exactly right for talking about the current list, in chat or in a session, and
it is why IDs never go into any file, **the backlog included**. An item that
depends on another names it in words:

```markdown
- [ ] **3.** Decide on the trim color once the wall is painted.
```

not "once `WALLS-2` is done". That way the number the wall had on the
then-current list isn't copied through the document, where it would point at a
different item after the next completion.

**A conversation spanning repos adds a repo prefix:** `SITE-UIUX-1`,
`MEAL-SYNC-1`, `RUNBOX-RELEASE-1`, `DESIGN-TOKENS-1`. Inside a single repo the
bare section ID is enough. Still spoken only.

### Three marks, one meaning each

| Mark | Means | Never means |
| :-- | :-- | :-- |
| `- [ ]` | Open | — |
| `- [x] Text. 2026-09-23, PR #39.` | Done | — |
| `- [x] ~~Text.~~ (Reason.)` | Decided against | Done |

**Strikethrough is only ever "decided against"**, and whenever possible it is
followed by the reason in parentheses:

```markdown
- [x] ~~Paint the walls red.~~ (We are not painting the walls red because the paint test area shows it would clash with the furniture.)
```

The reason is the part that stops a later session proposing it again.

**The words DONE and SHIPPED are not used as markers.** The checkbox already
says it; a second marker is how the four dialects started.

**A done item carries its date and PR** when it has one. Work with no PR
(a dashboard setting, a decision) gives the date alone.

**Unplanned work is recorded too.** Something that comes up and gets done
straight away goes directly into its section's **Completed Items**, never
numbered, dated like anything else:

```markdown
- [x] Buy brushes for future paint work. 2026-09-23.
```

A backlog reads as a list of planned work, so the risk isn't numbering this
wrong; it's never writing it down. Work finished in passing gets reported in
chat and never reaches the file, and then never reaches the changelog either.
(Runbox's theme toggle once existed only in a chat message; this is the same
gap from the other direction.)

## CHANGELOG.md

```markdown
# Changelog — Meal Planner

Newest first. Each version lists what it added; the PR has the detail.

## v0.10.0 — 2026-10-02

- One line per completed item, carried over from the backlog. PR #41.

## v0.9.0 — 2026-09-23 — first tagged release

Everything before the first tag, without per-version detail. …
```

### A release, in order

1. Bump `version` in `package.json` in the PR that finishes the version.
2. In the same PR, move every `- [x]` from the backlog's **Completed Items**
   lists into a new CHANGELOG section headed `## vX.Y.Z — date`.
   Decided-against items move too — they are part of what that version is.
3. Leave each backlog section's `**Completed Items**` heading in place, reset to
   `(none)`.
4. If the milestone in the backlog title has been reached, retitle it to the
   next one.
5. Merge. In a repo with `.github/workflows/release.yml`, the merge tags the
   version and publishes the GitHub release. There is no separate tag step, and
   a session cannot cut one by hand.

### Versions

Pre-1.0 numbers are written in sand, by Kevin's own description. Bump the
minor (`0.9` → `0.10`) when a meaningful set of work lands. There is no rule for
how much is meaningful.

From 1.0: **patch `x.y.Z`** for fixes, **minor `x.Y.z`** for additions,
**major `X.y.z`** for changes that break what came before.

**Nothing before the first tag is backfilled.** No v0.1–v0.8 were tagged, so
which work belonged to which of them cannot be known, and guessing would put
invented history in a file whose whole value is being right. The first tagged
version's CHANGELOG section holds everything that came before it.

## Per-repo additions

A repo may add to this format, never contradict it. Record the addition in the
backlog's own header.

- **`kwpledger-site`** keeps its first section as **Current sprint**, holding
  exactly one item (its `docs/WORKING-STYLE.md` for why).
- **`kwpledger-site` also keeps `KWP-n`, as a permanent key alongside the
  spoken ID.** A `KWP-n` is numbered across the whole site, belongs to its item
  for life, and is never renumbered, so it is the one ID that may be written
  down, and other docs and repos already cite it (`KWP-16`, the shared chrome
  rule, most of all). Each site item carries both: its `KWP-n` in the text for
  the record, and its position for finding it. The light/dark toggle is
  **`KWP-19`** in writing and **`SITE-UIUX-1`** in conversation.

  **Open, and deliberately not soon:** Kevin would like to stop giving *new*
  items a `KWP-n` eventually. The constraint is only that nothing already
  cited may break, so existing `KWP-n` IDs keep theirs; the open question is
  what, if anything, a new item written down needs instead. Tracked in the
  site's own backlog.

## Converting an existing backlog

1. Nothing is deleted. Open items move into the new sections as `- [ ]`.
   Finished items become one-line `- [x]` entries in the first CHANGELOG
   section. The old long-form write-ups move, verbatim, to
   `docs/HISTORY.md`, which is an archive: read deliberately, never added to.
2. Every reference to the old file's headings or item numbers, in any doc or
   code comment, is updated in the same PR.
3. The conversion is its own PR, with no other change in it, so the diff is
   a reorganisation a reviewer can check against the original.

## Blank template

Copy into a new repo's `docs/BACKLOG.md` and replace the angle brackets.

```markdown
# These things need to be done in <Project> v<next milestone> #

Current release: **v<x.y.z>** (<date>). Format: [BACKLOG-FORMAT](https://github.com/kwpledger/kwpledger-design/blob/main/docs/BACKLOG-FORMAT.md).


## To Do (<one-word area>) ##

- [ ] **1.** <item>

**Completed Items**

(none)


## To Do (polish — lower priority, non-blocking) ##

(none)

**Completed Items**

(none)
```

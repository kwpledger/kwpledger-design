# Changelog template

Copy the block that fits into a new repo's `docs/CHANGELOG.md` and replace the
angle brackets. The rules behind it, and the release steps that fill it, are in
[BACKLOG-FORMAT.md](BACKLOG-FORMAT.md) (*CHANGELOG.md*). This file is only the
blank.

Pick one:

1. **One backlog** — the default. Use A.
2. **Several backlogs sharing one version** — use B.
3. **A single file has grown too long** — split by minor series, use C on top
   of A or B.

## A. One backlog

```markdown
# Changelog — <Project>

Newest first. Each version lists what it added; the PR has the detail.

## v<x.y.z> — <date>

- [x] <One line per completed item, carried over from the backlog.> PR #<n>.
- [x] <A decided-against item moves too; it is part of what this version is.>

<Optional closing paragraph: why this bump was a minor and not a patch, what
carried over open, anything a consumer must do. Delete if there is nothing to
say.>

## v<x.y.z> — <date> — first tagged release

<Everything before the first tag, in a few lines, without per-version detail.
Do not backfill versions that were never tagged.>
```

## B. Several backlogs, one version

```markdown
# Changelog — <Project>

Newest first. Each version lists what it added, grouped by the backlog the
item came from; the PR has the detail.

## v<x.y.z> — <date>

### <NN> <Backlog name>

- [x] <item>. PR #<n>.

### <NN> <Backlog name>

- [x] <item>.

### Shared

- [x] <An item that belongs to no single backlog.>

<Optional closing paragraph for the whole version.>
```

- Subsections run in backlog-number order, `Shared` last.
- A backlog with nothing completed in this version gets **no** subsection.
- A shelved or archived backlog adds nothing.
- Name in every heading, so a renumbering never makes an older `### 03`
  ambiguous. Older sections are never rewritten.

## C. One file per minor series

For a repo whose single changelog has outgrown one file. Name each file for its
series, `CHANGELOG-v<x.y>.md`, and open it with a status line. The sections
below the header are A or B, unchanged.

```markdown
# Changelog — <Project> v<x.y>.x

Status: **open**, current v<x.y.z>.

Newest first. One line per completed item, carried over from the backlog; the
PR has the detail.

## v<x.y.z> — <date>

- [x] <item>. PR #<n>.
```

**Closing a series** when the minor bumps:

1. Every `- [x]` from the backlog is under the last patch's section.
2. Change the status line to
   `Status: **closed** at v<x.y.z> (<date>). Next: [CHANGELOG-v<x.y+1>.md](CHANGELOG-v<x.y+1>.md).`
3. Add a closing paragraph: what the series settled, what it left open.
4. Create `CHANGELOG-v<x.y+1>.md` with the same header, `Status: **open**`, a
   first `## v<x.y+1>.0 — <date>` section, and a link back to the closed file.
5. Reset the backlog's Completed Items to `(none)`.

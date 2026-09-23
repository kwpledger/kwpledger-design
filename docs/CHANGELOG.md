# Changelog — kwpledger-design

Newest first. Each version lists what it added, one line per item; the PR has
the detail. Format: [BACKLOG-FORMAT](BACKLOG-FORMAT.md).

Unlike the other repos, this one was tagged from its first release, so every
version below is real, not reconstructed. Dates are GitHub's release dates
(UTC). Each tag was cut by `.github/workflows/release.yml` on the merge that
bumped `package.json`.


## v0.7.0 — 2026-09-23

- [x] Chrome rule §4.4, the theme toggle, released. It settled narrower than proposed. PR #44.
- [x] `smartalarm-pro` added to the consumer roster. PR #38.
- [x] The one release path that had never run, recorded. PR #40.
- [x] Social card spec names the platforms Kevin actually uses; in-vs-about Lane 2 states observation, not ownership. PRs #42, #43.
- [x] Docs: stop asserting why a repo is private; `AGENTS.md` trimmed from 1,832 to 1,532 words. PRs #39, #41.

## v0.6.1 — 2026-09-22

- [x] `logos/` exported from the package, so consumers import the marks by path. PR #37.
- [x] Office theme colours and fonts for Word, PowerPoint and Excel. PR #36.

## v0.6.0 — 2026-09-21

- [x] The light/dark toggle capability (Option A): each dark register authored under both the guarded media query and `:root[data-theme="dark"]`, gated for drift and set-parity. SPEC §9.1. PR #35.
- [x] The four-rule length convention adopted; `AGENTS.md` length hook in warn-only mode. PRs #33, #34.

## v0.5.1 — 2026-09-11

- [x] `AGENTS.md` stops carrying a tag count, and says why it doesn't. PR #32.

## v0.5.0 — 2026-09-11

- [x] The site-line gap closed: *authorized is not acting*. PR #31.

## v0.4.0 — 2026-09-10

- [x] KWP-16 §6: the footer's identity block moves right, on every surface. PR #30.
- [x] The site-line test defined, and the tag note stopped from going stale. PRs #28, #29.

## v0.3.1 — 2026-09-09

- [x] KWP-16: the shared header and footer rule. PR #26.
- [x] Gates check completeness, and `npm test` proves the gates reject broken tokens. PR #27.
- [x] The ring settled: the ringed mark is the default, teal the unassigned case; channel ring hexes corrected. PRs #24, #25.
- [x] LinkedIn banner format, the Claude Design card bundle, and illustration and infographic refinements. PRs #17–#23.

## v0.3.0 — 2026-08-30

- [x] The reworked vector marks folded into the design system; the glyph colour is fixed and only the ring varies. PRs #13, #16.
- [x] Signature marks moved into `logos/`; the footer spec revised around them. PR #5.
- [x] Infographic spec components and the first worked examples, including letter PDFs that print clean. PRs #6, #7, #10–#12, #14, #15.
- [x] Substack and repo ownership recorded; the 2013 date taken into custody. PRs #8, #9.

## v0.2.0 — 2026-08-15

- [x] The status layer: `--success`, `--warning`, `--danger`. PR #4.
- [x] Prose normalised to American spelling. PR #3.

## v0.1.0 — 2026-08-15

- [x] The system extracted from kwpledger.com: SPEC, ported tokens, the 8-slot categorical scale, the contrast verifier, and releases tagged from CI. PRs #1, #2.

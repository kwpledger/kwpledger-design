# These things need to be done in kwpledger-design v1.0 #

Current release: **v0.7.0** (2026-09-23). Format: [BACKLOG-FORMAT](BACKLOG-FORMAT.md).

**This repo's addition to the format: open decisions only.** [SPEC.md](SPEC.md)
is the contract and [AGENTS.md](../AGENTS.md) the working agreement; this file
holds only what is not yet settled. An item earns a place by being a decision
someone has to make, not an idea someone had. SPEC §11 already says which
changes need a conversation with Kevin; this is where a specific one waits for
it. The version in the title is a milestone, not a claim about the next
number: Kevin owns `x.` and `x.y` here (AGENTS.md, "Who may move which digit").

No ID scheme yet; if the file grows past a handful of items, add one then.
Released work is in [CHANGELOG.md](CHANGELOG.md).


## To Do (consumers) ##

- [ ] **1.** The hands-on consumers take or decline **v0.7.0**, then close [#45](https://github.com/kwpledger/kwpledger-design/issues/45). *Kevin's.* v0.7.0 changed no token, font or logo, so for Base44, Substack, the fixed-canvas formats and the Office theme there's nothing to re-apply; ticking or declining their boxes is the whole job.

**Completed Items**

- [x] The three pinned consumers took v0.7.0: kwpledger-site#57, meal-planner#42, runbox-mcp#67. Each drift issue closed itself on merge. 2026-09-23.
- [x] The consumer checklist ran on a real release. `release.yml` opened #45 for v0.7.0 with all nine roster entries, the path that had never run before. 2026-09-23.


## To Do (tokens) ##

- [ ] **1.** Decide whether a recessed surface and an on-accent foreground belong in the shared system. `meal-planner` defines both locally, `--surface-sunken` and `--accent-fg`, as SPEC §10.3 permits with a stated reason. Its [upstream report](https://github.com/kwpledger/meal-planner/blob/main/docs/UPSTREAM-REPORT.md) makes the case, with derivations and contrast measurements. Adding a semantic token is a minor bump and a conversation with Kevin (SPEC §11). Meal-planner's own reasoning: any consumer with a dark theme hits the on-accent gap.

**Completed Items**

(none)


## To Do (tooling) ##

(none)

**Completed Items**

- [x] `actions/checkout` v4 → v7 in `release.yml`, part of the sweep across all four repos (kwpledger-site KWP-21). 2026-09-23, PR #46.


## To Do (specs) ##

(none)

**Completed Items**

- [x] Footer rule: an optional privacy link beneath the copyright (`header-footer-design-system.md` §6.3). 2026-09-23, PR #47.
- [x] `BACKLOG-FORMAT.md` moved here from `kwpledger-site`, as the hub for cross-repo standards; it ships in the package's `docs/`, so consumers carry their pinned copy. Kevin's call. 2026-09-23.

# These things need to be done in kwpledger-design v1.0 #

Current release: **v0.8.0** (2026-09-24). Format: [BACKLOG-FORMAT](BACKLOG-FORMAT.md).

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

(none)

**Completed Items**

- [x] Hands-on boxes on #45 (v0.7.0) and #51 (v0.8.0) ticked as acknowledged, nothing to re-apply, and both issues closed. Kevin's call. 2026-09-24.
- [x] The three pinned consumers took v0.8.0 (kwpledger-site#59, meal-planner#43, runbox-mcp#68) and now carry `BACKLOG-FORMAT.md` in `node_modules`; their format links point here. 2026-09-24.


## To Do (tokens) ##

- [ ] **1.** Decide whether a recessed surface and an on-accent foreground belong in the shared system. `meal-planner` defines both locally, `--surface-sunken` and `--accent-fg`, as SPEC §10.3 permits with a stated reason. Its [upstream report](https://github.com/kwpledger/meal-planner/blob/main/docs/UPSTREAM-REPORT.md) makes the case, with derivations and contrast measurements. Adding a semantic token is a minor bump and a conversation with Kevin (SPEC §11). Meal-planner's own reasoning: any consumer with a dark theme hits the on-accent gap.

**Completed Items**

(none)


## To Do (tooling) ##

(none)

**Completed Items**

(none)


## To Do (specs) ##

(none)

**Completed Items**

(none)

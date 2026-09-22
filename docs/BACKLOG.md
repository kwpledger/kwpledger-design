# Backlog

Open decisions for this repo. [SPEC.md](SPEC.md) is the contract and [AGENTS.md](../AGENTS.md) is the working agreement; this file holds only the things not yet settled.

**Kept short on purpose.** An item earns a place here by being a decision someone has to make, not by being an idea someone had. SPEC §11 already says which changes need a conversation — this file is where a specific pending one waits for it.

No ID scheme yet. If the file grows past a handful of items, add one then.

---

## Open

**The consumer checklist has never run.** `release.yml` gained a step on
2026-09-22 that opens an issue from the roster in [CONSUMERS.md](CONSUMERS.md)
whenever a tag is cut. It is gated on the version having no tag yet, so merging
it proved only that it correctly *skips* — the positive path cannot run until a
real bump. **Check it on the next release rather than manufacturing one**; a
version that exists to test a notification is worse than an untested
notification. What to look for: one issue titled `vX.Y.Z — consumers to
update`, carrying all nine roster entries. If the markers in CONSUMERS.md ever
go missing the step fails loudly by design rather than opening a blank issue.

Also pending, and shared with `kwpledger-site` KWP-21: `release.yml` still uses
`actions/checkout@v4`, which every run now warns is being forced onto Node 24.
Kevin wants that swept across all four repos at once, alongside a wrangler
update elsewhere.

The site-line *authorized* vs *acting* question, raised 2026-09-09, was settled on 2026-09-11 and now lives in [AGENTS.md](../AGENTS.md) as **Authorized is not acting**.

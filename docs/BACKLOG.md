# Backlog

Open decisions for this repo. [SPEC.md](SPEC.md) is the contract and [AGENTS.md](../AGENTS.md) is the working agreement; this file holds only the things not yet settled.

**Kept short on purpose.** An item earns a place here by being a decision someone has to make, not by being an idea someone had. SPEC §11 already says which changes need a conversation — this file is where a specific pending one waits for it.

No ID scheme yet. If the file grows past a handful of items, add one then.

---

## Open

### Does the site-line test need to distinguish *authorized* from *acting*?

**Raised 2026-09-09**, by a session that was a guest here.

The test in AGENTS.md is mechanical, and that is its virtue: *you are the site line if and only if `kwpledger-site` is attached to this session.* It replaced a judgement call with something checkable, and it works.

**What it does not cover:** two sessions can pass it at the same time.

That happened on 2026-09-09. One session had `design`, `site` and `runbox-mcp` attached for a header/footer change — `site` deliberately present so the session was authorized here. A second, unrelated session also had `site` attached, for work in `kwpledger-site` and `plankvoice`. Both passed the test. Both were authorized to bump a version in this repo. Neither could learn of the other from the test alone.

Nothing broke, because the second session noticed the overlap and stood down — no bump, no tag, no commit here. **But that is judgement, not the rule**, and removing the judgement call is what the test was written to do.

**The decision to make:** close the gap in writing, or leave it as a judgement call.

- **Close it** with one clause — the test says who is *authorized*, not who is *acting*, and a second authorized session defers to whichever one is already working in this repo. Cheap to write, and it makes the standing-down behaviour a rule rather than a courtesy that depends on the session noticing.
- **Leave it.** The collision needs two `site`-attached sessions running at once *and* both reaching for a version bump. Kevin knows when he has two sessions open, so this may be machinery for a case he can already see coming — and AGENTS.md carries a four-minute test of its own about what earns space.

**Kevin's call.** It changes a rule in AGENTS.md, and those are not a guest session's to edit.

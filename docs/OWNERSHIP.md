# Who may act in this repo — the reasoning

`AGENTS.md` carries the rules themselves, in the form a session needs at
handoff. This file carries why each is shaped the way it is, and what it cost to
find out. Reference, not handoff: **no length limit applies here**, so nothing
below has to be compressed.

---

## Why the site-line test is a checkable test

The rule in `AGENTS.md` is: you are the site line if and only if
`kwpledger-site` is attached to this session.

That is why `kwpledger-site` gets attached to multi-repo tasks that might touch
a version — **the authority travels with the task rather than being assumed.**
Nothing about the *repo* confers it; a repo cannot own anything. It is the line
of succession that decides when a version exists, and attaching `site` is what
puts a session in that line. Think gatekeeper rather than owner.

**Both misreadings cost something**, which is why the test is written down
rather than left to inference:

- A guest that thinks it is the site line bumps a version that was not its to bump.
- A site-line session that thinks it is a guest stalls on Kevin for a decision
  already delegated to it.

A judgement call would produce both failures intermittently. A checkable test
produces neither.

## The incident behind "authorized is not acting"

Kevin, 2026-09-11. The attachment test says who *may* act here, not who *is* —
and two sessions can pass it at once.

That happened on **2026-09-09**. One session had `site` attached for a
header/footer change in this repo. An unrelated session had `site` attached for
work in `kwpledger-site` and `plankvoice`. **Both passed the test. Neither could
learn of the other from it.**

The rule that followed: you are the acting session only if your task names a
change in *this* repo. Attachment travels with the task; it does not make every
repo in the session yours to change.

The 2026-09-09 session got this right by judgement. The paragraph in `AGENTS.md`
is what makes it a rule instead of a lucky call.

## Why the tag list is not written down anywhere

`AGENTS.md` says to run `git ls-remote --tags origin` and deliberately does not
name the tags. That omission is load-bearing, and it took three tries to learn.

- An earlier version **listed them** — and was out of date within the hour. It
  named three, and the release job cut a fourth right after it merged.
- The version after that tried to have it both ways: a count kept in
  parentheses, hedged as "already a snapshot." It went stale twice in two days.

A warning about stale claims that carries its own stale claim teaches the wrong
half, and labelling the claim a snapshot does not save it. So there is no number
to correct. Run the command.

The same defect reached another repo: until 2026-09-09, `runbox-mcp` recorded
"`kwpledger-design` has no git tags" in four places as a migration blocker. It
came from running `git tag -l` in a fresh clone, which is empty whether or not
releases exist. It blocked nothing real for a day. **A local command answers a
local question.**

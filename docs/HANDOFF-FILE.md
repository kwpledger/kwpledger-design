# What `AGENTS.md` is for, and how long it may be

`AGENTS.md` (symlinked as `CLAUDE.md`) loads into every session in this repo. It
is a handoff to the **next** session and to whatever **parallel** session is in
here right now — written for both, and short enough to be read by both.

## The four rules

Kevin set these on 2026-09-20, the same in every repo of his that carries a
handoff file.

1. **Soft limit 1,350 words.** Past it, weigh each addition, and look for what
   can be cut safely or preserved by moving it to a `docs/` reference.
2. **Hard limit 1,850 words.** Past it, decide what gets cut or moved *now*,
   not later.
3. **The four-minute rule is _a_ primary decider, not the only one.** If a
   session will not need it in the first four minutes after handoff, it is a
   high-tier candidate for preservation by move.
4. **No `docs/` file carries a word limit** — reference, not handoff, so moving
   costs nothing.

A PostToolUse hook measures the file on every write
(`.claude/hooks/agents-md-length.mjs`); it reports but cannot block.

## Two things the hook's own source records, worth repeating

**Count whitespace-separated tokens.** `wc -w` with no locale set silently
drops standalone em dashes, so on prose like this it reports roughly 2% low —
38 words low on this repo's file, measured 2026-09-22. If a count ever looks
wrong, check `locale` before doubting the hook.

**The rule exists because it was once ignored.** `runbox-mcp`'s handoff file
reached 2,621 words against the 1,850 ceiling, 59% of it a single section. A
rule nobody measures is not a rule.

## This repo is denser than the limit assumes

Trimmed from 1,832 to 1,532 words on 2026-09-22, and deliberately left above
the soft limit. What remains is the contract rules, the ownership tests that
decide whether a session may commit at all, the release mechanics, and the
guardrails. Cutting further would remove things that pass rule 3 — which is the
decider, not the count.

**So the next addition here should displace something, not append.** The
reasoning behind any rule belongs in `docs/`; only the rule itself belongs in
the handoff.

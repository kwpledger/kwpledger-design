# Consumers

Who takes these tokens, and how each one finds out a release happened.

## The problem this solves

This repo cuts releases. Consumers pin them. Until 2026-09-22 nothing connected
the two, so a consumer could sit on an old tag indefinitely and nobody would
know. It had already happened: `v0.6.1` shipped, `runbox-mcp` took it, and
`kwpledger-site` and `meal-planner` stayed on `v0.6.0` for days. Nothing broke —
that is what pinning is for — but the gap was invisible until someone opened
three files by hand.

**Nothing here updates anything.** Consumers take a pinned dependency precisely
so one bad deploy cannot restyle every property at once; automatic propagation
is the thing pinning exists to prevent. Both channels below only make sure the
merge is *offered* rather than missed. A human still merges.

## Two channels, because consumers come in two shapes

**Pinned consumers** have an npm dependency and a build, so they can answer
"am I behind?" themselves. Each one runs `.github/workflows/design-drift.yml`,
which reads its own pin, asks this repo's remote for its newest tag, and opens
one reusable issue when they disagree. Precise, and self-healing: it re-derives
the answer from scratch every run, so a missed notification corrects itself on
the next one.

**Hands-on consumers** have no dependency and no build. A Base44 app, a
Substack theme, a fixed-canvas export, a Unity project — none of them can poll
anything. For these, the list below is the entire mechanism.

That is why the roster exists even though the pinned consumers do not need it:
it is the only thing that reaches the ones that cannot check for themselves.

### Why the roster is announced from here and the pin check is not

The tidier design is one check in this repo that reads every consumer's pinned
version. It does not work. **This repo is public and several of its consumers
are private**, so a check running here would need a cross-repo credential
stored in a public repo's Actions secrets just to read a pin. A consumer
reaching out to a public remote needs no credential at all. The asymmetry is
structural, so the pin check lives in the consumer and only the announcement
lives here.

The announcement is worth having here anyway, for a reason the polls cannot
cover: `release.yml` is push-triggered, and GitHub disables *scheduled*
workflows in a repo idle for 60 days. A poll that has been disabled reports
exactly what a poll finding nothing reports — silence. A release announcement
cannot go quiet, because a release is activity by definition.

## The roster

`release.yml` copies everything between the two markers into an issue each time
a version is tagged. Edit the list here; the issue follows.

<!-- consumers:start -->
### Pinned — these also check themselves

- [ ] **`kwpledger-site`** — kwpledger.com. Imports `fonts.css` + `base.css`.
      Reference implementation for the shared header/footer rule.
- [ ] **`meal-planner`** — Tailwind v4, bridges the tokens through `@theme`.
      Its `@custom-variant dark` names both dark selectors and will need
      revisiting if those ever change.
- [ ] **`runbox-mcp`** — Cloudflare Worker landing page. Imports `base.css` as
      text and the woff2/SVG binaries **by path**, so a release that renames one
      breaks its build rather than falling back silently. Declares its own
      `@font-face` against content-hashed URLs; see SPEC §9.

### Hands-on — nothing reaches these but this list

- [ ] **Base44 apps** — `tapdodge`, `plankvoice`. Values are pasted, not
      imported. A token change means editing each app by hand.
- [ ] **Substack** — theme colors set in the publication settings UI.
- [ ] **Fixed-canvas formats** — the infographic (1080×1350), quote post
      (1400×1000) and LinkedIn banner specs in `docs/`. Re-export affected
      artwork; the specs themselves may need their hex values regenerated.
- [ ] **`office-theme.md`** — Kevin's Microsoft 365 theme. Documented here,
      consumed by hand, nothing depends on it.
- [ ] **Unity** — not built yet. Listed so it is not forgotten when it is.
<!-- consumers:end -->

## Adding a consumer

If it has an npm dependency and a build, give it a copy of
`.github/workflows/design-drift.yml` from any of the three pinned consumers —
it is identical in all of them and needs no configuration — then add it above.
If it does not, add it to the hands-on list and accept that a human is the
transport.

**Do not name a private repo here that is not already named elsewhere in this
repo.** This one is public.

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

It also opens one PR adding a single open item to the consumer's
`docs/BACKLOG.md`, at the end of `## To Do (design) ##`, because sessions read
the backlog and not Issues (Kevin, 2026-10-20: two consumers sat at v0.8.0
behind an open issue the backlog never mentioned). It needs the repo's Actions
setting "Allow GitHub Actions to create and approve pull requests". It edits
the backlog only; taking the release stays a human's PR.

**Hands-on consumers** have no dependency and no build. A Substack theme, a
fixed-canvas export, a Unity project, a Base44 app that has not pinned the
package yet — none of them can poll anything. For these, the list below is the entire mechanism.

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
- [ ] **`plankvoice`** — a Base44 app, pinned since 2026-10-22: the first
      Base44 consumer to take the package. Vite + Tailwind 3 on the shadcn
      template: `src/index.css` imports `base.css`, `categorical.css` and
      `status.css` and maps the template's variable names onto the semantic
      layer; `tailwind.config.js` reads them through `color-mix` so opacity
      modifiers survive non-HSL values; next-themes sets `data-theme` as well
      as `.dark`. Bundles Lora and Hanken from the package by relative path,
      so a release that renames a font file breaks its build. Its
      `docs/DESIGN-SYSTEM.md` holds the mapping and the Base44-specific traps.

### Hands-on — nothing reaches these but this list

- [ ] **Base44 apps** — `tapdodge`. Values are pasted, not imported. A token
      change means editing each app by hand. A Base44 app *can* pin the
      package (it has a `package.json`, and Base44 runs `npm install`); one
      that does moves to *Pinned* (see *Adding a consumer*), as `plankvoice`
      did.
- [ ] **`smartalarm-pro`** — a Base44 app, not consuming these tokens yet.
      Listed on Kevin's say-so (2026-09-22) so it is not forgotten when it
      does. Nothing to do for it until then.
- [ ] **Substack** — theme colors set in the publication settings UI.
- [ ] **Fixed-canvas formats** — the infographic (1080×1350), quote post
      (1400×1000) and LinkedIn banner specs in `docs/`. Re-export affected
      artwork; the specs themselves may need their hex values regenerated.
- [ ] **`office-theme.md`** — Kevin's Microsoft 365 theme. Documented here,
      consumed by hand, nothing depends on it.
- [ ] **Unity** — not built yet. Listed so it is not forgotten when it is.
<!-- consumers:end -->

## Adding a consumer

If it has an npm dependency and a build, it joins the pinned channel, in the
same PR that adds the dependency (Kevin, 2026-10-20):

1. Copy `.github/workflows/design-drift.yml` from any of the pinned
   consumers — it is identical in all of them and needs no configuration.
   Copy it from a consumer's `main`, not a local checkout, which can be stale.
2. Make sure it has a `docs/BACKLOG.md` in the [BACKLOG-FORMAT](BACKLOG-FORMAT.md)
   shape. The workflow writes its line there and fails without the file.
   `## To Do (design) ##` is optional; it is created if missing.
3. Turn on Settings → Actions → General → "Allow GitHub Actions to create and
   approve pull requests", or the backlog PR fails (loudly — the issue still
   opens).
4. Move it into *Pinned* above.

If it does not, add it to the hands-on list and accept that a human is the
transport. **A hands-on consumer that later takes the package moves**: a Base44
app or a game such as `tapdodge` that gains a `package.json` pinning this repo
gets the four steps above at that point, not "eventually".

**For a Base44 app specifically,** two things learned on `plankvoice`
(2026-10-22). Bundle the fonts from the package with `@font-face` rules: Base44's
workspace font upload refuses family names that are already Google Fonts, which
Lora and Hanken Grotesk both are. And a Base44 sync can flatten a `CLAUDE.md`
symlink into a copy, which breaks Base44's own preview build; check it after
creating a branch. Details in that repo's `docs/DESIGN-SYSTEM.md`.

**Do not name a private repo here that isn't already named elsewhere in this
repo unless Kevin says to do so** (his wording, 2026-09-22). This repo is
public. If the name already appears elsewhere here, listing it is not a new
disclosure. Otherwise ask, and note that you did — `smartalarm-pro` above is
the worked example.

**Do not infer *why* a repo is private.** The reason differs per repo and
changes over time. Some are private only because they are unfinished and so
not published yet — `meal-planner` was one of those until it went public.
Others are private because they are intended as products, where it genuinely
is confidentiality. Both kinds are on the roster above, so a rule that assumed
either reason would be wrong about half of them. Ask; do not guess, and do not
write your guess down here.

A consumer being private is not a reason to leave it off the roster — only a
reason to ask before naming it. Leaving one off defeats the point, since the
roster is the only channel that reaches the consumers that cannot check for
themselves.

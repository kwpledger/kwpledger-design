# consumers/claude-design-system/

The producer for **kwpledger design**, the Design System artifact on claude.ai
that Claude sessions read when they design anything kwp. A **hands-on
consumer**: it takes a release when Kevin says so, like every other consumer,
and nothing here pushes anything to it.

```bash
node consumers/claude-design-system/build.mjs --out /tmp/kwp-ds
```

That writes the artifact's files to `/tmp/kwp-ds/project/` and a
`/tmp/kwp-ds/sync.json` naming the version, the commit and anything the build
could not place. It reads the checked-out commit and writes only under
`--out`. Zero dependencies, Node `>=22.12.0`.

## What is derived and what is written by hand

| artifact path | from |
| :-- | :-- |
| `tokens.json`, `tokens.css` | `tokens/base.css`, `categorical.css`, `status.css`, `fonts.css`, read, not copied |
| `components/bundle.css` | the `--step-*` scale from `base.css` and the chrome from `design-system/_lib/card.css` |
| `components/<Card>/preview.html` | the cards in `design-system/`, image paths re-pointed |
| `fonts/`, `assets/Logos/`, `assets/Wordmarks/`, `assets/Examples/`, `docs/`, `tokens/` | copied byte for byte |
| `assets/Office/` | `office/theme-colors/*.xml`, `office/theme-fonts/*.xml`, `office/swiss-deck/*.potx`, byte for byte (each template inside a one-file `.zip`, which the artifact can store and a `.potx` it cannot); the deck's npm package and build scripts stay out |
| `README.md`, `components/*/README.md`, `components/Cover/preview.html`, `assets/*/README.md` | `source/`, hand-written |
| token usage notes | `source/usage.json` |

**The build stops** when the token CSS declares something it has no place
for: a token in `base.css` with no entry in `source/usage.json`, an entry for
a token that is gone, a status meaning other than danger, warning and success,
or a categorical slot missing a theme. A new token must not miss the artifact
silently. `npm test` proves each of those stops it
(`test/claude-design-system.test.mjs`). A new card in `design-system/` or a new
doc in `docs/` does not stop it; it is listed under `notes` in `sync.json`, to
be added to `CARDS`/`SPECIMENS` or `DOCS`/`DOCS_LEFT_OUT` in `build.mjs`.

## Taking a release (for the Claude session doing it)

Kevin asks: "take vX.Y.Z into the design system." The artifact's
`project/tokens.json` `meta.ref` names the version it holds now.

1. Clone this repo at the new tag and build it to `new/`. Check out the tag in
   `meta.ref` and build that to `old/`.
2. Read the artifact's files as the Design System type's `SKILL.md` says
   (its index and each file you will change). People edit the artifact on
   its page, so the artifact can differ from `old/`.
3. For each file in `new/project/`:
   - same as `old/` → unchanged by the release: skip it;
   - the artifact's copy is the same as `old/` → nobody edited it: send `new/`'s;
   - the artifact's copy differs from `old/` → someone edited it on the page:
     keep theirs, and list it for Kevin with what the release changed in it.
     `tokens.json` is merged instead: take the new values, keep usage notes
     edited on the page.
4. A file in `old/` and not in `new/` is gone from the repo. Ask before
   removing it, and move it aside rather than deleting it (the type's
   `craft.md`, "Move aside").
5. Publish only the changed files. A `.zip` under `assets/Office/` cannot be
   served as a file: upload it with the artifact's asset upload and record it
   in the index's `assetGroups.Office.files`. Then publish the index last, as the type's
   `SKILL.md` says, with `lastChange.via` = `GitHub · kwpledger/kwpledger-design@<sha>`.
6. Tick the design system's box on the release issue. Report what changed,
   what was kept and what `sync.json` noted.

Prose changes go in `source/` here, through a PR, so the next build carries
them. An edit made only on the page survives step 3, but the repo does not
know about it.

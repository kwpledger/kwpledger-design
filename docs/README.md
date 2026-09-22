# docs/

Reference for `kwpledger-design`. None of these carry a word limit — see
[HANDOFF-FILE.md](HANDOFF-FILE.md) for why that matters.

`AGENTS.md` in the repo root is the handoff; **[SPEC.md](SPEC.md) is the
contract**, and it wins over anything written here or there.

## The system itself

| file | what it holds |
| :-- | :-- |
| [SPEC.md](SPEC.md) | The contract — naming, layering, the categorical scale, the contrast gates, and the reasoning behind each. Read before changing any value. |
| [PALETTE.md](PALETTE.md) | Every value as hex, for consumers that cannot take a dependency. |
| [logo-usage.md](logo-usage.md) | How the signature marks may be placed. `logos/PROVENANCE.md` is the authority on the artwork itself. |

## Consumer-facing specs

| file | what it holds |
| :-- | :-- |
| [header-footer-design-system.md](header-footer-design-system.md) | The shared chrome rule (KWP-16) — binds every surface. |
| [theme-toggle-capability.md](theme-toggle-capability.md) | The light/dark toggle contract, and why each dark register is authored twice. |
| [infographic-design-system.md](infographic-design-system.md) | The 1080×1350 infographic format — a layer-3 consumer. |
| [quote-post-design-system.md](quote-post-design-system.md) | The 1400×1000 (7:5) quote-card format — a layer-3 consumer. |
| [linkedin-banner-design-system.md](linkedin-banner-design-system.md) | The banner format. |
| [office-theme.md](office-theme.md) | Kevin's Microsoft 365 theme. Consumed by hand; nothing depends on it. |
| [illustration-brief-desire-path.md](illustration-brief-desire-path.md) | A single illustration brief. |

## How this repo is run

| file | what it holds |
| :-- | :-- |
| [CONSUMERS.md](CONSUMERS.md) | Who takes these tokens and how each one learns a release happened. |
| [OWNERSHIP.md](OWNERSHIP.md) | Why the site-line test is checkable, the incident behind *authorized is not acting*, and why no tag number is written down. |
| [HANDOFF-FILE.md](HANDOFF-FILE.md) | What `AGENTS.md` is for and its word budget. |
| [BACKLOG.md](BACKLOG.md) | Open decisions. Kept short on purpose. |

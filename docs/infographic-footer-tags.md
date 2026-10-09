# Infographic footer tags

The line of text beside the signature mark in an infographic footer ([infographic spec §5.8](infographic-design-system.md)). One per graphic, taken from this list.

**Why a list.** One fixed tag would state one slice of Kevin's work as if it were all of it. A tag written fresh for each graphic would let every build make a small decision about his professional identity, and those drift. A list keeps variation inside the brand: each tag is chosen once, deliberately, and then reused, so a series keeps recognizing itself (§1.1 move 9).

**This list is Kevin's.** A graphic whose content area has no tag yet does not get an invented one. Propose one to Kevin, and add it here once he approves it. The same applies to renaming a tag.

---

## Shape

```
SURFACE        where it is published, when that is not the parent brand
TOPIC          the content area
```

- **Parent-brand graphics** (LinkedIn, kwpledger.com) carry the **topic alone**. The long mark already reads `kwpledger`, so naming the surface would say the name twice.
- **Graphics made for a named surface** (a YouTube channel, the Substack) carry the **surface, then the topic, on two lines**. Break the lines yourself; do not let them wrap. The longest current tag measures 743px on one line against roughly 770px of room, so a slightly longer topic would wrap at an arbitrary word. The two lines also keep surface and topic legible as two things.
- On one line, which only happens when you are quoting a tag in prose, the separator is ` • ` (U+2022, spaced).
- Set per §5.8: step--1 (19px), weight 600, uppercase, `0.10em` tracking, `--fg-muted`, right-aligned. Measured: two lines are 49px tall against the 110px mark, and the footer stays 131px.
- **Author tags in normal case and let CSS uppercase them.** For the same reason, never put `kwp` in a tag: it would render as `KWP`.
- A tag counts toward the footer's ≤ 8 words (§7.4), and toward the canvas total.

## Surfaces

| Surface | Where | Its tags live under |
| :-- | :-- | :-- |
| *(parent — omitted)* | LinkedIn, kwpledger.com | Parent |
| Kevin Pledger Learning Systems | YouTube | KPLS |
| Mr. Pledger Stays After School | YouTube | MPSAS |
| AI at the Point of Work | Substack | Substack |

The Substack has no tags yet. Its name is itself a topic line, so whether its graphics carry `AI at the Point of Work` alone or with a topic is Kevin's call when the first one is made.

## Tags

| ID | Surface line | Topic line | Words | Used by |
| :-- | :-- | :-- | :-- | :-- |
| `parent-regulated` | — | AI implementation in regulated environments | 5 | `four-principles`, `in-vs-about`, `little-ai-big-ai`, `policy-to-practice`, `policy-to-practice-loop` |
| `parent-organizations` | — | AI implementation in organizations | 4 | `policy-to-practice-loop-organizations` |
| `kpls-ai-ld` | Kevin Pledger Learning Systems | AI in learning & development | 8 | — |
| `mpsas-statistics` | Mr. Pledger Stays After School | Statistics | 6 | — |

**IDs** are how a graphic files itself. Its README records the tag's ID, and the *Used by* column lists every published graphic that carries it, so that the tags can be grouped and searched.

**Word counts** follow the spec's counting: `&` and `•` are not words.

## Markup

```html
<!-- parent: topic only -->
<span class="who">AI implementation in regulated environments</span>

<!-- named surface: two lines, surface first -->
<span class="who"><span class="surface">Kevin Pledger Learning Systems</span>AI in learning &amp; development</span>
```

```css
footer .who{color:var(--fg-muted); font-size:var(--step--1); font-weight:600;
            letter-spacing:.10em; text-transform:uppercase;
            text-align:right; line-height:1.3;}
footer .who .surface{display:block;}
```

## Not decided here

**Ring color per surface.** The ring encodes which aspect of Kevin's work a graphic belongs to, and every aspect has one as of 2026-10-09 ([logo-usage.md](logo-usage.md) §4). A graphic takes its aspect's ring, and teal when it has none. The tag and the ring are separate choices: the tag names the surface where the graphic is posted, and the ring names the aspect it belongs to. A KPLS graphic on LinkedIn takes the LinkedIn tag and the KPLS ring.

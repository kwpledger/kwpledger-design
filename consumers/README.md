# consumers/

Ready-to-paste files for tools that cannot take this package as a dependency.
Each one is a **hands-on consumer** (see [docs/CONSUMERS.md](../docs/CONSUMERS.md)):
values are copied in as literals, so a token change reaches them only when
someone edits the file by hand. Each file's header names the tokens it copies.

| file | for | how to use it |
| :-- | :-- | :-- |
| [markdown-viewer.css](markdown-viewer.css) | [markdownviewer.org](https://markdownviewer.org): printing Markdown in kwp type and color | Style → Custom CSS → upload `.css`, then save it as a template. Light register only. Fonts come from Google Fonts via `@import`. |

These files are not part of the package's `files` list. They are copied by
hand, not installed.

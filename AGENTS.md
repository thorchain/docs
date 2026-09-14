# Agent instructions (this repository)

This file is for **coding agents editing this checkout**. It is not visitor documentation and must stay out of `SUMMARY.md`.

Live site: [docs.thorchain.org](https://docs.thorchain.org) (GitBook). Source: GitHub `thorchain/docs` on `master`.

## What this repo is

User-facing THORChain docs. Git Sync maps the repo root to a single GitBook space (`gitbook-docs.yaml`). Navigation is `SUMMARY.md`. Images live in `.gitbook/assets/`.

A **different** site, [dev.thorchain.org](https://dev.thorchain.org), is implementation docs (mdBook in `thorchain/thornode`). Cross-link with published URLs. Do not copy API/memo/ADR pages into this GitBook.

## GitBook syntax

This is GitBook markdown, not mdBook and not Docsify.

| Need           | Use                                                                          |
| -------------- | ---------------------------------------------------------------------------- |
| Callout        | `{% hint style="info" %}` … `{% endhint %}` (`warning`, `danger`, `success`) |
| Page meta      | YAML `description:` frontmatter                                              |
| Internal links | Relative `.md` paths                                                         |
| Math           | `$$…$$`                                                                      |
| TOC            | `SUMMARY.md` (emoji-prefixed front-door entries)                             |

Do not use mdBook `admonish` fences. They will not render.

Match neighbouring pages. Change what is wrong or missing; do not rewrite for style. Do not add templated “Next Steps” / “Learn more” blocks on every front-door page.

GitBook block reference: [GitBook skills](https://github.com/GitbookIO/gitbook-skills).

## Audience

User docs: concepts, journeys, economics, ecosystem, node-operator how-tos.

Dev docs (`dev.thorchain.org`): handlers, endpoints, memos, ADRs, SDKs.

Savers and Lending are deprecated — only under `archived/`. Do not present IBC as enabled here.

## How to edit

1. Read the existing page and a neighbour before changing anything.
2. Fact-check protocol claims against `thorchain/thornode` source or a live read endpoint. Distinguish confirmed behaviour from inference.
3. If you add a page, add it to `SUMMARY.md`. Do not leave orphans.
4. Public API examples: Liquify THORNode / Midgard, not `*.thorchain.info`.
5. RUNE max supply is ~360M (ADR-023), not 500M / 425M.
6. Lint changed markdown only:

```bash
trunk fmt path/to/file.md
trunk check path/to/file.md
```

Do not run `make lint` for docs-only work. Do not run `trunk check --all` as a merge bar (pre-existing noise).

## Do not commit

- `llms.txt` / `llms-full.txt` — GitBook generates these on the live origin
- Leftover Docsify `index.html` and `.nojekyll`
- Local notes under `.claude/` (including `HANDOVER.md`)
- `git add .`

## Published site (readers / other agents)

GitBook already publishes discovery. Do not re-create it in git.

- [llms.txt](https://docs.thorchain.org/llms.txt)
- [llms-full.txt](https://docs.thorchain.org/llms-full.txt)
- Any page as markdown: append `.md`
- MCP: `https://docs.thorchain.org/~gitbook/mcp`

A Cloudflare Worker currently also serves `/AGENTS.md` and `/auth.md` (exact paths). That Worker file is **visitor** copy for the website. This root `AGENTS.md` is **editor** copy for the repo. Do not merge the two.

## Writing docs in depth

For long-form documentation work (code tracing, ADRs, mdBook vs GitBook), use the maintainer skill:

`thorchain/thornode/.claude/skills/thorchain-docs/` (`SKILL.md` + `reference.md`)

Default skill scope is thornode unless the user is working on this GitBook repo.

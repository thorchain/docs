# Agent instructions (this repository)

This file is for **coding agents editing this checkout**. It is not visitor documentation and must stay out of `SUMMARY.md`.

## Repository overview

This is the documentation repository for THORChain, structured as a GitBook project. The documentation covers a cross-chain liquidity protocol built on the Cosmos SDK that enables native asset swaps across blockchains without wrapped tokens.

Live: [docs.thorchain.org](https://docs.thorchain.org). Source: GitHub `thorchain/docs` on `master`. Git Sync maps the repo root to one GitBook space (`gitbook-docs.yaml`, `key: thorchain-docs`). Do not rotate that key.

Navigation is `SUMMARY.md`. Images live in `.gitbook/assets/`.

`docs-simplified` / branch `implement-simplified-documentation` is historical. Edit this repo on `master`.

A **different** site, [dev.thorchain.org](https://dev.thorchain.org), is implementation docs (mdBook in `thorchain/thornode`). Cross-link with published URLs. Do not copy API/memo/ADR pages into this GitBook.

### Major documentation sections

1. **Simplified front door** (root) - What is THORChain, swaps, how-to-use, app layer, liquidity, security/governance, tokenomics, ecosystem
2. **Technical Deep Dive** (`technical-deep-dive/`) - Protocol innovations, economic model, security, governance, fees, THORName
3. **THORChain Finance** (`thorchain-finance/`) - CLPs, trade/secured assets, TOR, RUNEPool, synthetics
4. **Understanding THORChain** (`understanding-thorchain/`) - User roles, RUNE
5. **Technology** (`technology/`) - Bifrost/TSS, Midgard, Cosmos SDK, CosmWasm (user-level)
6. **THORNodes** (`thornodes/`) - Node operator guides
7. **FAQ** (`frequently-asked-questions/`) / **Archived** (`archived/`) - Savers, Lending

GitBook publishes `##` headings in `SUMMARY.md` as URL prefixes: Technical Documentation → `/technical-documentation/…`, THORNodes (including FAQ and Archived as currently nested) → `/thornodes/…`. Git-relative URLs like `/technical-deep-dive.md` may 200 with GitBook “Page Not Found” markdown; check [llms.txt](https://docs.thorchain.org/llms.txt).

### Core protocol concepts

- **Cross-chain Liquidity Pools (CLPs)** - AMM mechanism with slip-based fees for native asset swaps
- **Threshold Signature Schemes (TSS)** - Distributed key management for cross-chain custody
- **Bifrost Protocol** - Chain-agnostic bridge supporting UTXO, EVM, BFT, and Cryptonote chains
- **RUNE** - Native settlement token with 4 roles: Liquidity, Security, Governance, Incentives
- **Incentive Pendulum** - Economic model maintaining bond:stake ratio for protocol security
- **RUNEPool** - Pooled liquidity provision mechanism for smaller providers
- **Streaming Swaps** - TWAP-style mechanism for price optimization on large trades
- **Swap Queue** - MEV protection through ordered execution

## Documentation workflow

Changes should focus on:

- Content accuracy and clarity
- Proper markdown formatting compatible with GitBook
- Maintaining the hierarchical structure defined in `SUMMARY.md`
- Cross-references using relative links between documentation pages
- Keeping technical explanations accessible to different user personas
- Mathematical formulas in LaTeX format for financial mechanisms

GitBook syntax (not mdBook): `{% hint style="info" %}` … `{% endhint %}` — not `admonish` fences. Match neighbouring pages; do not rewrite for style. Do not add templated “Next Steps” on every front-door page.

## GitBook syntax

This is GitBook markdown, not mdBook and not Docsify.

| Need           | Use                                                                          |
| -------------- | ---------------------------------------------------------------------------- |
| Callout        | `{% hint style="info" %}` … `{% endhint %}` (`warning`, `danger`, `success`) |
| Page meta      | YAML `description:` frontmatter                                              |
| Internal links | Relative `.md` paths                                                         |
| Math           | `$$…$$`                                                                      |
| TOC            | `SUMMARY.md` (emoji-prefixed front-door entries)                             |


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
- `git add .`

## Published site (readers / other agents)

GitBook already publishes discovery. Do not re-create it in git.

- [llms.txt](https://docs.thorchain.org/llms.txt)
- [llms-full.txt](https://docs.thorchain.org/llms-full.txt)
- Any page as markdown: append `.md`
- MCP: `https://docs.thorchain.org/~gitbook/mcp`

A Cloudflare Worker currently also serves `/AGENTS.md` and `/auth.md` (exact paths). That Worker file is **visitor** copy for the website. This root `AGENTS.md` is **editor** copy for the repo. Do not merge the two.

# THORChain Documentation Agent Instructions

## Purpose

Use this site to research THORChain concepts, node operations, integrations, and public API behavior.

## Source priority

Prefer evidence in this order:

1. Current live network responses.
2. Current official THORChain documentation.
3. Current THORChain source code and release notes.
4. Third-party gateway behavior.
5. Assumptions.

State clearly when information is historical, deprecated, inferred, or unverified.

## Safe behavior

- Default to read-only requests.
- Never request, store, reveal, or transmit seed phrases, mnemonics, private keys, or signing secrets.
- Never sign or broadcast a transaction without explicit user approval.
- Before presenting a transaction for signature, show the network, asset, destination, memo, amount, fees, expiry, and expected effect.
- Treat public gateway responses as observations, not as a guarantee of future state.
- Identify deprecated features and do not recommend them as current functionality.

## Retrieval

- Request any documentation page with `Accept: text/markdown` when Markdown is preferred.
- Start broad research with `https://docs.thorchain.org/llms.txt`.
- Use `https://docs.thorchain.org/llms-full.txt` only when the larger corpus is necessary.
- Use the read-only MCP endpoint at `https://docs.thorchain.org/~gitbook/mcp` for documentation queries.

## Answer quality

- Cite the exact documentation page used.
- Separate protocol rules from wallet, interface, or infrastructure-provider behavior.
- Include the observation time when reporting live network state.
- If sources conflict, show the conflict instead of silently choosing one.

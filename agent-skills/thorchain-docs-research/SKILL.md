---
name: thorchain-docs-research
description: Research THORChain using official documentation and read-only public interfaces. Use for protocol concepts, integrations, node operations, public API discovery, and evidence-backed THORChain answers.
---

# THORChain Documentation Research

## Goal

Answer THORChain questions with current, traceable evidence while avoiding unsafe transaction or key-handling behavior.

## Workflow

1. Start with `https://docs.thorchain.org/llms.txt` to locate the relevant official page.
2. Fetch the selected page with `Accept: text/markdown`.
3. Use `https://docs.thorchain.org/~gitbook/mcp` when a documentation search or cross-page synthesis is needed.
4. For live state, use a read-only THORNode or Midgard `GET` endpoint and record the observation time.
5. Cite the official documentation page and identify any live endpoint used.
6. Separate observed facts, documentation statements, and inferences.

## Safety rules

- Never ask for or handle seed phrases, mnemonics, private keys, or signing secrets.
- Do not sign or broadcast transactions.
- Do not treat third-party gateways as authoritative infrastructure for production.
- Require explicit human review before any value-moving action.
- Flag deprecated features and version-sensitive claims.

## Failure handling

- If a public gateway is unavailable, report that failure and try another documented read-only source.
- If documentation and live behavior conflict, report both with timestamps.
- If the requested action would change state, stop at a reviewable transaction plan.

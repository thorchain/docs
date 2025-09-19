---
description: CosmWasm smart contracts on THORChain (App Layer overview)
---

# CosmWasm (App Layer)

THORChain now supports **CosmWasm smart contracts** directly on the base chain. This is called the **App Layer** and was introduced with SDK V50 (V3.0). Contracts are written in WebAssembly (Wasm), most commonly using [Rust](https://www.rust-lang.org/).

## How it works

- CosmWasm runs inside THORNode through the `x/wasm` module.
- Contracts are **permissioned**: only approved code and deployers can be whitelisted for mainnet.
- All contracts are tested on **stagenet** before release.
- Nodes can pause contracts or the entire app layer if needed (via Mimir).

## Supported assets

- **Native RUNE and L1 assets** (BTC, ETH, ATOM, etc.) can be used.
- **Secured Assets** (e.g. `btc-btc`) are wrapped forms of L1s managed in THORChain’s state.
- **TokenFactory assets** (“X assets”) can be created by contracts.

> Trade assets (deposit slips) are not supported as contract-moved tokens.

## Security model

The App Layer is **sandboxed** from the base layer:

- Contracts have no special privileges beyond a normal THOR address.
- They can send, swap, or call other contracts, but cannot touch vault logic.
- If an app fails, the base chain remains secure.

## Why it matters

- Developers can build DeFi apps directly on THORChain (orderbooks, perps, stablecoins, lending, etc.).
- Apps can share fees with THORNodes to pay for the security they use.
- Users interact with apps natively from L1 wallets — no wrapping or bridges.

## Learn more

- [THORChain Developer Documentation](https://dev.thorchain.org/)
- [CosmWasm Documentation](https://docs.cosmwasm.com/docs/)
- ADR-020: App Layer (full design and security details)

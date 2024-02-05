---
description: THORChain, THORNodes, Wallets and the ecosystem.
---

# Introduction

## About

THORChain is a decentralised cross-chain liquidity protocol that utilises the Tendermint consensus engine, Cosmos-SDK state machine, and GG20 Threshold Signature Scheme (TSS). It operates as an independent Layer 1 cross-chain decentralised exchange (DEX) built on the Cosmos SDK.

THORChain allows users to swap native assets across multiple chains without the need for wrapped or pegged assets. It ensures transparent and fair prices without relying on centralised third parties. The protocol features continuous liquidity pools that maximise efficiency. It does not peg or wrap assets, it manages funds directly in on-chain vaults, and secures those funds using economic security. It could be described as a "cross-chain automated market maker (AMM), like Uniswap".

## THORChain Finance

Building on the foundation of liquidity pools, THORChain pursues three important financial primitives:

1. Allow a user to **Swap** {_Asset X on Chain A_}, to {_Asset Y on Chain B_}.
2. Allow a user to **Save** {_Asset X on Chain A_}.
3. Allow a user to **Lend** {_Asset X on Chain A_}, to **Borrow** {_Asset Y on Chain B_}.

## Developers

Developers can create innovative products that integrate with THORChain, including wallets, exchanges, and various services, and monetise their efforts via affiliate fees. Developers can earn up to 10% in affiliate fees for swaps and liquidity additions, which encompass savers deposits. Developers only need to focus on creating engaging front-end interfaces and attracting users.

See the [Dedicated Developer Documentation](https://dev.thorchain.org/)and quick start guides for [Swapping](https://dev.thorchain.org/swap-guide/quickstart-guide.html) and [Savers](https://dev.thorchain.org/saving-guide/quickstart-guide.html).

## Innovations

There a numerous innovations in the THORChain Protocol that were built with first principles to be decentralised, resistant to capture and as sustainable as possible:

1. **Capped Proof Of Bond** validator selection keeps the network decentralised and Nakamoto Coefficient high.
2. **3-Day Validator Churning** stops validator stagnation, proves spendability of funds and upgrades the network with minimal governance.
3. **Asynchronous Network Upgrades** allows validators to upgrade to a new protocol version in their own time, with the network upgrading without ever breaking consensus.
4. **Chain-agnostic Bifrost Protocol** handles UTXO, EVM, BFT and Cryptonote chain connections with minimal core-logic nuances.
5. **Incentive Pendulum** streams rewards to Validators and Liquidity Providers to target a Network Security ratio that always keeps funds secured.
6. **Continuous Liquidity Pools** that allows single-sided liquidity provision and uses liquidity-sensitive fees to resist price attacks.
7. **Swap Queue** that orders swaps based on price impact in each block, which stops sandwich attacks and most other forms of Miner Extractable Value (MEV).
8. **Liquidity Synths** to enable fast low-fee swaps across L1 pools and power single-sided Savers. Synths are a hybrid collaterised-pegged asset design that contribute to liquidity.
9. **Derived Asset Collateral** to enable L1 lending, using the RUNE asset to underwrite the liability. This enables no interest, no liquidation, no expiry loans.

## 3-Pillars of THORChain: Security, Liquidity, Volume

THORChain contributors work towards three goals:

1. Improve the **Security** of the network, via either **Functional** (Solvency Checker, Node Pause, TxOut Throttler), **Procedural** (THORSec, Stagenet testing, PR reviews) or **Economic** (RUNE in the bond, or value of the $RUNE in the bond) Security.
2. Improve the **Liquidity** of the network, via Total Value Locked (TVL), or better UX around providing liquidity (Savers).
3. Improve the **Volume** of the network, via Swap UX (Synths, Order Books), or wallet Integrations (Quotes Endpoint, Dev UX, Business Development)

You can learn how THORChain works here:

{% content-ref url="how-it-works/" %}
[how-it-works](how-it-works/)
{% endcontent-ref %}

## THORNodes

THORNodes service the THORChain network, of which there is intended to be initially 100, but can scale to 250+. The design goal of THORChain is such that anyone can join the network with the required funds (permissionless) and be anonymous, yet still be secure. THORChain takes this a step further by having a high churn schedule, kicking out nodes continuously. This high-churn network ensures that it is censorship-resistant, evades capture and resists centralisation.

Each THORNode is comprised of several independent servers in a cluster, which run full-nodes for each connected chain.

{% content-ref url="understanding-thorchain/roles/node-operators.md" %}
[node-operators.md](understanding-thorchain/roles/node-operators.md)
{% endcontent-ref %}

## CONTRIBUTING

THORChain is a public project. If you want to join the community or work on THORChain Core join the [Dev Discord](https://discord.gg/kvZhpEtHAw).

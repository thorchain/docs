---
description: THORChain, THORNodes, Wallets and the ecosystem.
---

# Introduction

## About

THORChain is an independent, cross-chain liquidity protocol that operates as a Layer 1 decentralised exchange (DEX). Built on the [Cosmos SDK](https://docs.cosmos.network/v0.52/learn/intro/overview), it utilizes the Tendermint consensus engine, the Cosmos-SDK state machine, and the GG20 Threshold Signature Scheme (TSS) to execute its purpose, which is to allow users to swap native assets across multiple chains with zero reliance on centralised third parties. In doing so, it stands as one of the few exchanges that verifiably ensures transparent and fair prices for cross-chain swaps of native assets.

THORChain's design renders no need for wrapped or pegged assets. Instead, the protocol deploys what are called continuous liquidity pools (CLPs), which—with highly complex algorithms—maximise the efficiency of its transactions. These CLPs allow for THORchain to manage funds directly in on-chain vaults, and it secures those funds via an economic security model. For all this, THORChain might be best described as a "cross-chain automated market maker (AMM), like Uniswap", or even a "decentralised Binance".

## THORChain Finance

Building on the foundation of liquidity pools, THORChain pursues two important financial primitives:

1. Allow a user to [**Swap**](thorchain-finance/continuous-liquidity-pools.md) {_Asset X on Chain A_}, to {_Asset Y on Chain B_}.
2. Allow a user to [**Pool**](thorchain-finance/runepool.md) RUNE across liquidity pools,

## Developers

Developers can create innovative products that integrate with THORChain, including wallets, exchanges, and various services, monetising these efforts via [affiliate fees](https://dev.thorchain.org/concepts/fees.html?highlight=aff#affiliate-fee) (e.g., up to 10% in affiliate fees for swaps and liquidity additions). All that is needed is a focus on creating engaging front-end interfaces and attracting users.

Developers interested in integrating THORChain should read the [Dedicated Developer Documentation](https://dev.thorchain.org/), as well as the quick start guide for [Swapping](https://dev.thorchain.org/swap-guide/quickstart-guide.html).

## Innovations

&#x20;All created with the first principles of being decentralized, resistant to capture, as sustainable as possible, there are many novel innovations embedded within the THORChain Protocol:

1. **Capped Proof Of Bond**: Validator selection keeps the network decentralised and [Nakamoto Coefficient](https://nakaflow.io/) high
2. **3-Day Validator Churning**: eliminates validator stagnation, proves spendability of funds, and upgrades the network—all with minimal governance
3. **Asynchronous Network Upgrades**: allows validators to upgrade to a new protocol version in their own time; network upgrades occur without ever breaking consensus
4. **Chain-agnostic Bifrost Protocol**: handles UTXO, EVM, BFT and Cryptonote chain connections with minimal core-logic nuances
5. **Incentive Pendulum**: streams rewards to Validators and Liquidity Providers to target a Network Security ratio that ensures funds are always secured
6. **Continuous Liquidity Pools**: allow single-sided liquidity provision, use liquidity-sensitive or "slip-based" fees to resist price attacks
7. **Swap Queue**: orders swaps based on price impact in each block, stopping sandwich attacks and most other forms of Miner Extractable Value (MEV).

## 3-Pillars of THORChain: Security, Liquidity, Volume

THORChain contributors work only towards three goals:

1. **Security**: Perpetually improve the security of the network, via either **Functional Security—**&#x65;.g., Solvency Checker, Node Pause, TxOut Throttler; **Procedural Security**—e.g., THORSec, Stagenet testing, PR reviews; or **Economic Security**—e.g., bonded RUNE value
2. **Liquidity**: Perpetually increase the liquidity of the network by incentivizing users to deposit into liquidity pools, thereby increasing the network's Total Value Locked (TVL)
3. **Volume**: Improve the volume of the network via swap UX and wallet integrations (Quotes Endpoint, Dev UX, BD)

You can learn how THORChain works here:

{% content-ref url="how-it-works/" %}
[how-it-works](how-it-works/)
{% endcontent-ref %}

## THORNodes

THORNodes are anonymous individuals who bond their RUNE to the network in order to provide validation services. As a fully permissionless network, THORChain allows anyone with the required funds to do this—all while maintaining user security. To further elevate network security, THORChain maintains a high churn schedule for these validators, every three days kicking out the oldest, slowest, and lowest bonded. This high-churn model ensures that THORChain remains resistant to centralization, capture, and censorship.

Each individual THORNode is comprised of several independent servers in a cluster, which run full-nodes for each connected chain. Initially intended to max out capacity at 100 nodes, the protocol is now able scale to 250+ nodes.

{% content-ref url="understanding-thorchain/roles/node-operators.md" %}
[node-operators.md](understanding-thorchain/roles/node-operators.md)
{% endcontent-ref %}

## CONTRIBUTING

THORChain is an open-source, public project. If you want to join the community or work on THORChain Core, please do join the [Dev Discord](https://discord.gg/7RRmc35UEG).

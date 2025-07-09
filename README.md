---
description: A high-level overview of what THORChain is, does, encourages, and pursues.
---

# Introduction

## What is THORChain?

THORChain is an independent, cross-chain liquidity protocol that operates as a Layer 1 decentralised exchange (DEX). Built on the [Cosmos SDK](https://docs.cosmos.network/v0.52/learn/intro/overview), it utilises the CometBFT consensus engine, the Cosmos-SDK state machine, and the GG20 Threshold Signature Scheme (TSS) to execute its purpose, which is to allow users to swap native assets across multiple chains with zero reliance on centralised third parties. In doing so, it stands as one of the few exchanges that verifiably ensures transparent and fair prices for cross-chain swaps of native assets.

THORChain's design renders no need for wrapped or pegged assets. Instead, the protocol deploys what are called continuous liquidity pools (CLPs), which—with highly complex algorithms—maximise the efficiency of its transactions. These CLPs allow for THORchain to manage funds directly in on-chain vaults, and it secures those funds via an economic security model. For all this, THORChain might be best described as a "cross-chain automated market maker (AMM), like Uniswap", or even a "decentralised Binance".

## THORChain's Financial Offerings

Building on the foundation of liquidity pools, THORChain pursues two important financial primitives:

1. Allow a user to [**Swap**](thorchain-finance/continuous-liquidity-pools.md) {_Asset X on Chain A_}, to {_Asset Y on Chain B_}.
2. Allow a user to [**Pool**](thorchain-finance/runepool.md) RUNE across liquidity pools,

Developers can create innovative products that integrate with THORChain, including wallets, exchanges, and various services, monetising these efforts via [affiliate fees](https://dev.thorchain.org/concepts/fees.html?highlight=aff#affiliate-fee) (e.g., up to 10% in affiliate fees for swaps and liquidity additions). All that is needed is a focus on creating engaging front-end interfaces and attracting users.

Developers interested in integrating THORChain should read the [Dedicated Developer Documentation](https://dev.thorchain.org/), as well as the quick start guide for [Swapping](https://dev.thorchain.org/swap-guide/quickstart-guide.html).

Created with the first principles of decentralisation, resistance to capture, and sustainability, the THORChain protocol includes several novel innovations:

1. **Capped Proof Of Bond**: Validator selection keeps the network decentralised and [Nakamoto Coefficient](https://nakaflow.io/) high
2. **3-Day Validator Churning**: eliminates validator stagnation, proves spendability of funds, and upgrades the network—all with minimal governance
3. **Asynchronous Network Upgrades**: allows validators to upgrade to a new protocol version in their own time; network upgrades occur without ever breaking consensus
4. **Chain-agnostic Bifrost Protocol**: handles UTXO, EVM, BFT and Cryptonote chain connections with minimal core-logic nuances
5. **Incentive Pendulum**: streams rewards to Validators and Liquidity Providers to target a Network Security ratio that ensures funds are always secured
6. **Continuous Liquidity Pools**: allow single-sided liquidity provision, use liquidity-sensitive or "slip-based" fees to resist price attacks
7. **Swap Queue**: orders swaps based on price impact in each block, stopping sandwich attacks and most other forms of Miner Extractable Value (MEV)

THORChain contributors work towards three goals:

1. **Security**: Perpetually improve the security of the network, via either **Functional Security—**&#x65;.g., Solvency Checker, Node Pause, TxOut Throttler; **Procedural Security**—e.g., THORSec, Stagenet testing, PR reviews; or **Economic Security**—e.g., bonded RUNE value
2. **Liquidity**: Perpetually increase the liquidity of the network by incentivizing users to deposit into liquidity pools, thereby increasing the network's Total Value Locked (TVL)
3. **Volume**: Improve the volume of the network via swap UX and wallet integrations (Quotes Endpoint, Dev UX, BD)

To learn how THORChain works, feel free to jump here:&#x20;

{% content-ref url="how-it-works/" %}
[how-it-works](how-it-works/)
{% endcontent-ref %}

## THORNodes

THORNodes are anonymous individuals who bond their RUNE to the network in order to provide validation services. As a fully permissionless network, THORChain allows anyone with the required funds to do this—all while maintaining user security. To further elevate network security, THORChain maintains a high churn schedule for these validators, every three days kicking out the oldest, slowest, and lowest bonded. This high-churn model ensures that THORChain remains resistant to centralization, capture, and censorship.

Each individual THORNode is comprised of several independent servers in a cluster, which run full-nodes for each connected chain. Initially intended to max out capacity at 100 nodes, the protocol is able scale to 250+ nodes.

## CONTRIBUTING

THORChain is an open-source, public project with a vibrant and growing ecosystem. Whether you’re a user, an interface developer, or an app builder on top of the network, there’s a way to get involved.

#### 1. Join the Community

Be part of the THORChain ecosystem by joining the [THORChain Community Discord](https://discord.com/invite/c4EhDZdFMA). It’s the best place to ask questions, learn how things work, and discuss all things THORChain with other users, builders, and contributors.

#### 2. Build Interfaces

Interface developers are welcome to build wallets, dashboards, exchanges, and more that integrate with THORChain. You can monetize your apps through **affiliate fees**, earning up to **10%** on swaps and liquidity actions. Focus on building great frontends and bringing in users — the protocol takes care of the rest.

Join the [Dev Discord](https://discord.gg/u6wMSKHpD4) to collaborate with other interface developers and access tools, docs, and support. Also see our [Dedicated Developer Documentation](https://dev.thorchain.org/) and quick start guides for [Swapping](https://dev.thorchain.org/swap-guide/quickstart-guide.html).

#### 3. Build Apps with Rujira

For building secure and sustainable decentralized applications (dApps) and smart contracts on top of THORChain check out [Rujira](https://docs.rujira.network/developers/getting-started). You can also join the [Rujira Discord](https://discord.gg/XPvsxhWKfb) for developers to connect with core contributors and other app developers.


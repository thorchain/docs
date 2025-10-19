---
description: A high-level overview of what THORChain is, does, encourages, and pursues.
---

{% hint style="info" %}
**New to THORChain?** Check out [What is THORChain and RUNE?](what-is-thorchain-and-rune.md) for an easy-to-understand introduction.
{% endhint %}

# Introduction

## What is THORChain?

THORChain is an independent, cross-chain liquidity protocol that operates as a Layer 1 decentralised exchange (DEX). Built on the [Cosmos SDK](https://docs.cosmos.network/v0.52/learn/intro/overview), it utilises the CometBFT consensus engine, the Cosmos-SDK state machine, and the GG20 Threshold Signature Scheme (TSS) to execute its purpose, which is to allow users to swap native assets across multiple chains with zero reliance on centralised third parties. In doing so, it stands as one of the few exchanges that verifiably ensures transparent and fair prices for cross-chain swaps of native assets.

THORChain's design renders no need for wrapped or pegged assets. Instead, the protocol deploys what are called continuous liquidity pools (CLPs), which—with highly complex algorithms—maximise the efficiency of its transactions. These CLPs allow for THORChain to manage funds directly in on-chain vaults, and it secures those funds via an economic security model. For all this, THORChain might be best described as a "cross-chain automated market maker (AMM), like Uniswap", or even a "decentralised Binance".

## THORChain's Financial Offerings

Building on the foundation of liquidity pools, THORChain pursues two important financial primitives:

1. Allow a user to [**Swap**](thorchain-finance/continuous-liquidity-pools.md) {_Asset X on Chain A_}, to {_Asset Y on Chain B_}.
2. Allow a user to [**Pool**](thorchain-finance/runepool.md) RUNE across liquidity pools,

## Building on THORChain

THORChain welcomes developers who want to build applications and interfaces for users. Whether you're creating wallets, exchanges, or innovative DeFi applications, THORChain provides the infrastructure for cross-chain liquidity.

For technical integration guides, API documentation, and developer resources, visit the [THORChain Developer Documentation](https://dev.thorchain.org/).

For a detailed understanding of THORChain's technical innovations, design principles, and protocol mechanics, see the Technical Deep Dive section below.

To learn how THORChain works, feel free to jump here:

{% content-ref url="technical-deep-dive/" %}
[technical-deep-dive](technical-deep-dive/)
{% endcontent-ref %}

## THORNodes

THORNodes are anonymous individuals who bond their RUNE to the network in order to provide validation services. As a fully permissionless network, THORChain allows anyone with the required funds to do this—all while maintaining user security. To further elevate network security, THORChain maintains a high churn schedule for these validators, every three days kicking out the oldest, slowest, and lowest bonded. This high-churn model ensures that THORChain remains resistant to centralization, capture, and censorship.

Each individual THORNode is comprised of several independent servers in a cluster, which run full-nodes for each connected chain. Initially intended to max out capacity at 100 nodes, the protocol is able scale to 250+ nodes.

## CONTRIBUTING

THORChain is an open-source, public project with a vibrant and growing ecosystem. Whether you’re a user, an interface developer, or an app builder on top of the network, there’s a way to get involved.

### 1. Join the Community

Be part of the THORChain ecosystem by joining the [THORChain Community Discord](https://discord.com/invite/c4EhDZdFMA). It’s the best place to ask questions, learn how things work, and discuss all things THORChain with other users, builders, and contributors.

### 2. Build on THORChain

Developers can create applications and interfaces that leverage THORChain's cross-chain liquidity infrastructure. This includes wallets, exchanges, DeFi applications, and innovative financial products that benefit users across multiple blockchains.

For comprehensive developer resources, technical guides, and community support, visit the [THORChain Developer Documentation](https://dev.thorchain.org/).

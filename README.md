---
description: THORChain, RUNE, Roles, THORNodes, Wallets and the rest of the ecosystem.
---

# Introduction

## About

THORChain is a decentralised cross-chain liquidity protocol based on [Tendermint](https://tendermint.com/) & [Cosmos-SDK](https://cosmos.network/) and utilising [Threshold Signature Schemes](https://eprint.iacr.org/2019/114.pdf) (TSS). It does not peg or wrap assets, it manages funds directly in on-chain vaults, and secures those funds using economic security. It could be described as a "cross-chain automated market maker (AMM), like Uniswap".&#x20;

Building on the foundation of liquidity pools, THORChain pursues three important financial primitives:

1. Allow a user to **Swap** {_Asset X on Chain A_}, to {_Asset Y on Chain B_}.&#x20;
2. Allow a user to **Save** {_Asset X on Chain A_}.
3. Allow a user to **Lend** {_Asset X on Chain A_}, to **Borrow** {_Asset Y on Chain B_}.&#x20;

### Innovations

There a numerous innovations in the THORChain Protocol that were built with first principles to be as decentralised and resistant to capture as possible, as well as attack-resistant:

1. **Capped Proof Of Bond** validator selection keeps the network decentralised and Nakamoto Coefficient high.&#x20;
2. **3-Day Validator Churning** stops validator stagnation, proves spendability of funds and upgrades the network with minimal governance.&#x20;
3. **Asynchronous Network Upgrades** allows validators to upgrade to a new protocol version in their own time, with the network upgrading without ever breaking consensus.&#x20;
4. **Chain-agnostic Bifrost Protocol** handles UTXO, EVM, BFT and Cryptonote chain connections with minimal core-logic nuances.&#x20;
5. **Incentive Pendulum** streams rewards to Validators and Liquidity Providers to target a Network Security ratio that always keeps funds secured.&#x20;
6. **Continuous Liquidity Pools** that allows single-sided liquidity provision and uses liquidity-sensitive fees to resist price attacks.
7. **Swap Queue** that orders swaps based on price impact in each block, which stops sandwich attacks and most other forms of Miner Extractable Value (MEV).&#x20;
8. **Liquidity Synths** to enable fast low-fee swaps across L1 pools and power single-sided Savers. Synths are hybrid collaterised-pegged asset design that contribute to liquidity.&#x20;
9. **Derived Asset Collateral** to enable L1 lending, using the RUNE asset to underwrite the liability. This enables no interest, no liquidation, no expiry loans.&#x20;

### 3-Pillars of THORChain: Security, Liquidity, Volume

THORChain contributors work to three goals:

1. Improve the **Security** of the network, via either **Functional** (Solvency Checker, Node Pause, TxOut Throttler), **Procedural** (THORSec, Stagenet testing, PR reviews) or **Economic** (RUNE in the bond, or value of the $RUNE in the bond) Security.&#x20;
2. Improve the **Liquidity** of the network, via Total Value Locked (TVL), or better UX around providing liquidity (Savers).&#x20;
3. Improve the **Volume** of the network, via Swap UX (Synths, Order Books), or wallet Integrations (Quotes Endpoint, Dev UX, Business Development)

You can learn about THORChain here:

{% content-ref url="learn/" %}
[learn](learn/)
{% endcontent-ref %}

You can learn how THORChain works here:

{% content-ref url="how-it-works/" %}
[how-it-works](how-it-works/)
{% endcontent-ref %}

## RUNE

RUNE provides the economic incentives required to secure the network and coordinate liquidity. RUNE has four key roles which are described below.

1. Liquidity (as a settlement asset)
2. Security (as a sybil-resistant mechanism, and a means for driving economic behaviour)
3. Governance (signalling priority on-chain)
4. Incentives (paying out rewards, charging fees, subsidising gas)

Learn more here:

{% content-ref url="rune.md" %}
[rune.md](rune.md)
{% endcontent-ref %}

## ROLES

There are five key roles in the system:

1. **Liquidity Providers (LPs)** who add liquidity to pools and earn fees and rewards. Note, there are 3 types of LPs: Dual-LP, Protocol-owned Liquidity and Savers.&#x20;
2. **Swappers** who use the liquidity to swap assets ad-hoc, paying fees.
3. **Borrowers** who deposit L1 collateral to borrow USD-denominated debt in the form of L1 assets, paying fees. Collateral is held in Network Equity (RUNE) whilst the loan is open.&#x20;
4. **Traders** who monitor pools and rebalance continually, paying fees but with the intent to earn a profit.
5. **Node Operators** who provide a bond and are paid to secure the system.

{% content-ref url="roles/" %}
[roles](roles/)
{% endcontent-ref %}

## THORNodes

THORNodes service the THORChain network, of which there is intended to be initially 100, but can scale to 250+. The design goal of THORChain is such that anyone can join the network with the required funds (permissionless) \*and be anonymous\*, yet still be secure. THORChain takes this a step further by having a high churn schedule, kicking out nodes continuously. This high-churn network ensures that it is censorship-resistant, evades capture and resists centralisation.

Each THORNode is comprised of several independent servers in a cluster, which run full-nodes for each connected chain. THORNodes should be anonymous, do not support public delegation and are regularly churned out.

## Developers

{% hint style="info" %}
Users make signed transactions with a "memo" conveying intent into vaults, which is then picked up by THORChain and executed.\
They do not need to hold RUNE, or even care that RUNE was used. This makes THORChain suitable to be integrated into almost any wallet/service/exchange-provider as the "backend" liquidity protocol.
{% endhint %}

### INTERFACES

Interfaces allow users to connect to wallets, read balances, query Midgard and broadcast transactions in both the web and desktop environment. Anyone can build their own interface.

### API - MIDGARD

Midgard can be run by every THORNode and provides a restful API & graphQL & websockets that any client can consume to display data. Since the data is read-only, there are several public Midgards that you can connect to.

### STATE MACHINE - THORChain

THORChain itself is a state machine that both settles external state, as well as transactions of network assets, such as **RUNE**, synthetic assets and **TOR**. THORChain could be called an app-chain, where the application is a decentralised exchange focussed on liquidity.

## INTEGRATION

Developers build products that integrate with THORChain, such as wallets, exchanges and other services. Developers simply need to connect to Midgard, but they should also consider running their own nodes.

The order of integration is as follows:

1. Connect to THORChain via Midgard or THORNode.
2. Use data provided to display pools, assets, users.&#x20;
3. Use `xchain-crypto` to manage keystores for your wallet
4. Use `xchainjs` packages to sign transactions and broadcast.

## CONTRIBUTING

THORChain is a public project. Anyone can help contribute to the ecosystem. Start here to learn about the contribution process, as well as upgrading the chain:

1. Connecting to more chains
2. Adding more business logic to the chain (stablecoins, derivatives etc)
3. Upgrading the chain to be more robust

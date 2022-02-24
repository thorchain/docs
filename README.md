---
description: THORChain, Midgard, Wallets and the rest of the ecosystem.
---

# Introduction

## Technology

THORChain is a decentralised cross-chain liquidity protocol based on [Tendermint](https://tendermint.com) & [Cosmos-SDK](https://cosmos.network) and utilising [Threshold Signature Schemes](https://eprint.iacr.org/2019/114.pdf) (TSS). It does not peg or wrap assets, it simply determines how to move them in response to user-actions.

THORChain observes incoming user deposits to vaults, executes business logic (swap, add/remove liquidity), and processes outbound transactions. THORChain is primarily a leaderless vault manager, ensuring that every stage of the process is byzantine-fault-tolerant.

THORChain's key objective is to be resistant to centralisation and capture whilst facilitating cross-chain liquidity. THORChain only secures the assets in its vaults, and has economic guarantees that those assets are safe.

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

There are four key roles in the system:

1. **Liquidity providers** who add liquidity to pools and earn fees and rewards
2. **Swappers** who use the liquidity to swap assets ad-hoc, paying fees
3. **Traders** who monitor pools and rebalance continually, paying fees but with the intent to earn a profit.
4. **Node Operators** who provide a bond and are paid to secure the system

{% content-ref url="roles/" %}
[roles](roles/)
{% endcontent-ref %}

## THORNodes

THORNodes service the THORChain network, of which there is intended to be initially 100, but can scale to 250+. The design goal of THORChain is such that anyone can join the network with the required funds (permissionless) \*and be anonymous\*, yet still be secure. THORChain takes this a step further by having a high churn schedule, kicking out nodes continuously. This high-churn network ensures that it is censorship-resistant, evades capture and resists centralisation.

Each THORNode is comprised of several independent servers in a cluster, which run full-nodes for each connected chain, a THORDaemon and a Midgard API. THORNodes should be anonymous, do not support delegation and are regularly churned out.

## Developers

{% hint style="info" %}
Users make signed transactions with a "memo" conveying intent into vaults, which is then picked up by THORChain and executed.\
They do not need to hold RUNE, or even care that RUNE was used, or even connect directly with THORChain. This makes THORChain suitable to be integrated into almost any wallet/service/exchange-provider as the "backend" liquidity protocol.
{% endhint %}

{% hint style="danger" %}
THORChain churns vaults regularly to resist capture. Do not send transactions directly to THORChain vaults without first doing important safety checks.
{% endhint %}

### INTERFACES

Interfaces allow users to connect to wallets, read balances, query Midgard and broadcast transactions in both the web and desktop environment. Anyone can build their own interface, and several wallet libraries have been built to help developers with this.

### API - MIDGARD

Midgard can be run by every THORNode and provides a restful API & graphQL & websockets that any client can consume to display data. Since the data is read-only, there are several public Midgards that you can connect to.

### STATE MACHINE - THORChain

THORChain itself is a state machine that both settles external state, as well as transactions of network assets, such as THOR.RUNE, synthetic assets and THOR.USD. THORChain could be called an app-chain, where the application is a decentralised exchange focussed on liquidity.

## INTEGRATION

Developers build products that integrate with THORChain, such as wallets, exchanges and other services. Developers simply need to connect to Midgard, but they should also consider running their own nodes.

The order of integration is as follows:

1. Connect to THORChain via Midgard
2. Use data provided by Midgard to display (pools, assets)
3. Use `xchain-crypto` to manage keystores for your wallet
4. Use `xchainjs` packages to sign transactions and broadcast.

## CONTRIBUTING

THORChain is a public project. Anyone can help contribute to the ecosystem. Start here to learn about the contribution process, as well as upgrading the chain:

1. Connecting to more chains
2. Adding more business logic to the chain (stablecoins, derivatives etc)
3. Upgrading the chain to be more robust

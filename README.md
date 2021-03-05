---
description: 'Introduction of THORChain, Midgard, ASGARDEX and the rest of the ecosystem.'
---

# Introduction

## THORChain

THORChain is a decentralised cross-chain liquidity protocol based on [Tendermint](https://tendermint.com/) & [Cosmos-SDK](https://cosmos.network/) and utilising [Threshold Signature Schemes](https://eprint.iacr.org/2019/114.pdf) \(TSS\). It does not peg or wrap assets, it simply determines how to move them in response to user-actions. 

THORChain observes incoming user deposits to vaults, executes business logic \(swap, add/remove liquidity\), and processes outbound transactions. THORChain is primarily a leaderless vault manager, ensuring that every stage of the process is byzantine-fault-tolerant. 

## ROLES

There are four key roles in the system:

1. **Liquidity providers** who add liquidity to pools and earn fees and rewards
2. **Swappers** who use the liquidity to swap assets ad-hoc, paying fees
3. **Traders** who monitor pools and rebalance continually, paying fees but with the intent to earn a profit. 
4. **Node Operators** who provide a bond and are paid to secure the system

## COMPONENTS

There are several components to the system to ensure that it is decentralised and secure.

{% hint style="info" %}
Users simply make signed transactions with a "memo" conveying transaction intent into vaults, which is then picked up by THORChain and executed.   
They do not need to hold RUNE, or even care that RUNE was used, or even connect directly with THORChain. This makes THORChain suitable to be integrated into almost any wallet/service/exchange-provider as the "backend" liquidity protocol.
{% endhint %}

{% hint style="danger" %}
THORChain churns vaults regularly to resist capture. Do not send transactions directly to THORChain vaults without first doing important safety checks. 
{% endhint %}

### ASGARDEX \(Interface\)

ASGARDEX is an interface that allows users to connect to wallets, read balances, query Midgard and broadcast transactions. ASGARDEX can be served from both the web and desktop environment. Anyone can build their own interface, and several wallet libraries have been built to help developers with this.

### MIDGARD \(API\)

Midgard is run by every THORNode and provides a restful API that any client can consume to display data. To connect to Midgard, the client \(eg wallet\) must first challenge a number of nodes to prevent being attacked or phished, since the security model of THORChain is strictly by-consensus.

### THORChain \(Ledger\)

THORChain itself is a ledger that both settles external state, as well as transactions of THOR.RUNE - the network asset. THORChain could be called an app-chain, where the application is a decentralised exchange. 

## DEVELOPERS

Developers build products that integrate with THORChain, such as wallets, exchanges and other services. Developers simply need to connect to Midgard, they do not need to run a node.

The order of integration is as follows:

1. Add open-source NPM `asgardex` packages to your project
2. Use `asgardex-midgard` to connect to THORChain via Midgard
3. Use data provided by Midgard to display in your product
4. Use `xchain-crypto` to manage keystores for your wallet
5. Use `xchain-binance` `xchain-ethereum` or `xchain-bitcoin` to sign transactions and broadcast.

## CONTRIBUTING

THORChain is a public project. Anyone can help contribute to the ecosystem. Start here to learn about the contribution process, as well as upgrading the chain:

1. Connecting to more chains
2. Adding more business logic to the chain \(stablecoins, derivatives etc\)
3. Upgrading the chain to be more robust


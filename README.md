---
description: 'Introduction of THORChain, BEPSwap, ASGARDEX and the rest of the ecosystem.'
---

# Introduction

## THORChain

THORChain is a cross-chain liquidity protocol designed to connect blockchain assets in a marketplace of liquidity with assets secured by economically incentivised nodes. By leveraging Tendermint, Cosmos-SDK and Threshold Signature Schemes, THORChain is able to remain chain-agnostic, favoring no specific asset or blockchain and able to scale without sacrificing security.

THORChain enables users to swap between digital assets on almost any blockchain in a trustless & permissionless setting. Liquidity is provided by stakers who earn fees on swaps, turning their unproductive assets into productive assets in a non-custodial manner. Market prices are maintained through the ratio of assets in pools which can be arbitraged by traders to restore correct market prices.

{% page-ref page="overview.md" %}

## ROLES

There are four key roles in the system:

1. **Stakers** who are paid to provide liquidity
2. **Swappers** who use the liquidity to swap assets ad-hoc, paying fees
3. **Traders** who monitor pools and rebalance continually, paying fees but with the intent to earn a profit. 
4. **Node Operators** who provide a bond and are paid to secure the system

## DEVELOPERS

Developers build products that integrate with THORChain, such as wallets, exchanges and other services. Developers simply need to connect to Midgard, they do not need to run a node. 

The order of integration is as follows:

1. Add open-source NPM `asgardex` packages to your project
2. Use `asgardex-midgard` to connect to THORChain via Midgard
3. Use data provided by Midgard to display in your product
4. Use `asgardex-crypto` to manage keystores for your wallet
5. Use `asgardex-binance` `asgardex-ethereum` or `asgardex-bitcoin` to sign transactions properly and broadcast back to Midgard



## NETWORK STACK

There are several componentsto the ecosystem to ensure that it is decentralised and secure. 

### BEPSwap

BEPSwap is a web-client that is strictly limited to Binance Chain assets. It is not intended to be maintained long term, instead it will be replaced by ASGARDEX.

### ASGARDEX

ASGARDEX is a censorship-resistant desktop client that will be the main portal into the system, and provides a reference implementation. ASGARDEX is able to control the full life-cycle of a transaction and ensure compatibility with THORChain. ASGARDEX uses open-source npm packages to provide the majority of the business logic, so any community member/wallet/exchange can add THORChain integration easily. 

### MIDGARD

Midgard is an open-source API that is run by every THORNode and provides a restful API that any client can consume to display data, as well as broadcast signed transactions back to connected chains. To connect to Midgard, the client \(eg wallet\) must first challenge a number of nodes to prevent being attacked or phished, since the security model of THORChain is strictly by-consensus. 

### THORNodes

THORNodes sync and run the network. Block explorers can connect to a THORNode to display the underlying blockchain data. THORNodes can either be validators, or a light node that simply syncs and displays data. 



## HOW IT WORKS

THORChain uses some novel innovations to build an application-specific blockchain network that sets a standard for cross-chain decentralised finance. There are some parts of the system that are fundamental and should be understood well:

1. Has a Reserve that pays out every block to Nodes and Liquidity Providers
2. Uses an Incentive Pendulum to ensure safety at all times
3. Has a governance process to minimise disruptions to the chain, whilst enabling orderly upgrades
4. Uses Continuous Liquidity Pools as the basis of asset exchange
5. Allows the system to be aware of the prices of every asset in its system
6. Charges fees to maximise revenue to the system
7. Uses a Swap-Queue to order and process inbound swaps

## CONTRIBUTING

THORChain is a public project. anyone can help contribute to the ecosystem. Start here to learn about the contribution process, as well as upgrading the chain:

1. Connecting to more chains
2. Adding more business logic to the chain \(stablecoins, derivatives etc\)
3. Upgrading the chain to be more robust


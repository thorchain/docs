---
description: 'Introduction of THORChain, BEPSwap, ASGARDEX and the rest of the ecosystem.'
---

# Introduction

## THORChain

THORChain is a liquidity protocol based on [Tendermint](https://tendermint.com/) & [Cosmos-SDK](https://cosmos.network/) and utilising [Threshold Signature Schemes](https://eprint.iacr.org/2019/114.pdf) \(TSS\) to create a marketplace of liquidity for digital assets to be traded in a trustless, permissionless & non-custodial manner. THORChain's liquidity marketplace design obviates the need for order book exchanges when simply swapping one asset for another and provides ancillary benefits including manipulation resistance & on-chain price feeds. THORChain is able to remain chain-agnostic, favoring no specific asset or blockchain and able to scale without sacrificing security.

THORChain enables users to swap between digital assets on almost any blockchain in a trustless & permissionless setting. Liquidity is provided by liquidity providers who earn fees on swaps, turning their unproductive assets into productive assets in a non-custodial manner. Market prices are maintained through the ratio of assets in pools which can be arbitraged by traders to restore correct market prices.

## ROLES

There are four key roles in the system:

1. **Liquidity providers** who are paid to provide liquidity
2. **Swappers** who use the liquidity to swap assets ad-hoc, paying fees
3. **Traders** who monitor pools and rebalance continually, paying fees but with the intent to earn a profit. 
4. **Node Operators** who provide a bond and are paid to secure the system

## COMPONENTS

There are several components to the ecosystem to ensure that it is decentralised and secure.

### BEPSwap

BEPSwap is a web-client that is strictly limited to Binance Chain assets. It is not intended to be maintained long term, instead it will be replaced by ASGARDEX.

### ASGARDEX

ASGARDEX is a censorship-resistant desktop client that will be the main portal into the system, and provides a reference implementation. ASGARDEX is able to control the full life-cycle of a transaction and ensure compatibility with THORChain. ASGARDEX uses open-source npm packages to provide the majority of the business logic, so any community member/wallet/exchange can add THORChain integration easily.

### MIDGARD

Midgard is an open-source API that is run by every THORNode and provides a restful API that any client can consume to display data, as well as broadcast signed transactions back to connected chains. To connect to Midgard, the client \(eg wallet\) must first challenge a number of nodes to prevent being attacked or phished, since the security model of THORChain is strictly by-consensus.

### THORNodes

THORNodes sync and run the network. Block explorers can connect to a THORNode to display the underlying blockchain data. THORNodes can either be validators, or a light node that simply syncs and displays data.

{% page-ref page="thornodes/overview.md" %}

## DEVELOPERS

Developers build products that integrate with THORChain, such as wallets, exchanges and other services. Developers simply need to connect to Midgard, they do not need to run a node.

The order of integration is as follows:

1. Add open-source NPM `asgardex` packages to your project
2. Use `asgardex-midgard` to connect to THORChain via Midgard
3. Use data provided by Midgard to display in your product
4. Use `asgardex-crypto` to manage keystores for your wallet
5. Use `asgardex-binance` `asgardex-ethereum` or `asgardex-bitcoin` to sign transactions properly and broadcast back to Midgard

## HOW IT WORKS

THORChain uses some novel innovations to build an application-specific blockchain network that sets a standard for cross-chain decentralised finance. There are some parts of the system that are fundamental and should be understood well:

1. Has a Reserve that pays out every block to Nodes and Liquidity Providers
2. Uses an Incentive Pendulum to ensure safety at all times
3. Has a governance process to minimise disruptions to the chain, whilst enabling orderly upgrades
4. Uses Continuous Liquidity Pools as the basis of asset exchange
5. Allows the system to be aware of the prices of every asset in its system
6. Charges fees to maximise revenue to the system
7. Uses a Swap-Queue to order and process inbound swaps

## Design

THORChain has been designed to be blockchain agnostic, favoring no specific chain or asset; but connecting blockchains together via bridges which enable the movement of assets into pools & out to users.

The following components have been considered in THORChain's design, enabling trustless, permissionless and non-custodial properties for staking, swapping & trading.

### **Blockchain / Consensus**

THORChain employs in [Cosmos SDK](https://github.com/cosmos/cosmos-sdk/blob/master/docs/intro/README.md) based Byzantine Fault Tolerant \(BFT\) [Tendermint](https://tendermint.com/) consensus engine. All peer-to-peer networking, block generation & consensus is managed by the Tendermint engine.

The network can handle 1/3 malicious nodes and still maintain byzantine fault tolerance. This is because nodes are required to bond \(lock up\) [$RUNE](rune.md), the native currency of THORChain and can have their bond slashed for bad behavior \(for example proposing bad blocks\). This is important because nodes secure main-chain assets eg. Bitcoin, Ethereum, Monero etc. and there needs to be economic incentives \(and disincentives\) to avoid nodes running off with assets they secure in liquidity pools.

The staking, swapping & trading logic is built on [Cosmos SDK](https://github.com/cosmos/cosmos-sdk/blob/master/docs/intro/README.md), which is a gold standard framework for building application specific blockchains. This is necessary for THORChain to create and manage cross-chain bridges and continuous liquidity pools. Observations, calculations & transactions are all performed using Cosmos SDK.

_For more info on how THORChain utilises Tendermint & Cosmos_, refer _to the_ [_technology section here._](technology.md#consensus)\_\_

### **Cross Chain State Pegs**

Cross-chain state pegs are what connects main chains to THORChain and enables assets to be pooled together and transferred in & out to liquidity providers, swappers & traders. The mechanism is called a **1-way state peg**, because the assets are not pegged \(such as in Keep Network, Wrapped Bitcoin etc\), instead the chain state is pegged instead - and it is only 1-way. Another way to think about it, is that THORNodes observe transactions on other blockchains and the truth about what was observed is ascertained through group consensus _"we all saw the same thing"_, instead of through proof _"_[_I can prove what I saw happened_](https://github.com/summa-tx/relays/tree/golang/golang)_"_. This is a far more flexible approach and can be abstracted much better.

Nodes run clients for connected blockchains in order to reach consensus about what occurs on the main chain eg. block height, transactions etc. They make witness transactions into THORChain when they see a relevant transaction.

### **Threshold Signature Schemes**

Moving main chain assets around is risky business, and there are many tradeoffs and limitations associated with signature schemes in general. Since nodes secure the network and also manage billions of dollars in main chain assets, security needs to be paramount.

THORChain employs threshold signature schemes \([TSS](https://eprint.iacr.org/2019/114.pdf)\) to provide the highest level of security and minimal amount of risk in generating new addresses & signing transactions when moving assets around.

A single key/signature would be impractical, and multisig comes with risk. Shamir Secret Sharing \(SSS\) is superior to both however has the downside of exposing the private key at a single point in time. Threshold Signature Schemes \(TSS\) removes the burden of the single atomic key and splits the responsibility between parties. In this way, there is no key. Nodes perform multiparty computation \(MPC\) using their own secret share to generate a public key for main chain assets, and distributively sign to generate a single signature on the blockchain without ever revealing the private key.

_For more info on how THORChain implements TSS, refer to the_ [_TSS section here._](technology.md#threshold-signature-schemes)\_\_

## CONTRIBUTING

THORChain is a public project. Anyone can help contribute to the ecosystem. Start here to learn about the contribution process, as well as upgrading the chain:

1. Connecting to more chains
2. Adding more business logic to the chain \(stablecoins, derivatives etc\)
3. Upgrading the chain to be more robust


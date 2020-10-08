---
description: A high-level overview of THORChain.
---

# Overview

{% hint style="info" %}
This section provides a brief, plain language overview of THORChain. For more detailed information refer to the [technology ](technology.md)section on the next page and the [whitepaper](https://github.com/thorchain/Resources/blob/master/Whitepapers/THORChain/whitepaper-en.md).
{% endhint %}

## THORChain's liquidity protocol

THORChain is a liquidity protocol based on [Tendermint](https://tendermint.com/) & [Cosmos-SDK](https://cosmos.network/) and utilising [Threshold Signature Schemes](https://eprint.iacr.org/2019/114.pdf) \(TSS\) to create a marketplace of liquidity for digital assets to be traded in a trustless, permissionless & non-custodial manner.

THORChain's liquidity marketplace design obviates the need for order book exchanges when simply swapping one asset for another and provides ancillary benefits including manipulation resistance & on-chain price feeds.

In plain language, THORChain is the infrastructure which enables global users to exchange digital assets freely in a deeply liquid market without sacrificing security.

## Value proposition

THORChain's value proposition is to connect asset holders together in a deep marketplace of liquidity with trustless, permissionless and non-custodial properties. Four personas - swappers, liquidity providers & traders provide value to the network and have their own value propositions explained below.

### **Swappers**

Swap between any digital assets on almost any blockchain in a trustless & permissionless manner with low fees and at fair market prices. Deeply liquid pools ensure fees are minimal and use of order book exchanges are minimised.  
  
[Refer here for more info on swapping](roles/swapping.md).

### **Liquidity Providers**

Turn unproductive assets into productive assets by depositing in liquidity pools, earn fees on swaps in a non-custodial and permissionless setting. Own a share of the pool and withdraw your share at any time.

[Refer here for more info on providing liquidity.](roles/liquidity-providers.md)

### **Traders**

Profit from pool imbalances by arbitraging assets to restore pools to correct market prices when a large trade causes the pool to slip, or when external markets result in price asymmetry in liquidity pools. Automate trades & arbitrage while you're sleeping.

[Refer here for more info on trading.](roles/trading.md)

## Design

THORChain has been designed to be blockchain agnostic, favoring no specific chain or asset; but connecting blockchains together via bridges which enable the movement of assets into pools & out to users. 

The following components have been considered in THORChain's design, enabling trustless, permissionless and non-custodial properties for staking, swapping & trading.

### **Blockchain / Consensus**

THORChain employs  in [Cosmos SDK](https://github.com/cosmos/cosmos-sdk/blob/master/docs/intro/README.md)  based Byzantine Fault Tolerant \(BFT\) [Tendermint](https://tendermint.com/) consensus engine. All peer-to-peer networking, block generation & consensus is managed by the Tendermint engine.

The network can handle 1/3 malicious nodes and still maintain byzantine fault tolerance. This is because nodes are required to bond \(lock up\) [$RUNE](rune.md), the native currency of THORChain and can have their bond slashed for bad behavior \(for example proposing bad blocks\). This is important because nodes secure main-chain assets eg. Bitcoin, Ethereum, Monero etc. and there needs to be economic incentives \(and disincentives\) to avoid nodes running off with assets they secure in liquidity pools.

The staking, swapping & trading logic is built on [Cosmos SDK](https://github.com/cosmos/cosmos-sdk/blob/master/docs/intro/README.md), which is a gold standard framework for building application specific blockchains. This is necessary for THORChain to create and manage cross-chain bridges and continuous liquidity pools. Observations, calculations & transactions are all performed using Cosmos SDK. 

_For more info on how THORChain utilises Tendermint & Cosmos_, refer _to the_ [_technology section here._](technology.md#consensus)\_\_

### **Cross Chain State Pegs**

Cross-chain state pegs are what connects main chains to THORChain and enables assets to be pooled together and transferred in & out to liquidity providers, swappers & traders. The mechanism is called a **1-way state peg**, because the assets are not pegged \(such as in Keep Network, Wrapped Bitcoin etc\), instead the chain state is pegged instead - and it is only 1-way.  Another way to think about it, is that THORNodes observe transactions on other blockchains and the truth about what was observed is ascertained through group consensus _"we all saw the same thing"_, instead of through proof _"_[_I can prove what I saw happened_](https://github.com/summa-tx/relays/tree/golang/golang)_"_. This is a far more flexible approach and can be abstracted much better. 

Nodes run clients for connected blockchains in order to reach consensus about what occurs on the main chain eg. block height, transactions etc. They make witness transactions into THORChain when they see a relevant transaction.

### **Threshold Signature Schemes**

Moving main chain assets around is risky business, and there are many tradeoffs and limitations associated with signature schemes in general. Since nodes secure the network and also manage billions of dollars in main chain assets, security needs to be paramount.

THORChain employs threshold signature schemes \([TSS](https://eprint.iacr.org/2019/114.pdf)\) to provide the highest level of security and minimal amount of risk in generating new addresses & signing transactions when moving assets around.

A single key/signature would be impractical, and multisig comes with risk. Shamir Secret Sharing \(SSS\) is superior to both however has the downside of exposing the private key at a single point in time. Threshold Signature Schemes \(TSS\) removes the burden of the single atomic key and splits the responsibility between parties. In this way, there is no  key. Nodes perform multiparty computation \(MPC\) using their own secret share to generate a public key for main chain assets, and distributively sign to generate a single signature on the blockchain without ever revealing the private key.

_For more info on how THORChain implements TSS, refer to the_ [_TSS section here._](technology.md#threshold-signature-schemes)\_\_

## **What does the future of THORChain look like?**

Four components will be in place for mainnet: the liquidity protocol, cross-chain bridges, interface for swapping & staking and developer tooling for arbitrage.

The mainnet will see the THORChain liquidity protocol operational with 99 nodes securing cross-chain bridges to Bitcoin, Monero, Ethereum & Binance Chain. Transactions will be signed using a custom threshold signature scheme implementation.

Users will be able to swap between BTC, ETH, XMR, BNB & any BEP2 asset using ASGARDEX, THORChain's exchange interface which will also provide options for trading and staking. Usability will be at the core of ASGARDEX.

Modern APIs and websockets will provide the necessary tools for traders to participate in the ecosystem, taking advantage of price asymmetry for their economic advantage & restoring pools to their fair market prices.

##  ****


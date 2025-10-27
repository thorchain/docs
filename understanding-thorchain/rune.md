---
description: An overview of the asset and its four key roles.
---

# RUNE

## What is RUNE?

THORChain's native token is called [RUNE](rune.md), and it is carries a fundamental utility within each facet of THORChain's operational infrastructure, as well as the larger ecosystem. Specifically, it fills three key roles:

## Overview

RUNE is the asset which powers the THORChain ecosystem and provides the economic incentives required to secure the network. RUNE has four key roles which are described below.

1. Liquidity (as a settlement asset)
2. Security (as a sybil-resistant mechanism, and a means for driving economic behaviour)
3. Governance (signalling priority on-chain)
4. Incentives (paying out rewards, charging fees, subsidising gas)

### Governance

**RUNE as a Settlement Asset**

RUNE is the settlement asset for all liquidity pools, meaning that when a user pools their liquidity, a 1:1 ratio of RUNE:ASSET is required. This means the value of each native asset pool holds within it an equal value of RUNE. For example, a pool with $100,000 in BTC will necessarily hold $100,000 worth of RUNE.

**RUNE for Network Security**

Node Operators must always have bonded twice as many RUNE as there is RUNE pooled. This ensures the protocol will remain solvent in perpetuity. In bonding this much capital, node operators are economically incentivised to work within the [network’s best interest](../thornodes/overview/#risk-of-running-a-node). Thus it through economic security that network security is achieved.

**RUNE for Governance**

By symmetrically adding liquidity to a staged pool, users vote for the pools they want to become active. The deepest pools (i.e. with the most liquidity) become active.

{% hint style="info" %}
An introduction to RUNE and its roles is [here](./#what-is-rune).
{% endhint %}

## 1. Liquidity

### **Transmitting Purchasing Power**

Since RUNE is pooled 50:50 alongside external assets in its pools, when the value of those assets increase/decrease, the RUNE pooled will also increase/decrease by being arbed out or in. The RUNE unit value may not change, but the quantity of RUNE in the pool does. This means the system is always aware of the value of the assets it is trying to secure - it's simply the quantity of RUNE in all its pools.

Once it is aware of the value of the assets it is securing, it can use incentives to ensure security of those assets.

{% hint style="info" %}
_A rule of thumb is for every $1m in multi-chain assets pooled in liquidity pools, $1m of RUNE is required to be pooled along side. Due to a mechanism called the Incentive Pendulum, $2m in RUNE will be driven to be bonded. Thus, $1m in main-chain assets will cause the total value of RUNE to be $3m in an equilibrium. Thus liquidity pools have a positive effect on the monetary base of RUNE._
{% endhint %}

### **Providing Liquidity Incentives**

Since RUNE is the pooled asset, incentives can be paid directly into each pool. This extra capital is owned by the liquidity providers, and over time, slowly "purchases" the paired asset via arbitrage. Thus RUNE liquidity incentives can drive real yield to LPs.

### **Solving O(n^2) Problem**

Without a native settlement currency, each asset would need to be pooled with every other asset, which would eventually result in hundreds of new pools to be created for just one new asset, diluting liquidity. Having RUNE as the base pair allows any asset to be guaranteed to swap between any other asset.

|                                           |                                             |                                        |
| ----------------------------------------- | ------------------------------------------- | -------------------------------------- |
| <p>No. of Assets</p><p>(eg. BTC, ETH)</p> | <p>No. of Pools</p><p>(Arbitrary Pairs)</p> | <p>No. of Pools</p><p>(RUNE Pairs)</p> |
| _n_                                       | _pools = (n\*(n-1))/2_                      | _pools = n_                            |
| 12                                        | 66                                          | 12                                     |
| 24                                        | 276                                         | 24                                     |
| 100                                       | 4950                                        | 100                                    |

## 2. Security

### **Sybil-resistance**

Sybil-resistance refers to the ability to prevent someone masquerading as many identities in order to overcome a network. Bitcoin uses Proof-of-Work (one-cpu-one-vote) to prevent a network take-over. Ethereum 2.0 will use Proof-of-Stake (32-eth-one-vote) to prevent a network take-over.

THORChain is a **Proof of Bond** network instead. THORNodes commit a bond in order to be churned in. However, this bond isn't just used to identify a node (give them a voting slot), it is used to underwrite the assets in the pools. If the node attempts to steal assets, then their bond is deducted to the amount of the assets they stole (1.5x), and the pools are made whole. Additionally, if nodes misbehave their bond is slashed, ensuring reliable service.

### **Underwriting Assets**

The Incentive Pendulum ensures that Nodes are incentivised to maintain optimal bond levels to secure the network's assets. The bond is extremely liquid since RUNE is the settlement asset in all pools. See the [Economic Model](../technical-deep-dive/economic-model.md) for detailed mechanics and calculations.

## 3. Governance

### **LPS: Signalling Priority for Assets**

While THORChain strives to be governance-minimal, there are some parts of the protocol that use committed capital to signal priority. This is the case for the asset listing process, where every few days a new asset can be listed as a pool. In a queue of standby assets, the one with the deepest commitment of RUNE is the one that is listed first.

### **LPs: Signalling Priority for Chains**

Additionally, if a connected chain is no longer economically valuable, then all liquidity providers in that chain can leave. If a pool is empty, it will be delisted, and this will cause the network to immediately sever ties with that chain in a process call a "ragnarok".

### **One-Node-One-Vote**

THORNodes each occupy one of the 120 slots in the system can can vote on changing network parameters using a mechanism called `node-mimir`.

## 4. Incentives

### **Fees**

RUNE is the native currency of THORChain and is consumed as transaction fees on the network. All swaps are charged both a fixed network fee, as well as a dynamic slip-based fee. This prevents various attack paths such as denial-of-service attacks, as well as sandwich attacks on a pool. Learn more about fees here:

{% content-ref url="../technical-deep-dive/" %}
[technical-deep-dive](../technical-deep-dive/)
{% endcontent-ref %}

### **Subsidising Gas**

The network continually consumes gas as it makes outgoing transactions (as well as internal transactions). Gas on networks such as Bitcoin and Ethereum becomes complicated fast, so THORChain doesn't make much of an effort to track every minutia of gas consumed. Instead, nodes are free to use at-will the base assets `BSC.BNB`, `ETH.ETH`, `BTC.BTC`, etc in order to pay for gas. These assets are used directly from the vaults. THORChain then observes outgoing transactions, reports on the gas used, and then pays back the liquidity providers in those pools to the value of twice the amount of gas used (in RUNE).

### **Paying out Emissions**

After fees are charged and gas is subsidised, then THORChain computes the block reward, divides it based on the Incentive Pendulum algorithm, and then pays out to Bonders and Liquidity providers.

This drives Nodes to bond the optimal amount, and pays Liquidity providers for their contribution of liquidity.

Learn about the Incentive Pendulum here:

{% content-ref url="../technical-deep-dive/economic-model.md" %}
[economic-model.md](../technical-deep-dive/economic-model.md)
{% endcontent-ref %}

## Deterministic Value of RUNE

RUNE's price has two factors: a deterministic value based on the liquidity within the network and a speculative premium. The economic security model creates a minimum value floor for RUNE based on the assets it secures. For detailed calculations and economic mechanics, see the [Economic Model](../technical-deep-dive/economic-model.md).

## For more informaiton on RUNE see

- [THORChain Tokenomics Article](https://medium.com/thorchain/thorchain-tokenomics-what-is-rune-52d339633260)
- [Under the Hood: Rune Supply](https://thorchain-community.medium.com/under-the-hood-rune-supply-d30772fdfbaf)
- [Current Supply Data](https://dashboards.ninerealms.com/#lending)
- [THORChain Tokenomics Dashboard](https://flipsidecrypto.xyz/BlockTracker/thorchain-tokenomics-g7ZOP_)

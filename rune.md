---
description: An overview of the asset and its four key roles.
---

# RUNE

## What is $RUNE

$RUNE is the asset which powers the THORChain ecosystem and provides the economic incentives required to secure the network. $RUNE has four key roles which are described below.

1. Liquidity \(As a settlement asset\)
2. Security \(As a sybil-resistant mechanism, and a means for driving economic behaviour\)
3. Governance \(Signalling priority on-chain\)
4. Incentives \(Paying out rewards, charging fees, subsidising gas\)

## 1. Liquidity

**Solving O\(n^2\) Problem**

$RUNE is the base currency and is required to be provided along side every asset in pools. Without a native settlement currency, each asset would need to be pooled with every other asset, which would eventually result in hundreds of new pools to be created for just one new asset, diluting liquidity. Using the formula below we can calculate the network requirements for various scenarios.

<table>
  <thead>
    <tr>
      <th style="text-align:left">
        <p>No. of Assets</p>
        <p>(eg. BTC, ETH)</p>
      </th>
      <th style="text-align:left">
        <p>No. of Pools</p>
        <p>(Others)</p>
      </th>
      <th style="text-align:left">
        <p>No. of Pools</p>
        <p>(THORChain)</p>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><em>n</em>
      </td>
      <td style="text-align:left"><em>pools = (n*(n-1))/2</em>
      </td>
      <td style="text-align:left"><em>pools = n</em>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">12</td>
      <td style="text-align:left">66</td>
      <td style="text-align:left">12</td>
    </tr>
    <tr>
      <td style="text-align:left">24</td>
      <td style="text-align:left">276</td>
      <td style="text-align:left">24</td>
    </tr>
    <tr>
      <td style="text-align:left">100</td>
      <td style="text-align:left">4950</td>
      <td style="text-align:left">100</td>
    </tr>
    <tr>
      <td style="text-align:left">1000</td>
      <td style="text-align:left">499,500</td>
      <td style="text-align:left">1000</td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left"></td>
      <td style="text-align:left"></td>
    </tr>
  </tbody>
</table>

**Transmitting Purchasing Power**

Since $RUNE is bonded to assets in its pools, then as the value of those assets increase, then the $RUNE value will also increase. This means the system can become "aware" of the value of the assets it is trying to secure. Once it is aware of the value of the assets it is securing, it can use incentives to ensure security of those assets.

A rule of thumb is for every $1m in main-chain assets pooled in liquidity pools, $1m of $RUNE is required to be pooled along side. Due to a mechanism called the Incentive Pendulum, $2m in RUNE will be driven to be bonded. Thus, $1m in main-chain assets will cause the total value of RUNE to be $3m in an equilibrium. Thus liquidity pools have a positive effect on the monetary base of RUNE.

## 2. Security

**Sybil-resistance**

Sybil-resistance refers to the ability to prevent someone masquarading as many identies in order to overcome a network. Bitcoin uses Proof-of-Work \(one-cpu-one-vote\) to prevent a network take-over. Ethereum 2.0 will use Proof-of-Stake \(32-eth-one-vote\) to prevent a network take-over.

THORChain could be called Proof of Stake \(PoS\) network, but there are some differences to warrant it being called a **Proof of Bond** network instead. In THORChain the nodes commit a bond \(minimum of 1,000,000 RUNE\) in order to be churned in. However, this bond isn't just used to identify a node \(give them a voting slot\), it is used to underwrite the assets in the pools. If the node attempts to steal assets, then their bond is deducted to the amount of the assets they stole \(1.5x\), and the pools are made whole. Additionally, nodes have to perform a lot of mandatory services, else their bond is deducted.

**Underwriting Assets**

The Incentive Pendulum ensures that Nodes are incentivised to continually buy and bond enough Rune each time to maximise their gains - which is a maximum when there is 67% of RUNE bonded and 33% pooled in pools. If the pools are holding $1m in capital, then the value of RUNE in the aggregrate bond is $2m. Thus all assets can be underwritten.

The bond is extremely liquid - any RUNE holder can immediately enter or exit their position since RUNE is the settlement asset in all pools. Thus, when a node churns in, the cost basis of their bond is known to them and not an arbitrary "paper" figure. This means a node bonding $1m in RUNE will never contemplate making a decision to steal &lt;$1m in capital from the network, else they will lose overall.

## 3. Governance

**Signalling Priority for Assets**

While THORChain strives to be governance-minimal, there are some parts of the protocol that use committed capital to signal priority. This is the case for the asset listing process, where every three days a new asset can be listed as a pool. In a queue of standby assets, the one with the deepest commitment of RUNE is the one that is listed first.

**Signalling Priority for Chains**

Additionally, if a connected chain is no longer economically valuable, then all liquidity providers in that chain can leave. If a pool is empty, it will be delisted, and this will cause the network to immediately sever ties with that chain in a process call a "ragnarok".

## 4. Incentives

**Fees**

$RUNE is the native currency of THORChain and is consumed as transaction fees on the network. All swaps are charged both a fixed network fee, as well as a dynamic slip-based fee. This prevents various attack paths such as denial-of-service attacks, as well as sandwich attacks on a pool.

**Subsidising Gas**

The network continually consumes gas as it makes outgoing transactions \(as well as internal transactions\). Gas on networks such as Bitcoin and Ethereum becomes complicated fast, so THORChain doesn't make much of an effort to track every minutia of gas consumed. Instead, nodes are free to use at-will the base assets `BNB.BNB`, `ETH.ETH`, `BTC.BTC`, etc in order to pay for gas. These assets are used directly from the vaults. THORChain then observes outgoing transactions, reports on the gas used, and then pays back the liquidity providers in those pools to the value of twice the amount of gas used \(in RUNE\).

**Paying out Emissions**

After fees are charged and gas is subsidised, then THORChain computes the block reward, divides it based on the Incentive Pendulum algorithm, and then pays out to Bonders and Liquidity providers.

This drives Nodes to bond the optimal amount, and pays Liquidity providers for their contribution of liquidity.


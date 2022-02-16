---
description: >-
  THORChain is a cross-chain decentralized protocol that allows native swaps
  between different blockchains.
---

# Understanding THORChain

### What are automated market makers and liquidity providers?

Automated market makers (AMMs) are decentralised exchanges (DEX) that pool liquidity from users and price the assets within the pool by using algorithms. The exact mechanics vary from exchange to exchange, but generally, AMMs offer deep liquidity, low transaction fees, and 100% uptime for as many users as possible.

Liquidity Providers (LPs) are network participants who deposit their assets into these pools (i.e. virtual, asset-specific reservoirs), and by doing so, come to own a share of that particular pool for as long as they retain their assets within. In exchange for adding their assets to the pools, LPs earn rewards, as swappers (who use pools to exchange assets) incur fees, which are proportionally distributed to the pool owners. Some protocols also boosts the liquidity APY by emitting block rewards (for example, $BNT by Bancor and $RUNE by THORChain).

### What is THORChain?

THORChain is an independent blockchain that operates as a Layer 1 cross-chain decentralised exchange (DEX). Built using the Cosmos SDK (https://docs.cosmos.network/), THORChain enables the exchange of assets across disparate blockchains in a non-custodial manner. THORChain is the backend to many user interfaces.

Key selling points of THORChain are:&#x20;

* The ability to swap Layer-1, or native, assets across multiple chains - e.g. native BTC to ETH swap.&#x20;
* No user-registration required - simply send a transaction and THORChain will execute it.&#x20;
* No wrapped assets - all assets are natively secured.&#x20;
* Transparent, fair [prices](../how-it-works/prices.md), without relying on centralised third-parties.&#x20;
* [Continuous Liquidity Pools](../thorchain-finance/continuous-liquidity-pools.md#benefits-of-the-clp-model) that maximise the efficiency of the protocol.

➜ [An Introduction to THORChain for Bitcoiners](https://erikvoorhees.medium.com/an-introduction-to-thorchain-for-bitcoiners-3f621bf0028e)

### What is RUNE?

THORChain features a native token [RUNE](../rune.md), which owners can use to participate in the network and is used to pay for the swap/gas fees for RUNE pairs. RUNE has specific utility within the THORChain ecosystem, as it fills four key roles:&#x20;

* Settlement Asset
* Network Security&#x20;
* Governance
* Incentives

**Rune as a Settlement Asset**&#x20;

RUNE is the settlement asset for all pools, so a 1:1 ratio of RUNE:ASSET is required for pooling. For example, a pool with $100,000 in BTC will necessarily hold $100,000 worth of RUNE. Within a pool, all assets will have a 50% pairing with RUNE regardless of how assets are added or withdrawn.

**Rune for Network Security**

In order to provide network security, THORChain requires twice as many RUNE to be bonded by Node Operators as there is RUNE pooled. For this security provision, node operators are economically incentivised to work within the [network’s best interest](../thornodes/overview.md#risk-of-running-a-node).

**Rune for Governance**

Users can vote with their liquidity (RUNE:ASSET symmetrically added) the pools they want to be active. The pools with the most liquidity (i.e. deepest) become active.

**Rune as Incentives**&#x20;

Block rewards are paid to Liquidity Providers and Node Operators on a set emission schedule - which are in addition to swap fees.

### **How Swapping Works**

Swaps in THORChain use native assets. Example: When a swap from RUNE to BTC occurs, RUNE is sent into THORChain from the user and BTC is sent out from one of THORChain’s vaults - Inbound gas is paid in Native RUNE, Outbound Fee is paid in BTC.

When Swapping from BTC to ETH, BTC is sent into THORChain from the user and ETH is sent out from one of THORChain’s vaults. Internally, once the BTC is received, RUNE moves from the BTC pool to the ETH Pool - thus it is a double swap (BTC:RUNE, RUNE:ETH). Inbound gas is paid in BTC, Outbound Fee is paid in ETH.

### Risks associated with providing liquidity

Alongside the obvious investment risks of any asset, with liquidity provision, there also comes the risk of impermanent (price-divergent) loss. The bigger the divergence of price between the two assets, the more you are exposed to impermanent loss.

_When you provide liquidity in a liquidity pool, the two assets are bound together by the system because it will ensure that both sides of the pool have the same value._ _If the price of your deposited assets changes in the wider markets, then swappers will sell one side of the pool for the other. Thus your assets are continuously sold "on the way up" or "on the way down". In fact, your assets are sold at a price that is an average of the starting price and ending price. If you then compare your original deposited assets with what you finally get, you will think you "could have got a better price based on today's value"._&#x20;

This is called impermanent loss because the losses are only realised when you withdraw from the pool. If the ratio swings to 5x (25.5% IL) but comes back to the same ratio when you entered the pool and withdrew your liquidity at that time, you will not have suffered any impermanent loss. It is similar to traditional finance’s unrealized losses. However, when you withdraw your liquidity from the pool at any other time, the loss becomes real and permanent. The fees you earn are generally able to compensate for those losses, or you may experience no loss at all and withdraw well compensated for your time in the pool.

LPs are encouraged to provide liquidity in pools that they are bullish on, or nuetral on (don't care what the final price is). If an LP provides assets in a pool that they become bearish on, then they will be emotionally affected by the price draw-down, and may pull their assets out and realise a permanent loss.

➜ [Liquidity Pooling Example](https://www.youtube.com/watch?v=C8cYaugKSFw)

### ILP: How THORChain protects its Liquidity Providers

Liquidity Providers will receive 100% Impermanent Loss Protection **** (ILP) after they have been in the pool for 100 days, getting 1% coverage for each day in the pool. Essentially this means you are adding 1% protection for every day that you provide liquidity. 49 days provided = 49% IL protection, 100 days = 100% IL protection.

Impermanent Loss Protection (ILP) ensures that you will not be worse off providing liquidity into THORChain than just holding two assets, RUNE and ASSET, in your wallet. Protection is always recorded and applied symmetrically to both assets after the deposit is rebalanced to 50/50. Impermanent Loss Protection can also be thought of as deposit protection compared to holding both assets. Minimum withdrawal value will be the same as if you held both assets.

NOTE: The coverage will reset every time you add liquidity to the same pool and withdrawal fees will affect the withdrawal amount. Partial withdrawals doesn’t reset the ILP counter.

➜ [THORChain and Impermanent Loss](https://thorchain.medium.com/thorchains-immunity-to-impermanent-loss-8265a59066a4)

➜ [Impermanent Loss Protection Explained](https://youtu.be/yce7OJ\_z57g)

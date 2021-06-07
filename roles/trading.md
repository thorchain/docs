---
description: Balancing pools to exploit price deltas between markets.
---

# Traders

Prices on THORChain are maintained by profit-seeking traders. Traders find assets that are mispriced between markets. They buy assets on markets with low prices and sell them on markets with high prices. This earns them a profit.

Traders compare the exchange rates on THORChain with the rates on external markets. If they find the price is lower on THORChain they can buy there and sell on an external market. If they find the price is lower on external markets they can buy there and sell on THORChain. This process is repeated at high-frequency. Over time, price information propagates and THORChain settles with external markets.

This is how THORChain avoids the need for oracles and how prices are set. To learn more, see [Prices](https://).

## How it Works

### Process

A swap takes place in the MATIC/RUNE pool, as described in [Prices](../how-it-works/prices.md#getting-prices-for-a-single-pool). This leaves the pool unbalanced. The ratio on THORChain is 20:1 MATIC:RUNE, but is 16:1 on external markets. This means that RUNE is overvalued on THORChain.

Traders can now buy cheap RUNE on external markets and sell it for a profit on THORChain. To do so, they swap RUNE into the pool and get MATIC out. They sell this MATIC on external markets and make a profit.

The economics of the [swap formula](../roles/swapping.md#calculating-swap-output) mean that traders should not aim to restore balance to the pool in a single trade. Rebalancing should be done incrementally. If larger rebalancing trades are attempted, arbitrage may not be profitable for traders.

Specifically, each rebalancing trade should be 40–50% the imbalance size. So if the imbalance starts at $100 in value, the first rebalancing trade should be between $40–50. This will leave the imbalance at $50–60. The next rebalance should be $25–30. This process repeats until a satisfactory balance is restored.

{% hint style="info" %}
This hierarchical cascade of rebalancing trades will create arbitrage opportunities for traders big and small.
{% endhint %}

### Impact of Liquidity

Trading profits are impacted by liquidity on THORChain and on external markets. As an example, if the price of the asset in a THORChain pool is $1.20, but the same asset on an external market is $1.00, then someone can buy off that external market and sell into the THORChain pool for profit.

#### Infinitely Deep Liquidity

If both markets are infinitely deep, then the following will occur:

* Buy on External Market for $1.00, no price slip.
* Sell on THORChain for $1.20, no price slip.
* **Total Profit: 20%**

The trader can then continue to arbitrage for a profit of 20% continuously.

#### Finite, but Uneven Liquidity

If both markets have finite liquidity, but one is much deeper than the other, then the one of the markets will slip in price after the trade. However, the trader will experience a price that is roughly the average of the price before and after the trade:

* Buy on External Market for $1.00, no price slip.
* Sell on THORChain for $1.20, realised price of $1.10, price slip to $1.00.
* **Total Profit: 10%**

After the trade, there is no more price differential, but the trader made 10% in profit. The trader has made the pool price equal to the secondary market. They have transferred price information from one market to another.

#### Low Liquidity

If both markets have low liquidity, then the trader is attempting to make trades that slip each market towards each other:

* Buy on External Market for $1.00, realised price of $1.05, price slip to $1.10.
* Sell on THORChain for $1.20, realised price of $1.15, price slip to $1.10.
* **Total Profit: &gt;10%**

The market now has no more price differential. The trader has made each market equal to each other.

## Compensation, Requirements, Costs & Penalties

THORChain does not offer explicit incentives to traders – it does not reward or punish them. Trading profits are determined by the capacity of traders to seek out and capitalise on price differentials between THORChain and external markets.

The majority of arbitrage opportunities will be exercised by software bots. These are under development by 3rd party entities and will be released in due time. They will be open-source and available for anybody to run.


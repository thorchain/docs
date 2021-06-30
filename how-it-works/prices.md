---
description: Decentralised exchanges need accurate prices for users to swap between assets.
---

# Prices

THORChain keeps exchange rates accurate using its pool design and external arbitrageurs. It does this without fragile external sources like oracles and weighted averages.

## Converging to Reference Prices

This pool has 16,000 MATIC in it and 1,000 RUNE. The price of MATIC on external exchanges is $0.02. The price of RUNE on external exchanges is $0.32. The ratio of MATIC to RUNE in the pool is 16:1, and accurately reflects how the world values the two assets.

When a user swaps some MATIC for RUNE. They swap in 2,000 MATIC. Here are those numbers plugged into the swap formula:

$$
{{2000 * 1000 * 16000}\over{(2000 + 16000) ^ 2}} = 98.76
$$

This swapper takes 98.76 RUNE out of the pool. Now the pool has 18,000 MATIC and 901.24 RUNE. This is a ratio of roughly 20:1. But the ratio according to the wider market is still 16:1. This means that swapping MATIC for RUNE on THORChain right now will not be economically rational, since swapping now would yield less RUNE than if swapping on an external exchange. But arbitrageurs will quickly fix the issue with their bots.

Arbitrage bots fix the situation by swapping RUNE for MATIC. When they do this they get MATIC at a lower cost, and can sell it on external markets for a profit. As the amount of RUNE in the pool increases and MATIC decreases, restoring the ratio to 16:1. This reflects the externally-accepted price for the 2 assets.

{% hint style="info" %}
In reality, arbitrageurs don't fix the imbalance in one single transaction. This wouldn't be economical. They split the arbitrage swaps into smaller and smaller transactions. This keeps their activity profitable. See [Trading](../roles/trading.md) for more.
{% endhint %}

## Getting the Prices for Any Asset

THORChain is also able to determine how much any asset is worth in any other asset simply by using pool balances. 

In an example the MATIC:RUNE pool has 16,000 MATIC and 1,000 RUNE. The TUSD:RUNE has 3,300 TUSD and 10,000 RUNE. Based on this information alone, THORChain can know what 1 MATIC is worth in TUSD.  
‌  
Here's the formula to work out the MATIC price \($/MATIC\):

$$
{{TUSD in Pool 2} \over {RUNE in Pool 2}} * {{RUNE in Pool 1} \over {MATIC in Pool 1}}
$$

Here's that formula with the actual numbers from the pool input:

$$
{{3300 \over 10000} * {1000 \over 16000}} = 0.021
$$

This information is available within the THORChain network. It doesn't rely on direct external price sources - it works through arbitrageurs and simple market forces.

Here is the formula for working out the exchange rate between any 2 external assets:‌

$$
{{Asset In Pool 1} \over {RUNE in Pool 1}} * {{RUNE In Pool 2} \over {Asset In Pool 2}}
$$

## Advantage Over Alternative Reference Price Designs

THORChain's reference price model differs to other decentralised exchanges. Other exchanges use external oracles and weighted averages to set their prices. This has proven problematic as these external sources become attack vectors.‌

These external sources are problematic because people can manipulate them. Technical and ecosystem factors can also affect them. For example, the network underlying oracles can become congested and affect their performance. Weighted averages are better than taking direct price references, but large actors can still manipulate them.‌

THORChain is able to sense both the instantaneous price of an asset, as well as its purchasing power \(how much would the asset purchase of another asset if it was instantly sold\). The latter is important when it comes to collaterising debt, because the spot price is irrelevent - the purchasing power is needed. 


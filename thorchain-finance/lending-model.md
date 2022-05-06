---
description: >-
  How THORChain enables users to borrow from the system using collateral and pay
  a fixed interest rate.
---

# THORFI

### Overview

THORFi is stable coin, lending and savings mechnisum build on top of the existing THORChain protocol. See the THORFI design [here](https://gitlab.com/thorchain/thornode/-/issues/1255).&#x20;

### THORFI Resources:

[THORFi Design Walk Through Article](https://crypto-university.medium.com/introduction-to-thorfinance-thorfi-7012d826833e) - LP University

[THORFi Overview Video](https://youtu.be/qb7NxAbP97U) - GrassRoots Cryoto

[THORFI Effects on RUNE Supply](https://www.youtube.com/watch?v=1FNrFIXp1xQ) Video - Chad Barraford

### FAQs

#### **How do derived assets keep their peg, especially if the virtual depth drops significantly and increases slip?**

THORChain only has one obligation with a user holding a derived asset like THOR.USD - that it will mint $1.00 in RUNE if 1.00 USD is burnt - at small qty. for numbers, 1.00 USD burnt in a pool of $10k would be 0.9999c. $1k in $10m is $999.90. Etc. Nothing will break this relationship. An impatient user will do larger swaps and pay higher fees - but they voluntarily choose this. Their option is smaller swaps and allow time for them to slow their panic. An arber will do large enough swaps to beat other arbers; in perfect competition their costs approach their profits - fees which they pay LPs. This is why slip-based model is the best model to allow passive LPs to share in active market opportunities.

Additionally, the user or arber is not interested in holding $1.00 in RUNE, they wish to swap to $1.00 in a non-rune asset - perhaps another stable. For THOR.BTC this asset would be L1 BTC. Here another slip-fee is paid. For USD since they have a choice of the median bucket, they will swap to the cheapest stable in the bucket, arbing that stable back to the $1.00 peg; as they collect a discount in the process.

But regardless, the L1 pool(s) is what transmits the price of RUNE in the first place - what $1.00 is for USD or what 1.00₿ is - so the user is always working against a perfect peg in the slip model - they choose what fee they pay.

The majority of volume will be arbers - who will be much more shrewd and will operate closer to precise numbers. Likely they will arb the median basket and keep all the stables within 4 9’s each other.

So internally- you will never see the peg break on THORChain

#### What if derived assets trade on external markets?&#x20;

There could be a time in the future that THORFi assets are more liquid elsewhere. Since it takes a while to transmit information between two markets- users may see peg dislocations but this is the fault of the external market, and not how THORChain operates. Naturally arbers will bring the markets back in line since THORChain’s 1.00 = $1.00 on chain guarantee.

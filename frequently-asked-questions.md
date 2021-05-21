---
description: Some frequently asked questions
---

# Frequently Asked Questions

**Why use BFT Tendermint?**  
THORChain uses Tendermint which is a classical BFT algorithm. 2/3 of the validators need to agree and the network values safety. The chain has instant finality and this is needed to secure cross-chain bridges.

**Why does RUNE need to be the settlement asset in every pool?**  
If each pool is comprised of two assets eg. BTC:ETH then there will be a scaling problem with n\*\(n-1\)/2 possible connections.By having RUNE one side of each pool, $RUNE becomes a settlement currency allowing swaps between any two other asset. Additionally, having $RUNE in a pool ensures that the network can become aware of the value of assets it is securing.

**Why use 1-way state pegs instead of atomic swaps or 2-way asset pegs?**  
Simply put, Cross-chain bridges are a better solution than Atomic Swaps. Atomic Swaps involve a complex process of signing cryptographic keys between two parties that require interactivity. You also need a counter-party on all trades. Cross-chain bridges, coupled with continuous liquidity pools means you don't need a counter-party, and swaps can happen in less than a second.

1-way state pegs are better than 2-way asset pegs because assets don't need to be wrapped or pegged. Instead of having IOU tokens, real assets can be used instead.

**Is there be a lockup for adding liquidity?**  
There is no minimum or maximum time or amount. Join and leave whenever you wish.

**What is the monetary policy?**  
To goal is to have a fixed supply at all times.

Instead of constantly emitting \(infinite supply like Cosmos or Ethereum\) or reducing the emission down to zero \(Bitcoin\) the network elects to match emissions to the difference between current circulating supply and the max supply, as well as burning fees. This means there is 500 million progressively emitted to nodes for security and liquidity over time.

**Does THORChain need external sources for price feeds, like oracles or weighted averages?** 

No. THORChain depends on its continuous liquidity pool design and arbitrageurs to set prices. When pools become imbalanced, arbitrage bots trade to rebalance them. THORChain knows the exchange rates between external asset pairs because RUNE binds all pools together. See [Prices](how-it-works/prices.md).


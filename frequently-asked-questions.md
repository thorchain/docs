---
description: Some frequently asked questions
---

# Frequently Asked Questions

**Why use BFT tendermint?**  
THORChain uses tendermint which is a classical BFT algorithm. 2/3 of the validators need to agree and the network values safety. The chain has instant finality and this is needed to secure cross-chain bridges.

**Why does RUNE need to be the settlement asset in every pool?**  
If each pool is comprised of two assets eg. BTC:ETH then there will be a scaling problem with n\*\(n-1\)/2 possible connections.By having RUNE one side of each pool, $RUNE becomes a settlement currency allowing swaps between any two other asset. Additionally, having $RUNE in a pool ensures that the network can become aware of the value of assets it is securing.

**Why use 1-way state pegs instead of atomic swaps or 2-way asset pegs?**  
Simply put, Cross-chain bridges are a better solution than Atomic Swaps. Atomic Swaps involve a complex 6-8 process of signing cryptographic keys between two parties that require interactivity. You also need a counter-party on all trades. Cross-chain bridges, coupled with continuous liquidity pools means you don't need a counter-party, and swaps can happen in less than a second.

1-way state pegs are better than 2-way asset pegs because assets don't need to be wrapped or pegged. Instead of having IOU tokens, real assets can be used instead.

**Will there be a pool with stablecoin?**  
There will be a USDr pool, which will be connect with many different USD stablecoins, derisking them all and allowing traders to arbitrage the price to exactly $1. USDr will use collateralised debt positions in a novel way with the existing continuous liquidity pools so that it is liquid and safe.

**Will there be a lockup for staking the tokens?**  
There is no minimum or maximum time or amount. Join and leave whenever you wish.

**What is the monetary policy?**  
To goal is to have a fixed supply at all times.

Instead of constantly emitting \(infinite supply like Cosmos or Ethereum\) or reducing the emission down to zero \(Bitcoin\) the team elect to match emissions to the difference between current circulating supply and the max supply, as well as burning fees. This means there is 500million progressively emitted to nodes for security and liquidity over time.

**Is the team profit oriented?**  
No - not profit orientated. All fees go back to users. There is no revenue model for the team via the protocol. All swap fees go to liquidity providers, all protocol fees are burned, emissions/block rewards go to validators. The team are incentivised through holding the same RUNE as everyone else.

**What is the average rate of return that users can expect when staking in pools?**  
In the high risk pools, upwards of 10% and in the low risk, deep liquidity pools like BNB & BTC expect 3%-8%.

**Is Asgard Wallet built by THORChain or a third-party?**Asgard Wallet is developed by the THORChain core team. See the codebase on [GitLab](https://gitlab.com/thorchain/asgard-wallet).

**Does THORChain need external sources for price feeds, like oracles or weighted averages?** No. THORChain depends on its continuous liquidity pool design and arbitrageurs to set prices. When pools become imbalanced, arbitrage bots trade to rebalance them. THORChain knows the exchange rates between external asset pairs because RUNE binds all pools together. See [Prices](how-it-works/prices.md).


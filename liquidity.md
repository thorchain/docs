---
description: THORChain's slip-based fees, streaming swaps, and how arbitrage protects against MEV and sandwich attacks
---

# Liquidity

## Introduction

Most traditional exchanges (e.g., Binance or Coinbase) operate using an order book – buyers and sellers place their offers, and the system matches them. THORChain works differently: instead of an order book, it uses Continuous Liquidity Pools (CLP).

What does this mean in practice?

- Each token pair (e.g., BTC-RUNE) has a shared capital pool
- Users can swap one token for another at any time at a price determined by the ratio of assets in the pool
- This ensures that liquidity is always available, and swaps occur without intermediaries or centralized price oracles
- Pool prices are additionally "maintained" by arbitrageurs to keep them aligned with external markets

## Slip-based Fees – liquidity-dependent fees

A slip-based fee is a transaction fee model tied to the size of a swap relative to pool depth.
Simply put: the larger the transaction relative to available liquidity, the higher the slip (price impact within the pool during the swap), and therefore the higher the fee paid to liquidity providers.

This mechanism ensures that the fee corresponds to the demand for pool capital:

- Large trades pay more
- Small trades pay less

As a result:

- The protocol penalizes impatient traders who execute large, sudden swaps
- Liquidity providers are rewarded for making their capital available
- Users who insist on forcing massive instant swaps cause high slip and pay significant fees to the pool

Meanwhile, smaller or gradual swaps create minimal slip, leading to lower fees – in extreme cases, with little demand, slip fees approach zero, allowing swaps to occur almost at market price without extra cost.

### How does it work?

Every swap in THORChain changes the ratio of assets in the pool. The larger the swap relative to pool depth, the greater the price movement (slip). Slip generates a fee that goes directly to liquidity providers (LPs).

- Small transactions – barely move the price → negligible slip → minimal fee
- Large transactions – significantly move the price → high slip → high fee

### Why is this important?

- Protects against price manipulation – sudden large price moves cost attackers heavily
- Forces traders to choose between:
  - Speed (one large swap at once, with a high fee)
  - Better price (many smaller swaps, slower, but cheaper)
- Pool prices gain natural inertia – they cannot be easily manipulated in one move

### Example 1: Small Swap

- BTC-RUNE pool: 1,000 BTC and equivalent RUNE
- User swaps 0.1 BTC → only 0.01% of the pool
- Price barely changes, slip fee ≈ 0, symbolic fee

### Example 2: Large Swap

- Same pool
- User swaps 100 BTC → 10% of the pool
- Price in the pool drops significantly, slip fee amounts to several percent of trade value

## Streaming Swaps – time-sliced swaps

Streaming Swaps is a THORChain mechanism that allows users to split a large swap into a series of smaller transactions (sub-swaps), executed sequentially at defined intervals.

This feature was introduced to help users optimize pricing – performing swaps with minimal slip – without manually breaking orders into smaller chunks.

Normally, a single large swap leads to high slip fees, while splitting it manually would mean paying multiple network fees (inbound/outbound fees for each part).

Streaming Swaps solve this by letting users control the swap's timeframe: one deposit internally creates many sub-swaps without additional L1 network fees beyond those of a single swap.

### The Problem

When a user wants to swap a large amount (e.g., 1,000 ETH), a one-off swap causes:

- Huge slip
- Very high fees

Manually splitting into 100 smaller trades would require 100× network fees – uneconomical.

### The Solution: Streaming Swaps

THORChain automatically splits a large swap into smaller sub-swaps executed one after another at set intervals. This works similarly to the TWAP (Time-Weighted Average Price) strategy.

### Why is this better?

- Slip on each part is minimal
- Total slip fees can drop from several percent to ~0.1% (or whatever minimum slip set by the protocol)
- User pays only one network fee, not per sub-swap
- Arbitrageurs between sub-swaps rebalance the pool, improving execution prices for later parts

### Example

- Swap: 1,000 ETH → BTC.
- Option A: one-off → slip fee ~5% (50 ETH cost).
- Option B: Streaming Swap – 100 sub-swaps of 10 ETH each, every minute.
- Slip per sub-swap ≈ 0.05%.
- Total slip fee ≈ 0.5 ETH instead of 50 ETH.
- User can also set a price limit (e.g., min. 0.09 BTC per ETH). If the price falls below, unexecuted sub-swaps are refunded.
- Result: cheaper, safer, automated.

## Arbitrage – balancing pool prices

Unlike many DeFi systems, THORChain does not rely on price oracles – instead, it depends on market forces. Pool prices are maintained by profit-seeking arbitrageurs.

### Why is arbitrage needed?

THORChain pools derive prices solely from asset ratios. This can sometimes create gaps compared to external markets.

### How arbitrage works

- If a token in a pool is undervalued, an arbitrageur buys it from the pool and sells it on the external market for profit.
- If a token in a pool is overvalued, an arbitrageur sells it into the pool and buys it cheaper externally.
- Repeated arbitrage trades propagate price information between THORChain and external markets until equilibrium is reached. This removes the need for centralized oracles – arbitrage continuously adjusts pool prices.

### Arbitrage Example

- ETH-RUNE pool: 1 ETH = 100 RUNE.
- On Binance: 1 ETH = 110 RUNE.
- Arbitrageur buys ETH in the pool for 100 RUNE, sells it on Binance for 110 RUNE → profit 10 RUNE.
- Pool price shifts upward.

Thanks to arbitrage, THORChain pool prices always reflect real market values.

## Protection against MEV and sandwich attacks

THORChain is designed with built-in protection against common DEX vulnerabilities such as MEV (Maximal Extractable Value) – the manipulation of transaction ordering within blocks by privileged actors (validators or bots) to extract profit.

Examples of MEV attacks include:

- **Front-running** – inserting one's own trade right before a victim's large transaction to profit from price movement.
- **Sandwich attack** – placing two trades around a victim's swap (one before, one after) to profit from the induced price change.

### THORChain solutions

- **Swap Queue** – transactions are finalized and sorted deterministically by impact on price (slip fee).
  - Large swaps are executed before small ones.
  - A bot cannot front-run a large trader with a symbolic transaction.
- **Slip-based fee** – attempting to front-run requires a large transaction, which itself incurs massive slip fees, destroying profitability.
- **Streaming Swaps** – large trades are broken into many smaller ones. A bot would need to front-run each part separately (impractical), while arbitrageurs rebalance between sub-swaps.

### MEV Protection Example

- A user submits a large ETH → BTC swap.
- A bot tries to front-run with a small trade.
- THORChain sorts swaps by slip fee: large swap goes first.
- The bot is executed after and gains nothing.

**MEV attacks on THORChain are unprofitable or outright impossible.**

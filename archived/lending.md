---
description: "[DEPRECATED] THORFi Lending within THORChain"
---

# Lending (Deprecated)

{% hint style="danger" %}
**DEPRECATED FEATURE**: Lending has been permanently deprecated as of January 4, 2025. This feature is no longer available on THORChain. This documentation is preserved for historical reference only.

See the [THORFi Unwind announcement](https://medium.com/thorchain/thorfi-unwind-96b46dff72c0) for more information.
{% endhint %}

## Overview

Lending allowed users to deposit native collateral, and then create a debt at a collateralization ratio (CR). The debt was always denominated in USD (aka `TOR`), regardless of what L1 asset the user received.

All loans had 0% interest, no liquidations, and no expiration. Since ADR 012 was implemented in Feb-2024, a flat 200% CR (or 50% Loan-to-Value, LTV) was implemented. Risk was mitigated by:

* Limits on collateral for the network and each pool
* Slip-based fees when opening and closing loans
* A circuit breaker on RUNE total supply

Lending allowed users to:

* Create a loan using native assets as collateral
* Hold a loan without the risk of liquidation
* Be short on USD and long on crypto assets such as Bitcoin

Lending benefited the protocol by:

* Increased capital efficiency of the pools which increased system income and real yield
* Increased trading volume
* Increased total bonded, allowing THORChain to scale
* Providing an attractive sink for capital

{% hint style="success" %}
[ADR 011: THORFi Lending Feature](https://dev.thorchain.org/architecture/adr-011-lending.html) with full Lending details was released and approved by Node Operators.
{% endhint %}

{% hint style="success" %}
[ADR 012: THORFi Lending Scaling](https://dev.thorchain.org/architecture/adr-012-scale-lending.html) - setting CR to flat 200%, and burning Standby Reserve to increase collateral cap.
{% endhint %}

## Lending Fundamentals

### Derived Assets and Pools

Derived assets, such as `thor.btc` and`thor.tor`, were algorithmic coins that were backed by the liquidity of RUNE, and the liquidity of that was based on the RUNE-ASSET pair. Derived assets were swapped from or swapped to L1 assets, via RUNE, using derived asset pools that were based on the equivalent L1 pools. Unlike Synthetic Assets, derived assets were independent of Liquidity Pools and all swap fees were burnt. Derived assets were for accounting and there were no plans for them to be exportable or held by users.

### TOR Explained

TOR (`thor.tor`) was a non-transferable unit of account within THORChain designed to match the value of $1 USD and had been in use since [ADR 003](https://dev.thorchain.org/architecture/adr-003-flooredoutboundfee.html). It could not be exported anywhere and always had a market cap of $0. TOR was valued by taking the median price of the active USD pools.

All collateral, debt and repayments within Lending were converted to and accounted for in TOR. To understand TOR in depth, go to the dedicated [TOR section](../thorchain-finance/tor.md).

### Open Loan Flow

The user provided Bitcoin collateral and could receive the debt in any asset however it was all accounted for in TOR.

1. The user sent in collateral (BTC.BTC -> RUNE, RUNE -> THOR.BTC)
2. THOR.BTC was held as collateral in the Lending module
3. Convert THOR.BTC value to TOR terms
4. Calculate debt in TOR based on CR and collateral TOR value
5. Mint TOR
6. TOR -> RUNE, RUNE -> L1 out (e.g. - ETH)

### Loan Repayment / Close Flow

Users could repay loans at any time, with any amount in any asset. Repayment was converted into TOR.

1. L1 -> RUNE (optional, user could also pay back with RUNE)
2. RUNE -> Mint TOR
3. Burn TOR (amount deducted from loan debt)
4. Burn Derived Asset (THOR.BTC) (amount was the same percentage of collateral as a percentage of loan debt paid) -> Mint RUNE
5. RUNE -> BTC.BTC (loan originator)

{% hint style="success" %}
Collateral was not returned until the loan was fully repaid. The user always had the right to have their returned collateral if they repaid the loan.
{% endhint %}

## Historical Resources

### FAQs

* [General Lending FAQs](lending-faq.md)

### Explainer Articles

* [Lending 101 by LP University](https://crypto-university.medium.com/under-the-hood-lending-101-f934e1c22792)

### Explainer Videos

* [How Lending Works by GrassRoots Crypto](https://youtu.be/AaqHG00RJks)
* [Lending with Numbers by GrassRoots Crypto](https://youtu.be/PVpYU5kCOHI)
* [Lending Risks & Concerns by GrassRoots Crypto](https://www.youtube.com/watch?v=glY_RVYdsfM)

### Dashboard

* [Lending Health Dashboard by NineRealms](https://dashboards.ninerealms.com/#lending)
* [Lending Dashboard by banbannard](https://flipsidecrypto.xyz/banbannard/thorchain-lending-fOAKej)

### Design Documents

* [ADR 011: THORFi Lending Feature](https://dev.thorchain.org/architecture/adr-011-lending.html)
* [ADR 012: THORFi Lending Scaling](https://dev.thorchain.org/architecture/adr-012-scale-lending.html)
* [Original Design](https://gitlab.com/thorchain/thornode/-/issues/1412)
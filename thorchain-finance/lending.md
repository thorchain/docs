---
description: THORFi Lending within THORChain
---

# Lending

## Overview

Lending allows users to deposit native collateral, and then create a debt at a collateralization ratio (CR). The debt is always denominated in USD (aka `TOR`), regardless of what L1 asset the user receives.

All loans have 0% interest, no liquidations, and no expiration. Since ADR 012 was implemented in Feb-2024, a flat 200% CR (or 50% Loan-to-Value, LTV) was implemented. Risk [is mitigated](lending.md#lending-controls) by:

- Limits on collateral for the network and each pool
- Slip-based fees when opening and closing loans
- A circuit breaker on RUNE total supply

Lending allows users to:

- Create a loan using native assets as collateral
- Hold a loan without the risk of liquidation
- Be short on USD and long on crypto assets such as Bitcoin

Lending benefits the protocol by:

- Increased capital efficiency of the pools which increases system income and real yield.
- Increased trading volume
- Increased total bonded, allowing THORChain to scale.
- Providing an attractive sink for capital

{% hint style="success" %}
[ADR 011: THORFi Lending Feature](https://dev.thorchain.org/architecture/adr-011-lending.html) with full Lending details was released and approved by Node Operators.
{% endhint %}

{% hint style="success" %}
[ADR 012: THORFi Lending Scaling](https://dev.thorchain.org/architecture/adr-012-scale-lending.html) - setting CR to flat 200%, and burning Standby Reserve to increase collateral cap.
{% endhint %}

{% hint style="warning" %}
Collateral will be restricted to BTC and ETH only on launch.\
The Minimum Loan Term will be 30 days on launch.
{% endhint %}

## Lending Fundamentals

### Derived Assets and Pools

Derived assets, such as `thor.btc` and`thor.tor`, are algorithmic coins that are backed by the liquidity of RUNE, and the liquidity of that is based on the RUNE-ASSET pair. Derived assets are swapped from or swap to L1 assets, via RUNE, using [derived asset pools](lending.md#derived-pool-depth) that are based on the equivalent L1 pools. Unlike, Synthetic Assets, derived assets are independent of Liquidity Pools and all swap fees are burnt. Derived assets are for accounting and there are no plans for them to be exportable or held by users.

### TOR Explained

TOR (`thor.tor`) is a non-transferable unit of account within THORChain designed to match the value of $1 USD and has been in use since [ADR 003](https://dev.thorchain.org/architecture/adr-003-flooredoutboundfee.html). It cannot be exported anywhere and always has a market cap of $0. TOR is valued by taking the median price of the active USD pools.

All collateral, debt and repayments within Lending are converted to and accounted for in TOR. To understand TOR in depth, go to the dedicated [TOR section](tor.md).

### Open Loan Flow

The user provides Bitcoin collateral and can receive the debt in any asset however it is all accounted for in TOR.

1. The user sends in collateral (BTC.BTC -> RUNE, RUNE -> THOR.BTC)
2. THOR.BTC is held as collateral in the Lending module
3. Convert THOR.BTC value to TOR terms
4. Calculate debt in TOR based on CR and collateral TOR value
5. Mint TOR
6. TOR -> RUNE, RUNE -> L1 out (e.g. - ETH)

### Loan Repayment / CloseFlow

Users can repay loans at any time, with any amount in any asset. Repayment is converted into TOR.

1. L1 -> RUNE (optional, user can also pay back with RUNE)
2. RUNE -> Mint TOR
3. Burn TOR (amount deducted from loan debt)
4. Burn Derived Asset (THOR.BTC) (amount is the same percentage of collateral as a percentage of loan debt paid) -> Mint RUNE
5. RUNE -> BTC.BTC (loan originator)

{% hint style="success" %}
Collateral is not returned until the loan is fully repaid. The user will always have the right to have their returned collateral if they repay the loan.
{% endhint %}

## Derived Pool Depth

Derived pools are created for each derived asset, including TOR, to allow swapping between L1 assets and derived assets va RUNE. Their depths expand and contract to throttle the amount of slippage users pay when swapping from an L1 asset to a derived asset. In periods of volatility, pool depth contracts to increase the slippage on swaps during this period of time. This incentivises users to wait for a period of lower volatility to exit/enter lending and protects the system against pool manipulation.

The TOR pool is a derived asset pool and operates the same as other derived asset pools except the TOR price comes from the medium of the four pools instead of one L1 Asset Pool.

The `totalRuneDepth` is the sum of all RUNE in anchor pools (i.e. - USDC, USDT, BUSD-BD1 for TOR or just BTC.BTC for the L1)

| Element              | Description                                            |
| -------------------- | ------------------------------------------------------ |
| MaxAnchorBlocks      | Protocol Setting, blocks to accumulate slip            |
| DerivedMinDepth      | Protocol Setting, Min derived pool depth               |
| DerivedDepthBasisPts | Protocol Setting, increase/decrease derived pool depth |
| MaxAnchorSlip        | Protocol Setting, Max allowed slip on derived pool     |

$$
totalSlip = {\sum_{\substack{i=block}}^{\text{maxAnchorBlocks}}}{poolSlip(i)}
$$

$$
minRuneDepth = \frac{derivedMinDepth}{10,000} * totalRuneDepth
$$

$$
startRuneDepth = \frac{derivedDepthBasisPts}{10,000} * totalRuneDepth
$$

Update RUNE depth to constrict based on slip:

$$
newRuneDepth = \frac{maxAnchorSlip - totalSlip}{maxAnchorSlip} * totalRuneDepth
$$

$$
finalRuneDepth = MAX({minRuneDepth, newRuneDepth})
$$

{% hint style="info" %}
Derived Asset Pool depth ranges from `derivedMinDepth` (10%) to 100% of L1 asset but is reduced by `totalSlip`. The target is 90%-100%.
{% endhint %}

{% hint style="info" %}
Derived Asset Pools spawn as required within a block and derived asset swaps are processed after all L1 swaps within the swap queue.
{% endhint %}

### Impact of Derived Pool Depth on Slippage

The depth of the derived pool will fluctuate depending on the amount of the trading volume within a time window determined by the variable [`maxAnchorSlip`](https://thornode.ninerealms.com/thorchain/mimir), currently about 15 hours. This will reduce the output of swaps from derived pools compared to L1 pools. The [Pools](https://thornode.ninerealms.com/thorchain/pools) API endpoint contains '`derived_depth_bps`' which shows the derived pool depth relative to the L1 pool depth. For example, '`derived_depth_bps:9091`' this means the pool is 90.91% depth of the L1 Bitcoin pool. To quantify the impact this has to swaps across the derived pool, you first need to calculate the derived pool's RUNE depth using the following formula:

$$
derivedPoolRuneDepth = \frac{r \times \text{health}_R \times \text{health}_a} {( r + \text{health}_R )^2}
$$

Where `r` is the RUNE depth of the pool and `health` is `derived_depth_bps.`

Next, multiply `derivedPoolRuneDepth` by [`assetPrice`](https://midgard.ninerealms.com/v2/pools) (the ratio of RUNE to Asset) to determine the `derivedPoolAssetDepth`.

$$
derivedPoolAssetDepth = derivedPoolRuneDepth \times \frac{RuneDepth} {AssetDepth}
$$

The `derivedPoolRuneDepth` and `derivedPoolAssetDepth` can then be used to calculate the swap output for the derived pool.

The difference between the swap outputs of the derived and L1 pools quantifies the reduction due to the variable depth of the derived pool.

## Lending Controls

### Collateral Limits

Lending is capped by limited the collateral that can be received by the protocol. The `lendingLever`throttles the amount of RUNE available for lending, in basis points.

$$
runeBurnt= {maxRuneSupply - currentRuneSupply}
$$

{% hint style="info" %}
Current Rune Supply is RUNE Circulating Supply.
{% endhint %}

$$
totalAvailableRuneForProtocol = \frac{ lendingLever}{10,000} *runeBurnt
$$

`totalAvailableRuneForProtocol` is distributed among pools available for lending based on their RUNE depth. For each lending pool, the `totalAvailableRuneForPool` (`tarfp`) is:

$$
tarfp = \frac{ poolRuneDepth } {totalRuneDepthofLendingPools} * {totalAvailableRuneForProtocol}
$$

`totalAvailableAssetForPool` is converted from RUNE to Asset value. This imposes a collateral holding limit for each pool, a new loan cannot be opened if the new gross collateral exceeds this amount.

### Collateralization Ratio

{% hint style="success" %}
Since Feb-2024, a flat CR of 200% has been implemented by setting both MinCR and MaxCR to 200%.
{% endhint %}

A dynamic CR increases as loans are opened within a pool and reduces as loans are repaid.

| Element | Description                                   |
| ------- | --------------------------------------------- |
| a       | Current pool collateral + new loan collateral |
| b       | TotalAvailableAssetForPool                    |
| MinCR   | Ratio in basis points, (LTV = 1/CR)           |
| MaxCR   | Basis points, protocol setting                |

$$
CR = \frac{a}{b} * {(maxCR - minCR) + minCR}
$$

### Debt

Debt is calculated based on the collateral provided and the CR of the pool.

| Element              | Description             |
| -------------------- | ----------------------- |
| CollateralValueInTOR | Collateral Value in TOR |
| CR                   | Collateralization ratio |

$$
debt = CollateralValueInTOR * \frac{10,000}{CR}
$$

The TOR debt is swapped to the requested L1 asset and then sent to the user, slip fees apply.

### Loan Repayment Maturity

The protocol setting `loanRepaymentMaturity` defines the number of blocks before a loan can be repaid/closed. There is no option for repayment before this period.

### Loan Streaming Quantity Calculation

[Streaming swaps](https://dev.thorchain.org/swap-guide/streaming-swaps.html) are enabled on Lending; however, the number of streaming sub-swaps is subject to the maximum loan streaming quantity which determined by the health of the system. The loan streaming quantity (`MaxLoanStreamingQty`) is calculated based on the health of the system, represented by the ratio of [derived depth](lending.md#derived-pool-depth) to real depth (`x`).

$$
x = health (derivedDepth / realDepth)
$$

The formula to calculate `MaxLoanStreamingQty` is as follows:

$$
MaxLoanStreamingQty = \text{FLOOR}\left(\frac{1}{(1-x)}\right)
$$

This gives the following effect:

- **100%:** Infinite
- **99.99%:** 10,000
- **99.9%:** 1,000
- **99%:** 100
- **98%:** 50
- **95%:** 20 (20 streams means a $1m loan is 50BPS)
- **90%:** 10
- **80%:** 5
- **70%:** 3
- **60%:** 2
- **50%:** 2
- **0-50%:** 1 (e.g., no streaming)

This limits the streaming swap for Lending for open and closing loans during highly volatile times.

Loan Streaming Swap Interveral is set to 1 via [`LoanStreamingSwapsInterval` Mimir.](https://dev.thorchain.org/mimir.html#lending)

## Concerns + Considerations

Opening new loans creates a deflationary effect on the $RUNE asset, whereas closing loans creates an inflationary effect on $RUNE.

If the value of $RUNE relative to $BTC is the same when the loan is opened and closed, there is no net inflationary effect on $RUNE (same amount burned as minted minus the swap fee). However, if the value of the collateral asset increases relative to $RUNE between the time the loan is opened and closed, there will be net inflation of $RUNE supply.

Lending controls are in place to address these concerns.

### Summary of Largest Risks

Block Science reviewed the lending mechanisms exhaustively. The Output of their research includes:

- [Risk Report](https://hackmd.io/@blockscience/H1Q-erh_n)
- [Simulation Summary](https://hackmd.io/R_ksPSG0T6mtjsEE7U9q-w)
- [CadCad simulation framework](https://gitlab.com/thorchain/misc/cadcad-thorchain/-/tree/main/documentation)

## Lending Resources

### FAQs

- [General Lending FAQs](../frequently-asked-questions/lending.md#general-questions)
- [In depth FAQs](../frequently-asked-questions/lending.md#in-depth-questions)

### Explainer Article

- [Lending 101 by LP University](https://crypto-university.medium.com/under-the-hood-lending-101-f934e1c22792)

### Explainer Videos

- [How Lending Works by GrassRoots Crypto](https://youtu.be/AaqHG00RJks)
- [Lending with Numbers by GrassRoots Crypto](https://youtu.be/PVpYU5kCOHI)
- [Lending Risks & Concerns by GrassRoots Crypto](https://www.youtube.com/watch?v=glY_RVYdsfM)

### Dashboard

- [Lending Health Dashboard by NineRealms](https://dashboards.ninerealms.com/#lending)
- [Lending Dashboard by banbannard](https://flipsidecrypto.xyz/banbannard/thorchain-lending-fOAKej)

### Design Documents

- [ADR 011: THORFi Lending Feature](https://dev.thorchain.org/architecture/adr-011-lending.html)
- [ADR 012: THORFi Lending Scaling](https://dev.thorchain.org/architecture/adr-012-scale-lending.html)
- [Original Design](https://gitlab.com/thorchain/thornode/-/issues/1412)

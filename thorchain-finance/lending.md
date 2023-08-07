---
description: THORFi Lending within THORChain
---

# Lending

## Overview

Lending allows users to deposit native collateral, and then create a debt at a collateralization ratio `CR` (collateralization ratio). The debt is always denominated in USD (aka `TOR`) regardless of what L1 asset the user receives.

All loans have 0% interest, no liquidations, and no expiration. Risk [is contained](lending.md#lending-controls) by limits on collateral for each pool, slip-based fees when opening and closing loans, dynamic CR, and a circuit breaker on RUNE supply.

Lending allows users to:

* Create loans using native assets as collateral
* Hold a loan without the risk of liquidation
* Be short on USD and long on crypto assets such as Bitcoin

Lending benefits the protocol by:

* Increased capital efficiency of the pools which increases system income and real yield.
* Creating additional trading volume
* Increased total bonded, allowing THORChain to scale.
* Providing an attractive sink for capital

The original lending design is proposed [here](https://gitlab.com/thorchain/thornode/-/issues/1412).

Lending will need to be adopted by node operators before it is added to THORChain. Questions and discussions are in the #lending channel of the dev discord.

## Lending Fundamentals

#### Derived Assets and Pools

Derived assets, such as `thor.btc` and`thor.tor`, are algorithmic coins that are backed by the liquidity of RUNE, and the liquidity of that is based on the RUNE-ASSET pair. Derived Assets are swapped from or swap to L1 assets, via RUNE, using [derived asset pools](lending.md#derived-virtual-pool-depth) which are based on the equivalent L1 pools. Unlike, Synethic Assets, derived assets are independent of Liquidity Pools and all swap fees are burnt. Derived assets are for accounting and there are no plans for them to be exportable or held by users.

#### TOR Accounting

TOR (`thor.tor`) is a non-transferable unit of account within THORChain designed to match the value of $1 USD and has been in use since [ADR 003](https://gitlab.com/thorchain/thornode/-/blob/develop/docs/architecture/adr-003-flooredoutboundfee.md). It cannot be exported anywhere and always has a market cap of $0. TOR is valued by taking the median price of the active USD pools.

All collateral, debt and repayments within Lending are converted to and accounted for in TOR.

#### Open Loan Flow

The user provides Bticoin collateral and can receive the debt in any asset however it is all accounted for in TOR.

1. User sends in collateral (BTC.BTC -> Rune, Rune -> thor.btc)
2. thor.btc is held as collateral in the Lending module
3. Convert thor.btc value to TOR terms
4. Calculate debt in TOR based on CR and collateral TOR value.
5. Mint TOR,
6. TOR -> RUNE, RUNE -> L1 out (e.g. - ETH)

#### Loan Repayment / CloseFlow

Users can repay loans at any time, with any amount in any asset. Repayment is converted into TOR.

1. L1 -> RUNE (optional, user can also pay back with RUNE)
2. RUNE -> Mint TOR
3. Burn TOR (amount deducted from loan debt)
4. Burn Derived Asset (thor.btc) (amount is the same percentage of collateral as a percentage of loan debt paid) -> Mint RUNE
5. RUNE -> BTC.BTC (loan originator)

{% hint style="success" %}
Collateral is not returned until the loan is fully repaid. The user will always have the right to have their returned collateral if they repay the loan.
{% endhint %}

## Derived/Virtual Pool Depth

Derived/virtual pool are created for each derived asset, including TOR, to allow swapping between L1 assets and derived assets va RUNE. Their depths expand and contract to throttle the amount of slippage users pay when swapping from an L1 asset to a derived asset. In periods of volatility, pool depth contracts to increase the slippage on swaps during this period of time. This incentivises users to wait for a period of lower volatility to exit/enter lending and protects the system against pool manipulation.

The TOR pool is a derived asset pool and operates the same as other derived asset pools except the TOR price comes from the medium of the four pools instead of one L1 Asset Pool.

`totalRuneDepth`: Sum of all RUNE in anchor pools (i.e. - USDC, USDT, BUSD-BD1 for TOR or just BTC.BTC for the L1)

<table><thead><tr><th width="260">Element</th><th>Description</th></tr></thead><tbody><tr><td>MaxAnchorBlocks</td><td>Protocol Setting, blocks to accumulate slip</td></tr><tr><td>derivedMinDepth</td><td>Protocol Setting, Min derived pool depth</td></tr><tr><td>derivedDepthBasisPts</td><td>Protocol Setting, increase/decrease derived pool depth</td></tr><tr><td>MaxAnchorSlip</td><td>Protocol Setting, Max allowed slip on derived pool</td></tr></tbody></table>

$$
totalSlip = {\sum_{\substack{i=block}}^{\text{MaxAnchorBlocks}}}{poolSlip(i)}
$$

$$
MinRuneDepth = \frac{derivedMinDepth}{10,000} * totalRuneDepth
$$

$$
startRuneDepth = \frac{derivedDepthBasisPts}{10,000} * totalRuneDepth
$$

Update rune depth to constrict based on slip:

$$
newRuneDepth = \frac{MaxAnchorSlip - totalSlip}{MaxAnchorSlip} * totalRuneDepth
$$

$$
FinalRuneDepth = MAX({minRuneDepth, newRuneDepth})
$$

{% hint style="info" %}
Derived Asset Pool depth ranges from `derivedMinDepth`to 100% of L1 asset but is reduced by `totalSlip`. Target is 90%-100%.
{% endhint %}

{% hint style="info" %}
Derived Asset Pool spawn as required within a block and derived asset swaps are processed after all L1 swaps within the swap queue.
{% endhint %}

## Lending Controls

### Collateral Limits

Lending is capped by limited the collateral that can be received by the protocol.

`LendingLever`: throttles the amount of RUNE available for lending, in basis points.

$$
runeBurnt= {MaxRuneSupply - CurrentRuneSupply}
$$

{% hint style="info" %}
Current Rune Supply is Native RUNE Circulating Supply.
{% endhint %}

$$
totalAvailableRuneForProtocol = \frac{ LendingLever}{10,000} *runeBurnt
$$

`totalAvailableRuneForProtocol` is distributed among pools available for lending based on their RUNE depth. For each lending pool, the `totalAvailableRuneForPool` (tarfp) is:

$$
tarfp = \frac{ poolRuneDeoth } {totalRuneDepthofLendingPools} * {totalAvailableRuneForProtocol}
$$

`totalAvailableAssetForPool` is convert rune value to Asset Terms. This imposes a collateral holding limit for each pool, a new loan cannot be opened if the new gross collateral exceeds this amount.

### Collateralization Ratio

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

{% hint style="success" %}
As more loans are taken out, the collateral limits are increased and so does the CR. The higher the collateralization ratio, the safer the system becomes.
{% endhint %}

### Debt

Debt is calculated based on the collateral provided and the CR of the pool.

| Element              | Description             |
| -------------------- | ----------------------- |
| CollateralValueInTOR | Collateral Value in TOR |
| CR                   | Collateralization ratio |

$$
Debt = CollateralValueInTOR * \frac{10,000}{CR}
$$

The TOR Debt is swapped to the requested L1 asset and then sent to the user, slip fees apply.

### Loan Repayment Maturity

The protocol setting `LoanRepaymentMaturity` defines the number of blocks before a loan can be repaid/closed. There is no option for repayment before this period.

## Concerns + Considerations

Opening new loans creates a deflationary effect on the $RUNE asset, whereas closing loans creates an inflationary effect on $RUNE.

If the value of $RUNE relative to $BTC is the same when the loan is opened and closed, there is no net inflationary effect on $RUNE (same amount burned as minted minus the swap fee). However, if the value of the collateral asset increases relative to $RUNE between the time the loan is opened and closed, there will be net inflation of $RUNE supply.

Lending controls are in place to address these concerns.

## Lending Resources

* [How Lending Works by GrassRoots Crypto](https://youtu.be/AaqHG00RJks)
* [THORChain Lending Rollout Q\&A by the Community](https://youtu.be/rkq8gteNBvk)
* [Lending Walkthrough by GrassRoots Crypto](https://www.youtube.com/watch?v=2jA4DDWxAbk)
* [Lending Risks & Concerns by GrassRoots Crypto](https://www.youtube.com/watch?v=glY\_RVYdsfM)

**Documents / Spreadsheets**

* Lending Design - [https://gitlab.com/thorchain/thornode/-/issues/1412](https://gitlab.com/thorchain/thornode/-/issues/1412)
* [Lending Primer](https://docs.google.com/document/d/15TBFAvMXL1WZ92kX3Memipt78epB6opqa9xKC8uhqtg/edit) by NineRelams
* [Lending Health Dashboard](https://dashboards.ninerealms.com/#lending) by NineRelams
* [Lending Health Script](https://replit.com/@Orion9R/WIP-THORChain-LendingHealth) (Replit) by NineRelams

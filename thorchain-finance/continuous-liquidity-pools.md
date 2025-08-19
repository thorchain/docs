---
description: How THORChain facilitates continuous, incentivised liquidity.
---

# Liquidity

Instead of limit-order books, THORChain utilises [continuous liquidity pools](continuous-liquidity-pools.md#continuous-liquidity-pools) (CLP). The CLP is one of THORChain's most significant features, offering the following benefits:

* Provides “always-on” liquidity to all assets in its system.
* Allows users to trade assets at transparent, fair prices, without relying on centralised third-parties.
* Functions as source of trustless on-chain price feeds for internal and external use.
* Democratises arbitrage opportunities.
* Allows pools prices to converge to true market prices, since the fee asymptotes to zero.
* Collects fee revenue for liquidity providers in a fair way.
* Responds to fluctuating demands of liquidity.

## Benefits of the CLP Model

Assuming a working Swap Queue, the CLP Model has the following benefits:

* The fee paid asymptotes to zero as demand subsides, so price delta between the pool price and reference market price can also go to zero.
* Traders will compete for trade opportunities and pay maximally to liquidity providers.
* The fee paid for any trade is responsive to the demand for liquidity by market-takers.
* Prices inherit an "inertia" since large fast changes cause high fee revenue
* Arbitrage opportunities are democratised as there is a diminishing return to arbitrage as the price approaches parity with reference
* Traders are forced to consider the "time domain" (how impatient they want to be) for each trade.

The salient point is the last one - that a liquidity-sensitive fee penalises traders for being impatient, however traders have a [choice](continuous-liquidity-pools.md#streaming-swaps-and-swap-optimisation). This is an important quality in markets, since it allows time for market-changing information to be propagated to all market participants, rather than a narrow few having an edge.

### Slip-based Fee Model (CLP)

The Slip-based Fee Model adds liquidity-sensitive fee compared to the [XYK](continuous-liquidity-pools.md#clp-derivation)model. This ensures the fee paid is commensurate to the demand of the pool's liquidity, and is the one THORChain uses. The fee equation is shown below:

$$
fee = \frac{x^2Y}{(x+X)^2}
$$

### Streaming Swaps and Swap Optimisation

THORChain allows users to choose their preferred trade strategy:

1. Time-optimised: Get the trade done quickly, regardless of the cost.
2. Price-optimised: Get the best price possible, even if it takes longer.

The size of the swap and the desired timeframe are related. Impatient swappers who opt for a time-optimised swap will incur higher [slip fees](continuous-liquidity-pools.md#benefits-of-the-clp-model). Patient swappers achieve better prices but need to wait.

Previously, swaps were always executed as soon as possible (time-optimised), without user control. Manual optimisation of prices required breaking up swaps into smaller ones, incurring L1 inbound and outbound fees for each swap, reducing cost savings.

Streaming Swaps gives users control over the timeframe, enabling better price optimisation. Large swaps can be divided into smaller ones over specific intervals without additional L1 fees.

Streaming Swaps (Price-Optimised) is similar to a Time Weighted Average Price (TWAP) trade, limited to a 24-hour period.

Two important parts are:

1. The **interval** allows arbitrageurs enough time to rebalance the pool within the swap, ensuring capital requirements are met throughout.
2. The **count** enables the swapper to reduce the size of sub-swaps, minimising slippage for each execution.

A price-optimised swap experiences less slippage compared to a time-optimised swap, without losing capital to on-chain L1 fees.

A fully price-optimised swap can achieve a swap fee as low as 5 basis points (excluding inbound and outbound fees).

Swappers can set a price limit (minimum output). If sub-swaps cannot achieve the specified price during the swap stream, the total or partial inbound amount will be refunded.

{% hint style="info" %}
Streaming Swaps are currently enabled for Swaps. Streaming Swaps were previously available for the deprecated Savers and Lending features.
{% endhint %}

## Continuous Liquidity Pools

### CLP Derivation

| Element | Description   | Element | Description    |
| ------- | ------------- | ------- | -------------- |
| x       | input amount  | X       | Input Balance  |
| y       | output amount | Y       | Output Balance |

Start with the fixed-product formula:

$$
Eqn 1: X*Y = K
$$

Derive the raw "XYK" output:

$$
Eqn 2: \frac{y}{Y} = \frac{x}{x+X} \rightarrow y= \frac{xY}{x+X}
$$

Establish the basis of Value (the spot purchasing power of `x` in terms of `Y` ) and slip, the difference between the spot and the final realised `y`:

$$
Eqn 3: Value_y = \frac{xY}{X}
$$

$$
Eqn 4: slip =\frac{Value_y - y}{Value_y} =\frac{( \frac{xY}{X})-y}{ \frac{xY}{X}} = \frac{x}{x+X}
$$

Derive the slip-based fee:

$$
Eqn 5: fee = slip * output = \frac{x}{x+X} * \frac{xY}{x+X} = \frac{x^2Y}{(x+X)^2}
$$

Deduct it from the output, to give the final CLP algorithm:

$$
Eqn 6: y = \frac{xY}{x+X} - \frac{x^2Y}{(x+X)^2} \rightarrow y= \frac{ xYX} {(x+X)^2 }
$$

Comparing the two equations (Equation 2 & 6), it can be seen that the Base XYK is simply being multiplied by the inverse of Slip (ie, if slip is 1%, then the output is being multiplied by 99%).

## Evolution of the CLP Model

### Pegged Model

The simplest method to exchange assets is the pegged model, (1:1) where one asset is exchanged one for another. If there is a liquidity pool, then it can go insolvent, and there is no ability to dynamically price the assets, and no ability to intrinsically charge fees:

$$
Eqn 8: y = x
$$

### Fixed Price Model

The fixed-sum model allows pricing to be built-in, but the pool can go insolvent (run out of money). The amount of assets exchanged is simply the spot price at any given time:

$$
Eqn 9: y = \frac{xY}{X}
$$

### Fixed Product Model

The fixed-product model (Base XYK above), instead bonds the tokens together which prevents the pool ever going insolvent, as well as allowing dynamic pricing. However, there is no intrinsic fee collection:

$$
Eqn 10: y= \frac{xY}{x+X}
$$

### Fixed-Rate Fee Model

The Fixed-Rate Fee Model adds a 30 Basis Point (0.003) (or less) fee to the model. This allows fee retention, but the fee is not liquidity-sensitive:

$$
Eqn 11: y= 0.997 * \frac{xY}{x+X}
$$

### Slip-based Fee Model (CLP)

The Slip-based Fee Model adds liquidity-sensitive fee to the model. This ensures the fee paid is commensurate to the demand of the pool's liquidity, and is the one THORChain uses. The fee equation is shown separate (12b), but it is actually embedded in 12a, so is not computed separately.

$$
Eqn 12a: y= \frac{ xYX} {(x+X)^2 }
$$

$$
Eqn 12b: fee = \frac{x^2Y}{(x+X)^2}
$$

{% hint style="warning" %}
The slip-based fee model breaks path-independence and incentivises traders to break up their trade in small amounts.\
For protocols that can't order trades (such as anything built on Ethereum), this causes issues because traders will compete with each other in Ethereum Block Space and pay fees to miners, instead of paying fees to the protocol.\
It is possible to build primitive trade ordering in an Ethereum Smart Contract in order to counter this and make traders compete with each other on trade size again.\
THORChain is able to order trades based on fee & slip size, known as the Swap Queue. This ensures fees collected are maximal and prevents low-value trades.
{% endhint %}

## Calculating Pool Ownership

When a liquidity provider commits capital, the ownership % of the pool is calculated:

$$
units=P*\frac{rA+Ra+2ra}{rA+Ra+2RA}
$$

* units = newly created pool units for the liquidity provider
* r = rune deposited
* a = asset deposited
* R = total Rune Balance (before deposit)
* A = total Asset Balance (before deposit)
* P = total Pool Units (before deposit)

The liquidity provider is allocated rewards proportional to their ownership of the pool. If they own 2% of the pool, they are allocated 2% of the pool's rewards.

## Virtual Depths

Balances of the pool (X and Y), are used as inputs for the CLP model. An amplification factor can be applied (to both, or either) in order to change the "weights" of the balances:

| Element | Description           |
| ------- | --------------------- |
| a       | Input Balance Weight  |
| b       | Output Balance Weight |

$$
Eqn 7: y= \frac{ xYbXa} {(x+Xa)^2 }
$$

If `a = b = 2` then the pool behaves as if the depth is twice as deep, the slip is thus half as much, and the price the swapper receives is better. This is akin to smoothing the bonding curve, but it does not affect pool solvency in any way. Virtual depths are currently not implemented

If `a = 2, b = 1` then the `Y` asset will behave as though it is twice as deep as the `X` asset, or, that the pool is no longer 1:1 bonded. Instead the pool can be said to have 67:33 balance, where the liquidity providers are twice as exposed to one asset over the other.

{% hint style="info" %}
Virtual Depths were initially applied to Synth Swaps using a multiplier of 2. It was intended that Synth Swaps would create 50% less slip and users pay 50% less fees. However, this was disabled after discovering that this would allow front-running. The multiplier is specified on `/constants` as:

```
"VirtualMultSynths": 2,
```

but currently overridden by a Mimir value of 1.
{% endhint %}

## Impermanent Loss Protection

{% hint style="success" %}
As per [ADR 005](https://dev.thorchain.org/architecture/adr-005-deprecate-ilp.html) Impermanent Loss Protection has been removed for all liquidiy providers.
{% endhint %}

Impermanent Loss Protection ensures LPs always either make a profit, or leave with at break even after a minimum period of time (set at 100 days), and partially covered before that point. This should alleviate most of the concerns regarding become an LP.

THORChain tracks a member's deposit values. When the member goes to redeem, their loss (against their original deposit value) is calculated and is subsidised with RUNE from the reserve.

{% hint style="info" %}
Impermanent Loss Protection is always recorded and calculated symmetrically.
{% endhint %}

There is a 100 day linear increase in the amount of coverage received, such that at 50 days, the member receives 50%, 90 days is 90% etc.

| Element | Description     | Element | Description     |
| ------- | --------------- | ------- | --------------- |
| R0      | RUNE Deposited  | R1      | RUNE to redeem  |
| A0      | Asset Deposited | A1      | Asset to redeem |

$$
\text{P1} = \frac{R1}{A1}
$$

`P1` is the pool ratio at withdrawal.

$$
\text{coverage} = ((A0 * P1) + R0) - ((A1 * P1) + R1) => ((A0 * R1/A1) + R0) - (R1 + R1)
$$

{% hint style="info" %}
Deposit values are _not_ the amounts the member deposited. They are the immediate symmetrical value of what the member deposited instead.
{% endhint %}

The coverage is then adjusted for the 100 day rule.

[`blocksForFullProtection`](../how-it-works/constants-and-mimir.md)`= 1440000 // 100 days`

$$
\text{protectionProgress }= (currentHeight - heightLastAdded) / blocksForFullProtection
$$

$$
\text{protection} = (protectionProgress * coverage)
$$

Then the extra RUNE added into the member's liquidity position to issue them extra liquidity units. The member then redeems all their units, and they will realise extra RUNE and extra ASSET.

{% hint style="info" %}
Since the protection amount is added asymmetrically, the protection will experience a small slip. This helps to prevent attack vectors.
{% endhint %}

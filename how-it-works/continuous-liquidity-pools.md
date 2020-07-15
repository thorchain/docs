---
description: 'How THORChain facilitates continuous, incentivised liquidity.'
---

# Continuous Liquidity Pools

Instead of limit-order books, THORChain uses continuous liquidity pools \(CLP\). The CLP is arguably one of the most important features of THORChain. By building in on-chain liquidity the ecosystem receives the following benefits:

* Provides “always-on” liquidity to all assets in its system.
* Functions as source of trustless on-chain price feeds for internal and external use.
* Democratises arbitrage opportunities.
* Allows users to trade assets at trustless prices, without relying on centralised third-parties.
* Allows pools prices to converge to true market prices, since the fee asymptotes to zero. 

## CLP Derivation

| Element | Description | Element | Description |
| :--- | :--- | :--- | :--- |
| x | input amount | X | Input Balance |
| y | output amount | Y | Output Balance |

Start with the fixed-product formula:

$$
Eqn 1: X*Y = K
$$

Derive the raw "XYK" output:

$$
Eqn 2: \frac{y}{Y} = \frac{x}{x+X} \rightarrow y= \frac{xY}{x+X}
$$

Establish the basis of Value \(the spot purchasing power of `x` in terms of `Y` \) and slip, the difference between the spot and the final realised `y`:

$$
Eqn 3: Value_y = \frac{xY}{X}
$$

$$
Eqn 4: slip =\frac{Value_y - y}{Value_y} =\frac{( \frac{xY}{X})-y}{ \frac{xY}{X}} = \frac{x}{x+X}
$$

Derive the slip-based fee:

$$
Eqn 5: fee = slip * output =  \frac{x}{x+X} * \frac{xY}{x+X} = \frac{x^2Y}{(x+X)^2}
$$

Deduct it from the output, to give the final CLP algorithm:

$$
Eqn 6: y = \frac{xY}{x+X} - \frac{x^2Y}{(x+X)^2} \rightarrow y= \frac{ xYX} {(x+X)^2 }
$$

Comparing the two equations \(Equation 2 & 6\), it can be seen that the Base XYK is simply being multiplied by the inverse of Slip \(ie, if slip is 1%, then the output is being multiplied by 99%\). 

## Virtual Depths

Balances of the pool \(X and Y\), are used as inputs for the CLP model. An amplification factor can be applied \(to both, or either\) in order to change the "weights" of the balances:

| Element | Description |
| :--- | :--- |
| a | Input Balance Weight |
| b | Output Balance Weight |

$$
Eqn 7: y= \frac{ xYbXa} {(x+Xa)^2 }
$$

If `a = b = 2` then the pool behaves as if the depth is twice as deep, the slip is thus half as much, and the price the swapper receives is better. This is akin to smoothing the bonding curve, but it does not affect pool solvency in any way. Virtual depths are currently not implemented

If `a = 2, b = 1` then the `Y` asset will behave as though it is twice as deep as the `X` asset, or, that the pool is no longer 1:1 bonded. Instead the pool can be said to have 67:33 balance, where the liquidity providers are twice as exposed to one asset over the other. 

{% hint style="info" %}
Virtual Depths and Dissimilar Weighting have not been added to THORChain, because their impact on the  [Incentive Pendulum](incentive-pendulum.md) as well as the loss of revenue to Liquidity Providers has not yet been investigated. 

THORChain ruthlessly maximises revenue for itself, taking the perspective that liquidity pools are an incentive **race-to-the-top** as opposed to a fee **race-to-the-bottom**. In typical markets, market-takers are value-extractive from market-makers, whilst in THORChain, market-takers pay handsomely for the privilege of access to liquidity. 
{% endhint %}

## Benefits of the CLP Model

To be continued...






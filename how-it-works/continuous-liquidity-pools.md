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
X*Y = K
$$

Derive the raw "XYK" output:

$$
\frac{y}{Y} = \frac{x}{x+X} \rightarrow y= \frac{xY}{x+X}
$$

Establish the basis of price and slip:

$$
Price_y = \frac{xY}{X}
$$

$$
slip =\frac{Price_y - y}{Price_y} =\frac{( \frac{xY}{X})-y}{ \frac{xY}{X}} = \frac{x}{x+X}
$$

Derive the slip-based fee:

$$
fee = slip * output =  \frac{x}{x+X} * \frac{xY}{x+X} = \frac{x^2Y}{(x+X)^2}
$$

Deduct it from the output:

$$
y = \frac{xY}{x+X} - \frac{x^2Y}{(x+X)^2} = \frac{ xYX} {(x+X)^2 }
$$



## Benefits of the CLP Model

To be continued...






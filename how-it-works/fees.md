---
description: THORChain charges a fixed Outbound Fee and a dynamic Liquidity Fee.
---

# Fees

## **Fees**

Conceptually, fees are both value-capture, access-control and resource-subsidisation mechanisms.

#### Value Capture

The fees need to capture value from those accessing the resource, and pay it to those providing the resource, and in this case the resource is liquidity. However liquidity is relative to the size of the transaction that demands it over the depth of the market that will service it. A small transaction in a deep pool has less demand for liquidity than a large transaction in a small pool.

#### Access-control

The other reason for fees is access-control; a way to throttle demand for a fixed resource and let natural market forces take over. If there is too much demand for a resource, fees must rise commensurately. The resource in this case is liquidity, not market depth, thus fees must be proportional to liquidity.

**Resource Subsidisation**

Every swap on THORChain consumes resources (Disk, CPU, Network and Memory resources from validators). These costs are fixed in nature. In addition, every outgoing transaction demands resources on connected chains, such as paying the Bitcoin mining fee or Ethereum gas cost. As such, THORChain charges a single flat fee on every transaction that pays for internal and external resources.

#### Other Benefits

In addition to the above, fees also create the following benefits:

1. Avoid dust attacks
2. Store up income after the initial Emission Schedule reduces
3. Give the user a stable fee, rather than a dynamic one which changes with the external network's fees

## Fee Process

THORChain maintains an awareness of the trailing gas price for each connected chain, saving both gas price as well as gas cost (inferring transaction weight). Nodes are instructed to pays for outgoing transactions using a gas price that is a multiple of the stored value.

The gas is consumed from each chain's base asset pool - the BTC pool pays for Bitcoin fees, the ETH pool for Ethereum fees etc.

The network then observes an outgoing transaction and records how much it cost in gas in the external asset. The final gas cost is then subsidised back into each pool by paying RUNE from the reserve.

## **Outbound Fee**

The user is charged an amount that is **three times** the stored gas cost for each chain. The Node can then pay a gas price that is **1 times** the gas price, and the pool is subsidised a value that is **twice** what was observed. This means the pool earns a margin of 1x, and the Reserve earns a margin of 1x.

Example:

| Chain         | Typical | Outbound Fee | Network Fee (Paid by Pool) | Pool Gets | Reserve Earns |
| ------------- | ------- | ------------ | -------------------------- | --------- | ------------- |
| Bitcoin       | $1      | $3           | $1                         | $2        | $1            |
| Ethereum      | $10     | $30          | $10                        | $20       | $10           |
| Binance Chain | $0.03   | $0.09        | $0.03                      | $0.06     | $0.03         |

The Network Fee is collected in RUNE and sent to the Protocol Reserve. If the transaction involves an asset which is not RUNE the user pays the Network Fee in the external asset. Then the equivalent is taken from that pool's RUNE supply and added to the Protocol Reserve.

If the transaction is in RUNE then the amount is directly taken in RUNE.

## Slip-Based Fee

The CLP algorithm includes a slip-based fee which is liquidity-sensitive. Since demand for liquidity is defined as the size of the transaction over the depth of the market that will service it, then a fee which is proportional to liquidity solves key problems.

Firstly it has better **value-capture** when demand for liquidity is high, no matter the size of the transaction or the depth of the market. This means that over time, pool depths will settle to an equilibrium that is relative to the sizes of transactions that are passed over it. This solves the bootstrapping problem, because low-depth pools may turn out to be more profitable than high-depth pools to liquidity providers.

Secondly it has better **access-control**, since the more a trader (or attacker) demands liquidity, the more they have to pay for it. This makes sandwich attacks prohibitively expensive allowing pools to become reliable price feeds.

Additionally a slip-based fee is stateless and non-opinionated. The final fee paid is always commensurate to the demand of resources (both internal and external) no matter what it is.

$$
slip = \frac{x}{x+X}
$$

$$
fee = slip * output = \frac{x}{x+X} * \frac{xY}{x+X} = \frac{x^2Y}{(x+X)^2}
$$

This fee is retained on the output side of the pool, ensuring it counters the trade direction.

{% hint style="info" %}
In an Asset-Asset swap, the fee is applied twice since two pools are involved, however the user only sees it as a single fee and a single slip value.
{% endhint %}

## Network Fee

The third fee to discuss is the Network Fee. This is what users pay to make transactions on THORChain ledger itself. Currently this is fixed and available on the `/constants` endpoint, but it is intended to be dynamic and set to be a fixed $ qty of assets. Additionally, THORChain has custom gas logic where users pay fees in the asset they send, because all assets on THORChain have protocol pricing, either being RUNE, or synths, where synths are derived from the pools themselves.

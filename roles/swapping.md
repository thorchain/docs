# Swappers

On THORChain, users can swap their digital assets for other digital assets. The network aims to give users access to:

* a large variety of assets through cross-chain compatibility and simple asset listing
* low-cost swaps through liquidity incentives
* superior user experience through open finance protocols and permissionless access

## How Swaps Work

### Available Assets

Users can swap any assets which are on connected chains and which have been added to the network\*. Users can swap from any connected asset to any other connected asset. They can also swap from any connected asset to [RUNE](../rune.md).

{% hint style="info" %}
\*Learn more about how chains and assets get added to the network in [the Governance section](../how-it-works/governance.md).

To add an asset to THORChain, users deposit it into a 'bootstrap pool'. Swapping is disabled on bootstrap pools. Swaps can only be made on pools when they have been added to the network and have moved out of the bootstrap phase.
{% endhint %}

### Decentralisation

With THORChain, swaps are made in a decentralised way. Unlike large centralised exchanges, there is no central body in the middle makes discretionary choices about which swaps can and can't take place.

For example, centralised exchanges can decide which assets to add to a network without little transparency and changing criteria. THORChain has simple rules about which assets get listed.

Additionally, centralised exchanges have the power to say which users are able to swap on their platforms. THORChain does not have this power. Anybody can make a swap on THORChain.

### Continuous Liquidity Pools

Swaps on THORChain are made possible by liquidity pools. These are pools of assets deposited by Stakers. Each pool consists of 1 connected asset, for example Bitcoin, and THORChain's own asset, RUNE. They're called Continuous Liquidity Pools because RUNE, being in each pool, links all pools together in a single, continuous liquidity network.

When a user swaps 2 connected assets on THORChain, in technical terms they do not make a direct swap. In reality, users—

* swap into RUNE in the first pool
* that RUNE is added to the second pool
* the desired asset is retrieved from the second pool

See [this example](swapping.md#example-connected-asset-binance-coin-to-connected-asset-bitcoin) for further detail and the page below for broader detail on Continuous Liquidity Pools.

{% page-ref page="../how-it-works/continuous-liquidity-pools.md" %}

### Calculating Swap Output

The output of a swap can be worked out using the formula

$$
y = \frac{ xYX} {(x+X)^2 }
$$

where

* x is input asset amount
* X is input asset balance
* y is output asset amount
* Y is output asset balance

#### Example

The BTC.RUNE pool has 100 BTC and 2.5 million RUNE. A user swaps 1 BTC into the pool. Calculate how much RUNE is output:

$$
\frac {1 * 2500000 * 100 } {(1 + 100)^2} = 24,507.40
$$

This user swaps 1 BTC for 24,507.40 RUNE.

{% hint style="info" %}
Run through an [interactive tutorial of an asset swap](https://app.bepswap.com/swap).
{% endhint %}

### Costs

The cost of a swap is made up of two parts:

1. network fee
2. price slippage

All swaps are charged a network fee. The network fee is fixed – it's calculated by averaging a set of recent gas prices. Learn more about [Network Fees](../how-it-works/fees.md#network-fee).

Note that users who force their swaps through quickly cause large slips and pay larger fees to stakers.


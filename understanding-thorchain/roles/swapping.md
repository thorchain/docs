---
description: THORChain's value proposition for Swappers.
---

# Swappers

On THORChain, users can swap their digital assets for other digital assets. The network aims to give users access to:

- A large variety of assets through cross-chain compatibility and simple asset listing
- Superior user experience through open finance protocols and permissionless access
- 1-transaction access to fast chains (Binance Smart Chain), smart chains (Ethereum) and censorship-resistant chains (Bitcoin).

{% hint style="info" %}
See an [overview of Swapping in THORChain](../#how-swapping-works)
{% endhint %}

## How Swaps Work

### Available Assets

Users can swap any assets which are on connected chains and which have been added to the network. Users can swap from any connected asset to any other connected asset. They can also swap from any connected asset to [RUNE](../rune.md).

{% hint style="info" %}
Learn more about how chains and assets get added to the network in [the Governance section](../../technical-deep-dive/governance.md).

To add an asset to THORChain, users simply deposit a new asset to put it in the queue for listing. Swaps can only be made on pools when they have been added to the network and have moved out of the bootstrap phase.
{% endhint %}

### Decentralisation

THORChain manages the swaps in accordance with the rules of the state machine - which is completely autonomous. Every swap that it observes is finalised, ordered and processed. Invalid swaps are refunded, valid swaps ordered in a transparent way that is resistant to front-running. Validators can not influence the order of trades, and are punished if they fail to observe a valid swap.

Swaps are completed as fast as they can be confirmed, which is around 5-10 seconds.

### Continuous Liquidity Pools

Swaps on THORChain are made possible by liquidity pools. These are pools of assets deposited by Liquidity providers, where each pool consists of 1 connected asset, for example Bitcoin, and THORChain's own asset, RUNE. They're called Continuous Liquidity Pools because RUNE, being in each pool, links all pools together in a single, continuous liquidity network.

When a user swaps 2 connected assets on THORChain, they swap between two pools:

1. Swap to RUNE in the first pool,
2. Move that RUNE into the second pool,
3. Swap to the desired asset in the second pool with the RUNE from (2)

The THORChain state machine handles this swap in one go, so the user never handles RUNE.

See [this example](swapping.md#example) for further detail and the page below for broader detail on Continuous Liquidity Pools.

### **How Swapping Works**

There are two modes possible for THORChain's swap mechanism: A single swap, and a double swap.

**Single Swap**

A single swap occurs when a user swaps some native asset for an equivalent value of RUNE, or vice versa.

Example: RUNE<>BTC swap.

1. User RUNE —> sent into THORChain. Inbound gas paid in RUNE
2. BTC —> sent out from one of THORChain’s vaults to user wallet. Outbound gas is paid in BTC.

**Double Swap**

A double swap occurs when a user swaps some native asset for some other native asset (that is not RUNE). While the user only sees one transaction, there is actually an additional one that occurs internally within THORChain.

Example: BTC<>ETH swap

1. User BTC —>THORChain. Inbound gas paid in BTC
2. Once the BTC is received, RUNE in BTC pool —> sent to ETH Pool
3. ETH —> sent out from one of THORChain’s vaults to user wallet. Outbound Fee is paid in ETH

Step 2 is the internal swap from BTC:RUNE —> RUNE:ETH. See [Swappers](swapping.md#how-swaps-work) for more information on how swapping works.

{% content-ref url="../../thorchain-finance/continuous-liquidity-pools.md" %}
[continuous-liquidity-pools.md](../../thorchain-finance/continuous-liquidity-pools.md)
{% endcontent-ref %}

### Calculating Swap Output

The output of a swap can be worked out using the formula

$$
y = \frac{ xYX} {(x+X)^2 }
$$

where

- x is input asset amount
- X is input asset balance
- y is output asset amount
- Y is output asset balance

#### Example

The BTC.RUNE pool has 100 BTC and 2.5 million RUNE. A user swaps 1 BTC into the pool. Calculate how much RUNE is output:

$$
\frac {1 * 2500000 * 100 } {(1 + 100)^2} = 24,507.40
$$

This user swaps 1 BTC for 24,507.40 RUNE.

### Costs

The cost of a swap is made up of two parts:

1. Outbound Fee
2. Price Slippage

All swaps are charged a network fee. The network fee is dynamic – it's calculated by averaging a set of recent gas prices. Learn more about [Network Fees](../../technical-deep-dive/).

Note that users who force their swaps through quickly cause large slips and pay larger fees to liquidity providers.

{% hint style="info" %}
For technical details on transaction memo formats, swap parameters, and integration guides, see the [THORChain Developer Documentation](https://dev.thorchain.org/).
{% endhint %}

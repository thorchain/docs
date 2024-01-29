---
description: How THORChain enables synthetic assets with single asset exposure.
---

# Synthetics

{% hint style="danger" %}
THORChain can not ensure security of wrapped assets, so does not wrap L1 assets to represent them. Instead it uses its liquidity to synthesise them, since liquidity is always 100% secured.
{% endhint %}

## Synthetic Assets

THORChain synthetics are unique in that they are 100% collateralised when they exist but switch to being 1:1 pegged at the time of redemption. Other synthetic or wrapped asset designs are either over-collateralised or pegged, never both. This means they are either capital-inefficient (requiring over-collateralisation) or capital-sensitive (can depeg if <100% collateralisation). The advantage of THORChain's design is that the collateralisation is managed by the system on a best-effort basis to be aspirationally 100%. However, when the asset is redeemed, it switches to being pegged 1:1, which means they can tolerate going below 100% collateralisation without losing the peg. The deficit is regained by liquidity-sensitive fees on the redemption so that the last holders of the asset can achieve re-collateralisation.

The collateral for synthetic assets is constant-product liquidity, always 50% in the asset, with the other 50% in RUNE. As the price changes, the pool rebalances on the curve, having much stronger inertia than if it were 100% collateralised by the endogenous asset (RUNE). The price-shift is subsidised by the other liquidity in the pool.

{% hint style="info" %}
Synthetic Assets are aspirationally 100% collateralised by pool liquidity when they exist, but redeemed on a 1:1 pegged basis, no matter the health of the collateral.
{% endhint %}

### Minting - 1:1 pegged

Synthetic Assets are created by swapping RUNE (or the Asset), into its synthetic counterpart, using the pool liquidity depth. This process is identical if the asset was swapped into the L1 instead. Thus when minting, the pool treats both the synthetic and its L1 as identical in purchasing power:

$$
\text{synthAmount} = \frac{r \cdot R \cdot A}{(r + R)^2}
$$

* r = rune deposited
* R = Rune Depth (before)
* A = Asset Depth (before)

This is the [identical equation to L1 swaps](continuous-liquidity-pools.md#slip-based-fee-model-clp).

The total Synth Supply is then updated:

$$
\text{synthSupply} += \text{synthAmount}
$$

### Synth Units - 100% collateralisation

In the above swap - an asset was added to the pool (the RUNE or ASSET), but none taken out since the swap output is minted from nothing. Thus the pool has extra liquidity that needs to be isolated from other LPs. This is the purpose of Synth Units.

Synth Units represent the liquidity collateral value that is required to "back" the synths 100%, and stops other dual-LPs from claiming ownership of it. They are computationally derived at any point which ensures there is exactly enough at any time to represent the outstanding supply.

The ratio of Synth Units to Liquidity Units should be the same as the ratio of synth supply to the total value of the pool without the synths (since LP units are all pool units without the synth units).

* U = Synth Units (what needs to be isolated to back the synthS)
* L = Liquidity Units (dual-LPs)
* S = Synth Supply (the synths to be backed)
* A = Asset Depth (the assets in the pool)

$$
\frac{U}{L} = \frac{S}{(2A-S)}
$$

$$
U = L \cdot \frac{S}{(2A-S)}
$$

Synth Units are issued to cover the new liquidity minted, but held by the pool (not owned by anyone). Pool Units are therefore the sum of [liquidityUnits](continuous-liquidity-pools.md#calculating-pool-ownership)+ synthUnits.

{% hint style="warning" %}
Synth Collateralisation is done aspirationally. If the total value of the liquidity in the pool drops below the total value of the synths, then Synth Units minted will go to infinity, diluting the dual-LPs to 0%.
{% endhint %}

### Redeeming: 1:1 pegged

Synthetic Assets are redeemed by swapping the Synth across the pool. The synth is swapped using the same formula as though it was an L1 asset, thus the synth has the same purchasing power to the L1. It is therefore pegged.

$$
\text{runeAmount} = \frac{s \cdot A \cdot R}{(s + A)^2}
$$

* s = Synths to Redeem
* R = Rune Depth (before)
* A = Asset Depth (before)

The Synth Supply is thus decremented, and this in turn updates the oustanding Synth Units since it is computationally derived.

### Swapping

Synth Swaps can be done as follows:

* Layer 1 to Synth: L1 in, Synth Minted
* Synth to Layer 1: Synth REDEEMED, L1 swapped out
* Synth to Synth: Synth REDEEMED, RUNE moved between pools, synth MINTED

To specify the destination asset is synth, simply provide a THOR address. If it is Layer 1, then provide a layer 1 address, e.g. a BTC address.

## Economics

### Fees

All swaps pay fees, and a synth Mint or Redeem to an L1 is two swaps. Thus 10.0 btc/btc swapped across a pool of 1000 BTC.BTC will receive `10 - ((10/1000)*10)*2 = 9.8` minus any outboundFees. Is the synth pegged 1:0.98? No, because the same holder could swap 10 BTC in 1.0 BTC increments and receive `10*(1 - ((1/1000)*1)*2) = 9.98` minus 10 outboundFees. Both outboundFees and liquidityFees as a function of the swap size can be controlled by the user.

### Effect on Dual-LPs

The dynamic synth unit accounting is to ensure that gain or loss caused by price divergence in the synths is quickly realised to LPs. If Synths as a function of Pool Liquidity goes to 100%, then dual-LPs are diluted to 0%.

As Liquidity Providers have [Impermanent Loss Protection](continuous-liquidity-pools.md#impermanent-loss-protection), as long as they stay for longer than 100 days, the Protocol [Reserve](../how-it-works/emission-schedule.md#reserve)is taking on the price risk. With the Grandfathering of ILP, the RESERVE will instead enter the pools as a dual-LP of last-resort. This stops Synths going to 100%.

### Synth Minting Cap

Due to synths, Liquidity Providers are taking a leveraged position on the RUNE asset today. This can help them earn more rewards if RUNE outperforms the asset, but can also go the other way. The higher the percentage of synths that exist on the network relative to pool depth, the higher the leveraged position Liquidity Providers are taking.

Due to this, the minting of synths is capped to an upper limit of the total pool depth to protect Liquidity Providers and the network. The [Mimir](../how-it-works/constants-and-mimir.md)setting `MaxSynthPerAssetDepth` setting controls the cap which is the asset depth percentage.

This will soon be deprecated to allow PoL to control Synths.

### Protocol Owned Liquidity (POL)

With the addition of [yield-bearing synths,](savings.md) there can be a high demand for minting synths that exceed the cap with normal liquidity. See the original [PR](https://gitlab.com/thorchain/thornode/-/issues/1342). POL has been introduced to deal with a high demand for minting synths while maintaining a safe synth minting limit by using the RUNE within the [Reserve](../how-it-works/emission-schedule.md#reserve).

The network can monitor the synth utilisation on a per pool basis, and add liquidity (asymmetrically addition of RUNE) if utilisation is greater than `cap - 5%` (if economic security allows). If synth utilisation is under this figure, then the reserve would remove liquidity (if the PoL has an LP position in this pool).

* cap = e.g. 1500 (in basis points)
* range = 500 (in basis points)
* PA = pool asset depth
* S = synth supply

$$
\text{utilisation} = \frac{S}{PA} \cdot 10000
$$

By having the reserve add rune into the pool, it de-risks LPs from over RUNE leverage, as the reserve takes on some of that risk. The Reserve is long on its own (and only) asset. This, in turn, creates synth space in the pool, more synth minting and more single-sided asset deposits in the form of synths to enter.

### Staged Pools

If an active pool that minted synths becomes staged, then swaps are disabled. However, synth holders can always redeem for RUNE, or the underlying asset, by specifying that on the way out.

### Alternate Synth Derivation

![](<../.gitbook/assets/image (41) (3).png>)

---
description: THORChain's Incentive Pendulum keeps the network in a balanced state.
---

# Incentive Pendulum

The Incentive Pendulum controls the flow of system income between node operators and liquidity providers based primarily on the Effectove Security Bond and Total Vaulted. However, it also accounts for the Effective Bond and the Total Pooled to ensure an equitable and stable reward distribution. This mechanism adjusts the rewards dynamically to maintain a balanced network by incentivising either bonding or pooling as needed.

Key variables to the Incentive Pendulum are:

- **[Total Bonded](https://runescan.io/address/thor17gw75axcnr8747pkanye45pnrwk7p9c3cqncsv)**: Sum of all RUNE bonded by active [node operators](../understanding-thorchain/roles/node-operators.md).
- **Bond Hard Cap** : The highest bond in the bottom 2/3 of active node operators to ensure no single node has excessive influence on the Total Bond.
- **Total Effective Bond**: The sum of all active node operator's bonds up to the Bond Hard Cap. For each node, the bond amount added is capped by the Bond Hard Cap. This maintains a balanced and secure network by distributing bonding power more evenly among node operators.
- **Effective Security Bond**. The sum of the total bond of the bottom 2/3rds active node operators.
- **[Total Pooled](https://runescan.io/address/thor1g98cy3n9mmjrpn0sxmn63lztelera37n8n67c0)**: Sum of liquidity in all [pools](https://runescan.io/pools) by liquidity providers which also includes [synthetics](../thorchain-finance/synthetic-asset-model.md) and [savers](../thorchain-finance/savings.md).
- **Vault Liquidity**: Sum vaule of L1 assets within all Asgard Vaults valued in RUNE. Includes Pooled L1s and Trade Account L1s.

The capital on THORChain can lose its balance over time. Sometimes there will be too much capital in liquidity pools; sometimes there will be too much bonded by nodes. If there is too much capital in liquidity pools, the network is unsafe. If there is too much capital bonded by nodes, the network is inefficient.

If the network becomes unsafe, it increases rewards (block rewards and liquidity fees) for node operators and reduces rewards for liquidity providers. If the network becomes inefficient, it boosts rewards for liquidity providers and reduces rewards for node operators.

## Balancing System States

THORChain can be in 1 of 5 main states:

- Unsafe
- Under-Bonded
- Optimal
- Over-Bonded
- Inefficient

These different states can be observed through the relationship between bonded RUNE and Vaulted Liquidity, reflecting the amount of RUNE bonded by node operators, the amount of liqudity held in the Asgard Vault within or outside the of the liquidity pools.

### Optimal State

![](../.gitbook/assets/optimal.jpg)

In the optimal state:

1. Effective Security Bond is roughly double the Vault Liquidity.
2. Total Effective Bond is roughly dobule the Total Pooled.
3. Total Pooled represents a significant proportion of the Vault Liquidity.

This results in an approximate 67% to 33% split between the Total Security Bond and pooled RUNE and a 50% to 50% split between the Total Security Bond and Vault Liquidty.

### Unsafe State

![](../.gitbook/assets/unsafe.jpg)

The system may become unsafe. In this case, vaulted capital is higher than bonded capital. Vaulted Rune is now equal to the Effectivity Security Bond – a 50/50 split.

This is undesirable because it means that it's become profitable for node operators to work together to steal assets.

To fix this, the system increases the amount of rewards going to node operators and lowers the rewards going to liquidity providers. This leads to more node operators getting involved, bonding more Rune and increasing bonded capital. This also disincentivises liquidity providers from taking part. They receive less return on their investment, so they pull assets out and reduce the amount of pooled capital. With time, this restores balance and the system moves back towards the optimal state.

### Inefficient State

![](../.gitbook/assets/inefficient.jpg)

The system can also become inefficient. In this case, vaulted capital would be much lower in value than bonded capital. This is a problem because it means that much more capital is being put into securing pooled assets than those assets are actually worth.

To fix this, the system increases rewards for liquidity providers and decreases rewards for node operators. This attracts more liquidity providers to the system, and fewer node operators. Liquidity providers add more capital to receive more rewards, increasing pooled capital. Some node operators remove their bonded Rune, seeking more profitable places to put their capital. Bonded capital falls.\
In this way, the system returns to the optimal state.

### Under and Over-Bonded States

The under- and over-bonded states are less severe intermediary states. Being under-bonded is not a threat in itself because it is not yet profitable for node operators to steal. Being over-bonded is not a problem in itself because the system is still operating quite well.

The THORChain team does not expect the unsafe or inefficient states to come up often. The system will be in the over-bonded state most of the time, particularly as it gets easier for people to run nodes.

{% hint style="info" %}
Try this [interactive model](https://rebase.foundation/network/thorchain/system-component/balancer) of the Incentive Pendulum.
{% endhint %}

## Algorithm

The algorithm that controls the Incentive Pendulum is as follows:

| Parameters            | Notes                                                                    |
| --------------------- | ------------------------------------------------------------------------ |
| effectiveSecurityBond | Sum of bottom 2/3 of node operator's bond                                |
| totalEffectiveBond    | Sum of all bond counting up to the hard bond cap                         |
| vaultLiquidity        | RUNE value of L1 assets in the Asgard Vaults                             |
| pooledRUNE            | Total RUNE in all Pools                                                  |
| totalRewards          | Total Block Block reward (fees + [block emission](emission-schedule.md)) |

1. **Determine the Initial Share** of rewards for node operators based on the `vaultLiquidity` and `effectiveSecurityBond`.

$$
baseNodeShare= \frac{vaultLiquidity}{effectiveSecurityBond} \times totalRewards
$$

2. **Calculate Base Pool Share** after allocating the `baseNodeShare` to node operators.

$$
basePoolShare = totalRewards - baseNodeShare
$$

3. **Adjust Node and Pool Shares:**

- **Adjust the Node Share** if `totalEffectiveBond` exceeds the `effectiveSecurityBond` so Nodes are rewarded upto the Bond Hard Cap.

$$
adjustmentNodeShare = \frac{totalEffectiveBond}{effectiveSecurityBond} \times baseNodeShare
​
$$

- **Adjust Pool Share** based on the ratio of `pooledRune` to `vaultLiquidity` as non-pooled liquidity is not yield-bearing.

$$
\text{adjustmentPoolShare} = \frac{\text{pooledRune}}{\text{vaultLiquidity}} \times \text{basePoolShare}
$$

4. **Aggregate the adjusted shares** for both node operators and liquidity providers to ensure they do not exceed the total rewards.

$$
adjustmentRewards = adjustmentPoolShare + adjustmentNodeShare
$$

5. **Calculate the final amount** of rewards allocated to liquidity providers, ensuring it does not exceed the totalRewards.

$$
finalPoolShare = \frac{adjustmentPoolShare}{adjustmentRewards} \times totalRewards
$$

Liquidity Providers are paid the `finalPoolShare` and nodes operators are paid the remainder.

## Stable Example

Values are:

| Parameters            | Value      |
| --------------------- | ---------- |
| effectiveSecurityBond | 99m RUNE   |
| totalEffectiveBond    | 66m RUNE   |
| vaultLiquidity        | 49.5m RUNE |
| pooledRUNE            | 33m RUNE   |
| totalRewards          | 1200 RUNE  |

These values indicate a balanced state where the `vaultLiquidity`, `totalEffectiveBond` and `effectiveSecurityBond` are appropriately aligned, ensuring the network remains both secure and efficient.

### Calculation Steps

1. **Initial Node Share**:

$$
\text{baseNodeShare} = \frac{49,500,000}{99,000,000} \times 1200
$$

$$
\text{baseNodeShare} = 0.5 \times 1200
$$

$$
\text{baseNodeShare} = 600 \, \text{RUNE}
$$

2. **Initial Pool Share**:

$$
\text{basePoolShare} = 1200 - 600
$$

$$
\text{basePoolShare} = 600 \, \text{RUNE}
$$

3. **Adjusted Node and Pool Shares**:

- **Adjusted Node Share**:

$$
\text{adjustedNodeShare} = \frac{66,000,000}{99,000,000} \times 600
$$

$$
\text{adjustedNodeShare} = 0.6667 \times 600
$$

$$
\text{adjustedNodeShare} = 400 \, \text{RUNE}
$$

- **Adjusted Pool Share**:

$$
\text{adjustmentPoolShare} = \frac{33,000,000}{49,500,000} \times 600
$$

$$
\text{adjustmentPoolShare} = 0.6667 \times 600
$$

$$
\text{adjustmentPoolShare} = 400 \, \text{RUNE}
$$

4. **Final Pool Share**:

$$
\text{adjustmentRewards} = 400 + 400
$$

$$
\text{adjustmentRewards} = 800 \, \text{RUNE}
$$

$$
\text{finalPoolShare} = \frac{400}{800} \times 1200
$$

$$
\text{finalPoolShare} = 600 \, \text{RUNE}
$$

5. **Final Node Share**:

$$
\text{finalNodeShare} = 1200 - 600
$$

$$
\text{finalNodeShare} = 600 \, \text{RUNE}
$$

### Percentage Split

- **LPs' Share**:

$$
\text{LPs' Share Percentage} = \frac{600}{1200} \times 100
$$

$$
\text{LPs' Share Percentage} = 50\%
$$

- **Nodes' Share**:

$$
\text{Nodes' Share Percentage} = \frac{600}{1200} \times 100
$$

$$
\text{Nodes' Share Percentage} = 50\%
$$

### Result

- **Liquidity Providers' Share**: 600 RUNE (50%)
- **Node Operators' Share**: 600 RUNE (50%)

Therefore, in this stable state, the reward split is 50% for liquidity providers (LPs) and 50% for node operators.

## Driving Capital Allocation

As a by-product of the Incentive Pendulum's aggressive re-targeting of the 50:50 split between Effective Security Bond and Vaulted RUNE, the system aims to maintain an equilibrium where the value of BONDED RUNE is proportionally aligned with the value of Vaulted RUNE. This ensures that:

1. For every unit of POOLED RUNE, there is twice that amount in BONDED RUNE, creating a balance that maintains network security and efficiency.
2. As POOLED RUNE is paired 1:1 with pooled assets (due to liquidity pools), the total market value of RUNE is targeted to be three times the value of the pooled assets.
3. There is sufficient bond to secure the non-pooled assets.

If there is any disruption to this balance, the Incentive Pendulum will reallocate rewards to correct the imbalance by incentivising node operators to bond more RUNE or liquidity providers to pool more assets.

If there is any disruption to this, then it means capital will be re-allocated by Nodes and Liquidity providers to pursue maximum yield, and thus correct the imbalance.
With the use of [RUNEPool](../thorchain-finance/runepool.md) and [Pooled THORnodes](../thornodes/pooled-thornodes.md) users can play both sides of the IP in order to maximise their return and help return the network back into equilibrium.

---
description: THORChain's Incentive Pendulum keeps the network in a balanced state.
---

# Incentive Pendulum

The Incentive Pendulum controls the flow of system income between node operators and liquidity providers based on the total bond and total pooled.

- **[Total Bonded](https://runescan.io/address/thor17gw75axcnr8747pkanye45pnrwk7p9c3cqncsv)**: Sum of all RUNE bonded by active [node operators](../understanding-thorchain/roles/node-operators.md).
- **Bond Hard Cap** : The highest bond in the bottom 2/3 of active node operators to ensure no single node has excessive influence on the Total Bond.
- **Total Effective Bond**: The sum of all active node bonds. Bond amounts added are capped by the Bond Hard Cap. This maintains a balanced and secure network by distributing bonding power more evenly among node operators.
- **Effective Security Bond**. The sum of the total bond of the bottom 2/3rds active nodes.
- **[Total Pooled](https://runescan.io/address/thor1g98cy3n9mmjrpn0sxmn63lztelera37n8n67c0)**: Sum of liquidity in all [pools](https://runescan.io/pools) by liquidity providers which also includes [synthetics](../thorchain-finance/synthetic-asset-model.md) and [savers](../thorchain-finance/savings.md).

The capital on THORChain can lose its balance over time. Sometimes there will be too much capital in liquidity pools; sometimes there will be too much bonded by nodes. If there is too much capital in liquidity pools, the network is unsafe. If there is too much capital bonded by nodes, the network is inefficient.

If the network becomes unsafe, it increases rewards (block rewards and liquidity fees) for node operators and reduces rewards for liquidity providers. If the network becomes inefficient, it boosts rewards for liquidity providers and reduces rewards for node operators.

## Balancing System States

THORChain can be in 1 of 5 main states—

- Unsafe
- Under-Bonded
- Optimal
- Over-Bonded
- Inefficient

These different states can be seen in the relationship between bonded Rune and pooled Rune. The amount of Rune which has been bonded by node operators, and the amount which has been added to liquidity pools by liquidity providers.

### Optimal State

![](../.gitbook/assets/optimal.jpg)

In the optimal state, bonded capital is roughly equal to pooled capital. Bonded capital is 100% Rune; pooled capital half Rune and half external assets.

67% of Rune in the system is bonded and 33% is pooled. This is the desired state. The system makes no changes to the incentives for node operators or liquidity providers.

### Unsafe State

![](../.gitbook/assets/unsafe.jpg)

The system may become unsafe. In this case, pooled capital is higher than bonded capital. Pooled Rune is now equal to bonded Rune – a 50/50 split.

This is undesirable because it means that it's become profitable for node operators to work together to steal assets.

To fix this, the system increases the amount of rewards going to node operators and lowers the rewards going to liquidity providers. This leads to more node operators getting involved, bonding more Rune and increasing bonded capital. This also disincentivises liquidity providers from taking part. They receive less return on their investment, so they pull assets out and reduce the amount of pooled capital. With time, this restores balance and the system moves back towards the optimal state.

### Inefficient State

![](../.gitbook/assets/inefficient.jpg)

The system can also become inefficient. In this case, pooled capital would be much lower in value than bonded capital. This is a problem because it means that much more capital is being put into securing pooled assets than those assets are actually worth.

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

1. **Determine the Initial Share** of rewards for node operators based on the `vaultLiquidity` and `securityBond`.

$$
baseNodeShare= \frac{vaultLiquidity}{securityBond + vaultLiquidity} \times totalRewards
$$

2. **Calculate Base Pool Share** after allocating the `baseNodeShare` to node operators.

$$
basePoolShare = totalRewards - baseNodeShare
$$

3. **Adjust Node and Pool Shares:**

    - **Adjust the Node Share** if `effectiveBond` exceeds the `securityBond` so Nodes are reward upto the Bond Hard Limit.

$$
adjustedNodeShare= \frac{effectiveBond}{securityBond} \times baseNodeShare
​$$

    - **Adjust Pool Share** based on the ratio of `pooledRune` to `vaultLiquidity` as non-poolled liquidiy is not yield bearing.

$$
adjustmentPoolShare= \frac{pooledRune}{vaultLiqThe amount of Rune which has been bonded by node operators, and the amounuidity} \times basePoolShare
$$

4. **Aggregate the adjusted shares** for both node operators and LPs to ensure they do not exceed the total rewards.

$$
adjustmentRewards = adjustmentPoolShare + adjustmentNodeShare
$$

5. **Calculate the final amount** of rewards allocated to LPs, ensuring it does not exceed the totalRewards:

$$
finalPoolShare = \frac{adjustmentPoolShare}{adjustmentRewards} \times totalRewards
$$

### Summary Formula

$$
\text{finalPoolShare} = \frac{\left( \frac{\text{pooledRune}}{\text{vaultLiquidity}} \times (\text{totalRewards} - \frac{\text{vaultLiquidity}}{\text{securityBond} + \text{vaultLiquidity}} \times \text{totalRewards}) \right)}{\left( \frac{\text{pooledRune}}{\text{vaultLiquidity}} \times (\text{totalRewards} - \frac{\text{vaultLiquidity}}{\text{securityBond} + \text{vaultLiquidity}} \times \text{totalRewards}) \right) + \left( \frac{\text{effectiveBond}}{\text{securityBond}} \times \frac{\text{vaultLiquidity}}{\text{securityBond} + \text{vaultLiquidity}} \times \text{totalRewards} \right)} \times \text{totalRewards}
$$

Liquidity Providers are paid the `finalPoolShare` and Nodes are paid the remainder.

## Stable Example

In a **stable** state of 67m RUNE bonded and 33m RUNE pooled:

Vaules are:

- securityBond = 67m RUNE
- effectiveBond = 67m RUNE
- vaultLiquidity = 35m RUNE
- pooledRUNE = = 33m RUNE
- totalRewards = 1 000 RUNE (from fees and block rewards)

### Calculation Steps

1. **Initial Node Share**:

$$
\text{baseNodeShare} = \frac{\text{vaultLiquidity}}{\text{securityBond} + \text{vaultLiquidity}} \times \text{totalRewards}
$$

$$
\text{baseNodeShare} = \frac{35,000,000}{67,000,000 + 35,000,000} \times 1,000
$$

$$
\text{baseNodeShare} = \frac{35,000,000}{102,000,000} \times 1,000
$$

$$
\text{baseNodeShare} \approx 343.14 \, \text{RUNE}
$$

2. **Initial Pool Share**:

$$
\text{basePoolShare} = \text{totalRewards} - \text{baseNodeShare}
$$

$$
\text{basePoolShare} = 1,000 - 343.14
$$

$$
\text{basePoolShare} \approx 656.86 \, \text{RUNE}
$$

3. **Adjusted Node and Pool Shares**:

- **Adjusted Node Share**:

$$
\text{adjustmentNodeShare} = \frac{\text{effectiveBond}}{\text{securityBond}} \times \text{baseNodeShare}
$$

Assuming effectiveBond = securityBond:

$$
\text{adjustmentNodeShare} = \frac{67,000,000}{67,000,000} \times 343.14
$$

$$
\text{adjustmentNodeShare} = 1 \times 343.14
$$

$$
\text{adjustmentNodeShare} \approx 343.14 \, \text{RUNE}
$$

- **Adjusted Pool Share**:

$$
\text{adjustmentPoolShare} = \frac{\text{pooledRune}}{\text{vaultLiquidity}} \times \text{basePoolShare}
$$

$$
\text{adjustmentPoolShare} = \frac{33,000,000}{35,000,000} \times 656.86
$$

$$
\text{adjustmentPoolShare} \approx 619.04 \, \text{RUNE}
$$

4. **Final Pool Share**:

$$
\text{adjustmentRewards} = \text{adjustmentPoolShare} + \text{adjustmentNodeShare}
$$

$$
\text{adjustmentRewards} = 619.04 + 343.14
$$

$$
\text{adjustmentRewards} \approx 962.18 \, \text{RUNE}
$$

$$
\text{finalPoolShare} = \frac{\text{adjustmentPoolShare}}{\text{adjustmentRewards}} \times \text{totalRewards}
$$

$$
\text{finalPoolShare} = \frac{619.04}{962.18} \times 1,000
$$

$$
\text{finalPoolShare} \approx 643.59 \, \text{RUNE}
$$

5. **Final Node Share**:

$$
\text{finalNodeShare} = \text{totalRewards} - \text{finalPoolShare}
$$

$$
\text{finalNodeShare} = 1,000 - 643.59
$$

$$
\text{finalNodeShare} \approx 356.41 \, \text{RUNE}
$$

### Percentage Split

- **LPs' Share**:

$$
\text{LPs' Share Percentage} = \frac{\text{finalPoolShare}}{\text{totalRewards}} \times 100
$$

$$
\text{LPs' Share Percentage} = \frac{643.59}{1,000} \times 100
$$

$$
\text{LPs' Share Percentage} \approx 64.36\%
$$

- **Nodes' Share**:

$$
\text{Nodes' Share Percentage} = \frac{\text{finalNodeShare}}{\text{totalRewards}} \times 100
$$

$$
\text{Nodes' Share Percentage} = \frac{356.41}{1,000} \times 100
$$

$$
\text{Nodes' Share Percentage} \approx 35.64\%
$$

Therefore, the reward split is approximately 64.36% for liquidity providers (LPs) and 35.64% for node operators.

## Underbonded Example

In the **under-bonded** state of 60m RUNE bonded and 40m RUNE pooled

Vaules are:

- securityBond = 60m RUNE
- effectiveBond = 60m RUNE
- vaultLiquidity = 45m RUNE
- pooledRUNE = = 40m RUNE
- totalRewards = 1 000 RUNE (from fees and block rewards)

### Underbonded Calculation Steps

1. **Initial Node Share**:

$$
\text{baseNodeShare} = \frac{45,000,000}{60,000,000 + 45,000,000} \times 1,000
$$

$$
\text{baseNodeShare} = \frac{45,000,000}{105,000,000} \times 1,000
$$

$$
\text{baseNodeShare} \approx 428.57 \, \text{RUNE}
$$

2. **Initial Pool Share**:

$$
\text{basePoolShare} = 1,000 - 428.57
$$

$$
\text{basePoolShare} \approx 571.43 \, \text{RUNE}
$$

3. **Adjusted Node and Pool Shares**:

- **Adjusted Node Share**:

$$
\text{adjustmentNodeShare} = \frac{60,000,000}{60,000,000} \times 428.57
$$

$$
\text{adjustmentNodeShare} = 1 \times 428.57
$$

$$
\text{adjustmentNodeShare} \approx 428.57 \, \text{RUNE}
$$

- **Adjusted Pool Share**:

$$
\text{adjustmentPoolShare} = \frac{40,000,000}{45,000,000} \times 571.43
$$

$$
\text{adjustmentPoolShare} \approx 508.16 \, \text{RUNE}
$$

4. **Final Pool Share**:

$$
\text{adjustmentRewards} = 508.16 + 428.57
$$

$$
\text{adjustmentRewards} \approx 936.73 \, \text{RUNE}
$$

$$
\text{finalPoolShare} = \frac{508.16}{936.73} \times 1,000
$$
$$
\text{finalPoolShare} \approx 542.41 \, \text{RUNE}
$$

5. **Final Node Share**:

$$
\text{finalNodeShare} = 1,000 - 542.41
$$

$$
\text{finalNodeShare} \approx 457.59 \, \text{RUNE}
$$

### Underbonded Percentage Split

- **LPs' Share**:

$$
\text{LPs' Share Percentage} = \frac{542.41}{1,000} \times 100
$$

$$
\text{LPs' Share Percentage} \approx 54.24\%
$$

- **Nodes' Share**:

$$
\text{Nodes' Share Percentage} = \frac{457.59}{1,000} \times 100
$$

$$
\text{Nodes' Share Percentage} \approx 45.76\%
$$

Therefore, the reward split is approximately 54.24% for liquidity providers (LPs) and 45.76% for node operators.

## Driving Capital Allocation

As a by-product of the Incentive Pendulum's aggressive re-targeting of 67:33 split of BONDED:POOLED RUNE, it means that in an equilibrium, the value of BONDED RUNE will always be double the value of POOLED RUNE. Since POOLED RUNE is 1:1 bonded with POOLED Capital (due to liquidity pools), then the total market value of RUNE is targeted to be 3 times the value of pooled assets.

If there is any disruption to this, then it means capital will be re-allocated by Nodes and Liquidity providers to pursue maximum yield, and thus correct the imbalance.

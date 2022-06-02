---
description: THORChain's Incentive Pendulum keeps the network in a balanced state.
---

# Incentive Pendulum

The capital on THORChain can lose its balance over time. Sometimes there will be too much capital in liquidity pools; sometimes there will be too much bonded by nodes. If there is too much capital in liquidity pools, the network is unsafe. If there is too much capital bonded by nodes, the network is inefficient.

If the network becomes unsafe, it increases rewards (block rewards and liquidity fees) for node operators and reduces rewards for liquidity providers. If the network becomes inefficient, it boosts rewards for liquidity providers and reduces rewards for node operators.

## Balancing System States

THORChain can be in 1 of 5 main states—

* Unsafe
* Under-Bonded
* Optimal
* Over-Bonded
* Inefficient

These different states can be seen in the relationship between bonded Rune and pooled Rune. The amount of Rune which has been bonded by node operators, and the amount which has been added to liquidity pools by liquidity providers.

### Optimal State

![](../.gitbook/assets/Optimal.jpg)

In the optimal state, bonded capital is roughly equal to pooled capital. Bonded capital is 100% Rune; pooled capital half Rune and half external assets.

67% of Rune in the system is bonded and 33% is pooled. This is the desired state. The system makes no changes to the incentives for node operators or liquidity providers.

### Unsafe State

![](../.gitbook/assets/Unsafe.jpg)

The system may become unsafe. In this case, pooled capital is higher than bonded capital. Pooled Rune is now equal to bonded Rune – a 50/50 split.

This is undesirable because it means that it's become profitable for node operators to work together to steal assets.

To fix this, the system increases the amount of rewards going to node operators and lowers the rewards going to liquidity providers. This leads to more node operators getting involved, bonding more Rune and increasing bonded capital. This also disincentivises liquidity providers from taking part. They receive less return on their investment, so they pull assets out and reduce the amount of pooled capital. With time, this restores balance and the system moves back towards the optimal state.

### Inefficient State

![](../.gitbook/assets/Inefficient.jpg)

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

$$
shareFactor = \frac{b - s}{b + s / ic}
$$

$$
b = totalBonded, s = totalPooled, ic = Incentive Curve
$$

In a **stable** state of 67m RUNE bonded and 33m RUNE pooled:



$$
shareFactor = \frac{67 -  33}{67 + 33/1} = 0.33
$$

Thus, 33% of the rewards go to Liquidity Providers and 67% go to Node Operators.&#x20;

In the **under-bonded** state of 60m RUNE bonded and 40m RUNE pooled

$$
shareFactor = \frac{60 -  40}{60  + 40/1} = 0.2
$$

Thus, 20% of the rewards go to Liquidity Providers and 80% to the Node Operators, incentivising more node operators to be created.&#x20;

In a **very under-bonded** state of 55m RUNE bonded and 45m RUNE pooled

$$
shareFactor = \frac{55 -  45}{55  + 45/1} = 0.10
$$

Thus, Liquidity providers will receive 10% of the rewards. This may drive Liquidity providers away.

In an **over-bonded** state of 80m RUNE bonded and 20m RUNE pooled:



$$
shareFactor = \frac{80 -  20}{80  + 20/1} = 0.6
$$

Thus, 60% of the rewards go to Liquidity Providers and 40% go to Node Operators.

### Incentive Curve

In the **stable** state of 67m RUNE bonded and 33m RUNE pooled, Liquidity providers are providing half the assets TVL (RUNE and Assets) and bonders are providing the other half.&#x20;

The [Incentive Curve](constants-and-mimir.md) can be used to adjust the reward flow with respect to the Incentive Pendulum.



In a stable situation with the Incentive Curve set to 1.

$$
shareFactor = \frac{67 -  33}{67 + 33/1} = 0.33
$$

Thus, 33% of the rewards go to Liquidity Providers and 67% go to Node Operators.&#x20;

In a stable situation with the Incentive Curve set to 2.

$$
shareFactor = \frac{67 -  33}{67 + 33/2} = 0.4
$$

In a stable situation with the Incentive Curve set to 4.

Thus, 40% of the rewards go to Liquidity Providers and 60% go to Node Operators.&#x20;

$$
shareFactor = \frac{67 -  33}{67 + 33/4} = 0.45
$$

In a stable situation with the Incentive Curve set to 100.

$$
shareFactor = \frac{67 -  33}{67 + 33/100} = 0.5
$$

Thus, 50% of the rewards go to Liquidity Providers and 50% go to Node Operators.&#x20;

The Incentive Pendulum is a linear path between Liquidity providers and Node Operators. The Incentive Curve can smooth the effect of the Incentive Pendulum as it moves. With the Incentive Pendulum in a set position, as Incentive Curve increases so do the rewards that are paid to Liquidity providers.&#x20;

In a stable situation, it can be set to 100 to ensure Liquidity providers and Node Operator's are rewarded equally.&#x20;

In an under-bond state, it can be increased so Liquidity providers are not adversely affected by the reduction of rewards due to the Incentive Pendulum.

In an over-bonded state, it can be reduced to ensure Liquidity Providers are not being paid too much.&#x20;

Incentive Curve value set in constants however can be overridden in [Mimir ](constants-and-mimir.md)by [Node Operators](../thornodes/overview.md).

## Driving Capital Allocation

As a by-product of the Incentive Pendulum's aggressive re-targeting of 67:33 split of BONDED:POOLED RUNE, it means that in an equilibrium, the value of BONDED RUNE will always be double the value of POOLED RUNE. Since POOLED RUNE is 1:1 bonded with POOLED Capital (due to liquidity pools), then the total market value of RUNE is targeted to be 3 times the value of pooled assets.

If there is any disruption to this, then it means capital will be re-allocated by Nodes and Liquidity providers to pursue maximum yield, and thus correct the imbalance.

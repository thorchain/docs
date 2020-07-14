---
description: >-
  THORChain's Incentive Pendulum keeps the network in a balanced state. It stops
  the network from becoming unsafe or inefficient by changing the distribution
  of rewards to node operators and stakers.
---

# Incentive Pendulum

The capital on THORChain can lose its balance over time. Sometimes there will be too much capital in liquidity pools; sometimes there will be too much bonded by nodes. If there is too much capital in liquidity pools, the network is unsafe. If there is too much capital bonded by nodes, the network is inefficient.

If the network becomes unsafe, it increases rewards for node operators and reduces rewards for stakers. If the network becomes inefficient, it boosts rewards for stakers and reduces rewards for node operators.

## Balancing System States

THORChain can be in 1 of 5 main states—

* Unsafe
* Under-Bonded
* Optimal
* Over-Bonded
* Inefficient

These different states can be seen in the relationship between bonded Rune and pooled Rune. The amount of Rune which has been bonded by node operators, and the amount which has been added to liquidity pools by stakers.

### Optimal State

![](../.gitbook/assets/optimal.jpg)

In the optimal state, bonded capital is roughly equal to pooled capital. Bonded capital is 100% Rune; pooled capital half Rune and half external assets.

67% of Rune in the system is bonded and 33% is pooled. This is the desired state. The system makes no changes to the incentives for node operators or stakers.

### Unsafe State

![](../.gitbook/assets/unsafe.jpg)

The system may become unsafe. In this case, pooled capital is higher than bonded capital. Pooled Rune is now equal to bonded Rune – a 50/50 split.

This is undesirable because it means that it's become profitable for node operators to work together to steal assets.

To fix this, the system increases the amount of rewards going to node operators and lowers the rewards going to stakers. This leads to more node operators getting involved, bonding more Rune and increasing bonded capital. This also disincentivises stakers from taking part. They receive less return on their investment, so they pull assets out and reduce the amount of pooled capital. With time, this restores balance and the system moves back towards the optimal state.

### Inefficient State

![](../.gitbook/assets/inefficient.jpg)

The system can also become inefficient. In this case, pooled capital would be much lower in value than bonded capital. This is a problem because it means that much more capital is being put into securing pooled assets than those assets are actually worth.

To fix this, the system increases rewards for stakers and decreases rewards for node operators. This attracts more stakers to the system, and fewer node operators. Stakers add more capital to receive more rewards, increasing pooled capital. Some node operators remove their bonded Rune, seeking more profitable places to put their capital. Bonded capital falls.  
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
shareFactor = \frac{b + s}{b - s}
$$

$$
b = totalBonded, s = totalStaked
$$

In the stable situation of 67m RUNE bonded and 33m RUNE staked:

$$
shareFactor = \frac{67 + 33}{67 - 33} = 3
$$

The state machine then takes the inverse of this to determine how much to send to Stakers:

$$
Split of the Rewards to Stakers = \frac{1}{shareFactor}= ⅓ = 0.33%
$$

Thus, 33% of the rewards will be sent to Stakers in the stable scenario. 

## Driving Capital Allocation

As a by-product of the Incentive Pendulum's aggressive re-targeting of 67:33 split of BONDED:STAKED RUNE, it means that in an equilibrium, the value of BONDED RUNE will always be double the value of STAKED RUNE. Since STAKED RUNE is 1:1 bonded with STAKED Capital \(due to liquidity pools\), then the total market value of RUNE is targeted to be 3 times the value of staked assets. 

If there is any disruption to this, then it means capital will be re-allocated by Nodes and Stakers to pursue maximum yield, and thus correct the inbalance. 


---
description: >-
  Describes the Emission Schedule from the Reserve to Nodes and Liquidity
  providers.
---

# Emission Schedule

## Reserve

There are a maximum of 500m RUNE. All 100% was created at genesis and distributed via different mechanisms:

* In return for capital: 5% (SEED) and 16% (IDO) was sold for capital to start the network and give it value. They took on risk to support the network.
* In return for time and effort: 10% was allocated to a group of devs who worked since 2018. They took on risk to deliver the network.
* In return for bootstrap participation: 24% was given to users who participated in the bootstrapping of the network.
* In return for through-life participation: 44% has been placed in the Protocol to pay out to Nodes and LPs for the next 10+ years.

{% hint style="success" %}
All vesting has been completed.
{% endhint %}

{% hint style="info" %}
The Reserve also backstops Savers and Lending. The Reserve is depleted by block rewards and POL and continually topped up by system income.
{% endhint %}

The Reserve and other modules can be viewed [here](https://runescan.io/addresses).

## Block Rewards

Block rewards are calculated as such:

$$
blockReward = \frac{ \frac{reserve}{emissionCurve}}{blocksPerYear} = \frac{ \frac{180,000,000}{8}}{5256000} = 4.28
$$

So if the reserve has 180m rune, a single block will emit \~4.28 Rune from the reserve, which means half  of that is awarded to the node operators. The rest is paid to liquidity providers.

The exact distribution between node operators and liquidity providers (and therefore savers) is controlled by the [Incentive Pendulum](incentive-pendulum.md).

The emission curve is designed to start at around 30% APR and target 2% after 10 years. At that point, the majority of the revenue will come from fees.

## System Income

The Reserve is continually topped up by income, such as transfer fees and outbound fees. Other sources of revenue include THORName fees and excess liquidation fees on collateral.

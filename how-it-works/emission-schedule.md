---
description: >-
  Describes the Emission Schedule from the Reserve to Nodes and Liquidity
  providers.
---

# Emission Schedule

## Reserve

There are a maximum of 500m RUNE. All 100% was created at genesis and distributed via different mechanisms:

* In return for capital: 5% (SEED) and 16% (IDO) was sold for capital to start the network and give it value. They took on risk to support the network.&#x20;
* In return for time and effort: 10% was allocated to a group of devs who worked since 2018. They took on risk to deliver the network.&#x20;
* In return for bootstrap participation: 24% was given to users who participated in the bootstrapping of the network.&#x20;
* In return for through-life participation: 44% has been placed in the Protocol to pay out to Nodes and LPs for the next 10+ years

{% hint style="info" %}
The Reserve also backstops Impermanent Loss Protection, and is used to underwrite debt. The Reserve is depleted by block rewards and continually topped up by system income.
{% endhint %}

## Block Rewards

Block rewards are calculated as such:

$$
blockReward = \frac{ \frac{reserve}{emissionCurve}}{blocksPerYear} = \frac{ \frac{180,000,000}{8}}{5256000} = 4.28
$$

So if the reserve has 180m rune, a single block will emit \~4.28 Rune from the reserve, which means 2/3rds of that is awarded to the node operators. The rest is paid to Liquidity providers.

The emission curve is designed to start at around 30% APR and target 2% after 10 years. At that point, the majority of the revenue will come from fees.

## System Income

The Reserve is continually topped up by income, such as transfer fees and outbound fees. Other sources of revenue include THORName fees and excess liquidation fees on collateral.

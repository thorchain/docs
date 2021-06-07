---
description: >-
  Describes the Emission Schedule from the Reserve to Nodes and Liquidity
  providers.
---

# Emission Schedule

## Reserve

There are a maximum of 500m RUNE. All 100% was created at genesis. 44% \(220m\) was allocated to a Protocol Reserve which is designed to pay out to Nodes and LPs. The Reserve also backstops Impermanent Loss Protection, and is used to issue debt. The Reserve is depleted by block rewards and continually topped up by system income.

## Block Rewards

Block rewards are calculated as such:

$$
blockReward =  \frac{ \frac{reserve}{emissionCurve}}{blocksPerYear} = \frac{ \frac{220,000,000}{6}}{6311390}  = 5.8096
$$

So if the reserve has 220m rune, a single block will emit ~5.8 Rune from the reserve, which means 2/3rds of that is awarded to the node operators \(~3.8\) and is divided up between each operator. The rest is paid to Liquidity providers.

The emission curve is designed to start at around 30% APR and target 2% after 10 years. At that point, the majority of the revenue will come from fees.

## System Income

The Reserve is continually topped up by income, such as transfer fees and outbound fees. Other sources of revenue include THORName fees and excess liquidation fees on collateral.


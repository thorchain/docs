---
description: >-
  Describes the Emission Schedule from the Reserve to Nodes and Liquidity
  providers.
---

# Emission Schedule

Block rewards are calculated as such:

$$
blockReward =  \frac{ \frac{reserve}{emissionCurve}}{blocksPerYear} = \frac{ \frac{220,447,472}{6}}{6311390}  = 5.8096
$$

So if the reserve has 220m rune, a single block will emit ~5.8 Rune from the reserve, which means 2/3rds to that is awarded to the node operators \(~3.8\) and is divided up between each operator. The rest is paid to Liquidity providers.

The emission curve is designed to start at around 30% APR and target 2% after 10 years. At that point, the majority of the revenue will come from fees.


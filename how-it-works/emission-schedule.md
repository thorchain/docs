---
description: >-
  Describes the Emission Schedule from the Reserve to Nodes and Liquidity
  providers.
---

# Emission Schedule

## Reserve

There are a maximum of 500m RUNE. All 100% was created at genesis and distributed via different mechanisms:

- In return for capital: 5% (SEED) and 16% (IDO) was sold for capital to start the network and give it value. They took on risk to support the network.
- In return for time and effort: 10% was allocated to a group of devs who worked since 2018. They took on risk to deliver the network.
- In return for bootstrap participation: 24% was given to users who participated in the bootstrapping of the network.
- In return for through-life participation: 44% has been placed in the Protocol Reserve to pay out to Nodes and LPs for the next 10+ years.

{% hint style="success" %}
All vesting has been completed.
{% endhint %}

The [Reserve module](https://runescan.io/address/thor1dheycdevq39qlkxs2a6wuuzyn4aqxhve4qxtxt) and other modules can be viewed [here](https://runescan.io/addresses).

## Block Rewards

Block rewards are calculated as such:

$$
blockReward = \frac{ \frac{reserve}{emissionCurve}}{blocksPerYear} = \frac{ \frac{180,000,000}{8}}{5256000} = 4.28
$$

So if the reserve has 180m rune, a single block will emit \~4.28 Rune from the reserve, which means half of that is awarded to the node operators. The rest is paid to liquidity providers.

The exact distribution between node operators and liquidity providers (and therefore savers) is controlled by the [Incentive Pendulum](incentive-pendulum.md).

The emission curve is designed to start at around 30% APR and target 2% after 10 years. At that point, the majority of the revenue will come from fees.

## Reserve Outflows and Inflows

### Reserve Inflows

1. Network Gas Fee: The Native THORChain transaction fee (0.02 RUNE) applies to transactions made on the THORChain blockchain for assets such as RUNE, Synthetic Assets, and Secure Assets. This fee represents the gas cost for processing transactions on the THORChain blockchain and is charged independently of any outbound transactions. Unlike outbound fees, which are applied to external-chain transactions, the Network Gas Fee only applies to transactions made on the THORChain blockchain itself.
2. Outbound Fees: Fees collected from all outbound transactions to users, which vary depending on the asset type:
a. Native Outbound Fee: A fixed 0.02 RUNE is charged on RUNE and other native asset outbound transactions. This is the THORChain Network Gas Fee covering the gas costs for processing the outbound transaction on the THORChain blockchain and not an additional outbound fee.
b. Layer 1 Outbound Fee: For external-chain assets (e.g., Bitcoin, Ethereum), this fee bundles the external-chain gas cost, pool swap fee, and THORChain network fee into a single charge. The overall fee is determined by the L1 gas rate and the `dynamic_multiplier_basis_points`(https://thornode.ninerealms.com/thorchain/outbound_fees) for the respective chain.
3. Withdrawal of Reserve POL: Occurs when a RUNEPool addition replaces Reserve-backed POL or when a POL requirement is reduced.
4. Slashing Income: Derived from node bond slashes, particularly for failures during keygen or other operational breaches.
5. Staged Pool Costs: Deduction from the stage pool to cover churn-related costs for staged pools. These costs are determined by a Mimir-adjustable network variable `StagedPoolCost`.

### Reserve Outflows

1. Gas Reimbursement:
a. Churn Gas Reimbursements: Covers migration gas costs during vault churns. These costs are funded by surplus gas collected from prior transactions. When the Reserve pays for migrate gas costs, it depletes the surplus RUNE amounts associated with those coins and slightly raises outbound fees for those coins in response.
b. Non-Churn Gas Reimbursements: Reimburses gas costs for external-chain transactions (e.g., user-initiated outbound transactions). Over time, the total outbound fees collected for a given coin (including adjustments for surplus) are designed to equal the total gas reimbursements for that coin, which include both user-initiated transactions and churn migration costs.
Together, these mechanisms ensure that inflows from outbound fees balance the Reserve's gas reimbursement outflows on average, maintaining sustainability without accumulating an ongoing surplus.
2. Reserve Adding to POL: Occurs when RUNEPool withdrawals can’t cover POL requirements or when the POL position requires an increase that RUNEPool cannot fully support.
3. Block Rewards: Paid out to incentivise node operators and liquidity providers. This is the most significant ongoing expense.


###  Additional Points
- The Reserve balance is minimally impacted by gas reimbursements and outbound fees as these inflows and outflows are generally balanced over time.
- POL funding prioritises RUNEPool, with the Reserve only stepping in as a fallback when RUNEPool cannot meet the need.
- System income (e.g., fees from swaps) is immediately distributed to developers, burns, pools, and nodes, rather than being retained by the Reserve.

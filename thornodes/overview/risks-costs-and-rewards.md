---
description: The risks, costs and rewards of running a THORNode
---

# Risks, Costs and Rewards

## Risk of Running a Node

Deciding to run a node should be carefully considered and thought through. While the payoffs/rewards can be significant, there can also be an equally significant costs.

### Risks to Bond

To run a node, you must obtain a significant amount of Rune, minimums [apply](risks-costs-and-rewards.md#churning-in). This RUNE is sent into the network as “bond” and held as leverage on each node to ensure they behave in the best interest of the network.

Running a malicious node or stealing from the network results in a slashing of this bond. Here are the ways in which a validator’s bond can get slashed.

* **Double Sign** (5% of minimum bond) - if it is observed that a single validator node is committing blocks on multiple chains. To avoid this, never run two nodes with the same node account at the same time.
* **Unauthorised transaction** (1.5x transaction value) - if a node sends funds without authorization, the bond is slashed 1.5x the value of the stolen funds. The slashed bond is dumped into the pool(s) where the funds were stolen and added to the reserve.

Bond slashing takes directly from the bond and does not affect rewards.

### **Risk to Income**

When a node is active, it earns rewards from the network in RUNE. Sufficient rewards are required to be earned in order for a Validator to be profitable. Running an unreliable node results in rewards being slashed. Here are the ways in which a validator’s rewards can be slashed.

* **Not Observing** (2 slash pts) - if a node does not observe transactions for all chains, while other nodes do, they get slash points added.
* **Not signing a transaction** (600 slash pts) - if a node does not sign an outbound transaction, as requested by the network, they will get slash points added.
* **Fail to keygen** (1 hr of revenue) - When the network attempts to churn, and attempts to create a new Asgard pubkey for the network, and fails to do so due to a specific node(s), they will lose 1 hr of revenue from their bond.

Slash points undo profits made on the network. For every 1 slash point a node receives, they lose 1 block of rewards. Rewards slashing reduces earned rewards and does not affect a validator’s bond.

## Compensation

### Bond Rewards

Node Operators receive rewards if they are bonded and active on the network and are paid out in RUNE. While revenue is generated every block (approximately every 6 seconds) to each operator, those funds are not available immediately. Rewards can be accessed one of two ways:

* Setting a Node Operator fee in basis points, which causes rewards to be paid directly to the Node Operator address after each churn. See [here](../joining.md#node-operator-fee) for details on how to set a Node Operator fee.
* If no Node Operator fee is set, 100% of rewards will be accrued back to the bond after each churn. A Node Operator must then either LEAVE or wait until the node churns out to unbond principal or rewards.

Node Operators earn rewards relative to their bond; the more they bond, the more they earn, up to the effective bond cap (the highest bond of the bottom 2/3rd active nodes). Over time, this incentive increases the median bonded amount, increasing the security of the network and allows the network to grow. [See Keeping Track of Rewards](risks-costs-and-rewards.md#keeping-track) below for more details.

Rewards are affected by the [Emission Schedule](../../how-it-works/emission-schedule.md) and the [Incentive Pendulum](../../how-it-works/incentive-pendulum.md). Over time, the Emission Schedule decreases the amount of RUNE allocated to nodes. The Incentive Pendulum increases and decreases the amount of RUNE allocated to nodes according to the security and capital efficiency of the network.

#### Keeping Track

When a node joins the network the current block height is recorded. The system creates one block unit for every active node for every active block, and has a running total of the block units created. When a node leaves, it cashes in its block units for a portion of the bond rewards. The spent block units are destroyed.

For example, there are 10,000 RUNE in bond rewards outstanding. Node A has been active for 30 blocks, and has 33 block units, but accrued 3 slash points. There are 1000 block units in total. Node A leaves the network and cashes in its 30 block units (33 - 3). It receives 300 RUNE ((30/1000) \* 10000), leaving 9700 RUNE in node rewards. Its 33 block units are destroyed, leaving 967 block units left.

### Income

Income for one node can be estimated based on a few inputs:

* Number of active nodes
* Reward emission rate
* % of rewards allocated to nodes, set by the Incentive Pendulum
* Price of RUNE\*

These inputs should be plugged into the following formula:



$$
\frac{RewardAllocation \times EmissionRate}{NumberOfNodes}
$$

An example with mainnet day 1 inputs:

* 33 nodes
* 3.06 million RUNE rewards emitted per month
* 67% of rewards allocated to nodes (stable Incentive Pendulum)

$$
\frac{0.67 ∗  3060000}{33} = 62,127
$$

## Costs

Depending on how the node was set up, it will likely cost between $2,000 and $3,500 per month using a hosting provider, potentially more as the blockchain scales and more chain integrations are added.&#x20;

If using a [bare metal set up](https://medium.com/@Runetard/bare-metal-node-n00b-guide-a29c5c067b4a) there will be an up front hardware cost and then electricity costs on going.&#x20;

The main driver of costs is resource allocation to hosting the fullnode daemons required for each of THORNode's chain integrations.

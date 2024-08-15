---
description: Overview of THORNodes
---

# THORNode Overview

## Overview

THORNodes service the THORChain network. Each THORNode is comprised of several independent servers in a cluster. All THORNodes communicate and operate in cooperation to create a cross-chain swapping network.

Running a node is a serious undertaking. While Node Operators are well [compensated ](overview.md#compensation)for running a node, there are also [risks](overview.md#risks-to-bond), [skills required](overview.md#skillsets) and [costs](overview.md#costs).

See the [Node Operator 101 Video](https://youtu.be/XXYXNAolPEU) to learn more before running a node.

THORNode information can be viewed at the following dashboards:

1. [thorchain.network](https://thorchain.network/nodes) - Comprehensive THORNode dashboard
2. [thorchain.net](https://thorchain.net/nodes) - THORNode information and network statistics
3. [runescan.io](https://runescan.io/nodes) - THORNode information within the block explorer
4. [thorcharts.org ](https://thorcharts.org/thorchain\_earnings\_distribution)- Earning distribution and other historical data

To set up a node, you have two choices:

1. Set up [manually ](https://medium.com/@scorch\_ed/build-your-own-thorchain-validator-node-step-by-step-guide-a516e6c67b9f)(not recommended unless you are an expert)
2. Set up via Kubernetes (recommended)

{% content-ref url="kubernetes/" %}
[kubernetes](kubernetes/)
{% endcontent-ref %}

## THORNode Stack

Each THORNode is comprised of 4 major components.

1. **`thornode`** - this is a daemon that runs the THORChain chain itself and a HTTP server, that gives a RESTful API to the chain.
2. **`bifrost`** - this daemon creates connections to remote chains (like Bitcoin, Ethereum, Binance, etc) to both observe activity on those chains (incoming/outgoing transactions), and also sign/broadcast outgoing transactions (moving funds on remote chains).
3. **`gateway`**: THORNode gateway proxy to get a single IP address for multiple deployments
4. **Full nodes** - for every chain that is supported by the network, each THORNode operator will run their own full node of each chain (Bitcoin, Ethereum, Binance Smart Chain, Avalance, etc).

THORNode operators may choose to run the following optional services:

* **`midgard`** - a layer 2 REST API that provides front-end consumers with semi real-time rolled up data and analytics of the THORChain network. Most requests to the network will come through Midgard. The Midgard API keeps the chain itself from fielding large quantities of requests, allowing THORNode to focus on validating and propagating blocks across the network. You can think of it as a “read-only slave” to the chain.

Endpoints can be accessed at [Connecting to THORChain in the developer docs](https://dev.thorchain.org/concepts/connecting-to-thorchain.html).&#x20;

### Churning

As new nodes join/leave the network, this triggers a “churning event”. Which means the list of validators that can commit blocks to the chain changes, and also creates a new Asgard vault, while retiring an old one. All funds in this retiring vault are moved to the new Asgard vault.

Normally, a churning event happens roughly every 2 1/2 days (43,200 blocks or [`CHURNINTERVAL`](https://thornode.ninerealms.com/thorchain/mimir)).

#### Churning Out

On every churn, the network selects one or more nodes to be churned out of the network (which can be typically churned back in later). In a given churning event, multiple nodes may be selected to be churned out, but never more than 1/3rd of the current validator set. The criterion the network will take into account is the following:

1. Requests to leave the network (self-removal)
2. Banned by other nodes (network-removal)
3. How long an active nodes has been committing blocks (oldest gets removed)
4. Bad behavior (accrued slash points for poor node operation)
5. Nodes that do not meet the minimum version requirement (capped by [`MAXNODETOCHURNOUTFORLOWVERSION`](https://thornode.ninerealms.com/thorchain/mimir))

#### Churning In

On every churn, the network may select one or more nodes to be churned into the network but never adds more than one to the total. Which nodes that are selected are purely by validator bond size. Larger bond nodes are selected over lower bond nodes.

## Risk of Running a Node

Deciding to run a node should be carefully considered and thought through. While the payoffs/rewards can be significant, there can also be an equally significant costs.

### Risks to Bond

To run a node, you must obtain a significant amount of Rune, minimums [apply](overview.md#churning-in). This RUNE is sent into the network as “bond” and held as leverage on each node to ensure they behave in the best interest of the network.

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

* Setting a Node Operator fee in basis points, which causes rewards to be paid directly to the Node Operator address after each churn. See [here](joining.md#node-operator-fee) for details on how to set a Node Operator fee.
* If no Node Operator fee is set, 100% of rewards will be accrued back to the bond after each churn. A Node Operator must then either LEAVE or wait until the node churns out to unbond principal or rewards.

Node Operators earn rewards relative to their bond; the more they bond, the more they earn, up to the effective bond cap (the highest bond of the bottom 2/3rd active nodes). Over time, this incentive increases the median bonded amount, increasing the security of the network and allows the network to grow. [See Keeping Track of Rewards](overview.md#keeping-track) below for more details.

Rewards are affected by the [Emission Schedule](../how-it-works/emission-schedule.md) and the [Incentive Pendulum](../how-it-works/incentive-pendulum.md). Over time, the Emission Schedule decreases the amount of RUNE allocated to nodes. The Incentive Pendulum increases and decreases the amount of RUNE allocated to nodes according to the security and capital efficiency of the network.

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
{{RewardAllocation * EmissionRate} \over {NumberOfNodes}}
$$

An example with mainnet day 1 inputs:

* 33 nodes
* 3.06 million RUNE rewards emitted per month
* 67% of rewards allocated to nodes (stable Incentive Pendulum)

$$
{{{0.67 * 3060000} \over {33}}} = 62,127
$$

In this example, an individual operator would receive 62,127 RUNE over the month.

## Costs

Depending on how the node was set up, it will likely cost between $2,000 and $3,500 per month, potentially more as the blockchain scales and more chain integrations are added. The main driver of costs is resource allocation to hosting the fullnode daemons required for each of THORNode's chain integrations.

## Skillsets

Running a THORNode is no simple task. As an operator, you will need to run/maintain multiple linux servers with extremely high uptime. It is encouraged that only professional systems engineers run nodes to maintain the highest quality reliability and security of the network. The simple question to know if you have the skillsets to run a THORNode is:

> _Have you used pagerduty before?_

If the answer is no, it’s probably best that you do not run a node and participate in the network in other ways. The following skill sets are required to be an effective node operator.

* Advanced knowledge of Linux server administration and security
* Advanced knowledge of Kubernetes
* Advanced experience running a host of nodes on a hosted platform such as AWS, Google Cloud, Digital Ocean, etc
* Knowledge of running full nodes for other chains such as Bitcoin, Ethereum, and Binance.
* Willingness to be “on call” at all times to respond to issues when/if your node becomes unavailable

## THORNode Details

### **Node Accounts**

When you run a THORNode, each THORNode will have its own node account. An example node account looks like this:

```json
{
  "node_address": "thor10rgvc7c44mq5vpcq07dx5fg942eykagm9p6gxh",
  "status": "Active",
  "pub_key_set": {
    "secp256k1": "thorpub1addwnpepq2gmjlu6y0whj8gtfnl3ccta66zx3u5p04wdh834e065x4z6qndzsulj5aa",
    "ed25519": "thorpub1zcjduepqxg5dfc27l3tw2xrxtw63025gaxwup723y0t7p8w2ww37vqgvyw7q348pxp"
  },
  "validator_cons_pub_key": "thorcpub1zcjduepqaxvrp5xjrmg65e3a06sdkr5z7y67xdlzyetlx40p857gxw5g4tqs2xdavr",
  "peer_id": "16Uiu2HAm5EX9mPRpLgWYg7uH7WgSdBGXvfkXNhuAinCKUh1Agnas",
  "active_block_height": 14561460,
  "status_since": 14561460,
  "node_operator_address": "thor10afkwx5heh26fjwum682neq7wkkre5md0wp8vc",
  "total_bond": "96410371093662",
  "bond_providers": {
    "node_operator_fee": "2000",
    "providers": [
      {
        "bond_address": "thor10afkwx5heh26fjwum682neq7wkkre5md0wp8vc",
        "bond": "96410371093662"
      }
    ]
  },
  "signer_membership": [...pub keys of asgard vault memembership],
  "requested_to_leave": false,
  "forced_to_leave": false,
  "leave_height": 0,
  "ip_address": "<redacted>",
  "version": "1.134.0",
  "slash_points": 659,
  "jail": {
    "release_height": 17208649,
    "reason": "failed to perform keysign"
  },
  "current_award": "15968622725",
  "observe_chains": [...block heights of last observed tx on external chains],
  "preflight_status": {
    "status": "Ready",
    "reason": "OK",
    "code": 0
  }
}
```

To get node account information, make an HTTP call to your `thornode` port which will look like the following:

```
http://<host>:1317/thorchain/nodeaccount/<node address>
http://<host>:1317/thorchain/nodeaccounts
```

Or use `https://thornode.ninerealms.com/thorchain/node/<node address>.`

Most importantly, this will tell you how many slash points the node account has accrued, their status, and the size of their bond (which is in 1e8 notation, 1 Rune == 100000000).

### **Node Statuses**

Types of node status:

1. **Unknown** - this should never be possible for a valid node account
2. **Whitelisted** - node has been bonded, but hasn’t set their keys yet
3. **Standby** - waiting to have minimum requirements verified to become “ready” status. This check happens on each churn event (3 days on average).
4. **Ready** - node has met minimum requirements to be churned and is ready to do so. Could be selected to churn into the network. Cannot unbond while in this status.
5. **Active** - node is an active participant of the network, by securing funds and committing new blocks to the THORChain blockchain. Cannot unbond while in this status.
6. **Disabled** - node has been disabled by use of LEAVE while in standby, and cannot re-join.

## Node Voting

THORNodes have the ability to vote on [Mimir](https://midgard.thorchain.info/v2/thorchain/mimir) settings.

Mimir settings have specific [abilities](https://gitlab.com/thorchain/thornode/-/blob/develop/docs/mimir.md). The process for voting from a node is:

```
Make mimir
=> Enter THORNode Mimir key: <key>
=> Enter THORNode Mimir value: <value>
```

1. Mimir keys and values are listed in the [Mimir endpoint](https://midgard.thorswap.net/v2/thorchain/mimir).
2. A node can vote at any time on any key value.
3. A node's vote is valid as long as they are active (and removed if they are not).
4. 2/3rds of active nodes need to agree for the change to happen
5. If 2/3rds consensus is not reached, Mimir admin takes priority, or a constant if present.
6. A node can change their vote anytime.
7. A node can delete their vote by using -1 value
8. Voting costs one native transaction fee, which is deducted from their bond.

---
description: Overview of THORNodes
---

# THORNode Overview

## Overview

THORNodes service the THORChain network, of which there is intended to be initially 99. Each THORNode is comprised of several independent servers in a cluster. All THORNodes communicate and operate in cooperation to create a cross-chain swapping network.

To set up a node, you have three choices:

1. Set up manually
2. Set up via Kubernetes
3. Set up via Provider \(coming soon\)

{% page-ref page="manual.md" %}

{% page-ref page="kubernetes/" %}

## THORNode Stack

Each THORNode is comprised of 5 major components.

1. **`thord`** - this is a daemon that runs the THORChain chain itself
2. **`thor-api`** - this daemon runs an HTTP server, that gives a RESTful API to the chain
3. **`bifrost`** - this daemon creates connections to remote chains \(like Bitcoin, Ethereum, Binance, etc\) to both observe activity on those chains \(incoming/outgoing transactions\), and also sign/broadcast outgoing transactions \(moving funds on remote chains\).
4. **`thor-gateway`**: THORNode gateway proxy to get a single IP address for multiple deployments
5. **`midgard`** - this daemon is a layer 2 REST API that provides front-end consumers with semi real-time rolled up data and analytics of the THORChain network. Most requests to the network will come through Midgard. This daemon is here to keep the chain itself from fielding large quantities of requests. You can think of it as a “read-only slave” to the chain. This keeps the resources of the network focused on processing transactions.
6. **Full nodes** - for every chain that is supported by the network, each THORNode operator will run their own full node of each chain \(Bitcoin, Ethereum, Binance, etc\).

### Churning

As new nodes join/leave the network, this triggers a “churning event”. Which means the list of validators that can commit blocks to the chain changes, and also creates a new Asgard vault, while retiring an old one. All funds in this retiring vault are moved to the new Asgard vault.

Normally, a churning event happens every 3 days \(50,000 blocks\), although it is possible for it to happen more frequently \(such as when a node optionally requests to leave the network using the `LEAVE` memo\).

#### Churning Out

On every churn, the network selects one or more nodes to be churned out of the network \(which can be typically churned back in later\). In a given churning event, multiple nodes may be selected to be churned out, but never more than 1/3rd of the current validator set. The criterion the network will take into account is the following:

1. Requests to leave the network \(self-removal\)
2. Banned by other nodes \(network-removal\)
3. How long an active nodes has been committing blocks \(oldest gets removed\)
4. Bad behavior \(accrued slash points for poor node operation\)

#### Churning In

On every churn, the network may select one or more nodes to be churned into the network but never adds more than one to the total. Which nodes that are selected are purely by validator bond size. Larger bond nodes are selected over lower bond nodes.

{% hint style="info" %}
There is a endpoint on Midgard that has deep analytics in mean and median active & standby bond sizes to drive efficient discovery of the best "bond" size.  
Whilst 1,000,000 is the minimum, competition to get in will drive it up, and in the long term it is likely to stabilise between 2m and 2.5m RUNE.

The network is safe when it is over-bonded, but it shrewd Node Operators will probably actively manage their bond and pool part of it instead to maximise yield.
{% endhint %}

## Risk of Running a Node

Deciding to run a node should be carefully considered and thought through. While the payoffs/rewards can be significant, there can also be an equally significant costs.

### Risks

To run a node, you must obtain a significant amount of Rune, currently 1 million Rune. This Rune is sent into the network as “bond” and held as leverage on each node to ensure they behave in the best interest of the network. Running a malicious or unreliable node results in a slashing of this bond.

Here are the ways in which a validator’s bond can get slashed

* **Double Sign** \(5% of minimum bond\) - if it is observed that a single validator node is committing blocks on multiple chains. To avoid this, never run two nodes with the same node account at the same time.
* **Not Observing** \(2 slash pts\) - if a node does not observe transactions for all chains, while other nodes do, they get slash points added.
* **Not signing a transaction** \(600 slash pts\) - if a node does not sign an outbound transaction, as requested by the network, they will get slash points added.
* **Unauthorized transaction** \(1.5x transaction value\) - if a node sends funds without authorization, the bond is slashed 1.5x the value of the stolen funds. The slashed bond is dumped into the pool\(s\) where the funds were stolen and added to the reserve.
* **Fail to keygen** \(1 hr of revenue\) - When the network attempts to churn, and attempts to create a new Asgard pubkey for the network, and fails to do so due to a specific node\(s\), they will lose 1 hr of revenue from their bond. 

Slash points undo profits made on the network. For every 1 slash point a node receives, they lose 1 block of profits. If a node account has more slash points than blocks they have been active, they will lose the equivalent in bond.

## Compensation

### Bond Rewards

Node Operators receive rewards if they are bonded and active on the network and are paid out in Rune. While revenue is generated every block \(every 5 seconds\) to each operator, those funds are not available to the operator until they churn out of the network. Each operator makes the same amount of income, no matter how much they bond to the network.They're claimed whenever a node leaves the network. See [Keeping Track of Rewards](overview.md#keeping-track-of-bond-rewards) below for more details.

Nodes receive the same amount of rewards regardless of how much [RUNE](../rune.md) they've bonded. This stabilises the amount that nodes need to bond. Over time, this stability increases the median bonded amount and the security of the network.

Rewards are affected by the [Emission Schedule](../how-it-works/emission-schedule.md) and the [Incentive Pendulum](../how-it-works/incentive-pendulum.md). Over time, the Emission Schedule decreases the amount of RUNE allocated to nodes. The Incentive Pendulum increases and decreases the amount of RUNE allocated to nodes according to the security and capital efficiency of the network.

#### Keeping Track

When a node joins the network the current block height is recorded. The system creates one block unit for every active node for every active block, and has a running total of the block units created. When a node leaves, it cashes in its block units for a portion of the bond rewards. The spent block units are destroyed.

For example, there are 10000 RUNE in bond rewards outstanding. Node A has been active for 30 blocks, and has 33 block units, but accrued 3 slash points. There are 1000 block units in total. Node A leaves the network and cashes in its 30 block units \(33 - 3\). It receives 300 RUNE \(\(30/1000\) \* 10000\), leaving 9700 RUNE in node rewards. Its 33 block units are destroyed, leaving 967 block units left.

### Income

Income for one node can be estimated based on a few inputs:

* Number of active nodes
* Reward emission rate
* % of rewards allocated to notes, set by the Incentive Pendulum
* Price of RUNE\*

These inputs should be plugged into the following formula:

$$
{{RewardAllocation * EmissionRate} \over {NumberOfNodes}}
$$

An example with mainnet day 1 inputs:

* 33 nodes
* 3.06 million RUNE rewards emitted per month
* 67% of rewards allocated to nodes \(stable Incentive Pendulum\)

$$
{{{0.67 * 3060000} \over {33}}} = 62,127
$$

In this example, an individual operator would receive 62,127 RUNE over the month.

## Costs

Depending on how the node was set up, it will likely cost between $1000 and $2000 per month, potentially more as the blockchain scales. The main driver of costs is resource allocation to hosting each THORNode service.

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

```text
{
  "node_address": "thor19h62vypuelrj0pv4jhl26wf79yr5zhxcmd5w85",
  "status": "active",
  "pub_key_set": {
    "secp256k1": "thorpub1addwnpepq0ylvhrqepmsm3rqxr4ecuyx42l4y29g2d932zlse258432ccuy8spmddj5",
    "ed25519": "thorpub1addwnpepq0ylvhrqepmsm3rqxr4ecuyx42l4y29g2d932zlse258432ccuy8spmddj5"
  },
  "validator_cons_pub_key": "thorcpub1zcjduepqzknjn39xtkdzr6a2zuzry7f02rn3cnqvy8ar7p2admk80j8xageqj9slpw",
  "bond": "30240000000000",
  "active_block_height": "180",
  "bond_address": "tbnb1rqhrnvyex4p5zchhu0slgr76dc4cl5dnvzxx2h",
  "status_since": "123",
  "signer_membership": [
    "thorpub1addwnpepqwm3arc5xqgjf8yt70psygcjasfj3c776cux4yxcaacyd9vm859lckczll7"
  ],
  "requested_to_leave": false,
  "forced_to_leave": false,
  "leave_height": "0",
  "ip_address": "206.189.235.75",
  "version": "0.1.0",
  "slash_points": "17",
  "jail": {
    "node_address": "thor19h62vypuelrj0pv4jhl26wf79yr5zhxcmd5w85",
    "release_height": "2393",
    "reason": "failed to perform keysign"
  }
}
```

Most importantly, this will tell you how many slash points the node account has accrued, their status, and the size of their bond \(which is in 1e8 notation, 1 Rune == 100000000\).

### **Node Statuses**

Types of node status:

1. **Unknown** - this should never be possible for a valid node account
2. **Whitelisted** - node has been bonded, but hasn’t set their keys yet
3. **Standby** - waiting to have minimum requirements verified to become “ready” status. This check happens on each churn event \(3 days on average\).
4. **Ready** - node has met minimum requirements to be churned and is ready to do so. Could be selected to churn into the network. Cannot unbond while in this status.
5. **Active** - node is an active participant of the network, by securing funds and committing new blocks to the THORChain blockchain. Cannot unbond while in this status.
6. **Disabled** - node has been disabled. 

To get node account information, make an HTTP call to your `thor-api` port which will look like the following:

```text
http://<host>:1317/thorchain/nodeaccount/<node address>
http://<host>:1317/thorchain/nodeaccounts
```


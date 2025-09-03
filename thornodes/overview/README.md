---
description: Overview of THORNodes
---

# THORNode Overview

## Overview

THORNodes service the THORChain network. Each THORNode is comprised of several independent servers in a cluster. All THORNodes communicate and operate in cooperation to create a cross-chain swapping network. Running a node is a serious undertaking. While Node Operators are well [compensated ](./#compensation)for running a node, there are also [risks](risks-costs-and-rewards.md), [skills required](./#skillsets) and [costs](risks-costs-and-rewards.md#costs).

See the [Node Operator 101 Video](https://youtu.be/XXYXNAolPEU) to learn more before running a node.

{% embed url="https://youtu.be/XXYXNAolPEU" %}

To understand more about running a THORNode, see the below links:

{% content-ref url="risks-costs-and-rewards.md" %}
[risks-costs-and-rewards.md](risks-costs-and-rewards.md)
{% endcontent-ref %}

{% content-ref url="thornode-stack.md" %}
[thornode-stack.md](thornode-stack.md)
{% endcontent-ref %}

{% content-ref url="node-operations.md" %}
[node-operations.md](node-operations.md)
{% endcontent-ref %}

## THORNode Dashboards

THORNode information can be viewed at the following dashboards:

1. [thorchain.network](https://thorchain.network/nodes) - Comprehensive THORNode dashboard
2. [thorchain.net](https://thorchain.net/nodes) - THORNode information and network statistics
3. [runescan.io](https://runescan.io/nodes) - THORNode information within the block explorer
4. [thorcharts.org](https://thorcharts.org/thorchain_earnings_distribution) - Earning distribution and other historical data

## Skillsets

Running a THORNode is no simple task. As an operator, you will need to run/maintain multiple linux servers with extremely high uptime. It is encouraged that only professional systems engineers run nodes to maintain the highest quality reliability and security of the network. The simple question to know if you have the skillsets to run a THORNode is:

> _Have you used pagerduty before?_

If the answer is no, it’s probably best that you do not run a node and participate in the network in other ways, such as a [RUNEPool participant](../../thorchain-finance/runepool.md)or a [bond provider.](../pooled-thornodes.md) The following skill sets are required to be an effective node operator.

* Advanced knowledge of Linux server administration and security
* Advanced knowledge of Kubernetes
* Advanced experience running a host of nodes on a hosted platform such as AWS, Google Cloud, Digital Ocean, etc
* Knowledge of running full nodes for other chains such as Bitcoin andEthereum.
* Willingness to be “on call” at all times to respond to issues when/if your node becomes unavailable

## Creating a Node

To set up a node, you have two choices:

1. Set up manually (not recommended unless you are an expert)
2. Set up via Kubernetes (recommended)

You can create a bare metal node with your own hardware or use the cluster launcher section for step by step guides using a host provider:

{% embed url="https://medium.com/@Runetard/bare-metal-node-n00b-guide-a29c5c067b4a" %}

{% content-ref url="../kubernetes/" %}
[kubernetes](../kubernetes/)
{% endcontent-ref %}

Once created, follow the [Deploying](../deploying.md), [Joining](../joining.md) and [Managing](../managing.md) pages.

## Node Voting

THORNodes have the ability to vote on [Mimir](https://midgard.thorchain.info/v2/thorchain/mimir) settings. This is important when voting for [ADRs](https://dev.thorchain.org/architecture/index.html) and important network changes.

Mimir settings have specific [abilities](https://gitlab.com/thorchain/thornode/-/blob/develop/docs/mimir.md). The process for voting from a node is:

```cmd
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

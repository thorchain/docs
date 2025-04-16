---
description: Node Operators
---

# Node Operators

## THORNodes Overview

THORNodes support the THORChain network. While the initial design target is 100 nodes, the network can scale to over 250+. The design goal of THORChain is such that anyone can join the network with the required funds (permissionless) and be anonymous, yet still be secure. THORChain takes this a step further by having a high churn schedule, kicking out nodes continuously. This high-churn network ensures that it is censorship-resistant, evades capture and resists centralisation.

Each THORNode is comprised of several independent servers in a cluster, which run full-nodes for each connected chain. All THORNodes communicate and operate in cooperation to create a cross-chain swapping network.

{% content-ref url="../../thornodes/overview/" %}
[overview](../../thornodes/overview/)
{% endcontent-ref %}

### Rewards

Node Operators earn 67% of the system income when it is stable. You can read more here:

{% content-ref url="../../thornodes/overview/" %}
[overview](../../thornodes/overview/)
{% endcontent-ref %}

{% content-ref url="../../how-it-works/incentive-pendulum.md" %}
[incentive-pendulum.md](../../how-it-works/incentive-pendulum.md)
{% endcontent-ref %}

### Set up Instructions

Follow these setup up instructions

{% content-ref url="../../thornodes/kubernetes/" %}
[kubernetes](../../thornodes/kubernetes/)
{% endcontent-ref %}

### Anonymity

Node Operators should stay anonymous and never socially signal that they are running a node.

### Tools

There are a variety of tools available in the ecosystem for Node Operators, such as the Telegram Alerts bot:

{% content-ref url="../../thornodes/alerting.md" %}
[alerting.md](../../thornodes/alerting.md)
{% endcontent-ref %}

### Security

The most important aspect is that Nodes must pay for their Bond, since this is a core assumption to the security of the network. If a node pays $1m for their bond, then they will never try to steal assets unless if they can access more than $1m of funds. If they can, then they will make a profit.

If delegation was permitted, a Node Operator that paid $100k in RUNE, can possibly receive $900k in delegated funds to qualify and meet the $1m bond requirement. They will now contemplate stealing assets the moment they get access to more than $100k in capital, which is likely.

{% hint style="danger" %}
Nodes must pay for their bond to ensure the economic assumptions of the network are upheld.
{% endhint %}

### Private Delegation

THORChain makes private delegation possible, because it does not erode towards the issues discussed above.

Private Delegation requires Node Operators to know and whitelist in their bonders, and there can only be up to 100 per node. This assumes the bonders are in trust circles with their operators and have their own recourse to ensure operators act in accordance to their obligations. From the point of view of THORChain, a solo node is no different to a delegated node. The network will operate identically.

In addition, there is no discretion as to fee commissions per operator. This means bonders will prioritise on engaging with operators based purely on their trust circles, not fees.

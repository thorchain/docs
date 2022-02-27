---
description: Node Operators
---

# Node Operators

## Overview

THORNodes service the THORCHain network, of which there is intended to be initially 120. Each THORNode is comprised of several independent servers. All THORNodes communicate and operate in cooperation to create a cross-chain swapping network.

{% content-ref url="../thornodes/overview.md" %}
[overview.md](../thornodes/overview.md)
{% endcontent-ref %}

### Rewards

Node Operators earn 67% of the system income when it is stable. You can read more here:

{% content-ref url="../thornodes/overview.md" %}
[overview.md](../thornodes/overview.md)
{% endcontent-ref %}

{% content-ref url="../network/incentive-pendulum.md" %}
[incentive-pendulum.md](../network/incentive-pendulum.md)
{% endcontent-ref %}

### Set up Instructions

Follow these setup up instructions

{% content-ref url="../thornodes/kubernetes/" %}
[kubernetes](../thornodes/kubernetes/)
{% endcontent-ref %}

### Anonymity

Node Operators should stay anonymous and never socially signal that they are running a node.

### Tools

There are a variety of tools available in the ecosystem for Node Operators, such as the Telegram Alerts bot:

{% content-ref url="../thornodes/alerting.md" %}
[alerting.md](../thornodes/alerting.md)
{% endcontent-ref %}

## Public Delegation Is Not Permitted

For THORChain to work, it needs to be a nuetral ammoral platform that has no opinion on the nature of transactions processed on its network, nor the source or destination of funds. THORChain needs to avoid all sources of bias, subjectivity or localised influence. It needs to be a moving target, shuffling funds and avoiding capture. It needs to treat node operators as second-class citizens, paying them for their services and ejecting any node that has been in the system for too long or starts misbehaving. THORChain treats liquidity providers as first-class citizens and does everything it needs to protect their capital.

Public delegation is not permitted on the THORChain protocol because delegation undermines both the decentralisation of the project as well as its security. However Private Delegation is permitted, but within limits.&#x20;

### Decentralisation and Neutrality

If public delegation was permitted, then Node Operators would begin running initiatives that would try and attract delegated funds, such as marketing campaigns, or reducing commissions to low or negative amounts. This type of behaviour is wide-spread on other DPoS networks. This begins to erode the decentralisation of the network since funds would accumulate with large branded nodes that can pay for large campaigns.

As a follow-on, if nodes began social signalling, they would naturally try and build brands to gain public trust. They would buy domain names, and try and promote on-chain identification of their nodes "monikors" to allow users to easily find and delegate them. Over time, this brand will become more and more associated with the protocol and the protocol would start to lose its neutrality. The branded node would try and assert themselves more and more on the network, and this bias would make its way into the source code and eventually affect how the protocol would operate.

{% hint style="danger" %}
Nodes must stay anonymous and be identified only by their public key and IP address, both of which can be obfuscated from their true identity (such as washing funds prior to bonding and using a proxy node to obfuscate their real IP address).
{% endhint %}

### Security

The most important aspect is that Nodes must pay for their Bond, since this is a core assumption to the security of the network. If a node pays $1m for their bond, then they will never try to steal assets unless if they can access more than $1m of funds. If they can, then they will make a profit.

If delegation was permitted, a Node Operator that paid $100k in RUNE, can possibly receive $900k in delegated funds to qualify and meet the $1m bond requirement. They will now contemplate stealing assets the moment they get access to more than $100k in capital, which is likely.

{% hint style="danger" %}
Nodes must pay for their bond to ensure the economic assumptions of the network are upheld.
{% endhint %}

### Private Delegation

THORChain makes private delegation possible, because it does not erode towards the issues discussed above.&#x20;

Private Delegation requires Node Operators to know and whitelist in their bonders, and there can only be up to 6 per node. This assumes the bonders are in trust circles with their operators and have their own recourse to ensure operators act in accordance to their obligations. From the point of view of THORChain, a solo node is no different to a delegated node. The network will operate identically.&#x20;

In addition, there is no discretion as to fee commissions per operator. This means bonders will prioritise on engaging with operators based purely on their trust circles, not fees.&#x20;

The limit of 6 bonders per node ensures that Operators can't try to access economies of scale. They are limited to large RUNE holders only.&#x20;


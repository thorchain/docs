---
description: How to leave THORChain
---

# Leaving

## Overview

Approximately every 2 1/2 days (43,200 blocks or [`CHURNINTERVAL`](https://thornode.ninerealms.com/thorchain/mimir)) the system will churn its vaults and nodes.

Outgoing:

1. Nodes wishing to leave, and/or
2. The most unreliable node(s), and/or
3. The oldest node
4. But a maximum of 1/3rd the network

Incoming:

1. The node(s) with the highest bond (2 or [`NUMBEROFNEWNODESPERCHURN`](https://thornode.ninerealms.com/thorchain/mimir)).

Churned out nodes will be put in standby, but their bond will not automatically be returned. They will be credited any earned rewards in their last session. If they do nothing, but keep their cluster online and up-to-date with the latest THORNode version, they will be eventually churn back in.

Alternatively, an "Active" node can leave the system voluntarily, in which case they are marked to churn out first.

{% hint style="warning" %}
It is assumed nodes that wish to LEAVE while on Standby will be away for a significant period of time, so by permanently jailing their address, it forces them to completely destroy and re-build before re-entering. This also ensures they are running the latest software.
{% endhint %}

## Unbonding

{% hint style="info" %}
You cannot unbond if you are "Ready" or "Active".
{% endhint %}

If a Node Operator wants to retrieve part of their bond & rewards (such as deciding to take profits), they can simply Unbond. This keeps their Node on standby, ready to be churned back in.

To unbond from the system, simply send an **UNBOND** transaction.

Example, this will draw out 10k in RUNE from the bond, as long as the remaining amount is higher than the minimum bond.

`UNBOND:<node address>:1000000000000`

{% hint style="info" %}
THORChain always treats assets in 1e8 'base format' ie, 1.0 RUNE = 100,000,000 units (tor). To get from one to the other, simply multiply by 100m.
{% endhint %}

{% hint style="info" %}
If using ASGARDEX to **BOND** or **UNBOND**, simply put the RUNE amount, e.g. "100" for 100 RUNE. It does the memo in 1e8 for you.
{% endhint %}

{% hint style="info" %}
You can get your node address by running `make status`
{% endhint %}

{% hint style="warning" %}
Only the address that originally bonded the funds can **UNBOND** or **LEAVE**.\
This ensures you can safely leave this system if you no longer have access to your node (but it is still running).
{% endhint %}

## Issues with Unbonding/Leaving

If you cannot unbond, check your node's status and ensure you are in Standby mode. Only nodes in Standby mode can unbond or leave.

## Leaving

1. If a node issues a LEAVE while Active, they are eligible to churn back in on the next churn
2. If a node issues a LEAVE while on Standby, the node is considered Disabled and will never churn back in.

To leave the system, send the following transaction from your original bond address to the Vault Address: `LEAVE:<ADDRESS>` with at least 1 RUNE.

**Example**:

`LEAVE:<node address>`

⏱ _Wait a few hours, verify on the /nodes endpoint that you are now `Disabled`_ 👀 Then send another LEAVE:

`LEAVE:<node address>`

⏱ _Wait a few minutes, verify you have received your bond back_ 👀 - `make status` should show `BOND 0.00` and your wallet should get the full Bond back.

{% hint style="info" %}
View your node's status on [Runescan](https://runescan.io) or the [THORNode API](https://thornode.thorchain.info/thorchain/nodes).
{% endhint %}

_🔥 Commence destroying your node 🔥_

## Destroying

### Confirming you have left

You should complete this checklist before you do the next step:

1. Have you sent a final **LEAVE** transaction and have you received your BOND back - ie 1,000,000 RUNE, and can your account for any slash points or rewards?

If yes, then proceed:

### DESTROY

To destroy and remove previously created resources, you can run the command below.

{% hint style="danger" %}
Destroying your cluster will completely destroy your node, including purging all keys on it.

**DO NOT DO THIS UNTIL YOUR NODE HAS CHURNED OUT AND YOU HAVE VERIFIED YOUR BOND IS COMPLETELY RETURNED**

IF YOU DESTROY A NODE PREMATURELY, YOU MAY LOSE A SIGNIFICANT AMOUNT OF FUNDS
{% endhint %}

### 1) Destroying the Node and Tools

First, destroy the node and tools, this will delete your node then your tooling 1-by-1. Do this from the `node-launcher` repo:

```bash
make destroy-tools
```

![Destroying the Tooling](<../.gitbook/assets/image (28) (1).png>)

### 2) Destroy the cluster

Then destroy the cluster from the `cluster-launcher` repo:

{% tabs %}
{% tab title="AWS" %}
You will be asked to enter your cluster name and region (the same as what you [put in when you first deployed](https://docs.thorchain.org/thornodes/kubernetes/setup#deploy-kubernetes-cluster)).

```bash
make destroy-aws
```

{% endtab %}

{% tab title="DO" %}
You will be asked to enter your cluster name and region, as well as your Personal Token (the same as what you [put in when you first deployed](https://docs.thorchain.org/thornodes/kubernetes/setup#deploy-kubernetes-cluster)).

```bash
make destroy-do
```

{% endtab %}
{% endtabs %}

You will be asked to confirm:

![](<../.gitbook/assets/image (26) (1).png>)

{% hint style="danger" %}
**DO NOT DESTROY YOUR NODE UNTIL YOU HAVE CHURNED OUT AND HAVE RECEIVED YOUR FULL BOND BACK IN YOUR CUSTODY**

**IF YOU DESTROY YOUR NODE WITH FUNDS LOCKED UP - YOU WILL LOSE A SIGNIFICANT QUANTITY OF FUNDS**
{% endhint %}

![Final destroy complete](<../.gitbook/assets/image (27) (1).png>)

---
description: How to leave THORChain
---

# Leaving

## Overview

Every 50,000 Blocks \(3 days\) the system will churn its nodes:

1. The oldest node, or
2. The most unreliable node

Churned nodes will be put in standby, but their bond will not automatically be returned. They will be credited any earned rewards in their last session. If they do nothing but keep their cluster online, they will be eventually churned back in. 

Alternatively, a node can leave the system voluntarily, in which case they are typically churned out 6 hours later. Leaving is considered permanent, and the node-address is permanently jailed. This prevents abuse of the **LEAVE** system since leaving at short notice is disruptive. 

{% hint style="warning" %}
It is assumed nodes that wish to **LEAVE** will be away for a significant period of time, so by permanently jailing their address, it forces them to completely destroy and re-build before re-entering. This also ensures they are running the latest software. 
{% endhint %}

## Unbonding

{% hint style="info" %}
You can only unbond when your Node is on "standby", ie, just before it is selected to churn in, or after it is churned out. 
{% endhint %}

If a Node Operator wants to retrieve part of their bond & rewards \(such as deciding to take profits and contribute as a liquidity provider in order to maximise yield\), they can simply Unbond. This keeps their Node on standby, ready to be churned back in. 

To unbond from the system, simply send an **UNBOND** transaction to the Vault Address with at least 1 satoshi in funds. The amount and type of asset you use to send to THORChain is actually irrelevant, you are simply passing transaction intent to THORChain and proving you own your bond address. 

Example, this will draw out 10k in RUNE from the bond, as long as the remaining amount is higher than the minimum bond. 

`UNBOND:thor1ryr5eancepklax5am8mdpkx6mr0rg4xjnjx6zz:1000000000000`

{% hint style="info" %}
THORChain always treats assets in 1e8 "base format" ie, 1.0 RUNE = 100,000,000 units. To get from one to the other, simply multiply by 100m. 
{% endhint %}

{% hint style="info" %}
You can get your node address, as well as the current vault address by running `make status`
{% endhint %}

{% hint style="warning" %}
Only the address that originally bonded the funds can **UNBOND** or **LEAVE**.   
This ensures you can safely leave this system if you no longer have access to your node \(but it is still running\). 
{% endhint %}

## Leaving

Leaving is considered permanent. There are two steps.

1.  If you are **active**, send a LEAVE transaction to start a churn-out process. This could take several hours.
2. If you are **standby,** send a LEAVE transaction to get your bond back and be permanently jailed. 

To leave the system, send the following transaction from your original bond address to the Vault Address: `LEAVE:<ADDRESS>` with at least 1 satoshi in funds. 

**Example**:

`LEAVE:thor1ryr5eancepklax5am8mdpkx6mr0rg4xjnjx6zz`

⏱_Wait a few hours, verify on the /nodeaccount endpoint that you are now  **`disabled`**👀_

`LEAVE:thor1ryr5eancepklax5am8mdpkx6mr0rg4xjnjx6zz`

⏱_Wait a few minutes, verify you have received your bond back 👀_

_🔥 Commence destroying your node 🔥_

{% hint style="danger" %}
If your node is both offline and inaccessible, then it will be unable to return any assets in its yggdrasil vaults and it will be slashed 1.5x the value of those assets. 

Example: If your node has a $500k bond \(in RUNE\), but has $100k in assets in its vaults it can't return, it will lose $150k in RUNE from its bond. The Node will get back $350k in its bond. 
{% endhint %}

#### Confirming you have left

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

#### 1\) Destroying the Node and Tools

First, destroy the node and tools, this will delete your node then your tooling 1-by-1. Do this from the `node-launcher` repo:

```text
make destroy destroy-tools
```

![Destroying the Tooling](../.gitbook/assets/image%20%2828%29.png)

#### 2\) Destroy the cluster

Then destroy the cluster from the `cluster-launcher` repo:

{% tabs %}
{% tab title="AWS" %}
You will be asked to enter your cluster name and region \(the same as what you [put in when you first deployed](https://docs.thorchain.org/thornodes/kubernetes/setup#deploy-kubernetes-cluster)\).

```text
make destroy-aws
```
{% endtab %}

{% tab title="DO" %}
You will be asked to enter your cluster name and region, as well as your Personal Token \(the same as what you [put in when you first deployed](https://docs.thorchain.org/thornodes/kubernetes/setup#deploy-kubernetes-cluster)\).

```text
make destroy-do
```
{% endtab %}
{% endtabs %}

You will be asked to confirm:

![](../.gitbook/assets/image%20%2826%29.png)

{% hint style="danger" %}
**DO NOT DESTROY YOUR NODE UNTIL YOU HAVE CHURNED OUT AND HAVE RECEIVED YOUR FULL BOND BACK IN YOUR CUSTODY**

**IF YOU DESTROY YOUR NODE WITH FUNDS LOCKED UP - YOU WILL LOSE A SIGNIFICANT QUANTITY OF FUNDS**
{% endhint %}

![Final destroy complete](../.gitbook/assets/image%20%2827%29.png)


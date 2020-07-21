---
description: How to leave THORChain
---

# Leaving

## Overview

Every 50,000 Blocks \(3 days\) the system will churn its nodes:

1. The oldest node, or
2. The most unreliable node

Alternatively, any node can simply leave the system voluntarily, in which case they are typically churned out 6 hours later. 

## Unbonding

If a Node Operator does not want to leave, but just wants to retrieve part of their bond & rewards \(such as deciding to take profits and contribute as a liquidity provider in order to maximise yield\), they can simply Unbond. This keeps their Node on standby, ready to be churned back in. 

To unbond from the system, simply send the following transaction to the Vault Address: `UNBOND:<ADDRESS>:AMOUNT` with at least 1 satoshi in funds. The amount and type of asset you use to send to THORChain is actually irrelevant, you are simply passing transaction intent to THORChain. 

Example, this will draw out 10k in RUNE from the bond, as long as the remaining amount is higher than the minimum bond. 

`UNBOND:thor1ryr5eancepklax5am8mdpkx6mr0rg4xjnjx6zz:1000000000`

{% hint style="info" %}
You can only unbond when your Node is on "standby", ie, just before it is selected to churn in, or after it is churned out. 
{% endhint %}

## Leaving

To leave the system, simply send the following transaction from your original bond address to the Vault Address: `LEAVE:<ADDRESS>` with at least 1 satoshi in funds. 

Example:

`LEAVE:thor1ryr5eancepklax5am8mdpkx6mr0rg4xjnjx6zz`

{% hint style="info" %}
You can get your node address, as well as the current vault address by running `make status`
{% endhint %}

{% hint style="warning" %}
Only the address that originally bonded the funds can UNBOND or LEAVE.   
This ensures you can safely leave this system if you no longer have access to your node \(but it is still running\). 
{% endhint %}

{% hint style="danger" %}
If your node is both offline and inaccessible, then it will be unable to return any assets in its yggdrasil vaults and it will be slashed 1.5x the value of those assets. 

Example: If your node has a $500k bond \(in RUNE\), but has $100k in assets in its vaults it can't return, it will lose $150k in RUNE from its bond. The Node will get back $350k in its bond. 
{% endhint %}



### DESTROY

To destroy and remove previously created resources, you can run the command below.

{% hint style="danger" %}
Destroying your cluster will completely destroy your node, including purging all keys on it. 

**DO NOT DO THIS UNTIL YOUR NODE HAS CHURNED OUT AND YOU HAVE VERIFIED YOUR BOND IS COMPLETELY RETURNED**

IF YOU DESTROY A NODE PREMATURELY, YOU MAY LOSE A SIGNIFICANT AMOUNT OF FUNDS
{% endhint %}

#### 1\) Destroying Tools

First, destroy the tools, this will delete all your tooling 1-by-1. Do this from the `helm-charts` repo:

```text
make destroy destroy-tools
```

![Destroying the Tooling](../.gitbook/assets/image%20%2827%29.png)

#### 2\) Destroy the cluster

Then destroy the cluster from the `terraform-scripts` repo:

```text
make destroy-aws
```

You will be asked to enter your cluster name and region \(the same as what you [put in when you first deployed](https://docs.thorchain.org/thornodes/kubernetes/setup#deploy-kubernetes-cluster)\).

You will be asked to confirm:

![](../.gitbook/assets/image%20%2826%29.png)

{% hint style="danger" %}
**DO NOT DESTROY YOUR NODE UNTIL YOU HAVE CHURNED OUT AND HAVE RECEIVED YOUR FULL BOND BACK IN YOUR CUSTODY**

**IF YOU DESTROY YOUR NODE WITH FUNDS LOCKED UP - THEY COULD BE FOREVER LOST AND YOU WILL LOSE A SIGNIFICANT QUANTITY OF FUNDS**
{% endhint %}


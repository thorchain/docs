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

If a Node Operator does not want to leave, but just wants to retrieve part of their bond & rewards \(such as deciding to take profits and contribute as a liquidity provider in order to maximise yield\), they can simply Unbond. This keeps their Node ons standby, ready to be churned back in. 

To unbond from the system, simply send the following transaction to the Vault Address: `UNBOND:AMOUNT` with at least 1 satoshi in funds. The amount and type of asset you use to send to THORChain is actually irrelevant, you are simply passing transaction intent to THORChain. 

Example, this will draw out 10k in RUNE from the bond, as long as the remaining amount is higher than the minimum bond. 

`UNBOND:1000000000`

{% hint style="info" %}
You can only unbond when your Node is on "standby", ie, just before it is selected to churn in, or after it is churned out. 
{% endhint %}

## Leaving

To leave the system, simply send the following transaction to the Vault Address: `LEAVE` with at least 1 satoshi in funds. 

Example:

`LEAVE`

{% hint style="info" %}
You can get your node address, as well as the current vault address by running `make status`
{% endhint %}




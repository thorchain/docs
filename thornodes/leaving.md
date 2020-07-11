---
description: How to leave THORChain
---

# Leaving

## Overview

Every 50,000 Blocks \(3 days\) the system will churn its nodes:

1. The oldest node, or
2. The most unreliable node

Alternatively, any node can simply leave the system voluntarily, in which case they are typically churned out 6 hours later. 

## Leaving

To leave the system, simply send the following transaction to the Vault Address: `LEAVE:<node-address>` with at least 1 satoshi in funds. The amount and type of asset you use to send to THORChain is actually irrelevant, you are simply passing transaction intent to THORChain. 

Example:

`LEAVE:thor1ryr5eancepklax5am8mdpkx6mr0rg4xjnjx6zz`

{% hint style="info" %}
You can get your node address, as well as the current vault address by running `make status`
{% endhint %}




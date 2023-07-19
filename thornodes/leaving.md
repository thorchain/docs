---
description: How to leave THORChain
---

# Leaving

## Overview

Approximately every 2 1/2 days (43,200 blocks or [`CHURNINTERVAL`](https://thornode.ninerealms.com/thorchain/mimir)) the system will churn its vaults and nodes.&#x20;

Outgoing:

1. Nodes wishing to leave, and/or
2. The most unreliable node(s), and/or
3. The oldest node
4. But a maximum of 1/3rd the network

Incoming:

1. The node(s) with the highest bond (2 or [`NUMBEROFNEWNODESPERCHURN`](https://thornode.ninerealms.com/thorchain/mimir)).

Churned out nodes will be put in standby, but their bond will not automatically be returned. They will be credited any earned rewards in their last session. If they do nothing, but keep their cluster online and up-to-date with the latest THORNode version, they will be eventually churn back in.

Alternatively, an "Active" node can leave the system voluntarily, in which case they are marked to churn out first.&#x20;

{% hint style="warning" %}
It is assumed nodes that wish to **LEAVE** while on Standby will be away for a significant period of time, so by permanently jailing their address, it forces them to completely destroy and re-build before re-entering. This also ensures they are running the latest software.
{% endhint %}

## Unbonding

{% hint style="info" %}
Yggdrasil vaults have been deprecated, see [ADR-002](https://gitlab.com/thorchain/thornode/-/blob/develop/docs/architecture/adr-002-removeyggvaults.md). They may be used again in the future. Nodes that were active before ADR-002 need to leave as described below.&#x20;
{% endhint %}

{% hint style="info" %}
You cannot unbond if you are "Ready" or "Active" or have any amount of funds in your Yggdrasil address.
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

If you can't UNBOND, it means your Yggdrasil vault still has funds on it. This means your node spent more gas than it was supposed to during the cycle (various reasons) and is partially insolvent. To fix this you need to rectify your node's insolvency first (send it the missing funds directly) before doing anything.

## Leaving

1. If a node issues a LEAVE while Active, they are eligible to churn back in on the next churn
2. If a node issues a LEAVE while on Standby, the node is considered Disabled and will never churn back in.

To leave the system, send the following transaction from your original bond address to the Vault Address: `LEAVE:<ADDRESS>` with at least 1 RUNE.

**Example**:

`LEAVE:<node address>`

⏱ _Wait a few hours, verify on the /nodes endpoint that you are now `Disabled`_ 👀  Then send another LEAVE:

`LEAVE:<node address>`

⏱ _Wait a few minutes, verify you have received your bond back_ 👀 - `make status` should show `BOND 0.00` and your wallet should get the full Bond back.

{% hint style="info" %}
Sometimes your Yggdrasil ETH vault may be slightly insolvent due to out-of-gas transactions consuming gas whilst Active. If the network will not let you LEAVE, you may need to manually send your Yggdrasil ETH vault 0.01 - 0.05 ETH from your own personal funds as a top-up, then try LEAVE again. Note: any funds you send to top-up ETH vault you cannot send back to yourself until _AFTER_ your node has left and you have received your bond back, otherwise it will be fined 1.5x what you transfer out.

View your node's vault to find insolvencies:\
https://viewblock.io/thorchain/address/\<nodeAddress>\
https://thornode.thorchain.info/thorchain/vault/\<vaultPubKey>
{% endhint %}

_🔥 Commence destroying your node 🔥_

{% hint style="danger" %}
If your node is both offline and inaccessible, then it will be unable to automatically return any assets in its Yggdrasil vaults and it will be slashed 1.5x the value of those assets.

Example: If your node has a $5m bond (in RUNE), but has $1m in assets in its vaults it can't return, it will lose $1.5m in RUNE from its bond. The Node will only get back $3.5m of its bond.
{% endhint %}

## Contingency: Manual Leave Procedure

If your node is completely offline or destroyed, you will have to perform a manual return of Yggdrasil funds in order to prevent 1.5x bond fine. Ensure you have reviewed this procedure and have all tools ready to go in case you need to do it in _anger_. This is a time-critical event - you have a few hours to return all funds before the network assumes you have stolen them.

{% hint style="info" %}
If you do not perform all of these steps in time, your bond will be fined 1.5x stolen funds. The remaining funds belonging to Yggdrasil `make mnemonic` are now yours; but you just paid a 50% premium for them, losing a lot of money. You can use the following procedure in a similar way to recover these funds.
{% endhint %}

**Requirement**: You have your `make mnemonic` Yggdrasil mnemonic available. If you do not have this, you cannot manually return funds.

Options: 1. _Coming Soon_: Use ASGARDEX for Manual Return.\
2\. _Coming Soon_: Check Discord Dev channels for manual return cli tool.\
3\. Extract Private Key + Manual return each asset using wallets:

Your Yggdrasil `make mnemonic` phrase is used to generate the `m/44'/931'/0'/0/0` private key which is used for _all_ chains. Pasting the mnemonic into common wallets will not work as they will be looking under a different "standard" HD Path. Instead, go to [https://iancoleman.io/bip39/](https://iancoleman.io/bip39/) and paste in your mnemonic, select _RUNE_ from the Dropdown list and in the bottom table, copy the `m/44'/931'/0'/0/0` private key string. Use this to import into wallets.

The next step is to find the latest inbound addresses. Use [https://thornode.thorchain.info/thorchain/inbound\_addresses](https://thornode.thorchain.info/thorchain/inbound\_addresses)

{% hint style="warning" %}
**Do not cache** inbound\_addresses. These are only valid for a short period of time. Always refresh to get the latest before sending funds.
{% endhint %}

{% hint style="warning" %}
Use the **address** field. Chains with a **router** present such as ETH need to send funds via the router smart-contract. Paste the router address into etherscan, click "Contract" and "Write Contract" and use a Web3 wallet to connect.
{% endhint %}

The **memo** required is `YGGDRASIL-:<BlockHeight>`. For example `YGGDRASIL-:782412`. The block height can be found from the `status_since` field here:

```
https://thornode.ninerealms.com/thorchain/node/<your node address>
```

{% hint style="info" %}
If your node is `standby` or `disabled` status, any integer block height will work for return. e.g. `YGGDRASIL-:1`. The most important thing is to ensure you send to the correct active vault address or router.
{% endhint %}

{% hint style="info" %}
For BTC wallets (BTC, Litecoin) use `importprivkey` in cli.
{% endhint %}

{% hint style="info" %}
For ETH router manual returns, use the `deposit()` function for individual assets. For ETH use contract `0x0`. Use the `returnVaultAssets()` for multiple assets.
{% endhint %}

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

```
make destroy-tools
```

![Destroying the Tooling](<../.gitbook/assets/image (28) (1).png>)

### 2) Destroy the cluster

Then destroy the cluster from the `cluster-launcher` repo:

{% tabs %}
{% tab title="AWS" %}
You will be asked to enter your cluster name and region (the same as what you [put in when you first deployed](https://docs.thorchain.org/thornodes/kubernetes/setup#deploy-kubernetes-cluster)).

```
make destroy-aws
```
{% endtab %}

{% tab title="DO" %}
You will be asked to enter your cluster name and region, as well as your Personal Token (the same as what you [put in when you first deployed](https://docs.thorchain.org/thornodes/kubernetes/setup#deploy-kubernetes-cluster)).

```
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

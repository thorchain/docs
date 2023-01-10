---
description: How to manage a pooled THORNode with separate Operator and Providers.
---

# Pooled THORNodes

## Summary

Skilled Node Operators who don't individually have enough $RUNE to run a node themselves can use the Bond Provider feature to bootstrap bond from other $RUNE holders. Or several nodes can pool together as a single node to maximise their payouts.&#x20;

Node Operators can define up to **6 THOR addresses** as bond providers. These addresses will be able to Bond and Unbond to the node, and earn rewards based on the amount of bond they contribute. Node Operators take a fixed fee of **2000 basis points** (20%) on all rewards from the Bond Providers' bond. In the future this fee may be configurable per node.&#x20;

Check the constants for most up-to-date settings for `MaxBondProviders` and `NodeOperatorFee` - and check current mimir values (which override constants):

* [https://thornode.ninerealms.com/thorchain/constants](https://thornode.ninerealms.com/thorchain/constants)
* [https://thornode.ninerealms.com/thorchain/mimir](https://thornode.ninerealms.com/thorchain/mimir)

### Rationale

The minimum $RUNE needed to churn in as a THORNode is currently set at 300K - but with bond competition, this number could be much higher.&#x20;

Not many people in the world have both the technical skills to run a Validator AND at least 300K $RUNE, which limits the supply of Node Operators who secure THORChain.

Pooled THORNodes provide a way for a skilled Operator to enter a trusted agreement with known Bond Providers to bootstrap enough capital for running a THORNode. The Network's security increases, and more RUNE holders have access to yield-bearing bond-space.&#x20;

### Economic Security

At first glance it might seem Pooled Validators contradict the economic security model of THORChain (i.e. that Node Operators put up twice the value in slash-able bond as the assets they secure). With Pooled Validators it is possible for the Node Operator to individually put up less bond than the value of the assets that the node secures. However this nuance only exists within the relationship between the Node Operator and the Bond Providers. The Network only considers the THORNode as single entity thus the economic model is intact.&#x20;

This is why the Node Operator and the Bond Providers must be in trusting relationships. The network does not care if an Operator steals all of the node's yggdrasil funds (25% of the bond); it will still profit by slashing 37.5% of the node's bond, including that portion contributed by the Bond Providers. This total value will still be at least 1.5x the value that the Node Operator stole.&#x20;

{% hint style="warning" %}
It would be disastrous to THORChain if operators could collect unlimited bond quantities from anon/retail providers. Malicious Operators could start marketing campaigns collecting RUNE and then rug-pull their users, or worse, access economies of scale and take over the network.&#x20;

This is why Pooled THORNodes are invite-only and limited to 6 per node. It is difficult to access economies of scale in these small quantities.&#x20;
{% endhint %}

##

## Managing a Pooled THORNode

### Node Operator

#### Adding a Bond Provider

Add a bond provider using a BOND transaction with a modified memo from a wallet you control (ledger, desktop, thorcli):

`BOND:<NodeAddress>:<BondProviderAddress>`

* NodeAddress - address of Node
* BondProviderAddress - address of provider to whitelist&#x20;
* RUNE TX Value - 1.0 minimum (Anything over 1.0 is added to the Operator's Bond).&#x20;

_A Node Operator is the first on-chain bonding transaction to a new node. You cannot change the operator address after the fact._&#x20;

_The Operator is also added as a Bond Provider._&#x20;

**Removing a Bond Provider**

A Node Provider can remove a bond provider using an UNBOND transaction with a modified memo:

`UNBOND:<NodeAddress>:<Amount>:<BondProviderAddress>`

* NodeAddress - address of Node
* Amount - amount of Bond Provider's bond to refund
* BondProviderAddress - address of Bond Provider to refund/remove
* RUNE TX Value - 0

_This command will refund the Bond Provider their bond and remove them from the Bond Provider list only if `Amount` constitutes all of the bond the Bond Provider is owed._

### Bond Provider

#### Adding/Removing Bond

Once whitelisted, a Bond Provider can Bond and Unbond from the node as normal.&#x20;

**Adding Bond:**

`BOND:<NodeAddress>`&#x20;

* NodeAddress - node to bond to
* RUNE Value - how much to bond

**Removing Bond:**

`UNBOND:<NodeAddress>:<Amount>`

* NodeAddress - node to unbond from
* Amount - amount of RUNE to unbond
* RUNE Value - 0

_Can only be done when the Node is not Active or Ready, but CAN be done immediately after a churn (during funds migration)._&#x20;

{% hint style="info" %}
**When you can add Bond**

When the node is standby, it is not active or churning it, so bond amounts can be increase/decreased.\
\
After the network churns, there is a period of time typically 6 hours, in which the funds migrate to new vaults. Active nodes can add bond here. You can tell the network is migrating if there are `retiring` asgard vaults. \
[https://viewblock.io/thorchain/vaults](https://viewblock.io/thorchain/vaults)
{% endhint %}

{% hint style="warning" %}
**When you can't add Bond**

When the node is active a provider can't increase their bond, since the rewards have not been distributed yet.&#x20;

When the node is ready, it is preparing to churn in, and thus locks in bond quantities.
{% endhint %}

### Reward Shares

Operators and Providers all have a bond amount registered to the node. Operators can start at 0.00 bonded. This on-chain bond amount is summed to the total bond, and thus everyone has a fair share in the Node's principle + rewards.&#x20;

The 20% Operator Fee is distributed first to the operator from all RUNE rewards earnt by a node in a churn. The reward stays on the node bond, just that the Operator's on-chain bond increases.&#x20;

Thus when an Operator or a Provider UNBONDs, everyone gets their fair share.&#x20;

If an Operator LEAVES, all the bond is fairly distributed.&#x20;


---
description: How to manage a pooled THORNode with separate Operator and Providers.
---

# Pooled THORNodes

## Summary

Skilled Node Operators who don't individually have enough $RUNE to run a node themselves can use the Bond Provider feature to collect bond from other $RUNE holders.

Node Operators can define up to **10 THOR addresses** as Bond Providers. These addresses will be able to bond and unbond to the node, earning rewards proportional to the amount of bond they contribute. Node Operators define an operator fee in basis points, which defaults to zero and must be set explicitly when bond providers are added. The Node Operator fee is taken from rewards and paid directly to the Node Operator address after each churn.

### Rationale

The minimum $RUNE needed to churn in as a THORNode is currently set at 300K - but with bond competition, this number could be much higher.&#x20;

Not many people in the world have both the technical skills to run a validator AND at least 300K $RUNE, which limits the supply of Node Operators who secure THORChain.

Pooled THORNodes provide a way for a skilled Operator to enter a trusted agreement with known Bond Providers to bootstrap enough capital for running a THORNode. The Network's security increases, and more RUNE holders have access to yield-bearing bond-space.&#x20;

### Economic Security

At first glance it might seem Pooled Validators contradict the economic security model of THORChain (i.e. that Node Operators put up twice the value in slash-able bond as the assets they secure). With Pooled Validators it is possible for the Node Operator to individually put up less bond than the value of the assets that the node secures. However this nuance only exists within the relationship between the Node Operator and the Bond Providers. The Network only considers the THORNode as single entity thus the economic model is intact.&#x20;

{% hint style="warning" %}
It would be disastrous to THORChain if operators could collect unlimited bond quantities from anon/retail providers. Malicious Operators could start marketing campaigns collecting RUNE and then rug-pull their users, or worse, access economies of scale and take over the network.&#x20;

This is why Pooled THORNodes are invite-only and limited to 10 per node. It is difficult to access economies of scale in these small quantities.&#x20;
{% endhint %}

## Managing a Pooled THORNode

{% hint style="info" %}
All RUNE `Amount` values are in 1e8 decimals, e.g. 1 RUNE = 100000000.
{% endhint %}

### Node Operator

#### Adding a Bond Provider

Add a bond provider using a BOND transaction with a modified memo from a wallet you control (ledger, desktop, thorcli):

`BOND:<NodeAddress>:<BondProviderAddress>:<NodeOperatorFee>`

**Example:** BOND:thor1agftrgu74z84hef6dt6ykhe7cmjf3f8dcpkfun:thor1tfm4q8u57qzsznpvh02s8j483aga63cl02k6jt:2000

* NodeAddress - THORNode address (prefixed by `thor`)
* BondProviderAddress - Bond Provider address to whitelist (prefixed by `thor`)
* NodeOperatorFee - fee in basis points to be taken from rewards and paid directly to Node Operator's address after each churn.
* RUNE TX Value - 1.02 minimum (anything over 1.02 is added to the Operator's Bond).&#x20;

_A Node Operator is the first on-chain bonding transaction to a new node. You cannot change the operator address after the fact._&#x20;

_The Operator is also added as a Bond Provider._&#x20;

**Removing a Bond Provider**

While the node is churned out, A Node Operator can remove a Bond Provider using an UNBOND transaction with a modified memo:

`UNBOND:<NodeAddress>:<Amount>:<BondProviderAddress>`

* NodeAddress - THORNode address (prefixed by `thor`)
* Amount - amount of Bond Provider's bond to refund
* BondProviderAddress - Bond Provider address to refund/remove (prefixed by `thor`)
* RUNE Tx Value - 0.02 minimum

_This command will refund the Bond Provider their bond and remove them from the Bond Provider list only if `Amount` constitutes all of the bond the Bond Provider is owed._

#### Node Operator Fee

Node operators can set a fee that is paid to them from the earnings each churn.&#x20;

To set a Node Operator fee, send a deposit transaction with the following memo:

`BOND:<node address>:<bond wallet address>:<operator fee in basis pts>`

Example: `BOND:thor1agftrgu74z84hef6dt6ykhe7cmjf3f8dcpkfun:thor1tfm4q8u57qzsznpvh02s8j483aga63cl02k6jt:2000`

To adjust the Fee, The no operators can send:\
`BOND:<node address>::<operator fee in basis pts>`

**Example**: `BOND:thor1agftrgu74z84hef6dt6ykhe7cmjf3f8dcpkfun::4000` to see the fee to 40%.

Fees can range from 100 to 9900 basis pts. Setting 0 or 10000 causes all rewards to be to the node operator each churn.

See [here](joining.md#node-operator-fee) for more details.

### Bond Provider

#### Adding/Removing Bond

Once whitelisted, a Bond Provider can Bond and Unbond from the node as normal.&#x20;

**Adding Bond:**

`BOND:<NodeAddress>`&#x20;

* NodeAddress - THORNode address (prefixed by `thor`)
* RUNE Tx Value - Amount of RUNE to bond

**Removing Bond:**

`UNBOND:<NodeAddress>:<Amount>`

* NodeAddress - THORNode address (prefixed by `thor`)
* Amount - Amount of RUNE to unbond
* RUNE Tx Value - 0.02

{% hint style="info" %}
**When you can add Bond**

When the node is standby, it is not active or churning, so bond amounts can be increased/decreased.\
\
After the network churns, there is a period of time typically 6 hours, in which the funds migrate to new vaults. Active nodes can add bond here. You can tell the network is migrating if there are `retiring` Asgard Vaults. \
[https://viewblock.io/thorchain/vaults](https://viewblock.io/thorchain/vaults)
{% endhint %}

{% hint style="warning" %}
**When you can't add Bond**

When the node is active a provider can't increase their bond, since the rewards have not been distributed yet.&#x20;

When the node is ready, it is preparing to churn in, and thus locks bond quantities.
{% endhint %}

### Reward Shares

Operators and Providers all have a bond amount registered to the node. Operators can start at 0.00 bonded. This on-chain bond amount is summed to the total bond, and thus everyone has a fair share in the THORNode's principle + rewards.&#x20;

The Operator Fee is distributed to the Node Operator address from all RUNE rewards earned by a node after each churn.&#x20;

If an Operator LEAVES, all the bond is fairly distributed.&#x20;

---
description: How to join THORChain as an Node.
---

# Joining

## **Joining THORChain**

Now that you have a THORNode deployed in your Kubernetes cluster, you need to start operating your node to join the network.

{% hint style="danger" %}
Do not import your node menonic in a wallet. Nodes will have their own address.
{% endhint %}

There are a couple of steps to follow.

### 1. Check your current node status

The first step would be to make sure your deployment was successful and your node is running correctly. \_\*\*\_To check the current status of your node, you can run the command status from the `node-launcher`repository on your terminal:

```
make status
```

You will get an output along those lines, the example below is for a mainnet node:

```
 ________ ______  ___  _  __        __
/_  __/ // / __ \/ _ \/ |/ /__  ___/ /__
 / / / _  / /_/ / , _/    / _ \/ _  / -_)
/_/ /_//_/\____/_/|_/_/|_/\___/\_,_/\__/
ADDRESS     thor13hh6qyj0xgw0gv7qpay8thfucxw8hqkved9vr2
IP
VERSION     0.0.0
STATUS      Unknown
BOND        0.00
REWARDS     0.00
SLASH       0
PREFLIGHT   { "status": "Standby", "reason": "node account has invalid registered IP address", "code": 1 }
API         http://:1317/thorchain/doc/
RPC         http://:26657
MIDGARD     http://:8080/v2/doc
CHAIN       SYNC       BLOCKS
THOR        55.250%    37,097/67,144
BTC         2.399%     227,986/678,340
ETH         7.764%     947,182/12,199,994
LTC         0.012%     6,526/1,818,000
BCH         2.293%     197,340/682,404
```

Your node is running but as you can see in the \`Preflight\` section, your node is not yet ready to be churned in and currently is in standby [status](overview/node-operations.md#node-statuses), since your node has no IP address setup yet.

Do not proceed until your node is fully synced al chains. You can see the required external chain hights [here](https://thornode.ninerealms.com/thorchain/lastblock) and the THORChain chain height [here](https://thornode.ninerealms.com/thorchain/block).  Continue to run `make status` untill all chains are synced.

{% hint style="danger" %}
Before sending the BOND, verify that your THORNode is **fully synced** with connected chains. Connected chains such as Ethereum & Bitcoin may take a day to sync. If your node is fully bonded and is selected to churn in to THORChain as ACTIVE without fully syncing all connected chains, you will immediately get slashed for missing observations, and lose money. It is normal to see Ethereum sit on 99.999% for many hours - be patient.
{% endhint %}

{% hint style="danger" %}
Only the original wallet that did the first BOND will be able to LEAVE/UNBOND. You can top up BOND using a different wallet but make sure you keep the private key to the original BOND wallet secure and accessible.
{% endhint %}

### 2 - Send a small BOND (recommend 100-1000)

To be able to set up the node IP address, you first need to get it whitelisted in the chain by sending your BOND.

1. &#x20;You will do a "Deposit" transaction using RUNE. This is an internal MsgDeposit transaction (different from a MsgSend to another wallet). There is no destination address -- use an appropriate wallet such as [ASGARDEX](https://github.com/asgardex/asgardex-desktop/releases). The Bond is locked in a module controlled by the state machine.
2. Deposit your [BOND](https://dev.thorchain.org/concepts/memos.html#bond-unbond-and-leave) using the memo `BOND:<thornode-address>` (or use an appropriate GUI that does this memo for you). Send a small amount of RUNE to whitelist the node, the bond will be picked up.

{% hint style="info" %}
Some `make` commands during setup require RUNE (0.02 to 1.0) to execute into the state machine to prevent DDoS. If your bond is too small (e.g. 1 RUNE) you may run out and not be able to complete the setup until adding more.
{% endhint %}

![Bonding using BOND option in ASGARDEX](<../.gitbook/assets/image (8) (1) (1) (1).png>)

Give the network 3-5 seconds to pick up your bond. To verify it has received your bond, run the following:

```
curl https://thornode.ninerealms.com/thorchain/node/<node-address>
```

If you run `make status` again, you should see this:

```
 ________ ______  ___  _  __        __
/_  __/ // / __ \/ _ \/ |/ /__  ___/ /__
 / / / _  / /_/ / , _/    / _ \/ _  / -_)
/_/ /_//_/\____/_/|_/_/|_/\___/\_,_/\__/
ADDRESS     thor13hh6qyj0xgw0gv7qpay8thfucxw8hqkved9vr2
IP
VERSION     0.0.0
STATUS      Whitelisted
BOND        1000.00
REWARDS     0.00
SLASH       0
PREFLIGHT   { "status": "Standby", "reason": "node account has invalid registered IP address", "code": 1 }
API         http://:1317/thorchain/doc/
RPC         http://:26657
MIDGARD     http://:8080/v2/doc
CHAIN       SYNC       BLOCKS
THOR        55.250%    37,097/67,144
BTC         2.399%     227,986/678,340
ETH         7.764%     947,182/12,199,994
LTC         0.012%     6,526/1,818,000
BCH         2.293%     197,340/682,404
```

As you can see, it is in standby but does not have an IP registered yet. This is needed for peer discovery.

### 3 - Setup Node IP Address

You must tell THORChain your IP-Address for its address book and seed-service to run properly:

```
make set-ip-address
```

If you run the status command again, you should now see a different message for the Preflight section saying you need to set your node keys.

{% hint style="info" %}
Once your IP address has been registered for discovery, you can use your own host for queries.
{% endhint %}

{% hint style="danger" %}
Do not import your node menonic in a wallet. Nodes will have their own address.
{% endhint %}

### 4 - Setup Node keys

Tell THORChain about your public keys for signing sessions:

```
make set-node-keys
```

If you run the `make status` command again, you should now see that your node is in status “ready” and is now ready to be churned in the next rotation.

### 5 - Set Version

Make sure your node broadcasts its latest version, else you won't churn in since THORChain enforces a version requirement. This version will appear in your `make status`. If you are on `0.0.0` then you haven't set your version:

```
make set-version
```

### 6 - Send Final Bond

If you followed steps 1-5 above, your preflight will be saying:

```
PREFLIGHT   { "status": "Standby", "reason": "node account does not have minimum bond requirement: 100000000000/30000000000000, "code": 1 }
```

To address this, send the remaining bond, that is higher than the minimum bond, currently 300K RUNE set by a network [Mimir ](https://thornode.ninerealms.com/thorchain/mimir)setting, look for `MinimumBondInRune`.  See [#bonding-the-right-amount](joining.md#bonding-the-right-amount "mention")for how much bond to send.

If you finally run `make status` you should see this, with keyword **"Ready":**

```
 ________ ______  ___  _  __        __
/_  __/ // / __ \/ _ \/ |/ /__  ___/ /__
 / / / _  / /_/ / , _/    / _ \/ _  / -_)
/_/ /_//_/\____/_/|_/_/|_/\___/\_,_/\__/
ADDRESS     thor13hh6qyj0xgw0gv7qpay8thfucxw8hqkved9vr2
IP          1.2.3.4
VERSION     0.54.0
STATUS      Standby
BOND        300,099.96
REWARDS     0.00
SLASH       0
PREFLIGHT   { "status": "Ready", "reason": "OK", "code": 0 }
API         http://1.2.3.4:1317/thorchain/doc/
RPC         http://1.2.3.4:26657
MIDGARD     http://1.2.3.4:8080/v2/doc
CHAIN       SYNC       BLOCKS
THOR        100.000%   67,144/67,144
BTC         100.000%   678,340/678,340
ETH         100.000%   12,199,994/12,199,994
LTC         100.000%   1,818,000/1,818,000
BCH         100.000%   682,404/682,404
```

## Bonding The Right Amount

Although your node is ready to be churned in, it doesn’t mean it will be the next one to be selected since someone else could have posted a higher bond than you. To maximise chances of a quick entry, monitor Midgard to see what everyone else is bonding and try to outbid them.

This endpoint will show data on average, median, total, minimum and maximum bond amounts. For fastest entry, bond higher than the current active median.

```json
curl -s https://midgard.ninerealms.com/v2/network | jq '.bondMetrics'

resp:
 "bondMetrics" : {
    "averageActiveBond": "97664560467471",
    "averageStandbyBond": "9815575442995",
    "bondHardCap": "102284516414049",
    "maximumActiveBond": "111919846678019",
    "maximumStandbyBond": "104416033169205",
    "medianActiveBond": "99028435881350",
    "medianStandbyBond": "318000000",
    "minimumActiveBond": "53582883425758",
    "minimumStandbyBond": "52363105276428",
    "totalActiveBond": "9766456046747104",
    "totalStandbyBond": "353360715947839"
   }
```

{% hint style="info" %}
RUNE is always displayed in 1e8 format, 100000000 = 1 RUNE
{% endhint %}

You will need to be greater than the `minimumActiveBond.`Bonding more than `bondHardCap` will not result in more [rewards](overview/risks-costs-and-rewards.md#compensation). `medianActiveBond` is a good target to get and stay active.&#x20;

{% hint style="info" %}
Some useful community sites to assist monitoring your node are [https://thorchain.network](https://thorchain.network), [https://thorchain.net](https://thorchain.net/#/nodes).
{% endhint %}

### Bonding More

At any time during standby, you can bond more by making an additional BOND transaction with memo:

`BOND:<thornode-address>`

{% hint style="info" %}
Only the original wallet that did the first BOND will be able to LEAVE/UNBOND. You can top up BOND using a different wallet but make sure you keep the private key to the original BOND wallet secure and accessible.
{% endhint %}

You can also [remove some of your bond](https://docs.thorchain.org/thornodes/leaving) whilst you are on [standby](overview/node-operations.md#node-statuses), using the UNBOND memo.

### Node Operator Fee

* Setting the Node Operator fee `10000` causes all rewards to be paid back each churn.
* Setting the Node Operator fee to `5000` causes 50% of rewards to be paid back to the Node Operator address and 50% to be accrued back to the bond.

To set a Node Operator fee, send a deposit transaction with the following [memo](pooled-thornodes.md#node-operator):

`BOND:<node address>:<bond wallet address>:<operator fee in basis pts>`

See [pooled-thornodes.md](pooled-thornodes.md "mention")for full information.&#x20;

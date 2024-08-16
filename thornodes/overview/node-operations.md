---
description: Running a THORNode
---

# Node Operations

## Churning

As new nodes join/leave the network, this triggers a “churning event”. Which means the list of validators that can commit blocks to the chain changes, and also creates a new Asgard vault, while retiring an old one. All funds in this retiring vault are moved to the new Asgard vault.

Normally, a churning event happens roughly every 2 1/2 days (43,200 blocks or [`CHURNINTERVAL`](https://thornode.ninerealms.com/thorchain/mimir)).

Nodes that targged for the next churn in and out can be seen [here](https://thorchain.network/nodes). The next churn interval can be seen [here](https://thorchain.net/nodes).&#x20;

#### Churning Out

On every churn, the network selects one or more nodes to be churned out of the network (which can be typically churned back in later). In a given churning event, multiple nodes may be selected to be churned out, but never more than 1/3rd of the current validator set. The criterion the network will take into account is the following:

1. Requests to leave the network (self-removal)
2. Banned by other nodes (network-removal)
3. How long an active nodes has been committing blocks (oldest gets removed)
4. Bad behavior (accrued slash points for poor node operation)
5. Nodes that do not meet the minimum version requirement (capped by [`MAXNODETOCHURNOUTFORLOWVERSION`](https://thornode.ninerealms.com/thorchain/mimir))

#### Churning In

On every churn, the network may select one or more nodes to be churned into the network but never adds more than one to the total. Which nodes that are selected are purely by validator bond size. Larger bond nodes are selected over lower bond nodes.

## THORNode Details

### **Node Statuses**

Types of node status:

1. **Unknown** - this should never be possible for a valid node account
2. **Whitelisted** - node has been bonded, but hasn’t set their keys yet
3. **Standby** - waiting to have minimum requirements verified to become “ready” status. This check happens on each churn event (3 days on average).
4. **Ready** - node has met minimum requirements to be churned and is ready to do so. Could be selected to churn into the network. Cannot unbond while in this status.
5. **Active** - node is an active participant of the network, by securing funds and committing new blocks to the THORChain blockchain. Cannot unbond while in this status.
6. **Disabled** - node has been disabled by use of LEAVE while in standby, and cannot re-join.

A node can only unbond if they are in the Standby state and not apart of a vault migration during a chrun out. e.g. (their pub key is not a part of a singer membership).

### **Node Accounts**

When you run a THORNode, each THORNode will have its own node account. An example node account looks like this:

```json
{
  "node_address": "thor10rgvc7c44mq5vpcq07dx5fg942eykagm9p6gxh",
  "status": "Active",
  "pub_key_set": {
    "secp256k1": "thorpub1addwnpepq2gmjlu6y0whj8gtfnl3ccta66zx3u5p04wdh834e065x4z6qndzsulj5aa",
    "ed25519": "thorpub1zcjduepqxg5dfc27l3tw2xrxtw63025gaxwup723y0t7p8w2ww37vqgvyw7q348pxp"
  },
  "validator_cons_pub_key": "thorcpub1zcjduepqaxvrp5xjrmg65e3a06sdkr5z7y67xdlzyetlx40p857gxw5g4tqs2xdavr",
  "peer_id": "16Uiu2HAm5EX9mPRpLgWYg7uH7WgSdBGXvfkXNhuAinCKUh1Agnas",
  "active_block_height": 14561460,
  "status_since": 14561460,
  "node_operator_address": "thor10afkwx5heh26fjwum682neq7wkkre5md0wp8vc",
  "total_bond": "96410371093662",
  "bond_providers": {
    "node_operator_fee": "2000",
    "providers": [
      {
        "bond_address": "thor10afkwx5heh26fjwum682neq7wkkre5md0wp8vc",
        "bond": "96410371093662"
      }
    ]
  },
  "signer_membership": [...pub keys of asgard vault memembership],
  "requested_to_leave": false,
  "forced_to_leave": false,
  "leave_height": 0,
  "ip_address": "<redacted>",
  "version": "1.134.0",
  "slash_points": 659,
  "jail": {
    "release_height": 17208649,
    "reason": "failed to perform keysign"
  },
  "current_award": "15968622725",
  "observe_chains": [...block heights of last observed tx on external chains],
  "preflight_status": {
    "status": "Ready",
    "reason": "OK",
    "code": 0
  }
}
```

To get node account information, make an HTTP call to your `thornode` port which will look like the following:

```
http://<host>:1317/thorchain/nodeaccount/<node address>
http://<host>:1317/thorchain/nodeaccounts
```

Or use `https://thornode.ninerealms.com/thorchain/node/<node address>.`

Most importantly, this will tell you how many slash points the node account has accrued, their status, and the size of their bond (which is in 1e8 notation, 1 Rune == 100000000).

### Bond Providers

Bond Providers can contribute to a Node Operator's bond. Node Operators have the option to add and remove bond providers and set a node operator' fee.

See [Bond Providers details](../pooled-thornodes.md)\

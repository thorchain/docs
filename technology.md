---
description: 'An overview of THORChain''s 1-way State Pegs, State Machine and TSS Protocol.'
---

# Technology

## Overview

THORChain is a leaderless vault manager: 

1. 1-way State Pegs allow syncing state from external chains
2. A State Machine to coordinate asset exchange logic and delegate redemptions
3. Bifröst Chain Client to convert redemptions into chain-specific transactions
4. A TSS protocol to enable distributed threshold key-signing

![How THORChain works](.gitbook/assets/image%20%284%29.png)

## The Bifröst Protocol: 1-way State Pegs

Each node has a "Bifröst" service that deals with the nuances of connecting to each chain. Once nodes are synced, they watch vault addresses. If they ever see an inbound transaction, they read it and convert it into a THORChain witness transaction. 

The witness transaction has the following parameters that are essentially the same for each chain, no matter the type:

```text
type Tx struct {
	ID          TxID    `json:"id"`
	Chain       Chain   `json:"chain"`
	FromAddress Address `json:"from_address"`
	ToAddress   Address `json:"to_address"`
	Coins       Coins   `json:"coins"`
	Gas         Gas     `json:"gas"`
	Memo        string  `json:"memo"`
}
```

THORChain processes each observed transaction and collects `signers` - essentially the keys of each node that reports a transaction that is 100% identical. Once a super-majority of nodes agree on a particular transaction, it moves from a `pending` state to a finalised state. 

```text
type ObservedTx struct {
	Tx             common.Tx        `json:"tx"`
	Status         status           `json:"status"`
	OutHashes      common.TxIDs     `json:"out_hashes"` 
	BlockHeight    int64            `json:"block_height"`
	Signers        []sdk.AccAddress `json:"signers"` 
	ObservedPubKey common.PubKey    `json:"observed_pub_key"`
}
```

Each chain client is quite light-weight, containing only as much logic as is necessary to connect to that particular chain. Most of the logic is in the observer itself. 

![](.gitbook/assets/image%20%286%29.png)

## THORChain State Machine

The state machine processes the finalised transaction and performs logic, such as ordering transactions, computing state changes, and delegating them to a particular outbound vault. Finally, a `txOut` item is created and stored in the Key-Value store. 

![](.gitbook/assets/image%20%2816%29.png)

The `txOut` looks like the following:

```text
type TxOutItem struct {
	Chain       common.Chain   `json:"chain"`
	ToAddress   common.Address `json:"to"`
	VaultPubKey common.PubKey  `json:"vault_pubkey"`
	Coin        common.Coin    `json:"coin"`
	Memo        string         `json:"memo"`
	MaxGas      common.Gas     `json:"max_gas"`
	InHash      common.TxID    `json:"in_hash"`
	OutHash     common.TxID    `json:"out_hash"`
}
```

The Transaction Out item details which chain it should be sent on, the destination address, the vault it should be sent from, and the maximum gas that should be spent. It also has fields for the transaction that initiated it \(the `InHash`\) and the transaction that will complete the accounting \(the `OutHash`\).

## Signer \(Bifröst\)

Once the finalised transaction is created, the Signer downloads it from their local copy and serialises it into a correct transaction for the destination chain using the respetive chain client. This is then sent to the TSS module which coordinates key-signing. The final signed transaction is then broadcast to the respective chain. 

![](.gitbook/assets/image%20%2810%29.png)

## THORChain Vaults

There are two types of vaults in THORChain's system - "inbound vaults" and "outbound vaults":

1. **Asgard** TSS Vaults - inbound vaults with large committees \(_24of36\)_
2. **Yggdrasil** Vaults - outbound vaults with _1of1_ single-signer

This allows the system to use the security of the large vaults to hold the bulk of assets, but delegate to the small, fast outbound vaults the outgoing assets. Every THORNode runs an outbound vault. 

{% hint style="info" %}
It takes 10-20 seconds to sign 24of36 TSS, so the system would be extremely limited if this vault did all the outbounds. But with each node \(36\) running an outbound vault, the system can do roughly 2-3 transactions per vault per second, so around 500-1000 times the output. 
{% endhint %}

### Multi-realm Asgard Vaults

In order to further increase the node count to beyond 100 nodes, the system shards Asgard vaults into two when it approaches the `MaxNodesForAsgard` constant \(and merges them if two ever drop below half of this\). As such, with 100 nodes, there would be 3 Asgard vaults, with 100 yggdrasil vaults. The system constantly checks which vault has the highest excess security, and instructs users to send funds there. 

### Managing Yggdrasil Funding

The state machine constantly monitors and tops up each yggdrasil outbound vault, limited to 25% of the value of its bond in assets. Thus if a node bonded $4m, then up to $1m in assets would arrive on its vault. These top up transactions are identified with `yggdrasil+` memos. 

When the node churns out, it automatically returns these assets back to Asgard with a `yggdrasil-` memo. 

### Migrating

When the network churns, it creates new public keys and migrates the funds forward. The churning process is split up in 5 different transactions, 1 per asset \(identified by `migrate` memo\). It typically takes a few hours to complete. Users are instructed to only send funds to the newest vault, but the retiring vault is monitored. Once the last of the 5 migrations is complete, the previous vault is discarded and no longer monitored. 

{% hint style="info" %}
The previous vault cannot be monitored forever since it can not be guaranteed that all nodes in that vault are still online, and it becomes an attack vector to keep old vaults "around".
{% endhint %}

{% hint style="danger" %}
If you send funds to a retired vault \(likely by caching the address\) your funds will be forever lost and is \(almost\) impossible to be recovered. 

Recovery involves significant coordination and is rarely attempted. 
{% endhint %}


---
description: An overview of THORChain's 1-way State Pegs, State Machine and TSS Protocol.
---

# Technology

## Overview

THORChain is a leaderless vault manager:

1. 1-way State Pegs allow syncing state from external chains
2. A State Machine to coordinate asset exchange logic and delegate outgoing transactions
3. Bifröst Chain Client to processs chain-specific transactions
4. A TSS protocol to enable distributed threshold key-signing

![How THORChain works](<../.gitbook/assets/image (4) (1).png>)

## The Bifröst Protocol: 1-way State Pegs

Each node has a "Bifröst" service that deals with the nuances of connecting to each chain. Once nodes are synced, they watch vault addresses. If they ever see an inbound transaction, they read it and convert it into a THORChain witness transaction.

The witness transaction has the following parameters that are essentially the same for each chain, no matter the type:

```
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

THORChain processes each observed transaction and waits for consensus. Once a super-majority of nodes agree on a particular transaction, it moves from a `pending` state to a finalised state.

```
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

![](<../.gitbook/assets/image (6) (1) (1).png>)

## THORChain State Machine

The state machine processes the finalised transaction and performs logic, such as ordering transactions, computing state changes, and delegating them to a particular outbound vault. Finally, a `txOut` item is created and stored in the Key-Value store.

![](<../.gitbook/assets/image (16) (1).png>)

The `txOut` looks like the following:

```
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

The Transaction Out item details which chain it should be sent on, the destination address, the vault it should be sent from, and the maximum gas that should be spent. It also has fields for the transaction that initiated it (the `InHash`) and the transaction that will complete the accounting (the `OutHash`).

## Signer (Bifröst)

Once the finalised transaction is created, the Signer loads it from their local copy and serialises it into a correct transaction for the destination chain using the respective chain client. This is then sent to the TSS module which coordinates key-signing. The final signed transaction is then broadcast to the respective chain.

![](<../.gitbook/assets/image (10) (1).png>)

## THORChain Vaults

There are two types of vaults in THORChain's system - "inbound vaults" and "outbound vaults":

1. **Asgard** TSS Vaults - inbound vaults with large committees (_27-of-40)_
2. **Yggdrasil** Vaults - outbound vaults with _1of1_ single-signer

This allows the system to use the security of the large vaults to hold the bulk of assets, but delegate to the small, fast outbound vaults the outgoing assets. Every THORNode runs an outbound vault.

{% hint style="success" %}
**Yggdrasil** Vaults are deprecated since [ADR-002](https://gitlab.com/thorchain/thornode/-/blob/develop/docs/architecture/adr-002-removeyggvaults.md). Yggdrasil Vaults will slowly disappear as older nodes churn out. New nodes since ADR-002 will not have a Yggdrasil Vault.
{% endhint %}

### Sharded Asgard Vaults

In order to further increase the node count to beyond 40 nodes, the system shards Asgard vaults into two when it approaches the `MaxNodesForAsgard` constant (and merges them if two ever drop below half of this). As such, with 100 nodes, there would be 3 Asgard vaults, with 100 yggdrasil vaults. The system constantly checks which vault has the highest excess security, and instructs users to send funds there.

### Managing Yggdrasil Funding

The state machine constantly monitors and tops up each yggdrasil outbound vault, limited to 25% of the value of its bond in assets. Thus if a node bonded $4m, then up to $1m in assets would arrive on its vault. These top up transactions are identified with `yggdrasil+` memos.

When the node churns out, it automatically returns these assets back to Asgard with a `yggdrasil-` memo.

Not all assets are funded to yggrdrasil vaults since it would split the funding up far too much. Instead, all pools with a depth less than `minimumDepthForYggdrasil` keep their funds on Asgard vaults.&#x20;

### Migrating

When the network churns, it creates new public keys and migrates the funds forward. The churning process is split up in 5 different transactions, 1 per asset (identified by `migrate` memo). It typically takes a few hours to complete. Users are instructed to only send funds to the newest vault, but the retiring vault is monitored. Once the last of the 5 migrations is complete, the previous vault is discarded and no longer monitored.

{% hint style="info" %}
The previous vault cannot be monitored forever since it can not be guaranteed that all nodes in that vault are still online, and it becomes an attack vector to keep old vaults "around".
{% endhint %}

{% hint style="danger" %}
If you send funds to a retired vault (likely by caching the address) your funds will be forever lost and is impossible to be recovered.
{% endhint %}

---
description: 'An overview of THORChain''s 1-way State Pegs, State Machine and TSS Protocol.'
---

# Technology

## Overview

THORChain combines several existing technologies together to achieve the vision. 

1. 1-way State Pegs allow a chain-agnostic bridging protocol
2. A State Machine to coordinate asset exchange logic and delegate redemption transactions
3. Bifröst Signer Module to convert redemption transactions into chain-specific transactions
4. A TSS protocol to enable distributed threshold key-signing

![How THORChain works](.gitbook/assets/image%20%284%29.png)

## The Bifröst Protocol: 1-way State Pegs

The Bifröst Protocol is the name for its 1-way State Pegs. Each connected chain has a "Bifröst" module that deals with the nuances of connecting to that chain, such as chain configurations and transaction details. 

Once nodes are done syncing, they begin watching vault addresses on each chain. If they ever see an inbound transaction concerning a vault address they watch, they deserialise it and convert it into a THORChain witness transaction. 

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

THORChain processes each observed transaction and collects `signers` - essentially the keys of each node that reports a transaction that is 100% identical. Once a a super-majority of nodes agree on a particular transaction, it moves from a `pending` state to a finalised state. 

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

The overview of this is as below. Each chain client is quite light-weight, containing only as much logic as is necessary to connect to that particular chain. Most of the logic is in the observer itself. 

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




---
description: An overview of how Chain Clients are implemented for different chain types.
---

# Overview

## Chain Client

The chain client sits in the `/bifrost` package which is outside of the core THORChain consensus engine. This is because its purpose is simply to witness events to THORChain. THORChain itself comes to consensus on witnessed events and acts from there.

There are two main parts to each Chain Client:

1. **Observer** (Scans blocks and packages up events to be witnessed to THORChain)
2. **Signer** (receives `txOut` data from THORChain and converts into chain-specific signing data, to be signed by either the YGG node or TSS routine)

In addition there are some supporting routines, such as that to store cached witness transactions in local storage. This is used for tracking confs and handling re-orgs.

### Scanning Blocks

The block scanner monitors the Asgard Addresses and looks for incoming UTXOs spending to those addresses. When it sees one performs validation on it and witnesses to THORChain. It will also store it in local storage.

### Confirmation Counting

Incomings are "conf-counted" such that the sum of all transactions received in a block is measured against the value of the block, and the confirmations required are:

$$
confs = ceil(\frac{txValue}{blockValue} )
$$

The `blockValue` is typically just the coinbase reward, which already sums up the fees and subsidies.

To do this, the Bifrost reports every tx immediately, but also specifies a `finalisation` blockheight. If the confs required is 1, then the tx is immediately processed. If the finalisation height exceeds the current blockheight, then the Bifrost will also wait that many blocks, then send \*another\* witness transaction as soon as those blocks occur. At this point the transaction can be finalised in the state machine.

{% embed url="https://gitlab.com/thorchain/thornode/-/blob/develop/bifrost/observer/observe.go#L117" %}

{% hint style="warning" %}
Although THORChain will not act on an inbound transaction that is undergoing conf-counting, it will consume it when it migrates vaults. This means conf-counted UTXOs will not be abandoned if still being finalised.
{% endhint %}

{% hint style="info" %}
A malicous re-org would never happen unless the value to gain from re-org exceeds the cost to re-org. The value to gain is the sum of the transactions sent to Asgard, whilst the cost to re-org is taken to be the value of each block -- the sum of fees and subsidies.
{% endhint %}

### Re-orgs

Each Chain Client needs to have re-org logic, since re-orgs will always happen (natural or malicious, is irrelevant). To do this, the Bifrost tracks the last 24 hours of transactions reported in a local KV store. Every time it detects a new block at a previous height it has seen, it checks for the presence of every transaction it has reported. If the transaction is missing then it has been re-orged out.

If so, the Bifrost will prepare an `ErrataTx` which instructs the state machine to undo all the state associated with that missing transaction. Any losses to the pools are thus socialised to all LPs.

### Network Fees

THORChain maintains accurate block-by-block awareness of gas fees, and reports them on `/inbound_addresses` [end-point ](https://thornode.thorchain.info/thorchain/inbound\_addresses)for anyone to query. These gas fees ensure that state machine can always perform transactions at "next-block" speed. If the network uses too low gas rates then bad things happen, although it can recover. See Outbound Fee.

To do this:

1. Detect the gas spent in each block, then detect the block size. The gas rate is thus the `gasSpent / blockSize`
2. This is now the average gasRate, which is typically 50--100% higher than the lowest gas rate to get in the block.
3. Witness this to THORChain every block that it changes over a 20 block period, whereby the highest is chosen. This means it ratchets up fast, but comes down slow.

### Handling Gas

Every transaction in and out from THORChain vaults need to have gas amount reported, as well as the gas asset used. This is needed by THORChain to accurately deduct this gas from the pools in order to keep the system solvent.&#x20;

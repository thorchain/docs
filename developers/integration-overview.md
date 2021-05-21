---
description: Learn the general principles of integrating with THORChain
---

# Integration Overview

## Overview

### Read Only Applications

Dashboards, explorers etc

1. Connect to Midgard to get rich data about the system, included time-series graphs and aggregated values like TotalVolume etc. 
2. Connect to THORNode \(or proxied via Midgard\) to drill into the state-machine and access the current state \(or historical just by adding a `?height=1234` to specify a certain height. 
3. Connect to RPC to get information about the Ledger, which is not specific to THORChain, such as `/genesis` or account/transaction information

### Write Applications

Wallets, interfaces etc. 

These applications require first-principle thinking and excellent understanding of how the system works. 

1. Connect to a trusted THORNode or connect to several public THORNodes and ensure they all agree
2. Get the `/inbound_addresses`
3. Compose the transaction with the correct memo and correct gas price. 
4. Send the vault the transaction and wait for execution

#### Connecting

First, you need to connect to THORChain. You can use the official clients which have SSL, or run your own node, host it on SSL. 

{% hint style="info" %}
If you don't need SSL, you can connect to any of the non-SSL public nodes \(ie, just their IP address\). Web applications need SSL, but mobile and desktop apps don't.
{% endhint %}

#### Get The Vault

Vaults are fetched from the `/inbound_addresses` endpoint.  


![https://thornode.thorchain.info/thorchain/inbound\_addresses](../.gitbook/assets/image%20%2832%29.png)

{% hint style="warning" %}
If you connect to public THORNodes, you must be conscious of the fact that you can be phished and could send money to the WRONG vault. You should do safety checks, ie, comparing with other nodes, or even inspecting the vault itself for presence of funds.
{% endhint %}

{% hint style="danger" %}
Never cache vault addresses, they churn regularly. 
{% endhint %}

{% hint style="danger" %}
Check for the `halted` parameter and never send funds if it is set to true
{% endhint %}

#### Build The Transaction

The most important details in the transaction:

```text
{
    "from":"",        // the user
    "to":"",          // the vault
    "amount:"",       // the amount to send (swap, add liquidity)
    "memo":"",        // the transaction intent
    "gas_rate":""     // always set to next-block rates
}
```

The memos can be found here:

{% page-ref page="transaction-memos.md" %}

{% hint style="warning" %}
Always use a "fast" or "fastest" fee, if the transaction is not confirmed in time, it could be abandoned by the network. You should allow your users to cancel or re-try with higher fees.
{% endhint %}

#### Send The Transaction

You can user any wallet library, like `bitcoinjs` or use the `xchainjs` which wraps all the respective chains. 


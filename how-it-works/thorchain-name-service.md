---
description: How THORNames (TNS) work
---

# THORChain Name Service

Website: [https://thorname.com/](https://thorname.com/)

## Overview

THORNames allow anyone to register cross-chain wallet addresses to a 1-30 long string of hexadecimal characters which include special characters `-_+` This makes them compatible to represent emojis ⚡️. THORNames are case insensitive.

Users use a special memo and a THORChain `MsgDeposit` transaction to register their addresses. This then allows the system to lookup the name and retrieve the correct corresponding address for the specified chain.

A THORChain address can be assigned one (1) THORName to manage the other addresses associated. For example: the THORName chris can receive $BTC to the chris.btc address, chris.eth to receive $ETH and so forth. Wallet providers will easily be able to integrate to resolve cross-chain addresses for a user.

Example from [https://midgard.ninerealms.com/v2/thorname/lookup/td](https://midgard.ninerealms.com/v2/thorname/lookup/td)

```json
{
  "entries": [
    {
      "address": "0xee7ba2d9eca389928a628bf26ea87e65a5c27eca",
      "chain": "AVAX"
    },
    {
      "address": "qznskghhug46gxkx8ykxqxj4kmczge6zjg9trsgf5d",
      "chain": "BCH"
    },
    {
      "address": "bnb157sj7wvdju5td2hkgmkvkt2ngzlnyy7y46fswh",
      "chain": "BNB"
    },
    {
      "address": "0xee7ba2d9eca389928a628bf26ea87e65a5c27eca",
      "chain": "BSC"
    },
    {
      "address": "bc1qqtuq6td6enadcz8v7t2eafph0pq0cfjw2mzug9",
      "chain": "BTC"
    },
    {
      "address": "DBVz9bMNtDYrVLGqwhiFUzpYGcQu1B3PuR",
      "chain": "DOGE"
    },
    {
      "address": "0xe020c8934b23e5bcca1e7eecdb6f39674029fe47",
      "chain": "ETH"
    },
    {
      "address": "cosmos10w52zp06zccjq8zv9sh77p3n2c8sc559q5yl0z",
      "chain": "GAIA"
    },
    {
      "address": "thor1ymkrqd4klk2sjdqk7exufa4rlm89rp0h8n7hr2",
      "chain": "THOR"
    }
  ],
  "expire": "23726750",
  "owner": "thor1ymkrqd4klk2sjdqk7exufa4rlm89rp0h8n7hr2"
}
```

Currently, there are seven (8) native L1 chains available on THORChain: Bitcoin, Ethereum, Litecoin, Binance, Bitcoin Cash, Doge, Cosmos and BSC. THORNames are limited to 30 characters, including `^[a-zA-Z0-9+_-]+$`.

### Query a THORName

A THORName can be queried by going to `/thorname/{thorname}`

{% hint style="info" %}
[https://midgard.ninerealms.com/v2/thorname/lookup/orion](https://midgard.ninerealms.com/v2/thorname/lookup/orion)
{% endhint %}

A THORName can be checked using `/thorname/lookup/{thorname}`

{% hint style="info" %}
[https://midgard.ninerealms.com/v2/thorname/lookup/orion](https://midgard.ninerealms.com/v2/thorname/lookup/orion)
{% endhint %}

While there is no reverse on-chain reverse lookup, a reverse lookup is possible within THORChain via using a given THORName `/thorname/lookup/{address}.`

{% hint style="info" %}
Example using a THOR address: [https://midgard.ninerealms.com/v2/thorname/rlookup/thor15r77zzt7n6kyydw7ajkefdrrv6n0dpplvm83pd](https://midgard.ninerealms.com/v2/thorname/rlookup/thor15r77zzt7n6kyydw7ajkefdrrv6n0dpplvm83pd)
{% endhint %}

## Fees

There is a one-time registration fee of around 10 RUNE, with a 20 `tor` block fee, which works out to be around 1 RUNE annually. A user who pays 2 RUNE will then keep their name registered for 2 years. Fees are controlled by Constants/Mimir, the current settings are:

- `TNSRegisterFee`: 10 RUNE
- `TNSFeeOnSale`: 1000 Basis Points
- `TNSBlockFee`: 20 tor per block (roughly 1 RUNE per year)

Example: a 20 Rune registration registers the THORName for 10 years. (10 RUNE Registration Fee + 1 RUNE every year).

## Creating a THORName

THORNames are created by sending a memo in a MsgDeposit with [memo](https://dev.thorchain.org/affiliate-guide/thorname-guide.html) prefix: `name`, `n` or `~`

Memo template is: `~:name:chain:address:?owner:?preferredAsset:?expiry`

{% hint style="info" %}
Example: `~:ODIN:BTC:bc1Address:thorAddress:BTC.BTC:1231231`
{% endhint %}

Expiry is a block height that can be set in the past to unregister the THORName.

### **Technical Rationale**

Bitcoin has a memo length limitation of 80 bytes and Monero has an address length of 97 bytes. This means swapping from Bitcoin to Monero is not possible using addresses, THORNames solves this issue and can also be used when specifying the affiliate address.

{% hint style="info" %}
Swap example comparison using THORNames.

Without:

`=:BTC.BTC:bc1fx6fsev97atsm5j62kgecpslv6vx2nffv0qq2q:2117277:0500:bc1q6ptu8zayukjz3ag4d4pnjjhtxwd4jckh9gufwu`

`With:`

`=:BTC.BTC:ODIN:2117277:0500:ORION`

107 characters without THORNames, 33 characters with THORNames.
{% endhint %}

Interfaces like [AsgardEx Desktop](https://github.com/thorchain/asgardex-electron/releases) allow you to create your own memo.

## More Information

THORChain launched THORNames in June 2021, read more here [https://medium.com/thorchain/thorchain-launches-thorname-service-abe42ba11df8](https://medium.com/thorchain/thorchain-launches-thorname-service-abe42ba11df8).

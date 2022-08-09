---
description: How THORNames (TNS) work
---

# THORChain Name Service

Website: [https://thorname.com/](https://thorname.com/)

## Overview

THORNames allow anyone to register cross-chain wallet addresses to a 1-30 long string of hexadecimal characters which include special characters `-_+` This makes them compatible to represent emojis ⚡️. THORNames are case insensitive.

Users use a special memo and a THORChain `MsgDeposit` transaction to register their addresses. This then allows the system to lookup the name and retrieve the correct corresponding address for the specified chain.

A THORChain address can be assigned one (1) THORName to manage the other addresses associated. For example: the THORName chris can receive $BTC to the chris.btc address, chris.eth to receive $ETH and so forth. Wallet providers will easily be able to integrate to resolve cross-chain addresses for a user.

```
{ "chris" :
   {"thor  : "thor1egxvam70a86jafa3s0m2g3m7548gcg3kqfmfax",
    "btc"  : "bc1qq2z2f4gs4nd7t0a9zzjtegu4nczhajjp90y9l9", 
    "eth"  : "0x04c5998ded94f8926e64a99b7dbc9f463370444c", 
    "bch"  : "qz7262r7uufxk89emajqm97vskzwtxrf6yquk7zfwr",
    "ltc"  : "ltc1qaa064vvv4d6stgrd3tt93fp6jxywnf777j6dl8", 
    "bnb"  : "bnb1pa6hpjs7qv0vkd55n08yw7v7fks5tqa2xtt2gk"
    "doge" : "DNUfRBroVNhu53QXRG9vtB7t8vxwji3iG6",
    "terra": terra1hckhegjy544etz7l883e3psken44kna0w3dx2g"}
}
```

Currently, there are seven (7) native L1 chains available on THORChain: Bitcoin, Ethereum, Litecoin, Binance, Bitcoin Cash, Doge, and Terra. THORNames are limited to 30 characters, including `^[a-zA-Z0-9+_-]+$`.

**Technical Rationale**

Bitcoin has a memo length limitation of 80 bytes and Monero has an address length of 97 bytes. This means swapping from Bitcoin to Monero is not possible using addresses, THORNames solves this issue and can also be used when specifying the affiliate address.

{% hint style="info" %}
Swap example comparison using THORNames.

Without:

`=:BTC.BTC:bc1fx6fsev97atsm5j62kgecpslv6vx2nffv0qq2q:2117277:bc1q6ptu8zayukjz3ag4d4pnjjhtxwd4jckh9gufwu:500`

`With:`

`=:BTC.BTC:ODIN:2117277:ORION:500`

107 characters without THORNames, 33 characters with THORNames.&#x20;
{% endhint %}

Interfaces like [AsgardEx Desktop](https://github.com/thorchain/asgardex-electron/releases) allow you to create your own memo.&#x20;

## Fees

There is a one-time registration fee of around 10 RUNE, with a 20 `tor` block fee, which works out to be around 1 RUNE annually. A user who pays 2 RUNE will then keep their name registered for 2 years. Fees are controlled by Constants/Mimir, the current settings are:&#x20;

* `TNSRegisterFee`: 10 RUNE
* `TNSFeeOnSale`: 1000 Basis Points
* `TNSBlockFee`: 20 tor per block (roughly 1 RUNE per year)

Example: a 20 Rune registration registers the THORName for 10 years. (10 RUNE Registration Fee + 1 RUNE every year).

### Query a THORName

A THORName can be queried by going to `/thorname/{thorname}`

{% hint style="info" %}
An Example: [https://thornode.ninerealms.com/thorchain/thorname/orion](https://thornode.ninerealms.com/thorchain/thorname/orion)
{% endhint %}

While there is no reverse on-chain reverse lookup, a reverse lookup is possible within THORChain via `/thorname/lookup/{thorname}.`

{% hint style="info" %}
Examples in Stagenet are\
[https://stagenet-midgard.ninerealms.com/v2/thorname/rlookup/bc1q6ptu8zayukjz3ag4d4pnjjhtxwd4jckh9gufwu](https://stagenet-midgard.ninerealms.com/v2/thorname/rlookup/bc1q6ptu8zayukjz3ag4d4pnjjhtxwd4jckh9gufwu)&#x20;

[https://stagenet-midgard.ninerealms.com/v2/thorname/rlookup/bnb1l0xncjcm6xk48rmgy6uqe9ms0vgf3dk4v9jayj](https://stagenet-midgard.ninerealms.com/v2/thorname/rlookup/bnb1l0xncjcm6xk48rmgy6uqe9ms0vgf3dk4v9jayj)
{% endhint %}

## Creating a THORName

THORNames are created by sending a memo in a MsgDeposit with [memo](https://dev.thorchain.org/thorchain-dev/wallets/memos) prefix: `name`, `n` or `~`

Memo template is: `~:name:chain:address:?owner:?preferredAsset:?expiry`

{% hint style="info" %}
Example: `~:ODIN:BTC:bc1Address:thorAddress:BTC.BTC:1231231`
{% endhint %}

Expiry is a block height that can be set in the past to unregister the THORName

## FAQ

THORChain launched THORNames in June 2021 with a number of pre-registration sales. Read more here [https://medium.com/thorchain/thorchain-launches-thorname-service-abe42ba11df8](https://medium.com/thorchain/thorchain-launches-thorname-service-abe42ba11df8)

Pre-registered THORNames will be valid 12 months after THORNames is deployed to Chaosnet.&#x20;

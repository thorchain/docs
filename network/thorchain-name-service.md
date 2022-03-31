---
description: How THORNames work
---

# THORChain Name Service

Website: [https://thorname.com/](https://thorname.com)

## Overview

THORNames allow anyone to register cross-chain wallet addresses to a 1-30 long string of hexadecimal characters which include special characters `-_+` This makes them compatible to represent emojis ⚡️

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

Currently, there are five (7) native L1 chains available on THORChain: Bitcoin, Ethereum, Litecoin, Binance, Bitcoin Cash, Doge, and Terra.

## Fees

There is a one-time registration fee of around 10 RUNE, with a 20 `tor` block fee, which works out to be around 1 RUNE annually. A user who pays 2 RUNE will then keep their name registered for 2 years.

## FAQ

Additional reading: THORChain Launches THORName Service: [https://medium.com/thorchain/thorchain-launches-thorname-service-abe42ba11df8](https://medium.com/thorchain/thorchain-launches-thorname-service-abe42ba11df8)

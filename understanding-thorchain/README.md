---
description: >-
  Introduction of concepts that help make sense of how THORChain is uniquely
  able to provide the services it does.
---

# Using THORChain

## Automated Market Makers (AMMs) & Liquidity Pools

Automated market makers (AMMs) are decentralised exchanges (DEXs) that rely on users to voluntarily deposit network-supported assets into what are called liquidity pools—this is called _liquidity_ _pooling_. Each supported asset has its own dedicated liquidity pool; these algorithmically price its respective asset, also providing the liquidity for the exchange's transactions.&#x20;

By depositing their capital into the asset-specific pools, these Liquidity Providers (LPs) become owners of a proportional share of that pool for as long as their assets remain deposited. In exchange for contributing liquidity to the network, LPs earn rewards, which are distributed regularly. These rewards come directly from swap fees paid by swappers.

While each AMM carries distinct design mechanics with regard to its liquidity pool functionality, all generally aim to offer their users deep liquidity, low transaction fees, and 100% uptime for as many users as possible. THORChain is no different in this regard.

## THORChain: A Novel AMM Protocol&#x20;

Unlike other AMMs, THORChain is unique in that it offers swappers the ability to seamlessly swap native assets on their native blockchains. It offers this in perhaps the most decentralized, trustless, permissionless way available. It is precisely for these reasons (and more) that THORChain is the functional backend for many user interfaces.

Key features of THORChain are:

* Native Asset Swaps: Swap Layer 1 assets across multiple chains—e.g., native BTC to ETH swap
* Permissionless: No user registration is required; send a transaction & THORChain will execute it
* Decentralized Pricing: Gives transparent, fair prices without reliance on centralised third-parties
* AMM Design: [Continuous Liquidity Pools](../thorchain-finance/continuous-liquidity-pools.md#benefits-of-the-clp-model) maximise network efficiency
* Supports App Layer development via Cosmwasm Smart Contracts

## Using THORChain's Services

THORChain offers two decentralized and permissionless services:

1. [Swaps](https://docs.thorchain.org/understanding-thorchain/roles/swapping): Cross-chain swaps between native assets—e.g., from native BTC (on the Bitcoin blockchain) to native ETH (on the Ethereum blockchain)
2. [Liquidity Pools (LPs)](https://docs.thorchain.org/understanding-thorchain/roles/liquidity-providers): Depositing and withdrawing native assets to provide liquidity

Neither service requires participants to hold the RUNE token. All that is needed to use THORChain is to choose from the several [Exchanges and/or Wallets](https://docs.thorchain.org/ecosystem#exchanges-only) that have integrated with THORChain.&#x20;

### Interacting with the RUNE token

That said, users may very well wish to interact with the [RUNE](https://docs.thorchain.org/understanding-thorchain/rune) token. Whether a user wants to hold RUNE, deposit into LPs symmetrically, and/or [bond](https://docs.thorchain.org/understanding-thorchain/roles/node-operators) into a THORNode, they will need a wallet that supports RUNE ([List of wallets that support RUNE](https://docs.thorchain.org/ecosystem#integrated-wallets-and-exchanges)). Once the user has successfully obtained a RUNE-supporting wallet, they can acquire RUNE. To do so, users can swap for RUNE from THORChain directly using any of these [Frontend User Interfaces](https://docs.thorchain.org/ecosystem#exchanges-only). They may also choose to acquire RUNE from supported centralized exchanges.

For platform-specific instructions or support with an interface, it is best to get in touch with them via their [support channels](../ecosystem.md#integrated-wallets-and-exchanges)—this also goes for troubleshooting and user support.

➜ For further reading, see: [An Introduction to THORChain for Bitcoiners](https://erikvoorhees.medium.com/an-introduction-to-thorchain-for-bitcoiners-3f621bf0028e)

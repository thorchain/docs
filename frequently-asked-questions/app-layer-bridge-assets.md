---
description: This FAQ is to help dapp builders deploying to the THORChain App Layer
---

# App Layer / Bridge Assets

{% hint style="info" %}
This is subject to change as details get worked out. This is not yet implemented. \
See the [Dev Discord](https://discord.com/channels/838986635756044328/1276645235560284260) and [Gitlab MR](https://gitlab.com/thorchain/thornode/-/merge\_requests/3711) for more detailed information.

Also see [Technology](../technology/) for generic Cosmos information.&#x20;
{% endhint %}

## What will Bridge Assets look like?

<figure><img src="../.gitbook/assets/image (45).png" alt=""><figcaption></figcaption></figure>

\


<figure><img src="../.gitbook/assets/image (46).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (47).png" alt=""><figcaption></figcaption></figure>

## What notation will they have?

The plan is for the [delimiter](asset-types.md) to be a dash '-'. \
E.g. `ETH.ETH` is L1. `ETH-ETH` will be a bridged asset.&#x20;

While ETH.tc is pictured, that may change to `ETH-ETH`.

## Common Cosmos chain pain points

{% hint style="info" %}
Below are Cosmos development pain points created by the Levana team to assist Nine Realms and others to identify and prevent common issues for dapp developers.
{% endhint %}

### Multiple asset representations

This is especially an issue for us on Osmosis, though it impacts other chains too. We end up with multiple representations of the same asset, e.g. Axelar bridged BTC, Nomic bridged BTC, and wBTC bridged from multiple different layer 2s. Similar situation with USDC. This splits liquidity and causes significant user confusion.

### Buggy RPC/gRPC node software

This has been the primary problem our backend team faces. We’ve worked with multiple node providers, and some chains (Osmosis in particular) have had regular node crashes. We’ve spent a significant amount of time adding fairly complex fallback and retry logic in our backend Cosmos library to deal with the situation, but it still occasionally causes alerts to go crazy.

### Race conditions in core Cosmos (and CosmWasm) components

This hasn’t been a problem since 2023, but on both Osmosis and Sei, we ran into core bugs within either the Cosmos or CosmWasm codebases. On both chains, this resulted in our contracts being able to fully halt the entirety of testnet, necessitating a hard fork of Osmosis Testnet at some point. We believe the issues have all been addressed at this point, but it’s worth keeping this in mind for dapp developers.

### Derivation path/wallet address incompatibility

Most chains in the Cosmos ecosystem use the same public key hash method and derivation path, making their addresses convertible (works for Osmosis, Neutron, Juno, and Sei v1). Other chains attempt to keep Ethereum compatibility (Injective and Sei v2). The result is that addresses cannot be converted between these chains, which makes things like cross-chain incentivization difficult.

At the very least, having addresses compatible with one of those ecosystems would be great. A stretch goal would be something similar to what Sei v2 has tried to achieve: linking different wallet addresses together so that matching accounts can be found across different chains.

### Contract size limit

Many CosmWasm contracts quickly move beyond the default 800kb limit for a contract. The CosmWasm team has previously discussed bumping this limit (if links to the discussions would be helpful, let us know, we’ll find the threads). We recommend bumping the limit to 2.5mb, though Levana’s largest contract is currently about 1.5mb.

### Differing transaction size limits across nodes

Having different settings between nodes for transaction size limits causes P2P sharing of mempool entries to sometimes get stuck. We haven’t received confirmation from either the Osmosis or Cosmos teams of where the exact issue lies, but this can cause a node to be “starved” and none of the transactions broadcast to it to be picked up by the network.

Levana’s workaround for this is quite involved:

* We run a backend server, the querier, which provides a transaction broadcast endpoint
* Our backend library has added support for an “all nodes broadcast,” where any broadcasts are sent to both the primary node and any fallbacks we’ve configured
* Our frontends do not rely on the standard RPC interface leveraged by cosmjs, but instead have custom code to talk to the querier

### Congestion attacks/lack of MEV

Both Osmosis and Injective have had periods of high traffic, either due to roll-up syncs, large NFT mints, or direct attacks on the chain. Most Cosmos chains have no concept of MEV or fee markets at all. Osmosis has implemented a basic fee market system, but it was at least initially buggy, and only gate-keeps entrance to the memory pool. It does not prioritize transactions within the pool.

On THORChain, congestion attacks will be less impactful on Levana due to use of chain-native oracles. Nonetheless, a Perps platform is highly sensitive to delays in closing time due to the leveraged impact of small price changes.

Some type of well designed prioritization of transactions would allow traders to increase their fees to push through urgent actions.

### Poor wallet compatibility/frontend library support

The Cosmos ecosystem generally uses CosmosKit for wallet integration. It’s a workable library, but has historically suffered from integration bugs, and the documentation has been poor. Furthermore, slight differences in behavior of different wallets has made broad wallet support difficult to achieve.

There may be no action available for THORChain to resolve this, but it’s worth including as a common pain point.

### Mishandling of multiple gas coins

Related to the above: Osmosis supports usage of multiple coins for paying gas fees. We’ve regularly seen suboptimal selection of gas coins. As a recent example:

* Our governance contract lives on Osmosis
* We have our governance token, LVN, as a native coin on Osmosis, and it can be used for gas fees
* An option in our governance UI allows users to stake the entirety of their LVN holdings
* Keplr has on occasion selected LVN as the gas token to be used in such transactions, even when a user has another gas coin available
* All simulations and checks within our app will indicate that this transaction will succeed, since selection of gas coin occurs after our app initiates the signing process
* Keplr provides no useful warning about the fact that more LVN will be used than are available in the wallet


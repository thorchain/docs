---
description: >-
  This FAQ clarifies how THORChain has implemented the Cosmos tech stack and
  solved some of the most common problems faced by developers building on Cosmos
  chains
---

# THORChain & Cosmos

## Multiple asset representations

With many Cosmos chains running on various bridged assets, Cosmos teams often end up with multiple representations of the same asset, e.g. Axelar bridged BTC, Nomic bridged BTC, and wBTC bridged from multiple different layer 2s. This splits liquidity and causes significant user confusion.

THORChain will only have one bridged asset for per asset. E.g. `ETH.ETH` on L1 will be represented as a bridged asset with `ETH-ETH`.&#x20;

## Buggy RPC/gRPC node software

With multiple node providers validating blocks around the world, the risk of node crashes that disrupts work flow, testing and live implementations can happen. Some teams resort to spending significant amount of time adding fairly complex fallback and retry logic in our backend Cosmos library to deal with the situation, but it still occasionally causes alerts to go crazy.

THORChain alleviates this problem by having anonymous nodes that [churn in and out](https://docs.thorchain.org/thornodes/overview/node-operations) validating blocks. The constant churn process keeps node operators on their toes and keeps the network running at optimal levels.

## Derivation path/wallet address incompatibility

Most chains in the Cosmos ecosystem use the same public key hash method and derivation path, making their addresses convertible (works for Osmosis, Neutron, Juno, and Sei v1). Other chains attempt to keep Ethereum compatibility (Injective and Sei v2). The result is that addresses cannot be converted between these chains, which makes things like cross-chain incentivization difficult.

THORChain will have have addresses compatible with at least one other Cosmos chain as the "canonical chain". There is all work being done to try and link different wallet addresses together so that matching accounts can be found across many chains.

## CosmWasm contract size limit

Many CosmWasm contracts quickly move beyond the default 800kb limit for a contract. The CosmWasm team has previously discussed bumping this limit.&#x20;

THORChain will push on bumping up the contract limit to 1.5mb or more.

## Differing transaction size limits across nodes

Having different settings between nodes for transaction size limits causes P2P sharing of mempool entries to sometimes get stuck. This can cause a node to be “starved” and none of the transactions broadcast to it to be picked up by the network. Levana’s workaround for this is quite involved:

* They run a backend server, the querier, which provides a transaction broadcast endpoint
* Their backend library has added support for an “all nodes broadcast,” where any broadcasts are sent to both the primary node and any fallbacks we’ve configured
* Their frontends do not rely on the standard RPC interface leveraged by cosmjs, but instead have custom code to talk to the querier

THORChain has defined [Node Operations](../understanding-thorchain/roles/node-operators.md) that all nodes adhere to, and hence the problem of mempool entries getting stuck is solved.

## Congestion attacks/lack of MEV

Some Cosmos chains have had periods of high traffic, either due to roll-up syncs, large NFT mints, or direct attacks on the chain. Most Cosmos chains have no concept of MEV or fee markets. Osmosis has implemented a basic fee market system, but it was at least initially buggy, and only gate-keeps entrance to the memory pool. It does not prioritize transactions within the pool.

On THORChain, congestion attacks will be less impactful because of the use of chain-native oracles. More on how THORChain addresses MEV in the [FAQ](https://docs.thorchain.org/frequently-asked-questions#how-does-thorchain-prevent-mev).

## Poor wallet compatibility/frontend library support

The Cosmos ecosystem generally uses CosmosKit for wallet integration. It’s a workable library, but has historically suffered from integration bugs, and the documentation has been poor. Furthermore, slight differences in behavior of different wallets has made broad wallet support difficult to achieve.

THORChain is actively working with wallets like XDEFI/Ctrl, Keplr and Leap to alleviate compatibility issues, yet its an iterative process where there will be back and forth.

## Mishandling of multiple gas coins

Many Cosmos chains allow for multiple coins to pay for network/gas fees rather than just one. Having this option is suboptimal. As a recent example from Levana on Osmosis:

* Governance contract lives on Osmosis
* Governance token, LVN, is a native coin on Osmosis, and it can be used for gas fees
* An option in the Levana governance UI allows users to stake the entirety of their LVN holdings
* Keplr has on occasion selected LVN as the gas token to be used in such transactions, even when a user has another gas coin available
* All simulations and checks within the Levana dapp will indicate that this transaction will succeed, since selection of gas coin occurs after our app initiates the signing process
* Keplr provides no useful warning about the fact that more LVN will be used than are available in the wallet

THORChain addresses this by only allowing for [RUNE](../understanding-thorchain/rune.md) to be used to pay network/gas fees

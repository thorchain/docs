---
description: An overview of the technologies that make up THORChain
---

# Technology

There are multiple modules and protocols that makes up THORChain. The tech stack can be broken down in the following key pieces:

- [Bifrost, TSS and Vaults](bifrost-tss-and-vaults.md): THORChain is a leaderless vault manager with several components:
  - 1-Way State Pegs: Syncs state from external chains to THORChain using the Bifröst Protocol.
  - THORChain State Machine (TSS) protocol: Coordinates asset exchange logic, delegates transactions and enables distributed threshold key-signing.
  - Bifröst Chain Client: Processes chain-specific transactions.
- [Midgard](midgard.md): Midgard is a layer 2 REST API that provides front-end consumers with semi real-time rolled up data and analytics of the THORChain network.
- [Cosmos SDK](cosmos-sdk.md): The Cosmos SDK is an open-source toolkit for building multi-asset public Proof-of-Stake (PoS) blockchains. There are multiple benefits from building an application-specific blockchain using the Cosmos SDK: Flexibility, Performance, Security and Sovereignty
- [CosmWasm](cosmwasm.md): CosmWasm is a smart contracting platform built for blockchains that uses the Cosmos SDK, Simply put, it's the Cosmos (Cosm) way of using WebAssembly (Wasm) hence the name. With CosmWasm, teams can deploy smart contracts on THORChain directly
- [IBC](ibc.md): The Inter-Blockchain Communication Protocol (IBC) is a protocol that allows blockchains to talk to each other. With 100+ blockchains having enabled IBC, THORChain can tap into a wealth of native tokens moving in and out of the network using IBC.

## Developer Resources

For technical implementation details including:

- Transaction memo formats and syntax
- API integration guides (THORNode, Midgard)
- Chain-specific integration requirements
- Smart contract deployment and aggregator contracts
- Affiliate fee implementation
- RPC and WebSocket endpoints
- Testing on stagenet

See the [THORChain Developer Documentation](https://dev.thorchain.org/)

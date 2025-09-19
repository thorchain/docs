---
description: THORChain's minimal governance system and parameter management through Mimir
---

# Governance

THORChain aims to have as little governance baked into the system as possible. This prevents nodes from coordinating or learning who one another are, which improves security by making collusion difficult.

THORChain governance decides:

- which assets are listed or delisted
- which chains are listed or delisted
- when the protocol is upgraded
- the economic limit – how many nodes can participate

## Asset Listing

![New Assets](../.gitbook/assets/listing-new-assets.jpg)

Users signal which assets they want on the network by staking into a new pool. THORChain will recognise it as a new asset and create a pool in _bootstrap mode_ (swapping disabled).
Every few days the network checks all bootstrap pools and lists the one with the most value.

### Asset Delisting

Assets are delisted automatically when their liquidity falls too low:

1. New bootstrap pools are compared to the smallest active pools.
2. If a bootstrap pool is deeper, the smallest active pool is returned to bootstrap mode and replaced.
3. Assets can later be re-listed if liquidity returns.

## Chain Listing and Delisting

To add a new chain:

1. Community developers write a new Bifröst module and propose it via a [THORChain Improvement Proposal (TIP)](https://dev.thorchain.org/architecture/).
2. The developer community reviews and decides whether to accept it.
3. If accepted, code is tested and added to THORNode.
4. Nodes upgrade as they churn in and out.
5. When 67% of nodes run the new software, the chain connects.

To delist a chain, nodes stop watching it. Once 67% of nodes are no longer watching, the chain is removed and assets are returned to users.

## Mimir

THORChain operates with a set of constants that define fees, limits and security thresholds. These values can be overridden through Mimir.

Live values:

- [Network Constants](https://thornode.ninerealms.com/thorchain/constants)
- [Mimir Settings](https://thornode.ninerealms.com/thorchain/mimir)

See [Constants and Mimir](https://dev.thorchain.org/mimir.html) within the developer documentation for a description of each one.

## Change Management

Protocol-level changes use **Architecture Decision Records (ADRs)**. An ADR should describe:

- context and goals
- the proposed change
- pros and cons
- references
- changelog

Process and status can be found here:

- [ADR Process](https://dev.thorchain.org/architecture/PROCESS.html)
- [Current ADRs](https://dev.thorchain.org/architecture/index.html)

## Emergency Changes

Nodes cannot directly coordinate, which makes emergency changes difficult. In critical cases the **Ragnarök protocol** is used:

1. Nodes begin to leave the system.
2. When fewer than 4 nodes remain, Ragnarök triggers.
3. All funds are automatically returned to users.
4. The network shuts down safely and can be restarted later.

## Economic Limit

The number of active nodes is limited by the minimum bond requirement and the fixed supply of RUNE.

- If the network is under-bonded, the minimum bond can be lowered.
- If the network is over-bonded, the minimum bond can be raised.

This ensures the network maintains the right level of security.

## Governance Philosophy

THORChain’s governance is minimal by design:

- avoids coordination between nodes
- reduces attack and capture risk
- lets market forces drive asset and chain selection
- reduces human overhead and governance fatigue
- keeps the system self-regulating and secure

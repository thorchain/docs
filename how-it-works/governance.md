---
description: >-
  THORChain governance is deliberately minimal. It decides which chains and
  assets are listed, and when the protocol gets upgraded.
---

# Governance

THORChain aims to have as little governance baked into the system as possible. This is done so that nodes don't communicate or learn who one another are. This is important for security because it makes sure that nodes don't act together to take control.

THORChain governance decides:

* which assets are listed/delisted
* which chains are listed/delisted
* when the protocol gets upgraded
* the economic limit – how many nodes can participate

### Asset Listing

![](../.gitbook/assets/listing-new-assets.jpg)

Users signal which assets they want on the network by staking in a new pool. THORChain will realise it is a new asset it hasn't been seen before and create a new pool and place it in bootstrap mode. This is a normal asset pool except swapping is disabled on it. Every few days the networks looks at all the bootstrapping pools and lists the one with the highest value.

### Asset Delisting

Assets are delisted when all liquidity providers have taken all their assets out of it, or its pool depth drops too low. The logic is:

1. When a new bootstrap pool is enabled, its depth is compared with the depth of the smallest active pools.
2. If it is deeper, the smallest active pool is placed back into bootstrap mode, and the new pool replaces it.

The process is repeated to re-list an asset.

## Chain Listing/Delisting

When the community wants to support a new chain

1. Community developers write a new Bifröst module and propose it via a [THORChain Improvement Proposal (TIP)](governance.md#protocol-upgrades-and-thorchain-improvement-proposals-tips)
2. THORChain developer community decides whether or not to approve it
3. If approved, the code gets tested and validated by core developers
4. If accepted, it gets added to THORNode software
5. Nodes upgrade their software as they are cycled off and back onto the network
6. When 67% of nodes are running the new software, the new chain is connected

To delist, nodes stop watching a chain. When 67% are no longer watching, it gets removed. A process begins and the assets of that chain are returned to their owners.

## Change Management within THORChain

Developers from the community submit Architecture Decision Records (ADR) which are then voted on by node operators.\
An ADR should provide:

* Context on the relevant goals and the current state
* Proposed changes to achieve the goals
* Summary of pros and cons
* References
* Changelog

The ADR process is defined [here](https://gitlab.com/thorchain/thornode/-/blob/develop/docs/architecture/PROCESS.md) and ADR status is listed [here](https://gitlab.com/thorchain/thornode/-/tree/develop/docs/architecture).

### Emergency Changes

Emergency changes are difficult to coordinate because nodes cannot communicate. To handle an emergency, nodes should leave the system. When the number of nodes falls below 4, funds are paid out and the system can be shut-down. This process is called Ragnarök.

## Economic Limit

There are only so many nodes who can participate on the network. This is because there's a minimum bond amount and a fixed supply of Rune. If the system is ever found to be always under-bonded or over-bonded, the minimum bond limit can be changed.

## Mimir

Mimir is a feature to allow changes in the constants of the chain, such as MinimumBond, ChurnSpeed and more.&#x20;

There are two types of `mimir`

* Node Mimir: set by each node. Once 2.3rds have set a mimir, it is enacted. Only active nodes have their votes counted
* Admin Mimir: set by admins to override constants during testing. Admin-mimir can't control funds, but it can set parameters. Ultimately admin-mimir will be removed. Admin-mimr has a set exclusion list, values that cannot be updated by Admin, defined [here](https://gitlab.com/thorchain/thornode/-/blame/develop/x/thorchain/mimir\_accesscontrols.go#L10).

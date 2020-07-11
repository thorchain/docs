---
description: >-
  THORChain governance is deliberately minimal. It decides which chains and
  assets are listed, and when the protocol gets upgraded.
---

# Governance

THORChain aims to have as little governance baked into the system as possible. This is done so that nodes don't communicate or learn who one another are. This is important for security because it makes sure that nodes don't act together to take control.

THORChain governance decides—

* which assets are listed/delisted
* which chains are listed/delisted
* when the protocol gets upgraded
* the economic limit – how many nodes can participate

## Asset Listing/Delisting

![](../.gitbook/assets/listing-new-assets.jpg)

Users signal which assets they want on the network. To signal they want the network to support a new asset, users make a staking transaction into the network. This transaction is the same as when staking in a pool.

The user's funds get added to a "bootstrapping pool". This is a normal asset pool except swapping is disabled on it. Every few days the networks looks at all the bootstrapping pools and lists the one with the highest value.

Assets are delisted when all liquidity providers have taken their assets out of it.

The process is repeated to re-list an asset.

## Chain Listing/Delisting

When the community wants to support a new chain

1. community developers write a new Bifröst module and propose it via a [THORChain Improvement Proposal \(TIP\)](governance.md#protocol-upgrades-and-thorchain-improvement-proposals-tips)
2. THORChain developer community decides whether or not to approve it
3. if approved, the code gets tested and validated by core developers
4. if accepted, it gets added to THORNode software
5. nodes upgrade their software as they are cycled off and back onto the network
6. when 67% of nodes are running the new software, the new chain is connected

To delist, nodes stop watching a chain. When 67% are no longer watching, it gets removed. A process begins and the assets of that chain are returned to their owners.

## Protocol Upgrades & THORChain Improvement Proposals \(TIPs\)

Developers from the community submit THORChain Improvement Proposals \(TIPs\) to improve the network. The community discusses, tests and validates the software. If they decide that the change is beneficial, it's merged into the [THORNode]() software.

The protocol is made up of 3 main pieces, run by the nodes—

* application logic – runs the blockchain
* schema – stores key values of vaults
* network software – keeps the TSS protocol key generation and signing

When nodes are churned off the network they can choose to update their software version. Over time more and more nodes will run the latest version. When 67% of nodes are running the new software, the network is automatically updated. This is how application logic, chain connections and schema are updated.

When upgrading the network software, a certain block number in the future is set when the upgrade will happen. When the network reaches that point, the whole chain stops running. There's a genesis import to a new network and operations continue normally.

### Emergency Changes

Emergency changes are difficult to coordinate because nodes cannot communicate. To handle an emergency, nodes should leave the system. When the number of nodes falls below 4, funds are paid out and the system can be shut-down. This process is called Ragnarök.

## Economic Limit

There are only so many nodes who can participate on the network. This is because there's a minimum bond amount and a fixed supply of Rune. If the fixed supply can't keep the number of nodes down then the number of nodes that can join can also be reduced through governance.


---
description: Describes the different security elements within THORChain
---

# Security

THORChain has several layers of security within the code base to ensure solvency of the network, stability of the protocol and minimise the impact of any exploit. These measures are in addition to human security efforts, see more information [here](https://medium.com/thorchain/thorchains-layers-of-security-e308d537acf1).

## Confirmation Counting

To protect against double-spend attacks and re-orgs (non-instant finality chains), THORChain uses Confirmation Counting for specific chains when receiving incoming value. [Bifrost](../technology/bifrost-tss-and-vaults.md#the-bifrost-protocol) informs THORChain when to process the incoming value. How many confirmations are required is dependent on the size of the incoming value.

See more full details [here](https://dev.thorchain.org/bifrost/how-bifrost-works.html#finality--pre-confirmation).

## Outbound Transaction Throttling

To prevent large amounts of funds from leaving the network in an instant, large outbound transactions are throttled from immediately leaving the network. Each block has an outbound value limit (currently 1000 RUNE worth) and each outbound transaction has a maximum time limit that it can be processed. This has three effects:

- Each outbound transaction to compete for the next outbound block, else, it will be processed in the following block, effectively throttling the total outbound capacity of the network. This is independent of [conf-counting](#confirmation-counting).
- Large outbounds to spread across multiple blocks, up to 720 blocks (approx one hour).
- Ensures one large outbound request of $1,000,000 is handled the same as one million $1 outbound requests.

This feature is controlled by several [Mimir](https://dev.thorchain.org/mimir.html#outbound-transactions) values that can be changed by Node Operators as required.

This serves as a defensive layer buying time and allowing a vigilant node operator to pause trading or automatically halt checks to engage before the large malicious outbound transaction is irreversibly executed and funds are lost. While the feature negatively impacts the user experience of THORChain, it is necessary in ensuring the protection of liquidity provider funds.

The feature is designed to grow as the network grows and is controlled by several Mimir values that can be changed by Node Operators as required. Additionally, the feature is designed to promote bug disclosure instead of directly attacking the network as a bug disclosure is likely more profitable.

The [THORSwap](https://thorswap.finance/) team has created a dashboard to view delayed outbound transfers which is available [here](https://thorchain-scheduled-tx.web.app/).

![THORSwap Transaction Tracker — by THORSwap to track large outbound transactions](https://miro.medium.com/max/1400/0*utXfzXDUatdMtdij)

## Granular Halting Controls via Node Mimir

THORChain has different levels of halt controls within the network which are controlled by Mimir values or by nodes, depending on the type and level. The votes needed to set a halt are in [Mimir Types](governance.md#mimir-types).

The halts that can affect an individual chain are:

1. Halt Signing - outbounds queue and are not signed
2. Halt LP - add/remove stopped, swapping allowed.
3. Halt Trading - no trading allowed
4. Halt Chain - nodes stop observing that chain

All halt controls, and what each one stops, are listed in [Network Halts](https://dev.thorchain.org/concepts/network-halts.html).

## Automatic Solvency Checker

The solvency checker of the network’s primary vault was introduced to catch issues early. Detected issues can trigger an automatic trading halt on a specific chain.

The network continually compares the assets the network believes it has in its primary vault (Asgard Vault) to what assets are actually stored in the network’s chain wallets. For every connected chain, each node compares the stored Asgard vault value to each chain Asgard Wallet amount. If the Asgard Vault value is more than the wallet value by over [$500](https://dev.thorchain.org/mimir.html) for any asset, the node reports insolvency for that chain.

### Automatic Trading Halting

If at least 1/3 of the active nodes, rounded up (`signers >= ceil(N/3)`), report an insolvency with a chain, that chain is automatically halted (`SolvencyHalt{Chain}Chain`). Swaps and adding or removing liquidity stop, outbounds are held until the halt lifts, and the affected vault is no longer used for new deposits. The halt is recorded on-chain as a Mimir change, which monitoring alerts on. The halt lifts automatically once the vault is solvent again.

### Why is a difference allowed?

THORChain builds an awareness of balances purely by adding the incoming funds, then subtracting the outgoings. Thus the expected balance is the aggregate of the ins and outs. Divergences can occur when actual on-chain balances start to diverge, for example while outbounds are in flight or when the gas paid differs from the estimate. The allowance is a fixed amount per asset rather than a percentage, and only a shortfall counts, so extra funds in a wallet never triggers a halt.

### Node Operator Triggered Halts

Node Operators have the ability to halt trading within THORChain if they detect malicious activity. This is in addition to automatic chain-specific halting functionality. The ability has been made with the potential for abuse in mind.

A single node can [pause trading](../thornodes/emergency-procedures.md#network-halts) (`HaltTrading`) for up to an hour (720 blocks). Any additional node that calls for a halt will add 720 blocks to the halt timer. Any node that calls for the resumption of trading removes 720 blocks from the timer. The halt functions can only be called once by each active node per [churn cycle](https://dev.thorchain.org/mimir.html) (3 days). This gives the network the ability to respond to a malicious threat without giving any node unilateral control.

### Unauthorized Transaction Detection

This blanket protection will automatically pause THORChain on a specific chain (`HaltSigning{Chain}` and `Halt{Chain}Trading`) if an unauthorised transaction is detected. The nodes in that vault are slashed by more than the amount taken, and the pool is made whole. This will emit an on-chain security event, which monitoring alerts on. The halt will allow Node Operators, THORSec, and the development team to investigate and react immediately following an unauthorised transaction and issue a fix and restore service as quickly as possible.

## Automatic Security Flagging

Security events have been added within the code which automatically emits events when certain conditions are met such as node slashing for unauthorized transactions, attempted double-spending, or very large withdrawals. Emitted events are sent to a THORSec Discord monitoring channel for immediate review. These emitted on-chain events can also be seen on Midgard.

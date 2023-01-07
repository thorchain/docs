---
description: Describes the different security elements within THORChain
---

# Security

THORChain has several layers of security within the code base to ensure solvency of the network, stability of the protocol and minimise the impact of any exploit. These measures are in addition to human security efforts, see more information [here](https://medium.com/thorchain/thorchains-layers-of-security-e308d537acf1).

### **Conformation Counting** <a href="#b905" id="b905"></a>

To project against double-spend attacks and re-orgs (non-instant finality chains), THORChain users Conformation counting for specific chains when receiving incoming value. [Bifrost ](technology.md#the-bifroest-protocol-1-way-state-pegs)informs THORChain when to process the incoming value. How many confirmations are required is dependent on the size of the incoming value.

See more full details [here](broken-reference).&#x20;

Note, THORChain and Binance Beacon Chain have near-instant finality so confirmation counting is not required.&#x20;

### **Outbound Transaction Throttling** <a href="#b905" id="b905"></a>

To prevent large amounts of funds from leaving the network in an instant, large outbound transactions are throttled from immediately leaving the network. Each block has an outbound value limit **** (currently 1000 RUNE worth) and each outbound transaction has a maximum time limit that it can be processed. This has three effects:

* Each outbound transaction to compete for the next outbound block, else, it will be processed in the following block, effectively throttling the total outbound capacity of the network. This is independent of [conf-counting](https://docs.thorchain.org/chain-clients/overview#confirmation-counting).
* Large outbounds to spread across multiple blocks, up to 720 blocks (approx one hour).
* Ensures one large outbound request of $1,000,000 is handled the same as one million $1 outbound requests.

This feature is controlled by several [Mimir ](constants-and-mimir.md#outbound-transactions)values that can be changed by Node Operators as required. [Relevant PR](https://gitlab.com/thorchain/thornode/-/merge\_requests/1844).

This serves as a defensive layer buying time and allowing a vigilant node operator to pause trading or automatically halt checks to engage before the large malicious outbound transaction is irreversibly executed and funds are lost. While the feature negatively impacts the user experience of THORChain, but is necessary in ensuring the protection of liquidity provider funds.

The feature is designed to grow as the network grows and is controlled by several Mimir values that can be changed by Node Operators as required. Additionally, the feature is designed to promote bug disclosure instead of directly attacking the network as a bug disclosure is likely more profitable.

The [THORSwap](http://thorswap.finance/) team has created a dashboard to view delayed outbound transfers which is available [here](https://thorchain-scheduled-tx.web.app/).

![THORSwap Transaction Tracker — by THORSwap to track large outbound transactions](https://miro.medium.com/max/1400/0\*utXfzXDUatdMtdij)

### **Granular Halting Controls via Node Mimir** <a href="#bec4" id="bec4"></a>

THORChain has different levels of halt controls within the network which are controlled by Mimir values or by nodes, depending on the type and level.

The halts that can affect an individual **** chain are:

1. Halt Signing- outbounds que
2. Halt LP - add/remove stopped, swapping allowed.
3. Halt Trading - no trading allows
4. Halt Chain - nodes stop observing that chain

There are also network level halts

1. Trading halt

To get more information see [here](https://dev.thorchain.org/thorchain-dev/network/interface-management).

### **Automatic Solvency Checker** <a href="#8e53" id="8e53"></a>

The solvency checker of the network’s primary vault was introduced to catch issues early or prevent them before they happened. Detected issues can trigger an automatic trading halt on a specific chain. There are two types of automatic solvency checks:

* **Reactive:** The network continually compares the assets the network believes it has in its primary vault (Asgard Vault) to what assets are actually stored in the network’s chain wallets. For every connected chain, each node compares the stored Asgard vault value to each chain Asgard Wallet amount. If the Asgard Vault value is more than the wallet value by 1%, the node reports insolvency for that chain. [Relevant PR](https://gitlab.com/thorchain/thornode/-/merge\_requests/1797).
* **Proactive:** This mode is more powerful and is intended to catch insolvencies even before they appear. When a node attempts to sign a txOut, it will do a calculation to check if by executing the txOut the vault becomes insolvent. If so, then it refuses to sign and reports insolvency. [Relevant PR](https://gitlab.com/thorchain/thornode/-/merge\_requests/1831).

**Automatic Trading Halting**

If more than 66% of nodes, report an insolvency with a chain (reactive or proactive), trading for all assets on that chain is automatically halted (Halt{Chain}Trading). The halt will also emit a security event to ThorSec.

**Why 1% difference allowance?**

THORChain builds an awareness of balances purely by adding the incoming funds, then subtracting the outgoings. Thus the expected balance is the aggregate of the ins and outs. Divergences can occur when actual on-chain balances start to diverge. For gas assets (assets used to pay gas), small divergences can be intermittent, but normally less than +/- 1%.

**Secondary Vault Security**

Yggdrasil Vaults, the secondary vaults that hold approx 25% of the network funds, are secured by the Node Operators’ bonds and the threat of their bond being slashed 1.5x of any funds they mishandle (e.g steal or attempt to double spend).

### **Node Operator Triggered Halts** <a href="#e509" id="e509"></a>

Node Operators have the ability to halt trading within THORChain if they detect malicious activity. This is in addition to automatic chain-specific halting functionality. The ability has been made with the potential for abuse in mind.

A single node can pause trading (HaltTrading) for up to an hour (720 blocks). Any additional node that calls for a halt will add 720 blocks to the halt timer. Any node that calls for the resumption of trading removes 720 blocks from the timer. The halt functions can only be called once by each active node per churn cycle (3 days). This gives the network the ability to respond to a malicious threat without giving any node unilateral control. [Relevant PR](https://gitlab.com/thorchain/thornode/-/merge\_requests/1847).

### **Unauthorized Transaction Detection** <a href="#7b7e" id="7b7e"></a>

This blanket protection will automatically pause THORChain on a specific chain (Halt{Chain}Trading) and stop Yggdrasill vault funding if an unauthorised transaction is detected. This will emit a security event and be sent to THORSec. The halt will allow Node Operators, THORSec, and the development team to investigate and react immediately following an unauthorised transaction and issue a fix and restore service as quickly as possible. [Relevant PR](https://gitlab.com/thorchain/thornode/-/merge\_requests/2188).

### **Automatic Security Flagging** <a href="#b64b" id="b64b"></a>

Security events have been added within the code which automatically emits events when certain conditions are met such as node slashing for unauthorized transactions, attempted double-spending, or very large withdraws. Emitted events are sent to a THORSec Discord monitoring channel for immediate review. These emitted on-chain events can also be seen on Midgard. [Relevant PR](https://gitlab.com/thorchain/thornode/-/merge\_requests/2198).

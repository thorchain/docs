---
description: THORChain Frequently Asked Questions and Issues
---

# Frequently Asked Questions

## **General FAQs**

**Who founded THORChain?**

It was founded in 2018 by a pseudo-anonymous core team of contributors, of which Chad Barraford is a member. Today Nine Realms has publicly taken over THORChain operations which is led by Gavin McDermott.

**How many developers are there?**

There are approx 8 core devs and 9 devs from Nine Realms working on the protocol. There are approx 40 devs + community members working within the ecosystem.

**What are the Vesting and Allocation Details?**

All tokens have fully vested since August 2023.

### **What is the Roadmap?**

The roadmap is detailed in the [THORChain Ecosystem Q4`23 Report & 2024 Roadmap](https://medium.com/thorchain/thorchain-ecosystem-q4-23-report-2024-roadmap-1290fde4afa0) article.

### **Where can I buy Rune?**

Directly on THORChain by swapping any supported asset for Native RUNE or exchanges like Binance list Native RUNE. Only Native RUNE is supported on THORChain.

### **What is the circulating supply of RUNE?**

Approx. 330M with a max of 500M. Full details at [https://ops.ninerealms.com/network](https://ops.ninerealms.com/network) or [hhttps://runescan.io/addresses](https://runescan.io/addresses/) for a breakdown of Native RUNE.

### **What is the inflation rate of RUNE?**

The protocol [inflation](https://docs.thorchain.org/network/emission-schedule) is perdominally determined by the size of the reserve. The formula is: `Reserve/EmissionCurve/BlocksPerYear/`, thus gradually decreases every block. In early 2024, with an active reserve of 83m RUNE, the dailyinflation is around 28.5k RUNE. See the  [THORChain Tokenomics article](https://medium.com/thorchain/thorchain-tokenomics-what-is-rune-52d339633260) for more information.

### **How are swap fees calculated?**

Swap fees are dependent on the depth of liquidity pools, the deeper the pools (aka the more liquidity) the less the fee is. Swap fee also depends on the size of the deposit. Bigger deposits incur more swap fees. See [Fees](../how-it-works/fees.md#slip-based-fee).

### **What Interfaces / Exchanges are there? How to access THORChain?**

You can many interfaces to interact with THORChain. See [Exchanges](../ecosystem.md#exchanges).

#### **What is Outbound Throttling?**

* See [Outbound Transaction Throttling](../how-it-works/security.md#b905-1)
* You can watch it at [https://thorchain-scheduled-tx.web.app/](https://thorchain-scheduled-tx.web.app/)
* Since Jan 2024, [Swapper Clout](https://gitlab.com/thorchain/thornode/-/issues/1723) has been enabled to optimise the Outbound Throttling.

### **Are there withdrawal fees and why is there a 3x withdrawal fee premium?**

Yes, there is a fee for every on-chain withdrawal from THORChain, whether it is a swap outbound, savings withdrawal, opening a loan, redeeming a collateral, or withdrawing from LPs.

The outbound fees that THORChain levies is 1.5x t0 3x the “fast” fee recommended for the respective blockchain, depending on network load.

* See The `outbound_fee_multiplier` pararamter in the [network endpoint](https://thornode.ninerealms.com/thorchain/network)
* See [ADR 008: Implement a Dynamic Outbound Fee Multiplier](https://dev.thorchain.org/architecture/adr-008-implement-dynamic-outbound-fee-multiplier.html)
* See [Outbound-Fee](../how-it-works/fees.md#outbound-fee).

The outbound fees that THORChain levies could be up to 2.5x the “fast” fee recommended for the respective blockchain.

* See [Outbound-Fee](../how-it-works/fees.md#outbound-fee).
* Standard Fee [inbound address](https://thornode.ninerealms.com/thorchain/inbound\_addresses) endpoint.
* [Watch Fees and Wait Times Explained](https://www.youtube.com/watch?v=XAdaEXO-Ofg) video

#### Is there a place where I can see the THORChain Ecosystem?

Yes, the [website](https://thorchain.org/ecosystem) or the [Ecosystem](../ecosystem.md) page.

### **Technical FAQs**

**How fast is THORChain?**

Transactions Per Second (TPS), can go up to 5000 TPS, but are rarely seen. The highest number of swaps in one day was 100k swaps. Current transaction data can be seen at [https://runescan.io/](https://runescan.io/) and [https://midgard.ninerealms.com/v2/stats](https://midgard.ninerealms.com/v2/stats)

#### Why use BFT Tendermint?

THORChain uses Tendermint which is a classical BFT algorithm. 2/3 of the validators need to agree and the network values safety. The chain has instant finality and this is needed to secure cross-chain bridges.

**What is TSS and how is it used to hold network funds?**

Thorchain uses Threshold Signature Scheme (TSS) as a leaderless vault to hold funds within the network. TSS works like a multi-sig wallet but there there is no one or set of private keys that can be stolen. As a collective, all node operators work together to create a TSS vault and the super majority are required to sign a transaction for funds to leave the vault. Node operators need to bond more than 1.5x in bond the vault they can secure to ensure they do not collude to steal funds.

#### **Does THORChain need external sources for price feeds, like oracles or weighted averages?**

THORChain depends on its continuous liquidity pool design and arbitrageurs to set prices. When pools become imbalanced, arbitrage bots trade to rebalance them. THORChain knows the exchange rates between external asset pairs because RUNE binds all pools together. See [Prices](broken-reference).

Unbalanced pools represent a profit opportunity for arbitrage traders -- if a trader can purchase a token at a lower price on THORChain and sell it for a profit elsewhere, they will. These trades re-balance the pool and ensure that prices accurately reflect the market value. These pool-balancing trades happen 24/7 via arbitrage bots interacting with the protocol's API directly. It's even possible to run an arbitrage bot of your own!

#### **Is there a liquidity cap?**

The Soft Cap has been removed, so there should be no limit to the amount of liquidity entered. There is a hard cap in place to ensure the total pooled cannot exceed the total bonded, making the network unsafe however the [Incentive Pendlumn](../how-it-works/incentive-pendulum.md) makes this cap near impossible to reach.

#### Why does RUNE need to be the settlement asset in every pool?

If each pool is comprised of two assets (e.g. BTC:ETH) then there will be a scaling problem with n\*(n-1)/2 possible connections. By having RUNE on one side of each pool, $RUNE becomes a settlement bridging asset allowing swaps between any two other assets. Additionally, having $RUNE in a pool ensures that the network can become aware of the value of assets it is securing.

#### Why use 1-way state pegs instead of atomic swaps or 2-way asset pegs?

Simply put, Cross-chain bridges are a better solution than Atomic Swaps. Atomic Swaps involve a complex process of signing cryptographic keys between two parties that require interactivity. You also need a counter-party on all trades. Cross-chain bridges, coupled with continuous liquidity pools means you don't need a designated counter-party, and swaps can happen in less than a second. 1-way state pegs are better than 2-way asset pegs because assets don't need to be wrapped or pegged. Instead of having IOU tokens, real native assets can be used instead.

#### How much RUNE do you need to run a THORNode?

The minimum bond is currently: 300K Rune [MIMIR Override)](https://thorchain.net/#/network/constants) - Minimum Bond In Rune for current value.

The actual bond required is set by the market (node operators) - see the average bond at [https://thorchain.net/nodes](https://thorchain.net/nodes)

#### How are new pools added in THORChain?

Approximately every three days, the pending pool with the deepest liquidity is churned in (becomes an active pool). This is called a Pool Churn. Note: A pending pool must have a minimum 10K RUNE to be eligible for a churn.

This means there is an open decentralised liquidity competition where the community can vote with their liquidity. N.B. Caps will prevent voting with liquidity.

There is a set max of 100 active pools, and once achieved, deeper pending pools will be able to replace shallowest active pools. See [Governance](../how-it-works/governance.md#asset-listing)for more information.

#### **What is the Contract Address of RUNE?**

* There is no contract address for Native RUNE, as it is the native asset on its own blockchain.
* There used to be legacy ERC20 and BEP2 RUNE, but these were retired and are valueless.

## Frequent Issues

### My transaction failed, I can’t add liquidity or make swaps?

Make sure you have a sufficient amount of native rune to process transactions. Also be sure to check if the liquidity caps are full. If so, you will not be able to add liquidity at that time. If you see errors like “No UTXOs to send” or “Need to wait for more UTXO confirmation”; likely you are trying to spend UTXO assets (BTC, LTC, BCH) that you have just transferred into your wallet. Please wait for more blockchain confirmations, and try again later!

➜ [Check Stuck transactions](https://app.thorswap.finance/pending)

### THORYield is displaying incorrect information?

THORYield is a 3rd party app, sometimes there is a lag between sync, so yes, it may display incorrect information. In this case use THORSwap to see what liquidity you have provided.

### I staked in RuneVault but I can’t access it using TrustWallet

Go to https://www.binance.org/en/recover and enter your seed phrase from your Trust Wallet to create a key store. https://www.binance.org/en/unlock can also be used to unlock the keystore if required.

### I deposited liquidity before Ledger and TrustWallet support but I want to migrate to those wallets without removing liquidity

You can use THORChain’s keystore wallet seed phrase for xDefi, or TrustWallet. It uses the standard BIP39 mnemonic phrase, it is compatible with all multi-coin wallets and Ledger. Simply input the seed phrase and your wallet should be imported. If you are using Ledger or cold storage, it is recommended to create a new wallet.

Please be aware of the implications of inserting seed phrase previously used in hot wallets; into a cold hardware wallet.

### I used a Taproot BTC address to swap or add liquidity

THORChain does NOT currently support Taproot. User funds will be lost if sent to or from a taproot address!

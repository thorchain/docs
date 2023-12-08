---
description: THORChain Frequently Asked Questions and Issues
---

# Frequently Asked Questions

### **General FAQs**

**Who founded THORChain?**

It was founded in 2018 by an psuedo-anonymous core team of contributors, of which Chad Barraford is a member. Today Nine Realms has publicly taken over THORChain operations which is led by Gavin McDermott.

**How many developers are there?**

There are approx 8 core devs and 9 devs from Nine Realms working on the protocol. There are approx 40 devs + community members working within the ecosystem.&#x20;

**Where can I buy Rune?**&#x20;

Directly on THORChain by swapping any supported asset for Native RUNE or exchanges like Binance list Native RUNE. Only Native RUNE is supported on THORChain.&#x20;

**What is the circulating supply of RUNE?**

Approx 330M with a max of 500M. Full details at [https://ops.ninerealms.com/network](https://ops.ninerealms.com/network) [https://viewblock.io/thorchain/address/](https://viewblock.io/thorchain/address/thor1lrnrawjlfp6jyrzf39r740ymnuk9qgdgp29rqv) for a breakdown of Native RUNE.&#x20;

**What is the inflation rate of RUNE?**

The protocol [inflation ](https://docs.thorchain.org/network/emission-schedule)is RESERVE/blocksPerYear/emissionCurve. With an active reserve of 100m, the annual inflation is 12.5m RUNE. 12.5m/\~340m outstanding is approx 3.6% per year. See the  [THORChain Tokenomics article](https://medium.com/thorchain/thorchain-tokenomics-what-is-rune-52d339633260) for more information.&#x20;

**What are the Vesting and Allocation Details?**

All tokens have vested, except for those found in "vesting wallets", see [https://viewblock.io/thorchain/addresses](https://viewblock.io/thorchain/addresses)

2 remaining vested wallets hold 10m RUNE (2% of supply). Will be progressively unlocked until mid-2023. [https://viewblock.io/thorchain/address/](https://viewblock.io/thorchain/address/thor1lrnrawjlfp6jyrzf39r740ymnuk9qgdgp29rqv). See the [THORChain Tokenomics article](https://medium.com/thorchain/thorchain-tokenomics-what-is-rune-52d339633260) allocation and additional information.&#x20;

#### **What is the Roadmap?**

The roadmap is detailed in the [THORChain 2023 Look Ahead](https://medium.com/thorchain/thorchain-2023-look-ahead-c1488da2c238) article.&#x20;

#### **How are swap fees calculated?**&#x20;

Swap fees are dependent on the depth of liquidity pools, the deeper the pools (aka the more liquidity) the less the fee is. Swap fee also depends on the size of the deposit. Bigger deposits incur more swap fees. See [Fees](../how-it-works/fees.md#slip-based-fee).&#x20;

#### **What Interfaces / Exchanges are there? How to access THORChain?**&#x20;

You can many interfaces to interact with THORChain. See [Exchanges](../ecosystem.md#exchanges).

#### **What is Outbound Throttling?**&#x20;

See [Outbound Transaction Throttling](../how-it-works/security.md#b905-1)

➜ You can watch it at [https://thorchain-scheduled-tx.web.app/](https://thorchain-scheduled-tx.web.app/)

#### **Are there withdrawal fees and why is there a 3x withdrawal fee premium?**

Yes, there is a fee for every withdrawal, whether it is an asymmetrical or symmetrical deposit.

TLDR: Transaction Fee = Inbound fee Network Fee = 3x fee charged by network Total = Sum of both

Overview of the process and why:

1. Nodes Pay 1\* Standard Fee from the native pools (gas pools)
2. LPs get paid back 2\* St Fee, they earn >1x in margin due to arbing
3. Reserve gets paid back 3x, it earns 1x in margin which goes to the reserve.

➜ See [Outbound-Fee](../how-it-works/fees.md#outbound-fee).&#x20;

➜ Standard Fee [inbound address](https://thornode.ninerealms.com/thorchain/inbound\_addresses) endpoint.

➜ [Watch Fees and Wait Times Explained](https://www.youtube.com/watch?v=XAdaEXO-Ofg) video

#### Is there a place where I can see the THORChain Ecosystem?&#x20;

Yes, the [website](https://thorchain.org/ecosystem) or the [Ecosystem](../ecosystem.md) page.

### **Technical FAQs**

**How fast is THORChain?**

Transactions Per Second (TPS), can go up to 5000 TPS, but are rarely seen. The highest number of swaps in one day was 100k swaps. Current transaction data can be seen at [https://viewblock.io/thorchain](https://viewblock.io/thorchain) and [https://midgard.ninerealms.com/v2/stats](https://midgard.ninerealms.com/v2/stats)

#### Why use BFT Tendermint?&#x20;

THORChain uses Tendermint which is a classical BFT algorithm. 2/3 of the validators need to agree and the network values safety. The chain has instant finality and this is needed to secure cross-chain bridges.

**What is TSS and how is it used to hold network funds?**

Thorchain uses Threshold Signature Scheme (TSS) as a leaderless vault to hold funds within the network. TSS works like a multi-sig wallet but there there is no one or set of private keys that can be stolen. As a collective, all node operators work together to create a TSS vault and the super majority are required to sign a transaction for funds to leave the vault. Node operators need to bond more than 1.5x in bond the vault they can secure to ensure they do not collude to steal funds.

#### **Does THORChain need external sources for price feeds, like oracles or weighted averages?**

THORChain depends on its continuous liquidity pool design and arbitrageurs to set prices. When pools become imbalanced, arbitrage bots trade to rebalance them. THORChain knows the exchange rates between external asset pairs because RUNE binds all pools together. See [Prices](broken-reference).

Unbalanced pools represent a profit opportunity for arbitrage traders -- if a trader can purchase a token at a lower price on THORChain and sell it for a profit elsewhere, they will. These trades re-balance the pool and ensure that prices accurately reflect the market value. These pool-balancing trades happen 24/7 via arbitrage bots interacting with the protocol's API directly. It's even possible to run an arbitrage bot of your own!

#### **Is there a liquidity cap?**&#x20;

The Soft Cap has been removed, so there should be no limit to the amount of liquidity entered. There is a hard cap in place to ensure the total pooled cannot exceed the total bonded, making the network unsafe however the [Incentive Pendlumn](../how-it-works/incentive-pendulum.md) makes this cap near impossible to reach.

#### Why does RUNE need to be the settlement asset in every pool?&#x20;

If each pool is comprised of two assets (e.g. BTC:ETH) then there will be a scaling problem with n\*(n-1)/2 possible connections. By having RUNE on one side of each pool, $RUNE becomes a settlement bridging asset allowing swaps between any two other assets. Additionally, having $RUNE in a pool ensures that the network can become aware of the value of assets it is securing.

#### Why use 1-way state pegs instead of atomic swaps or 2-way asset pegs?&#x20;

Simply put, Cross-chain bridges are a better solution than Atomic Swaps. Atomic Swaps involve a complex process of signing cryptographic keys between two parties that require interactivity. You also need a counter-party on all trades. Cross-chain bridges, coupled with continuous liquidity pools means you don't need a designated counter-party, and swaps can happen in less than a second. 1-way state pegs are better than 2-way asset pegs because assets don't need to be wrapped or pegged. Instead of having IOU tokens, real native assets can be used instead.

#### How RUNE do you need to run a THORNode?

The minimum bond is currently: 300K Rune ([MIMIR Override)](https://thorchain.net/#/network/constants) - Minimum Bond In Rune for current value.

The actual bond required is set by the market (node operators) - see the average bond at [https://thorchain.net/nodes](https://thorchain.net/nodes)

#### How are new pools added in THORChain?

Approximately every three days, the pending pool with the deepest liquidity is churned in (becomes an active pool). This is called a Pool Churn. Note: A pending pool must have a minimum 10K RUNE to be eligible for a churn.

This means there is an open decentralised liquidity competition where the community can vote with their liquidity. N.B. Caps will prevent voting with liquidity.

There is a set max of 100 active pools, and once achieved, deeper pending pools will be able to replace shallowest active pools. See [Governance ](../how-it-works/governance.md#asset-listing)for more information.

#### **What is the Contract Address of RUNE?**&#x20;

ERC20 RUNE contract address: https://etherscan.io/address/0x3155ba85d5f96b2d030a4966af206230e46849cb&#x20;

Inbound Router https://etherscan.io/address/0xD37BbE5744D730a1d98d8DC97c42F0Ca46aD7146&#x20;

➜ Can be verified at [https://thornode.thorchain.info/thorchain/inbound\_addresses](https://thornode.thorchain.info/thorchain/inbound\_addresses)

N.B. There is no contract address for BEP-2 RUNE and Native RUNE and there is no BEP20 RUNE. ERC20 router address may change with an update so never cache the address, use /inbound\_addresses to ensure you have the latest.&#x20;

### Frequent Issues

#### My transaction failed, I can’t add liquidity or make swaps?

Make sure you have a sufficient amount of native rune to process transactions. Also be sure to check if the liquidity caps are full. If so, you will not be able to add liquidity at that time. If you see errors like “No UTXOs to send” or “Need to wait for more UTXO confirmation”; likely you are trying to spend UTXO assets (BTC, LTC, BCH) that you have just transferred into your wallet. Please wait for more blockchain confirmations, and try again later!

➜ [Check Stuck transactions](https://app.thorswap.finance/pending)

#### THORYield is displaying incorrect information?

THORYield is a 3rd party app, sometimes there is a lag between sync, so yes, it may display incorrect information. In this case use THORSwap to see what liquidity you have provided.

#### I staked in RuneVault but I can’t access it using TrustWallet.&#x20;

Go to https://www.binance.org/en/recover and enter your seed phrase from your Trust Wallet to create a key store. https://www.binance.org/en/unlock can also be used to unlock the keystore if required.

#### I deposited liquidity before Ledger and TrustWallet support but I want to migrate to those wallets without removing liquidity.&#x20;

You can use THORChain’s keystore wallet seed phrase for xDefi, or TrustWallet. It uses the standard BIP39 mnemonic phrase, it is compatible with all multi-coin wallets and Ledger. Simply input the seed phrase and your wallet should be imported. If you are using Ledger or cold storage, it is recommended to create a new wallet.

Please be aware of the implications of inserting seed phrase previously used in hot wallets; into a cold hardware wallet.

#### I used a Taproot BTC address to swap or add liquidity

THORChain does NOT currently support Taproot. User funds will be lost!

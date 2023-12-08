---
description: Getting started with THORChain and How Tos
---

# Getting Started

## Using THORChain

Users do not need RUNE to interact with THORChain. They can perform swaps and add/remove liquidity without ever directly touching RUNE or the THORChain protocol. These users need to find a THORChain-connected wallet.&#x20;

However, more advanced users will want to add symmetrical liquidity or bond as a Node. For this, they will need RUNE.&#x20;

### Acquiring Native Rune&#x20;

Buy any THORChain supported assets (such as BUSD/BTC/ETH) then swap it for native RUNE.&#x20;

From there, send it to a [self custody wallet](https://linen.app/articles/what-is-a-self-custody-non-custodial-wallet/).

## **What Wallets Support Native RUNE?**

Many wallets support Native RUNE. See [below ](getting-started.md#wallets-and-interfaces)for more information.

![Supported Wallets](<../.gitbook/assets/image (3).png>)

## Adding and Removing Liquidity

### Entering and Leaving a Pool

To deposit assets on THORChain, you need a compatible wallet with your assets connected to one of the many User Interfaces. Liquidity providers can add liquidity to any of the active or pending pools. There is no minimum deposit amount, however, your deposit will have to cover the deposit and later a withdrawal fee costs. The ability to manage and withdraw assets is completely non-custodial and does not require any KYC or permission process. Only the original depositor has the ability to withdraw them (based on the address used to deposit the assets). Note, every time you add liquidity, Impermanent Loss Protection time resets.

While Symmetrically additions are recommended, Asymmetrical additions are supported, below are the rules:

If you add symmetrically first;

* You will be able to add asymmetrically with RUNE later&#x20;
* You will be able to add asymmetrically with ASSET later but it would create a new LP position&#x20;
* You will be able to add symmetrically later

If you add asymmetrically with ASSET first;

* You will be able to add asymmetrically with RUNE later but it would create a new LP position
* You will be able to add asymmetrically with ASSET later
* You will be able to add symmetrically later but it would create a new LP position

If you add asymmetrically with RUNE first:

* You will be able to add asymmetrically with RUNE later
* You will be able to add asymmetrically with ASSET later but it would create a new LP position
* You will not be able to add symmetrically later&#x20;

![Addition Rules](https://lh3.googleusercontent.com/Vqi0wC-1dEnTGS410rXaiKpaGW5KUrzEBZPtD\_jPyWOKsooVQtWZ5hZlJWuAvmuA4c22V4WGjjlDGKKhE6p4JWKXzHKt5CS4tvnKDGdNuTsEpkQr7Ual0LpMWkEH1yFIzCqzC\_Do)

### Withdrawing Liquidity

Liquidity providers can withdraw their assets at any time and without any cooldown period, aside from the confirmation time. The network processes their request and the liquidity provider receives their ownership percentage of the pool along with the assets they’ve earned. Fees do apply when withdrawing, see [Outbound Fee](../how-it-works/fees.md#outbound-fee).

## **How to track your position**

You can see your position if you connect to THORChain via an Interface you can use [THORYield](https://app.thoryield.com/).

➜ [THORYield Guide](https://thorswap.medium.com/introducing-thoryield-v2-%EF%B8%8F-a6618c1cfcdb)

**There are 3 factors affecting returns:**

* **Proportion of transaction volume to pool depth** — If there is high volume compared to the depth of the pool then there will be higher rewards available to liquidity providers. If there is low volume compared to the depth of the pool then there will be lower rewards available.
* **Share of the pool** — If you have a large share of the pool, you’ll earn higher returns. If a liquidity provider has 1% of a pool they receive 1% of the rewards for that pool.
* **Fee size** — fees are determined by the underlying blockchain and the rewards from fees are proportional to the fees charged. A chain with higher fees will generate higher rewards for liquidity providers.

\*Of significant note is that this mechanism of providing liquidity into the protocol; creates an opportunity for holders of non-yield generating assets (e.g. BTC, BNB) to earn a return on their investments.

## Wallets and Interfaces

Below provides a starting point, see [Wallets ](../ecosystem.md#wallets)and [Exchanges ](../ecosystem.md#exchanges)for a full list.&#x20;

> ⚠️ THORChain does NOT support BTC Taproot! User funds will be lost!

### Wallets and Exchanges

#### [**XDEFI**](https://www.xdefi.io/)

A multi-chain web browser extension currently available on Chrome & Brave (soon on Firefox) built for DeFi users and NFT lovers. It is the world’s only wallet with native integrations on THORChain, Ethereum + several EVM networks and Terra.

➜ [Guide](https://xdefi-wallet.gitbook.io/xdefi-wallet/web-browsers)

➜ [FAQ](https://xdefi-wallet.gitbook.io/xdefi-wallet/faq/frequently-asked-questions)

#### [**THORWallet**](https://www.thorwallet.org/)

A non-custodial wallet that gives you full control over your keys and allows you to swap coins across different native blockchains without an intermediary. It also allows you to earn yield by providing liquidity or investing in the multichain savings account, with new features already in development.

➜ [Guide](https://thorwallet.medium.com/introduction-of-thorwallet-ae6d1dfc2076)

➜ [FAQ](https://www.thorwallet.org/faq/general)

### **Exchanges/Platforms**

#### [**AsgardEx Desktop**](https://github.com/thorchain/asgardex-electron/releases)

AsgardEx is powered by THORChain technology. Swap between assets across chains. Deposit assets to earn yield. Instantly swap assets in your wallet, or swap and send them to a friend at market prices. A small fee proportional to the slip is paid to whoever put assets in the pool. Fees are always fair and transparent.

➜ [Guide](https://github.com/thorchain/ledger-thorchain/blob/main/docs/INSTRUCTIONS.md)

#### [**Rango Exchange**](https://rango.exchange/)

Rango is a cross-chain DEX aggregator. It combines power of DEX aggregators inside blockchains (e.g. 1Inch) with multiple bridges (e.g. Binance Bridge) and cross chain liquidity providers (e.g. Thorchain) to give you access to better liquidity. Rango can provide you complex routes from any coin in any blockchain to another coin in other blockchains.&#x20;

➜ [FQAs](https://rango.exchange/faq)

➜ [Tutorials](https://rango.exchange/tutorials)

➜ [How to Swap](https://rango.exchange/how-to-swap)

#### [**DefiSpot**](https://www.defispot.com/trade)

DefiSpot is a multichain decentralized exchange (DEX) that aims to make it possible for users to swap, lend and add/remove liquidity to cryptocurrencies without needing a centralized third-party or requiring users to provide Know-Your-Customer (KYC) details.

➜ [What is Defi Spot?](https://medium.com/defispot/what-is-defispot-and-why-does-it-exist-1cb6df53d6b1)

#### [**THORSwap**](https://app.thorswap.finance/)

THORSwap is the world’s first Multichain DEX that utilizes the THORChain network to provide a front-end user interface to perform cross-chain swaps. This is done in a permissionless, trustless, and non-custodial manner. There are no pegged or wrapped assets, it is purely native.

➜ [FAQs](https://app.thorswap.finance/faq)

➜ [How to Enter Liquidity Pools using THORSwap](https://www.youtube.com/watch?v=SKv5aAMh2Js)

#### [**Shapeshift**](https://app.shapeshift.com/)

ShapeShift is a borderless, cross-chain crypto trading platform and portfolio manager for user self-sovereignty. The platform enables users to buy, send, receive, swap, and manage assets via mobile interface or web platform, and lets them choose to use a range of software or hardware wallets, including ShapeShift native, Portis, KeepKey, Trezor, and Ledger**.**

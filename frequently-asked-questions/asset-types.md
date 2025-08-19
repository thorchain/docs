---
description: Asset Notation within THORChain
---

# Asset Types

THORChain is a liquidity protocol that is made up of multiple types of assets to provide the best experience for all types of users - from retail investors to professional traders to institutional investors.

To serve everyone, THORChain:

* [Native Assets](asset-types.md#native-assets)
* [Derived Assets](asset-types.md#derived-assets)
* [Synthetic Assets](../thorchain-finance/synthetic-asset-model.md)
* [Trade Assets](../thorchain-finance/trade-assets.md)

### Native Assets

Ex: BTC.BTC

Native Assets are L1 assets (eg BTC) available on its native L1 (eg Bitcoin Network).

### Derived Assets

Ex: THOR.BTC

[Derived Assets (Deprecated)](../archived/lending.md#derived-assets-and-pools) are Native Assets (eg BTC) available on another L1 (eg THORChain if THOR.BTC). This allows the Native Asset to be sent, received and swapped on another L1 than it's native L1.

### Synthetic Assets

Ex: BTC/BTC

THORChain [synthetics ](../thorchain-finance/synthetic-asset-model.md)are fully collateralized while they exist and switch to a 1:1 peg upon redemption. This unique design combines the benefits of over-collateralization and pegging, ensuring capital efficiency and stability. The system aims for 100% collateralization but can handle drops below this without losing the peg, using fees to regain balance. Collateral comes from liquidity pools, with 50% in the asset and 50% in RUNE, rebalancing as prices change. Minting involves swapping RUNE or the asset into its synthetic form using pool liquidity, maintaining equal purchasing power.

### Trade Assets

Ex: BTC\~BTC

[Trade Assets](../thorchain-finance/trade-assets.md), a new class of primitives on THORChain, offer double the capital efficiency of synthetic assets, enhancing arbitrage and high-frequency trading. They settle with THORChain’s block speed and cost, enabling 6-second finality swaps without high fees. Redeemable anytime with no slippage, Trade Assets emulate centralized exchange trading but maintain on-chain transparency and security. Custodied by THORChain outside of liquidity pools, they provide user credits while holding funds 1:1 as L1 assets until withdrawal, making THORChain more user-friendly for active traders.

See [https://dev.thorchain.org/concepts/asset-notation.html](https://dev.thorchain.org/concepts/asset-notation.html) for more informaiton.

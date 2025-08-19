---
description: How THORChain's USD-pegged stablecoin TOR works.
---

# TOR

To understand [Lending (Deprecated)](../archived/lending.md) within THORChain fully, one needs to understand the mechanics of `TOR`.

TOR (`thor.tor`) is a non-transferable unit of account within THORChain designed to match the value of $1 USD and has been in use since [ADR 003](https://dev.thorchain.org/architecture/adr-003-flooredoutboundfee.html). It cannot be exported anywhere and always has a market cap of $0. TOR is valued by taking the median price of the active USD pools.

All collateral, debt and repayments within Lending were converted to and accounted for in TOR.&#x20;

### TOR Price Stability

TOR is anchored to a basket of USD-pegged stablecoins, such as USDC and USDT. The value of TOR is determined by taking the median price of these active USD pools, ensuring it remains stable and closely pegged to $1 USD. This median approach ensures that TOR is the most stable among the stablecoins in its basket, mitigating the risk of price volatility from any single stablecoin.

### Two-Way Burn Mechanism

There is a RUNE<>TOR mechanism that operates as a two-way burn process. When TOR is minted, an equivalent value of RUNE is burned, and conversely, when TOR is burned, the same value of RUNE is minted. This process ensures that the creation and destruction of TOR directly impact the supply of RUNE, maintaining a balanced and inflation-resistant system.

### TOR Pool Depth and Volatility Sensitivity

The depth of the TOR pool is calculated as the sum of all TOR pools. However, it is sensitive to market volatility. During periods of high volatility, the pool depth contracts to increase slippage for swaps, discouraging users from trading during these times and protecting the system from manipulation. Conversely, during stable periods, the pool depth expands, reducing slippage and encouraging swaps. This dynamic adjustment helps maintain the stability and health of the TOR pool.

### TOR Anchor

You can find the addresses for various stablecoins on specific networks (TORANCHOR) that make up TOR pools on [Mimir](https://thornode.ninerealms.com/thorchain/mimir):

```
"TORANCHOR-AVAX-USDC-0XB97EF9EF8734C71904D8002F8B6BC66DD9C48A6E": 1,
"TORANCHOR-AVAX-USDT-0X9702230A8EA53601F5CD2DC00FDBC13D4DF4A8C7": 1,
"TORANCHOR-BNB-BUSD-BD1": 0,
"TORANCHOR-BSC-USDC-0X8AC76A51CC950D9822D68B83FE1AD97B32CD580D": 1,
"TORANCHOR-ETH-DAI-0X6B175474E89094C44DA98B954EEDEAC495271D0F": 1,
"TORANCHOR-ETH-USDC-0XA0B86991C6218B36C1D19D4A2E9EB0CE3606EB48": 1,
"TORANCHOR-ETH-USDT-0XDAC17F958D2EE523A2206206994597C13D831EC7": 1,
```

### TOR Usage

TOR is used for accounting with THORChain and to price assets, instead of using any specific stablecoin. While TOR is currently non-transferable, greater use of TOR is a possibility.

####


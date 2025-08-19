# Lending FAQ (Deprecated)

{% hint style="danger" %}
**DEPRECATED FEATURE**: Lending has been permanently deprecated as of January 4, 2025. This feature is no longer available on THORChain. This documentation is preserved for historical reference only.

See the [THORFi Unwind announcement](https://medium.com/thorchain/thorfi-unwind-96b46dff72c0) for more information.
{% endhint %}

## General Questions

### What was Lending?

Lending allowed users to deposit native collateral, and then create a debt at a collateralization ratio with 0% interest, no liquidations, and no expiration.

- [More information](lending.md)
- [Launch Article](https://medium.com/thorchain/lending-on-thorchain-646bbf2e6e1b)
- [Explanation Video](https://youtu.be/AaqHG00RJks)
- [Health Dashboard](https://dashboards.ninerealms.com/#lending)

### What was TOR?

TOR (`thor.tor`) was a non-transferable unit of account that debt was always denominated in within THORChain. TOR maintained its stability by anchoring to a median value of a basket of USD-pegged stablecoins (USDC, USDT, BUSD), ensuring it stayed closely pegged to $1 USD. The RUNE<>TOR mechanism worked through a two-way burn process: minting TOR burned an equivalent value of RUNE, and burning TOR minted the same value of RUNE. See more under [TOR](../thorchain-finance/tor.md).

### Could users partially repay their loan?

Debt could be partially repaid, but a borrower would only receive their collateral back when the debt was repaid in full.

### What happened if a user overpaid their debt?

Overpayments were credited towards the next loan the borrower opened.

### Was there a best time to open or close a loan?

Yes, it was best to open and close loans during times of low volatility. To protect the network from price manipulation, virtual pool depths for lending would shrink during times of increased volatility, meaning liquidity fees could greatly increase. Managing loans during times of low price volatility on THORChain would yield the most desirable results. Patient borrowers paid the least fees.

### Would users always receive their full collateral back?

Users would receive their full collateral back upon repayment minus slip-based liquidity fees incurred from the loan opening and closing process. During low volatility periods, fees would be lower. During times of high volatility, fees would be higher due to the constricting virtual pool depth.

### Which assets could users use to pay down their debt?

Debt could be repaid with any THORChain-supported asset. Assets used to repay loans would be sold for TOR to repay the debt, since debt was denominated in TOR.

### Was streaming swaps used for lending?

Yes. There was a 5 bps default fee.

### Why were there no liquidations?

In this design, if collateral fell below the debt value, it wasn't problematic since the collateral, stored as equity (RUNE), was the liability. Liability grew only when the RUNE-ASSET price dropped and the loan was repaid. Liquidating collateral posed individual loan risks, worsened user experience, and made users monitor RUNE's price, conflicting with design objectives. Rather than liquidations, the protocol could bear a slight rise in RUNE supply (around 15m or 3%) before activating a circuit breaker, pausing the lending feature.

### Why was there no interest?

Interest rates generate income on collateral but make users more likely to repay loans. THORChain's design thrived when users opted for long-term loans or never repaid. A 0% interest rate, being highly attractive, meant users seldom repaid as their principal remained intact. Users incurred slip-based fees upon entering or exiting positions, which boosted yield for network participants and permanently burned RUNE.

### Why was there no expiry?

The protocol wanted to attract as much exogenous capital as possible (L1 assets like BTC and ETH) since it converted them to equity (RUNE IOUs). This design created net buy pressure on RUNE while storing equity as liability, which THORChain did not want to be called on, thus there was no expiry.

### How did lending help THORChain scale?

THORChain had strict rules on economic security. Value at stake by the validators must always be greater than the value of the assets in the vaults, measured in RUNE. Due to Protocol-Owned-Liquidity and Savers, the network was likely to max out pooled RUNE and send all yield to nodes. The lending design bought and burned RUNE from the pools, directly affecting the relationship between liquidity and security.

### Who was the counterparty to the loans?

The THORChain protocol and all RUNE holders were the counterparty to each loan. The RUNE burn/mint mechanism meant RUNE concentration/dilution effects (among all RUNE holders) as loans were opened and closed. Liquidity providers and Savers were not directly lending their assets to borrowers. The pools were just the conduit to swap between collateral and debt.

### How did one integrate with Lending?

See the developer quick start guide [here](https://dev.thorchain.org/lending/quick-start-guide.html)

## In Depth Questions

[See this Twitter Thread](https://twitter.com/CBarraford/status/1775618463341408587)
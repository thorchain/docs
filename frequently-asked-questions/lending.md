# Lending Frequently Asked Questions

### What is Lending?

Lending allows users to deposit native collateral, and then create a debt at a collateralization ratio with 0% interest, no liquidations, and no expiration.

* [More information](../thorchain-finance/lending.md)
* [Launch Article](https://medium.com/thorchain/lending-on-thorchain-646bbf2e6e1b)
* [Explnation Video](https://youtu.be/AaqHG00RJks)

### Can I partially repay my loan?

Debt can be partially repaid, but a borrower will only receive their collateral back when the debt is repaid in full.

### What happens if I overpay my debt?

Overpayments are credited towards the next loan the borrower opens.

### Is there a best time to open or close a loan?

Yes, it is best to open and close loans during times of low volatility. To protect the network from price manipulation, virtual pool depths for lending shrink during times of increased volatility, meaning liquidity fees can greatly increase. Managing loans during times of low price volatility on THORChain will yield the most desirable results. Patient borrowers pay the least fees.

### Will I always receive my full collateral back?

You will receive your full collateral back upon repayment minus slip-based liquidity fees incurred from the loan opening and closing process. During low volatility periods, fees will be lower. During times of high volatility, fees will be higher due to the constricting virtual pool depth.

### When will lending be available for more collateral options?

The lending protocol is initially supporting BTC and ETH. The functionality to support lending on all Layer 1 gas assets on THORChain is already available and simply needs to be turned on by the validators.

### Which assets can I use to pay down my debt?

Debt can be repaid with any THORChain-supported asset. Assets used to repay loans will be sold for TOR to repay the debt, since debt is denominated in TOR.

### Is streaming swaps used for lending?

Yes. There is a 5 bps default fee.

### Why are there no liquidations?

In this design, if collateral falls below the debt value, it’s not problematic since the collateral, stored as equity (RUNE), is the liability. Liability grows only when the RUNE-ASSET price drops and the loan is repaid. Liquidating collateral poses individual loan risks, worsens user experience, and makes users monitor RUNE’s price, conflicting with design objectives. Rather than liquidations, the protocol can bear a slight rise in RUNE supply (around 15m or 3%) before activating a circuit breaker, pausing the lending feature. With the RESERVE covering remaining collateral payouts and unchanging loan terms post-circuit breaker, a rush-exit becomes less probable.

### Why is there no interest?

Interest rates generate income on collateral but make users more likely to repay loans. THORChain’s design thrives when users opt for long-term loans or never repay. A 0% interest rate, being highly attractive, means users seldom repay as their principal remains intact. Users incur slip-based fees upon entering or exiting positions, which boosts yield for network participants and permanently burns RUNE.

### Why is there no expiry?

The protocol wants to attract as much exogenous capital as possible (L1 assets like BTC and ETH) since it converts them to equity (RUNE IOUs). Eg, $1bn in collateral stored means $1bn in bought RUNE, minus the amount of sold RUNE to debt at the collateralization ratio, (if it’s an aggregate 300%, then around $300m has been sold), with a total net buy pressure of $700m. This $700m in stored equity is the liability, and THORChain does not want to be called on this liability, since it would have to sell RUNE. Thus there is no expiry.

### How does lending help THORChain scale?

THORChain has strict rules on economic security. Value at stake by the validators must always be greater than the value of the assets in the vaults, measured in RUNE. Due to Protocol-Owned-Liquidity and Savers, the network is likely to max out pooled RUNE and send all yield to nodes. The protocol stops scaling until RUNE can be added to the bond module, but this takes time. The lending design buys and burns RUNE from the pools, directly affecting the relationship between liquidity and security. Whilst the loan was opened, it creates a net reduction in RUNE in the pools, allowing more TVL to enter. It also bids on RUNE, allowing security to increase, so the network can securely store more exogenous capital.

### Who is the counterparty to the loans?

The THORChain protocol and all RUNE holders are the counterparty to each loan. The RUNE burn/mint mechanism means RUNE concentration/dilution effects (among all RUNE holders) as loans are opened and closed. Liquidity providers and Savers are not directly lending their assets to borrowers. The pools are just the conduit to swap between collateral and debt. Savers and LPs also benefit directly from liquidity fees generated from these swaps.

### How do I integrate with Lending?

See the developer quick start guide [here](https://dev.thorchain.org/lending/quick-start-guide.html)

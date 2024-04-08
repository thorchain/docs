# Lending Frequently Asked Questions

## General Questions

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

## In Depth Questions

[Source](https://twitter.com/CBarraford/status/1775618463341408587)

### No liquidation? Only a matter of time before loans are insolvent and the protocol collapses

The design of THORChain Lending is very different than defi loans you’ve seen in the past, and it operates on a different set of assumptions. The need for liquidation is typically to ensure the protocol remains solvent, but that is not needed here. In fact, when collateral > debt, its a good thing for the protocol as it REMOVES liability. This is because the protocol already “made money” when the loan was opened, and now the loan won’t be closed (so the protocol had only upside and no downside). Even if the loan was closed in this state, the protocol would still net profit, 100% guaranteed (due to buy/burn the debt value and sell/mint the collateral value).

### There's no risk? Sounds like a scam

There certainly is risk, and no one is claiming otherwise. You always take on protocol risk for example, and it has an opportunity cost (ie you could be earning 2-6% APR on savers, but instead using your BTC for loan collateral). There is also a chance of high fees when opening or closing your loan depending on market conditions. So you may not be able to close your loan when you want to (at least not with low fees).

### Seen it before…TC will rug just like blockfi, celsius and all the others

CeFi companies like BlockFi Celsius etc took people’s collateral and made increasingly riskier bets to compete in a field of “high yielders” offerings. THORChain isn’t doing this, instead, it does only one thing with you collateral which is transparent and publicly known what that is exactly. While there is protocol risk (ie TSS exploit where funds are lost), it has been several years since an exploit has been carried out on the protocol, which instils confidence in the protocol and the devs/security engineers who work on it.

### What if there's a bank run?

The only reason for a bank run to occur is if people feel their collateral is at risk. Borrowers don't care about a downturn in $RUNE price, as long as their collateral is safe. This is why the "golden rule" of this protocol is never to put collateral at risk, ie block users from closing loans.

But let's assume something does happen, and fear/panic strikes the community, what then? In the event of a bank run, the act of a lot of loans closing in a short period causes the fees of derived assets (derivative BTC and TOR) go up. How far up? The pools can become 10% of the depth on a slip-based fee model, and no streaming swaps, which is a lot.

When paying off a loan, the distance between the debt and the collateral is the net mint/sell of $RUNE. The borrower is always burning the debt, and minting the collateral. But with high fees, you have to overpay your debt (buy/burn more $RUNE), and get back less collateral (less sell/mint $RUNE). These two forces meet in the middle at some point which causes further loans to have NO negative effect on the protocol. In fact, closing loans would have a POSITIVE effect on the protocol due to fees collected for LPs/nodes and no mint/sell of $RUNE.

So the faster/harder the bank run, the higher the fees, the less $RUNE being minted/sold into the market. It is the "weight" of the bank run that creates the counterforce. Terra didn't have this, in fact, it was the opposite. The weight of the bank run just made the bank run even heavier.

Even if none of the above existed, a bank run is still very unlikely. This is because in the event of a bank run, its very likely that the community will opt to pause loans (opening or closing) which allows time for the community/devs to fix whatever the issue/bug is that is causing FUD, restoring faith.

### What if Bitcoin outperforms $RUNE?

One important thing to note is that the price of $RUNE and the price of Bitcoin are highly correlated. This isn't by accident or happenstance, the protocol is designed this way. Due to the THORChain Bitcoin pool, an upward (or downward) price motion naturally causes $RUNE's price to go upward (or downward). This is because Bitcoin going up, causes arbs to buy $RUNE to correct the pool. The deeper the Bitcoin pool on THORChain, the more correlated the two assets are.

This is why, throughout history, $RUNE's price has followed #Bitcoin every month (except two). And generally, due to being a more volatile asset, the trend is to outperform Bitcoin in bull markets and underperform in bear markets. There is an overwhelming amount of data to support this, in fact, its a known concept in traditional finance. Sometimes called market cap volatility or size volatility or small cap effect. Pro traders will buy/sell assets with the small cap effect in mind sometimes (to be more risk-on or risk-off).

But imagine for a minute that $RUNE does underperform Bitcoin and loans are closed. It's okay if a loan closes net minting $RUNE. The design doesn't rely on every loan closing positive, just a general market trend. Don't focus on the trees too much, and look at the forest. Just like how a bank may lose $$ on a loan, but remain focused on the aggregate health. The protocol is taking a long-term viewpoint, so should we when we evaluate it.

If you're next question is "what about the bear market, when rune is underperforming bitcoin, what then", read on...

### What happens in a bear market, when rune is underperforming Bitcoin and people close their loans

This will certainly happen (expected), the thinking is it will be significantly less than the positive effect of the bull market. The vast majority of loans will likely close in a bull than a bear and heres why.

1. Bear markets are wastelands. Its typical to see a lot less activity in every sector of crypto during a bear market. Prob more than 10x less activity is fair to say. This fact alone creates significant asymmetry with lending in the protocol's favor
1. People are "poor" in bear markets, and a good percentage of them won't have the capital to pay off the debt. This could because they got "rekt'ed" in the bear, or because they spent the debt on a car or house repair etc.
1. Many loans (prob a majority) won't be closable. This is because the collateral > debt. While loans could still be closed in this state (and would actually cause more buy than sell pressure of $RUNE), they are unlikely to close at all. In fact, the deeper we get into the bear market, the less liability the protocol has. You will likely see a point where liability will DECREASE in the deep bear market. Again, this creates even more asymmetry in the protocol's favor.

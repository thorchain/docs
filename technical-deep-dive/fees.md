---
description: THORChain uses multiple fee types (Inbound, Liquidity, Affiliate, and Outbound) to ensure fair value exchange and network sustainability.
---

# Fees

Fees in THORChain serve three purposes:

- **Value capture:** Liquidity providers are compensated in proportion to the demand placed on pool liquidity. See the [Fees dev docs](https://dev.thorchain.org/concepts/fees.html) for full information.
- **Access control:** Slip-based fees naturally throttle demand for scarce liquidity. In practice, this effect is moderated by:
  - [Streaming Swaps](https://dev.thorchain.org/swap-guide/streaming-swaps.html), which split large swaps into smaller chunks to reduce single-block pressure.
  - [`L1SlipMinBps` (Mimir)](https://dev.thorchain.org/mimir.html#swapping), which enforces a minimum slip (bps) per swap.
- **Resource costs:** Outbound fees cover destination-chain gas and protocol overhead using a dynamic multiplier (OFM).

## Additional benefits

- Spam/dust resistance: minimums and slip floors make abuse economically costly.
- Stable UX expectations: users see predictable fee components rather than raw external gas volatility.
- Long-term sustainability: fee design reduces reliance on emissions alone. See [Incentive Pendulum](https://docs.thorchain.org/thorchain-finance/incentive-pendulum) for how fees and rewards adjust to balance liquidity and security.

## Fee overview

| Fee Type      | What it covers                                                                              | Where it’s paid / taken                                                                   |
| ------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Inbound Fee   | Source-chain L1 transaction fee for sending funds into THORChain                            | Paid directly by the user to the source chain’s miners/validators (wallet-controlled gas) |
| Liquidity Fee | Slip-based swap fee that compensates LPs, proportional to liquidity demand                  | Deducted by the protocol during the swap (from the output)                                |
| Affiliate Fee | Optional integrator fee (0–10,000 bps) tied to a THORName                                   | Skimmed on swap (see dev docs for ordering with Streaming Swaps)                          |
| Outbound Fee  | Destination-chain gas × dynamic multiplier (OFM ~1–3×), which also covers protocol overhead | Deducted from the swap output; includes the THORChain network component                   |

{% hint style="info" %}
Transactions on the THORChain chain itself (e.g., native RUNE or trade-asset transfers) incur the Native Transaction Fee of 0.02 RUNE. See [Fees dev docs](https://dev.thorchain.org/concepts/fees.html#3-network-fee).
{% endhint %}

## Inbound Fee

When you initiate a swap, you broadcast a transaction on the source chain and pay that chain’s normal L1 fee (e.g., sats/byte on Bitcoin, gwei on Ethereum). Using a “fast” gas setting is recommended so the swap isn’t delayed or refunded due to stale pricing. See [Inbound Fee](https://dev.thorchain.org/concepts/fees.html#1-inbound-fee).

## Liquidity Fee

THORChain’s CLP model applies a slip-based fee that scales with the amount of liquidity your swap consumes relative to pool depth—this compensates LPs and naturally throttles demand. In practice, two protocol features shape this effect:

- [Streaming Swaps](https://dev.thorchain.org/swap-guide/streaming-swaps.html): large swaps are split over time to reduce single-block pressure and improve execution for patient swappers.
- [`L1SlipMinBps` (Mimir)](https://dev.thorchain.org/mimir.html#swapping): enforces a minimum fee in basis points per swap, ensuring a floor even when pools are very deep.

For the slip math and derivations, see the [Fees dev docs](https://dev.thorchain.org/concepts/fees.html) and [Continuous Liquidity Pools](https://docs.thorchain.org/thorchain-finance/continuous-liquidity-pools).

## Affiliate Fee

Interfaces can include an optional affiliate fee (in basis points) that’s collected via a registered THORName. See the [Affiliate Fee dev docs](https://dev.thorchain.org/concepts/fees.html#affiliate-fee) for information, and how to configure preferred payout assets.

## Outbound Fee

To deliver your final asset, THORChain pays gas on the destination chain and charges an Outbound Fee from your swap output. This fee:

- Covers actual L1 gas and protocol overhead.
- Uses a dynamic Outbound Fee Multiplier (OFM) that moves between ~1× and 3× based on network and protocol factors.
- Is published via THORNode endpoints so integrators can budget precisely.

For implementation details, see the [Outbound Fee dev docs](https://dev.thorchain.org/concepts/fees.html#4-outbound-fee).

## Gas observation & process

Mechanics for gas observation, estimation, solvency checks, and per-chain behaviors are handled by [Bifrost](https://dev.thorchain.org/bifrost/how-bifrost-works.html) and its [Chain Clients](https://dev.thorchain.org/chain-clients/index.html). Refer to those pages for internals and per-chain specifics.

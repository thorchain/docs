---
description: >-
  How RUNEPool works, its use case, key components and how it enhances liquidity
  provision for RUNE holders
---

# RUNEPool

RUNEPool is a feature of THORChain that allows RUNE holders to join the Protocol Owned Liquidity (POL). By buying into the liquidity pool through RUNEPool, users get a share of the liquidity that THORChain owns across all its pools. This participation helps users earn Annual Percentage Rate (APR) returns and improves the efficiency of the protocol's liquidity, supporting the growth of THORChain's network.

## How does RUNEPool work?

RUNEPool dynamically matches external capital with various pools in the system. Managing 13 different pools, each on its price curve, RUNEPool aggregates and distributes RUNE across these pools. By using the [Incentive Pendulum](https://docs.thorchain.org/how-it-works/incentive-pendulum), RUNEPool smoothens out price curves, reducing volatility and making THORChain products more attractive to investors.

#### Use Case

RUNEPool offers a single product to gather idle RUNE from centralized exchanges and custodial services, moving them into THORChain's decentralized infrastructure to generate yield. This enhances the productivity of these assets and builds up POL through community participation.

#### Benefits

Adding RUNE to RUNEPool abstracts away user experience complexities, focusing on the Incentive Pendulum and fees generated from the pools. RUNEPool allocates funds based on the yield, simplifying decision-making for users.

#### Key Components

1. **PoL-Enabled Pools**: POL-Enabled pools are defined via the mimir key POL-{Asset}. Currently, all (eight) native assets and five USD stable coins are enabled for POL. The exact list is within the mimir endpoint.
2. **RUNEPool Units (RPU)**: Ownership in RUNEPool is tracked through RUNEPool Units (RPU). These units represent a Pooler’s share in the pool. When a Pooler redeems their units, the total PoL size in RUNE is assessed, and the holder's share is distributed.
3. **Impermanent Loss Management (IL)**: Users experience aggregate IL across PoL-Enabled pools, reducing the risk compared to any single pool.

## How to track RUNEPool performance?

There are multiple dashboards to track the performance of RUNE added to the RUNEPool:

- [thorchain.network/runepool](https://thorchain.network/runepool)
- [thorchain.net/thorfi/runepool](https://thorchain.net/thorfi/runepool)
- [runescan.io/txs?type=runepool](https://runescan.io/txs?type=runepool)

Dashboards continuously evolve as THORChain expands, but taking the example of [THORChain.network](https://thorchain.network/runepool) you will find the following in the dashboard:

- Provider: The wallet that provided the RUNE
- Deposit: How much RUNE was provided by the provider
- Value: How much RUNE is currently possible to withdraw from the RUNEPool by a particular wallet.
- PnL: The difference between the Value and Deposit is the profit that a provider has made by adding RUNE to the RUNEPool
- Latest Deposit: Block # when the last deposit was made by the provider
- Lastet Withdrawal: Block # when the last withdrawal was made by the provider
- Withdrawn: How much RUNE was withdrawn by the provider

<figure><img src="../.gitbook/assets/Screenshot 2024-07-29 at 14.09.17.png" alt=""><figcaption></figcaption></figure>

## How to use RUNEPool?

This section provides a simple guide on how to use RUNEPool, including adding and withdrawing from the pool, and viewing your position. You can find full technical docs under [dev.thorchain.org](https://dev.thorchain.org/concepts/rune-pool.html)

**Adding to RUNEPool**

1. **Create a Transaction**: Use a `MsgDeposit` transaction with the memo `pool+`.
2. **RUNE Only**: RUNEPool only works with RUNE.
3. **Instructions**: For detailed steps, refer to the "Add to the RUNEPool" section in the documentation.

**Withdrawing from RUNEPool**

1. **Create a Transaction**: Use a `MsgDeposit` transaction with the memo `pool-:<basis-points>:<affiliate>:<affiliate-basis-points>`.
2. **Minimum Term**: You can only withdraw after the minimum term, defined by the `RUNEPoolDepositMaturityBlocks` configuration.
3. **Instructions**: For detailed steps, refer to the "Withdraw from the RUNEPool" section in the documentation.

**Viewing RUNEPool Holders**

1. **All Holders**: Use the `rune_providers` endpoint to see a list of all RUNEPool holders.
2. **Specific Holder**: Use the `rune_providers/{thor owner address}` endpoint to view the position of a specific RUNEPool holder.

### How It Works

**PoL-Enabled Pools**

- **Enabled Assets**: POL is enabled for all eight native assets and five USD stable coins. The exact list can be found in the `mimir` endpoint.

**RUNEPool Units (RPU)**

- **Ownership Tracking**: RUNEPool Units (RPU) represent your share in the pool.
- **Redemption**: When you redeem your units, you receive a share of the total POL size in RUNE.

**Deposit Process**

1. **Deposit**: When you deposit, the balance moves to the `runepool` module.
2. **Pending Units**: Units are added to `PendingPoolUnits`.
3. **Reserve Exit**: The `reserveExitRUNEPool` function moves units from `PendingPoolUnits` to `PoolUnits`, reducing `ReserveUnits`.

**Withdraw Process**

1. **Pending Units Check**: If `PendingPoolUnits` is insufficient, the `reserveEnterRUNEPool` function moves RUNE from the reserve to make up the difference.
2. **Reserve Increase**: `ReserveUnits` are increased, and units move from `PoolUnits` to `PendingPoolUnits`.
3. **Withdraw Limit**: Withdrawals that would exceed `POLMaxNetworkDeposit + RUNEPoolMaxReserveBackstop` are not allowed.

**Impermanent Loss Management**

- **Aggregate IL**: Users experience aggregate impermanent loss across all PoL-enabled pools, reducing individual pool risks.
- **Idle RUNE**: Undeployed RUNE reduces yield but also limits exposure to impermanent loss.

#### Showing Profit and Loss (PnL)

**Global PnL:** The `/thorchain/runepool` endpoint returns the global PnL of RUNEPool, including details for the reserve and independent providers.

```json
jsonCopy code{
  "pol": {
    "rune_deposited": "408589258319",
    "rune_withdrawn": "208496086616",
    "value": "206166561256",
    "pnl": "6073389553",
    "current_deposit": "200093171703"
  },
  "providers": {
    "units": "232440861",
    "pending_units": "0",
    "pending_rune": "0",
    "value": "319161454",
    "pnl": "56394430",
    "current_deposit": "262767024"
  },
  "reserve": {
    "units": "149915806863",
    "value": "205847399802",
    "pnl": "6016995123",
    "current_deposit": "199830404679"
  }
}
```

**Individual Provider PnL:** The `/thorchain/rune_provider/{thor_addr}` endpoint provides position information for a single provider.

```json
jsonCopy code{
  "rune_address": "thor19phfqh3ce3nnjhh0cssn433nydq9shx76s8qgg",
  "units": "232440861",
  "value": "319161517",
  "pnl": "56394493",
  "deposit_amount": "3500000000",
  "withdraw_amount": "3237232976",
  "last_deposit_height": 14357483,
  "last_withdraw_height": 14358846
}
```

This guide should help you understand and utilize RUNEPool effectively. For more detailed instructions, refer to the respective sections in the documentation.

### Sources

- [dev.thorchain.org/concepts/rune-pool.html](https://dev.thorchain.org/concepts/rune-pool.html)
- [RUNEPool Community Call](https://www.youtube.com/watch?v=vq6t9kPEBpw&t=2s&themeRefresh=1)
- [Original Issue](https://gitlab.com/thorchain/thornode/-/issues/1841)
- [\[ADD\] RUNEPool MR](https://gitlab.com/thorchain/thornode/-/merge_requests/3612/)
- [RUNEPool Implementation MR](https://gitlab.com/thorchain/thornode/-/merge_requests/3631)

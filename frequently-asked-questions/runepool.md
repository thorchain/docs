# RUNEPool

### **What is RUNEPool?**

RUNEPool is a feature of THORChain that allows RUNE holders to join the Protocol Owned Liquidity (POL). By participating, users get a share of the liquidity that Thorchain owns across all its pools, earning Annual Percentage Rate (APR) returns and improving the protocol's liquidity efficiency, supporting Thorchain's growth.

### **How does RUNEPool work?**

RUNEPool matches external capital with various pools in the system. It manages multiple pools, distributing RUNE across them to smooth out price curves and reduce volatility. This makes Thorchain products more attractive to investors.

### **What are the key components of RUNEPool?**

- **PoL-Enabled Pools**: Defined via the mimir key POL-{Asset}, enabling all eight native assets and five USD stable coins.
- **RUNEPool Units (RPU)**: Represent a pooler’s share in the pool. When redeemed, the holder's share of the total POL size in RUNE is distributed.
- **Impermanent Loss Management (IL)**: Users experience aggregate IL across PoL-Enabled pools, reducing risk compared to any single pool.

### **What are the benefits to RUNE holders?**

RUNEPool simplifies user experience by focusing on the Incentive Pendulum and fees generated from the pools, allocating funds based on yield. This abstracts away complexities and enhances decision-making for users.

### **What is the use case for RUNEPool?**

RUNEPool gathers idle RUNE from centralized exchanges and custodial services, moving them into Thorchain's decentralized infrastructure to generate yield. This enhances asset productivity and builds up POL through community participation.

### **How can I track RUNEPool performance?**

Multiple dashboards are available to track RUNEPool performance:

- [thorchain.network/runepool](http://thorchain.network/runepool)
- [thorchain.net/thorfi/runepool](http://thorchain.net/thorfi/runepool)
- [runescan.io/txs?type=runepool](http://runescan.io/txs?type=runepool)

### **How to add to RUNEPool?**

1. **Create a Transaction**: Use a `MsgDeposit` transaction with the memo `pool+`.
2. **RUNE Only**: RUNEPool only works with RUNE.
3. **Instructions**: Refer to the "[Deposit to the RUNEPool](https://dev.thorchain.org/concepts/memos.html#deposit-runepool)" section in the documentation for detailed steps.

### **How to withdraw from RUNEPool?**

1. **Create a Transaction**: Use a `MsgDeposit` transaction with the memo `pool-:<basis-points>:<affiliate>:<affiliate-basis-points>`.
2. **Minimum Term**: You can only withdraw after the minimum term defined by `RUNEPoolDepositMaturityBlocks`.
3. **Instructions**: Refer to the "[Withdraw from the RUNEPool](https://dev.thorchain.org/concepts/memos.html#withdraw-runepool)" section in the documentation for detailed steps.

### **How to view RUNEPool holders?**

1. **All Holders**: Use the `rune_providers` endpoint to see a list of all RUNEPool holders.
2. **Specific Holder**: Use the `rune_providers/{thor owner address}` endpoint to view the position of a specific RUNEPool holder.

### **How does RUNEPool manage Impermanent Loss (IL)?**

- **Aggregate IL**: Users experience aggregate IL across all PoL-enabled pools, reducing individual pool risks.
- **Idle RUNE**: Undeployed RUNE reduces yield but also limits exposure to impermanent loss.

### **How can I see the Profit and Loss (PnL) of RUNEPool?**

The PnL can be split into Global (for all providers) and Individual:

- **Global PnL:** The `/thorchain/runepool` endpoint returns the global PnL of RUNEPool, including details for the reserve and independent providers.
- **Individual Provider PnL:** The `/thorchain/rune_provider/{thor_addr}` endpoint provides position information for a single provider.

For more detailed instructions, refer to the [developer docs](https://dev.thorchain.org/concepts/rune-pool.html).

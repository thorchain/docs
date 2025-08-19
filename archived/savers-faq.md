# Savers FAQ (Deprecated)

{% hint style="danger" %}
**DEPRECATED FEATURE**: Savers have been permanently deprecated as of January 4, 2025. This feature is no longer available on THORChain. This documentation is preserved for historical reference only.

See the [THORFi Unwind announcement](https://medium.com/thorchain/thorfi-unwind-96b46dff72c0) for more information.
{% endhint %}

### What was a Savers Vault?

Savers Vaults were a way to supply single-asset liquidity on THORChain. Users could deposit native Bitcoin, earn in-kind yield, and withdraw their principal any time since they maintained full control of their keys.

- [Original Launch Article](https://medium.com/thorchain/thorchain-savers-vaults-fc3f086b4057)

### Was Savers Vault yield fixed rate or variable rate?

Yield was variable and driven by swap fees, block rewards, pool depth, and the incentive pendulum. Annual percentage rates (APRs) were calculated using an extrapolation of past performance data from the last 30 days.

### Were there fees to enter and exit a Savers Vault?

Yes. There were slippage fees paid on entering and exiting a Savers Vault. There was a 5 bps for entry and exit fee for all savers position due to streaming swaps regardless of the size of the transaction.

### Which assets were eligible to deposit in a Savers Vault?

All L1 Assets and Selected Stables were supported.

### Where could users access Savers Vaults?

Users could manage a THORChain Savers Vault positions through many interfaces.

### Where could users track their Savers Vault yield?

Users could track their Savers Vault positions on supported interfaces including:

- RUNEScan.io
- THOR Infobot

### Should users have used THORChain Savers Vaults?

Users should have used THORChain Savings if they were planning on keeping their funds in the vault long enough for the fees accrued to offset the entry/exit costs, as well as the outbound fee(s) assessed when withdrawing.

Example: a user deposits 1 BTC in a pool 1000 BTC deep; thus pays a 0.1% slippage fee (1/1001) and is credited 0.999 BTC in the vault. If the pool is paying 3.65% APR, this is 0.1% earned every 10 days. Thus the user should plan to stay at least 20 days to pay for the entry and exit fee as a minimum.

### What were the risks associated with Savers Vaults?

Savers Vaults were not risk-free. Although Savers was designed to mitigate risk, the possibility of loss could not be eliminated completely. It was the user's responsibility to be aware of the risks before entering a Savers Vault.

### Could wallets/DEXs/DeFi products offer Savers Vaults to customers?

Yes, any person, service, or dApp could create a frontend interface to offer THORChain Savers Vaults to its users. Interested parties were directed to review the THORChain Developer Documentation.

### How did one integrate with Savers?

See the developer quick start guide [here](https://dev.thorchain.org/saving-guide/quickstart-guide.html)
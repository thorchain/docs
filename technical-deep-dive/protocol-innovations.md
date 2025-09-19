---
description: The core innovations that make THORChain unique in cross-chain DeFi
---

# Protocol Innovations

THORChain was built with the principles of decentralisation, resistance to capture, and sustainability. It introduced several firsts in cross-chain DeFi that allow secure liquidity without wrapped tokens or trusted intermediaries.

## Key Innovations

### Capped Proof of Bond

Validators must bond RUNE to join the network. Bond amounts are capped so no single validator can dominate, keeping the set geographically and operationally distributed. There is no delegation — each validator must run their own node infrastructure.

### Validator Churning

Validators rotate every few days. The oldest or lowest-bonded validators are replaced by new entrants. Each churn proves that funds remain spendable, prevents stagnation, and ensures the network is always refreshed.

### Asynchronous Upgrades

When a new version of the protocol is released, validators upgrade at their own pace. Once a supermajority is running the new version, it becomes the active consensus. This avoids forks, downtime, or the need for coordinated hard-fork events.

### Bifrost Protocol

Bifrost is THORChain’s chain-agnostic client framework. It connects THORChain to different types of blockchains through a common interface:

- **UTXO chains** (Bitcoin, Litecoin, Dogecoin, Bitcoin Cash)
- **EVM chains** (Ethereum, Avalanche, BSC)
- **BFT chains** (Cosmos SDK)  
  This standardisation allows THORChain to add support for very different chains without changing its core logic.

### Incentive Pendulum

Rewards are split between validators and liquidity providers. The Incentive Pendulum automatically adjusts this split to maintain the target **2:1 bond-to-stake ratio**. If liquidity grows faster than security, more rewards flow to validators, and vice versa.

### Continuous Liquidity Pools

Pools never close and allow single-sided deposits. Fees are slip-based: larger trades pay proportionally higher fees. This ensures efficient pricing, keeps pools balanced, and prevents large trades from manipulating prices.

### Swap Queue

Swaps are ordered by price impact in each block. This stops front-running and sandwich attacks (common forms of MEV), ensuring fair execution for all users.

## Network Goals

THORChain contributors continue to work towards three goals:

- **Security**: Functional tools like the Solvency Checker and Node Pause; procedural safeguards such as Stagenet testing and peer reviews; and economic security through bonded RUNE.
- **Liquidity**: Grow liquidity depth so users can swap large amounts across chains with low slippage.
- **Volume**: Increase network usage through wallet integrations, developer tools, and improved swap UX.

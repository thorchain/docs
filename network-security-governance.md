# Network Security and Governance

## Introduction

THORChain is a cross-chain protocol that enables the exchange of assets across different blockchains, with RUNE as its native token.

The network relies on several mechanisms to ensure security, decentralization, and economic balance: validator bonding, TSS (Threshold Signature Scheme), threshold-signed vaults, inbound and outbound vaults, node churn, the Mimir governance system, and the Incentive Pendulum.

## Validator Bonding

- **Staking as collateral**: Each validator (node) must lock a significant amount of RUNE (currently over 300,000 RUNE) as a bond in order to become an active validator
- **Securing liquidity pools**: Bonded RUNE secures the assets held in liquidity pools and acts as an economic deposit. If a validator attempts to steal funds, their bond is slashed - making dishonest behavior highly unprofitable
- **Economic target**: The network aims to maintain a ratio where the total bonded RUNE is approximately twice the value of all non-RUNE assets in the liquidity pools. This makes attacks extremely costly and impractical

## TSS – Threshold Signature Scheme

Imagine a vault with multiple locks. Each validator has only one key. To open the vault and sign a transaction, several validators must agree - one key alone is not enough.

This is how TSS works in THORChain:

- The private key is never stored in full on any single node
- Each validator holds only a fragment of the key
- Only when a sufficient threshold of validators combine their fragments can a transaction be signed

### Benefits of TSS

- Greater security - no single validator can steal funds
- Lower costs and broader applicability than traditional multisig, since TSS operates at the cryptographic level rather than via application-layer smart contracts

## Threshold-Signed Vaults

- **Multiple validator approvals**: Funds in THORChain are stored in vaults controlled by a group of validators. To release funds, a supermajority (e.g., ⅔) of validators must sign the transaction
- **No single point of failure**: Since no full private key exists, even if one validator is compromised, they cannot move funds alone. This eliminates single points of failure and significantly increases security

## Node Churn

- **Cyclical validator rotation**: THORChain regularly rotates its active nodes. Some validators leave, and new ones take their place
- **Resistance to capture**: This rotation prevents the network from being dominated by a fixed group of validators, enhancing decentralization and protecting against censorship or collusion

## Governance – The Mimir System

- **Validator voting**: Governance in THORChain is managed through Mimir, where active validators vote on network parameters
- **Consensus requirements**: Operational parameters require a small number of validator votes (typically 3+), while economic parameters require supermajority consensus (approximately 2/3 of validators)
- **Dynamic adaptation**: This allows the protocol to make quick operational adjustments while ensuring economic changes have broad validator support

## Incentive Pendulum

- **Balancing mechanism**: The Incentive Pendulum is an economic system that balances rewards between validators and liquidity providers (LPs)
- **Automatic adjustment**: The system monitors the ratio of bonded RUNE to pooled liquidity:
  - If there is too much liquidity relative to security, the network becomes unsafe - so more rewards are directed to validators
  - If there is too much bonded RUNE relative to liquidity, the system becomes inefficient - so more rewards flow to liquidity providers
- **Target ratio**: The goal is to maintain a 2:1 ratio of bonded RUNE to liquidity, the foundation of THORChain's security and efficiency model

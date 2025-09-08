---
description: An overview of THORChain's cross-chain bridge protocol, vault system, and threshold signature scheme.
---

# Bifrost, TSS and Vaults

## Overview

THORChain is a decentralized cross-chain liquidity protocol that enables native asset swaps across different blockchains without wrapped tokens. At its core, THORChain operates as a distributed vault manager using three key technologies:

1. **Bifrost Protocol** - Cross-chain bridge for observing and processing external chain transactions
2. **Vault System** - Two-layer architecture for secure asset custody
3. **Threshold Signature Scheme (TSS)** - Distributed key management for vault control

![How THORChain works](<../.gitbook/assets/image (4) (1).png>)

## The Bifrost Protocol

Bifrost is THORChain's cross-chain bridge module that enables the protocol to interact with external blockchains. Each THORNode runs a Bifrost service that:

- Observes external blockchain transactions involving THORChain vaults
- Validates transactions through consensus (requires 67% agreement)
- Processes both instant-finality and delayed-finality chains
- Signs outbound transactions using TSS

When nodes observe an inbound transaction, they convert it into a standardized witness transaction format that THORChain can process, regardless of the source chain's architecture.

![Bifrost Protocol Architecture](<../.gitbook/assets/image (6) (1) (1).png>)

{% hint style="info" %}
For complete technical specifications including transaction structures, chain clients, and integration details, see the [Bifrost Developer Documentation](https://dev.thorchain.org/bifrost/how-bifrost-works.html).
{% endhint %}

## Vault System Architecture

THORChain uses a sophisticated two-layer vault system designed for security and scalability:

### Two-Layer Vault Design

1. Logical Vaults - Represent a bonded set of validator nodes
2. Physical Vaults - Sharded instances of logical vaults for operational efficiency

All vaults use Threshold Signature Scheme (TSS) for distributed control, requiring a supermajority of nodes to sign transactions. This eliminates single points of failure while maintaining operational efficiency.

### Vault Sharding

To support network scaling, THORChain automatically shards vaults based on the `asgardsize` parameter (default: 20 nodes per shard). With 100 active nodes, the system might operate 5 physical vault shards, each controlled by a subset of validators.

### Vault Selection

The protocol dynamically selects which vault receives inbound transactions based on the highest bond-to-asset ratio, ensuring funds are always directed to the most secure vault. This selection rotates automatically as vault compositions change.

![THORChain State Machine](<../.gitbook/assets/image (16) (1).png>)

{% hint style="info" %}
For detailed vault behaviors, sharding logic, and security mechanisms, see the [Vault Behaviors Documentation](https://dev.thorchain.org/bifrost/vault-behaviors.html).
{% endhint %}

## Vault Lifecycle

Vaults progress through a defined lifecycle:

1. InitVault - Newly created vault, not yet active
2. Active - Processing inbound and outbound transactions
3. Retiring - Migrating funds to new vaults, no new inbound transactions
4. Inactive - Empty vault, eventually pruned from state

## Migration Process

Vault migration ensures continuous operation during validator set changes:

- Occurs automatically during churn cycles when validator sets change
- Prioritizes non-gas assets for migration efficiency
- Executes across multiple rounds to prevent congestion
- Maintains service availability throughout the process

### Security During Migration

When vaults retire, the newest vault immediately becomes active for receiving funds. The retiring vault continues to be monitored until migration completes, after which it becomes inactive.

{% hint style="danger" %}
Never send funds to a retired vault address. Once migration completes and the vault becomes inactive, any funds sent to that address are permanently lost and cannot be recovered.
{% endhint %}

## Threshold Signature Scheme (TSS)

TSS enables distributed control of vault assets without any single party having complete access:

- No Single Point of Failure - No complete private keys exist
- Threshold Security - Requires supermajority participation
- Chain Agnostic - Works across all supported blockchains
- Efficient Operations - Enables fast transaction signing

![TSS Signing Process](<../.gitbook/assets/image (10) (1).png>)

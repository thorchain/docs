---
description: Constants and Mimir Settings Defined.
---

# Constants and Mimir

## Overview

The network launched with a set number of constants, which has not changed. Constants can be overridden via Mimir and nodes have the ability to [vote on](../thornodes/overview.md#node-voting) and change Mimir values.&#x20;

Mimir setting can be created and changed without a corresponding Constant.&#x20;

**Values**

* Constant Values: [https://midgard.thorchain.info/v2/thorchain/constants](https://midgard.thorchain.info/v2/thorchain/constants)&#x20;
* Mimir Values: [https://midgard.thorchain.info/v2/thorchain/mimir](https://midgard.thorchain.info/v2/thorchain/mimir) &#x20;

**Key**:&#x20;

* No Star or Hash - Constant only, no Mimir override.&#x20;
* Star (\*) indicates a Mimir override of a Constant&#x20;
* Hash (#) indicates Mimir with no Constant.

## Outbound Transactions&#x20;

`OutboundTransactionFee`: Amount of rune to withhold on all outbound transactions (1e8 notation)

### Scheduled Outbound&#x20;

`MaxTxOutOffset`: Max number of blocks a scheduled outbound transaction can be delayed&#x20;

`MinTxOutVolumeThreshold`: Quantity of outbound value (in 1e8 rune) in a block before its considered "full" and additional value is pushed into the next block&#x20;

`TxOutDelayMax`: Maximum number of blocks a scheduled transaction can be delayed

`TxOutDelayRate`: Rate of which scheduled transactions are delayed

## **Swapping**

`HaltTrading`: Pause all trading

`Halt<chain>Trading`: Pause trading on a specific chain

`MaxSwapsPerBlock`: Artificial limit on the number of swaps that a single block with process

`MinSwapsPerBlock`: Process all swaps if the queue is equal to or smaller than this number

### **Synths**

`MaxSynthPerAssetDepth`: The amount of synths allowed per pool relative to the pool depth

`BurnSynths`#: Enable/Disable burning synths

`MintSynths`\*: Enable/Disable minting synths

`VirtualMultSynths`: The amount of increase the pool depths for calculating swap fees of synths

## **LP Management**

`PauseLP`\*: Pauses the ability for LPs to add/remove liquidity

`PauseLP<chain>`\*: Pauses the ability for LPs to add/remove liquidity, per chain

`MaximumLiquidityRune`\*: Max rune capped on the pools known as the ‘soft cap’

`LiquidityLockUpBlocks`: The number of blocks LP can withdraw after their liquidity

### **Impermanent Loss Protection**

`FullImpLossProtectionBlocks`\*: Number of blocks before an LP gets full imp loss protection

`ILP-DISABLED-<asset>`\*: Enable/Disable imp loss protection per asset

## **Chain Management**

`HaltChainGlobal`\*: Pause observations on all chains (chain clients)

`HaltTrading`: Stops swaps and additions, if done, will result in refunds. Observations still occur.&#x20;

`Halt<chain>Chain`\*: Pause a specific blockchain

`Halt<chain>Chain`\*: Pause a specific blockchain

`NodePauseChainGlobal`: Individual node controlled means to pause all chains

`NodePauseChainBlocks`: Number of block a node operator can pause/resume the chains for

`BlocksPerYear`: Blocks in a year

`MaxUTXOsToSpend`\*: Max UTXOs to be spent in one block&#x20;

`MinimumNodesForBFT`: Minimum node count to keep the network running. Below this, Ragnarök is performed.

### **Fee Management**

`NativeTransactionFee`: Rune fee on all on chain txs

`TNSRegisterFee`: Registration fee for new THORName, in rune

`TNSFeeOnSale`: fee for TNS sale in basis points

`TNSFeePerBlock`: per block cost for TNS, in rune

### **Solvency Checker**

`StopSolvencyCheck`#: Enable/Disable Solvency Checker

`StopSolvencyCheck<chain>`#: Enable/Disable Solvency Checker, per chain

`PermittedSolvencyGap`: The amount of funds permitted to be "insolvent". This gives the network a little bit of "wiggle room" for margin of error

## **Node Management**

`MaximumBondInRune`: Sets an upper cap on how much a node can bond

`MinimumBondInRune`\*: Sets a lower bound on bond for a node to be considered to be churned in

`ValidatorMaxRewardRatio`\*:  the ratio to MinimumBondInRune at which validators stop receiving rewards proportional to their bond

### **Yggdrasil Management**

`YggFundLimit`: Funding limit for yggdrasil vaults (percentage)

`YggFundRetry`\*: Number of blocks to wait before attempting to fund a yggdrasil again

`StopFundYggdrasil`#: Enable/Disable yggdrasil funding

`ObservationDelayFlexibility`\*: Number of blocks of flexibility for a validator to get their slash points taken off for making an observation

`PoolDepthForYggFundingMin`\*: the minimum pool depth in RUNE required for ygg funding

`MinimumNodesForYggdrasil`: No yggdrasil pools if THORNode have less than 6 active nodes

### **Slashing Management**

`LackOfObservationPenalty`: Add two slash points for each block where a node does not observe

`SigningTransactionPeriod`: How many blocks before a request to sign a tx by yggdrasil pool, is counted as delinquent.

`DoubleSignMaxAge`: Number of blocks to limit double signing a block

`FailKeygenSlashPoints`: Slash for 720 blocks, which equals 1 hour

`FailKeysignSlashPoints`: Slash for 2 blocks

`ObserveSlashPoints`: the number of slashpoints for making an observation (redeems later if observation reaches consensus

`ObservationDelayFlexibility`:  number of blocks of flexibility for a validator to get their slash points taken off for making an observation

`JailTimeKeygen`:  blocks a node account is jailed for failing to keygen. DO NOT drop below TSS timeout

`JailTimeKeysign`:  blocks a node account is jailed for failing to keysign. DO NOT drop below TSS timeout

### **Churning**

`AsgardSize`: Defines the number of members to an Asgard vault

`MinSlashPointsForBadValidator`: Min quantity of slash points needed to be considered "bad" and be marked for churn out

`BondLockupPeriod`: Lockout period that a node must wait before being allowed to unbond

`ChurnInterval`\*: Number of blocks between each churn

`HaltChurning`: Pause churning

`DesiredValidatorSet`: Max number of validators

`FundMigrationInterval`\*: Number of blocks between attempts to migrate funds between asgard vaults during a migration

`NumberOfNewNodesPerChurn`#: Number of targeted additional nodes added to the validator set each churn

`BadValidatorRedline`\*: Redline multiplier to find a multitude of bad actors

`BadValidatorRate`: Rate to mark a validator to be rotated out for bad behavior

`OldValidatorRate`: Rate to mark a validator to be rotated out for age

`LowBondValidatorRate`: Rate to mark a validator to be rotated out for low bond

## **Economics**

`EmissionCurve`\*: How quickly rune is emitted from the reserve in block rewards

`IncentiveCurve`\*: The split between nodes and LPs while the balance is optimal

`MaxAvailablePools`: Maximum number of pools allowed on the network. Gas pools (native pools) are excluded from this.

`MinRunePoolDepth`\*: Minimum number of rune to be considered to become active

`PoolCycle`\*: Number of blocks the network will churn the pools (add/remove new available pools)

`StagedPoolCost`: Number of rune (1e8 notation) that a stage pool is deducted on each pool cycle.

---
description: This page describes how to react in a network-wide emergency (funds-at-risk).
---

# 🛑 Emergency Procedures

THORChain is a distributed network. When the network is under attack or a funds-at-risk bug is discovered, Node Operators should react quickly to secure and defend. 

{% hint style="warning" %}
Even during emergencies, Node Operators should refrain from doxxing themselves. Staying psuedo-anonymous is critical to ensuring the network is impartial, nuetral and resistant to capture. 
{% endhint %}

## Reporting a Bug

If you have discovered a bug, you should immediately DM the team or any other admins. If the bug is deemed to be serious/criticial, you will be paid a bounty commensurate to the severity of the issue. Reach out on telegram, twitter, gitlab or discord.

1. Description of the bug
2. Steps to reproduce
3. If funds are at risk

## Admin Procedures

Once the bug has been verified, admin should make a decision on the level of response, including any mimir over-rides and announcements:

### Critical - Funds At Risk

* [ ] **Determine which level of halt is required:**

1. Can a trader siphon out funds by swapping? If yes, `haltTrading` using mimir
2. Can yggdrasil vaults siphon out funds? If yes, `haltInternalTx` using mimir
3. Can funds be siphoned out from any vault? If yes, `haltOutboundTx` using mimir

* [ ] **Determine what type of announcement is required**:

1. Does the network need coordination from nodes? If yes, announce, with directions.
2. Can the team immediately apply a bug patch with no coordination? If yes, simply announce the halt. 

* [ ] **Generate a bug fix**

1. Is there KVStore migration required? If yes, will require migration testing
2. Is there Bifrost/TSS changes? If yes, will require network testing

* [ ] **Test on Mocknet**
* [ ] **Release for Chaosnet**

### Major - Funds Not At Risk, but Network At Risk \(disruption\)

* [ ] **Determine what type of announcement is required**:

1. Does the network need coordination from nodes? If yes, announce, with directions.
2. Can the team immediately apply a bug patch with no coordination? If yes, consider delaying announcement until bug fix ready.

* [ ] **Generate a bug fix**

1. Is there KVStore migration required? If yes, will require migration testing
2. Is there Bifrost/TSS changes? If yes, will require network testing

* [ ] **Test on Mocknet**
* [ ] **Release for Chaosnet**

### Minor - Funds Not At Risk, Network Not At Risk

* [ ] **Generate a bug fix**

1. Is there KVStore migration required? If yes, will require migration testing
2. Is there Bifrost/TSS changes? If yes, will require network testing

* [ ] **Deploy to Testnet**
* [ ] **Release for Chaosnet**

## Network Upgrades

The network cannot upgrade until 100% of active nodes are on the updated version. This can be accelerated:

1. Naturally, by allowing the network to churn out old nodes
2. Assertive, by waiting until a super-majority has upgraded \(demonstrating acceptance of the upgrade\) then banning old nodes 
3. Forced, by hard-forking out old nodes.

During a natural upgrade cycle, it may take several days to churn out old nodes. If the upgrade is time-critical, the network may elect to ban old nodes. Banning a node will cycle them to be churned, kick them from TSS and eject them from the consensus set. That node will never be able to churn in again, they will need to fully leave, destroy their node, and set up a new one. Hard-forking out old nodes is also a possibility, but comes with significant risk of consensus failures. 

## Network Recovery

The network will not be able to recover until the upgrade is complete, any mimir over-rides are removed, and TSS is re-synced. Additionally, there may be a backlog of transactions that will need to be processed. This may take some time. If external chain daemons were stopped, re-syncing times may also be a factor. 

All wallets and frontends should monitor for any of the halts and automatically go into maintenance mode when invoked. 


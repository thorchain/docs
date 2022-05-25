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
* Can a trader siphon out funds by swapping? If yes, `haltTrading` using mimir
* Can yggdrasil vaults siphon out funds? If yes, `haltInternalTx` using mimir
* Can funds be siphoned out from any vault? If yes, `haltOutboundTx` using mimir
* [ ] **Determine what type of announcement is required**:
* Does the network need coordination from nodes? If yes, announce, with directions.
* Can the team immediately apply a bug patch with no coordination? If yes, simply announce the halt.
* [ ] **Generate a bug fix**
* Is there KVStore migration required? If yes, will require migration testing
* Is there Bifrost/TSS changes? If yes, will require network testing
* [ ] **Test on Mocknet**
* [ ] **Release for Chaosnet**

### Major - Funds Not At Risk, but Network At Risk \(disruption\)

* [ ] **Determine what type of announcement is required**:
* Does the network need coordination from nodes? If yes, announce, with directions.
* Can the team immediately apply a bug patch with no coordination? If yes, consider delaying announcement until bug fix ready.
* [ ] **Generate a bug fix**
* Is there KVStore migration required? If yes, will require migration testing
* Is there Bifrost/TSS changes? If yes, will require network testing
* [ ] **Test on Mocknet**
* [ ] **Release for Chaosnet**

### Minor - Funds Not At Risk, Network Not At Risk

* [ ] **Generate a bug fix**
* Is there KVStore migration required? If yes, will require migration testing
* Is there Bifrost/TSS changes? If yes, will require network testing
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

## Node Migration

### Create node backup

* [ ] Copy mnemonic with the following command
```
kubectl get secret thornode-mnemonic -n thornode -o yaml > ~/mnemonic_secret_new.yaml
```
* [ ] Copy key files from THORNode pod
>
/root/.thornode/THORChain-ED25519\
/root/.thornode/keyring-file/ (directory)\
/root/.thornode/config/node_key.json\
/root/.thornode/config/priv_validator_key.json
>
```
#Replace $pod with the thornode pod name
kubectl cp thornode/\$pod:/root/.thornode/THORChain-ED25519 ~/THORChain-ED25519
kubectl cp thornode/\$pod:/root/.thornode/keyring-file/ ~/keyring-file/
kubectl cp thornode/\$pod:/root/.thornode/config/node_key.json ~/config/node_key.json
kubectl cp thornode/\$pod:/root/.thornode/config/priv_validator_key.json ~/config/priv_validator_key.json
```
* [ ] Make Bifrost backup
```
#Replace $pod with the old bifrost pod name
kubectl exec deploy/thornode -c bifrost -- sh -c "cd /root/.thornode && tar cf \"bifrost.tar\" localstate-*.json"
kubectl cp thornode/\$pod:/root/.thornode/bifrost.tar ~/bifrost.tar
```

### Restore Node backup
* [ ] Copy node backup files made in [Node backup section](#create-node-backup) to the new node's control station
* [ ] Create `yaml` config files for temporary pods
thornode-recovery.yaml
```
kind: Pod
apiVersion: v1
metadata:
  name: thornode-recovery
spec:
  volumes:
    - name: volume-to-debug
      persistentVolumeClaim:
       claimName: thornode
  containers:
    - name: debugger
      image: busybox
      command: ['sleep', '3600']
      volumeMounts:
        - mountPath: "/data"
          name: volume-to-debug
```
bifrost-recovery.yaml:
```
kind: Pod
apiVersion: v1
metadata:
  name: bifrost-recovery
spec:
  volumes:
    - name: volume-to-debug
      persistentVolumeClaim:
       claimName: bifrost
  containers:
    - name: debugger
      image: busybox
      command: ['sleep', '3600']
      volumeMounts:
        - mountPath: "/data"
          name: volume-to-debug
```
* [ ] Scale thornode and bifrost deployments to 0
```
kubectl scale deployment thornode bifrost --replicas=0
```
* [ ] After thornode and bifrost are stopped run temporary pods
```
kubectl create -f thornode-recovery.yaml
kubectl create -f bifrost-recovery.yaml
```
* [ ] Copy key files from the backup to the temporary pods
```
kubectl cp node_key.json thornode-recovery:/data/.thornode/config/node_key.json
kubectl cp priv_validator_key.json thornode-recovery:/data/.thornode/config/priv_validator_key.json
kubectl cp THORChain-ED25519 thornode-recovery:/data/.thornode/THORChain-ED25519
kubectl cp keyring-file thornode-recovery:/data/.thornode/
kubectl cp THORChain-ED25519 bifrost-recovery:/data/thornode/THORChain-ED25519
kubectl cp keyring-file/thorchain.info bifrost-recovery:/data/thornode/keyring-file/thorchain.info
```
* [ ] Restore bifrost backup
```
kubectl cp bifrost.tar bifrost-recovery:/data/thornode/bifrost.tar
kubectl exec deploy/thornode -c bifrost-recovery -- sh -c "cd /root/.thornode && tar xf bifrost.tar"
```
* [ ] Stop temporary pods
```
kubectl delete -f thornode-recovery.yaml
kubectl delete -f bifrost-recovery.yaml
```
> **If you're maling live migration, then after stopping temporary pods on the NEW node stop thornode and bifrost daemons on the OLD node**
* [ ] Re-scale thornode and bifrost deployments
```
kubectl scale deployment thornode bifrost --replicas=1
```
* [ ] Remove mnemonic
```
kubectl delete secret thornode-mnemonic
```
* [ ] Restore mnemonic from the backup
```
kubectl apply -f mnemonic_secret_new.yaml
```
* [ ] Set external IP address
```
cd ./node-launcher/ && make set-ip-address
```
* [ ] Test new THORNode
* Check pods status
* Check chain sync status
* Check node name
* Check status on the dashboard (e.g. [https://thornode.network/](https://thornode.network/))
* Check slash rate

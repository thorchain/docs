---
description: Checklist of items for Node Operators
---

# ✔️ CHECKLIST

## Deploying

* [ ] I have set up a local `thornode` repository with a `cluster-launcher` and `node-launcher` git cloned into the right sub-folders
* [ ] I have installed all the pre-requisites
* [ ] I have a AWS/DO account ready with credentials if using a service provider
* [ ] I have deployed a cluster and saved my node details \(name of node, region\)
* [ ] I have installed tools via `make tools`
* [ ] I have deployed a node by running `make chaosnet-validator`
* [ ] I have securely saved my THORNode Password and THORNode Mnemonic

{% page-ref page="kubernetes/" %}

{% page-ref page="deploying.md" %}

## Joining

* [ ] I have retrieved the latest VAULT address and sent a small test bond
* [ ] I have confirmed my node has been credited the small bond
* [ ] \(Optional\) I have confirmed I can unbond a small amount
* [ ] I have sent the final bond, higher than the MinimumBond
* [ ] I have run `make set-ip-address` to set my Node's IP address
* [ ] I have run `make set-node-keys` to set my Node's public keys
* [ ] I have run `make set-version` to set my Node's version
* [ ] I have verfied in `make status` that my node is ready to churn in
* [ ] \(Optional\) I have added my node key to the Telegram Bot for notifications

{% page-ref page="joining.md" %}

{% hint style="info" %}
The BOND memo is `BOND:<node-address>`
{% endhint %}

## Upgrading

* [ ] I have run `make status` to verify the current state of my node
* [ ] I have run `kubectl get pods -n thornode` to verify all my node's services are running properly, resetting any that are faulty
* [ ] I have run the upgrade command
* [ ] I have run `make set-version` to set my new Node version
* [ ] I have run `make status` to verify the final state of my node

## Unbonding

* [ ] I have waited until my node is churned out and is in `standby`
* [ ] I have sent an UNBOND transaction from the same wallet registered to my node
* [ ] I have verified that I have received my BOND back

{% page-ref page="leaving.md" %}

{% hint style="info" %}
The UNBOND memo is `UNBOND:<node-address>:<amount>`
{% endhint %}

## Leaving Whilst Active

* [ ] I have confirmed my node is active and I wish to leave before waiting to churn naturally
* [ ] I have sent the first LEAVE transaction and verified my node has "requested to leave".
* [ ] I have verified that a churn has taken place and my node is in STANDBY
* [ ] I have verified that my node has returned all hot funds by checking my node's yggdrasil vault on the explorer
* [ ] I have sent the final LEAVE transaction and received my bond back

{% page-ref page="leaving.md" %}

{% hint style="info" %}
The LEAVE memo is `LEAVE:<node-address>`
{% endhint %}

## Leaving Whilst Standby

* [ ] I have verified that a churn has taken place and my node is in STANDBY
* [ ] I have verified that my node has returned all hot funds by checking my node's yggdrasil vault on the explorer
* [ ] I have sent the final LEAVE transaction and received my bond back

{% page-ref page="leaving.md" %}

## Destroying a Node

* [ ] I have verified that I have either UNBONDED my entire BOND or LEFT and received my BOND back. 
* [ ] I have run `make destroy destroy-tools` to destroy my node from `node-launcher`
* [ ] I have run `make destroy-aws` to destroy my cluster from `cluster-launcher`

{% page-ref page="leaving.md" %}



## 


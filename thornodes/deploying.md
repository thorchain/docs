---
description: Deploying a THORNode and its associated services.
---

# Deploying

## **Deploy THORNode services**

Now you have a Kubernetes cluster ready to use, you can install the THORNode services.

{% hint style="info" %}
Helm charts are the defacto and currently easiest and simple way to package and deploy Kubernetes application. The team created different Helm charts to help to deploy all the necessary services. Please retrieve the source files from the Git repository here to follow the instructions below:

[**https://gitlab.com/thorchain/devops/node-launcher**](https://gitlab.com/thorchain/devops/node-launcher)
{% endhint %}

### Requirements

- Running Kubernetes cluster
- Kubectl configured, ready and connected to running cluster

{% hint style="info" %}
If you came here from the Setup page, you are already good to go.
{% endhint %}

## Steps

Clone the `node-launcher` repo. All commands in this section are to be run inside of this repo.

```bash
git clone https://gitlab.com/thorchain/devops/node-launcher
cd node-launcher
git checkout master
```

### Install Helm 3

Install Helm 3 if not already available on your current machine:

```bash
make helm
make helm-plugins
```

### Tools

{% tabs %}
{% tab title="Deploy" %}
To deploy all tools, metrics, logs management, Kubernetes Dashboard, run the command below.

```bash
make tools
```

{% endtab %}

{% tab title="Destroy" %}
To destroy all those resources run the command below.

```bash
make destroy-tools
```

{% endtab %}
{% endtabs %}

You need to give the deployment a namespace name, `thorchain` is used in the example below.

If you are successful, you will see the following message:

![](<../.gitbook/assets/image (23) (1).png>)

If there are any errors, they are typically fixed by running the command again.

{% hint style="success" %}
`make help` will list all commands available. See [here](https://gitlab.com/thorchain/devops/node-launcher/-/blob/master/README.md) for more information.
{% endhint %}

## Deploy THORNode

It is important to deploy the tools first before deploying the THORNode services as some services will have metrics configuration that would fail and stop the THORNode deployment.

{% hint style="info" %}
Testnet no longer exists, only mainnet THORNodes can be created.
{% endhint %}

You have multiple commands available to deploy different configurations of THORNode. The commands deploy the umbrella chart `thornode-stack` in the background in the Kubernetes namespace `thornode` by default.

```bash
NET=mainnet TYPE=<type> NAME=<namepsace name> make install e.g.
NET=mainnet TYPE=validator NAME=thornode make install
```

{% hint style="info" %}
If you are intending to run all chain clients, bond in & earn rewards, you want to choose "Validator". Select FullNode if you only want to run THORNode and Midgard.
{% endhint %}

{% hint style="info" %}
Deploying a THORNode will take 1 day for every 3 months of ledger history, since it will validate every block. THORNodes are "full nodes", not light clients.
{% endhint %}

If successful, you will see the following:

![](<../.gitbook/assets/image (19) (1).png>)

You are now ready to join the network:

{% content-ref url="joining.md" %}
[joining.md](joining.md)
{% endcontent-ref %}

### Debugging

{% hint style="info" %}
Set `thornode` to be your default namespace so you don't need to type `-n thornode` each time:

`kubectl config set-context --current --namespace=thornode`
{% endhint %}

Use the following useful commands to view and debug accordingly. You should see everything running and active. Logs can be retrieved to find errors:

```bash
kubectl get pods -n thornode
kubectl get pods --all-namespaces
kubectl logs -f <pod> -n thornode
```

Kubernetes should automatically restart any service, but you can force a restart by running:

```bash
kubectl delete pod <pod> -n thornode
```

{% hint style="warning" %}
Note, to expedite syncing external chains, it is feasible to continually delete the pod that has the slow-syncing chain daemon (eg, binance-daemon-xxx).

Killing it will automatically restart it with free resources and syncing is notably faster. You can check sync status by viewing logs for the client to find the synced chain tip and comparing it with the real-world blockheight, ("xxx" is your unique ID):

```bash
kubectl logs -f deploy/binance-daemon -n thornode
```

{% endhint %}

{% hint style="info" %}
Get real-world blockheights of external blockchain at [https://thornode.ninerealms.com/thorchain/lastblock](https://thornode.ninerealms.com/thorchain/lastblock) or a block explorer like mempool.space.
{% endhint %}

## CHART SUMMARY

### THORNode full stack / chart

- **thornode**: Umbrella chart packaging all services needed to run a fullnode or validator THORNode.

This should be the only chart used to run [THORNode stack ](overview/#thornode-stack)unless you know what you are doing and want to run each chart separately (not recommended).

#### THORNode services:

- **thornode**: THORNode daemon
- **gateway**: THORNode gateway proxy to get a single IP address for multiple deployments
- **bifrost**: Bifrost service
- **midgard**: Midgard API service

### Tools

- **prometheus**: Prometheus stack for metrics
- **loki**: Loki stack for logs
- **kubernetes-dashboard**: Kubernetes dashboard

---
description: Deploying a THORNode and its associated services.
---

# Deploying

## **Deploy THORNode services**

Now you have a Kubernetes cluster ready to use, you can install the THORNode services.

{% hint style="info" %}
Helm charts are the defacto and currently easiest and simple way to package and deploy Kubernetes application. The team created different Helm charts to help to deploy all the necessary services. Please retrieve the source files from the Git repository here to follow the instructions below:

\*\*\*\*[ **https://gitlab.com/thorchain/devops/node-launcher**](https://gitlab.com/thorchain/devops/node-launcher)\*\*\*\*
{% endhint %}

### Requirements

* Running Kubernetes cluster
* Kubectl configured, ready and connected to running cluster

{% hint style="info" %}
If you came here from the Setup page, you are already good to go. 
{% endhint %}

## Steps

Clone the `node-launcher` repo. All commands in this section are to be run inside of this repo. 

```text
git clone https://gitlab.com/thorchain/devops/node-launcher
cd node-launcher
```

### Install Helm 3

Install Helm 3 if not already available on your current machine:

```text
make helm
```

### Tools

{% tabs %}
{% tab title="Deploy" %}
To deploy all tools, metrics, logs management, Kubernetes Dashboard, run the command below.

```text
make tools
```
{% endtab %}

{% tab title="Destroy" %}
To destroy all those resources run the command below.

```text
make destroy-tools
```
{% endtab %}
{% endtabs %}

If you are successful, you will see the following message:

![](../.gitbook/assets/image%20%2823%29.png)

If there are any errors, they are typically fixed by running the command again. 

## Deploy THORNode

It is important to deploy the tools first before deploying the THORNode services as some services will have metrics configuration that would fail and stop the THORNode deployment.

You have multiple commands available to deploy different configurations of THORNode. You can deploy mainnet  or testnet. The commands deploy the umbrella chart `thornode` in the background in the Kubernetes namespace `thornode` by default. Unless you specify the name of your deployment using the environment variable `NAME`, all the commands are run against the default Kubernetes namespace `thornode` set up in the Makefile.

{% tabs %}
{% tab title="TESTNET" %}
#### Deploy Testnet Validator

To automatically select the current testnet chain, run that command:

```text
make testnet-validator
```

Or to manually specify the seed genesis IP, run that command:

```text
SEED_TESTNET=1.2.3.4 make testnet-validator
```
{% endtab %}

{% tab title="CHAOSNET" %}
Rune the following to join Chaosnet:

```text
make chaosnet-validator
```

You will be prompted for a password to encrypt your node private key. Do not forget this key. 
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Deploying a THORNode takes ~10 minutes
{% endhint %}

If successful, you will see the following:

![](../.gitbook/assets/image%20%2819%29.png)

You are now ready to join the network:

{% page-ref page="joining.md" %}

### Debugging

{% hint style="info" %}
Set `thornode` to be your default namespace so you don't need to type `-n thornode` each time:

`kubectl config set-context --current --namespace=thornode`
{% endhint %}

Use the following useful commands to view and debug accordingly. You should see everything running and active. Logs can be retrieved to find errors:

```text
kubectl get pods -n thornode
kubectl get pods --all-namespaces
kubectl logs -f <pod> -n thornode
```

Kubernetes should automatically restart any service, but you can force a restart by running:

```text
kubectl delete pod <pod> -n thornode
```

{% hint style="warning" %}
Note, to expedite syncing external chains, it is feasible to continually delete the pod that has the slow-syncing chain daemon \(eg, binance-daemon-xxx\). 

Killing it will automatically restart it with free resources and syncing is notably faster. You can check sync status by viewing logs for the client to find the synced chain tip and comparing it with the real-world blockheight, \("xxx" is your unique ID\):

```text
kubectl logs -f binance-daemon-xxx -n thornode
```
{% endhint %}

{% hint style="info" %}
Get real-world blockheights on the external blockchain explorers, eg:  
[https://testnet-explorer.binance.org/](https://testnet-explorer.binance.org/)

[https://explorer.binance.org/](https://explorer.binance.org/)
{% endhint %}

## CHART SUMMARY

#### THORNode full stack umbrella chart

* **thornode**: Umbrella chart packaging all services needed to run a fullnode or validator THORNode.

This should be the only chart used to run THORNode stack unless you know what you are doing and want to run each chart separately \(not recommended\).

#### THORNode services:

* **thor-daemon**: THORNode daemon
* **thor-api**: THORNode API
* **thor-gateway**: THORNode gateway proxy to get a single IP address for multiple deployments
* **bepswap**: BEPSwap UI frontend
* **bifrost**: Bifrost service
* **midgard**: Midgard service

#### External services:

* **binance-daemon**: Binance fullnode daemon
* **bitcoin-daemon**: Bitcoin fullnode daemon
* **ethereum-daemon**: Ethereum fullnode daemon

#### Tools

* **elastic**: ELK stack, deperecated. Use elastic-operator chart
* **elastic-operator**: ELK stack using operator for logs management
* **prometheus**: Prometheus stack for metrics
* **kubernetes-dashboard**: Kubernetes dashboard


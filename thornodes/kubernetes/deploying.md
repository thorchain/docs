---
description: Deploying a THORNode and its associated services.
---

# Deploying

## **Deploy THORNode services**

Now you have a Kubernetes cluster ready to use, you can install the THORNode services.

Helm charts are the defacto and currently easiest and simple way to package and deploy Kubernetes application. The team created different Helm charts to help to deploy all the necessary services. Please retrieve the source files from the Git repository here to follow the instructions below:

 ****[**https://gitlab.com/thorchain/devops/helm-charts**](https://gitlab.com/thorchain/devops/helm-charts/-/blob/master/README.md)  
****

Charts to deploy THORNode stack and tools. It is recommended to use the Makefile commands available in this repo to start the charts with predefined configuration for most environments. 

### Requirements

* Running Kubernetes cluster
* Kubectl configured, ready and connected to running cluster
* Helm 3 \(version &gt;=3.2, can be installed using make command below\)

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

You can install those tools separately using the sections below.

### Deploy THORNode

It is important to deploy the tools first before deploying the THORNode services as some services will have metrics configuration that would fail and stop the THORNode deployment.

You have multiple commands available to deploy different configurations of THORNode. You can deploy mainnet / testnet / mocknet. The commands deploy the umbrella chart `thornode` in the background in the Kubernetes namespace `thornode` by default. Unless you specify the name of your deployment using the environment variable `NAME`, all the commands are run against the default Kubernetes namespace `thornode` set up in the Makefile.

{% tabs %}
{% tab title="MAINNET" %}
#### Deploy Mainnet Genesis

```text
make mainnet
```

#### Deploy Mainnet Validator

```text
make mainnet-validator
```
{% endtab %}

{% tab title="TESTNET" %}
#### Deploy Testnet Genesis

If you want to run your own Binance Node included in your stack, run:

```text
make testnet
```

Or to connect to Binance Testnet available at [http://testnet-binance.thorchain.info:26657](http://testnet-binance.thorchain.info:26657/), run:

```text
make testnet-slim
```

#### Deploy Testnet Validator

To retrieve the PEER IP of your genesis node run the status command against the cluster running the genesis node, then export the node IP in the environment variable `PEER`:

```text
make status
export PEER=<node-ip>
echo $PEER
```

Then in the same terminal where you previously exported the PEER env variable, you can run:

```text
make testnet-validator
```

Or to manually specify the PEER IP, run that command:

```text
PEER=1.2.3.4 make testnet-validator
```

Slim version validator:

```text
PEER=1.2.3.4 make testnet-slim-validator
```
{% endtab %}

{% tab title="MOCKNET" %}
#### Deploy Mocknet Genesis

```text
make mocknet
```

#### Deploy Mocknet Validator

```text
make mocknet-validator
```
{% endtab %}
{% endtabs %}

### THORNode commands

The Makefile provide different commands to help you operate your THORNode.

{% tabs %}
{% tab title="STATUS" %}
To get information about your node on how to connect to services or its IP, run the command below. You will also get your node address and the vault address where you will need to send your bond.

```text
make status
```
{% endtab %}

{% tab title="SHELL" %}
Opens a shell into your `thor-daemon` deployment: From within that shell you have access to the `thorcli` command.

```text
make shell
```
{% endtab %}

{% tab title="LOGS" %}
Display stream of logs of `thor-daemon` deployment:

```text
make logs
```
{% endtab %}

{% tab title="NODE-KEYS" %}
Send a `set-node-keys` to your node, which will set your node keys automatically for you by retrieving them directly from the `thor-daemon` deployment.

```text
make set-node-keys
```
{% endtab %}

{% tab title="IP ADDDRESS" %}
Send a `set-ip-address` to your node, which will set your node ip address automatically for you by retrieving the load balancer deployed directly.

```text
make set-ip-address
```
{% endtab %}

{% tab title="DESTROY" %}
To fully destroy the running node and all services, run that command:

```text
make destroy
```
{% endtab %}
{% endtabs %}

### LOGS MANAGEMENT \(KIBANA\)

It is recommended to deploy an Elastic Search / Logstash / Filebeat / Kibana to redirect all logs within an elasticsearch database and available through the UI Kibana.

{% tabs %}
{% tab title="DEPLOY" %}
You can deploy the log management automatically using the command below:

```text
make install-logs
```

This command will deploy the elastic-operator chart. It can take a while to deploy all the services, usually up to 5 minutes depending on resources running your kubernetes cluster.

You can check the services being deployed in your kubernetes namespace `elastic-system`.
{% endtab %}

{% tab title="ACCESS" %}
We have created a make command to automate this task to access Kibana from your local workstation:

```text
make kibana
```

Open [https://localhost:5601](https://localhost:5601/) in your browser. Your browser will show a warning because the self-signed certificate configured by default is not verified by a third party certificate authority and not trusted by your browser. You can temporarily acknowledge the warning for the purposes of this quick start but it is highly recommended that you configure valid certificates for any production deployments.

Login as the elastic user. The password should have been displayed in the previous command \(`make kibana`\).

To manually access Kibana follow these instructions: A ClusterIP Service is automatically created for Kibana:

```text
kubectl -n elastic-system get service elasticsearch-kb-http
```

Use kubectl port-forward to access Kibana from your local workstation:

```text
kubectl -n elastic-system port-forward service/elasticsearch-kb-http 5601
```

Login as the `elastic` user. The password can be obtained with the following command:

```text
kubectl -n elastic-system get secret elasticsearch-es-elastic-user -o=jsonpath='{.data.elastic}' | base64 --decode; echo
```
{% endtab %}

{% tab title="DESTROY" %}
#### Destroy logs management stack

```text
make destroy-logs
```
{% endtab %}
{% endtabs %}

### METRICS MANAGEMENT \(Prometheus\)

It is also recommended to deploy a Prometheus stack to monitor your cluster and your running services.

{% tabs %}
{% tab title="DEPLOY" %}
You can deploy the metrics management automatically using the command below:

```text
make install-metrics
```

This command will deploy the prometheus chart. It can take a while to deploy all the services, usually up to 5 minutes depending on resources running your kubernetes cluster.

You can check the services being deployed in your kubernetes namespace `prometheus-system`.
{% endtab %}

{% tab title="ACCESS" %}
We have created a make command to automate this task to access Grafana from your local workstation:

```text
make grafana
```

Open [http://localhost:3000](http://localhost:3000/) in your browser.

Login as the `admin` user. The default password should have been displayed in the previous command \(`make grafana`\).

#### Access Prometheus admin UI

We have created a make command to automate this task to access Prometheus from your local workstation:

```text
make prometheus
```

Open [http://localhost:9090](http://localhost:9090/) in your browser.
{% endtab %}

{% tab title="DESTROY" %}
#### Destroy metrics management stack

```text
make destroy-metrics
```
{% endtab %}
{% endtabs %}

### Kubernetes Dashboard

You can also deploy the Kubernetes dashboard to monitor your cluster resources.

{% tabs %}
{% tab title="DEPLOY" %}
```text
make install-dashboard
```

This command will deploy the Kubernetes dashboard chart. It can take a while to deploy all the services, usually up to 5 minutes depending on resources running your kubernetes cluster.
{% endtab %}

{% tab title="ACCESS" %}
We have created a make command to automate this task to access the Dashboard from your local workstation:

```text
make dashboard
```

Open [http://localhost:8000](http://localhost:8000/) in your browser.
{% endtab %}

{% tab title="DESTROY" %}
#### Destroy Kubernetes dashboard

```text
make destroy-dashboard
```
{% endtab %}
{% endtabs %}

### Charts available:

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
* kubernetes-dashboard: Kubernetes dashboard




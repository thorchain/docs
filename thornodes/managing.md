---
description: 'Accessing Logs, Metrics and more'
---

# Managing

## THORNode commands

The Makefile provide different commands to help you operate your THORNode.  
  
There are two types of make commands, READ and WRITE.   


#### READ COMMANDS

Read commands simply read your node state and doesn't commit any transactions. 

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

{% tab title="MNEMONIC" %}
This will print your node mnemonic \(phrase\). Use this to ever rescue your node funds if something goes wrong.   
  
_Note: This phrase should only be used "in anger". This is your node "hot vault", also referred to as its yggdrasil vault, which allows the network to delegate swaps for faster execution. You will be slashed significantly if any funds are moved from this vault, since it is monitored by the THORChain network. Your bond is held at ransom in order to prevent you from stealing funds from this vault. Your bond will always be more valuable than funds on this vault, so you have no economic reason to touch these funds._ 

```text
make mnemonic
```
{% endtab %}

{% tab title="PASSWORD" %}
A keystore file that secures your private keys is also stored on the THORNode. The password that is used to decrypt it can be printed by the following command

```text
make password
```
{% endtab %}
{% endtabs %}

#### WRITE COMMANDS

Write commands actually build and write transactions into the underlying statechain. They cost RUNE from your bond, currently 1 RUNE, but you can check this on the `/constants` endpoint "CLICOSTINRUNE". This will post state in the chain which will be now updated globally. The RUNE fee is to prevent DOS attacks. 

{% tabs %}
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

{% tab title="VERSION" %}
In order to update your THORNode to a new version, you will need to update the docker tag image used in your deployments. Depending on your choice of deployment this can be done differently.

For Kubernetes deployments, you can edit the deployments of the different services you want to update using the commands below.

To update your `thor-daemon`, `thor-api` and `bifrost` deployment images to version 0.2.0:

```text
kubectl set image deployment/thor-daemon thor-daemon=registry.gitlab.com/thorchain/thornode:mainnet-0.2.0
kubectl set image deployment/thor-api thor-api=registry.gitlab.com/thorchain/thornode:mainnet-0.2.0
kubectl set image deployment/bifrost bifrost=registry.gitlab.com/thorchain/thornode:mainnet-0.2.0
```

To update your \`midgard\` deployment image to version 0.2.0

```text
kubectl set image deployment/midgard midgard=registry.gitlab.com/thorchain/midgard:mainnet-0.2.0
```

You can then follow the deployments restarting status either by checking your Kubernetes dashboard or using the CLI command below:

```text
kubectl get deployment/thor-daemon
```

Once the deployments are all in the ready state again, you need to broadcast to the network that you are running a new version using the command below:

```text
make set-version
```
{% endtab %}
{% endtabs %}

## 

## Tools

Note, all of these should already be installed from `make tools`. However you can install them separately useing the DEPLOY tabs below. 

To access the tools, navigate to the ACCESS tabs below. 

All of these commands are to be run from `node-launcher`

### LOGS MANAGEMENT \(KIBANA\)

It is recommended to deploy an Elastic Search / Logstash / Filebeat / Kibana to redirect all logs within an elasticsearch database and available through the UI Kibana.

For a reminder on Kubernetes commands, please[ visit this page](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)**.** 

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
You can automate this task to access Kibana from your local workstation:

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

To access the logs of the THORNode services running, you can either use directly Kubernetes commands to get logs from different deployments, for example, to get the logs of the service `thor-daemon`:

```text
kubectl logs -f deploy/thor-daemon -n thornode
```
{% endtab %}
{% endtabs %}

From there, you will need to create a new index to get the logs coming from Filebeat. You can search using the regular “Discover” app in Kibana to go through your logs using a filter to get only specific services or keywords, etc.

You can follow a more in-depth [introduction to Kibana here](https://www.elastic.co/guide/en/kibana/current/introduction.html)**.**

![Overview of Kibana Logs](../.gitbook/assets/image%20%2812%29.png)

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

![](../.gitbook/assets/image%20%2822%29.png)

#### Access Prometheus admin UI

We have created a make command to automate this task to access Prometheus from your local workstation:

```text
make prometheus
```

Open [http://localhost:9090](http://localhost:9090/) in your browser.
{% endtab %}
{% endtabs %}

As part of the tools command deployment, you also have deployed a Prometheus stack in addition to the Elasticsearch in your Kubernetes cluster. All CPU, memory, disk space, and THORNode / THORChain custom metrics are automatically being sent to the Prometheus database backend deployed in your cluster.

You should have available different dashboards to see the metrics across your cluster by nodes, deployments, etc, and also a specific **`THORNode / THORChain`** dashboard to see the THORChain status, with current block height, how many validators are currently active and other chain related information.

{% hint style="info" %}
Click the  🔍 SEARCH ICON to find the list of dashboards
{% endhint %}

![Example of Grafana Dashboard](../.gitbook/assets/image.png)

For a more in-depth introduction of Grafana, please[ follow the documentation here](https://grafana.com/docs/grafana/latest/getting-started/what-is-grafana/)**.**

## Kubernetes Dashboard

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
{% endtabs %}

View your kubernetes dashboard by running the following:

```text
make dashboard
```

![Kubernetes Dashboard](../.gitbook/assets/image%20%2814%29.png)

## Backing up a THORNode

You should backup your THORNode in case of failures. By default, if you are using the Kubernetes deployments solution, all the the deployments are automatically backed up by persistent volume disks.   
Depending on your provider, the volumes are usually available in the provider administration UI, for example in AWS, you can find those volumes in your regular console, in the region you chose to deploy your Kubernetes cluster.

Again by default, with Kubernetes, by using persistent volumes used in the default configuration, you are already protected again restart failures at container level, or node failures. As long as you don’t specifically use the destroy commands from the Makefile or manually delete your Kubernetes deployments, your volumes will NOT be deleted at any time. 

It is still recommended, as any project, to have different backups on top of those volumes to make sure you can recover in admin error deleting those volumes or other Kubernetes resources that would imply deleting those volumes. 

For AWS, you can easily setup in your console to have snapshots of your cluster volumes be taken every day. For other provider there can be different ways to achieve this as well either manually or automatically. 

It is up to the node operator to setup those extra backups of the core volumes to be able to recover in any kind of failures or human errors.

Some volumes would be more critical than others, for example Midgard deployment are also by default backed up by persistent volumes, so it can recover in case of container restarts, failures or node failures and the deployment being automatically scheduled to a different node, but if you were to delete the Midgard volume, it would reconstruct its data from your THORNode API and events from scratch. For that specific service having extra backups might not be critical, at the time of the writing of that document, Midgard implementation might change in the future.

## Node Security

The following are attack vectors:

1. If anyone accesses your AWS credentials, they can log in and steal your funds
2. If anyone accesses the device you used to log into kubernetes, they can log in and steal your funds
3. If anyone accesses your hardware device used to bond, they can sign a LEAVE transaction and steal your bond once it is returned

{% hint style="danger" %}
**RUNNING A NODE IS SERIOUS BUSINESS**

DO SO AT YOUR OWN RISK, YOU CAN LOSE A SIGNIFICANT QUANTITY OF FUNDS IF AN ERROR IS MADE

THORNODE SOFTWARE IS PROVIDED AS IS - YOU ARE SOLELY RESPONSIBLE FOR USING IT
{% endhint %}




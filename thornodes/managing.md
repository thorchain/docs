---
description: Accessing Logs, Metrics and more
---

# Managing

## THORNode commands

The Makefile provide different commands to help you operate your THORNode.

There are two types of make commands, READ and WRITE.

{% hint style="info" %}
Run `make help` at any stage to get an exhaustive list of help options and how to interact with the system. See [here](https://gitlab.com/thorchain/devops/node-launcher/-/blob/master/README.md?ref_type=heads) for an overview of each command.
{% endhint %}

#### READ COMMANDS

Read commands simply read your node state and doesn't commit any transactions.

{% tabs %}
{% tab title="STATUS" %}
To get information about your node on how to connect to services or its IP, run the command below. You will also get your node address and the vault address where you will need to send your bond.

```bash
make status
```

{% endtab %}

{% tab title="SHELL" %}
Opens a shell into your `thor-daemon` deployment: From within that shell you have access to the `thorcli` command.

```bash
make shell
```

{% endtab %}

{% tab title="LOGS" %}
Display stream of logs of THORNode deployment:

```bash
make logs
```

{% endtab %}

{% tab title="MNEMONIC" %}
This will print your node mnemonic (phrase). Use this to ever rescue your node funds if something goes wrong.

_Note: Your bond is held at ransom in order to prevent you from stealing funds from this vault. Your bond will always be more valuable than funds on this vault, so you have no economic reason to touch these funds._

```bash
make mnemonic
```

{% endtab %}

{% tab title="PASSWORD" %}
A keystore file that secures your private keys is also stored on the THORNode. The password that is used to decrypt it can be printed by the following command

```bash
make password
```

{% endtab %}

{% tab title="RESTART" %}
Restart a THORNode deployment service selected:

```bash
make restart
```

{% endtab %}

{% tab title="RESET" %}
Reset a THORNode deployment service selected, including deleting the persistent volume. This command is **destructive** and will reset the chain back to 0%. You would use this for unrecoverable issues that `make restart` did not solve.

```bash
make reset
```

{% endtab %}
{% endtabs %}

#### WRITE COMMANDS

Write commands actually build and write transactions into the underlying statechain. They cost RUNE from your bond, currently 0.02, but you can check this on the `/constants` endpoint "CLICOSTINRUNE". This will post state in the chain which will be now updated globally. The RUNE fee is to prevent DDoS attacks.

{% tabs %}
{% tab title="NODE-KEYS" %}
Send a `set-node-keys` to your node, which will set your node keys automatically for you by retrieving them directly from the `thor-daemon` deployment.

```bash
make set-node-keys
```

{% endtab %}

{% tab title="IP ADDDRESS" %}
Send a `set-ip-address` to your node, which will set your node ip address automatically for you by retrieving the load balancer deployed directly.

```bash
make set-ip-address
```

{% endtab %}

{% tab title="VERSION" %}
In order to update your THORNode to a new version, you will need to update the docker tag image used in your deployments. Depending on your choice of deployment this can be done differently.

For Kubernetes deployments, you can edit the deployments of the different services you want to update using the commands below.

To update your `thor-daemon`, `thor-api` and `bifrost` deployment images to version 0.2.0:

```bash
kubectl set image deployment/thor-daemon thor-daemon=registry.gitlab.com/thorchain/thornode:mainnet-0.2.0
kubectl set image deployment/thor-api thor-api=registry.gitlab.com/thorchain/thornode:mainnet-0.2.0
kubectl set image deployment/bifrost bifrost=registry.gitlab.com/thorchain/thornode:mainnet-0.2.0
```

To update your \`midgard\` deployment image to version 0.2.0

```bash
kubectl set image deployment/midgard midgard=registry.gitlab.com/thorchain/midgard:mainnet-0.2.0
```

You can then follow the deployments restarting status either by checking your Kubernetes dashboard or using the CLI command below:

```bash
kubectl get deployment/thor-daemon
```

Once the deployments are all in the ready state again, you need to broadcast to the network that you are running a new version using the command below:

```bash
make set-version
```

{% endtab %}
{% endtabs %}

## Tools

Note, all of these should already be installed from `make tools`. However you can install them separately useing the DEPLOY tabs below.

To access the tools, navigate to the ACCESS tabs below.

All of these commands are to be run from `node-launcher`

### LOGS MANAGEMENT (LOKI)

It is recommended to deploy a logs management ingestor stack within Kubernetes to redirect all logs within a database to keep history over time as Kubernetes automatically rotates logs after a while to avoid filling the disks. The default stack used within this repository is Loki, created by Grafana and open source. To access the logs you can then use the Grafana admin interface that was deployed through the Prometheus command.

{% tabs %}
{% tab title="DEPLOY" %}
You can deploy the log management automatically using the command below:

```bash
make install-loki
```

This command will deploy the Loki chart. It can take a while to deploy all the services, usually up to 5 minutes depending on resources running your kubernetes cluster.

You can check the services being deployed in your kubernetes namespace `loki-system`.
{% endtab %}

{% tab title="ACCESS" %}
**Access Grafana**

See previous section to access the Grafana admin interface through the command `make grafana`.

**Browse Logs**

Within the Grafana admin interface, to access the logs, find the `Explore` view from the left menu sidebar. Once in the `Explore` view, select Loki as the source, then select the service you want to show the logs by creating a query. The easiest way is to open the "Log browser" menu, then select the "job" label and then as value, select the service you want. For example you can select `thornode/bifrost` to show the logs of the Bifrost service within the default `thornode` namespace when deploying a mainnet validator THORNode.

![](<../.gitbook/assets/image (11) (1).png>)

![](<../.gitbook/assets/image (37) (1).png>)

![](<../.gitbook/assets/image (36) (1).png>)

![](<../.gitbook/assets/image (33) (1).png>)
{% endtab %}

{% tab title="DESTROY" %}
Destroy Loki logs management stack

```bash
make destroy-loki
```

{% endtab %}
{% endtabs %}

### METRICS MANAGEMENT (Prometheus)

It is also recommended to deploy a Prometheus stack to monitor your cluster and your running services.

{% tabs %}
{% tab title="DEPLOY" %}
You can deploy the metrics management automatically using the command below:

```bash
make install-metrics
```

This command will deploy the prometheus chart. It can take a while to deploy all the services, usually up to 5 minutes depending on resources running your kubernetes cluster.

You can check the services being deployed in your kubernetes namespace `prometheus-system`.
{% endtab %}

{% tab title="ACCESS" %}
We have created a make command to automate this task to access Grafana from your local workstation:

```bash
make grafana
```

Open [http://localhost:3000](http://localhost:3000/) in your browser.

Login as the `admin` user. The default password should have been displayed in the previous command (`make grafana`).

![](<../.gitbook/assets/image (22) (1).png>)

**Access Prometheus admin UI**

We have created a make command to automate this task to access Prometheus from your local workstation:

```bash
make prometheus
```

Open [http://localhost:9090](http://localhost:9090/) in your browser.
{% endtab %}
{% endtabs %}

As part of the tools command deployment, you also have deployed a Prometheus stack in addition to the Elasticsearch in your Kubernetes cluster. All CPU, memory, disk space, and THORNode / THORChain custom metrics are automatically being sent to the Prometheus database backend deployed in your cluster.

You should have available different dashboards to see the metrics across your cluster by nodes, deployments, etc, and also a specific **`THORNode / THORChain`** dashboard to see the THORChain status, with current block height, how many validators are currently active and other chain related information.

{% hint style="info" %}
Click the 🔍 SEARCH ICON to find the list of dashboards
{% endhint %}

![Example of Grafana Dashboard](<../.gitbook/assets/image (9) (3).png>)

For a more in-depth introduction of Grafana, please[ follow the documentation here](https://grafana.com/docs/grafana/latest/getting-started/what-is-grafana/)**.**

## Kubernetes Dashboard

You can also deploy the Kubernetes dashboard to monitor your cluster resources.

{% tabs %}
{% tab title="DEPLOY" %}

```bash
make install-dashboard
```

This command will deploy the Kubernetes dashboard chart. It can take a while to deploy all the services, usually up to 5 minutes depending on resources running your kubernetes cluster.
{% endtab %}

{% tab title="ACCESS" %}
We have created a make command to automate this task to access the Dashboard from your local workstation:

```bash
make dashboard
```

Open [http://localhost:8000](http://localhost:8000/) in your browser.
{% endtab %}
{% endtabs %}

View your kubernetes dashboard by running the following:

```bash
make dashboard
```

![Kubernetes Dashboard](<../.gitbook/assets/image (14) (1).png>)

## Backing up a THORNode

You should backup your THORNode in case of failures. By default, if you are using the Kubernetes deployments solution, all the deployments are automatically backed up by persistent volume disks.\
Depending on your provider, the volumes are usually available in the provider administration UI, for example in AWS, you can find those volumes in your regular console, in the region you chose to deploy your Kubernetes cluster.

Again by default, with Kubernetes, by using persistent volumes used in the default configuration, you are already protected again restart failures at container level, or node failures. As long as you don’t specifically use the destroy commands from the Makefile or manually delete your Kubernetes deployments, your volumes will NOT be deleted at any time.

It is still recommended, as any project, to have different backups on top of those volumes to make sure you can recover in admin error deleting those volumes or other Kubernetes resources that would imply deleting those volumes.

Also see the Create and Validator Backup guide.

{% embed url="https://gitlab.com/thorchain/devops/node-launcher/-/blob/master/docs/Restore-Validator-Backup.md" %}

For AWS, you can easily setup in your console to have snapshots of your cluster volumes be taken every day. For other provider there can be different ways to achieve this as well either manually or automatically.

It is up to the node operator to setup those extra backups of the core volumes to be able to recover in any kind of failures or human errors.

Some volumes would be more critical than others, for example Midgard deployment are also by default backed up by persistent volumes, so it can recover in case of container restarts, failures or node failures and the deployment being automatically scheduled to a different node, but if you were to delete the Midgard volume, it would reconstruct its data from your THORNode API and events from scratch. For that specific service having extra backups might not be critical, at the time of the writing of that document, Midgard implementation might change in the future.

At minimum you should also securely backup your node keys: `node_key.json` and `priv_validator_key.json`. Do this as follows:

```bash
kubectl get pods -n thornode
```

Copy the thornode pod name, e.g. `thornode-abcdefg-hijkl` and replace with `{thornode pod name}` below:

```bash
kubectl cp thornode/{thornode pod name}:root/.thornode/config/node_key.json node_key.json

kubectl cp thornode/{thornode pod name}:root/.thornode/config/priv_validator_key.json priv_validator_key.json
```

For full disaster recovery (complete loss of cluster), it is possible to issue LEAVE command from the original BOND wallet. See [Leaving](https://docs.thorchain.org/thornodes/leaving) for detailed procedures.

## Node Security

The following are attack vectors:

1. If anyone accesses your cloud credentials, they can log in and steal your funds
2. If anyone accesses the device you used to log into kubernetes, they can log in and steal your funds
3. If anyone accesses your hardware device used to bond, they can sign a LEAVE transaction and steal your bond once it is returned
4. If anyone has access to your node's private keys through logs or configuration files, they can steal your funds
5. If any GitLab repo is compromised and you `git pull` any nefarius code into your node and run `make <any command>`, you can lose all your funds.

#### Checking diffs

Prior to `git pull` or `make pull` updates, review node-launcher repo diffs:

```bash
git fetch
git diff master..origin/master
```

Regularly review patches in GitLab: [https://gitlab.com/thorchain/devops/node-launcher/-/commits/multichain](https://gitlab.com/thorchain/devops/node-launcher/-/commits/multichain)

When chain clients have updated tags (version number or sha256), inspect the GitLab diffs for the relevant image in [https://gitlab.com/thorchain/devops](https://gitlab.com/thorchain/devops) and ensure the CI build checksum matches the expected. This ensures you are executing code on your node that you are satisfied is free from exploits. Some images such as Ethereum use the 'official' docker image, e.g. [https://hub.docker.com/r/ethereum/client-go/tags](https://hub.docker.com/r/ethereum/client-go/tags).

{% hint style="danger" %}
**RUNNING A NODE IS SERIOUS BUSINESS**

DO SO AT YOUR OWN RISK, YOU CAN LOSE A SIGNIFICANT QUANTITY OF FUNDS IF AN ERROR IS MADE

THORNODE SOFTWARE IS PROVIDED AS IS - YOU ARE SOLELY RESPONSIBLE FOR USING IT

YOU ARE RESPONSIBLE FOR THE CODE RUNNING ON YOUR NODE. **YOU ARE** THE NETWORK. INSPECT ALL CODE YOU EXECUTE.
{% endhint %}

When running a node, it is quite common to get slashed. The network relies on slash points to rate node quality. When your node is slashed, the first thing you need to do is run `make status`, and make sure all your chains are 100% in sync. If any of the external chains are not 100% in sync, then it will cause node to be slashed due to missing observations.

The best prevention is to have a cluster with lots of fast resources (cpu, memory, IO, network) and good backups/redundancy to prevent downtime.

Unfortunately even when your node is fully in-sync, it is still possible to be slashed due to external chain events.

#### Constantly accumulating slash points

**Problem:** Sometimes bifrost fails to forward observations to thornode, due to an account number / sequence number mismatch. Here is what you need to check:

1. run `make logs` , and choose `bifrost`
2. Search your bifrost logs for `{"level":"error","service":"bifrost","module":"observer","error":"fail to send the tx to thorchain: fail to broadcast to THORChain,code:32, log:account sequence mismatch, expected 26806, got 26807: incorrect account sequence","time":"2021-05-30T07:28:18Z","message":"fail to send to THORChain"}` 3. **Solution:** `make restart` and choose `bifrost`

---
description: Accessing Logs, Metrics and more
---

# Managing

## THORNode commands

The Makefile provide different commands to help you operate your THORNode.

There are two types of make commands, READ and WRITE.

{% hint style="info" %}
Run `make help` at any stage to get an exhaustive list of help options and how to interact with the system.
{% endhint %}

#### READ COMMANDS

Read commands simply read your node state and doesn't commit any transactions.

{% tabs %}
{% tab title="STATUS" %}
To get information about your node on how to connect to services or its IP, run the command below. You will also get your node address and the vault address where you will need to send your bond.

```
make status
```
{% endtab %}

{% tab title="SHELL" %}
Opens a shell into your `thor-daemon` deployment: From within that shell you have access to the `thorcli` command.

```
make shell
```
{% endtab %}

{% tab title="LOGS" %}
Display stream of logs of THORNode deployment:

```
make logs
```
{% endtab %}

{% tab title="MNEMONIC" %}
This will print your node mnemonic (phrase). Use this to ever rescue your node funds if something goes wrong.

_Note: This phrase should only be used "in anger". This is your node "hot vault", also referred to as its yggdrasil vault, which allows the network to delegate swaps for faster execution. You will be slashed significantly if any funds are moved from this vault, since it is monitored by the THORChain network. Your bond is held at ransom in order to prevent you from stealing funds from this vault. Your bond will always be more valuable than funds on this vault, so you have no economic reason to touch these funds._

```
make mnemonic
```
{% endtab %}

{% tab title="PASSWORD" %}
A keystore file that secures your private keys is also stored on the THORNode. The password that is used to decrypt it can be printed by the following command

```
make password
```
{% endtab %}

{% tab title="RESTART" %}
Restart a THORNode deployment service selected:

```
make restart
```
{% endtab %}

{% tab title="RESET" %}
Reset a THORNode deployment service selected, including deleting the persistent volume. This command is **destructive** and will reset the chain back to 0%. You would use this for unrecoverable issues that `make restart` did not solve.

```
make reset
```
{% endtab %}
{% endtabs %}

#### WRITE COMMANDS

Write commands actually build and write transactions into the underlying statechain. They cost RUNE from your bond, currently 0.02, but you can check this on the `/constants` endpoint "CLICOSTINRUNE". This will post state in the chain which will be now updated globally. The RUNE fee is to prevent DDoS attacks.

{% tabs %}
{% tab title="NODE-KEYS" %}
Send a `set-node-keys` to your node, which will set your node keys automatically for you by retrieving them directly from the `thor-daemon` deployment.

```
make set-node-keys
```
{% endtab %}

{% tab title="IP ADDDRESS" %}
Send a `set-ip-address` to your node, which will set your node ip address automatically for you by retrieving the load balancer deployed directly.

```
make set-ip-address
```
{% endtab %}

{% tab title="VERSION" %}
In order to update your THORNode to a new version, you will need to update the docker tag image used in your deployments. Depending on your choice of deployment this can be done differently.

For Kubernetes deployments, you can edit the deployments of the different services you want to update using the commands below.

To update your `thor-daemon`, `thor-api` and `bifrost` deployment images to version 0.2.0:

```
kubectl set image deployment/thor-daemon thor-daemon=registry.gitlab.com/thorchain/thornode:mainnet-0.2.0
kubectl set image deployment/thor-api thor-api=registry.gitlab.com/thorchain/thornode:mainnet-0.2.0
kubectl set image deployment/bifrost bifrost=registry.gitlab.com/thorchain/thornode:mainnet-0.2.0
```

To update your \`midgard\` deployment image to version 0.2.0

```
kubectl set image deployment/midgard midgard=registry.gitlab.com/thorchain/midgard:mainnet-0.2.0
```

You can then follow the deployments restarting status either by checking your Kubernetes dashboard or using the CLI command below:

```
kubectl get deployment/thor-daemon
```

Once the deployments are all in the ready state again, you need to broadcast to the network that you are running a new version using the command below:

```
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

```
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

```
make destroy-loki
```
{% endtab %}
{% endtabs %}

### METRICS MANAGEMENT (Prometheus)

It is also recommended to deploy a Prometheus stack to monitor your cluster and your running services.

{% tabs %}
{% tab title="DEPLOY" %}
You can deploy the metrics management automatically using the command below:

```
make install-metrics
```

This command will deploy the prometheus chart. It can take a while to deploy all the services, usually up to 5 minutes depending on resources running your kubernetes cluster.

You can check the services being deployed in your kubernetes namespace `prometheus-system`.
{% endtab %}

{% tab title="ACCESS" %}
We have created a make command to automate this task to access Grafana from your local workstation:

```
make grafana
```

Open [http://localhost:3000](http://localhost:3000/) in your browser.

Login as the `admin` user. The default password should have been displayed in the previous command (`make grafana`).

![](<../.gitbook/assets/image (22) (1).png>)

**Access Prometheus admin UI**

We have created a make command to automate this task to access Prometheus from your local workstation:

```
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
```
make install-dashboard
```

This command will deploy the Kubernetes dashboard chart. It can take a while to deploy all the services, usually up to 5 minutes depending on resources running your kubernetes cluster.
{% endtab %}

{% tab title="ACCESS" %}
We have created a make command to automate this task to access the Dashboard from your local workstation:

```
make dashboard
```

Open [http://localhost:8000](http://localhost:8000/) in your browser.
{% endtab %}
{% endtabs %}

View your kubernetes dashboard by running the following:

```
make dashboard
```

![Kubernetes Dashboard](<../.gitbook/assets/image (14) (1).png>)

## Backing up a THORNode

You should backup your THORNode in case of failures. By default, if you are using the Kubernetes deployments solution, all the the deployments are automatically backed up by persistent volume disks.\
Depending on your provider, the volumes are usually available in the provider administration UI, for example in AWS, you can find those volumes in your regular console, in the region you chose to deploy your Kubernetes cluster.

Again by default, with Kubernetes, by using persistent volumes used in the default configuration, you are already protected again restart failures at container level, or node failures. As long as you don’t specifically use the destroy commands from the Makefile or manually delete your Kubernetes deployments, your volumes will NOT be deleted at any time.

It is still recommended, as any project, to have different backups on top of those volumes to make sure you can recover in admin error deleting those volumes or other Kubernetes resources that would imply deleting those volumes.

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

For full disaster recovery (complete loss of cluster), it is possible to issue LEAVE command from the original BOND wallet and manual return of funds from your Yggdrasil. In this case you need a secure backup of `make mnemonic` (Yggdrasil mnemonic) and a working wallet that did the original BOND. See [Leaving](https://docs.thorchain.org/thornodes/leaving).

## Node Security

The following are attack vectors:

1. If anyone accesses your cloud credentials, they can log in and steal your funds
2. If anyone accesses the device you used to log into kubernetes, they can log in and steal your funds
3. If anyone accesses your hardware device used to bond, they can sign a LEAVE transaction and steal your bond once it is returned
4. If anyone has your Yggdrasil `make mnemonic` phrase, including in logs, they can steal your funds
5. If any GitLab repo is compromised and you `git pull` any nefarius code into your node and run `make <any command>`, you can lose all your funds.

#### Checking diffs

Prior to `git pull` or `make pull` updates, review node-launcher repo diffs:

``` bash
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

### Finding Yggdrasil addresses

To find your Yggdrasil addresses, firstly navigate to [https://runescan.io/vaults](https://runescan.io/vaults)

![](<../.gitbook/assets/yggdrasil\_vaults (1).png>)

1. Find your node address and click on the link.

![](<../.gitbook/assets/yggdrasil\_vault (1).png>)

Alternatively, visit any thorchain endpoint using your node address from `make status`:

``` text
http://thornode.ninerealms.com/thorchain/node/<Node Address>
```

Copy your `secp256k1` public key and put it here:

``` text
http://thornode.ninerealms.com/thorchain/vault/<Public Key>
```

And look for `addresses` array at the bottom.

#### Finding Yggdrasil Private Key

1. Run `make mnemonic` and securely store this.
2. Visit [https://iancoleman.io/bip39/](https://iancoleman.io/bip39/) - or for more safety, clone the [GitHub repo](https://github.com/iancoleman/bip39) and open `src/index.html` offline.
3. Paste in your mnemonic and choose **RUNE - THORChain** from the drop-down list.
4. Your private key string is the first one: `m/44'/931'/0'/0/0`

![](<../.gitbook/assets/bip39 (1).png>)

## Dealing with slash

When running a node, it is quite common to get slashed. The network relies on slash points to rate node quality. When your node is slashed, the first thing you need to do is run `make status`, and make sure all your chains are 100% in sync. If any of the external chains are not 100% in sync, then it will cause node to be slashed due to missing observations.

The best prevention is to have a cluster with lots of fast resources (cpu, memory, IO, network) and good backups/redundancy to prevent downtime.

Unfortunately even when your node is fully in-sync, it is still possible to be slashed due to external chain events. Here are some of the scenarios:

### 600 point slash (isolated)

When a node is slashed 600 points, it is typically because the yggdrasil vault failed to send an outbound transaction (more accurately: the transaction it was tasked to perform wasn't mined within a specified time limit). This most likely to happen on ETH chain. Here is what you need to check:

1. Find your Yggdrasil ETH address. Use the previous instructions.
2. Visit [https://etherscan.io/](https://etherscan.io/) and paste in your Yggdrasil ETH address.

**Potential problem 1:** Transaction ran out of Gas (wrong estimate):

**Cause:** The network uses `geth` inbuilt `eth_estimateGas` function to estimate how much gas to set as limit for a transaction. On rare occasions this can return a number too low causing the transaction to fail. In this case there is nothing you can do - just wait it out. Note: your Yggdrasil ETH vault is now insolvent by a small amount of gas burned in the failed transaction that you will need to personally top-up prior to LEAVE. See section on LEAVE for more details.

![](<../.gitbook/assets/eth\_out\_of\_gas (1).png>)

**Potential problem 2:** Transaction didn't mine after 15mins

**Cause:** External unexpected Gas price hike. The network uses a 1.5x the previous N blocks as the gas rate to use. If there is a sudden increase in Gas price required due to unforseen external events, the transaction may not be mined. In order to make sure customer is paid in a reasonable time, there is a auto cancel transaction process build in bifrost. The network will keep monitoring the outbound transactions and if any of the outbound transaction signed out by yggdrasil vault didn't commit after 15 minutes, it will automatically cancel it and assign to another node to send.

You should be able to see a transaction like the following, which is sending `0` ETH back to itself which cancels anything pending:

![](<../.gitbook/assets/eth\_cancel\_nonce (1).png>)

#### 600 point slash (repeated)

If your node is slashed 600 points continuously, it is likely your ETH vault is stuck or transactions sent to your local geth aren't propagated fully into mempools used by miners. This might happen if your local ethereum-daemon doesn't sync well with the network, even though it reports 100% in sync.

1. Run `make logs` and choose `bifrost`
2. Search your logs for `cancel` and look for transactions such as:

```json
{"level":"info","service":"bifrost","module":"ethereum","time":"2021-05-28T14:43:58Z","message":"broadcast cancel transaction , tx hash: 0xec396286e54f9a95081e60424c73fcc0e580c47d2ffacb216ad9ef2d9c787082, nonce: 25 , new tx hash:0x5823abbee421f4c2ce230f5e7808b4dc6728ebeb5e21b62d95b812144d522672"}
```

1. Find the last cancel tx in the logs (with the highest nonce).
2. Search etherscan for the `new tx hash` transaction ID.
3. Your geth is stuck and out of sync if etherscan does **NOT** find the `new tx hash` cancelled transaction. If you do _not_ find your tx in etherscan - proceed as follows:
4. Find the **lowest** nonce from Etherscan:
5. Go to [https://etherscan.io](https://etherscan.io) and paste your yggdrasil ETH address in the search box
6. Find the last successful transaction send out from your yggdrasil ETH address. It is the top transaction in the list:

![](<../.gitbook/assets/etherscan\_tx\_list (1).png>)

* Click the transaction. Note the nonce used in the last good transaction (e.g. `39`), and then plus 1 (e.g. `40`). This is the **lowest stuck tx nonce**.

![](<../.gitbook/assets/etherscan\_tx\_nonce (1).png>)

1. Find the **highest** stuck nonce from your local geth:
2. `make shell` then choose `ethereum-daemon`
3. `geth attach`
4. `eth.getTransactionCount('{YOUR YGGDRASIL ETH ADDRESS}','pending')` -- this is the **highest stuck tx nonce**
5. `exit` and `exit` again.
6. If the highest nonce is larger than your lowest nonce, it means there are a few transactions sent and stuck in the mempool of your local ETH daemon. You need to unstuck these from highest to lowest.
7. Make a fork of [https://replit.com/@thorchain/YggCancelETH](https://replit.com/@thorchain/YggCancelETH)
8. Update `index.js` `lastPendingNonce` and `firstStuckNonce`. Also put in your hex encoded private key to KEY variable. Remember to add the `0x` prefix which bip39 calculator above will not have.
9. Update `gasPrice` to a very high gas price. The price should be higher than all the transactions stuck in the mempool. Recommend to spend more than 200 Gwei or double the highest from [https://thornode.ninerealms.com/thorchain/inbound\_addresses](https://thornode.ninerealms.com/thorchain/inbound\_addresses) (which ever is higher).
10. Run the script using `node index.js`. Note: you may need to install some dependecies first with `npm install ethers`. The output should look like:

    ``` bash
    0x2aefdf705d1b28dfdf6b524ec697082326b23a2e62b7f25a60c1d2a1a9108243
    CANCELLING 39 for 0x3eb68bF15A7A6769219A66C5c493fa7C40511E19
    0x1cc81e968d68cfddcd8b605591b9ac7955ec7fdabf222678d3bcfaea4d7c4fd0
    CANCELLING 38 for 0x3eb68bF15A7A6769219A66C5c493fa7C40511E19
    0xc0a15e2ec9c92300aae3924c26a26d64f964b2c2aba8d445fea9e54bf734e58a
    CANCELLING 37 for 0x3eb68bF15A7A6769219A66C5c493fa7C40511E19
    0x1d6311b0fb33717091ec4e86282f445216068a9e13d48748906a6abf375a8392
    CANCELLING 36 for 0x3eb68bF15A7A6769219A66C5c493fa7C40511E19
    0xf1ed11a1172937ed37514ba9d4d315806e1c8f49a075dde7e0c0239eed30853e
    CANCELLING 35 for 0x3eb68bF15A7A6769219A66C5c493fa7C40511E19
    0xfd73ab1c15a18edc13aa9a192d85c369b4ba02fa72aa04e836fd8e9d41b5159c
    CANCELLING 34 for 0x3eb68bF15A7A6769219A66C5c493fa7C40511E19
    0x45fd4c88168e9ce86716a45f1f0ea25b233a4affa90b866023b2ca7d25f57367
    CANCELLING 33 for 0x3eb68bF15A7A6769219A66C5c493fa7C40511E19
    0xd2d283479386156b9c9441dd4630b25af42d5842b910c3aaa95e28e7bc499be2
    CANCELLING 32 for 0x3eb68bF15A7A6769219A66C5c493fa7C40511E19
    0x2d37f455c9066c2d8c8f5ae2f62a720123677707047f8a4e3ee61bb1c261015e
    CANCELLING 31 for 0x3eb68bF15A7A6769219A66C5c493fa7C40511E19
    0xdce9df663b7c35eb7aefc52d5640b710e2af38979615ce7686729d37dd0da5a8
    CANCELLING 30 for 0x3eb68bF15A7A6769219A66C5c493fa7C40511E19
    0xccdd1b9d8e6ac0c7314fa39f78442c7702688db56091e8d379da75a3cfbce936
    CANCELLING 29 for 0x3eb68bF15A7A6769219A66C5c493fa7C40511E19
    0x43bad098782f7bac68e401390ef300dc97d9d1d1b322eb566de1ff06b2cf9b21
    ```

11. `make restart` and choose `ethereum-daemon`

#### Constantly accumulating slash points

**Problem:** Sometimes bifrost fails to forward observations to thornode, due to an account number / sequence number mismatch. Here is what you need to check:

1. run `make logs` , and choose `bifrost`
2. Search your bifrost logs for `{"level":"error","service":"bifrost","module":"observer","error":"fail to send the tx to thorchain: fail to broadcast to THORChain,code:32, log:account sequence mismatch, expected 26806, got 26807: incorrect account sequence","time":"2021-05-30T07:28:18Z","message":"fail to send to THORChain"}` 3. **Solution:** `make restart` and choose `bifrost`

---
description: 'Accessing Logs, Metrics and more'
---

# Managing

## **Access Logs**

To access the logs of the THORNode services running, you can either use directly Kubernetes commands to get logs from different deployments, for example, to get the logs of the service `thor-daemon`:

```text
kubectl logs -f deploy/thor-daemon -n thornode
```

For a reminder on Kubernetes commands, please[ visit this page](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)**.** 

Or you can use the Elasticsearch stack installed with the tools command, and access the Kibana dashboard using the command:

```text
make kibana
```

From there, you will need to create a new index to get the logs coming from Filebeat. You can search using the regular “Discover” app in Kibana to go through your logs using a filter to get only specific services or keywords, etc.

You can follow a more in-depth [introduction to Kibana here](https://www.elastic.co/guide/en/kibana/current/introduction.html)**.**

![Overview of Kibana Logs](../.gitbook/assets/image%20%2812%29.png)

## **Access Metrics**

As part of the tools command deployment, you also have deployed a Prometheus stack in addition to the Elasticsearch in your Kubernetes cluster.

All CPU, memory, disk space, and THORNode / THORChain custom metrics are automatically being sent to the Prometheus database backend deployed in your cluster.

You can access different dashboards and metrics tools using Grafana as administration UI. You can access Grafana using the command below:

```text
make grafana
```

You should have available different dashboards to see the metrics across your cluster by nodes, deployments, etc, and also a specific \`THORNode / THORChain\` dashboard to see the THORChain status, with current block height, how many validators are currently active and other chain related information.  
****

![Example of Grafana Dashboard](../.gitbook/assets/image.png)

For a more in-depth introduction of Grafana, please[ follow the documentation here](https://grafana.com/docs/grafana/latest/getting-started/what-is-grafana/)**.**

## **Kubernetes Dashboard**

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
  


## Banning a THORNode

Occasionally a THORNode may go rogue, which affects a system that requires extremely high uptime. During testing it was found to be necessary to add a feature to force the protocol to specifically target a single node to be churned out. Thus node operators have the ability to ban another THORNode by voting and getting a ⅔ consensus. 

Caution, the command costs 0.1% of minimum bond, so there is a non-zero cost to banning a node. The funds are collected and paid back into the Reserve. You can use the command below to do so:

```text
thorcli tx thorchain ban <node-address>
```

Once 67% of Nodes ban the node, it is scheduled to be churned out, but it is not penalised as a result of this. This is another reason for staying anonymous as a Node Operator. 


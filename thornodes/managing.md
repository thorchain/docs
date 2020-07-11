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


---
description: Deploying a THORNode with Kubernetes
---

# Deploy - Kubernetes

## **Deploy a Kubernetes cluster**

In order to deploy all the different services and provide a high availability environment to operate your node, Kubernetes is the preferred scheduling platform. Any production-grade Kubernetes cluster can be used to run and deploy a THORNode. You need your Kubernetes provider to offer external load balancers services type features. AWS, Azure, Digital Ocean, GCE, OpenStack are compatible with external load balancers.

{% hint style="info" %}
Terraform is a type of domain-specific language \(DSL\) used to describe through code infrastructure. It designed to make it easier to create/destroy infrastructure hosted locally or by a provider such as AWS or others.
{% endhint %}

Currently, only an AWS provider is available \(more will be added soon\). This Terraform deployment will deploy a Kubernetes cluster using your AWS credentials and EKS service. The cluster will have autoscaling capabilities, which means you don’t have to deal with how many nodes you need to deploy to run your THORNode services.

All the default configurations used in these instructions are for a production environment with enough resources to run your THORNode in good conditions.

## Steps

There are three important steps to getting your node set up, deployed and churned in. 

1. [Setting up Cluster](setup.md)
2. [Deploying THORNode Services](deploying.md)
3. [Joining \("Churning In"\)](../joining.md)

### Repository Management

Your repository should be organised as follows:

```text
-/thornode
       |-/cluster-launcher
       |-/node-launcher
```

All of your set up commands are run in `cluster-launcher` and all of your deploying/joining/managing/leaving commands are run from `node-launcher`


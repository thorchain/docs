---
description: Deploying a THORNode with Kubernetes
---

# Deploy - Kubernetes

## **Deploy a Kubernetes cluster**

In order to deploy all the different services and provide a high availability environment to operate your node, the team chose to use Kubernetes as the scheduling platform. Any production-grade Kubernetes cluster can be used to run and deploy a THORNode. You need your Kubernetes provider to offer external load balancers services type features. AWS, Azure, Digital Ocean, GCE, OpenStack to name a few, are compatible with external load balancers.

The team also provides a simple way to deploy a Kubernetes cluster using Terraform in AWS at the time of this writing and other providers will be added soon. 

{% hint style="info" %}
Terraform is a type of domain-specific language \(DSL\) used to describe through code infrastructure. It designed to make it easier to create/destroy infrastructure hosted locally or by a provider such as AWS or others.
{% endhint %}

Currently, the team only provide an AWS provider \(more will be added soon\). This Terraform deployment will deploy a Kubernetes cluster using your AWS credentials and EKS service. The cluster will have autoscaling capabilities, which means you don’t have to deal with how many nodes you need to deploy to run your THORNode services.

All the default configurations used in these instructions are for a production environment with enough resources to run your THORNode in good conditions.

## Steps

There are three important steps to getting your node set up, deployed and churned in. 

1. [Setting up Cluster](setup.md)
2. [Deploying THORNode Services](deploying.md)
3. [Joining \("Churning In"\)](../joining.md)

### Repository Management

Your repository should be organised as follows:

```text
- /thornode
       |
       |-/terraform-scripts
       |-/helm-charts
```

All of your set up commands are run in `terraform-scripts` and all of your deploying/joining/managing/leaving commands are run from `helm-charts`


---
description: Deploying a THORNode with Kubernetes
---

# Deploy - Kubernetes

## **Deploy a Kubernetes cluster**

In order to deploy all the different services and provide a high availability environment to operate your node, the team chose to use Kubernetes as the scheduling platform. Any production-grade Kubernetes cluster can be used to run and deploy a THORNode. You need your Kubernetes provider to offer external load balancers services type features. AWS, Azure, Digital Ocean, GCE, OpenStack to name a few, are compatible with external load balancers.

The team also provides a simple way to deploy a Kubernetes cluster using Terraform in AWS at the time of this writing and other providers will be added soon. Terraform is a type of domain-specific language \(DSL\) used to describe through code infrastructure. It designed to make it easier to create/destroy infrastructure hosted locally or by a provider such as AWS or others.

Currently, the team only provide an AWS provider \(more will be added soon\). This Terraform deployment will deploy a Kubernetes cluster using your AWS credentials and EKS service. The cluster will have autoscaling capabilities, which means you don’t have to deal with how many nodes you need to deploy to run your THORNode services.

All the default configuration used in our instructions are for a production environment with enough resources to run your THORNode in good conditions.

### **Requirements**

Install the terraform CLI, go to[ https://www.terraform.io](https://www.terraform.io/).

The Git repository used in the instructions below can be found here:   
****[**https://gitlab.com/thorchain/devops/terraform-scripts**](https://gitlab.com/thorchain/devops/terraform-scripts/-/blob/master/docs/aws.md)



## Steps

There are two important steps to getting your Kubernetes Cluster ready.

1. Setting up Cluster
2. Deploying THORNode Services


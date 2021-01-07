---
description: Setting up a Kubernetes Cluster with Azure (AKS)
---

# Setup - Azure

## **Deploy a Kubernetes cluster in Azure using AKS service.**

### **Requirements**

1. Azure account
2. `az` and Azure credentials configured
3. `kubectl`

{% hint style="warning" %}
**LINUX/MAC is the preferred method of setup.**

**Windows should choose either:**

1. **Deploy a THORNode from a Linux VPS.**
2. **Use Windows Subsystem for Linux -** [**https://docs.microsoft.com/en-us/windows/wsl/about**](https://docs.microsoft.com/en-us/windows/wsl/about)\*\*\*\*
{% endhint %}

## **Steps**

Firstly, clone and enter the [cluster-launcher repository](https://gitlab.com/thorchain/devops/cluster-launcher)**.** All commands in this section are to be run inside this repo.

```text
git clone https://gitlab.com/thorchain/devops/cluster-launcher
cd cluster-launcher
```

Then install the [terraform CLI](https://www.terraform.io):

{% tabs %}
{% tab title="LINUX/MAC" %}
Install Terraform:

```bash
brew install terraform
```
{% endtab %}
{% endtabs %}

#### **Azure CLI**

The [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/) allows you to manage your Azure services.

{% tabs %}
{% tab title="LINUX/MAC" %}
Use the package manager [homebrew](https://formulae.brew.sh/) to install the Azure CLI.

```bash
brew install azure-cli
az login
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
You will be asked for you Personal Access Token with read/write priveleges \(retrieve from API Panel from the Azure web console.\)

**API -&gt; Tokens/Keys -&gt; Create Token.**

Make sure you handle your secrets securely!
{% endhint %}

#### Kubernetes Control Tool

You must install and configure the Kubernetes CLI tool \(**kubectl**\). **\*\*To install** kubectl\*\* , follow [these instructions](https://kubernetes.io/docs/tasks/tools/install-kubectl/), or choose a package manager based on your operating system.

{% tabs %}
{% tab title="LINUX/MAC" %}
Use the package manager [homebrew](https://formulae.brew.sh/) to install **kubectl**.

```bash
brew install kubernetes-cli
```
{% endtab %}
{% endtabs %}

#### **wget && jq**

You also need **wget** and **jq**, follow [these instructions](https://www.gnu.org/software/wget/), or choose a package manager based on your operating system.

{% tabs %}
{% tab title="LINUX/MAC" %}
Use the package manager [homebrew](https://formulae.brew.sh/) to install **wget** and **jq** _Note: You most likely have these installed already._

```bash
brew install wget
brew install jq
```
{% endtab %}
{% endtabs %}

## **Deploy Kubernetes Cluster**

Use the commands below to deploy an AKS cluster:

```bash
make azure
```

During the deploy, you will be asked to enter information about your cluster:

```bash
var.location
  The location where the Managed Kubernetes Cluster should be created

  Enter a value: eastus2

var.name
  The base name used for all resources

  Enter a value: tc-k8s
```

* Location -- `az account list-locations -o table`
* Name
* Confirm `yes`

{% hint style="info" %}
Deploying a cluster takes ~15 minutes
{% endhint %}

## CONFIGURE

Now that you've provisioned your AKS cluster, you need to configure **kubectl**. Customize the following command with your cluster name and resource group. It will get the access credentials for your cluster and automatically configure kubectl.

```bash
az aks get-credentials -a -g <resource_group> -n <cluster_name>
```

This replaces the existing configuration at ~/.kube/config.

Once done, you can check if your cluster is responding correctly by running the following commands.

```bash
kubectl version
kubectl get nodes
```

You are now ready to deploy a THORNode.


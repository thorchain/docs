---
description: Setting up a Kubernetes Cluster with Linode (LKE)
---

# Setup - Linode

## **Deploy a Kubernetes cluster in Linode using LKE service.**

### **Requirements**

1. Linode account
2. `linode-cli` and Linode credentials configured
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

#### **linode-cli**

The [linode-cli](https://github.com/linode/linode-cli#installation) allows you to manage your linode services.

{% tabs %}
{% tab title="LINUX/MAC" %}
Use the pip package-management system to install the linode-cli.

```bash
pip install linode-cli --upgrade
linode-cli
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
You will be asked for you Personal Access Token with read/write priveleges \(retrieve from API Panel from the Linode web console.\)

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

Use the commands below to deploy an LKE cluster:

```bash
make linode
```

During the deploy, you will be asked to enter information about your cluster:

```bash
var.cluster_label
  Linode Kubernetes cluster label

  Enter a value: tc-k8s

var.region
  Linode region

  Enter a value: us-east

var.token
  Linode API token

  Enter a value:
```

* Cluster Label
* Region -- `linode-cli regions list`
* Token
* Confirm `yes`

{% hint style="info" %}
Deploying a cluster takes ~15 minutes
{% endhint %}

## CONFIGURE

Now that you've provisioned your LKE cluster, you need to configure **kubectl**. To configure authentication from the command line, use the following command, substituting the ID of your cluster.

```bash
# Store it - method #1
jq -r ".resources[].instances[].attributes.kubeconfig" linode/terraform.tfstate | base64 -D > ~/.kube/config-linode

# Store it - method #2
linode-cli lke kubeconfig-view <use_your_cluster_id> > ~/.kube/config-linode

# Merge it and set current context
KUBECONFIG=~/.kube/config:~/.kube/config-linode kubectl config view --flatten > ~/.kube/tmpcfg && mv -f ~/.kube/tmpcfg ~/.kube/config && kubectl config use-context $(kubectl config current-context --kubeconfig=~/.kube/config-linode)

# Or just view it - method #1
jq -r ".resources[].instances[].attributes.kubeconfig" linode/terraform.tfstate | base64 -D
# Or just view it - method #2
linode-cli lke kubeconfig-view <use_your_cluster_id>
```

{% hint style="info" %}
If the above `linode-cli` command is broken you can download the file from the web [dashboard](https://cloud.linode.com/kubernetes/clusters) for the respective cluster.
{% endhint %}

This replaces the existing configuration at ~/.kube/config.

Once done, you can check if your cluster is responding correctly by running the following commands.

```bash
kubectl version
kubectl get nodes
```

You are now ready to deploy a THORNode.


---
description: Setting up a Kubernetes Cluster with Digital Ocean (DO)
---

# Setup - Digital Ocean

## **Deploy a Kubernetes cluster in DO using EKS service.**

### **Requirements**

1. DO account
2. `doctl` and DO credentials configured
3. `kubectl`
4. `wget` \(required for EKS module\)

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

```text
brew install terraform
```
{% endtab %}
{% endtabs %}

#### **DOCLI**

The [Digital Ocean Control tool](https://www.digitalocean.com/docs/apis-clis/doctl/how-to/install/) allows you to manage your DO services.

{% tabs %}
{% tab title="LINUX/MAC" %}
Use the package manager [homebrew](https://formulae.brew.sh/) to install the DO CTL.

```text
brew install doctl
doctl auth init --context <NAME>
doctl auth switch --context <NAME>
doctl account get
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
You will be asked for you Personal Access Token with read/write priveleges \(retrieve from API Panel from the Digital Ocean web console.\)

**API -&gt; Tokens/Keys -&gt; Create Token.**

Make sure you handle your secrets securely!
{% endhint %}

#### Kubernetes Control Tool

You must install and configure the Kubernetes CLI tool \(**kubectl**\). **\*\*To install** kubectl\*\* , follow [these instructions](https://kubernetes.io/docs/tasks/tools/install-kubectl/), or choose a package manager based on your operating system.

{% tabs %}
{% tab title="LINUX/MAC" %}
Use the package manager [homebrew](https://formulae.brew.sh/) to install **kubectl**.

```text
brew install kubernetes-cli
```
{% endtab %}
{% endtabs %}

#### **wget && jq**

You also need **wget** and **jq**, follow [these instructions](https://www.gnu.org/software/wget/), or choose a package manager based on your operating system.

{% tabs %}
{% tab title="LINUX/MAC" %}
Use the package manager [homebrew](https://formulae.brew.sh/) to install **wget** and **jq** _Note: You most likely have these installed already._

```text
brew install wget
brew install jq
```
{% endtab %}
{% endtabs %}

## **Deploy Kubernetes Cluster**

Use the commands below to deploy a DO EKS cluster:

```text
make do
```

During the deploy, you will be asked to enter information about your cluster:

![](../../.gitbook/assets/image%20%2820%29.png)

* Name
* DO Region -- see valid [List of Regions](https://www.digitalocean.com/docs/platform/availability-matrix/#other-product-availability) \(use lower-case\)
* Confirm `yes`

![Kubernetes Availability \(note, use lower-case in the terminal\)](../../.gitbook/assets/image%20%2830%29.png)

Final success message: `Apply complete! Resources: 2 added, 0 changed, 0 destroyed.`

{% hint style="info" %}
Deploying a cluster takes ~10 minutes
{% endhint %}

## CONFIGURE

Now that you've provisioned your EKS cluster, you need to configure **kubectl**. Customize the following command with your cluster name and region.

```text
doctl kubernetes cluster kubeconfig save <use_your_cluster_name>
kubectl version
```

If successful, you will see:

```text
Notice: Adding cluster credentials to kubeconfig file found in "/home/user/.kube/config"
Notice: Setting current-context to do-<region_name>-<cluster_name>
```

Test this configuration,

```text
$ kubectl version
Client Version: version.Info{Major:"1", Minor:"18", GitVersion:"v1.18.6", GitCommit:"dff82dc0de47299ab66c83c626e08b245ab19037", GitTreeState:"clean", BuildDate:"2020-07-16T06:30:04Z", GoVersion:"go1.14.5", Compiler:"gc", Platform:"linux/amd64"}
Server Version: version.Info{Major:"1", Minor:"18", GitVersion:"v1.18.6", GitCommit:"dff82dc0de47299ab66c83c626e08b245ab19037", GitTreeState:"clean", BuildDate:"2020-07-15T16:51:04Z", GoVersion:"go1.13.9", Compiler:"gc", Platform:"linux/amd64"}
```

To verify, run this, and check the status is "Ready":

```text
kubectl get nodes

NAME                          STATUS   ROLES    AGE     VERSION
<cluster_name>-pool-5xhc1     READY    <none>   6m      v1.18.6
```

You are now ready to deploy a THORNode.


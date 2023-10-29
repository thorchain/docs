---
description: Setting up a Kubernetes Cluster with Digital Ocean (DO)
---

# Setup - Digital Ocean

## **Deploy a Kubernetes cluster in DO using DOKS service.**

### **Requirements**

1. DO account
2. `doctl` and DO credentials configured
3. `kubectl`
4. `homebrew`

{% hint style="warning" %}
**LINUX/MAC is the preferred method of setup.**

**Windows should choose either:**

1. **Deploy a THORNode from a Linux VPS.**
2. **Use Windows Subsystem for Linux -** [**https://docs.microsoft.com/en-us/windows/wsl/about**](https://docs.microsoft.com/en-us/windows/wsl/about)
{% endhint %}

## **Steps**

Firstly, clone and enter the [cluster-launcher repository](https://gitlab.com/thorchain/devops/cluster-launcher)**.** All commands in this section are to be run inside this repo.

```
git clone https://gitlab.com/thorchain/devops/cluster-launcher
cd cluster-launcher
```

Then install the [terraform CLI](https://www.terraform.io):

{% tabs %}
{% tab title="LINUX/MAC" %}
Install Terraform:

```
brew install terraform
```
{% endtab %}
{% endtabs %}

#### **DOCTL**

The [Digital Ocean Control tool](https://www.digitalocean.com/docs/apis-clis/doctl/how-to/install/) allows you to manage your DO services.

{% tabs %}
{% tab title="LINUX/MAC" %}
Use the package manager [homebrew](https://formulae.brew.sh/) to install the `doctl`.

```
brew install doctl
doctl auth init --context <NAME>
doctl auth switch --context <NAME>
doctl account get
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
You will be asked for a Personal Access Token with read/write priveleges (retrieve from the API Panel in the Digital Ocean web console.)

**API -> Tokens/Keys -> Create Token.**

Make sure you handle your secrets securely! You will need this token twice more for setup and if you navigate away from the API web console it will not be displayed again.
{% endhint %}

#### Kubernetes Control Tool

You must install and configure the Kubernetes CLI tool (`kubectl`). **To install kubectl** , follow [these instructions](https://kubernetes.io/docs/tasks/tools/install-kubectl/), or choose a package manager based on your operating system.

{% tabs %}
{% tab title="LINUX/MAC" %}
Use the package manager [homebrew](https://formulae.brew.sh/) to install **kubectl**.

```
brew install kubernetes-cli
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
**DO Droplet Limit**

You will need to increase your Droplet Limit if you get an error like this:
```
Error: Error creating Kubernetes cluster: POST https://api.digitalocean.com/v2/kubernetes/clusters: 422 (request "8b639077-b8d3-4913-b3ec-8e70283dea49") validation error: worker_node_pool_specs[0].invalid droplet size
```
On the Digital Ocean web console (Settings > Team > Droplet Limit) you will be able to request the `Droplet Limit` be increased. 10 Droplets is the default limit, request 25 to begin with.
{% endhint %}

{% hint style="info" %}

**Check the versions of `kubectl` that are supported by DO**

```
doctl kubernetes options versions
```

Make sure that you have installed a version of `kubectl` that is supported by DO.
{% endhint %}

#### **wget && jq**

You also need **wget** and **jq**, follow [these instructions](https://www.gnu.org/software/wget/), or choose a package manager based on your operating system.

{% tabs %}
{% tab title="LINUX/MAC" %}
Use the package manager [homebrew](https://formulae.brew.sh/) to install **wget** and **jq** _Note: You most likely have these installed already._

```
brew install wget
brew install jq
```
{% endtab %}
{% endtabs %}

## **Deploy Kubernetes Cluster**

Use the commands below to deploy a DOKS cluster:

```
make do
```

During the deploy, you will be asked to enter information about your cluster:

![](<../../.gitbook/assets/image (20) (1).png>)

* Name
* DO Region -- see valid [List of Regions](https://www.digitalocean.com/docs/platform/availability-matrix/#other-product-availability) (**use lower-case**)
* Confirm `yes`

![Kubernetes Availability (note, use lower-case in the terminal)](<../../.gitbook/assets/image (30) (1).png>)

Final success message: `Apply complete! Resources: 2 added, 0 changed, 0 destroyed.`

{% hint style="info" %}
Deploying a cluster takes \~10 minutes
{% endhint %}

## CONFIGURE

Now that you've provisioned your DOKS cluster, you need to configure **kubectl**. Customize the following command with your cluster name and region.

```
doctl kubernetes cluster kubeconfig save <use_your_cluster_name>
kubectl version
```

If successful, you will see:

```
Notice: Adding cluster credentials to kubeconfig file found in "/home/user/.kube/config"
Notice: Setting current-context to do-<region_name>-<cluster_name>
```

Test this configuration,

```
$ kubectl version
Client Version: version.Info{Major:"1", Minor:"18", GitVersion:"v1.18.6", GitCommit:"dff82dc0de47299ab66c83c626e08b245ab19037", GitTreeState:"clean", BuildDate:"2020-07-16T06:30:04Z", GoVersion:"go1.14.5", Compiler:"gc", Platform:"linux/amd64"}
Server Version: version.Info{Major:"1", Minor:"18", GitVersion:"v1.18.6", GitCommit:"dff82dc0de47299ab66c83c626e08b245ab19037", GitTreeState:"clean", BuildDate:"2020-07-15T16:51:04Z", GoVersion:"go1.13.9", Compiler:"gc", Platform:"linux/amd64"}
```

To verify, run this, and check the status is "Ready":

```
kubectl get nodes

NAME                          STATUS   ROLES    AGE     VERSION
<cluster_name>-pool-5xhc1     READY    <none>   6m      v1.18.6
```

You are now ready to deploy a THORNode.

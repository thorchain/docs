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
5. Kubernetes Terraform provider

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

The [Digital Ocean Control tool](https://www.digitalocean.com/docs/apis-clis/doctl/how-to/install/) allows you to manage your DO services. This step is optional.

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

You must install and configure the Kubernetes CLI tool \(**kubectl**\). ****To install **kubectl** , follow [these instructions](https://kubernetes.io/docs/tasks/tools/install-kubectl/), or choose a package manager based on your operating system.

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
Use the package manager [homebrew](https://formulae.brew.sh/) to install **wget** and **jq**
_Note: You most likely have these installed already._

```text
brew install wget
brew install jq
```
{% endtab %}
{% endtabs %}

####  **Kubernetes Terraform provider**

Use the command below to install Kubernetes Terraform provider, if the command is outdated or failing, please refer to the [documentation here](https://gavinbunney.github.io/terraform-provider-kubectl/docs/provider.html).

{% tabs %}
{% tab title="LINUX/MAC" %}
Run the following:

```text
mkdir -p ~/.terraform.d/plugins && \
    curl -Ls https://api.github.com/repos/gavinbunney/terraform-provider-kubectl/releases/latest \
    | jq -r ".assets[] | select(.browser_download_url | contains(\"$(uname -s | tr A-Z a-z)\")) | select(.browser_download_url | contains(\"amd64\")) | .browser_download_url" \
    | xargs -n 1 curl -Lo ~/.terraform.d/plugins/terraform-provider-kubectl && \
    chmod +x ~/.terraform.d/plugins/terraform-provider-kubectl
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

Final success message: `Apply complete! Resources: 30 added, 0 changed, 0 destroyed.`

{% hint style="info" %}
Deploying a cluster takes ~10 minutes
{% endhint %}

## CONFIGURE

Now that you've provisioned your EKS cluster, you need to configure **kubectl**. Customize the following command with your cluster name and region.

```text
aws eks --region <cluster_region> update-kubeconfig --name <cluster_name>
kubectl version
```

If successful, you will see:

 `Added new context ..... <details>`

To verify, run this, and check the status is "Ready":

```text
kubectl get nodes

NAME                          STATUS   ROLES    AGE     VERSION
ip-10-0-49-192.ec2.internal   Ready    <none>   4m16s   v1.16.12-eks-904af05
```

You are now ready to deploy a THORNode.


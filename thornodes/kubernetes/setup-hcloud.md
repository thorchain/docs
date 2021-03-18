---
description: Setting up a Kubernetes Cluster with Hetzner Cloud (hcloud)
---

# Setup - Hetzner Cloud

## **Deploy an umnanaged Kubernetes cluster in hcloud**

{% hint style="warning" %}
This approach is only recommended for experienced operators because the kubernetes control plane among other things needs to be managed manually.
{% endhint %}

### **Requirements**

1. hcloud account
2. `hcloud` and hcloud credentials configured
3. `kubectl`
4. `ansible`

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

#### **hcloud CLI**

The [hcloud CLI](https://github.com/hetznercloud/cli#installation) allows you to manage your hcloud services.

{% tabs %}
{% tab title="LINUX/MAC" %}
Use the package manager [homebrew](https://formulae.brew.sh/) to install the hcloud CLI.

```bash
brew install hcloud
hcloud context create <project_name>
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
You will be asked for you Personal Access Token with read/write priveleges \(retrieve from API Panel from the hcloud web console.\)

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

## **Environment**

Initialize the git submodule.

```bash
git submodule update --init
```

Use `direnv`, `venv` or whatever you prefer to manage a python environment inside the hcloud folder.

```bash
# Optional
(cd hcloud && direnv allow)

# Optional
(cd hcloud && virtualenv -p python3 venv)
```

Install dependencies required by Python and Ansible Galaxy.

```bash
(cd hcloud && pip install -r ansible/requirements.txt)
(cd hcloud && ansible-galaxy install -r ansible/requirements.yml)
```

## **Deploy Kubernetes Cluster**

Use the commands below to deploy an hcloud cluster:

```bash
make hcloud
```

During the deploy, you will be asked to enter information about your cluster:

```bash
var.name
  The base name used for all resources

  Enter a value: tc-k8s

var.token
  Hetzner Cloud API token

  Enter a value: <secret>

var.user_name
  The admin user name for the nodes

  Enter a value: admin
```

* Name
* Token
* Confirm `yes`

{% hint style="info" %}
Deploying a cluster takes ~15 minutes
{% endhint %}

### Quotas

If necessary, request a quota increase [here](https://console.hetzner.cloud/limits).

## CONFIGURE

Now that you've provisioned your hcloud cluster, you need to configure **kubectl**. Customize the following command with your cluster name and resource group. It will get the access credentials for your cluster and automatically configure kubectl.

```bash
(cd hcloud && scp $(terraform output -raw hcloud_config) ~/.kube/config-hcloud)

# Merge it and set current context
KUBECONFIG=~/.kube/config:~/.kube/config-hcloud kubectl config view --flatten > ~/.kube/tmpcfg && mv -f ~/.kube/tmpcfg ~/.kube/config && kubectl config use-context $(kubectl config current-context --kubeconfig=$HOME/.kube/config-hcloud)

kubectl version
```

You are now ready to deploy a THORNode.


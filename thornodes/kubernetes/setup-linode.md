---
description: Setting up a Kubernetes Cluster with Linode (linode)
---

# Setup - Linode

## Deploy a Kubernetes cluster in Linode using LKE service.

### Requirements

1. a Linode account
2. `linode-cli` and linode credentials configured
3. `kubectl`

{% hint style="warning" %}
**LINUX/MAC is the preferred method of setup.**

**Windows should choose either:**

1. **Deploy a THORNode from a Linux VPS.**
2. **Use Windows Subsystem for Linux -** [**https://docs.microsoft.com/en-us/windows/wsl/about**](https://docs.microsoft.com/en-us/windows/wsl/about)\*\*\*\*
{% endhint %}

### linode-cli

To install the linode-cli \(Linode CLI\), follow [these instructions](https://github.com/linode/linode-cli#installation).

You need to have pip \(python\) on your system.

```bash
pip install linode-cli --upgrade
```

Create a Linode API token for your account with read and write access from your [profile page](https://cloud.linode.com/profile/tokens). The token string is only displayed once, so save it in a safe place.

Use the API token to grant linode-cli access to your Linode account. Pass in the token string when prompted by linode-cli.

```bash
linode-cli
```

### kubectl

To install the kubectl \(Kubernetes CLI\), follow [these instructions](https://kubernetes.io/docs/tasks/tools/install-kubectl/) or choose a package manager based on your operating system.

MacOS:

Use the package manager [homebrew](https://formulae.brew.sh/) to install kubectl.

```bash
brew install kubernetes-cli
```

Windows:

Use the package manager [Chocolatey](https://chocolatey.org/) to install kubectl.

```bash
choco install kubernetes-cli
```

### wget

To install the wget, follow [these instructions](https://www.gnu.org/software/wget/) or choose a package manager based on your operating system.

MacOS:

Use the package manager [homebrew](https://formulae.brew.sh/) to install wget.

```bash
brew install wget
```

Windows:

Use the package manager [Chocolatey](https://chocolatey.org/) to install wget.

```bash
choco install wget
```

## Deploy Kubernetes Cluster

Use the commands below to deploy a Kubernetes cluster.

You can run the make command that automates those command for you like this:

```bash
make linode
```

Or manually run each commands:

```bash
cd linode/
terraform init
terraform plan # to see the plan
terraform apply
```

## Configure kubectl

Now that you've provisioned your Kubernetes cluster, you need to configure kubectl.

To configure authentication from the command line, use the following command, substituting the ID of your cluster.

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

> Note: If the above `linode-cli` command is broken you can download the file from the web [dashboar](https://cloud.linode.com/kubernetes/clusters) for the respective cluster.

This replaces the existing configuration at ~/.kube/config.

Once done, you can check your cluster is responding correctly by running the command:

```bash
kubectl version
kubectl get nodes
```

## Clean up your workspace

To destroy and remove previously created resources, you can run the command below.

```bash
make destroy-linode
```

Or run the commands manually:

```bash
cd linode/
terraform destroy
```


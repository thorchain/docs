---
description: Setting up a Kubernetes Cluster with GCP (GKE)
---

# Setup - Google Cloud

## **Deploy a Kubernetes cluster in GCP using GKE service.**

### **Requirements**

1. GCP account
2. `gcloud` and GCP credentials configured
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

#### **gcloud CLI**

The [gcloud CLI](https://cloud.google.com/sdk/docs/install) allows you to manage your GCP services.

{% tabs %}
{% tab title="LINUX/MAC" %}
Use the package manager [homebrew](https://formulae.brew.sh/) to install the GCP CLI.

```bash
brew install google-cloud-sdk
```
{% endtab %}
{% endtabs %}

After the installation perform the steps outlined below. This will authorize the SDK to access GCP using your user account credentials and add the SDK to your PATH. It requires you to login and select the project you want to work in. Then add your account to the Application Default Credentials \(ADC\). This will allow Terraform to access these credentials to provision resources on GCP. Finally, you need to enable the Compute Engine and Kubernetes Engine API services for your GCP project.

```bash
gcloud init
gcloud auth application-default login
gcloud services enable compute.googleapis.com
gcloud services enable container.googleapis.com
```

{% hint style="warning" %}
You will be asked for you Personal Access Token with read/write priveleges \(retrieve from API Panel from the GCP web console.\)

**API -&gt; Tokens/Keys -&gt; Create Token.**

Make sure you handle your secrets securely!
{% endhint %}

#### **kubectl plugin “gke-gcloud-auth-plugin”**

[gke-gcloud-auth-plugin](https://cloud.google.com/sdk/docs/install) is needed for kubectl’s authentication starting with `GKE v1.26`. See [Important changes to Kubectl authentication are coming in GKE v1.26](https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke?hl=en).

##### Installation

{% tabs %}
{% tab title="Windows/MAC" %}
```bash
gcloud components install gke-gcloud-auth-plugin
```
{% endtab %}
{% tab title="Linux" %}
```bash
sudo apt-get install google-cloud-sdk-gke-gcloud-auth-plugin
```
{% endtab %}
{% endtabs %}

##### Verify installation

{% tabs %}
{% tab title="Linux/MAC" %}
```bash
gke-gcloud-auth-plugin --version
```
{% endtab %}
{% tab title="Windows" %}
```bash
gke-gcloud-auth-plugin.exe --version
```
{% endtab %}
{% endtabs %}

##### Run kubectl with `gke-gcloud-auth-plugin` prior GKE v1.26

1. Add to your `~/.bashrc` or `./zshrc`

```bash
export USE_GKE_GCLOUD_AUTH_PLUGIN=True
```

2. Update gcloud to the latest version

```bash
gcloud components update
```

3. Update `kubeconfig` file with appropriate credentials and endpoint information to point `kubectl` at a specific cluster in Google Kubernetes Engine

```bash
# Replace CLUSTER_NAME with the name and REGION with the region of the cluster
gcloud container clusters get-credentials CLUSTER-NAME --region REGION
```

Example:

```bash
gcloud container clusters get-credentials thornode-cluster --zone=us-central1-f
```

See: Google Cloud CLI Reference [`gcloud container clusters get-credentials`](https://cloud.google.com/sdk/gcloud/reference/container/clusters/get-credentials)

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

Use the commands below to deploy an GKE cluster:

```bash
make gcp
```

During the deploy, you will be asked to enter information about your cluster:

```bash
var.project_id
  Project ID

  Enter a value: tc-k8s-123456

var.zone
  GCP zone in region

  Enter a value: us-east1-d
```

* Project ID
* Zone -- `gcloud compute zones list`
* Confirm `yes`

{% hint style="info" %}
Deploying a cluster takes ~15 minutes
{% endhint %}

## CONFIGURE

Now that you've provisioned your GKE cluster, you need to configure **kubectl**. The following command will get the access credentials for your cluster and automatically configure kubectl.

```bash
(cd gcp && gcloud container clusters get-credentials $(terraform output cluster_name) --zone $(terraform output zone))
```

This replaces the existing configuration at ~/.kube/config.

Once done, you can check if your cluster is responding correctly by running the following commands.

```bash
kubectl version
kubectl get nodes
```

You are now ready to deploy a THORNode.

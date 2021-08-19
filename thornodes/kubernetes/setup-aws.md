---
description: Setting up a Kubernetes Cluster with AWS
---

# Setup - AWS

## **Deploy a Kubernetes cluster in AWS using EKS service.**

### **Requirements**

1. AWS account
2. CLI and AWS credentials configured
3. AWS IAM Authenticator
4. `kubectl`
5. `wget` \(required for EKS module\)

{% hint style="warning" %}
**LINUX/MAC is the preferred method of setup.**

 **Windows should choose either:**

1. **Deploy a THORNode from a Linux VPS.**
2. **Use Windows Subsystem for Linux -** [**https://docs.microsoft.com/en-us/windows/wsl/about**](https://docs.microsoft.com/en-us/windows/wsl/about)\*\*\*\*

 ****
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

#### **AWS CLI**

In order for Terraform to run operations on your behalf, you must install and configure the AWS CLI tool. ****To install the AWS CLI, follow [these instructions](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html), or choose a package manager based on your operating system.

{% tabs %}
{% tab title="LINUX/MAC" %}
Use the package manager [homebrew](https://formulae.brew.sh/) to install the AWS CLI.

```text
brew install awscli
aws configure
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
You will be asked for you AWS access credentials \(retrieve from AWS IAM from the AWS web console.\)  
  
**IAM -&gt; User -&gt; Security Credentials -&gt; Create Access Key.**  
  
Make sure you handle your secrets securely!
{% endhint %}

#### **AWS IAM Authenticator**

You also must install and configure the **AWS IAM Authenticator** tool. ****To install, follow [these instructions](https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html), or choose a package manager based on your operating system.

{% tabs %}
{% tab title="LINUX/MAC" %}
Use the package manager [homebrew](https://formulae.brew.sh/) to install the **AWS IAM Authenticator**.

```bash
brew install aws-iam-authenticator
```
{% endtab %}
{% endtabs %}

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

## **Deploy Kubernetes Cluster**

Use the commands below to deploy an AWS EKS cluster. You can run the make command that automates those command for you like this:

```text
make aws
```

During the deploy, you will be asked to enter information about your cluster:

![](../../.gitbook/assets/image%20%2820%29.png)

* Name
* AWS Region -- see valid [List of Regions](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints)
* Confirm `yes`

![Regions](../../.gitbook/assets/image%20%2829%29.png)

![Note: AWS EKS is not available in some regions](../../.gitbook/assets/image%20%2825%29.png)

Or manually:

```text
cd aws/
terraform init
terraform plan # to see the plan
terraform apply
```

Final success message: `Apply complete! Resources: 30 added, 0 changed, 0 destroyed.`

{% hint style="info" %}
If you are a **returning** node operator and you wish to use the same node name, the Cloudwatch log files from your previous session will block this step. You need to manually delete the logs from your console:  
  
**Cloudwatch / Cloudwatch Logs / Log Groups -&gt; "delete"**
{% endhint %}

{% hint style="info" %}
Deploying a cluster takes ~10 minutes
{% endhint %}

## CONFIGURE kubectl

This is done automatically during provisioning. To configure authentication from the command line, use the following command. It will get the access credentials for your cluster and automatically configure kubectl in case you need to to manually reconfigure kubectl. 

```text
make kubeconfig-aws
```

Or get your kubeconfig file manually:

```text
(cd aws && aws eks --region $(terraform output -raw region) update-kubeconfig --name $(terraform output -raw cluster_name))
```

To verify, run this, and check the status is "Ready":

```text
kubectl version
kubectl cluster-info
kubectl get nodes
```

You are now ready to deploy a THORNode. 

### BACKUPS \(OPTIONAL\)

Once your node is running, use the following command to automatically backup the Persistent Volumes for your Kubernetes cluster. This may help in recovering your node in the event of a disaster.

Enable backups:

```text
make aws-backups
```

Disable backups:

```text
make aws-destroy-backups
```




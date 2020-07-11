---
description: Setting up a Kubernetes Cluster
---

# Setup

## **Deploy a Kubernetes cluster in AWS using EKS service.**

### **Requirements**

1. AWS account
2. CLI and AWS credentials configured
3. AWS IAM Authenticator
4. `kubectl`
5. `wget` \(required for EKS module\)
6. Kubernetes Terraform provider 

### **Install requirements**

#### **AWS CLI**

In order for Terraform to run operations on your behalf, you must install and configure the AWS CLI tool. ****To install the AWS CLI, follow [these instructions](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html), or choose a package manager based on your operating system.

{% tabs %}
{% tab title="MacOs" %}
Use the package manager [homebrew](https://formulae.brew.sh/) to install the AWS CLI.

```text
brew install awscli
aws configure
```
{% endtab %}

{% tab title="Windows" %}
Use the package manager [Chocolatey](https://chocolatey.org/) to install the AWS CLI.

```bash
choco install awscli
aws configure
```
{% endtab %}
{% endtabs %}

#### **AWS IAM Authenticator**

In order for Terraform to run operations on your behalf, you must install and configure the **AWS IAM Authenticator** tool. ****To install, follow [these instructions](https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html), or choose a package manager based on your operating system.

{% tabs %}
{% tab title="MacOs" %}
Use the package manager [homebrew](https://formulae.brew.sh/) to install the **AWS IAM Authenticator**.

```bash
brew install aws-iam-authenticator
```
{% endtab %}

{% tab title="Windows" %}
Use the package manager [Chocolatey](https://chocolatey.org/) to install the **AWS IAM Authenticator**.

```text
choco install aws-iam-authenticator
```
{% endtab %}
{% endtabs %}

#### **kubectl**

In order for Terraform to run operations on your behalf, you must install and configure the AWS CLI tool. ****To install the AWS CLI, follow [these instructions](https://kubernetes.io/docs/tasks/tools/install-kubectl/), or choose a package manager based on your operating system.

{% tabs %}
{% tab title="MacOs" %}
Use the package manager [homebrew](https://formulae.brew.sh/) to install **kubectl**.

```text
brew install kubernetes-cli
```
{% endtab %}

{% tab title="Windows" %}
Use the package manager [Chocolatey](https://chocolatey.org/) to install **kubectl**.

```text
choco install kubernetes-cli
```
{% endtab %}
{% endtabs %}

#### **wget**

In order for Terraform to run operations on your behalf, you must install and configure the AWS CLI tool. ****To install the AWS CLI, follow [these instructions](https://www.gnu.org/software/wget/), or choose a package manager based on your operating system.

{% tabs %}
{% tab title="MacOs" %}
Use the package manager [homebrew](https://formulae.brew.sh/) to install **wget**.

```text
brew install wget
```
{% endtab %}

{% tab title="Windows" %}
Use the package manager [Chocolatey](https://chocolatey.org/) to install  **wget**.

```text
choco install kubernetes-cli
```
{% endtab %}
{% endtabs %}

####  **Kubernetes Terraform provider**

Use the command below to install Kubernetes Terraform provider, if the command is outdated or failing, please refer to the [documentation here](https://gavinbunney.github.io/terraform-provider-kubectl/docs/provider.html).

```text
mkdir -p ~/.terraform.d/plugins && \
    curl -Ls https://api.github.com/repos/gavinbunney/terraform-provider-kubectl/releases/latest \
    | jq -r ".assets[] | select(.browser_download_url | contains(\"$(uname -s | tr A-Z a-z)\")) | select(.browser_download_url | contains(\"amd64\")) | .browser_download_url" \
    | xargs -n 1 curl -Lo ~/.terraform.d/plugins/terraform-provider-kubectl && \
    chmod +x ~/.terraform.d/plugins/terraform-provider-kubectl
```

#### **Deploy Kubernetes Cluster**

Use the commands below to deploy an AWS EKS cluster. You can run the make command that automates those command for you like this:

```text
make aws
```

Or manually run each commands:

```text
cd aws/
terraform init
terraform plan # to see the plan
terraform apply
```

**Configure kubectl**

Now that you've provisioned your EKS cluster, you need to configure kubectl. Customize the following command with your cluster name and region. It will get the access credentials for your cluster and automatically configure kubectl.

```text
aws eks --region <cluster_region> update-kubeconfig --name <cluster_name>
kubectl version
```

**Clean up your workspace**

To destroy and remove previously created resources, you can run the command below.

```text
make aws-destroy
```

Or manually run each commands:

```text
cd aws/
terraform destroy
```


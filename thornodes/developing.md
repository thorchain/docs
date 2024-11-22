---
description: Deploying a custom stagenet to have a developer-controlled environment
---

# Developing

THORChain uses multiple network environments to move from an idea to mainnet deployment, each with a specific role:

* **Mainnet**: The live production network where real assets are transacted. Security and reliability are ensured through validator consensus, with only well-tested changes deployed to minimize risks.
* **Stagenet**: A pre-production network mirroring mainnet, used to test new features and chain integrations with real assets and participants. Changes require consensus, providing real-world validation but slower testing.
* **Devnet / Mocknet**: A developer-managed environment for rapid testing and iteration. Validators and participants are fully controlled, making it ideal for testing new chains like TON, TRON, Optimism, or Arbitrum before advancing to the official stagenet or mainnet.

A devnet offers developers full control over the THORChain environment to test without impacting live networks. Key benefits include:

* Autonomy: Configure without consensus delays.
* Rapid Iteration: Test and refine quickly.
* Risk Mitigation: Isolate changes to ensure live network stability.

#### gRPC Support

THORChain supports gRPC for enhanced communication between clients and servers. This feature is available in the Stagenet environment for testing and development purposes.

* Enabled gRPC Endpoint: A gRPC endpoint has been deployed and can be accessed at `thornode-grpc.defiantlabs.net:443`.
* New Feature Development: The addition of gRPC support is being tracked in [Merge Request #1232](https://gitlab.com/thorchain/devops/node-launcher/-/merge\_requests/1232), which adds the required functionality to the node-launcher repository.

### Prerequisites to Setup a Devnet

#### Hardware Requirements

* CPU: 8 cores
* Memory: 32 GiB
* Storage: 256 GiB

#### Software Requirements

* kubectl: Kubernetes CLI \[v1.31.1 or later]
* Helm: Manage Kubernetes deployments with Helm charts.
* Minikube: Local Kubernetes cluster for testing.
* THORNode Binary: Core THORChain binary for managing nodes.

## 1. Installation

1. Install kubectl

```
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl
sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt update
sudo apt install -y kubectl// Some code
```

2. Install Helm

```
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

3. Install Minikube

```
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

4. Install THORNode Binary

```bash
git clone git@gitlab.com:thorchain/thornode.git
cd thornode
git checkout develop
TAG=stagenet make install
```

## 2. Configuration

### Configure Minikube

Minikube simulates a [Kubernetes](https://docs.thorchain.org/thornodes/kubernetes) environment locally.

#### Start Minikube

```bash
minikube start --cpus 8 --memory 32768 \
  --kubernetes-version=v1.31.1 \
  --network-plugin=cni --cni=cilium \
  -p custom-stagenet \
  --addons default-storageclass storage-provisioner volumesnapshots csi-hostpath-driver \
  --extra-config=kubelet.cgroup-driver=systemd \
  --extra-config=kubelet.max-pods=50 \
  --disk-size=256gb \
  --extra-config=kubeadm.pod-network-cidr=10.244.0.0/16
minikube profile custom-stagenet
```

#### Enable MetalLB for Load Balancing

```bash
minikube addons enable metallb
kubectl apply -f - <<EOF
apiVersion: v1
kind: ConfigMap
metadata:
  namespace: metallb-system
  name: config
data:
  config: |
    address-pools:
    - name: default
      protocol: layer2
      addresses:
      - 192.168.252.0/22
EOF
```

### Configure THORNode Binary

#### Initialize Configuration

```
thornode init custom --home ~/.thornode
```

#### Generate Faucet Keys

```bash
thornode keys add faucet
```

Save the faucet address for funding RUNE transactions in the stagenet.

## 3. Deploy the Devnet

Modify Deployment Configurations

1. Clone the **node-launcher** repository:

```bash
git clone https://gitlab.com/thorchain/devops/node-launcher.git
cd node-launcher
make tools
```

2. Edit thornode-stack/stagenet.yaml:

* Enable **Gaia Daemon** only for testing:

```yaml
gaia-daemon:
  enabled: true
  resources:
    requests:
      cpu: 500m
      memory: 512Mi
    limits:
      cpu: 500m
      memory: 512Mi
```

* Adjust resource allocations (CPU/memory) and persistence sizes.
* Add environment variables for the faucet and chain configuration:

```yaml
thornode:
  env:
    FAUCET: "<your-faucet-address>"
```

3. Deploy with Minikube:

```bash
kubectl apply -f thornode-stack/stagenet.yaml
```

## 4. Add a Validator Node

1. Start the genesis validator:

```bash
docker compose --profile genesis up
```

2. Start additional validators:

```bash
docker compose --profile validator-1 up
thornode tx thorchain deposit 30000000000000 rune "BOND:<validator-address>" --from faucet --chain-id thorchain --node http://localhost:27147
```

3. Trigger network churn:

```bash
thornode tx thorchain mimir ChurnMigrateRounds --from faucet --chain-id thorchain --node http://localhost:27147 -- 2
thornode tx thorchain mimir ChurnInterval --from faucet --chain-id thorchain --node http://localhost:27147 -- 100
```

## 5. Test Your Environment

* Verify connectivity:

```bash
export KUBECONFIG=~/.kube/config
kubectl get nodes
```

* Access API:

```bash
API: http://localhost:1317
RPC: http://localhost:27147
```

## Advanced Options

* Custom Configurations: Use custom seed phrases or faucet wallets.
* Enable Chains: Modify the docker-compose.yml or stagenet.yaml file to include more chains.
* Deploy Custom Contracts: Override environment variables to test unique configurations.

## References

For more details or if you encounter any errors in above steps, check out the docs in Gitlab directly:&#x20;

{% embed url="https://gitlab.com/thorchain/devops/node-launcher/-/blob/6e05a0292d0ea4cafd4b48f053ca93423c3ae912/docs/Custom-Stagenet.md" %}

{% embed url="https://gitlab.com/thorchain/thornode/-/blob/ursa/custom-stagenet/tools/stagenet/README.md?ref_type=heads" %}

---
description: Setting up a Kubernetes Cluster with Hetzner Dedicated Servers
---

# Hetzner Bare Metal k8s Cluster

> Checkout this [repository](https://github.com/delphidigital/bare-metal-cluster-manager) to manage a cluster of dedicated servers on Hetzner.

The scripts in this repository will setup and maintain one or more [kubernetes][k8s] clusters consisting of dedicated [Hetzner][hetzner] servers. Each cluster will also be provisioned to operate as a node in the [THORCHain][tc] network.

Executing the scripts in combination with some manual procedures will get you clusters with the following features on bare metal.

* [Kubespray][kubespray] (based)
* Internal NVMe storage ([Ceph][ceph]/[Rook][rook])
* Virtual LAN (also over multiple locations) ([Calico][calico])
* Load Balancing ([MetalLB][metallb])

## Preparations

### Servers

Acquire a couple of [servers][buy] as the basis for a cluster (`AX41-NVME`'s are working well for instance). Visit the [admin panel][admin] and name the servers appropriately.

```text
tc-k8s-master
tc-k8s-worker1
tc-k8s-worker2
...
```

Refer to the [reset procedure][reset] to properly initialize them.

### vSwitch

Create a [vSwitch][vswitch] and order an appropriate subnet (it may take a while to show up after the order). Give the vSwitch a name (i.e. `tc-k8s-net`) and Assign this vSwitch to the servers.

Checkout the [docs][vswitch_docs] for help.

## Usage

Clone this repository, `cd` into it and download kubespray.

```bash
git submodule init && git submodule update
```

Create a Python virtual environment or similar.

```bash
# Optional
virtualenv -p python3 venv
```

Install dependencies required by Python and Ansible Glaxy.

```bash
pip install -r requirements.python.txt
ansible-galaxy install -r requirements.ansible.yml
```

> Note: Mitogen does not work with ansible collections and needs to be disabled.

### Provisioning

```bash
cp hosts.example inventory/inventory.ini
cp cluster.yml.example private-cluster.yml
```

Add your server ip's to `inventory.ini` and your network information into `private-cluster.yml`

If you want to manage multiple clusters simply name the files according to the pattern below.

```text
private-cluster-01.yml
private-cluster-02.yml
private-cluster-02.yml
...

private-test.yml
...

private-helsinki-01.yml
...

private-whatever.yml
```

```bash
# Manage a cluster
ansible-playbook private-cluster.yml

# If you want to run kubespray separately
ansible-playbook kubespray/cluster.yml
```

> Check [this][kubespray] out for more playbooks on cluster management.

### THORChain

In order for the cluster to operate as a node in the THORCHain network deploy as instructed [here][tc_deplyoing]. You can also refer to the [node-launcher repository][node-launcher], if necessary, or the THORChain [documentation][tc_docs] as a whole.

## Resetting the bare metal servers

Visit the [console][admin] and put each server of the cluster into rescue mode. Then execute the following script.

```bash
installimage -a -r no -i images/Ubuntu-1804-bionic-64-minimal.tar.gz -p /:ext4:all -d nvme0n1 -f yes -t yes -n hostname
```

This will install and use Ubuntu on only one of the two internal NVMe drives. The unused ones will be used for persistent storage with ceph/rook. You can check the internal drive setup with `lsblk`. Change it accordingly in the command shown above when necessary.

> Ubuntu 18.04 is used because kubespray does not support 20.04 (yet)

[reset]: #resetting-the-bare-metal-servers
[hetzner]: https://www.hetzner.com
[buy]: https://www.hetzner.com/dedicated-rootserver/matrix-ax
[admin]: https://robot.your-server.de/server
[vswitch]: https://robot.your-server.de/vswitch/index
[vswitch_docs]: https://docs.hetzner.com/robot/dedicated-server/network/vswitch
[k8s]: https://kubernetes.io
[kubespray]: https://kubespray.io/
[metallb]: https://metallb.universe.tf
[calico]: https://www.projectcalico.org
[ceph]: https://ceph.io
[rook]: https://rook.io
[tc]: https://thorchain.org
[tc_docs]: https://docs.thorchain.org
[tc_deplyoing]: https://docs.thorchain.org/thornodes/kubernetes/deploying
[node-launcher]: https://gitlab.com/thorchain/devops/node-launcher

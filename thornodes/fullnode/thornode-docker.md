---
description: Setting up a fullnode with Docker
---

# Thornode on Docker

{% hint style="info" %}
The steps shown here are tested on `Ubuntu 24.04`, different distributions may need adjustments to the commands.

All commands are meant to be run as root user, if not specified otherwise. Depending on the server installation, they may need to be run from a different user via `sudo`.
{% endhint %}

## Prerequisites

Install all packages needed for running and configuring the THORNode container

```sh
apt install -y --no-install-recommends aria2 curl docker.io jq pv
```

{% hint style="info" %}
The published image is built for `linux/amd64`. On an `arm64` host (e.g. Apple Silicon) add `--platform linux/amd64` to the `docker run` command to run it under emulation.
{% endhint %}

## Configuration

### Work directory

Prepare work directory

```sh
mkdir -p /opt/thornode/.thornode/config
```

### Genesis

No manual step is required. On first start the container fetches the genesis file automatically from the network's seed nodes (discovered via the configured seed-nodes endpoint, then pulled from a peer's RPC). A successful genesis fetch is **not** by itself enough to join the network — you must also choose a sync method below, otherwise the node will attempt to initialize from the fetched genesis and fail.

### Sync

A fullnode cannot replay the chain from genesis with a current binary; you must bootstrap from a recent state. Choose one of the following.

#### Option A — Automatic StateSync (self-contained)

Set `THOR_AUTO_STATE_SYNC_ENABLED=true` (included in the `docker run` below). The node determines a trust height from the default trusted RPC servers and restores recent state over P2P from StateSync peers.

{% hint style="warning" %}
Network StateSync is memory intensive — at the time of writing it requires roughly `80 GB` of RAM. Ensure your server is sized accordingly.
{% endhint %}

#### Option B — Snapshot restore

Download a current snapshot and extract it into `/opt/thornode/.thornode/data` before starting the container (leave `THOR_AUTO_STATE_SYNC_ENABLED` unset in this case). For snapshot sources and the recovery procedure, see the upstream [Thornode Snapshot Recovery and Storage Management](https://gitlab.com/thorchain/devops/node-launcher/-/blob/master/docs/Thornode-Snapshot-Recovery-and-Storage-Management.md) doc.

{% hint style="info" %}
That document is written for the Kubernetes/Helm `node-launcher` deployment (it uses `make` targets); for a standalone Docker node use it only as the source of the snapshot location and storage guidance, and place the extracted data under the mounted `.thornode/data` directory.
{% endhint %}

## Start

Use the image tag that matches the current network version (check `/thorchain/version` on a public node). At the time of writing this is `mainnet-3.18.1`.

Start the thornode container

```sh
docker run -d --restart=on-failure \
  -v /opt/thornode/.thornode:/root/.thornode \
  -e CHAIN_ID=thorchain-1 \
  -e THOR_AUTO_STATE_SYNC_ENABLED=true \
  -p 127.0.0.1:1317:1317 \
  -p 127.0.0.1:27147:27147 \
  -p 27146:27146 \
  --name thornode \
  registry.gitlab.com/thorchain/thornode:mainnet-3.18.1
```

{% hint style="info" %}
On `arm64` hosts add `--platform linux/amd64`. If you bootstrapped via a snapshot (Option B) instead of StateSync, remove the `-e THOR_AUTO_STATE_SYNC_ENABLED=true` line.
{% endhint %}

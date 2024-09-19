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

## Prepare environment

### Work directory

Prepare work directory

```sh
mkdir -p /opt/thornode/.thornode/config
```

### Genesis

For joining the network, the correct genesis file is required

```sh
curl https://storage.googleapis.com/public-snapshots-ninerealms/genesis/17562000.json -o /opt/thornode/.thornode/config/genesis.json
```

### Sync

The fastest way to join the network is by downloading a current snapshot and sync from it.

```sh
# get latest snapshot
FILENAME=$(curl -s "https://snapshots.ninerealms.com/snapshots?prefix=thornode" | grep -Eo "thornode/[0-9]+.tar.gz" | sort -n | tail -n 1 | cut -d "/" -f 2)

# download snapshot
aria2c --split=16 --max-concurrent-downloads=16 --max-connection-per-server=16 --continue --min-split-size=100M -d /opt/thornode/.thornode -o $FILENAME "https://snapshots.ninerealms.com/snapshots/thornode/${FILENAME}"

# ensure no chain data exists
rm -rf /opt/thornode/.thornode/data/{*.db,snapshot,cs.wal}

# extract snapshot
pv /opt/thornode/.thornode/$FILENAME | tar -xzf - -C /opt/thornode/.thornode --exclude "*_state.json"

# cleanup snapshot
rm -rf /opt/thornode/.thornode/$FILENAME
```

## Start

Start the thornode container

```sh
docker run -d --restart=on-failure \
  -v /opt/thornode/.thornode:/root/.thornode \
  -e CHAIN_ID=thorchain-1 \
  -p 127.0.0.1:1317:1317 \
  -p 127.0.0.1:27147:27147 \
  -p 27146:27146 \
  --name thornode \
  registry.gitlab.com/thorchain/thornode:mainnet-2.135.1 
```

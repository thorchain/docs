---
description: Setting up a fullnode on Linux
---

# Thornode on Linux

{% hint style="info" %}
The steps shown here are tested on `Ubuntu 24.04`, different distributions may need adjustments to the commands.

All commands are meant to be run as root user, if not specified otherwise. Depending on the server installation, they may need to be run from a different user via `sudo`.
{% endhint %}

## Prerequisites

Install all needed packages for building and configuring the THORNode daemon

```sh
apt install -y --no-install-recommends aria2 ca-certificates curl git golang jq make pv
```

## Application user

Add the application user that is used to run the THORNode application

```sh
useradd -m thornode -s /bin/bash
```

## Build

Checkout the latest code and build the binary

As `thornode` user run:

```sh
git clone --branch v2.135.1 https://gitlab.com/thorchain/thornode $HOME/build

cd $HOME/build

ln -fs /usr/bin/true docker; export PATH=$(pwd):$PATH; TAG=mainnet make install

# remove bifrost binary and build directory
rm $HOME/go/bin/bifrost
rm -rf $HOME/build
```

Note: The build process currently expects to have a docker binary available, which isn't needed for building the `thornode` binary, so providing it a fake docker command via symlink is just a hack around that limitation.

## Prepare environment

### Config

Before running the fullndode the first time, the configuration files and directory layout need to be created.

As `thornode` user run:

```sh
$HOME/go/bin/thornode init thornode --overwrite --chain-id thorchain-1
```

### Seed nodes

Seeds provide a list of active thorchain nodes, which are needed to join the network.

As `thornode` user run:

```sh
sed -i 's/^seeds = ""/seeds = "c3613862c2608b3e861406ad02146f41cf5124e6@statesync-seed.ninerealms.com:27146,dbd1730bff1e8a21aad93bc6083209904d483185@statesync-seed-2.ninerealms.com:27146"/' $HOME/.thornode/config/config.toml
```

### Ports

THORChain doesn't use the cosmos-sdk default ports. Technically this step isn't needed, but it is meant to stay in line with all other THORNode deployments.

As `thornode` user run:

```sh
sed -ri 's/:2665([0-9])/:2714\1/g' $HOME/.thornode/config/config.toml
```

### Genesis

For joining the network, the correct genesis file is required

As `thornode` user run:

```sh
curl https://storage.googleapis.com/public-snapshots-ninerealms/genesis/17562000.json -o $HOME/.thornode/config/genesis.json
```

### Sync

The fastest way to join the network is by downloading a current snapshot and sync from it.

As `thornode` user run:

```sh
# get latest snapshot
FILENAME=$(curl -s "https://snapshots.ninerealms.com/snapshots?prefix=thornode" | grep -Eo "thornode/[0-9]+.tar.gz" | sort -n | tail -n 1 | cut -d "/" -f 2)

# download snapshot
aria2c --split=16 --max-concurrent-downloads=16 --max-connection-per-server=16 --continue --min-split-size=100M -d $HOME/.thornode -o $FILENAME "https://snapshots.ninerealms.com/snapshots/thornode/${FILENAME}"

# ensure no chain data exists
rm -rf $HOME/.thornode/data/{*.db,snapshot,cs.wal}

# extract snapshot
pv $HOME/.thornode/$FILENAME | tar -xzf - -C $HOME/.thornode --exclude "*_state.json"

# cleanup snapshot
rm -rf $HOME/.thornode/$FILENAME
```

## Systemd

Create a service file to be able to manage the thornode process via systemd

{% code title="/etc/systemd/system/thornode.service" overflow="wrap" %}

```toml
[Unit]
Description=Thornode Daemon
After=network-online.target

[Service]
User=thornode
ExecStart=/home/thornode/go/bin/thornode start
Restart=on-abort
RestartSec=3
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
```

{% endcode %}

Reload systemd config

```sh
systemctl daemon-reload
```

## Start

Start the daemon

```sh
systemctl start thornode.service
```

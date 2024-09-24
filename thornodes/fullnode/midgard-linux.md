---
description: Setting up Midgard on Linux
---

# Midgard on Linux

{% hint style="info" %}
The steps shown here are tested on `Ubuntu 24.04`, different distributions may need adjustments to the commands.

All commands are meant to be run as root user, if not specified otherwise. Depending on the server installation, they may need to be run from a different user via `sudo`.
{% endhint %}

## Prerequisites

Install all needed packages for building and running midgard

```sh
apt install -y --no-install-recommends apt-transport-https gcc gnupg lsb-release postgresql postgresql-common wget
```

## Application user

Add the application user that is used to run the thornode daemon

```sh
useradd -m midgard -s /bin/bash
```

## Database

### Install TimescaleDB

Run the PostgreSQL package setup script

```sh
/usr/share/postgresql-common/pgdg/apt.postgresql.org.sh
```

Add the TimescaleDB package

```sh
echo "deb https://packagecloud.io/timescale/timescaledb/ubuntu/ $(lsb_release -c -s) main" | sudo tee /etc/apt/sources.list.d/timescaledb.list
```

Install the TimescaleDB GPG key

```sh
wget --quiet -O - https://packagecloud.io/timescale/timescaledb/gpgkey | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/timescaledb.gpg
```

Update your local repository list and install TimescaleDB

```sh
apt update
sudo apt install timescaledb-2-postgresql-16 postgresql-client-16
```

Tune your PostgreSQL instance for TimescaleDB

```sh
timescaledb-tune
```

Restart PostgreSQL

```sh
systemctl restart postgresql
```

### Create midgard database

```sh
su - postgres

psql

CREATE USER midgard WITH ENCRYPTED PASSWORD 'password';
CREATE DATABASE midgard OWNER midgard;

exit
```

### Install TimescaleDB extension

Connect to the database

```sh
psql -d "postgres://midgard:password@localhost:5432/midgard"
```

Add TimescaleDB to the database

```sql
CREATE EXTENSION IF NOT EXISTS timescaledb;
```

Check that TimescaleDB is installed

```sql
\dx
```

```plaintext
                                                List of installed extensions
    Name     | Version |   Schema   |                                      Description                                      
-------------+---------+------------+---------------------------------------------------------------------------------------
 plpgsql     | 1.0     | pg_catalog | PL/pgSQL procedural language
 timescaledb | 2.16.1  | public     | Enables scalable inserts and complex queries for time-series data (Community Edition)
(2 rows)
```

## Install

As `midgard` user run:

```sh
git clone --branch 2.24.4 https://gitlab.com/thorchain/midgard.git $HOME/build

cd $HOME/build

export ENV CGO_ENABLED=1

go install -v -installsuffix cgo ./cmd/blockstore/dump
go install -v -installsuffix cgo ./cmd/midgard
go install -v -installsuffix cgo ./cmd/trimdb
go install -v -installsuffix cgo ./cmd/statechecks

mkdir -p $HOME/{config,openapi/generated}
cp openapi/generated/doc.html $HOME/openapi/generated/
```

## Configuration

As `midgard` user run:

```sh
mkdir $HOME/config

# get genesis.json
curl https://storage.googleapis.com/public-snapshots-ninerealms/genesis/17562000.json -o $HOME/config/genesis.json
```

Add midgard config

{% code title="/home/midgard/config/midgard.json" overflow="wrap" %}

```json
{
  "listen_port": 8080,
  "max_block_age": "60s",
  "shutdown_timeout": "5s",
  "thorchain": {
    "last_chain_backoff": "7s",
    "fetch_batch_size": 100,
    "parallelism": 4,
    "read_timeout": "60s",
    "tendermint_url": "https://rpc.ninerealms.com/websocket",
    "thornode_url": "https://thornode.ninerealms.com/thorchain",
    "fork_infos": [
      {
        "chain_id": "thorchain-1",
        "earliest_block_hash": "0B3C8F9E3EA7E9B1C10CAC5217ED771E0540671EFB9C5315BF01167266BCBEDF",
        "earliest_block_height": 17562001
      }
    ]
  },
  "timescale": {
    "user_name": "midgard",
    "password": "password",
    "database": "midgard",
    "sslmode": "disable",
    "commit_batch_size": 100,
    "max_open_conns": 100,
    "no_auto_update_ddl": true,
    "host": "localhost",
    "port": 5432
  },
  "websockets": {
    "enable": false,
    "connection_limit": 100
  },
  "usdpools": [
    "BNB.BUSD-BD1",
    "BNB.BUSD-BAF",
    "BNB.USDT-DC8",
    "ETH.USDT-0X62E273709DA575835C7F6AEF4A31140CA5B1D190",
    "ETH.USDT-0XDAC17F958D2EE523A2206206994597C13D831EC7",
    "AVAX.USDC-0XB97EF9EF8734C71904D8002F8B6BC66DD9C48A6E",
    "ETH.USDC-0XA0B86991C6218B36C1D19D4A2E9EB0CE3606EB48"
  ],
  "genesis": {
    "local": "/home/midgard/config/genesis.json",
    "initial_block_height": 17562001,
    "initial_block_hash": "0B3C8F9E3EA7E9B1C10CAC5217ED771E0540671EFB9C5315BF01167266BCBEDF"
  },
  "blockstore": {
    "local": "./tmp/blockstore",
    "remote": "https://snapshots.ninerealms.com/snapshots/midgard-blockstore/"
  }
}
```

{% endcode %}

## Systemd

Create a service file to be able to manage the Midgard process via systemd

{% code title="/etc/systemd/system/midgard.service" overflow="wrap" %}

```toml
[Unit]
Description=Midgard Daemon
After=network-online.target

[Service]
User=midgard
WorkingDirectory=/home/midgard
ExecStart=/home/midgard/go/bin/midgard /home/midgard/config/midgard.json
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
systemctl start midgard.service
```

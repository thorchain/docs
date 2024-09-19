---
description: Setting up midgard on plain Linux
---

# Midgard on Docker

{% hint style="info" %}
The steps shown here are tested on `Ubuntu 24.04`, different distributions may need adjustments to the commands.

All commands are meant to be run as root user, if not specified otherwise. Depending on the server installation, they may need to be run from a different user via `sudo`.
{% endhint %}

## Prerequisites

Install all needed packages for building and managing the thornode daemon

```sh
apt install -y --no-install-recommends docker.io
```

## Configuration

Prepare work directories

```sh
mkdir -p /opt/timescale
mkdir -p /opt/midgard/{config,blockstore}

# get genesis.json
curl https://storage.googleapis.com/public-snapshots-ninerealms/genesis/17562000.json -o /opt/midgard/config/genesis.json
```

Add midgard config

{% code title="/opt/midgard/config/config.json" overflow="wrap" %}

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
    "local": "genesis.json",
    "initial_block_height": 17562001,
    "initial_block_hash": "0B3C8F9E3EA7E9B1C10CAC5217ED771E0540671EFB9C5315BF01167266BCBEDF"
  },
  "blockstore": {
    "local": "/blockstore",
    "remote": "https://snapshots.ninerealms.com/snapshots/midgard-blockstore/"
  }
}
```

{% endcode %}

## Database

Start the Timescale database

```sh
docker run -d --restart=on-failure \
  -v /opt/timescale:/var/lib/postgresql/data \
  -e POSTGRES_DB=midgard \
  -e POSTGRES_USER=midgard \
  -e POSTGRES_PASSWORD=password \
  -p 127.0.0.1:5432:5432 \
  --name timescale \
  timescale/timescaledb:2.13.0-pg15 \
  postgres -c plan_cache_mode=force_custom_plan
```

## Start

Start the midgard container

```sh
docker run -d --restart=on-failure \
  -v /opt/midgard/config:/config \
  -v /opt/midgard/blockstore:/blockstore \
  -p 127.0.0.1:8080:8080 \
  --name midgard --net host \
  registry.gitlab.com/thorchain/midgard:2.24.4
```

```
docker run -d --restart=on-failure \
  -v /opt/midgard/config/config.json:/config.json \
  -v /opt/midgard/config/genesis.json:/genesis.json \
  -v /opt/midgard/blockstore:/blockstore \
  --name midgard --net host \
  registry.gitlab.com/thorchain/midgard:2.24.4
```

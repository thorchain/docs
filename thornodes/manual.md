---
description: Deploying a node manually.
---

# Deploy - Manual

{% hint style="warning" %}
This guide is incomplete. Refer to [the THORNode GitLab repository](https://gitlab.com/thorchain/thornode) for the most current instructions.
{% endhint %}

First, ensure that you have a recent version of Go installed – at least version `1.13`. [Latest Go versions](https://golang.org/dl/).

Also, be sure to have `GOBIN` in your `PATH`. To ensure this, run—

```text
export GOBIN=$GOPATH/bin
```

Next, prepare the local THORNode directory—

```text
git clone git@gitlab.com:thorchain/thornode.git
cd thornode
```

Now there are 2 options for running THORNode—

* [on Linux](manual.md#run-thornode-on-linux), manually
* [with Docker](manual.md#run-thornode-with-docker) – for developing with a full local chain

## Run THORNode on Linux

Build the binaries—

```bash
make install
```

Check you've installed `thorcli` and `thord` correctly:

```bash
thorcli help
thord help
```

Next, set up the Binance full node. Do this manually [using Binance's documentation](https://docs.binance.org/fullnode.html) or use [a Docker image](https://github.com/varnav/binance-node-docker/blob/master/newbie-guide.md).

Wait until your Binance node is caught up before you continue to the next steps.

## Run THORNode with Docker

Use Docker to get a full local mock network for development purposes and to run currently unsupported operating systems, namely Windows.

Go to the Docker directory—

```text
cd build/docker
```

Run the mocknet—

```text
make reset-mocknet-standalone
```

Run a genesis ceremony with 4 nodes on the mock network—

```text
make run-mocknet-genesis
```




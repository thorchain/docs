---
description: Setting up a fullnode on Kubernetes
---

# Thornode - Kubernetes

For deploying Thornode and Midgard on Kubernetes, follow the instructions for [cluster launcher](../kubernetes/README.md) and [node launcher](../deploying.md).

Instead of `TYPE=validator`, use `TYPE=fullnode` at the [deployment step](../deploying.md#deploy-thornode).

```sh
NET=mainnet TYPE=fullnode NAME=thornode make install
```

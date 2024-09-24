---
description: Setting up a fullnode on Kubernetes
---

# Thornode - Kubernetes

For deploying Thornode and Midgard on Kubernetes, follow the instructions for [Cluster Launcher](../kubernetes/README.md) and [Deployment](../deploying.md).

Instead of `TYPE=validator`, use `TYPE=fullnode` at the [Thornode deployment](../deploying.md#deploy-thornode) step.

```sh
NET=mainnet TYPE=fullnode NAME=thornode make install
```

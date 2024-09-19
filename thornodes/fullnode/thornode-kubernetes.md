---
description: Setting up a fullnode on Kubernetes
---

# Thornode on Kubernetes

For deploying thornode and midgard on Kubernetes, follow the instructions for cluster launcher and node launcher set up. Once the [tools](../deploying#tools) are deployed sucessfully, run:

```sh
NET=mainnet TYPE=fullnode NAME=thornode make install
```

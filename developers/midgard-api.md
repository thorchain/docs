---
description: Details about Midgard
---

# Midgard API

## Overview

Midgard is a layer 2 REST API that provides front-end consumers with semi real-time rolled up data and analytics of the THORChain network. Most requests to the network will come through Midgard. This daemon is here to keep the chain itself from fielding large quantities of requests. You can think of it as a “read-only slave” to the chain. This keeps the resources of the network focused on processing transactions.

### Documentation

Midgard documentation is available at `http://<host>:8080/v1/doc`

### Chain Proxies

Midgard also serves to proxy to various chains. This is useful for broadcasting signed transactions back to connected networks. 

Instead of running a Bitcoin full node, a wallet can send a signed transaction or make RPC queries direct to a THORNode:

`http://<host>:8332`


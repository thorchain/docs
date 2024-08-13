---
description: What is Midgard in the THORChain tech stack
---

# Midgard

Midgard is a layer 2 REST API that provides front-end consumers with semi real-time rolled up data and analytics of the THORChain network. Most requests to the network will come through Midgard. This daemon is here to keep the chain itself from fielding large quantities of requests. You can think of it as a “read-only slave” to the chain. This keeps the resources of the network focused on processing transactions.



Midgard is heavily used in dashboards and transaction scanners like [Thorchain.net](https://thorchain.net/), [Thorchain.network](https://thorchain.network/) and [Runescan.io](https://runescan.io/).



For more information see [Gitlab repo](https://gitlab.com/thorchain/midgard).

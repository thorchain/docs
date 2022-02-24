---
description: How to connect to Midgard, THORNode and the base Tendermint layer.
---

# Connecting to THORChain

This section covers technically how to connect to THORChain. As an end user, go to :

{% content-ref url="../learn/getting-started.md" %}
[getting-started.md](../learn/getting-started.md)
{% endcontent-ref %}

The Network Information comes from three sources:

1. **MIDGARD**: Consumer information relating to swaps, pools, volume. DeFi dashboards, Wallets, Exchanges will primarily interact with Midgard.
2. **THORNODE**: Raw blockchain data relating to the THORChain state machine. THORChain block explorers will query THORChain-specific information here.
3. **TENDERMINT**: Tendermint standard data, used by all block explorers to query for base information.

### Midgard

Midgard returns time-series information regarding the THORChain network, such as volume, pool information, users, liquidity providers and more. It also proxies to THORNode to reduce burden on the network.&#x20;

**Any Node**

Port: `8080`

RPC Guide:\
http://\<host>:8080/v2/doc

**Official Mainnet**

[https://midgard.thorchain.info/v2/doc](https://midgard.thorchain.info/v2/doc)

[https://testnet.midgard.thorchain.info/v2/doc](https://testnet.midgard.thorchain.info/v2/doc)

**Other Mainnet Public Endpoints**

[https://midgard.thorswap.net/v2/doc](https://midgard.thorswap.net/v2/doc)

[https://thornode.thorswap.net/thorchain/doc/](https://thornode.thorswap.net/thorchain/doc/)

**Official Stagenet**

[https://stagenet-midgard.ninerealms.com/v2/doc](https://stagenet-midgard.ninerealms.com/v2/doc)

### THORNode

THORNode returns application-specific information regarding the THORChain state machine, such as balances, transactions and more. Careful querying this too much - you could overload the public nodes. Consider running your own node.&#x20;

**Any Node**

Port: `1317`

RPC Guide:\
http://\<host>:1317/thorchain/doc/

**Official Mainnet**

[https://thornode.thorchain.info/thorchain/doc/](https://thornode.thorchain.info/thorchain/doc/)

[https://testnet.thornode.thorchain.info/thorchain/doc/](https://testnet.thornode.thorchain.info/thorchain/doc/)

**Official Stagenet**

[https://stagenet-thornode.ninerealms.com/](https://stagenet-thornode.ninerealms.com)

### RPC

RPC allows base blockchain information to be returned. This is the "default" cosmos RPC endpoints.&#x20;

**Any Node**

TESTNET Port: `26657`

STAGENET Port: `26657`

MAINNET Port: `27147`

RPC Guide:\
[https://v1.cosmos.network/rpc/v0.41.4](https://v1.cosmos.network/rpc/v0.41.4)

**Official**

[https://rpc.thorchain.info/genesis](https://rpc.thorchain.info/genesis)

[https://stagenet-rpc.ninerealms.com/](https://stagenet-rpc.ninerealms.com)[genesis](https://rpc.thorchain.info/genesis)

[https://testnet.rpc.thorchain.info/genesis](https://testnet.rpc.thorchain.info/genesis)

### **P2P**

P2P is the network layer between nodes, useful for network debugging.

TESTNET Port: `26656`

STAGENET Port: `26656`

MAINNET Port: `27146`

P2P Guide\
[https://docs.tendermint.com/master/spec/p2p/](https://docs.tendermint.com/master/spec/p2p/)

##

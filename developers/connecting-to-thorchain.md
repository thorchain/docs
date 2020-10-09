---
description: 'How to connect to Midgard, THORNode and the base Tendermint layer.'
---

# Connecting to THORChain

The active node IP addresses can be queried from this endpoint:

{% tabs %}
{% tab title="TESTNET" %}
[https://testnet-seed.thorchain.info](https://testnet-seed.thorchain.info)
{% endtab %}

{% tab title="CHAOSNET" %}
[https://chaosnet-seed.thorchain.info](https://chaosnet-seed.thorchain.info)
{% endtab %}

{% tab title="MAINNET" %}
[https://seed.thorchain.info](https://seed.thorchain.info)
{% endtab %}
{% endtabs %}

The Network Information comes from three sources:

1. MIDGARD: Consumer information relating to swaps, pools, volume. DeFi dashboards, Wallets, Exchanges will primarily interact with Midgard. 
2. THORNODE: Raw blockchain data relating to the THORChain state machine. THORChain block explorers will query THORChain-specific information here. 
3. TENDERMINT: Tendermint standard data, used by all block explorers to query for base information. 

{% tabs %}
{% tab title="MIDGARD" %}
Midgard returns time-series information regarding the THORChain network, such as volume, pool information, users, liquidity providers and more.

Port: `8080`

RPC Guide:  
[http://&lt;host&gt;:8080/v1/doc](http://<host>:8080/v1/doc)

Port: `8080`

RPC Guide:  
[http://:8080/v1/doc](http://<NODE_IP>:8080/v1/doc)

Example:  
[http://:8080/v1/stats](http://<NODE_IP>:8080/v1/stats)
{% endtab %}

{% tab title="THORNODE" %}
THORNode returns application-specific information regarding the THORChain state machine, such as balances, transactions and more.

Port: `1317`

RPC Guide:  
[https://gitlab.com/thorchain/thornode/-/blob/master/x/thorchain/query/query.go](https://gitlab.com/thorchain/thornode/-/blob/master/x/thorchain/query/query.go)

Example:  
[http://:1317/thorchain/constants](http://<NODE_IP>:1317/thorchain/constants)
{% endtab %}

{% tab title="TENDERMINT" %}
## **RPC**

RPC allows base blockchain information to be returned.

TESTNET Port: `26657`

MAINNET Port: `27147`

RPC Guide:  
[https://docs.tendermint.com/master/rpc/](https://docs.tendermint.com/master/rpc/)

Example:  
[http://:26657/genesis](http://<NODE_IP>:26657/genesis)

## **P2P**

P2P is the network layer between nodes, useful for network debugging.

TESTNET Port: `26656`

MAINNET Port: `27146`

P2P Guide  
[https://docs.tendermint.com/master/spec/p2p/](https://docs.tendermint.com/master/spec/p2p/)
{% endtab %}
{% endtabs %}


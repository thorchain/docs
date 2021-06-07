---
description: 'How to connect to Midgard, THORNode and the base Tendermint layer.'
---

# Connecting to THORChain

The active node IP addresses can be queried from this endpoint:

{% tabs %}
{% tab title="TESTNET" %}
[https://testnet.seed.thorchain.info](https://testnet.seed.thorchain.info)
{% endtab %}

{% tab title="CHAOSNET" %}
[https://seed.thorchain.info](https://testnet-seed.thorchain.info)
{% endtab %}
{% endtabs %}

The Network Information comes from three sources:

1. **MIDGARD**: Consumer information relating to swaps, pools, volume. DeFi dashboards, Wallets, Exchanges will primarily interact with Midgard. 
2. **THORNODE**: Raw blockchain data relating to the THORChain state machine. THORChain block explorers will query THORChain-specific information here. 
3. **TENDERMINT**: Tendermint standard data, used by all block explorers to query for base information. 

{% tabs %}
{% tab title="MIDGARD" %}
Midgard returns time-series information regarding the THORChain network, such as volume, pool information, users, liquidity providers and more.  
  
**Any Node**

Port: `8080`

RPC Guide:  
http://&lt;host&gt;:8080/v2/doc  
  
**Official**

[https://midgard.thorchain.info/v2/doc](https://midgard.thorchain.info/v1/doc)

[https://testnet.midgard.thorchain.info/v2/doc](https://testnet.midgard.thorchain.info/v1/doc)
{% endtab %}

{% tab title="THORNODE" %}
THORNode returns application-specific information regarding the THORChain state machine, such as balances, transactions and more.

**Any Node**

Port: `1317`

RPC Guide:  
http://&lt;host&gt;:1317/thorchain/doc/  
  
**Official**

[https://thornode.thorchain.info/thorchain/doc/](https://thornode.thorchain.info/thorchain/doc/)

[https://testnet.thornode.thorchain.info/thorchain/doc/](https://testnet.thornode.thorchain.info/thorchain/doc/)
{% endtab %}

{% tab title="TENDERMINT" %}
RPC allows base blockchain information to be returned.

**Any Node**

TESTNET Port: `26657`

MAINNET Port: `27147`

RPC Guide:  
[https://v1.cosmos.network/rpc/v0.41.4](https://v1.cosmos.network/rpc/v0.41.4)

  
**Official**

[https://rpc.thorchain.info/genesis](https://rpc.thorchain.info/genesis)

[https://testnet.rpc.thorchain.info/genesis](https://testnet.rpc.thorchain.info/genesis)

## **P2P**

P2P is the network layer between nodes, useful for network debugging.

TESTNET Port: `26656`

MAINNET Port: `27146`

P2P Guide  
[https://docs.tendermint.com/master/spec/p2p/](https://docs.tendermint.com/master/spec/p2p/)
{% endtab %}

{% tab title="CHAIN CLIENTS" %}
Each node allows connecting to its Chain Clients.   
  
**Official**  
https://btc.thorchain.info

https://bch.thorchain.info

https://ltc.thorchain.info

https://bnb.thorchain.info

https://eth.thorchain.info
{% endtab %}
{% endtabs %}




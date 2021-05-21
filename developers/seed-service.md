---
description: The seed services proliferates Node IP addresses
---

# Seed Service

A simple Seed Service is maintained that crawls for active node accounts and their IP addresses. This is then hosted on an endpoint and can be queried. 

{% hint style="warning" %}
The Seed Service only shows active nodes, but it does not proof them. Clients should proof THORNodes by using the `asgardex-midgard` module. 
{% endhint %}

The active node IP addresses can be queried from this endpoint:

{% tabs %}
{% tab title="TESTNET" %}
[https://testnet-seed.thorchain.info](https://testnet-seed.thorchain.info)
{% endtab %}

{% tab title="MAINNET" %}
[https://seed.thorchain.info](https://seed.thorchain.info)
{% endtab %}
{% endtabs %}

## Proofing THORNodes

The security model is always by consensus - the truth is what everyone agrees it is. Any THORNode can attempt to spoof downstream clients and send a fake vault address, but a client can protect themselves against this by checking that at least 1/3rd of Nodes agree. 

The process for this is:

1. Get the full list of active THORNode IPs
2. Retrieve the vault address off at least 1/3rd of them
3. Check for 100% correctness, if incorrect, repeat Step \(2\)
4. If correct, use one of the proofed THORNodes for the next session
5. Repeat Step \(1\) regularly

{% hint style="danger" %}
Wallets and services that are very paranoid should instead run their own THORNode as a non-consensus node and retrieve the vault address directly
{% endhint %}

## Decentralisation Plan

It is possible to host the Seed Service entirely in a web3 smart contract on a censorship-resistant blockchain and clients can use Web3 to query. 


---
description: Alert Channels & Monitoring Software
---

# Alerting

## Community Alert Channels

To listen for update announcements, join the following channels:

* **THORNode Announcements (Telegram)**: [https://t.me/thornode_ann](https://t.me/thornode_ann)
* **THORChain Community Devs (Discord)**: [https://discord.gg/g6Z2whSvGF](https://discord.gg/g6Z2whSvGF)

{% hint style="info" %}
Be sure to use a pseudonym in order to prevent doxxing yourself. Node operators should remain anonymous for the health of the network and your personal/node security.
{% endhint %}

## Vǫrðr 👻

A monitoring application for THORNodes.

> A Vǫrðr or warden is a guardian spirit who will follow the soul of a living person from birth until death.

{% hint style="info" %}
Vǫrðr is a community developed monitoring app for THORNodes. It's fully open-source at [https://github.com/sourcapital/vordr](https://github.com/sourcapital/vordr). This is 3rd party software outside of the scope of THORSec.
{% endhint %}

## Features

* All chains are monitored for `Health` and `Sync Status` every minute
* THORChain version is monitored every minute
* Kubernetes pod restarts are monitored every 5 minutes
* Kubernetes pod logs of all chains are aggregated
* Slash points are monitored every minute
* Jailing is monitored every minute
* Chain observations are monitored every minute

## Supported Chains

| Client   | Chain                                                              |
|----------|--------------------------------------------------------------------|
| Bitcoin  | Bitcoin (BTC), Litecoin (LTC), Bitcoin Cash (BCH), Dogecoin (DOGE) |
| Ethereum | Ethereum (ETH), Avalanche (AVAX)                                   |
| Cosmos   | Cosmos (ATOM), Binance (BNB), THORChain (RUNE)                     |

{% hint style="info" %}
See [https://github.com/sourcapital/vordr#kubernetes](https://github.com/sourcapital/vordr#kubernetes) on how to run Vǫrðr in the Kubernetes cluster.
{% endhint %}

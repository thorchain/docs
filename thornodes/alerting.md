---
description: Alert Channels & Monitoring Software
---

# Alerting

## Community Alert Channels

To listen for update announcements, join the following channels:

* **THORNode Announcements (Telegram)**: [https://t.me/thornode\_ann](https://t.me/thornode\_ann)
* **THORChain Community Devs (Discord)**: [https://discord.gg/g6Z2whSvGF](https://discord.gg/g6Z2whSvGF)

{% hint style="info" %}
Be sure to use a pseudonym in order to prevent doxxing yourself. Node operators should remain anonymous for the health of the network and your personal/node security.
{% endhint %}

[Also see the Prometheus Alerts guide. ](https://gitlab.com/thorchain/devops/node-launcher/-/blob/master/docs/Alerting.md)

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

See [Supported Blockchains](../what-is-thorchain-and-rune.md#supported-blockchains) for the chains THORChain supports. Vǫrðr is third-party software, so check its [README](https://github.com/sourcapital/vordr) for which of those chains it currently monitors.

{% hint style="info" %}
See [https://github.com/sourcapital/vordr#kubernetes](https://github.com/sourcapital/vordr#kubernetes) on how to run Vǫrðr in the Kubernetes cluster.
{% endhint %}

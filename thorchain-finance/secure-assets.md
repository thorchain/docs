---
description: Asset Type to Integrate into the App Layer
---

# Secured Assets

Secure Assets allow L1 tokens to be deposited to THORChain, creating a new native asset, which can be transferred between accounts, over IBC and integrated with CosmWasm smart contracts using standard Cosmos SDK messages. They also replace [Trade Assets](trade-assets.md).

{% hint style="info" %}
See the [Dev Docs ](https://dev.thorchain.org/concepts/secured-assets.html)for a more detailed description.\
Also see [Technology](../technology/) for generic Cosmos information. What notation will they have?
{% endhint %}

### Asset Notation

The [delimiter](../frequently-asked-questions/asset-types.md) for Secured Assets is a dash '-'. \
E.g. `ETH.ETH` is L1. `ETH-ETH` will be a secured asset.&#x20;

While ETH.tc is pictured, that may change to `ETH-ETH`.

## How will Secured Assets Move Between Base and App Layer?

Secured assets are x/bank tokens on the App Layer (Rujira) representing claim to the native asset on base layer (THORChain).

The native asset is secured to and from the app layer with the following flow:&#x20;

### Mint and Burn Secured Assets

Example shows the mint and burn process for BTC

<figure><img src="../.gitbook/assets/image (50).png" alt=""><figcaption></figcaption></figure>

### Swapping Secured Assets

Examples below explain how a user:

1. Swap a Secured Asset (SA)—BTC—to another Secured Asset—ETH
2. Swap a Secured Asset—BTC—to a base asset—ETH

<figure><img src="../.gitbook/assets/image (51).png" alt=""><figcaption></figcaption></figure>

3. Secured Asset Swapping, swalling L1 under the hood

<figure><img src="../.gitbook/assets/image (53).png" alt=""><figcaption></figcaption></figure>

Find more information about [Secured Assets](https://docs.rujira.network/developers/secured-assets) in the Rujira Docs or in the [Dev Docs](https://dev.thorchain.org/concepts/secured-assets.html).

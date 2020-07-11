# Continuous Liquidity Pools

Decentralised exchanges are notorious for having low or zero liquidity to the point where they can be unusable for low liquid pairs. This can also be the case for low-tier centralised exchanges. Solving liquidity has been a large focus for Bancor Network and arguably a successful endeavour.

Bancor introduced the concept of continuous liquidity by using smart tokens and connectors built on smart contracts deployed on Ethereum. Tokens and Ether are held in smart contracts in such a way that they become bonded and are priced according to the ratio at which they are held. Users can send either tokens or ether to these smart contracts and the other asset is emitted according to a slip-factored price, which takes into account the liquidity depth of the pool. As a result, liquidity is “always available” for these tokens. 

THORChain integrates two on-chain liquidity strategies; an adaption of Bancor’s continuous liquidity strategy, the CLP, and on-chain order-book liquidity multiplication adapted from the Komodo blockchain.

The CLP is arguably one of the most important features of THORChain. By building in on-chain liquidity the ecosystem receives the following benefits:

* Provides “always-on” trustless liquidity to all tokens in the ecosystem.
* Improves the user experience for low-liquidity tokens.
* Functions as source of trustless on-chain price feeds to power all aspects of the ecosystem, including advanced trading types.
* Generates arbitrage opportunities, further increasing token liquidity.
* Allows users to trade tokens at trustless prices, without relying on centralised third-parties.
* Provides trustless price-anchors to the Layer 2 Flash Network, allowing instant trading at the layer 2 level.


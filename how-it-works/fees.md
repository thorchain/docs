# Fees

## **Gas and Mining Fees**

Assets are sent out of THORChain for various reasons – when Swappers swap assets, when Liquidity Providers remove assets from a pool etc.

The network helps pay for these outgoing transactions. The payment comes from the external asset pool for each chain. So the BTC pool pays for Bitcoin fees, ETH pool for Ethereum fees etc.

The network sees an outgoing transaction complete and records how much it cost in gas in the external asset. This cost is taken then taken from the external asset pool. Over time this is paid back into these pools from System Income.

## **Network Fee**

The system charges a Network Fee on all transactions. It's a fixed amount. The Network Fee is calculated by taking a bunch of recent gas prices, getting an average, multiplying them by some number.

This makes is possible for THORChain to—

1. avoid dust attacks
2. store up income for after the initial Emission Schedule
3. give the user a stable fee, rather than a dynamic one which changes with the external network's fees

The Network Fee is collected in RUNE and sent to the Protocol Reserve.

If the transaction involves an asset which is not RUNE you pay the Network Fee in the external asset. Then the equivalent is taken from that pool's RUNE supply and added to the Protocol Reserve.

If the transaction is in RUNE then the amount is directly taken in RUNE.

## Slip-Based Fee

Coming soon...


---
description: Transaction Intent, Memos, Refunds and Asset Notation.
---

# Transaction Memos

### Overview

THORChain processes all transactions made to the vault address that it monitors. The address is discovered by clients by querying THORChain (via Midgard).

Transactions to THORChain pass user-intent with the `MEMO` field on their respective chains. The THORChain inspects the transaction object, as well as the `MEMO` in order to process the transaction, so care must be taken to ensure the `MEMO` and the transaction is valid. If not, THORChain will automatically refund (if bad memo).

Each chain will have a unique way of adding state to a transaction. Long assets can be shortened using Asset abbreviations (below) as well as THORNames to reduce the size of destination/affiliate addresses.

### Format

Memos follow the format:

`FUNCTION:PARAM1:PARAM2:PARAM3:PARAM4`

The function is invoked by a string, which in turn calls a particular handler in the state machine. The state machine parses the memo looking for the parameters which is simply decodes from human-readable strings.&#x20;

In addition, some parameters are optional. Simply leave them blank, but retain the `:` separator:

`FUNCTION:PARAM1:PARAM2::`

### Permitted Memos

The following memos are permitted:

### Swap

**`SWAP:ASSET:DESTADDR:LIM:AFFILIATE:FEE`**

| Parameter    | Notes                                                                                                                                       | Alternates/Optional |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `SWAP`       | The swap handler                                                                                                                            | also `s`, `=`       |
| `:ASSET`     | The asset identifier                                                                                                                        |                     |
| `:DESTADDR`  | The destination address to send to                                                                                                          |                     |
| `:LIM`       | The trade limit  ie, set 100000000 to be guaranteed a minimum of 1 full asset. A refund will be executed if the output is below the limit.  | Optional            |
| `:AFFILIATE` | The affiliate address. Must be THORName or THOR Address.                                                                                    | Optional            |
| `:FEE`       | The affiliate fee. Limited from 0 to 1000 Basis Points                                                                                      | Optional            |

**Examples**

**`SWAP:ASSET:DESTADDR`** simply swap

**`=:ASSET:DESTADDR:LIM`** swap with limit

**`s:ASSET:DESTADDR:LIM:AFFILIATE:FEE`** swap with limit and affiliate





{% tabs %}
{% tab title="MULTICHAIN" %}
| Type                    | Payload                                                                                                                    | MEMO                                                                                                                                                     | Expected Outcome                                                                                                              |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **ADD LIQUIDITY**       | <p><strong>AssetChain:</strong><br><code>ASSET</code></p><p><strong>THORChain:</strong></p><p><code>RUNE</code></p>        | <p><strong>AssetChain:</strong></p><p><code>ADD:ASSET:thorAddress</code></p><p><strong>THORChain:</strong></p><p><code>ADD:ASSET:assetAddress</code></p> | Adds into the specified pool symmetrically. The asset that reaches THORChain first is put into "pending".                     |
| **ADD LIQUIDITY-ASSYM** | Either                                                                                                                     | <p><strong>AssetChain:</strong></p><p><code>ADD:ASSET</code></p><p><strong>THORChain:</strong></p><p><code>ADD:ASSET</code></p>                          | Adds into the specified pool asymmetrically.                                                                                  |
| **WITHDRAW**            | <p><strong>AssetChain:</strong><br><code>lowest possible</code></p><p><strong>THORChain:</strong></p><p><code>0</code></p> | <p><code>WITHDRAW:ASSET:PERCENT</code></p><p>Percent is in basis points (0-10000, where 10000=100%)</p>                                                  | Withdraws from a pool                                                                                                         |
| **WITHDRAW-ASSYM**      | <p><strong>AssetChain:</strong><br><code>lowest possible</code></p><p><strong>THORChain:</strong></p><p><code>0</code></p> | <p><code>WITHDRAW:ASSET:PERCENT:ASSET</code></p><p>Withdraw to the corresponding asset (RUNE or ASSET).</p>                                              | Withdraws asymmetrically from a pool                                                                                          |
| **SWAP**                | `Amount to swap`                                                                                                           | ``                                                                                                                                                       | Swaps to asset.                                                                                                               |
| **DONATE** Assets       | `RUNE &`                                                                                                                   | <p>Token</p><p>Can be either.</p>                                                                                                                        | `DONATE:ASSET`                                                                                                                |
| **BOND** **UNBOND**     | Asset to add to bond.                                                                                                      | <p><code>BOND:thornode</code><br><code>UNBOND:thornode:basispoints</code></p>                                                                            | Bond or Unbond to the THORNode                                                                                                |
| **LEAVE**               | None                                                                                                                       | `LEAVE:thornode`                                                                                                                                         | Force a THORNode to be kicked out, never to return. The bond will be returned.                                                |
| **RESERVE**             | RUNE                                                                                                                       | `RESERVE`                                                                                                                                                | Add to the reserve                                                                                                            |
| **OTHER**               | Asset to add to THORChain                                                                                                  | <p><code>noop:novault</code></p><p><code>noop</code></p>                                                                                                 | These are special memos to bump state. Novault means the asset is not credited to the vault, it just fixes insolvency issues. |
{% endtab %}
{% endtabs %}

### Affiliate Fees

Affiliate fees can be taken for either Swaps or Add Liquidity. If it is a swap, it is converted to RUNE and sent to the address. If it is Add Liquidity, the affiliate is added as a LP in the pool alongside their user.

The fee is set in basis points from 0 to 1000 (10%).\
The address for the affiliate MUST be a THORChain address.

**Adjusted Memo**\
`SWAP:ASSET:DESTADDR:LIM:AFFILIATE:FEE`

`ADD:ASSET:AFFILIATE:FEE`

### Refunds

The following are the conditions for refunds:

| Condition                | Notes                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Invalid `MEMO`           | If the `MEMO` is incorrect the user will be refunded.                                                        |
| Invalid Assets           | If the asset for the transaction is incorrect (adding an asset into a wrong pool) the user will be refunded. |
| Invalid Transaction Type | If the user is performing a multi-send vs a send for a particular transaction, they are refunded.            |
| Exceeding Price Limit    | If the final value achieved in a trade differs to expected, they are refunded.                               |

Refunds cost fees to prevent Denial of Service attacks. The user will pay the correct outbound fee for that chain.

### MEMO Alternatives

Alternative MEMO types are available to clients:

| Transaction | Long-form MEMO | Short-form MEMO | Symbol MEMO     |
| ----------- | -------------- | --------------- | --------------- |
| ADD         | `ADD`          | _not supported_ | `+`             |
| WITHDRAW    | `WITHDRAW`     | `wd`            | `-`             |
| SWAP        | `SWAP`         | `s`             | `=`             |
| DONATE      | `DONATE`       | `d`             | _not supported_ |

### Asset Notation

The following is the notation for Assets in THORChain's system:

![](https://docs.google.com/drawings/u/1/d/skidhZPIsMKQ-XWJWb3EJaQ/image?w=698\&h=276\&rev=23\&ac=1\&parent=1ZoJQKvyATQekFbWMk\_rqX96K9BSmCArh9e-A\_g66wDQ)

#### Examples

| Asset         | Notation                                            |
| ------------- | --------------------------------------------------- |
| Bitcoin       | BTC.BTC                                             |
| Ethereum      | ETH.ETH                                             |
| USDT          | ETH.USDT-0xdac17f958d2ee523a2206206994597c13d831ec7 |
| BNB           | BNB.BNB                                             |
| RUNE (BEP2)   | BNB.RUNE-B1A                                        |
| RUNE (NATIVE) | THOR.RUNE                                           |

### Asset Abbreviations

Assets can be abbreviated using fuzzy logic. The following will all be matched appropriately. If there are conflicts then the deepest pool is matched. (To prevent attacks).

| Notation                                            |
| --------------------------------------------------- |
| ETH.USDT                                            |
| ETH.USDT-0xdac1                                     |
| ETH.USDT-0xdac17f958d2ee523a220                     |
| ETH.USDT-0xdac17f958d2ee523a2206206994597c13d831ec7 |

### Mechanism for Transaction Intent <a href="#mechanism-for-transaction-intent" id="mechanism-for-transaction-intent"></a>

| Chain         | Mechanism            | Notes                                                                      |
| ------------- | -------------------- | -------------------------------------------------------------------------- |
| Bitcoin       | OP\_RETURN           | Limited to 80 bytes.                                                       |
| Ethereum      | Smart Contract Input | Use `deposit(vault, asset, amount, memo)` function, where `memo` is string |
| Binance Chain | MEMO                 | Each transaction has an optional memo, limited to 128 bytes.               |
| Monero        | Extra Data           | Each transaction can have attached `extra data` field, that has no limits. |

Each chain will have a unique way of adding state to a transaction. Long assets can be shortened using Asset abbreviations (below) as well as THORNames to reduce the size of destination/affiliate addresses.​ChainMechanismNotesBitcoinOP\_RETURNLimited to 80 bytes.EthereumSmart Contract InputUse `deposit(vault, asset, amount, memo)` function, where `memo` is stringBinance ChainMEMOEach transaction has an optional memo, limited to 128 bytes.MoneroExtra DataEach transaction can have attached `extra data` field, that has no limits.

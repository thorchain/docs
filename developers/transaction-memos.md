---
description: 'Transaction Intent, Memos, Refunds and Asset Notation.'
---

# Transaction Memos

### Overview

THORChain processes all transactions made to the vault address that it monitors. The address is discovered by clients by querying THORChain \(via Midgard\). 

Transactions to THORChain pass user-intent with the `MEMO` field on their respective chains. The THORChain inspects the transaction object, as well as the `MEMO` in order to process the transaction, so care must be taken to ensure the `MEMO` and the transaction is valid. If not, THORChain will automatically refund. 

### Mechanism for Transaction Intent

Each chain will have a unique way of adding state to a transaction. Long assets can be shortened using Asset abbreviations \(below\) as well as THORNames to reduce the size of destination/affiliate addresses.

| Chain | Mechanism | Notes |
| :--- | :--- | :--- |
| Bitcoin | OP\_RETURN | Limited to 80 bytes.  |
| Ethereum | Smart Contract Input | Use  `deposit(vault, asset, amount, memo)` function, where `memo` is string |
| Binance Chain | MEMO | Each transaction has an optional memo, limited to 128 bytes.  |
| Monero | Extra Data | Each transaction can have attached `extra data` field, that has no limits.  |

### Transactions

The following transactions are permitted:

{% tabs %}
{% tab title="MULTICHAIN" %}
<table>
  <thead>
    <tr>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Payload</th>
      <th style="text-align:left">MEMO</th>
      <th style="text-align:left">Expected Outcome</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><b>ADD LIQUIDITY</b>
      </td>
      <td style="text-align:left">
        <p><b>AssetChain:<br /></b><code>ASSET</code>
        </p>
        <p><b>THORChain:</b>
        </p>
        <p><code>RUNE</code>
        </p>
      </td>
      <td style="text-align:left">
        <p><b>AssetChain:</b>
        </p>
        <p><code>ADD:ASSET:thorAddress</code>
        </p>
        <p><b>THORChain:</b>
        </p>
        <p><code>ADD:ASSET:assetAddress</code>
        </p>
      </td>
      <td style="text-align:left">Adds into the specified pool symmetrically. The asset that reaches THORChain
        first is put into &quot;pending&quot;.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>ADD LIQUIDITY-ASSYM</b>
      </td>
      <td style="text-align:left">Either</td>
      <td style="text-align:left">
        <p><b>AssetChain:</b>
        </p>
        <p><code>ADD:ASSET</code>
        </p>
        <p><b>THORChain:</b>
        </p>
        <p><code>ADD:ASSET</code>
        </p>
      </td>
      <td style="text-align:left">Adds into the specified pool asymmetrically.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>WITHDRAW</b>
      </td>
      <td style="text-align:left">
        <p><b>AssetChain:<br /></b><code>lowest possible</code>
        </p>
        <p><b>THORChain:</b>
        </p>
        <p><code>0</code>
        </p>
        <p></p>
      </td>
      <td style="text-align:left">
        <p><code>WITHDRAW:ASSET:PERCENT</code>
        </p>
        <p>Percent is in basis points (0-10000, where 10000=100%)</p>
      </td>
      <td style="text-align:left">Withdraws from a pool</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>WITHDRAW-ASSYM</b>
      </td>
      <td style="text-align:left">
        <p><b>AssetChain:<br /></b><code>lowest possible</code>
        </p>
        <p><b>THORChain:</b>
        </p>
        <p><code>0</code>
        </p>
      </td>
      <td style="text-align:left">
        <p><code>WITHDRAW:ASSET:PERCENT:ASSET</code>
        </p>
        <p>Withdraw to the corresponding asset (RUNE or ASSET).</p>
      </td>
      <td style="text-align:left">Withdraws asymmetrically from a pool</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>SWAP</b>
      </td>
      <td style="text-align:left"><code>Amount to swap</code>
      </td>
      <td style="text-align:left">
        <p><code>SWAP:ASSET:DESTADDR:LIM</code>
        </p>
        <p>Set a destination address to swap and send to someone.
          <br />
        </p>
        <p>Set trade protection. If the value isn&apos;t achieved then it is refunded.
          ie, set 100000000 to be guaranteed a minimum of 1 full asset.</p>
        <p></p>
        <p>If <code>LIM</code> is omitted, then there is no price protection:</p>
        <p> <code>SWAP:ASSET:DESTADDR:</code>
        </p>
      </td>
      <td style="text-align:left">Swaps to asset.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>DONATE</b> Assets</td>
      <td style="text-align:left">
        <p><code>RUNE &amp;| Token</code>
        </p>
        <p>Can be either.</p>
      </td>
      <td style="text-align:left"><code>DONATE:ASSET</code>
      </td>
      <td style="text-align:left">Adds to the pool balances without being credited.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>BOND</b>  <b>UNBOND</b>
      </td>
      <td style="text-align:left">Asset to add to bond.</td>
      <td style="text-align:left">
        <p><code>BOND:thornode</code>
          <br /><code>UNBOND:thornode:basispoints</code>
        </p>
        <p></p>
      </td>
      <td style="text-align:left">Bond or Unbond to the THORNode</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>LEAVE</b>
      </td>
      <td style="text-align:left">None</td>
      <td style="text-align:left"><code>LEAVE:thornode</code>
      </td>
      <td style="text-align:left">Force a THORNode to be kicked out, never to return. The bond will be returned.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>RESERVE</b>
      </td>
      <td style="text-align:left">RUNE</td>
      <td style="text-align:left"><code>RESERVE</code> 
      </td>
      <td style="text-align:left">Add to the reserve</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>OTHER</b>
      </td>
      <td style="text-align:left">Asset to add to THORChain</td>
      <td style="text-align:left">
        <p><code>noop:novault</code>
        </p>
        <p><code>noop</code>
        </p>
      </td>
      <td style="text-align:left">These are special memos to bump state. Novault means the asset is not
        credited to the vault, it just fixes insolvency issues.</td>
    </tr>
  </tbody>
</table>
{% endtab %}
{% endtabs %}

### Affiliate Fees

Affiliate fees can be taken for either Swaps or Add Liquidity. If it is a swap, it is converted to RUNE and sent to the address. If it is Add Liquidity, the affiliate is added as a LP in the pool alongside their user.

The fee is set in basis points from 0 to 1000 \(10%\).   
The address for the affiliate MUST be a THORChain address.   
  
**Adjusted Memo**  
`SWAP:ASSET:DESTADDR:LIM:AFFILIATE:FEE`

`ADD:ASSET:AFFILIATE:FEE`

### Refunds

The following are the conditions for refunds:

| Condition | Notes |
| :--- | :--- |
| Invalid `MEMO` | If the `MEMO` is incorrect the user will be refunded. |
| Invalid Assets | If the asset for the transaction is incorrect \(adding an asset into a wrong pool\) the user will be refunded. |
| Invalid Transaction Type | If the user is performing a multi-send vs a send for a particular transaction, they are refunded. |
| Exceeding Price Limit | If the final value achieved in a trade differs to expected, they are refunded.  |

Refunds cost fees to prevent Denial of Service attacks. The user will pay the correct outbound fee for that chain.

### MEMO Alternatives

Alternative MEMO types are available to clients:

| Transaction | Long-form MEMO | Short-form MEMO | Symbol MEMO |
| :--- | :--- | :--- | :--- |
| ADD | `ADD` | `a` | `+` |
| WITHDRAW | `WITHDRAW` | `wd` | `-` |
| SWAP | `SWAP` | `s` | `=` |
| DONATE | `DONATE` | `d` | `%` |

### Asset Notation

The following is the notation for Assets in THORChain's system:

![](https://docs.google.com/drawings/u/1/d/skidhZPIsMKQ-XWJWb3EJaQ/image?w=698&h=276&rev=23&ac=1&parent=1ZoJQKvyATQekFbWMk_rqX96K9BSmCArh9e-A_g66wDQ)

#### Examples 

| Asset | Notation |
| :--- | :--- |
| Bitcoin | BTC.BTC |
| Ethereum | ETH.ETH |
| USDT | ETH.USDT-0xdac17f958d2ee523a2206206994597c13d831ec7 |
| BNB | BNB.BNB |
| RUNE \(BEP2\) | BNB.RUNE-B1A |
| RUNE \(NATIVE\) | THOR.RUNE |

### Asset Abbreviations

Assets can be abbreviated using fuzzy logic. The following will all be matched appropriately. If there are conflicts then the deepest pool is matched. \(To prevent attacks\). 

| Notation |
| :--- |
| ETH.USDT |
| ETH.USDT-0xdac1 |
| ETH.USDT-0xdac17f958d2ee523a220 |
| ETH.USDT-0xdac17f958d2ee523a2206206994597c13d831ec7 |




---
description: 'Transaction Intent, Memos, Refunds and Asset Notation.'
---

# Transaction Memos

### Overview

THORChain processes all transactions made to the vault address that it monitors. The address is discovered by clients by querying THORChain \(via Midgard\). 

Transactions to THORChain pass user-intent with the `MEMO` field on their respective chains. The THORChain inspects the transaction object, as well as the `MEMO` in order to process the transaction, so care must be taken to ensure the `MEMO` and the transaction is valid. If not, THORChain will automatically refund. 

### Mechanism for Transaction Intent

Each chain will have a unique way of adding state to a transaction:

| Chain | Mechanism | Notes |
| :--- | :--- | :--- |
| Bitcoin | OP\_RETURN | Limited to 80 bytes, long memos need to use two OP\_RETURN outputs. |
| Ethereum | Smart Contract Input | The user can pass in the memo in the `deposit(asset, value, memo)` function, where `memo` is bytes32. This is emitted as an event.  |
| Binance Chain | MEMO | Each transaction has an optional memo, limited to 128 bytes.  |
| Monero | Extra Data | Each transaction can have attached `extra data` field, that has no limits.  |

### Transactions

The following transactions are permitted:

{% tabs %}
{% tab title="SINGLECHAIN" %}
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
      <td style="text-align:left">STAKE</td>
      <td style="text-align:left">
        <p><code>RUNE &amp;| Token</code>
        </p>
        <p>Can be either, or just one side.</p>
      </td>
      <td style="text-align:left"><code>STAKE:ASSET</code>
      </td>
      <td style="text-align:left">Stakes into the specified pool.</td>
    </tr>
    <tr>
      <td style="text-align:left">WITHDRAW</td>
      <td style="text-align:left">
        <p><code>0.00000001 BNB</code>
        </p>
        <p>A non-zero transaction.</p>
      </td>
      <td style="text-align:left">
        <p><code>WITHDRAW:ASSET:PERCENT</code>
        </p>
        <p>Percent is in basis points (0-10000, where 10000=100%)</p>
      </td>
      <td style="text-align:left">Withdraws from a pool</td>
    </tr>
    <tr>
      <td style="text-align:left">SWAP</td>
      <td style="text-align:left">
        <p><code>RUNE || Token</code>
        </p>
        <p>Either/Or</p>
      </td>
      <td style="text-align:left">
        <p><code>SWAP:ASSET:DESTADDR:LIM</code>
        </p>
        <p>Set a destination address to swap and send to someone. If <code>DESTADDR</code>is
          blank, then it sends back to self:</p>
        <p><code>SWAP:ASSET::LIM</code>
          <br />
        </p>
        <p>Set price protection. If the value isn&apos;t achieved then it is refunded.
          ie, set 10000000 to be garuanteed a minimum of 1 full asset.</p>
        <p></p>
        <p>If <code>LIM</code> is ommitted, then there is no price protection:</p>
        <p> <code>SWAP:ASSET:DESTADDR</code>
        </p>
        <p></p>
        <p>If both are ommitted then the format is:</p>
        <p> <code>SWAP:ASSET</code>
        </p>
      </td>
      <td style="text-align:left">Swaps to token.</td>
    </tr>
    <tr>
      <td style="text-align:left">ADD Assets</td>
      <td style="text-align:left">
        <p><code>RUNE &amp;| Token</code>
        </p>
        <p>Can be either, or just one side.</p>
      </td>
      <td style="text-align:left"><code>ADD:ASSET</code>
      </td>
      <td style="text-align:left">Adds to the pool balances without being credited.</td>
    </tr>
  </tbody>
</table>
{% endtab %}

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
        <p><code>ADD:ASSET:THOR-ADDRESS</code><b>THORChain:</b><code>ADD:ASSET:ASSET-ADDRESS</code>
        </p>
      </td>
      <td style="text-align:left">Adds into the specified pool.</td>
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
      <td style="text-align:left"><b>SWAP</b>
      </td>
      <td style="text-align:left"><code>Amout to swap</code>
      </td>
      <td style="text-align:left">
        <p><code>SWAP:ASSET:DESTADDR:LIM</code>
        </p>
        <p>Set a destination address to swap and send to someone. If <code>DESTADDR</code>is
          blank, then it sends back to self:</p>
        <p><code>SWAP:ASSET::LIM</code>
          <br />
        </p>
        <p>Set trade protection. If the value isn&apos;t achieved then it is refunded.
          ie, set 10000000 to be garuanteed a minimum of 1 full asset.</p>
        <p></p>
        <p>If <code>LIM</code> is ommitted, then there is no price protection:</p>
        <p> <code>SWAP:ASSET:DESTADDR:</code>
        </p>
        <p></p>
        <p>If both are ommitted then the format is:</p>
        <p> <code>SWAP:ASSET</code>
        </p>
      </td>
      <td style="text-align:left">Swaps to token.</td>
    </tr>
    <tr>
      <td style="text-align:left">DONATE Assets</td>
      <td style="text-align:left">
        <p><code>RUNE &amp;| Token</code>
        </p>
        <p>Can be either.</p>
      </td>
      <td style="text-align:left"><code>DONATE:ASSET</code>
      </td>
      <td style="text-align:left">Adds to the pool balances without being credited.</td>
    </tr>
  </tbody>
</table>
{% endtab %}
{% endtabs %}

|  |
| :--- |


### Refunds

The following are the conditions for refunds:

| Condition | Notes |
| :--- | :--- |
| Invalid `MEMO` | If the `MEMO` is incorrect the user will be refunded. |
| Invalid Assets | If the asset for the transaction is incorrect \(staking an asset into a wrong pool\) the user will be refunded. |
| Invalid Transaction Type | If the user is performing a multi-send vs a send for a particular transaction, they are refunded. |
| Exceeding Price Limit | If the final value achieved in a trade differs to expected, they are refunded.  |

Refunds cost fees to prevent Denial of Service attacks:

| Asset | Amount |
| :--- | :--- |
| RUNE | 1 RUNE |
| Non-RUNE Asset | 1 RUNE equivalent |

### MEMO Alternatives

Alternative MEMO types are available to clients:

| Transaction | Long-form MEMO | Short-form MEMO | Symbol MEMO |
| :--- | :--- | :--- | :--- |
| STAKE | `STAKE` | `st` | `+` |
| WITHDRAW | `WITHDRAW` | `wd` | `-` |
| SWAP | `SWAP` | `s` | `=` |
| ADD | `ADD` | `a` | `%` |

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


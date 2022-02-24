---
description: This page describes how ETH and EVM chains are implemented
---

# EVM Chains

## Chain Client

Example for Ethereum.

#### Observer And Signer:

{% embed url="https://gitlab.com/thorchain/thornode/-/blob/develop/bifrost/pkg/chainclients/ethereum/ethereum.go" %}

### Router

The EVM Bifrost is different to others in that it uses a `router` to handle deposits into and out of THORChain vaults. The Router is just a means for capturing token deposits and emitting `memos`. 

The Router holds all ERC20s, but forwards ETH to the TSS vault. This allows the TSS Vault to call into the Router and pay gas to move token allowances to vaults. 

Instead of paying ERC20s to vault addresses, an `allowance` to spend is given on the Router. The depositing user gives this allowance to the Asgard vault, which itself moves the allowance to each Ygg vault. Thus each Ygg vault can call into the Router to transfer out inside their allowances. This is a very gas-efficient way of achieving vault funding. 

Additionally because of this, the Router is a permissionless contract with no special privileges \(there is no `owner`\). 

{% hint style="info" %}
The Router is necessary because the ERC20 standard has no "push" functionality, and no ability to attach native memos. The Router uses the transferFrom "pull" and emits an event with a memo string.  
{% endhint %}

{% hint style="warning" %}
The V3 Router uses solidity `.Send()` to transfer ETH assets outbound. When an outbound ETH tx is sent to a contract, it must complete execution with only 2300 Gas. If the recipient runs out of Gas, the network still considers the payment sent. Developers of THORChain UI's should check recipient ETH addresses for the presence of code and warn users who may have complex fallback functions that their payment may not succeed, and they could lose funds. Geth `eth.getCode("0xaddress")` may be useful.
{% endhint %}

### Scanning Blocks

The block scanner monitors the Router events, and can create a witness transaction based on this event. 



### Confirmation Counting

Incomings are "conf-counted"


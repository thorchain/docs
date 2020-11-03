---
description: How to join THORChain as an Node.
---

# Joining

## **Joining THORChain**

Now that you have a THORNode deployed in your Kubernetes cluster, you need to start operating your node to join the network.

There are a couple of steps to follow to do so.

### 1. Check your current node status

The first step would be to make sure your deployment was successful and your node is running correctly. _\*\*_To check the current status of your node, you can run the command status from the `node-launcher`repository on your terminal:

```text
make status
```

You will get an output along those lines, the example below is for a testnet node:

```text
THORNode Status
Address   thor1t5jq5dk9d7fj5xfmkrwjn482m0drc7v6fjsmjr
IP
Version   0.0.0
API       http://:1317
RPC       http://:26657
Midgard   http://:8080
Vault BNB Bond Address tbnb1028va9y3ay4a0fpg983gxaen8w5fhr0080fwvn
Preflight {"error":"internal error"}
```

Your node is running but as you can see in the \`Preflight\` section, your node is not yet ready to be churned in and currently is in standby status, since your node has no IP address setup yet.

But to be able to set up the node IP address, you first need to get it registered in the chain by sending your BOND.

{% hint style="warning" %}
Before sending the BOND, verify that your THORNode is fully synced with connected chains. Connected chains such as Bitcoin, may take a day to sync. If you join THORChain without fully syncing a connected chain, you will immediately get slashed for missing observations, and lose money.
{% endhint %}

### 2 - Send BOND

1\) Get the Vault BNB address from the `make status` comman

2\) Send your BOND to this vault address using the memo `BOND:<thornode-address>`.

{% hint style="danger" %}
**This is a significant quantity of funds!**

1. You should practice this first on Testnet.
2. **THE ADDRESS RETURNED MAY BE FAKE** - you could be spoofed from a compromised binary. Verify the Bond Address yourself - it is the primary Asgard Vault on THORChain. `http://host:8080/v1/thorchain/pool_addresses`
3. You should send a test transaction of 10 RUNE and wait for the system to pick it up and record your bond in `make status`
4. You should have your bond on a secure hardware device and send from that. This ensures your bond is administrated by an offline, secure device.
{% endhint %}

![Bonding 10k RUNE](../.gitbook/assets/image%20%2824%29.png)

{% hint style="danger" %}
**TRIPLE CHECK YOU ARE SENDING TO THE RIGHT ADDRESS**

**The vault frequently churns so you may send to a stale vault.**

If your node is still syncing, the `make status` command may give you a stale vault address and your funds will be forever lost.

Confirm the VAULT address from \*multiple\* sources. Do not get this wrong.

1. Did you test with a small amount first and get a refund?
2. Did you check this address manually by querying a THORNode?

   `http://host:1317/thorchain/pool_addresses`

3. Did you check this address in a Binance Chain explorer and see the presence of all the current Asgard Funds?
{% endhint %}

{% hint style="warning" %}
Don't forget to add the BONDING MEMO!!!
`BOND:<thornode-address>`
{% endhint %}

Give the network 10-15 seconds to pick up your bond. To verify it has received your bond, run the following:

```text
curl https://testnet-seed.thorchain.info --> returns active nodes
curl http://<host>:1317/thorchain/nodeaccount/<node-address>
```

![](../.gitbook/assets/image%20%2818%29.png)

If you run `make status` again, you should see this:

```text
Address   thor1ryr5eancepklax5am8mdpkx6mr0rg4xjnjx6zz
IP
Version   0.1.0
API       http://:1317
RPC       http://:26657
Midgard   http://:8080
Vault BNB Bond Address tbnb14z64mhgsnlayj28llzyehq7uh9e9u2ec2jzysu
Preflight {
    "status": "standby",
    "reason": "node account has invalid registered IP address",
    "code": "1"
}
```

As you can see, it is in standby but does not have an IP registered yet. This is needed for peer discovery.

### 3 - Setup Node IP Address

You must tell THORChain your IP-Address for it's address book and seed-service to run properly:

```text
make set-ip-address
```

If you run the status command again, you should now see a different message for the Preflight section saying you need to set your node keys.

![](../.gitbook/assets/image%20%2817%29.png)

{% hint style="info" %}
Once your IP address has been registered for discovery, you can use your own host for queries.
{% endhint %}

### 4 - Setup Node keys

Tell THORChain about your public keys for signing sessions:

```text
make set-node-keys
```

If you run the status command again, you should now see that your node is in status “ready” and is now ready to be churned in the next rotation. Example of a valid preflight:

![](../.gitbook/assets/image%20%2821%29.png)

### 5 - Set Version

Make sure your node broadcasts its latest version, else you won't churn in since THORChain enforces a version requirement. This version will appear in your `make status`. If you are on `0.0.0` then you haven't set your version:

```text
make set-version
```

## Bonding The Right Amount

Although your node is ready to be churned in, it doesn’t mean it will be the next one to be selected since someone else could have posted a higher bond than you. To maximise changes of a quick entry, monitor Midgard to see what everyone else is bonding and try to outbid them. Keep an eye on `maximumStandbyBond` and make sure you are bonding that amount.

```text
curl http://52.221.153.64:8080/v1/network | json_pp

resp:
 "bondMetrics" : {
      "minimumActiveBond" : "10001000000000",
      "medianStandbyBond" : "1010000000000",
      "medianActiveBond" : "15001000000000",
      "averageStandbyBond" : "1010000000000",
      "maximumActiveBond" : "15001000000000",
      "averageActiveBond" : "12006800000000",
      "maximumStandbyBond" : "1010000000000",
      "totalStandbyBond" : "1010000000000",
      "totalActiveBond" : "60034000000000",
      "minimumStandbyBond" : "1010000000000"
   }
```

The endpoint will show data on average, median, total, minimum and maximum bond amounts. For fastest entry, bond higher than the current maximum.

{% hint style="info" %}
RUNE is always displayed in 1e8 format, 100000000 = 1 RUNE
{% endhint %}

### Bonding More

At any time during standby, you can bond more by making an additional BOND transaction with memo:

`BOND:<thornode-address>`

You can also [remove some of your bond](https://docs.thorchain.org/thornodes/leaving) whilst you are on standby, using the UNBOND memo.

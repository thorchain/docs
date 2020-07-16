---
description: How to join THORChain as an Node.
---

# Joining

## **Joining THORChain** 

Now that you have a THORNode deployed in your Kubernetes cluster, you need to start operating your node to join the network.

There are a couple of steps to follow to do so.

### 1. Check your current node status

The first step would be to make sure your deployment was successful and your node is running correctly. ****To check the current status of your node, you can run the command status from the `helm-charts`repository on your terminal:

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

You can verify the sync status by loading the Grafana Dashboard, and navigating to view sync status of connected chains. 

```text
make grafana
```

More info is at the [Metrics Section](https://docs.thorchain.org/thornodes/managing#access-metrics).

### 2 - Send BOND

From the previous status command, you got the current Vault BNB address from the chain:

```text
Vault BNB Bond Address tbnb1028va9y3ay4a0fpg983gxaen8w5fhr0080fwvn
```

You need to send your BOND on the chain to this address using the memo `BOND:<node-address>`.

{% hint style="danger" %}
**This is a significant quantity of funds!**

1. You should practice this first on Testnet.
2. **THE ADDRESS ABOVE MAY BE FAKE** - you could be spoofed from a compromised binary. Verify the Bond Address yourself - it is the primary Asgard Vault on THORChain. 
3. You should send a test transaction of 10 RUNE and wait for the system to pick it up and refund you, since it is less than the minimum of 1,000,000 RUNE. \(Anything less than 1 RUNE won't result in a refund, since it will consume it all in fees\). 
4. You should have your bond on a secure hardware device and send from that. This ensures your bond is administrated by an offline, secure device. 
{% endhint %}

![Bonding 10k RUNE](../.gitbook/assets/image%20%2822%29.png)

Give the network at least a minute to pick up your bond.

```text
curl https://testnet-seed.thorchain.info --> returns active nodes
curl http://<IP>:1317/thorchain/nodeaccount/<node-address>
```

![](../.gitbook/assets/image%20%2817%29.png)

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

To set up your node IP address automatically using the load balancer that was created just run the command:

```text
make set-ip-address
```

If you run the status command again, you should now see a different message for the Preflight section saying you need to set your node keys.

### 4 - Setup Node keys

To set up your node keys automatically, just run the command:

```text
make set-node-keys
```

If you run the status command again, you should now see that your node is in status “ready” and is now ready to be churned in the next rotation. Example of a valid preflight:

```text
Preflight { "status": "ready", "reason": "OK", "code": "0" }
```

## Bonding The Right Amount

Although your node is ready to be churned in, it doesn’t mean it will be the next one to be selected since someone else could have posted a higher bond than you. To maximise changes of a quick entry, monitor Midgard to see what everyone else is bonding and try to outbid them:

```text
http://<IP-ADDRESS>:8080/v1/network

resp:
 "bondMetrics": {
        "averageActiveBond": "150000000000000",
        "averageStandbyBond": "150000000000000",
        "maximumActiveBond": "200000000000000",
        "maximumStandbyBond": "200000000000000",
        "medianActiveBond": "175000000000000",
        "medianStandbyBond": "175000000000000",
        "minimumActiveBond": "120000000000000",
        "minimumStandbyBond": "120000000000000",
        "totalActiveBond": "1500000000000000",
        "totalStandbyBond": "450000000000000"
    },
```

The endpoint will show data on average, median, total, minimum and maximum bond amounts. For fastest entry, bond higher than the current maximum. 

### Bonding More

At any time during standby, you can bond more by making an additional BOND transaction with memo:

`BOND:thor1ryr5eancepklax5am8mdpkx6mr0rg4xjnjx6zz`

You can also [remove some of your bond](https://docs.thorchain.org/thornodes/leaving) whilst you are on standby, using the UNBOND memo. 


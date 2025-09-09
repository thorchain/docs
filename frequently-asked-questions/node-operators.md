---
description: FAQ on how to run THORChain as a node operator
---

# Node Operators

This FAQ is designed to help node operators coming to THORChain to set up and manage their nodes effectively on THORChain. Below you’ll find answers to common questions, key tips, and important warnings to ensure smooth operation.

### What should I know before setting up and bonding to a node?

Make sure to read and understand the [THORNode Overview](../thornodes/overview/) before you setting up a node.

Make sure you **do not** bond with the validator’s wallet. Unlike other "normal Cosmos chains", the first person to bond to the node owns the node. Ensure that you’re using the correct wallet, as ownership cannot be transferred after the bond.

### How does THORChain handle external updates?

THORChain handles external updates differently compared to Cosmos. When a Cosmos upgrade (e.g., using Gaia CLI or Ignite) occurs, you need to follow the specific THORChain process for node updates. Always refer to the latest node upgrade instructions in the documentation to ensure compatibility.

### What are common mistakes, and how can I avoid them?

Common mistakes include not syncing to the top, going offline unexpectedly which can lead to being slashed for not observing. Regular monitoring, keeping your node updated, and ensuring that it remains synced with the network can help you avoid these issues.

### How is node income calculated and what are the risks and costs?

Node income includes block rewards and swap fees. Network income sent via the Incentive Pendulum and given to Node Operators. Block Reward / Node / Month can be viewed at [https://thorchain.net/network](https://thorchain.net/network), See more under [Risks, Costs and Rewards](../thornodes/overview/risks-costs-and-rewards.md).

Swap fees contribute significantly to node income. To estimate total income per node per month, consider both block rewards and swap fees. See [THORCharts](https://thorcharts.org/thorchain_lp_node_earnings) to see the block reward and swap fee split.

### What is Churning, and how does it affect my node?

Churning is the process by which nodes are rotated in and out of the active validator set. This happens approximately every 2 1/2 days. During a churn event, new nodes may be added to the network while others are removed based on criteria such as bond size, age, and behavior. See more in [Node Operations under Churning](../understanding-thorchain/roles/node-operators.md).

### What should I know about Bond Providers?

Node Operators can invite Bond Providers to contribute to their bond. Up to 10 Bond Providers can be added, and they will earn rewards proportional to their contribution. Operators can set a fee that is deducted from these rewards. Note that only the first wallet that bonds owns the node and can manage these providers. See more in [Pooled THORNodes](../thornodes/pooled-thornodes.md).

### How does early exit work for Bond Providers?

Nodes can manually signal to exit the active validator set during the next churn by sending a `MsgDeposit` with a `LEAVE` memo. During each churn, the lowest bond, worst performer, and the oldest churned-in node get automatically churned out, along with any nodes that request to leave.

Most nodes impose a penalty for bond providers requesting early exit, which results in missed rewards. However, some nodes offer this service without charge. When a node is churned out, it no longer earns rewards, which means bond providers and node operators both miss out on potential earnings. Additionally, a bond provider cannot unbond while the node is active but can add more bond if desired.

Rewards for bond providers are auto-compounded back into their bond with each churn. These rewards remain locked until the node is churned out, at which point the bond providers can unbond and access their funds. Meanwhile, node operators receive their operator fee directly to their wallet each churn. For more details, you can refer to the following resources:

• [THORChain Dev Memo Documentation](https://dev.thorchain.org/concepts/memos.html#bond-unbond-and-leave)

• [Gitlab: Leave Event Keys](https://gitlab.com/thorchain/thornode/-/blob/v1.134.0/x/thorchain/handler_leave.go#L154-155)

• [Gitlab OperationalMimirs](https://gitlab.com/thorchain/thornode/-/blob/v1.134.0/x/thorchain/manager_validator_current.go#L1368-1369)

### Why are there so many slashes, and is it normal?

Slashes can happen for various reasons, including node downtime or failing to observe or sign transactions correctly. While some slashing is normal, consistent slashing could indicate a problem with your setup. Monitoring slash points and correcting any issues immediately is essential.

### Why is Geth being used instead of Argon, given its size?

Geth is used within the [Ethereum Chain Client](https://gitlab.com/thorchain/thornode/-/blob/develop/bifrost/pkg/chainclients/ethereum/ethereum.go) as it provides Go libraires where as Erigon does not provide a native Go interface for embedding directly into Go applications. Node operators should be prepared for the increased resource requirements when using Geth.

### What are the steps to Unbond or Leave a Node?

You can only unbond when your node is in a [Standby state](../thornodes/overview/node-operations.md#node-statuses) and not part of a vault migration. To leave the network permanently, you must issue a LEAVE command and ensure all vaults are empty. See [Leaving ](../thornodes/leaving.md)for more information.

### How do I safely destroy my node after leaving?

After ensuring that your node has successfully churned out and your bond is fully returned, you can destroy your node setup. This involves using specific commands to remove all node resources securely. Destroying a node prematurely can result in significant financial loss. See [Leaving](../thornodes/leaving.md) for more information.

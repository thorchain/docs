---
description: This page describes how to react in a network-wide emergency (funds-at-risk).
---

# 🛑 Emergency Procedures

This document outlines the procedures for Node Operators to respond to network-wide emergencies, such as funds-at-risk scenarios or critical network attacks, on THORChain’s Mainnet. THORChain is a decentralized, permissionless cross-chain liquidity protocol, and Node Operators play a critical role in maintaining network security and integrity. These procedures ensure rapid, coordinated, and secure responses while preserving the network’s impartiality and resistance to capture.

The overarching ethos for THORChain's security posture is "an abundance of caution". **Halt Earn, Halt Often!**

`make pause` is the big red button that stops everything. Node Operators are supported by the community, developers and all stakeholders to `make pause` if there is any doubt. It is easily undone if incorrectly used (Eg: `make resume`)

See the Additional Resources for more in-depth information and guides.

### Key Principles

* **Rapid Response**: Node Operators must act swiftly to secure the network when a funds-at-risk bug or attack is detected.
* **Pseudo-Anonymity**: Operators should avoid revealing personal information, even during emergencies, to maintain network neutrality and security. Use tools like make relay to communicate anonymously via the THORChain Dev Discord. Alternatively, create a burner email and Discord account.
* **Decentralized Governance**: The removal of admin mimir means network decisions, such as halts or parameter changes, are now managed through [node voting](overview/#node-voting) or Mimir overrides initiated by nodes.
* **Mainnet Context**: THORChain operates on Mainnet, with robust mechanisms like node churn, Threshold Signature Scheme (TSS), and Bifrost for cross-chain security.

## Reporting a Bug

If you discover a bug that poses a risk to funds or network stability, follow these steps:

1. **Immediate Notification**: Directly message the THORChain team or admins via the Dev Discord (tag @thorsec if needed) or other secure channels. Alternatively, submit the bug through the formal [Bounty Program](https://gitlab.com/thorchain/thornode/-/blob/develop/bugbounty.md) for evaluation.
2. **Bug Report Details**: Include the following in your report:
   * A clear description of the bug or vulnerability.
   * Steps to reproduce the issue, if applicable.
   * Potential impact (e.g., funds at risk, network disruption).
   * Any relevant logs or evidence from your THORNode.
3. **Bounty Program**: If the bug is verified as critical, you may be eligible for a bounty proportional to its severity. Do not disclose the bug publicly until it is resolved to prevent exploitation.

## Emergency Classifications and Responses

Emergencies are classified based on severity, with corresponding actions for Node Operators:

#### Critical - Funds At Risk

* **Description**: A vulnerability or attack threatens the security of funds in liquidity pools/vaults or anything that poses an existential risk to the protocol.
* **Actions**:
  1. **Initiate Network Halt**: If a critical threat is confirmed, a Node Operator must issue the `make pause` command to halt the entire network. This pauses the entire network for 720 blocks (~1hr) to allow time for investigation and corrective actions such as voting to pause specific chain operations (e.g., [halting signing](https://dev.thorchain.org/concepts/network-halts.html)). `make resume` will reduce the pause period by 720 blocks & another `make pause` will increase the pause by another 720 blocks. Once the first `make pause` is dispatched, the issue is not time critical as the entire network is paused and this paus period can and should be increased as appropriate.
  2. **Node Voting**: Propose and vote on emergency actions, such as Mimir overrides, to adjust network parameters. This will be discussed in the Dev Discord `#mainnet channel` channel. Voting requires consensus among active nodes.
     * Use `thornode tx thorchain mimir <key> <value> --from <node-address>` to submit Mimir changes.
  3. **Monitor and Communicate**: Use monitoring tools like [Vǫrðr](https://github.com/sourcapital/vordr) to check chain health and sync status. Relay critical updates anonymously via `make relay` to the Dev Discord `#mainnet channel`.
  4. **Coordinate with Team**: Work with the core team and other operators to verify the threat and deploy patches. Avoid premature public disclosure to prevent panic or exploitation.

#### Major - Network Disruption (Funds Not At Risk)

* **Description**: A bug or attack disrupts network operations (e.g., chain sync issues, high slash points) but does not directly threaten funds.
* **Actions**:
  1. **Assess Node Status**: Check your node’s health using make status to ensure it is synced and operational. Review slash points and chain sync status via Grafana or Prometheus dashboards.
  2. **Vote on Parameters**: If required, Propose Mimir changes to adjust network parameters (e.g., reduce `ChurnInterval` to stabilize the network).
  3. **Restart Services**: If your node is affected, restart services using `make restart` or reset the node with make reset for unrecoverable issues (note: this is destructive and resets chain data).
  4. **Monitor Logs**: Access logs via Grafana’s Loki interface to diagnose issues. Select the relevant service (e.g., thornode/bifrost) in the Log browser.

#### Minor - No Funds or Network At Risk

* **Description**: Non-critical issues, such as minor performance degradation or isolated node failures.
* **Actions**:
  1. **Diagnose Locally**: Check your node’s metrics (CPU, memory, disk) using Prometheus or Kubernetes dashboards.
  2. **Apply Updates**: Deploy patches or updates to your THORNode services using Helm charts from the node-launcher repository.
  3. **Report**: Inform the team via Discord or the Bounty Program for tracking and future improvements. Alternatively, raise an issue within the THORChain [Thornode ](https://gitlab.com/thorchain/thornode)or [NodeLauncher ](https://gitlab.com/thorchain/devops/node-launcher)repositories.&#x20;

## Network Halts

In addition to the network wide pausing via the `make pause` command, THORChain supports blockchain specitic halts to pause operations during critical emergencies:

* **Initiating a Halt**: [Node voting](overview/#node-voting) to pause signing for a specific chain (e.g., BTC, ETH). This prevents outbound transactions until the issue is resolved. All Halt controls are [listed here](https://dev.thorchain.org/concepts/network-halts.html).
* **Voting on Halts**: Nodes can vote to approve or extend halts via the node voting mechanism. A supermajority is required for consensus.
* **Resuming Operations**: Once the threat is mitigated, nodes vote to lift the halt using Mimir overrides or resume normal operations.

## Monitoring and Recovery

* **Monitoring Tools**: Use [Vǫrðr](https://github.com/sourcapital/vordr) for real-time chain health and sync status monitoring. Deploy Prometheus and Grafana for detailed metrics on node performance and network status.
* **Backups**: Ensure your THORNode’s persistent volumes are backed up via your Kubernetes provider (e.g., AWS, Google Cloud or bare-metal). Regularly verify backups to protect against data loss.
* **Recovery**: In case of node failure, restore from backups or resync your node. Avoid using `make reset or hard-reset-thornodes` unless absolutely necessary, as it deletes chain data.&#x20;

## Network Upgrades

Network upgrades are critical for patching vulnerabilities, addition capabilities or improving protocol performance during emergencies. All active nodes must run the updated version for the network to proceed with an upgrade. The process can be managed in three ways:

* **Natural Upgrade**: Versions are proposed in the Dev Discord for a certain block height, nodes follow instructions to signal support, at the block height the network stops for nodes to update their software, and the network naturally resumes when >2/3 of nodes adopt the newest version. Node with older versions are churned out via the regular churn process.
* **Assertive Upgrade**: Once a supermajority of nodes has upgraded, demonstrating acceptance, operators can vote to ban nodes running outdated versions. Banned nodes are churned out, removed from the Threshold Signature Scheme (TSS), and ejected from the consensus set. These nodes must fully leave, destroy their setup, and redeploy a new node to rejoin.
  * Use node voting (Node Voting) to propose and approve banning outdated nodes.
* **Forced Upgrade (Hard Fork)**: In time-critical scenarios, a hard fork may be initiated to exclude old nodes. This carries significant risks, such as consensus failures or network instability, and should be a last resort.
  * Coordinate via the Dev Discord and use Alerting for THORNodes to monitor fork outcomes.
    
* **Best Practices for Upgrades**:
  * Deploy updates using Helm charts from the Node Launcher Repository.
  * Ensure backups are current before upgrading, as described in Restore Validator Backup and THORNode Snapshot Recovery and Storage Management.
  * Monitor node sync and health post-upgrade using Vǫrðr Monitoring and Prometheus dashboards.
  * Verify multi-validator cluster stability if applicable, as outlined in Multi-Validator Cluster Setup.

## Best Practices

* **Stay Synced**: Ensure your node is fully synced with all connected chains (e.g., Bitcoin, Ethereum) before taking action. Unsynchronized nodes may accrue slash points.
* **Secure Keys**: Protect your operator key and node mnemonic. Loss of the operator key results in loss of bond access, and loss of the validator key may brick your node.
* **Regular Updates**: Keep your THORNode software and Helm charts up to date using the node-launcher repository.
* **Community Coordination**: Engage with other operators and the core team via the Dev Discord or Community Telegram for real-time collaboration.

## Additional Resources

* [Network Halts](https://dev.thorchain.org/concepts/network-halts.html)
* [Alerting for THORNodes](https://gitlab.com/thorchain/devops/node-launcher/-/blob/master/docs/Alerting.md?ref_type=heads)
* [Multi-Validator Cluster Setup](https://gitlab.com/thorchain/devops/node-launcher/-/blob/master/docs/Multi-Validator-Cluster.md?ref_type=heads)
* [Restore Validator Backup](https://gitlab.com/thorchain/devops/node-launcher/-/blob/master/docs/Restore-Validator-Backup.md?ref_type=heads)
* [THORNode Snapshot Recovery and Storage Management](https://gitlab.com/thorchain/devops/node-launcher/-/blob/master/docs/Thornode-Snapshot-Recovery-and-Storage-Management.md?ref_type=heads)
* [Node Voting](overview/#node-voting)
* [THORNode Stack](overview/thornode-stack.md)
* [Vǫrðr Monitoring](https://github.com/sourcapital/vordr)
* [Node Launcher Repository](https://gitlab.com/thorchain/devops/node-launcher) (For THORNode deployment)
* [THORNode Repository](https://gitlab.com/thorchain/thornode) (For THORNode Sofware)

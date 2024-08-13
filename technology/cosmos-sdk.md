---
description: How THORChain has configured the CosmWasm module
---

# Cosmos SDK

The [Cosmos SDK](https://github.com/cosmos/cosmos-sdk) is an open-source toolkit for building multi-asset public Proof-of-Stake (PoS) blockchains, like the Cosmos Hub, as well as permissioned Proof-of-Authority (PoA) blockchains. Blockchains built with the Cosmos SDK are generally referred to as application-specific blockchains, like THORChain. There are multiple benefits from building an application-specific blockchain using the Cosmos SDK:

* Flexibility
* Performance
* Security
* Sovereignty

### Flexibility

THORChain offers developers maximum flexibility:

* Programming Language Choice: Developers can use the programming language they prefer for building the state-machine, thanks to the ABCI (Application Blockchain Interface).
* Framework Selection: Various frameworks are available, such as the Cosmos SDK (in Golang) or Lotion (in JavaScript), allowing developers to choose based on their preferred language.
* Customizable Consensus Engines: Developers can swap or tweak the consensus engine to better suit their needs. Currently, CometBFT is production-ready, but more options will emerge in the future.
* Tradeoff Exploration: Developers can adjust parameters like the number of validators vs. transaction throughput, or choose different storage models like DB or IAVL tree.
* Automated Logic Execution: The Cosmos SDK enables automatic execution of code at the beginning and end of each block, providing further customization.
* Cryptographic Flexibility: Developers are free to choose their cryptographic libraries, avoiding constraints imposed by underlying environments in virtual-machine blockchains.

This flexibility allows developers to create optimized, tailored solutions for THORChain, enhancing overall performance and adaptability.

### Performance

THORChain, being an application-specific blockchain, provides several performance advantages:

* Efficient Consensus: Using a consensus engine like CometBFT BFT offers higher throughput compared to Proof-of-Work blockchains.
* Focused Resources: THORChain operates a single application, eliminating competition for computation and storage resources seen in non-sharded virtual-machine blockchains.
* Reduced Complexity: Avoiding the need for a virtual-machine to interpret transactions significantly lowers computational complexity and boosts performance.

### Security

Application-specific blockchains like THORChain enhance security in several ways:

* Proven Languages: Developers can use established programming languages like Go, which are more mature than many smart contract languages.
* Custom Cryptography: Developers can implement well-audited crypto libraries, rather than relying on the limited functions available in virtual-machines.
* Simplified Security: By eliminating the complexities of a virtual-machine, developers can more easily ensure the security of their application.

### Sovereignty

One of the major benefits of THORChain as an application-specific blockchain is sovereignty:

* Full Control: Stakeholders have complete control over the chain, ensuring that governance and application requirements are aligned.
* Responsive Upgrades: If bugs are found or new features are needed, the community can quickly act without waiting for the broader blockchain’s consensus.
* Community Alignment: The community governing THORChain is directly aligned with the application’s stakeholders, providing a streamlined and responsive governance process.



You can find more information about CosmWasm in their official [docs](https://docs.cosmos.network/).

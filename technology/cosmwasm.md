---
description: How THORChain has configured the CosmWasm module
---

# CosmWasm

CosmWasm is a smart contracting platform built for blockchains that uses the Cosmos SDK, Simply put, it's the Cosmos (Cosm) way of using WebAssembly (Wasm) hence the name.

[Rust](https://www.rust-lang.org/) is currently the most used programming language for CosmWasm, in the future, it is possible to have different programming languages like [AssemblyScript](https://www.assemblyscript.org/) and Go.

### CosmWasm Contracts on THORCHain

There would be a module placed into TC called `x/wasm` and self-executing `.rs` contracts are placed in it. These "contracts" would be whitelisted in via developers because they would go in via the 2-weekly upgrade cycle. They would be rolled out on stagenet for testing first, then flagged on mainnet after sometime.

### Tokens

All native tokens on THORChain listed [here](https://thornode.ninerealms.com/cosmos/bank/v1beta1/supply) would be supported in the Wasm TokenFactory (a wrapper that can push them into the WASM layer).

Derived assets `TOR` and L1 `RUNE` will work easily. Notably, trade assets are missing because they are not assets, they are deposit slips.



You can find more information about CosmWasm in their official [docs](https://docs.cosmwasm.com/docs/).

```
```

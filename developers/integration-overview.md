# Integration Overview

## General Principles

### Read Only Applications

1. Connect to Midgard to get rich data about the system, included time-series graphs and aggregated values like TotalVolume etc. 
2. Connect to THORNode \(or proxied via Midgard\) to drill into the state-machine and access the current state \(or historical just by adding a `?height=1234` to specify a certain height. 
3. Connect to RPC to get information about the Ledger, which is not specific to THORChain, such as `/genesis` or account/transaction information

### Write Applications

These applications require first-principle thinking.   


1. Connect to a trusted THORNode or connect to several public THORNodes and ensure they all agree
2. Get the \`/in

First, you need to connect to THORChain. You can use the official clients which have SSL, or run your own node, host it on SSL and you will be able to access a `thornode` `midgard` and `rpc`

If you don't need SSL, you can connect to any of the non-SSL public nodes \(ie, just their IP address\).   
  
Once you connect to THORChain, the most important things are the `/inbound_addresses` and the `/pools`   
  



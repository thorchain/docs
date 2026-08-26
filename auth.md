# Auth.md

## Public access

The THORChain documentation is public. Reading its HTML pages, Markdown representations, `llms.txt`, `llms-full.txt`, and documentation MCP server does not require credentials.

## Agent access

Agents do not need to register or provision an account. The supported access methods are unauthenticated HTTPS `GET` and `HEAD` requests for documentation, plus unauthenticated MCP JSON-RPC requests to the documentation MCP endpoint.

Do not send bearer tokens, API keys, wallet credentials, or signing secrets to this documentation service.

## Documentation MCP

- Endpoint: `https://docs.thorchain.org/~gitbook/mcp`
- Transport: Streamable HTTP
- Authentication: none
- Intended use: read-only documentation discovery, search, and retrieval

Clients should initialize the MCP session and discover the available tools through the MCP protocol. Tool availability may change when GitBook updates the published documentation service.

## Public network APIs

The documentation links to public THORNode and Midgard read endpoints. Public gateways may enforce rate limits, change availability, or return network state that changes between requests. Production applications should operate their own infrastructure or use an explicitly supported provider.

## Safety

- Never provide a seed phrase, mnemonic, private key, or signing secret to the documentation site or documentation MCP server.
- Treat documentation as guidance, not as authorization to sign or broadcast a transaction.
- Confirm the network, asset, address, memo, amount, fees, and expiry before asking a wallet to sign.
- Require explicit human confirmation before any state-changing or value-moving action.

## OAuth metadata

This public documentation service does not advertise OAuth or OpenID Connect metadata because it is not an OAuth-protected resource.

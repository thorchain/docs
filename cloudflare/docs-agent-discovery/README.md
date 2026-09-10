# docs.thorchain.org agent discovery Worker

This Worker adds machine-readable discovery without changing GitBook page bodies.

It serves only the documented discovery files, `auth.md`, and `AGENTS.md`; unknown paths pass through to GitBook. The production route set is intentionally limited to the homepage and those exact discovery paths.

## Verify

Run `npm test` in this directory. Before production routing, verify a versioned Preview URL for:

- Homepage body equivalence and the `Link` response header.
- API catalog media type and Linkset structure.
- MCP card fields against a live MCP initialization response.
- Agent skill digest equality.
- ARD catalog structure and CORS.
- Unknown-path and MCP POST pass-through behavior.

## Rollback

Remove only the four routes declared in `wrangler.jsonc`. The GitBook CNAME remains unchanged, so removing the routes immediately returns traffic to the prior origin behavior. Keep the Worker version available until post-rollback checks pass.

Delete only the SVCB record declared in `dns-aid-record.json` to roll back DNS-AID. Its TTL is 300 seconds.

## Production verification

The Worker routes and DNS-AID record were activated on 2026-08-26 after the versioned Preview URL passed the public scanner at Level 4. Post-deployment checks confirmed:

- The homepage body SHA-256 remained unchanged.
- HTML and Markdown homepage responses remained available.
- Representative ordinary documentation routes and `robots.txt` remained available.
- MCP initialization still returned protocol version `2025-06-18` with the verified server identity and tool capability.
- The published Agent Skill digest matched the served bytes.
- Cloudflare and Google resolvers returned `AD=true` for the DNS-AID SVCB record.
- A fresh production scan classified the site as Level 4, `Agent-Integrated`.

OAuth, A2A, registration, WebMCP, and payment metadata remain absent because this public documentation service does not provide those capabilities.

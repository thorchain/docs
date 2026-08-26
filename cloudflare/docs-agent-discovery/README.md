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

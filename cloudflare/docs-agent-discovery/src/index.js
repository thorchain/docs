export const ORIGIN = "https://docs.thorchain.org";

export const AUTH_MD = `# Auth.md

## Public access

The THORChain documentation is public. Reading its HTML pages, Markdown representations, \`llms.txt\`, \`llms-full.txt\`, and documentation MCP server does not require credentials.

## Agent access

Agents do not need to register or provision an account. The supported access methods are unauthenticated HTTPS \`GET\` and \`HEAD\` requests for documentation, plus unauthenticated MCP JSON-RPC requests to the documentation MCP endpoint.

Do not send bearer tokens, API keys, wallet credentials, or signing secrets to this documentation service.

## Documentation MCP

- Endpoint: \`https://docs.thorchain.org/~gitbook/mcp\`
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
`;

export const AGENTS_MD = `# THORChain Documentation Agent Instructions

## Purpose

Use this site to research THORChain concepts, node operations, integrations, and public API behavior.

## Source priority

Prefer evidence in this order:

1. Current live network responses.
2. Current official THORChain documentation.
3. Current THORChain source code and release notes.
4. Third-party gateway behavior.
5. Assumptions.

State clearly when information is historical, deprecated, inferred, or unverified.

## Safe behavior

- Default to read-only requests.
- Never request, store, reveal, or transmit seed phrases, mnemonics, private keys, or signing secrets.
- Never sign or broadcast a transaction without explicit user approval.
- Before presenting a transaction for signature, show the network, asset, destination, memo, amount, fees, expiry, and expected effect.
- Treat public gateway responses as observations, not as a guarantee of future state.
- Identify deprecated features and do not recommend them as current functionality.

## Retrieval

- Request any documentation page with \`Accept: text/markdown\` when Markdown is preferred.
- Start broad research with \`https://docs.thorchain.org/llms.txt\`.
- Use \`https://docs.thorchain.org/llms-full.txt\` only when the larger corpus is necessary.
- Use the read-only MCP endpoint at \`https://docs.thorchain.org/~gitbook/mcp\` for documentation queries.

## Answer quality

- Cite the exact documentation page used.
- Separate protocol rules from wallet, interface, or infrastructure-provider behavior.
- Include the observation time when reporting live network state.
- If sources conflict, show the conflict instead of silently choosing one.
`;

export const SKILL_MD = `---
name: thorchain-docs-research
description: Research THORChain using official documentation and read-only public interfaces. Use for protocol concepts, integrations, node operations, public API discovery, and evidence-backed THORChain answers.
---

# THORChain Documentation Research

## Goal

Answer THORChain questions with current, traceable evidence while avoiding unsafe transaction or key-handling behavior.

## Workflow

1. Start with \`https://docs.thorchain.org/llms.txt\` to locate the relevant official page.
2. Fetch the selected page with \`Accept: text/markdown\`.
3. Use \`https://docs.thorchain.org/~gitbook/mcp\` when a documentation search or cross-page synthesis is needed.
4. For live state, use a read-only THORNode or Midgard \`GET\` endpoint and record the observation time.
5. Cite the official documentation page and identify any live endpoint used.
6. Separate observed facts, documentation statements, and inferences.

## Safety rules

- Never ask for or handle seed phrases, mnemonics, private keys, or signing secrets.
- Do not sign or broadcast transactions.
- Do not treat third-party gateways as authoritative infrastructure for production.
- Require explicit human review before any value-moving action.
- Flag deprecated features and version-sensitive claims.

## Failure handling

- If a public gateway is unavailable, report that failure and try another documented read-only source.
- If documentation and live behavior conflict, report both with timestamps.
- If the requested action would change state, stop at a reviewable transaction plan.
`;

export const API_CATALOG = {
  linkset: [
    {
      anchor: "https://gateway.liquify.com/chain/thorchain_api/thorchain",
      "service-desc": [
        {
          href: "https://gateway.liquify.com/chain/thorchain_api/thorchain/doc/openapi.yaml",
          type: "application/vnd.oai.openapi;version=3.0",
          title: "THORNode OpenAPI 3.0 description",
        },
      ],
      "service-doc": [
        {
          href: "https://docs.thorchain.org/thornodes/overview.md",
          type: "text/markdown",
          title: "THORNode documentation",
        },
      ],
      status: [
        {
          href: "https://gateway.liquify.com/chain/thorchain_api/thorchain/lastblock",
          type: "application/json",
          title: "THORNode live block status",
        },
      ],
    },
    {
      anchor: "https://gateway.liquify.com/chain/thorchain_midgard/v2",
      "service-desc": [
        {
          href: "https://gateway.liquify.com/chain/thorchain_midgard/v2/swagger.json",
          type: "application/vnd.oai.openapi+json;version=3.0",
          title: "Midgard OpenAPI 3.0 description",
        },
      ],
      "service-doc": [
        {
          href: "https://docs.thorchain.org/technical-documentation/technology/midgard.md",
          type: "text/markdown",
          title: "Midgard documentation",
        },
      ],
      status: [
        {
          href: "https://gateway.liquify.com/chain/thorchain_midgard/v2/health",
          type: "application/json",
          title: "Midgard health",
        },
      ],
    },
  ],
};

export const MCP_SERVER_CARD = {
  version: "1.0",
  protocolVersion: "2025-06-18",
  serverInfo: {
    name: "mcp-typescript server on vercel",
    title: "THORChain Documentation MCP",
    version: "0.1.0",
  },
  description:
    "Read-only search and retrieval for the published THORChain documentation.",
  documentationUrl: `${ORIGIN}/auth.md`,
  transport: {
    type: "streamable-http",
    endpoint: "/~gitbook/mcp",
  },
  capabilities: {
    tools: {
      listChanged: true,
    },
  },
  authentication: {
    required: false,
    schemes: [],
  },
  instructions:
    "Use the server for read-only THORChain documentation research. Discover tools after initialization.",
};

export const ARD_CATALOG = {
  specVersion: "1.0",
  host: {
    displayName: "THORChain Documentation",
    identifier: "did:web:docs.thorchain.org",
  },
  entries: [
    {
      identifier: "urn:air:docs.thorchain.org:server:documentation-mcp",
      displayName: "THORChain Documentation MCP Server",
      type: "application/json",
      url: `${ORIGIN}/.well-known/mcp/server-card.json`,
      representativeQueries: [
        "How does THORChain execute native cross-chain swaps?",
        "What are the requirements for operating a THORNode?",
        "How should an integration query THORChain documentation?",
      ],
    },
    {
      identifier: "urn:air:docs.thorchain.org:catalog:public-apis",
      displayName: "THORChain Public API Catalog",
      type: "application/linkset+json",
      url: `${ORIGIN}/.well-known/api-catalog`,
      representativeQueries: [
        "Where is the THORNode OpenAPI description?",
        "How can I discover the Midgard API and health endpoint?",
      ],
    },
  ],
};

const SKILL_PATH =
  "/.well-known/agent-skills/thorchain-docs-research/SKILL.md";
const MCP_CARD_PATHS = new Set([
  "/.well-known/mcp/server-card.json",
  "/.well-known/mcp/server-cards.json",
  "/.well-known/mcp.json",
]);
const encoder = new TextEncoder();
const skillDigestPromise = crypto.subtle
  .digest("SHA-256", encoder.encode(SKILL_MD))
  .then(toHex);

function toHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function skillIndex() {
  return {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: "thorchain-docs-research",
        type: "skill-md",
        description:
          "Research THORChain using official documentation and read-only public interfaces. Use for protocol concepts, integrations, node operations, public API discovery, and evidence-backed THORChain answers.",
        url: `${ORIGIN}${SKILL_PATH}`,
        digest: `sha256:${await skillDigestPromise}`,
      },
    ],
  };
}

function discoveryHeaders(contentType) {
  return new Headers({
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=3600",
    "Content-Type": contentType,
    "X-Content-Type-Options": "nosniff",
  });
}

function bodyFor(request, body) {
  return request.method === "HEAD" ? null : body;
}

function textResponse(request, body, contentType = "text/markdown; charset=utf-8") {
  return new Response(bodyFor(request, body), {
    status: 200,
    headers: discoveryHeaders(contentType),
  });
}

function jsonResponse(request, value, contentType = "application/json; charset=utf-8", extraHeaders = {}) {
  const headers = discoveryHeaders(contentType);
  for (const [name, value] of Object.entries(extraHeaders)) {
    headers.set(name, value);
  }

  return new Response(bodyFor(request, JSON.stringify(value, null, 2)), {
    status: 200,
    headers,
  });
}

function isSyntheticPath(pathname) {
  return (
    pathname === "/auth.md" ||
    pathname === "/AGENTS.md" ||
    pathname === "/.well-known/api-catalog" ||
    pathname === "/.well-known/agent-skills/index.json" ||
    pathname === SKILL_PATH ||
    pathname === "/.well-known/ai-catalog.json" ||
    MCP_CARD_PATHS.has(pathname)
  );
}

async function upstreamRequest(request) {
  const url = new URL(request.url);
  if (url.hostname === "docs.thorchain.org") {
    return request;
  }

  url.protocol = "https:";
  url.host = "docs.thorchain.org";
  const headers = new Headers(request.headers);
  headers.delete("authorization");
  headers.delete("cookie");

  const init = {
    method: request.method,
    headers,
    redirect: request.redirect,
  };

  if (!new Set(["GET", "HEAD"]).has(request.method)) {
    init.body = await request.arrayBuffer();
  }

  return new Request(url, init);
}

export function homepageLinks() {
  return [
    '</llms.txt>; rel="describedby"; type="text/markdown"',
    '</llms-full.txt>; rel="describedby"; type="text/markdown"',
    '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
    '</.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json"',
    '</.well-known/agent-skills/index.json>; rel="service-desc"; type="application/json"',
    '</.well-known/ai-catalog.json>; rel="describedby"; type="application/json"',
    '</auth.md>; rel="service-doc"; type="text/markdown"',
  ].join(", ");
}

export async function handleRequest(request) {
  const url = new URL(request.url);

  if (request.method === "OPTIONS" && isSyntheticPath(url.pathname)) {
    return new Response(null, {
      status: 204,
      headers: discoveryHeaders("text/plain; charset=utf-8"),
    });
  }

  if (!new Set(["GET", "HEAD"]).has(request.method)) {
    if (isSyntheticPath(url.pathname)) {
      return new Response(null, {
        status: 405,
        headers: { Allow: "GET, HEAD, OPTIONS" },
      });
    }
    return fetch(await upstreamRequest(request));
  }

  if (url.pathname === "/auth.md") {
    return textResponse(request, AUTH_MD);
  }

  if (url.pathname === "/AGENTS.md") {
    return textResponse(request, AGENTS_MD);
  }

  if (url.pathname === "/.well-known/api-catalog") {
    return jsonResponse(
      request,
      API_CATALOG,
      'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"; charset=utf-8',
      {
        Link: `<${ORIGIN}/.well-known/api-catalog>; rel="api-catalog"`,
      },
    );
  }

  if (MCP_CARD_PATHS.has(url.pathname)) {
    return jsonResponse(request, MCP_SERVER_CARD);
  }

  if (url.pathname === "/.well-known/agent-skills/index.json") {
    return jsonResponse(request, await skillIndex());
  }

  if (url.pathname === SKILL_PATH) {
    return textResponse(request, SKILL_MD);
  }

  if (url.pathname === "/.well-known/ai-catalog.json") {
    return jsonResponse(request, ARD_CATALOG);
  }

  const upstream = await fetch(await upstreamRequest(request));
  if (url.pathname !== "/") {
    return upstream;
  }

  const response = new Response(upstream.body, upstream);
  response.headers.append("Link", homepageLinks());
  return response;
}

export default {
  fetch: handleRequest,
};

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import test from "node:test";

import worker, {
  AGENTS_MD,
  AUTH_MD,
  MCP_SERVER_CARD,
  ORIGIN,
  SKILL_MD,
  handleRequest,
  homepageLinks,
  skillIndex,
} from "../src/index.js";

async function withFetch(mock, callback) {
  const original = globalThis.fetch;
  globalThis.fetch = mock;
  try {
    return await callback();
  } finally {
    globalThis.fetch = original;
  }
}

test("module exports the Worker fetch handler", () => {
  assert.equal(worker.fetch, handleRequest);
});

test("homepage preserves the upstream body and adds RFC 8288 discovery links", async () => {
  await withFetch(
    async (request) => {
      assert.equal(request.url, `${ORIGIN}/`);
      return new Response("<html>origin</html>", {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8", ETag: '"origin"' },
      });
    },
    async () => {
      const response = await handleRequest(new Request("https://preview.example/"));
      assert.equal(response.status, 200);
      assert.equal(await response.text(), "<html>origin</html>");
      assert.equal(response.headers.get("etag"), '"origin"');
      assert.equal(response.headers.get("link"), homepageLinks());
      assert.match(response.headers.get("link"), /rel="api-catalog"/);
      assert.match(response.headers.get("link"), /rel="service-desc"/);
      assert.match(response.headers.get("link"), /rel="service-doc"/);
    },
  );
});

test("API catalog supports GET and HEAD with the RFC 9727 media type", async () => {
  const url = "https://preview.example/.well-known/api-catalog";
  const getResponse = await handleRequest(new Request(url));
  assert.equal(getResponse.status, 200);
  assert.match(getResponse.headers.get("content-type"), /^application\/linkset\+json/);
  assert.equal(getResponse.headers.get("access-control-allow-origin"), "*");
  assert.match(getResponse.headers.get("link"), /rel="api-catalog"/);

  const catalog = await getResponse.json();
  assert.equal(catalog.linkset.length, 2);
  for (const entry of catalog.linkset) {
    assert.ok(entry.anchor);
    assert.ok(entry["service-desc"]?.length);
    assert.ok(entry["service-doc"]?.length);
  }

  const headResponse = await handleRequest(new Request(url, { method: "HEAD" }));
  assert.equal(headResponse.status, 200);
  assert.equal(await headResponse.text(), "");
  assert.match(headResponse.headers.get("content-type"), /^application\/linkset\+json/);
});

test("MCP card aliases describe the verified GitBook MCP runtime", async () => {
  for (const path of [
    "/.well-known/mcp/server-card.json",
    "/.well-known/mcp/server-cards.json",
    "/.well-known/mcp.json",
  ]) {
    const response = await handleRequest(new Request(`https://preview.example${path}`));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), MCP_SERVER_CARD);
  }

  assert.equal(MCP_SERVER_CARD.protocolVersion, "2025-06-18");
  assert.equal(MCP_SERVER_CARD.serverInfo.name, "mcp-typescript server on vercel");
  assert.equal(MCP_SERVER_CARD.serverInfo.version, "0.1.0");
  assert.equal(MCP_SERVER_CARD.transport.endpoint, "/~gitbook/mcp");
  assert.deepEqual(MCP_SERVER_CARD.capabilities, { tools: { listChanged: true } });
});

test("Auth.md and AGENTS.md have truthful discovery headings", async () => {
  const authResponse = await handleRequest(new Request("https://preview.example/auth.md"));
  assert.equal(await authResponse.text(), AUTH_MD);
  assert.match(AUTH_MD, /^# Auth\.md/m);
  assert.match(AUTH_MD, /does not require credentials/);

  const agentsResponse = await handleRequest(new Request("https://preview.example/AGENTS.md"));
  assert.equal(await agentsResponse.text(), AGENTS_MD);
  assert.match(AGENTS_MD, /^# THORChain Documentation Agent Instructions/m);
});

test("skill index digest matches both served and checked-in skill bytes", async () => {
  const sourcePath = new URL(
    "../../../agent-skills/thorchain-docs-research/SKILL.md",
    import.meta.url,
  );
  const checkedInSkill = await readFile(sourcePath, "utf8");
  assert.equal(checkedInSkill, SKILL_MD);

  const index = await skillIndex();
  const expected = `sha256:${createHash("sha256").update(SKILL_MD).digest("hex")}`;
  assert.equal(index.skills[0].digest, expected);

  const indexResponse = await handleRequest(
    new Request("https://preview.example/.well-known/agent-skills/index.json"),
  );
  assert.deepEqual(await indexResponse.json(), index);

  const skillResponse = await handleRequest(
    new Request(
      "https://preview.example/.well-known/agent-skills/thorchain-docs-research/SKILL.md",
    ),
  );
  assert.equal(await skillResponse.text(), SKILL_MD);
});

test("ARD manifest is public, CORS-enabled, and structurally valid", async () => {
  const response = await handleRequest(
    new Request("https://preview.example/.well-known/ai-catalog.json"),
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("access-control-allow-origin"), "*");
  const catalog = await response.json();
  assert.ok(catalog.specVersion);
  assert.ok(catalog.host.displayName);
  assert.ok(catalog.entries.length);
  for (const entry of catalog.entries) {
    assert.equal(Number(Boolean(entry.url)) + Number(Boolean(entry.data)), 1);
    assert.ok(entry.representativeQueries.length >= 2);
  }
});

test("synthetic routes support CORS preflight and reject writes", async () => {
  const url = "https://preview.example/.well-known/api-catalog";
  const optionsResponse = await handleRequest(new Request(url, { method: "OPTIONS" }));
  assert.equal(optionsResponse.status, 204);
  assert.equal(optionsResponse.headers.get("access-control-allow-origin"), "*");

  const postResponse = await handleRequest(new Request(url, { method: "POST" }));
  assert.equal(postResponse.status, 405);
  assert.equal(postResponse.headers.get("allow"), "GET, HEAD, OPTIONS");
});

test("unknown paths and MCP POST requests pass through unchanged", async () => {
  await withFetch(
    async (request) => {
      assert.equal(request.url, `${ORIGIN}/~gitbook/mcp`);
      assert.equal(request.method, "POST");
      assert.equal(request.headers.get("authorization"), null);
      assert.equal(request.headers.get("cookie"), null);
      assert.equal(await request.text(), '{"jsonrpc":"2.0"}');
      return new Response("upstream", {
        status: 207,
        headers: { "Content-Type": "application/json" },
      });
    },
    async () => {
      const response = await handleRequest(
        new Request("https://preview.example/~gitbook/mcp", {
          method: "POST",
          headers: {
            Authorization: "Bearer preview-only",
            Cookie: "preview=1",
            "Content-Type": "application/json",
          },
          body: '{"jsonrpc":"2.0"}',
        }),
      );
      assert.equal(response.status, 207);
      assert.equal(await response.text(), "upstream");
    },
  );
});

const assert = require("node:assert/strict");
const path = require("node:path");
const test = require("node:test");

const { loadTsModule } = require("../../lib/test-utils/load-ts-module.cjs");

function loadDocsFileTree() {
  return loadTsModule(path.resolve(__dirname, "docs-file-tree.tsx"), {
    stubs: {
      "@/hooks/use-client-id": {
        useClientId: () => null,
        appendClientId: (url, clientId) => clientId ? `${url}${url.includes("?") ? "&" : "?"}clientId=${clientId}` : url,
      },
      "@/lib/file-icons": {
        getFileIcon: () => function FileIcon() { return null; },
        getFileIconColor: () => "currentColor",
      },
    },
  });
}

test("Docs file tree includes team_context between context and brand_context", () => {
  const { DOCS_SECTION_DEFS } = loadDocsFileTree();
  assert.deepEqual(
    DOCS_SECTION_DEFS.map((section) => section.dir),
    ["context", "team_context", "brand_context", "docs", "projects"],
  );
  assert.equal(DOCS_SECTION_DEFS[1].label, "Team Context");
});

test("Docs file tree API URLs include the docs surface", () => {
  const { docsSurfaceUrl } = loadDocsFileTree();
  assert.equal(
    docsSurfaceUrl("/api/files?dir=team_context", "acme"),
    "/api/files?dir=team_context&clientId=acme&surface=docs",
  );
});

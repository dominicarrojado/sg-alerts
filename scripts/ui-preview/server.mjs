import http from "node:http";
import { readFile, realpath, stat } from "node:fs/promises";
import path from "node:path";
export const apiBase = "/__ui-fixtures";

export function fixtureKey(value) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//")
  ) {
    throw new Error(
      "Fixture URL must be a local API path with an optional query, without the fixture base prefix.",
    );
  }
  const url = new URL(value, "http://fixture");
  if (url.origin !== "http://fixture" || url.hash) {
    throw new Error("Fixture URL must not contain an origin or fragment.");
  }
  url.searchParams.sort();
  return url.pathname + url.search;
}

const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
};

export async function staticFile(root, rawPath) {
  let pathname = decodeURIComponent(rawPath);
  if (
    pathname.includes("\\") ||
    pathname.includes("\0") ||
    pathname.split("/").includes("..")
  ) {
    throw new Error("Unsafe static path");
  }
  if (pathname === "/sg-alerts") {
    pathname = "/";
  } else if (pathname.startsWith("/sg-alerts/")) {
    pathname = pathname.slice("/sg-alerts".length);
  }
  const base = await realpath(root);
  let candidate = path.resolve(base, `.${pathname}`);
  if ((await stat(candidate)).isDirectory()) {
    candidate = path.join(candidate, "index.html");
  }
  const file = await realpath(candidate);
  if (!file.startsWith(`${base}${path.sep}`)) {
    throw new Error("Static path escaped export");
  }
  return file;
}

export async function startServer(outDir, fixtures) {
  const log = [];
  const server = http.createServer(async (req, res) => {
    let status = 500;
    try {
      const url = new URL(req.url, "http://localhost");
      res.setHeader("Cache-Control", "no-store");
      res.setHeader("X-UI-Preview", "fixture-backed; not-live-api-evidence");
      if (req.method !== "GET" && req.method !== "HEAD") {
        status = 405;
        res.setHeader("Allow", "GET, HEAD");
        res.writeHead(status);
        res.end("Read-only preview: mutation requests are disabled.");
      } else if (url.pathname.startsWith(`${apiBase}/`)) {
        const key = fixtureKey(url.pathname.slice(apiBase.length) + url.search);
        const fixture = fixtures.find(
          (item) => fixtureKey(item.url) === key,
        ) || {
          status: 404,
          body: {
            error: `No fixture for ${key}. Add the exact endpoint/query to the task-local scenario; no live API fallback is allowed.`,
          },
        };
        status = fixture.status;
        res.setHeader("Content-Type", "application/json");
        res.writeHead(status);
        res.end(
          req.method === "HEAD" ? undefined : JSON.stringify(fixture.body),
        );
      } else {
        const file = await staticFile(outDir, url.pathname);
        const body = await readFile(file);
        status = 200;
        res.setHeader(
          "Content-Type",
          types[path.extname(file)] || "application/octet-stream",
        );
        res.end(req.method === "HEAD" ? undefined : body);
      }
    } catch (error) {
      status = error.code === "ENOENT" || error.code === "ENOTDIR" ? 404 : 400;
      res.writeHead(status);
      res.end(`Preview request failed: ${error.message}`);
    } finally {
      // Keep diagnostics bounded, including an accidentally noisy page.
      if (log.length < 1000) {
        log.push({ method: req.method, url: req.url, status });
      }
    }
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  return {
    origin: `http://127.0.0.1:${server.address().port}`,
    log,
    async close() {
      server.closeAllConnections();
      await new Promise((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    },
  };
}

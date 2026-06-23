import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import fs from 'fs/promises'
import path from 'path'

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);

    // Simple file-backed API for development: /api/clothes
    if (url.pathname.startsWith('/api/clothes')) {
      try {
        const dbPath = path.resolve(process.cwd(), 'data', 'clothes.json');

        async function readDb() {
          const txt = await fs.readFile(dbPath, 'utf8');
          return JSON.parse(txt);
        }

        async function writeDb(data: unknown) {
          await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
        }

        const method = request.method.toUpperCase();
        // GET /api/clothes -> list
        if (method === 'GET' && url.pathname === '/api/clothes') {
          const items = await readDb();
          return new Response(JSON.stringify(items), { status: 200, headers: { 'content-type': 'application/json' } });
        }

        // POST /api/clothes -> create
        if (method === 'POST' && url.pathname === '/api/clothes') {
          const body = await request.json();
          const items = await readDb();
          const id = body.id ?? `mas-${Date.now()}`;
          const newItem = { ...body, id };
          items.push(newItem);
          await writeDb(items);
          return new Response(JSON.stringify(newItem), { status: 201, headers: { 'content-type': 'application/json' } });
        }

        // PUT /api/clothes/:id -> update
        if ((method === 'PUT' || method === 'PATCH') && url.pathname.startsWith('/api/clothes/')) {
          const id = url.pathname.split('/').pop();
          const body = await request.json();
          const items = await readDb();
          const idx = items.findIndex((i: any) => i.id === id);
          if (idx === -1) return new Response(null, { status: 404 });
          items[idx] = { ...items[idx], ...body, id };
          await writeDb(items);
          return new Response(JSON.stringify(items[idx]), { status: 200, headers: { 'content-type': 'application/json' } });
        }

        // DELETE /api/clothes/:id
        if (method === 'DELETE' && url.pathname.startsWith('/api/clothes/')) {
          const id = url.pathname.split('/').pop();
          const items = await readDb();
          const filtered = items.filter((i: any) => i.id !== id);
          if (filtered.length === items.length) return new Response(null, { status: 404 });
          await writeDb(filtered);
          return new Response(null, { status: 204 });
        }

        return new Response(null, { status: 405 });
      } catch (err) {
        console.error('API error', err);
        return new Response(JSON.stringify({ message: 'Internal API error' }), { status: 500, headers: { 'content-type': 'application/json' } });
      }
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};

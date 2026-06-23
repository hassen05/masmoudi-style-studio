import fs from "fs/promises";
import path from "path";
//#region src/lib/error-capture.ts
var lastCapturedError;
var TTL_MS = 5e3;
function record(error) {
	lastCapturedError = {
		error,
		at: Date.now()
	};
}
if (typeof globalThis.addEventListener === "function") {
	globalThis.addEventListener("error", (event) => record(event.error ?? event));
	globalThis.addEventListener("unhandledrejection", (event) => record(event.reason));
}
function consumeLastCapturedError() {
	if (!lastCapturedError) return void 0;
	if (Date.now() - lastCapturedError.at > TTL_MS) {
		lastCapturedError = void 0;
		return;
	}
	const { error } = lastCapturedError;
	lastCapturedError = void 0;
	return error;
}
//#endregion
//#region src/lib/error-page.ts
function renderErrorPage() {
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
//#endregion
//#region src/server.ts
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./assets/server-CsWaRh1t.js").then((m) => m.default ?? m);
	return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
	if (response.status < 500) return response;
	if (!(response.headers.get("content-type") ?? "").includes("application/json")) return response;
	const body = await response.clone().text();
	if (!body.includes("\"unhandled\":true") || !body.includes("\"message\":\"HTTPError\"")) return response;
	console.error(consumeLastCapturedError() ?? /* @__PURE__ */ new Error(`h3 swallowed SSR error: ${body}`));
	return new Response(renderErrorPage(), {
		status: 500,
		headers: { "content-type": "text/html; charset=utf-8" }
	});
}
var server_default = { async fetch(request, env, ctx) {
	const url = new URL(request.url);
	if (url.pathname.startsWith("/api/clothes")) try {
		const dbPath = path.resolve(process.cwd(), "data", "clothes.json");
		async function readDb() {
			const txt = await fs.readFile(dbPath, "utf8");
			return JSON.parse(txt);
		}
		async function writeDb(data) {
			await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf8");
		}
		const method = request.method.toUpperCase();
		if (method === "GET" && url.pathname === "/api/clothes") {
			const items = await readDb();
			return new Response(JSON.stringify(items), {
				status: 200,
				headers: { "content-type": "application/json" }
			});
		}
		if (method === "POST" && url.pathname === "/api/clothes") {
			const body = await request.json();
			const items = await readDb();
			const id = body.id ?? `mas-${Date.now()}`;
			const newItem = {
				...body,
				id
			};
			items.push(newItem);
			await writeDb(items);
			return new Response(JSON.stringify(newItem), {
				status: 201,
				headers: { "content-type": "application/json" }
			});
		}
		if ((method === "PUT" || method === "PATCH") && url.pathname.startsWith("/api/clothes/")) {
			const id = url.pathname.split("/").pop();
			const body = await request.json();
			const items = await readDb();
			const idx = items.findIndex((i) => i.id === id);
			if (idx === -1) return new Response(null, { status: 404 });
			items[idx] = {
				...items[idx],
				...body,
				id
			};
			await writeDb(items);
			return new Response(JSON.stringify(items[idx]), {
				status: 200,
				headers: { "content-type": "application/json" }
			});
		}
		if (method === "DELETE" && url.pathname.startsWith("/api/clothes/")) {
			const id = url.pathname.split("/").pop();
			const items = await readDb();
			const filtered = items.filter((i) => i.id !== id);
			if (filtered.length === items.length) return new Response(null, { status: 404 });
			await writeDb(filtered);
			return new Response(null, { status: 204 });
		}
		return new Response(null, { status: 405 });
	} catch (err) {
		console.error("API error", err);
		return new Response(JSON.stringify({ message: "Internal API error" }), {
			status: 500,
			headers: { "content-type": "application/json" }
		});
	}
	try {
		return await normalizeCatastrophicSsrResponse(await (await getServerEntry()).fetch(request, env, ctx));
	} catch (error) {
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
} };
//#endregion
export { server_default as default, renderErrorPage as t };

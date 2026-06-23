# Marco Benucci Style Studio

This is a TanStack Start + Vite React starter configured with @lovable.dev/vite-tanstack-config.

## Prerequisites

- Node.js 18+ (or Bun) installed
- Git

## Install

Using npm:

```bash
npm install
```

Or using pnpm:

```bash
pnpm install
```

Or using Bun:

```bash
bun install
```

## Development

Run the Vite dev server (hot-reload + SSR tooling provided by the TanStack Start config):

```bash
npm run dev
# or
pnpm dev
# or
bun run dev
```

Open http://localhost:5173 (or the port printed by Vite).

## Build & Preview

Build a production bundle:

```bash
npm run build
# or
pnpm build
# or
bun run build
```

Preview the built site locally:

```bash
npm run preview
# or
pnpm preview
# or
bun run preview
```

## Project notes

- The Vite configuration is extended by `@lovable.dev/vite-tanstack-config`; do not manually duplicate the plugins it provides.
- Server (SSR) entry is redirected to `src/server.ts` via the Vite config. See [src/server.ts](src/server.ts) for the SSR wrapper and error handling.
- TanStack Start initialization lives in `src/start.ts`.

## Troubleshooting

- If you hit issues installing dependencies, try clearing your package manager cache and re-installing.
- Use the `dev` script to run locally. If you need a different port, set `PORT` environment variable or update Vite config overrides.

---

If you want, I can also add a short CONTRIBUTING or developer notes file with common dev tasks.

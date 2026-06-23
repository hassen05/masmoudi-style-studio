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

## Deploy to GitHub Pages (frontend only)

This repository includes a GitHub Actions workflow that builds the frontend and publishes the `dist` folder to GitHub Pages (branch `gh-pages`). The API/server (`src/server.ts`) is not deployed — GitHub Pages is static-only.

How it works:
- The Action builds with `vite build -- --base=/REPO_NAME/` (project pages) and copies `dist/index.html` to `dist/404.html` for SPA fallback.
- The site is published using `peaceiris/actions-gh-pages`.

To use:
1. Push your code to the `main` branch.
2. The workflow will run automatically and publish to the `gh-pages` branch.

Manual build & deploy (optional):

```bash
npm run build -- --base=/REPO_NAME/
npm run postbuild
# then push `dist` to gh-pages branch using your preferred method
```


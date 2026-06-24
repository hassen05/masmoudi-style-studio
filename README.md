# Marco Benucci Style Studio

Pure Vite SPA for the Marco Benucci menswear studio.

## Setup

```bash
npm install
```

Requires Node.js 20.19+ for Vite 8.

## Development

```bash
npm run dev
```

Open the Vite dev server URL that prints in the terminal.

## Production Build

```bash
npm run build
```

This writes the static app to `dist/`.

To preview the built app locally:

```bash
npm run preview
```

## SPA Notes

- Client-side navigation is handled entirely in the browser.
- Product CRUD in the admin panel uses `localStorage`, so it works without a backend.
- `npm run postbuild` copies `dist/index.html` to `dist/404.html` for static-host SPA fallback.

## GitHub Pages

The repository ships with a GitHub Actions workflow that builds the app with the correct base path and publishes the `dist/` folder.

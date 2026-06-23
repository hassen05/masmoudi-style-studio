import { promises as fs } from 'fs'
import path from 'path'

async function copyIfExists(src, dest) {
  try {
    await fs.copyFile(src, dest)
    console.log(`copied ${src} -> ${dest}`)
    return true
  } catch (err) {
    return false
  }
}

async function main() {
  const root = process.cwd()
  const clientDir = path.join(root, 'dist', 'client')
  const candidates = [
    path.join(clientDir, 'index.html'),
    path.join(root, 'dist', 'index.html'),
  ]
  // Prefer generating index.html from built assets to avoid copying stale files
  try {
    const assetsDir = path.join(clientDir, 'assets')
    const files = await fs.readdir(assetsDir)
    const style = files.find((f) => f.startsWith('styles') && f.endsWith('.css'))
    // Prefer the exact "index-*.js" entry chunk (avoid routes- or other index files)
    const script = files.find((f) => /^index-[a-zA-Z0-9_.-]+\.js$/.test(f)) || files.find((f) => f.startsWith('index') && f.endsWith('.js'))

    if (style && script) {
      const indexHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Marco Benucci</title>
  <link rel="stylesheet" href="assets/${style}">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="assets/${script}"></script>
</body>
</html>`

      const outIndex = path.join(clientDir, 'index.html')
      const out404 = path.join(clientDir, '404.html')
      await fs.writeFile(outIndex, indexHtml, 'utf8')
      await fs.writeFile(out404, indexHtml, 'utf8')
      console.log('Generated index.html and 404.html from client assets')
      return
    }

    // If we couldn't detect assets, fall through to copying any existing index.html
    console.log('Unable to detect styles/index assets, falling back to copying existing index.html if present')
  } catch (err) {
    console.log('Failed to read assets directory:', err)
  }

  // Fallback: copy any existing index.html -> 404.html (legacy behavior)
  for (const src of candidates) {
    const dest = src.replace(/index.html$/, '404.html')
    const ok = await copyIfExists(src, dest)
    if (ok) return
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

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

  for (const src of candidates) {
    const dest = src.replace(/index.html$/, '404.html')
    const ok = await copyIfExists(src, dest)
    if (ok) return
  }

  // No index.html found — try to generate one from built assets
  try {
    const assetsDir = path.join(clientDir, 'assets')
    const files = await fs.readdir(assetsDir)
    const style = files.find((f) => f.startsWith('styles') && f.endsWith('.css'))
    const script = files.find((f) => f.startsWith('index') && f.endsWith('.js'))

    if (!style || !script) {
      console.log('No index.html found and unable to detect assets to generate one.')
      return
    }

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
  } catch (err) {
    console.log('Failed to generate index.html:', err)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

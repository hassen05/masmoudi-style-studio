#!/usr/bin/env node
import http from 'http'
import { fileURLToPath } from 'url'
import path from 'path'

// Import the built server handler (produced by `vite build`)
const serverPath = path.join(process.cwd(), 'dist', 'server', 'server.js')
const { default: handler } = await import(serverPath)

const port = process.env.PORT ? Number(process.env.PORT) : 3000

const server = http.createServer(async (req, res) => {
  try {
    const host = req.headers.host || `localhost:${port}`
    const url = new URL(req.url ?? '/', `http://${host}`)

    // Build a Fetch API Request from the Node request
    const headers = req.headers
    const method = req.method || 'GET'

    const body = method === 'GET' || method === 'HEAD' ? undefined : req

    const request = new Request(url.toString(), {
      method,
      headers,
      body,
    })

    const response = await handler.fetch(request, {}, {})

    // Forward status and headers
    res.writeHead(response.status, Object.fromEntries(response.headers.entries()))

    // Stream body
    if (response.body) {
      const buffer = Buffer.from(await response.arrayBuffer())
      res.end(buffer)
    } else {
      res.end()
    }
  } catch (err) {
    console.error('Server wrapper error', err)
    res.writeHead(500, { 'content-type': 'text/plain' })
    res.end('Internal server error')
  }
})

server.listen(port, () => {
  console.log(`SSR server listening on http://localhost:${port}`)
})

import type { Plugin } from 'vite'

/**
 * Dev middleware: POST /api/generate
 * Returns 503 without ANTHROPIC_API_KEY (client falls back to mock templates).
 */
export function anthropicPlugin(): Plugin {
  return {
    name: 'hiddenhire-anthropic',
    configureServer(server) {
      server.middlewares.use('/api/generate', async (req, res, next) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }
        const key = process.env.ANTHROPIC_API_KEY
        if (!key) {
          res.statusCode = 503
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: 'ANTHROPIC_API_KEY not configured',
              fallback: 'mock',
            }),
          )
          return
        }

        try {
          const chunks: Buffer[] = []
          for await (const chunk of req) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
          }
          const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}') as {
            title?: string
            employer?: string
            locale?: string
          }

          // Minimal stub: acknowledge key is present; real Claude wiring can replace this.
          res.statusCode = 501
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: 'Anthropic generation stub — use client mock templates',
              received: { title: body.title, employer: body.employer, locale: body.locale },
            }),
          )
        } catch (err) {
          next(err)
        }
      })
    },
  }
}

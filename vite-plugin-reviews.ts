import type { Plugin } from 'vite'

/**
 * Dev middleware: GET /api/reviews?companyId=…
 * Returns 503 without RAPIDAPI_KEY (client uses curated Kununu snapshots).
 */
export function reviewsPlugin(): Plugin {
  return {
    name: 'hiddenhire-reviews',
    configureServer(server) {
      server.middlewares.use('/api/reviews', async (req, res, next) => {
        if (req.method !== 'GET') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        const key = process.env.RAPIDAPI_KEY
        if (!key) {
          res.statusCode = 503
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: 'RAPIDAPI_KEY not configured',
              fallback: 'curated',
            }),
          )
          return
        }

        try {
          const host = req.headers.host ?? 'localhost'
          const url = new URL(req.url ?? '/', `http://${host}`)
          const companyId = url.searchParams.get('companyId') ?? ''
          // Stub: key present but Indeed RapidAPI not fully wired — client keeps curated.
          res.statusCode = 501
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: 'Indeed RapidAPI stub — use curated snapshots',
              companyId,
            }),
          )
        } catch (err) {
          next(err)
        }
      })
    },
  }
}

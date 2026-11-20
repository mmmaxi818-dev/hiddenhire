import type { GeneratedApplication, GenerationRequest } from '../../types'
import { generateMockApplication } from './mockGenerator'

/**
 * Tries Vite middleware `/api/generate` when ANTHROPIC_API_KEY is set.
 * Falls back to mock templates otherwise (503 / network / missing key).
 */
export async function generateApplication(
  req: GenerationRequest,
): Promise<{ result: GeneratedApplication; source: 'anthropic' | 'mock' }> {
  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postId: req.post.id,
        title: req.post.title,
        employer: req.post.employer,
        locale: req.locale,
        tone: req.tone,
        draft: req.draft,
      }),
    })
    if (res.ok) {
      const data = (await res.json()) as GeneratedApplication
      if (data?.lebenslaufText && data?.anschreiben) {
        return { result: data, source: 'anthropic' }
      }
    }
  } catch {
    // mock fallback
  }
  return { result: await generateMockApplication(req), source: 'mock' }
}

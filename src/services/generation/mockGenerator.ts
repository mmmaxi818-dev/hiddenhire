import type { GeneratedApplication, GenerationRequest } from '../../types'
import {
  adaptationNotes,
  buildAnschreiben,
  buildKurzNachricht,
  buildLebenslaufHtml,
  buildLebenslaufText,
} from '../lebenslauf'

export async function generateMockApplication(
  req: GenerationRequest,
): Promise<GeneratedApplication> {
  // Simulate brief latency like the original E2E (~1s)
  await new Promise((r) => setTimeout(r, 400))
  const { draft, post, locale, tone } = req
  return {
    lebenslaufHtml: buildLebenslaufHtml(draft, post, locale),
    lebenslaufText: buildLebenslaufText(draft, post, locale),
    anschreiben: buildAnschreiben(draft, post, locale, tone),
    kurzNachricht: buildKurzNachricht(draft, post, locale),
    adaptations: adaptationNotes(post, locale),
    language: locale,
    tone,
  }
}

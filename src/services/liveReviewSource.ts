import type { EmployerReview } from '../types'
import { curatedReviews } from '../data/curatedReviews'
import { mockReviews } from '../data/mockReviews'

/**
 * Default: curated Kununu snapshots (no API key).
 * Optional: GET /api/reviews?companyId=… when RAPIDAPI_KEY is set on the Vite server.
 */
export async function fetchEmployerReview(companyId: string): Promise<EmployerReview | null> {
  try {
    const res = await fetch(`/api/reviews?companyId=${encodeURIComponent(companyId)}`)
    if (res.ok) {
      const data = (await res.json()) as EmployerReview
      if (data && typeof data.overall === 'number') {
        return { ...data, status: 'live', companyId }
      }
    }
  } catch {
    // fall through to curated / mock
  }
  return curatedReviews[companyId] ?? mockReviews[companyId] ?? null
}

export function getCuratedOrMockReview(companyId: string): EmployerReview | null {
  return curatedReviews[companyId] ?? mockReviews[companyId] ?? null
}

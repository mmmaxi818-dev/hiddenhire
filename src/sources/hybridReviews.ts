import { curatedReviews } from '../data/curatedReviews'
import { mockReviews } from '../data/mockReviews'
import { fetchEmployerReview, getCuratedOrMockReview } from '../services/liveReviewSource'
import type { EmployerReview } from '../types'

export function getStaticReview(companyId: string): EmployerReview | null {
  return getCuratedOrMockReview(companyId)
}

export async function resolveReview(companyId: string): Promise<EmployerReview | null> {
  return fetchEmployerReview(companyId)
}

export function curatedReviewCount(): number {
  return Object.keys(curatedReviews).length
}

export function mockReviewCount(): number {
  return Object.keys(mockReviews).length
}

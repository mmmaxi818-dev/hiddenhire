import { livePosts } from '../data/livePosts'
import type { JobPost } from '../types'

/** Feed source: live Softgarden / hospital career openings only (no mock social). */
export function getAllPosts(): JobPost[] {
  return [...livePosts]
}

export function getPostById(id: string): JobPost | undefined {
  return getAllPosts().find((p) => p.id === id)
}

export function getLivePostCount(): number {
  return livePosts.length
}

export function getMockPostCount(): number {
  return 0
}

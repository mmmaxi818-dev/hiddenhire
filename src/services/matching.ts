import type { CvDraft, FeedFilters, JobPost, MatchResult, ScoredPost, UserPreferences } from '../types'

function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '')
}

export function scorePost(post: JobPost, draft: CvDraft, prefs: UserPreferences): MatchResult {
  const hay = normalize(
    [post.title, post.employer, post.location, post.snippet, ...post.tags].join(' '),
  )
  const skillHits = draft.skills.filter((s) => hay.includes(normalize(s)))
  const roleHits = prefs.targetRoles.filter((r) => {
    const token = normalize(r.split(/[:\s]/)[0] ?? r)
    return token.length > 3 && hay.includes(token)
  })
  const locHits = prefs.locations.some((l) => {
    const n = normalize(l)
    if (n.includes('remote')) return post.mode === 'Remote'
    const city = normalize(l.split(',')[0] ?? l)
    return city.length > 2 && hay.includes(city)
  })
  const keyword = prefs.keywords.trim()
  const keywordHit = keyword ? hay.includes(normalize(keyword)) : false
  const modeHit = prefs.workModes.includes(post.mode)

  let score = post.kind === 'live' ? 72 : 58
  score += Math.min(18, skillHits.length * 4)
  score += roleHits.length ? 8 : 0
  score += locHits ? 6 : 0
  score += keywordHit ? 5 : 0
  score += modeHit ? 3 : 0
  score = Math.min(99, Math.round(score))

  const reasons: string[] = []
  if (skillHits.length) reasons.push(...skillHits.slice(0, 3))
  else reasons.push(...post.tags.slice(0, 2))
  if (locHits) reasons.push(post.location.split(',')[0] ?? post.location)

  return { score, reasons: [...new Set(reasons)].slice(0, 4) }
}

export function scoreAndSort(
  posts: JobPost[],
  draft: CvDraft,
  prefs: UserPreferences,
): ScoredPost[] {
  const scored = posts.map((post) => ({
    ...post,
    match: scorePost(post, draft, prefs),
  }))
  scored.sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === 'live' ? -1 : 1
    return b.match.score - a.match.score
  })
  return scored
}

export function applyFilters(posts: ScoredPost[], filters: FeedFilters): ScoredPost[] {
  const loc = filters.location.trim().toLowerCase()
  const kw = filters.keywords.trim().toLowerCase()
  return posts.filter((p) => {
    if (filters.listing !== 'any' && p.kind !== filters.listing) return false
    if (filters.mode !== 'any' && p.mode !== filters.mode) return false
    if (loc) {
      const blob = `${p.location} ${p.employer}`.toLowerCase()
      if (!blob.includes(loc)) return false
    }
    if (kw) {
      const blob = `${p.title} ${p.snippet} ${p.tags.join(' ')}`.toLowerCase()
      if (!blob.includes(kw)) return false
    }
    return true
  })
}

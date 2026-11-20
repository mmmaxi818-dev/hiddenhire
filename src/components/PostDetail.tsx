import { Link, useNavigate, useParams } from 'react-router-dom'
import { getJobDetailSummary } from '../data/jobSummaries'
import { useApp } from '../context/AppContext'
import { getPostById } from '../sources/mockSocial'
import type { MatchResult } from '../types'
import { Badge } from './Badge'
import { CompanyInsights } from './CompanyInsights'
import { IconExternal } from './icons'

export function PostDetail() {
  const { postId = '' } = useParams()
  const navigate = useNavigate()
  const { scoredPosts, tr, upsertApplication, getApplicationForPost, locale } = useApp()
  const scored = scoredPosts.find((p) => p.id === postId)
  const post = scored ?? getPostById(postId)
  const existing = getApplicationForPost(postId)

  if (!post) {
    return (
      <div className="page">
        <Link to="/" className="inline-flex min-h-11 items-center text-sm text-muted">
          ← {tr('post.back')}
        </Link>
        <p className="mt-4 text-sm">Post not found.</p>
      </div>
    )
  }

  const match: MatchResult = scored?.match ?? { score: 0, reasons: post.tags }
  const date = new Date(post.postedAt).toLocaleString(locale === 'de' ? 'de-DE' : 'en-US')

  return (
    <div className="mx-auto grid max-w-[64rem] gap-4 px-4 py-5 sm:px-6 sm:py-6 lg:grid-cols-[1.25fr_0.95fr]">
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex min-h-11 items-center text-sm text-muted hover:text-[var(--ink)]"
        >
          ← {tr('post.back')}
        </button>
        <section className="surface fade-in rounded-2xl p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            {post.kind === 'live' ? (
              <Badge tone="live">{tr('badge.live')}</Badge>
            ) : (
              <Badge>{post.platform}</Badge>
            )}
            <Badge tone="match">{match.score}%</Badge>
          </div>
          <p className="mt-2 text-[12px] leading-snug text-muted sm:text-[11px]">
            Match {match.score}%: {match.reasons.join(', ') || post.tags.join(', ')}
            {post.tags[0] ? `; Zielrolle „${post.tags[0]}“.` : ''}
          </p>
          <h1 className="font-display mt-3 text-[1.45rem] leading-tight text-[var(--ink)] sm:text-[1.75rem]">
            {post.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {post.employer} · {post.location} ({post.mode.toLowerCase()})
          </p>
          {post.contact ? (
            <p className="mt-2 text-sm text-[var(--ink)]">{post.contact}</p>
          ) : null}
          <p className="mt-1 text-xs text-muted">
            {date} · {locale === 'de' ? 'DE' : 'EN'}
          </p>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--ink)] sm:text-sm">
            {post.snippet}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
            <Link to={`/cv/${post.id}`} className="btn-primary w-full sm:w-auto sm:px-5">
              {tr('post.apply')}
            </Link>
            <button
              type="button"
              onClick={() =>
                upsertApplication(post.id, 'saved', {
                  title: post.title,
                  employer: post.employer,
                  location: post.location,
                  kind: post.kind,
                })
              }
              className="btn-outline w-full sm:w-auto"
            >
              {existing?.status === 'saved' ? tr('post.saved') : tr('post.save')}
            </button>
            {post.url ? (
              <a
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className="btn-outline w-full sm:w-auto"
              >
                {tr('post.openListing')}
                <IconExternal className="h-3.5 w-3.5" />
              </a>
            ) : (
              <span className="btn-outline w-full opacity-70 sm:w-auto">
                Original post
                <IconExternal className="h-3.5 w-3.5" />
              </span>
            )}
          </div>
          <p className="mt-3 text-[11px] text-muted">
            {post.kind === 'live'
              ? 'Live listing — verify URL before applying.'
              : 'Listing — verify URL before applying.'}
          </p>
        </section>

        <JobSummarySection postId={post.id} />
      </div>
      <CompanyInsights companyId={post.companyId} />
    </div>
  )
}

function JobSummarySection({ postId }: { postId: string }) {
  const { tr, scoredPosts } = useApp()
  const post = scoredPosts.find((p) => p.id === postId) ?? getPostById(postId)
  if (!post) return null
  const summary = getJobDetailSummary(post)

  return (
    <section className="surface fade-in-delay rounded-2xl p-4 sm:p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        {tr('post.detailSummary')}
      </p>
      <h2 className="font-display mt-1 text-xl text-[var(--ink)]">
        {tr('post.detailSummaryTitle')}
      </h2>
      <p className="mt-1 text-xs text-muted">
        {post.kind === 'live' ? tr('post.detailSummaryLive') : tr('post.detailSummaryMock')}
      </p>

      <div className="mt-5 space-y-5">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
            {tr('post.aufgaben')}
          </h3>
          <ul className="mt-2 space-y-1.5 text-[0.9375rem] leading-relaxed text-[var(--ink)] sm:text-sm">
            {summary.aufgaben.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
            {tr('post.anforderungen')}
          </h3>
          <ul className="mt-2 space-y-1.5 text-[0.9375rem] leading-relaxed text-[var(--ink)] sm:text-sm">
            {summary.anforderungen.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
            {tr('post.umfeld')}
          </h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--ink)] sm:text-sm">
            {summary.umfeld}
          </p>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import type { ScoredPost, WorkMode } from '../types'
import { Badge } from './Badge'
import { IconBookmark, IconCheck, IconChevron, IconDismiss } from './icons'

function PostCard({ post }: { post: ScoredPost }) {
  const { tr, upsertApplication, getApplicationForPost, locale } = useApp()
  const existing = getApplicationForPost(post.id)
  const contactLine = [post.contact, post.employer].filter(Boolean).join(' · ')
  const date = new Date(post.postedAt).toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US')

  return (
    <article className="surface fade-in rounded-2xl p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          <Badge tone="live">{tr('badge.live')}</Badge>
          <Badge>{post.platform}</Badge>
          <Badge>{post.mode}</Badge>
        </div>
        <div className="match-ring" title={`${post.match.score}%`}>
          {post.match.score}%
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <h2 className="font-display text-[1.15rem] leading-snug sm:text-[1.2rem]">
          <Link
            to={`/post/${post.id}`}
            className="rounded-sm text-[var(--ink)] underline-offset-2 hover:text-[var(--accent)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-sm leading-snug text-muted">{contactLine}</p>
        <p className="text-[12px] leading-snug text-muted sm:text-[11px]">
          Match {post.match.score}%: {post.match.reasons.slice(0, 3).join(', ')}
          {post.match.reasons.length
            ? `; Zielrolle „${post.tags[0] ?? post.title.split(' ')[0]}“.`
            : ''}
        </p>
      </div>

      <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--ink)] sm:text-sm">
        {post.snippet}
      </p>

      <p className="mt-3 text-xs leading-relaxed text-muted">
        <span className="block sm:inline">{post.employer}</span>
        <span className="mx-2 hidden opacity-40 sm:inline">·</span>
        <span className="block sm:inline">
          {post.location} ({post.mode.toLowerCase()})
        </span>
        <span className="mx-2 hidden opacity-40 sm:inline">·</span>
        <span className="block sm:inline">
          {date}
          <span className="mx-2 opacity-40">·</span>
          {locale === 'de' ? 'DE' : 'EN'}
        </span>
      </p>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center">
        <Link to={`/post/${post.id}`} className="btn-primary w-full sm:w-auto">
          {tr('post.view')}
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
          <IconBookmark className="h-3.5 w-3.5" />
          {existing?.status === 'saved' ? tr('post.saved') : tr('post.save')}
        </button>
        <button
          type="button"
          onClick={() =>
            upsertApplication(post.id, 'applied', {
              title: post.title,
              employer: post.employer,
              location: post.location,
              kind: post.kind,
            })
          }
          className="btn-outline w-full sm:w-auto"
        >
          <IconCheck className="h-3.5 w-3.5" />
          {tr('post.markApplied') ?? 'Mark applied'}
        </button>
        <button
          type="button"
          onClick={() =>
            upsertApplication(post.id, 'dismissed', {
              title: post.title,
              employer: post.employer,
              location: post.location,
              kind: post.kind,
            })
          }
          className="btn-ghost w-full justify-center sm:w-auto"
        >
          <IconDismiss className="h-3.5 w-3.5" />
          {tr('post.dismiss')}
        </button>
      </div>
    </article>
  )
}

export function Feed() {
  const { filteredPosts, filters, setFilters, tr } = useApp()
  const live = filteredPosts.filter((p) => p.kind === 'live')
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <div className="page space-y-5">
      <header className="fade-in">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          {tr('brand.demo')}
        </p>
        <h1 className="font-display mt-1 text-[1.65rem] text-[var(--ink)] sm:text-[2rem]">
          {tr('nav.feed')}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{tr('feed.subtitle')}</p>
      </header>

      <section className="surface fade-in-delay rounded-2xl p-4 sm:p-5">
        <button
          type="button"
          className="flex min-h-11 w-full items-center justify-between gap-3 text-left sm:pointer-events-none"
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen((o) => !o)}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
            {tr('feed.filters') ?? 'Filter'}
          </p>
          <IconChevron
            className={`h-4 w-4 text-muted transition-transform sm:hidden ${
              filtersOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 ${
            filtersOpen ? 'grid' : 'hidden sm:grid'
          }`}
        >
          <label className="text-xs font-medium text-muted">
            {tr('feed.location')}
            <input
              className="input"
              placeholder="Berlin, Hamburg, remote…"
              value={filters.location}
              onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
            />
          </label>
          <label className="text-xs font-medium text-muted">
            {tr('feed.language') ?? 'Language'}
            <select className="input" defaultValue="any">
              <option value="any">{tr('feed.any')}</option>
              <option value="de">Deutsch</option>
              <option value="en">English</option>
            </select>
          </label>
          <label className="text-xs font-medium text-muted">
            {tr('feed.keywords')}
            <input
              className="input"
              placeholder="Mobilität, GIS, Verkehrsplanung…"
              value={filters.keywords}
              onChange={(e) => setFilters((f) => ({ ...f, keywords: e.target.value }))}
            />
          </label>
          <label className="text-xs font-medium text-muted">
            {tr('feed.platform') ?? 'Platform'}
            <select
              className="input"
              value={filters.listing === 'mock' ? 'live' : filters.listing}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  listing: e.target.value as 'any' | 'live',
                }))
              }
            >
              <option value="any">{tr('feed.any')}</option>
              <option value="live">{tr('badge.live')}</option>
            </select>
          </label>
          <label className="text-xs font-medium text-muted">
            {tr('feed.postedAfter') ?? 'Posted after'}
            <input className="input" type="date" />
          </label>
          <label className="text-xs font-medium text-muted">
            {tr('feed.mode')}
            <select
              className="input"
              value={filters.mode}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  mode: e.target.value as 'any' | WorkMode,
                }))
              }
            >
              <option value="any">{tr('feed.any')}</option>
              <option value="Onsite">Onsite</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
            </select>
          </label>
        </div>
        <label
          className={`mt-3 items-center gap-3 text-sm text-muted ${
            filtersOpen ? 'flex' : 'hidden sm:flex'
          }`}
        >
          <input type="checkbox" className="h-5 w-5 rounded border-[var(--border)]" />
          {tr('feed.directContact') ?? 'Direct contact available'}
        </label>
      </section>

      {!live.length ? (
        <p className="text-sm text-muted">{tr('feed.empty')}</p>
      ) : (
        <>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--live)]">
            {tr('feed.live')} · {live.length}
          </p>
          <div className="space-y-3">
            {live.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

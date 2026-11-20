import { useEffect, useState } from 'react'
import { useApp } from '../context/AppContext'
import { getCompany } from '../sources/company'
import { getStaticReview, resolveReview } from '../sources/hybridReviews'
import type { EmployerReview } from '../types'
import { Badge } from './Badge'

export function CompanyInsights({ companyId }: { companyId: string }) {
  const { tr, locale } = useApp()
  const company = getCompany(companyId)
  const [review, setReview] = useState<EmployerReview | null>(() => getStaticReview(companyId))

  useEffect(() => {
    let cancelled = false
    setReview(getStaticReview(companyId))
    void resolveReview(companyId).then((r) => {
      if (!cancelled && r) setReview(r)
    })
    return () => {
      cancelled = true
    }
  }, [companyId])

  if (!company && !review) return null

  return (
    <div className="space-y-4">
      {company ? (
        <section className="surface fade-in rounded-2xl p-4 sm:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            {tr('company.title')}
          </p>
          <h2 className="font-display mt-1 text-xl text-[var(--ink)]">{company.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{company.summary}</p>
          <dl className="mt-4 grid grid-cols-1 gap-3 text-xs sm:grid-cols-3 sm:gap-2">
            <div>
              <dt className="text-muted">{tr('company.size')}</dt>
              <dd className="mt-0.5 font-medium">{company.size}</dd>
            </div>
            <div>
              <dt className="text-muted">{tr('company.industry')}</dt>
              <dd className="mt-0.5 font-medium">{company.industry}</dd>
            </div>
            <div>
              <dt className="text-muted">{tr('company.hq')}</dt>
              <dd className="mt-0.5 font-medium">{company.hq}</dd>
            </div>
          </dl>
        </section>
      ) : null}

      {review ? (
        <section className="surface fade-in-delay rounded-2xl p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                {tr('reviews.title')}
              </p>
              <h3 className="font-display mt-1 text-2xl text-[var(--ink)]">
                {review.overall.toFixed(1)} / 5
              </h3>
            </div>
            <Badge
              tone={
                review.status === 'snapshot'
                  ? 'snapshot'
                  : review.status === 'live'
                    ? 'live'
                    : 'chip'
              }
            >
              {review.status === 'snapshot'
                ? tr('badge.snapshot')
                : review.status === 'live'
                  ? tr('badge.live')
                  : tr('badge.mock')}
            </Badge>
          </div>
          <p className="mt-2 text-xs text-muted">
            {review.sourceLabel} · {review.count} {tr('reviews.count') ?? 'reviews'} ·{' '}
            {tr('reviews.asOf')}{' '}
            {new Date(review.asOf).toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-GB')} ·{' '}
            {tr('reviews.subjective')}
          </p>
          {review.attributionUrl && review.attributionUrl !== '#' ? (
            <a
              href={review.attributionUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-xs text-[var(--accent)] underline-offset-2 hover:underline"
            >
              {tr('reviews.source')}
            </a>
          ) : null}
          <div className="mt-4 space-y-2">
            {review.categories.map((c) => (
              <div
                key={c.label}
                className="grid grid-cols-[7rem_1fr_2rem] items-center gap-2 text-xs"
              >
                <span className="text-muted">{c.label}</span>
                <div className="h-1.5 overflow-hidden rounded-full bg-[var(--chip)]">
                  <div
                    className="h-full rounded-full bg-[var(--accent)]"
                    style={{ width: `${(c.value / 5) * 100}%` }}
                  />
                </div>
                <span className="text-right font-medium">{c.value.toFixed(1)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--match)]">
                {tr('reviews.pros')}
              </p>
              <ul className="mt-1 space-y-1 text-sm text-muted">
                {review.pros.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--accent-2)]">
                {tr('reviews.cons')}
              </p>
              <ul className="mt-1 space-y-1 text-sm text-muted">
                {review.cons.map((c) => (
                  <li key={c}>• {c}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-muted">{tr('reviews.subjective')}</p>
        </section>
      ) : (
        <section className="surface rounded-2xl p-5 text-sm text-muted">
          {tr('reviews.unavailable')}
        </section>
      )}
    </div>
  )
}

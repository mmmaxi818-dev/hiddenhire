import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Badge } from './Badge'

export function Applications({ mode = 'all' }: { mode?: 'all' | 'saved' }) {
  const { applications, tr, locale } = useApp()
  const list =
    mode === 'saved'
      ? applications.filter((a) => a.status === 'saved')
      : applications.filter((a) => a.status !== 'dismissed')

  return (
    <div className="page max-w-3xl space-y-5">
      <header className="fade-in">
        <h1 className="font-display text-[1.65rem] font-semibold sm:text-3xl">
          {mode === 'saved' ? tr('nav.saved') : tr('apps.title')}
        </h1>
      </header>

      {!list.length ? (
        <p className="text-sm text-muted">{tr('apps.empty')}</p>
      ) : (
        <div className="space-y-3">
          {list.map((app) => (
            <article key={app.id} className="surface fade-in rounded-2xl p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={app.kind === 'live' ? 'live' : 'chip'}>
                  {app.kind === 'live' ? tr('badge.live') : tr('badge.mock')}
                </Badge>
                <Badge tone="match">{tr(`apps.status.${app.status}`)}</Badge>
              </div>
              <h2 className="font-display mt-2 text-xl font-semibold">{app.title}</h2>
              <p className="text-sm text-muted">
                {app.employer} · {app.location}
              </p>
              <p className="mt-1 text-xs text-muted">
                {new Date(app.updatedAt).toLocaleString(locale === 'de' ? 'de-DE' : 'en-GB')}
              </p>
              <Link
                to={app.generated ? `/cv/${app.postId}` : `/post/${app.postId}`}
                className="mt-3 inline-block rounded-xl bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-white"
              >
                {tr('apps.open')}
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

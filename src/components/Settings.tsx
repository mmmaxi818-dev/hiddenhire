import { useApp } from '../context/AppContext'
import type { Locale, ThemeMode } from '../types'

export function Settings() {
  const { tr, profile, setPreferences, resetOnboarding } = useApp()
  const prefs = profile.preferences

  return (
    <div className="page max-w-xl space-y-5">
      <header className="fade-in">
        <h1 className="font-display text-[1.65rem] font-semibold sm:text-3xl">{tr('settings.title')}</h1>
      </header>

      <section className="surface rounded-2xl p-5 space-y-4">
        <label className="block text-xs text-muted">
          {tr('settings.theme')}
          <select
            className="input"
            value={prefs.theme}
            onChange={(e) =>
              setPreferences((p) => ({ ...p, theme: e.target.value as ThemeMode }))
            }
          >
            <option value="light">{tr('settings.light')}</option>
            <option value="dark">{tr('settings.dark')}</option>
          </select>
        </label>

        <label className="block text-xs text-muted">
          {tr('settings.locale')}
          <select
            className="input"
            value={prefs.locale}
            onChange={(e) =>
              setPreferences((p) => ({ ...p, locale: e.target.value as Locale }))
            }
          >
            <option value="de">Deutsch</option>
            <option value="en">English</option>
          </select>
        </label>

        <label className="block text-xs text-muted">
          {tr('settings.keywords')}
          <input
            className="input"
            value={prefs.keywords}
            onChange={(e) => setPreferences((p) => ({ ...p, keywords: e.target.value }))}
          />
        </label>

        <label className="block text-xs text-muted">
          {tr('settings.listing')}
          <select
            className="input"
            value={prefs.listingFilter === 'mock' ? 'live' : prefs.listingFilter}
            onChange={(e) =>
              setPreferences((p) => ({
                ...p,
                listingFilter: e.target.value as 'any' | 'live',
              }))
            }
          >
            <option value="any">{tr('feed.any')}</option>
            <option value="live">{tr('badge.live')}</option>
          </select>
        </label>

        <button
          type="button"
          onClick={resetOnboarding}
          className="btn-outline w-full sm:w-auto"
        >
          {tr('settings.resetOnboarding')}
        </button>
      </section>
    </div>
  )
}

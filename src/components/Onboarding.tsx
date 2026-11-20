import { useApp } from '../context/AppContext'
import { Badge } from './Badge'

export function Onboarding() {
  const { profile, completeOnboarding, tr } = useApp()
  const { draft, preferences } = profile

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] p-4 sm:p-8">
      <div className="surface fade-in w-full max-w-xl rounded-[1.5rem] p-5 sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          {tr('onboarding.welcome')}
        </p>
        <h1 className="font-display mt-2 text-[2rem] text-[var(--ink)] sm:text-[2.4rem]">HiddenHire</h1>
        <p className="mt-1 text-sm font-semibold text-[var(--ink)]">{tr('onboarding.title')}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{tr('onboarding.body')}</p>
        <div className="mt-6 space-y-3 rounded-2xl bg-[var(--chip)] p-4 text-sm">
          <div>
            <p className="text-xs text-muted">{tr('onboarding.profile')}</p>
            <p className="font-semibold">{draft.fullName}</p>
            <p className="text-muted">{draft.headline}</p>
          </div>
          <div>
            <p className="text-xs text-muted">{tr('onboarding.target')}</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {preferences.targetRoles.map((r) => (
                <Badge key={r} tone="match">
                  {r}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-muted">{tr('onboarding.location')}</p>
            <p>{preferences.locations.join(' · ')}</p>
          </div>
        </div>
        <button type="button" onClick={completeOnboarding} className="btn-primary mt-6 w-full py-3">
          {tr('onboarding.continue')}
        </button>
      </div>
    </div>
  )
}

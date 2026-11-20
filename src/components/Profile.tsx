import { useApp } from '../context/AppContext'

export function Profile() {
  const { tr, profile, setDraft } = useApp()
  const d = profile.draft

  return (
    <div className="page max-w-xl space-y-5">
      <header className="fade-in">
        <h1 className="font-display text-[1.65rem] font-semibold sm:text-3xl">{tr('profile.title')}</h1>
        <p className="mt-1 text-sm text-muted">Demo: Anna Berger · Diätassistentin · Berlin</p>
      </header>

      <section className="surface rounded-2xl p-5 grid gap-3 sm:grid-cols-2">
        {(
          [
            ['fullName', 'Name', d.fullName],
            ['email', 'E-Mail', d.email],
            ['phone', 'Telefon', d.phone],
            ['city', 'Stadt', d.city],
            ['headline', 'Headline', d.headline],
            ['availability', 'Verfügbarkeit', d.availability],
          ] as const
        ).map(([key, label, value]) => (
          <label key={key} className="block text-xs text-muted sm:col-span-1">
            {label}
            <input
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--ink)]"
              value={value}
              onChange={(e) => setDraft((prev) => ({ ...prev, [key]: e.target.value }))}
            />
          </label>
        ))}
        <label className="block text-xs text-muted sm:col-span-2">
          Zusammenfassung
          <textarea
            className="mt-1 min-h-24 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--ink)]"
            value={d.summary}
            onChange={(e) => setDraft((prev) => ({ ...prev, summary: e.target.value }))}
          />
        </label>
        <label className="block text-xs text-muted sm:col-span-2">
          Kompetenzen (kommagetrennt)
          <input
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--ink)]"
            value={d.skills.join(', ')}
            onChange={(e) =>
              setDraft((prev) => ({
                ...prev,
                skills: e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
              }))
            }
          />
        </label>
        <p className="sm:col-span-2 text-xs text-muted">{tr('profile.save')} — auto</p>
      </section>
    </div>
  )
}

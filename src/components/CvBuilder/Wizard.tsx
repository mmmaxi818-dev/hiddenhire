import { createId } from '../../data/defaultProfile'
import { useApp } from '../../context/AppContext'
import type { CvDraft } from '../../types'

const STEP_KEYS = [
  'cv.step.personal',
  'cv.step.education',
  'cv.step.experience',
  'cv.step.skills',
  'cv.step.languages',
  'cv.step.availability',
] as const

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
}) {
  return (
    <label className="block text-xs font-medium text-muted">
      {label}
      {multiline ? (
        <textarea
          className="input min-h-24"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input className="input" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  )
}

export function Wizard({
  step,
  setStep,
  onPreview,
}: {
  step: number
  setStep: (n: number) => void
  onPreview: () => void
}) {
  const { tr, profile, setDraft } = useApp()
  const draft = profile.draft

  const patch = (partial: Partial<CvDraft>) => setDraft((d) => ({ ...d, ...partial }))

  return (
    <div className="space-y-4">
      <section className="surface fade-in rounded-[1.25rem] p-4 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          CV Builder · Lebenslauf
        </p>
        <h2 className="font-display mt-1 text-xl text-[var(--ink)]">
          Angaben für Ihren Lebenslauf
        </h2>
        <p className="mt-1 text-sm text-muted">
          Schritt {step + 1} von 6: {tr(STEP_KEYS[step]!)}. Es werden keine Fakten erfunden.
        </p>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {STEP_KEYS.map((key, i) => (
            <button
              key={key}
              type="button"
              onClick={() => setStep(i)}
              className={`min-h-11 shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold ${
                i === step ? 'bg-[var(--accent)] text-white' : 'bg-[var(--chip)] text-muted'
              }`}
            >
              {i + 1}. {tr(key)}
            </button>
          ))}
        </div>

        {step === 0 && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Field
              label="Vollständiger Name"
              value={draft.fullName}
              onChange={(v) => patch({ fullName: v })}
            />
            <Field
              label="Berufliche Headline"
              value={draft.headline}
              onChange={(v) => patch({ headline: v })}
            />
            <Field label="E-Mail" value={draft.email} onChange={(v) => patch({ email: v })} />
            <Field label="Telefon" value={draft.phone} onChange={(v) => patch({ phone: v })} />
            <Field label="Stadt / PLZ" value={draft.city} onChange={(v) => patch({ city: v })} />
            <Field label="Land" value={draft.country} onChange={(v) => patch({ country: v })} />
            <div className="sm:col-span-2">
              <Field
                label="Kurzprofil"
                value={draft.summary}
                onChange={(v) => patch({ summary: v })}
                multiline
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="mt-4 space-y-4">
            {draft.education.map((edu, idx) => (
              <div key={edu.id} className="grid gap-3 rounded-xl bg-[var(--chip)]/50 p-3 sm:grid-cols-2">
                <Field
                  label="Abschluss"
                  value={edu.degree}
                  onChange={(v) => {
                    const education = [...draft.education]
                    education[idx] = { ...edu, degree: v }
                    patch({ education })
                  }}
                />
                <Field
                  label="Schule"
                  value={edu.school}
                  onChange={(v) => {
                    const education = [...draft.education]
                    education[idx] = { ...edu, school: v }
                    patch({ education })
                  }}
                />
                <Field
                  label="Zeitraum"
                  value={edu.period}
                  onChange={(v) => {
                    const education = [...draft.education]
                    education[idx] = { ...edu, period: v }
                    patch({ education })
                  }}
                />
                <Field
                  label="Details"
                  value={edu.details ?? ''}
                  onChange={(v) => {
                    const education = [...draft.education]
                    education[idx] = { ...edu, details: v }
                    patch({ education })
                  }}
                />
              </div>
            ))}
            <Field
              label="Zertifikate (kommagetrennt)"
              value={draft.certifications.join(', ')}
              onChange={(v) =>
                patch({
                  certifications: v
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
            <button
              type="button"
              className="text-sm text-[var(--accent)]"
              onClick={() =>
                patch({
                  education: [
                    ...draft.education,
                    {
                      id: createId('edu'),
                      school: '',
                      degree: '',
                      period: '',
                    },
                  ],
                })
              }
            >
              + Ausbildung
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="mt-4 space-y-4">
            {draft.experience.map((exp, idx) => (
              <div key={exp.id} className="grid gap-3 rounded-xl bg-[var(--chip)]/50 p-3 sm:grid-cols-2">
                <Field
                  label="Position"
                  value={exp.title}
                  onChange={(v) => {
                    const experience = [...draft.experience]
                    experience[idx] = { ...exp, title: v }
                    patch({ experience })
                  }}
                />
                <Field
                  label="Arbeitgeber"
                  value={exp.employer}
                  onChange={(v) => {
                    const experience = [...draft.experience]
                    experience[idx] = { ...exp, employer: v }
                    patch({ experience })
                  }}
                />
                <Field
                  label="Zeitraum"
                  value={exp.period}
                  onChange={(v) => {
                    const experience = [...draft.experience]
                    experience[idx] = { ...exp, period: v }
                    patch({ experience })
                  }}
                />
                <div className="sm:col-span-2">
                  <Field
                    label="Beschreibung"
                    value={exp.description}
                    onChange={(v) => {
                      const experience = [...draft.experience]
                      experience[idx] = { ...exp, description: v }
                      patch({ experience })
                    }}
                    multiline
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="text-sm text-[var(--accent)]"
              onClick={() =>
                patch({
                  experience: [
                    ...draft.experience,
                    {
                      id: createId('exp'),
                      title: '',
                      employer: '',
                      period: '',
                      description: '',
                    },
                  ],
                })
              }
            >
              + Station
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="mt-4">
            <Field
              label="Fachkenntnisse (kommagetrennt)"
              value={draft.skills.join(', ')}
              onChange={(v) =>
                patch({
                  skills: v
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              multiline
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {draft.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-[var(--match)]/15 px-2.5 py-0.5 text-[10px] font-semibold text-[var(--match)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="mt-4 space-y-4">
            {draft.languages.map((lang, idx) => (
              <div key={lang.id} className="grid gap-3 sm:grid-cols-2">
                <Field
                  label="Sprache"
                  value={lang.language}
                  onChange={(v) => {
                    const languages = [...draft.languages]
                    languages[idx] = { ...lang, language: v }
                    patch({ languages })
                  }}
                />
                <Field
                  label="Niveau"
                  value={lang.level}
                  onChange={(v) => {
                    const languages = [...draft.languages]
                    languages[idx] = { ...lang, level: v }
                    patch({ languages })
                  }}
                />
              </div>
            ))}
            <Field
              label="Soft Skills (kommagetrennt)"
              value={draft.softSkills.join(', ')}
              onChange={(v) =>
                patch({
                  softSkills: v
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
          </div>
        )}

        {step === 5 && (
          <div className="mt-4 space-y-3">
            <Field
              label="Verfügbarkeit"
              value={draft.availability}
              onChange={(v) => patch({ availability: v })}
            />
            <Field
              label="Karriereziel"
              value={draft.careerGoals}
              onChange={(v) => patch({ careerGoals: v })}
              multiline
            />
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep(Math.max(0, step - 1))}
            className="btn-ghost w-full disabled:opacity-40 sm:w-auto"
          >
            {tr('cv.back')}
          </button>
          {step < STEP_KEYS.length - 1 ? (
            <button type="button" onClick={() => setStep(step + 1)} className="btn-primary w-full sm:w-auto">
              {tr('cv.next')} ›
            </button>
          ) : (
            <button type="button" onClick={onPreview} className="btn-primary w-full sm:w-auto">
              {tr('cv.toPreview')}
            </button>
          )}
        </div>
      </section>
    </div>
  )
}

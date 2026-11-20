import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { importCvFile, parseCvText } from '../../services/cvImport'
import type { CvDraft, CvImportResult } from '../../types'

function mergeDraft(base: CvDraft, partial: Partial<CvDraft>): CvDraft {
  return {
    ...base,
    ...partial,
    education: partial.education ?? base.education,
    experience: partial.experience ?? base.experience,
    skills: partial.skills ?? base.skills,
    languages: partial.languages ?? base.languages,
    softSkills: partial.softSkills ?? base.softSkills,
    certifications: partial.certifications ?? base.certifications,
  }
}

export function ImportPanel() {
  const { tr, profile, setDraft } = useApp()
  const [paste, setPaste] = useState('')
  const [result, setResult] = useState<CvImportResult | null>(null)
  const [showRaw, setShowRaw] = useState(false)
  const [busy, setBusy] = useState(false)

  const applyResult = (r: CvImportResult) => {
    setResult(r)
    setDraft((prev) => mergeDraft(prev, r.draft))
  }

  const onParsePaste = () => {
    if (!paste.trim()) return
    applyResult(parseCvText(paste))
  }

  const onFile = async (file: File | null) => {
    if (!file) return
    setBusy(true)
    try {
      const r = await importCvFile(file)
      applyResult(r)
    } catch {
      setResult({
        draft: {},
        recognized: [],
        rawText: '',
        warnings: ['Import fehlgeschlagen / import failed'],
      })
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="surface rounded-2xl p-5">
      <h2 className="font-display text-lg font-semibold">{tr('cv.import')}</h2>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label className="cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--chip)] px-3 py-2 text-sm">
          {tr('cv.chooseFile')}
          <input
            type="file"
            accept=".pdf,.docx,.txt,application/pdf,text/plain"
            className="hidden"
            onChange={(e) => void onFile(e.target.files?.[0] ?? null)}
          />
        </label>
        {busy ? <span className="text-xs text-muted">{tr('common.loading')}</span> : null}
      </div>
      <label className="mt-3 block text-xs text-muted">
        {tr('cv.paste')}
        <textarea
          className="mt-1 min-h-24 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--ink)]"
          placeholder={tr('cv.pastePlaceholder')}
          value={paste}
          onChange={(e) => setPaste(e.target.value)}
        />
      </label>
      <button
        type="button"
        onClick={onParsePaste}
        className="mt-2 rounded-xl bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-white"
      >
        {tr('cv.parsePaste')}
      </button>

      {result ? (
        <div className="mt-4 space-y-2 text-sm">
          <p className="font-semibold">{tr('cv.recognized')}</p>
          <ul className="list-disc space-y-1 pl-5 text-muted">
            {result.recognized.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="text-xs text-amber-800 dark:text-amber-200">{tr('cv.warning')}</p>
          <p className="text-xs text-muted">
            Profil: {profile.draft.fullName} · {profile.draft.email}
          </p>
          <button
            type="button"
            className="text-xs text-[var(--accent)] underline-offset-2 hover:underline"
            onClick={() => setShowRaw((v) => !v)}
          >
            {tr('cv.showRaw')}
          </button>
          {showRaw ? (
            <pre className="max-h-40 overflow-auto rounded-xl bg-[var(--chip)] p-3 text-xs whitespace-pre-wrap">
              {result.rawText}
            </pre>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}

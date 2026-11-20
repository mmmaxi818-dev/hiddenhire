import { useLayoutEffect, useEffect, useMemo, useRef, useState } from 'react'
import { useApp } from '../../context/AppContext'
import { generateApplication } from '../../services/generation/anthropic'
import {
  adaptationNotes,
  buildAnschreiben,
  buildKurzNachricht,
  buildLebenslaufHtml,
  buildLebenslaufText,
} from '../../services/lebenslauf'
import type { GenerationTone, JobPost, Locale } from '../../types'

/** Capture fixed A4 `.cv-page` at scale 1 — matches desktop web layout. */
async function exportPdf(previewRoot: HTMLElement, filename: string) {
  const html2canvas = (await import('html2canvas')).default
  const { jsPDF } = await import('jspdf')
  const source = (previewRoot.querySelector('.cv-page') as HTMLElement | null) ?? previewRoot
  const host = document.createElement('div')
  host.className = 'cv-export-host'
  const clone = source.cloneNode(true) as HTMLElement
  clone.style.transform = 'none'
  clone.style.width = '210mm'
  clone.style.minHeight = '297mm'
  clone.style.maxWidth = 'none'
  host.appendChild(clone)
  document.body.appendChild(host)
  try {
    const canvas = await html2canvas(clone, {
      scale: 2.5,
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
      windowWidth: clone.scrollWidth,
      windowHeight: clone.scrollHeight,
    })
    const img = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height)
    const w = canvas.width * ratio
    const h = canvas.height * ratio
    const x = (pageWidth - w) / 2
    const y = Math.max(0, (pageHeight - h) / 2)
    pdf.addImage(img, 'PNG', x, y, w, h)
    pdf.save(filename)
  } finally {
    host.remove()
  }
}

function downloadDocxLike(text: string, filename: string) {
  const blob = new Blob([text], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename.replace(/\.pdf$/i, '.docx')
  a.click()
  URL.revokeObjectURL(url)
}

function readPhotoFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result ?? ''))
    reader.onerror = () => reject(reader.error ?? new Error('photo read failed'))
    reader.readAsDataURL(file)
  })
}

/** Neutral portrait placeholder when “mit Foto” is on but no upload yet */
function initialsPlaceholder(name: string): string {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="340" viewBox="0 0 280 340">
  <rect width="280" height="340" fill="#cfd6cf"/>
  <rect x="0" y="0" width="280" height="340" fill="#b7c0b7"/>
  <circle cx="140" cy="128" r="58" fill="#8a968a"/>
  <ellipse cx="140" cy="300" rx="110" ry="100" fill="#8a968a"/>
  <text x="140" y="300" text-anchor="middle" fill="#f5f5f0" font-family="Inter,Arial,sans-serif" font-size="36" font-weight="700">${initials}</text>
</svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export function Preview({
  post,
  onBack,
}: {
  post: JobPost
  onBack: () => void
}) {
  const { tr, profile, locale, upsertApplication, setDraft } = useApp()
  const [tone, setTone] = useState<GenerationTone>('formal')
  const [genLocale, setGenLocale] = useState<Locale>(locale)
  const [source, setSource] = useState<'anthropic' | 'mock'>('mock')
  const [copied, setCopied] = useState(false)
  const [withPhoto, setWithPhoto] = useState(Boolean(profile.draft.photoDataUrl))
  const photoInputRef = useRef<HTMLInputElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const scalerRef = useRef<HTMLDivElement>(null)
  const cvRef = useRef<HTMLDivElement>(null)
  const de = genLocale === 'de'

  const draftForCv = useMemo(() => {
    if (!withPhoto) return { ...profile.draft, photoDataUrl: undefined }
    if (profile.draft.photoDataUrl) return profile.draft
    return {
      ...profile.draft,
      photoDataUrl: initialsPlaceholder(profile.draft.fullName),
    }
  }, [profile.draft, withPhoto])

  // Immediate locale-aware document bodies (preview + PDF) — switch DE/EN without waiting on API
  const lebenslaufHtml = useMemo(
    () => buildLebenslaufHtml(draftForCv, post, genLocale, { withPhoto }),
    [draftForCv, post, genLocale, withPhoto],
  )
  const lebenslaufText = useMemo(
    () => buildLebenslaufText(draftForCv, post, genLocale, { withPhoto }),
    [draftForCv, post, genLocale, withPhoto],
  )
  const anschreiben = useMemo(
    () => buildAnschreiben(profile.draft, post, genLocale, tone),
    [profile.draft, post, genLocale, tone],
  )
  const kurzNachricht = useMemo(
    () => buildKurzNachricht(profile.draft, post, genLocale),
    [profile.draft, post, genLocale],
  )
  const adaptations = useMemo(
    () => adaptationNotes(post, genLocale),
    [post, genLocale],
  )

  // Scale fixed A4 page to fit stage width — transform only, never reflow.
  useLayoutEffect(() => {
    const stage = stageRef.current
    const scaler = scalerRef.current
    if (!stage || !scaler) return

    const update = () => {
      const page = scaler.querySelector('.cv-page') as HTMLElement | null
      const pageWidth = page?.offsetWidth || scaler.offsetWidth
      const pageHeight = page?.offsetHeight || scaler.offsetHeight
      if (!pageWidth) return
      const pad = parseFloat(getComputedStyle(stage).paddingLeft) || 0
      const available = stage.clientWidth - pad * 2
      const next = Math.min(1, Math.max(0.2, available / pageWidth))
      stage.style.setProperty('--cv-scale', String(next))
      stage.style.height = `${pageHeight * next + pad * 2}px`
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(stage)
    const page = scaler.querySelector('.cv-page')
    if (page) ro.observe(page)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [lebenslaufHtml, withPhoto])

  useEffect(() => {
    let cancelled = false
    void generateApplication({
      post,
      draft: profile.draft,
      locale: genLocale,
      tone,
    }).then(({ source: src }) => {
      if (cancelled) return
      setSource(src)
      upsertApplication(
        post.id,
        'applied',
        {
          title: post.title,
          employer: post.employer,
          location: post.location,
          kind: post.kind,
        },
        {
          lebenslaufHtml: buildLebenslaufHtml(draftForCv, post, genLocale, { withPhoto }),
          lebenslaufText: buildLebenslaufText(draftForCv, post, genLocale, { withPhoto }),
          anschreiben: buildAnschreiben(profile.draft, post, genLocale, tone),
          kurzNachricht: buildKurzNachricht(profile.draft, post, genLocale),
          adaptations: adaptationNotes(post, genLocale),
          language: genLocale,
          tone,
        },
      )
    })
    return () => {
      cancelled = true
    }
  }, [post, profile.draft, draftForCv, genLocale, tone, withPhoto, upsertApplication])

  const filename = `HiddenHire-${post.employer.replace(/[^\w\-]+/g, ' ').trim()}-application.pdf`

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <p>
          {de ? 'Quelle' : 'Source'}:{' '}
          {source === 'mock'
            ? de
              ? 'Vorlagen (Mock-Fallback)'
              : 'Templates (mock fallback)'
            : 'Anthropic'}{' '}
          · {new Date().toLocaleString(genLocale === 'de' ? 'de-DE' : 'en-GB')}
        </p>
        <button type="button" onClick={onBack} className="btn-outline text-xs">
          {de ? 'CV Builder erneut öffnen' : 'Reopen CV Builder'}
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <label className="text-[11px] text-muted">
          {de ? 'Dokumentsprache' : 'Document language'}
          <select
            className="input mt-1 min-w-[8rem]"
            value={genLocale}
            onChange={(e) => setGenLocale(e.target.value as Locale)}
          >
            <option value="de">Deutsch</option>
            <option value="en">English</option>
          </select>
        </label>
        <label className="text-[11px] text-muted">
          {de ? 'Anschreiben-Ton' : 'Cover letter tone'}
          <select
            className="input mt-1 min-w-[8rem]"
            value={tone}
            onChange={(e) => setTone(e.target.value as GenerationTone)}
          >
            <option value="formal">{tr('cv.formal')}</option>
            <option value="friendly">{tr('cv.friendly')}</option>
          </select>
        </label>
      </div>

      <section className="surface rounded-2xl p-4 text-sm text-muted">
        <p className="font-semibold text-[var(--ink)]">{tr('cv.adaptations')}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {adaptations.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>

      <section className="surface fade-in rounded-2xl p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
          <h2 className="font-display text-lg text-[var(--ink)]">
            {de ? 'Lebenslauf (eine Seite, A4)' : 'CV (one page, A4)'}
          </h2>
          <button
            type="button"
            className="text-xs font-medium text-[var(--accent)]"
            onClick={async () => {
              await navigator.clipboard.writeText(lebenslaufText)
              setCopied(true)
              setTimeout(() => setCopied(false), 1500)
            }}
          >
            {copied ? tr('cv.copied') : tr('cv.copy')}
          </button>
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--chip)] px-3 py-2.5">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            {de ? 'Foto' : 'Photo'}
          </span>
          <div className="flex overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold">
            <button
              type="button"
              className={`min-h-11 px-3.5 py-2 ${!withPhoto ? 'bg-[var(--accent)] text-white' : 'text-[var(--ink)]'}`}
              onClick={() => setWithPhoto(false)}
            >
              {de ? 'Ohne Foto' : 'Without photo'}
            </button>
            <button
              type="button"
              className={`min-h-11 px-3.5 py-2 ${withPhoto ? 'bg-[var(--accent)] text-white' : 'text-[var(--ink)]'}`}
              onClick={() => setWithPhoto(true)}
            >
              {de ? 'Mit Foto' : 'With photo'}
            </button>
          </div>
          {withPhoto ? (
            <>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  void readPhotoFile(file).then((dataUrl) => {
                    setDraft((d) => ({ ...d, photoDataUrl: dataUrl }))
                  })
                }}
              />
              <button
                type="button"
                className="btn-outline text-xs"
                onClick={() => photoInputRef.current?.click()}
              >
                {profile.draft.photoDataUrl
                  ? de
                    ? 'Foto ändern'
                    : 'Change photo'
                  : de
                    ? 'Foto hochladen'
                    : 'Upload photo'}
              </button>
              {profile.draft.photoDataUrl ? (
                <button
                  type="button"
                  className="text-xs font-medium text-muted underline"
                  onClick={() => setDraft((d) => ({ ...d, photoDataUrl: undefined }))}
                >
                  {de ? 'Entfernen' : 'Remove'}
                </button>
              ) : (
                <span className="text-[11px] text-muted">
                  {de ? 'Platzhalter bis Upload' : 'Placeholder until upload'}
                </span>
              )}
            </>
          ) : null}
        </div>

        <div ref={stageRef} className="cv-preview">
          <div
            ref={(node) => {
              scalerRef.current = node
              cvRef.current = node
            }}
            className="cv-preview-scaler"
            dangerouslySetInnerHTML={{ __html: lebenslaufHtml }}
          />
        </div>
      </section>

      <section className="surface rounded-2xl p-5">
        <h2 className="font-display text-lg text-[var(--ink)]">
          {de ? 'Anschreiben' : 'Cover letter'}
        </h2>
        <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted">
          {anschreiben}
        </pre>
      </section>

      <section className="surface rounded-2xl p-5">
        <h2 className="font-display text-lg text-[var(--ink)]">
          {de ? 'Kurz-Nachricht / DM' : 'Short message / DM'}
        </h2>
        <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted">
          {kurzNachricht}
        </pre>
      </section>

      <div className="flex flex-wrap gap-2 pb-8">
        <button
          type="button"
          onClick={() => {
            if (cvRef.current) void exportPdf(cvRef.current, filename)
          }}
          className="btn-primary px-5 py-2.5"
        >
          {tr('cv.exportPdf')}
        </button>
        <button
          type="button"
          onClick={() =>
            downloadDocxLike(
              `${lebenslaufText}\n\n---\n\n${anschreiben}\n\n---\n\n${kurzNachricht}`,
              filename,
            )
          }
          className="btn-outline"
        >
          {tr('cv.exportDocx')}
        </button>
      </div>
    </div>
  )
}

import mammoth from 'mammoth'
import type { CvDraft, CvImportResult, ExperienceEntry } from '../types'
import { createId } from '../data/defaultProfile'

async function extractPdfText(file: File): Promise<string> {
  const pdfjs = await import('pdfjs-dist')
  // Use CDN worker for Vite; fall back to empty if worker fails
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString()
  const data = new Uint8Array(await file.arrayBuffer())
  const doc = await pdfjs.getDocument({ data }).promise
  const parts: string[] = []
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i)
    const content = await page.getTextContent()
    const line = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ')
    parts.push(line)
  }
  return parts.join('\n')
}

export async function extractTextFromFile(file: File): Promise<string> {
  const name = file.name.toLowerCase()
  if (name.endsWith('.txt') || file.type.startsWith('text/')) {
    return file.text()
  }
  if (name.endsWith('.docx') || file.type.includes('wordprocessingml')) {
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() })
    return result.value
  }
  if (name.endsWith('.pdf') || file.type === 'application/pdf') {
    return extractPdfText(file)
  }
  return file.text()
}

function findEmail(text: string): string | undefined {
  return text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0]
}

function findPhone(text: string): string | undefined {
  return text.match(/(?:\+?\d{1,3}[\s/-]?)?(?:\(?\d{2,5}\)?[\s/-]?)?\d{3,}[\s/-]?\d{3,}/)?.[0]
}

function firstNonEmptyLines(text: string, n: number): string[] {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, n)
}

export function parseCvText(rawText: string): CvImportResult {
  const recognized: string[] = []
  const warnings: string[] = [
    'Extraktion ist best-effort. Bitte alle Felder vor der Generierung prüfen.',
  ]
  const draft: Partial<CvDraft> = {}

  const email = findEmail(rawText)
  if (email) {
    draft.email = email
    recognized.push('E-Mail erkannt')
  }
  const phone = findPhone(rawText)
  if (phone) {
    draft.phone = phone.trim()
    recognized.push('Telefon erkannt')
  }

  const lines = firstNonEmptyLines(rawText, 8)
  if (lines[0] && lines[0].length < 60 && !lines[0].includes('@')) {
    draft.fullName = lines[0]
    recognized.push('Name aus Kopfzeile übernommen')
  }
  const headlineLine = lines.find(
    (l) =>
      /diät|ernährung|diet|nutrition|assistent/i.test(l) &&
      l !== draft.fullName &&
      l.length < 120,
  )
  if (headlineLine) {
    draft.headline = headlineLine
    recognized.push('Headline erkannt')
  }

  const exp: ExperienceEntry[] = []
  const expBlock = rawText.match(
    /(?:Berufserfahrung|Experience|Tätigkeit)[:\s]*([\s\S]{0,800})/i,
  )
  if (expBlock) {
    const chunk = expBlock[1] ?? ''
    const period = chunk.match(/(\d{4}\s*[–\-—]\s*(?:\d{4}|Heute|Present|heute))/i)?.[0]
    const employer =
      chunk.match(/(?:bei|at|·|,)\s*([A-ZÄÖÜ][\wÄÖÜäöüß\-&.\s]{2,40})/)?.[1]?.trim() ??
      'Klinik'
    const titleMatch = chunk.match(
      /(Diätassistent\S*|Ernährungsberater\S*|Dietitian[^\n,]*)/i,
    )
    exp.push({
      id: createId('exp'),
      title: titleMatch?.[1]?.trim() ?? 'Diätassistent:in',
      employer: employer,
      period: period ?? '2021 – Heute',
      description: chunk.split('\n').map((s) => s.trim()).filter(Boolean)[1] ?? 'Diättherapie',
    })
    recognized.push(`${exp.length} Berufsstation(en) erkannt`)
    draft.experience = exp
  }

  const skillSection = rawText.match(
    /(?:Kompetenzen|Skills|Fachkenntnisse|Kenntnisse)[:\s]*([^\n]+(?:\n[^\n]+){0,3})/i,
  )
  if (skillSection) {
    const skills = (skillSection[1] ?? '')
      .split(/[,·•|\n]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 2 && s.length < 40)
      .slice(0, 12)
    if (skills.length) {
      draft.skills = skills
      recognized.push(`${skills.length} Kompetenz(en) erkannt`)
    }
  }

  if (!recognized.length) {
    warnings.push('Wenig strukturierte Daten gefunden — Felder manuell prüfen.')
  }

  return { draft, recognized, rawText, warnings }
}

export async function importCvFile(file: File): Promise<CvImportResult> {
  const rawText = await extractTextFromFile(file)
  return parseCvText(rawText)
}

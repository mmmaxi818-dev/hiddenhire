import type { CvDraft, GenerationTone, JobPost, Locale } from '../types'

export type LebenslaufOptions = {
  /** Match ChatGPT template right variant when true */
  withPhoto?: boolean
}

const ICON_MAIL = `<svg class="cv-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"/></svg>`
const ICON_PHONE = `<svg class="cv-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8Z"/></svg>`
const ICON_PIN = `<svg class="cv-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"/></svg>`

export function buildLebenslaufText(
  draft: CvDraft,
  _post: JobPost,
  locale: Locale,
  _options: LebenslaufOptions = {},
): string {
  const lines = [
    draft.fullName,
    draft.headline,
    `${draft.email} · ${draft.phone} · ${draft.city}, ${draft.country}`,
    '',
    locale === 'de' ? 'Berufserfahrung' : 'Professional Experience',
    ...draft.experience.map(
      (e) => `${e.title}  ${e.period}\n${e.employer}\n${toBullets(e.description).map((b) => `• ${b}`).join('\n')}`,
    ),
    '',
    locale === 'de' ? 'Ausbildung' : 'Education',
    ...draft.education.map(
      (e) =>
        `${e.degree}  ${e.period}\n${e.school}${e.details ? `\n${e.details}` : ''}`,
    ),
    '',
    locale === 'de' ? 'Kenntnisse' : 'Skills',
    `${locale === 'de' ? 'Fachkompetenzen' : 'Skills'}: ${draft.skills.join(', ')}`,
    draft.softSkills.length
      ? `Soft Skills: ${draft.softSkills.join(', ')}`
      : '',
    draft.certifications.length
      ? `${locale === 'de' ? 'Zertifikate' : 'Certificates'}: ${draft.certifications.join(', ')}`
      : '',
    '',
    locale === 'de' ? 'Sprachen' : 'Languages',
    ...draft.languages.map((l) => `${l.language} – ${l.level}`),
  ].filter((line) => line !== '')
  return lines.join('\n')
}

function toBullets(description: string): string[] {
  const parts = description
    .split(/\n+|;\s+|•\s+/)
    .flatMap((chunk) => chunk.split(/(?<=\.)\s+(?=[A-ZÄÖÜ])/))
    .map((s) => s.trim().replace(/^[-–—]\s*/, ''))
    .filter(Boolean)
  if (parts.length <= 1) {
    const trimmed = description.trim()
    return trimmed ? [trimmed] : []
  }
  return parts
}

function experienceBlocks(draft: CvDraft): string {
  return draft.experience
    .map((e) => {
      const bullets = toBullets(e.description)
        .map((b) => `<li>${escapeHtml(b)}</li>`)
        .join('')
      return `
    <article class="cv-entry">
      <div class="cv-entry-head">
        <h3 class="cv-entry-title">${escapeHtml(e.title)}</h3>
        <span class="cv-entry-date">${escapeHtml(e.period)}</span>
      </div>
      <p class="cv-entry-sub">${escapeHtml(e.employer)}</p>
      ${bullets ? `<ul class="cv-bullets">${bullets}</ul>` : ''}
    </article>`
    })
    .join('')
}

function educationBlocks(draft: CvDraft): string {
  return draft.education
    .map((e) => {
      return `
    <article class="cv-entry">
      <div class="cv-entry-head">
        <h3 class="cv-entry-title">${escapeHtml(e.degree)}</h3>
        <span class="cv-entry-date">${escapeHtml(e.period)}</span>
      </div>
      <p class="cv-entry-sub">${escapeHtml(e.school)}</p>
      ${e.details ? `<p class="cv-entry-detail">${escapeHtml(e.details)}</p>` : ''}
    </article>`
    })
    .join('')
}

export function buildLebenslaufHtml(
  draft: CvDraft,
  post: JobPost,
  locale: Locale,
  options: LebenslaufOptions = {},
): string {
  const de = locale === 'de'
  const withPhoto = Boolean(options.withPhoto && draft.photoDataUrl)
  const location = `${draft.city}, ${draft.country}`

  const skillsRows = [
    draft.skills.length
      ? `<p class="cv-skill-row"><strong>${de ? 'Fachkompetenzen' : 'Skills'}:</strong> ${escapeHtml(draft.skills.join(', '))}</p>`
      : '',
    draft.softSkills.length
      ? `<p class="cv-skill-row"><strong>Soft Skills:</strong> ${escapeHtml(draft.softSkills.join(', '))}</p>`
      : '',
    draft.certifications.length
      ? `<p class="cv-skill-row"><strong>${de ? 'Zertifikate' : 'Certificates'}:</strong> ${escapeHtml(draft.certifications.join(', '))}</p>`
      : '',
    draft.availability
      ? `<p class="cv-skill-row"><strong>${de ? 'Verfügbarkeit' : 'Availability'}:</strong> ${escapeHtml(draft.availability)}</p>`
      : '',
  ].join('')

  const languageRows = draft.languages
    .map(
      (l) =>
        `<p class="cv-lang-row"><strong>${escapeHtml(l.language)}</strong> – ${escapeHtml(l.level)}</p>`,
    )
    .join('')

  const photo = withPhoto
    ? `<div class="cv-photo"><img src="${escapeAttr(draft.photoDataUrl!)}" alt="" /></div>`
    : ''

  return `
<section class="cv-page${withPhoto ? ' cv-page--photo' : ''}">
  <header class="cv-header">
    <div class="cv-header-main">
      <h1>${escapeHtml(draft.fullName)}</h1>
      <p class="cv-role">${escapeHtml(draft.headline)}</p>
      <p class="cv-contact" aria-label="Kontakt">
        <span class="cv-contact-item">${ICON_MAIL}<span>${escapeHtml(draft.email)}</span></span>
        <span class="cv-pipe" aria-hidden="true">|</span>
        <span class="cv-contact-item">${ICON_PHONE}<span>${escapeHtml(draft.phone)}</span></span>
        <span class="cv-pipe" aria-hidden="true">|</span>
        <span class="cv-contact-item">${ICON_PIN}<span>${escapeHtml(location)}</span></span>
      </p>
    </div>
    ${photo}
  </header>

  <p class="cv-ref">
    ${de ? 'Bewerbung als' : 'Application for'}
    <strong>${escapeHtml(post.title)}</strong>
    ${de ? 'bei' : 'at'}
    ${escapeHtml(post.employer)}
  </p>

  <section class="cv-section">
    <h2>${de ? 'Berufserfahrung' : 'Professional Experience'}</h2>
    ${experienceBlocks(draft)}
  </section>

  <section class="cv-section">
    <h2>${de ? 'Ausbildung' : 'Education'}</h2>
    ${educationBlocks(draft)}
  </section>

  <section class="cv-section">
    <h2>${de ? 'Kenntnisse' : 'Skills'}</h2>
    ${skillsRows}
  </section>

  <section class="cv-section">
    <h2>${de ? 'Sprachen' : 'Languages'}</h2>
    ${languageRows}
  </section>
</section>`.trim()
}

export function buildAnschreiben(
  draft: CvDraft,
  post: JobPost,
  locale: Locale,
  tone: GenerationTone,
): string {
  const contact = post.contact
  if (locale === 'de') {
    const greeting = contact
      ? `Sehr geehrte/r ${contact}`
      : tone === 'formal'
        ? 'Sehr geehrte Damen und Herren'
        : `Hallo ${post.employer.split(/[·/,]/)[0]?.trim() ?? 'Team'}`
    return [
      `${greeting},`,
      '',
      `mit großem Interesse bewerbe ich mich als ${post.title} bei ${post.employer}.`,
      '',
      `Als ${draft.headline} bringe ich Erfahrung in ${draft.skills.slice(0, 3).join(', ')} mit. Zuletzt war ich als ${draft.experience[0]?.title ?? 'Diätassistent:in'} bei ${draft.experience[0]?.employer ?? 'einem Klinikum'} tätig.`,
      '',
      `${post.snippet}`,
      '',
      `Meine Verfügbarkeit: ${draft.availability}. ${draft.careerGoals}`,
      '',
      'Über die Gelegenheit zu einem Gespräch freue ich mich sehr.',
      '',
      'Mit freundlichen Grüßen',
      draft.fullName,
    ].join('\n')
  }

  const greeting = contact
    ? `Dear ${contact}`
    : tone === 'formal'
      ? 'Dear Hiring Team'
      : `Hello ${post.employer.split(/[·/,]/)[0]?.trim() ?? 'team'}`
  return [
    `${greeting},`,
    '',
    `I am applying for the ${post.title} role at ${post.employer}.`,
    '',
    `As a ${draft.headline}, I bring experience in ${draft.skills.slice(0, 3).join(', ')}. Most recently I worked as ${draft.experience[0]?.title ?? 'dietitian'} at ${draft.experience[0]?.employer ?? 'a hospital'}.`,
    '',
    post.snippet,
    '',
    `Availability: ${draft.availability}. ${draft.careerGoals}`,
    '',
    'I would welcome the chance to speak with you.',
    '',
    'Kind regards',
    draft.fullName,
  ].join('\n')
}

export function buildKurzNachricht(
  draft: CvDraft,
  post: JobPost,
  locale: Locale,
): string {
  if (locale === 'de') {
    const who = post.contact?.split(' ')[0] ?? post.employer.split(/[·/,]/)[0]?.trim() ?? 'Team'
    return `Hallo ${who} — ich habe Ihren Beitrag zur Rolle „${post.title}“ gesehen und passe mit Schwerpunkt ${draft.skills.slice(0, 2).join(' & ')} gut. Darf ich meinen Lebenslauf schicken? Viele Grüße, ${draft.fullName}`
  }
  const who = post.contact?.split(' ')[0] ?? post.employer.split(/[·/,]/)[0]?.trim() ?? 'there'
  return `Hi ${who} — I saw your note about “${post.title}” and match well on ${draft.skills.slice(0, 2).join(' & ')}. May I send my CV? Best, ${draft.fullName}`
}

export function adaptationNotes(post: JobPost, locale: Locale): string[] {
  if (locale === 'de') {
    return [
      'Template-Layout: einseitiges A4 (~12 pt), Titel links / Datum rechts',
      `Zugeschitten auf „${post.title}“`,
      'Varianten: ohne Foto / mit Foto (Upload)',
      'Forest-green Linien & Kontakt-Icons wie Referenzvorlage',
      'Förmliches Anschreiben + Kurz-Nachricht',
    ]
  }
  return [
    'Template layout: one-page A4 (~12 pt), title left / dates right',
    `Tailored to “${post.title}”`,
    'Variants: without photo / with photo (upload)',
    'Forest-green rules & contact icons matching reference',
    'Formal cover letter + short message',
  ]
}

function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function escapeAttr(s: string): string {
  return escapeHtml(s).replaceAll("'", '&#39;')
}

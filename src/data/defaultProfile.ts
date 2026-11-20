import type { CvDraft, UserPreferences, UserProfile } from '../types'

export const defaultCvDraft: CvDraft = {
  fullName: 'Anna Berger',
  email: 'anna.berger@example.de',
  phone: '+49 30 1234567',
  city: 'Berlin',
  country: 'Deutschland',
  headline: 'Staatlich anerkannte Diätassistentin · Klinische Ernährung & Beratung',
  summary:
    'Staatlich anerkannte Diätassistentin mit Schwerpunkt klinische Ernährung, Patientenberatung und HACCP-konforme Klinikverpflegung.',
  education: [
    {
      id: 'edu-1',
      school: 'Schule für Diätassistenten Berlin',
      degree: 'Staatlich anerkannte Diätassistentin',
      period: '2016 – 2019',
      details: 'Abschlussprüfung bestanden; Schwerpunkt klinische Diätetik',
    },
  ],
  certifications: ['DDG-Fortbildungen', 'HACCP-Schulung', 'Klinische Ernährung Modul'],
  experience: [
    {
      id: 'exp-1',
      title: 'Diätassistent:in',
      employer: 'Städtisches Klinikum Mitte, Berlin',
      period: '2021 – Heute',
      description:
        'Diättherapie, Speiseplanabstimmung, interdisziplinäre Visiten und Patientenberatung in gastroenterologischen und onkologischen Bereichen.',
    },
    {
      id: 'exp-2',
      title: 'Praxisjahr Diätetik',
      employer: 'Reha-Klinik Brandenburg',
      period: '2019 – 2021',
      description:
        'Gruppendiättherapie, Lehrküche und Nährwertberechnung in der Anschlussheilbehandlung.',
    },
  ],
  skills: [
    'Diättherapie',
    'Ernährungsberatung',
    'HACCP',
    'Lehrküche',
    'Nährwertberechnung',
    'Speisepläne',
    'Patientenbetreuung',
  ],
  languages: [
    { id: 'lang-1', language: 'Deutsch', level: 'Muttersprache' },
    { id: 'lang-2', language: 'Englisch', level: 'B2' },
  ],
  softSkills: ['Teamfähigkeit', 'Empathie', 'Strukturierte Dokumentation', 'Eigeninitiative'],
  availability: '3 Monate Kündigungsfrist',
  careerGoals:
    'Klinische Diätetik in Uniklinik oder Klinikverbund; Schwerpunkt Gastroenterologie / Onkologie.',
}

export const defaultPreferences: UserPreferences = {
  locale: 'de',
  theme: 'light',
  targetRoles: ['Diätassistent:in', 'Ernährungsberater:in'],
  locations: ['Berlin', 'Hamburg', 'Remote DE/CH'],
  workModes: ['Onsite', 'Hybrid'],
  keywords: 'Diätassistent',
  listingFilter: 'live',
  onboarded: false,
}

export const defaultProfile: UserProfile = {
  draft: defaultCvDraft,
  preferences: defaultPreferences,
}

export function createId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

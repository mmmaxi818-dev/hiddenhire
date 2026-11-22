import type { CvDraft, UserPreferences, UserProfile } from '../types'

/** Demo persona seeded from Maximilian Mugrauer CV (contact fields redacted). */
export const defaultCvDraft: CvDraft = {
  fullName: 'Maximilian Mugrauer',
  email: 'maximilian@hiddenhire.demo',
  phone: '+49 ••• •••••••',
  city: 'Düsseldorf',
  country: 'Deutschland',
  headline: 'Mobilitätsingenieur · Geoanalyse, Dashboards & Verkehrsplanung',
  summary:
    'Verkehrsingenieur mit Data-Science-Hintergrund: Geoanalysen für Mobilität und Logistik, Evaluations-Dashboards (EFRE/JTF), Floating-Bike-Data und Anschlussmobilität an Bahnhöfen. Brücke zwischen Ingenieurwesen und datengetriebener Planung.',
  education: [
    {
      id: 'edu-1',
      school: 'Aalborg University, Dänemark',
      degree: 'Urban Design, Master of Science in Engineering',
      period: '09/2022 – 11/2024',
      details: 'Schwerpunkt urbane Mobilität und datenbasierte Planung',
    },
    {
      id: 'edu-2',
      school: 'University of Auckland, Neuseeland',
      degree: 'Urban Planning, Auslandssemester',
      period: '07/2023 – 11/2023',
    },
    {
      id: 'edu-3',
      school: 'Hochschule RheinMain, Wiesbaden',
      degree: 'Mobilitätsmanagement, Bachelor of Engineering',
      period: '10/2018 – 02/2022',
    },
  ],
  certifications: ['Power BI Dashboards', 'ArcGIS / QGIS Geoanalysen', 'PTV Visum Grundlagen'],
  experience: [
    {
      id: 'exp-1',
      title: 'Analyst',
      employer: 'agiplan public, Mülheim an der Ruhr',
      period: '04/2025 – Heute',
      description:
        'Geoanalysen zu Mobilitäts- und Logistikpotenzialen in Gewerbegebieten; Evaluations-Dashboard für EFRE/JTF-Mittel eines Landesministeriums; Workshops mit kommunalen Stakeholdern.',
    },
    {
      id: 'exp-2',
      title: 'Masterand',
      employer: 'Deutsche Bahn InfraGO AG, Frankfurt am Main',
      period: '12/2023 – 11/2024',
      description:
        'Analysen zu Anschlussmobilität, Logistik und Klimaresilienz von Bahnhöfen; Masterarbeit zum Einsatz von Floating-Bike-Data in der Verkehrsplanung.',
    },
    {
      id: 'exp-3',
      title: 'Wissenschaftliche Hilfskraft',
      employer: 'Hochschule RheinMain / Projekt Ladeinfrastruktur, Wiesbaden',
      period: '06/2022 – 10/2022',
      description:
        'Leitfadengestützte Interviews mit EMSPs und CPOs zur Konfiguration von Ladeinfrastruktur; wissenschaftliche Publikation der Ergebnisse.',
    },
    {
      id: 'exp-4',
      title: 'Praktikant',
      employer: 'Mercedes-Benz, Stuttgart',
      period: '04/2021 – 10/2021',
      description:
        'Mitarbeit am On-Demand-Shuttle „LiLi mobility“; Marktforschung und B2B-Interviews zu E-Mobilität; Use Cases zur Monetarisierung von Ladeinfrastruktur.',
    },
  ],
  skills: [
    'Mobilitätsplanung',
    'Verkehrsplanung',
    'GIS',
    'ArcGIS',
    'QGIS',
    'Power BI',
    'R',
    'PTV Visum',
    'ÖPNV',
    'On-Demand',
    'Geoanalyse',
    'Dashboard',
    'AutoCAD',
    'Salesforce',
  ],
  languages: [
    { id: 'lang-1', language: 'Deutsch', level: 'Muttersprache' },
    { id: 'lang-2', language: 'Englisch', level: 'C1' },
    { id: 'lang-3', language: 'Dänisch', level: 'A2' },
    { id: 'lang-4', language: 'Koreanisch', level: 'A1' },
  ],
  softSkills: [
    'Projektmanagement',
    'Stakeholder-Workshops',
    'Analytisches Denken',
    'Teamarbeit',
    'PBL',
  ],
  availability: 'Nach Vereinbarung / kurze Kündigungsfrist',
  careerGoals:
    'Mobilitäts- und Verkehrsplanung mit starkem Daten-/GIS-Anteil in DE, CH, SG, HK oder KR — ÖPNV, New Mobility, räumliche Analysen und öffentliche Förder-/Strategieprojekte.',
}

export const defaultPreferences: UserPreferences = {
  locale: 'de',
  theme: 'light',
  targetRoles: [
    'Mobilitätsplaner:in',
    'Verkehrsplaner:in',
    'GIS Analyst',
    'Transport Planner',
    'Mobility Consultant',
  ],
  locations: ['Düsseldorf', 'Deutschland', 'Schweiz', 'Singapore', 'Hong Kong', 'Korea'],
  workModes: ['Onsite', 'Hybrid'],
  keywords: 'Mobilität GIS Verkehrsplanung',
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

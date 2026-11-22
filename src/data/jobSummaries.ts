import type { JobPost } from '../types'

export type JobDetailSummary = {
  aufgaben: string[]
  anforderungen: string[]
  umfeld: string
}

/** Ausführliche Stellenzusammenfassungen — aus öffentlichen Live-Ausschreibungen (2026-11-22). */
const SUMMARIES: Record<string, JobDetailSummary> = {
  'live-neuss-mobilitaet': {
    aufgaben: [
      'Planung und Entwicklung von Mobilitäts- und Verkehrsangeboten (ÖPNV, Sharing, Mobilstationen)',
      'Begleitung von Verkehrsgutachten und Steuerung von Dienstleistern',
      'Konzeption, Aufbau und Optimierung von Kennzahlensystemen / Dashboards',
      'Unterstützung bei Ausschreibungen, Vergaben und Fördermittelakquise',
      'Präsentationen, Dokumentation und Schnittstelle zu Ämtern / Aufgabenträgern',
    ],
    anforderungen: [
      'Studium Mobilität/Verkehr oder vergleichbar (Ingenieur-/Wirtschaftswissenschaften mit Mobilitätsinteresse)',
      'Idealerweise erste Erfahrung in Verkehrs-/Mobilitätsplanung und Fachsoftware',
      'Interesse an Datenanalyse, KPI-Modellen und Dashboards',
      'Gute Deutschkenntnisse, strukturierte und teamfähige Arbeitsweise',
    ],
    umfeld:
      'Stadtwerke Neuss GmbH — kommunaler ÖPNV- und Versorgerkontext nahe Düsseldorf. Personio-Originalanzeige vor Bewerbung prüfen.',
  },
  'live-alb-donau-oepnv': {
    aufgaben: [
      'Eigenverantwortliche ÖPNV-Projekte inkl. innovativer / flexibler Bedienformen',
      'Koordination des Leistungsangebots mit Kommunen, Verbünden und Unternehmen',
      'Umsetzung und Fortschreibung des Nahverkehrsplans; Angebotsprüfung / QS',
      'Begleitung von Ausschreibungen und EU-konformen Vergaben',
      'Mitarbeit an Konzepten, Gutachten und Erhebungen',
    ],
    anforderungen: [
      'Hochschulstudium Verkehrsplanung, Stadt-/Raumplanung, Geographie oder Bauingenieurwesen (Schwerpunkt Verkehr/ÖPNV) oder vergleichbar',
      'Grundlagen der Verkehrs- und Mobilitätsplanung',
      'MS Office und GIS-Kenntnisse',
      'Eigenverantwortung, Belastbarkeit und Teamfähigkeit',
    ],
    umfeld:
      'Landratsamt Alb-Donau-Kreis, Amt für Verkehr und Mobilität (Ulm). EG 12 TVöD, Bewerbungsfrist 11.12.2026. Helixjobs-Original prüfen.',
  },
  'live-unterschleissheim-mobilitaet': {
    aufgaben: [
      'Leitung Facharbeitskreis Fahrrad und Querschnittaufgaben mit Verwaltung / Politik',
      'Statistiken, Mobilitätsplan und Förderung von Intermodalität (Rad, Sharing, ZOB)',
      'Digitalisierung inkl. Beiträge zum städtischen GIS und DFI',
      'Koordination Bikesharing, Radinfrastruktur und externe Träger (u. a. DB, Landkreis)',
      'Bearbeitung von Förderprogrammen und Anträgen',
    ],
    anforderungen: [
      'Studium Wirtschaftsingenieurwesen, Geographie, Stadtplanung, Verkehr / Mobilität oder vergleichbare Laufbahnbefähigung',
      'Kenntnisse in Verkehrsforschung und Mobilitätsplanung; StVO / Wege recht von Vorteil',
      'Projektmanagement, Digitalisierung und Öffentlichkeitsarbeit',
      'Sehr gute Ausdrucksfähigkeit; Bewerbung bis 06.12.2026',
    ],
    umfeld:
      'Stadt Unterschleißheim, Sachgebiet Verkehrsrecht / Mobilität. A12 / EG 11. Softgarden-/Bewerberportal der Stadt nutzen.',
  },
  'live-accenture-tl': {
    aufgaben: [
      'Analysen und Arbeitspakete in Transport- & Logistics-Projekten (Strategie, Ops, Data/AI)',
      'Markt-, Wettbewerbs- und Finanzanalysen in klare Handlungsempfehlungen übersetzen',
      'Lösungen zu Netzwerkoptimierung, Automatisierung, digitalen Plattformen und Business Cases',
      'Enger Austausch mit Kundenbereichen Business, Operations und Technology',
    ],
    anforderungen: [
      'Hochschulstudium BWL, Ingenieurwesen, Logistik, Supply Chain, Verkehrswesen oder vergleichbar',
      'Bis zu zwei Jahre relevante Praxis (Praktika / erste Berufserfahrung)',
      'Analytische Stärke und Interesse an digitalen / AI-Tools',
      'Deutsch mindestens B1, Englisch mindestens C1',
    ],
    umfeld:
      'Accenture Management Consulting Analyst — Standorte u. a. Düsseldorf, Berlin, Hamburg, München, Stuttgart. Karriereseite Ref. R00372995.',
  },
  'live-benz-walter-mobility': {
    aufgaben: [
      'Projektarbeit zu Green Cities und nachhaltiger multimodaler Mobilität',
      'Datenbasierte Konzepte von der Strategie bis zur Umsetzung mit Kunden',
      'Direkter Kundenkontakt und interdisziplinäre Zusammenarbeit',
    ],
    anforderungen: [
      'Studium BWL/VWL, Wirtschaftsingenieurwesen, Logistik, Verkehrsingenieurwesen, Data Science o. Ä.',
      'Idealerweise erste Datenanalyse-Erfahrung',
      'Sehr gute Deutsch- und Englischkenntnisse',
      'Neugier, Eigeninitiative und schnelle Einarbeitung',
    ],
    umfeld:
      'Benz & Walter Boutique-Beratung (Wiesbaden) — Hybrid, Wachstumsteam Green Cities + Mobilität. Bewerbung an bewerbung(at)benz-walter.de laut Firmenseite.',
  },
  'live-swisstraffic-planer': {
    aufgaben: [
      'Entwicklung und Bewertung von Verkehrskonzepten für Stadt und Region',
      'Verkehrsuntersuchungen, Analysen und Massnahmenableitung',
      'Interpretation von Mobilitätsdaten; digitale / smarte Planungstools',
      'Gutachten und Zusammenarbeit mit Behörden und Partnern',
    ],
    anforderungen: [
      'Studium Verkehrs-/Bauingenieurwesen mit Verkehrsschwerpunkt oder vergleichbar',
      'Erfahrung in Verkehrsplanung / -technik / -sicherheit',
      'Visum/Vissim und GIS von Vorteil; sehr gute Deutschkenntnisse',
      'Strukturierte, lösungsorientierte Arbeitsweise',
    ],
    umfeld:
      'Swisstraffic AG, Ittigen bei Bern (80–100 %). Offizielle Stellen-PDF; Kontakt job@swisstraffic.ch.',
  },
  'live-lta-transport-planner': {
    aufgaben: [
      'Identify and evaluate road / transport infrastructure projects',
      'Design surveys, analyse travel demand and assess community / economic benefits',
      'Develop integrated transport and land-use plans with other agencies',
    ],
    anforderungen: [
      'Background preferably in Town/Urban Planning, Geography, Economics or related',
      'Strong analytical skills with complex datasets',
      'Excellent communication and writing',
      'Relevant experience strengthens senior banding',
    ],
    umfeld:
      'Land Transport Authority Singapore — Public Service Careers (Workday JR-10000056505). Verify listing before applying.',
  },
  'live-lta-gis-analyst': {
    aufgaben: [
      'Process and analyse complex geospatial datasets for LTA engineering',
      'Design GIS solutions, maintain spatial databases and automate workflows',
      'Produce maps, visualisations and reports for technical and non-technical audiences',
      'Support GIS–BIM integration and SOPs',
    ],
    anforderungen: [
      'GIS / Geomatics / Geography / Environmental Science or related',
      'Proficiency in ArcGIS or QGIS and spatial analysis',
      'Data analysis; Python automation advantageous',
      'Strong academic GIS projects welcome without prior work experience',
    ],
    umfeld:
      'LTA IDE Land — Workday JR-10000054780. Official Careers@Gov posting.',
  },
  'live-lta-strategic-planning': {
    aufgaben: [
      'Contribute to long-term transport strategy studies and assessments',
      'Work across disciplines with large datasets and emerging AI planning tools',
      'Translate complex findings into clear insights for diverse stakeholders',
    ],
    anforderungen: [
      'Engineering, Computer Science, Mathematics, Social Sciences or related',
      'Comfortable with quantitative / analytical work; Python/SQL or modelling a plus',
      'Familiarity with land-use or transport planning advantageous',
      'Collaborative communicator across agencies',
    ],
    umfeld:
      'LTA Strategic Planning — Workday JR-10000054518. Official Careers@Gov posting.',
  },
  'live-aecom-hk-grad': {
    aufgaben: [
      'Graduate assignments under supervision on infrastructure / planning projects',
      'Analysis, reports and design documents within the assigned business stream',
      'Participate in multidisciplinary project teams (Traffic & Transport Planning within Land Supply / Municipal where available)',
    ],
    anforderungen: [
      'Relevant bachelor/master degree for the applied stream',
      'Strong English; Chinese often preferred for HK roles',
      'Eligible to work in Hong Kong before start (per AECOM early-careers guidance)',
      'Internship experience advantageous but not mandatory',
    ],
    umfeld:
      'AECOM Hong Kong graduate programme — confirm the live vacancy on aecom.jobs and early-careers HK page before applying.',
  },
  'live-wsp-hk-grad': {
    aufgaben: [
      'Start as Assistant Engineer on the Asia Graduate Programme in Hong Kong',
      'Project work toward HKIE Scheme A accreditation (Logistics & Transportation among disciplines)',
      'Contribute to infrastructure and mobility-related delivery with mentoring',
    ],
    anforderungen: [
      'Bachelor with second-class honours or above in a relevant engineering discipline',
      'Best suited to <2 years postgraduate experience',
      'Applications accepted year-round per WSP HK graduate FAQ',
      'Work visa facilitation after offer (employment subject to approval)',
    ],
    umfeld:
      'WSP Hong Kong graduate careers page — select LTE / transport-aligned pathway where offered.',
  },
}

function fallbackSummary(post: JobPost): JobDetailSummary {
  const tags = post.tags.length ? post.tags : ['Mobilität']
  const aufgaben = [
    `${post.snippet.replace(/\s+/g, ' ').trim()}`,
    `Schwerpunkte: ${tags.join(', ')}`,
    `Einsatzort: ${post.location} (${post.mode})`,
  ]
  const anforderungen = [
    'Abgeschlossene Ausbildung / Qualifikation passend zur Rolle',
    `Passende Kompetenzen: ${tags.slice(0, 4).join(', ')}`,
    post.kind === 'live'
      ? 'Bitte Originalausschreibung für verbindliche Anforderungen prüfen'
      : 'Mock-Stelle: Anforderungen beispielhaft',
  ]
  const umfeld = `${post.employer} · ${post.location}. Quelle: ${post.platform}${
    post.kind === 'live' ? ' (Live / verified)' : ' (Mock)'
  }. ${post.contact ? `Ansprechperson: ${post.contact}.` : ''}`

  return { aufgaben, anforderungen, umfeld }
}

export function getJobDetailSummary(post: JobPost): JobDetailSummary {
  return SUMMARIES[post.id] ?? fallbackSummary(post)
}

import type { JobPost } from '../types'

export type JobDetailSummary = {
  aufgaben: string[]
  anforderungen: string[]
  umfeld: string
}

/** Ausführliche Stellenzusammenfassungen — live from listing context, mocks enriched. */
const SUMMARIES: Record<string, JobDetailSummary> = {
  'live-agaplesion-hamburg': {
    aufgaben: [
      'Diätetische Beratung und Betreuung von Patient:innen im Klinikalltag',
      'Abstimmung von Speiseplänen und Sonderkostformen mit Küche und Stationen',
      'Mitwirkung an HACCP- und Allergenprozessen in der Klinikverpflegung',
      'Dokumentation und Qualitätssicherung der diätetischen Versorgung',
    ],
    anforderungen: [
      'Abgeschlossene Ausbildung zur staatlich anerkannten Diätassistent:in',
      'Erfahrung in Klinikverpflegung oder klinischer Ernährung von Vorteil',
      'Sichere Kenntnisse in Diättherapie und Nährwertberechnung',
      'Teamfähigkeit und klare Kommunikation mit Pflege und Küche',
    ],
    umfeld:
      'AGAPLESION CATERING am Diakonieklinikum Hamburg (Hohe Weide): diakonischer Klinikverbund mit stationärer Verpflegung. Softgarden-Originalanzeige prüfen vor Bewerbung.',
  },
  'live-agaplesion-obernkirchen': {
    aufgaben: [
      'Individuelle Ernährungsberatung und Diättherapie am Standort Obernkirchen',
      'Planung und Kontrolle von Klinikspeiseplänen inkl. Sonderkost',
      'Unterstützung der Küche bei diätetischen Vorgaben und Allergenkennzeichnung',
    ],
    anforderungen: [
      'Staatlich anerkannte Diätassistent:in (m/w/d)',
      'Interesse an Klinikverpflegung und Patientenberatung',
      'Strukturierte Arbeitsweise und Empathie im Patientenkontakt',
    ],
    umfeld:
      'AGAPLESION Ev. Klinikum Schaumburg: regionales Klinikum mit Verpflegung und Beratung vor Ort. Softgarden-Ausschreibung — bitte Originalanzeige vor Bewerbung prüfen.',
  },
  'live-agaplesion-rotenburg': {
    aufgaben: [
      'Herstellung und Kontrolle diätetischer Kostformen in der Diätküche',
      'Abstimmung von Sonderkost mit Stationen und Küchenteam',
      'Mitwirkung an Verpflegungs- und Hygieneprozessen (HACCP)',
    ],
    anforderungen: [
      'Ausbildung Diätassistent:in und/oder Diätkoch:in',
      'Bereitschaft zur Arbeit in Klinikverpflegung inkl. Band-/Küchenabläufen',
    ],
    umfeld:
      'AGAPLESION CATERING, Standort Rotenburg (Wümme). Softgarden-Stelle „Diätassistent / Diätkoch“ — Originalanzeige für Stundenumfang und Einsatzort prüfen.',
  },
  'live-vitrea-bad-essen': {
    aufgaben: [
      'Gruppen- und Einzelberatungen sowie Vorträge für stationäre Patient:innen',
      'Angebote in der Lehrküche',
      'Individuelle Kostabsprachen mit Patient:innen und Küchenteam',
      'Teilnahme an interdisziplinären Fallbesprechungen',
    ],
    anforderungen: [
      'Abgeschlossene Ausbildung Diätassistenz (w/m/d)',
      'Interesse an Rehabilitationsthemen, Sozialkompetenz und Teamfähigkeit',
      'Selbstständiges, patientenorientiertes Arbeiten',
    ],
    umfeld:
      'VITREA Kliniken Bad Essen: unbefristete Teilzeit (20 Std./Woche) in Reha-Setting. Softgarden/Paracelsus-Portal — Originalanzeige prüfen.',
  },
  'live-vitrea-bad-elster': {
    aufgaben: [
      'Gruppen-/Einzelberatung und Vorträge in der Reha-Klinik',
      'Lehrküchen-Angebote und Kostabsprachen mit der Küche',
      'Fallbesprechungen im interdisziplinären Team',
    ],
    anforderungen: [
      'Ausbildung Diätassistenz oder Studium Oecotrophologie / vergleichbar',
      'Interesse an Rehabilitation, Zuverlässigkeit und Kommunikationsstärke',
    ],
    umfeld:
      'VITREA-Klinik Bad Elster: befristete Teilzeit (30 Std./Woche, mind. 1 Jahr) mit Fortbildungsunterstützung. Softgarden-Ausschreibung prüfen.',
  },
  'live-wicker-meissner': {
    aufgaben: [
      'Einzel- und Gruppenberatung zur gesundheitsgerechten Ernährung',
      'Kostformberechnung und individuelle Anpassung',
      'Buffetschulungen sowie Vorträge/Seminare zu Ernährungsthemen',
      'Enge Zusammenarbeit mit Logopädie und Therapie',
    ],
    anforderungen: [
      'Abgeschlossene Ausbildung Diätassistent (m/w/d)',
      'Gute Deutschkenntnisse, EDV-Kenntnisse, empathische Teamfähigkeit',
    ],
    umfeld:
      'Klinik Hoher Meißner (Werner Wicker), Bad Sooden-Allendorf: Teilzeit ca. 19,25 Std./Woche. Softgarden-Originalanzeige prüfen.',
  },
  'live-wicker-wildungen': {
    aufgaben: [
      'Diät- bzw. Ernährungsberatung von Patient:innen',
      'Zubereitung von Diätkostformen und Mitwirkung am Speisenverteilerband',
      'Menüplanung, Produktionssteuerung und Speiseerfassung (Logimen)',
    ],
    anforderungen: [
      'Ausbildung zum Diätassistenten (m/w/d); Berufserfahrung von Vorteil',
      'Sorgfalt, Empathie und Bereitschaft zur Fortbildung',
    ],
    umfeld:
      'Werner Wicker Klinik, Bad Wildungen: Voll- oder Teilzeit, unbefristet möglich. Softgarden #teamwicker — Benefits u. a. bAV und Jobrad.',
  },
  'live-westend-wildungen': {
    aufgaben: [
      'Erstellung von Speise-, Diät- und Kostplänen mit der Küchenleitung',
      'Rezepturen inkl. Nährwertberechnung und Kennzeichnung',
      'Kontrolle/Ausgabe am Patiententablett und Anleitung Küchenmitarbeitender',
      'Diät-/ernährungstherapeutische Beratung (einzeln/Gruppen), enterale Ernährung',
    ],
    anforderungen: [
      'Ausbildung Diätassistent (m/w/d), Kenntnisse Speisenherstellung',
      'Teamfähigkeit, Organisation, freundlicher Patientenkontakt, PC-Kenntnisse',
    ],
    umfeld:
      'Neurologische Klinik Westend, Bad Wildungen: neurologische Frührehabilitation. Softgarden-Ausschreibung Wicker Gesundheit & Pflege.',
  },
  'live-enzensberg-fuessen': {
    aufgaben: [
      'Ausgabe verordneter Kostformen (Zimmer/Speisesaal)',
      'Mitwirkung an Menüplanung und Rezeptentwicklung',
      'Zubereitung diätetischer Kostformen und IDDSI-Kostaufbau',
      'Diät- und Ernährungsberatung für Patient:innen',
    ],
    anforderungen: [
      'Examinierte Diätassistent:in; Schicht-/Wochenendbereitschaft',
      'MS-Office; Einarbeitung in Sanalogic/klinikinterne Software',
    ],
    umfeld:
      'm&i-Fachklinik Enzensberg (Hopfen am See / Füssen): Neurologie, Orthopädie, Geriatrie, Schmerz. Softgarden-Ausschreibung prüfen.',
  },
  'live-johanniter-dortmund': {
    aufgaben: [
      'Diätetische Versorgung und Beratung am Standort Dortmund',
      'Abstimmung von Kostformen mit Küche und Stationsteams',
      'Mitwirkung an Qualitäts- und Hygieneprozessen der Klinikverpflegung',
    ],
    anforderungen: [
      'Qualifikation Diätassistenz (m/w/d)',
      'Teamfähigkeit und patientenorientierte Arbeitsweise',
    ],
    umfeld:
      'Johanniter, Standort Dortmund (Am Rombergpark). Softgarden-Originalanzeige für Stundenumfang und Einsatzdetails prüfen.',
  },
  'live-umg-goettingen': {
    aufgaben: [
      'Planung, Kontrolle und Zubereitung von Diät- und Sonderkostformen',
      'Nährwertberechnungen und Nutzung des Verpflegungsmanagementsystems',
      'Essensausgabe am Speisenverteilband mit Endkontrolle',
      'Interdisziplinäre Zusammenarbeit mit Stationen und Ärzt:innen; HACCP',
    ],
    anforderungen: [
      'Ausbildung Diätassistent*in; Erfahrung Gemeinschaftsgastronomie von Vorteil',
      'MS Office, HACCP-Kenntnisse, sorgfältige Teamplayer-Persönlichkeit',
    ],
    umfeld:
      'UMG Gastronomie GmbH, Göttingen: Care-Catering für ~1.850 Patient:innen der Uniklinik. Voll-/Teilzeit unbefristet (ab 19,25 Std.). Softgarden-Anzeige prüfen.',
  },
  'live-leopoldina-schweinfurt': {
    aufgaben: [
      'Kontrolle der Diätkostformen und Mitgestaltung Speisen-/Diätplanung',
      'Einzel- und Gruppenberatung; Überwachung Allergenverordnung',
      'Endkontrolle portionierter Speisen; Pflege Orga-Card; PRODI-Kalkulation',
    ],
    anforderungen: [
      'Ausbildung Diätassistent oder Quereinstieg mit einschlägiger Erfahrung',
      'Organisations-/Kommunikationsfähigkeit, präzise Arbeitsweise',
    ],
    umfeld:
      'Leo Service GmbH / Leopoldina-Krankenhaus Schweinfurt: Großküche inkl. Mitarbeiterrestaurant und externer Belieferung. Teilzeit 50 %. Softgarden-Anzeige prüfen.',
  },
  'live-recura-schwaan': {
    aufgaben: [
      'Individuelle Ernährungsberatung und Erstellung von Diätplänen',
      'Unterstützung der Küchenleitung bei Einkauf/Rezepturen',
      'Kontrolle produzierter Speisen; Einhaltung Hygiene/HACCP',
      'Zusammenarbeit mit Küche und weiteren Versorgungsbereichen',
    ],
    anforderungen: [
      'Erfolgreich abgeschlossene Ausbildung Diätassistent (m/w/d)',
      'HACCP-Kenntnisse, Beratungsfreude, Selbstständigkeit und Zuverlässigkeit',
    ],
    umfeld:
      'RECURA Fachklinik Waldeck, Schwaan: Krankheitsvertretung mit Option auf Festeinstellung; Voll- oder Teilzeit. Softgarden-Originalanzeige prüfen.',
  },
  'live-weidemann-braunschweig': {
    aufgaben: [
      'Überwachung/Herstellung von Diätkostformen und Bestellbearbeitung',
      'HACCP-/Hygieneüberwachung und Waren-/Produktionsvorbereitung',
      'Ernährungs-/Diätberatung und Vorträge; Diätpläne nach Verordnung',
    ],
    anforderungen: [
      'Diätassistent:in oder vergleichbar / diätisch geschulte:r Koch:in',
      'Wochenend-/Feiertagsbereitschaft; Deutschkenntnisse; Teamorientierung',
    ],
    umfeld:
      'HEH Service / Weidemann am Herzogin Elisabeth Hospital Braunschweig: Teilzeit 30 Std., 5-Tage-Woche. Softgarden weidemann-gruppe prüfen.',
  },
  'live-weidemann-nenndorf': {
    aufgaben: [
      'Diätassistenz in der Klinikverpflegung am Standort Bad Nenndorf',
      'Speiseplanung inkl. Allergenmanagement und Patientenabstimmung',
      'Qualitätssicherung diätetischer Kostformen mit dem Küchenteam',
    ],
    anforderungen: [
      'Staatlich anerkannte Diätassistent:in',
      'Erfahrung in Speiseplanung/Allergenen von Vorteil',
    ],
    umfeld:
      'WEIDEMANN Catering GmbH, Bad Nenndorf. Softgarden-Ausschreibung — Stundenumfang und Benefits in der Originalanzeige prüfen.',
  },
  'live-weidemann-fulda': {
    aufgaben: [
      'Diätetische Betreuung und Abstimmung mit Küche und Stationen',
      'Umsetzung von Sonderkostformen und Qualitätsvorgaben',
      'Mitwirkung an Klinikverpflegungsprozessen vor Ort in Fulda',
    ],
    anforderungen: ['Staatlich anerkannte Diätassistent:in', 'Kommunikationsstärke im Klinikalltag'],
    umfeld:
      'Service GmbH St. Vinzenz Fulda (Weidemann-Gruppe). Softgarden-Originalanzeige für Vertragsdetails prüfen.',
  },
  'live-weidemann-fulda-diaetkoch': {
    aufgaben: [
      'Herstellung und Ausgabe diätetischer Kostformen in der Diätküche',
      'Einhaltung von Hygiene- und Qualitätsstandards (HACCP)',
      'Zusammenarbeit mit Diätassistenz, Küche und Stationen',
    ],
    anforderungen: [
      'Qualifikation als Diätkoch:in oder vergleichbare Küchen-/Diätkompetenz',
      'Sorgfalt, Schichtbereitschaft und Teamfähigkeit',
    ],
    umfeld:
      'Service GmbH St. Vinzenz Fulda (Weidemann-Gruppe): Diätküche Klinikverpflegung. Softgarden-Anzeige prüfen.',
  },
  'live-uk-regensburg': {
    aufgaben: [
      'Ernährungs- und Diätberatungen zu klinischen Krankheitsbildern inkl. Diabetes',
      'Mangelernährungsscreening; Betreuung onkologischer/hepatologischer Kinder',
      'Berechnung enterale/parenterale Ernährungspläne; Dokumentation nach G-NCP',
      'Entwicklung ernährungstherapeutischer Standards',
    ],
    anforderungen: [
      'Staatlich geprüfte Diätassistent:in oder vergleichbar',
      'Wünschenswert: Diabetesberater DDG, klinische Erfahrung, Prodi, EDV',
      'Selbstständige, patientenorientierte Teamarbeit',
    ],
    umfeld:
      'UK Regensburg, Zentrum für Ernährungs- und Diabetesberatung (ZED): unbefristet Voll-/Teilzeit, TV-L E9a/E9b. Bewerbung über jobs.ukr.de bis 15.12.2026.',
  },
  'live-klinikum-itzehoe': {
    aufgaben: [
      'Individuelle ernährungsmedizinische Beratung ambulant und stationär',
      'Planung/Durchführung von Einzel- und Gruppenschulungen',
      'Adipositas- und Mangelernährungsberatung (NRS); Therapiekonzepte',
      'Interdisziplinäre Zusammenarbeit und Weiterentwicklung der Angebote',
    ],
    anforderungen: [
      'Ökotrophologie/Ernährungswissenschaften oder Diätassistent:in mit Zusatzqualifikation',
      'Zertifizierung Ernährungsberater:in; Beratungserfahrung; Kommunikationsstärke',
    ],
    umfeld:
      'Klinikum Itzehoe, Klinik für Gastroenterologie und Diabetologie: Schwangerschaftsvertretung ≥32 Std./Woche. Originalanzeige auf jobs.klinikum-itzehoe.de.',
  },
  'live-klinikum-mittelbaden': {
    aufgaben: [
      'Annahme/Bearbeitung elektronischer Menübestellungen',
      'Erstellung von Ernährungskonzepten und Diätplänen',
      'Organisation/Pflege des Menübestellsystems',
      'Diätberatung; Organisation und Kontrolle am Portionierband',
    ],
    anforderungen: [
      'Staatlich geprüfte Diätassistent:in',
      'EDV (MS Office, Menübestellsystem); selbstständiges Teamwork mit Pflege',
    ],
    umfeld:
      'Klinikum Mittelbaden, Baden-Baden Balg: unbefristet Vollzeit, Vergütung DEHOGA TG 3. Karriereportal Klinikum Mittelbaden prüfen.',
  },
  'live-uk-wuerzburg': {
    aufgaben: [
      'Ernährungsmedizinische Beratung in der Stoffwechselambulanz',
      'Schwerpunkte u. a. Adipositastherapie, Diabetologie, internistische Krankheitsbilder',
      'Zusammenarbeit im familiären Team der Endokrinologie/Diabetologie',
    ],
    anforderungen: [
      'Ausbildung Diätassistent:in oder Studium Ökotrophologie/Ernährungswissenschaften',
      'Interesse an Stoffwechselmedizin und Ambulanzarbeit',
    ],
    umfeld:
      'Universitätsklinikum Würzburg: Teilzeit 50 %, befristet, Start 01.01.2027. Details und Bewerbung über ukw.de/jobs — Originalseite prüfen.',
  },
  'live-asklepios-rissen': {
    aufgaben: [
      'Planung von Kostformen nach ärztlicher Verordnung; Endkontrolle am Band',
      'Schulung des Küchenteams in Diätetik; Pflege Menübestellsystem',
      'Unterstützung Küchenleitung (Warenannahme, Bestellwesen, Inventur)',
      'Kommissionierung/Portionierung; HACCP und Allergenmanagement',
    ],
    anforderungen: [
      'Ausbildung Diätassistenz; Klinikexperience und Orga-Card von Vorteil',
      'Wochenendbereitschaft, PC-Kenntnisse, Zuverlässigkeit und Organisationstalent',
    ],
    umfeld:
      'Asklepios Service Catering Hamburg, Standort Rissen: Vollzeit Klinikverpflegung. Offizielle Asklepios-Karriereseite prüfen.',
  },
  'live-diako-bremen': {
    aufgaben: [
      'Zubereitung diätetischer Speisen und Bandabnahme/Kostformkontrolle',
      'Planung, Berechnung, Herstellung und Kontrolle von Diätkostformen',
      'Ernährungsmedizinische Maßnahmen nach Verordnung; Patientenberatung/-schulung',
    ],
    anforderungen: [
      'Ausbildung Diätassistent (m/w/d); klinische Berufserfahrung von Vorteil',
      'Einhaltung der HACCP-Richtlinien',
    ],
    umfeld:
      'DIAKO Bremen: befristete Krankheitsvertretung in der Küche; Vergütung AVR Diakonie. d.vinci-Karriereportal — Originalanzeige prüfen.',
  },
  'live-charite-ausbildung': {
    aufgaben: [
      'Durchlaufen der staatlich geregelten Ausbildung zur Diätassistent:in',
      'Praxisphasen in Klinischer Ernährung und Lehrküche der Universitätsmedizin',
      'Mitarbeit in interdisziplinären Settings unter Anleitung',
    ],
    anforderungen: [
      'Schulische Voraussetzungen für die Diätassistent:innen-Ausbildung',
      'Vorzugsweise Volljährigkeit zum Ausbildungsbeginn; Neugier und Lernbereitschaft',
    ],
    umfeld:
      'Charité (CBF/CCM/CVK): Ausbildungsstart 01.10.2027, Kennziffer 8155, Bewerbung 04.01.–12.02.2027. Offizielle Stellenanzeige karriere.charite.de.',
  },
  'live-klinikum-passau': {
    aufgaben: [
      'Bandendkontrolle bei der Speisenportionierung; Mahlzeitenbestellsystem',
      'Berechnung von Speiseplänen; Kontrolle/Zubereitung Diät- und Sonderkost',
      'Selbstständige Ernährungsberatungen auf Station; Personalschulungen',
      'Mitwirkung an Öffentlichkeitsarbeit/Veranstaltungen',
    ],
    anforderungen: [
      'Ausbildung Diätassistent:in; Diabetesberater DDG / DGE / Adipositas von Vorteil',
      'Erfahrung Großküche, Mangelernährungsscreening, Geriatrie/Onkologie wünschenswert',
    ],
    umfeld:
      'Klinikum Passau Diätabteilung: Vollzeit, frei ab 01.12.2026, TVöD-VKA. Liste offener Stellen auf klinikum-passau.de — Originalausschreibung prüfen.',
  },
  'live-uk-duesseldorf': {
    aufgaben: [
      'Nährwertberechnung und Herstellung spezifischer Diäten',
      'Wochenspeisepläne und Lebensmittelbestellung; Qualitätskontrolle',
      'Auswertung Essensanforderungen; Bandendkontrolle; Anleitung Hilfskräfte',
      'Schulung Stationspersonal; HACCP-Dokumentation; Ernährungs-/Diätberatung',
    ],
    anforderungen: [
      'Staatlich anerkannte Diätassistent:in',
      'Großküchen-/Cook&Chill-Erfahrung erwünscht; PC und Nährwertsoftware',
      'Fortbildungsbereitschaft Diätetik/Hygiene',
    ],
    umfeld:
      'UKD Dezernat Verpflegungsmanagement, Zentralküche/Diätküche: TV-L EG 8, 38,5 Std., Teilzeit möglich. Kennziffer 460E/26 — PDF-Ausschreibung / Bewerbung an bewerbungen@med.uni-duesseldorf.de.',
  },

  'live-frankenland-windsheim': {
    aufgaben: [
      'Diättherapie und Ernährungsberatung in der Rehaklinik',
      'Abstimmung von Kostformen mit Küche und Therapie',
      'Dokumentation und Qualitätssicherung der diätetischen Versorgung',
    ],
    anforderungen: [
      'Staatlich anerkannte Diätassistent:in',
      'Interesse an Rehabilitationsthemen',
    ],
    umfeld:
      'Frankenland-Klinik Bad Windsheim (DRV Nordbayern). Offizielle Klinik-Karriereseite — Umfang (Teilzeit) in Originalanzeige prüfen.',
  },
  'live-sana-berlin-adipositas': {
    aufgaben: [
      'Ernährungsberatung und Diättherapie im Adipositaszentrum',
      'Begleitung von Patient:innen im prä-/postoperativen Verlauf',
      'Interdisziplinäre Abstimmung mit Ärzt:innen und Therapie',
    ],
    anforderungen: [
      'Ausbildung Diätassistenz oder vergleichbare Qualifikation',
      'Erfahrung Adipositas/Ernährungsmedizin von Vorteil',
    ],
    umfeld:
      'Sana Adipositaszentrum Berlin Lichtenberg — Sana Jobs (Oracle CE). Originalanzeige vor Bewerbung prüfen.',
  },
  'live-sana-catering-sh': {
    aufgaben: [
      'Diätetische Versorgung und Beratung in der Klinikverpflegung',
      'Abstimmung Sonderkost / Allergene mit Küche und Stationen',
    ],
    anforderungen: [
      'Diätassistent:in oder Ökotropholog:in',
      'Erfahrung Klinikverpflegung von Vorteil',
    ],
    umfeld:
      'Sana-Catering-Service GmbH, Schleswig-Holstein — Sana Jobs Portal. Standortdetails in Originalanzeige prüfen.',
  },
  'live-sana-diabetes-lichtenberg': {
    aufgaben: [
      'Diabetesberatung und Patientenschulung',
      'Abstimmung mit ärztlicher Therapie und Ernährungsteam',
    ],
    anforderungen: [
      'Qualifikation Diabetesberater:in / passende therapeutische Ausbildung',
      'Erfahrung in Klinik oder Ambular von Vorteil',
    ],
    umfeld:
      'Sana Kliniken Berlin-Brandenburg, Lichtenberg — Sana Jobs Portal.',
  },
  'live-sana-ernaehrung-anerkennung': {
    aufgaben: [
      'Mitwirkung im Ernährungs- und Versorgungsmanagement',
      'Unterstützung von Verpflegungs- und Organisationsprozessen',
    ],
    anforderungen: [
      'Ausbildung/Studium Betriebswirt Ernährungs- & Versorgungsmanagement',
      'Bereitschaft zum Anerkennungsjahr',
    ],
    umfeld:
      'Sana Management Service GmbH — Anerkennungsjahr über Sana Jobs.',
  },
  'live-sk-mg-diaet': {
    aufgaben: [
      'Diätassistenz in der Klinikverpflegung und Patientenberatung',
      'Kontrolle von Kostformen und Abstimmung mit Stationen',
    ],
    anforderungen: [
      'Staatlich anerkannte Diätassistent:in',
      'Teamfähigkeit und Klinikalltag-Erfahrung von Vorteil',
    ],
    umfeld:
      'Städtische Kliniken Mönchengladbach — OnApply-Originalanzeige (Voll-/Teilzeit) prüfen.',
  },
  'live-vivantes-ausbildung': {
    aufgaben: [
      'Ausbildung zur Diätassistent:in mit Praxisanteilen in Vivantes-Kliniken',
      'Erlernen von Diättherapie, Verpflegung und Patientenberatung',
    ],
    anforderungen: [
      'Schulabschluss und Interesse an Ernährung/Gesundheit',
      'Bewerbungsvoraussetzungen laut Vivantes-Ausbildungsseite',
    ],
    umfeld:
      'Vivantes Netzwerk für Gesundheit, Berlin — offizielle Ausbildungsseite Diätassistenz.',
  },
  'live-enzensberg-diabetes-dual': {
    aufgaben: [
      'Duale Aus-/Weiterbildung zur Diabetesberater:in DDG',
      'Arbeit im ernährungswissenschaftlichen und pädagogischen Klinikkontext',
    ],
    anforderungen: [
      'Passende Grundqualifikation (z. B. Diätassistenz / Pflege) laut Ausschreibung',
      'Motivation für DDG-Weiterbildung',
    ],
    umfeld:
      'm&i-Fachklinik Enzensberg — Softgarden-Ausschreibung Dual Diabetesberater DDG.',
  },
  'live-enzensberg-diabetes-klinik': {
    aufgaben: [
      'Diabetesberatung DDG im Klinikbereich',
      'Patientenschulung und interdisziplinäre Abstimmung',
    ],
    anforderungen: [
      'Diabetesberater:in DDG oder Bereitschaft zur Qualifikation',
      'KlinikErfahrung von Vorteil',
    ],
    umfeld:
      'm&i-Fachklinik Enzensberg — Softgarden Diabetesberater DDG Klinikbereich.',
  },
  'live-johanniter-diabetes': {
    aufgaben: [
      'Diabetesberatung nach DDG-Standards',
      'Schulung und Begleitung von Patient:innen',
    ],
    anforderungen: [
      'Qualifikation Diabetesberater:in DDG oder äquivalent laut Ausschreibung',
    ],
    umfeld:
      'Johanniter Softgarden-Portal — Standort und Umfang in Originalanzeige prüfen.',
  },
  'live-reutlingen-diaet': {
    aufgaben: [
      'Diätassistenz befristet in Vollzeit',
      'Patientenservice / Gastronomie: Kostformen und Verpflegungsprozesse',
    ],
    anforderungen: [
      'Staatlich anerkannte Diätassistent:in',
      'Bereitschaft zu befristeter Vollzeit',
    ],
    umfeld:
      'Kreiskliniken Reutlingen gGmbH — d.vinci-Karriereportal, Kategorie Patientenservice/Gastronomie.',
  },
  'live-ba-collm-oschatz': {
    aufgaben: ['Diätassistenz in der Collm Klinik Oschatz laut BA-Ausschreibung'],
    anforderungen: ['Staatlich anerkannte Diätassistent:in', 'BA-Originalanzeige für Details prüfen'],
    umfeld: 'Collm Klinik Oschatz — BA Jobbörse (live verifiziert). Ggf. parallele Arbeitgeber-Karriereseite prüfen.',
  },
  'live-ba-vitos-kassel': {
    aufgaben: ['Diätassistenz bei Vitos Service gGmbH in Kassel'],
    anforderungen: ['Staatlich anerkannte Diätassistent:in', 'BA-Originalanzeige prüfen'],
    umfeld: 'Vitos Service, Kassel — BA Jobbörse; ergänzend karriere.vitos.de.',
  },
  'live-ba-werneck': {
    aufgaben: ['Diätassistenz an der Krankenhausverwaltung Schloss Werneck'],
    anforderungen: ['Staatlich anerkannte Diätassistent:in'],
    umfeld: 'Schloss Werneck — BA Jobbörse (Voll-/Teilzeit unbefristet).',
  },
  'live-ba-aramark-frankfurt': {
    aufgaben: ['Diätassistenz / Care-Verpflegung bei Aramark in Frankfurt'],
    anforderungen: ['Staatlich anerkannte Diätassistent:in'],
    umfeld: 'Aramark Deutschland, Frankfurt am Main — BA Jobbörse.',
  },
  'live-ba-aramark-kaiserslautern': {
    aufgaben: ['Diätassistenz / Care-Verpflegung bei Aramark in Kaiserslautern'],
    anforderungen: ['Staatlich anerkannte Diätassistent:in'],
    umfeld: 'Aramark Deutschland, Kaiserslautern — BA Jobbörse.',
  },
  'live-ba-porta-westfalica': {
    aufgaben: ['Diätassistenz in Reha/AHB Klinik Porta Westfalica'],
    anforderungen: ['Staatlich anerkannte Diätassistent:in'],
    umfeld: 'Klinik Porta Westfalica, Bad Oeynhausen — BA Jobbörse.',
  },
  'live-ba-srh-heidelberg': {
    aufgaben: ['Diätassistenz bei SRH YourService in Heidelberg'],
    anforderungen: ['Staatlich anerkannte Diätassistent:in'],
    umfeld: 'SRH YourService GmbH, Heidelberg — BA Jobbörse.',
  },
  'live-ba-loerrach': {
    aufgaben: ['Diätassistenz an den Kliniken Landkreis Lörrach'],
    anforderungen: ['Staatlich anerkannte Diätassistent:in'],
    umfeld: 'Kliniken des Landkreises Lörrach — BA Jobbörse.',
  },
  'live-ba-icp-muenchen': {
    aufgaben: ['Diätassistenz bei der Stiftung ICP München'],
    anforderungen: ['Staatlich anerkannte Diätassistent:in'],
    umfeld: 'Stiftung ICP München — BA Jobbörse; siehe auch icpmuenchen.de Stellenangebote.',
  },
  'live-ba-median-waren': {
    aufgaben: ['Diätassistenz in der MEDIAN-Reha Waren (Müritz)'],
    anforderungen: ['Staatlich anerkannte Diätassistent:in'],
    umfeld: 'MEDIAN Unternehmensgruppe, Waren (Müritz) — BA Jobbörse; MEDIAN Karriereportal prüfen.',
  },
  'live-ba-ilmtal-berka': {
    aufgaben: ['Diätassistenz an der Ilmtal-Klinik Bad Berka'],
    anforderungen: ['Staatlich anerkannte Diätassistent:in'],
    umfeld: 'Ilmtal-Klinik Bad Berka — BA Jobbörse.',
  },
  'live-ba-vialife-aachen': {
    aufgaben: ['Diätassistenz bei VIALIFE Rosenquelle in Aachen'],
    anforderungen: ['Staatlich anerkannte Diätassistent:in'],
    umfeld: 'VIALIFE Rosenquelle GmbH, Aachen — BA Jobbörse (Voll-/Teilzeit).',
  },
  'live-ba-reha-rosenheim': {
    aufgaben: ['Diätassistenz im ambulanten Reha-Zentrum Rosenheim'],
    anforderungen: ['Staatlich anerkannte Diätassistent:in'],
    umfeld: 'Ambulantes Reha- und Gesundheitszentrum Rosenheim — BA Jobbörse.',
  },
  'live-ba-drv-kreuznach': {
    aufgaben: ['Diätassistenz in der DRV-Reha Bad Kreuznach'],
    anforderungen: ['Staatlich anerkannte Diätassistent:in'],
    umfeld: 'Deutsche Rentenversicherung Rheinland-Pfalz, Bad Kreuznach — BA Jobbörse.',
  },
  'live-ba-alphaconsult-wiesloch': {
    aufgaben: ['Diätassistenz am Einsatzort Wiesloch (Vermittlung AlphaConsult)'],
    anforderungen: ['Staatlich anerkannte Diätassistent:in'],
    umfeld: 'AlphaConsult KG Heidelberg / Wiesloch — BA Jobbörse; Vertragsdetails in Originalanzeige prüfen.',
  },

  'mock-charite-gastro': {
    aufgaben: [
      'Diättherapie in der Gastroenterologie (Patient:innen mit CED, Pankreas, Malabsorption)',
      'Erstellung individueller Speisepläne und Begleitung in der Lehrküche',
      'Teilnahme an interdisziplinären Visiten und Dokumentation',
      'Abstimmung mit ärztlicher Verordnung und Pflege',
    ],
    anforderungen: [
      'Staatlich anerkannte Diätassistent:in mit Schwerpunkt Klinische Ernährung',
      'Erfahrung in Gastroenterologie von Vorteil',
      'Sicherheit in Diättherapie, Speiseplanung und Lehrküche',
      'Hybrid-Bereitschaft (Campus + Homeoffice-Anteile nach Absprache)',
    ],
    umfeld:
      'Charité Campus Mitte — Team Ernährungsmedizin (Mock/Hidden-Market-Hinweis). Rolle noch nicht auf der Karriereseite; Kontakt Dr. Miriam Keller. Interdisziplinäres Umfeld mit hoher fachlicher Komplexität.',
  },
  'mock-reha-onko': {
    aufgaben: [
      'Onkologische Diättherapie und Nährwertberechnung',
      'Gruppenprogramme und interdisziplinäre Visiten in der Reha',
      'Individuelle Beratung zu Mangelernährung und Nebenwirkungen',
    ],
    anforderungen: [
      'Diätassistent:in mit Interesse an Onkologie',
      'Erfahrung mit Gruppenprogrammen von Vorteil',
      'Vollzeit, vor Ort in Rostock',
    ],
    umfeld:
      'RehaVital Nord (Mock): Rehaklinik mit onkologischem Schwerpunkt. Bewerbung über HR — ruhigeres Setting als Akutklinik, klare Gruppenprogramme.',
  },
}

function fallbackSummary(post: JobPost): JobDetailSummary {
  const tags = post.tags.length ? post.tags : ['Diätetik']
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
      : 'Mock-Stelle: Anforderungen beispielhaft für den Hidden Market',
  ]
  const umfeld = `${post.employer} · ${post.location}. Quelle: ${post.platform}${
    post.kind === 'live' ? ' (Live / verified)' : ' (Mock / Hidden Market)'
  }. ${post.contact ? `Ansprechperson: ${post.contact}.` : ''}`

  return { aufgaben, anforderungen, umfeld }
}

export function getJobDetailSummary(post: JobPost): JobDetailSummary {
  return SUMMARIES[post.id] ?? fallbackSummary(post)
}

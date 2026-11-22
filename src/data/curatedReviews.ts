import type { EmployerReview } from '../types'

const SNAPSHOT_DATE = '2026-11-22'

/**
 * Lightweight curated snapshots for Maximilian-feed employers.
 * Not scraped — illustrative only; badge remains Snapshot (curated).
 */
export const curatedReviews: Record<string, EmployerReview> = {
  'live-accenture': {
    companyId: 'live-accenture',
    overall: 3.8,
    count: 4200,
    asOf: SNAPSHOT_DATE,
    sourceLabel: 'Public employer-review portals (curated snapshot)',
    attributionUrl: 'https://www.accenture.com/de-de/careers',
    status: 'snapshot',
    categories: [
      { label: 'Work-life', value: 3.4 },
      { label: 'Salary', value: 3.6 },
      { label: 'Management', value: 3.5 },
      { label: 'Culture', value: 3.7 },
      { label: 'Career', value: 4.0 },
    ],
    pros: ['Lernkurve und Projektvielfalt', 'Internationales Netzwerk'],
    cons: ['Reisefrequenz und Auslastung je nach Projekt'],
  },
  'live-lta': {
    companyId: 'live-lta',
    overall: 3.9,
    count: 180,
    asOf: SNAPSHOT_DATE,
    sourceLabel: 'Public employer-review portals (curated snapshot)',
    attributionUrl: 'https://www.lta.gov.sg/',
    status: 'snapshot',
    categories: [
      { label: 'Work-life', value: 3.6 },
      { label: 'Salary', value: 3.7 },
      { label: 'Management', value: 3.5 },
      { label: 'Culture', value: 3.8 },
      { label: 'Career', value: 3.9 },
    ],
    pros: ['Mission-driven public transport work', 'Clear technical domains'],
    cons: ['Public-sector process pace varies by team'],
  },
  'live-aecom': {
    companyId: 'live-aecom',
    overall: 3.7,
    count: 2100,
    asOf: SNAPSHOT_DATE,
    sourceLabel: 'Public employer-review portals (curated snapshot)',
    attributionUrl: 'https://aecom.com/careers/',
    status: 'snapshot',
    categories: [
      { label: 'Work-life', value: 3.3 },
      { label: 'Salary', value: 3.5 },
      { label: 'Management', value: 3.4 },
      { label: 'Culture', value: 3.6 },
      { label: 'Career', value: 3.8 },
    ],
    pros: ['Large project exposure', 'Graduate development paths'],
    cons: ['Workload peaks around deadlines'],
  },
  'live-wsp': {
    companyId: 'live-wsp',
    overall: 3.8,
    count: 1500,
    asOf: SNAPSHOT_DATE,
    sourceLabel: 'Public employer-review portals (curated snapshot)',
    attributionUrl: 'https://www.wsp.com/en-hk/careers',
    status: 'snapshot',
    categories: [
      { label: 'Work-life', value: 3.5 },
      { label: 'Salary', value: 3.6 },
      { label: 'Management', value: 3.5 },
      { label: 'Culture', value: 3.7 },
      { label: 'Career', value: 3.9 },
    ],
    pros: ['Strong technical mentoring', 'Infrastructure variety'],
    cons: ['Market-dependent billability'],
  },
}

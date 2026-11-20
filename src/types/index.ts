export type ListingKind = 'live' | 'mock'
export type WorkMode = 'Onsite' | 'Hybrid' | 'Remote'
export type Locale = 'de' | 'en'
export type ThemeMode = 'light' | 'dark'
export type ReviewStatus = 'snapshot' | 'live' | 'mock' | 'unavailable'
export type PipelineStatus = 'saved' | 'dismissed' | 'applied'
export type GenerationTone = 'formal' | 'friendly'

export interface JobPost {
  id: string
  companyId: string
  title: string
  employer: string
  location: string
  mode: WorkMode
  platform: string
  kind: ListingKind
  snippet: string
  contact?: string
  postedAt: string
  url?: string
  tags: string[]
}

export interface Company {
  id: string
  name: string
  summary: string
  size: string
  industry: string
  hq: string
  website?: string
}

export interface ReviewCategory {
  label: string
  value: number
}

export interface EmployerReview {
  companyId: string
  overall: number
  count: number
  asOf: string
  sourceLabel: string
  attributionUrl: string
  status: ReviewStatus
  categories: ReviewCategory[]
  pros: string[]
  cons: string[]
}

export interface EducationEntry {
  id: string
  school: string
  degree: string
  period: string
  details?: string
}

export interface ExperienceEntry {
  id: string
  title: string
  employer: string
  period: string
  description: string
}

export interface LanguageEntry {
  id: string
  language: string
  level: string
}

export interface CvDraft {
  fullName: string
  email: string
  phone: string
  city: string
  country: string
  headline: string
  summary: string
  education: EducationEntry[]
  certifications: string[]
  experience: ExperienceEntry[]
  skills: string[]
  languages: LanguageEntry[]
  softSkills: string[]
  availability: string
  careerGoals: string
  /** Optional portrait as data URL for “mit Foto” Lebenslauf variant */
  photoDataUrl?: string
}

export interface UserPreferences {
  locale: Locale
  theme: ThemeMode
  targetRoles: string[]
  locations: string[]
  workModes: WorkMode[]
  keywords: string
  listingFilter: 'any' | 'live' | 'mock'
  onboarded: boolean
}

export interface UserProfile {
  draft: CvDraft
  preferences: UserPreferences
}

export interface MatchResult {
  score: number
  reasons: string[]
}

export interface ScoredPost extends JobPost {
  match: MatchResult
}

export interface GeneratedApplication {
  lebenslaufHtml: string
  lebenslaufText: string
  anschreiben: string
  kurzNachricht: string
  adaptations: string[]
  language: Locale
  tone: GenerationTone
}

export interface ApplicationRecord {
  id: string
  postId: string
  status: PipelineStatus
  createdAt: string
  updatedAt: string
  title: string
  employer: string
  location: string
  kind: ListingKind
  generated?: GeneratedApplication
}

export interface FeedFilters {
  location: string
  keywords: string
  listing: 'any' | 'live' | 'mock'
  mode: 'any' | WorkMode
}

export interface CvImportResult {
  draft: Partial<CvDraft>
  recognized: string[]
  rawText: string
  warnings: string[]
}

export interface GenerationRequest {
  post: JobPost
  company?: Company
  draft: CvDraft
  locale: Locale
  tone: GenerationTone
}

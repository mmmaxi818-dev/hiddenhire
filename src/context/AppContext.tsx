import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { defaultProfile } from '../data/defaultProfile'
import { t as translate } from '../i18n/translations'
import { applyFilters, scoreAndSort } from '../services/matching'
import { getAllPosts } from '../sources/mockSocial'
import type {
  ApplicationRecord,
  CvDraft,
  FeedFilters,
  GeneratedApplication,
  Locale,
  PipelineStatus,
  ScoredPost,
  ThemeMode,
  UserPreferences,
  UserProfile,
} from '../types'

interface AppContextValue {
  profile: UserProfile
  setDraft: (draft: CvDraft | ((prev: CvDraft) => CvDraft)) => void
  setPreferences: (prefs: UserPreferences | ((prev: UserPreferences) => UserPreferences)) => void
  completeOnboarding: () => void
  resetOnboarding: () => void
  filters: FeedFilters
  setFilters: (f: FeedFilters | ((prev: FeedFilters) => FeedFilters)) => void
  scoredPosts: ScoredPost[]
  filteredPosts: ScoredPost[]
  applications: ApplicationRecord[]
  upsertApplication: (
    postId: string,
    status: PipelineStatus,
    meta: Pick<ApplicationRecord, 'title' | 'employer' | 'location' | 'kind'>,
    generated?: GeneratedApplication,
  ) => void
  removeApplication: (id: string) => void
  getApplicationForPost: (postId: string) => ApplicationRecord | undefined
  locale: Locale
  theme: ThemeMode
  tr: (key: string) => string
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)
  const [applications, setApplications] = useState<ApplicationRecord[]>([])
  const [filters, setFilters] = useState<FeedFilters>({
    location: '',
    keywords: defaultProfile.preferences.keywords,
    listing: defaultProfile.preferences.listingFilter,
    mode: 'any',
  })

  const locale = profile.preferences.locale
  const theme = profile.preferences.theme

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.lang = locale
  }, [theme, locale])

  const setDraft = useCallback((draft: CvDraft | ((prev: CvDraft) => CvDraft)) => {
    setProfile((p) => ({
      ...p,
      draft: typeof draft === 'function' ? draft(p.draft) : draft,
    }))
  }, [])

  const setPreferences = useCallback(
    (prefs: UserPreferences | ((prev: UserPreferences) => UserPreferences)) => {
      setProfile((p) => ({
        ...p,
        preferences: typeof prefs === 'function' ? prefs(p.preferences) : prefs,
      }))
    },
    [],
  )

  const completeOnboarding = useCallback(() => {
    setPreferences((prev) => ({ ...prev, onboarded: true }))
  }, [setPreferences])

  const resetOnboarding = useCallback(() => {
    setPreferences((prev) => ({ ...prev, onboarded: false }))
  }, [setPreferences])

  const scoredPosts = useMemo(
    () => scoreAndSort(getAllPosts(), profile.draft, profile.preferences),
    [profile.draft, profile.preferences],
  )

  const filteredPosts = useMemo(
    () => applyFilters(scoredPosts, filters),
    [scoredPosts, filters],
  )

  const upsertApplication = useCallback(
    (
      postId: string,
      status: PipelineStatus,
      meta: Pick<ApplicationRecord, 'title' | 'employer' | 'location' | 'kind'>,
      generated?: GeneratedApplication,
    ) => {
      setApplications((prev) => {
        const existing = prev.find((a) => a.postId === postId)
        const now = new Date().toISOString()
        if (existing) {
          return prev.map((a) =>
            a.postId === postId
              ? {
                  ...a,
                  status,
                  updatedAt: now,
                  generated: generated ?? a.generated,
                }
              : a,
          )
        }
        return [
          {
            id: `app-${postId}-${Date.now()}`,
            postId,
            status,
            createdAt: now,
            updatedAt: now,
            ...meta,
            generated,
          },
          ...prev,
        ]
      })
    },
    [],
  )

  const removeApplication = useCallback((id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id))
  }, [])

  const getApplicationForPost = useCallback(
    (postId: string) => applications.find((a) => a.postId === postId),
    [applications],
  )

  const tr = useCallback((key: string) => translate(locale, key), [locale])

  const value = useMemo<AppContextValue>(
    () => ({
      profile,
      setDraft,
      setPreferences,
      completeOnboarding,
      resetOnboarding,
      filters,
      setFilters,
      scoredPosts,
      filteredPosts,
      applications,
      upsertApplication,
      removeApplication,
      getApplicationForPost,
      locale,
      theme,
      tr,
    }),
    [
      profile,
      setDraft,
      setPreferences,
      completeOnboarding,
      resetOnboarding,
      filters,
      scoredPosts,
      filteredPosts,
      applications,
      upsertApplication,
      removeApplication,
      getApplicationForPost,
      locale,
      theme,
      tr,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Applications } from './components/Applications'
import { CvBuilder } from './components/CvBuilder'
import { Feed } from './components/Feed'
import { Layout } from './components/Layout'
import { Onboarding } from './components/Onboarding'
import { PostDetail } from './components/PostDetail'
import { Profile } from './components/Profile'
import { Settings } from './components/Settings'
import { AppProvider, useApp } from './context/AppContext'

function GuardedApp() {
  const { profile } = useApp()
  if (!profile.preferences.onboarded) {
    return <Onboarding />
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Feed />} />
        <Route path="post/:postId" element={<PostDetail />} />
        <Route path="cv/:postId" element={<CvBuilder />} />
        <Route path="saved" element={<Applications mode="saved" />} />
        <Route path="applications" element={<Applications mode="all" />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <GuardedApp />
      </AppProvider>
    </BrowserRouter>
  )
}

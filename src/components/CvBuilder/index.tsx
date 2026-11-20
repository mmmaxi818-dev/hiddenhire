import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { getPostById } from '../../sources/mockSocial'
import { ImportPanel } from './ImportPanel'
import { Preview } from './Preview'
import { Wizard } from './Wizard'

export function CvBuilder() {
  const { postId = '' } = useParams()
  const navigate = useNavigate()
  const { tr, scoredPosts, profile, setPreferences } = useApp()
  const post = scoredPosts.find((p) => p.id === postId) ?? getPostById(postId)
  const [step, setStep] = useState(0)
  const [phase, setPhase] = useState<'wizard' | 'preview'>('wizard')

  if (!post) {
    return (
      <div className="p-6">
        <Link to="/" className="text-sm text-muted">
          ← {tr('post.back')}
        </Link>
        <p className="mt-4 text-sm">Post not found.</p>
      </div>
    )
  }

  return (
    <div className="page space-y-4">
      <button
        type="button"
        onClick={() => navigate(`/post/${post.id}`)}
        className="inline-flex min-h-11 items-center text-sm text-muted hover:text-[var(--ink)]"
      >
        ← {tr('post.backToJob')}
      </button>

      <header className="fade-in flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            {tr('cv.title')} · {tr('cv.builder')}
          </p>
          <h1 className="font-display mt-1 text-[1.45rem] leading-tight text-[var(--ink)] sm:text-[1.75rem]">
            {post.title}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {post.employer} · einseitiger Lebenslauf + Anschreiben aus Ihren Angaben
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-3 sm:flex sm:w-auto sm:flex-wrap sm:gap-2">
          <label className="text-[11px] text-muted sm:min-w-[8rem]">
            Dokumentsprache
            <select
              className="input mt-1"
              value={profile.preferences.locale}
              onChange={(e) =>
                setPreferences((p) => ({
                  ...p,
                  locale: e.target.value as 'de' | 'en',
                }))
              }
            >
              <option value="de">Deutsch</option>
              <option value="en">English</option>
            </select>
          </label>
          <label className="text-[11px] text-muted sm:min-w-[8rem]">
            Anschreiben-Ton
            <select className="input mt-1" defaultValue="formal">
              <option value="formal">Förmlich</option>
              <option value="friendly">Freundlich</option>
            </select>
          </label>
        </div>
      </header>

      {phase === 'wizard' ? (
        <>
          <ImportPanel />
          <Wizard step={step} setStep={setStep} onPreview={() => setPhase('preview')} />
        </>
      ) : (
        <Preview post={post} onBack={() => setPhase('wizard')} />
      )}
    </div>
  )
}

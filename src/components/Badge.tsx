import type { ReactNode } from 'react'

type Tone = 'chip' | 'live' | 'match' | 'snapshot' | 'accent' | 'warn'

const styles: Record<Tone, string> = {
  chip: 'bg-[var(--chip)] text-[var(--muted)] border border-transparent',
  live: 'bg-[color-mix(in_srgb,var(--live)_12%,white)] text-[var(--live)] border border-[color-mix(in_srgb,var(--live)_25%,transparent)]',
  match: 'bg-transparent text-[var(--match)] border border-[color-mix(in_srgb,var(--match)_35%,transparent)]',
  snapshot:
    'bg-[color-mix(in_srgb,var(--accent)_10%,white)] text-[var(--accent)] border border-[color-mix(in_srgb,var(--accent)_22%,transparent)]',
  accent: 'bg-[var(--accent)] text-white border border-transparent',
  warn: 'bg-amber-500/15 text-amber-800 border border-amber-500/20',
}

export function Badge({
  children,
  tone = 'chip',
}: {
  children: ReactNode
  tone?: Tone
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${styles[tone]}`}
    >
      {children}
    </span>
  )
}

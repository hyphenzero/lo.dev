import type { ReactNode } from 'react'

export function SectionLabel({ action, children }: { action?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[13px] font-medium tracking-[-0.01em] text-[var(--text-tertiary)] uppercase">
        {children}
      </span>
      {action}
    </div>
  )
}

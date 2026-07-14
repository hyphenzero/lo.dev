import type { ReactNode } from 'react'

export default function SectionHeading({
  label,
  heading,
  children,
}: {
  label?: string
  heading: string
  children?: ReactNode
}) {
  return (
    <div className="mb-16 text-center">
      {label && (
        <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
          {label}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100 sm:text-4xl">{heading}</h2>
      {children && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">{children}</p>
      )}
    </div>
  )
}

import { cn } from '@/lib/cn'
import { Link } from '@inertiajs/react'
import type { ReactNode } from 'react'

export default function Button({
  outline,
  plain,
  href,
  children,
  className,
  ...props
}: {
  outline?: boolean
  plain?: boolean
  href?: string | { url: string }
  children: ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base = cn(
    'inline-flex items-baseline justify-center gap-x-2 rounded-4xl px-4 py-1.5 text-sm/6 font-semibold transition-colors',
    '*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center *:data-[slot=icon]:text-(--btn-icon) *:data-[slot=icon]:transition-colors sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-hover:[--btn-icon:ButtonText]',
    !outline &&
      !plain &&
      'bg-blue-600 text-white hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 [--btn-icon:var(--color-blue-400)] hover:[--btn-icon:var(--color-blue-300)] dark:[--btn-icon:var(--color-blue-400)] dark:hover:[--btn-icon:var(--color-blue-300)]',
    outline &&
      'border border-blue-800 text-zinc-950 hover:bg-blue-50 dark:border-white/20 dark:text-white dark:hover:bg-white/20 hover:border-transparent [--btn-icon:var(--color-zinc-500)] hover:[--btn-icon:var(--color-zinc-700)] dark:[--btn-icon:var(--color-zinc-400)]',
    plain &&
      'text-zinc-950 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-900 [--btn-icon:var(--color-zinc-500)] hover:[--btn-icon:var(--color-zinc-700)] dark:[--btn-icon:var(--color-zinc-400)]',
    className
  )

  const resolvedHref = typeof href === 'string' ? href : href?.url

  if (resolvedHref) {
    return (
      <Link href={resolvedHref} className={base}>
        <TouchTarget>{children}</TouchTarget>
      </Link>
    )
  }

  return (
    <button className={base} {...props}>
      <TouchTarget>{children}</TouchTarget>
    </button>
  )
}

function TouchTarget({ children }: { children: ReactNode }) {
  return (
    <>
      <span
        className="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden"
        aria-hidden="true"
      />
      {children}
    </>
  )
}

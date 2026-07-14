import { Link } from '@inertiajs/react'
import clsx from 'clsx'
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
  const base = clsx(
    className,
    'inline-block rounded-4xl px-4 py-1.5 text-sm/6 font-semibold transition-colors',
    !outline && !plain && 'bg-blue-600 text-white hover:bg-blue-500 dark:bg-blue-800 dark:hover:bg-blue-700',
    outline &&
      'border border-blue-800 text-zinc-950 hover:bg-blue-50 dark:border-white/20 dark:text-white dark:hover:bg-white/20 hover:border-transparent',
    plain && 'text-zinc-950 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-900'
  )

  const resolvedHref = typeof href === 'string' ? href : href?.url

  if (resolvedHref) {
    return (
      <Link href={resolvedHref} className={base}>
        {children}
      </Link>
    )
  }

  return (
    <button className={base} {...props}>
      {children}
    </button>
  )
}

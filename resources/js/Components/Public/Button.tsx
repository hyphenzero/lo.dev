import { Link } from '@inertiajs/react'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const variants: Record<Variant, string> = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 border border-transparent',
  secondary:
    'bg-transparent text-white border border-white/30 hover:bg-white/10',
  ghost:
    'bg-transparent text-zinc-950 dark:text-white border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800',
}

export default function Button({
  variant = 'primary',
  href,
  children,
  className = '',
  ...props
}: {
  variant?: Variant
  href?: string
  children: ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base = `inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-150 ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={base}>
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

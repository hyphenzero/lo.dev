import { cn } from '@/lib/cn'
import type { InputHTMLAttributes } from 'react'

export default function Checkbox({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      className={cn(
        'rounded border-zinc-300 text-blue-600 shadow-xs focus:ring-blue-600 dark:border-zinc-600 dark:bg-zinc-900 dark:focus:ring-blue-500',
        className
      )}
    />
  )
}

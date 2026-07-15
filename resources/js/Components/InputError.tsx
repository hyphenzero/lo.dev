import { cn } from '@/lib/cn'

export default function InputError({ message, className = '' }: { message?: string; className?: string }) {
  return message ? <p className={cn('text-sm text-red-600 dark:text-red-400', className)}>{message}</p> : null
}

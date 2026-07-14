import { Link } from '@inertiajs/react'
import type { PropsWithChildren } from 'react'

export default function GuestLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 dark:bg-zinc-950">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="font-mono text-lg font-semibold tracking-tight text-zinc-950 dark:text-white">
            LO.dev
          </Link>
        </div>
        <div className="rounded-xl border border-zinc-200 p-8 dark:border-zinc-800">{children}</div>
      </div>
    </div>
  )
}

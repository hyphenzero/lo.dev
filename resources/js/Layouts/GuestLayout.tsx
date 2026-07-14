import type { PropsWithChildren } from 'react'
import AuthSwirl from '@/Components/Public/AuthSwirl'

export default function GuestLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full items-center justify-center px-8 py-12 md:w-1/2">
        <div className="w-full max-w-sm">
          <div className="rounded-xl border border-zinc-200 p-8 dark:border-zinc-800">{children}</div>
        </div>
      </div>

      <div className="hidden p-2 md:sticky md:top-0 md:block md:h-screen md:w-1/2">
        <AuthSwirl />
      </div>
    </div>
  )
}

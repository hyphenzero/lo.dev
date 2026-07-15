import AuthSwirl from '@/Components/Public/AuthSwirl'
import type { PropsWithChildren } from 'react'

export default function GuestLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full items-center justify-center px-8 py-12 md:w-2/5">
        <div className="w-full max-w-sm">
          <div className="p-8">{children}</div>
        </div>
      </div>

      <div className="hidden p-2 md:sticky md:top-0 md:block md:h-screen md:w-3/5">
        <AuthSwirl />
      </div>
    </div>
  )
}

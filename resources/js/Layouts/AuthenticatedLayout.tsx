import { Link, usePage } from '@inertiajs/react'
import { PropsWithChildren, ReactNode, useState } from 'react'
import { dashboard, logout } from '@/routes'
import { edit } from '@/routes/profile'
import Container from '@/Components/Public/Container'

export default function AuthenticatedLayout({
  header,
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  const user = usePage().props.auth.user
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="font-mono text-lg font-semibold tracking-tight text-zinc-950 dark:text-white">
                LO.dev
              </Link>
              <Link
                href={dashboard()}
                className="hidden text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white sm:block"
              >
                Dashboard
              </Link>
            </div>

            <div className="hidden items-center gap-4 sm:flex">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">{user?.name}</span>
              <Link
                href={edit()}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                Profile
              </Link>
              <Link
                href={logout()}
                method="post"
                as="button"
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                Log Out
              </Link>
            </div>

            <button
              onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
              className="text-zinc-500 sm:hidden"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {showingNavigationDropdown ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </Container>

        {showingNavigationDropdown && (
          <div className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 sm:hidden">
            <Container className="flex flex-col gap-4 py-6">
              <Link
                href={dashboard()}
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                onClick={() => setShowingNavigationDropdown(false)}
              >
                Dashboard
              </Link>
              <Link
                href={edit()}
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                onClick={() => setShowingNavigationDropdown(false)}
              >
                Profile
              </Link>
              <Link
                href={logout()}
                method="post"
                as="button"
                className="text-left text-sm font-medium text-zinc-600 dark:text-zinc-400"
              >
                Log Out
              </Link>
            </Container>
          </div>
        )}
      </nav>

      {header && (
        <div className="border-b border-zinc-200 dark:border-zinc-800">
          <Container className="py-8">{header}</Container>
        </div>
      )}

      <main>{children}</main>
    </div>
  )
}

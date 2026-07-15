import { dashboard, login } from '@/routes'
import { Link, usePage } from '@inertiajs/react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Button from './Button'
import Container from './Container'
import { Logo } from './Logo'

const links = [
  { href: '/about', label: 'About' },
  { href: '/meetings', label: 'Meetings' },
  { href: '/officers', label: 'Officers' },
  { href: '/join', label: 'Join' },
]

export default function Navbar() {
  const page = usePage()
  const { auth } = page.props as { auth: { user?: { name: string } } }
  const isLanding = page.url === '/'
  const currentPath = page.url.split('?')[0]

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [topOffset, setTopOffset] = useState(12)

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY
      setScrolled(sy > 64)
      setTopOffset(Math.max(0, Math.min(12, 12 - sy)))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHero = !scrolled
  const isHeroText = isHero && isLanding

  return (
    <>
      <div
        className={clsx(
          'fixed right-0 left-0 z-50',
          isHero
            ? 'bg-transparent'
            : 'bg-white/85 backdrop-blur-3xl dark:bg-zinc-950/90',
          'transition-[color,background-color] duration-300'
        )}
        style={{ top: 0, height: topOffset }}
      />
      <header
        className={clsx(
          'fixed right-0 left-0 z-50',
          'transition-[color,background-color,box-shadow] duration-300',
          isHero
            ? 'bg-transparent'
            : 'bg-white/85 shadow-[0_1px_0_0_--alpha(var(--color-zinc-950)/10%)] backdrop-blur-3xl dark:bg-zinc-950/90 dark:shadow-[0_1px_0_0_--alpha(var(--color-white)/10%)]'
        )}
        style={{ top: topOffset }}
      >
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo
              className={clsx(
                'h-7 w-auto transition-colors sm:h-8',
                isHeroText ? 'text-white' : 'text-zinc-950 dark:text-white'
              )}
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => {
              const active = currentPath === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'text-sm font-semibold transition-colors',
                    isHeroText
                      ? active
                        ? 'text-blue-400'
                        : 'text-blue-200 hover:text-white'
                      : active
                        ? 'text-blue-500'
                        : 'text-zinc-950 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
            {auth.user ? (
              <Link
                href={dashboard().url}
                className={clsx(
                  'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                  isHeroText
                    ? 'border-white/30 text-white hover:bg-white/10'
                    : 'border-zinc-200 text-zinc-950 hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800'
                )}
              >
                Dashboard
              </Link>
            ) : (
              <Button className={isHeroText ? 'dark' : ''} href={login()}>Log in</Button>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={clsx('md:hidden', isHeroText ? 'text-white' : 'text-zinc-950 dark:text-white')}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </Container>

      {mobileOpen && (
        <div className="border-t border-zinc-200 bg-white md:hidden dark:border-zinc-800 dark:bg-zinc-950">
          <Container className="flex flex-col gap-4 py-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {auth.user ? (
              <Link
                href={dashboard().url}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-center text-sm font-medium text-zinc-950 dark:border-zinc-700 dark:text-white"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href={login().url}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-center text-sm font-medium text-zinc-950 dark:border-zinc-700 dark:text-white"
              >
                Login
              </Link>
            )}
          </Container>
        </div>
      )}
    </header>
    </>
  )
}

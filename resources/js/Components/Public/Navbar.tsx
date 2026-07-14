import { Link, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { dashboard, login } from '@/routes'
import Container from './Container'
import { Logo } from './Logo'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/meetings', label: 'Meetings' },
  { href: '/officers', label: 'Officers' },
  { href: '/join', label: 'Join' },
]

export default function Navbar() {
  const { auth } = usePage().props as { auth: { user?: { name: string } } }
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHero = !scrolled

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isHero ? 'bg-transparent' : 'border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80'
      }`}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo className={`h-7 w-auto transition-colors sm:h-8 ${isHero ? 'text-white' : 'text-zinc-950 dark:text-white'}`} />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isHero
                    ? 'text-white/70 hover:text-white'
                    : 'text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {auth.user ? (
              <Link
                href={dashboard()}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  isHero
                    ? 'border-white/30 text-white hover:bg-white/10'
                    : 'border-zinc-200 text-zinc-950 hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800'
                }`}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href={login()}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  isHero
                    ? 'border-white/30 text-white hover:bg-white/10'
                    : 'border-zinc-200 text-zinc-950 hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800'
                }`}
              >
                Login
              </Link>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden ${isHero ? 'text-white' : 'text-zinc-950 dark:text-white'}`}
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
        <div className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
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
                href={dashboard()}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-center text-sm font-medium text-zinc-950 dark:border-zinc-700 dark:text-white"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href={login()}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-center text-sm font-medium text-zinc-950 dark:border-zinc-700 dark:text-white"
              >
                Login
              </Link>
            )}
          </Container>
        </div>
      )}
    </header>
  )
}

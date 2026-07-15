import { initializeTheme } from '@/hooks/use-appearance'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import GuestLayout from '@/Layouts/GuestLayout'
import PublicLayout from '@/Layouts/PublicLayout'
import { createInertiaApp } from '@inertiajs/react'

const siteName = 'Computer Science Club at LOHS'

createInertiaApp({
  title: (title: string | null) => (title ? `${title} – ${siteName}` : `${siteName} – Build things. Learn together.`),
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
    const page = pages[`./Pages/${name}.tsx`]

    if (!page.default.layout) {
      switch (true) {
        case name === 'Home':
        case name === 'About':
        case name === 'Meetings':
        case name === 'Join':
          page.default.layout = PublicLayout
          break
        case name.startsWith('Auth/'):
          page.default.layout = GuestLayout
          break
        default:
          page.default.layout = AuthenticatedLayout
          break
      }
    }

    return page
  },
  strictMode: true,
  progress: {
    color: '#155DFC',
  },
})

initializeTheme()

import { initializeTheme } from '@/hooks/use-appearance'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import GuestLayout from '@/Layouts/GuestLayout'
import PublicLayout from '@/Layouts/PublicLayout'
import { createInertiaApp } from '@inertiajs/react'

const appName = import.meta.env.VITE_APP_NAME || 'LOHS CS Club'

createInertiaApp({
  title: (title: string | null) => (title ? `${title} - ${appName}` : appName),
  layout: (name: string) => {
    switch (true) {
      case name === 'Home':
      case name === 'About':
      case name === 'Meetings':
      case name === 'Officers':
      case name === 'Join':
        return PublicLayout
      case name.startsWith('Auth/'):
        return GuestLayout
      default:
        return AuthenticatedLayout
    }
  },
  strictMode: true,
  progress: {
    color: '#155DFC',
  },
})

initializeTheme()

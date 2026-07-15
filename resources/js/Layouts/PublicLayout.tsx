import Footer from '@/Components/Public/Footer'
import Navbar from '@/Components/Public/Navbar'
import type { ReactNode } from 'react'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex min-h-dvh flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  )
}

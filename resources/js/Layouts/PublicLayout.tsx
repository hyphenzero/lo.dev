import { Head } from '@inertiajs/react'
import type { ReactNode } from 'react'
import Footer from '@/Components/Public/Footer'
import Navbar from '@/Components/Public/Navbar'

export default function PublicLayout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <>
      <Head title={title} />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}

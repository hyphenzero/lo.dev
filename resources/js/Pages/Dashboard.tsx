import { Head } from '@inertiajs/react'
import Container from '@/Components/Public/Container'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

export default function Dashboard() {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">Dashboard</h2>
      }
    >
      <Head title="Dashboard" />

      <Container className="py-12">
        <div className="rounded-xl border border-zinc-200 p-8 dark:border-zinc-800">
          <p className="text-zinc-600 dark:text-zinc-300">You're logged in!</p>
        </div>
      </Container>
    </AuthenticatedLayout>
  )
}

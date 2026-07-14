import { Head } from '@inertiajs/react'
import Container from '@/Components/Public/Container'

const roles = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Webmaster', 'Event Coordinator']

export default function Officers() {
  return (
    <>
      <Head title="Officers" />
      <div className="pt-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 font-mono text-xs font-medium tracking-[0.15em] text-zinc-400 uppercase dark:text-zinc-500">
              TEAM
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-100">
              Officers
            </h1>
            <p className="mt-4 text-zinc-500 dark:text-zinc-400">
              Meet the team running the club. Officer positions will be filled soon.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <div key={role} className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
                <p className="font-mono text-xs tracking-[0.15em] text-blue-600 uppercase">{role}</p>
                <p className="mt-3 text-zinc-400 dark:text-zinc-500">Coming soon</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <div className="py-28" />
    </>
  )
}

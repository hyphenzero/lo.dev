import { register } from '@/routes'
import Button from '@/Components/Public/Button'
import Container from '@/Components/Public/Container'
import PublicLayout from '@/Layouts/PublicLayout'

export default function Join() {
  return (
    <PublicLayout title="Join">
      <div className="pt-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
              GET_INVOLVED
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100 sm:text-5xl">
              Join the Club
            </h1>
          </div>

          <div className="mt-16 space-y-8 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            <p>
              The Lake Oswego High School Computer Science Club is open to all students, regardless of experience level.
            </p>

            <div className="grid gap-8 sm:grid-cols-3">
              <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-blue-600">WHO</p>
                <p className="mt-3 text-zinc-600 dark:text-zinc-300">
                  Any LOHS student interested in computer science, programming, or technology.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-blue-600">WHEN</p>
                <p className="mt-3 text-zinc-600 dark:text-zinc-300">
                  Meetings are held every Tuesday at 6:00 PM in Room 245.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-blue-600">WHAT</p>
                <p className="mt-3 text-zinc-600 dark:text-zinc-300">
                  Learn to code, build projects, explore AI, and collaborate with others.
                </p>
              </div>
            </div>

            <p>
              To get started, create an account. You will be able to participate in club activities, view meeting
              information, and connect with other members.
            </p>

            <div className="pt-4">
              <Button href={register()} variant="primary">
                Create an account
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <div className="py-28" />
    </PublicLayout>
  )
}

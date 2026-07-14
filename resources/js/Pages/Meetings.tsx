import Container from '@/Components/Public/Container'
import Countdown from '@/Components/Public/Countdown'
import PublicLayout from '@/Layouts/PublicLayout'

const nextMeeting = new Date()
nextMeeting.setDate(nextMeeting.getDate() + ((2 - nextMeeting.getDay() + 7) % 7 || 7))
nextMeeting.setHours(18, 0, 0, 0)

export default function Meetings() {
  return (
    <PublicLayout title="Meetings">
      <div className="pt-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
              SCHEDULE
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100 sm:text-5xl">
              Meetings
            </h1>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 p-8 dark:border-zinc-800">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-blue-600">NEXT_MEETING</p>
              <div className="mt-6 space-y-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-zinc-400">Day</p>
                  <p className="mt-1 text-xl font-semibold text-zinc-950 dark:text-zinc-100">Tuesday</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-zinc-400">Time</p>
                  <p className="mt-1 text-xl font-semibold text-zinc-950 dark:text-zinc-100">6:00 PM</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-zinc-400">Location</p>
                  <p className="mt-1 text-xl font-semibold text-zinc-950 dark:text-zinc-100">Room 245</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-zinc-400">Countdown</p>
                  <p className="mt-1 font-mono text-xl tabular-nums tracking-widest text-blue-600">
                    <Countdown targetDate={nextMeeting} />
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 p-8 dark:border-zinc-800">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-blue-600">SCHEDULE</p>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-zinc-400">Regular Meetings</p>
                  <p className="mt-1 text-zinc-600 dark:text-zinc-300">
                    Every Tuesday after school in Room 245.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-zinc-400">Duration</p>
                  <p className="mt-1 text-zinc-600 dark:text-zinc-300">
                    Approximately one hour.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-zinc-400">Who Can Attend</p>
                  <p className="mt-1 text-zinc-600 dark:text-zinc-300">
                    Any LOHS student. No sign-up required to attend.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="py-28" />
    </PublicLayout>
  )
}

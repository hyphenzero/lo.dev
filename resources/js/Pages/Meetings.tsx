import Container from '@/Components/Public/Container'
import Countdown from '@/Components/Public/Countdown'
import { Head } from '@inertiajs/react'

const nextMeeting = new Date()
nextMeeting.setDate(nextMeeting.getDate() + ((2 - nextMeeting.getDay() + 7) % 7 || 7))
nextMeeting.setHours(18, 0, 0, 0)

export default function Meetings() {
  return (
    <>
      <Head title="Meetings" />
      <div className="pt-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 font-mono text-xs font-medium tracking-[0.15em] text-zinc-400 uppercase dark:text-zinc-500">
              SCHEDULE
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-100">
              Meetings
            </h1>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 p-8 dark:border-zinc-800">
              <p className="font-mono text-xs tracking-[0.15em] text-blue-600 uppercase">NEXT_MEETING</p>
              <div className="mt-6 space-y-4">
                <div>
                  <p className="font-mono text-xs tracking-wider text-zinc-400 uppercase">Day</p>
                  <p className="mt-1 text-xl font-semibold text-zinc-950 dark:text-zinc-100">Tuesday</p>
                </div>
                <div>
                  <p className="font-mono text-xs tracking-wider text-zinc-400 uppercase">Time</p>
                  <p className="mt-1 text-xl font-semibold text-zinc-950 dark:text-zinc-100">6:00 PM</p>
                </div>
                <div>
                  <p className="font-mono text-xs tracking-wider text-zinc-400 uppercase">Location</p>
                  <p className="mt-1 text-xl font-semibold text-zinc-950 dark:text-zinc-100">Room 100 — Ms. Rose</p>
                </div>
                <div>
                  <p className="font-mono text-xs tracking-wider text-zinc-400 uppercase">Countdown</p>
                  <p className="mt-1 font-mono text-xl tracking-widest text-blue-600 tabular-nums">
                    <Countdown targetDate={nextMeeting} />
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 p-8 dark:border-zinc-800">
              <p className="font-mono text-xs tracking-[0.15em] text-blue-600 uppercase">SCHEDULE</p>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="font-mono text-xs tracking-wider text-zinc-400 uppercase">Regular Meetings</p>
                  <p className="mt-1 text-zinc-600 dark:text-zinc-300">Every Tuesday after school in Room 100.</p>
                </div>
                <div>
                  <p className="font-mono text-xs tracking-wider text-zinc-400 uppercase">Duration</p>
                  <p className="mt-1 text-zinc-600 dark:text-zinc-300">Approximately one hour.</p>
                </div>
                <div>
                  <p className="font-mono text-xs tracking-wider text-zinc-400 uppercase">Who Can Attend</p>
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
    </>
  )
}

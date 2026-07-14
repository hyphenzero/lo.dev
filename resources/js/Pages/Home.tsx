import { Link } from '@inertiajs/react'
import { about, meetings, register } from '@/routes'
import Badge from '@/Components/Public/Badge'
import Button from '@/Components/Public/Button'
import Container from '@/Components/Public/Container'
import Countdown from '@/Components/Public/Countdown'
import EmptyState from '@/Components/Public/EmptyState'
import FadeIn from '@/Components/Public/FadeIn'
import SectionHeading from '@/Components/Public/SectionHeading'

const nextMeeting = new Date()
nextMeeting.setDate(nextMeeting.getDate() + ((2 - nextMeeting.getDay() + 7) % 7 || 7))
nextMeeting.setHours(18, 0, 0, 0)

const features = [
  {
    icon: '->',
    title: 'Learn',
    description: 'Learn programming concepts, new technologies, and computer science topics.',
  },
  {
    icon: '{}',
    title: 'Build',
    description: 'Create software projects and experiment with ideas.',
  },
  {
    icon: '<>',
    title: 'Collaborate',
    description: 'Work with other students and share knowledge.',
  },
]

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-blue-600">
        <div className="pointer-events-none absolute inset-0 select-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 50%, white 0.5px, transparent 0.5px),
                radial-gradient(circle at 80% 30%, white 0.5px, transparent 0.5px),
                radial-gradient(circle at 50% 70%, white 0.5px, transparent 0.5px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute right-[10%] top-[15%] font-mono text-[10px] leading-relaxed tracking-wide text-white/10">
            {'const club = new CSClub()'.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
          <div className="absolute bottom-[20%] left-[8%] font-mono text-[10px] leading-relaxed tracking-wide text-white/10">
            {'// build something great'.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </div>

        <Container className="relative z-10 text-center">
          <div className="mb-6">
            <Badge>{'< /> STUDENT BUILDERS'}</Badge>
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Computer Science Club at Lake Oswego High School
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
            A community where students learn computer science, build projects, explore new technologies, and collaborate
            with others who love creating things.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={register()} variant="primary">
              Join the Club
            </Button>
            <Button href={about()} variant="secondary">
              Learn More
            </Button>
          </div>
        </Container>
      </section>

      <FadeIn>
        <section className="border-b border-zinc-200 py-28 dark:border-zinc-800">
          <Container>
            <SectionHeading label="About the Club" heading="Build things. Learn together.">
              The club is a place for students interested in programming, software, AI, game development, and technology.
              Whether you are writing your first line of code or shipping your tenth project, you will find a place here.
            </SectionHeading>
          </Container>
        </section>
      </FadeIn>

      <FadeIn delay={100}>
        <section className="border-b border-zinc-200 py-28 dark:border-zinc-800">
          <Container>
            <SectionHeading label="What We Do" heading="Learn. Build. Collaborate." />

            <div className="grid gap-16 md:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title}>
                  <span className="font-mono text-sm text-blue-600">{feature.icon}</span>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">
                    {feature.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-zinc-500 dark:text-zinc-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </FadeIn>

      <FadeIn delay={200}>
        <section className="border-b border-zinc-200 py-28 dark:border-zinc-800">
          <Container>
            <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
              <div className="bg-zinc-950 px-8 py-6">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-400">NEXT_MEETING</p>
              </div>
              <div className="bg-blue-600 px-8 py-16 text-center sm:py-24">
                <div className="grid gap-8 sm:grid-cols-3">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-blue-200">Day</p>
                    <p className="mt-2 text-2xl font-semibold text-white">Tuesday</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-blue-200">Time</p>
                    <p className="mt-2 text-2xl font-semibold text-white">6:00 PM</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-blue-200">Location</p>
                    <p className="mt-2 text-2xl font-semibold text-white">Room 245</p>
                  </div>
                </div>
                <div className="mt-8">
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-blue-200">Next meeting in</p>
                  <Countdown targetDate={nextMeeting} />
                </div>
              </div>
            </div>
          </Container>
        </section>
      </FadeIn>

      <FadeIn delay={300}>
        <section className="border-b border-zinc-200 py-28 dark:border-zinc-800">
          <Container>
            <SectionHeading heading="Projects from our members" label="">
              Students build everything from websites and games to AI experiments and creative tools.
            </SectionHeading>

            <div className="mt-10">
              <EmptyState title="Projects coming soon." description="Project sharing will be available in a future update." />
            </div>
          </Container>
        </section>
      </FadeIn>

      <FadeIn delay={400}>
        <section className="py-28">
          <Container className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100 sm:text-4xl">
              Interested in joining?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-500 dark:text-zinc-400">
              Everyone is welcome. No previous programming experience required.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href={register()} variant="primary">
                Join the Club
              </Button>
              <Button
                href={meetings()}
                variant="ghost"
              >
                View Meetings
              </Button>
            </div>
          </Container>
        </section>
      </FadeIn>
    </>
  )
}

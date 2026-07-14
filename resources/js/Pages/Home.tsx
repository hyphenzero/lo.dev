import Button from '@/Components/Public/Button'
import SwirlHero from '@/Components/Public/SwirlHero'
import Container from '@/Components/Public/Container'
import Countdown from '@/Components/Public/Countdown'
import EmptyState from '@/Components/Public/EmptyState'
import FadeIn from '@/Components/Public/FadeIn'
import SectionHeading from '@/Components/Public/SectionHeading'
import { about, meetings, register } from '@/routes'

const nextMeeting = new Date()
nextMeeting.setDate(nextMeeting.getDate() + ((2 - nextMeeting.getDay() + 7) % 7 || 7))
nextMeeting.setHours(18, 0, 0, 0)

const features = [
  {
    icon: '->',
    title: 'Learn',
    description: 'Explore programming concepts, new technologies, and computer science topics.',
  },
  {
    icon: '{}',
    title: 'Build',
    description: 'Experiment with ideas, create software projects, and ship them with our guidance and expertise.',
  },
  {
    icon: '<>',
    title: 'Collaborate',
    description:
      'Work with an active community of students and share knowledge. Invite others to your projects and contribute to theirs.',
  },
]

export default function Home() {
  return (
    <>
      <SwirlHero />

      <FadeIn>
        <section className="border-b border-zinc-200 py-28 dark:border-zinc-800">
          <Container>
            <SectionHeading label="About the Club" heading="Build things. Learn together.">
              The club is a place for students interested in programming, software, AI, game development, and
              technology. Whether you are writing your first line of code or shipping your tenth project, you will find
              a place here.
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
                  <span className="font-mono text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {feature.icon}
                  </span>
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
                <p className="font-mono text-xs tracking-[0.15em] text-zinc-400 uppercase">NEXT_MEETING</p>
              </div>
              <div className="bg-blue-600 px-8 py-16 text-center sm:py-24">
                <div className="grid gap-8 sm:grid-cols-3">
                  <div>
                    <p className="font-mono text-xs tracking-[0.15em] text-blue-200 uppercase">Day</p>
                    <p className="mt-2 text-2xl font-semibold text-white">Tuesday</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs tracking-[0.15em] text-blue-200 uppercase">Time</p>
                    <p className="mt-2 text-2xl font-semibold text-white">6:00 PM</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs tracking-[0.15em] text-blue-200 uppercase">Location</p>
                    <p className="mt-2 text-2xl font-semibold text-white">Room 100</p>
                  </div>
                </div>
                <div className="mt-8">
                  <p className="mb-3 font-mono text-xs tracking-[0.15em] text-blue-200 uppercase">Next meeting in</p>
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
              <EmptyState
                title="Projects coming soon."
                description="Project sharing will be available in a future update."
              />
            </div>
          </Container>
        </section>
      </FadeIn>

      <FadeIn delay={400}>
        <section className="py-28">
          <Container className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-100">
              Interested in joining?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-500 dark:text-zinc-400">
              Everyone is welcome. No previous programming experience required.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href={register()}>Join the Club</Button>
              <Button href={meetings()} plain>
                View Meetings
              </Button>
            </div>
          </Container>
        </section>
      </FadeIn>
    </>
  )
}

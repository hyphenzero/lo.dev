import Container from '@/Components/Public/Container'
import { Head } from '@inertiajs/react'

export default function About() {
  return (
    <>
      <Head title="About" />
      <div className="pt-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 font-mono text-xs font-medium tracking-[0.15em] text-zinc-400 uppercase dark:text-zinc-500">
              About
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-100">
              About the Club
            </h1>

            <div className="mt-12 space-y-8 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>
                The Lake Oswego High School Computer Science Club is a student community focused on learning, building,
                and exploring technology together.
              </p>
              <p>
                Members can explore programming, software engineering, artificial intelligence, game development, and
                other areas of computer science.
              </p>
              <p>Students of all experience levels are welcome.</p>
            </div>
          </div>
        </Container>
      </div>

      <div className="py-28" />
    </>
  )
}

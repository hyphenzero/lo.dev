import Container from './Container'

export default function Footer() {
  return (
    <Container>
      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row font-mono text-xs text-zinc-400">
          <p>lo.dev</p>
          <p>Lake Oswego High School Computer Science Club</p>
        </div>
      </footer>
    </Container>
  )
}

import Container from './Container'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="font-mono text-sm text-zinc-400">
          LO.dev
        </p>
        <p className="text-xs text-zinc-400">
          Lake Oswego High School Computer Science Club
        </p>
      </Container>
    </footer>
  )
}

import Container from './Container'

export default function Footer() {
  return (
    <Container>
      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col items-center justify-between gap-4 py-8 font-mono text-xs text-zinc-400 sm:flex-row">
          <p>lohs.dev</p>
          <p>Computer Science Club at Lake Oswego High School</p>
        </div>
      </footer>
    </Container>
  )
}

export default function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-200 px-3 py-1 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:border-zinc-700 dark:text-zinc-400">
      {children}
    </span>
  )
}

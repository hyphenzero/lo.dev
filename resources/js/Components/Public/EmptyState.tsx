export default function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-200 px-6 py-16 text-center dark:border-zinc-700">
      <p className="font-mono text-xs uppercase tracking-wider text-zinc-400">{title}</p>
      {description && <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>}
    </div>
  )
}

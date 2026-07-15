import GlitchText from '@/Components/GlitchText'
import Button from '@/Components/Public/Button'
import ChevronLeftIcon from '@heroicons/react/16/solid/ChevronLeftIcon'
import { Head } from '@inertiajs/react'

const titles: Record<number, string> = {
  503: 'Service Unavailable',
  500: 'Server Error',
  404: 'Page Not Found',
  403: 'Forbidden',
}

const descriptions: Record<number, string> = {
  503: 'Sorry, we are doing some maintenance. Please check back soon.',
  500: 'Whoops, something went wrong on our servers.',
  404: 'Sorry, the page you are looking for could not be found.',
  403: 'Sorry, you are forbidden from accessing this page.',
}

export default function ErrorPage({ status }: { status: number }) {
  const title = titles[status] ?? 'Error'
  const description = descriptions[status] ?? 'An unexpected error occurred.'

  return (
    <>
      <Head title={title} />
      <div className="flex flex-col items-center px-6 py-24 sm:py-32">
        <GlitchText speed={0.6} enableShadows enableOnHover={false}>
          {String(status)}
        </GlitchText>
        <p className="mt-8 text-lg text-zinc-500 dark:text-zinc-400">{description}</p>
        <Button href="/" className="mt-8">
          <ChevronLeftIcon data-slot="icon" />
          Back to Home
        </Button>
      </div>
    </>
  )
}

import { logout } from '@/routes'
import { send } from '@/routes/verification'
import { Head, Link, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'

export default function VerifyEmail({ status }: { status?: string }) {
  const { post, processing } = useForm({})

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(send().url)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 dark:bg-zinc-950">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="font-mono text-lg font-semibold tracking-tight text-zinc-950 dark:text-white">
            LO.dev
          </Link>
        </div>
        <div className="rounded-xl border border-zinc-200 p-8 dark:border-zinc-800">
          <Head title="Email Verification" />

          <h2 className="mb-2 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">
            Verify your email
          </h2>
          <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
            Thanks for signing up! Before getting started, could you verify your email address by clicking on the link
            we just emailed to you? If you didn't receive the email, we will gladly send you another.
          </p>

          {status === 'verification-link-sent' && (
            <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
              A new verification link has been sent to the email address you provided during registration.
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <button
              type="submit"
              disabled={processing}
              className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              Resend Verification Email
            </button>

            <Link
              href={logout().url}
              method="post"
              as="button"
              className="inline-flex w-full items-center justify-center rounded-lg border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900"
            >
              Log Out
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import { email } from '@/routes/password'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import GuestLayout from '@/Layouts/GuestLayout'

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(email())
  }

  return (
    <GuestLayout>
      <Head title="Forgot Password" />

      <h2 className="mb-2 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">Reset password</h2>
      <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
        Forgot your password? No problem. Let us know your email address and we will email you a password reset link.
      </p>

      {status && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
          {status}
        </div>
      )}

      <form onSubmit={submit} className="space-y-5">
        <div>
          <InputLabel htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            isFocused
            onChange={(e) => setData('email', e.target.value)}
          />
          <InputError message={errors.email} className="mt-2" />
        </div>

        <button
          type="submit"
          disabled={processing}
          className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          Email Password Reset Link
        </button>
      </form>
    </GuestLayout>
  )
}

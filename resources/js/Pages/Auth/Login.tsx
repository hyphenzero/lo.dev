import Checkbox from '@/Components/Checkbox'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import GuestLayout from '@/Layouts/GuestLayout'
import { login as loginRoute, register as registerRoute } from '@/routes'
import { request as passwordRequest } from '@/routes/password'
import { Head, Link, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(loginRoute().url, {
      onFinish: () => reset('password'),
    })
  }

  return (
    <GuestLayout>
      <Head title="Log in" />

      <h2 className="mb-6 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">Log in</h2>

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
            autoComplete="username"
            isFocused
            onChange={(e) => setData('email', e.target.value)}
          />
          <InputError message={errors.email} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="password" value="Password" />
          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e) => setData('password', e.target.value)}
          />
          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <Checkbox name="remember" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} />
            <span className="ms-2 text-sm text-zinc-600 dark:text-zinc-400">Remember me</span>
          </label>

          {canResetPassword && (
            <Link href={passwordRequest().url} className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Forgot password?
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={processing}
            className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            Log in
          </button>

          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            Don't have an account?{' '}
            <Link href={registerRoute().url} className="font-medium text-blue-600 hover:text-blue-500">
              Register
            </Link>
          </p>
        </div>
      </form>
    </GuestLayout>
  )
}

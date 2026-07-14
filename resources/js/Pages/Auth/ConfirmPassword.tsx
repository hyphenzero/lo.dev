import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import GuestLayout from '@/Layouts/GuestLayout'
import { confirm } from '@/routes/password'
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(confirm().url, {
      onFinish: () => reset('password'),
    })
  }

  return (
    <GuestLayout>
      <Head title="Confirm Password" />

      <h2 className="mb-2 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">
        Confirm your password
      </h2>
      <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
        This is a secure area of the application. Please confirm your password before continuing.
      </p>

      <form onSubmit={submit} className="space-y-5">
        <div>
          <InputLabel htmlFor="password" value="Password" />
          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            isFocused
            onChange={(e) => setData('password', e.target.value)}
          />
          <InputError message={errors.password} className="mt-2" />
        </div>

        <button
          type="submit"
          disabled={processing}
          className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          Confirm
        </button>
      </form>
    </GuestLayout>
  )
}

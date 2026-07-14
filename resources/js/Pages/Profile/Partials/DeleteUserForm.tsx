import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import { useForm } from '@inertiajs/react'
import { FormEventHandler, useRef, useState } from 'react'
import { destroy } from '@/routes/profile'

export default function DeleteUserForm({ className = '' }: { className?: string }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
  const passwordInput = useRef<HTMLInputElement>(null)

  const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({
    password: '',
  })

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true)
  }

  const deleteUser: FormEventHandler = (e) => {
    e.preventDefault()
    destroy(destroy(), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset(),
    })
  }

  const closeModal = () => {
    setConfirmingUserDeletion(false)
    clearErrors()
    reset()
  }

  return (
    <section className={`space-y-6 ${className}`}>
      <header>
        <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">Delete Account</h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your
          account, please download any data or information that you wish to retain.
        </p>
      </header>

      <button
        onClick={confirmUserDeletion}
        className="inline-flex items-center justify-center rounded-lg border border-red-300 px-5 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
      >
        Delete Account
      </button>

      {confirmingUserDeletion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <form onSubmit={deleteUser}>
              <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">
                Are you sure you want to delete your account?
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Once your account is deleted, all of its resources and data will be permanently deleted. Please enter
                your password to confirm.
              </p>

              <div className="mt-6">
                <InputLabel htmlFor="delete-password" value="Password" className="sr-only" />
                <TextInput
                  id="delete-password"
                  type="password"
                  name="password"
                  ref={passwordInput}
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className="mt-1 block w-full"
                  isFocused
                  placeholder="Password"
                />
                <InputError message={errors.password} className="mt-2" />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex items-center justify-center rounded-lg border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="inline-flex items-center justify-center rounded-lg border border-red-300 px-5 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
                >
                  Delete Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

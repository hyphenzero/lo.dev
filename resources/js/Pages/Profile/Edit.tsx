import Container from '@/Components/Public/Container'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import type { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import DeleteUserForm from './Partials/DeleteUserForm'
import UpdatePasswordForm from './Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'

export default function Edit({ mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">Profile</h2>}
    >
      <Head title="Profile" />

      <Container className="space-y-8 py-12">
        <div className="rounded-xl border border-zinc-200 p-8 dark:border-zinc-800">
          <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} className="max-w-xl" />
        </div>

        <div className="rounded-xl border border-zinc-200 p-8 dark:border-zinc-800">
          <UpdatePasswordForm className="max-w-xl" />
        </div>

        <div className="rounded-xl border border-zinc-200 p-8 dark:border-zinc-800">
          <DeleteUserForm className="max-w-xl" />
        </div>
      </Container>
    </AuthenticatedLayout>
  )
}

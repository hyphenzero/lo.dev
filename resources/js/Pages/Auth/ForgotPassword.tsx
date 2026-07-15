import Button from '@/Components/Public/Button'
import { ErrorMessage, Field, Label } from '@/Components/Public/Fieldset'
import { Heading } from '@/Components/Public/Heading'
import { Input } from '@/Components/Public/Input'
import { Logo } from '@/Components/Public/Logo'
import { Text } from '@/Components/Public/Text'
import { email } from '@/routes/password'
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler, useEffect, useRef } from 'react'

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(email().url)
  }

  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  return (
    <>
      <Head title="Forgot Password" />

      {status && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
          {status}
        </div>
      )}

      <form action="" method="POST" onSubmit={submit} className="grid w-full max-w-sm grid-cols-1 gap-8">
        <Logo className="h-6 text-zinc-950 dark:text-white forced-colors:text-[CanvasText]" />
        <Heading>Reset password</Heading>
        <Text>
          Forgot your password? No problem. Let us know your email address and we will email you a password reset link.
        </Text>
        <Field>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            ref={emailRef}
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            invalid={!!errors.email}
            autoComplete="username"
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </Field>
        <Button type="submit" disabled={processing} className="w-full rounded-lg">
          Email Password Reset Link
        </Button>
      </form>
    </>
  )
}

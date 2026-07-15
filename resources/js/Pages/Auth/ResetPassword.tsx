import Button from '@/Components/Public/Button'
import { ErrorMessage, Field, Label } from '@/Components/Public/Fieldset'
import { Heading } from '@/Components/Public/Heading'
import { Input } from '@/Components/Public/Input'
import { Logo } from '@/Components/Public/Logo'
import { store } from '@/routes/password'
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler, useEffect, useRef } from 'react'

export default function ResetPassword({ token, email }: { token: string; email: string }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token,
    email,
    password: '',
    password_confirmation: '',
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(store().url, {
      onFinish: () => reset('password', 'password_confirmation'),
    })
  }

  const passwordRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    passwordRef.current?.focus()
  }, [])

  return (
    <>
      <Head title="Reset Password" />

      <form action="" method="POST" onSubmit={submit} className="grid w-full max-w-sm grid-cols-1 gap-8">
        <Logo className="h-6 text-zinc-950 dark:text-white forced-colors:text-[CanvasText]" />
        <Heading>Reset password</Heading>
        <Field>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            invalid={!!errors.email}
            autoComplete="username"
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </Field>
        <Field>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            ref={passwordRef}
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            invalid={!!errors.password}
            autoComplete="new-password"
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </Field>
        <Field>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            invalid={!!errors.password_confirmation}
            autoComplete="new-password"
          />
          {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation}</ErrorMessage>}
        </Field>
        <Button type="submit" disabled={processing} className="w-full rounded-lg">
          Reset Password
        </Button>
      </form>
    </>
  )
}

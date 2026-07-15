import Button from '@/Components/Public/Button'
import { Checkbox, CheckboxField } from '@/Components/Public/Checkbox'
import { ErrorMessage, Field, Label } from '@/Components/Public/Fieldset'
import { Heading } from '@/Components/Public/Heading'
import { Input } from '@/Components/Public/Input'
import { Logo } from '@/Components/Public/Logo'
import { Strong, Text, TextLink } from '@/Components/Public/Text'
import { login as loginRoute, register as registerRoute } from '@/routes'
import { request as passwordRequest } from '@/routes/password'
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler, useEffect, useRef } from 'react'

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

  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  return (
    <>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
          {status}
        </div>
      )}

      <form action="" method="POST" onSubmit={submit} className="grid w-full max-w-sm grid-cols-1 gap-8">
        <Logo className="h-6 text-zinc-950 dark:text-white forced-colors:text-[CanvasText]" />
        <Heading>Sign in to your account</Heading>
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
        <Field>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            invalid={!!errors.password}
            autoComplete="current-password"
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </Field>
        <div className="flex items-center justify-between">
          <CheckboxField>
            <Checkbox name="remember" checked={data.remember} onChange={(checked) => setData('remember', checked)} />
            <Label>Remember me</Label>
          </CheckboxField>
          {canResetPassword && (
            <Text>
              <TextLink href={passwordRequest().url}>
                <Strong>Forgot password?</Strong>
              </TextLink>
            </Text>
          )}
        </div>
        <Button type="submit" disabled={processing} className="w-full rounded-lg">
          Log in
        </Button>
        <Text>
          Don't have an account?{' '}
          <TextLink href={registerRoute().url}>
            <Strong>Sign up</Strong>
          </TextLink>
        </Text>
      </form>
    </>
  )
}

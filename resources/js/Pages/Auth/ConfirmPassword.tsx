import Button from '@/Components/Public/Button'
import { ErrorMessage, Field, Label } from '@/Components/Public/Fieldset'
import { Heading } from '@/Components/Public/Heading'
import { Input } from '@/Components/Public/Input'
import { Logo } from '@/Components/Public/Logo'
import { Text } from '@/Components/Public/Text'
import { confirm } from '@/routes/password'
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler, useEffect, useRef } from 'react'

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

  const passwordRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    passwordRef.current?.focus()
  }, [])

  return (
    <>
      <Head title="Confirm Password" />

      <form action="" method="POST" onSubmit={submit} className="grid w-full max-w-sm grid-cols-1 gap-8">
        <Logo className="h-6 text-zinc-950 dark:text-white forced-colors:text-[CanvasText]" />
        <Heading>Confirm your password</Heading>
        <Text>This is a secure area of the application. Please confirm your password before continuing.</Text>
        <Field>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            ref={passwordRef}
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            invalid={!!errors.password}
            autoComplete="current-password"
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </Field>
        <Button type="submit" disabled={processing} className="w-full rounded-lg">
          Confirm
        </Button>
      </form>
    </>
  )
}

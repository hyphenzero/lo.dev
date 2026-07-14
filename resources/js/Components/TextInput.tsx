import { forwardRef, useEffect, useImperativeHandle, useRef, type InputHTMLAttributes } from 'react'

export default forwardRef(function TextInput(
  {
    type = 'text',
    className = '',
    isFocused = false,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
  ref,
) {
  const localRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }))

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus()
    }
  }, [isFocused])

  return (
    <input
      {...props}
      type={type}
      className={
        `rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 placeholder-zinc-400 transition-colors focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 ` +
        className
      }
      ref={localRef}
    />
  )
})

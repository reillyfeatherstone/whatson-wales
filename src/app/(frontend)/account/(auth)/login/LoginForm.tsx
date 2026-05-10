'use client'

import { type FieldErrors, FormField } from '@/components/FormField'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { loginFormSchema } from '@/app/(frontend)/account/(auth)/create/actions/schema'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { login } from '@/app/(frontend)/account/(auth)/login/actions/login'
import { Response } from '@/app/(frontend)/account/(auth)/create/actions/create'

export default function LoginForm() {
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    formRef.current?.reset()
  }, [])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const router = useRouter()

  async function handleSubmit(
    event: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    setFieldErrors({})

    const formData = new FormData(event.currentTarget)

    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    const validated = loginFormSchema.safeParse(data)
    if (!validated.success) {
      const errors: FieldErrors = {}
      for (const issue of validated.error.issues) {
        const field = issue.path[0].toString()
        if (!errors[field]) errors[field] = []
        errors[field].push(issue.message)
      }
      setFieldErrors(errors)
      setIsLoading(false)
      return
    }

    const { ...loginParams } = validated.data
    const result: Response = await login(loginParams)
    setIsLoading(false)

    if (result.success) {
      router.push(`/account`)
    } else {
      setError(result.error || 'An error occurred')
    }
  }

  return (
    <div className="flex flex-col md:flex-row space-x-10 lg:space-x-20 w-full py-15 space-y-10">
      <div className="login w-full md:w-[50%]">
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          id="login"
          className="flex flex-col space-y-4"
        >
          <h2 className="text-2xl font-medium">Login Information</h2>
          <FormField
            id="email"
            type="email"
            label="Email Address"
            placeholder="your.name@example.com"
            error={fieldErrors.email}
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter password"
            minLength={8}
            maxLength={64}
            error={fieldErrors.password}
          />
          <Button
            variant="default"
            size="xl"
            className="md:self-start hover:cursor-pointer"
            disabled={isLoading}
          >
            Login
          </Button>
          {error && (
            <div className="bg-red-200 border-l-5 border-l-red-400 py-4">
              <p className="text-red-500 text-base px-8">{error}</p>
            </div>
          )}
          <Link
            href="/account/forgot"
            className="hover:underline underline-offset-2 font-base text-primary"
          >
            Forgot Password?
          </Link>
        </form>
      </div>
      <div className="hidden md:block w-px bg-[#AFAFAF] self-stretch" />
      <div className="register-cta w-full md:w-[50%]">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold">Not Registered Yet?</h2>
          <p>
            Click below to register for a new account and promote your upcoming
            productions.
          </p>
          <Link href="/account/create" className="self-start">
            <Button
              variant="default"
              size="xl"
              className="self-start hover:cursor-pointer"
            >
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import {
  type FieldErrors,
  FormField,
} from '@/app/(frontend)/account/(auth)/components/FormField'
import { registerFormSchema } from '@/app/(frontend)/account/(auth)/create/actions/schema'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { create, Response } from './actions/create'

export default function RegisterForm() {
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
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    }

    const validated = registerFormSchema.safeParse(data)
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

    const { confirmPassword: _, ...createParams } = validated.data
    const result: Response = await create(createParams)
    setIsLoading(false)

    if (result.success) {
      router.push(
        `/account/login?message=${encodeURIComponent('Check your email to verify your account')}`,
      )
    } else {
      setError(result.error || 'An error occurred')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 pt-10 max-w-2xl mx-auto"
    >
      <h1 className="text-5xl font-medium mb-10">Register for an account</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <FormField
          id="firstName"
          label="First Name"
          placeholder="Richard"
          error={fieldErrors.firstName}
        />
        <FormField
          id="lastName"
          label="Last Name"
          placeholder="Burton"
          error={fieldErrors.lastName}
        />
      </div>
      <FormField
        id="email"
        label="Email Address"
        type="email"
        placeholder="e.g. richard.burton@example.com"
        error={fieldErrors.email}
      />
      <div className="flex flex-col sm:flex-row gap-4">
        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter password"
          error={fieldErrors.password}
        />
        <FormField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Re-enter password"
          error={fieldErrors.confirmPassword}
        />
      </div>
      {error && (
        <div className="bg-red-200 border-l-5 border-l-red-400 py-4">
          <p className="text-red-500 text-base pl-8">{error}</p>
        </div>
      )}
      <Button
        type="submit"
        disabled={isLoading}
        variant="default"
        size="xl"
        className="mt-3 hover:cursor-pointer"
      >
        Create Account
      </Button>
      <div className="mt-5 text-center text-muted-foreground">
        Already have an account?
        <Link
          href="/account/login"
          className="ml-2 text-primary font-medium hover:underline underline-offset-2"
        >
          Log In
        </Link>
      </div>
    </form>
  )
}

'use client'

import React, { useEffect, useRef, useState } from 'react'
import { type FieldErrors, FormField } from '@/components/form-field'
import { registerFormSchema } from '@/features/users/schemas/auth.schema'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import {
  create,
  Response,
} from '../../../../../features/users/server/actions/create'
import { Check, LinkIcon, UserIcon } from 'lucide-react'
import { resendVerificationEmail } from '@/features/users/server/actions/resendVerificationEmail'

export default function RegisterForm() {
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    formRef.current?.reset()
  }, [])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [verificationEmail, setVerificationEmail] = useState<string | null>(
    null,
  )
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
      // router.push(`/account/verify`)
      setVerificationEmail(validated.data.email)
    } else {
      setError(result.error || 'An error occurred')
    }
  }

  return (
    <>
      {verificationEmail ? (
        <VerificationMessage email={verificationEmail} />
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 pt-10 max-w-2xl mx-auto"
        >
          <h1 className="text-5xl font-medium mb-10">
            Register for an account
          </h1>
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
      )}
    </>
  )
}

function VerificationMessage({ email }: { email: string }) {
  const [resendState, setResendState] = useState<'idle' | 'sent' | 'error'>(
    'idle',
  )
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleResend() {
    setResendState('sent')
    const result = await resendVerificationEmail(email)
    if (!result.success) {
      setErrorMessage(result.error || 'Something went wrong.')
      setResendState('error')
    }
  }

  return (
    <div className="flex flex-col mx-auto text-center space-y-20 pt-20 pb-40">
      <div className="w-75 mx-auto">
        <h1 className="text-5xl font-bold text-foreground">
          An email is on the way!
        </h1>
      </div>
      <div>
        <p className="font-medium text-muted-foreground">
          A verification link was sent to:
        </p>
        <p className="text-2xl font-bold text-foreground">{email}</p>
      </div>
      <div className="flex flex-col w-75 mx-auto space-y-2">
        <p className="font-medium text-muted-foreground">
          Can't find the email?
        </p>
        {resendState === 'error' && (
          <p className="text-sm text-destructive">{errorMessage}</p>
        )}
        <Button
          variant="outline"
          className={`h-10 text-sm space-x-1 ${
            resendState === 'sent'
              ? 'bg-muted text-green-500 hover:text-green-400 hover:bg-muted/60 hover:cursor-pointer'
              : 'bg-muted text-muted-foreground hover:text-muted-foreground hover:bg-muted/60 hover:cursor-pointer'
          }`}
          onClick={handleResend}
        >
          {resendState === 'sent' ? (
            <span className="flex items-center space-x-1 animate-in fade-in slide-in-from-top-2 duration-200">
              <Check />
              <span>Link sent</span>
            </span>
          ) : (
            <span className="flex items-center space-x-1">
              <LinkIcon />
              <span>Resend Link</span>
            </span>
          )}
        </Button>
        <Button
          variant="outline"
          className="h-10 text-sm text-muted-foreground hover:text-muted-foreground space-x-1 hover:cursor-pointer"
          onClick={() => redirect('/account/login')}
        >
          <UserIcon />
          <span>Use another account</span>
        </Button>
      </div>
    </div>
  )
}

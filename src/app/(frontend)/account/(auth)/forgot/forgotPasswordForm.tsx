'use client'

import { FormField } from '@/components/FormField'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { ArrowRight, Loader, LoaderCircle } from 'lucide-react'
import z from 'zod'
import { ForgotPassword } from '@/app/(frontend)/account/(auth)/forgot/forgotPassword'
import { Response } from '@/app/(frontend)/account/(auth)/create/actions/create'

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [emailState, setEmail] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(
    event: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    const email = formData.get('email')
    const validated = z.email().safeParse(email)
    if (!validated.success) {
      console.log('error')
      const error: string = ''
      setError(error)
      setIsLoading(false)
      return
    }

    const validatedEmail = validated.data

    const result: Response = await ForgotPassword(validatedEmail)
    setIsLoading(false)

    if (result.success) {
      setEmail(validatedEmail)
    } else {
      setError(result.error || 'An error occurred')
    }
  }

  return (
    <div className="flex flex-col px-5 w-full sm:max-w-120 py-5 space-y-10 mx-auto">
      {!emailState ? (
        <>
          <h1 className="text-4xl font-medium text-center">
            Forgot Your Password?
          </h1>
          <p className="text-center text-muted-foreground text-lg">
            Enter the e-mail you used to join and we'll send you instructions to
            reset your password
          </p>
          <div className="login w-full md:max-w-100 mx-auto">
            <form
              onSubmit={handleSubmit}
              id="login"
              className="flex flex-col space-y-4"
            >
              <FormField
                id="email"
                type="email"
                placeholder="your.name@example.com"
              />
              <Button
                variant="default"
                size="xl"
                type="submit"
                className="md:self-start hover:cursor-pointer w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin animation-duration-[1s]" />
                ) : (
                  ''
                )}
                Next
                <ArrowRight className="size-4!" />
              </Button>
              {error && (
                <div className="bg-red-200 border-l-5 border-l-red-400 py-4">
                  <p className="text-red-500 text-base px-8">{error}</p>
                </div>
              )}
            </form>
          </div>
        </>
      ) : (
        <div className="login flex flex-col space-y-5 w-full md:max-w-120 mx-auto text-center">
          <h2 className="text-3xl font-medium">Check your email</h2>
          <p className="text-center text-muted-foreground text-base">
            We sent an email to {emailState}
          </p>
          <p className="text-center text-muted-foreground text-base">
            If the email hasn't arrived yet, please check your spam folder.
            Alternatively, try again.
          </p>
          <Button
            variant="default"
            size="xl"
            type="button"
            className="md:self-start hover:cursor-pointer w-full"
            onClick={() => setEmail(null)}
            disabled={isLoading}
          >
            Send email again
          </Button>
        </div>
      )}
    </div>
  )
}

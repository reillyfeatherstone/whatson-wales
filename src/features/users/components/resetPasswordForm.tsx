'use client'

import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { ArrowRight, CheckIcon, Loader } from 'lucide-react'
import { Response } from '@/features/users/server/actions/create'
import { resetPasswordSchema } from '@/features/users/schemas/auth.schema'
import resetPassword from '@/features/users/server/actions/resetPassword'
import Link from 'next/link'

export function ResetPasswordForm({ token }: { token: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | string[] | null>(null)
  const [isReset, setIsReset] = useState(false)

  async function handleSubmit(
    event: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    const data = {
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    }

    const validated = resetPasswordSchema.safeParse(data)

    if (!validated.success) {
      setError(validated.error.issues.map((i) => i.message))
      setIsLoading(false)
      return
    }

    const password = validated.data.password

    const result: Response = await resetPassword({
      token,
      password,
    })
    setIsLoading(false)

    if (result.success) {
      setIsReset(true)
    } else {
      setError(result.error || 'An error occurred')
    }
  }

  return (
    <div className="flex flex-col px-5 w-full sm:max-w-120 py-5 space-y-8 mx-auto">
      {!isReset ? (
        <>
          <div className="space-y-5">
            <h1 className="text-4xl font-medium text-center">
              Set a new password
            </h1>
            <p className="text-center w-full md:max-w-100 mx-auto text-muted-foreground text-sm">
              Make sure your new password is atleast 8 characters long. Try
              including numbers, uppercase letters and special characters for a
              strong password.
            </p>
          </div>
          <div className="login w-full md:max-w-100 mx-auto">
            <form
              onSubmit={handleSubmit}
              id="login"
              className="flex flex-col space-y-4"
            >
              <FormField
                id="password"
                type="password"
                placeholder="Enter a new password"
              />
              <FormField
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
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
                  {(Array.isArray(error) ? error : [error]).map((e, i) => (
                    <li key={i} className="text-red-500 text-sm ml-10 px-2">
                      {e}
                    </li>
                  ))}
                </div>
              )}
            </form>
          </div>
        </>
      ) : (
        <div className="login flex flex-col space-y-5 w-full md:max-w-120 mx-auto text-center items-center">
          <CheckIcon size={48} className="text-primary" strokeWidth={2.5} />
          <h2 className="text-3xl font-medium">Password set successful</h2>
          <p className="text-center text-muted-foreground text-base">
            You can now sign in with your new password
          </p>
          <Link href="/account/login" className="underline underline-offset-1">
            Sign in with new password
          </Link>
        </div>
      )}
    </div>
  )
}

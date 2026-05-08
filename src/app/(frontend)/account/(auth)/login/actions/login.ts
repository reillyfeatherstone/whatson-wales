'use server'

import {
  AuthenticationError,
  Forbidden,
  getPayload,
  LockedAuth,
  UnverifiedEmail,
  ValidationError,
} from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import type { Account } from '@/payload-types'
import { Response } from '@/app/(frontend)/account/(auth)/create/actions/create'
import { redirect } from 'next/navigation'
import { resendVerificationEmail } from '@/app/(frontend)/account/(auth)/create/actions/resendVerificationEmail'

type LoginParams = {
  email: string
  password: string
}

export type Result = {
  exp?: number
  token?: string
  user?: Account
}

export async function login({
  email,
  password,
}: LoginParams): Promise<Response> {
  const payload = await getPayload({ config })

  try {
    const result: Result = await payload.login({
      collection: 'accounts',
      data: { email, password },
    })
    console.log('result: ' + JSON.stringify(result))

    if (result.token) {
      console.log('token: ' + result.token)
      const cookieStore = await cookies()
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      })

      return { success: true }
    } else {
      return { success: false, error: 'Invalid email or password' }
    }
  } catch (e) {
    if (
      e instanceof ValidationError ||
      e instanceof AuthenticationError ||
      e instanceof LockedAuth ||
      e instanceof Forbidden
    ) {
      return { success: false, error: e.message }
    }
    if (e instanceof UnverifiedEmail) {
      console.log('Unverified: ' + e)
      console.log('resending verification email...')
      await resendVerificationEmail(email)
      return {
        success: false,
        error:
          'Please verify your email address. Another verification email has been sent.',
      }
    }
    console.error('Unexpected login error:', e)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}

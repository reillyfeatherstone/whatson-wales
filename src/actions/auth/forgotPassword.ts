'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Response } from '@/actions/auth/create'

export async function ForgotPassword(email: string): Promise<Response> {
  const payload = await getPayload({ config })

  try {
    await payload.forgotPassword({
      collection: 'accounts',
      data: {
        email,
      },
    })
  } catch (e) {
    console.log('Forgot password error: ', e)
    return { success: false, error: 'An error occurred' }
  }
  return { success: true }
}

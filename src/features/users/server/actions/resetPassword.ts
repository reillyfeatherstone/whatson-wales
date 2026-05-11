'use server'

import { Response } from '@/features/users/server/actions/create'
import { getPayload } from 'payload'
import config from '@payload-config'

type ResetPasswordParams = {
  token: string
  password: string
}

export default async function resetPassword({
  token,
  password,
}: ResetPasswordParams): Promise<Response> {
  const payload = await getPayload({ config })
  try {
    await payload.resetPassword({
      collection: 'accounts',
      data: {
        password: password,
        token: token,
      },
      overrideAccess: true,
    })
  } catch (error) {
    console.log('password reset error: ', error)
    return { success: false, error: 'An error occurred' }
  }

  return { success: true }
}

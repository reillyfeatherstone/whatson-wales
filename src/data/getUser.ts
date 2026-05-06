'use server'

import { headers as getHeaders } from 'next/headers'
import type { Account } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Payload } from 'payload'

export async function getCurrentUser(): Promise<Account | null> {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  if (user?.collection === 'accounts') {
    return user || null
  }

  return null
}

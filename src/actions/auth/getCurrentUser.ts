import { headers } from 'next/headers'
import type { Account } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getCurrentUser(): Promise<Account | null> {
  const payload = await getPayload({ config: configPromise })

  const { user } = await payload.auth({
    headers: await headers(),
  })

  if (user?.collection === 'accounts' && user._verified) {
    return user
  }

  return null
}

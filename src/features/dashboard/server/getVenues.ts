'use server'

import { getCurrentUser } from '@/features/users/server/actions/getCurrentUser'
import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'

export default async function GetVenues() {
  const payload = await getPayload({ config: payloadConfig })

  const user = await getCurrentUser()

  if (!user) {
    return
  }

  const venues = await payload.find({
    collection: 'venues',
  })

  return venues.docs
}

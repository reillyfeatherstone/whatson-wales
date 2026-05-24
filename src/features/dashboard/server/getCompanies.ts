'use server'

import { getCurrentUser } from '@/features/users/server/actions/getCurrentUser'
import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'

export default async function GetCompanies() {
  const payload = await getPayload({ config: payloadConfig })

  const user = await getCurrentUser()

  if (!user) {
    return
  }

  const companies = await payload.find({
    collection: 'productionCompanies',
    where: {
      'members.account': {
        contains: user.id,
      },
    },
  })

  return companies.docs
}

'use server'

import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'

export async function getCompaniesBySearch(query: string) {
  const payload = await getPayload({ config: payloadConfig })

  const companies = await payload.find({
    collection: 'productionCompanies',
    where: {
      productionCompany: {
        like: query,
      },
    },
    limit: 10,
  })

  return companies.docs
}

import { ProductionGrid } from '@/features/productions/blocks/WhatsOnBlock/WhatsOnClient'
import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'
// import WhatsOnClient, { ProductionGrid } from './WhatsOnClient

export async function ProductionsFetcher() {
  'use cache'
  const payload = await getPayload({ config: payloadConfig })
  const now = new Date()

  const productions = await payload.find({
    collection: 'productions',
    depth: 1,
    limit: 12,
    sort: 'dates.start',
    overrideAccess: false,
    where: {
      'dates.end': {
        greater_than: now,
      },
    },
  })

  return <ProductionGrid productions={productions.docs} />
}

import { Page } from '@/payload-types'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import { FeaturedProductions } from '@/blocks/HomeHeroBlock/FeaturedProductions'

type HomeHeroBlock = Extract<Page['layout'][0], { blockType: 'featured' }>

export default async function HomeHeroBlock({ block }: { block: HomeHeroBlock }) {
  const featProds = await getFeaturedProductions()

  return (
    <div className="px-5 max-w-7xl mx-auto">
      <FeaturedProductions prods={featProds} />
    </div>
  )
}

const getFeaturedProductions = async () => {
  const payload = await getPayload({ config: payloadConfig })
  const now = new Date()

  const result = await payload.find({
    collection: 'productions',
    limit: 5,
    sort: 'dates.end',
    where: {
      'dates.end': {
        greater_than: now,
      },
    },
  })

  return result.docs || null
}

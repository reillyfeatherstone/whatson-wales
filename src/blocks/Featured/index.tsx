import { Page } from '@/payload-types'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import { FeaturedProductions } from '@/blocks/Featured/FeaturedProductions'
import { useQuery } from '@tanstack/react-query'

type HomeHeroBlock = Extract<Page['layout'][0], { blockType: 'featured' }>

export default async function Featured({ block }: { block: HomeHeroBlock }) {
  const featProds = await getFeaturedProductions()

  return (
    <div className="px-5 max-w-7xl mx-auto">
      <FeaturedProductions prods={featProds} />
    </div>
  )
}

const getFeaturedProductions = async () => {
  'use cache'
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

export function FeaturedSkeleton() {
  return (
    <div className="px-5 max-w-7xl mx-auto">
      <div className="relative w-full aspect-video max-h-120 overflow-hidden animate-pulse">
        <div className="absolute inset-0 bg-gray-300" />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        <div className="relative z-10 p-6 sm:p-10 flex flex-col justify-end h-full space-y-3">
          <div className="w-22 h-7 bg-gray-500/50 mb-4" />
          <div className="h-9 md:h-10 w-2/3 bg-gray-400/60 rounded" />
          <div className="space-y-2 max-w-md">
            <div className="h-4 w-full bg-gray-400/50 rounded" />
            <div className="h-4 w-4/5 bg-gray-400/50 rounded" />
          </div>
          <div className="h-11 w-36 bg-gray-400/50 rounded" />
        </div>
      </div>
    </div>
  )
}

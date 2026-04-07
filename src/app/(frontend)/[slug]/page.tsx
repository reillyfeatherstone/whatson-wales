import { notFound, redirect } from 'next/navigation'
import { getPayload, RequiredDataFromCollectionSlug } from 'payload'
import HomeHeroBlock from '@/blocks/HomeHeroBlock'
import type { Page } from '@/payload-types'

import configPromise from '@payload-config'
import { cache } from 'react'
import WhatsOnBlock from '@/blocks/WhatsOnBlock'
import payloadConfig from '@payload-config'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'pages',
    limit: 0,
  })

  return docs.map((doc) => ({
    slug: doc.slug,
  }))
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
  })

  if (!page) {
    notFound()
  }

  const renderBlocks = (block: Page['layout'][0]) => {
    switch (block.blockType) {
      case 'section':
        return <HomeHeroBlock block={block} key={block.id} />
      case 'whatsOn':
        return <WhatsOnBlock block={block} key={block.id} />
      default:
        return null
    }
  }

  return (
    <div>
      <div className="page">{page.layout?.map((block) => renderBlocks(block))}</div>
    </div>
  )
}

const queryPageBySlug = async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    // draft,
    limit: 1,
    // pagination: false,
    // overrideAccess: draft,
    where: {
      slug: { equals: slug },
      active: { equals: true },
    },
  })

  return result.docs?.[0] || null
}

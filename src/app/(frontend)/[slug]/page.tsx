import { notFound, redirect } from 'next/navigation'
import { getPayload, RequiredDataFromCollectionSlug } from 'payload'
import SectionBlock from '@/blocks/SectionBlock/SectionBlock'
import type { Page } from '@/payload-types'

import configPromise from '@payload-config'
import { cache } from 'react'

type Args = {
  params: Promise<{
    slug?: string
  }>
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
        return <SectionBlock block={block} key={block.id} />
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

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
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
})

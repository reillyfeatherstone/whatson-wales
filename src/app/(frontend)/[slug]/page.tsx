// import { notFound, redirect } from 'next/navigation'
// import { getPayload, RequiredDataFromCollectionSlug } from 'payload'
// import type { Page } from '@/payload-types'

// import { cache, Suspense } from 'react'
// import WhatsOnBlock from '@/blocks/WhatsOnBlock'
// import payloadConfig from '@payload-config'
// import Featured, { FeaturedSkeleton } from '@/blocks/Featured'

// type Args = {
//   params: Promise<{
//     slug?: string
//   }>
// }

// export async function generateStaticParams() {
//   const payload = await getPayload({ config: payloadConfig })

//   const { docs } = await payload.find({
//     collection: 'pages',
//     limit: 0,
//   })

//   return docs.map((doc) => ({
//     slug: doc.slug,
//   }))
// }

// export default async function Page({ params: paramsPromise }: Args) {
//   const { slug = 'home' } = await paramsPromise

//   const decodedSlug = decodeURIComponent(slug)

//   return (
//     <Suspense>
//       <PageContent slug={decodedSlug} />
//     </Suspense>
//   )
// }

// async function PageContent({ slug }: { slug: string }) {
//   let page: RequiredDataFromCollectionSlug<'pages'> | null

//   page = await queryPageBySlug({
//     slug: slug,
//   })

//   if (!page) {
//     notFound()
//   }

//   return (
//     <div className="page">
//       {page.layout?.map((block) => renderBlocks(block))}
//     </div>
//   )
// }

// const renderBlocks = (block: Page['layout'][0]) => {
//   switch (block.blockType) {
//     case 'featured':
//       return (
//         <Suspense fallback={<FeaturedSkeleton />} key={block.id}>
//           <Featured block={block} />
//         </Suspense>
//       )
//     case 'whatsOn':
//       return <WhatsOnBlock block={block} key={block.id} />
//     default:
//       return null
//   }
// }

// const queryPageBySlug = async ({ slug }: { slug: string }) => {
//   'use cache'
//   const payload = await getPayload({ config: payloadConfig })

//   const result = await payload.find({
//     collection: 'pages',
//     // draft,
//     limit: 1,
//     // pagination: false,
//     // overrideAccess: draft,
//     where: {
//       slug: { equals: slug },
//       active: { equals: true },
//     },
//   })

//   return result.docs?.[0] || null
// }
export default function Page() {
  return null
}

import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'
import type { Production } from '@/payload-types'

const revalidateWhatsOnPages = async (payload: any) => {
  const pages = await payload.find({
    collection: 'pages',
    where: {
      'layout.blockType': { equals: 'whatsOn' },
    },
    limit: 0,
    select: { slug: true },
  })

  for (const page of pages.docs) {
    const path = page.slug === 'home' ? '/' : `/${page.slug}`
    payload.logger.info(`Revalidating ${path} after production change`)
    revalidatePath(path)
  }
}

export const revalidateWhatsOnPagesOnChange: CollectionAfterChangeHook<Production> = async ({
  doc,
  req: { payload },
}) => {
  await revalidateWhatsOnPages(payload)
  return doc
}

export const revalidateWhatsOnPagesOnDelete: CollectionAfterDeleteHook<Production> = async ({
  doc,
  req: { payload },
}) => {
  await revalidateWhatsOnPages(payload)
  return doc
}

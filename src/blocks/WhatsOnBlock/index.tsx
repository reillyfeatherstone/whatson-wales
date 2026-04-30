import { Page, Production } from '@/payload-types'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import { WhatsOnClient } from '@/blocks/WhatsOnBlock/WhatsOnClient'
import { Suspense } from 'react'

type WhatsOnBlock = Extract<Page['layout'][0], { blockType: 'whatsOn' }>

/*const formatDate = (date: string, includeYear = true): string => {
  const d = new Date(date)

  const options: Intl.DateTimeFormatOptions = includeYear
  ? { day: 'numeric', month: 'long', year: 'numeric' }
  : { day: 'numeric', month: 'long' }

  return new Intl.DateTimeFormat('en-GB', options).format(d)
}*/

export default async function WhatsOnBlock({ block }: { block: WhatsOnBlock }) {
  const payload = await getPayload({ config: payloadConfig })
  const now = new Date()

  const productions = await payload.find({
    collection: 'productions',
    depth: 1,
    limit: 12,
    sort: 'dates.start',
    overrideAccess: false,
    // select: {
    //   title: true,
    //   slug: true,
    //   genre: true,
    //   language: true,
    //   description: true,
    //   image: true,
    //   link: true,
    //   dates: true,
    // },
    where: {
      'dates.end': {
        greater_than: now,
      },
    },
  })

  return (
    <Suspense>
      <WhatsOnClient productions={productions.docs} />
    </Suspense>
  )
}

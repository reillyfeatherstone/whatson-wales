import { Page } from '@/payload-types'
import payloadConfig from '@payload-config'
import { getPayload } from 'payload'

type PageTitleBlock = Extract<Page['layout'][0], { blockType: 'pageTitle' }>

export default async function PageTitleBlock({ block }: { block: PageTitleBlock }) {
  const payload = await getPayload({ config: payloadConfig })

  const productions = await payload.find({
    collection: 'productions',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
    },
  })

  return (
    <div>
      <h1 className="text-3xl">{productions.docs[0].title}</h1>
    </div>
  )
}

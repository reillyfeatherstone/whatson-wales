import PageTitleBlock from '@/blocks/PageTitleBlock'
import { Button } from '@/components/ui/button'
import type { Page } from '@/payload-types'
import payloadConfig from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload, RequiredDataFromCollectionSlug } from 'payload'
import { cache } from 'react'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ProductionPage({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise
  const productionPage = await queryProductionBySlug({ slug })

  // const decodedSlug = decodeURIComponent(slug)
  // let page: RequiredDataFromCollectionSlug<'productions'> | null

  if (!productionPage) {
    notFound()
  }

  const { title, genre, language, description, image, link, dates, runTime, credits } =
    productionPage

  return (
    <div className="">
      <div className="h-115 bg-gray-300 relative">
        <Image
          alt=""
          src={image?.url || null}
          fill
          objectFit="cover"
          sizes="(max-width: 767px) 100vw, 100vw"
        />
      </div>
      <div className="px-5">
        <h1>{title}</h1>
        <div> - writer</div>
        <div> - production company - clickable to directory</div>
        <br />
        <div>
          {dates?.start} - {dates?.end}
        </div>
        <Link href={link || ''}>
          <Button>Get Tickets</Button>
        </Link>
        <div>Quick Links</div>
        <br />
        <div>{language}</div>
        <div>{runTime}</div>
        <br />
        <div>{description}</div>
        <br />
        <div> - Venues - Check does this go first or cast?</div>
        <div> - Tour Dates</div>
        <div> - Addresses for each venue</div>
        <div> - Link to each venue</div>
        <div> - Access / Assisted Performances tickbox for each type of thing</div>
        <br />
        <div>Cast</div>
        <div>
          {credits?.cast?.map((person, index) => {
            const { name, role } = person
            return (
              <div key={index} className="">
                <div>
                  <b>{name}: </b>
                  {role}
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-5">Creative Team</div>
        <div>
          {credits?.creatives?.map((person, index) => {
            return (
              <div key={index} className="">
                <div>
                  <b>{person.name}: </b>
                  {person.role === 'Other (Specify)' ? person.otherRole : person.role}
                </div>
              </div>
            )
          })}
        </div>
        {/* <br /> */}
        {/* <div>tags</div> */}
        {/* <div>{genre} - Change this??</div> */}
      </div>
    </div>
  )
}

const queryProductionBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: payloadConfig })
  // const parsedSlug = decodeURIComponent(slug)

  const result = await payload.find({
    collection: 'productions',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

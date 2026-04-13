import PageTitleBlock from '@/blocks/PageTitleBlock'
import { Button } from '@/components/ui/button'
import type { Page } from '@/payload-types'
import payloadConfig from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload, RequiredDataFromCollectionSlug } from 'payload'
import { cache } from 'react'
import formatDate from '@/lib/formatDate'

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

  const { title, genre, language, description, image, link, dates, runTime, credits, productionCompany } =
    productionPage

  return (
    <div className="">
      <div className="h-130 bg-gray-300 relative">
        <Image
          alt=""
          src={image?.url || null}
          fill
          objectFit="cover"
          sizes="(max-width: 767px) 100vw, 100vw"
        />
      </div>
      <div className="bg-gray-200 px-15">
        <div className="section-1 mt-5 flex">
          <div className="section-1-left w-[50%]">
            <div className="text-xl font-medium">
              {productionCompany}
            </div>
            <h1 className="text-5xl font-bold mt-1">{title}</h1>
            {(() => {
              const writers = credits?.creatives?.filter(person => person.role === "Writer")
              if (!writers?.length) return null

              const names = writers.map(person => person.name)
              const formattedWriters = names.length === 1
                ? names[0]
                : names.slice(0, -1).join(', ') + ' & ' + names.at(-1)

              return<div className="font-normal pt-2 pb-5">by {formattedWriters}</div>
            })()}
            <div className="flex gap-5">
              <Link href={link || ''}>
                <Button size="lg">
                  <span className="text-[14px]">Get Tickets</span>
                </Button>
              </Link>
              {formatDate(dates?.start, true)} - {formatDate(dates?.end, true)}
            </div>
          </div>
          <div className="section-1-right w-[50%]">
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
          </div>
        </div>
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

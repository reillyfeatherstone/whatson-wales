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
import { RichText } from '@/components/RichText'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ArrowBigRight, ArrowRight, Search } from 'lucide-react'

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

  const {
    title,
    genre,
    language,
    description,
    image,
    link,
    dates,
    runTime,
    credits,
    productionCompany,
    richDescription,
  } = productionPage

  const languages = !language
    ? null
    : language.length === 1
      ? language[0]
      : language.slice(0, -1).join(', ') + ' & ' + language.at(-1)

  if (!dates || !dates.start || !dates.end) return null

  const startYear = new Date(dates.start).getFullYear()
  const endYear = new Date(dates.end).getFullYear()
  const isSameYear = startYear === endYear

  return (
    <div className="px-5 max-w-7xl mx-auto">
      <div className="feat-prod relative w-full aspect-video max-h-120 overflow-hidden">
        {(typeof image !== 'string' && image.url && (
          <Image alt="" src={image.url} fill objectFit="cover" />
        )) ||
          null}
      </div>
      <div className=" max-w-7xl mx-auto px-16 mt-12">
        <div className="section-1 flex gap-10">
          <div className="section-1-left w-160">
            <div className="text-xl font-medium">{productionCompany}</div>
            <h1 className="text-6xl font-bold mt-1">{title}</h1>
            {(() => {
              const writers = credits?.creatives?.filter((person) => person.role === 'Writer')
              if (!writers?.length) return null

              const names = writers.map((person) => person.name)
              const formattedWriters =
                names.length === 1 ? names[0] : names.slice(0, -1).join(', ') + ' & ' + names.at(-1)

              return <h2 className="font-normal text-lg pt-2">by {formattedWriters}</h2>
            })()}
            <div className="pt-12">
              {richDescription && (
                <RichText data={richDescription} className="text-lg text-muted-foreground" />
              )}
            </div>
          </div>
          <div className="ml-auto">
            <div className="section-1-right flex flex-col border p-6 gap-6 w-82.5">
              <div className="border-b py-2 flex flex-col gap-1">
                <p className="text-sm font-medium text-muted-foreground">RUNTIME</p>
                {runTime}
              </div>
              <div className="border-b py-2 flex flex-col gap-1">
                <p className="text-sm font-medium text-muted-foreground">DATES</p>
                {dates?.start && dates?.end && (
                  <span>
                    {isSameYear
                      ? formatDate(dates.start, false) + ' - '
                      : formatDate(dates.start, true) + ' - '}
                    {formatDate(dates.end, true)}
                  </span>
                )}
              </div>
              <div className="border-b py-2 flex flex-col gap-1">
                <p className="text-sm font-medium text-muted-foreground">LANGUAGES</p>
                <span>{languages}</span>
              </div>
              <div className="">
                <Link href={link || ''}>
                  <Button size="lg" className="w-full h-12">
                    <span className="text-[14px]">Get Tickets</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-24 py-1 border-b border-b-[#AFAFAF] flex gap-15 mb-12">
            <h3 className="text-3xl font-medium">Venues</h3>
            <div className="relative w-90 ml-auto">
              <Input
                className="h-9 border bg-transparent rounded-none pr-8 pl-3 font-medium text-muted-foreground"
                placeholder="Enter Postcode to find nearby"
              />
              <Search className="absolute right-2 top-1/2 size-4 -translate-y-[60%] text-muted-foreground" />
            </div>
          </div>
          <div className="venues">
            <div className="venue-item flex space-between">
              <div className="">
                <div className="flex gap-3 uppercase text-xs">
                  <span className="text-muted-foreground font-medium">Mold</span>
                  <span className="text-primary font-medium before:content-['•'] before:mr-1 before:inline-block">
                    12 Miles Away
                  </span>
                </div>
                <h4 className="text-2xl font-bold">Theatr Clwyd</h4>
                <p className="mt-2 text-sm text-muted-foreground">May 5 - May 16, 2026</p>
              </div>
              <div className="flex items-center ml-auto">
                <p className="text-sm text-primary">BOOK HERE</p>
                <ArrowRight className="text-primary" size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Another section */}
        <div className="pt-100"> - Access / Assisted Performances tickboxes</div>
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

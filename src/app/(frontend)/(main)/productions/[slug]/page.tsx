import { Button } from '@/components/ui/button'
import type { Production, Venue } from '@/payload-types'
import payloadConfig from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import formatDate from '@/features/productions/utils/formatDate'
import { RichText } from '@/components/rich-text'
import { Input } from '@/components/ui/input'
import { ArrowRight, Search } from 'lucide-react'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'productions',
    limit: 0,
  })

  return docs.map((doc) => ({
    slug: doc.slug,
  }))
}

export default async function ProductionPage({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise
  const productionPage = await queryProductionBySlug({ slug })

  if (!productionPage) {
    notFound()
  }

  const {
    title,
    language,
    image,
    link,
    dates,
    runTime,
    credits,
    productionCompany,
    richDescription,
    venues,
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
    <div className="px-5 max-w-7xl mx-auto mb-50">
      <div className="feat-prod relative w-full aspect-video max-h-120 overflow-hidden">
        {(typeof image !== 'string' && image.url && (
          <Image
            alt=""
            src={image.url}
            fill
            className="object-cover"
            loading="eager"
          />
        )) ||
          null}
      </div>
      <div className="max-w-7xl mx-auto px-5 md:px-16 mt-12">
        <div className="section-1 flex flex-col md:flex-row gap-10">
          <div className="section-1-left md:w-160">
            <div className="text-xl font-medium">{productionCompany}</div>
            <h1 className="text-5xl md:text-6xl font-bold mt-1">{title}</h1>
            {(() => {
              const writers = credits?.creatives?.filter(
                (person) => person.role === 'Writer',
              )
              if (!writers?.length) return null

              const names = writers.map((person) => person.name)
              const formattedWriters =
                names.length === 1
                  ? names[0]
                  : names.slice(0, -1).join(', ') + ' & ' + names.at(-1)

              return (
                <h2 className="font-normal text-lg pt-2">
                  by {formattedWriters}
                </h2>
              )
            })()}
            <div className="pt-12">
              {richDescription && (
                <RichText
                  data={richDescription}
                  className="text-lg text-muted-foreground"
                />
              )}
            </div>
          </div>
          <div className="w-full md:w-auto md:ml-auto">
            <div className="section-1-right flex flex-col border p-6 gap-6 w-full md:w-82.5">
              <div className="border-b py-2 flex flex-col gap-1">
                <p className="text-sm font-medium text-muted-foreground">
                  RUNTIME
                </p>
                {runTime}
              </div>
              <div className="border-b py-2 flex flex-col gap-1">
                <p className="text-sm font-medium text-muted-foreground">
                  DATES
                </p>
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
                <p className="text-sm font-medium text-muted-foreground">
                  LANGUAGES
                </p>
                <span>{languages}</span>
              </div>
              <div className="">
                <Link href={link || ''}>
                  <Button
                    size="lg"
                    className="w-full h-12 hover:cursor-pointer"
                  >
                    <span className="text-[14px]">Get Tickets</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {!!venues?.length && <Venues venues={venues} link={link} />}
        {!!credits?.cast?.length && <Cast credits={credits} />}
        {!!credits?.creatives?.length && <Creatives credits={credits} />}

        {/* <div>tags</div> */}
        {/* <div>{genre} - Change this??</div> */}
      </div>
    </div>
  )
}

export function Venues({
  venues,
  link,
}: {
  venues: Production['venues']
  link: Production['link']
}) {
  if (!venues?.length) return null

  return (
    <div className="venues">
      <div className="mt-18 md:mt-24 py-1 border-b border-b-[#AFAFAF] flex gap-15 mb-12">
        <h3 className="text-3xl font-medium">Venues</h3>
        <div className="relative w-90 ml-auto">
          <Input
            className="h-9 border bg-transparent rounded-none pr-8 pl-3 font-medium text-muted-foreground"
            placeholder="Enter Postcode to find nearby"
          />
          <Search className="absolute right-2 top-1/2 size-4 -translate-y-[60%] text-muted-foreground" />
        </div>
      </div>
      <div className="gap-2">
        {venues.map((venue, index) => {
          const venueDetails =
            typeof venue.venueName === 'object'
              ? (venue.venueName as Venue)
              : null
          const isSameYear =
            venue.StartDate && venue.EndDate
              ? new Date(venue.StartDate).getFullYear() ===
                new Date(venue.EndDate).getFullYear()
              : false

          return (
            <Link
              href={venue.ticketLink || link || ''}
              key={index}
              className="venue-item"
            >
              <div className="group flex py-5 border-b border-b-[#AFAFAF]">
                <div className="transition-transform duration-300 group-hover:translate-x-1">
                  <div className="flex gap-3 uppercase text-xs">
                    <span className="text-muted-foreground font-medium">
                      {venueDetails?.address?.venueCity}
                    </span>
                    <span className="hidden text-primary font-medium before:content-['•'] before:mr-1 before:inline-block">
                      _ Miles Away
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold">
                    {venueDetails?.venueName}
                  </h4>
                  {venue.StartDate && venue.EndDate && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {isSameYear
                        ? formatDate(venue.StartDate, false) + ' - '
                        : formatDate(venue.StartDate, true) + ' - '}
                      {formatDate(venue.EndDate, true)}
                    </p>
                  )}
                </div>
                <div className="flex items-center ml-auto transition-transform duration-300 group-hover:translate-x-1">
                  <p className="text-sm text-primary uppercase">Book Here</p>
                  <ArrowRight
                    className="text-primary transition-transform"
                    size={16}
                  />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export function Cast({ credits }: { credits: Production['credits'] }) {
  const cast = credits?.cast

  return (
    <div className="cast">
      <div className="mt-18 md:mt-24 py-1 border-b border-b-[#AFAFAF] mb-12">
        <h3 className="text-3xl font-medium">Cast</h3>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:grid-cols-4 md:gap-10">
        {cast?.map((person, index) => {
          const { name, role } = person
          return (
            <div key={index} className="py-2">
              <div>
                <p className="font-bold text-lg">{name}</p>
                <p className="text-muted-foreground text-base">{role}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Creatives({ credits }: { credits: Production['credits'] }) {
  const creatives = credits?.creatives

  return (
    <div className="creatives">
      <div className="mt-18 md:mt-24 py-1 border-b border-b-[#AFAFAF] mb-12">
        <h3 className="text-3xl font-medium">Creatives</h3>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:grid-cols-4 md:gap-10">
        {creatives?.map((person, index) => {
          const { name, role } = person
          return (
            <div key={index} className="py-2">
              <div>
                <p className="font-bold text-lg">{name}</p>
                <p className="text-muted-foreground text-base">{role}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const queryProductionBySlug = async ({ slug }: { slug: string }) => {
  'use cache'
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
}

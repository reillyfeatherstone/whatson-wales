import { Button } from '@/components/ui/button'
import { Page } from '@/payload-types'
import { MapPin, Search } from 'lucide-react'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import Image from 'next/image'
import { Production } from '@/payload-types'
import formatDate from '@/lib/formatDate'
import { Input } from '@/components/ui/input'
import { DatePickerWithRange } from '@/components/ui/range-picker'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

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
    select: {
      title: true,
      slug: true,
      genre: true,
      language: true,
      description: true,
      image: true,
      link: true,
      dates: true,
    },
    where: {
      'dates.end': {
        greater_than: now,
      },
    },
  })

  return (
    <div className="p-5 pb-100 max-w-7xl mx-auto">
      <div className="filter mt-8 mb-12 mx-auto flex flex-row flex-rows-3 gap-3 text-sm font-medium text-gray-500 border p-5">
        <div className="w-[25%]">
          <Label className="text-xs mb-1">SEARCH</Label>
          <div className="relative w-full">
            <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search productions"
              className="h-8 border-0 border-b border-b-[#AFAFAF] bg-transparent rounded-none pl-8"
            />
          </div>
        </div>
        <div className="w-[25%]">
          <Label className="text-xs mb-1">LOCATION</Label>
          <div className="relative w-full">
            <MapPin className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Postcode"
              className="h-8 border-0 border-b border-b-[#AFAFAF] bg-transparent rounded-none pl-8"
            />
          </div>
        </div>
        <div className="w-[30%]">
          <Label className="text-xs mb-1">DATE</Label>
          <DatePickerWithRange />
        </div>
        <div className="w-[20%]">
          <Label className="text-xs mb-1">LANGUAGE</Label>
          <div className="w-full h-8 border-b border-b-[#AFAFAF]">
            <Select defaultValue="all">
              <SelectTrigger className="w-full rounded-none h-10 border-0 bg-transparent">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="w-full rounded-none border-0 border-b border-b-[#AFAFAF] p-0">
                <SelectGroup className="p-0 rounded-none">
                  <SelectItem className="rounded-none" value="all">
                    All Languages
                  </SelectItem>
                  <SelectItem className="rounded-none" value="english">
                    English
                  </SelectItem>
                  <SelectItem className="rounded-none" value="welsh">
                    Welsh
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <Button variant="default" size="lg" className="hover:cursor-pointer">
            <span className="text-xs p-1 text-white font-bold">Search</span>
          </Button>
        </div>
      </div>

      <h2 className="text-4xl font-medium text-black max-w-450 mx-auto border-0 border-b border-b-[#AFAFAF] py-2">
        What's On
      </h2>

      <div className="results py-8 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {productions.docs.map((production, index) => {
          const { title, genre, language, description, image, link, id, slug, dates } = production

          const startDate = new Date(dates.start)
          const endDate = new Date(dates.end)
          const startYear = new Date(dates.start).getFullYear()
          const endYear = new Date(dates.end).getFullYear()
          const isSameYear = startYear === endYear
          const hasStarted = startDate < now

          const validImage = image && typeof image !== 'string' && image.url
          const imageUrl = validImage ? image.url : null
          const imageAlt = validImage ? image.alt : null

          return (
            <div key={id} className="border-gray-300 border-b pb-4">
              <Link href={`productions/${slug}`} className="flex flex-col h-full group">
                <figure className="w-full h-70 bg-gray-300 flex justify-center items-center relative overflow-hidden">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={imageAlt || ''}
                      fill
                      className="object-cover transition duration-400 group-hover:scale-105"
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      priority={index < 3}
                    />
                  ) : (
                    <span className="font-medium text-gray-500 text-xl">Image</span>
                  )}
                </figure>

                <div className="px-0.5 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold pt-4">{title}</h3>

                  <div className="font-medium text-sm text-gray-900 flex-1 py-1">{description}</div>

                  <div className="font-bold text-base text-gray-900 pt-4 pb-2">
                    {hasStarted
                      ? 'Until '
                      : isSameYear
                        ? formatDate(dates.start, false) + ' - '
                        : formatDate(dates.start, true) + ' - '}
                    {formatDate(dates.end, true)}
                  </div>
                  <div className="mt-auto flex justify-between items-center py-1">
                    <Button variant="default" size="lg" className="hover:cursor-pointer">
                      <span className="text-xs p-1 text-white font-bold">Find Out More</span>
                    </Button>

                    <div className="font-medium flex space-x-2">
                      <MapPin size={16} />
                      <span className="text-xs">Sherman Theatre</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

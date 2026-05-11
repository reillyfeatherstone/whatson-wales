'use client'

import { Button } from '@/components/ui/button'
import { Funnel, MapPin, Navigation, Search } from 'lucide-react'
import Image from 'next/image'
import { Production, Venue } from '@/payload-types'
import formatDate from '@/features/productions/utils/formatDate'
import { Input } from '@/components/ui/input'
import { DatePickerWithRange } from '@/features/productions/components/range-picker'
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { format } from 'date-fns'
import haversineDistance from '@/utils/haversineDistance'
import { toast } from 'sonner'
import getCoordinates from '@/features/productions/server/getCoordinates'

export function ProductionGrid({ productions }: { productions: Production[] }) {
  const now = new Date()

  const searchParams = useSearchParams()
  const filters = useMemo(() => parseFilters(searchParams), [searchParams])

  const filteredProductions = productions.filter((prod) => {
    const { q, lang, dateFrom, dateTo } = filters

    const terms = q.toLowerCase().split(/\s+/).filter(Boolean)
    const searchableText = JSON.stringify(prod).toLowerCase()
    const queryMatch =
      !q || terms.every((term) => searchableText.includes(term))

    const dateMatch = (() => {
      if (!dateFrom && !dateTo) return true
      const prodStart = prod.dates?.start ? new Date(prod.dates.start) : null
      const prodEnd = prod.dates?.end ? new Date(prod.dates.end) : null
      const rangeFrom = dateFrom ? new Date(dateFrom + 'T13:00:00') : null
      const rangeTo = dateTo ? new Date(dateTo + 'T13:00:00') : null

      if (!prodStart || !prodEnd) return false

      if (
        rangeFrom &&
        !rangeTo &&
        rangeFrom >= prodStart &&
        rangeFrom <= prodEnd
      ) {
        return true
      }

      if (rangeFrom && rangeTo && rangeFrom >= prodStart && rangeTo <= prodEnd)
        return true

      return false
    })()

    const langMatch =
      !lang ||
      lang === 'all' ||
      prod.language?.some((l) => l.toLowerCase() === lang.toLowerCase())

    return queryMatch && langMatch && dateMatch
  })

  return (
    <div className="results py-4 md:py-8 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
      {filteredProductions.map((production, index) => {
        const { title, venues, description, image, id, slug, dates } =
          production
        if (!dates || !dates.start || !dates.end) return null

        const startDate = new Date(dates.start)
        const endDate = new Date(dates.end)
        const startYear = startDate.getFullYear()
        const endYear = endDate.getFullYear()
        const isSameYear = startYear === endYear
        const hasStarted = startDate < now

        const validImage = image && typeof image !== 'string' && image.url
        const imageUrl = validImage ? image.url : null
        const imageAlt = validImage ? image.alt : null

        return (
          <div key={id} className="border-gray-300 border-b pb-4">
            <Link
              href={`productions/${slug}`}
              className="flex flex-col h-full group"
            >
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
                  <span className="font-medium text-gray-500 text-xl">
                    Image
                  </span>
                )}
              </figure>

              <div className="px-0.5 flex flex-col flex-1">
                <h3 className="text-2xl font-bold pt-4">{title}</h3>

                <div className="font-medium text-sm text-gray-900 flex-1 py-1">
                  {description}
                </div>

                <div className="font-bold text-base text-gray-900 pt-4 pb-2">
                  {hasStarted
                    ? 'Until '
                    : isSameYear
                      ? formatDate(dates.start, false) + ' - '
                      : formatDate(dates.start, true) + ' - '}
                  {formatDate(dates.end, true)}
                </div>
                <div className="mt-auto flex justify-between items-center py-1">
                  <Button
                    variant="default"
                    size="lg"
                    className="hover:cursor-pointer"
                  >
                    <span className="text-xs p-1 text-white font-bold">
                      Find Out More
                    </span>
                  </Button>

                  <div className="font-medium flex space-x-2">
                    {(() => {
                      const distances = venues
                        ?.map((v) => {
                          if (typeof v === 'string') return null

                          const venueDetails =
                            typeof v.venueName === 'object'
                              ? (v.venueName as Venue)
                              : null

                          if (
                            !filters.lat ||
                            !filters.long ||
                            !venueDetails?.address?.venueLat ||
                            !venueDetails?.address?.venueLong
                          )
                            return null
                          return haversineDistance(
                            filters.lat,
                            filters.long,
                            venueDetails.address.venueLat,
                            venueDetails.address.venueLong,
                          )
                        })
                        .filter((d): d is number => d !== null)

                      const min =
                        distances && distances.length > 0
                          ? Math.min(...distances)
                          : null
                      return min ? (
                        <>
                          <Navigation
                            size={16}
                            className="text-muted-foreground"
                          />
                          <span className="text-xs text-muted-foreground">
                            {(() => {
                              if (min < 1) {
                                return 'Nearest less than 1 mile away'
                              } else {
                                return `Nearest ${Math.round(min)} miles away`
                              }
                            })()}
                          </span>
                        </>
                      ) : null
                    })()}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

type Filters = {
  q: string
  loc: string
  dateFrom: string
  dateTo: string
  lang: string
  lat: number
  long: number
}

function parseFilters(params: URLSearchParams): Filters {
  return {
    q: params.get('q') ?? '',
    loc: params.get('loc') ?? '',
    dateFrom: params.get('dateFrom') ?? '',
    dateTo: params.get('dateTo') ?? '',
    lang: params.get('lang') ?? '',
    lat: parseFloat(params.get('lat') ?? '0') || 0,
    long: parseFloat(params.get('long') ?? '0') || 0,
  }
}

export function Filters({ onClose }: { onClose?: () => void }) {
  return (
    <Suspense fallback={<FilterUI />}>
      <FilterLogic onClose={onClose} />
    </Suspense>
  )
}

export function MobileFilters() {
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
      <SheetTrigger asChild>
        <Button size="lg" className="text-sm font-medium">
          Filters
          <Funnel size={16} className="ml-2" />
        </Button>
      </SheetTrigger>
      <SheetContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <SheetHeader>
          <SheetTitle>Filter Productions</SheetTitle>
          <SheetDescription>
            Use the options below to filter the productions.
          </SheetDescription>
        </SheetHeader>
        <Filters onClose={() => setFiltersOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}

function FilterUI({
  values,
  onChange,
  onSubmit,
}: {
  values?: Filters
  onChange?: (updater: (f: Filters) => Filters) => void
  onSubmit?: () => void
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.()
      }}
    >
      <div className="filter p-5 gap-8 text-sm font-medium text-muted-foreground flex flex-col md:gap-3 md:mt-8 md:mb-12 md:mx-auto md:flex-row md:border">
        <div className="md:w-[25%]">
          <Label className="text-sm md:text-xs mb-1">SEARCH</Label>
          <div className="relative w-full">
            <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              placeholder="Search Productions"
              className="h-8 border-0 border-b border-b-[#AFAFAF] bg-transparent rounded-none pl-8"
              value={values?.q ?? ''}
              onChange={(e) => onChange?.((f) => ({ ...f, q: e.target.value }))}
            />
          </div>
        </div>
        <div className="md:w-[25%]">
          <Label className="text-sm md:text-xs mb-1">LOCATION</Label>
          <div className="relative w-full">
            <MapPin className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="location"
              placeholder="Postcode"
              className="h-8 border-0 border-b border-b-[#AFAFAF] bg-transparent rounded-none pl-8"
              value={values?.loc ?? ''}
              onChange={(e) =>
                onChange?.((f) => ({ ...f, loc: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="md:w-[30%]">
          <Label className="text-sm md:text-xs mb-1">DATES</Label>
          <DatePickerWithRange
            value={{
              from: values?.dateFrom ? new Date(values.dateFrom) : undefined,
              to: values?.dateTo ? new Date(values.dateTo) : undefined,
            }}
            onChange={(range) =>
              onChange?.((f) => ({
                ...f,
                dateFrom: range?.from ? format(range.from, 'yyyy-MM-dd') : '',
                dateTo: range?.to ? format(range.to, 'yyyy-MM-dd') : '',
              }))
            }
          />
        </div>
        <div className="md:w-[20%]">
          <Label className="text-sm md:text-xs mb-1">LANGUAGE</Label>
          <div className="w-full h-8 border-b border-b-[#AFAFAF]">
            <Select
              defaultValue="all"
              name="lang"
              value={values?.lang ?? ''}
              onValueChange={(e) =>
                onChange?.((f) => ({ ...f, lang: e === 'all' ? '' : e }))
              }
            >
              <SelectTrigger className="w-full rounded-none h-10 border-0 bg-transparent">
                <SelectValue placeholder="All Languages" />
              </SelectTrigger>
              <SelectContent className="w-full rounded-none border-0 border-b border-b-[#AFAFAF] p-0">
                <SelectGroup className="p-0 rounded-none">
                  <SelectItem value="all" className="rounded-none">
                    All Languages
                  </SelectItem>
                  <SelectItem value="english" className="rounded-none">
                    English
                  </SelectItem>
                  <SelectItem value="welsh" className="rounded-none">
                    Welsh
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <Button
            type="submit"
            variant="default"
            size="lg"
            className="hover:cursor-pointer"
          >
            <span className="text-xs p-1 text-white font-bold">Search</span>
          </Button>
        </div>
      </div>
    </form>
  )
}

function FilterLogic({ onClose }: { onClose?: () => void }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [localFilters, setLocalFilters] = useState<Filters>(() =>
    parseFilters(searchParams),
  )

  useEffect(() => {
    setLocalFilters(parseFilters(searchParams))
  }, [searchParams])

  const handleSearch = async () => {
    const params = new URLSearchParams()
    Object.entries(localFilters).forEach(([key, value]) => {
      if (value) params.set(key, value.toString())
    })
    if (localFilters.loc) {
      const coordinates = await getCoordinates(localFilters.loc)
      if (!coordinates) {
        toast.error('Invalid postcode or something went wrong.', {
          style: { background: '#ef4444', color: 'white', border: 'none' },
        })
        params.delete('lat')
        params.delete('long')
      } else {
        params.set('lat', coordinates.lat)
        params.set('long', coordinates.long)
      }
    } else {
      params.delete('lat')
      params.delete('long')
    }
    router.push(`?${params.toString()}`, { scroll: false })
    onClose?.()
  }

  return (
    <FilterUI
      values={localFilters}
      onChange={setLocalFilters}
      onSubmit={handleSearch}
    />
  )
}

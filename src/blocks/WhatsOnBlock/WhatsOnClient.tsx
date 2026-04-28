'use client'

import { Button } from '@/components/ui/button'
import { Funnel, Key, MapPin, Search } from 'lucide-react'
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useQueryState } from 'nuqs'
import { useRouter, useSearchParams } from 'next/navigation'
import { format } from 'date-fns'

export function WhatsOnClient({ productions }: { productions: Production[] }) {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const now = new Date()

  return (
    <div className="p-5 pt-8 pb-100 max-w-7xl mx-auto">
      {/* Mobile Title & Filter */}
      <div className="md:hidden flex items-center justify-between border-b border-b-[#AFAFAF] py-2">
        <h2 className="text-2xl font-medium text-black">What's On</h2>

        <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
          <SheetTrigger asChild>
            <Button size="lg" className="text-sm font-medium">
              Filters
              <Funnel size={16} className="ml-2" />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Productions</SheetTitle>
              <SheetDescription>Use the options below to filter the productions.</SheetDescription>
            </SheetHeader>

            <Filters onClose={() => setFiltersOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filter */}
      <div className="hidden md:block">
        <Filters />
      </div>

      {/* Desktop What's On Title */}
      <h2 className="hidden md:block text-4xl font-medium text-black max-w-450 border-b border-b-[#AFAFAF] py-2">
        What's On
      </h2>

      <div className="results py-4 md:py-8 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {productions.map((production, index) => {
          const { title, genre, language, description, image, link, id, slug, dates } = production
          if (!dates || !dates.start || !dates.end) return null

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

type Filters = {
  q: string
  loc: string
  dateFrom: string
  dateTo: string
  lang: string
}

function parseFilters(params: URLSearchParams): Filters {
  return {
    q: params.get('q') ?? '',
    loc: params.get('loc') ?? '',
    dateFrom: params.get('dateFrom') ?? '',
    dateTo: params.get('dateTo') ?? '',
    lang: params.get('lang') ?? '',
  }
}

export function Filters({ onClose }: { onClose?: () => void }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [localFilters, setLocalFilters] = useState<Filters>(() => parseFilters(searchParams))

  useEffect(() => {
    setLocalFilters(parseFilters(searchParams))
  }, [searchParams])

  const handleSearch = () => {
    const params = new URLSearchParams()
    Object.entries(localFilters).forEach(([Key, value]) => {
      if (value) params.set(Key, value)
    })
    router.push(`?${params.toString()}`, { scroll: false })
    onClose?.()
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSearch()
      }}
    >
      <div className="filter p-5 gap-8 text-sm font-medium text-muted-foreground flex flex-col md:gap-3 md:mt-8 md:mb-12 md:mx-auto md:flex-row md:border">
        <div className="md:w-[25%]">
          <Label className="text-sm md:text-xs mb-1">SEARCH</Label>
          <div className="relative w-full">
            <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              type="text"
              placeholder="Search productions"
              className="h-8 border-0 border-b border-b-[#AFAFAF] bg-transparent rounded-none pl-8"
              value={localFilters.q}
              onChange={(e) => setLocalFilters((f) => ({ ...f, q: e.target.value }))}
            />
          </div>
        </div>
        <div className="md:w-[25%]">
          <Label className="text-sm md:text-xs mb-1">LOCATION</Label>
          <div className="relative w-full">
            <MapPin className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="location"
              type="text"
              placeholder="Postcode"
              className="h-8 border-0 border-b border-b-[#AFAFAF] bg-transparent rounded-none pl-8"
              value={localFilters.loc}
              onChange={(e) => setLocalFilters((f) => ({ ...f, loc: e.target.value }))}
            />
          </div>
        </div>
        <div className="md:w-[30%]">
          <Label className="text-sm md:text-xs mb-1">DATES</Label>
          <DatePickerWithRange
            onChange={(range) =>
              setLocalFilters((f) => ({
                ...f,
                dateFrom: range?.from ? format(range.from, 'dd-MM-yyyy') : '',
                dateTo: range?.to ? format(range.to, 'dd-MM-yyyy') : '',
              }))
            }
          />
          {/* value={localFilters.lang}
        onValueChange={(e) => setLocalFilters((f) => ({ ...f, lang: e === 'all' ? '' : e }))} */}
        </div>
        <div className="md:w-[20%]">
          <Label className="text-sm md:text-xs mb-1">LANGUAGE</Label>
          <div className="w-full h-8 border-b border-b-[#AFAFAF]">
            <Select
              defaultValue="all"
              name="lang"
              value={localFilters.lang}
              onValueChange={(e) => setLocalFilters((f) => ({ ...f, lang: e === 'all' ? '' : e }))}
            >
              <SelectTrigger className="w-full rounded-none h-10 border-0 bg-transparent">
                <SelectValue placeholder="Select language" />
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
            // onClick={handleSearch}
          >
            <span className="text-xs p-1 text-white font-bold">Search</span>
          </Button>
        </div>
      </div>
    </form>
  )
}

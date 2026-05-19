import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function PreviewCard({
  title,
  summary,
  image,
}: {
  title: string
  summary: string
  image: string
}) {
  return (
    <div className="group border-gray-300 border-b pb-4 w-98 hover:cursor-pointer">
      <figure className="w-full h-70 bg-gray-300 flex justify-center items-center relative overflow-hidden">
        {image !== '' ? (
          <Image
            src={image}
            alt={''}
            fill
            className="object-cover transition duration-400 group-hover:scale-105"
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          />
        ) : (
          <span className="font-medium text-gray-500 text-xl">Image</span>
        )}
      </figure>

      <div className="px-0.5 flex flex-col flex-1">
        <h3 className="text-2xl font-bold pt-4">
          {title || 'Production Title'}
        </h3>

        <div className="font-medium text-sm text-gray-900 flex-1 py-1">
          {summary}
        </div>

        <div className="font-bold text-base text-gray-900 pt-4 pb-2">
          {/* {hasStarted
            ? 'Until '
            : isSameYear
              ? formatDate(dates.start, false) + ' - '
              : formatDate(dates.start, true) + ' - '}
          {formatDate(dates.end, true)} */}
        </div>
        <div className="mt-auto flex justify-between items-center py-1">
          <Button variant="default" size="lg" className="hover:cursor-pointer">
            <span className="text-xs p-1 text-white font-bold">
              Find Out More
            </span>
          </Button>

          <div className="font-medium flex space-x-2">
            {/* {(() => {
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
                  <Navigation size={16} className="text-muted-foreground" />
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
            })()} */}
          </div>
        </div>
      </div>
    </div>
  )
}

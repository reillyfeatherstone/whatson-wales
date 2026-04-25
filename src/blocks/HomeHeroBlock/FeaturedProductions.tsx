'use client'

import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import { Production } from '@/payload-types'
import Link from 'next/link'

export function FeaturedProductions({ prods }: { prods: Production[] }) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
        Fade(),
      ]}
      className="relative"
    >
      <CarouselContent>
        {prods.map((prod) => {
          const imageUrl = typeof prod.image === 'string' ? null : (prod.image?.url ?? null)

          return (
            <CarouselItem key={prod.id}>
              <Link href={'/productions/' + prod.slug} className="block">
                <div className="feat-prod relative w-full aspect-video max-h-120 overflow-hidden">
                  <Image alt="Featured" src={imageUrl || ''} fill className="object-cover" />

                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

                  <div className="relative z-10 p-6 flex flex-col justify-end h-full text-white space-y-3">
                    <div className="w-22 h-7 border border-white flex items-center justify-center backdrop-blur-sm bg-black/30 mb-4">
                      <span className="text-xs font-semibold">FEATURED</span>
                    </div>
                    <h1 className="text-4xl font-bold">{prod.title}</h1>
                    <p className="max-w-md text-base">{prod.description}</p>
                    <div className="">
                      <Button
                        variant="default"
                        size="lg"
                        className="inline text-sm hover:cursor-pointer"
                      >
                        Find Out More
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          )
        })}
      </CarouselContent>

      {/* <CarouselPrevious /> */}
      {/* <CarouselNext /> */}
    </Carousel>
  )
}

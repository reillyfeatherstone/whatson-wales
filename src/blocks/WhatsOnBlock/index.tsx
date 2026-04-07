import { Button } from '@/components/ui/button'
import { Page } from '@/payload-types'
import { MapPin } from 'lucide-react'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import Image from 'next/image'
import { Production } from '@/payload-types'

type WhatsOnBlock = Extract<Page['layout'][0], { blockType: 'whatsOn' }>

export default async function WhatsOnBlock({ block }: { block: WhatsOnBlock }) {
  const payload = await getPayload({ config: payloadConfig })
  const productions = await payload.find({
    collection: 'productions',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      genre: true,
      language: true,
      description: true,
      image: true,
      link: true,
    },
  })

  return (
    <div className="p-5 pb-100">
      <h2 className="text-4xl font-medium text-black text-center px-20 max-w-450 mx-auto">
        What's On
      </h2>
      <div className="py-4 grid md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto">
        {productions.docs.map((production, index) => {
          const { title, genre, language, description, image, link, id, slug } = production

          const validImage = image && typeof image !== 'string' && image.url
          const imageUrl = validImage ? image.url : null
          const imageAlt = validImage ? image.alt : null

          return (
            <div key={id} className="m-2 border-gray-300 border-b pb-4">
              <a href={`productions/${slug}`} className="flex flex-col h-full">
                <figure className="w-full h-70 bg-gray-300 flex justify-center items-center relative overflow-hidden">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={imageAlt || ''}
                      fill
                      className="object-cover"
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
                    27 March — 11 October 2026
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
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

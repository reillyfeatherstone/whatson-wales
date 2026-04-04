import { Button } from '@/components/ui/button'
import { Page } from '@/payload-types'
import { MapPin } from 'lucide-react'

type WhatsOnBlock = Extract<Page['layout'][0], { blockType: 'whatsOn' }>

export default function WhatsOnBlock({ block }: { block: WhatsOnBlock }) {
  return (
    <div className="p-5 pb-100">
      <h2 className="text-4xl font-medium text-black text-center px-20 max-w-450 mx-auto">
        {block.title}
      </h2>
      <div className="py-4 grid grid-cols-3 gap-7 max-w-350 mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="m-2 border-gray-300 border-b pb-5">
            <a href="#">
              <figure className="image w-full h-70 bg-gray-300 flex justify-center items-center">
                <span className="font-medium text-gray-500 text-xl">Image</span>
              </figure>

              <div className="content px-0.5">
                <h3 className="title text-2xl font-bold pt-4">Pride</h3>
                <div className="description font-medium text-sm text-gray-900">
                  Fierce, funny and full of heart, Pride is based on the award-winning film which
                  tells the inspiring true story of two threatened communities coming together.
                </div>
                <div className="dates font-bold text-base text-gray-900">
                  11 June — 12 September 2026
                </div>
                <div className="meta mt-2 flex justify-between items-center">
                  <div>
                    <Button variant="default" size="sm">
                      <span className="text-xs text-white">Dates & Tickets</span>
                    </Button>
                  </div>

                  <div className="font-medium flex space-x-2">
                    <MapPin size={20} />
                    <span className="">Olivier Theatre</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

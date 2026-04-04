import { Page } from '@/payload-types'

type WhatsOnBlock = Extract<Page['layout'][0], { blockType: 'whatsOn' }>

export default function WhatsOnBlock({ block }: { block: WhatsOnBlock }) {
  return (
    <div className="p-5 pb-100">
      <h2 className="text-4xl font-medium text-black text-center px-20 max-w-450 mx-auto">
        {block.title}
      </h2>
      <div className="py-4 grid grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="m-2 border-gray-300 border">
            <div className="w-full h-70 bg-gray-300 flex justify-center items-center">
              <span className="font-medium text-gray-500 text-xl">Image</span>
            </div>
            <h3 className="text-2xl font-medium p-2 pt-4">Summerfolk</h3>
            <div>
              <p className="font-normal text-lg px-2 text-gray-900">
                A summer of pleasure. A storm on the horizon. Rober Hastle directs Mazim Gorky's
                razor-sharp portrait of class, privelage and denial
              </p>
            </div>
            <div className="py-5">
              <span className="font-medium p-2 text-lg text-gray-900">
                16 Mar 2026 - 28 Apr 2026
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

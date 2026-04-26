import { Button } from '@/components/ui/button'
import payloadConfig from '@/payload.config'
import Image from 'next/image'
import { getPayload } from 'payload'

export default async function Footer() {
  const payload = await getPayload({ config: payloadConfig })
  const result = await payload.findGlobal({
    slug: 'footer',
    overrideAccess: false,
  })

  const copyrightYear = new Date().getFullYear()
  const imageUrl = result.logo?.url

  return (
    <footer className="w-full">
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto h-70 flex items-center justify-between px-8">
          <div className="flex flex-col gap-4 max-w-2xl">
            <h3 className="text-white text-5xl">Are you a Producer?</h3>

            <p className="text-white font-light text-lg">
              Promote your show on WhatsOnWales and reach a dedicated audience of theatre lovers.
              Showcase your production to our growing community.
            </p>
          </div>

          {/* Right button */}
          <div className="shrink-0">
            <Button
              variant="secondary"
              className="bg-secondary text-primary text-base font-bold w-60 h-16 rounded-sm shadow-2xl"
            >
              PROMOTE YOUR SHOW
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="max-w-7xl mx-auto h-45 flex items-center justify-between px-8">
        {imageUrl && <Image src={imageUrl} alt="WhatsOnWales Logo" width={100} height={100} />}

        <div className="text-center text-sm">
          {'© ' + copyrightYear + ' ' + result.copyrightText}
        </div>

        <div className="flex gap-6 text-sm text-gray-500 font-medium">
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  )
}

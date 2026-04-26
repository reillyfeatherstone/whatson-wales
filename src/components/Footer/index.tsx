import Logo from '@/components/Logo'
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

  return (
    <footer className="w-full">
      <div className="producer-cta bg-primary">
        <div className="max-w-7xl mx-auto min-h-70 flex flex-col md:flex-row items-center md:items-center justify-between px-8 py-8 gap-6 md:gap-0">
          <div className="flex flex-col gap-4 max-w-2xl text-center md:text-left">
            <h3 className="text-white text-4xl md:text-5xl">Are you a Producer?</h3>

            <p className="text-white font-light text-lg md:pr-10">
              Promote your show on WhatsOnWales and reach a dedicated audience of theatre lovers.
              Showcase your production to our growing community.
            </p>
          </div>

          <Button
            variant="secondary"
            className="bg-secondary text-primary text-sm md:text-base font-bold w-full h-12 max-w-120 md:w-60 md:h-16 rounded-sm shadow-2xl"
          >
            PROMOTE YOUR SHOW
          </Button>
        </div>
      </div>

      <div className="bottom-footer max-w-7xl mx-auto min-h-30 flex flex-col md:flex-row items-center justify-between px-8 my-8 gap-6 md:gap-10">
        {/* {imageUrl && <Image src={imageUrl} alt="WhatsOnWales Logo" width={115} height={100} />} */}

        <Logo className="w-40 h-20 md:w-29 md:h-25" />

        <div className="text-center text-sm">
          {'© ' + copyrightYear + ' ' + result.copyrightText}
        </div>

        <div className="flex gap-4 text-center uppercase md:gap-6 text-sm text-gray-500 font-medium md:order-3">
          <a href="/terms">Terms</a>/<a href="/privacy">Privacy</a>/<a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  )
}

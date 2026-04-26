import Logo from '@/components/Logo'
// import { Button } from '@/components/ui/button'
// import Image from 'next/image'
// import Link from 'next/link'

export default function Header() {
  return (
    <div className="w-full">
      <header className="min-h-20 px-20 py-8 max-w-450 mx-auto flex items-center justify-center">
        <Logo />
        {/* <Link href="/" className="relative w-46.25 h-20">
          <Image
            src={`${process.env.S3_DOMAIN}/whatsonwales/whatsonwales-logo-light.svg`}
            alt="WhatsOnWales Logo"
            fill
            className="object-contain"
            priority
          />
        </Link> */}
        {/* <div className="ml-auto">
          <Button
            variant="default"
            size="lg"
            className="bg-[#D9A441] hover:bg-[#e4ae43] drop-shadow-sm hover:cursor-pointer"
          >
            <div className="text-base font-bold p-2">Submit</div>
          </Button>
        </div> */}
      </header>
    </div>
  )
}

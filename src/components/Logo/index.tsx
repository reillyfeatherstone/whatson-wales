import payloadConfig from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'

export default async function Logo({ className = 'w-46.25 h-20' }) {
  'use cache'
  const payload = await getPayload({ config: payloadConfig })

  const image = await payload.find({
    collection: 'media',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      filename: true,
      url: true,
    },
    where: {
      filename: {
        equals: 'whatsonwales-logo-dark.svg',
      },
    },
  })

  if (!image.docs[0]?.url) {
    return null
  } else if (image.docs[0].url) {
    return (
      <Link href="/" className={`relative ${className}`}>
        <Image
          src={image.docs[0].url}
          alt="WhatsOnWales Logo"
          fill
          className="object-contain"
          loading="eager"
          priority
        />
      </Link>
    )
  }
}

export function LogoSkeleton() {
  return <div className={'relative w-46.25 h-20 animate-pulse bg-gray-200 rounded'} />
}

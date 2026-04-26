'use server'

import payloadConfig from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import { Media } from '@/collections/Media'

export default async function Logo({ className = 'w-46.25 h-20' }) {
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
          // src="https://pub-c2f9d27478004aa2a01e68db6030715d.r2.dev/whatsonwales/whatsonwales-logo-light.svg"
          src={image.docs[0].url}
          alt="WhatsOnWales Logo"
          fill
          className="object-contain"
          priority
        />
      </Link>
    )
  }
}

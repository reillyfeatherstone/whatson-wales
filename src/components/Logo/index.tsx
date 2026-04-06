import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = async (props: Props) => {
  const payload = await getPayload({ config: configPromise })
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  const logoMedia = await payload.find({
    collection: 'media',
    where: {
      filename: {
        equals: 'whatsonwales-logo-light-1.svg',
      },
    },
  })

  return (
    <Link href="/" className="relative w-46.25 h-20">
      <Image
        src={logoMedia.docs[0].url || 'null'}
        alt="WhatsOnWales Logo"
        fill
        className="object-contain"
      />
    </Link>
  )
}

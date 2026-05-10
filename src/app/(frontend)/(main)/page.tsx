import Featured, {
  FeaturedSkeleton,
} from '@/features/productions/blocks/Featured'
import WhatsOnBlock from '@/features/productions/blocks/WhatsOnBlock'
import { Suspense } from 'react'

export default function Page() {
  return (
    <>
      <Suspense fallback={<FeaturedSkeleton />}>
        <Featured />
      </Suspense>
      <WhatsOnBlock />
    </>
  )
}

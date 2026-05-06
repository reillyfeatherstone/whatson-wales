// import PageTemplate from './[slug]/page'

import Featured, { FeaturedSkeleton } from '@/blocks/Featured'
import WhatsOnBlock from '@/blocks/WhatsOnBlock'
import { Suspense } from 'react'

// export default PageTemplate

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

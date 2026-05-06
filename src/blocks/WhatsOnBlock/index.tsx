import { Filters, MobileFilters } from '@/blocks/WhatsOnBlock/WhatsOnClient'
import { Suspense } from 'react'
import { ProductionsFetcher } from '@/blocks/WhatsOnBlock/ProductionsFetcher'

export default async function WhatsOnBlock() {
  return (
    <div className="p-5 pt-8 pb-100 max-w-7xl mx-auto">
      <div className="md:hidden flex items-center justify-between border-b border-b-[#AFAFAF] py-2">
        <h2 className="text-2xl font-medium text-black">What's On</h2>
        <MobileFilters />
      </div>

      <div className="hidden md:block">
        <Filters />
      </div>

      <h2 className="hidden md:block text-4xl font-medium text-black max-w-450 border-b border-b-[#AFAFAF] py-2">
        What's On
      </h2>

      <Suspense fallback={<ProductionGridSkeleton />}>
        <ProductionsFetcher />
      </Suspense>
    </div>
  )
}

function ProductionGridSkeleton() {
  return (
    <div className="results py-4 md:py-8 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border-gray-300 border-b pb-4 animate-pulse">
          <div className="w-full h-70 bg-gray-200" />
          <div className="h-6 bg-gray-200 mt-4 w-3/4" />
          <div className="h-4 bg-gray-100 mt-2 w-full" />
        </div>
      ))}
    </div>
  )
}

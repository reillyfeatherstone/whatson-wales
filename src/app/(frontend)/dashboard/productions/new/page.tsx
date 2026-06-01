import GetCompanies from '@/features/dashboard/server/getCompanies'
import GetVenues from '@/features/dashboard/server/getVenues'
import NewProductionForm from '@/features/productions/components/newProductionForm'

export default async function Page() {
  const companies = await GetCompanies()
  const venues = await GetVenues()

  if (!companies || !venues) {
    return ''
  }

  return (
    <div className="px-20 pt-5 max-w-7xl mx-auto">
      <NewProductionForm companies={companies} venues={venues} />
    </div>
  )
}

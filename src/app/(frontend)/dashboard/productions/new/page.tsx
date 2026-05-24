import GetCompanies from '@/features/dashboard/server/getCompanies'
import NewProductionForm from '@/features/productions/components/newProductionForm'

export default async function Page() {
  const companies = await GetCompanies()

  if (companies === undefined) {
    return ''
  }

  return (
    <div className="px-20 pt-5 max-w-7xl mx-auto">
      <NewProductionForm companies={companies} />
    </div>
  )
}

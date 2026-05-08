import { getCurrentUser } from '@/data/getUser'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback="Loading">
      <AccountContent />
    </Suspense>
  )
}

export async function AccountContent() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/account/create')
  } else if (user._verified) {
    return <div>You are verified</div>
  } else if (!user._verified) {
    return <div>You are not verified</div>
  } else {
    return <div>Something went wrong</div>
  }
}

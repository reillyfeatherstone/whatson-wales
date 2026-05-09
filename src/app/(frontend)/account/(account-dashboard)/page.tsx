import { Button } from '@/components/ui/button'
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
    redirect('/account/login')
  }

  return (
    <div>
      <p>You are verified</p>
      <Button>Log Out</Button>
    </div>
  )
}

import LogOutButton from '@/components/Buttons/logout'
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
      <p>Hello {user.firstName}!</p>
      <LogOutButton />
    </div>
  )
}

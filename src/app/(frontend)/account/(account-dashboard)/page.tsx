import LogOutButton from '@/components/auth/logoutButton'
import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/actions/auth/getCurrentUser'
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

import { getCurrentUser } from '@/features/users/server/actions/getCurrentUser'
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
    <div className="">
      {/* <p>Hello {user.firstName}!</p> */}
      {/* <LogOutButton /> */}
    </div>
  )
}

import { getCurrentUser } from '@/features/users/server/actions/getCurrentUser'
import { redirect } from 'next/navigation'
import { ForgotPasswordForm } from '@/features/users/components/forgotPasswordForm'
import { ResetPasswordForm } from '@/features/users/components/resetPasswordForm'

type SearchParams = {
  [key: string]: string
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const user = await getCurrentUser()

  if (user) {
    redirect('/account')
  }

  return (
    <div className="px-5 pt-20 pb-40 max-w-6xl mx-auto">
      <PasswordReset searchParams={searchParams} />
    </div>
  )
}

export async function PasswordReset({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { token } = await searchParams
  console.log(token)

  if (!token) {
    return <ForgotPasswordForm />
  } else {
    return <ResetPasswordForm token={token} />
  }
}

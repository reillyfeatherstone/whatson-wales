import { getCurrentUser } from '@/features/users/server/actions/getCurrentUser'
import { redirect } from 'next/navigation'
import ForgotPasswordForm from './forgotPasswordForm'

export default async function Page() {
  const user = await getCurrentUser()

  if (user) {
    redirect('/account')
  }

  return (
    <div className="px-5 pt-20 pb-40 max-w-6xl mx-auto">
      <ForgotPasswordForm />
    </div>
  )
}

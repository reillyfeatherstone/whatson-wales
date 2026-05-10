import { getCurrentUser } from '@/actions/auth/getCurrentUser'
import RegisterForm from './RegisterForm'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getCurrentUser()

  if (user) {
    redirect('/account')
  }

  return (
    <div className="px-5 pt-20 pb-40">
      <RegisterForm />
    </div>
  )
}

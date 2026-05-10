import LoginForm from '@/app/(frontend)/account/(auth)/login/LoginForm'
import { getCurrentUser } from '@/actions/auth/getCurrentUser'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getCurrentUser()

  if (user) {
    redirect('/account')
  }

  return (
    <div className="px-5 pt-20 pb-40 max-w-6xl mx-auto">
      <h1 className="text-5xl font-medium">Log in to your account</h1>
      <LoginForm />
    </div>
  )
}

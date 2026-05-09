import LoginForm from '@/app/(frontend)/account/(auth)/login/LoginForm'

export default function Loading() {
  return (
    <div className="px-5 pt-20 pb-40 max-w-6xl mx-auto">
      <h1 className="text-5xl font-medium">Log in to your account</h1>
      <LoginForm />
    </div>
  )
}

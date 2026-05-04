import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function LoginForm() {
  return (
    <div className="flex flex-col md:flex-row space-x-10 lg:space-x-20 w-full py-15 space-y-10">
      <div className="login w-full md:w-[50%]">
        <form className="flex flex-col space-y-4">
          <h2 className="text-2xl font-medium">Login Information</h2>
          <div>
            <p className="text-lg font-bold mb-1">Email Address</p>
            <Input
              type="email"
              name="email"
              placeholder="e.g. your.name@example.com"
              className="h-10 border-[#AFAFAF] bg-transparent rounded-none"
              style={{ fontSize: '14px' }}
            />
          </div>
          <div>
            <p className="text-lg font-bold mb-1">Password</p>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              className="h-10 border-[#AFAFAF] bg-transparent rounded-none"
              style={{ fontSize: '14px' }}
            />
          </div>
          <Button variant="default" size="xl" className="md:self-start hover:cursor-pointer">
            Login
          </Button>
          <Link href="#" className="hover:underline underline-offset-5 font-base text-primary">
            Forgot Password?
          </Link>
        </form>
      </div>
      <div className="hidden md:block w-px bg-[#AFAFAF] self-stretch" />
      <div className="register-cta w-full md:w-[50%]">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold">Not Registered Yet?</h2>
          <p>Click below to register for a new account and promote your upcoming productions.</p>
          <Link href="/account/create" className="self-start">
            <Button variant="default" size="xl" className="self-start hover:cursor-pointer">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

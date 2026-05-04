import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'

export default function RegisterForm() {
  return (
    <form className="flex flex-col space-y-4 pt-10 max-w-2xl mx-auto">
      <h1 className="text-5xl font-medium mb-10">Register for an account</h1>
      <div className="flex flex-col sm:flex-row space-x-4 space-y-4">
        <div className="w-full sm:w-[50%]">
          <p className="text-lg font-bold mb-1">First Name</p>
          <Input
            type="text"
            name="firstname"
            placeholder="Richard"
            className="h-10 border-[#AFAFAF] bg-transparent rounded-none"
            style={{ fontSize: '14px' }}
          />
        </div>
        <div className="w-full sm:w-[50%]">
          <p className="text-lg font-bold mb-1">Last Name</p>
          <Input
            type="text"
            name="lastname"
            placeholder="Burton"
            className="h-10 border-[#AFAFAF] bg-transparent rounded-none"
            style={{ fontSize: '14px' }}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row space-x-4 space-y-4">
        <div className="w-full sm:w-[50%]">
          <p className="text-lg font-bold mb-1">Email Address</p>
          <Input
            type="email"
            name="email"
            placeholder="e.g. richard.burton@example.com"
            className="h-10 border-[#AFAFAF] bg-transparent rounded-none"
            style={{ fontSize: '14px' }}
          />
        </div>
        <div className="w-full sm:w-[50%]">
          <p className="text-lg font-bold mb-1">Phone Number</p>
          <Input
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            className="h-10 border-[#AFAFAF] bg-transparent rounded-none"
            style={{ fontSize: '14px' }}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row space-x-4 space-y-4">
        <div className="w-full sm:w-[50%]">
          <p className="text-lg font-bold mb-1">Password</p>
          <Input
            type="password"
            name="password"
            placeholder="Enter password"
            className="h-10 border-[#AFAFAF] bg-transparent rounded-none"
            style={{ fontSize: '14px' }}
          />
        </div>
        <div className="w-full sm:w-[50%]">
          <p className="text-lg font-bold mb-1">Confirm Password</p>
          <Input
            type="password"
            name="password"
            placeholder="Re-enter password"
            className="h-10 border-[#AFAFAF] bg-transparent rounded-none"
            style={{ fontSize: '14px' }}
          />
        </div>
      </div>
      <Button variant="default" size="xl" className="mt-3 hover:cursor-pointer">
        Create Account
      </Button>
      <div className="mt-5 text-center text-muted-foreground">
        Already have an account?
        <Link
          href="/account/login"
          className="ml-2 text-primary font-medium hover:underline underline-offset-2"
        >
          Log In
        </Link>
      </div>
    </form>
  )
}

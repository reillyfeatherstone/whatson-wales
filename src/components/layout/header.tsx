import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import { DropdownMenuIcons } from '@/components/ui/dropdown-menu-icons'
import Link from 'next/link'
import { Suspense } from 'react'
import { MdAccountCircle } from 'react-icons/md'

export default function Header() {
  return (
    <div className="w-full">
      <header className="min-h-20 px-5 py-8 max-w-7xl mx-auto flex items-center">
        <div className="flex-1 space-x-10 items-center self-center">
          <Link
            href="/"
            className="font-medium text-base object-center hover:cursor-pointer hover:underline underline-offset-2"
          >
            Home
          </Link>
          <Link
            href="#"
            className="font-medium text-base object-center hover:cursor-pointer hover:underline underline-offset-2"
          >
            Productions
          </Link>
          <Link
            href="#"
            className="font-medium text-base object-center hover:cursor-pointer hover:underline underline-offset-2"
          >
            Venues
          </Link>
        </div>
        <Logo theme="light" />
        <div className="flex-1 flex justify-end self-center">
          <div className="flex space-x-5 items-center">
            {/* <div className="ml-5 hover:cursor-pointer">
              <DropdownMenuIcons />
            </div> */}
            <Link href="/account/login">
              <Button
                variant="outline"
                size="xl"
                className="border-primary text-primary hover:cursor-pointer hover:text-primary"
              >
                Log In
              </Button>
            </Link>
            <Link href="/account/create">
              <Button size="xl" className="hover:cursor-pointer">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
}

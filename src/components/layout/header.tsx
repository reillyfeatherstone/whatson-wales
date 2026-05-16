'use client'

import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { MenuIcon, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const NavItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Productions',
    href: '#',
  },
  {
    name: 'Venues',
    href: '#',
  },
]

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="w-full">
      <header className="min-h-20 px-5 py-8 max-w-7xl mx-auto flex items-center">
        <div className="hidden md:block flex-1 md:space-x-5 lg:space-x-10 xl:space-x-15 items-center self-center">
          {NavItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="font-medium text-sm lg:text-base object-center hover:cursor-pointer hover:underline underline-offset-2"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Logo
          theme="light"
          className="min-w-46.25 w-46.25 min-h-20 h-20 flex mx-auto"
        />
        <div className="hidden md:flex flex-1 justify-end self-center">
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

        <Drawer direction="top" open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger
            className="absolute right-7.5 top-14 md:hidden hover:cursor-pointer"
            asChild
          >
            <MenuIcon size={32} />
          </DrawerTrigger>
          <DrawerContent className="rounded-none w-full">
            <DrawerHeader className="flex flex-row justify-between">
              <DrawerTitle className="text-lg font-medium">Menu</DrawerTitle>
              <DrawerClose className="hover:cursor-pointer" asChild>
                <X />
              </DrawerClose>
            </DrawerHeader>
            <div className="flex flex-col gap-6 mt-3 mx-10 pb-10">
              {NavItems.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="font-semibold text-xl h-10 content-center text-center hover:cursor-pointer w-full"
                  onClick={() => setDrawerOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <DrawerFooter className="">
              <div className="flex flex-col space-y-5 items-center">
                <Link href="/account/login" className="w-full">
                  <Button
                    variant="outline"
                    size="xl"
                    className="border-primary text-primary hover:cursor-pointer hover:text-primary w-full"
                    onClick={() => setDrawerOpen(false)}
                  >
                    Log In
                  </Button>
                </Link>
                <Link href="/account/create" className="w-full">
                  <Button
                    size="xl"
                    className="border-primary hover:cursor-pointer w-full"
                    onClick={() => setDrawerOpen(false)}
                  >
                    Register
                  </Button>
                </Link>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </header>
    </div>
  )
}

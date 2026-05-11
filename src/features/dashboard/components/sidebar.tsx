'use client'

import Link from 'next/link'
import {
  DramaIcon,
  HouseIcon,
  LandmarkIcon,
  LogOutIcon,
  SettingsIcon,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils/cn'
import { ReactElement } from 'react'
import LogOutButton from '@/features/users/components/logoutButton'
import { logoutAction } from '@/features/users/server/actions/logout'
import { Button } from '@/components/ui/button'

const NavItems = (): SideNavItem[] => {
  const pathname = usePathname()

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.includes(nav)
  }

  return [
    {
      name: 'Home',
      href: '/account',
      icon: (
        <HouseIcon className="mr-3 items-center text-foreground" size={20} />
      ),
      active: pathname === '/account',
      position: 'top',
    },
    {
      name: 'Productions',
      href: '/account/productions',
      icon: (
        <DramaIcon className="mr-3 items-center text-foreground" size={20} />
      ),
      active: isNavItemActive(pathname, '/account/productions'),
      position: 'top',
    },
    {
      name: 'Companies',
      href: '/account/companies',
      icon: (
        <LandmarkIcon className="mr-3 items-center text-foreground" size={20} />
      ),
      active: isNavItemActive(pathname, '/account/companies'),
      position: 'top',
    },
    {
      name: 'Settings',
      href: '/account/settings',
      icon: (
        <SettingsIcon className="mr-3 items-center text-foreground" size={20} />
      ),
      active: isNavItemActive(pathname, '/account/settings'),
      position: 'bottom',
    },
    {
      name: 'Log Out',
      onClick: () => logoutAction(),
      icon: (
        <LogOutIcon className="mr-3 items-center text-foreground" size={20} />
      ),
      active: false,
      position: 'bottom',
    },
  ]
}

type SideNavItem = {
  name: string
  icon: ReactElement
  active: boolean
  position: string
} & (
  | {
      href: string
      onClick?: never
    }
  | {
      onClick: () => void
      href?: never
    }
)

function SideNavItem({ name, icon, href, active, onClick }: SideNavItem) {
  if (onClick) {
    return (
      <div className="mx-5">
        <button
          onClick={onClick}
          className="p-3 w-full rounded-sm flex shrink-0 items-center text-xs/relaxed font-medium disabled:opacity-50 text-foreground hover:bg-accent hover:cursor-pointer"
        >
          {icon}
          {name}
        </button>
      </div>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        'mx-5 p-3 rounded-sm flex shrink-0 items-center text-xs/relaxed font-medium disabled:opacity-50 text-foreground hover:bg-accent',
        active && 'bg-accent',
      )}
    >
      {icon}
      {name}
    </Link>
  )
}

export default function DashboardSidebar() {
  const navItems = NavItems()

  return (
    <div className="sidebar w-70 flex flex-col justify-between border-0 border-r border-muted-foreground/20">
      <div className="sidebar-top flex flex-col space-y-2 py-10">
        {navItems.map((item, i) => {
          if (item.position === 'top') {
            return (
              <div key={i} className="w-full">
                <SideNavItem {...item} />
              </div>
            )
          }
        })}
      </div>
      <div className="sidebar-bottom flex flex-col space-y-3 py-5">
        {navItems.map((item, i) => {
          if (item.position === 'bottom') {
            return (
              <div key={i} className="w-full">
                <SideNavItem {...item} />
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { logoutAction } from '@/features/users/server/actions/logout'
import { cn } from '@/utils/cn'
import {
  ArchiveIcon,
  ChevronRight,
  CirclePlusIcon,
  DramaIcon,
  HouseIcon,
  LandmarkIcon,
  LogOutIcon,
  SettingsIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactElement } from 'react'

const NavItems = (): SideNavItem[] => {
  const pathname = usePathname()

  function isNavItemActive(pathname: string, nav: string) {
    return pathname === nav
  }

  return [
    {
      name: 'Home',
      href: '/dashboard',
      icon: (
        <HouseIcon className="mr-3 items-center text-foreground" size={20} />
      ),
      active: pathname === '/dashboard',
      position: 'top',
    },
    {
      name: 'Productions',
      icon: (
        <DramaIcon className="mr-3 items-center text-foreground" size={20} />
      ),
      active: isNavItemActive(pathname, '/dashboard/productions'),
      position: 'top',
      children: [
        {
          name: 'Add Production',
          href: '/dashboard/productions/new',
          icon: (
            <CirclePlusIcon
              className="mr-1 items-center text-foreground"
              size={20}
            />
          ),
          active: isNavItemActive(pathname, '/dashboard/productions/new'),
          position: 'child',
        },
        {
          name: 'View Productions',
          href: '/dashboard/productions',
          icon: (
            <ArchiveIcon
              className="mr-1 items-center text-foreground"
              size={20}
            />
          ),
          active: isNavItemActive(pathname, '/dashboard/productions'),
          position: 'child',
        },
      ],
    },
    {
      name: 'Companies',
      href: '/dashboard/companies',
      icon: (
        <LandmarkIcon className="mr-3 items-center text-foreground" size={20} />
      ),
      active: isNavItemActive(pathname, '/dashboard/companies'),
      position: 'top',
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: (
        <SettingsIcon className="mr-3 items-center text-foreground" size={20} />
      ),
      active: isNavItemActive(pathname, '/dashboard/settings'),
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
  icon?: ReactElement
  active: boolean
  position: string
  children?: SideNavItem[]
} & (
  | {
      href?: string
      onClick?: never
    }
  | {
      onClick?: () => void
      href?: never
    }
)

function SideNavItem({ name, icon, href, active, onClick }: SideNavItem) {
  if (onClick) {
    return (
      <SidebarMenuButton className="h-10 w-full" asChild>
        <button
          onClick={onClick}
          className="p-3 w-full rounded-sm flex shrink-0 items-center text-xs/relaxed font-medium disabled:opacity-50 text-foreground hover:bg-accent hover:cursor-pointer"
        >
          {icon}
          {name}
        </button>
      </SidebarMenuButton>
    )
  }

  return (
    <SidebarMenuButton className="h-10 w-full" asChild>
      <Link
        href={href || ''}
        className={cn(
          'p-3 rounded-sm flex shrink-0 items-center text-xs/relaxed! font-medium disabled:opacity-50 text-foreground hover:bg-accent',
          active && 'bg-accent',
        )}
      >
        {icon}
        {name}
      </Link>
    </SidebarMenuButton>
  )
}

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const navItems = NavItems()

  return (
    <Sidebar
      collapsible="icon"
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <SettingsIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="mt-5">
          <SidebarMenu>
            {navItems.map((item, i) => {
              if (item.position === 'top') {
                if (item.children) {
                  return (
                    <Collapsible
                      key={i}
                      defaultOpen={false}
                      className="group/collapsible "
                    >
                      <SidebarMenuItem className="w-full">
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="h-10 w-full flex items-center p-3 rounded-sm shrink-0 text-xs/relaxed font-medium disabled:opacity-50 text-foreground hover:bg-accent hover:cursor-pointer">
                            {item.icon}
                            <span className="text-xs/relaxed font-medium text-foreground">
                              {item.name}
                            </span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mr-1">
                          {item.children.map((item, i) => {
                            return (
                              <SidebarMenuSub key={i} className="w-full">
                                <SideNavItem {...item} />
                              </SidebarMenuSub>
                            )
                          })}
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                }
                return (
                  <SidebarMenuItem key={i} className="w-full">
                    <SideNavItem {...item} />
                  </SidebarMenuItem>
                )
              }
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="">
          <div className="mb-2">
            {navItems.map((item, i) => {
              if (item.position === 'bottom') {
                return (
                  <SidebarMenuItem key={i} className="w-full">
                    <SideNavItem {...item} />
                  </SidebarMenuItem>
                )
              }
            })}
          </div>
          <SidebarTrigger className="w-8 h-8 ml-auto" size="lg" />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

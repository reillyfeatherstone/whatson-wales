import { ReactNode } from 'react'
import '@/app/(frontend)/globals.css'
import DashboardSidebar from '@/features/dashboard/components/sidebar'
import DashboardHeader from '@/features/dashboard/components/dashboardHeader'

interface LayoutProps {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardHeader />
      <main className="flex">
        <DashboardSidebar />
        <div className="w-full overflow-x-auto bg-accent">
          <div className="h-[calc(100vh-75px)] md:h-[calc(100vh-101px)] overflow-y-auto">
            <div className="p-5">{children}</div>
          </div>
        </div>
      </main>
    </div>
  )
}

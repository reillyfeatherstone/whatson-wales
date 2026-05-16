import { ReactNode } from 'react'
import '@/app/(frontend)/globals.css'
import { DashboardSidebar } from '@/features/dashboard/components/dashboardSidebar'
import DashboardHeader from '@/features/dashboard/components/dashboardHeader'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

interface LayoutProps {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className="[--header-height:calc(--spacing(25))]">
      <SidebarProvider className="flex flex-col">
        <DashboardHeader />
        <main className="flex flex-1">
          <DashboardSidebar />
          <SidebarInset>
            <div className="p-5">{children}</div>
          </SidebarInset>
        </main>
      </SidebarProvider>
    </div>
  )
}

// export default async function Layout({ children }: LayoutProps) {
//   return (
//     <div className="flex flex-1 flex-col h-screen overflow-hidden">
//       <DashboardHeader />
//       <main className="flex flex-1 overflow-hidden">
//         <DashboardSidebar />
//         <div className="flex-1 overflow-y-auto bg-accent">
//           <div className="p-5">{children}</div>
//         </div>
//       </main>
//     </div>
//   )
// }

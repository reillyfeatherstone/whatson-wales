import { ReactNode } from 'react'
import '@/app/(frontend)/globals.css'
import { DashboardSidebar } from '@/features/dashboard/components/dashboardSidebar'
import DashboardHeader from '@/features/dashboard/components/dashboardHeader'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'

interface LayoutProps {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className="[--header-height:calc(--spacing(20))] h-screen overflow-hidden">
      <SidebarProvider className="flex flex-col h-full">
        <DashboardHeader />
        <main className="flex flex-1 min-h-0 overflow-hidden">
          <DashboardSidebar />
          <SidebarInset className="flex-1 min-w-0 overflow-hidden">
            <div className="p-5 h-full overflow-auto">{children}</div>
          </SidebarInset>
          <Toaster richColors />
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

import { ReactNode, Suspense } from 'react'
import '../globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import DashboardHeader from '@/features/dashboard/components/dashboardHeader'

interface LayoutProps {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  return <div className="flex flex-col h-screen">{children}</div>
}

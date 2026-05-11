import { ReactNode } from 'react'
import '../../globals.css'
import { Toaster } from '@/components/ui/sonner'
import Header from '@/components/layout/header'

interface LayoutProps {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Toaster />
    </div>
  )
}

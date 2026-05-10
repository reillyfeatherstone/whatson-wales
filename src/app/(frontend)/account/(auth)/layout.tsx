import { ReactNode } from 'react'
import '../../globals.css'
import { Toaster } from '@/components/ui/sonner'

interface LayoutProps {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <div>
      {children}
      <Toaster />
    </div>
  )
}

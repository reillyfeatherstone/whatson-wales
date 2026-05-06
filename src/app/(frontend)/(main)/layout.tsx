import { ReactNode, Suspense } from 'react'
import '../globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/sonner'

interface LayoutProps {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Toaster />
      <Suspense>
        <Footer />
      </Suspense>
    </>
  )
}

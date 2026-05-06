import { ReactNode, Suspense } from 'react'
import '../globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  description: 'The Home for Theatre in Wales.',
  title: 'Theatre shows | WhatsOnWales',
}

interface LayoutProps {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  )
}

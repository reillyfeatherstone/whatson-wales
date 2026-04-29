import React, { ReactNode } from 'react'
import './globals.css'
import Header from '@/components/Header'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  description: 'The Home for Theatre in Wales.',
  title: 'Theatre shows | WhatsOnWales',
}

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="">
        <Header />
        <main>{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  )
}

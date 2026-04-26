import React, { ReactNode } from 'react'
import './globals.css'
import Header from '@/components/Header'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'

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
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

import React from 'react'
import './globals.css'
import { Header } from '@/components/Header'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}

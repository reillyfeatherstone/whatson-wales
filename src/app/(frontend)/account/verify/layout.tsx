import { ReactNode } from 'react'
import '../../globals.css'

interface LayoutProps {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className="">
      <main>{children}</main>
    </div>
  )
}

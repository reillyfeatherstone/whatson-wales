import { Logo } from '@/components/Logo'

export async function Header() {
  return (
    <div className="w-full">
      <header className="px-20 max-w-450 mx-auto -mb-20 min-h-20 flex items-center">
        <Logo />
      </header>
    </div>
  )
}

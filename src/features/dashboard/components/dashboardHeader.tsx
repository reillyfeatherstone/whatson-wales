import Logo from '@/components/logo'
import { Avatar } from '@/components/ui/avatar'

export default function DashboardHeader() {
  return (
    <div className="sticky top-0 z-50 w-full border-0 border-b border-muted-foreground/20 bg-background">
      <header className="h-20 max px-10 py-5 max-w-8xl mx-auto flex items-center">
        <Logo theme="light" className="h-12" />
        <div className="flex-1 flex justify-end self-center">
          <div className="flex space-x-5 items-center">
            {/* <div className="ml-5 hover:cursor-pointer">
              <DropdownMenuIcons />
              </div> */}
            <Avatar className="items-center justify-center text-sm bg-gray-500 text-white">
              RF
            </Avatar>
          </div>
        </div>
      </header>
    </div>
  )
}

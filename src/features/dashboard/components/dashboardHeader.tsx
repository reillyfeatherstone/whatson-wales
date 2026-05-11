import Logo from '@/components/logo'
import { Avatar } from '@/components/ui/avatar'

export default function DashboardHeader() {
  return (
    <div className="w-full border-0 border-b border-muted-foreground/20">
      <header className="h-25 max px-10 py-5 max-w-8xl mx-auto flex items-center">
        <Logo theme="light" className="h-15" />
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

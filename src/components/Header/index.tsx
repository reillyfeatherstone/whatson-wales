import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'

export async function Header() {
  return (
    <div className="w-full">
      <header className="-mb-30 min-h-20 px-20 py-5 max-w-450 mx-auto flex items-center justify-center">
        <Logo />
        {/* <div className="ml-auto">
          <Button
            variant="default"
            size="lg"
            className="bg-[#D9A441] hover:bg-[#e4ae43] drop-shadow-sm hover:cursor-pointer"
          >
            <div className="text-base font-bold p-2">Submit</div>
          </Button>
        </div> */}
      </header>
    </div>
  )
}

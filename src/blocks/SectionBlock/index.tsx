import { Page } from '@/payload-types'

export default function HomeHeroBlock({ block }: { block: Page['layout'][0] }) {
  return (
    <div
      style={{
        backgroundColor: '#' + block.backgroundColour || 'null',
        minHeight: block.height || 'null',
      }}
      className="flex items-center justify-center"
    >
      <h1 className="text-7xl text-white text-center">{block.heading}</h1>
    </div>
  )
}

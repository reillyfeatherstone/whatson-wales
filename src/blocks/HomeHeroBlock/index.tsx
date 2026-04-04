import { Page } from '@/payload-types'

type HomeHeroBlock = Extract<Page['layout'][0], { blockType: 'section' }>

export default function HomeHeroBlock({ block }: { block: HomeHeroBlock }) {
  return (
    <div
      style={{
        backgroundColor: '#' + block.backgroundColour || 'null',
        minHeight: block.height || 'null',
      }}
      className="flex items-center justify-center"
    >
      <h1 className="text-7xl text-white text-center px-20 max-w-450 mx-auto -mb-10">
        {block.heading}
      </h1>
    </div>
  )
}

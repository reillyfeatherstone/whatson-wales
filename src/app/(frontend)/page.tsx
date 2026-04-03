// import { headers as getHeaders } from 'next/headers.js'
// import { getPayload } from 'payload'

// import config from '@/payload.config'

// export default async function HomePage() {
//   const headers = await getHeaders()
//   const payloadConfig = await config
//   const payload = await getPayload({ config: payloadConfig })
//   const { user } = await payload.auth({ headers })

//   const { docs: pages } = await payload.find({
//     collection: 'pages',
//     where: {
//       pageType: { equals: 'Home' },
//       active: { equals: true },
//     },
//   })

//   if (!pages) {
//     return <div>Page not found</div>
//   }

//   if (pages.length > 1) {
//     return <div>Multiple home pages found</div>
//   }

//   const page = pages[0]

//   return <div>{page.title}</div>
// }

import PageTemplate from './[slug]/page'

export default PageTemplate

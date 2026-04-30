// import type { SanitizedConfig } from 'payload'

// import payload from 'payload'

// export const script = async (config: SanitizedConfig) => {
//   await payload.init({ config })

//   // admin user
//   await payload.create({
//     collection: 'users',
//     data: {
//       email: 'admin@example.com',
//       password: 'password',
//     },
//   })

//   // Home Page
//   await payload.create({
//     collection: 'pages',
//     data: {
//       title: 'Home',
//       active: true,
//       layout: [
//         {
//           blockType: 'section',
//           blockName: 'Hero',
//           height: 400,
//           backgroundColour: '1F6B4E',
//           heading: 'The Home for Theatre in Wales',
//         },
//         {
//           blockType: 'whatsOn',
//           blockName: 'Whats On',
//         },
//       ],
//       slug: 'home',
//     },
//   })

//   // Shows
//   await payload.create({
//     collection: 'productions',
//     data: {
//       title: 'Romeo and Juliet',
//       slug: 'romeo-and-juliet',
//       genre: ['Drama'],
//       language: ['English'],
//       image: null,
//       link: 'https://example.com/romeo-and-juliet',
//       description:
//         'Verona is alive with heat, conflict, and desire. Young hearts burn fast, families feud fiercely, and love dares to bloom in dangerous places - where every moment feels urgent, electric, and impossible.',
//     },
//   })

//   await payload.create({
//     collection: 'productions',
//     data: {
//       title: 'Under Milk Wood',
//       slug: 'under-milk-wood',
//       genre: ['Drama'],
//       language: ['Welsh'],
//       image: null,
//       link: 'https://example.com/under-milk-wood/',
//       description:
//         'A small Welsh seaside town dreams, remembers, and reveals its secrets over one day. Lyrical, funny, and tender, it captures the beauty and strangeness of ordinary lives.',
//     },
//   })

//   await payload.create({
//     collection: 'productions',
//     data: {
//       title: "Crazy Gary's Mobile Disco",
//       slug: 'crazy-garys-mobile-disco',
//       genre: ['Drama'],
//       language: ['English'],
//       image: null,
//       link: 'https://example.com/crazy-garys-mobile-disco/',
//       description:
//         'Saturday night in small-town Wales; one pub, one party, and three lads desperate to escape who they are. Funny, brutal, and painfully real, where reputation is everything and growing up hits hard.',
//     },
//   })

//   await payload.create({
//     collection: 'productions',
//     data: {
//       title: 'The Women of Llanrumney',
//       slug: 'the-women-of-llanrumney',
//       genre: ['Drama'],
//       language: ['English'],
//       image: null,
//       link: 'https://example.com/the-women-of-llanrumney/',
//       description:
//         'Bound by a Welsh-owned plantation in 18th-century Jamaica, enslaved women and plantation owners navigate survival, power, and fear as long-buried truths and tensions rise to the surface.',
//     },
//   })

//   payload.logger.info('Successfully seeded!')
//   process.exit(0)
// }

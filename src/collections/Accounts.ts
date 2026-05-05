import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const Accounts: CollectionConfig = {
  slug: 'accounts',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: anyone,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  auth: {
    tokenExpiration: 24 * 60 * 60, // 24 Hours
    verify: {
      generateEmailSubject: (args) => {
        return `Hey${args.user.firstName ? ' ' + args.user.firstName : ''}, verify your email!`
      },
      generateEmailHTML: (args) => {
        return `<div><h1>Hey ${args.user.firstName ? args.user.firstName : ''}</h1><br /><p>Verify your email address by going to ${process.env.DOMAIN_URL}/verify?token=${args.token}</p></div>`
      },
    },
    cookies: {
      secure: true, //Allow only secure connections
      sameSite: 'None',
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
        },
        {
          name: 'lastName',
          type: 'text',
        },
      ],
    },
    {
      name: 'memberGroup',
      type: 'radio',
      interfaceName: 'groupProps',
      options: [
        'Basic',
        // Basic can:
        // Purchase tickets
        'Producer',
        // Producer can:
        // Same as basic
        // Create & manage production listings
        // Create & manage a user profile
        // Create & manage theatre company profiles
      ],
    },
  ],
}

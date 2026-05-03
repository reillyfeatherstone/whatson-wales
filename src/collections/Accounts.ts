import type { CollectionConfig } from 'payload'

export const Accounts: CollectionConfig = {
  slug: 'accounts',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true,
    read: () => false,
    update: () => false,
    delete: () => false,
    admin: () => false,
  },
  auth: {
    tokenExpiration: 24 * 60 * 60, // 24 Hours
    verify: true,
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

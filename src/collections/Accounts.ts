import type { CollectionConfig } from 'payload'
import { anyone } from '@/collections/access/anyone'
import { authenticated } from '@/collections/access/authenticated'
import {
  generateEmailSubject,
  generateEmailHTML,
} from '@/features/users/email/verificationEmail'

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
      generateEmailSubject,
      generateEmailHTML,
    },
    cookies: {
      secure: true, //Allow only secure connections
      sameSite: 'None',
      domain: process.env.COOKIE_DOMAIN,
    },
    // maxLoginAttempts: 5,
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

import { GlobalConfig } from 'payload'
import { anyone } from '@/collections/access/anyone'
import { authenticated } from '@/collections/access/authenticated'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'logo',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'producerCTA',
      label: 'Display Producer Call to Action?',
      type: 'checkbox',
    },
    {
      name: 'copyrightText',
      type: 'text',
    },
  ],
}

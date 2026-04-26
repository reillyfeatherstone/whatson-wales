import { GlobalConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

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

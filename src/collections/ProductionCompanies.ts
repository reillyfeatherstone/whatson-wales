import { anyone } from '@/collections/access/anyone'
import { authenticated } from '@/collections/access/authenticated'
import type { CollectionConfig } from 'payload'

export const ProductionCompanies: CollectionConfig = {
  slug: 'productionCompanies',
  admin: {
    useAsTitle: 'productionCompany',
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: () => false,
  },
  fields: [
    {
      name: 'productionCompany',
      type: 'text',
    },
    {
      name: 'members',
      type: 'array',
      fields: [
        {
          name: 'account',
          type: 'relationship',
          relationTo: 'accounts',
        },
        {
          name: 'role',
          type: 'radio',
          interfaceName: 'roleProps',
          options: ['owner', 'admin', 'editor'],
        },
      ],
    },
  ],
}

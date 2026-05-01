import type { CollectionConfig } from 'payload'

export const ProductionCompanies: CollectionConfig = {
  slug: 'productionCompanies',
  admin: {
    useAsTitle: 'productionCompany',
  },
  fields: [
    {
      name: 'productionCompany',
      type: 'text',
    },
    {
      name: 'members',
      type: 'group',
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

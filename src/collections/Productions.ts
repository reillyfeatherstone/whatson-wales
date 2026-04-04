import type { CollectionConfig } from 'payload'

export const Productions: CollectionConfig = {
  slug: 'productions',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'genre',
      type: 'select',
      defaultValue: 'Theatre',
      hasMany: true,
      options: ['Drama', 'Comedy', 'Musical', 'Dance'],
    },
    {
      name: 'language',
      type: 'select',
      hasMany: true,
      options: ['English', 'Welsh'],
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'link',
      type: 'text',
    },
    // {
    //   name: 'productionCompany',
    //   type: 'relationship',
    //   relationTo: 'productionCompanies'
    // }
  ],
}

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { revalidatePage } from '@/collections/hooks/revalidatePage'
import {
  revalidateWhatsOnPagesOnChange,
  revalidateWhatsOnPagesOnDelete,
} from '@/collections/hooks/revalidateProduction'
import type { CollectionConfig } from 'payload'

export const Productions: CollectionConfig = {
  slug: 'productions',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'genre',
      type: 'select',
      defaultValue: 'Drama',
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
  hooks: {
    afterChange: [revalidateWhatsOnPagesOnChange],
    afterDelete: [revalidateWhatsOnPagesOnDelete],
  },
}

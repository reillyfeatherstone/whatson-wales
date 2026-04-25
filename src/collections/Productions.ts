import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { revalidatePage } from '@/collections/hooks/revalidatePage'
import {
  revalidateWhatsOnPagesOnChange,
  revalidateWhatsOnPagesOnDelete,
} from '@/collections/hooks/revalidateProduction'
import { slugField, type CollectionConfig } from 'payload'

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
      name: 'dates',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'start',
              type: 'date',
              admin: {
                date: {
                  displayFormat: 'dd/MM/yyyy',
                },
              },
            },
            {
              name: 'end',
              type: 'date',
              admin: {
                date: {
                  displayFormat: 'dd/MM/yyyy',
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: 'productionCompany',
      type: 'text',
    },
    {
      name: 'runTime',
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
      name: 'link',
      type: 'text',
    },
    {
      name: 'credits',
      type: 'group',
      fields: [
        {
          name: 'cast',
          label: {
            singlular: 'Cast',
            plural: 'Cast',
          },
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
            },
            {
              name: 'role',
              type: 'text',
            },
          ],
        },
        {
          name: 'creatives',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
            },
            {
              name: 'role',
              type: 'select',
              options: ['Director', 'Writer', 'Other (Specify)'],
            },
            {
              name: 'otherRole',
              type: 'text',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData.role === 'Other (Specify)',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    slugField({
      useAsSlug: 'title',
      disableUnique: false,
    }),
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

// Assistant Director
// Assistant Choreographer
// Assistant Producer
// Assistant Stage Manager
// Assistant Voice Coach
// Associate Director
// Band
// Cast
// Casting Director
// Casting Assistant
// Choreographer
// Company Manager
// Company Stage Manager
// Composer
// Costume Designer
// Creative Associate
// Deputy Stage Manager
// Dialect Coach
// Director
// Executive Producer
// Fight Director
// Intimacy Director
// Lighting Designer
// Movement Director
// Musical Director
// Musical Supervisor
// Producer
// Resident Director
// Set Designer
// Sound Designer
// Stage Manager
// Voice
// Voice Coach
// Writer
// Wigs, Hair and Make-up Designer

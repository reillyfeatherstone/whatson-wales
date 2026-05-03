import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { slugField, type CollectionConfig } from 'payload'
import { setLongLat } from '@/collections/hooks/setLongLat'

export const Venues: CollectionConfig = {
  slug: 'venues',
  admin: {
    useAsTitle: 'venueName',
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'venueName',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'venueWebsite',
      type: 'text',
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'venueCity',
          type: 'text',
        },
        {
          name: 'postcode',
          type: 'text',
        },
        {
          name: 'venueLong',
          type: 'number',
        },
        {
          name: 'venueLat',
          type: 'number',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    slugField({
      useAsSlug: 'venueName',
      disableUnique: false,
    }),
  ],
  hooks: {
    beforeChange: [setLongLat],
  },
}

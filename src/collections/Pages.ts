import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
    },
    {
      name: 'active',
      label: 'Active',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [
        {
          slug: 'section',
          fields: [
            {
              name: 'height',
              label: 'Section Height (px)',
              type: 'number',
            },
            {
              name: 'backgroundColour',
              label: 'Background Colour',
              type: 'text',
            },
            {
              name: 'heading',
              type: 'text',
            },
          ],
        },
      ],
    },
    slugField({
      useAsSlug: 'title',
    }),
  ],
}

import { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'linkType',
          type: 'radio',
          required: true,
          defaultValue: 'internal',
          options: [
            {
              value: 'internal',
              label: 'Internal Link',
            },
            {
              value: 'custom',
              label: 'Custom URL',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'linkUrl',
              label: 'Link URL',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
                placeholder: '/contact-us',
              },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
                placeholder: 'Contact',
              },
            },
          ],
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in a new tab?',
        },
      ],
      minRows: 1,
      maxRows: 5,
    },
  ],
}

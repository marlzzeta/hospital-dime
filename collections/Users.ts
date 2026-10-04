import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre completo',
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rol',
      defaultValue: 'editor',
      options: [
        { label: 'Administrador', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
  ],
}

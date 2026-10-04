import type { Block } from 'payload'

export const FeaturesBlock: Block = {
  slug: 'features',
  labels: { singular: 'Servicios / Features', plural: 'Secciones de servicios' },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Título de la sección',
      defaultValue: 'Nuestros servicios',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Características / Servicios',
      minRows: 1,
      maxRows: 9,
      fields: [
        { name: 'icon', type: 'text', label: 'Icono (nombre Lucide)' },
        { name: 'title', type: 'text', label: 'Título', required: true },
        { name: 'description', type: 'textarea', label: 'Descripción' },
      ],
    },
  ],
}

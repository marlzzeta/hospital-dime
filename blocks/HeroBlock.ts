import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Titular principal',
      required: true,
    },
    {
      name: 'subheadline',
      type: 'textarea',
      label: 'Subtítulo',
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'Texto del botón CTA',
      defaultValue: 'Agendar cita',
    },
    {
      name: 'ctaHref',
      type: 'text',
      label: 'Enlace del botón CTA',
      defaultValue: '#contacto',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen de fondo',
    },
  ],
}

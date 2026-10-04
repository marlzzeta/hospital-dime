import type { Block } from 'payload'

export const DoctorCarouselBlock: Block = {
  slug: 'doctorCarousel',
  labels: { singular: 'Carrusel de médicos', plural: 'Carruseles de médicos' },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Título de la sección',
      defaultValue: 'Nuestro equipo médico',
    },
    {
      name: 'specialty',
      type: 'relationship',
      relationTo: 'specialties',
      label: 'Filtrar por especialidad (opcional)',
      hasMany: false,
    },
  ],
}

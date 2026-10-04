import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: { singular: 'Testimonios', plural: 'Secciones de testimonios' },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Título de la sección',
      defaultValue: 'Lo que dicen nuestros pacientes',
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonios',
      minRows: 1,
      fields: [
        { name: 'quote', type: 'textarea', label: 'Cita', required: true },
        { name: 'author', type: 'text', label: 'Nombre del paciente', required: true },
        { name: 'role', type: 'text', label: 'Descripción (ej. Paciente cardiología)' },
        { name: 'rating', type: 'number', label: 'Calificación (1-5)', min: 1, max: 5, defaultValue: 5 },
      ],
    },
  ],
}

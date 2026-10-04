import type { Block } from 'payload'

export const LocationContactBlock: Block = {
  slug: 'locationContact',
  labels: { singular: 'Ubicación y Contacto', plural: 'Secciones de ubicación/contacto' },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Título de la sección',
      defaultValue: 'Contáctanos',
    },
    {
      name: 'address',
      type: 'text',
      label: 'Dirección',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Teléfono principal',
    },
    {
      name: 'emergencyPhone',
      type: 'text',
      label: 'Teléfono de emergencias',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Correo de contacto',
    },
    {
      name: 'scheduleText',
      type: 'text',
      label: 'Horario de atención',
      defaultValue: 'Lunes a Viernes 7:00 AM - 5:00 PM',
    },
    {
      name: 'googleMapsEmbed',
      type: 'text',
      label: 'URL embed Google Maps (src del iframe)',
    },
  ],
}

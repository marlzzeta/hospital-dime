import type { CollectionConfig } from 'payload'

export const Doctors: CollectionConfig = {
  slug: 'doctors',
  labels: { singular: 'Médico', plural: 'Médicos' },
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre completo',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título profesional',
      admin: { description: 'Ej. Dr., Dra.' },
    },
    {
      name: 'specialty',
      type: 'relationship',
      relationTo: 'specialties',
      label: 'Especialidad',
      required: true,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biografía corta',
    },
    {
      name: 'credentials',
      type: 'array',
      label: 'Credenciales / Formación',
      fields: [
        { name: 'credential', type: 'text', label: 'Credencial', required: true },
      ],
    },
    {
      name: 'schedule',
      type: 'text',
      label: 'Horario de consulta',
      admin: { description: 'Ej. Lunes, Miércoles 8:00 AM - 12:00 PM' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: '¿Destacado en home?',
      defaultValue: false,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Orden de aparición',
      defaultValue: 0,
    },
  ],
}

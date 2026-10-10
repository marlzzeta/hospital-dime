import type { CollectionConfig } from 'payload'

export const Specialties: CollectionConfig = {
  slug: 'specialties',
  labels: { singular: 'Especialidad', plural: 'Especialidades' },
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: { description: 'Identificador URL (ej. cardiologia)' },
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icono Lucide',
      admin: { description: 'Nombre del ícono en lucide-react (ej. Heart)' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción breve',
    },
  ],
}

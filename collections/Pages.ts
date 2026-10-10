import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/HeroBlock'
import { FeaturesBlock } from '../blocks/FeaturesBlock'
import { DoctorCarouselBlock } from '../blocks/DoctorCarouselBlock'
import { TestimonialsBlock } from '../blocks/TestimonialsBlock'
import { LocationContactBlock } from '../blocks/LocationContactBlock'
import { ContactFormBlock } from '../blocks/ContactFormBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Página', plural: 'Páginas' },
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: { description: 'Identificador URL. Usar "home" para la página principal.' },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Bloques de contenido',
      blocks: [
        HeroBlock,
        FeaturesBlock,
        DoctorCarouselBlock,
        TestimonialsBlock,
        LocationContactBlock,
        ContactFormBlock,
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'title', type: 'text', label: 'Meta título' },
        { name: 'description', type: 'textarea', label: 'Meta descripción' },
        { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'Imagen OG' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Fecha de publicación',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
  ],
}

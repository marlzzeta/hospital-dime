import type { Block } from 'payload'

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  labels: { singular: 'Formulario de Contacto', plural: 'Formularios de Contacto' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Título',
      defaultValue: '¿Necesitas una cita?',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subtítulo',
      defaultValue: 'Completa el formulario y te contactaremos en menos de 24 horas.',
    },
    {
      name: 'recipientEmail',
      type: 'email',
      label: 'Email de destino',
      admin: { description: 'Dirección que recibirá los mensajes del formulario.' },
    },
  ],
}

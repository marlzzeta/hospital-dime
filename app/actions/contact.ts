'use server'

import { z } from 'zod'
import nodemailer from 'nodemailer'

const schema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un email válido'),
  phone: z.string().optional(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  recipientEmail: z.string().email(),
  recaptchaToken: z.string().min(1, 'reCAPTCHA requerido'),
})

export type ContactState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
} | null

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return true // skip in dev if not configured

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
  })
  const data = (await res.json()) as { success: boolean; score?: number }
  return data.success && (data.score ?? 1) >= 0.5
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
    recipientEmail: formData.get('recipientEmail'),
    recaptchaToken: formData.get('recaptchaToken'),
  }

  const parsed = schema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const { name, email, phone, message, recaptchaToken } = parsed.data
  const recipientEmail = parsed.data.recipientEmail || process.env.CONTACT_EMAIL || ''

  if (!recipientEmail) {
    console.error('No recipient email configured (set CONTACT_EMAIL env var or configure it in the CMS block)')
    return { success: false, error: 'Error de configuración. Por favor llámanos directamente.' }
  }

  const human = await verifyRecaptcha(recaptchaToken)
  if (!human) {
    return { success: false, error: 'Verificación de seguridad fallida. Intenta de nuevo.' }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Hospital DIME Web" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `Nuevo mensaje de contacto — ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}${phone ? `\nTeléfono: ${phone}` : ''}\n\nMensaje:\n${message}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
        <hr/>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })
  } catch (err) {
    console.error('Email send failed:', err)
    // Don't expose SMTP errors to users; log and return generic message
    return { success: false, error: 'Error al enviar el mensaje. Intenta llamarnos directamente.' }
  }

  return { success: true }
}

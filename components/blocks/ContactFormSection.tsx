'use client'

import React, { useActionState, useEffect, useRef } from 'react'
import { submitContact, type ContactState } from '@/app/actions/contact'
import type { ContactFormBlockData } from '@/types/blocks'
import { Container } from '@/components/ui/Container'

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

interface Props {
  block: ContactFormBlockData
}

export function ContactFormSection({ block }: Props) {
  const [state, formAction, isPending] = useActionState<ContactState, FormData>(
    submitContact,
    null,
  )
  const tokenRef = useRef<string>('')
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''

  useEffect(() => {
    if (!siteKey) return
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
  }, [siteKey])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    if (siteKey && window.grecaptcha) {
      await new Promise<void>((resolve) => window.grecaptcha.ready(resolve))
      const token = await window.grecaptcha.execute(siteKey, { action: 'contact' })
      tokenRef.current = token
    }

    formData.set('recaptchaToken', tokenRef.current || 'dev-bypass')
    formAction(formData)
  }

  const fieldError = (name: string) =>
    state && !state.success && state.fieldErrors?.[name]?.[0]

  return (
    <section className="py-16 md:py-24 bg-slate-50" id="contacto">
      <Container narrow>
        <div className="text-center mb-10">
          <span className="inline-block text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Contáctanos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {block.heading ?? '¿Necesitas una cita?'}
          </h2>
          {block.subheading && (
            <p className="text-slate-600 max-w-xl mx-auto">{block.subheading}</p>
          )}
        </div>

        {state?.success ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
            <div className="text-5xl mb-4">✓</div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">¡Mensaje enviado!</h3>
            <p className="text-green-700">
              Nos pondremos en contacto contigo en menos de 24 horas.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6"
          >
            <input type="hidden" name="recipientEmail" value={block.recipientEmail ?? ''} />

            {state?.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                {state.error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Nombre completo <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Juan Pérez"
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-600 transition ${
                    fieldError('name') ? 'border-red-400' : 'border-slate-200'
                  }`}
                />
                {fieldError('name') && (
                  <p className="mt-1 text-xs text-red-500">{fieldError('name')}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Correo electrónico <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="juan@correo.com"
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-600 transition ${
                    fieldError('email') ? 'border-red-400' : 'border-slate-200'
                  }`}
                />
                {fieldError('email') && (
                  <p className="mt-1 text-xs text-red-500">{fieldError('email')}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Teléfono (opcional)
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="+504 9999-9999"
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-600 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Mensaje <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Cuéntanos en qué podemos ayudarte..."
                className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-600 transition resize-none ${
                  fieldError('message') ? 'border-red-400' : 'border-slate-200'
                }`}
              />
              {fieldError('message') && (
                <p className="mt-1 text-xs text-red-500">{fieldError('message')}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-semibold rounded-lg px-6 py-3 transition-colors"
            >
              {isPending ? 'Enviando…' : 'Enviar mensaje'}
            </button>

            {siteKey && (
              <p className="text-center text-xs text-slate-400">
                Protegido por reCAPTCHA.{' '}
                <a href="https://policies.google.com/privacy" className="underline">Privacidad</a>{' '}
                y{' '}
                <a href="https://policies.google.com/terms" className="underline">Términos</a>.
              </p>
            )}
          </form>
        )}
      </Container>
    </section>
  )
}

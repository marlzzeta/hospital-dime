import React from 'react'
import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Términos de Uso',
  description: 'Términos y condiciones de uso del sitio web de Hospital DIME.',
}

export default function TerminosPage() {
  return (
    <section className="py-16 md:py-24">
      <Container narrow>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Términos de Uso</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-4">
            <strong>Última actualización:</strong> {new Date().getFullYear()}
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            1. Aceptación de los términos
          </h2>
          <p className="text-slate-600 mb-4">
            Al acceder y usar el sitio web de Hospital DIME, usted acepta quedar vinculado por estos
            términos de uso. Si no está de acuerdo con alguno de ellos, le rogamos que no utilice
            nuestro sitio.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            2. Uso del sitio
          </h2>
          <p className="text-slate-600 mb-4">
            Este sitio web tiene carácter informativo. La información médica publicada es de
            carácter general y no sustituye la consulta con un profesional de la salud.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            3. Propiedad intelectual
          </h2>
          <p className="text-slate-600 mb-4">
            Todos los contenidos del sitio (textos, imágenes, logotipos, diseño) son propiedad de
            Hospital DIME y están protegidos por las leyes de propiedad intelectual aplicables. Está
            prohibida su reproducción sin autorización expresa.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            4. Limitación de responsabilidad
          </h2>
          <p className="text-slate-600 mb-4">
            Hospital DIME no se hace responsable de los daños que puedan derivarse del uso de la
            información publicada en este sitio o de la imposibilidad de acceder al mismo.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            5. Modificaciones
          </h2>
          <p className="text-slate-600 mb-4">
            Hospital DIME se reserva el derecho de modificar estos términos en cualquier momento.
            Las modificaciones entran en vigor desde su publicación en el sitio.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            6. Contacto
          </h2>
          <p className="text-slate-600 mb-4">
            Para cualquier consulta sobre estos términos, escríbanos a{' '}
            <a
              href="mailto:contacto@hospitaldime.hn"
              className="text-primary-600 hover:underline"
            >
              contacto@hospitaldime.hn
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  )
}

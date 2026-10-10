import React from 'react'
import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad y tratamiento de datos personales de Hospital DIME.',
}

export default function PrivacidadPage() {
  return (
    <section className="py-16 md:py-24">
      <Container narrow>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
          Política de Privacidad
        </h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-4">
            <strong>Última actualización:</strong> {new Date().getFullYear()}
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            1. Responsable del tratamiento
          </h2>
          <p className="text-slate-600 mb-4">
            Hospital DIME, con domicilio en Col. Palmira, Tegucigalpa, Honduras, es responsable del
            tratamiento de los datos personales que nos proporcione a través de nuestros canales de
            comunicación.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            2. Datos que recopilamos
          </h2>
          <p className="text-slate-600 mb-4">
            Recopilamos los datos que usted nos proporciona voluntariamente al:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
            <li>Completar el formulario de contacto (nombre, correo, teléfono, mensaje)</li>
            <li>Llamarnos por teléfono</li>
            <li>Visitarnos en nuestras instalaciones</li>
          </ul>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            3. Finalidad del tratamiento
          </h2>
          <p className="text-slate-600 mb-4">
            Los datos recopilados se utilizan exclusivamente para:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
            <li>Responder a sus consultas y solicitudes de citas</li>
            <li>Brindar atención médica y seguimiento de pacientes</li>
            <li>Comunicarnos con usted sobre su atención médica</li>
          </ul>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            4. Conservación de datos
          </h2>
          <p className="text-slate-600 mb-4">
            Los datos se conservan durante el tiempo necesario para cumplir con la finalidad para la
            que fueron recopilados y conforme a las obligaciones legales aplicables.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            5. Sus derechos
          </h2>
          <p className="text-slate-600 mb-4">
            Usted tiene derecho a acceder, rectificar o eliminar sus datos personales. Para ejercer
            estos derechos, contáctenos en{' '}
            <a
              href="mailto:contacto@hospitaldime.hn"
              className="text-primary-600 hover:underline"
            >
              contacto@hospitaldime.hn
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
            6. Cambios a esta política
          </h2>
          <p className="text-slate-600 mb-4">
            Nos reservamos el derecho de actualizar esta política. Le notificaremos de cambios
            significativos publicando la nueva versión en esta página.
          </p>
        </div>
      </Container>
    </section>
  )
}

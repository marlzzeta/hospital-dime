import React from 'react'
import { MapPin, Phone, Mail, Clock, AlertCircle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import type { LocationContactBlockData } from '@/types/blocks'

export function LocationContactSection({ block }: { block: LocationContactBlockData }) {
  const { sectionTitle, address, phone, emergencyPhone, email, scheduleText, googleMapsEmbed } =
    block

  return (
    <Section background="white" id="contacto">
      <Container>
        <SectionHeading
          label="Contacto"
          title={sectionTitle ?? 'Contáctanos'}
          description="Estamos aquí para ayudarte. Comunícate con nosotros por el canal que prefieras."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Info panel */}
          <div className="space-y-6">
            {address && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 mb-1">Dirección</div>
                  <p className="text-slate-600 text-sm">{address}</p>
                </div>
              </div>
            )}

            {phone && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 mb-1">Teléfono</div>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="text-primary-600 hover:underline text-sm"
                  >
                    {phone}
                  </a>
                </div>
              </div>
            )}

            {emergencyPhone && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 mb-1">Emergencias 24h</div>
                  <a
                    href={`tel:${emergencyPhone.replace(/\s/g, '')}`}
                    className="text-red-600 hover:underline text-sm font-semibold"
                  >
                    {emergencyPhone}
                  </a>
                </div>
              </div>
            )}

            {email && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 mb-1">Correo</div>
                  <a
                    href={`mailto:${email}`}
                    className="text-primary-600 hover:underline text-sm"
                  >
                    {email}
                  </a>
                </div>
              </div>
            )}

            {scheduleText && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 mb-1">Horario</div>
                  <p className="text-slate-600 text-sm">{scheduleText}</p>
                </div>
              </div>
            )}

            {phone && (
              <div className="pt-2">
                <Button href={`tel:${phone.replace(/\s/g, '')}`} size="md">
                  Llamar ahora
                </Button>
              </div>
            )}
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden h-80 lg:h-auto min-h-64 bg-slate-100">
            {googleMapsEmbed ? (
              <iframe
                src={googleMapsEmbed}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Hospital DIME"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <MapPin className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">Mapa no configurado</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}

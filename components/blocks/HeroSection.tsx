import React from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { CalendarDays, Video } from 'lucide-react'
import type { HeroBlockData, MediaDoc } from '@/types/blocks'

export function HeroSection({ block }: { block: HeroBlockData }) {
  const { headline, subheadline, ctaLabel, ctaHref, backgroundImage } = block
  const media = backgroundImage && typeof backgroundImage === 'object' ? backgroundImage as MediaDoc : null

  return (
    <section className="bg-white overflow-hidden">
      {/* Hero content */}
      <Container>
        <div className="pt-16 pb-10 md:pt-24 md:pb-14 flex flex-col items-center text-center gap-6">
          <p className="text-primary-600 font-semibold text-base uppercase tracking-widest">
            Centro Médico de Excelencia
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-[#031047] leading-[1.15] max-w-4xl">
            {headline}
          </h1>

          {subheadline && (
            <p className="text-lg text-[#747b91] max-w-xl leading-relaxed">
              {subheadline}
            </p>
          )}

          <div className="flex flex-wrap gap-4 justify-center pt-2">
            {ctaLabel && ctaHref && (
              <Button href={ctaHref} size="lg">
                {ctaLabel}
              </Button>
            )}
            <Button href="#servicios" variant="outline" size="lg">
              Ver especialidades
            </Button>
          </div>
        </div>

        {/* Stats + image row */}
        <div className="relative pb-16 md:pb-24">
          {/* Hero image */}
          {media?.url && (
            <div className="relative rounded-[20px] overflow-hidden h-72 md:h-96 w-full">
              <Image
                src={media.url}
                alt={media.alt}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}

          {/* Stats cards overlay / row */}
          <div className={`flex flex-col sm:flex-row gap-4 ${media?.url ? 'mt-4' : ''}`}>
            {/* New clients stat */}
            <div className="flex-1 bg-primary-600 rounded-[20px] p-7 text-white">
              <p className="font-semibold text-lg mb-1">Nuevos pacientes</p>
              <p className="text-5xl font-light">320+</p>
              <p className="text-primary-200 text-sm mt-2">atendidos este mes</p>
            </div>

            {/* Services card */}
            <div className="flex-[2] relative bg-[#f9f9f9] rounded-[20px] p-7 overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-[#031047] text-xl mb-1">Consulta virtual</p>
                  <p className="text-[#747b91] text-sm leading-relaxed max-w-xs">
                    Atención médica puntual con consulta virtual programada desde tu hogar.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Button href="#contacto" variant="outline" size="sm">
                  Ver servicios
                </Button>
              </div>
            </div>

            {/* Appointment card */}
            <div className="flex-1 bg-[#f9f9f9] rounded-[20px] p-7">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <CalendarDays className="w-5 h-5 text-primary-600" />
              </div>
              <p className="font-semibold text-[#031047] text-xl mb-2">Agenda tu cita</p>
              <p className="text-[#747b91] text-sm leading-relaxed mb-5">
                Disponibilidad inmediata con nuestros especialistas.
              </p>
              <Button href="#contacto" size="sm">
                Agendar ahora
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

import React from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import type { HeroBlockData, MediaDoc } from '@/types/blocks'

export function HeroSection({ block }: { block: HeroBlockData }) {
  const { headline, subheadline, ctaLabel, ctaHref, backgroundImage } = block
  const media = backgroundImage && typeof backgroundImage === 'object' ? backgroundImage as MediaDoc : null

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-900 text-white py-24 md:py-36">
      {/* Background image */}
      {media?.url && (
        <>
          <Image
            src={media.url}
            alt={media.alt}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/80 to-primary-900/80" />
        </>
      )}

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block text-primary-200 text-sm font-semibold uppercase tracking-widest mb-4">
            Centro Médico de Excelencia
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
            {headline}
          </h1>
          {subheadline && (
            <p className="text-xl text-primary-100 mb-10 max-w-2xl leading-relaxed">
              {subheadline}
            </p>
          )}
          {ctaLabel && ctaHref && (
            <div className="flex flex-wrap gap-4">
              <Button href={ctaHref} variant="secondary" size="lg">
                {ctaLabel}
              </Button>
              <Button
                href="#servicios"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Ver especialidades
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

import React from 'react'
import { Star, Quote } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeading } from '@/components/ui/Section'
import type { TestimonialsBlockData } from '@/types/blocks'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection({ block }: { block: TestimonialsBlockData }) {
  const { sectionTitle, testimonials } = block

  return (
    <Section background="white" id="testimonios">
      <Container>
        <SectionHeading
          label="Testimonios"
          title={sectionTitle ?? 'Lo que dicen nuestros pacientes'}
        />
        {testimonials && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.id ?? i}
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col"
              >
                <Quote className="w-8 h-8 text-primary-100 mb-4 shrink-0" />
                {t.rating && <StarRating rating={t.rating} />}
                <p className="text-slate-700 leading-relaxed flex-1 mb-4 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{t.author}</div>
                  {t.role && (
                    <div className="text-xs text-slate-500 mt-0.5">{t.role}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}

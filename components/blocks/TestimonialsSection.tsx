import React from 'react'
import { Star } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeading } from '@/components/ui/Section'
import type { TestimonialsBlockData } from '@/types/blocks'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection({ block }: { block: TestimonialsBlockData }) {
  const { sectionTitle, testimonials } = block

  return (
    <Section background="surface" id="testimonios">
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
                className="bg-white rounded-[20px] p-7 border border-[#dde3ff] flex flex-col hover:shadow-md transition-shadow"
              >
                {t.rating && <StarRating rating={t.rating} />}
                <p className="text-[#031047] leading-relaxed flex-1 mb-6 text-base">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                    <span className="text-primary-600 font-bold text-sm">
                      {t.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-[#031047] text-sm">{t.author}</div>
                    {t.role && (
                      <div className="text-xs text-[#747b91] mt-0.5">{t.role}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}

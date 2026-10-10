import React from 'react'
import * as LucideIcons from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeading } from '@/components/ui/Section'
import type { FeaturesBlockData } from '@/types/blocks'

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (LucideIcons as Record<string, unknown>)[name] as React.FC<{ className?: string }> | undefined
  if (!Icon) {
    const Fallback = LucideIcons.Star
    return <Fallback className={className} />
  }
  return <Icon className={className} />
}

export function FeaturesSection({ block }: { block: FeaturesBlockData }) {
  const { sectionTitle, features } = block

  return (
    <Section background="white" id="servicios">
      <Container>
        <SectionHeading
          label="Nuestros Servicios"
          title={sectionTitle ?? 'Cómo podemos ayudarte'}
        />
        {features && features.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, i) => (
              <div
                key={item.id ?? i}
                className="flex flex-col rounded-[20px] overflow-hidden group border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Icon header */}
                <div className="bg-[#f9f9f9] flex items-center justify-center h-36">
                  <div className="w-16 h-16 rounded-[12px] bg-white border border-[#dde3ff] flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300 shadow-sm">
                    <DynamicIcon
                      name={item.icon ?? 'Star'}
                      className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="bg-[#f9f9f9] flex flex-col gap-2 p-6 flex-1">
                  <h3 className="font-semibold text-[#031047] text-2xl">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-[#747b91] leading-relaxed flex-1">{item.description}</p>
                  )}
                  <div className="flex items-center gap-2 pt-3 text-[#031047] text-sm font-medium group/link cursor-pointer">
                    <span>Más información</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
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

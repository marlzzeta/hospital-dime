import React from 'react'
import * as LucideIcons from 'lucide-react'
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
    <Section background="surface" id="servicios">
      <Container>
        <SectionHeading
          label="Nuestros servicios"
          title={sectionTitle ?? 'Nuestros servicios'}
        />
        {features && features.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, i) => (
              <div
                key={item.id ?? i}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                  <DynamicIcon
                    name={item.icon ?? 'Star'}
                    className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors"
                  />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}

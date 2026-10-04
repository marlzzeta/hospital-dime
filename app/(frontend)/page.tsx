import React from 'react'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Heart, Activity, Microscope, Clock, Shield, Star } from 'lucide-react'

const features = [
  {
    icon: Heart,
    title: 'Cardiología',
    description: 'Diagnóstico y tratamiento avanzado de enfermedades cardiovasculares.',
  },
  {
    icon: Activity,
    title: 'Medicina General',
    description: 'Atención preventiva y de seguimiento para toda la familia.',
  },
  {
    icon: Microscope,
    title: 'Laboratorio Clínico',
    description: 'Análisis de última generación con resultados en pocas horas.',
  },
  {
    icon: Clock,
    title: 'Emergencias 24/7',
    description: 'Atención de urgencias las 24 horas, los 7 días de la semana.',
  },
  {
    icon: Shield,
    title: 'Cirugía Especializada',
    description: 'Procedimientos quirúrgicos con tecnología mínimamente invasiva.',
  },
  {
    icon: Star,
    title: 'Atención Pediátrica',
    description: 'Cuidado integral para los más pequeños de la familia.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-24 md:py-32">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-block text-primary-200 text-sm font-semibold uppercase tracking-widest mb-4">
              Centro Médico de Excelencia
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Tu salud, nuestra
              <br />
              <span className="text-accent-400">prioridad</span>
            </h1>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl leading-relaxed">
              Hospital DIME reúne a los mejores especialistas y la tecnología más avanzada para
              brindarte atención médica de calidad en un ambiente cálido y seguro.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="#contacto" variant="secondary" size="lg">
                Agendar cita
              </Button>
              <Button href="#servicios" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Ver especialidades
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <div className="bg-white border-b border-slate-100">
        <Container>
          <div className="py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '25+', label: 'Años de experiencia' },
              { value: '40+', label: 'Especialistas' },
              { value: '50k+', label: 'Pacientes atendidos' },
              { value: '24/7', label: 'Emergencias' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-primary-600">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Features */}
      <Section background="surface" id="servicios">
        <Container>
          <SectionHeading
            label="Nuestros servicios"
            title="Especialidades médicas de primer nivel"
            description="Contamos con más de 20 especialidades médicas para cubrir todas tus necesidades de salud."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                  <Icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="primary" id="contacto">
        <Container narrow>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para agendar tu cita?
            </h2>
            <p className="text-primary-100 text-lg mb-8">
              Nuestro equipo está disponible para ayudarte a encontrar el especialista que necesitas.
            </p>
            <Button href="tel:+50422345678" variant="secondary" size="lg">
              Llamar ahora · +504 2234-5678
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}

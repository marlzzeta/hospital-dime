import React from 'react'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Heart, Activity, Microscope, Clock, Shield, Star, ArrowUpRight, CalendarDays, Video } from 'lucide-react'
import { WhyUsSection } from './blocks/WhyUsSection'

const services = [
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

export function StaticHomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white overflow-hidden">
        <Container>
          <div className="pt-16 pb-10 md:pt-24 md:pb-14 flex flex-col items-center text-center gap-6">
            <p className="text-primary-600 font-semibold text-base uppercase tracking-widest">
              Centro Médico de Excelencia
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#031047] leading-[1.15] max-w-4xl">
              Atención médica de alta calidad con los mejores especialistas
            </h1>
            <p className="text-lg text-[#747b91] max-w-xl leading-relaxed">
              Hospital DIME reúne a los mejores especialistas y tecnología de vanguardia para brindarte atención de calidad.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <Button href="#contacto" size="lg">
                Agendar cita
              </Button>
              <Button href="#servicios" variant="outline" size="lg">
                Ver especialidades
              </Button>
            </div>
          </div>

          {/* Stats cards */}
          <div className="pb-16 md:pb-24 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 bg-primary-600 rounded-[20px] p-7 text-white">
              <p className="font-semibold text-lg mb-1">Nuevos pacientes</p>
              <p className="text-5xl font-light">320+</p>
              <p className="text-primary-200 text-sm mt-2">atendidos este mes</p>
            </div>
            <div className="flex-[2] bg-[#f9f9f9] rounded-[20px] p-7">
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
              <div className="mt-5">
                <Button href="#contacto" variant="outline" size="sm">
                  Ver servicios
                </Button>
              </div>
            </div>
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
        </Container>
      </section>

      {/* Why us */}
      <WhyUsSection />

      {/* Services */}
      <Section background="white" id="servicios">
        <Container>
          <SectionHeading
            label="Nuestros Servicios"
            title="Cómo podemos ayudarte"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col rounded-[20px] overflow-hidden group border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-[#f9f9f9] flex items-center justify-center h-36">
                  <div className="w-16 h-16 rounded-[12px] bg-white border border-[#dde3ff] flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300 shadow-sm">
                    <Icon className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <div className="bg-[#f9f9f9] flex flex-col gap-2 p-6 flex-1">
                  <h3 className="font-semibold text-[#031047] text-2xl">{title}</h3>
                  <p className="text-sm text-[#747b91] leading-relaxed flex-1">{description}</p>
                  <div className="flex items-center gap-2 pt-3 text-[#031047] text-sm font-medium cursor-pointer">
                    <span>Más información</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA contact */}
      <section className="py-16 md:py-24 bg-[#f9f9f9]" id="contacto">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[#4666ff] text-sm font-semibold uppercase tracking-widest mb-3 block">Contacto</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#031047] mb-4">
              ¿Listo para agendar tu cita?
            </h2>
            <p className="text-[#747b91] text-lg mb-8">
              Nuestro equipo está disponible para ayudarte a encontrar el especialista que necesitas.
            </p>
            <Button href="tel:+50422345678" size="lg">
              Llamar ahora · +504 2234-5678
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}

import React from 'react'
import { Star, Smile, Users, Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

const features = [
  {
    icon: Star,
    title: 'Más de 25 años de experiencia',
    description: 'Nuestro equipo comparte y colabora activamente en el cuidado de cada paciente con décadas de práctica clínica.',
  },
  {
    icon: Smile,
    title: 'Proceso ágil, mejores resultados',
    description: 'Atención rápida con diagnósticos precisos para que recuperes tu bienestar en el menor tiempo posible.',
  },
  {
    icon: Users,
    title: 'Equipo médico profesional',
    description: 'Especialistas certificados, comprometidos con los estándares más altos de la medicina moderna.',
  },
]

const benefits = [
  'Consulta GRATUITA con un profesional de salud',
  'Descuentos exclusivos en nuestros servicios',
]

export function WhyUsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — intro + stats */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#031047] leading-tight mb-4">
                Lo que nos hace diferentes de las clínicas convencionales
              </h2>
              <p className="text-[#747b91] text-base leading-relaxed">
                En Hospital DIME somos apasionados por mejorar vidas a través del conocimiento y la atención personalizada.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-12 py-2">
              <div>
                <p className="text-5xl font-light text-primary-600">200+</p>
                <p className="text-[#747b91] text-sm mt-1">Pacientes atendidos al día</p>
              </div>
              <div>
                <p className="text-5xl font-light text-primary-600">1000+</p>
                <p className="text-[#747b91] text-sm mt-1">Especialistas en nuestra red</p>
              </div>
            </div>

            <Button href="#contacto" size="md" className="self-start">
              Sobre nosotros
            </Button>
          </div>

          {/* Right — features panel */}
          <div className="bg-[#f9f9f9] rounded-[20px] px-8 py-10 flex flex-col gap-10">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-5 items-start">
                <div className="w-14 h-14 rounded-[10px] bg-white border border-[#cfd8ff] flex items-center justify-center shrink-0">
                  <feature.icon className="w-7 h-7 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-[#031047] text-xl mb-1">{feature.title}</p>
                  <p className="text-[#747b91] text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dark CTA banner */}
        <div className="mt-12 bg-[#292929] rounded-[20px] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="p-10 md:p-14 flex flex-col gap-6">
              <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                ¡Inicia tu camino hacia la salud hoy!
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Como muestra de aprecio, te ofrecemos una consulta GRATUITA con uno de nuestros profesionales de salud.
              </p>
              <ul className="flex flex-col gap-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-white text-sm">
                    <Check className="w-5 h-5 text-primary-400 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Button href="#contacto" size="md" className="self-start">
                  Más beneficios
                </Button>
              </div>
            </div>

            {/* Appointment placeholder */}
            <div className="bg-[#1a1a1a] p-10 md:p-14 flex flex-col justify-center">
              <p className="text-3xl font-bold text-white mb-6 leading-tight">
                Agenda tu cita
              </p>
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="flex items-center gap-0 bg-transparent border border-gray-600 rounded-full overflow-hidden pl-5 pr-1.5 py-1.5">
                  <input
                    type="tel"
                    placeholder="Número de teléfono"
                    className="bg-transparent text-white placeholder:text-gray-500 text-sm outline-none flex-1"
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-white text-[#031047] font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

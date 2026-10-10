import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Container } from '@/components/ui/Container'

const quickLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Especialidades', href: '#servicios' },
  { label: 'Médicos', href: '#medicos' },
  { label: 'Contacto', href: '#contacto' },
]

const legalLinks = [
  { label: 'Política de privacidad', href: '/privacidad' },
  { label: 'Términos de uso', href: '/terminos' },
]

export function Footer() {
  return (
    <footer className="bg-[#292929] text-white">
      {/* Newsletter banner */}
      <div className="pt-8 px-4 md:px-8">
        <Container>
          <div className="relative bg-primary-600 rounded-[20px] overflow-hidden py-14 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Decorative cross — left */}
            <div className="absolute -left-8 -top-8 w-48 h-48 opacity-20">
              <svg viewBox="0 0 200 200" fill="white" xmlns="http://www.w3.org/2000/svg">
                <rect x="80" y="0" width="40" height="200" rx="20"/>
                <rect x="0" y="80" width="200" height="40" rx="20"/>
              </svg>
            </div>
            {/* Decorative cross — right */}
            <div className="absolute -right-8 -bottom-8 w-48 h-48 opacity-20">
              <svg viewBox="0 0 200 200" fill="white" xmlns="http://www.w3.org/2000/svg">
                <rect x="80" y="0" width="40" height="200" rx="20"/>
                <rect x="0" y="80" width="200" height="40" rx="20"/>
              </svg>
            </div>

            <div className="text-center md:text-left relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                Suscríbete a nuestro boletín
              </h3>
              <p className="text-primary-100 max-w-md text-base leading-relaxed">
                Recibe consejos de salud, novedades y recordatorios de nuestros especialistas.
              </p>
            </div>

            <form
              className="flex relative z-10 items-center gap-0 bg-white/10 border border-white rounded-full overflow-hidden pl-6 pr-1.5 py-1.5 w-full md:w-auto min-w-[340px]"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="bg-transparent text-white placeholder:text-white/70 text-base outline-none flex-1 min-w-0"
              />
              <button
                type="submit"
                className="shrink-0 bg-white text-primary-600 font-semibold text-sm px-6 py-3 rounded-full hover:bg-primary-50 transition-colors"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </Container>
      </div>

      {/* Main footer content */}
      <Container>
        <div className="pt-16 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">HD</span>
              </div>
              <span className="font-bold text-white text-xl">Hospital DIME</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Inicia tu camino hacia el bienestar hoy con Hospital DIME.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-[#414141] flex items-center justify-center hover:bg-primary-600 transition-colors text-white text-xs font-bold"
              >
                f
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[#414141] flex items-center justify-center hover:bg-primary-600 transition-colors text-white text-xs font-bold"
              >
                ig
              </a>
              <a
                href="#"
                aria-label="X / Twitter"
                className="w-10 h-10 rounded-full bg-[#414141] flex items-center justify-center hover:bg-primary-600 transition-colors text-white font-bold text-sm"
              >
                𝕏
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Navegación
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Contacto
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-400 shrink-0" />
                <span className="text-gray-400">Blvd. Morazán, Tegucigalpa, Honduras</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                <a href="tel:+50422345678" className="text-gray-400 hover:text-white transition-colors">
                  +504 2234-5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <a href="mailto:info@hospitaldime.hn" className="text-gray-400 hover:text-white transition-colors">
                  info@hospitaldime.hn
                </a>
              </li>
            </ul>
          </div>

          {/* Schedule + appointment */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Agenda tu cita
            </h3>
            <div className="text-[#747b91] text-sm space-y-2 mb-6">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-primary-400 shrink-0" />
                <div>
                  <p className="text-gray-300">Lun–Vie 7:00–20:00</p>
                  <p className="text-gray-400">Sáb 7:00–14:00</p>
                  <p className="text-gray-400">Emergencias 24/7</p>
                </div>
              </div>
            </div>
            <a
              href="tel:+50422345678"
              className="inline-flex items-center gap-2 border border-white text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white hover:text-[#031047] transition-all"
            >
              <Phone className="w-4 h-4" />
              Llamar ahora
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#555]">
          <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
            <span>© {new Date().getFullYear()} Hospital DIME. Todos los derechos reservados.</span>
            <div className="flex gap-4">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-gray-300 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

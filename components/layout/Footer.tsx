import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Container } from '@/components/ui/Container'

const quickLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Especialidades', href: '#especialidades' },
  { label: 'Médicos', href: '#medicos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
]

const legalLinks = [
  { label: 'Política de privacidad', href: '/privacidad' },
  { label: 'Términos de uso', href: '/terminos' },
]

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <Container>
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">HD</span>
              </div>
              <div>
                <div className="font-bold text-white text-lg leading-tight">Hospital DIME</div>
                <div className="text-xs text-slate-400">Centro Médico</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Atención médica especializada con tecnología de vanguardia y un equipo comprometido
              con tu salud.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Navegación
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-400 shrink-0" />
                <span className="text-slate-400">Col. Palmira, Tegucigalpa, Honduras</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                <a href="tel:+50422345678" className="text-slate-400 hover:text-white transition-colors">
                  +504 2234-5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <a href="mailto:contacto@hospitaldime.hn" className="text-slate-400 hover:text-white transition-colors">
                  contacto@hospitaldime.hn
                </a>
              </li>
            </ul>
          </div>

          {/* Schedule */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Horarios
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-primary-400 shrink-0" />
                <div>
                  <div className="text-white font-medium">Consultas</div>
                  <div className="text-slate-400">Lun–Vie 7:00–20:00</div>
                  <div className="text-slate-400">Sáb 7:00–14:00</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <div className="text-white font-medium">Emergencias</div>
                  <div className="text-slate-400">24 horas / 7 días</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <Container>
          <div className="py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
            <span>© {new Date().getFullYear()} Hospital DIME. Todos los derechos reservados.</span>
            <div className="flex gap-4">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-slate-300 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}

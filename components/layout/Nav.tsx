'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Especialidades', href: '#servicios' },
  { label: 'Médicos', href: '#medicos' },
  { label: 'Contacto', href: '#contacto' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)]' : 'bg-white'
      }`}
    >
      {/* Emergency top bar */}
      <div className="bg-primary-600 text-white text-sm py-2 hidden md:block">
        <Container>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 font-medium">
              <Phone className="w-3.5 h-3.5" />
              Emergencias 24h: <strong>+504 2234-5678</strong>
            </span>
            <span className="text-primary-100">Lun–Vie 7:00–20:00 · Sáb 7:00–14:00</span>
          </div>
        </Container>
      </div>

      {/* Main nav */}
      <Container>
        <nav className="flex items-center justify-between h-[70px] md:h-[90px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">HD</span>
            </div>
            <span className="font-bold text-[#031047] text-xl tracking-tight">Hospital DIME</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-4 py-2 text-base font-normal text-[#031047] hover:text-primary-600 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:block">
            <Button href="#contacto" size="md">
              Agendar cita
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-full text-[#031047] hover:bg-gray-100 transition-colors"
            aria-label="Menú"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <Container>
              <ul className="py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 rounded-full text-[#031047] hover:text-primary-600 hover:bg-primary-50 font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Button href="#contacto" className="w-full justify-center">
                    Agendar cita
                  </Button>
                </li>
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

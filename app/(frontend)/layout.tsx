import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import React from 'react'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Hospital DIME — Centro Médico',
    template: '%s | Hospital DIME',
  },
  description: 'Centro Médico Hospital DIME — Atención especializada con tecnología de vanguardia.',
}

const hospitalJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Hospital',
  name: 'Hospital DIME',
  alternateName: 'Centro Médico Hospital DIME',
  url: process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://hospitaldime.hn',
  logo: `${process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://hospitaldime.hn'}/logo.png`,
  telephone: '+50422345678',
  email: 'info@hospitaldime.hn',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Blvd. Morazán, Edificio DIME',
    addressLocality: 'Tegucigalpa',
    addressRegion: 'Francisco Morazán',
    addressCountry: 'HN',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '07:00',
      closes: '14:00',
    },
  ],
  medicalSpecialty: [
    'Cardiology',
    'GeneralPractice',
    'Pediatrics',
    'Surgery',
    'EmergencyMedicine',
  ],
  availableService: {
    '@type': 'MedicalTherapy',
    name: 'Emergencias 24/7',
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hospitalJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

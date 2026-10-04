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

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900 antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

import React from 'react'

type Background = 'white' | 'surface' | 'primary' | 'dark'

const bgClasses: Record<Background, string> = {
  white:   'bg-white',
  surface: 'bg-slate-50',
  primary: 'bg-primary-600 text-white',
  dark:    'bg-slate-900 text-white',
}

interface SectionProps {
  children: React.ReactNode
  background?: Background
  className?: string
  id?: string
}

export function Section({ children, background = 'white', className = '', id }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${bgClasses[background]} ${className}`}>
      {children}
    </section>
  )
}

interface SectionHeadingProps {
  label?: string
  title: string
  description?: string
  centered?: boolean
}

export function SectionHeading({ label, title, description, centered = true }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {label && (
        <span className="inline-block text-sm font-semibold uppercase tracking-widest text-primary-600 mb-3">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">{title}</h2>
      {description && (
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  )
}

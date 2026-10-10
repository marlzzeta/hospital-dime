import React from 'react'

type Background = 'white' | 'surface' | 'primary' | 'dark'

const bgClasses: Record<Background, string> = {
  white:   'bg-white',
  surface: 'bg-[#f9f9f9]',
  primary: 'bg-primary-600 text-white',
  dark:    'bg-[#292929] text-white',
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
  dark?: boolean
}

export function SectionHeading({ label, title, description, centered = true, dark = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {label && (
        <span className={`inline-block text-sm font-semibold uppercase tracking-widest mb-3 ${dark ? 'text-primary-300' : 'text-[#4666ff]'}`}>
          {label}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl font-bold leading-tight ${dark ? 'text-white' : 'text-[#031047]'}`}>{title}</h2>
      {description && (
        <p className={`mt-4 text-lg max-w-2xl mx-auto leading-relaxed ${dark ? 'text-gray-300' : 'text-[#747b91]'}`}>{description}</p>
      )}
    </div>
  )
}

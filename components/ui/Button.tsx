'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

type Variant = 'primary' | 'secondary' | 'outline' | 'outline-inverse' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md',
  secondary:
    'bg-white text-[#031047] hover:bg-gray-50 shadow-sm hover:shadow-md',
  outline:
    'border-[1.5px] border-primary-600 text-[#031047] hover:bg-primary-50',
  'outline-inverse':
    'border-[1.5px] border-white text-white hover:bg-white/10',
  ghost:
    'text-primary-600 hover:bg-primary-50',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-6 py-2 text-sm h-[42px]',
  md: 'px-8 py-0 text-base h-[55px]',
  lg: 'px-10 py-0 text-lg h-[55px]',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap'

  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {children}
    </motion.button>
  )
}

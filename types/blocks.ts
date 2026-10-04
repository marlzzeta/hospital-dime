export type MediaDoc = {
  id: string
  url?: string
  alt: string
  width?: number
  height?: number
  filename?: string
  sizes?: {
    thumbnail?: { url?: string; width?: number; height?: number }
    card?: { url?: string; width?: number; height?: number }
    hero?: { url?: string; width?: number; height?: number }
  }
}

export type SpecialtyDoc = {
  id: string
  name: string
  slug: string
  icon?: string
  description?: string
}

export type DoctorDoc = {
  id: string
  name: string
  title?: string
  specialty?: SpecialtyDoc | string
  photo?: MediaDoc | string
  bio?: string
  credentials?: Array<{ credential: string; id?: string }>
  schedule?: string
  featured?: boolean
  order?: number
}

/* ---------- Block types ---------- */

export type HeroBlockData = {
  blockType: 'hero'
  id?: string
  headline: string
  subheadline?: string
  ctaLabel?: string
  ctaHref?: string
  backgroundImage?: MediaDoc | string
}

export type FeaturesBlockData = {
  blockType: 'features'
  id?: string
  sectionTitle?: string
  features?: Array<{
    id?: string
    icon?: string
    title: string
    description?: string
  }>
}

export type DoctorCarouselBlockData = {
  blockType: 'doctorCarousel'
  id?: string
  sectionTitle?: string
  specialty?: SpecialtyDoc | string
}

export type TestimonialsBlockData = {
  blockType: 'testimonials'
  id?: string
  sectionTitle?: string
  testimonials?: Array<{
    id?: string
    quote: string
    author: string
    role?: string
    rating?: number
  }>
}

export type LocationContactBlockData = {
  blockType: 'locationContact'
  id?: string
  sectionTitle?: string
  address?: string
  phone?: string
  emergencyPhone?: string
  email?: string
  scheduleText?: string
  googleMapsEmbed?: string
}

export type LayoutBlock =
  | HeroBlockData
  | FeaturesBlockData
  | DoctorCarouselBlockData
  | TestimonialsBlockData
  | LocationContactBlockData

export type PageDoc = {
  id: string
  title: string
  slug: string
  layout?: LayoutBlock[]
  seo?: {
    title?: string
    description?: string
    ogImage?: MediaDoc | string
  }
  publishedAt?: string
}

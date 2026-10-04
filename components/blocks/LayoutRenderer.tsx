import React, { Suspense } from 'react'
import type { LayoutBlock } from '@/types/blocks'
import { HeroSection } from './HeroSection'
import { FeaturesSection } from './FeaturesSection'
import { DoctorCarouselSection } from './DoctorCarouselSection'
import { TestimonialsSection } from './TestimonialsSection'
import { LocationContactSection } from './LocationContactSection'

function BlockSkeleton() {
  return <div className="py-16 md:py-24 bg-slate-50 animate-pulse" />
}

function renderBlock(block: LayoutBlock, index: number) {
  switch (block.blockType) {
    case 'hero':
      return <HeroSection key={block.id ?? index} block={block} />
    case 'features':
      return <FeaturesSection key={block.id ?? index} block={block} />
    case 'doctorCarousel':
      return (
        <Suspense key={block.id ?? index} fallback={<BlockSkeleton />}>
          <DoctorCarouselSection block={block} />
        </Suspense>
      )
    case 'testimonials':
      return <TestimonialsSection key={block.id ?? index} block={block} />
    case 'locationContact':
      return <LocationContactSection key={block.id ?? index} block={block} />
    default:
      return null
  }
}

export function LayoutRenderer({ blocks }: { blocks: LayoutBlock[] }) {
  if (!blocks || blocks.length === 0) return null
  return <>{blocks.map((block, i) => renderBlock(block, i))}</>
}

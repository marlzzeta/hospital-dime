import React from 'react'
import { getPayload } from '@/lib/payload'
import { LayoutRenderer } from '@/components/blocks/LayoutRenderer'
import { StaticHomePage } from '@/components/StaticHomePage'
import type { LayoutBlock, PageDoc } from '@/types/blocks'

export default async function HomePage() {
  let page: PageDoc | undefined

  try {
    const payload = await getPayload()
    const { docs } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      limit: 1,
      depth: 2,
    })
    page = docs[0] as unknown as PageDoc | undefined
  } catch {
    // Fallback to static page if DB not available
  }

  if (page?.layout && page.layout.length > 0) {
    return <LayoutRenderer blocks={page.layout as LayoutBlock[]} />
  }

  return <StaticHomePage />
}

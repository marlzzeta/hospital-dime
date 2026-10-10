import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { LayoutRenderer } from '@/components/blocks/LayoutRenderer'
import type { LayoutBlock, MediaDoc, PageDoc } from '@/types/blocks'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'pages', limit: 100 })
  return (docs as unknown as PageDoc[]).map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const page = docs[0] as unknown as PageDoc | undefined
  if (!page) return {}

  const ogImage = page.seo?.ogImage && typeof page.seo.ogImage === 'object'
    ? (page.seo.ogImage as MediaDoc).url
    : undefined

  return {
    title: page.seo?.title ?? page.title,
    description: page.seo?.description,
    openGraph: ogImage ? { images: [{ url: ogImage }] } : undefined,
  }
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  const page = docs[0] as unknown as PageDoc | undefined
  if (!page) notFound()

  return <LayoutRenderer blocks={(page.layout ?? []) as LayoutBlock[]} />
}

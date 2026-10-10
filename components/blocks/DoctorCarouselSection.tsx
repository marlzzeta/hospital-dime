import React from 'react'
import Image from 'next/image'
import { getPayload } from '@/lib/payload'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import type { DoctorCarouselBlockData, DoctorDoc, MediaDoc, SpecialtyDoc } from '@/types/blocks'

async function fetchDoctors(specialtyId?: string): Promise<DoctorDoc[]> {
  try {
    const payload = await getPayload()
    const where = specialtyId
      ? { and: [{ featured: { equals: true } as const }, { specialty: { equals: specialtyId } as const }] }
      : { featured: { equals: true } as const }

    const { docs } = await payload.find({
      collection: 'doctors',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      where: where as any,
      sort: 'order',
      limit: 8,
      depth: 2,
    })

    return docs as unknown as DoctorDoc[]
  } catch {
    return []
  }
}

function DoctorCard({ doctor }: { doctor: DoctorDoc }) {
  const photo = doctor.photo && typeof doctor.photo === 'object' ? doctor.photo as MediaDoc : null
  const specialty = doctor.specialty && typeof doctor.specialty === 'object'
    ? doctor.specialty as SpecialtyDoc
    : null

  return (
    <div className="flex flex-col gap-4 group">
      {/* Portrait */}
      <div className="relative h-[280px] md:h-[320px] bg-[#f0f4ff] rounded-[10px] overflow-hidden">
        {photo?.url ? (
          <Image
            src={photo.url}
            alt={photo.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-4xl font-bold text-primary-600">
                {doctor.name.charAt(0)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <p className="text-[#031047] text-2xl font-normal">
          {doctor.title ? `${doctor.title} ` : ''}{doctor.name}
        </p>
        <p className="text-[#747b91] text-base">
          {specialty?.name ?? 'Especialista'}
        </p>
        {doctor.schedule && (
          <p className="text-xs text-gray-400 mt-1">{doctor.schedule}</p>
        )}
      </div>
    </div>
  )
}

export async function DoctorCarouselSection({ block }: { block: DoctorCarouselBlockData }) {
  const { sectionTitle, specialty } = block
  const specialtyId = specialty && typeof specialty === 'object'
    ? (specialty as SpecialtyDoc).id
    : typeof specialty === 'string' ? specialty : undefined

  const doctors = await fetchDoctors(specialtyId)

  if (doctors.length === 0) return null

  return (
    <Section background="white" id="medicos">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#031047] leading-tight max-w-lg">
            {sectionTitle ?? 'Nuestro equipo es una potencia de talento y dedicación'}
          </h2>
          <div className="shrink-0">
            <Button href="#contacto" size="md">
              Ver todos
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

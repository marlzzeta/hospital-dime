import React from 'react'
import Image from 'next/image'
import { getPayload } from '@/lib/payload'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeading } from '@/components/ui/Section'
import type { DoctorCarouselBlockData, DoctorDoc, MediaDoc, SpecialtyDoc } from '@/types/blocks'

async function fetchDoctors(specialtyId?: string): Promise<DoctorDoc[]> {
  const payload = await getPayload()
  const where = specialtyId
    ? { and: [{ featured: { equals: true } }, { specialty: { equals: specialtyId } }] }
    : { featured: { equals: true } }

  const { docs } = await payload.find({
    collection: 'doctors',
    where,
    sort: 'order',
    limit: 8,
    depth: 2,
  })

  return docs as unknown as DoctorDoc[]
}

function DoctorCard({ doctor }: { doctor: DoctorDoc }) {
  const photo = doctor.photo && typeof doctor.photo === 'object' ? doctor.photo as MediaDoc : null
  const specialty = doctor.specialty && typeof doctor.specialty === 'object'
    ? doctor.specialty as SpecialtyDoc
    : null

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 group">
      <div className="relative h-56 bg-primary-50">
        {photo?.url ? (
          <Image
            src={photo.url}
            alt={photo.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary-600">
                {doctor.name.charAt(0)}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="text-xs text-primary-600 font-semibold uppercase tracking-wider mb-1">
          {specialty?.name ?? 'Especialista'}
        </div>
        <h3 className="font-bold text-slate-900 text-lg leading-tight">
          {doctor.title ? `${doctor.title} ` : ''}{doctor.name}
        </h3>
        {doctor.bio && (
          <p className="text-sm text-slate-500 mt-2 line-clamp-2">{doctor.bio}</p>
        )}
        {doctor.schedule && (
          <p className="text-xs text-slate-400 mt-3 flex items-center gap-1">
            <span>⏰</span> {doctor.schedule}
          </p>
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
    <Section background="surface" id="medicos">
      <Container>
        <SectionHeading
          label="Equipo médico"
          title={sectionTitle ?? 'Nuestro equipo médico'}
          description="Especialistas comprometidos con tu bienestar y con años de experiencia."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

/**
 * Seed de la página home con todos los bloques de contenido.
 * Inserta: Features, DoctorCarousel, Testimonials, LocationContact
 * Mueve el ContactForm al final.
 *
 * Uso: node scripts/seed-home.mjs
 */
import crypto from 'crypto'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

const envPath = resolve(__dirname, '../.env.local')
try {
  const lines = readFileSync(envPath, 'utf8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx < 0) continue
    process.env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
  }
} catch {
  console.error('❌ No se encontró .env.local'); process.exit(1)
}

const dbUrl = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL
if (!dbUrl) { console.error('❌ Falta DATABASE_URL'); process.exit(1) }

const pg = require(resolve(__dirname, '../node_modules/.pnpm/pg@8.20.0/node_modules/pg'))
const client = new pg.Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } })

function uid() {
  return crypto.randomBytes(12).toString('hex')
}

console.log('🔌 Conectando...')
await client.connect()

// Get home page id
const { rows: pages } = await client.query("SELECT id FROM pages WHERE slug = 'home' LIMIT 1")
if (!pages.length) { console.error('❌ No existe la página home'); await client.end(); process.exit(1) }
const pageId = pages[0].id
console.log(`📄 Página home id: ${pageId}`)

// Check what blocks already exist
const { rows: existing } = await client.query(`
  SELECT 'hero' as type, _order FROM pages_blocks_hero WHERE _parent_id = $1
  UNION ALL
  SELECT 'features', _order FROM pages_blocks_features WHERE _parent_id = $1
  UNION ALL
  SELECT 'doctorCarousel', _order FROM pages_blocks_doctor_carousel WHERE _parent_id = $1
  UNION ALL
  SELECT 'testimonials', _order FROM pages_blocks_testimonials WHERE _parent_id = $1
  UNION ALL
  SELECT 'locationContact', _order FROM pages_blocks_location_contact WHERE _parent_id = $1
  UNION ALL
  SELECT 'contactForm', _order FROM pages_blocks_contact_form WHERE _parent_id = $1
  ORDER BY _order
`, [pageId])
console.log('Bloques actuales:', existing)

const existingTypes = new Set(existing.map(r => r.type))

// Move contactForm to end (order 6) if it exists
if (existingTypes.has('contactForm')) {
  await client.query(
    "UPDATE pages_blocks_contact_form SET _order = 6 WHERE _parent_id = $1",
    [pageId]
  )
  console.log('✅ ContactForm movido a orden 6')
}

// 1. Features block (order 2)
if (!existingTypes.has('features')) {
  const featId = uid()
  await client.query(
    `INSERT INTO pages_blocks_features (_order, _parent_id, _path, id, section_title)
     VALUES (2, $1, 'layout', $2, 'Especialidades médicas de primer nivel')`,
    [pageId, featId]
  )

  const features = [
    { icon: 'Heart',      title: 'Cardiología',         description: 'Diagnóstico y tratamiento avanzado de enfermedades cardiovasculares.' },
    { icon: 'Activity',   title: 'Medicina General',    description: 'Atención preventiva y de seguimiento para toda la familia.' },
    { icon: 'Microscope', title: 'Laboratorio Clínico', description: 'Análisis de última generación con resultados en pocas horas.' },
    { icon: 'Clock',      title: 'Emergencias 24/7',    description: 'Atención de urgencias las 24 horas, los 7 días de la semana.' },
    { icon: 'Shield',     title: 'Cirugía Especializada', description: 'Procedimientos quirúrgicos con tecnología mínimamente invasiva.' },
    { icon: 'Star',       title: 'Atención Pediátrica', description: 'Cuidado integral para los más pequeños de la familia.' },
  ]

  for (let i = 0; i < features.length; i++) {
    const f = features[i]
    await client.query(
      `INSERT INTO pages_blocks_features_features (_order, _parent_id, id, icon, title, description)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [i + 1, featId, uid(), f.icon, f.title, f.description]
    )
  }
  console.log('✅ Features block insertado')
} else {
  console.log('⏭  Features block ya existe')
}

// 2. DoctorCarousel block (order 3)
if (!existingTypes.has('doctorCarousel')) {
  await client.query(
    `INSERT INTO pages_blocks_doctor_carousel (_order, _parent_id, _path, id, section_title)
     VALUES (3, $1, 'layout', $2, 'Nuestro equipo médico')`,
    [pageId, uid()]
  )
  console.log('✅ DoctorCarousel block insertado')
} else {
  console.log('⏭  DoctorCarousel block ya existe')
}

// 3. Testimonials block (order 4)
if (!existingTypes.has('testimonials')) {
  const testId = uid()
  await client.query(
    `INSERT INTO pages_blocks_testimonials (_order, _parent_id, _path, id, section_title)
     VALUES (4, $1, 'layout', $2, 'Lo que dicen nuestros pacientes')`,
    [pageId, testId]
  )

  const testimonials = [
    { quote: 'Excelente atención. Los médicos son muy profesionales y el personal muy amable. Me sentí en buenas manos desde el momento que llegué.', author: 'María García', role: 'Paciente de Cardiología', rating: 5 },
    { quote: 'Las instalaciones son modernas y limpias. La atención fue rápida y eficiente. Definitivamente lo recomiendo a toda mi familia.', author: 'Carlos Rodríguez', role: 'Paciente de Medicina General', rating: 5 },
    { quote: 'El servicio de emergencias es impresionante. Respondieron de forma inmediata y el seguimiento posterior fue excelente.', author: 'Ana Martínez', role: 'Paciente de Urgencias', rating: 5 },
  ]

  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i]
    await client.query(
      `INSERT INTO pages_blocks_testimonials_testimonials (_order, _parent_id, id, quote, author, role, rating)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [i + 1, testId, uid(), t.quote, t.author, t.role, t.rating]
    )
  }
  console.log('✅ Testimonials block insertado')
} else {
  console.log('⏭  Testimonials block ya existe')
}

// 4. LocationContact block (order 5)
if (!existingTypes.has('locationContact')) {
  await client.query(
    `INSERT INTO pages_blocks_location_contact
     (_order, _parent_id, _path, id, section_title, address, phone, emergency_phone, email, schedule_text)
     VALUES (5, $1, 'layout', $2, 'Encuéntranos', 'Col. Palmira, Tegucigalpa, Honduras',
       '+504 2234-5678', '+504 2234-5678', 'contacto@hospitaldime.hn',
       'Lun–Vie 7:00–20:00 | Sáb 7:00–14:00 | Emergencias 24/7')`,
    [pageId, uid()]
  )
  console.log('✅ LocationContact block insertado')
} else {
  console.log('⏭  LocationContact block ya existe')
}

// Final state
const { rows: final } = await client.query(`
  SELECT 'hero' as type, _order FROM pages_blocks_hero WHERE _parent_id = $1
  UNION ALL
  SELECT 'features', _order FROM pages_blocks_features WHERE _parent_id = $1
  UNION ALL
  SELECT 'doctorCarousel', _order FROM pages_blocks_doctor_carousel WHERE _parent_id = $1
  UNION ALL
  SELECT 'testimonials', _order FROM pages_blocks_testimonials WHERE _parent_id = $1
  UNION ALL
  SELECT 'locationContact', _order FROM pages_blocks_location_contact WHERE _parent_id = $1
  UNION ALL
  SELECT 'contactForm', _order FROM pages_blocks_contact_form WHERE _parent_id = $1
  ORDER BY _order
`, [pageId])
console.log('\n📋 Bloques finales:', final)

await client.end()
console.log('\n✅ Seed completado. Deploy para ver los cambios.')

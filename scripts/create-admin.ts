/**
 * Crea un usuario administrador en la base de datos.
 * Uso: pnpm tsx scripts/create-admin.ts
 *
 * Por defecto usa DATABASE_URL de .env.local (BD local).
 * Para producción (Neon): DATABASE_URL=<neon-url> pnpm tsx scripts/create-admin.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config'

const EMAIL = 'admin@hospitaldime.hn'
const PASSWORD = 'Admin2024!DIME'

async function main() {
  const payload = await getPayload({ config })

  // Buscar si ya existe
  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: EMAIL } },
    limit: 1,
    overrideAccess: true,
  })

  if (docs.length > 0) {
    // Actualizar contraseña del usuario existente
    await payload.update({
      collection: 'users',
      id: docs[0].id,
      data: { password: PASSWORD },
      overrideAccess: true,
    })
    console.log(`✅ Contraseña actualizada para: ${EMAIL}`)
  } else {
    // Crear nuevo usuario
    await payload.create({
      collection: 'users',
      data: {
        email: EMAIL,
        password: PASSWORD,
        name: 'Administrador DIME',
        role: 'admin',
      },
      overrideAccess: true,
    })
    console.log(`✅ Usuario creado: ${EMAIL}`)
  }

  console.log(`🔑 Contraseña: ${PASSWORD}`)
  process.exit(0)
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})

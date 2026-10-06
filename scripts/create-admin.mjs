/**
 * Crea o resetea el usuario admin en la BD.
 * Uso local:       node scripts/create-admin.mjs
 * Uso producción:  DATABASE_URL="<neon-url>" node scripts/create-admin.mjs
 */
import { createRequire } from 'module'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

// Carga .env.local manualmente
if (!process.env.DATABASE_URL && !process.env.DATABASE_URI) {
  try {
    const envPath = resolve(__dirname, '../.env.local')
    const lines = readFileSync(envPath, 'utf8').split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const idx = trimmed.indexOf('=')
      if (idx < 0) continue
      const key = trimmed.slice(0, idx).trim()
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
      process.env[key] = val
    }
    console.log('📂 .env.local cargado')
  } catch {
    console.log('⚠️  No se encontró .env.local — usando variables de entorno del sistema')
  }
}

const dbUrl = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL ?? process.env.DATABASE_URI
if (!dbUrl) {
  console.error('❌ Falta DATABASE_URL. Configúralo en .env.local o como variable de entorno.')
  process.exit(1)
}

// Importar pg desde node_modules de pnpm
const pgPath = resolve(__dirname, '../node_modules/.pnpm/pg@8.20.0/node_modules/pg')
const { default: pg } = await import(pgPath + '/lib/index.js')

// Importar argon2
const argon2Path = resolve(__dirname, '../node_modules/.pnpm/@node-rs+argon2@2.0.3/node_modules/@node-rs/argon2')
let hashFn
try {
  const argon2 = require(argon2Path)
  hashFn = argon2.hash
} catch {
  // fallback: usar el modulo directo
  const { hash } = await import('@node-rs/argon2')
  hashFn = hash
}

const EMAIL = 'admin@hospitaldime.hn'
const PASSWORD = 'Admin2024!DIME'

console.log(`🔌 Conectando a la BD...`)
const useSSL = dbUrl.includes('neon') || dbUrl.includes('ssl')
const client = new pg.Client({
  connectionString: dbUrl,
  ssl: useSSL ? { rejectUnauthorized: false } : false
})
await client.connect()
console.log('✅ Conectado')

// Hash de contraseña (argon2id, parámetros de Payload)
const passwordHash = await hashFn(PASSWORD, { algorithm: 2 })

// Verificar si existe el usuario
const { rows } = await client.query('SELECT id FROM users WHERE email = $1', [EMAIL])

if (rows.length > 0) {
  await client.query(
    'UPDATE users SET hash = $1, "loginAttempts" = 0, "lockUntil" = NULL WHERE email = $2',
    [passwordHash, EMAIL]
  )
  console.log(`✅ Contraseña actualizada para: ${EMAIL}`)
} else {
  await client.query(
    'INSERT INTO users (email, hash, name, role) VALUES ($1, $2, $3, $4)',
    [EMAIL, passwordHash, 'Administrador DIME', 'admin']
  )
  console.log(`✅ Usuario admin creado: ${EMAIL}`)
}

await client.end()

console.log('')
console.log('═══════════════════════════════════════')
console.log('🔑  CREDENCIALES DE ADMIN')
console.log('───────────────────────────────────────')
console.log(`   Email:      ${EMAIL}`)
console.log(`   Contraseña: ${PASSWORD}`)
console.log('───────────────────────────────────────')
console.log('🌐  https://hospital-dime.vercel.app/admin')
console.log('═══════════════════════════════════════')
console.log('')
console.log('⚠️  Cambia la contraseña después de entrar por primera vez.')

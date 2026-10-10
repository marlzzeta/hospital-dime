/**
 * Resetea la contraseña del usuario admin directamente en la BD.
 * Usa el mismo algoritmo que Payload 3.x (PBKDF2-SHA256).
 *
 * Uso: node scripts/reset-admin.mjs
 */
import crypto from 'crypto'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

// Cargar .env.local
const envPath = resolve(__dirname, '../.env.local')
try {
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
} catch {
  console.error('❌ No se encontró .env.local')
  process.exit(1)
}

const dbUrl = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL
if (!dbUrl) { console.error('❌ Falta DATABASE_URL'); process.exit(1) }

// Algoritmo de Payload 3.x
const PREFIX = 'pbkdf2-sha256-v1:'
const ITERATIONS = 600000
const KEY_LENGTH = 32

async function hashPassword(password) {
  const saltBuffer = await new Promise((res, rej) =>
    crypto.randomBytes(32, (err, buf) => err ? rej(err) : res(buf))
  )
  const salt = saltBuffer.toString('hex')
  const hashRaw = await new Promise((res, rej) =>
    crypto.pbkdf2(password, salt, ITERATIONS, KEY_LENGTH, 'sha256', (err, buf) => err ? rej(err) : res(buf))
  )
  return { hash: `${PREFIX}${hashRaw.toString('hex')}`, salt }
}

const pg = require(resolve(__dirname, '../node_modules/.pnpm/pg@8.20.0/node_modules/pg'))
const client = new pg.Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } })

const NEW_PASSWORD = 'Admin2024!DIME'

console.log('🔌 Conectando a Neon...')
await client.connect()

const { rows } = await client.query('SELECT id, email FROM users ORDER BY id LIMIT 5')
if (rows.length === 0) {
  console.log('⚠️  No hay usuarios en la BD')
  await client.end(); process.exit(0)
}

// Resetear el primer admin (o el único usuario)
const user = rows[0]
console.log(`✏️  Reseteando contraseña de: ${user.email}`)

const { hash, salt } = await hashPassword(NEW_PASSWORD)
await client.query(
  'UPDATE users SET hash = $1, salt = $2, login_attempts = 0, lock_until = NULL WHERE id = $3',
  [hash, salt, user.id]
)

await client.end()

console.log('')
console.log('═══════════════════════════════════════')
console.log('✅  CONTRASEÑA ACTUALIZADA')
console.log('───────────────────────────────────────')
console.log(`   Email:      ${user.email}`)
console.log(`   Contraseña: ${NEW_PASSWORD}`)
console.log('───────────────────────────────────────')
console.log('🌐  https://hospital-dime.vercel.app/admin')
console.log('═══════════════════════════════════════')
console.log('')
console.log('⚠️  Cambia la contraseña desde el perfil después de entrar.')
